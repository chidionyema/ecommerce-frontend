import Head from 'next/head';
import { Box } from '@mui/material';
import LandingPageLayout from '../components/Shared/LandingPageLayout';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { ServicesGrid } from '../components/Common/ServicesGrid';
import { TestimonialsSection } from '../components/Common/TestimonialsSection';
import { SPACING } from '../utils/sharedStyles';
import { WhyChooseUs } from '../components/Common/WhyChooseUs';
import Hero from '../components/Home/Hero';

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

      {/* Wrap HeroSection in a Box with top margin */}
      <Box sx={{  }}>
        <Hero />
      </Box>

      <LandingPageLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            //gap: 20, // Use SPACING from sharedStyles.ts if needed
           // mt: SPACING, // Top margin for the inner Box
            padding: SPACING, // Consistent padding for the inner Box
          }}
        >
          <TechnologyShowcase />
          <WhyChooseUs />
          <ServicesGrid />
          <TestimonialsSection />
        </Box>
        </LandingPageLayout>
    </div>
  );
}
