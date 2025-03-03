'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, Rocket, ShieldCheck, TrendingUp } from 'lucide-react';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import NextLink from 'next/link';
import { GradientButton } from '../../components/GradientButton'
import TechCard from './TechCard'; // Import TechCard


const WhyChooseUs = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-1303809341-1024x1024.jpg';

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);

  // Benefit-oriented reasons
  const reasons = [
    {
      id: 1,
      text: 'Deep Industry Expertise',
      description:
        'Benefit from the insights of seasoned consultants with extensive experience across diverse technology sectors.',
      icon: Lightbulb,
    },
    {
      id: 2,
      text: 'Tailored, Innovative Solutions',
      description:
        'Receive custom-crafted strategies and cutting-edge solutions designed specifically for your unique challenges and goals.',
      icon: Rocket,
    },
    {
      id: 3,
      text: 'Reliable & Agile Execution',
      description:
        'Count on our proven methodologies and adaptable approach to ensure projects are delivered on time and to the highest standards.',
      icon: ShieldCheck,
    },
    {
      id: 4,
      text: 'Scalable Solutions for Growth',
      description:
        'Implement future-proof solutions architected for scalability, supporting your business as it expands and evolves.',
      icon: TrendingUp,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: SPACING.large * 2,
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
            filter: 'blur(12px)',
            zIndex: 0,
          }}
        />
      )}

      {/* Overlay */}
      {imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: alpha(theme.palette.primary.dark, 0.75),
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
            mb: SPACING.medium,
            fontWeight: 700,
             WebkitTextFillColor: 'white',
            WebkitTextStroke: imageLoaded ? '1px rgba(0, 0, 0, 0.5)' : 'none',
            textShadow: imageLoaded ? '0 4px 8px rgba(0, 0, 0, 0.7)' : 'none',
          }}
        >
          Why Partner with Us?
        </Typography>

        <Grid
          container
          spacing={SPACING.medium}
          justifyContent="center"
          alignItems="stretch"
        >
          {reasons.map((reason) => (
            <Grid item key={reason.id} xs={12} md={6}>
              {/* Use TechCard Here */}
              <TechCard
                title={reason.text}
                index={reason.id - 1}  //  TechCard expects index to start at 0
                icon={<reason.icon />}  // Pass the icon
              >
                <Typography variant="body1" color="text.secondary" sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)', 
                  }}>
                  
                  
                  {reason.description}
                </Typography>
              </TechCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: SPACING.large }}>
          <NextLink href="/solutions" passHref legacyBehavior>

              <GradientButton
                          href="/contact"
                          label="Explore Our Services"
                          sizeVariant="medium"
                          sx={{
                          }}
                        />
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;