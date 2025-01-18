import React, { useState, useEffect } from 'react';

// Importing individual components directly
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

// Importing styled utility
import { styled } from '@mui/material/styles';

// Importing icons
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Importing Framer Motion
import { motion, useAnimation } from 'framer-motion';

// Importing Next.js components
import NextLink from 'next/link';

// Importing specific types
import { ButtonProps } from '@mui/material/Button';
import { PaperProps } from '@mui/material/Paper';

// Importing react-icons
import { FaAws, FaDocker, FaJava, FaMicrosoft, FaBrain, FaLinux } from 'react-icons/fa';

// Styled Components

// Correctly typed StyledButton
const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: '1.1rem',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  background: '#4A47A3',
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  fontWeight: 700,
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    backgroundColor: '#393685',
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
  },
  '&:focus': {
    outline: '2px solid #fff',
    outlineOffset: '2px',
  },
}));

// Correctly typed FeatureCard
const FeatureCard = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '15px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minHeight: '50vh', // Reduced minHeight
  padding: theme.spacing(6, 2),
  background: `linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)`, // New gradient
  color: theme.palette.common.white,
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    minHeight: '40vh', // Reduced minHeight for mobile
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fc',
  padding: theme.spacing(10, 2),
  borderRadius: '15px',
  marginBottom: theme.spacing(6),
  background: `linear-gradient(to bottom, #f8f9fc, #f0f2f5)`, // Subtle gradient
}));

const techIcons = [
  {
    title: 'DevOps',
    description:
      'Streamline your development lifecycle with automated CI/CD pipelines, reducing time to market and improving software quality.',
    icon: <FaDocker size={60} />, // Example icon for DevOps
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'Scale your applications seamlessly with robust and reliable cloud solutions, ensuring high availability and performance.',
    icon: <FaAws size={60} />, // Example icon for Cloud Infrastructure
  },
  {
    title: 'Java',
    description:
      'Develop robust and scalable backend solutions with our deep Java expertise, creating high-performance and maintainable applications.',
    icon: <FaJava size={60} />,
  },
  {
    title: '.NET',
    description:
      'Build enterprise-grade .NET applications tailored to your specific business needs, leveraging the power of the Microsoft ecosystem.',
    icon: <FaMicrosoft size={60} />, // Example for .NET
  },
  {
    title: 'AI & ML',
    description:
      'Harness the power of AI and ML to drive innovation and gain a competitive edge with intelligent solutions.',
    icon: <FaBrain size={60} />, // Example for AI & ML
  },
  {
    title: 'Linux',
    description:
      'Leverage efficient and scalable Linux server management for optimal performance, security, and cost-effectiveness.',
    icon: <FaLinux size={60} />,
  },
];

// Function for smooth scrolling
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Trigger for scroll to top button
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  // Show/hide scroll to top button
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShowScrollToTop(window.scrollY > 100);
    });
  }, []);

  // Animate feature cards on scroll
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        if (isElementInViewport(card)) {
          controls.start('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  // Helper function to check if an element is in the viewport
  const isElementInViewport = (el: Element) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return (
    <Box component="main">
      {/* Hero Section */}
      <HeroSection component="section">
        <Container maxWidth="md">
          <Box sx={{ py: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                  mb: 4,
                  textShadow: '0 6px 15px rgba(0, 0, 0, 0.5)',
                  lineHeight: 1.2,
                }}
              >
                Speed Up Your Journey to Tech Mastery
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
            >
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' },
                  color: '#eee',
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 6,
                  lineHeight: 1.6,
                }}
              >
                Empowering tech professionals with expert-led solutions for seamless integrations, streamlined configurations, and efficient setups.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, type: 'spring', stiffness: 100 }}
            >
              {/* If using Next.js Link */}
              <NextLink href="/solutions" passHref>
                <StyledButton endIcon={<ArrowRightAlt />}>
                  Explore Solutions
                </StyledButton>
              </NextLink>
            </motion.div>
          </Box>
        </Container>
      </HeroSection>

      {/* Technologies Section */}
      <SectionContainer component="section">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            component="h2"
            sx={{
              mb: 8,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#333',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Technologies We Support
          </Typography>
          <Grid container spacing={isMobile ? 4 : 6} justifyContent="center">
            {techIcons.map((tech, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div
                  className="feature-card"
                  initial="hidden"
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.2 } },
                  }}
                  whileHover={{ scale: 1.08, y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 10 }}
                >
                  <FeatureCard component="article">
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {tech.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 2, color: '#212121' }}>
                      {tech.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#555', fontSize: '1rem' }}>
                      {tech.description}
                    </Typography>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#4A47A3',
            color: '#fff',
            borderRadius: '50%',
            padding: '12px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#393685',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default HomePage;
