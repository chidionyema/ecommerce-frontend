"use client";

import React, { useState, useCallback, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Box, Typography, Button, Container, alpha, useTheme, SxProps, Theme, 
  CircularProgress, useMediaQuery
} from '@mui/material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';

// Types
interface CTAProps {
  text: string;
  link: string;
  ariaLabel?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  sx?: SxProps<Theme>;
  cta?: CTAProps;
  children?: React.ReactNode;
  id?: string;
  overlayStrength?: 'light' | 'medium' | 'strong';
  parallaxStrength?: number;
  titleGlow?: boolean;
}

// Styled components - preserving your original styling approach
const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: theme.palette.primary.dark,
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.2)}`,
  marginTop: 0,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(to right, 
      ${alpha(theme.palette.secondary.main, 0.7)}, 
      ${alpha(theme.palette.primary.light, 0.7)}, 
      ${alpha(theme.palette.secondary.main, 0.7)})`,
  }
}));

const BackgroundLayer = styled(motion.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
});

const OverlayLayer = styled(Box)<{ strength?: 'light' | 'medium' | 'strong' }>(({ theme, strength = 'medium' }) => {
  const strengthMap = {
    light: [0.6, 0.45, 0.65],
    medium: [0.8, 0.65, 0.85],
    strong: [0.9, 0.75, 0.95]
  };
  const [start, middle, end] = strengthMap[strength];
  
  return {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.primary.dark, start)} 0%, 
      ${alpha(theme.palette.primary.main, middle)} 50%, 
      ${alpha(theme.palette.primary.dark, end)} 100%)`,
    zIndex: 1,
    backdropFilter: 'blur(1px)'
  };
});

const ContentContainer = styled(Container)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
});

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  boxShadow: `0 0 20px ${alpha(theme.palette.secondary.main, 0.5)}`,
  borderRadius: '50%',
  padding: 5,
  backgroundColor: alpha(theme.palette.background.paper, 0.1),
}));

// Refined component with Ive-like precision but preserving original style
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage = '/images/istockphoto-realhero.jpg',
  sx,
  children,
  cta = { text: 'Get Started Now', link: '/contact' },
  id = 'page-header',
  overlayStrength = 'light',
  parallaxStrength = 1,
  titleGlow = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Parallax effect - preserved from original
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100 * parallaxStrength]);
  const backgroundScale = useTransform(scrollY, [0, 250], [1, 1.1]);
  const backgroundOpacity = useTransform(scrollY, [0, 250], [1, 0.6]);
  const titleY = useTransform(scrollY, [0, 250], [0, -30 * parallaxStrength]);
  const subtitleY = useTransform(scrollY, [0, 250], [0, -20 * parallaxStrength]);
  
  // Image loading - improved reliability
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    return () => { img.onload = null; img.onerror = null; };
  }, [backgroundImage, handleImageLoad, handleImageError]);

  // Particles effect - preserved from original with refinements
  const renderParticles = () => {
    const particles = Array(20).fill(null);
    return (
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        {particles.map((_, index) => {
          const size = Math.random() * 4 + 1;
          const duration = Math.random() * 30 + 20;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          
          return (
            <Box
              key={index}
              component={motion.div}
              sx={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: alpha('#ffffff', 0.2),
                left: `${initialX}%`,
                top: `${initialY}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 0.7, 0],
              }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <HeaderWrapper
      component="header"
      id={id}
      aria-labelledby={`${id}-title`}
      sx={{
        minHeight: { xs: '320px', sm: '380px', md: '440px' },
        mt: 0,
        mb: { xs: 4, sm: 5, md: 6 },
        mx: { xs: 2, sm: 3, md: 4 },
        ...sx,
      }}
    >
      {/* Background Image with Parallax - ensuring it's visible */}
      <BackgroundLayer
        style={{ 
          opacity: backgroundOpacity, 
          y: isMobile ? 0 : backgroundY,
          scale: backgroundScale
        }}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: 'brightness(1) contrast(1.2) saturate(1.1)', // Preserved your original filter
          transformOrigin: 'center',
        }}
      />

      {/* Particles effect - preserved */}
      {imageLoaded && renderParticles()}

      {/* Overlay - preserved your original */}
      <OverlayLayer strength={overlayStrength} />

      {/* Content */}
      <ContentContainer sx={{ py: { xs: 6, md: 8 }, position: 'relative' }}>
        {/* Loading indicator */}
        <AnimatePresence>
          {!imageLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 3,
              }}
            >
              <LoadingSpinner color="secondary" size={40} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title - preserved your original styling */}
        <motion.div 
          style={{ y: titleY }} 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Typography
            variant="h1"
            component="h1"
            id={`${id}-title`}
            sx={{
              fontWeight: 800,
              color: '#fff',
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              letterSpacing: '-0.01em',
              textShadow: titleGlow 
                ? `0 0 10px ${alpha(theme.palette.primary.light, 0.7)},
                   0 4px 25px ${alpha(theme.palette.common.black, 0.6)}`
                : '0 4px 25px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              display: 'inline-block',
              '&::after': titleGlow ? {
                content: '""',
                position: 'absolute',
                width: '120%',
                height: '15%',
                bottom: '-10px',
                left: '-10%',
                background: `radial-gradient(ellipse at center, ${alpha(theme.palette.secondary.main, 0.2)} 0%, transparent 70%)`,
                zIndex: -1,
              } : {},
            }}
          >
            {title}
          </Typography>
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.div 
            style={{ y: subtitleY }} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: alpha('#ffffff', 0.9),
                maxWidth: 800,
                mx: 'auto',
                mt: 2,
                mb: 1,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.6,
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.01em',
              }}
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}

        {/* CTA Button - preserved your original styling with subtle refinements */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Button
            component={NextLink}
            href={cta.link}
            variant="contained"
            endIcon={<ArrowForward />}
            aria-label={cta.ariaLabel || cta.text}
            sx={{
              mt: 4,
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              px: { xs: 3, md: 5 },
              py: { xs: 1.25, md: 1.5 },
              background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.5)}, 
                         0 10px 30px ${alpha(theme.palette.common.black, 0.2)}`,
              borderRadius: '50px',
              color: theme.palette.getContrastText(theme.palette.secondary.main),
              textTransform: 'none',
              letterSpacing: '0.5px',
              transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.main} 90%)`,
                transform: 'translateY(-5px) scale(1.02)',
                boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}, 
                           0 15px 40px ${alpha(theme.palette.common.black, 0.2)}`,
              },
              '&:active': {
                transform: 'translateY(-2px)',
                boxShadow: `0 2px 10px ${alpha(theme.palette.secondary.main, 0.4)}`,
              },
              '&:focus-visible': {
                outline: `3px solid ${alpha(theme.palette.secondary.light, 0.5)}`,
                outlineOffset: '3px',
              },
            }}
          >
            {cta.text}
          </Button>
        </motion.div>
      </ContentContainer>

      {children}
    </HeaderWrapper>
  );
};

export default PageHeader;