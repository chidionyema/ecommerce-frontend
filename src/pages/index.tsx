'use client';

import Head from 'next/head';
import { Box, Typography, useTheme, Divider } from '@mui/material'; 
import LandingPageLayout from '../components/Shared/LandingPageLayout';
import TechnologyShowcase from '../components/Home/TechnologyShowcase';
import ServicesGrid from '../components/Common/ServicesGrid';
import TestimonialsSection from '../components/Common/TestimonialsSection';
import WhyChooseUs from '../components/Common/WhyChooseUs';
import Hero from '../components/Home/Hero';
import { SPACING } from '../utils/sharedStyles';

export default function HomePage() {
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>Enterprise Tech Solutions | Digital Transformation Experts</title>
        <meta
          name="description"
          content="Enterprise-grade technology solutions with precision engineering and proven results"
        />
      </Head>

      {/* Hero section */}
      <Box sx={{ mb: SPACING.large * 2 }}>
        <Hero />
      </Box>

      {/* Removed LandingPageLayout and individual Containers */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.large * 2, // Apply spacing between sections
          // Remove padding, let the sections handle their own padding
        }}
      >
        <TechnologyShowcase />
        <WhyChooseUs />
        <ServicesGrid />
        <TestimonialsSection />
      </Box>
    </div>
  );
}