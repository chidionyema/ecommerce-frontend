'use client';

import { useState, useEffect, useTransition, lazy, Suspense, useRef } from 'react';
import { Box, Container, Typography, useTheme, alpha, Button, Skeleton } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Cloud, VpnKey, Storage, Api } from '@mui/icons-material';
import styled from '@emotion/styled';

// Enhanced Particles configuration
const Particles = lazy(() => 
  import('../Particles').then(module => ({
    default: ({ quantity }: { quantity: number }) => (
      <module.Particles 
        quantity={quantity}
        staticity={50}
        ease={80}
        color={alpha(useTheme().palette.common.white, 0.3)}
      />
    )
  }))
);

// Premium Hero Section
export const HeroSection = () => {
  const theme = useTheme();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-100px' });

  const gradientVariants = {
    initial: { backgroundPosition: '0% 50%' },
    animate: { backgroundPosition: '100% 50%' },
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 25 },
        background: `
          linear-gradient(
            135deg,
            ${alpha(theme.palette.primary.light, 0.9)} 0%,
            ${alpha(theme.palette.secondary.light, 0.9)} 100%
          ),
          radial-gradient(ellipse at 20% 20%, ${alpha(theme.palette.primary.main, 0.15)}, transparent),
          radial-gradient(ellipse at 80% 80%, ${alpha(theme.palette.secondary.main, 0.15)}, transparent)
        `,
        backgroundSize: '200% 200%',
        color: theme.palette.common.white,
      }}
    >
      <motion.div
        variants={gradientVariants}
        initial="initial"
        animate={inView ? 'animate' : 'initial'}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
        style={{ position: 'absolute', inset: 0 }}
      />

      <Suspense fallback={null}>
        <Particles quantity={window.innerWidth < 768 ? 40 : 80} />
      </Suspense>

      <Container maxWidth="lg" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography
            variant="h1"
            component={motion.h1}
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.8rem', md: '4.5rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              mb: 4,
              textShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.3)}`,
            }}
          >
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.main} 0%, 
                  ${theme.palette.secondary.main} 100%
                )`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                px: 1,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(45deg, 
                    ${alpha(theme.palette.common.white, 0.3)} 0%, 
                    transparent 50%
                  )`,
                  animation: 'textShine 8s infinite',
                },
              }}
            >
              Next-Gen Digital Innovation
            </Box>
          </Typography>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              size="large"
              sx={{
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.main} 0%, 
                  ${theme.palette.secondary.main} 100%
                )`,
                color: theme.palette.common.white,
                px: 8,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '16px',
                boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
              }}
            >
              Start Transformation Today
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};