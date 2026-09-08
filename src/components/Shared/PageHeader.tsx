'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  SxProps,
  Theme,
  alpha,
  styled,
  Grid,
  Container,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowForward } from '@mui/icons-material'; 
import { GradientButton } from '../../components/GradientButton';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  sx?: SxProps<Theme>;
  solutions?: { title: string; description: string; image: string; link: string }[];
  children?: React.ReactNode;
}

const SolutionCard = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
  },
}));

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  sx,
  children,
  solutions,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-realhero.jpg';

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);

  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        minHeight: { xs: '250px', md: '350px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        ...sx,
        backgroundColor: theme.palette.primary.main, // Fallback color
      }}
    >
      {/* Background Image with Blur and Fade Transition */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          filter: 'blur(1px)',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Overlay with Reduced Opacity */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: alpha(theme.palette.primary.dark, 0.2),
          zIndex: 1,
        }}
      />

      {/* Main Content Container */}
      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          py: isMobile ? 4 : 8,
        }}
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#fff',
              letterSpacing: 1,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontFamily: "'Poppins', sans-serif",
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {title}
          </Typography>
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: alpha(theme.palette.common.white, 0.9),
                maxWidth: 700,
                mx: 'auto',
                mt: 3,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                lineHeight: 1.6,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Box sx={{ mt: 5 }}>
                  <GradientButton
          href="/contact"
          label="Get in Touch"
          sizeVariant="medium" // "small", "medium", or "large"
          sx={{
            // Optional additional styles here
          }}
        />

          </Box>
        </motion.div>
      </Container>

      {/* Solutions Section (unchanged) */}
      {solutions && solutions.length > 0 && (
        <Box
          component="section"
          sx={{
            py: theme.spacing(8),
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            mt: theme.spacing(4),
            borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          {/* ... rest of solutions section ... */}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;