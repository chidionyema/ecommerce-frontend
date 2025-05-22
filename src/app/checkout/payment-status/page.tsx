// src/app/checkout/payment-status/page.tsx
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import { CheckCircleOutline, ErrorOutline, InfoOutlined, ArrowBack } from '@mui/icons-material';
import ConsistentPageLayout from '@/components/Shared/ConsistentPageLayout'; // Adjust path as needed

// Stripe Imports
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe.js with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentStatusDisplay = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to read URL query parameters

  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'succeeded' | 'processing' | 'requires_payment_method' | 'error'>('loading');
  const [resourceId, setResourceId] = useState<string | null>(null);
  const [resourceTitle, setResourceTitle] = useState<string | null>(null); // Optional: for better messaging

  useEffect(() => {
    stripePromise.then(setStripe);
  }, []);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get('payment_intent_client_secret');
    const paymentIntentId = searchParams.get('payment_intent');
    const redirectedResourceId = searchParams.get('resourceId'); // Get resourceId from URL

    setResourceId(redirectedResourceId); // Store resourceId for linking back or fetching title

    if (!clientSecret) {
      setStatus('error');
      setMessage('Payment information is missing. Please try again or contact support.');
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent, error }) => {
      if (error) {
        setStatus('error');
        setMessage(error.message || 'An error occurred while retrieving payment status.');
        console.error("Error retrieving PaymentIntent:", error);
        return;
      }

      if (!paymentIntent) {
        setStatus('error');
        setMessage('Could not retrieve payment details. Please contact support.');
        return;
      }
      
      // Optional: Fetch resource title for better messaging if needed
      // For now, we'll just use the ID
      if (redirectedResourceId) {
          // You could fetch resource title here if you want more descriptive messages
          // e.g., const res = await fetch(`/api/resources/${redirectedResourceId}`); ...
          setResourceTitle(`Resource (ID: ${redirectedResourceId})`); // Placeholder
      }


      switch (paymentIntent.status) {
        case 'succeeded':
          setStatus('succeeded');
          setMessage('Your payment was successful! Thank you for your purchase.');
          // IMPORTANT: Do NOT grant access to the resource here.
          // Access should be granted via your backend webhook handler.
          break;
        case 'processing':
          setStatus('processing');
          setMessage('Your payment is processing. We will update you shortly.');
          break;
        case 'requires_payment_method':
          setStatus('requires_payment_method');
          setMessage('Payment failed. Please try another payment method.');
          // Optionally, redirect back to the checkout page with an error message
          // router.push(`/checkout/${redirectedResourceId}?error=payment_failed`);
          break;
        default:
          setStatus('error');
          setMessage('Something went wrong with your payment. Please contact support.');
          console.warn('Unhandled PaymentIntent status:', paymentIntent.status);
          break;
      }
    });
  }, [stripe, searchParams, router]);

  const renderIcon = () => {
    switch (status) {
      case 'succeeded':
        return <CheckCircleOutline color="success" sx={{ fontSize: 60, mb: 2 }} />;
      case 'processing':
        return <InfoOutlined color="info" sx={{ fontSize: 60, mb: 2 }} />;
      case 'requires_payment_method':
      case 'error':
        return <ErrorOutline color="error" sx={{ fontSize: 60, mb: 2 }} />;
      default: // loading
        return <CircularProgress sx={{ mb: 2 }} />;
    }
  };

  const renderMessage = () => {
    let title = "Processing Payment...";
    let alertSeverity: "success" | "info" | "warning" | "error" = "info";

    if (status === 'succeeded') {
        title = "Payment Successful!";
        alertSeverity = "success";
    } else if (status === 'processing') {
        title = "Payment Processing";
        alertSeverity = "info";
    } else if (status === 'requires_payment_method') {
        title = "Payment Failed";
        alertSeverity = "warning";
    } else if (status === 'error') {
        title = "Payment Error";
        alertSeverity = "error";
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: `${alertSeverity}.main` }}>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {message || (status === 'loading' && "Retrieving payment status...")}
            </Typography>
            {status === 'succeeded' && resourceTitle && (
                <Typography variant="h6" sx={{ mb: 3 }}>
                    For: {resourceTitle}
                </Typography>
            )}
        </Box>
    );
  }

  return (
    <ConsistentPageLayout>
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {renderIcon()}
          {renderMessage()}
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
            {status === 'succeeded' && resourceId && (
              <NextLink href={`/resources/access/${resourceId}`} passHref> {/* Hypothetical access page */}
                <Button variant="contained" color="primary" size="large">
                  Access Your Resource
                </Button>
              </NextLink>
            )}
            {(status === 'requires_payment_method' || status === 'error') && resourceId && (
              <NextLink href={`/checkout/${resourceId}`} passHref>
                <Button variant="contained" color="primary" size="large">
                  Try Payment Again
                </Button>
              </NextLink>
            )}
            <NextLink href="/resources" passHref>
              <Button variant="outlined" size="large" startIcon={<ArrowBack />}>
                Back to Resources
              </Button>
            </NextLink>
          </Box>
        </Paper>
      </Container>
    </ConsistentPageLayout>
  );
};

// Wrap with Suspense because useSearchParams() needs it for server-side rendering compatibility
const PaymentStatusPage = () => {
    return (
        <Suspense fallback={<LoadingState />}>
            <PaymentStatusDisplay />
        </Suspense>
    );
};

const LoadingState = () => (
    <ConsistentPageLayout>
        <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <CircularProgress />
            <Typography sx={{mt: 2}}>Loading Status...</Typography>
        </Container>
    </ConsistentPageLayout>
);

export default PaymentStatusPage;
