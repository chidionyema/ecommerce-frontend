'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
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
import { sharedCardBackground } from '../utils/sharedStyles';

import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyPartner } from '../components/Common/WhyPartner';
import { ServicesGrid } from '../components/Common/ServicesGrid'; // Use named import
import { TestimonialsSection } from '../components/Common/TestimonialsSection'; // Use named import


const PremiumCard = styled(motion.div)(({ theme }) => ({
  borderRadius: 24,
  overflow: 'hidden',
  minHeight: 540, // Ensures all cards remain the same height
  maxWidth: 420,
  width: '100%', // Ensures consistent width across screens
  display: 'flex',
  flexDirection: 'column',
  background: sharedCardBackground(theme),
  border: `2px solid rgba(255, 255, 255, 0.1)`,
  backdropFilter: 'blur(18px) saturate(180%)',
  boxShadow: `
    0 12px 24px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1)
  `,
  position: 'relative',
  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 24px 48px rgba(0, 0, 0, 0.6)`,
  },
}));

interface FeatureItemProps {
  icon: React.ElementType;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.5,
        px: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transform: 'scale(1.05)',
        },
      }}
    >
      <Icon style={{ color: '#FFFFFF', fontSize: '1.7rem' }} />
      <Typography
        variant="body2"
        sx={{
          ml: 2,
          fontWeight: 500,
          color: '#FFFFFF',
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
        <Grid 
          container 
          spacing={6} 
          sx={{ 
            mt: 6, 
            px: { xs: 2, md: 6 }, 
            alignItems: 'stretch', // Ensures all cards stretch evenly
            justifyContent: 'center',
          }}
        >
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
              sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}
            >
              <PremiumCard sx={{ height: '100%', width: '100%' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: '#FFFFFF' }}>
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
                    color: '#FFD700',
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
                    background: sharedCardBackground(theme),
                    color: '#FFFFFF',
                    fontWeight: 700,
                    borderRadius: '12px',
                    px: 4,
                    py: 1.2,
                    '&:hover': {
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3))`,
                      boxShadow: `0 6px 16px rgba(255, 255, 255, 0.3)`,
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
      {/* PricingGrid with margin-bottom */}
      <Box sx={{ mb: 30 }}> {/* Add margin-bottom to PricingGrid */}
        <PricingGrid />
      </Box>

      {/* WhyPartner with margin-bottom */}
      <Box> {/* Add margin-bottom to WhyPartner */}
        <WhyPartner />
      </Box>

      {/* ServicesGrid with margin-bottom */}
      <Box> {/* Add margin-bottom to ServicesGrid */}
        <ServicesGrid />
      </Box>

      {/* TestimonialsSection with margin-bottom */}
      <Box> {/* Add margin-bottom to TestimonialsSection */}
        <TestimonialsSection />
      </Box>
    </ConsistentPageLayout>
  );
};

export default PricingPage;
