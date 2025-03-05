'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  alpha,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform } from 'react-icons/si';
import { BracketsIcon, ShieldCheck, Bolt, Cog } from 'lucide-react';
import { SPACING } from '../../utils/sharedStyles';

const TECH_LOGOS = [
  { icon: SiAmazonaws, name: 'AWS', color: '#FF9900' },
  { icon: SiMicrosoftazure, name: 'Azure', color: '#0078D4' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5' },
  { icon: SiTerraform, name: 'Terraform', color: '#7B42BC' },
];

const BENEFIT_ITEMS = [
  { icon: <BracketsIcon size={22} />, text: 'Production-Grade Code & Documentation' },
  { icon: <ShieldCheck size={22} />, text: 'Security Best Practices & Compliance' },
  { icon: <Bolt size={22} />, text: 'Optimized Performance' },
  { icon: <Cog size={22} />, text: 'CI/CD & DevOps Integration' },
];

export const HeroSection = () => {
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-realhero.jpg';

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '600px', md: '700px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingBottom: SPACING.large * 2,
      }}
    >
      {/* Background image with loading transition */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: imageLoaded ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          willChange: 'opacity',
        }}
      />

      {/* Gradient overlay with optimized opacity */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: imageLoaded
            ? `linear-gradient(
                to bottom,
                ${alpha(theme.palette.primary.dark, 0.85)} 20%,
                ${alpha(theme.palette.primary.dark, 0.4)} 80%
              )`
            : 'transparent',
          zIndex: 1,
          transition: 'opacity 0.3s ease',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 4 },
          textAlign: 'center',
        }}
      >
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow text */}
          <motion.div variants={heroItemVariants}>
            <Chip
              label="For Startups & Tech Teams"
              sx={{
                backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
                px: 2,
                py: 1,
                '& .MuiChip-label': {
                  px: 1,
                  fontSize: '0.9rem',
                },
              }}
            />
          </motion.div>

          {/* Main headline */}
          <motion.div variants={heroItemVariants}>
            <Typography
              variant="h1"
              component="h1"
              color="white"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4rem' },
                lineHeight: 1.2,
                fontWeight: 800,
                mb: 3,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                maxWidth: '900px',
                mx: 'auto',
              }}
            >
              Skip Trial &amp; Error with{' '}
              <Box component="span" sx={{ color: theme.palette.secondary.main }}>
                Production-Ready
              </Box>{' '}
              Technology
            </Typography>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={heroItemVariants}>
            <Typography
              variant="h2"
              component="h2"
              color="white"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                fontWeight: 400,
                lineHeight: 1.5,
                mb: 5,
                opacity: 0.9,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Access expert-built technology solutions and consultancy from engineers
              with proven enterprise experience at ASOS, Tesco, and Philip Morris.
            </Typography>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={heroItemVariants}>
            <Grid container spacing={2} sx={{ mb: 5 }}>
              {BENEFIT_ITEMS.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      backgroundColor: alpha(theme.palette.background.paper, 0.1),
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                      height: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                        color: theme.palette.secondary.main,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="body1" fontWeight={500} color="white">
                      {item.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={heroItemVariants}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.5)}`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Free Consultation
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  textTransform: 'none',
                  borderWidth: 2,
                  borderColor: alpha(theme.palette.common.white, 0.3),
                  color: theme.palette.common.white,
                  '&:hover': {
                    borderColor: theme.palette.common.white,
                    backgroundColor: alpha(theme.palette.common.white, 0.15),
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Explore Solutions
              </Button>
            </Stack>
          </motion.div>

          {/* Tech Logos */}
          <motion.div variants={heroItemVariants}>
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.1),
                border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
              }}
            >
              <Typography
                variant="subtitle2"
                color="white"
                textAlign="center"
                mb={2}
                sx={{ opacity: 0.7 }}
              >
                Expertise with leading technologies:
              </Typography>
              <Grid container spacing={3} justifyContent="center" alignItems="center">
                {TECH_LOGOS.map(({ icon: Icon, name, color }, index) => (
                  <Grid item key={index} xs={4} sm={2.4}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Icon
                        color={color}
                        size={30}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                      />
                      <Typography variant="caption" color="white" fontWeight={500}>
                        {name}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;