// src/app/api/webhooks/stripe/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers'; // For accessing request headers in App Router

// Initialize Stripe with your secret key
// Ensure STRIPE_SECRET_KEY is set in your .env.local or environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-04-30.basil' // Pinning the API version
  });

// Get your webhook signing secret from the Stripe dashboard and set it as an environment variable
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// --- Utility functions for Subscription Periods (due to 2025-03-31.basil changes) ---
const getCurrentPeriodStart = (sub: Stripe.Subscription): number | null => {
  if (!sub.items?.data?.length) return null;
  // Earliest start across all items
  const earliestStart = sub.items.data
    .map(i => i.current_period_start) // current_period_start is a Unix timestamp (number)
    .reduce((earliest, ts) => (ts < earliest ? ts : earliest), Infinity);
  return earliestStart === Infinity ? null : earliestStart;
};

const getCurrentPeriodEnd = (sub: Stripe.Subscription): number | null => {
  if (!sub.items?.data?.length) return null;
  // Latest end across all items
  const latestEnd = sub.items.data
    .map(i => i.current_period_end) // current_period_end is a Unix timestamp (number)
    .reduce((latest, ts) => (ts > latest ? ts : latest), 0);
  return latestEnd === 0 ? null : latestEnd;
};

// --- Utility function to get Subscription ID from Invoice (due to 2025-03-31.basil changes) ---
/**
 * Returns the subscription ID for an Invoice created by a subscription
 * according to the 2025-03-31+ “details” schema.
 */
/**
 * Extracts the Subscription ID that generated an Invoice (2025-03-31+ basil).
 * Works for normal invoices, previews, and prorations.
 */
/**
 * Extracts the Subscription ID that generated an Invoice
 * (Stripe API ≥ 2025-03-31.basil).
 */
const getSubscriptionIdFromInvoice = (invoice: Stripe.Invoice): string | null => {
  const extract = (v: unknown): string | null =>
    !v ? null : typeof v === 'string' ? v : (v as Stripe.Subscription).id;

  // 1️⃣  Normal & web-hook invoices
  const fromParent = extract(
    (invoice as any).parent?.subscription_details?.subscription,
  );
  if (fromParent) return fromParent;

  // 2️⃣  Legacy fallback (only if you still ingest pre-2025-03-31 payloads)
  return extract((invoice as any)['subscription']); // indexed access silences TS
};



// --- Mock database/fulfillment functions - REPLACE WITH YOUR ACTUAL DATABASE LOGIC using Prisma ---
const grantAccessToResource = async (userId: string, resourceId: string, paymentIntentId: string) => {
  console.log(`WEBHOOK_ACTION: Granting access for userId: ${userId}, resourceId: ${resourceId}, paymentIntentId: ${paymentIntentId}`);
  // TODO: Implement actual database logic with Prisma
  return { success: true, message: "Access granted (simulated)." };
};

const revokeAccessToResource = async (userId: string, resourceId: string, reason: string, relatedStripeObjectId: string) => {
  console.log(`WEBHOOK_ACTION: Revoking access for userId: ${userId}, resourceId: ${resourceId}, reason: ${reason}, relatedStripeObjectId: ${relatedStripeObjectId}`);
  // TODO: Implement actual database logic with Prisma
  return { success: true, message: "Access revoked (simulated)." };
};

const findUserByCustomerId = async (stripeCustomerId: string): Promise<{ id: string; email: string } | null> => {
    console.log(`WEBHOOK_ACTION: Looking up user by Stripe Customer ID: ${stripeCustomerId}`);
    // TODO: Implement actual database logic with Prisma
    if (stripeCustomerId.startsWith('cus_')) {
        return { id: `user_placeholder_for_${stripeCustomerId}`, email: "user@example.com" };
    }
    return null;
};

const handleSubscriptionUpdate = async (subscription: Stripe.Subscription) => {
    console.log(`WEBHOOK_ACTION: Handling subscription update for ID: ${subscription.id}, Status: ${subscription.status}`);
    const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
    
    if (!subscription.items || !subscription.items.data || subscription.items.data.length === 0) {
        console.warn(`WEBHOOK_WARN: Subscription ${subscription.id} received without items.data. Attempting to retrieve with expansion.`);
        try {
            const freshSub = await stripe.subscriptions.retrieve(subscription.id, { expand: ['items.data']});
            if(!freshSub.items?.data?.length) {
                console.error(`WEBHOOK_ERROR: Subscription ${subscription.id} still has no items.data after re-fetching. Cannot determine period.`);
                return; 
            }
            subscription = freshSub; 
        } catch (error: any) {
            console.error(`WEBHOOK_ERROR: Failed to re-fetch subscription ${subscription.id} for items.data: ${error.message}`);
            return;
        }
    }

    const calculatedCurrentPeriodStart = getCurrentPeriodStart(subscription);
    const calculatedCurrentPeriodEnd = getCurrentPeriodEnd(subscription);

    console.log(`WEBHOOK_ACTION: Calculated period for subscription ${subscription.id}: 
                 Start: ${calculatedCurrentPeriodStart ? new Date(calculatedCurrentPeriodStart * 1000).toISOString() : 'N/A'}, 
                 End: ${calculatedCurrentPeriodEnd ? new Date(calculatedCurrentPeriodEnd * 1000).toISOString() : 'N/A'}`);

    const user = await findUserByCustomerId(customerId);
    if (user) {
        // TODO: Update user's subscription status, currentPeriodStart, currentPeriodEnd, etc. in your database using Prisma.
        console.log(`WEBHOOK_ACTION: User ${user.id} subscription data (status: ${subscription.status}) ready for DB update.`);
    } else {
        console.error(`WEBHOOK_ERROR: User not found for customer ID: ${customerId} during subscription update.`);
    }
};
// --- End of Mock Functions ---

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature') as string;

  if (!webhookSecret) {
    console.error('WEBHOOK_ERROR: Stripe webhook secret is not configured.');
    return NextResponse.json({ message: 'Webhook secret not configured.' }, { status: 500 });
  }
  if (!signature) {
    console.error('WEBHOOK_ERROR: Missing Stripe signature.');
    return NextResponse.json({ message: 'Missing Stripe signature.' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`WEBHOOK_ERROR: Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`WEBHOOK: Received event: ${event.id}, type: ${event.type}`);
  const eventDataObject = event.data.object;

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = eventDataObject as Stripe.PaymentIntent;
        console.log(`WEBHOOK: PaymentIntent succeeded: ${paymentIntentSucceeded.id}`);
        const resourceId = paymentIntentSucceeded.metadata.resourceId;
        let userId = paymentIntentSucceeded.metadata.userId;

        if (!userId && paymentIntentSucceeded.customer) {
            const customerId = typeof paymentIntentSucceeded.customer === 'string'
              ? paymentIntentSucceeded.customer
              : paymentIntentSucceeded.customer.id;
            const user = await findUserByCustomerId(customerId);
            if (user) userId = user.id;
        }

        if (resourceId && userId) {
            await grantAccessToResource(userId, resourceId, paymentIntentSucceeded.id);
            console.log(`WEBHOOK: Successfully processed payment_intent.succeeded for ${paymentIntentSucceeded.id}`);
        } else {
            console.error(`WEBHOOK_ERROR: Missing resourceId or userId for PaymentIntent ${paymentIntentSucceeded.id}. Metadata: ${JSON.stringify(paymentIntentSucceeded.metadata)}, Customer: ${paymentIntentSucceeded.customer}`);
        }
        break;

      case 'payment_intent.payment_failed':
        const paymentIntentFailed = eventDataObject as Stripe.PaymentIntent;
        console.log(`WEBHOOK: PaymentIntent failed: ${paymentIntentFailed.id}, Reason: ${paymentIntentFailed.last_payment_error?.message}`);
        // TODO: Log failure, notify user (e.g., email), update internal records.
        break;

      case 'charge.succeeded':
        const chargeSucceeded = eventDataObject as Stripe.Charge;
        console.log(`WEBHOOK: Charge succeeded: ${chargeSucceeded.id}, PaymentIntent: ${chargeSucceeded.payment_intent}`);
        // Often redundant if handling payment_intent.succeeded.
        break;

      case 'charge.failed':
        const chargeFailed = eventDataObject as Stripe.Charge;
        console.log(`WEBHOOK: Charge failed: ${chargeFailed.id}, Reason: ${chargeFailed.failure_message}`);
        // TODO: Log failure, potentially notify user.
        break;

      case 'charge.refunded':
        const chargeRefunded = eventDataObject as Stripe.Charge;
        console.log(`WEBHOOK: Charge refunded: ${chargeRefunded.id}, Amount Refunded: ${chargeRefunded.amount_refunded}`);
        const piForRefund = chargeRefunded.payment_intent;
        if (typeof piForRefund === 'string') {
            const relatedPaymentIntent = await stripe.paymentIntents.retrieve(piForRefund);
            const refundUserId = relatedPaymentIntent.metadata.userId; 
            const refundResourceId = relatedPaymentIntent.metadata.resourceId;
            if (refundUserId && refundResourceId) {
                 await revokeAccessToResource(refundUserId, refundResourceId, "Charge refunded", chargeRefunded.id);
            } else {
                console.error(`WEBHOOK_ERROR: Could not determine userId or resourceId for refund on PI: ${piForRefund}`);
            }
        } else {
            console.warn(`WEBHOOK_WARN: Payment intent ID for refund is not a string: ${piForRefund}`);
        }
        break;

      case 'checkout.session.completed':
        const session = eventDataObject as Stripe.Checkout.Session;
        console.log(`WEBHOOK: Checkout Session completed: ${session.id}, PaymentIntent: ${session.payment_intent}`);
        if (session.payment_status === 'paid') {
            const piId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
            const customerId = typeof session.customer === 'string' ? session.customer : null;
            let csUserId = session.metadata?.userId; 
            
            if (!csUserId && customerId) {
                const user = await findUserByCustomerId(customerId);
                if (user) csUserId = user.id;
            }

            const csResourceId = session.metadata?.resourceId;

            if (piId && csUserId && csResourceId) {
                await grantAccessToResource(csUserId, csResourceId, piId);
                console.log(`WEBHOOK: Successfully processed checkout.session.completed for PI ${piId}`);
            } else {
                console.error(`WEBHOOK_ERROR: Missing data for checkout.session.completed. PI: ${piId}, UserID: ${csUserId}, ResourceID: ${csResourceId}. Session Metadata: ${JSON.stringify(session.metadata)}`);
            }
        }
        break;
      
      case 'checkout.session.async_payment_succeeded':
        const asyncSessionSuccess = eventDataObject as Stripe.Checkout.Session;
        console.log(`WEBHOOK: Checkout Session async payment succeeded: ${asyncSessionSuccess.id}`);
        // TODO: Handle fulfillment similar to checkout.session.completed for asynchronous payment methods.
        // This might involve checking session.payment_status and using metadata.
        break;

      case 'checkout.session.async_payment_failed':
        const asyncSessionFailed = eventDataObject as Stripe.Checkout.Session;
        console.log(`WEBHOOK: Checkout Session async payment failed: ${asyncSessionFailed.id}, for customer: ${asyncSessionFailed.customer}`);
        // TODO: Notify user, log failure.
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': // or .canceled
        const subscriptionEventData = eventDataObject as Stripe.Subscription;
        console.log(`WEBHOOK: Subscription event: ${event.type} for subscription ID: ${subscriptionEventData.id}`);
        await handleSubscriptionUpdate(subscriptionEventData);
        break;

      case 'invoice.payment_succeeded':
        const invoicePaymentSucceeded = eventDataObject as Stripe.Invoice;
        const subscriptionIdFromInvoiceSuccess = getSubscriptionIdFromInvoice(invoicePaymentSucceeded);

        console.log(`WEBHOOK: Invoice payment succeeded for invoice ID: ${invoicePaymentSucceeded.id}, Subscription ID: ${subscriptionIdFromInvoiceSuccess || 'N/A'}`);

        if (subscriptionIdFromInvoiceSuccess) {
          try {
            const subscriptionObject = await stripe.subscriptions.retrieve(
              subscriptionIdFromInvoiceSuccess,
              { expand: ['items.data'] } 
            );
            await handleSubscriptionUpdate(subscriptionObject);
            console.log(`WEBHOOK_ACTION: Ensured subscription ${subscriptionIdFromInvoiceSuccess} is up-to-date following successful invoice payment.`);
          } catch (retrieveError: any) {
            console.error(`WEBHOOK_ERROR: Failed to retrieve or update subscription ${subscriptionIdFromInvoiceSuccess} after invoice payment: ${retrieveError.message}`);
          }
        } else if (invoicePaymentSucceeded.billing_reason === 'subscription_create' || invoicePaymentSucceeded.billing_reason === 'subscription_cycle' || invoicePaymentSucceeded.billing_reason === 'subscription_update') {
          console.warn(`WEBHOOK_WARN: Invoice ${invoicePaymentSucceeded.id} has billing_reason indicating a subscription ('${invoicePaymentSucceeded.billing_reason}') but no subscription ID was found using getSubscriptionIdFromInvoice. Customer: ${invoicePaymentSucceeded.customer}`);
        }
        break;

      case 'invoice.payment_failed':
        const invoicePaymentFailed = eventDataObject as Stripe.Invoice;
        const failedSubscriptionIdFromInvoice = getSubscriptionIdFromInvoice(invoicePaymentFailed);

        console.log(`WEBHOOK: Invoice payment failed for invoice ID: ${invoicePaymentFailed.id}, Subscription ID: ${failedSubscriptionIdFromInvoice || 'N/A'}`);

        if (failedSubscriptionIdFromInvoice) {
          try {
            const subscriptionObject = await stripe.subscriptions.retrieve(
              failedSubscriptionIdFromInvoice,
              { expand: ['items.data'] }
            );
            await handleSubscriptionUpdate(subscriptionObject);
            console.log(`WEBHOOK_ACTION: Updated subscription ${failedSubscriptionIdFromInvoice} status following failed invoice payment.`);
          } catch (retrieveError: any) {
            console.error(`WEBHOOK_ERROR: Failed to retrieve or update subscription ${failedSubscriptionIdFromInvoice} after invoice payment failure: ${retrieveError.message}`);
          }
        }
        break;

      case 'charge.dispute.created':
        const disputeCreated = eventDataObject as Stripe.Dispute;
        console.log(`WEBHOOK: Dispute created: ${disputeCreated.id} for charge: ${disputeCreated.charge}, reason: ${disputeCreated.reason}`);
        // TODO: Log the dispute, investigate, potentially pause access if appropriate.
        break;

      case 'charge.dispute.closed':
        const disputeClosed = eventDataObject as Stripe.Dispute;
        console.log(`WEBHOOK: Dispute closed: ${disputeClosed.id}, Status: ${disputeClosed.status}, for charge: ${disputeClosed.charge}`);
        // TODO: Update records based on dispute outcome (e.g., if lost, access remains revoked; if won, re-evaluate).
        break;

      default:
        console.warn(`WEBHOOK: Unhandled event type ${event.type}`);
    }
  } catch (handlerError: any) {
      console.error(`WEBHOOK_ERROR: Error handling event ${event.type} (ID: ${event.id}):`, handlerError);
      return NextResponse.json({ message: 'Error handling webhook event.', error: handlerError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Webhook received successfully.' }, { status: 200 });
}