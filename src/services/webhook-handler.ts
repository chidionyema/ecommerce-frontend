// File: services/webhook-handler.ts
import Stripe from 'stripe';
import { getSession } from 'next-auth/react';
import { fetchWithAuth } from '../utils/api';

/**
 * Process different types of Stripe webhook events
 */
export async function handleWebhookEvent(event: Stripe.Event): Promise<boolean> {
  try {
    console.log(`Processing webhook event: ${event.type}`);
    
    switch (event.type) {
      case 'checkout.session.completed':
        return await handleCheckoutSessionCompleted(event);
      
      case 'invoice.payment_succeeded':
        return await handleInvoicePaymentSucceeded(event);
      
      case 'customer.subscription.updated':
        return await handleSubscriptionUpdated(event);
      
      case 'customer.subscription.deleted':
        return await handleSubscriptionDeleted(event);
      
      case 'payment_intent.succeeded':
        return await handlePaymentIntentSucceeded(event);
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
        return true; // Return true for unhandled events to acknowledge receipt
    }
  } catch (error) {
    console.error(`Error processing webhook event ${event.type}:`, error);
    throw error; // Rethrow to allow the caller to handle it
  }
}

/**
 * Handle checkout.session.completed events
 * This is triggered when a customer completes the checkout process
 */
async function handleCheckoutSessionCompleted(event: Stripe.Event): Promise<boolean> {
  const session = event.data.object as Stripe.Checkout.Session;
  const sessionId = session.id;
  
  console.log(`Processing checkout session: ${sessionId}`);
  
  // Determine if this is a subscription or one-time payment
  if (session.mode === 'subscription') {
    // This is a subscription checkout
    return await notifyBackendOfSubscriptionCheckout(session);
  } else {
    // This is a one-time payment
    return await notifyBackendOfOneTimeCheckout(session);
  }
}

/**
 * Handle invoice.payment_succeeded events
 * This is triggered when a subscription invoice is paid
 */
async function handleInvoicePaymentSucceeded(event: Stripe.Event): Promise<boolean> {
  const invoice = event.data.object as Stripe.Invoice;
  
  // Only process subscription invoices
  if (invoice.subscription) {
    console.log(`Processing invoice payment for subscription: ${invoice.subscription}`);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription/webhook-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_WEBHOOK_KEY || '',
        },
        body: JSON.stringify({
          subscriptionId: invoice.subscription,
          status: 'active',
          invoiceId: invoice.id,
          amount: invoice.amount_paid / 100, // Convert from cents
          paymentDate: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process invoice payment: ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error processing invoice payment:', error);
      throw error;
    }
  }
  
  return true;
}

/**
 * Handle customer.subscription.updated events
 * This is triggered when a subscription is updated
 */
async function handleSubscriptionUpdated(event: Stripe.Event): Promise<boolean> {
  const subscription = event.data.object as Stripe.Subscription;
  console.log(`Processing subscription update: ${subscription.id}`);
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription/webhook-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_WEBHOOK_KEY || '',
      },
      body: JSON.stringify({
        subscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        customerId: subscription.customer,
        metadata: subscription.metadata,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update subscription: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

/**
 * Handle customer.subscription.deleted events
 * This is triggered when a subscription is canceled
 */
async function handleSubscriptionDeleted(event: Stripe.Event): Promise<boolean> {
  const subscription = event.data.object as Stripe.Subscription;
  console.log(`Processing subscription cancellation: ${subscription.id}`);
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription/webhook-cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_WEBHOOK_KEY || '',
      },
      body: JSON.stringify({
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        metadata: subscription.metadata,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to cancel subscription: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

/**
 * Handle payment_intent.succeeded events
 * This is triggered when a payment intent is successfully completed
 */
async function handlePaymentIntentSucceeded(event: Stripe.Event): Promise<boolean> {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  console.log(`Processing payment intent: ${paymentIntent.id}`);
  
  // Only process payment intents with metadata
  if (paymentIntent.metadata && paymentIntent.metadata.orderId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Checkout/payment-success`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_WEBHOOK_KEY || '',
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          orderId: paymentIntent.metadata.orderId,
          amount: paymentIntent.amount / 100, // Convert from cents
          status: paymentIntent.status,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process payment success: ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error processing payment success:', error);
      throw error;
    }
  }
  
  return true;
}

/**
 * Notify the backend of a completed subscription checkout
 */
async function notifyBackendOfSubscriptionCheckout(session: Stripe.Checkout.Session): Promise<boolean> {
  try {
    // Extract user ID from metadata
    const userId = session.metadata?.userId;
    if (!userId) {
      throw new Error('No user ID found in session metadata');
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription/webhook-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_WEBHOOK_KEY || '',
      },
      body: JSON.stringify({
        userId,
        sessionId: session.id,
        subscriptionId: session.subscription,
        status: 'active',
        customerId: session.customer,
        metadata: session.metadata,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to process subscription checkout: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error processing subscription checkout:', error);
    throw error;
  }
}

/**
 * Notify the backend of a completed one-time checkout
 */
async function notifyBackendOfOneTimeCheckout(session: Stripe.Checkout.Session): Promise<boolean> {
  try {
    // For one-time checkouts, we need to notify our payment processing service
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Checkout/session-completed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_WEBHOOK_KEY || '',
      },
      body: JSON.stringify({
        sessionId: session.id,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
        customerEmail: session.customer_details?.email,
        customerId: session.customer,
        metadata: session.metadata,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to process one-time checkout: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error processing one-time checkout:', error);
    throw error;
  }
}