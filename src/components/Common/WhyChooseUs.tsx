'use client';

import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemIcon, useTheme, Button, Grid } from '@mui/material'; // Added Grid
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, Rocket, ShieldCheck, TrendingUp } from 'lucide-react'; // More varied icons
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import NextLink from 'next/link';

const WhyChooseUs = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);

  // More descriptive and benefit-oriented reasons
  const reasons = [
    {
      id: 1,
      text: 'Deep Industry Expertise',
      description: 'Benefit from the insights of seasoned consultants with extensive experience across diverse technology sectors.',
      icon: Lightbulb, // More relevant icon
    },
    {
      id: 2,
      text: 'Tailored, Innovative Solutions',
      description: 'Receive custom-crafted strategies and cutting-edge solutions designed specifically for your unique challenges and goals.',
      icon: Rocket, // Icon for innovation
    },
    {
      id: 3,
      text: 'Reliable & Agile Execution',
      description: 'Count on our proven methodologies and adaptable approach to ensure projects are delivered on time and to the highest standards.',
      icon: ShieldCheck, // Icon for reliability
    },
    {
      id: 4,
      text: 'Scalable Solutions for Growth',
      description: 'Implement future-proof solutions architected for scalability, supporting your business as it expands and evolves.',
      icon: TrendingUp, // Icon for growth
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: SPACING.large * 2, // Increased padding for more visual breathing room
        bgcolor: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2" // Keep h2 for main title, but adjust style
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: theme.palette.text.primary,
            mb: SPACING.medium, // Reduced mb for tighter spacing
            fontWeight: 700, // Make title bolder
          }}
        >
          Why Partner with Us? {/* More engaging title */}
        </Typography>

        <Grid container spacing={SPACING.medium} justifyContent="center"> {/* Use Grid for layout */}
          {reasons.map((reason) => (
            <Grid item xs={12} md={6} key={reason.id}> {/* Responsive grid items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} // Slightly changed animation
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reason.id * 0.1, // Slightly adjusted delay
                  duration: 0.4, // Slightly adjusted duration
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.03 }} // Reduced hover scale slightly
              >
                <Box
                  sx={{
                    p: SPACING.medium,
                    borderRadius: 'md',
                    boxShadow: theme.shadows[2], // Added subtle shadow for depth
                    backgroundColor: theme.palette.background.paper, // Card background
                    height: '100%', // Ensure consistent height
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // Align items to start for better text flow
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: theme.palette.primary.light, // Lighter primary for icon background
                      color: theme.palette.primary.contrastText, // Ensure icon color contrast
                      borderRadius: '50%',
                      width: 50,
                      height: 50,
                      mb: SPACING.small, // Spacing below icon
                    }}
                  >
                    <reason.icon size={28} color={theme.palette.primary.main} /> {/* Use reason-specific icon */}
                  </Box>
                  <Typography
                    variant="h5" // Reduced to h5 for reason title
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: SPACING.small, // Spacing below title
                    }}
                  >
                    {reason.text}
                  </Typography>
                  <Typography
                    variant="body1" // Keep body1 for description
                    color="text.secondary"
                    sx={{ flexGrow: 1 }} // Push description to take available space
                  >
                    {reason.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: SPACING.large }}> {/* Increased mt here */}
          <NextLink href="/contact" passHref legacyBehavior>
            <Button variant="contained" color="secondary" size="large" sx={styles.button}> {/* Larger button */}
              Explore Our Services {/* More action-oriented CTA */}
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;