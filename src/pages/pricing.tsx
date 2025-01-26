import React, { memo, useCallback, useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Container, 
  useTheme, 
  styled,
  useMediaQuery,
  alpha
} from '@mui/material';
import { Info, Award, Clock, Users, Calendar, Briefcase } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion, useScroll, useTransform, LazyMotion, domAnimation } from 'framer-motion';

// SVG Noise Texture (Embedded)
const noiseSVG = encodeURIComponent(`
  <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>
`);

interface FeatureItemProps {
  icon: React.ElementType;
  text: string;
}

const useTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
};

const PremiumCardWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  '&:hover': {
    '& .premium-overlay': { opacity: 0.15 },
    '& .premium-glow': { opacity: 0.3 }
  }
}));

const PremiumOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `url("data:image/svg+xml,${noiseSVG}")`,
  opacity: 0.04,
  mixBlendMode: 'overlay',
  pointerEvents: 'none'
}));

const LazyPricingCard = styled(motion(Box))(({ theme }) => ({
  position: 'relative',
  backdropFilter: 'blur(24px)',
  background: `
    linear-gradient(
      145deg, 
      ${alpha(theme.palette.background.paper, 0.96)}, 
      ${alpha(theme.palette.background.default, 0.98)}
    )`,
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
  boxShadow: `
    0 24px 48px ${alpha(theme.palette.primary.dark, 0.08)},
    inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.05)}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  minHeight: { xs: '520px', md: '580px' },
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `
      0 40px 80px ${alpha(theme.palette.primary.dark, 0.15)},
      inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.1)}`,
    '&::after': { opacity: 0.2 }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    background: `
      radial-gradient(600px circle at var(--x) var(--y), 
      ${alpha(theme.palette.primary.main, 0.1)}, 
      transparent 60%)`,
    opacity: 0,
    transition: 'opacity 0.4s',
    pointerEvents: 'none'
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5),
    '&:hover::after': { opacity: 0.2 }
  },
}));

// Style Constants
const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  mb: 2,
  p: { xs: 1.5, sm: 2 },
  borderRadius: 2,
  transition: 'all 0.2s ease',
  background: 'rgba(255, 255, 255, 0.02)',
};

const featureTextStyle = {
  color: 'text.primary',
  fontSize: { xs: '0.9rem', sm: '1rem' },
  fontWeight: 500,
  lineHeight: 1.4,
};

const featureListStyle = (isTouch: boolean) => ({
  pl: 0,
  listStyle: 'none',
  mb: 4,
  '& li': {
    ...listItemStyle,
    '&:hover': !isTouch ? {
      background: 'rgba(255, 255, 255, 0.05)',
      transform: 'translateX(4px)'
    } : {}
  }
});

const ctaButtonStyle = (theme: any, isMobile: boolean) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: '12px',
  py: { xs: 2, sm: 3 },
  fontSize: { xs: '1rem', sm: '1.1rem' },
  fontWeight: 700,
  letterSpacing: '0.05em',
  '&:hover': {
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`
  }
});

// Feature Component
const FeatureItem = memo<FeatureItemProps>(({ icon: Icon, text }) => (
  <Box component="li" sx={listItemStyle}>
    <Icon size={24} sx={{ color: 'primary.main', mr: 2 }} />
    <Typography variant="body2" sx={featureTextStyle}>{text}</Typography>
  </Box>
));

const UltraPricingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTouch = useTouchDevice();
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const primaryGradient = theme.palette.gradients?.primary || 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)';

  const handlePlanSelection = useCallback((planType: string) => {
    router.push(`/contact?plan=${encodeURIComponent(planType)}`);
  }, [router]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouch) return;
    const cards = document.querySelectorAll<HTMLElement>('.luxury-card');
    const { left, top } = e.currentTarget.getBoundingClientRect();
    
    cards.forEach(card => {
      const xPos = e.clientX - left - card.clientWidth / 2;
      const yPos = e.clientY - top - card.clientHeight / 2;
      card.style.setProperty('--x', `${xPos}px`);
      card.style.setProperty('--y', `${yPos}px`);
    });
  }, [isTouch]);

  const getFeatures = (planType: string) => {
    const features = {
      hourly: [
        { icon: Clock, text: 'Flexible hourly consulting' },
        { icon: Award, text: 'Expert technical guidance' },
        { icon: Calendar, text: 'Priority scheduling' }
      ],
      project: [
        { icon: Briefcase, text: 'End-to-end project management' },
        { icon: Users, text: 'Dedicated engineering team' },
        { icon: Award, text: 'Quality assurance guarantee' }
      ],
      retainer: [
        { icon: Users, text: '24/7 technical support' },
        { icon: Award, text: 'Strategic technology roadmap' },
        { icon: Info, text: 'Monthly performance reviews' }
      ]
    };

    return features[planType as keyof typeof features].map(({ icon, text }) => 
      <FeatureItem key={text} icon={icon} text={text} />
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 12 }, position: 'relative' }}>
        <motion.div style={{
          y,
          position: 'absolute',
          left: '-20%',
          right: '-20%',
          height: '150%',
          background: `
            linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.03)} 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, ${alpha(theme.palette.secondary.light, 0.04)} 0%, transparent 70%)`,
          zIndex: 0
        }}/>

        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 6, md: 10 },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -32,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '3px',
              background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
              opacity: 0.8
            }
          }}>
            <Typography variant="h1" sx={{ 
              fontWeight: 900,
              letterSpacing: '-0.03em',
              mb: 2,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
              background: primaryGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              textShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
            }}>
              Technology Solutions
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'text.secondary',
              maxWidth: 800,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.5,
              fontWeight: 400,
              px: 2
            }}>
              Custom enterprise solutions for digital innovation
            </Typography>
          </Box>
        </motion.div>

        <Grid 
          container 
          spacing={{ xs: 4, md: 6 }} 
          sx={{ mb: { xs: 6, md: 12 }, zIndex: 1 }} 
          onMouseMove={!isTouch ? handleMouseMove : undefined}
        >
          {['hourly', 'project', 'retainer'].map((planType, index) => (
            <Grid item xs={12} md={4} key={planType} sx={{ display: 'flex', height: { md: 'auto' } }}>
              <PremiumCardWrapper>
                <PremiumOverlay className="premium-overlay" />
                <LazyPricingCard
                  className="luxury-card"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={!isTouch ? { scale: 1.02 } : {}}
                  sx={{
                    '&:active': isTouch ? { 
                      transform: 'scale(0.98)',
                      boxShadow: `0 24px 48px ${alpha(theme.palette.primary.dark, 0.1)}`
                    } : {}
                  }}
                >
                  <Box sx={{ 
                    position: 'relative',
                    mb: 4,
                    minHeight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: '2px',
                      background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0)} 0%, ${theme.palette.primary.main} 50%, ${alpha(theme.palette.primary.main, 0)} 100%)`,
                    }
                  }}>
                    <Typography variant="h3" sx={{
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      color: 'text.primary',
                      textAlign: 'center',
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      lineHeight: 1.2,
                      textTransform: 'uppercase',
                      padding: { xs: '0 16px', md: 0 }
                    }}>
                      {planType === 'hourly' && 'Expert Consultation'}
                      {planType === 'project' && 'Managed Solutions'}
                      {planType === 'retainer' && 'Strategic Partnership'}
                    </Typography>
                  </Box>

                  <Box component="ul" sx={{
                    ...featureListStyle(isTouch),
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    {getFeatures(planType)}
                  </Box>

                  <motion.div 
                    whileHover={!isTouch ? { scale: 1.03 } : {}} 
                    whileTap={{ scale: 0.97 }} 
                    style={{ marginTop: 'auto', position: 'relative' }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={ctaButtonStyle(theme, isMobile)}
                      onClick={() => handlePlanSelection(planType)}
                    >
                      {planType === 'hourly' && 'Start Consultation'}
                      {planType === 'project' && 'Begin Project'}
                      {planType === 'retainer' && 'Create Partnership'}
                    </Button>
                  </motion.div>
                </LazyPricingCard>
              </PremiumCardWrapper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </LazyMotion>
  );
};

export default UltraPricingPage;