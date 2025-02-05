// components/Common/TechCard.tsx
'use client';

import { Typography, useTheme } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { styled } from '@mui/system';
import { SPACING, FONT_SIZES } from '../../utils/sharedStyles';
import React, { ReactElement, ReactNode, useRef } from 'react';

interface TechCardProps {
  icon: ReactElement;
  title: string;
  color: string;
  index: number;
  floatingVariants: any;
  textColor?: string;
  children?: ReactNode; // For additional content
  whileHover?: { scale: number };
}

const StyledTechCard = styled(motion.div)<{ color: string }>(({ theme, color }) => ({
  position: 'relative',
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: '16px',
  cursor: 'pointer',
  overflow: 'hidden',
  background: `linear-gradient(145deg, ${color}10 0%, #ffffff30 100%)`,
  border: `1px solid ${color}30`,
  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
  width: '100%',
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05) translateY(-5px)',
    boxShadow: `0 12px 32px ${color}40`,
    borderColor: `${color}80`,
  },
}));

const TechCard: React.FC<TechCardProps> = ({
  icon,
  title,
  color,
  index,
  floatingVariants,
  textColor,
  children,
  whileHover = { scale: 1.05 },
}) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <StyledTechCard
      color={color}
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 80, damping: 12 }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <motion.div
        variants={floatingVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        style={{
          marginBottom: theme.spacing(2),
          display: 'flex',
          justifyContent: 'center',
          filter: `drop-shadow(0 0 12px ${color}80)`,
        }}
      >
        {icon ? React.cloneElement(icon, { size: 40, strokeWidth: 1.2 }) : null}
      </motion.div>

      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          fontSize: FONT_SIZES.h5,
          background: `linear-gradient(45deg, ${color}, ${color}CC)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.015em',
          mb: SPACING,
        }}
      >
        {title}
      </Typography>

      {/* Children (custom content) */}
      {children}
    </StyledTechCard>
  );
};

export default TechCard;
