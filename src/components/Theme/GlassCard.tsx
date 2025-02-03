'use client';

import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../theme/ThemeContext'; // Import the theme context

// Ultra-premium GlassCard component
export const GlassCard = styled(motion.div)(({ theme }) => {
  // Access the activeTheme from the theme context
  const { activeTheme } = useThemeContext();

  // Define background color based on activeTheme
  const getBackgroundColor = () => {
    switch (activeTheme) {
      case 'light':
        return `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.9)}, ${alpha(theme.palette.secondary.light, 0.85)})`;
      case 'dark':
        return `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.9)}, ${alpha(theme.palette.secondary.dark, 0.85)})`;
      // Add more cases for other themes as needed
      default:
        return `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.9)}, ${alpha(theme.palette.secondary.dark, 0.85)})`;
    }
  };

  return {
    background: getBackgroundColor(), // Use the theme-aware background color
    color: theme.palette.common.white,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
    '&:active': {
      transform: 'translateY(-4px) scale(0.98)',
    },
  };
});

// Ultra-premium GradientText for a truly mesmerizing text display.
export const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${alpha(
    theme.palette.primary.main,
    0.7
  )} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  fontWeight: 800,
}));