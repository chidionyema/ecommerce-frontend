// pricing.tsx
'use client';

import { useCallback, memo } from 'react';
import {
  useTheme,
  Grid,
  Button,
  alpha,
  styled,
  Typography,
  Box,
} from '@mui/material';
import { Info, Award, Clock, Users, Calendar, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import SEO from '../components/SEO';
import PageLayout from '../components/Shared/PageLayout';
import PageHeader from '../components/Shared/PageHeader';

// PremiumCard with softer shape and enhanced shadows
const PremiumCard = styled(motion.div)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  minHeight: 520,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.mode === 'dark'? alpha(theme.palette.primary.dark, 0.2): theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  boxShadow: theme.palette.mode === 'dark'? `0 2px 8px ${alpha(theme.palette.primary.dark, 0.5)}`: `0 12px 32px ${alpha(theme.palette.grey, 0.2)}`,
  position: 'relative',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.palette.mode === 'dark'? `0 4px 12px ${alpha(theme.palette.primary.dark, 0.8)}`: `0 18px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

// FeatureItem with scaling hover effect
const FeatureItem = memo(({ icon: Icon, text }: { icon: any; text: string }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.5,
        px: 2,
        backgroundColor: alpha(theme.palette.divider, 0.12),
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: alpha(theme.palette.divider, 0.2),
          transform: 'scale(1.05)',
        },
      }}
    >
      <Icon style={{ color: theme.palette.secondary.main, fontSize: '1.7rem' }} />
      <Typography
        variant="body2"
        sx={{
          ml: 2,
          fontWeight: 500,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
});

const plans = [
  {
    type: 'hourly',
    title: 'Expert Consultation',
    features: [
      { icon: Clock, text: 'Flexible hourly consulting' },
      { icon: Award, text: 'Expert technical guidance' },
      { icon: Calendar, text: 'Priority scheduling' },
    ],
    price: '$295/hr',
  },
  {
    type: 'project',
    title: 'Managed Solutions',
    features: [
      { icon: Briefcase, text: 'End-to-end project management' },
      { icon: Users, text: 'Dedicated engineering team' },
      { icon: Award, text: 'Quality assurance guarantee' },
    ],
    price: 'Custom Quote',
  },
  {
    type: 'retainer',
    title: 'Strategic Partnership',
    features: [
      { icon: Users, text: '24/7 technical support' },
      { icon: Award, text: 'Strategic technology roadmap' },
      { icon: Info, text: 'Monthly performance reviews' },
    ],
    price: 'Starting at $15k/mo',
  },
];

const PricingGrid: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const handlePlanClick = useCallback((type: string) => {
    router.push(`/contact?plan=${type}`);
  }, [router]);

  return (
    <LazyMotion features={domAnimation}>
      <>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageHeader
            title="Unlock Your Business Potential"
            subtitle="Choose the plan that best fits your growth strategy."
          />
        </motion.div>

        <Grid container spacing={6} sx={{ mt: 2 }}>
          {plans.map(({ type, title, features, price }, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={type}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <PremiumCard>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                  {title}
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {features.map((feature, i) => (
                    <FeatureItem key={i} {...feature} />
                  ))}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mt: 4,
                    color: theme.palette.primary.main,
                    fontSize: '1.4rem',
                  }}
                >
                  {price}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: theme.palette.common.white,
                    fontWeight: 700,
                    borderRadius: '8px',
                    px: 4,
                    py: 1.2,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)}, ${alpha(theme.palette.secondary.main, 0.85)})`,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.5)}`,
                    },
                  }}
                  onClick={() => handlePlanClick(type)}
                >
                  Get Started
                </Button>
              </PremiumCard>
            </Grid>
          ))}
        </Grid>
      </>
    </LazyMotion>
  );
};

const PricingPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Pricing Plans - Premium Solutions"
        description="Discover our flexible pricing plans tailored to accelerate your success."
        keywords="pricing plans, consulting rates, enterprise pricing, technology consulting"
      />
      <PageLayout>
        <PricingGrid />
      </PageLayout>
    </>
  );
};

export default PricingPage;