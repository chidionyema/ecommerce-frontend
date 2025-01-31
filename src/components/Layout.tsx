'use client';

import React, { useState } from 'react';
import Footer from './Footer'; // Adjust path if needed
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  useTheme,
  styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  HOLO_GRADIENT,
} from '../theme/palette';

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, #f8f9fc)`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, #f8f9fc)`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: '50px',
  fontWeight: 700,
  transition: 'all 0.3s ease',
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
  color: theme.palette.common.white,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

interface LayoutProps {
  children: React.ReactNode;
  showHeroSection?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeroSection = false,
}) => {
  const theme = useTheme();
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO, TechCorp',
      testimonial:
        'The consulting services provided were exceptional. They helped us streamline our operations and achieve our goals faster.',
      avatar: '/avatar1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'CTO, InnovateX',
      testimonial:
        'Their expertise and insights were invaluable. We highly recommend their services to any business looking to grow.',
      avatar: '/avatar2.jpg',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      role: 'Founder, StartupHub',
      testimonial:
        'The team was professional and knowledgeable. They delivered results beyond our expectations.',
      avatar: '/avatar3.jpg',
    },
    {
      id: 4,
      name: 'Sarah Lee',
      role: 'Manager, TechSolutions',
      testimonial:
        'Amazing team! They helped us solve complex problems with ease.',
      avatar: '/avatar4.jpg',
    },
    {
      id: 5,
      name: 'David Brown',
      role: 'Director, InnovateNow',
      testimonial:
        'Very professional and efficient. We are extremely satisfied with their services.',
      avatar: '/avatar5.jpg',
    },
    {
      id: 6,
      name: 'Emily Davis',
      role: 'CEO, FutureTech',
      testimonial:
        'Outstanding results! Their strategic guidance has been a game-changer for our business.',
      avatar: '/avatar6.jpg',
    },
  ];

  const visibleTestimonials = showAllTestimonials
    ? testimonials
    : testimonials.slice(0, 3);

  const services = [
    {
      title: 'Strategic Consulting',
      content: 'Tailored strategies to help your business achieve its goals',
      link: '/solutions',
    },
    {
      title: 'Expert Guidance',
      content: 'Leverage our deep expertise for informed decisions',
      link: '/solutions',
    },
    {
      title: 'Custom Solutions',
      content: 'Bespoke solutions for unique business needs',
      link: '/solutions',
    },
    {
      title: 'Industry Insights',
      content: 'Actionable insights to stay ahead in your industry',
      link: '/solutions',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section (Conditional) */}
      {showHeroSection && (
        <Box
          sx={{
            background: HOLO_GRADIENT,
            py: 10,
            textAlign: 'center',
            // Responsive design
            '@media (max-width:600px)': {
              py: 6, // Reduce padding on smaller screens
            },
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 4,
                color: 'white',
                // Responsive design
                '@media (max-width:600px)': {
                  fontSize: '2.5rem', // Reduce font size on smaller screens
                },
              }}
            >
              Accelerate Your Business Growth
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                color: 'rgba(255, 255, 255, 0.8)',
                // Responsive design
                '@media (max-width:600px)': {
                  fontSize: '1rem', // Reduce font size on smaller screens
                },
              }}
            >
              Strategic Consulting, Expert Guidance, and Custom Solutions to
              Propel Your Business Forward
            </Typography>
            <StyledButton href="/contact" size="large">
              Get Started
            </StyledButton>
          </Container>
        </Box>
      )}

      <Container maxWidth="lg" component="main" sx={{ py: 8 }}>
        <Box sx={{ mb: 8 }}>{children}</Box>

        {/* Services Section (Grid) */}
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
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {service.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {service.content}
                    </Typography>
                    <Button
                      variant="outlined"
                      href={service.link}
                      sx={{
                        borderWidth: 2,
                        '&:hover': { borderWidth: 2 },
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

        {/* Testimonials Section (Slider/Carousel - using Grid for now) */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 6 }}>
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
                          border: `2px solid ${theme.palette.primary.main}`,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ mb: 3, fontStyle: 'italic' }}
                      >
                        "{testimonial.testimonial}"
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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

        {/* Call to Action Section */}
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
            Ready to Accelerate Growth?
          </Typography>
          <StyledButton href="/contact" size="large">
            Schedule Free Consultation
          </StyledButton>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;