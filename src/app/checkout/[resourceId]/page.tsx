// src/app/checkout/[resourceId]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  Container, Typography, Box, Paper, Button, CircularProgress,
  Alert, Grid, Divider, useTheme, alpha, TextField
} from '@mui/material';
import { ArrowBack, CreditCard, Lock, CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import ConsistentPageLayout from '@/components/Shared/ConsistentPageLayout';
import { resourcesData, ResourceData, getTypeIcon } from '@/data/resourcesPageData';

// Stripe Imports - Updated
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import type { PaymentIntent, StripeError } from '@stripe/stripe-js'; // Import types separately
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe.js with your publishable key
// Make sure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in your .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Added type for Stripe confirmPayment response
type StripeConfirmPaymentResponse = {
  error?: StripeError;
  paymentIntent?: PaymentIntent;
};

interface CheckoutFormProps {
  clientSecret: string;
  resource: ResourceData;
  onPaymentSuccess: (paymentIntent: PaymentIntent) => void;
  onPaymentError: (message: string) => void;
}

const StripeCheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, resource, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter(); // For potential redirect after payment

  // Updated handleSubmit function
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!stripe || !elements) {
      setFormError("Stripe.js is not ready. Please wait a moment and try again.");
      return;
    }

    setIsProcessing(true);

    const result: StripeConfirmPaymentResponse = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/payment-status?resourceId=${resource.id}`,
      },
      // redirect: "if_required" // Uncomment if needed
    });

    if (result.error) {
      console.error("Stripe payment confirmation error:", result.error);
      const errorMessage = result.error.message || "An unexpected error occurred during payment.";
      setFormError(errorMessage);
      onPaymentError(errorMessage);
    } else if (result.paymentIntent) {
      console.log("PaymentIntent details:", result.paymentIntent);
      // Handle payment intent status
      if (result.paymentIntent.status === 'succeeded') {
        onPaymentSuccess(result.paymentIntent);
      } else if (result.paymentIntent.status === 'requires_action' || result.paymentIntent.status === 'requires_confirmation') {
        setFormError("Further action is required to complete your payment. You may be redirected.");
        onPaymentError("Further action is required to complete your payment.");
      } else {
        setFormError(`Payment status: ${result.paymentIntent.status}. Please contact support.`);
        onPaymentError(`Payment status: ${result.paymentIntent.status}.`);
      }
    } else {
      // This case implies the user was redirected or the flow is otherwise handled by Stripe.
      // The return_url page will handle the final status.
      console.log("Payment submitted, user may be redirected by Stripe or flow is pending.");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
        Enter Payment Details
      </Typography>
      {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disabled={!stripe || !elements || isProcessing}
        startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <CreditCard />}
        sx={{ mt: 3, py: 1.5, fontWeight: 600, borderRadius: '8px' }}
      >
        {isProcessing ? 'Processing...' : `Pay ${resource.price}`}
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, color: 'text.secondary' }}>
        <Lock fontSize="small" sx={{ mr: 0.5 }} />
        <Typography variant="caption">Secure Payment via Stripe</Typography>
      </Box>
    </form>
  );
};


const CheckoutPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams();

  const [resource, setResource] = useState<ResourceData | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isFetchingClientSecret, setIsFetchingClientSecret] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);


  const resourceId = params?.resourceId as string | undefined;

  useEffect(() => {
    if (resourceId) {
      setIsLoading(true);
      setError(null);
      setClientSecret(null);
      setPaymentStatus(null);
      setPaymentMessage(null);

      setTimeout(() => {
        const foundResource = resourcesData.find(r => r.id === resourceId);
        if (foundResource && foundResource.premium && foundResource.price) {
          setResource(foundResource);
        } else if (foundResource) {
          setError("This resource is not available for purchase or is missing price information.");
          setResource(null);
        } else {
          setError("Resource not found.");
          setResource(null);
        }
        setIsLoading(false);
      }, 500);
    } else {
      setError("Resource ID is missing or invalid.");
      setIsLoading(false);
      setResource(null);
    }
  }, [resourceId]);

  useEffect(() => {
    if (resource && resource.price && !clientSecret && !paymentStatus) {
      const fetchClientSecret = async () => {
        setIsFetchingClientSecret(true);
        setPaymentMessage(null);
        try {
          const response = await fetch('/api/checkout/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resourceId: resource.id }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to initialize payment.');
          }
          const data = await response.json();
          setClientSecret(data.clientSecret);
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Could not initialize payment.";
          setError(msg); // General page error
          setPaymentMessage(msg); // Specific payment related message
        } finally {
          setIsFetchingClientSecret(false);
        }
      };
      fetchClientSecret();
    }
  }, [resource, clientSecret, paymentStatus]);


  if (isLoading) {
    return (
      <ConsistentPageLayout>
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 }, textAlign: 'center' }}>
          <CircularProgress /> <Typography sx={{ mt: 2 }}>Loading checkout...</Typography>
        </Container>
      </ConsistentPageLayout>
    );
  }

  if (error || !resource) { // If general error or resource not found
    return (
      <ConsistentPageLayout>
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
          <Alert severity="error" sx={{ mb: 3 }}>{error || "Could not load resource information."}</Alert>
          <NextLink href="/resources" passHref><Button variant="outlined" startIcon={<ArrowBack />}>Back to Resources</Button></NextLink>
        </Container>
      </ConsistentPageLayout>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <ConsistentPageLayout>
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 }, textAlign: 'center' }}>
          <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircleOutline color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>Payment Successful!</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>You've unlocked: {resource.title}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>{paymentMessage || "Your access will be granted shortly (pending webhook confirmation). Thank you!"}</Typography>
            <NextLink href={resource.link || `/resources/access/${resource.id}`} passHref><Button variant="contained" color="success" size="large" sx={{ mr: 2 }}>Access Resource (Placeholder)</Button></NextLink>
            <NextLink href="/resources" passHref><Button variant="outlined" size="large">Back to Resources</Button></NextLink>
          </Paper>
        </Container>
      </ConsistentPageLayout>
    );
  }
  
  const elementsOptions: StripeElementsOptions = clientSecret ? {
    clientSecret: clientSecret,
    appearance: { theme: theme.palette.mode === 'dark' ? 'night' : 'stripe' },
  } : undefined as any; // Cast to any if clientSecret is null initially, Elements will handle it


  return (
    <ConsistentPageLayout>
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: '16px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <NextLink href="/resources" passHref><Button startIcon={<ArrowBack />} size="small" sx={{ mr: 'auto' }}>Back to Resources</Button></NextLink>
          </Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>Checkout</Typography>
          <Divider sx={{ my: 3 }} />

          {/* Display payment-specific error message if it exists */}
          {paymentStatus === 'error' && paymentMessage && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography fontWeight="bold">Payment Failed</Typography>
              {paymentMessage}
            </Alert>
          )}
          {/* Display general error if no specific payment message and general error exists */}
          {!paymentMessage && error && (
             <Alert severity="error" sx={{ mb: 3 }}>
                {error}
             </Alert>
          )}


          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>Order Summary</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, borderRadius: '8px', background: alpha(theme.palette.primary.main, 0.05) }}>
                {getTypeIcon(resource.type, { sx: { color: theme.palette.primary.main, fontSize: '2rem', mr: 1.5 } })}
                <Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>{resource.title}</Typography>
                  <Typography variant="body2" color="text.secondary">Type: {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>{resource.description}</Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, textAlign: 'left', mb: 1 }}>
                Total: {resource.price}
              </Typography>
            </Grid>

            <Grid item xs={12} md={5}>
              {isFetchingClientSecret && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                  <CircularProgress />
                  <Typography sx={{ mt: 1 }} color="text.secondary">Initializing payment gateway...</Typography>
                </Box>
              )}
              {!isFetchingClientSecret && clientSecret && elementsOptions && (
                <Elements stripe={stripePromise} options={elementsOptions}>
                  <StripeCheckoutForm
                    clientSecret={clientSecret}
                    resource={resource}
                    onPaymentSuccess={(paymentIntent) => {
                        setPaymentStatus('success');
                        setPaymentMessage(`Successfully purchased ${resource.title}! Payment ID: ${paymentIntent.id}`);
                    }}
                    onPaymentError={(msg) => {
                        setPaymentStatus('error');
                        setPaymentMessage(msg); // Set specific payment error message
                    }}
                  />
                </Elements>
              )}
              {/* Display message if clientSecret couldn't be fetched or if there was a payment message already (e.g. from fetchClientSecret error) */}
              {!isFetchingClientSecret && !clientSecret && (
                <Alert severity="warning">
                  {paymentMessage || "Could not initialize payment form. Please try refreshing or contact support."}
                </Alert>
              )}
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Paper>
      </Container>
    </ConsistentPageLayout>
  );
};

export default CheckoutPage;
