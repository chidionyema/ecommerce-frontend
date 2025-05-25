'use client';

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import LoadingSection from '@/components/Shared/LoadingSection';
import UltimateScrollNavigation from '@/components/Shared/UltimateScrollNavigation';
import { SPACING } from '@/utils/sharedStyles';

/* Motion-heavy pieces – no SSR */
const Hero               = dynamic(() => import('@/components/Home/Hero'),               { ssr: false, loading: () => <LoadingSection /> });
const TechnologyShowcase = dynamic(() => import('@/components/Home/TechnologyShowcase'), { ssr: false, loading: () => <LoadingSection /> });
const WhyChooseUs        = dynamic(() => import('@/components/Common/WhyChooseUs'),      { ssr: false, loading: () => <LoadingSection /> });
const ServicesGrid       = dynamic(() => import('@/components/Common/ServicesGrid'),     { ssr: false, loading: () => <LoadingSection /> });
const Testimonials       = dynamic(() => import('@/components/Common/TestimonialsSection'), { ssr: false, loading: () => <LoadingSection /> });
const CTA                = dynamic(() => import('@/components/Home/CTASection'),         { ssr: false, loading: () => <LoadingSection /> });

export default function LandingSections() {
  return (
    <>
      {/* Hero – above the fold */}
      <Box sx={{ mb: { xs: 0, md: SPACING.large } }}>
        <Hero />
      </Box>

      {/* Remaining Sections */}
      <TechnologyShowcase />
      <WhyChooseUs />
      <ServicesGrid />
      <Testimonials />
      <CTA />

      {/* Floating progress/navigation */}
      <UltimateScrollNavigation
        showProgressIndicator
        showSectionMenu
        showLabels
        enableSmartPositioning
        hideDelay={2500}
      />
    </>
  );
}
