import React, { useState } from 'react';
import Footer from './Footer';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  useTheme,
  styled,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  TECH_GRADIENT,
  BACKDROP_BLUR,
  BORDER_RADIUS,
  microShine,
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
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.3)}`,
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(90deg, transparent, ${alpha(LIGHT_ACCENT, 0.1)}, transparent)`,
    animation: `${microShine} 6s infinite linear`,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 48px ${alpha('#4361EE', 0.4)}`,
  },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: BORDER_RADIUS,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  background: alpha(PRIMARY_DARK, 0.6),
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 48px ${alpha(PRIMARY_DARK, 0.4)}`,
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  borderRadius: BORDER_RADIUS,
  background: alpha(PRIMARY_DARK, 0.6),
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 16px 32px ${alpha(PRIMARY_DARK, 0.3)}`,
  },
}));

interface LayoutProps {
  children: React.ReactNode;
  showHeroSection?: boolean;
}
const Layout: React.FC<LayoutProps> = ({ children, showHeroSection = false }) => {
  const theme = useTheme();
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO, TechCorp',
      testimonial: 'The consulting services provided were exceptional. They helped us streamline our operations and achieve our goals faster.',
      avatar: '/avatar1.jpg', // Replace with actual image path
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'CTO, InnovateX',
      testimonial: 'Their expertise and insights were invaluable. We highly recommend their services to any business looking to grow.',
      avatar: '/avatar2.jpg', // Replace with actual image path
    },
    {
      id: 3,
      name: 'Michael Johnson',
      role: 'Founder, StartupHub',
      testimonial: 'The team was professional and knowledgeable. They delivered results beyond our expectations.',
      avatar: '/avatar3.jpg', // Replace with actual image path
    },
    {
      id: 4,
      name: 'Sarah Lee',
      role: 'Manager, TechSolutions',
      testimonial: 'Amazing team! They helped us solve complex problems with ease.',
      avatar: '/avatar4.jpg', // Replace with actual image path
    },
    {
      id: 5,
      name: 'David Brown',
      role: 'Director, InnovateNow',
      testimonial: 'Very professional and efficient. We are extremely satisfied with their services.',
      avatar: '/avatar5.jpg', // Replace with actual image path
    },
    {
      id: 6,
      name: 'Emily Davis',
      role: 'CEO, FutureTech',
      testimonial: 'Outstanding results! Their strategic guidance has been a game-changer for our business.',
      avatar: '/avatar6.jpg', // Replace with actual image path
    },
  ];

  const visibleTestimonials = showAllTestimonials ? testimonials : testimonials.slice(0, 3);

  const services = [
    {
      title: 'Strategic Consulting',
      content: 'Tailored strategies to help your business achieve its goals',
      link: '/solutions'
    },
    {
      title: 'Expert Guidance',
      content: 'Leverage our deep expertise for informed decisions',
      link: '/solutions'
    },
    {
      title: 'Custom Solutions',
      content: 'Bespoke solutions for unique business needs',
      link: '/solutions'
    },
    {
      title: 'Industry Insights',
      content: 'Actionable insights to stay ahead in your industry',
      link: '/solutions'
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeroSection && (
        <HeroSection>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h1" sx={{ 
              fontWeight: 800, 
              mb: 2,
              background: TECH_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Transform Your Business
            </Typography>
            <Typography variant="h5" sx={{ 
              mb: 4,
              color: alpha(LIGHT_ACCENT, 0.9),
              fontWeight: 500
            }}>
              Expert-led solutions for digital transformation
            </Typography>
            <StyledButton href="/consultation">
              Start Your Journey
            </StyledButton>
          </motion.div>
        </HeroSection>
      )}

      <Container maxWidth="xl" component="main" sx={{ py: 8 }}>
        <Box sx={{ mb: 8 }}>{children}</Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SectionCard>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ 
                      fontWeight: 700,
                      color: LIGHT_ACCENT,
                      mb: 3
                    }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      mb: 3,
                      color: alpha(LIGHT_ACCENT, 0.8)
                    }}>
                      {service.content}
                    </Typography>
                    <Button
                      variant="outlined"
                      href={service.link}
                      sx={{
                        borderWidth: 2,
                        borderColor: alpha(LIGHT_ACCENT, 0.2),
                        color: LIGHT_ACCENT,
                        '&:hover': { 
                          borderWidth: 2,
                          borderColor: alpha(LIGHT_ACCENT, 0.4),
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </SectionCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials section updated with brand styling */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 800, 
            mb: 6,
            color: LIGHT_ACCENT
          }}>
            Client Success Stories
          </Typography>
          <Grid container spacing={4}>
            {visibleTestimonials.map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <TestimonialCard>
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        src={testimonial.avatar}
                        sx={{
                          width: 80,
                          height: 80,
                          mb: 3,
                          mx: 'auto',
                          border: `2px solid ${alpha(LIGHT_ACCENT, 0.3)}`,
                          boxShadow: `0 0 24px ${alpha(LIGHT_ACCENT, 0.1)}`
                        }}
                      />
                      <Typography variant="body1" sx={{ 
                        mb: 3, 
                        fontStyle: 'italic',
                        color: alpha(LIGHT_ACCENT, 0.9)
                      }}>
                        "{testimonial.testimonial}"
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700,
                        color: LIGHT_ACCENT
                      }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{
                        color: alpha(LIGHT_ACCENT, 0.7)
                      }}>
                        {testimonial.role}
                      </Typography>
                    </CardContent>
                  </TestimonialCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          {!showAllTestimonials && testimonials.length > 3 && (
            <Button
              variant="contained"
              onClick={() => setShowAllTestimonials(true)}
              sx={{ mt: 6, px: 6 }}
            >
              View More Testimonials
            </Button>
          )}
        </Box>

        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
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