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

/* ----------------------------- NEW/UPDATED KEYFRAMES ----------------------------- */
const swirl = `
  @keyframes swirlConic {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/* ----------------------------- GLOBAL STYLES -------------------------------------- */
const globalStyles = `
  :root {
    --persuasive-1: #e63946;
    --persuasive-2: #2a9d8f;
    --persuasive-3: #f4a261;
  }

  /* Existing animations */
  @keyframes shine { 
    0% { mask-position: -100%; } 
    80%,100% { mask-position: 200%; } 
  }
  @keyframes underline { 
    0% { width: 0%; } 
    100% { width: 100%; } 
  }

  /* NEW/UPDATED swirl keyframe */
  ${swirl}

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  * {
    backface-visibility: hidden;
  }

  .urgent { color: var(--persuasive-1) !important; }
  .trust-badge { border-color: var(--persuasive-2) !important; }
  .highlight { 
    background: linear-gradient(90deg, transparent, ${alpha('#f4a261', 0.2)}, transparent);
  }
`;

/* ------------------------ NEW/UPDATED STYLING FOR BUTTONS ------------------------ */
const ProfessionalButton = styled(motion(Button))(({ theme }) => ({
  padding: '14px 32px',
  borderRadius: '12px',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.5px',
  textTransform: 'none',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform, box-shadow, border-color',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
    borderColor: alpha(theme.palette.primary.main, 0.6),
    // NEW/UPDATED shimmer on hover
    background: `linear-gradient(
      90deg,
      ${alpha(theme.palette.primary.light, 0.1)},
      ${alpha(theme.palette.secondary.light, 0.15)},
      ${alpha(theme.palette.primary.light, 0.1)}
    )`,
    backgroundSize: '200% 100%',
    animation: 'shine 2s infinite linear',
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
  borderRadius: '20px', // 20px to match your requested shape
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  // NEW/UPDATED glassy + noise texture
  background: `
    linear-gradient(145deg,
      ${alpha(theme.palette.background.paper, 0.95)},
      ${alpha(theme.palette.background.default, 0.98)}
    ),
    url('/noise-texture.png') 
  `,
  backgroundSize: 'cover',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  willChange: 'transform, box-shadow',
  contain: 'layout paint style',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 24px 48px -8px ${alpha(theme.palette.primary.main, 0.15)}`,
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
    transform: 'translateX(4px)',
    boxShadow: `0 6px 18px ${alpha(theme.palette.primary.main, 0.1)}`
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
  { id: 'ai-ml', title: 'AI/ML', icon: <FaBrain />, color: '#FF6F00', description: 'Intelligent analytics', special: true },
  { id: 'database', title: 'Database', icon: <FaDatabase />, color: '#7A5CAB', description: 'Data management systems' },
  { id: 'google-cloud', title: 'Google Cloud', icon: <FaGoogle />, color: '#4285F4', description: 'Cloud solutions' },
  { id: 'data-analytics', title: 'Data Analytics', icon: <FaChartLine />, color: '#4CAF50', description: 'Insights and visualization' },
  { id: 'cloud-infra', title: 'Cloud Infra', icon: <FaCloud />, color: '#2196F3', description: 'Hybrid cloud environments' },
  { id: 'azure', title: 'Azure', icon: <FaMicrosoft />, color: '#0089D6', description: 'Enterprise cloud services' },
  { id: 'cicd', title: 'CI/CD', icon: <FaCodeBranch />, color: '#9C27B0', description: 'Automated pipelines' },
  { id: 'docker', title: 'Docker', icon: <FaDocker />, color: '#2496ED', description: 'Containerization platform' },
  { id: 'linux', title: 'Linux', icon: <FaLinux />, color: '#FCC624', description: 'Open-source systems' }
];

/* -------------------------------------------------------------------------- */
/*                                   HeroSection                              */
/* -------------------------------------------------------------------------- */
const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  return (
    <Box
      component="section"
      sx={{
        // For consistent "box" shape on mobile:
        borderRadius: '20px',
        overflow: 'hidden',
        mx: 'auto', // ensures center alignment
        my: 2,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          maxWidth: '95%', // or 100%, as you prefer
        },
        // The large gradient background
        background: `linear-gradient(135deg,
          ${alpha(theme.palette.primary.dark, 0.98)} 0%,
          ${alpha(theme.palette.secondary.dark, 0.95)} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(
            from 90deg,
            ${alpha(theme.palette.primary.light, 0.15)},
            transparent 80%
          )`,
          animation: 'swirlConic 30s linear infinite',
          zIndex: 0
        }
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: 16,     // Taller hero
          pt: 20,     // Taller hero
          pb: 20,     // Taller hero
          position: 'relative', 
          zIndex: 1
        }}
      >
        <style>{globalStyles}</style>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontWeight: 800,
              fontSize: isMobile ? '2rem' : '2.5rem',
              lineHeight: 1.2,
              background: `linear-gradient(45deg,
                ${theme.palette.common.white} 30%,
                ${alpha(theme.palette.secondary.light, 0.9)} 100%)`,
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
            }}
          >
            Precision Engineering for Digital Excellence
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 2,
              color: alpha(theme.palette.common.white, 0.8),
              fontWeight: 500,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              '& span': {
                display: 'inline-block',
                mx: 1.5,
                verticalAlign: 'middle'
              }
            }}
          >
            <span>Trusted by</span> 
            <FaMicrosoft style={{ color: theme.palette.success.main }} />
            <FaGoogle style={{ color: theme.palette.error.main }} /> 
            <FaAws style={{ color: theme.palette.warning.main }} />
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontSize: '1rem',
              fontWeight: 300,
              opacity: 0.9,
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            Strategic technology solutions combining enterprise robustness with agile innovation
          </Typography>

          <Box
            sx={{ 
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
            }}
          >
            <ProfessionalButton
              variant="contained"
              onClick={() => router.push('/free-consult')}
              sx={{
                background: `linear-gradient(45deg, var(--persuasive-2), ${alpha('#2a9d8f', 0.8)})`,
                color: 'white',
                order: 1
              }}
            >
              Get Free Architecture Review
            </ProfessionalButton>

            <ProfessionalButton
              variant="contained"
              onClick={() => router.push('/contact')}
              endIcon={<ArrowRightAlt />}
              sx={{
                background: `linear-gradient(45deg,
                  ${theme.palette.error.dark} 0%,
                  ${theme.palette.warning.dark} 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                order: 2,
                '&::after': {
                  content: '"LIMITED CAPACITY"',
                  position: 'absolute',
                  top: -8,
                  right: -40,
                  transform: 'rotate(25deg)',
                  fontSize: '0.65rem',
                  background: theme.palette.error.main,
                  padding: '2px 24px',
                  fontWeight: 700
                }
              }}
            >
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
                },
                order: 3
              }}
            >
              View Case Studies
            </ProfessionalButton>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  TechnologyCards                           */
/* -------------------------------------------------------------------------- */
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
    <Box 
      component="section" 
      ref={techSectionRef} 
      onMouseMove={handleMouseMove} 
      sx={{ 
        py: 8, 
        position: 'relative',
        background: `
          radial-gradient(ellipse at center,
            ${alpha(theme.palette.primary.light, 0.05)},
            transparent 80%)
        `,
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontWeight: 800,
            fontSize: isMobile ? '1.75rem' : '2.25rem',
          }}
        >
          Core Expertise
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
                sx={{
                  ...(tech.special && {
                    border: `2px solid ${tech.color}`,
                    background: `linear-gradient(195deg,${alpha(theme.palette.background.paper, 0.95)},${alpha(tech.color, 0.15)}), url('/noise-texture.png')`,
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.03)'
                    }
                  })
                }}
              >
                {tech.special && (
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: tech.color,
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <Box 
                  sx={{ 
                    height: 80, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    mb: 2 
                  }}
                >
                  <TechIconContainer>
                    <Box className="tech-gradient" />
                    <motion.div 
                      whileHover={{ scale: 1.1 }} 
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {React.cloneElement(tech.icon, { size: 40, style: { color: tech.color } })}
                    </motion.div>
                  </TechIconContainer>
                </Box>
                <CardTitle techcolor={tech.color}>{tech.title}</CardTitle>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary', 
                    textAlign: 'center', 
                    lineHeight: 1.6, 
                    fontSize: '0.9rem'
                  }}
                >
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

/* -------------------------------------------------------------------------- */
/*                               WhyPartnerSection                            */
/* -------------------------------------------------------------------------- */
const WhyPartnerSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="section"
      sx={{
        // Same shape & container approach as Hero
        borderRadius: '20px',
        overflow: 'hidden',
        mx: 'auto',
        my: 2,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          maxWidth: '95%',
        },
        background: `linear-gradient(135deg,
          ${alpha(theme.palette.primary.dark, 0.98)},
          ${alpha(theme.palette.secondary.dark, 0.95)}
        )`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(
            from 45deg,
            ${alpha(theme.palette.primary.light, 0.06)},
            transparent 70%
          )`,
          animation: 'swirlConic 40s linear infinite',
          zIndex: 0,
        }
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          py: 8
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 800, 
                  fontSize: isMobile ? '1.75rem' : '2rem',
                }}
              >
                Why Partner With Us
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.9, 
                  lineHeight: 1.6, 
                  fontWeight: 300
                }}
              >
                Enterprise-grade development process combining security, scalability, and innovation
              </Typography>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            {[
              'Military-grade Security (256-bit AES)',
              'Full Development Lifecycle (100+ Projects)',
              '24/7 Production Support (99.99% Uptime)',
              'Regulatory Compliance (GDPR/HIPAA)'
            ].map((item, idx) => (
              <ValuePropositionItem 
                key={idx} 
                initial={{ opacity: 0, x: 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "100px" }}
                transition={{ delay: idx * 0.1 + 0.3 }}
              >
                <CheckCircleOutline 
                  sx={{ 
                    mr: 2, 
                    color: theme.palette.success.main, 
                    fontSize: '1.5rem' 
                  }} 
                />
                <Box>
                  <Typography 
                    variant="body1" 
                    sx={{ fontWeight: 600 }}
                  >
                    {item.replace(/\(.*?\)/, '')}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: alpha(theme.palette.common.white, 0.7),
                      fontWeight: 500
                    }}
                  >
                    {item.match(/\((.*?)\)/)?.[1]}
                  </Typography>
                </Box>
              </ValuePropositionItem>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  HomePage                                  */
/* -------------------------------------------------------------------------- */
const HomePage = () => {
  return (
    <Box component="main">
      <Head>
        <title>Precision Tech Solutions</title>
        <meta name="description" content="Enterprise-grade technology solutions with precision engineering" />
      </Head>

      {/* Hero */}
      <HeroSection />

      {/* Tech Cards */}
      <TechnologyCards />

      {/* Why Partner */}
      <WhyPartnerSection />
    </Box>
  );
};

export default HomePage;
