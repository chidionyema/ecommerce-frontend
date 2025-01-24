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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box component="main">
      <Head>
        <title>Expert Technology Solutions</title>
        <meta name="description" content="Professional tech consultancy with proven results" />
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
              const ref = React.useRef(null);
              const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} ref={ref}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FeatureCard>
                      <Box sx={{ mb: 2, color: tech.color }}>
                        {tech.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                        {tech.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#555' }}>
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

      <SectionContainer component="section" sx={{ backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 6, textAlign: 'center', fontWeight: 700 }}>
            Trusted by Industry Leaders
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { 
                quote: "Reduced our deployment time by 40% through optimized cloud infrastructure", 
                author: "CTO, FinTech Startup" 
              },
              { 
                quote: "Revolutionized our mobile app performance in just 2 weeks", 
                author: "Lead Engineer, HealthTech" 
              },
              { 
                quote: "Essential partner in our AI/ML migration journey", 
                author: "Director, Enterprise SaaS" 
              }
            ].map((testimonial, index) => {
              const ref = React.useRef(null);
              const isInView = useInView(ref, { once: true });

              return (
                <Grid item xs={12} md={4} key={index} ref={ref}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Paper sx={{ p: 4, borderRadius: 4, height: '100%' }}>
                      <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                        "{testimonial.quote}"
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a237e' }}>
                        {testimonial.author}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </SectionContainer>

      <SectionContainer component="section">
        <Container maxWidth="md">
          <Grid container spacing={6} justifyContent="center">
            {[
              { number: '300+', label: 'Projects Delivered' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Expert Support' }
            ].map((metric, index) => {
              const ref = React.useRef(null);
              const isInView = useInView(ref, { once: true });

              return (
                <Grid item xs={12} sm={4} key={index} ref={ref}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h2" sx={{ 
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                      }}>
                        {metric.number}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {metric.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </SectionContainer>

      {showScrollToTop && (
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
      )}
    </Box>
  );
};

export default HomePage;