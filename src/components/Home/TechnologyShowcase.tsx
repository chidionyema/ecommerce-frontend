'use client';

import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard'; // Assuming TechCard doesn't take sx
import { techIcons } from './tech-data';

const TechnologyShowcase = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-digital.jpg'; // Replace with your actual image URL

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: SPACING.large,
        backgroundImage: imageLoaded ? `url(${imageUrl})` : 'none',
        backgroundColor: !imageLoaded ? theme.palette.background.default : 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blurred Background Image */}
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
            filter: 'blur(15px)', // Increase blur intensity for stronger effect
            zIndex: 0,
            opacity: 0.9, // Slightly increase opacity for more depth
          }}
        />
      )}

      {/* Overlay */}
      {imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: alpha(theme.palette.primary.dark, 0.8), // Further increase overlay opacity
            zIndex: 1,
          }}
        />
      )}

      {/* Content Section */}
      <Container ref={ref} sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: 'white',
            mb: SPACING.large,
            WebkitTextFillColor: 'white',
            WebkitTextStroke: '1px rgba(0, 0, 0, 0.5)',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.8)', // Increase shadow intensity
            px: { xs: 2, sm: 4, md: 8 },
            width: '100%',
          }}
        >
          Empowering Your Business with Cutting-Edge Technology
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          align="center"
          sx={{
            ...styles.pageSubTitle,
            color: alpha(theme.palette.common.white, 0.9),
            maxWidth: '800px',
            mx: 'auto',
            mb: SPACING.large,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            px: { xs: 2, sm: 4, md: 8 },
            width: '100%',
          }}
        >
          We leverage the latest technologies to build scalable, secure, and innovative solutions.
        </Typography>

        {/* Grid for Cards */}
        <Grid container spacing={SPACING.medium} justifyContent="center">
          {techIcons.map((tech, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TechCard 
                icon={tech.icon}
                title={tech.title}
                color={tech.color}
                index={index}
                floatingVariants={styles.floatingAnimation}
                // Apply necessary styles directly here to ensure visibility
                sx={{ 
                  backgroundColor: alpha(theme.palette.background.paper, 0.95), // Strong background color
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.5)', // Strong shadow
                  borderRadius: 3, // Slightly increase border radius
                  padding: SPACING.medium,
                  zIndex: 2, // Ensure cards are on top
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`, // Add subtle border for better definition
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)', // Increase hover shadow
                  },
                }} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TechnologyShowcase;