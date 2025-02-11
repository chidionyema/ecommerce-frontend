// src/components/SubscriptionModal.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../contexts/AuthContext';

// Load Stripe using your public key (ensure NEXT_PUBLIC_STRIPE_PUBLIC_KEY is set)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface SubscriptionModalProps {
  redirectPath: string;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ redirectPath }) => {
  // Destructure both user and token from your auth context
  const { user, token } = useAuth();
  const router = useRouter();

  const handleSubscribe = async (priceId: string) => {
    // Ensure the user is logged in and we have a token before proceeding.
    if (!user || !token) {
      alert('You must be logged in to subscribe.');
      router.push('/login');
      return;
    }

    try {
      // Call the backend endpoint to create a checkout session
      const response = await fetch('/api/subscription/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ priceId, redirectPath }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not loaded');

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error(error);
        alert(`Stripe Checkout error: ${error.message}`);
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5">Choose Your Plan</Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => handleSubscribe('price_premium_monthly')}
        >
          Monthly Premium - $9.99/month
        </Button>
        <Button
          variant="contained"
          onClick={() => handleSubscribe('price_premium_yearly')}
        >
          Yearly Premium - $99/year
        </Button>
      </Box>
    </Box>
  );
};

export default SubscriptionModal;
