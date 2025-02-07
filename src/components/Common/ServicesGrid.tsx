'use client';

import React from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';

const services = [
  {
    title: 'Strategic Consulting',
    content: 'Tailored, data-driven strategies for business excellence.',
  },
  {
    title: 'Expert Guidance',
    content: 'Dedicated support from industry-leading professionals.',
  },
  {
    title: 'Custom Solutions',
    content: 'Bespoke solutions to fit your unique business requirements.',
  },
];

const ServicesGrid = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: SPACING.large,
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
            mb: SPACING.large,
          }}
        >
          Exclusive Services Tailored for You
        </Typography>
        <Grid container spacing={SPACING.medium} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TechCard icon={null} title={service.title} color={theme.palette.primary.main}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  mt={SPACING.small}
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
