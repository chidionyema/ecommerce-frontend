'use client';

import Head from 'next/head';
import { Box, Container, Typography, useTheme, Divider } from '@mui/material';
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
      <Box sx={{ mb: SPACING.large * 2 }}> {/* Increased margin below Hero */}
        <Hero />
      </Box>

      <LandingPageLayout>
        <Container maxWidth="lg" sx={{ mb: SPACING.large * 3 }}> {/* Increased margin below TechnologyShowcase */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING,
              p: SPACING,
            }}
          >
            <TechnologyShowcase />
          </Box>
        </Container>

        {/* Removed StyledDivider */}

        <Container maxWidth="lg" sx={{ mb: SPACING.large * 3 }}> {/* Increased margin below WhyChooseUs */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING,
              p: SPACING,
            }}
          >
            <WhyChooseUs />
          </Box>
        </Container>

        {/* Removed StyledDivider */}

        <Container maxWidth="lg" sx={{ mb: SPACING.large * 3 }}> {/* Increased margin below ServicesGrid */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING,
              p: SPACING,
            }}
          >
            <ServicesGrid />
          </Box>
        </Container>

        {/* Removed StyledDivider */}

        <Container maxWidth="lg" sx={{ mb: SPACING.large * 3 }}> {/* Increased margin below TestimonialsSection */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING,
              p: SPACING,
            }}
          >
            <TestimonialsSection />
          </Box>
        </Container>
      </LandingPageLayout>
    </div>
  );
}