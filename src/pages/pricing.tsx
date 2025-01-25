import React from 'react';
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
import { Info, Award, Clock, Users, Mail, Calendar, Briefcase } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion, useScroll, useTransform } from 'framer-motion';

const PricingCard = styled(motion(Box))(({ theme }) => ({
  position: 'relative',
  backdropFilter: 'blur(16px)',
  background: `linear-gradient(
    145deg, 
    ${alpha(theme.palette.background.paper, 0.9)}, 
    ${alpha(theme.palette.background.default, 0.95)}
  )`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: `${theme.shadows[16]} ${alpha(theme.palette.primary.dark, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: alpha(theme.palette.primary.main, 0.4),
    boxShadow: `${theme.shadows[24]} ${alpha(theme.palette.primary.dark, 0.2)}`
  }
}));

const PricingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const handlePlanSelection = (planType: string) => {
    router.push(`/contact?plan=${encodeURIComponent(planType)}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 12 }}>
      {/* Animated background elements */}
      <motion.div
        style={{
          y,
          position: 'absolute',
          left: 0,
          right: 0,
          height: '100%',
          background: `radial-gradient(circle at 50% 50%, 
            ${alpha(theme.palette.primary.light, 0.05)} 0%, 
            transparent 60%)`,
          zIndex: 0,
        }}
      />

      {/* Value Proposition Header */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Box sx={{ 
          textAlign: 'center', 
          mb: 10,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -32,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '4px',
            background: theme.palette.gradients.primary,
            borderRadius: '2px'
          }
        }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 900,
              letterSpacing: '-0.03em',
              mb: 3,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              background: theme.palette.gradients.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`
            }}
          >
            Strategic Engagement Models
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              maxWidth: 800,
              mx: 'auto',
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: 1.6
            }}
          >
            Enterprise-grade solutions tailored to your operational requirements
          </Typography>
        </Box>
      </motion.div>

      {/* Pricing Models */}
      <Grid container spacing={6} sx={{ mb: 12, position: 'relative', zIndex: 1 }}>
        {['hourly', 'project', 'retainer'].map((planType, index) => (
          <Grid item xs={12} md={4} key={planType}>
            <PricingCard
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d'
              }}
            >
              {planType === 'hourly' && (
                <Clock size={56} style={{ 
                  marginBottom: 24,
                  background: theme.palette.gradients.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }} />
              )}
              {planType === 'project' && (
                <Briefcase size={56} style={{ 
                  marginBottom: 24,
                  background: theme.palette.gradients.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }} />
              )}
              {planType === 'retainer' && (
                <Users size={56} style={{ 
                  marginBottom: 24,
                  background: theme.palette.gradients.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }} />
              )}

              <Typography variant="h3" gutterBottom sx={{ 
                fontWeight: 800,
                letterSpacing: '-0.015em',
                color: 'text.primary'
              }}>
                {planType === 'hourly' && 'Expert Consultation'}
                {planType === 'project' && 'Managed Delivery'}
                {planType === 'retainer' && 'Strategic Partnership'}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ 
                mb: 4,
                minHeight: 72,
                fontSize: '1.1rem'
              }}>
                {planType === 'hourly' && 'On-demand access to senior technical leadership'}
                {planType === 'project' && 'End-to-end delivery of complex initiatives'}
                {planType === 'retainer' && 'Continuous innovation through dedicated collaboration'}
              </Typography>

              <Box component="ul" sx={{ 
  pl: 0, 
  listStyle: 'none',
  mb: 4,
  '& li': {
    display: 'flex',
    alignItems: 'center',
    mb: 2.5,
    padding: 1.5,
    borderRadius: 1,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.05)
    }
  }
}}>
  {/* Hourly Consultation Features */}
  {planType === 'hourly' && (
    <>
      <Box component="li">
        <Clock size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">On-demand access to senior architects</Typography>
      </Box>
      <Box component="li">
        <Award size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">15+ years experience guarantee</Typography>
      </Box>
      <Box component="li">
        <Calendar size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">Flexible 24/7 availability</Typography>
      </Box>
    </>
  )}

  {/* Project-Based Features */}
  {planType === 'project' && (
    <>
      <Box component="li">
        <Briefcase size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">End-to-end solution ownership</Typography>
      </Box>
      <Box component="li">
        <Users size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">Dedicated cross-functional team</Typography>
      </Box>
      <Box component="li">
        <Calendar size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">Agile milestone tracking</Typography>
      </Box>
    </>
  )}

  {/* Retainer Features */}
  {planType === 'retainer' && (
    <>
      <Box component="li">
        <Info size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">Priority SLA response times</Typography>
      </Box>
      <Box component="li">
        <Award size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">Strategic technology roadmap</Typography>
      </Box>
      <Box component="li">
        <Calendar size={20} style={{ marginRight: 12, color: theme.palette.primary.main }} />
        <Typography variant="body2">Predictable monthly investment</Typography>
      </Box>
    </>
  )}
</Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: theme.palette.gradients.primary,
                  borderRadius: '16px',
                  py: 2.5,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'common.white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[6],
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
                }}
                onClick={() => handlePlanSelection(planType)}
              >
                {planType === 'hourly' && 'Schedule Consultation'}
                {planType === 'project' && 'Initiate Project'}
                {planType === 'retainer' && 'Start Partnership'}
                <Box component="span" sx={{ ml: 1.5, display: 'inline-flex' }}>→</Box>
              </Button>
            </PricingCard>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Box sx={{ 
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
        }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 900,
            mb: 3,
            fontSize: isMobile ? '2rem' : '3rem',
            letterSpacing: '-0.02em'
          }}>
            Transform Your Technology Strategy
          </Typography>
          <Typography variant="h6" sx={{ 
            mb: 5,
            fontWeight: 500,
            opacity: 0.95,
            fontSize: '1.2rem'
          }}>
            Schedule a comprehensive architecture review with our experts
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 8,
              py: 2.5,
              borderRadius: '16px',
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px) scale(1.05)'
              }
            }}
            onClick={() => handlePlanSelection('consultation')}
          >
            Begin Transformation Journey
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default PricingPage;