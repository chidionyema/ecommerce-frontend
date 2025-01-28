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
  StyledEngineProvider
} from '@mui/material';
import { Info, Award, Clock, Users, Calendar, Briefcase } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

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
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: 'blur(12px)',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  minHeight: 500,
  [theme.breakpoints.down('md')]: {
    minHeight: 480,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 'auto',
    height: 'auto',
  },
  '&:hover': {
    background: alpha(theme.palette.background.paper, 0.8),
    transform: 'translateY(-8px)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: '2px',
    background: `linear-gradient(45deg, 
      ${alpha(theme.palette.primary.main, 0.2)} 0%, 
      ${alpha(theme.palette.secondary.main, 0.2)} 50%,
      ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,${noiseSVG}")`,
    opacity: 0.04,
    mixBlendMode: 'soft-light',
    pointerEvents: 'none'
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
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)}, ${alpha('#6366f1', 0.1)})`,
      features: [
        { icon: Clock, text: 'Flexible hourly consulting' },
        { icon: Award, text: 'Expert technical guidance' },
        { icon: Calendar, text: 'Priority scheduling' }
      ]
    },
    { 
      type: 'project',
      title: 'Managed Solutions',
      gradient: `linear-gradient(135deg, ${alpha('#10b981', 0.15)}, ${alpha('#0ea5e9', 0.1)})`,
      features: [
        { icon: Briefcase, text: 'End-to-end project management' },
        { icon: Users, text: 'Dedicated engineering team' },
        { icon: Award, text: 'Quality assurance guarantee' }
      ]
    },
    { 
      type: 'retainer',
      title: 'Strategic Partnership',
      gradient: `linear-gradient(135deg, ${alpha('#8b5cf6', 0.15)}, ${alpha('#ec4899', 0.1)})`,
      features: [
        { icon: Users, text: '24/7 technical support' },
        { icon: Award, text: 'Strategic technology roadmap' },
        { icon: Info, text: 'Monthly performance reviews' }
      ]
    }
  ];

  return (
    <StyledEngineProvider injectFirst>
      <LazyMotion features={domAnimation}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Box sx={{ 
              textAlign: 'center', 
              mb: { xs: 6, md: 8 },
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
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
                textShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
              }}>
                Engagement Options
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
            spacing={{ xs: 0, sm: 4 }}
            sx={{ 
              '& > .MuiGrid-item': { 
                display: 'flex', 
                flexDirection: 'column',
                [theme.breakpoints.down('sm')]: {
                  '&:not(:last-child)': { mb: 4 }
                }
              } 
            }}
          >
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={plan.type}>
                <LazyPricingCard
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  sx={{ background: plan.gradient }}
                >
                  <Box sx={{ 
                    mb: 3, 
                    textAlign: 'center', 
                    minHeight: 72,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="h4" fontWeight={800} sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      px: 1,
                      width: '100%',
                      fontSize: { xs: '1.5rem', md: '1.75rem' }
                    }}>
                      {plan.title}
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    flexGrow: 1,
                    mb: 3,
                    height: 240,
                    [theme.breakpoints.down('md')]: {
                      height: 220,
                    },
                    [theme.breakpoints.down('sm')]: {
                      height: 'auto',
                      minHeight: 200,
                    }
                  }}>
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
                      height: { xs: 56, sm: 48 },
                      minHeight: 48,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      fontWeight: 700,
                      fontSize: { xs: '1rem', sm: '0.875rem' },
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`
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
    </StyledEngineProvider>
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
        height: '100%',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        background: isHovered ? alpha(theme.palette.primary.main, 0.05) : 'transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ 
          scale: isHovered ? 1.15 : 1,
          color: isHovered ? theme.palette.primary.main : theme.palette.text.secondary
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon size={22} />
      </motion.div>
      <Typography variant="body1" sx={{ 
        ml: 3, 
        fontWeight: 500,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        color: isHovered ? theme.palette.text.primary : theme.palette.text.secondary,
        transition: 'color 0.3s ease',
        fontSize: { xs: '0.875rem', sm: '1rem' },
        lineHeight: 1.3,
      }}>
        {text}
      </Typography>
    </Box>
  );
});

export default PricingGrid;