'use client';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        py: SPACING.large * 1.5,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background pattern */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
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
            {/* Left content - text */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 3,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                  }}
                >
                  Ready to Build with Enterprise Standards?
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.9),
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    maxWidth: '600px'
                  }}
                >
                  Book a free consultation with our senior engineers and discover how we can help you 
                  implement enterprise-grade solutions based on our experience at ASOS, Tesco, and Philip Morris.
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
                    endIcon={<ChevronRight />}
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
                    Book Free Consultation
                  </Button>
                  <Button
                    component={Link}
                    href="/solutions"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      borderWidth: 2,
                      borderColor: alpha(theme.palette.common.white, 0.5),
                      color: theme.palette.common.white,
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: theme.palette.common.white,
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                      },
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
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.2)}`,
                    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    fontWeight={700} 
                    mb={1}
                    color={theme.palette.primary.main}
                  >
                    Subscribe to GLUStack Resources
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color={theme.palette.text.secondary} 
                    mb={3}
                  >
                    Get access to free resources, tutorials, and code samples from our enterprise library.
                  </Typography>
                  
                  {/* Subscription features */}
                  <Box sx={{ mb: 3 }}>
                    {[
                      'Weekly technical tutorials',
                      'Code snippets & templates',
                      'Architecture best practices',
                      'Security & performance tips'
                    ].map((feature, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.5,
                          mb: 1.5
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            borderRadius: '50%', 
                            backgroundColor: theme.palette.secondary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}
                        >
                          ✓
                        </Box>
                        <Typography>{feature}</Typography>
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
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: 2,
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
