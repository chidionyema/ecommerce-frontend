"use client";

import React, { useState } from 'react';
import {
  Box, Typography, Button, Container, useTheme, alpha, Grid, Chip, Stack, Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiGooglecloud
} from 'react-icons/si';
import { 
  ShieldCheck, TrendingUp, DollarSign, Users, ArrowRight, 
  Calendar, Clock
} from 'lucide-react';
import { CalendlyBooking } from '../CalendlyBooking';

// Data constants - preserved exactly as original
const TECH_STACK = [
  { icon: SiAmazonaws, name: 'AWS', color: '#FF9900' },
  { icon: SiMicrosoftazure, name: 'Azure', color: '#0078D4' },
  { icon: SiGooglecloud, name: 'GCP', color: '#4285F4' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiKubernetes, name: 'K8s', color: '#326CE5' },
  { icon: SiTerraform, name: 'Terraform', color: '#7B42BC' },
];

const BENEFITS = [
  { 
    icon: <TrendingUp strokeWidth={1.5} size={20} />, 
    text: '73% Faster Deployment', 
    subtext: 'From concept to production in weeks',
    gradient: 'linear-gradient(135deg, #00C6FB, #005BEA)'
  },
  { 
    icon: <ShieldCheck strokeWidth={1.5} size={20} />, 
    text: 'Enterprise Security', 
    subtext: 'SOC 2, GDPR & ISO 27001 compliant',
    gradient: 'linear-gradient(135deg, #FF9966, #FF5E62)'
  },
  { 
    icon: <DollarSign strokeWidth={1.5} size={20} />, 
    text: '47% Cost Reduction', 
    subtext: 'Optimized infrastructure & reduced overhead',
    gradient: 'linear-gradient(135deg, #38ef7d, #11998e)'
  },
  { 
    icon: <Users strokeWidth={1.5} size={20} />, 
    text: '99.99% Uptime SLA', 
    subtext: 'Built for enterprise-grade reliability',
    gradient: 'linear-gradient(135deg, #6a11cb, #2575fc)'
  },
];

const SUCCESS_INDICATORS = [
  'Production-ready in 14 days', 
  'Dedicated support team', 
  '30-day money-back guarantee'
];

// Main HeroSection component
export const HeroSection = () => {
  const theme = useTheme();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  
  // Ive's precision in animations - masterfully refined
  const animations = {
    fadeIn: (delay = 0) => ({
      initial: { opacity: 0, y: 8 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.7, 
          delay, 
          ease: [0.2, 0, 0.2, 1] 
        }
      }
    }),
    stagger: {
      container: {
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.3
          }
        }
      },
      item: {
        initial: { opacity: 0, y: 10 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5, 
            ease: [0.2, 0, 0.2, 1] 
          }
        }
      }
    }
  };
  
  // Masterful blend of your brand with Ive's meticulous attention to detail
  const styles = {
    // Structural elements - preserving your brand layout
    heroContainer: {
      position: 'relative',
      minHeight: { xs: '680px', md: '94vh' },
      display: 'flex',
      alignItems: 'center',
      pt: { xs: 8, md: 10 },
      pb: { xs: 8, md: 10 },
      overflow: 'hidden',
    },
    backgroundImage: {
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('/images/istockphoto-realhero.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 0,
      // Ive-like subtle image treatment that preserves original feel
      filter: 'saturate(1.05) brightness(0.97)'
    },
    gradientOverlay: {
      position: 'absolute', 
      inset: 0, 
      zIndex: 1,
      // Your exact gradient with Ive-like precision
      background: `linear-gradient(135deg, 
        ${alpha(theme.palette.primary.dark, 0.92)} 0%,
        ${alpha(theme.palette.primary.dark, 0.78)} 55%,
        ${alpha(theme.palette.primary.dark, 0.92)} 100%)`
    },
    contentContainer: { 
      position: 'relative', 
      zIndex: 3, 
      my: 4 
    },
    
    // Typography - your messaging with Ive's typographic precision
    headline: {
      fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' },
      lineHeight: 1.1,
      fontWeight: 800, 
      letterSpacing: '-0.015em',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: { xs: '60px', md: '80px' },
        height: '4px',
        background: `linear-gradient(90deg, 
          ${alpha(theme.palette.secondary.main, 0.1)}, 
          ${theme.palette.secondary.main}, 
          ${alpha(theme.palette.secondary.main, 0.1)})`,
        borderRadius: '2px'
      }
    },
    accentText: {
      background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
      backgroundClip: 'text', 
      WebkitBackgroundClip: 'text',
      color: 'transparent', 
      WebkitTextFillColor: 'transparent',
    },
    subheadline: {
      fontSize: { xs: '1.2rem', sm: '1.25rem', md: '1.35rem' },
      fontWeight: 400, 
      lineHeight: 1.5, 
      letterSpacing: '0.01em',
      '& strong': { 
        fontWeight: 600, 
        color: alpha(theme.palette.secondary.light, 0.95)
      }
    },
    
    // Buttons - your distinctive CTAs with Ive's interaction design
    primaryButton: {
      px: 5,
      py: 2,
      height: 48,
      fontSize: '1rem', 
      fontWeight: 600, 
      borderRadius: 12, 
      textTransform: 'none',
      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.dark, 0.9)})`,
      boxShadow: `0 8px 16px ${alpha(theme.palette.secondary.main, 0.35)}`,
      transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)',
      '&:hover': { 
        transform: 'translateY(-3px)',
        boxShadow: `0 12px 24px ${alpha(theme.palette.secondary.main, 0.45)}`,
      },
      '&:active': {
        transform: 'translateY(-1px)',
        boxShadow: `0 8px 12px ${alpha(theme.palette.secondary.main, 0.4)}`,
      }
    },
    secondaryButton: {
      px: 4, 
      py: 1.75, 
      height: 48,
      fontSize: '1rem', 
      fontWeight: 600, 
      borderRadius: 12, 
      textTransform: 'none',
      borderWidth: 1.5, 
      borderColor: alpha('#fff', 0.8),
      color: '#fff', 
      backgroundColor: alpha('#000', 0.12),
      backdropFilter: 'blur(8px)',
      transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)',
      '&:hover': { 
        borderColor: '#fff', 
        backgroundColor: alpha('#fff', 0.08),
        transform: 'translateY(-3px)',
      },
      '&:active': {
        transform: 'translateY(-1px)',
        backgroundColor: alpha('#fff', 0.05),
      }
    },
    
    // UI Elements - your content with Ive's material understanding
    offerChip: {
      px: 1.5, 
      py: 2.5,
      height: 36,
      backgroundColor: alpha(theme.palette.error.main, 0.15),
      color: '#fff', 
      fontWeight: 'bold',
      border: `1px solid ${alpha(theme.palette.error.light, 0.4)}`,
      boxShadow: `0 4px 10px ${alpha(theme.palette.error.main, 0.2)}`,
      '& .MuiChip-icon': {
        color: alpha('#fff', 0.95)
      }
    },
    benefitCard: {
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: alpha(theme.palette.background.paper, 0.07),
      border: `1px solid ${alpha('#fff', 0.2)}`,
      borderRadius: 16,
      backdropFilter: 'blur(12px)',
      transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        backgroundColor: alpha(theme.palette.background.paper, 0.09),
        boxShadow: `0 15px 30px ${alpha('#000', 0.15)}`,
        border: `1px solid ${alpha('#fff', 0.25)}`,
      }
    },
    iconBox: {
      borderRadius: '50%',
      p: 1.5,
      color: '#fff',
      width: 'fit-content',
      mb: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: `0 6px 12px ${alpha('#000', 0.2)}`
    },
    trustIndicator: {
      py: 2,
      px: 3.5,
      backgroundColor: alpha('#000', 0.15),
      border: `1px solid ${alpha('#fff', 0.15)}`,
      borderRadius: 16,
      backdropFilter: 'blur(12px)',
    },
    techItem: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 1.5,
      transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
      '&:hover': {
        transform: 'translateY(-3px)',
        '& svg': {
          filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
        }
      }
    },
    trustChip: {
      backgroundColor: alpha(theme.palette.success.main, 0.12),
      color: '#fff',
      border: `1px solid ${alpha(theme.palette.success.main, 0.25)}`,
      fontWeight: 500,
      height: 28,
      borderRadius: 8,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: alpha(theme.palette.success.main, 0.18),
        transform: 'translateY(-2px)'
      }
    }
  };

  return (
    <Box component="section" sx={styles.heroContainer}>
      {/* Background elements - preserving your brand image */}
      <Box sx={styles.backgroundImage} />
      <Box sx={styles.gradientOverlay} />

      <Container maxWidth="lg" sx={styles.contentContainer}>
        {/* Headline - with Ive's orchestrated reveal */}
        <motion.div {...animations.fadeIn(0)}>
          <Typography 
            variant="h1" 
            component="h1" 
            color="white" 
            align="center"
            sx={{
              ...styles.headline,
              mx: 'auto', 
              maxWidth: '900px',
              mb: 4,
              mt: { xs: 4, md: 2 },
            }}
          >
            Enterprise Solutions{' '}
            <Box component="span" sx={styles.accentText}>
              Delivered 10× Faster
            </Box>
          </Typography>
        </motion.div>

        {/* Subheadline - with Ive's precise typography */}
        <motion.div {...animations.fadeIn(0.1)}>
          <Typography 
            variant="h2" 
            component="h2" 
            color="#f8f8f8" 
            align="center"
            sx={{
              ...styles.subheadline,
              mx: 'auto', 
              maxWidth: '760px',
              mb: 4,
            }}
          >
            Accelerate your time-to-market with <strong>enterprise-grade solutions</strong> built by 
            senior engineers behind mission-critical systems for <strong>industry leaders</strong>.
          </Typography>
        </motion.div>

        {/* Limited time offer chip - with subtle Ive animation */}
        <motion.div {...animations.fadeIn(0.15)}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Chip
              icon={<Clock size={14} strokeWidth={2} />}
              label="Limited Time: 2 Free Strategy Sessions"
              sx={styles.offerChip}
            />
          </Box>
        </motion.div>

        {/* CTA Buttons - with Ive's interaction polish */}
        <motion.div {...animations.fadeIn(0.2)}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 3 }}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => setIsCalendlyOpen(true)}
              endIcon={<Calendar size={16} strokeWidth={2} />}
              sx={styles.primaryButton}
            >
              Book Your Free Strategy Session
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              href="/solutions"
              component="a"
              sx={styles.secondaryButton}
              endIcon={<ArrowRight size={16} strokeWidth={2} />}
            >
              View Case Studies
            </Button>
          </Stack>
        </motion.div>

        {/* Benefits cards - with Ive's staggered reveal */}
        <motion.div
          variants={animations.stagger.container}
          initial="initial"
          animate="animate"
        >
          <Box sx={{ mb: 7 }}>
            <Grid container spacing={2.5}>
              {BENEFITS.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={animations.stagger.item}>
                    <Paper
                      elevation={0}
                      sx={styles.benefitCard}
                    >
                      <Box
                        sx={{
                          ...styles.iconBox,
                          background: item.gradient
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        fontWeight={700} 
                        color="white" 
                        sx={{ mb: 1, fontSize: '1.1rem', letterSpacing: '-0.01em' }}
                      >
                        {item.text}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color={alpha('#fff', 0.9)} 
                        sx={{ fontSize: '0.9rem', lineHeight: 1.5, letterSpacing: '0.01em' }}
                      >
                        {item.subtext}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Trust indicators - with Ive's material refinement */}
        <motion.div {...animations.fadeIn(0.3)}>
          <Box sx={{ mb: 7, display: 'flex', justifyContent: 'center' }}>
            <Paper 
              elevation={0}
              sx={styles.trustIndicator}
            >
              <Typography 
                align="center" 
                color="white" 
                sx={{ fontWeight: 600, mb: 2, fontSize: '1rem', letterSpacing: '0.01em' }}
              >
                Trusted across industries
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1.5, sm: 2.5 }}
                justifyContent="center" 
                sx={{ mb: 1.5 }}
              >
                {SUCCESS_INDICATORS.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    size="small"
                    sx={styles.trustChip}
                  />
                ))}
              </Stack>
            </Paper>
          </Box>
        </motion.div>

        {/* Tech stack - with Ive's interaction design */}
        <motion.div {...animations.fadeIn(0.35)}>
          <Typography 
            variant="h6" 
            color="#fff" 
            textAlign="center" 
            mb={3.5}
            sx={{
              fontWeight: 600,
              fontSize: '1.05rem',
              letterSpacing: '0.01em'
            }}
          >
            Pre-built architectures for leading enterprise technologies
          </Typography>
          
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 7 }}>
            {TECH_STACK.map((tech, index) => (
              <Grid item key={index} xs={4} sm={2}>
                <Box sx={styles.techItem}>
                  <tech.icon color={tech.color} size={36} style={{ 
                    transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)'
                  }} />
                  <Typography 
                    color="#fff" 
                    fontWeight={600} 
                    sx={{ fontSize: '0.85rem', letterSpacing: '0.01em' }}
                  >
                    {tech.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          {/* Final CTA reminder - with Ive-like presence */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => setIsCalendlyOpen(true)}
              endIcon={<Calendar size={16} strokeWidth={2} />}
              sx={styles.primaryButton}
            >
              Schedule Your Strategy Session
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Calendly Integration */}
      <CalendlyBooking 
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        eventTypeUrl="https://calendly.com/glustack/strategy-session"
        prefill={{ name: "", email: "" }}
      />
    </Box>
  );
};

export default React.memo(HeroSection);