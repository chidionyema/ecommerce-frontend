import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';
import {
  Lightbulb,  // Example icons, adjust as needed
  Wrench,
  Code,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

const services = [
  {
    title: 'Strategic Consulting',
    content: 'Tailored, data-driven strategies for business excellence.',
    icon: Lightbulb, // Add icon
  },
  {
    title: 'Expert Guidance',
    content: 'Dedicated support from industry-leading professionals.',
    icon: Users, // Add icon
  },
  {
    title: 'Custom Solutions',
    content: 'Bespoke solutions to fit your unique business requirements.',
    icon: Code, // Add icon
  },
  {
    title: 'Implementation Services',
    content: 'Seamless integration of new technologies into your existing infrastructure.',
    icon: Wrench, // Add icon
  },
  {
    title: 'Performance Optimization',
    content: 'Enhance your systems for maximum efficiency and ROI.',
    icon: TrendingUp, // Add icon
  },
  {
    title: 'Security Audits',
    content: 'Comprehensive security assessments to protect your valuable assets.',
    icon: ShieldCheck, // Add icon
  },
];

const ServicesGrid = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-todo.jpg';

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
        backgroundColor: theme.palette.background.paper, // Remove any background image issues
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Overlay to ensure text visibility */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Strong overlay for contrast
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: 'white', // Make the title white
            mb: SPACING.large,
            fontWeight: 'bold',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.8)', // Strong shadow for better legibility
          }}
        >
          Exclusive Services Tailored for You
        </Typography>

        <Grid container spacing={SPACING.medium} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TechCard
                icon={service.icon ? <service.icon /> : null}
                title={service.title}
                color={theme.palette.primary.main}
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
              >
                <Typography
                  variant="body2"
                  textAlign="center"
                  mt={SPACING.small}
                  sx={{
                    color: theme.palette.text.primary, // High contrast text
                    fontWeight: 'bold', // Make content bold
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)', // Strong shadow for better readability
                  }}
                >
                  {service.content}
                </Typography>
              </TechCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesGrid;
