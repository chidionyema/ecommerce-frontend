// components/Common/ServicesGrid.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';
import {
  Lightbulb,  // Example icons, adjust as needed
  Wrench,
  Code,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

const services = [
  {
    title: 'Strategic Consulting',
    content: 'Tailored, data-driven strategies for business excellence.',
    icon: Lightbulb, // Add icon
  },
  {
    title: 'Expert Guidance',
    content: 'Dedicated support from industry-leading professionals.',
    icon: Users,  // Add icon
  },
  {
    title: 'Custom Solutions',
    content: 'Bespoke solutions to fit your unique business requirements.',
    icon: Code, // Add icon
  },
  {
    title: 'Implementation Services',
    content: 'Seamless integration of new technologies into your existing infrastructure.',
    icon: Wrench, // Add icon
  },
  {
    title: 'Performance Optimization',
    content: 'Enhance your systems for maximum efficiency and ROI.',
    icon: TrendingUp, // Add icon
  },
  {
    title: 'Security Audits',
    content: 'Comprehensive security assessments to protect your valuable assets.',
    icon: ShieldCheck, // Add icon
  },
];

const ServicesGrid = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-todo.jpg';

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: SPACING.large,
        backgroundImage: imageLoaded ? `url(${imageUrl})` : 'none',
        backgroundColor: !imageLoaded ? theme.palette.background.default : 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blurred Background Image (if loaded) */}
      {imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)', // Reduced blur
            zIndex: 0,
            opacity: 0.8, // Increased blurred image visibility
          }}
        />
      )}

      {/* Overlay (if loaded) */}
      {imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: alpha(theme.palette.primary.dark, 0.3), // Reduced opacity
            zIndex: 1,
          }}
        />
      )}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: imageLoaded ? 'white' : theme.palette.text.primary,
            mb: SPACING.large,
            WebkitTextFillColor: 'white',
            WebkitTextStroke: imageLoaded ? '1px rgba(0, 0, 0, 0.3)' : 'none',
            textShadow: imageLoaded ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none',
          }}
        >
          Exclusive Services Tailored for You
        </Typography>
        <Grid container spacing={SPACING.medium} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {/* Apply custom styles *here*, to this instance of TechCard */}
              <TechCard
                icon={service.icon ? <service.icon /> : null}  // Use the icon
                title={service.title}
                color={theme.palette.primary.main}
                sx={{
                  backgroundColor: alpha(theme.palette.background.paper, 0.95), // Increased opacity
                }}
              >
                <Typography
                  variant="body2"
                  textAlign="center"
                  mt={SPACING.small}
                >
                  {service.content}
                </Typography>
              </TechCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesGrid;