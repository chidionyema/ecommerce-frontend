import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useLayoutEffect } from 'react';
import { TrustIndicators } from './TrustIndicators';
import { SocialProof } from './SocialProof';

export const HeroSection = () => {
  const theme = useTheme();
  const controls = useAnimation();

  useLayoutEffect(() => {
    const startAnimations = async () => {
      // First animation: Fade-in
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1.2, ease: 'easeInOut' },
      });

      // Second animation: Looping scale (will start after the first one is complete)
      controls.start({
        scale: [1, 1.05, 1],
        transition: {
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    };

    startAnimations();
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 4, sm: 6, md: 8 },
        pb: 20,
        background: `linear-gradient(45deg, ${alpha(
          theme.palette.primary.light,
          1
        )}, ${alpha(theme.palette.secondary.light, 1)})`,
        color: theme.palette.common.white,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: `0 4px 12px ${alpha(
                theme.palette.secondary.main,
                0.4
              )}`,
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Enterprise-Grade Digital Transformation
          </Typography>
        </motion.div>

        <TrustIndicators />
        <SocialProof />
      </Container>
    </Box>
  );
};