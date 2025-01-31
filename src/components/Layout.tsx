import React, { useState, useEffect } from 'react';
import Footer from './Footer';
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
  IconButton,
  Chip,
} from '@mui/material';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  HOLO_GRADIENT,
  HOLO_GRADIENT_ANIMATED,
} from '../theme/palette';

import StrategyIcon from '../icons/strategy.svg';
import GrowthIcon from '../icons/growth.svg';
import SolutionIcon from '../icons/solution.svg';
import InsightIcon from '../icons/insight.svg';

// Improved styled components with better hover effects
const SectionCard = motion(Card);
const TestimonialCard = motion(Card);

const StyledButton = motion(Button);

const AnimatedGradientHeader = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: 10,
        textAlign: 'center',
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: HOLO_GRADIENT_ANIMATED,
          animation: 'gradientShift 15s ease infinite',
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              mb: 4,
              color: 'white',
              textShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: { xs: '2.5rem', md: '4rem' },
            }}
          >
            {['Accelerate', 'Your', 'Business', 'Growth'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </Typography>
        </motion.div>

        <Box sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Chip
              label="98% Client Satisfaction"
              sx={{
                mb: 3,
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Trusted by 500+ industry leaders worldwide. Transform your business
              with data-driven strategies and proven results.
            </Typography>
          </motion.div>
        </Box>

        <StyledButton
          href="/contact"
          size="large"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{
            px: 8,
            py: 2,
            fontSize: '1.1rem',
            background: 'linear-gradient(45deg, #ff6b6b 0%, #ff8e53 100%)',
            boxShadow: '0 8px 24px rgba(255,107,107,0.3)',
          }}
        >
          Start Free Trial →
        </StyledButton>
      </Container>
    </Box>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, showHeroSection = false }) => {
  const [activeService, setActiveService] = useState(0);
  const controls = useAnimation();

  const services = [
    {
      title: 'Strategic Consulting',
      content: 'Data-driven strategies for exponential growth',
      icon: StrategyIcon,
    },
    {
      title: 'Growth Marketing',
      content: 'Full-funnel marketing solutions with ROI tracking',
      icon: GrowthIcon,
    },
    {
      title: 'Tech Solutions',
      content: 'Cutting-edge technology implementation',
      icon: SolutionIcon,
    },
    {
      title: 'Market Intelligence',
      content: 'Real-time analytics & competitor insights',
      icon: InsightIcon,
    },
  ];

  // Interactive testimonial carousel
  const TestimonialSlider = () => (
    <Box sx={{ py: 8, position: 'relative' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 5000 }}
        navigation
        pagination={{ clickable: true }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard
              whileHover={{ scale: 1.02 }}
              sx={{
                borderRadius: 4,
                p: 3,
                bgcolor: 'background.paper',
                minHeight: 320,
              }}
            >
              <CardContent>
                <Avatar
                  src={testimonial.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 3,
                    border: '3px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {testimonial.role}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontStyle: 'italic', position: 'relative' }}
                >
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      left: -32,
                      top: -16,
                      fontSize: 64,
                      color: 'divider',
                    }}
                  >
                    “
                  </Box>
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
            </TestimonialCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeroSection && <AnimatedGradientHeader />}

      <Container maxWidth="xl" component="main" sx={{ py: 8 }}>
        {/* Enhanced Services Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {services.map((service, index) => (
            <Grid item xs={12} md={3} key={index}>
              <SectionCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                sx={{
                  p: 3,
                  height: '100%',
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: 'divider',
                }}
                onHoverStart={() => setActiveService(index)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <service.icon
                    style={{
                      width: 80,
                      height: 80,
                      margin: '0 auto 24px',
                      filter: activeService === index ? 'brightness(1.1)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {service.content}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    href="/solutions"
                    sx={{ borderRadius: 50 }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </SectionCard>
            </Grid>
          ))}
        </Grid>

        {/* Testimonial Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 6,
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Trusted by Industry Leaders
          </Typography>
          <TestimonialSlider />
        </Box>

        {/* Sticky CTA */}
        <Box
          sx={{
            position: 'sticky',
            bottom: 24,
            zIndex: 1000,
            mx: 'auto',
            width: 'fit-content',
            boxShadow: 6,
            borderRadius: 50,
          }}
        >
          <StyledButton
            href="/contact"
            size="large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              px: 8,
              py: 2,
              fontSize: '1.1rem',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            🚀 Start Your Free Consultation
          </StyledButton>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};