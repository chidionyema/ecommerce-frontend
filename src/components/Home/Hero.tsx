'use client';

import { useState, useEffect, useTransition, lazy, Suspense, useRef } from 'react';
import { Box, Container, Typography, useTheme, alpha, Button, Skeleton } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';

// ✅ Fix imports: Each lazy-loaded component has its own correct import path
const SocialProof = lazy(() => import('./SocialProof').then((module) => ({ default: module.SocialProof })));
const TrustIndicators = lazy(() => import('./TrustIndicators').then((module) => ({ default: module.TrustIndicators })));
const Particles = lazy(() => import('../Particles').then((module) => ({ default: module.Particles })));

export const HeroSection = () => {
  const theme = useTheme();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  const [showLazyComponents, setShowLazyComponents] = useState(false);
  const [isPending, startTransition] = useTransition();

  // ✅ Delay lazy component loading until after initial render
  useEffect(() => {
    startTransition(() => {
      setShowLazyComponents(true);
    });
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.17, 0.55, 0.55, 1] } });
    }
  }, [inView, controls]);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 6, md: 12 },
        pb: { xs: 12, md: 16 },
        textAlign: 'center',
        background: `
          linear-gradient(-45deg, 
            ${alpha(theme.palette.primary.light, 0.8)}, 
            ${alpha(theme.palette.secondary.light, 0.9)}
          ),
          radial-gradient(ellipse at 20% 20%, ${alpha(theme.palette.primary.main, 0.15)}, transparent),
          radial-gradient(ellipse at 80% 80%, ${alpha(theme.palette.secondary.main, 0.15)}, transparent)
        `,
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 25s ease infinite',
        color: theme.palette.common.white,
        '@keyframes gradientAnimation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      {showLazyComponents && (
        <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={150} />}>
          <Particles quantity={75} color={alpha(theme.palette.common.white, 0.3)} />
        </Suspense>
      )}

      <Container maxWidth="lg" ref={ref}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={controls}>
          <Typography
            variant="h1"
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '4rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '3px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px',
              },
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
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(45deg, 
                    ${alpha(theme.palette.common.white, 0.3)} 0%, 
                    transparent 50%
                  )`,
                  animation: 'textShine 8s infinite',
                },
                '@keyframes textShine': {
                  '0%': { backgroundPosition: '-200% center' },
                  '100%': { backgroundPosition: '200% center' },
                },
              }}
            >
              Revolutionizing Your Digital Presence
            </Box>
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', gap: 3 }}>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: `linear-gradient(135deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${theme.palette.secondary.main} 100%
                  )`,
                  color: theme.palette.common.white,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                }}
              >
                Get Started 🚀
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {showLazyComponents && (
          <Suspense
            fallback={
              <Box sx={{ mt: 8, display: 'flex', gap: 4, justifyContent: 'center' }}>
                <Skeleton variant="rounded" width={120} height={40} />
                <Skeleton variant="rounded" width={160} height={40} />
              </Box>
            }
          >
            <TrustIndicators />
            <SocialProof />
          </Suspense>
        )}
      </Container>
    </Box>
  );
};
