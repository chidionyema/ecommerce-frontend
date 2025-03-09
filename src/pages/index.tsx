'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, CircularProgress } from '@mui/material'; 
import dynamic from 'next/dynamic';
import { SPACING } from '../utils/sharedStyles';

// Define an interface for components that need the onLoad prop
interface ComponentWithOnLoad {
  onLoad?: () => void;
}

// Dynamically import components with loading priority
const Hero = dynamic(() => import('../components/Home/Hero'), { 
  ssr: false,
  loading: () => <Box sx={{ height: '94vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <CircularProgress color="secondary" />
  </Box>
});

// Set loading priority for other components
const TechnologyShowcase = dynamic(() => import('../components/Home/TechnologyShowcase'), { 
  ssr: false,
  loading: () => <Box sx={{ height: '200px' }} /> // Placeholder height
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
  // Track component loading state
  const [componentsLoaded, setComponentsLoaded] = useState({
    hero: false,
    tech: false,
    why: false,
    services: false,
    testimonials: false,
    cta: false
  });
  
  // Control the visibility of components based on loading sequence
  const [showSections, setShowSections] = useState(false);
  
  // Effect to handle component loading sequence
  useEffect(() => {
    // First ensure the Hero is loaded
    const timer = setTimeout(() => {
      setComponentsLoaded(prev => ({...prev, hero: true}));
      
      // Then allow other sections to be shown in sequence
      setTimeout(() => {
        setShowSections(true);
      }, 300); // Small delay after hero is loaded
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle Hero component load
  const handleHeroLoad = () => {
    setComponentsLoaded(prev => ({...prev, hero: true}));
  };

  useEffect(() => {
    // Set hero as loaded after it's rendered
    setComponentsLoaded(prev => ({...prev, hero: true}));
  }, []);

  return (
    <div>
      <Head>
        <title>Enterprise Tech Solutions | Digital Transformation Experts</title>
        <meta
          name="description"
          content="Enterprise-grade technology solutions with precision engineering and proven results"
        />
      </Head>

      {/* Hero section - always show first */}
      <Box sx={{ mb: SPACING.large * 2 }}>
        {/* Remove the onLoad prop since Hero doesn't accept it */}
        <Hero />
      </Box>

      {/* Only show other sections after hero is loaded */}
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
          {/* Only add onLoad props if the components support them */}
          <TechnologyShowcase />
          <WhyChooseUs />
          <ServicesGrid />
          <TestimonialsSection />
          <CTASection /> 
        </Box>
      )}
    </div>
  );
}