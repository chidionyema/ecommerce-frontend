import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import {
  FaPython, FaReact, FaNodeJs, FaAws, FaDocker, FaJava,
  FaMicrosoft, FaBrain, FaDatabase, FaGoogle, FaLinux
} from 'react-icons/fa';

/* -----------------------------------------------------------------------------
 * Global Styles & Animations
 ----------------------------------------------------------------------------- */
const globalStyles = `
  @keyframes swirlConic {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes shine {
    0%   { mask-position: -150%; }
    100% { mask-position: 250%; }
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  * {
    backface-visibility: hidden;
  }
`;

/* -----------------------------------------------------------------------------
 * Color Variables
 ----------------------------------------------------------------------------- */
const PAGE_BG = '#F9FAFD';
const PRIMARY_DARK = '#0A1A2F';
const SECONDARY_DARK = '#532F73';
const LIGHT_ACCENT = '#F2E7FE';

/* -----------------------------------------------------------------------------
 * Tech Icons Data
 ----------------------------------------------------------------------------- */
const techIcons = [
  { id: 'python', title: 'Python', icon: <FaPython />, color: '#3776AB' },
  { id: 'react', title: 'React', icon: <FaReact />, color: '#61DAFB' },
  { id: 'nodejs', title: 'Node.js', icon: <FaNodeJs />, color: '#68A063' },
  { id: 'aws', title: 'AWS', icon: <FaAws />, color: '#FF9900' },
  { id: 'docker', title: 'Docker', icon: <FaDocker />, color: '#2496ED' },
  { id: 'java', title: 'Java', icon: <FaJava />, color: '#007396' },
  { id: 'dotnet', title: '.NET', icon: <FaMicrosoft />, color: '#512BD4' },
  { id: 'ai-ml', title: 'AI/ML', icon: <FaBrain />, color: '#FF6F00' },
  { id: 'database', title: 'Database', icon: <FaDatabase />, color: '#7A5CAB' },
  { id: 'gcp', title: 'Google Cloud', icon: <FaGoogle />, color: '#4285F4' },
  { id: 'linux', title: 'Linux', icon: <FaLinux />, color: '#FCC624' },
  { id: 'azure', title: 'Azure', icon: <FaMicrosoft />, color: '#0089D6' },
];

/* -----------------------------------------------------------------------------
 * Scarcity & Social Proof Hooks
 ----------------------------------------------------------------------------- */
const useSeatsLeft = (initialSeats = 5) => {
  const [seatsLeft, setSeatsLeft] = useState(initialSeats);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => Math.max(1, prev - 1));
    }, 70000);
    return () => clearInterval(interval);
  }, []);
  return seatsLeft;
};

const engagementsList = [
  'Oliver from Berlin started a Cloud Pilot',
  'Nina from Seattle signed up for DevOps Sprint',
  'Acme Corp. initiated a Data Migration project',
  'Clara from NYC booked a 6-month retainer'
];

const useRecentEngagements = () => {
  const [engagementIndex, setEngagementIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementIndex((i) => (i + 1) % engagementsList.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return engagementsList[engagementIndex];
};

/* -----------------------------------------------------------------------------
 * Enhanced Hero Section
 ----------------------------------------------------------------------------- */
const PersuasiveButton = styled(motion(Button))(({ theme }) => ({
  padding: '16px 32px',
  borderRadius: '14px',
  fontWeight: 700,
  fontSize: '1.1rem',
  letterSpacing: '0.8px',
  textTransform: 'none',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
  }
}));

const HeroSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const seatsLeft = useSeatsLeft(5);
  const recentEngagement = useRecentEngagements();

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      pt: isMobile ? 12 : 18,
      pb: isMobile ? 12 : 20,
      background: `
        linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.94)}, ${alpha(SECONDARY_DARK, 0.92)}),
        radial-gradient(circle at 20% 80%, ${alpha(LIGHT_ACCENT, 0.15)} 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, ${alpha('#F72585', 0.1)} 0%, transparent 40%)
      `,
      color: '#fff',
      textAlign: 'center',
      borderBottom: `1px solid ${alpha('#fff', 0.1)}`,
    }}>
      <style>{globalStyles}</style>

      {/* Scarcity Timer */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          background: `linear-gradient(45deg, ${theme.palette.error.main}, #FF6B6B)`,
          color: '#fff',
          padding: '8px 20px',
          borderRadius: '16px',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: `0 8px 24px ${alpha(theme.palette.error.main, 0.3)}`
        }}
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <span style={{ fontSize: '1.2rem', marginRight: 8 }}>🔥</span>
        </motion.div>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', lineHeight: 1.2 }}>
            {seatsLeft} SLOTS LEFT
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '0.7em', opacity: 0.9 }}>
            Next price increase in 2:59
          </Typography>
        </Box>
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Offer Badge */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: alpha('#4CC9F0', 0.15),
            color: '#fff',
            mb: 4,
            py: 1.5,
            px: 4,
            borderRadius: '12px',
            border: `1px solid ${alpha('#4CC9F0', 0.3)}`,
            fontSize: '1rem',
            fontWeight: 700,
            backdropFilter: 'blur(12px)',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '200%',
              height: '100%',
              background: `linear-gradient(90deg, transparent 25%, ${alpha('#4CC9F0', 0.2)} 50%, transparent 75%)`,
              animation: 'shine 3s infinite',
            }
          }}>
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ marginRight: 12 }}>
              🎁
            </motion.div>
            Free Cloud Readiness Assessment
          </Box>
        </motion.div>

        {/* Main Headline */}
        <Box sx={{ 
          maxWidth: '1200px',
          mx: 'auto',
          mb: isMobile ? 4 : 6,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -24,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.3)}, transparent)`,
          }
        }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }}>
            <Typography variant="h1" sx={{
              fontWeight: 900,
              fontSize: isMobile ? '2.5rem' : '4rem',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              mb: 2,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              background: `linear-gradient(45deg, #fff 30%, ${alpha(LIGHT_ACCENT, 0.9)})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              <Box component="span" sx={{ display: 'block' }}>Enterprise-Grade</Box>
              <Box component="span" sx={{ 
                display: 'block',
                background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Digital Transformation
              </Box>
            </Typography>
          </motion.div>
        </Box>

        {/* Trust Indicators */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ marginBottom: '2rem' }}>
          <Typography variant="subtitle1" sx={{
            color: alpha('#fff', 0.85),
            mb: 2,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            Trusted by global innovators
            <Box sx={{ 
              display: 'flex',
              gap: '2rem',
              '& svg': {
                fontSize: 32,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2))'
                }
              }
            }}>
              <FaMicrosoft /><FaGoogle /><FaAws /><FaJava /><FaDocker />
            </Box>
          </Typography>
        </motion.div>

        {/* CTAs */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 3, 
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
          mt: 6
        }}>
          <PersuasiveButton
            variant="contained"
            onClick={() => router.push('/contact?offer=cloudAssess')}
            sx={{
              background: `linear-gradient(135deg, ${alpha('#4361EE', 0.9)}, ${alpha('#3A0CA3', 0.9)})`,
              minWidth: 260,
              '&:hover': { background: `linear-gradient(135deg, ${alpha('#4361EE', 1)}, ${alpha('#3A0CA3', 1)})` }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 1.5, repeat: Infinity }}>🚀</motion.div>
              Start Free Assessment
            </Box>
          </PersuasiveButton>

          <PersuasiveButton
            variant="outlined"
            onClick={() => router.push('/pricing')}
            sx={{ 
              color: '#fff', 
              borderColor: alpha('#fff', 0.3),
              minWidth: 260,
              background: alpha('#fff', 0.1),
              '&:hover': { background: alpha('#fff', 0.2), borderColor: alpha('#fff', 0.5) }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              Enterprise Solutions
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRightAlt sx={{ fontSize: 20 }} />
              </motion.div>
            </Box>
          </PersuasiveButton>
        </Box>

        {/* Social Proof */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '3rem' }}>
          <Typography variant="body2" sx={{
            color: alpha('#fff', 0.8),
            fontStyle: 'italic',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircleOutline sx={{ fontSize: 16, color: theme.palette.success.light }} />
            {recentEngagement}
          </Typography>
        </motion.div>
      </Container>

      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: `
          repeating-linear-gradient(45deg, ${alpha('#fff', 0.02)} 0px, ${alpha('#fff', 0.02)} 2px, transparent 2px, transparent 8px)
        `,
        pointerEvents: 'none'
      }} />
    </Box>
  );
};

/* -----------------------------------------------------------------------------
 * Enhanced Technology Showcase Section
 ----------------------------------------------------------------------------- */
const TechIconWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120%',
    height: '120%',
    background: 'radial-gradient(circle, currentColor 0%, transparent 70%)',
    opacity: 0.1,
    zIndex: 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    border: '2px solid currentColor',
    opacity: 0.1,
    zIndex: 0
  }
}));

const TechCard = styled(motion(Box))<{ techcolor: string }>(({ theme, techcolor }) => ({
  padding: theme.spacing(4),
  borderRadius: '32px',
  background: `
    linear-gradient(
      145deg,
      ${alpha(theme.palette.background.paper, 0.98)} 0%,
      ${alpha(theme.palette.background.default, 0.98)} 100%
    )`,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(24px)',
  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: `0 8px 32px ${alpha(techcolor, 0.05)}`,

  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `
      0 32px 64px -12px ${alpha(techcolor, 0.2)},
      inset 0 0 24px ${alpha(techcolor, 0.05)}
    `,
    '&::before': {
      opacity: 0.3
    }
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(
        400px circle at var(--mouse-x) var(--mouse-y),
        ${alpha(techcolor, 0.1)} 0%,
        transparent 60%
      )`,
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
    zIndex: 0
  }
}));

const TechnologyShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (index: number) => (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement; // Add type assertion
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };
  return (
    <Box sx={{ 
      py: 10,
      background: `
        radial-gradient(ellipse at top left, ${alpha(theme.palette.primary.light, 0.05)}, transparent 80%),
        radial-gradient(ellipse at bottom right, ${alpha(theme.palette.secondary.light, 0.05)}, transparent 80%)
      `,
      position: 'relative'
    }}>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ 
          textAlign: 'center', 
          mb: 8, 
          fontWeight: 900,
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: '80px',
            height: '4px',
            background: `linear-gradient(90deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
            borderRadius: '2px',
            margin: '2rem auto 0'
          }
        }}>
          Core Technologies
        </Typography>
        <Grid container spacing={isMobile ? 3 : 4}>
          {techIcons.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <TechCard
                techcolor={tech.color}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ delay: index * 0.05 }}
                onMouseMove={handleMouseMove(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    '& .tech-icon': {
                      transform: 'scale(1.1)',
                      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
                    }
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <TechIconWrapper>
                    <motion.div
                      className="tech-icon"
                      style={{ display: 'inline-block' }}
                      animate={{
                        y: hoveredIndex === index ? [-2, 2, -2] : 0,
                        rotate: hoveredIndex === index ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Box sx={{ 
                        fontSize: '5rem',
                        color: tech.color,
                        mb: 2,
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.4s ease'
                      }}>
                        {tech.icon}
                      </Box>
                    </motion.div>
                  </TechIconWrapper>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 800,
                    mb: 1,
                    position: 'relative',
                    zIndex: 1,
                    '&::after': {
                      content: '""',
                      display: 'block',
                      width: '40px',
                      height: '2px',
                      background: tech.color,
                      margin: '1rem auto',
                      borderRadius: '2px',
                      opacity: 0.5
                    }
                  }}>
                    {tech.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'text.secondary', 
                    lineHeight: 1.6,
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '4.5em'
                  }}>
                    Enterprise-grade {tech.title.toLowerCase()} solutions with full integration
                  </Typography>
                </Box>
                
                {/* Animated border */}
                <Box sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '32px',
                  padding: '2px',
                  background: `conic-gradient(from 90deg at 50% 50%, ${alpha(tech.color, 0.4)}, ${alpha(tech.color, 0.1)}, ${alpha(tech.color, 0.4)})`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  animation: 'swirlConic 8s linear infinite',
                  opacity: 0.5,
                  pointerEvents: 'none'
                }} />
              </TechCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

/* -----------------------------------------------------------------------------
 * Main Page Component
 ----------------------------------------------------------------------------- */
export default function HomePage() {
  return (
    <Box sx={{ backgroundColor: PAGE_BG, minHeight: '100vh' }}>
      <Head>
        <title>Enterprise Tech Solutions | Digital Transformation Experts</title>
        <meta name="description" content="Enterprise-grade technology solutions with precision engineering and proven results" />
      </Head>

      <HeroSection />
      <TechnologyShowcase />
    </Box>
  );
}