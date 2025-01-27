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
 * Hero Section
 ----------------------------------------------------------------------------- */
const PersuasiveButton = styled(motion(Button))(({ theme }) => ({
  padding: '14px 28px',
  borderRadius: '12px',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.8px',
  textTransform: 'none',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: 'all 0.4s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
    background: `linear-gradient(
      90deg,
      ${alpha(theme.palette.primary.light, 0.15)},
      ${alpha(theme.palette.secondary.light, 0.25)},
      ${alpha(theme.palette.primary.light, 0.15)}
    )`,
    backgroundSize: '200% 100%',
    animation: 'shine 1.5s infinite linear',
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
      pt: isMobile ? 10 : 14,
      pb: isMobile ? 10 : 16,
      background: `linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.94)}, ${alpha(SECONDARY_DARK, 0.92)})`,
      color: '#fff',
      textAlign: 'center',
    }}>
      <style>{globalStyles}</style>

      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: alpha('#FFB300', 0.95),
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '14px',
          zIndex: 999
        }}
      >
        {seatsLeft} SLOTS REMAIN
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <Alert severity="info" sx={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.info.main, 0.2),
            color: theme.palette.info.contrastText,
            mb: 3,
            py: 1,
            px: 3,
            borderRadius: '8px',
            border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
            fontSize: '0.95rem',
            fontWeight: 600,
            backdropFilter: 'blur(8px)',
            '& .MuiAlert-icon': {
              color: theme.palette.info.light,
              paddingRight: '8px',
              fontSize: '1.2rem'
            }
          }}>
            Limited-Time Offer: Free Cloud Readiness Assessment
          </Alert>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h1" sx={{
            fontWeight: 800,
            fontSize: isMobile ? '2rem' : '3rem',
            background: `linear-gradient(90deg, ${alpha(theme.palette.primary.light, 0.7)}, ${alpha(theme.palette.secondary.light, 0.9)})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Enterprise-Grade Digital Transformation
          </Typography>
        </motion.div>

        <Typography variant="h6" sx={{ mb: 4, color: alpha('#fff', 0.85) }}>
          Trusted by industry leaders worldwide
          <Box sx={{ mt: 2, '& svg': { mx: 2, fontSize: 28 } }}>
            <FaMicrosoft /><FaGoogle /><FaAws /><FaMicrosoft />
          </Box>
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <PersuasiveButton
            variant="contained"
            onClick={() => router.push('/contact?offer=cloudAssess')}
            sx={{
              background: `linear-gradient(90deg, ${alpha('#2a9d8f', 0.7)}, ${alpha('#264653', 0.9)})`,
              color: '#fff',
            }}
          >
            Free Cloud Assessment
          </PersuasiveButton>

          <PersuasiveButton
            variant="outlined"
            endIcon={<ArrowRightAlt />}
            onClick={() => router.push('/pricing')}
            sx={{ color: '#fff', borderColor: alpha('#fff', 0.25) }}
          >
            Enterprise Pricing
          </PersuasiveButton>
        </Box>
      </Container>
    </Box>
  );
};

/* -----------------------------------------------------------------------------
 * Enhanced Technology Cards
 ----------------------------------------------------------------------------- */
const TechCard = styled(motion(Box))<{ techcolor: string }>(({ theme, techcolor }) => ({
  padding: theme.spacing(3),
  borderRadius: '24px',
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.default, 0.98)})`,
  border: '1px solid transparent',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(12px)',
  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 32px 64px -12px ${alpha(techcolor, 0.2)}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    zIndex: -1,
    background: `conic-gradient(from 90deg at 50% 50%, ${techcolor}, ${alpha(techcolor, 0.3)}, ${techcolor})`,
    borderRadius: '26px',
    animation: 'swirlConic 4s linear infinite',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const TechIconContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  padding: theme.spacing(2),
  borderRadius: '16px',
  marginBottom: theme.spacing(3),
  '&:hover': {
    '& .icon-gradient': {
      opacity: 0.6,
      transform: 'scale(1.2)',
    },
    '& svg': {
      filter: `drop-shadow(0 8px 16px ${alpha(theme.palette.primary.main, 0.3)})`,
    },
  },
  '& .icon-gradient': {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(circle at center, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
    opacity: 0,
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  '& svg': {
    fontSize: '4.5rem',
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
  },
}));

const CardTitle = styled(Typography)<{ techcolor: string }>(({ techcolor }) => ({
  background: `linear-gradient(45deg, ${techcolor}, ${alpha(techcolor, 0.7)})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  letterSpacing: '-0.75px',
  marginBottom: '0.5rem',
  textAlign: 'center',
}));

const TechnologyCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      py: 10,
      background: `radial-gradient(ellipse at top left, ${alpha(theme.palette.primary.light, 0.05)}, transparent 80%),
                  linear-gradient(150deg, ${PAGE_BG} 0%, ${alpha(SECONDARY_DARK, 0.03)} 100%)`
    }}>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ 
          textAlign: 'center', 
          mb: 8, 
          fontWeight: 900,
          background: `linear-gradient(90deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Core Technologies
        </Typography>
        <Grid container spacing={isMobile ? 3 : 4}>
          {techIcons.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <TechCard
                techcolor={tech.color}
                initial={{ opacity: 0, y: 40, rotateZ: -2 }}
                whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ 
                  type: 'spring',
                  delay: index * 0.05,
                  stiffness: 80,
                  damping: 12
                }}
                whileHover={{ scale: 1.02 }}
              >
                <TechIconContainer whileHover={{ scale: 1.05 }}>
                  <Box className="icon-gradient" />
                  <Box 
                    component={motion.div}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    sx={{ color: tech.color }}
                  >
                    {tech.icon}
                  </Box>
                </TechIconContainer>
                
                <CardTitle variant="h5" techcolor={tech.color}>
                  {tech.title}
                </CardTitle>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontWeight: 500,
                    lineHeight: 1.6
                  }}>
                    Enterprise-grade solutions with {tech.title.toLowerCase()} integration
                  </Typography>
                </motion.div>

                <Box
                  component={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at var(--x) var(--y), ${alpha(tech.color, 0.1)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />
              </TechCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

/* -----------------------------------------------------------------------------
 * Why Partner Section
 ----------------------------------------------------------------------------- */
const WhyPartnerSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      background: `linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.98)}, ${alpha(SECONDARY_DARK, 0.95)})`,
      color: 'white',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 800 }}>
              Why Choose Us
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Combining enterprise robustness with agile innovation for digital excellence
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {[
              'Military-grade Security & Compliance',
              '24/7 Production Support (99.99% Uptime)',
              'Full Development Lifecycle Management',
              'Scalable Cloud Architectures',
              'AI-Driven Analytics & Optimization',
              'Cross-Platform Integration Expertise'
            ].map((item, idx) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleOutline sx={{ mr: 2, color: theme.palette.success.main }} />
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Grid>
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
      <TechnologyCards />
      <WhyPartnerSection />
    </Box>
  );
}