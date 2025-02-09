'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  Button,
  useTheme,
  alpha,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, Rocket, ShieldCheck, TrendingUp } from 'lucide-react';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import NextLink from 'next/link';

const WhyChooseUs = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-globe.jpg';

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
            backgroundImage: `url(${imageUrl})`, // Apply image here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(12px)', // Increase blur intensity
            zIndex: 0, // Below the overlay
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
            backgroundColor: alpha(theme.palette.primary.dark, 0.75), // Increase opacity
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
            WebkitTextFillColor: 'white', // For Safari
            WebkitTextStroke: imageLoaded ? '1px rgba(0, 0, 0, 0.5)' : 'none', // Stroke only if image loaded
            textShadow: imageLoaded ? '0 4px 8px rgba(0, 0, 0, 0.7)' : 'none', // Increase shadow intensity
          }}
        >
          Why Partner with Us?
        </Typography>

        <Grid
          container
          spacing={SPACING.medium}
          justifyContent="center"
          alignItems="stretch" // Ensure all grid items stretch to the same height
        >
          {reasons.map((reason) => (
            <Grid item xs={12} md={6} key={reason.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reason.id * 0.1,
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.03 }}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    p: SPACING.medium,
                    borderRadius: 'md',
                    boxShadow: theme.shadows[4], // Increase shadow intensity
                    backgroundColor: alpha(theme.palette.background.paper, 0.95), // Slightly lighter background for better contrast
                    height: '100%', // Fill the available height
                    minHeight: 300, // Ensure a consistent minimum height regardless of content
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      borderRadius: '50%',
                      width: 50,
                      height: 50,
                      mb: SPACING.small,
                    }}
                  >
                    <reason.icon size={28} color={theme.palette.primary.main} />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: SPACING.small,
                    }}
                  >
                    {reason.text}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }} // Push description to take up available space
                  >
                    {reason.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: SPACING.large }}>
          <NextLink href="/contact" passHref legacyBehavior>
            <Button variant="contained" color="secondary" size="large" sx={styles.button}>
              Explore Our Services
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;