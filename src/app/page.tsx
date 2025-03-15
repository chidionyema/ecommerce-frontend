"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, CircularProgress, Container } from '@mui/material';
import dynamic from 'next/dynamic';
import { SPACING } from '../utils/sharedStyles';
import UltimateScrollNavigation from '../components/Shared/UltimateScrollNavigation';

// Import components with dynamic loading
const Hero = dynamic(() => import('../components/Home/Hero'), { 
  ssr: false,
  loading: () => (
    <Box sx={{ height: '94vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress color="secondary" />
    </Box>
  )
});

const TechnologyShowcase = dynamic(() => import('../components/Home/TechnologyShowcase'), { 
  ssr: false,
  loading: () => <Box sx={{ height: '200px' }} />
});

const ServicesGrid = dynamic(() => import('../components/Common/ServicesGrid'), { 
  ssr: false,
  loading: () => <Box sx={{ height: '200px' }} />
});

const TestimonialsSection = dynamic(() => import('../components/Common/TestimonialsSection'), { 
  ssr: false,
  loading: () => <Box sx={{ height: '200px' }} />
});

const WhyChooseUs = dynamic(() => import('../components/Common/WhyChooseUs'), { 
  ssr: false,
  loading: () => <Box sx={{ height: '200px' }} />
});

const CTASection = dynamic(() => import('../components/Home/CTASection'), { 
  ssr: false,
  loading: () => <Box sx={{ height: '100px' }} />
});

export default function HomePage() {
  const [componentsLoaded, setComponentsLoaded] = useState({
    hero: false,
    tech: false,
    why: false,
    services: false,
    testimonials: false,
    cta: false
  });
  
  const [showSections, setShowSections] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setComponentsLoaded(prev => ({...prev, hero: true}));
      setTimeout(() => {
        setShowSections(true);
      }, 300);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Enterprise Tech Solutions | Digital Transformation Experts</title>
        <meta
          name="description"
          content="Enterprise-grade technology solutions with precision engineering and proven results"
        />
      </Head>
      
      <Container maxWidth="xl">
        {/* Hero section with top margin */}
        <Box sx={{ mt: SPACING.large * 2, mb: SPACING.large * 2 }}>
          <Hero />
        </Box>

        {showSections && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING.large * 2,
              opacity: componentsLoaded.hero ? 1 : 0,
              transition: 'opacity 0.5s ease-in',
            }}
          >
            <TechnologyShowcase />
            <WhyChooseUs />
            <ServicesGrid />
            <TestimonialsSection />
            <CTASection /> 
          </Box>
        )}
      </Container>
      
      {/* Add UltimateScrollNavigation for consistency with other pages */}
      <UltimateScrollNavigation 
        showProgressIndicator={true}
        showSectionMenu={true}
        showLabels={true}
        enableSmartPositioning={true}
        hideDelay={2500}
      />
    </>
  );
}