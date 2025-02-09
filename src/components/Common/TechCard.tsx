'use client';

import React, { ReactElement, ReactNode, useRef } from 'react';
import { Typography, useTheme } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { styled } from '@mui/system';
import { SPACING, FONT_SIZES } from '../../utils/sharedStyles';

export interface TechCardProps {
  icon?: ReactElement | null;
  title: string;
  color?: string;
  index?: number;
  floatingVariants?: any;
  textColor?: string; 
  children?: ReactNode;
  whileHover?: { scale: number };
  sx?: any; // Add sx prop to TechCardProps
}

const StyledTechCard = styled(motion.div)<{ color?: string }>(({ theme, color = 'transparent' }) => ({ // Default color is transparent
  position: 'relative',
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: '16px',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
  width: '100%',
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05) translateY(-5px)',
    boxShadow: `0 12px 32px ${color}40`, // Color is guaranteed to be a string
  },
}));

const TechCard: React.FC<TechCardProps> = ({
  icon,
  title,
  color,
  index = 0,
  floatingVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  },
  textColor, // Not used currently
  children,
  whileHover = { scale: 1.05 },
  sx, // Add sx prop to component
}) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <StyledTechCard
      color={color} // color could be undefined, but StyledTechCard has a default
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 80, damping: 12 }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      sx={sx} // Apply sx prop to the root element
    >
      {icon && (
        <motion.div
          variants={floatingVariants}
          initial="rest"
          animate="rest"
          whileHover="hover"
          style={{
            marginBottom: theme.spacing(2),
            display: 'flex',
            justifyContent: 'center',
            filter: `drop-shadow(0 0 12px ${color}80)`, // color could be undefined
          }}
        >
          {React.cloneElement(icon, { size: 40, strokeWidth: 1.2 })}
        </motion.div>
      )}

      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          fontSize: FONT_SIZES.h5,
          background: `linear-gradient(45deg, ${color}, ${color}CC)`, // color could be undefined
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.015em',
          mb: SPACING,
        }}
      >
        {title}
      </Typography>

      {children}
    </StyledTechCard>
  );
};

export default TechCard;