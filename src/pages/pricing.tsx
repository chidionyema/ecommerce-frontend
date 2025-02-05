'use client';

import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GoldCard from '../components/GoldCard';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyChooseUs } from '../components/Common/WhyChooseUs';
import { ServicesGrid } from '../components/Common/ServicesGrid';
import { TestimonialsSection } from '../components/Common/TestimonialsSection';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import { CARD_GRID_CONFIG } from '../utils/sharedStyles';

interface FeatureItemProps {
  icon: React.ElementType;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, text }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      py: 1,
      px: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      mb: 1,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderRadius: '50%',
        width: 40,
        height: 40,
        mr: 1,
      }}
    >
      <Icon sx={{ fontSize: 20, color: '#FFD700' }} />
    </Box>
    <Typography variant="body2" sx={{ fontWeight: 500, color: '#FFF' }}>
      {text}
    </Typography>
  </Box>
);

const plans = [
  {
    type: 'hourly',
    title: 'Expert Consultation',
    features: [
      { icon: AccessTimeIcon, text: 'Flexible hourly consulting' },
      { icon: EmojiEventsIcon, text: 'Expert technical guidance' },
      { icon: CalendarTodayIcon, text: 'Priority scheduling' },
    ],
    price: '$295/hr',
  },
  {
    type: 'project',
    title: 'Managed Solutions',
    features: [
      { icon: WorkIcon, text: 'End-to-end project management' },
      { icon: GroupIcon, text: 'Dedicated engineering team' },
      { icon: EmojiEventsIcon, text: 'Quality assurance guarantee' },
    ],
    price: 'Custom Quote',
  },
  {
    type: 'retainer',
    title: 'Strategic Partnership',
    features: [
      { icon: GroupIcon, text: '24/7 technical support' },
      { icon: InfoIcon, text: 'Strategic technology roadmap' },
      { icon: EmojiEventsIcon, text: 'Monthly performance reviews' },
    ],
    price: 'Starting at $15k/mo',
  },
];

const PricingPage: React.FC = () => {
  const router = useRouter();

  const handlePlanClick = (type: string) => {
    router.push(`/contact?plan=${type}`);
  };

  return (
    <ConsistentPageLayout
      seoTitle="Fuel Your Startup's Growth: Premium Tech Consulting Pricing"
      seoDescription="Unlock your startup's full potential with our tailored pricing plans. Our expert consultants provide the guidance and support you need to succeed."
      title="Flexible Plans for Every Need."
      subtitle="Choose the plan that aligns with your ambitious vision."
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          mt: 8,
          p: 8,
        }}
      >
        <Grid
          container
          spacing={CARD_GRID_CONFIG.container.spacing}
          sx={CARD_GRID_CONFIG.container.sx}
        >
          {plans.map((plan) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={plan.type}
              sx={CARD_GRID_CONFIG.item.sx}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <GoldCard href="#">
                  <Box sx={{ flex: 1, textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#FFF' }}>
                      {plan.title}
                    </Typography>
                    {plan.features.map((feature, i) => (
                      <FeatureItem key={i} icon={feature.icon} text={feature.text} />
                    ))}
                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 2, color: '#FFF' }}>
                      {plan.price}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handlePlanClick(plan.type)}
                      sx={{ mt: 2 }}
                    >
                      Launch Your Vision
                    </Button>
                  </Box>
                </GoldCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mb: 30, mt: 30 }} />
      <TechnologyShowcase />
      <WhyChooseUs />
      <ServicesGrid />
      <TestimonialsSection />
    </ConsistentPageLayout>
  );
};

export default PricingPage;
