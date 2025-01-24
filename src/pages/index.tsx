import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Grid, Paper, useTheme, useMediaQuery, 
  IconButton, styled 
} from '@mui/material';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  FaPython, FaReact, FaNodeJs, FaAws, FaDocker, FaJava, FaMicrosoft, FaBrain, FaLinux 
} from 'react-icons/fa';
import { SiRust, SiGoland } from 'react-icons/si';
import Head from 'next/head';

// Mobile-optimized styled components
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  padding: theme.spacing(1.5, 3),
  borderRadius: '28px',
  background: 'linear-gradient(45deg, #1a237e 0%, #0d47a1 100%)',
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  fontWeight: 700,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: theme.spacing(1, 2.5),
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(4, 2),
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  color: theme.palette.common.white,
  [theme.breakpoints.down('sm')]: {
    minHeight: '70vh',
    padding: theme.spacing(3, 1.5),
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fc',
  padding: theme.spacing(8, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 1.5),
  },
}));

// Mobile-first tech icons configuration
const techIcons = [
  { title: 'Python', icon: <FaPython size={48} />, color: '#3776AB' },
  { title: 'React Native', icon: <FaReact size={48} />, color: '#61DAFB' },
  { title: 'Node.js', icon: <FaNodeJs size={48} />, color: '#68A063' },
  { title: 'DevOps', icon: <FaDocker size={48} />, color: '#2496ED' },
  { title: 'Cloud Infrastructure', icon: <FaAws size={48} />, color: '#FF9900' },
  { title: 'Java', icon: <FaJava size={48} />, color: '#007396' },
  { title: '.NET', icon: <FaMicrosoft size={48} />, color: '#512BD4' },
  { title: 'AI & ML', icon: <FaBrain size={48} />, color: '#FF6F00' },
  { title: 'Linux', icon: <FaLinux size={48} />, color: '#FCC624' },
  { title: 'Rust', icon: <SiRust size={48} />, color: '#000000' },
  { title: 'Go (Golang)', icon: <SiGoland size={48} />, color: '#00ADD8' },
  { title: 'React', icon: <FaReact size={48} />, color: '#61DAFB' },
].map((tech, index) => ({
  ...tech,
  description: [
    'Scalable Python applications',
    'Cross-platform React Native apps',
    'High-performance Node.js services',
    'Automated CI/CD pipelines',
    'Cloud infrastructure solutions',
    'Enterprise Java systems',
    '.NET application development',
    'AI/ML integration services',
    'Linux server management',
    'Rust system programming',
    'Go backend services',
    'React UI development',
  ][index],
}));

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
    };

    const throttledScroll = throttle(handleScroll, 50);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Performance-optimized throttle
  const throttle = (fn: Function, wait: number) => {
    let lastCall = 0;
    return (...args: any[]) => {
      const now = Date.now();
      if (now - lastCall >= wait) {
        fn(...args);
        lastCall = now;
      }
    };
  };

  // Mobile-optimized animation config
  const mobileAnimation = {
    stiffness: 80,
    damping: 12,
    delayFactor: 0.04,
    viewMargin: '0px 0px -50px 0px',
  };

  const desktopAnimation = {
    stiffness: 100,
    damping: 15,
    delayFactor: 0.02,
    viewMargin: '0px 0px -100px 0px',
  };

  const animationConfig = isMobile ? mobileAnimation : desktopAnimation;

  return (
    <Box component="main">
      <Head>
        <title>Expert Technology Solutions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <HeroSection component="section">
        <Container maxWidth="md">
          <Box sx={{ py: 4 }}>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: isMobile ? '2rem' : '3rem',
                  mb: 3,
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}
              >
                Accelerate Digital Transformation
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  textAlign: 'center',
                  mb: 4,
                  px: 2,
                }}
              >
                Enterprise solutions with startup agility
              </Typography>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <StyledButton
                  endIcon={<ArrowRightAlt />}
                  onClick={() => router.push('/contact')}
                  aria-label="Start Project"
                >
                  Start Your Project
                </StyledButton>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </HeroSection>

      <SectionContainer component="section">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 6,
              fontWeight: 700,
              textAlign: 'center',
              fontSize: isMobile ? '1.75rem' : '2.25rem',
            }}
          >
            Core Technologies
          </Typography>
          <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
            {techIcons.map((tech, index) => {
              const ref = React.useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, {
                once: true,
                margin: animationConfig.viewMargin,
                amount: isMobile ? 0.01 : 0.1  // More sensitive on mobile
              });

              return (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <div ref={ref} style={{ height: '100%', padding: isMobile ? 8 : 12 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={isInView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: animationConfig.stiffness,
                          damping: animationConfig.damping,
                          delay: index * animationConfig.delayFactor
                        }
                      } : {}}
                      whileHover={{ scale: 1.02 }}
                      style={{ height: '100%' }}
                    >
                      <FeatureCard>
                        <Box sx={{ 
                          mb: 1.5,
                          color: tech.color,
                          fontSize: '3rem',
                          lineHeight: 1,
                        }}>
                          {tech.icon}
                        </Box>
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 700,
                          mb: 1,
                          minHeight: isMobile ? '2.5em' : '3em',
                        }}>
                          {tech.title}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#666',
                          minHeight: isMobile ? '4em' : '5em',
                        }}>
                          {tech.description}
                        </Typography>
                      </FeatureCard>
                    </motion.div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </SectionContainer>

      {showScrollToTop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </motion.div>
      )}
    </Box>
  );
};

export default HomePage;