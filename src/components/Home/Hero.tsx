'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Button, useTheme, alpha } from '@mui/material';
import NextLink from 'next/link';
import {
  SiAmazonaws,
  SiMicrosoftazure,
  SiGooglecloud,
  SiKubernetes,
  SiNvidia
} from 'react-icons/si'; // Real official brand icons from react-icons/si

const TECH_LOGOS = [
  { icon: SiAmazonaws, name: 'AWS' },
  { icon: SiMicrosoftazure, name: 'Microsoft Azure' },
  { icon: SiGooglecloud, name: 'Google Cloud' },
  { icon: SiKubernetes, name: 'Kubernetes' },
  { icon: SiNvidia, name: 'GPU Accelerated' },
];

export const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      }}
    >
      <Container maxWidth="xl">
        {/* Ultra-Magnetic, Readable Header */}
        <Typography
          variant="h3"
          align="center"
          sx={{ color: 'white', fontWeight: 700, mb: 2 }}
        >
          Next-Level Digital Transformation
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{ color: 'white', mb: 4 }}
        >
          Empowering startups with enterprise-grade cloud solutions
        </Typography>

        {/* Big Tech Icons */}
        <Grid container spacing={4} justifyContent="center">
          {TECH_LOGOS.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Grid item key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Icon
                    size={80}
                    color={theme.palette.common.white}
                    style={{
                      filter: `drop-shadow(0 0 10px ${alpha(theme.palette.common.white, 0.8)})`,
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ color: 'white', mt: 1 }}>
                    {tech.name}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Prominent CTA */}
        <Box textAlign="center" sx={{ mt: 6 }}>
          <NextLink href="/contact" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontWeight: 700,
                fontSize: '1.25rem',
                borderRadius: 2,
                background: theme.palette.secondary.main,
                color: 'white',
                boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': {
                  background: theme.palette.secondary.dark,
                },
              }}
            >
              Get in Touch
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
