import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Grid, Paper, useTheme, useMediaQuery, 
  IconButton, styled, Skeleton 
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

// Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1.1rem',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  background: 'linear-gradient(45deg, #1a237e 0%, #0d47a1 100%)',
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  fontWeight: 700,
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    background: 'linear-gradient(45deg, #0d47a1 0%, #1a237e 100%)',
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '15px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minHeight: '50vh',
  padding: theme.spacing(6, 2),
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  color: theme.palette.common.white,
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    minHeight: '60vh',
    padding: theme.spacing(4, 2),
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fc',
  padding: theme.spacing(10, 2),
  marginBottom: theme.spacing(6),
}));

// Force update hook
const useForceUpdate = () => {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

const techIcons = [
  { title: 'Python', icon: <FaPython size={60} />, color: '#3776AB' },
  { title: 'React Native', icon: <FaReact size={60} />, color: '#61DAFB' },
  { title: 'Node.js', icon: <FaNodeJs size={60} />, color: '#68A063' },
  { title: 'DevOps', icon: <FaDocker size={60} />, color: '#2496ED' },
  { title: 'Cloud Infrastructure', icon: <FaAws size={60} />, color: '#FF9900' },
  { title: 'Java', icon: <FaJava size={60} />, color: '#007396' },
  { title: '.NET', icon: <FaMicrosoft size={60} />, color: '#512BD4' },
  { title: 'AI & ML', icon: <FaBrain size={60} />, color: '#FF6F00' },
  { title: 'Linux', icon: <FaLinux size={60} />, color: '#FCC624' },
  { title: 'Rust', icon: <SiRust size={60} />, color: '#000000' },
  { title: 'Go (Golang)', icon: <SiGoland size={60} />, color: '#00ADD8' },
  { title: 'React', icon: <FaReact size={60} />, color: '#61DAFB' },
].map((tech, index) => ({
  ...tech,
  description: [
    'Build scalable and efficient applications with Python',
    'Develop cross-platform mobile applications with React Native',
    'Build fast and scalable server-side applications with Node.js',
    'Streamline your development lifecycle with automated CI/CD',
    'Scale applications with robust cloud solutions',
    'Develop robust backend solutions with Java',
    'Build enterprise-grade .NET applications',
    'Harness the power of AI and ML for innovation',
    'Leverage efficient Linux server management',
    'Build high-performance applications with Rust',
    'Develop fast backend services with Go',
    'Create dynamic UIs with React',
  ][index],
}));

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
      document.body.clientWidth;
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', forceUpdate);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', forceUpdate);
    };
  }, [forceUpdate]);

  const throttle = (fn: Function, wait: number) => {
    let time = Date.now();
    return (...args: any[]) => {
      if (time + wait - Date.now() < 0) {
        fn(...args);
        time = Date.now();
      }
    };
  };

  return (
    <Box component="main">
      <Head>
        <title>Expert Technology Solutions</title>
        <meta name="description" content="Professional tech consultancy with proven results" />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
      </Head>

      <HeroSection component="section">
        <Container maxWidth="md">
          <Box sx={{ py: 6 }}>
            <motion.div 
              initial={{ opacity: 0, y: -40 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  mb: 4,
                  textAlign: 'center',
                  lineHeight: 1.2,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                Accelerate Your Digital Transformation
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  textAlign: 'center',
                  mb: 6,
                  px: 2,
                }}
              >
                Enterprise-grade solutions with startup agility
              </Typography>
            </motion.div>

            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
              mb: 8,
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: theme.palette.text.primary
            }}
          >
            Core Technologies
          </Typography>
          <Grid container spacing={isMobile ? 3 : 6} justifyContent="center">
            {techIcons.map((tech, index) => {
              const ref = React.useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, {
                once: true,
                margin: "0px 0px -50px 0px",
                amount: 0.2
              });

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <div ref={ref} style={{ height: '100%', width: '100%' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      animate={isInView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 120,
                          damping: 18,
                          delay: index * 0.03
                        }
                      } : {}}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.15 }
                      }}
                      style={{
                        transformOrigin: 'center bottom',
                        height: '100%',
                        width: '100%'
                      }}
                    >
                      <FeatureCard>
                        <Box sx={{ 
                          mb: 2, 
                          color: tech.color,
                          transform: 'translateZ(0)',
                          willChange: 'transform'
                        }}>
                          {tech.icon}
                        </Box>
                        <Typography variant="h6" sx={{ 
                          mb: 2, 
                          fontWeight: 700,
                          minHeight: '3em',
                          transform: 'translateZ(0)'
                        }}>
                          {tech.title}
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: '#555',
                          minHeight: '6em',
                          transform: 'translateZ(0)'
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
              bottom: 32,
              right: 32,
              bgcolor: '#1a237e',
              color: 'white',
              '&:hover': { bgcolor: '#0d47a1' },
              transition: 'background-color 0.3s',
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