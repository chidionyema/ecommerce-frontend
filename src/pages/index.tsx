// pages/index.tsx
import Head from 'next/head';
import PageLayout from '../components/Shared/PageLayout';
import { HeroSection } from '../components/Home/Hero';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyPartner } from '../components/Common/WhyPartner';
import { ServicesGrid } from '../components/Common/ServicesGrid'; // Use named import
import { TestimonialsSection } from '../components/Common/TestimonialsSection'; // Use named import
import { Box } from '@mui/material';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Enterprise Tech Solutions | Digital Transformation Experts</title>
        <meta
          name="description"
          content="Enterprise-grade technology solutions with precision engineering and proven results"
        />
      </Head>

      <Box sx={{ mt: 10 }}>
      <HeroSection />
    </Box>

      
      <PageLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 30, mt: 15 }}>

    <TechnologyShowcase />
    <WhyPartner />
    <ServicesGrid />
    <TestimonialsSection />
  </Box>
</PageLayout>

    </>
  );
}