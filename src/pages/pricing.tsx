'use client';

import React, { memo, useCallback } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Button,
  Container,
  styled,
  useMediaQuery,
  alpha,
} from '@mui/material';
import { Info, Award, Clock, Users, Calendar, Briefcase } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

const LazyCard = styled(motion.div)(({ theme }) => ({
  borderRadius: '24px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  minHeight: 500,
  background: `linear-gradient(145deg, ${alpha(
    theme.palette.background.paper,
    0.9
  )}, ${alpha(theme.palette.background.paper, 1)})`,
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.dark, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 16px 32px ${alpha(
      theme.palette.primary.main,
      0.3
    )}, inset 0 0 24px ${alpha(theme.palette.primary.light, 0.1)}`,
  },
}));

const FeatureItem = memo(({ icon: Icon, text, theme }: any) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      py: 1,
      backgroundColor: alpha(theme.palette.divider, 0.1),
      borderRadius: '8px',
      padding: '12px',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: alpha(theme.palette.divider, 0.2),
      },
    }}
  >
    <Icon
      style={{
        color: theme.palette.secondary.main,
        fontSize: '1.5rem',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
      }}
    />
    <Typography
      variant="body2"
      sx={{
        ml: 2,
        fontWeight: 500,
        color: 'text.primary',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {text}
    </Typography>
  </Box>
));

const PricingGrid = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const plans = [
    {
      type: 'hourly',
      title: 'Expert Consultation',
      gradient: `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.08
      )}, ${alpha(theme.palette.secondary.main, 0.05)})`,
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
      gradient: `linear-gradient(135deg, ${alpha(
        theme.palette.secondary.main,
        0.08
      )}, ${alpha(theme.palette.primary.main, 0.05)})`,
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
      gradient: `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.1
      )}, ${alpha(theme.palette.secondary.main, 0.08)})`,
      features: [
        { icon: Users, text: '24/7 technical support' },
        { icon: Award, text: 'Strategic technology roadmap' },
        { icon: Info, text: 'Monthly performance reviews' },
      ],
      price: 'Starting at $15k/mo',
    },
  ];

  const handlePlanClick = useCallback(
    (type) => {
      router.push(`/contact?plan=${type}`);
    },
    [router]
  );


    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    
  return (
    <LazyMotion features={domAnimation}>
      <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: isMobile ? 2 : 6,
        paddingRight: isMobile ? 2 : 6,
        marginLeft: 6,
        marginRight: 6,
      }}
    >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 70%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Choose Your Path to Innovation
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'text.secondary',
                  fontFamily: theme.typography.fontFamily,
                  maxWidth: 700,
                  mx: 'auto',
                }}
              >
                Elevate your business with tailored solutions, expert support,
                and strategic partnerships.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {plans.map(({ type, title, gradient, features, price }, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={type}
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <LazyCard sx={{ padding: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    {title}
                  </Typography>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {features.map((feature, i) => (
                      <FeatureItem key={i} {...feature} theme={theme} />
                    ))}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mt: 4,
                      color: theme.palette.primary.main,
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
                      '&:hover': {
                        background: `linear-gradient(135deg, ${alpha(
                          theme.palette.primary.main,
                          0.8
                        )}, ${alpha(theme.palette.secondary.main, 0.8)})`,
                      },
                    }}
                    onClick={() => handlePlanClick(type)}
                  >
                    Get Started
                  </Button>
                </LazyCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </LazyMotion>
  );
};

export default PricingGrid;
