"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import {
  Box, Container, Typography, Button, useTheme, alpha, Grid, Paper, useMediaQuery
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { SPACING } from '../../utils/sharedStyles';
import { Mail, Briefcase } from 'lucide-react';

const CTASection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15, duration: 0.8 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65 } }
  };

  // Resource features
  const resourceFeatures = [
    'Meticulously crafted technical guides',
    'Essential code patterns & templates',
    'Architectural blueprints & principles',
    'Performance optimization techniques'
  ];

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        py: { xs: SPACING.large, md: SPACING.large * 1.5 },
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background pattern */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '50px 50px'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={5} alignItems="center" justifyContent="center">
            {/* Left content */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 2.5,
                    fontSize: { xs: '2.25rem', md: '3rem' },
                    lineHeight: 1.15,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '75px',
                      height: '3px',
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.main, 0.7)})`,
                      borderRadius: '2px'
                    }
                  }}
                >
                  Enterprise Expertise On-Demand
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.92),
                    mb: 4,
                    fontSize: '1.125rem',
                    lineHeight: 1.6,
                    maxWidth: '650px',
                    '& strong': {
                      fontWeight: 600,
                      color: alpha(theme.palette.common.white, 0.98)
                    }
                  }}
                >
                  Book a consultation with our <strong>senior engineers</strong> and discover how we can help you 
                  implement enterprise-grade solutions based on our experience with <strong>ASOS</strong>, <strong>Tesco</strong>, and <strong>Philip Morris</strong>.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2.5, 
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  '& > a': {
                    flexGrow: { xs: 1, sm: 0 },
                    minWidth: { xs: '100%', sm: 'auto' }
                  }
                }}>
                  <Button
                    component={Link}
                    href="/contact"
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<Mail size={18} />}
                    sx={{
                      px: 3.5,
                      py: 1.4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: `0 5px 15px ${alpha(theme.palette.secondary.main, 0.45)}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.55)}`,
                      }
                    }}
                  >
                    Book Free Consultation
                  </Button>
                  <Button
                    component={Link}
                    href="/solutions"
                    variant="outlined"
                    size="large"
                    startIcon={<Briefcase size={18} />}
                    sx={{
                      px: 3.5,
                      py: 1.4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      borderWidth: 2,
                      borderColor: alpha(theme.palette.common.white, 0.55),
                      color: theme.palette.common.white,
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: theme.palette.common.white,
                        backgroundColor: alpha(theme.palette.common.white, 0.08),
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    View Portfolio
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            {/* Right content - subscription box */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 3.75 },
                    borderRadius: 3,
                    background: alpha(theme.palette.background.paper, 0.97),
                    boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.15)}`,
                    border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 14px 36px ${alpha(theme.palette.common.black, 0.18)}`,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '5px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    fontWeight={700} 
                    mb={1.25}
                    color={theme.palette.primary.main}
                    fontSize="1.4rem"
                    sx={{
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -5,
                        left: 0,
                        width: '35px',
                        height: '2px',
                        background: alpha(theme.palette.primary.main, 0.8),
                        borderRadius: '1px'
                      }
                    }}
                  >
                    Subscribe to GLUStack Resources
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color={theme.palette.text.secondary} 
                    mb={3.5}
                    fontSize="0.975rem"
                    lineHeight={1.6}
                    sx={{ maxWidth: '94%', mt: 1.5 }}
                  >
                    Access our curated library of enterprise resources, detailed tutorials, and production-ready code samples.
                  </Typography>
                  
                  {/* Feature list */}
                  <Box sx={{ mb: 4 }}>
                    {resourceFeatures.map((feature, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.4,
                          mb: index < resourceFeatures.length - 1 ? 2 : 0
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            borderRadius: '50%', 
                            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.light, 0.9)})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        >
                          ✓
                        </Box>
                        <Typography 
                          fontSize="0.95rem" 
                          color={theme.palette.text.primary}
                          fontWeight={500}
                          lineHeight={1.4}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Button
                    component={Link}
                    href="/subscription"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.4,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      borderRadius: 2,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.35)}`,
                      }
                    }}
                  >
                    Subscribe for Free
                  </Button>
                  
                  {/* Badge */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    fontSize: '0.7rem',
                    color: alpha(theme.palette.text.secondary, 0.7),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <Box component="span" sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.success.main
                    }} />
                    ENTERPRISE QUALITY
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CTASection;