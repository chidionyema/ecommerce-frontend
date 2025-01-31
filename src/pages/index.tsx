'use client';

import Head from 'next/head';
import { Box, useTheme } from '@mui/material';
import { HeroSection } from '../components/Home/Hero';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyPartner } from '../components/Home/WhyPartner';

export default function HomePage() {
  const theme = useTheme(); // Correct: useTheme inside the functional component

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default, // Access theme here
        minHeight: '100vh',
        p: theme.spacing(6),
      }}
    >
      <Head>
        <title>
          Enterprise Tech Solutions | Digital Transformation Experts
        </title>
        <meta
          name="description"
          content="Enterprise-grade technology solutions with precision engineering and proven results"
        />
      </Head>

      <HeroSection />
      <TechnologyShowcase />
      <WhyPartner />
    </Box>
  );
}