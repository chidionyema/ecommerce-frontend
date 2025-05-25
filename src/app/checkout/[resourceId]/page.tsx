// src/app/checkout/[resourceId]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NextLink from "next/link";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ArrowBack,
  CreditCard,
  Lock,
  CheckCircleOutline,
} from "@mui/icons-material";
import ConsistentPageLayout from "@/components/Shared/ConsistentPageLayout";
import {
  resourcesData,
  ResourceData,
  getTypeIcon,
} from "@/data/resourcesPageData";

// ───────────────────── Stripe ─────────────────────
import { loadStripe } from "@stripe/stripe-js";
import type {
  PaymentIntent,
  StripeError,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type StripeConfirmPaymentResponse = {
  error?: StripeError;
  paymentIntent?: PaymentIntent;
};

/*──────────────── Stripe form component ────────────────*/
interface CheckoutFormProps {
  clientSecret: string;
  resource: ResourceData;
  displayPrice: string;
  onPaymentSuccess: (pi: PaymentIntent) => void;
  onPaymentError: (msg: string) => void;
}

const StripeCheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  resource,
  displayPrice,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setFormError("Stripe.js is not ready. Please try again.");
      return;
    }
    setIsProcessing(true);
    setFormError(null);

    const result: StripeConfirmPaymentResponse = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/payment-status?resourceId=${resource.id}`,
      },
    });

    if (result.error) {
      const msg =
        result.error.message || "An unexpected error occurred during payment.";
      setFormError(msg);
      onPaymentError(msg);
    } else if (result.paymentIntent) {
      const { status } = result.paymentIntent;
      if (status === "succeeded") {
        onPaymentSuccess(result.paymentIntent);
      } else if (
        status === "requires_action" ||
        status === "requires_confirmation"
      ) {
        const msg =
          "Further action is required to complete your payment. You may be redirected.";
        setFormError(msg);
        onPaymentError(msg);
      } else {
        const msg = `Payment status: ${status}. Please contact support.`;
        setFormError(msg);
        onPaymentError(msg);
      }
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
        Enter Payment Details
      </Typography>
      {formError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError}
        </Alert>
      )}
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={!stripe || !elements || isProcessing}
        startIcon={
          isProcessing ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <CreditCard />
          )
        }
        sx={{ mt: 3, py: 1.5, fontWeight: 600, borderRadius: "8px" }}
      >
        {isProcessing ? "Processing…" : `Pay ${displayPrice}`}
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
          color: "text.secondary",
        }}
      >
        <Lock fontSize="small" sx={{ mr: 0.5 }} />
        <Typography variant="caption">Secure Payment via Stripe</Typography>
      </Box>
    </form>
  );
};

/*──────────────── Page component ────────────────*/
const CheckoutPage = () => {
  const theme = useTheme();
  const params = useParams();

  const [resource, setResource] = useState<ResourceData | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [displayPrice, setDisplayPrice] = useState<string | null>(null);
  const [isFetchingClientSecret, setIsFetchingClientSecret] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<"success" | "error" | null>(
    null
  );
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const resourceId = params?.resourceId as string | undefined;

  /*───────── Fetch resource (demo uses static JSON) ─────────*/
  useEffect(() => {
    if (!resourceId) {
      setError("Resource ID is missing or invalid.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setClientSecret(null);
    setPaymentStatus(null);
    setPaymentMessage(null);

    setTimeout(() => {
      const found = resourcesData.find((r) => r.id === resourceId);
      if (found && found.premium && found.price) {
        setResource(found);
      } else if (found) {
        setError(
          "This resource is not available for purchase or is missing price information."
        );
        setResource(null);
      } else {
        setError("Resource not found.");
        setResource(null);
      }
      setIsLoading(false);
    }, 400);
  }, [resourceId]);

  /*───────── Create PaymentIntent ─────────*/
  useEffect(() => {
    if (!resource || !resource.price || clientSecret || paymentStatus) return;

    const fetchPI = async () => {
      try {
        setIsFetchingClientSecret(true);
        const res = await fetch("/api/checkout/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resourceId: resource.id }),
        });
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message);
        }
        const { clientSecret: cs, displayPrice } = await res.json();
        setClientSecret(cs);
        setDisplayPrice(displayPrice);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Failed to initialise payment.";
        setError(msg);
        setPaymentMessage(msg);
      } finally {
        setIsFetchingClientSecret(false);
      }
    };
    fetchPI();
  }, [resource, clientSecret, paymentStatus]);

  /*───────── Derived price (non-nullable) ─────────*/
  const effectivePrice: string =
    displayPrice ?? resource?.price ?? "$0.00";

  /*───────── Loading / error / success guards ─────────*/
  if (isLoading) {
    return (
      <ConsistentPageLayout>
        <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading checkout…</Typography>
        </Container>
      </ConsistentPageLayout>
    );
  }

  if (error || !resource) {
    return (
      <ConsistentPageLayout>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Could not load resource information."}
          </Alert>
          <NextLink href="/resources" passHref>
            <Button variant="outlined" startIcon={<ArrowBack />}>
              Back to Resources
            </Button>
          </NextLink>
        </Container>
      </ConsistentPageLayout>
    );
  }

  if (paymentStatus === "success") {
    return (
      <ConsistentPageLayout>
        <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CheckCircleOutline
              color="success"
              sx={{ fontSize: 60, mb: 2 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "success.main", mb: 1 }}
            >
              Payment Successful!
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              You've unlocked: {resource.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {paymentMessage ||
                "Your access will be granted shortly (pending webhook confirmation). Thank you!"}
            </Typography>

            <NextLink
              href={resource.link || `/resources/access/${resource.id}`}
              passHref
            >
              <Button variant="contained" color="success" sx={{ mr: 2 }}>
                Access Resource
              </Button>
            </NextLink>

            <NextLink href="/resources" passHref>
              <Button variant="outlined">Back to Resources</Button>
            </NextLink>
          </Paper>
        </Container>
      </ConsistentPageLayout>
    );
  }

  /*───────── Stripe Elements options ─────────*/
  const uiTheme: "stripe" | "night" =
    theme.palette.mode === "dark" ? "night" : "stripe";

  const elementsOptions: StripeElementsOptions | undefined = clientSecret
    ? {
        clientSecret,
        appearance: { theme: uiTheme },
      }
    : undefined;

  /*───────── Main UI ─────────*/
  return (
    <ConsistentPageLayout>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          elevation={3}
          sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: "16px" }}
        >
          <Box sx={{ mb: 2 }}>
            <NextLink href="/resources" passHref>
              <Button startIcon={<ArrowBack />} size="small">
                Back to Resources
              </Button>
            </NextLink>
          </Box>

          <Typography
            variant="h4"
            sx={{ fontWeight: 600, textAlign: "center", mb: 2 }}
          >
            Checkout
          </Typography>
          <Divider sx={{ my: 3 }} />

          {paymentStatus === "error" && paymentMessage && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography fontWeight="bold">Payment Failed</Typography>
              {paymentMessage}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Order summary */}
            <Grid item xs={12} md={7}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                Order Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  p: 2,
                  borderRadius: "8px",
                  background: alpha(theme.palette.primary.main, 0.05),
                }}
              >
                {getTypeIcon(resource.type, {
                  sx: {
                    color: theme.palette.primary.main,
                    fontSize: "2rem",
                    mr: 1.5,
                  },
                })}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {resource.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Type:{" "}
                    {resource.type.charAt(0).toUpperCase() +
                      resource.type.slice(1)}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ mb: 2 }}>{resource.description}</Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  mb: 1,
                }}
              >
                Total: {effectivePrice}
              </Typography>
            </Grid>

            {/* Payment form */}
            <Grid item xs={12} md={5}>
              {isFetchingClientSecret && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                  <Typography sx={{ mt: 1 }} color="text.secondary">
                    Initialising payment gateway…
                  </Typography>
                </Box>
              )}

              {!isFetchingClientSecret &&
                clientSecret &&
                elementsOptions && (
                  <Elements
                    stripe={stripePromise}
                    options={elementsOptions}
                  >
                    <StripeCheckoutForm
                      clientSecret={clientSecret}
                      resource={resource}
                      displayPrice={effectivePrice}
                      onPaymentSuccess={(pi) => {
                        setPaymentStatus("success");
                        setPaymentMessage(
                          `Successfully purchased ${resource.title}! Payment ID: ${pi.id}`
                        );
                      }}
                      onPaymentError={(msg) => {
                        setPaymentStatus("error");
                        setPaymentMessage(msg);
                      }}
                    />
                  </Elements>
                )}

              {!isFetchingClientSecret && !clientSecret && (
                <Alert severity="warning">
                  {paymentMessage ||
                    "Could not initialise payment form. Please try again later or contact support."}
                </Alert>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            By proceeding, you agree to our Terms of Service and Privacy
            Policy.
          </Typography>
        </Paper>
      </Container>
    </ConsistentPageLayout>
  );
};

export default CheckoutPage;
