'use client';

import Head from 'next/head';
import { Box } from '@mui/material'; 
import dynamic from 'next/dynamic';
import { SPACING } from '../utils/sharedStyles';

// Dynamically import components to avoid SSR issues
const TechnologyShowcase = dynamic(() => import('../components/Home/TechnologyShowcase'), { ssr: false });
const ServicesGrid = dynamic(() => import('../components/Common/ServicesGrid'), { ssr: false });
const TestimonialsSection = dynamic(() => import('../components/Common/TestimonialsSection'), { ssr: false });
const WhyChooseUs = dynamic(() => import('../components/Common/WhyChooseUs'), { ssr: false });
const Hero = dynamic(() => import('../components/Home/Hero'), { ssr: false });
const CTASection = dynamic(() => import('../components/Home/CTASection'), { ssr: false });

export default function HomePage() {
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
        <CTASection /> 
      </Box>
    </div>
  );
}