import React, { memo, useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Container, 
  useTheme, 
  styled,
  useMediaQuery,
  alpha,
} from '@mui/material';
import { Info, Award, Clock, Users, Calendar, Briefcase } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion, LazyMotion, domAnimation, useMotionValue } from 'framer-motion';

// Import your branding tokens:
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  PAGE_BG,
  BACKDROP_BLUR,
  gradientShift,
  holographicEffect,
  noiseSVG,
  TITLE_GRADIENT, // e.g. 'linear-gradient(45deg, #4361EE 0%, #3A0CA3 100%)'
} from '../theme/branding';

const LazyPricingCard = styled(motion(Box))(({ theme }) => ({
  position: 'relative',
  background: `
    ${alpha(theme.palette.background.paper, 0.85)},
    url("data:image/svg+xml;utf8,${noiseSVG}")
  `,
  backgroundBlendMode: 'overlay',
  borderRadius: '32px',
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: `${BACKDROP_BLUR} brightness(120%)`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  minHeight: 560,
  overflow: 'hidden',
  perspective: 1000,
  boxShadow: `0 24px 48px -12px ${alpha(PRIMARY_DARK, 0.15)}`,
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: `0 40px 80px -16px ${alpha(SECONDARY_DARK, 0.25)}`,
    '&::before': { opacity: 0.4 },
    '&::after': { opacity: 1 }
  },
  // radial highlight & animated border:
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(
        400px circle at var(--mouse-x) var(--mouse-y),
        ${alpha(SECONDARY_DARK, 0.15)} 0%,
        transparent 60%
      )`,
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '32px',
    padding: '2px',
    background: `
      linear-gradient(
        145deg, 
        ${alpha(PRIMARY_DARK, 0.3)} 0%, 
        ${alpha(SECONDARY_DARK, 0.3)} 50%,
        ${alpha(PRIMARY_DARK, 0.3)} 100%
      )`,
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    animation: `${gradientShift} 8s linear infinite`,
    backgroundSize: '200% 200%',
    opacity: 0.8,
    transition: 'opacity 0.4s ease'
  }
}));

// Use your official "title gradient" or "tech gradient" here:
const primaryGradient = TITLE_GRADIENT;

const PricingGrid = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const plans = [
    {
      type: 'hourly',
      title: 'Expert Consultation',
      // Subtle brand gradient on the card:
      gradient: `linear-gradient(135deg,
        ${alpha(PRIMARY_DARK, 0.06)},
        ${alpha(SECONDARY_DARK, 0.04)}
      )`,
      features: [
        { icon: Clock, text: 'Flexible hourly consulting' },
        { icon: Award, text: 'Expert technical guidance' },
        { icon: Calendar, text: 'Priority scheduling' }
      ],
      price: '$295/hr'
    },
    {
      type: 'project',
      title: 'Managed Solutions',
      gradient: `linear-gradient(135deg,
        ${alpha(SECONDARY_DARK, 0.06)},
        ${alpha(PRIMARY_DARK, 0.04)}
      )`,
      features: [
        { icon: Briefcase, text: 'End-to-end project management' },
        { icon: Users, text: 'Dedicated engineering team' },
        { icon: Award, text: 'Quality assurance guarantee' }
      ],
      price: 'Custom Quote'
    },
    {
      type: 'retainer',
      title: 'Strategic Partnership',
      gradient: `linear-gradient(135deg,
        ${alpha(PRIMARY_DARK, 0.06)},
        ${alpha(SECONDARY_DARK, 0.04)}
      )`,
      features: [
        { icon: Users, text: '24/7 technical support' },
        { icon: Award, text: 'Strategic technology roadmap' },
        { icon: Info, text: 'Monthly performance reviews' }
      ],
      price: 'Starting at $15k/mo'
    }
  ];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {/* Unified background for the Pricing page */}
      <Box sx={{ backgroundColor: PAGE_BG, py: 10 }}>
        <Container maxWidth="lg">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Box sx={{ 
              textAlign: 'center', 
              mb: 8,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -32,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${PRIMARY_DARK}, transparent)`,
                opacity: 0.8
              }
            }}>
              <Typography variant="h1" sx={{ 
                fontWeight: 900,
                letterSpacing: '-0.03em',
                mb: 3,
                fontSize: isMobile ? '2.75rem' : '4rem',
                background: TITLE_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1
              }}>
                Engagement Models
              </Typography>

              {/* Add an H2 for accessibility/SEO if needed */}
              <Typography variant="h2" sx={{
                fontWeight: 700,
                mt: 1,
                mb: 3,
                fontSize: isMobile ? '1.7rem' : '2rem',
                color: PRIMARY_DARK,
              }}>
                Find the Ideal Plan for Your Business
              </Typography>

              <Typography variant="subtitle1" sx={{
                color: 'text.secondary',
                maxWidth: 800,
                mx: 'auto',
                fontSize: isMobile ? '1.1rem' : '1.25rem',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                Tailored enterprise solutions with transparent pricing and elite support
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {plans.map((plan, index) => {
              const rotateX = useMotionValue(0);
              const rotateY = useMotionValue(0);
              const [zIndex, setZIndex] = useState(1);

              const handleCardMouseMove = (e: React.MouseEvent) => {
                handleMouseMove(e);
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                rotateX.set((y - centerY) / 24);
                rotateY.set(-(x - centerX) / 24);
                setZIndex(2);
              };

              return (
                <Grid item xs={12} sm={6} md={4} key={plan.type}>
                  <LazyPricingCard
                    initial={{ opacity: 0, y: 60, scale: 0.97, rotateX: 15 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={() => {
                      rotateX.set(0);
                      rotateY.set(0);
                      setZIndex(1);
                    }}
                    style={{ rotateX, rotateY, zIndex }}
                    sx={{ background: plan.gradient }}
                  >
                    <Box sx={{ 
                      position: 'absolute', 
                      inset: 0,
                      zIndex: 0,
                      background: `
                        linear-gradient(45deg, 
                          ${alpha(PRIMARY_DARK, 0.05)}, 
                          ${alpha(SECONDARY_DARK, 0.03)}),
                        url("data:image/svg+xml;utf8,${noiseSVG}")`,
                      opacity: 0.15,
                      mixBlendMode: 'overlay',
                      pointerEvents: 'none',
                    }} />

                    <Box sx={{ 
                      mb: 4, 
                      textAlign: 'center',
                      position: 'relative'
                    }}>
                      <Typography variant="h3" sx={{
                        fontWeight: 900,
                        background: TITLE_GRADIENT,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: isMobile ? '1.75rem' : '2.25rem',
                        letterSpacing: '-0.02em',
                        pb: 1,
                        position: 'relative',
                        display: 'inline-block',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '60%',
                          height: '2px',
                          background: `linear-gradient(90deg, transparent, ${alpha(SECONDARY_DARK, 0.4)}, transparent)`
                        }
                      }}>
                        {plan.title}
                      </Typography>
                      <Typography variant="h5" sx={{
                        mt: 2,
                        fontWeight: 700,
                        color: SECONDARY_DARK,
                        fontSize: isMobile ? '1.5rem' : '1.75rem'
                      }}>
                        {plan.price}
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, mb: 4 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature.text}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + featureIndex * 0.08 }}
                        >
                          <FeatureItem icon={feature.icon} text={feature.text} />
                        </motion.div>
                      ))}
                    </Box>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => router.push(`/contact?plan=${plan.type}`)}
                        sx={{
                          height: 56,
                          position: 'relative',
                          overflow: 'hidden',
                          background: primaryGradient,
                          borderRadius: '14px',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          letterSpacing: '-0.01em',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          '&:hover': {
                            boxShadow: `0 8px 24px ${alpha(PRIMARY_DARK, 0.3)}`
                          }
                        }}
                      >
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `
                            linear-gradient(90deg, 
                              transparent 20%, 
                              ${alpha(LIGHT_ACCENT, 0.2)} 50%, 
                              transparent 80%)`,
                          animation: `${holographicEffect} 3s infinite linear`
                        }} />
                        <Typography variant="button" sx={{ 
                          position: 'relative', 
                          zIndex: 1,
                          textShadow: `0 2px 4px ${alpha(PRIMARY_DARK, 0.2)}`
                        }}>
                          Start Now
                        </Typography>
                      </Button>
                    </motion.div>
                  </LazyPricingCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </LazyMotion>
  );
};

const FeatureItem = memo<{ icon: React.ElementType; text: string }>(({ icon: Icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2,
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        background: isHovered ? alpha(SECONDARY_DARK, 0.08) : 'transparent',
        backdropFilter: 'blur(4px)',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          '&::after': { opacity: 1 }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '12px',
          border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ 
          scale: isHovered ? 1.25 : 1,
          y: isHovered ? -4 : 0,
          color: isHovered ? SECONDARY_DARK : alpha(PRIMARY_DARK, 0.8)
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon size={24} />
      </motion.div>
      <Typography variant="body1" sx={{ 
        ml: 3, 
        fontWeight: 600,
        color: isHovered ? PRIMARY_DARK : 'text.secondary',
        transition: 'color 0.3s ease',
        lineHeight: 1.4,
        fontSize: '1.1rem'
      }}>
        {text}
      </Typography>
    </Box>
  );
});

export default PricingGrid;
