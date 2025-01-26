import React, { useCallback, useRef, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, useTheme, useMediaQuery,
  Button, styled, alpha 
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  FaPython, FaReact, FaNodeJs, FaAws, FaDocker, FaJava, 
  FaMicrosoft, FaBrain, FaDatabase, FaGoogle, FaChartLine,
  FaCloud, FaCodeBranch, FaLinux
} from 'react-icons/fa';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';

const globalStyles = `
  @keyframes shine { 0% { mask-position: -100%; } 80%,100% { mask-position: 200%; } }
  @keyframes underline { 0% { width: 0%; } 100% { width: 100%; } }
  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  * {
    backface-visibility: hidden;
  }
`;

const ProfessionalButton = styled(motion(Button))(({ theme }) => ({
  padding: '14px 32px',
  borderRadius: '12px',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.5px',
  textTransform: 'none',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
    borderColor: alpha(theme.palette.primary.main, 0.6)
  }
}));

const TechIconContainer = styled(Box)({
  position: 'relative',
  willChange: 'transform',
  contain: 'layout paint',
  '& .tech-gradient': {
    position: 'absolute',
    width: '120%',
    height: '120%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
    opacity: 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    mixBlendMode: 'soft-light',
    willChange: 'opacity, transform'
  }
});

const FeatureCard = styled(motion(Box))(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(145deg,${alpha(theme.palette.background.paper, 0.95)},${alpha(theme.palette.background.default, 0.98)})`,
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  willChange: 'transform',
  contain: 'layout paint style',
  '&:hover': {
    transform: 'translateY(-6px)',
    '& .tech-gradient': { opacity: 0.6, transform: 'scale(1.1) rotate(8deg)' }
  }
}));

const CardTitle = styled(Typography)<{ techcolor: string }>(({ techcolor, theme }) => ({
  color: techcolor,
  fontWeight: 700,
  letterSpacing: '-0.5px',
  fontSize: '1.1rem !important',
  textAlign: 'center',
  margin: theme.spacing(2, 0),
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40%',
    height: '2px',
    background: techcolor,
    borderRadius: '2px'
  }
}));

const ValuePropositionItem = styled(motion(Box))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
  background: alpha(theme.palette.common.white, 0.05),
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(8px)',
  willChange: 'transform',
  '&:hover': { 
    background: alpha(theme.palette.common.white, 0.1), 
    transform: 'translateX(4px)' 
  }
}));

const techIcons = [
  { id: 'python', title: 'Python', icon: <FaPython />, color: '#3776AB', description: 'Enterprise-grade solutions' },
  { id: 'react', title: 'React', icon: <FaReact />, color: '#61DAFB', description: 'Modern UI/UX development' },
  { id: 'nodejs', title: 'Node.js', icon: <FaNodeJs />, color: '#68A063', description: 'High-performance services' },
  { id: 'devops', title: 'DevOps', icon: <FaDocker />, color: '#2496ED', description: 'Cloud infrastructure' },
  { id: 'aws', title: 'AWS', icon: <FaAws />, color: '#FF9900', description: 'Scalable architectures' },
  { id: 'java', title: 'Java', icon: <FaJava />, color: '#007396', description: 'Enterprise systems' },
  { id: 'dotnet', title: '.NET', icon: <FaMicrosoft />, color: '#512BD4', description: 'Business applications' },
  { id: 'ai-ml', title: 'AI/ML', icon: <FaBrain />, color: '#FF6F00', description: 'Intelligent analytics' },
  { id: 'database', title: 'Database', icon: <FaDatabase />, color: '#7A5CAB', description: 'Data management systems' },
  { id: 'google-cloud', title: 'Google Cloud', icon: <FaGoogle />, color: '#4285F4', description: 'Cloud solutions' },
  { id: 'data-analytics', title: 'Data Analytics', icon: <FaChartLine />, color: '#4CAF50', description: 'Insights and visualization' },
  { id: 'cloud-infra', title: 'Cloud Infra', icon: <FaCloud />, color: '#2196F3', description: 'Hybrid cloud environments' },
  { id: 'azure', title: 'Azure', icon: <FaMicrosoft />, color: '#0089D6', description: 'Enterprise cloud services' },
  { id: 'cicd', title: 'CI/CD', icon: <FaCodeBranch />, color: '#9C27B0', description: 'Automated pipelines' },
  { id: 'docker', title: 'Docker', icon: <FaDocker />, color: '#2496ED', description: 'Containerization platform' },
  { id: 'linux', title: 'Linux', icon: <FaLinux />, color: '#FCC624', description: 'Open-source systems' }
];

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  return (
    <Box component="section" sx={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      background: `linear-gradient(135deg,${alpha(theme.palette.primary.dark, 0.98)} 0%,${alpha(theme.palette.secondary.dark, 0.95)} 100%)`,
      color: 'white',
      py: 8,
      pt: 10,
      pb: 12,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: { xs: '12px', sm: '24px' },
      mx: { xs: 2, sm: 3 },
      my: 4,
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        boxShadow: `0 24px 48px -12px ${alpha(theme.palette.primary.dark, 0.4)}`,
        zIndex: -1
      },
      transition: 'border-radius 0.3s ease-in-out'
    }}>
      <style>{globalStyles}</style>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h1" sx={{
            textAlign: 'center',
            mb: 3,
            fontWeight: 800,
            fontSize: isMobile ? '2rem' : '2.5rem',
            lineHeight: 1.2,
            background: `linear-gradient(45deg,${theme.palette.common.white} 30%,${alpha(theme.palette.secondary.light, 0.9)} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '2px',
              background: theme.palette.secondary.main,
              borderRadius: '2px'
            }
          }}>
            Precision Engineering for Digital Excellence
          </Typography>
          
          <Typography variant="body1" sx={{
            textAlign: 'center',
            mb: 3,
            fontSize: '1rem',
            fontWeight: 300,
            opacity: 0.9,
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}>
            Strategic technology solutions combining enterprise robustness with agile innovation
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            mt: 4,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -24,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.3)}, transparent)`,
            }
          }}>
            <ProfessionalButton
              variant="contained"
              onClick={() => router.push('/contact')}
              endIcon={<ArrowRightAlt />}
              sx={{
                background: `linear-gradient(45deg,${theme.palette.secondary.main} 0%,${theme.palette.primary.main} 100%)`,
                color: 'white'
              }}>
              Start Enterprise Project
            </ProfessionalButton>
            
            <ProfessionalButton
              variant="outlined"
              onClick={() => router.push('/solutions')}
              sx={{ 
                color: 'white', 
                borderColor: alpha(theme.palette.common.white, 0.3), 
                '&:hover': { 
                  borderColor: theme.palette.secondary.main,
                  background: alpha(theme.palette.secondary.main, 0.1) 
                } 
              }}>
              View Case Studies
            </ProfessionalButton>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

const TechnologyCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const techSectionRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTimeRef.current < 32) return;
    
    lastTimeRef.current = now;
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (!techSectionRef.current) return;
      const cards = techSectionRef.current.querySelectorAll<HTMLElement>('.tech-card');
      const { left, top } = techSectionRef.current.getBoundingClientRect();
      
      cards.forEach(card => {
        const xPos = e.clientX - left - card.clientWidth / 2;
        const yPos = e.clientY - top - card.clientHeight / 2;
        card.style.setProperty('--x', `${xPos}px`);
        card.style.setProperty('--y', `${yPos}px`);
      });
    });
  }, []);

  useEffect(() => () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  return (
    <Box component="section" ref={techSectionRef} onMouseMove={handleMouseMove} sx={{ 
      py: 8, 
      position: 'relative',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden'
    }}>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ 
          textAlign: 'center', 
          mb: 6, 
          fontWeight: 800,
          fontSize: isMobile ? '1.75rem' : '2.25rem',
          willChange: 'transform',
        }}>
          Core Technical Expertise
        </Typography>
        
        <Grid container spacing={isMobile ? 2 : 4}>
          {techIcons.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <FeatureCard 
                className="tech-card"
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '200px', once: true }}
                transition={{ 
                  type: 'spring',
                  mass: 0.5,
                  stiffness: 150,
                  damping: 20,
                  delay: index * 0.05 
                }}
              >
                <Box sx={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <TechIconContainer>
                    <Box className="tech-gradient" />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      {React.cloneElement(tech.icon, { size: 40, style: { color: tech.color } })}
                    </motion.div>
                  </TechIconContainer>
                </Box>
                <CardTitle techcolor={tech.color}>{tech.title}</CardTitle>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary', 
                  textAlign: 'center', 
                  lineHeight: 1.6, 
                  fontSize: '0.9rem',
                  willChange: 'transform'
                }}>
                  {tech.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const WhyPartnerSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="section" sx={{ 
      py: 8, 
      background: `linear-gradient(135deg,${alpha(theme.palette.primary.dark, 0.98)},${alpha(theme.palette.secondary.dark, 0.95)})`, 
      color: 'white',
      position: 'relative'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h3" sx={{ 
                mb: 2, 
                fontWeight: 800, 
                fontSize: isMobile ? '1.75rem' : '2rem',
                willChange: 'transform'
              }}>
                Why Partner With Us
              </Typography>
              <Typography variant="body1" sx={{ 
                opacity: 0.9, 
                lineHeight: 1.6, 
                fontWeight: 300,
                willChange: 'transform'
              }}>
                Enterprise-grade development process combining security, scalability, and innovation
              </Typography>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            {['Military-grade Security','Full Development Lifecycle','24/7 Production Support','Regulatory Compliance'].map((item, idx) => (
              <ValuePropositionItem 
                key={idx} 
                initial={{ opacity: 0, x: 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "100px" }}
                transition={{ delay: idx * 0.1 + 0.3 }}
              >
                <CheckCircleOutline sx={{ mr: 2, color: theme.palette.secondary.main, fontSize: '1.5rem' }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{item}</Typography>
              </ValuePropositionItem>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const HomePage = () => {
  return (
    <Box component="main">
      <Head>
        <title>Precision Tech Solutions</title>
        <meta name="description" content="Enterprise-grade technology solutions with precision engineering" />
      </Head>
      <HeroSection />
      <TechnologyCards />
      <WhyPartnerSection />
    </Box>
  );
};

export default HomePage;