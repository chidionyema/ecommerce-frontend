import React, { memo, useCallback } from 'react';
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

const LazyPricingCard = styled(motion(Box))(({ theme }) => ({
  position: 'relative',
  backdropFilter: 'blur(24px)',
  background: `linear-gradient(145deg, 
    ${alpha(theme.palette.background.paper, 0.96)}, 
    ${alpha(theme.palette.background.default, 0.98)})`,
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
  boxShadow: `0 48px 96px ${alpha(theme.palette.primary.dark, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, box-shadow',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    borderColor: alpha(theme.palette.primary.main, 0.6),
    boxShadow: `0 64px 128px ${alpha(theme.palette.primary.dark, 0.25)}`
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    background: `radial-gradient(800px circle at var(--x) var(--y), 
      ${alpha(theme.palette.primary.main, 0.15)}, 
      transparent 60%)`,
    opacity: 0,
    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1,
    pointerEvents: 'none'
  },
  '&:hover::after': {
    opacity: 0.3
  }
}));

const UltraPricingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const primaryGradient = theme.palette.gradients?.primary || 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)';
  const handlePlanSelection = useCallback((planType: string) => {
    router.push(`/contact?plan=${encodeURIComponent(planType)}`);
  }, [router]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const cards = document.querySelectorAll<HTMLElement>('.luxury-card');
    const { left, top } = e.currentTarget.getBoundingClientRect();
    
    cards.forEach(card => {
      const xPos = e.clientX - left - card.clientWidth / 2;
      const yPos = e.clientY - top - card.clientHeight / 2;
      card.style.setProperty('--x', `${xPos}px`);
      card.style.setProperty('--y', `${yPos}px`);
    });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <Container maxWidth="xl" sx={{ py: 12, position: 'relative', overflow: 'hidden' }}>
        <motion.div
          style={{
            y,
            position: 'absolute',
            left: '-20%',
            right: '-20%',
            height: '150%',
            background: `
              linear-gradient(45deg, 
                ${alpha(theme.palette.primary.light, 0.03)} 0%, 
                transparent 50%),
              radial-gradient(circle at 70% 30%, 
                ${alpha(theme.palette.secondary.light, 0.04)} 0%, 
                transparent 70%)`,
            zIndex: 0,
            willChange: 'transform'
          }}
        />

        <motion.div 
          initial={{ opacity: 0, y: 80, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: 10,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '160px',
              height: '4px',
              background: `linear-gradient(
                90deg, 
                ${alpha(theme.palette.primary.main, 0)} 0%, 
                ${theme.palette.primary.main} 50%, 
                ${alpha(theme.palette.primary.main, 0)} 100%
              )`,
              borderRadius: '2px'
            }
          }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 900,
                letterSpacing: '-0.03em',
                mb: 2,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                background: primaryGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`
              }}
            >
              Technology Engagement
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                maxWidth: 800,
                mx: 'auto',
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                lineHeight: 1.6,
                fontWeight: 400,
                letterSpacing: '-0.01em'
              }}
            >
              Bespoke enterprise solutions engineered for digital dominance
            </Typography>
          </Box>
        </motion.div>

        <Grid 
          container 
          spacing={6} 
          sx={{ mb: 12, position: 'relative', zIndex: 1 }}
          onMouseMove={handleMouseMove}
        >
          {['hourly', 'project', 'retainer'].map((planType, index) => (
            <Grid item xs={12} md={4} key={planType} sx={{ display: 'flex' }}>
              <LazyPricingCard
                className="luxury-card"
                initial={{ opacity: 0, y: 100, rotateZ: -3 }}
                animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { type: 'spring', stiffness: 150, damping: 15 }
                }}
                sx={{ 
                  maxWidth: { md: 400 },
                  minHeight: { md: 720 },
                  perspective: 1000,
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ 
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{ 
                    textAlign: 'center',
                    filter: `drop-shadow(0 12px 24px ${alpha(theme.palette.primary.main, 0.3)})`
                  }}
                >
                  {planType === 'hourly' && <Clock size={64} style={iconStyle(theme)} />}
                  {planType === 'project' && <Briefcase size={64} style={iconStyle(theme)} />}
                  {planType === 'retainer' && <Users size={64} style={iconStyle(theme)} />}
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
                    background: `linear-gradient(
                      90deg, 
                      ${alpha(theme.palette.primary.main, 0)} 0%, 
                      ${theme.palette.primary.main} 50%, 
                      ${alpha(theme.palette.primary.main, 0)} 100%
                    )`,
                    borderRadius: '2px'
                  }
                }}>
                  <Typography variant="h3" sx={titleStyle(theme)}>
                    {planType === 'hourly' && 'Executive Consultation'}
                    {planType === 'project' && 'Managed Excellence'}
                    {planType === 'retainer' && 'Strategic Alliance'}
                  </Typography>
                </Box>

                <Box component="ul" sx={featureListStyle}>
                  {getFeatures(planType).map((FeatureComponent, idx) => (
                    <FeatureComponent key={idx} />
                  ))}
                </Box>

                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  style={{ marginTop: 'auto', position: 'relative' }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={ctaButtonStyle(theme)}
                    onClick={() => handlePlanSelection(planType)}
                  >
                    <Box component="span" sx={buttonContentStyle}>
                      {planType === 'hourly' && 'Initiate Consultation'}
                      {planType === 'project' && 'Commence Project'}
                      {planType === 'retainer' && 'Establish Alliance'}
                      <Box component="span" sx={arrowStyle}>⇾</Box>
                    </Box>
                  </Button>
                </motion.div>
              </LazyPricingCard>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Box sx={ctaSectionStyle(theme)}>
            <Typography variant="h2" sx={ctaTitleStyle}>
              Architect Your Digital Empire
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="large"
                sx={finalCtaButtonStyle(theme)}
                onClick={() => handlePlanSelection('vip-consultation')}
              >
                Commence Transformation
                <Box component="span" sx={finalArrowStyle}>⟢</Box>
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
      <Typography variant="body2" sx={featureTextStyle}>
        {text}
      </Typography>
    </Box>
  );
});

// Style constants
const iconStyle = (theme: any) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  margin: '0 auto 32px'
});

const titleStyle = (theme: any) => ({
  fontWeight: 800,
  letterSpacing: '-0.02em',
  color: 'text.primary',
  textAlign: 'center',
  fontSize: '2rem',
  lineHeight: 1.2,
  textShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`
});

const featureListStyle = {
  pl: 0,
  listStyle: 'none',
  mb: 4,
  '& li': {
    display: 'flex',
    alignItems: 'center',
    mb: 3,
    padding: 2,
    borderRadius: 2,
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.02)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.05)',
      transform: 'translateX(8px)'
    }
  }
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  mb: 3,
  padding: 2,
  borderRadius: 2,
  transition: 'all 0.3s ease'
};

const featureTextStyle = {
  fontWeight: 500,
  fontSize: '1.1rem',
  letterSpacing: '-0.01em'
};

const ctaButtonStyle = (theme: any) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%)`,
  borderRadius: '16px',
  py: 3,
  fontWeight: 700,
  fontSize: '1.1rem',
  color: 'common.white',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
    '&:before': {
      opacity: 1
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, 
      ${alpha(theme.palette.common.white, 0.1)}, 
      ${alpha(theme.palette.common.white, 0.2)})`,
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

const ctaSectionStyle = (theme: any) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.9)}, 
    ${alpha(theme.palette.secondary.main, 0.9)})`,
  color: 'common.white',
  borderRadius: 6,
  p: 8,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url(/noise-texture.png)',
    opacity: 0.1
  }
});

const ctaTitleStyle = {
  fontWeight: 900,
  mb: 3,
  fontSize: '3rem',
  letterSpacing: '-0.02em',
  textShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
};

const finalCtaButtonStyle = (theme: any) => ({
  px: 8,
  py: 3,
  borderRadius: '16px',
  fontWeight: 700,
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.common.white, 0.2)} 0%, 
    ${alpha(theme.palette.common.white, 0.1)} 100%)`,
  backdropFilter: 'blur(8px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
  '&:hover': {
    transform: 'translateY(-2px) scale(1.05)'
  }
});

const finalArrowStyle = {
  ml: 2,
  display: 'inline-flex',
  transform: 'rotate(-45deg)',
  transition: 'transform 0.3s ease'
};

const getFeatures = (planType: string) => {
  const features = {
    hourly: [
      { icon: Clock, text: 'On-demand senior architects' },
      { icon: Award, text: '15+ years experience guarantee' },
      { icon: Calendar, text: '24/7 flexible availability' }
    ],
    project: [
      { icon: Briefcase, text: 'End-to-end solution ownership' },
      { icon: Users, text: 'Dedicated cross-functional team' },
      { icon: Calendar, text: 'Agile milestone tracking' }
    ],
    retainer: [
      { icon: Info, text: 'Priority SLA response times' },
      { icon: Award, text: 'Technology roadmap' },
      { icon: Calendar, text: 'Predictable investment' }
    ]
  };

  return features[planType as keyof typeof features].map(({ icon, text }) => (
    () => <FeatureItem key={text} icon={icon} text={text} />
  ));
};

export default UltraPricingPage;