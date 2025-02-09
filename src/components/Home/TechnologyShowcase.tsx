// components/Home/TechnologyShowcase.tsx
'use client';

import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';
import { techIcons } from './tech-data';

const TechnologyShowcase = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-digital.jpg';

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
      {/* Blurred Background Image - Keep, but potentially adjust */}
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
            filter: 'blur(4px)', //  Adjust blur as needed!
            zIndex: 0,
            opacity: 0.8, // Adjust as needed
          }}
        />
      )}

      {/* Overlay - Keep, but potentially adjust */}
      {imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: alpha(theme.palette.primary.dark, 0.3), // Adjust opacity!
            zIndex: 1,
          }}
        />
      )}

      <Container  ref={ref} sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: imageLoaded ? 'white' : theme.palette.text.primary,
            mb: SPACING.large,
            WebkitTextFillColor: 'white',
            WebkitTextStroke: imageLoaded ? '1px rgba(0, 0, 0, 0.3)' : 'none',
            textShadow: imageLoaded ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none',
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
            color: imageLoaded ? alpha(theme.palette.common.white, 0.9) : theme.palette.text.secondary,
            maxWidth: '800px',
            mx: 'auto',
            mb: SPACING.large,
            textShadow: imageLoaded ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none',
            px: { xs: 2, sm: 4, md: 8 },
            width: '100%',
          }}
        >
          We leverage the latest technologies to build scalable, secure, and innovative solutions.
        </Typography>

        <Grid container spacing={SPACING.medium} justifyContent="center">
          {techIcons.map((tech, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              {/* Apply custom styles *here*, to this instance of TechCard */}
              <TechCard
                icon={tech.icon}
                title={tech.title}
                color={tech.color}
                index={index}
                floatingVariants={styles.floatingAnimation}
               
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TechnologyShowcase;