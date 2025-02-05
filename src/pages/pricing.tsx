'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Button,
  styled,
} from '@mui/material';
import {
  motion,
  LazyMotion,
  domAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Info, Award, Clock, Users, Calendar, Briefcase } from 'lucide-react';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import { SHARED_CARD_BACKGROUND } from '../utils/sharedStyles';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyChooseUs } from '../components/Common/WhyChooseUs';
import { ServicesGrid } from '../components/Common/ServicesGrid';
import { TestimonialsSection } from '../components/Common/TestimonialsSection';

// Import shared colors (exact same values used in your ProjectCard)
import { NEUTRAL_BACKGROUND, NEUTRAL_TEXT, ACCENT_GOLD } from '../utils/sharedColors';

// ---------------------------------------------------------------------------
// CUSTOM HOOK: useTilt
// ---------------------------------------------------------------------------
// This hook returns 3D rotation values based on pointer position.
const useTilt = (active: boolean = true) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [-10, 10]);
  const rotateY = useTransform(x, [0, 1], [10, -10]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!active) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const posX = (e.clientX - bounds.left) / bounds.width;
    const posY = (e.clientY - bounds.top) / bounds.height;
    x.set(posX);
    y.set(posY);
  };

  return { rotateX, rotateY, handlePointerMove };
};

// ---------------------------------------------------------------------------
// PREMIUM CARD
// ---------------------------------------------------------------------------
// This card uses the same shared colors as the ProjectCard with a subtle gradient for depth.
const PremiumCard = styled(motion.div)(({ theme }) => ({
  borderRadius: 24,
  overflow: 'hidden',
  minHeight: 540,
  maxWidth: 420,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(45deg, ${NEUTRAL_BACKGROUND} 0%, rgba(255, 255, 255, 0.05) 100%)`, 
  // Add a subtle gradient for depth
  border: `2px solid rgba(255, 255, 255, 0.1)`,
  backdropFilter: 'blur(18px) saturate(180%)',
  boxShadow: `
    0 12px 24px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1)
  `,
  position: 'relative',
  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 24px 48px rgba(0, 0, 0, 0.6)`,
  },
}));

// ---------------------------------------------------------------------------
// FEATURE ITEM
// ---------------------------------------------------------------------------
interface FeatureItemProps {
  icon: React.ElementType;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, text }) => {
  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.5,
        px: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
      }}
    >
      <Icon style={{ color: NEUTRAL_TEXT, fontSize: '1.7rem' }} />
      <Typography
        variant="body2"
        sx={{
          ml: 2,
          fontWeight: 500,
          color: NEUTRAL_TEXT,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

// ---------------------------------------------------------------------------
// PLANS DATA
// ---------------------------------------------------------------------------
const plans = [
  {
    type: 'hourly',
    title: 'Expert Consultation',
    features: [
      { icon: Clock, text: 'Flexible hourly consulting' },
      { icon: Award, text: 'Expert technical guidance' },
      { icon: Calendar, text: 'Priority scheduling' },
    ],
    price: '$295/hr',
  },
  {
    type: 'project',
    title: 'Managed Solutions',
    features: [
      { icon: Briefcase, text: 'End-to-end project management' },
      { icon: Users, text: 'Dedicated engineering team' },
      { icon: Award, text: 'Quality assurance guarantee' },
    ],
    price: 'Custom Quote',
  },
  {
    type: 'retainer',
    title: 'Strategic Partnership',
    features: [
      { icon: Users, text: '24/7 technical support' },
      { icon: Award, text: 'Strategic technology roadmap' },
      { icon: Info, text: 'Monthly performance reviews' },
    ],
    price: 'Starting at $15k/mo',
  },
];

// ---------------------------------------------------------------------------
// PRICING GRID COMPONENT
// ---------------------------------------------------------------------------
const PricingGrid: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { rotateX, rotateY, handlePointerMove } = useTilt(true);

  const handlePlanClick = (type: string) => {
    router.push(`/contact?plan=${type}`);
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Grid
          container
          spacing={6}
          sx={{
            mt: 6,
            px: { xs: 2, md: 6 },
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          {plans.map(({ type, title, features, price }, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={type}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover="hover"
              transition={{ delay: 0.2 + index * 0.1 }}
              sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}
            >
              <PremiumCard
                onPointerMove={handlePointerMove}
                style={{ rotateX, rotateY }}
                whileHover={{ scale: 1.03 }}
                sx={{ height: '100%', width: '100%' }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, mb: 3, color: NEUTRAL_TEXT }}
                >
                  {title}
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {features.map((feature, i) => (
                    <FeatureItem key={i} {...feature} />
                  ))}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mt: 4,
                    color: ACCENT_GOLD,
                    fontSize: '1.4rem',
                  }}
                >
                  {price}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{mt: 3,
                    background: SHARED_CARD_BACKGROUND(theme),
                    color: NEUTRAL_TEXT,
                    fontWeight: 700,
                    borderRadius: '12px',
                    px: 4,
                    py: 1.2,
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease, background 0.3s ease',
                    '&:hover': {
                      background: `linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.3))`,
                      boxShadow: `0 6px 16px rgba(255,255,255,0.3)`,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                      backgroundSize: '200% 100%',
                      animation: '2s linear infinite',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover::after': {
                      opacity: 1,
                    },
                  }}
                  onClick={() => handlePlanClick(type)}
                >
                  {/* Subtle, concise, and impactful CTA for startups: */}
                  **Launch Your Vision** 
                </Button>
              </PremiumCard>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </LazyMotion>
  );
};

// ---------------------------------------------------------------------------
// PRICING PAGE
// ---------------------------------------------------------------------------
const PricingPage: React.FC = () => {
  return (
    <ConsistentPageLayout
      seoTitle="Fuel Your Startup's Growth: Premium Tech Consulting Pricing" // Enhanced SEO title
      seoDescription="Unlock your startup's full potential with our tailored pricing plans. Our expert consultants provide the guidance and support you need to succeed." 
      seoKeywords="startup tech consulting, growth strategy, innovation, scaling, funding"
      subtitle="Choose the plan that aligns with your ambitious vision." // More impactful subtitle
    >
      {/* Add a hero section with compelling visuals and copy */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '40vh', 
        backgroundImage: 'url(/images/hero-background.jpg)', // Replace with your actual hero image
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        color: '#fff', 
        textAlign: 'center' 
      }}>
        <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 'bold', mb: 3 }}>
          <span style={{ color: ACCENT_GOLD }}>Fuel Your Startup's Growth</span><br />
          **Premium Tech Consulting for Visionaries**
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '600px', mb: 5 }}>
          We understand the unique challenges and opportunities faced by startups. Our expert consultants are here to guide you every step of the way, from ideation to scaling. 
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '600px', mb: 5 }}>
          **Embrace the future. Partner with us to build a thriving, disruptive company.**
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          sx={{ 
            backgroundColor: ACCENT_GOLD, 
            color: '#fff', 
            '&:hover': {
              backgroundColor: '#ffd700' 
            } 
          }} 
        >
          **Book a Discovery Call** 
        </Button>
      </Box>

      <Box sx={{ mb: 30 }}>
        <PricingGrid />
      </Box>
      <TechnologyShowcase /> 
      <Box>
        <WhyChooseUs />
      </Box>
      <Box>
        <ServicesGrid />
      </Box>
      <Box>
        <TestimonialsSection /> 
      </Box>
    </ConsistentPageLayout>
  );
};

export default PricingPage;