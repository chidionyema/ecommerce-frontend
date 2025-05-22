// src/app/api/webhooks/stripe/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

// Initialize Stripe with correct beta version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// --- Database functions ---
const grantAccessToResource = async (
  userId: string, 
  resourceId: string,
  paymentIntentId: string
) => {
  console.log(`Granting access to ${resourceId} for user ${userId}`);
  return { success: true };
};

const revokeAccessToResource = async (
  userId: string,
  resourceId: string,
  reason: string,
  stripeObjectId: string
) => {
  console.log(`Revoking access from ${resourceId} for user ${userId}`);
  return { success: true };
};

const findUserByCustomerId = async (
  customerId: string
) => {
  return { id: 'user_123', email: 'user@example.com' };
};

const handleSubscriptionUpdate = async (subscription: Stripe.Subscription) => {
  const customerId = typeof subscription.customer === 'string' 
    ? subscription.customer 
    : subscription.customer.id;
  const user = await findUserByCustomerId(customerId);
  if (user) {
    console.log(`Updated subscription ${subscription.id} for ${user.email}`);
  }
};
// --- End database functions ---

export async function POST(request: Request) {
  const body = await request.text();
  
  // CORRECT HEADER ACCESS PATTERN
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!webhookSecret) {
    console.error('WEBHOOK_ERROR: Stripe webhook secret not configured.');
    return NextResponse.json(
      { message: 'Webhook secret not configured.' }, 
      { status: 500 }
    );
  }

  if (!signature) {
    console.error('WEBHOOK_ERROR: Missing Stripe signature.');
    return NextResponse.json(
      { message: 'Missing Stripe signature.' }, 
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`WEBHOOK_ERROR: Signature verification failed: ${err.message}`);
    return NextResponse.json(
      { message: `Webhook Error: ${err.message}` }, 
      { status: 400 }
    );
  }

  console.log(`WEBHOOK: Received event ${event.id} (${event.type})`);

  try {
    const eventData = event.data.object as any;

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = eventData as Stripe.PaymentIntent;
        // Handle payment success
        break;

      case 'checkout.session.completed':
        const session = eventData as Stripe.Checkout.Session;
        // Handle checkout completion
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.created':
        const subscription = eventData as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;

      // Add other event handlers as needed

      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
  } catch (err: any) {
    console.error(`WEBHOOK_ERROR: Event handling failed: ${err.message}`);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { received: true }, 
    { status: 200 }
  );
}