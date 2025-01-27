import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Container,
  Chip,
  IconButton,
  alpha,
  styled,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { cvProjects, type CVProject } from '../data/cvProjects';

// Dynamically import tilt for 3D parallax effect
const Tilt = dynamic(
  () => import('react-parallax-tilt').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div style={{ height: '100%', borderRadius: 24, background: '#f5f5f5' }} />,
  }
);

/* --------------------------- Colors & Constants --------------------------- */
const LIGHT_SKY = '#F8FAFF';
const BACKDROP_BLUR = 'blur(28px)';
const PAGE_SIZE = 9;

/* --------------------------- Styled Components --------------------------- */
const PremiumCardContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  overflow: 'hidden',
  cursor: 'pointer',
  background: `linear-gradient(145deg, #F4A261, #2A9D8F, #E63946)`,
  boxShadow: `
    0 20px 50px ${alpha(theme.palette.primary.dark, 0.3)},
    inset 0 0 10px ${alpha(theme.palette.common.white, 0.1)}
  `,
  border: `2px solid transparent`,
  backgroundClip: 'padding-box',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.05)',
    boxShadow: `
      0 30px 60px ${alpha(theme.palette.primary.dark, 0.4)},
      inset 0 0 15px ${alpha(theme.palette.common.white, 0.15)}
    `,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    borderRadius: 24,
    background: `linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))`,
    zIndex: 0,
  },
  '.content-overlay': {
    position: 'absolute',
    inset: 0,
    borderRadius: 24,
    backgroundColor: alpha('#fff', 0.8),
    zIndex: 1,
    backdropFilter: 'blur(10px)',
  },
}));

/* ----------------------------- Main Component ----------------------------- */
const Solutions = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);

  // Debounce search input
  const debouncedQuery = useMemo(() => {
    const handler = setTimeout(() => searchQuery, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return cvProjects.filter(
      (proj) =>
        proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  // Pagination logic
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const newProjects = filteredProjects.slice(0, page * PAGE_SIZE);
      setDisplayedProjects(newProjects);
      setHasMore(newProjects.length < filteredProjects.length);
      setIsLoading(false);
    }
  }, [page, filteredProjects, isLoading]);

  // Handle infinite scroll
  useEffect(() => {
    if (!hasMore) return;
    const onScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMore]);

  // Navigate to project details
  const handleViewDetails = useCallback(
    async (projectId: string) => {
      try {
        await router.push(`/projects/${projectId}`);
      } catch (err) {
        console.error('Navigation failed:', err);
      }
    },
    [router]
  );

  return (
    <Box sx={{ backgroundColor: LIGHT_SKY, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: alpha('#ffffff', 0.97),
          backdropFilter: BACKDROP_BLUR,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Toolbar sx={{ py: isMobile ? 2 : 4 }}>
          <Box
            sx={{
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
                background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
                opacity: 0.8,
              },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.03em',
                mb: 2,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                background: theme.palette.gradients.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              Client Solutions
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
              Explore tailored solutions designed to drive business transformation and innovation.
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: isMobile ? 4 : 8 }}>
        <Grid container spacing={4}>
          {displayedProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Tilt tiltReverse scale={1.02} glareEnable glareBorderRadius="24px">
                <PremiumCardContainer
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleViewDetails(project.id)}
                >
                  <Box className="content-overlay" />
                  <Box sx={{ p: 3, position: 'relative', zIndex: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <project.icon style={{ fontSize: '2rem' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {project.clientName}
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            background: alpha(theme.palette.primary.light, 0.15),
                            color: theme.palette.primary.main,
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton sx={{ color: theme.palette.primary.main }}>
                        <ArrowForwardIcon />
                      </IconButton>
                    </Box>
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
