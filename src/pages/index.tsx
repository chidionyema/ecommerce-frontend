import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, useTheme, useMediaQuery, 
  IconButton 
} from '@mui/material';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  FaPython, FaReact, FaNodeJs, FaAws, FaDocker, FaJava, 
  FaMicrosoft, FaBrain, FaLinux 
} from 'react-icons/fa';
import { SiRust, SiGoland } from 'react-icons/si';
import Head from 'next/head';
import { ProfessionalButton, FeatureCard, ValuePropositionItem } from '../theme/theme'; 


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

  useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 100);
    const throttledScroll = throttle(handleScroll, 50);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

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

  return (
    <Box component="main">
      <Head>
        <title>Elite Technical Solutions</title>
        <meta name="description" content="Enterprise-grade technology consultancy with precision engineering" />
      </Head>

      {/* Hero Section */}
      <Box component="section" sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.gradients.primary,
        color: 'white',
        py: 10
      }}>
        <Container maxWidth="md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" component="h1" sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              Precision Engineering for Digital Excellence
            </Typography>
            
            <Typography variant="body1" sx={{
              maxWidth: '680px',
              mx: 'auto',
              fontSize: '1.25rem',
              mb: 6,
              px: 2,
              textAlign: 'center',
              opacity: 0.95
            }}>
              Strategic technology solutions blending enterprise robustness with agile innovation
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <ProfessionalButton
                variant="contained"
                className="primary"
                endIcon={<ArrowRightAlt />}
                onClick={() => router.push('/contact')}
              >
                Start Enterprise Project
              </ProfessionalButton>
              
              <ProfessionalButton
                variant="outlined"
                onClick={() => router.push('/solutions')}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white'
                  }
                }}
              >
                View Case Studies
              </ProfessionalButton>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Core Technologies Section */}
      <Box component="section" sx={{ py: 10, backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            maxWidth: '1200px', 
            mx: 'auto', 
            px: isMobile ? 2 : 4 
          }}>
            <Typography variant="h2" component="h2" sx={{
              textAlign: 'center',
              mb: 8,
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '3px',
                backgroundColor: theme.palette.secondary.main,
                mx: 'auto',
                mt: 3
              }
            }}>
              Core Technical Expertise
            </Typography>

            <Grid container spacing={isMobile ? 3 : 6}>
              {techIcons.map((tech, index) => {
                const ref = React.useRef<HTMLDivElement>(null);
                const isInView = useInView(ref, {
                  once: true,
                  margin: isMobile ? '0px 0px -30% 0px' : '0px 0px -150px 0px',
                  amount: isMobile ? 0.01 : 0.1
                });

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <div ref={ref}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.05 }}
                      >
                        <FeatureCard elevation={0}>
                          <Box sx={{
                            height: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            color: tech.color
                          }}>
                            {tech.icon}
                          </Box>
                          <Typography variant="h6" sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: theme.palette.primary.main
                          }}>
                            {tech.title}
                          </Typography>
                          <Typography variant="body2" sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.6
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
          </Box>
        </Container>
      </Box>

      {/* Value Proposition Section */}
      <Box component="section" sx={{ 
        py: 10,
        backgroundColor: theme.palette.primary.main,
        color: 'white'
      }}>
        <Container maxWidth="md">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{
                mb: 3,
                fontWeight: 600,
                lineHeight: 1.2
              }}>
                Why Partner With Us
              </Typography>
              <Typography sx={{
                opacity: 0.9,
                lineHeight: 1.7
              }}>
                Our methodology combines rigorous enterprise standards with cutting-edge innovation practices.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: theme.shape.borderRadius
              }}>
                {[
                  'Enterprise Security First',
                  'Full-Cycle Development',
                  '24/7 Production Support',
                  'Compliance Guarantee'
                ].map((item, idx) => (
                  <ValuePropositionItem key={idx} sx={{ mb: 3 }}>
                    <CheckCircleOutline sx={{ 
                      mr: 2, 
                      color: theme.palette.secondary.main 
                    }}/>
                    <Typography>{item}</Typography>
                  </ValuePropositionItem>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Scroll to Top */}
      {showScrollToTop && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              position: 'fixed',
              bottom: 40,
              right: 40,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark
              }
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