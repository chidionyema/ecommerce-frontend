import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Typography, Grid, useTheme, useMediaQuery, 
  IconButton, alpha, Button, styled
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  FaPython, FaReact, FaNodeJs, FaAws, FaDocker, FaJava, 
  FaMicrosoft, FaBrain, FaLinux 
} from 'react-icons/fa';
import { SiRust, SiGo } from 'react-icons/si';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';

// Styled components
const ProfessionalButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: 700,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: '1.1rem',
  textTransform: 'none'
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  position: 'relative',
  overflow: 'hidden'
}));

const ValuePropositionItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

// Tech icons data
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
  { title: 'Go', icon: <SiGo size={48} />, color: '#00ADD8' },
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
  ][index]
}));

// Throttle function
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

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();

  const handleScroll = useCallback(
    throttle(() => setShowScrollToTop(window.scrollY > 100), 50),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    router.prefetch('/contact');
    router.prefetch('/solutions');
  }, [router]);

  return (
    <Box component="main">
      <Head>
        <title>Elite Technical Solutions</title>
        <meta name="description" content="Enterprise-grade technology consultancy with precision engineering" />
      </Head>

      {/* Hero Section */}
      <Box component="section" sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="md">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h1" sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 800,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
              background: `linear-gradient(45deg, ${theme.palette.common.white} 30%, ${theme.palette.secondary.light} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Precision Engineering for Digital Excellence
            </Typography>
            
            <Typography variant="body1" sx={{
              textAlign: 'center',
              mb: 6,
              px: 2,
              opacity: 0.9,
              fontSize: '1.25rem'
            }}>
              Strategic technology solutions blending enterprise robustness with agile innovation
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <ProfessionalButton
                variant="contained"
                onClick={() => router.push('/contact')}
                endIcon={<ArrowRightAlt />}
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                  color: 'white'
                }}
              >
                Start Enterprise Project
              </ProfessionalButton>
              
              <ProfessionalButton
                variant="outlined"
                onClick={() => router.push('/solutions')}
                sx={{
                  border: `2px solid ${theme.palette.secondary.main}`,
                  color: 'white'
                }}
              >
                View Case Studies
              </ProfessionalButton>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Core Technologies Section */}
      <Box component="section" sx={{ py: 10, background: theme.palette.background.default }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
            Core Technical Expertise
          </Typography>
          <Grid container spacing={isMobile ? 3 : 6}>
            {techIcons.map((tech, index) => {
              const ref = React.useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: true });
              
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} ref={ref}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FeatureCard sx={{
                      background: alpha(theme.palette.background.paper, 0.8),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                    }}>
                      <Box sx={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                        {tech.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        {tech.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {tech.description}
                      </Typography>
                    </FeatureCard>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Value Proposition Section */}
      <Box component="section" sx={{ py: 10, background: theme.palette.primary.dark, color: 'white' }}>
        <Container maxWidth="md">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
                Why Partner With Us
              </Typography>
              <Typography>
                Our methodology combines rigorous enterprise standards with cutting-edge innovation practices.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {['Enterprise Security First', 'Full-Cycle Development', '24/7 Production Support', 'Compliance Guarantee']
                .map((item, idx) => (
                  <ValuePropositionItem key={idx}>
                    <CheckCircleOutline sx={{ mr: 2, color: theme.palette.secondary.main }} />
                    <Typography variant="body1">{item}</Typography>
                  </ValuePropositionItem>
                ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {showScrollToTop && (
        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            color: 'white'
          }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </IconButton>
      )}
    </Box>
  );
};

export default HomePage;