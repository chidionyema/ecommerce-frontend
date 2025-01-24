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

// Loading Skeleton Component
const TechSkeleton = () => (
  <FeatureCard>
    <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2 }} />
    <Skeleton variant="text" width="60%" sx={{ mx: 'auto', mb: 2, height: 32 }} />
    <Skeleton variant="text" width="80%" sx={{ mx: 'auto', height: 24 }} />
    <Skeleton variant="text" width="80%" sx={{ mx: 'auto', height: 24 }} />
  </FeatureCard>
);

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

  // Optimized scroll handler
  const throttle = (fn: Function, wait: number) => {
    let time = Date.now();
    return (...args: any[]) => {
      if (time + wait - Date.now() < 0) {
        fn(...args);
        time = Date.now();
      }
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
      document.body.clientWidth; // Force reflow
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

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
        {/* Hero content remains same */}
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
              const ref = React.useRef(null);
              const isInView = useInView(ref, { 
                once: true,
                margin: "0px 0px -20% 0px",
                amount: 0.1
              });

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} ref={ref}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      y: 0,
                      scale: 1
                    } : {}}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: index * 0.05 
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 } 
                    }}
                    style={{
                      transformOrigin: 'center bottom',
                      height: '100%'
                    }}
                  >
                    <FeatureCard>
                      <Box sx={{ 
                        mb: 2, 
                        color: tech.color,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'rotate(5deg) scale(1.1)'
                        }
                      }}>
                        {tech.icon}
                      </Box>
                      <Typography variant="h6" sx={{ 
                        mb: 2, 
                        fontWeight: 700,
                        minHeight: '3em'
                      }}>
                        {tech.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#555',
                        minHeight: '6em'
                      }}>
                        {tech.description}
                      </Typography>
                    </FeatureCard>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </SectionContainer>

      {/* Other sections remain same */}

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