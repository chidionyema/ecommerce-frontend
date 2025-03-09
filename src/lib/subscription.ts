// File: lib/subscription.ts
// This file handles subscription management with Stripe

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Get the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.local.ritualworks.com';
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

let stripePromise: Promise<Stripe | null>;

/**
 * Get the Stripe instance (singleton pattern)
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

/**
 * Get the current user's subscription status
 */
export async function getSubscriptionStatus() {
  try {
    const response = await fetch(`${API_URL}/api/Subscription/status`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to get subscription status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return { isSubscribed: false, error: 'Failed to check subscription status' };
  }
}

/**
 * Create a checkout session for a subscription
 */
export async function createCheckoutSession(priceId: string, redirectPath: string = '/account') {
  try {
    const response = await fetch(`${API_URL}/api/Subscription/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        redirectPath,
      }),
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create checkout session');
    }
    
    const { sessionId } = await response.json();
    
    // Redirect to Stripe Checkout
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }
    
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to start subscription process'
    };
  }
}

/**
 * Cancel the current subscription
 */
export async function cancelSubscription() {
  try {
    const response = await fetch(`${API_URL}/api/Subscription/cancel`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to cancel subscription');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to cancel subscription'
    };
  }
}

/**
 * Get the user's subscription details including plan info and billing dates
 */
export async function getSubscriptionDetails() {
  try {
    const response = await fetch(`${API_URL}/api/Subscription/details`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to get subscription details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting subscription details:', error);
    return { error: 'Failed to load subscription details' };
  }
}

/**
 * Update the user's payment method
 */
export async function updatePaymentMethod() {
  try {
    const response = await fetch(`${API_URL}/api/Subscription/update-payment-method`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update payment method');
    }
    
    const { sessionId } = await response.json();
    
    // Redirect to Stripe Checkout
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }
    
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating payment method:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update payment method'
    };
  }
}