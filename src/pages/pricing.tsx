'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  alpha,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import {
  Info,
  Award,
  Clock,
  Users,
  Calendar,
  Briefcase,
} from 'lucide-react';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';

const PremiumCard = styled(motion.div)(({ theme }) => ({
  borderRadius: 24,
  overflow: 'hidden',
  minHeight: 540,
  maxWidth: 420,
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(145deg, #1F1B24 0%, #3D3A45 100%)`,
  border: `2px solid ${alpha(theme.palette.secondary.main, 0.8)}`,
  backdropFilter: 'blur(18px) saturate(180%)',
  boxShadow: `
    0 12px 24px ${alpha(theme.palette.primary.dark, 0.6)},
    inset 0 0 0 1px ${alpha(theme.palette.secondary.main, 0.4)}
  `,
  position: 'relative',
  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 24px 48px ${alpha(theme.palette.primary.dark, 0.8)}`,
  },
}));

interface FeatureItemProps {
  icon: React.ElementType;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, text }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.5,
        px: 2,
        backgroundColor: alpha(theme.palette.divider, 0.1),
        borderRadius: '12px',
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
};

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

  const handlePlanClick = (type: string) => {
    router.push(`/contact?plan=${type}`);
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Grid container spacing={6} sx={{ mt: 6, px: { xs: 2, md: 6 } }}>
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
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <PremiumCard>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                  {title}
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {features.map((feature, i) => (
                    <FeatureItem key={i} {...feature} />
                  ))}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mt: 4,
                    color: theme.palette.primary.light,
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
                    borderRadius: '12px',
                    px: 4,
                    py: 1.2,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.85
                      )}, ${alpha(theme.palette.secondary.main, 0.85)})`,
                      boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.5)}`,
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
      </motion.div>
    </LazyMotion>
  );
};

const PricingPage: React.FC = () => {
  return (
    <ConsistentPageLayout
      seoTitle="Pricing Plans - Premium Solutions"
      seoDescription="Discover our flexible pricing plans tailored to accelerate your success."
      seoKeywords="pricing plans, consulting rates, enterprise pricing, technology consulting"
      subtitle="Choose the plan that best fits your growth strategy."
    >
      <PricingGrid />
    </ConsistentPageLayout>
  );
};

export default PricingPage;
