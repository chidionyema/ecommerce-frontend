// components/Home/TechnologyShowcase.tsx
'use client';

import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SPACING, getSharedStyles, CARD_STYLES } from '../../utils/sharedStyles'; // Import
import TechCard from '../Common/TechCard';
import { techIcons } from './tech-data';



const TechnologyShowcase = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true }); //Good for performatic animations

    const floatingVariants = {
        hover: {
            y: [-5, 5, -5],  // Subtle vertical movement
            scale: 1.05,       // Slight scale on hover
            transition: {
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, //Gentle
                scale: { duration: 0.2 },
            }
        },
        rest: {
            y: [0,0,0],
            scale: 1,
            transition: {
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }
        }
    };

  return (
    <Box
      component="section"
      sx={{
        width: '100%', // Full width (removed the -50vw trick, not needed here)
        py: SPACING.large,
        bgcolor: 'background.default', // Use a theme background color
        overflow: 'hidden',
        // Optional: Add a subtle background pattern or texture here
      }}
    >
      <Container maxWidth="lg" ref={ref}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle, // Use shared styles!
            color: theme.palette.text.primary,  // Use theme color
            mb: SPACING.large,  // More margin
            // Optional: Add a subtle text shadow *if* it fits your brand
            // textShadow: `0 2px 4px ${alpha(theme.palette.text.primary, 0.2)}`,
          }}
        >
          Empowering Your Business with Cutting-Edge Technology
        </Typography>
        <Typography
            variant="subtitle1"
            component="p" // Use a paragraph for the subtitle
            align="center"
            sx={{
                ...styles.pageSubTitle,
                color: theme.palette.text.secondary,
                maxWidth: '800px', // Limit width for readability
                mx: 'auto', // Center horizontally
                mb: SPACING.large,
            }}
        >
            We leverage the latest technologies to build scalable, secure, and innovative solutions.
        </Typography>

        <Grid container spacing={SPACING.medium} justifyContent="center">
          {techIcons.map((tech, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
                <TechCard
                    icon={tech.icon}
                    title={tech.title}
                    color={tech.color} // Pass the color down
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