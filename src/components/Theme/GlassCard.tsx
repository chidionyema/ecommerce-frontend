// components/Theme/GlassCard.tsx
'use client';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material';

export const GlassCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(145deg, 
    ${alpha(theme.palette.primary.dark, 0.92)} 0%, 
    ${alpha(theme.palette.secondary.dark, 0.88)} 100%)`,
  backdropFilter: 'blur(24px) saturate(180%)',
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 48px ${alpha(theme.palette.primary.dark, 0.6)},
                inset 0 0 0 1px ${alpha(theme.palette.secondary.main, 0.4)}`,
  },
}));

export const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(45deg, 
    ${theme.palette.secondary.main} 30%, 
    ${alpha(theme.palette.primary.main, 0.7)} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
}));