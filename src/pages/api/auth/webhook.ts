// File: pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

// Disable bodyParser to get the raw body for Stripe webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia', // Updated to the required API version
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract user ID from metadata
        const userId = session.metadata?.userId;
        if (!userId) {
          throw new Error('No user ID found in session metadata');
        }
        
        // Update user's subscription status in your database
        await updateUserSubscription(userId, session);
        
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Handle successful payment for subscription renewal
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          const userId = subscription.metadata?.userId;
          
          if (userId) {
            await updateSubscriptionStatus(userId, subscription);
          }
        }
        
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        
        if (userId) {
          await updateSubscriptionStatus(userId, subscription);
        }
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        
        if (userId) {
          await cancelUserSubscription(userId);
        }
        
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.status(200).json({ received: true });
  } catch (err) {
    console.error(`Error processing webhook: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}

// Helper functions that would connect to your database
async function updateUserSubscription(userId: string, session: Stripe.Checkout.Session) {
  // In a real implementation, this would update your database
  console.log(`Updating subscription for user ${userId} from session ${session.id}`);
  
  // Call your backend API to update the subscription
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription/webhook-update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_WEBHOOK_KEY || '',
    },
    body: JSON.stringify({
      userId,
      sessionId: session.id,
      status: 'active',
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update subscription: ${response.statusText}`);
  }
}

async function updateSubscriptionStatus(userId: string, subscription: Stripe.Subscription) {
  // In a real implementation, this would update your database
  console.log(`Updating subscription status for user ${userId}: ${subscription.status}`);
  
  // Call your backend API to update the subscription status
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription/webhook-update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_WEBHOOK_KEY || '',
    },
    body: JSON.stringify({
      userId,
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update subscription status: ${response.statusText}`);
  }
}

async function cancelUserSubscription(userId: string) {
  // In a real implementation, this would update your database
  console.log(`Canceling subscription for user ${userId}`);
  
  // Call your backend API to cancel the subscription
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription/webhook-cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_WEBHOOK_KEY || '',
    },
    body: JSON.stringify({
      userId,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to cancel subscription: ${response.statusText}`);
  }
}