import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid,
  Typography,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaJava,
  FaMicrosoft,
  FaBrain,
  FaDatabase,
  FaGoogle,
  FaLinux,

} from 'react-icons/fa';


import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  PAGE_BG,
  animatedGradient,
  BACKDROP_BLUR
} from '../theme/branding';

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
 * Tech Icons
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
 * Social Proof Hook
 ----------------------------------------------------------------------------- */
const engagementsList = [
  'Oliver from Berlin started a Cloud Pilot',
  'Nina from Seattle signed up for DevOps Sprint',
  'Acme Corp. initiated a Data Migration project',
  'Clara from NYC booked a 6-month retainer',
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
 * Reusable CTA button
 ----------------------------------------------------------------------------- */
import Button from '@mui/material/Button';

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
  },
}));


/* -----------------------------------------------------------------------------
 * Hero Section
 ----------------------------------------------------------------------------- */
const HeroSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const recentEngagement = useRecentEngagements();

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { 
          xs: 4,    // 16px on mobile
          sm: 6,    // 24px on tablet
          md: 8     // 32px on desktop
        },
        pb: isMobile ? 12 : 20,
        background: `
        linear-gradient(145deg, 
          ${PRIMARY_DARK}, 
          ${SECONDARY_DARK})
      `,
      '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        repeating-linear-gradient(
          45deg,
          ${alpha('#FFFFFF', 0.02)} 0px,
          ${alpha('#FFFFFF', 0.02)} 2px,
          transparent 2px,
          transparent 8px
        )`,
      pointerEvents: 'none',
    },
      color: '#FFFFFF',
      borderBottom: `1px solid ${alpha(LIGHT_ACCENT, 0.2)}`,
      boxShadow: `0 24px 48px ${alpha(PRIMARY_DARK, 0.4)}`,
      textAlign: 'center',
       
        mt: { 
          xs: 4,   // Negative margin to offset padding on mobile
          sm: 6,   // Negative margin to offset padding on tablet
          md: 8    // Negative margin to offset padding on desktop
        }
      }}
    >
      <style>{globalStyles}</style>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main Headline */}
        <Box
          sx={{
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
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }}
          >
             <Typography variant="h1" sx={{
                background: `
                  linear-gradient(45deg, 
                    ${LIGHT_ACCENT} 20%, 
                    ${alpha('#FFFFFF', 0.9)} 80%)
                `,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
        }}>
              <Box component="span" sx={{ display: 'block' }}>
                Enterprise-Grade
              </Box>
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Digital Transformation
              </Box>
            </Typography>
          </motion.div>
        </Box>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '2rem' }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: alpha('#fff', 0.85),
              mb: 2,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            Trusted by global innovators
            <Box
              sx={{
                display: 'flex',
                gap: '2rem',
                '& svg': {
                  fontSize: 32,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2))',
                  },
                },
              }}
            >
              <FaMicrosoft />
              <FaGoogle />
              <FaAws />
              <FaJava />
              <FaDocker />
            </Box>
          </Typography>
        </motion.div>

        {/* CTA Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 2,
            mt: 6,
          }}
        >
        <PersuasiveButton sx={{
      background: `
       linear-gradient(45deg, 
          ${LIGHT_ACCENT} 20%, 
          ${alpha('#FFFFFF', 0.9)} 80%)
      `,
      border: `1px solid ${alpha(LIGHT_ACCENT, 0.3)}`,
    }}>
      Start Free Assessment
    </PersuasiveButton>
          <PersuasiveButton
            variant="outlined"
            onClick={() => router.push('/pricing')}
            sx={{
              color: '#fff',
             
              minWidth: 260,
              background: alpha('#fff', 0.1),
              '&:hover': {
                border: `1px solid ${alpha(LIGHT_ACCENT, 0.2)}`,
                background: alpha(PRIMARY_DARK, 0.4),
                backdropFilter: BACKDROP_BLUR,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              Enterprise Solutions
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRightAlt sx={{ fontSize: 20 }} />
              </motion.div>
            </Box>
          </PersuasiveButton>
        </Box>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '3rem' }}
        >
          <Typography
            variant="body2"
            sx={{
              color: alpha('#fff', 0.8),
              fontStyle: 'italic',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <CheckCircleOutline
              sx={{ fontSize: 16, color: theme.palette.success.light }}
            />
            {recentEngagement}
          </Typography>
        </motion.div>
      </Container>

      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `
            repeating-linear-gradient(45deg,
            ${alpha('#fff', 0.02)} 0px,
            ${alpha('#fff', 0.02)} 2px,
            transparent 2px,
            transparent 8px)
          `,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

/* -----------------------------------------------------------------------------
 * TechnologyShowcase
 ----------------------------------------------------------------------------- */
const TechIconWrapper = styled(Box)(() => ({
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
    transition: 'all 0.4s ease',
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
    zIndex: 0,
  },
}));

const TechCard = styled(motion(Box))<{ techcolor: string }>(
  ({ theme, techcolor }) => ({
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
        opacity: 0.3,
      },
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
      zIndex: 0,
    },
  }),
);

const TechnologyShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (index: number) => (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Box
      sx={{
        py: 10,
        background: `
          radial-gradient(ellipse at top left, ${alpha(
            theme.palette.primary.light,
            0.05,
          )}, transparent 80%),
          radial-gradient(ellipse at bottom right, ${alpha(
            theme.palette.secondary.light,
            0.05,
          )}, transparent 80%)
        `,
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          sx={{
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
              margin: '2rem auto 0',
            },
          }}
        >
          Core Technologies
        </Typography>
        <Grid container spacing={isMobile ? 3 : 4}>
          {techIcons.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <TechCard
                techcolor={tech.color}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ delay: index * 0.05 }}
                onMouseMove={handleMouseMove(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    '& .tech-icon': {
                      transform: 'scale(1.1)',
                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <TechIconWrapper>
                    <motion.div
                      className="tech-icon"
                      style={{ display: 'inline-block' }}
                      animate={{
                        y: hoveredIndex === index ? [-2, 2, -2] : 0,
                        rotate: hoveredIndex === index ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Box
                        sx={{
                          fontSize: '5rem',
                          color: tech.color,
                          mb: 2,
                          position: 'relative',
                          zIndex: 1,
                          transition: 'all 0.4s ease',
                        }}
                      >
                        {tech.icon}
                      </Box>
                    </motion.div>
                  </TechIconWrapper>
                  <Typography
                    variant="h5"
                    sx={{
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
                        opacity: 0.5,
                      },
                    }}
                  >
                    {tech.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      position: 'relative',
                      zIndex: 1,
                      minHeight: '4.5em',
                    }}
                  >
                    Enterprise-grade {tech.title.toLowerCase()} solutions with
                    full integration
                  </Typography>
                </Box>
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
 * MAIN PAGE COMPONENT
 ----------------------------------------------------------------------------- */
export default function HomePage() {
  return (
    <Box sx={{ backgroundColor: PAGE_BG, minHeight: '100vh' }}>
      <Head>
        <title>Enterprise Tech Solutions | Digital Transformation Experts</title>
        <meta
          name="description"
          content="Enterprise-grade technology solutions with precision engineering and proven results"
        />
      </Head>
      <HeroSection />
      <TechnologyShowcase />
 <WhyPartnerSection />
    </Box>
  );
}
