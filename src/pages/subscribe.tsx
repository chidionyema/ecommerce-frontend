// src/pages/subscribe.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../contexts/AuthContext';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import { getSharedStyles, SPACING } from '../utils/sharedStyles';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const SubscribePage: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  // Use 'subscribe' instead of 'createCheckoutSession'
  const { user, isSubscribed, subscribe } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const styles = getSharedStyles(theme);

  useEffect(() => {
    if (user && isSubscribed) {
      const redirect = router.query.redirect as string;
      if (redirect) {
        router.push(redirect);
      } else {
        router.push('/resources');
      }
    }
  }, [user, isSubscribed, router]);

  const handleSubscribe = async (priceId: string) => {
    setLoading(true);
    setError('');
    try {
      // Call the subscribe function from the auth context.
      await subscribe(priceId);
      // The subscribe function handles the redirection to Stripe checkout.
    } catch (err: any) {
      setError(err.message || 'Failed to create checkout session');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <ConsistentPageLayout
        seoTitle="Subscribe"
        seoDescription="Subscribe to access premium resources."
        title="Subscribe to Access Premium Resources"
        subtitle="Unlock exclusive content, in-depth guides, and production-ready code examples."
      >
        <PageSection>
          <Container maxWidth="md">
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: SPACING.large }}
            >
              You need to be logged in to subscribe. Please{' '}
              <NextLink href="/login" passHref legacyBehavior>
                <Button
                  component="a"
                  variant="text"
                  color="primary"
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  log in
                </Button>
              </NextLink>{' '}
              first.
            </Typography>
          </Container>
        </PageSection>
      </ConsistentPageLayout>
    );
  }

  return (
    <ConsistentPageLayout
      seoTitle="Subscribe"
      seoDescription="Subscribe to access premium resources."
      title="Subscribe to Access Premium Resources"
      subtitle="Unlock exclusive content, in-depth guides, and production-ready code examples."
    >
      <PageSection>
        <Container maxWidth="sm">
          {error && (
            <Typography variant="body2" color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}
          {/* Replace with your actual subscription plans and pricing */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleSubscribe('price_123abc')} // Replace with your actual price ID
              disabled={loading}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Subscribe - $10/month'
              )}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleSubscribe('price_456def')} // Replace with your actual price ID
              disabled={loading}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Subscribe - $50/year'
              )}
            </Button>
          </Box>
        </Container>
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default SubscribePage;
