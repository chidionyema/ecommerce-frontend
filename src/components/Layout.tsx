import React, { useState } from 'react';
import Footer from './Footer';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  useTheme,
  styled,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  TECH_GRADIENT,
  BACKDROP_BLUR,
  BORDER_RADIUS,
  microShine,
  typography,
} from '../theme/branding';

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: LIGHT_ACCENT,
  padding: theme.spacing(8),
  minHeight: '80vh',
  background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${SECONDARY_DARK} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: BORDER_RADIUS,
  margin: theme.spacing(3),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url(/grid-pattern.svg) repeat',
    opacity: 0.05,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 6),
  borderRadius: BORDER_RADIUS,
  fontWeight: 700,
  letterSpacing: '1px',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  background: TECH_GRADIENT,
  color: LIGHT_ACCENT,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.3)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 48px ${alpha('#4361EE', 0.4)}`,
  },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: BORDER_RADIUS,
  background: alpha(PRIMARY_DARK, 0.6),
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 48px ${alpha(PRIMARY_DARK, 0.4)}`,
  },
}));

const Layout = ({ children, showHeroSection = false }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeroSection && (
        <HeroSection>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h1" sx={theme.typography.h1}>
              Transform Your Business
            </Typography>
            <Typography variant="h5" sx={theme.typography.h5}>
              Expert-led solutions for digital transformation
            </Typography>
            <StyledButton href="/consultation">Start Your Journey</StyledButton>
          </motion.div>
        </HeroSection>
      )}

      <Container maxWidth="xl" component="main" sx={{ py: 8 }}>
        <Box sx={{ mb: 8 }}>{children}</Box>

        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" sx={theme.typography.h4}>
            Ready to Accelerate Growth?
          </Typography>
          <StyledButton href="/contact" size="large">
            Schedule Free Consultation
          </StyledButton>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
