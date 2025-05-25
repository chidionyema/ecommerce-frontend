// src/app/api/webhooks/stripe/route.ts
// -----------------------------------------------------------------------------
// Typed, idempotent Stripe webhook handler backed by Prisma
// -----------------------------------------------------------------------------
// Last updated: 2025‑05‑25

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

import { prisma } from '@/lib/prisma';
import { getCustomerId } from '@/utils/stripe'; // NEW: safe customer‑ID extractor

/* -------------------------------------------------------------------------- */
/* Stripe initialisation – basil schema                                       */
/* -------------------------------------------------------------------------- */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/* -------------------------------------------------------------------------- */
/* Type‑helpers to support both snake_case (classic) and camelCase (basil)    */
/* -------------------------------------------------------------------------- */
// Simple helper: safely read either snake_case or camelCase field names without busting TS types
const pickField = (obj: any, snake: string, camel: string) => obj?.[snake] ?? obj?.[camel];

const getSubscriptionIdFromInvoice = (invoice: Stripe.Invoice): string | null =>
  (invoice as any).subscription_details?.subscription ?? null;

/* -------------------------------------------------------------------------- */
/* Persistence helpers – Prisma powered                                       */
/* -------------------------------------------------------------------------- */
const grantAccessToResource = async (
  userId: string,
  resourceId: string,
  paymentIntentId: string,
) =>
  prisma.$transaction(async (tx) => {
    await tx.resourceAccess.upsert({
      where: { userId_resourceId: { userId, resourceId } },
      update: {
        revokedAt: null,
        grantedByPaymentIntentId: paymentIntentId,
      },
      create: {
        userId,
        resourceId,
        grantedByPaymentIntentId: paymentIntentId,
      },
    });
  });

const revokeAccessToResource = async (
  userId: string,
  resourceId: string,
  reason: string,
  stripeObjectId: string,
) =>
  prisma.resourceAccess.updateMany({
    where: { userId, resourceId, revokedAt: null },
    data: {
      revokedAt: new Date(),
      revokeReason: reason,
      revokedByStripeObjectId: stripeObjectId,
    },
  });

const findUserByCustomerId = async (customerId: string) =>
  prisma.user.findUnique({ where: { stripeCustomerId: customerId } });

const handleSubscriptionUpdate = async (sub: Stripe.Subscription) => {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const user = await findUserByCustomerId(customerId);

  if (!user) {
    console.warn(`SUB_UPDATE | no local user for customer=${customerId}`);
    return;
  }

  const unixStart = pickField(sub as any, 'current_period_start', 'currentPeriodStart');
  const unixEnd = pickField(sub as any, 'current_period_end', 'currentPeriodEnd');
  const cancelAtPeriodEnd = pickField(sub as any, 'cancel_at_period_end', 'cancelAtPeriodEnd');
  const canceledAtUnix = pickField(sub as any, 'canceled_at', 'canceledAt');
  const trialStartUnix = pickField(sub as any, 'trial_start', 'trialStart');
  const trialEndUnix = pickField(sub as any, 'trial_end', 'trialEnd');

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    update: {
      status: sub.status,
      stripePriceId: sub.items.data[0].price.id,
      currentPeriodStart: unixStart ? new Date((unixStart as number) * 1000) : undefined,
      currentPeriodEnd: unixEnd ? new Date((unixEnd as number) * 1000) : undefined,
      cancelAtPeriodEnd: !!cancelAtPeriodEnd,
      canceledAt: canceledAtUnix ? new Date((canceledAtUnix as number) * 1000) : null,
      trialStart: trialStartUnix ? new Date((trialStartUnix as number) * 1000) : null,
      trialEnd: trialEndUnix ? new Date((trialEndUnix as number) * 1000) : null,
    },
    create: {
      userId: user.id,
      stripeSubscriptionId: sub.id,
      stripePriceId: sub.items.data[0].price.id,
      status: sub.status,
      currentPeriodStart: unixStart ? new Date((unixStart as number) * 1000) : new Date(),
      currentPeriodEnd: unixEnd ? new Date((unixEnd as number) * 1000) : new Date(),
      cancelAtPeriodEnd: !!cancelAtPeriodEnd,
      canceledAt: canceledAtUnix ? new Date((canceledAtUnix as number) * 1000) : null,
      trialStart: trialStartUnix ? new Date((trialStartUnix as number) * 1000) : null,
      trialEnd: trialEndUnix ? new Date((trialEndUnix as number) * 1000) : null,
    },
  });
};

/* -------------------------------------------------------------------------- */
/* Webhook entry point                                                        */
/* -------------------------------------------------------------------------- */
export async function POST(request: Request) {
  const body = await request.text();
  const sig = (await headers()).get('stripe-signature');

  if (!webhookSecret) return NextResponse.json({ error: 'No webhook secret' }, { status: 500 });
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`SIG_VERIFY_FAIL | ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  console.log(`EVENT | id=${event.id} | type=${event.type}`);
  const obj = event.data.object as any;

  const alreadyHandled = await prisma.stripeEventLog.findUnique({ where: { eventId: event.id } });
  if (alreadyHandled) {
    console.log(`DUPLICATE_EVENT | ${event.id} already processed`);
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = obj as Stripe.PaymentIntent;
        const { resourceId, userId: metaUserId } = pi.metadata;

        let userId: string | undefined = metaUserId;
        if (!userId) {
          const custId = getCustomerId(pi.customer);
          if (custId) userId = (await findUserByCustomerId(custId))?.id;
        }

        if (resourceId && userId) await grantAccessToResource(userId, resourceId, pi.id);
        break;
      }
      case 'charge.refunded': {
        const ch = obj as Stripe.Charge;
        const piId = typeof ch.payment_intent === 'string' ? ch.payment_intent : null;
        if (piId) {
          const pi = await stripe.paymentIntents.retrieve(piId);
          const { userId, resourceId } = pi.metadata as { userId?: string; resourceId?: string };
          if (userId && resourceId) await revokeAccessToResource(userId, resourceId, 'refund', ch.id);
        }
        break;
      }
      case 'checkout.session.completed': {
        const session = obj as Stripe.Checkout.Session;
        if (session.payment_status !== 'paid') break;

        const piId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
        const resourceId = session.metadata?.resourceId;
        let userId: string | undefined = session.metadata?.userId;

        if (!userId && session.customer) {
          const custId = getCustomerId(session.customer as any);
          if (custId) userId = (await findUserByCustomerId(custId))?.id;
        }

        if (piId && resourceId && userId) await grantAccessToResource(userId, resourceId, piId);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionUpdate(obj as Stripe.Subscription);
        break;
      case 'invoice.payment_succeeded':
      case 'invoice.payment_failed': {
        const invoice = obj as Stripe.Invoice;
        const subId = getSubscriptionIdFromInvoice(invoice);
        console.log(`INVOICE | ${event.type} | id=${invoice.id} | sub=${subId ?? 'none'}`);
        if (subId) {
          try {
            await handleSubscriptionUpdate(await stripe.subscriptions.retrieve(subId));
          } catch (e: any) {
            console.error(`SUB_RETRIEVE_FAIL | sub=${subId} | ${e.message}`);
          }
        }
        break;
      }
      default:
        console.warn(`UNHANDLED | ${event.type}`);
    }
  } catch (err: any) {
    console.error(`HANDLER_ERROR | ${err.message}`);
    return NextResponse.json({ error: 'handler failure' }, { status: 500 });
  }

  await prisma.stripeEventLog.create({
    data: {
      eventId: event.id,
      type: event.type,
      payload: obj as any,
    },
  });

  return NextResponse.json({ received: true });
}
