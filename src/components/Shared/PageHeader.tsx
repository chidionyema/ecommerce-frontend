// components/Shared/PageHeader.tsx
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

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string; // Keep this for potential external use
  sx?: SxProps<Theme>;
  solutions?: { title: string; description: string; image: string; link: string }[];
  children?: React.ReactNode;
}

// Styled component for solution cards (optional, for the Solutions section)
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
  backgroundImage,
  sx,
  children,
  solutions,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-parnetship-1024x1024.jpg'; // Constant image URL

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
        backgroundColor: !imageLoaded ? theme.palette.primary.main : 'transparent',
      }}
    >
      {/* Background Image (conditional) */}
      {imageLoaded && (
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
          }}
        />
      )}

      {/*  Reduced Blur */}
      {imageLoaded && (
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
            filter: 'blur(1px)', // Very subtle blur, or remove this line entirely
            zIndex: 0,
            opacity: 1, // Increased opacity of blurred image
          }}
        />
      )}

      {/* Overlay - Reduced Opacity */}
      {imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: alpha(theme.palette.primary.dark, 0.2), // Much lower opacity
            zIndex: 1,
          }}
        />
      )}


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
              WebkitTextFillColor: 'white',
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.2)', // Keep stroke, but...
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // ...reduce shadow intensity
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
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)', // Reduced shadow
              }}
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}

        {/* ... (rest of your button and solutions code - unchanged) */}
        {children}

               <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Box sx={{ mt: 5 }}>
            <NextLink href="/contact" passHref legacyBehavior>
              <Button
                variant="contained"
                color="secondary"
                aria-label="Get in touch"
                endIcon={<ArrowForward />}
                sx={{
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Get in Touch
              </Button>
            </NextLink>
          </Box>
        </motion.div>
      </Container>

      {/* Optional Solutions Section */}
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
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 4,
              }}
            >
              Our Featured Solutions
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {solutions.map((solution, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <SolutionCard>
                    <Box
                      component="img"
                      src={solution.image}
                      alt={solution.title}
                      sx={{
                        maxWidth: '100%',
                        height: 'auto',
                        mb: 2,
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {solution.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {solution.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        component={NextLink}
                        href={solution.link}
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'none' }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </SolutionCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;