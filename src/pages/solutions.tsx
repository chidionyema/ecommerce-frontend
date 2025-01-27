import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Grid,
  Container,
  Chip,
  IconButton,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
  Alert
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { cvProjects, type CVProject } from '../data/cvProjects';

/* ---------------------------- Global Constants ---------------------------- */
const PRIMARY_DARK = '#0A1A2F';
const SECONDARY_DARK = '#532F73';
const LIGHT_ACCENT = '#F2E7FE';
const PAGE_BG = '#F9FAFD';
const BACKDROP_BLUR = 'blur(28px)';
const PAGE_SIZE = 9;

/* ---------------------------- Global Animations --------------------------- */
const globalStyles = `
  @keyframes swirlConic {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes shine {
    0%   { mask-position: -150%; }
    100% { mask-position: 250%; }
  }
`;

/* --------------------------- Styled Components --------------------------- */
const IconBackground = styled(motion.div)(({ theme }) => ({
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.9)}, ${alpha(SECONDARY_DARK, 0.7)})`,
  boxShadow: `0 8px 24px ${alpha(PRIMARY_DARK, 0.3)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.15) rotate(8deg)',
    boxShadow: `0 12px 32px ${alpha(SECONDARY_DARK, 0.4)}`,
  },
}));

const PremiumCardContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  overflow: 'hidden',
  cursor: 'pointer',
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(PRIMARY_DARK, 0.97)})`,
  boxShadow: `0 20px 50px ${alpha(PRIMARY_DARK, 0.1)}`,
  border: '1px solid transparent',
  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
  height: 360,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    borderRadius: 24,
    background: `conic-gradient(from 90deg at 50% 50%, ${SECONDARY_DARK}, ${alpha(LIGHT_ACCENT, 0.3)}, ${PRIMARY_DARK})`,
    animation: 'swirlConic 4s linear infinite',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 0,
  },
  '&:hover::before': {
    opacity: 0.6,
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 32px 64px -12px ${alpha(SECONDARY_DARK, 0.4)}`,
  },
  '.content-overlay': {
    position: 'absolute',
    inset: 0,
    borderRadius: 24,
    backgroundColor: alpha('#fff', 0.82),
    zIndex: 1,
    backdropFilter: 'blur(12px)',
  },
}));

const Tilt = dynamic(() => import('react-parallax-tilt').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div style={{ height: '100%', borderRadius: 24, background: PAGE_BG }} />,
});

const Solutions: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);

  const filteredProjects = useMemo(() => {
    return cvProjects.filter((proj) =>
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const newProjects = filteredProjects.slice(0, page * PAGE_SIZE);
      setDisplayedProjects(newProjects);
      setHasMore(newProjects.length < filteredProjects.length);
      setIsLoading(false);
    }
  }, [page, filteredProjects, isLoading]);

  useEffect(() => {
    if (!hasMore) return;
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  const handleViewDetails = useCallback(
    (projectId: string) => {
      router.push(`/projects/${projectId}`);
    },
    [router]
  );

  return (
    <Box sx={{ backgroundColor: PAGE_BG, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <style>{globalStyles}</style>
      <Head>
        <title>Enterprise Solutions | Premium Technology Projects</title>
        <meta name="description" content="Premium enterprise technology solutions with cutting-edge implementations" />
      </Head>

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: alpha('#ffffff', 0.97),
          backdropFilter: BACKDROP_BLUR,
          borderBottom: `1px solid ${alpha(PRIMARY_DARK, 0.1)}`,
        }}
      >
        <Toolbar sx={{ py: isMobile ? 2 : 4 }}>
          <Box sx={{
            width: '100%',
            maxWidth: 800,
            mx: 'auto',
            textAlign: 'center',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '3px',
              background: `linear-gradient(90deg, transparent 0%, ${PRIMARY_DARK} 50%, transparent 100%)`,
              opacity: 0.8,
            },
          }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.03em',
                mb: 2,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                background: `linear-gradient(to right, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 4px 20px ${alpha(PRIMARY_DARK, 0.2)}`,
              }}
            >
              Enterprise Solutions
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                maxWidth: 680,
                mx: 'auto',
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.6,
              }}
            >
              Curated selection of premium enterprise technology implementations
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: isMobile ? 4 : 8 }}>
        <Grid container spacing={4}>
          {displayedProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Tilt 
                tiltReverse 
                scale={1.02} 
                glareEnable 
                glareBorderRadius="24px"
                glarePosition="all"
                glareMaxOpacity={0.1}
                style={{ height: '100%' }}
              >
                <PremiumCardContainer
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleViewDetails(project.id)}
                  transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                >
                  <Box className="content-overlay" />
                  <Box sx={{ 
                    p: 3, 
                    position: 'relative', 
                    zIndex: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <IconBackground
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {React.createElement(project.icon, {
                          size: 24,
                          color: LIGHT_ACCENT,
                        })}
                      </IconBackground>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: PRIMARY_DARK }}>
                        {project.clientName}
                      </Typography>
                    </Box>

                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 1, 
                        fontWeight: 800,
                        background: `linear-gradient(45deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: `0 4px 20px ${alpha(PRIMARY_DARK, 0.2)}`,
                      }}
                    >
                      {project.name}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2,
                        color: 'text.secondary',
                        flex: 1,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {project.description}
                    </Typography>

                    <Box sx={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 3,
                      maxHeight: 80,
                      overflowY: 'auto',
                    }}>
                      {project.technologies.map((tech) => (
                        <Chip 
                          key={tech} 
                          label={tech}
                          size="small"
                          sx={{
                            background: alpha(SECONDARY_DARK, 0.1),
                            color: PRIMARY_DARK,
                            fontWeight: 600,
                            '&:hover': {
                              background: alpha(SECONDARY_DARK, 0.2),
                            }
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton sx={{ 
                        color: PRIMARY_DARK,
                        '&:hover': {
                          background: alpha(SECONDARY_DARK, 0.1),
                        }
                      }}>
                        <ArrowForwardIcon />
                      </IconButton>
                    </Box>

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
                        background: `radial-gradient(circle at var(--x) var(--y), ${alpha(SECONDARY_DARK, 0.1)} 0%, transparent 70%)`,
                        pointerEvents: 'none',
                      }}
                    />
                  </Box>
                </PremiumCardContainer>
              </Tilt>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Solutions;