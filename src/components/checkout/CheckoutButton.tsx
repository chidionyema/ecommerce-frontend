import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../../contexts/AuthContext';

interface Product {
  id: string;
  name: string;
  quantity?: number;
}

interface SubscriptionPlan {
  priceId: string;
}

interface CheckoutButtonProps {
  label: string;
  products?: Product[];
  subscriptionPlan?: SubscriptionPlan;
  disabled?: boolean;
  className?: string;
  redirectPath?: string;
}

export default function CheckoutButton({
  label,
  products,
  subscriptionPlan,
  disabled = false,
  className = '',
  redirectPath
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }

    if (disabled || isLoading) return;

    setIsLoading(true);
    try {
      // Determine checkout type and prepare items
      const isSubscription = !!subscriptionPlan;
      const items = isSubscription 
        ? [{ priceId: subscriptionPlan.priceId }]
        : products?.map(p => ({ productId: p.id, quantity: p.quantity || 1 })) || [];

      // Call our Next.js API route that will handle the backend communication
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          type: isSubscription ? 'subscription' : 'one-time',
          redirectPath
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout failed');
      }

      const data = await response.json();
      
      // Redirect to Stripe checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Failed to start checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      className={`${className} ${
        isLoading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Processing...' : label}
    </button>
  );
}