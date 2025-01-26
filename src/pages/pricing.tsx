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

const LazyPricingCard = styled(motion(Box))(({ theme }) => ({
  position: 'relative',
  backdropFilter: 'blur(20px)',
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.96)}, ${alpha(theme.palette.background.default, 0.98)})`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: `0 24px 48px ${alpha(theme.palette.primary.dark, 0.08)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: alpha(theme.palette.primary.main, 0.4),
    boxShadow: `0 32px 64px ${alpha(theme.palette.primary.dark, 0.15)}`,
    '@media (prefers-reduced-motion: reduce)': {
      transform: 'none',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    background: `radial-gradient(600px circle at var(--x) var(--y), ${alpha(theme.palette.primary.main, 0.1)}, transparent 60%)`,
    opacity: 0,
    transition: 'opacity 0.3s',
    zIndex: 1,
    pointerEvents: 'none'
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    '&:hover::after': {
      opacity: 0.2
    }
  },
}));

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
              lineHeight: 1.1
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
            <Grid item xs={12} md={4} key={planType} sx={{ display: 'flex' }}>
              <LazyPricingCard
                className="luxury-card"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={!isTouch ? { 
                  scale: 1.02
                } : {}}
                sx={{
                  '&:active': isTouch ? { 
                    transform: 'scale(0.98)',
                    boxShadow: `0 24px 48px ${alpha(theme.palette.primary.dark, 0.1)}`
                  } : {}
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    duration: 4 + index, 
                    repeat: Infinity, 
                    ease: 'easeInOut',
                    delay: index * 0.2 
                  }}
                  style={{ textAlign: 'center', filter: `drop-shadow(0 8px 16px ${alpha(theme.palette.primary.main, 0.2)})` }}
                >
                  {planType === 'hourly' && <Clock size={isMobile ? 56 : 64} style={iconStyle(theme)} />}
                  {planType === 'project' && <Briefcase size={isMobile ? 56 : 64} style={iconStyle(theme)} />}
                  {planType === 'retainer' && <Users size={isMobile ? 56 : 64} style={iconStyle(theme)} />}
                </motion.div>

                <Box sx={{ 
                  position: 'relative',
                  mb: 4,
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
                  <Typography variant="h3" sx={titleStyle(theme, isMobile)}>
                    {planType === 'hourly' && 'Expert Consultation'}
                    {planType === 'project' && 'Managed Solutions'}
                    {planType === 'retainer' && 'Strategic Partnership'}
                  </Typography>
                </Box>

                <Box component="ul" sx={featureListStyle(isTouch)}>
                  {getFeatures(planType).map((FeatureComponent, idx) => (
                    <FeatureComponent key={idx} />
                  ))}
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
                    TouchRippleProps={{ 
                      classes: {
                        child: 'bg-white/20'
                      }
                    }}
                  >
                    <Box component="span" sx={buttonContentStyle}>
                      {planType === 'hourly' && 'Start Consultation'}
                      {planType === 'project' && 'Begin Project'}
                      {planType === 'retainer' && 'Create Partnership'}
                      <Box component="span" sx={arrowStyle}>→</Box>
                    </Box>
                  </Button>
                </motion.div>
              </LazyPricingCard>
            </Grid>
          ))}
        </Grid>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
        >
          <Box sx={ctaSectionStyle(theme, isMobile)}>
            <Typography variant="h2" sx={ctaTitleStyle(isMobile)}>
              Build Your Digital Future
            </Typography>
            <motion.div 
              whileHover={!isTouch ? { scale: 1.05 } : {}} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={finalCtaButtonStyle(theme, isMobile)}
                onClick={() => handlePlanSelection('vip-consultation')}
                TouchRippleProps={{ 
                  classes: {
                    child: 'bg-white/20'
                  }
                }}
              >
                Start Digital Transformation
                <Box component="span" sx={{ ...finalArrowStyle, ml: { xs: 1, sm: 2 } }}>⟢</Box>
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </LazyMotion>
  );
};

const FeatureItem = memo<FeatureItemProps>(({ icon: Icon, text }) => {
  const theme = useTheme();
  return (
    <Box component="li" sx={listItemStyle}>
      <Icon size={24} style={{ color: theme.palette.primary.main, marginRight: 16 }} />
      <Typography variant="body2" sx={featureTextStyle}>{text}</Typography>
    </Box>
  );
});

const iconStyle = (theme: any) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  margin: '0 auto 24px'
});

const titleStyle = (theme: any, isMobile: boolean) => ({
  fontWeight: 800,
  letterSpacing: '-0.02em',
  color: 'text.primary',
  textAlign: 'center',
  fontSize: isMobile ? '1.75rem' : '2rem',
  lineHeight: 1.2,
  textShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`
});

const featureListStyle = (isTouch: boolean) => ({
  pl: 0,
  listStyle: 'none',
  mb: 4,
  '& li': {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
    p: { xs: 1.5, sm: 2 },
    borderRadius: 2,
    transition: 'all 0.2s ease',
    background: 'rgba(255, 255, 255, 0.02)',
    '&:hover': !isTouch ? {
      background: 'rgba(255, 255, 255, 0.05)',
      transform: 'translateX(4px)'
    } : {}
  }
});

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  mb: 2,
  p: { xs: 1.5, sm: 2 },
  borderRadius: 2,
  transition: 'all 0.2s ease'
};

const featureTextStyle = {
  fontWeight: 500,
  fontSize: { xs: '1rem', sm: '1.1rem' },
  letterSpacing: '-0.01em'
};

const ctaButtonStyle = (theme: any, isMobile: boolean) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: '12px',
  py: { xs: 2, sm: 3 },
  fontSize: { xs: '1rem', sm: '1.1rem' },
  '&:active': {
    transform: 'scale(0.98)'
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, ${alpha(theme.palette.common.white, 0.1)}, ${alpha(theme.palette.common.white, 0.2)})`,
    opacity: 0,
    transition: 'opacity 0.3s ease'
  }
});

const buttonContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 2
};

const arrowStyle = {
  ml: 1.5,
  display: 'inline-flex',
  transition: 'transform 0.3s ease'
};

const ctaSectionStyle = (theme: any, isMobile: boolean) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.secondary.main, 0.9)})`,
  color: 'common.white',
  borderRadius: 4,
  p: isMobile ? 4 : 6,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  mx: { xs: -2, sm: 0 },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url(/noise-texture.webp)',
    opacity: 0.1
  }
});

const ctaTitleStyle = (isMobile: boolean) => ({
  fontWeight: 900,
  mb: 3,
  fontSize: isMobile ? '2rem' : '2.5rem',
  letterSpacing: '-0.02em',
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
});

const finalCtaButtonStyle = (theme: any, isMobile: boolean) => ({
  px: { xs: 4, sm: 6 },
  py: { xs: 1.5, sm: 2.5 },
  borderRadius: '12px',
  fontWeight: 700,
  fontSize: { xs: '1rem', sm: '1.1rem' },
  whiteSpace: 'normal',
  textAlign: 'center',
  lineHeight: 1.3,
  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.2)} 0%, ${alpha(theme.palette.common.white, 0.1)} 100%)`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
  '&:active': {
    transform: 'scale(0.98)'
  }
});

const finalArrowStyle = {
  display: 'inline-flex',
  transform: 'rotate(-45deg)',
  transition: 'transform 0.3s ease'
};

const getFeatures = (planType: string) => {
  const features = {
    hourly: [
      { icon: Clock, text: 'Immediate expert access' },
      { icon: Award, text: 'Proven track record' },
      { icon: Calendar, text: 'Flexible scheduling' }
    ],
    project: [
      { icon: Briefcase, text: 'Full project ownership' },
      { icon: Users, text: 'Dedicated team' },
      { icon: Calendar, text: 'Agile milestones' }
    ],
    retainer: [
      { icon: Info, text: 'Priority support' },
      { icon: Award, text: 'Strategic roadmap' },
      { icon: Calendar, text: 'Predictable budgeting' }
    ]
  };

  return features[planType as keyof typeof features].map(({ icon, text }) => (
    () => <FeatureItem key={text} icon={icon} text={text} />
  ));
};

export default UltraPricingPage;