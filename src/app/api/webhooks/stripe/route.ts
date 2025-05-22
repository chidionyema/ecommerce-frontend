// src/app/api/webhooks/stripe/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

/**
 * Stripe initialisation – basil schema only
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// -----------------------------------------------------------------------------
// Mock DB helpers – replace with real persistence layer
// -----------------------------------------------------------------------------
const grantAccessToResource = async (
  userId: string,
  resourceId: string,
  paymentIntentId: string,
) => {
  console.log(`GRANT | user=${userId} | resource=${resourceId} | pi=${paymentIntentId}`);
};

const revokeAccessToResource = async (
  userId: string,
  resourceId: string,
  reason: string,
  stripeObjectId: string,
) => {
  console.log(`REVOKE | user=${userId} | resource=${resourceId} | reason=${reason} | id=${stripeObjectId}`);
};

const findUserByCustomerId = async (customerId: string) => {
  if (customerId.startsWith('cus_')) return { id: `user_${customerId}` };
  return null;
};

const handleSubscriptionUpdate = async (sub: Stripe.Subscription) => {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const user = await findUserByCustomerId(customerId);
  console.log(`SUB_UPDATE | sub=${sub.id} | status=${sub.status} | user=${user?.id ?? 'not-found'}`);
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
const getSubscriptionIdFromInvoice = (invoice: Stripe.Invoice): string | null =>
  (invoice as any).subscription_details?.subscription ?? null;

const getCustomerId = (
  cust: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined,
): string | null => (cust ? (typeof cust === 'string' ? cust : 'id' in cust ? cust.id : null) : null);

// -----------------------------------------------------------------------------
// Webhook entry point
// -----------------------------------------------------------------------------
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

  try {
    switch (event.type) {
      // -------------------------------------------------------------------
      case 'payment_intent.succeeded': {
        const pi = obj as Stripe.PaymentIntent;
        const { resourceId, userId: metaUserId } = pi.metadata;

        let userId: string | undefined = metaUserId || undefined;
        if (!userId) {
          const custId = getCustomerId(pi.customer);
          if (custId) {
            const user = await findUserByCustomerId(custId);
            userId = user?.id;
          }
        }

        if (resourceId && userId) await grantAccessToResource(userId, resourceId, pi.id);
        break;
      }
      // -------------------------------------------------------------------
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
      // -------------------------------------------------------------------
      case 'checkout.session.completed': {
        const session = obj as Stripe.Checkout.Session;
        if (session.payment_status !== 'paid') break;

        const piId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
        const resourceId = session.metadata?.resourceId;
        let userId: string | undefined = session.metadata?.userId;

        if (!userId && session.customer) {
          const custId = getCustomerId(session.customer as any);
          if (custId) {
            const user = await findUserByCustomerId(custId);
            userId = user?.id;
          }
        }

        if (piId && resourceId && userId) await grantAccessToResource(userId, resourceId, piId);
        break;
      }
      // -------------------------------------------------------------------
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        await handleSubscriptionUpdate(obj as Stripe.Subscription);
        break;
      }
      // -------------------------------------------------------------------
      case 'invoice.payment_succeeded':
      case 'invoice.payment_failed': {
        const invoice = obj as Stripe.Invoice;
        const subId = getSubscriptionIdFromInvoice(invoice);
        console.log(`INVOICE | ${event.type} | id=${invoice.id} | sub=${subId ?? 'none'}`);
        if (subId) {
          try {
            const sub = await stripe.subscriptions.retrieve(subId);
            await handleSubscriptionUpdate(sub);
          } catch (e: any) {
            console.error(`SUB_RETRIEVE_FAIL | sub=${subId} | ${e.message}`);
          }
        }
        break;
      }
      // -------------------------------------------------------------------
      default:
        console.warn(`UNHANDLED | ${event.type}`);
    }
  } catch (err: any) {
    console.error(`HANDLER_ERROR | ${err.message}`);
    return NextResponse.json({ error: 'handler failure' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
