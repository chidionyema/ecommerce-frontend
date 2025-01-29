import React, { useState } from 'react';
import Footer from './Footer';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  useTheme,
  Grid,
  Chip,
  styled,
  alpha,
  Avatar,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  TECH_GRADIENT,
  BACKDROP_BLUR,
  BORDER_RADIUS

} from '../theme/branding';

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: LIGHT_ACCENT,
  padding: theme.spacing(8),
  minHeight: '80vh',
  background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${SECONDARY_DARK} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: BORDER_RADIUS,
  margin: theme.spacing(3),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url(/grid-pattern.svg) repeat',
    opacity: 0.05,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 6),
  borderRadius: BORDER_RADIUS,
  fontWeight: 700,
  letterSpacing: '1px',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  background: TECH_GRADIENT,
  color: LIGHT_ACCENT,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.3)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 48px ${alpha('#4361EE', 0.4)}`,
  },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: BORDER_RADIUS,
  background: alpha(PRIMARY_DARK, 0.6),
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 48px ${alpha(PRIMARY_DARK, 0.4)}`,
  },
}));
const TestimonialSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(8, 0),
  background: `linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.98)} 0%, ${alpha(SECONDARY_DARK, 0.98)} 100%)`,
  borderRadius: BORDER_RADIUS,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
  margin: theme.spacing(4, 0),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url(/circuit-pattern.svg) repeat`,
    opacity: 0.03,
  },
}));

const TestimonialCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  borderRadius: BORDER_RADIUS,
  background: alpha(PRIMARY_DARK, 0.6),
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 48px ${alpha(PRIMARY_DARK, 0.4)}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BORDER_RADIUS,
    border: `1px solid transparent`,
    background: TECH_GRADIENT,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    opacity: 0.3,
  },
}));

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO @TechNova",
    text: "GLUStack's solutions transformed our infrastructure. The technical depth and execution speed were unparalleled.",
    logo: "/tech-nova-logo.svg",
    results: "300% Performance Boost"
  },
  {
    name: "Sarah Chen",
    role: "Lead Engineer @QuantumCore",
    text: "The most developer-friendly stack we've implemented. Reduced deployment time by 60% while improving scalability.",
    logo: "/quantum-core-logo.svg",
    results: "5x Faster Deployment"
  },
  {
    name: "Michael Donoghue",
    role: "VP Engineering @NeuroForge",
    text: "A game-changer for cloud-native development. Their API-first approach saved us thousands of engineering hours.",
    logo: "/neuroforge-logo.svg",
    results: "80% Cost Reduction"
  }
];

const Testimonials = () => {
  const [selected, setSelected] = useState(0);
  const theme = useTheme();

  return (
    <TestimonialSection>
      <Container maxWidth="xl">
        <Box textAlign="center" mb={8}>
          <Chip
            label="Industry Validation"
            variant="outlined"
            sx={{ 
              mb: 2,
              color: LIGHT_ACCENT,
              borderColor: alpha(LIGHT_ACCENT, 0.3),
              backdropFilter: BACKDROP_BLUR
            }}
          />
          <Typography variant="h3" gutterBottom sx={{ ...theme.typography.h3, mb: 2 }}>
            Trusted by Innovators
          </Typography>
          <Typography variant="body1" sx={{ color: alpha(LIGHT_ACCENT, 0.8) }}>
            Join thousands of technical leaders transforming their stack
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TestimonialCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setSelected(index)}
              >
                
                <Typography variant="body1" sx={{ 
                  mb: 3, 
                  lineHeight: 1.7,
                  color: alpha(LIGHT_ACCENT, 0.9)
                }}>
                  {testimonial.text}
                </Typography>

                <Divider sx={{ 
                  borderColor: alpha(LIGHT_ACCENT, 0.1), 
                  my: 3 
                }} />

                <Box display="flex" alignItems="center" gap={3}>
                  <Avatar
                    src={testimonial.logo}
                    sx={{ 
                      width: 56, 
                      height: 56,
                      background: alpha(LIGHT_ACCENT, 0.1),
                      border: `1px solid ${alpha(LIGHT_ACCENT, 0.2)}`
                    }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: alpha(LIGHT_ACCENT, 0.7),
                      fontSize: '0.9rem'
                    }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={testimonial.results}
                  sx={{
                    mt: 3,
                    background: TECH_GRADIENT,
                    color: PRIMARY_DARK,
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                />
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </TestimonialSection>
  );
};

const Layout = ({ children, showHeroSection = false }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeroSection && (
        <HeroSection>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h1" sx={theme.typography.h1}>
              Transform Your Business
            </Typography>
            <Typography variant="h5" sx={theme.typography.h5}>
              Expert-led solutions for digital transformation
            </Typography>
            <StyledButton href="/consultation">Start Your Journey</StyledButton>
          </motion.div>
        </HeroSection>
      )}

      <Container maxWidth="xl" component="main" sx={{ py: 8 }}>
        <Box sx={{ mb: 8 }}>{children}</Box>
        <Testimonials />

        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" sx={theme.typography.h4}>
            Ready to Accelerate Growth?
          </Typography>
          <StyledButton href="/contact" size="large">
            Schedule Free Consultation
          </StyledButton>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
