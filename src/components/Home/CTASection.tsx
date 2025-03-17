import React, { useRef } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  alpha,
  Grid,
  Paper,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import { ChevronRight } from 'lucide-react';

const CTASection = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Refined animation variants with precise timing and subtle movements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.25
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.65,
        ease: [0.165, 0.015, 0.12, 0.995] // Apple-like cubic bezier
      } 
    }
  };

  // Resource features with clear language and value proposition
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
        py: SPACING.large * 1.6,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Refined background pattern with subtle opacity */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.04, // Reduced for subtlety
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid 
            container 
            spacing={4} 
            alignItems="center" 
            justifyContent="center"
          >
            {/* Left content - text with refined typography */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 2.5,
                    textShadow: '0 2px 4px rgba(0,0,0,0.25)',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '2.875rem' },
                    letterSpacing: '-0.015em',
                    lineHeight: 1.15
                  }}
                >
                  Ready to Transform Your Enterprise Architecture?
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.92),
                    mb: 4,
                    fontSize: '1.075rem',
                    lineHeight: 1.55,
                    maxWidth: '600px',
                    letterSpacing: '0.01em',
                    fontWeight: 400
                  }}
                >
                  Book a consultation with our senior engineers and discover how we can help you 
                  implement enterprise-grade solutions based on our experience with ASOS, Tesco, and Philip Morris.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    href="/contact"
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ChevronRight size={18} />}
                    sx={{
                      px: 3.75,
                      py: 1.4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.45)}`,
                      transition: 'all 0.38s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 18px ${alpha(theme.palette.secondary.main, 0.55)}`,
                      },
                    }}
                  >
                    Book Free Consultation
                  </Button>
                  <Button
                    component={Link}
                    href="/solutions"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 3.75,
                      py: 1.4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      borderWidth: 1.5,
                      borderColor: alpha(theme.palette.common.white, 0.55),
                      color: theme.palette.common.white,
                      transition: 'all 0.35s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
                      '&:hover': {
                        borderWidth: 1.5,
                        borderColor: theme.palette.common.white,
                        backgroundColor: alpha(theme.palette.common.white, 0.08),
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    View Portfolio
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            {/* Right content - subscription box with refined visuals */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3.75,
                    borderRadius: 2.5,
                    background: alpha(theme.palette.background.paper, 0.97),
                    backdropFilter: 'blur(12px)',
                    boxShadow: `0 8px 28px ${alpha(theme.palette.common.black, 0.16)}`,
                    border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                    transition: 'transform 0.38s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 32px ${alpha(theme.palette.common.black, 0.18)}`,
                    }
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    fontWeight={700} 
                    mb={1}
                    color={theme.palette.primary.main}
                    letterSpacing="-0.01em"
                    fontSize="1.35rem"
                  >
                    Subscribe to GLUStack Resources
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color={theme.palette.text.secondary} 
                    mb={3}
                    fontSize="0.95rem"
                    lineHeight={1.6}
                    letterSpacing="0.01em"
                  >
                    Access our curated library of enterprise resources, detailed tutorials, and production-ready code samples.
                  </Typography>
                  
                  {/* Subscription features with refined checkmarks */}
                  <Box sx={{ mb: 3.5 }}>
                    {resourceFeatures.map((feature, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.4,
                          mb: 1.5
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 18, 
                            height: 18, 
                            borderRadius: '50%', 
                            backgroundColor: theme.palette.secondary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            boxShadow: `0 1px 3px ${alpha(theme.palette.secondary.main, 0.4)}`
                          }}
                        >
                          ✓
                        </Box>
                        <Typography 
                          fontSize="0.925rem" 
                          color={theme.palette.text.primary}
                          letterSpacing="0.01em"
                          fontWeight={500}
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
                      borderRadius: 1.5,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                      transition: 'all 0.35s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                    }}
                  >
                    Subscribe for Free
                  </Button>
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