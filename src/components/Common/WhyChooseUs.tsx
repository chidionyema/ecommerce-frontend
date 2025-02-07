'use client';

import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemIcon, useTheme, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, Rocket, ShieldCheck, TrendingUp } from 'lucide-react';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import NextLink from 'next/link';

const WhyChooseUs = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);

  // Benefit-oriented reasons
  const reasons = [
    {
      id: 1,
      text: 'Deep Industry Expertise',
      description:
        'Benefit from the insights of seasoned consultants with extensive experience across diverse technology sectors.',
      icon: Lightbulb,
    },
    {
      id: 2,
      text: 'Tailored, Innovative Solutions',
      description:
        'Receive custom-crafted strategies and cutting-edge solutions designed specifically for your unique challenges and goals.',
      icon: Rocket,
    },
    {
      id: 3,
      text: 'Reliable & Agile Execution',
      description:
        'Count on our proven methodologies and adaptable approach to ensure projects are delivered on time and to the highest standards.',
      icon: ShieldCheck,
    },
    {
      id: 4,
      text: 'Scalable Solutions for Growth',
      description:
        'Implement future-proof solutions architected for scalability, supporting your business as it expands and evolves.',
      icon: TrendingUp,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: SPACING.large * 2,
        bgcolor: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: theme.palette.text.primary,
            mb: SPACING.medium,
            fontWeight: 700,
          }}
        >
          Why Partner with Us?
        </Typography>

        <Grid
          container
          spacing={SPACING.medium}
          justifyContent="center"
          alignItems="stretch" // Ensure all grid items stretch to the same height
        >
          {reasons.map((reason) => (
            <Grid item xs={12} md={6} key={reason.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reason.id * 0.1,
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.03 }}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    p: SPACING.medium,
                    borderRadius: 'md',
                    boxShadow: theme.shadows[2],
                    backgroundColor: theme.palette.background.paper,
                    height: '100%',     // Fill the available height
                    minHeight: 300,     // Ensure a consistent minimum height regardless of content
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      borderRadius: '50%',
                      width: 50,
                      height: 50,
                      mb: SPACING.small,
                    }}
                  >
                    <reason.icon size={28} color={theme.palette.primary.main} />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: SPACING.small,
                    }}
                  >
                    {reason.text}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }} // Push description to take up available space
                  >
                    {reason.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: SPACING.large }}>
          <NextLink href="/contact" passHref legacyBehavior>
            <Button variant="contained" color="secondary" size="large" sx={styles.button}>
              Explore Our Services
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
