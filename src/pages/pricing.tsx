import React, { memo, useState } from 'react';
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
import { motion, LazyMotion, domAnimation } from 'framer-motion';

const PRIMARY_DARK = '#0A1A2F';
const SECONDARY_DARK = '#532F73';
const LIGHT_ACCENT = '#F2E7FE';
const PAGE_BG = '#F9FAFD';
const BACKDROP_BLUR = 'blur(28px)';

const noiseSVG = encodeURIComponent(`
  <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>
`);

const LazyPricingCard = styled(motion(Box))(({ theme }) => ({
  position: 'relative',
  background: alpha(theme.palette.background.paper, 0.65),
  borderRadius: '24px',
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: BACKDROP_BLUR,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  minHeight: 500,
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 32px 64px -12px ${alpha(PRIMARY_DARK, 0.2)}`,
    '&::before': { opacity: 0.3 }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(
        400px circle at var(--mouse-x) var(--mouse-y),
        ${alpha(SECONDARY_DARK, 0.1)} 0%,
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
    borderRadius: '24px',
    padding: '2px',
    background: `linear-gradient(145deg, 
      ${alpha(PRIMARY_DARK, 0.2)} 0%, 
      ${alpha(SECONDARY_DARK, 0.2)} 50%,
      ${alpha(PRIMARY_DARK, 0.2)} 100%)`,
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  }
}));

const PricingGrid = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const plans = [
    { 
      type: 'hourly',
      title: 'Expert Consultation',
      gradient: `linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.08)}, ${alpha(SECONDARY_DARK, 0.05)})`,
      features: [
        { icon: Clock, text: 'Flexible hourly consulting' },
        { icon: Award, text: 'Expert technical guidance' },
        { icon: Calendar, text: 'Priority scheduling' }
      ]
    },
    { 
      type: 'project',
      title: 'Managed Solutions',
      gradient: `linear-gradient(135deg, ${alpha(SECONDARY_DARK, 0.08)}, ${alpha(PRIMARY_DARK, 0.05)})`,
      features: [
        { icon: Briefcase, text: 'End-to-end project management' },
        { icon: Users, text: 'Dedicated engineering team' },
        { icon: Award, text: 'Quality assurance guarantee' }
      ]
    },
    { 
      type: 'retainer',
      title: 'Strategic Partnership',
      gradient: `linear-gradient(135deg, ${alpha(LIGHT_ACCENT, 0.08)}, ${alpha(SECONDARY_DARK, 0.05)})`,
      features: [
        { icon: Users, text: '24/7 technical support' },
        { icon: Award, text: 'Strategic technology roadmap' },
        { icon: Info, text: 'Monthly performance reviews' }
      ]
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <LazyMotion features={domAnimation}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: 6,
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
              mb: 2,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              background: `linear-gradient(45deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1
            }}>
              Engagement Options
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'text.secondary',
              maxWidth: 800,
              mx: 'auto',
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: 1.5
            }}>
              Custom enterprise solutions for digital innovation
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={plan.type}>
              <LazyPricingCard
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseMove={handleMouseMove}
                sx={{ background: plan.gradient }}
              >
                <Box sx={{ 
                  mb: 3, 
                  textAlign: 'center',
                  minHeight: 72
                }}>
                  <Typography variant="h4" sx={{
                    fontWeight: 800,
                    background: `linear-gradient(45deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: isMobile ? '1.5rem' : '1.75rem'
                  }}>
                    {plan.title}
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, mb: 3 }}>
                  {plan.features.map((feature) => (
                    <FeatureItem 
                      key={feature.text}
                      icon={feature.icon}
                      text={feature.text}
                    />
                  ))}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push(`/contact?plan=${plan.type}`)}
                  sx={{
                    mt: 'auto',
                    height: 56,
                    background: `linear-gradient(90deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
                    fontWeight: 700,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${alpha(PRIMARY_DARK, 0.3)}`
                    }
                  }}
                >
                  Get Started
                </Button>
              </LazyPricingCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </LazyMotion>
  );
};

const FeatureItem = memo<{ icon: React.ElementType; text: string }>(({ icon: Icon, text }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2,
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        background: isHovered ? alpha(SECONDARY_DARK, 0.05) : 'transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ 
          scale: isHovered ? 1.15 : 1,
          color: isHovered ? SECONDARY_DARK : alpha(PRIMARY_DARK, 0.8)
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon size={22} />
      </motion.div>
      <Typography variant="body1" sx={{ 
        ml: 3, 
        fontWeight: 500,
        color: isHovered ? PRIMARY_DARK : 'text.secondary',
        transition: 'color 0.3s ease',
        lineHeight: 1.3
      }}>
        {text}
      </Typography>
    </Box>
  );
});

export default PricingGrid;