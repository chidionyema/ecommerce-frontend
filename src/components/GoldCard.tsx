'use client';

import React, { useState, useRef } from 'react';
import {
  Card,
  CardActionArea,
  CardProps,
  styled,
  alpha,
  SxProps,
  Theme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';
import { keyframes } from '@mui/system';
import { NEUTRAL_BACKGROUND } from '../utils/sharedColors';

// ---------------------------------------------------------------------------
// KEYFRAMES & STYLED COMPONENTS (same as your original aesthetic)
// ---------------------------------------------------------------------------
const subtlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const GoldCardContainer = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(45deg, ${NEUTRAL_BACKGROUND} 0%, rgba(255, 255, 255, 0.05) 100%)`,
  borderRadius: 16,
  boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.5)}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  width: '100%',
  height: 'auto',
  margin: 0, 
  backdropFilter: 'blur(18px) saturate(180%)',
  border: `2px solid rgba(255, 255, 255, 0.1)`,
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 10px 28px ${alpha(theme.palette.common.black, 0.7)}`,
  },
}));

const HoverOverlay = styled(motion.div)({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  pointerEvents: 'none',
});

// ---------------------------------------------------------------------------
// GOLD CARD COMPONENT
// ---------------------------------------------------------------------------
export interface GoldCardProps extends CardProps {
  href?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Added the sx prop here
}

const GoldCard: React.FC<GoldCardProps> = ({ href, children, sx, ...rest }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ perspective: 1000, outline: 'none' }}
      tabIndex={0}
      role="article"
    >
      <GoldCardContainer sx={sx} {...rest}>
        <AnimatePresence>
          {hovered && (
            <HoverOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        {href ? (
          <CardActionArea
            component={NextLink}
            href={href}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            {children}
          </CardActionArea>
        ) : (
          <>{children}</>
        )}
      </GoldCardContainer>
    </motion.div>
  );
};

export default GoldCard;
