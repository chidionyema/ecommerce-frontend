import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  FaMicrosoft, FaBrain, FaDatabase, FaGoogle, FaChartLine,
  FaCloud, FaCodeBranch, FaLinux, FaApple
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
 *  Color Variables
 ----------------------------------------------------------------------------- */
const PAGE_BG = '#F9FAFD';
const PRIMARY_DARK = '#0A1A2F';
const SECONDARY_DARK = '#532F73';
const LIGHT_ACCENT = '#F2E7FE';

/* -----------------------------------------------------------------------------
 *  Scarcity & Social Proof Hooks
 ----------------------------------------------------------------------------- */
function useSeatsLeft(initialSeats = 5) {
  const [seatsLeft, setSeatsLeft] = useState(initialSeats);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => Math.max(1, prev - 1));
    }, 70000);
    return () => clearInterval(interval);
  }, []);
  return seatsLeft;
}

const engagementsList = [
  'Oliver from Berlin started a Cloud Pilot',
  'Nina from Seattle signed up for DevOps Sprint',
  'Acme Corp. initiated a Data Migration project',
  'Clara from NYC booked a 6-month retainer'
];

function useRecentEngagements() {
  const [engagementIndex, setEngagementIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementIndex((i) => (i + 1) % engagementsList.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return engagementsList[engagementIndex];
}

/* -----------------------------------------------------------------------------
 *  Hero Section with Scarcity Elements
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

const HeroSection: React.FC = () => {
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
            display: 'inline-block',
            backgroundColor: alpha(theme.palette.info.light, 0.15),
            mb: 3,
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
            <FaMicrosoft /><FaGoogle /><FaAws /><FaApple />
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
 *  Core Technologies Section
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

const TechIconContainer = styled(Box)({
  position: 'relative',
  willChange: 'transform',
  '& .tech-gradient': {
    position: 'absolute',
    width: '120%',
    height: '120%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
    opacity: 0,
    transition: 'all 0.4s ease',
    mixBlendMode: 'soft-light',
  },
});

const TechCard = styled(motion(Box))(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.default, 0.98)})`,
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 24px 48px -8px ${alpha(theme.palette.primary.main, 0.15)}`,
    '& .tech-gradient': { opacity: 0.6, transform: 'scale(1.1) rotate(8deg)' },
  },
}));

const CardTitle = styled(Typography)<{ techcolor: string }>(({ techcolor }) => ({
  color: techcolor,
  fontWeight: 700,
  letterSpacing: '-0.5px',
  textAlign: 'center',
}));

const TechnologyCards: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: 8, background: `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.light, 0.05)}, transparent 80%)` }}>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 800 }}>
          Core Technologies
        </Typography>
        <Grid container spacing={isMobile ? 2 : 4}>
          {techIcons.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <TechCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TechIconContainer>
                  <Box className="tech-gradient" />
                  <Box sx={{ fontSize: 60, color: tech.color, mb: 2 }}>
                    {tech.icon}
                  </Box>
                </TechIconContainer>
                <CardTitle techcolor={tech.color}>{tech.title}</CardTitle>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
             
                </Typography>
              </TechCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

/* -----------------------------------------------------------------------------
 *  Why Partner Section
 ----------------------------------------------------------------------------- */
const WhyPartnerSection: React.FC = () => {
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
 *  Main Page
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