'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  alpha,
  Button,
  styled
} from '@mui/material';
import { motion } from 'framer-motion';
import { Info, Award, Clock, Users, Briefcase } from '@mui/icons-material';

// TypeScript Interfaces
interface Plan {
  type: string;
  title: string;
  features: Feature[];
  price: string;
}

interface Feature {
  Icon: React.ElementType;
  text: string;
}

const plans: Plan[] = [
  {
    type: 'hourly',
    title: 'Expert Consultation',
    features: [
      { Icon: Clock, text: 'Flexible hourly consulting' },
      { Icon: Award, text: 'Technical leadership' },
      { Icon: Users, text: 'Priority scheduling' },
    ],
    price: '$295/hr'
  },
  {
    type: 'project',
    title: 'Managed Solutions',
    features: [
      { Icon: Briefcase, text: 'End-to-end project delivery' },
      { Icon: Users, text: 'Dedicated team' },
      { Icon: Award, text: 'Quality guarantee' },
    ],
    price: 'Custom Quote'
  },
  {
    type: 'retainer',
    title: 'Strategic Partnership',
    features: [
      { Icon: Users, text: '24/7 support' },
      { Icon: Award, text: 'Technology roadmap' },
      { Icon: Info, text: 'Performance reviews' },
    ],
    price: 'From $15k/mo'
  },
];

const StyledPricingTier = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  minHeight: 400,
  padding: theme.spacing(4),
  borderRadius: '20px',
  background: `linear-gradient(145deg,
    ${alpha(theme.palette.primary.main, 0.1)},
    ${alpha(theme.palette.secondary.main, 0.05)}
  )`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: `0 16px 32px ${alpha(theme.palette.primary.dark, 0.1)}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const PricingTier = ({ tier }: { tier: Plan }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledPricingTier
      whileHover={{ scale: 1.05 }}
      sx={{ mx: isMobile ? 2 : 4 }}
    >
      <Box>
        <Box sx={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: 60,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography variant="h5" color="primary">
            {tier.title}
          </Typography>
        </Box>

        <Box sx={{ mt: 6 }}>
          {tier.features.map((feature, i) => (
            <Box key={i} sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
              <feature.Icon sx={{ 
                mr: 2, 
                color: 'secondary.main',
                fontSize: '1.5rem'
              }} />
              <Typography variant="body1">{feature.text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            background: `linear-gradient(
              to right,
              ${theme.palette.primary.main},
              ${theme.palette.secondary.main}
            )`,
            color: 'white',
            px: 6,
            py: 1.5,
            borderRadius: '50px',
            fontWeight: 700,
            width: '100%',
            maxWidth: 240
          }}
        >
          {tier.price}
        </Button>
      </Box>
    </StyledPricingTier>
  );
};

export default function PricingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(
        45deg,
        ${alpha(theme.palette.primary.light, 0.1)} 0%,
        ${alpha(theme.palette.secondary.light, 0.1)} 100%
      )`,
      py: 8
    }}>
      <Container maxWidth="xl">
        <Typography variant="h2" align="center" sx={{ 
          mb: 8,
          fontWeight: 900,
          background: `linear-gradient(135deg, 
            ${theme.palette.primary.main} 30%, 
            ${theme.palette.secondary.main} 70%
          )`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: isMobile ? '2.5rem' : '3rem'
        }}>
          Strategic Partnership Options
        </Typography>
        
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 4,
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          {plans.map((tier) => (
            <PricingTier key={tier.type} tier={tier} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}