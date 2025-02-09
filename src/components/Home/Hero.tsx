// ContactPage.js (or your component file)
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, useTheme, alpha, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { SiAmazonaws, SiMicrosoftazure, SiGooglecloud, SiKubernetes, SiNvidia } from 'react-icons/si';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import PageHeader from '../Shared/PageHeader';

const TECH_LOGOS = [
  { icon: SiAmazonaws, name: 'AWS' },
  { icon: SiMicrosoftazure, name: 'Microsoft Azure' },
  { icon: SiGooglecloud, name: 'Google Cloud' },
  { icon: SiKubernetes, name: 'Kubernetes' },
  { icon: SiNvidia, name: 'GPU Accelerated' },
];

// HeroSection.js
export const HeroSection = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-hero-1024x1024.jpg';

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);


  return (
    <PageHeader
      title="**AI-Powered Cloud Solutions for Startups**"
      subtitle="Accelerate growth with enterprise-grade technology and expert guidance."
      sx={{
        backgroundImage: imageLoaded ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {  //  <--  Overlay as a pseudo-element
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: imageLoaded
            ? alpha(theme.palette.primary.dark, 0.7) //  <--  Adjust opacity here
            : theme.palette.primary.dark,
            backdropFilter: imageLoaded ? 'blur(4px)' : 'none', // Optional blur
        },
        '@media (max-width: 600px)': {
          minHeight: '400px',
          backgroundPosition: 'center',
        },
      }}
    >
      <Container maxWidth="md" sx={{ py: 8, position: 'relative', zIndex: 2 }}>  {/* zIndex: 2 */}
        <Typography
          variant="h2"
          component="h1"
          color="white"
          textAlign="center"
          mb={4}
          sx={{
            fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
            lineHeight: 1.2,
            textShadow: imageLoaded ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none', //  <-- Text shadow
            WebkitTextFillColor: 'white',
            WebkitTextStroke: imageLoaded ? '1px rgba(0, 0, 0, 0.3)' : 'none',
          }}
        >
          Transform Your Startup with Smart Cloud Solutions
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              }
            }}
          >
            Book Free Demo
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              borderWidth: 2,
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              color: 'white',
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                borderWidth: 2
              }
            }}
          >
            Learn More
          </Button>
        </Box>

        {/* Tech Logos Section Updated */}
        <Box sx={{ mt: 8,  p: 3, borderRadius: 2 }}>
          <Typography variant="body2" color="white" textAlign="center" mb={2}  sx={{
            textShadow: imageLoaded ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none', // Text Shadow
          }}>
            Trusted by startups using:
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {TECH_LOGOS.map(({ icon: Icon, name }, index) => (
              <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                  <Icon color="white" size={28} />
                  <Typography variant="body2" color="white">
                    {name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </PageHeader>
  );
};

export default HeroSection;