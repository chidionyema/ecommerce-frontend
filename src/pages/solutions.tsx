import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  CircularProgress,
  useTheme,
  Avatar,
  Badge,
  IconButton,
  type Theme,
  SxProps,
  useMediaQuery,
  alpha
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import { cvProjects, type CVProject } from '../data/cvProjects';

const Tilt = dynamic(() => import('react-parallax-tilt'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', width: '100%' }} />
});

const PAGE_SIZE = 9;
const PREFETCH_DELAY = 150;

interface ProjectCardProps {
  project: CVProject;
  theme: Theme;
  navigatingId: string | null;
  onHover: (projectId: string) => void;
  onClick: (projectId: string) => void;
}

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const usePrefetch = () => {
  const prefetchTimer = useRef<number>();
  const prefetch = useCallback((url: string, delay: number) => {
    prefetchTimer.current = window.setTimeout(() => fetch(url).catch(() => {}), delay);
  }, []);
  const cancel = useCallback(() => clearTimeout(prefetchTimer.current), []);
  return { startPrefetch: prefetch, cancelPrefetch: cancel };
};

const usePremiumCursor = () => {
  const [cursor, setCursor] = useState({ x: -100, y: -100, variant: 'default' });
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY, variant: cursor.variant });
    const handleHover = () => setCursor(c => ({ ...c, variant: 'hover' }));
    const handleLeave = () => setCursor(c => ({ ...c, variant: 'default' }));
    
    const hoverables = document.querySelectorAll('button, a, [data-hover]');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);
  return cursor;
};

const Solutions: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { startPrefetch } = usePrefetch();
  const cursor = usePremiumCursor();

  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const primaryGradient = theme.palette.gradients.primary;

  const debouncedQuery = useDebounce(searchQuery, 300);
  const filteredProjects = useMemo(() => 
    cvProjects.filter(p =>
      p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(debouncedQuery.toLowerCase()))
    ), [debouncedQuery]);

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
    const observer = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && hasMore && !isLoading && setPage(p => p + 1),
      { threshold: 0.1, rootMargin: '200px' }
    );
    const sentinel = document.querySelector('#sentinel');
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const handleViewDetails = useCallback(async (projectId: string) => {
    setNavigatingId(projectId);
    try {
      await router.push(`/projects/${projectId}`);
    } finally {
      setNavigatingId(null);
    }
  }, [router]);

  const handleProjectHover = useCallback((projectId: string) => {
    startPrefetch(`/projects/${projectId}`, PREFETCH_DELAY);
  }, [startPrefetch]);

  return (
    <Box ref={containerRef} sx={styles.container}>
      <motion.div style={styles.animatedBackground(y)}>
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            style={styles.gradientBlob(i, theme)}
            animate={{ x: [0, 100, 0], y: [0, 50, 0], rotate: [0, 360] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </motion.div>

      <Box sx={styles.cursor(cursor, theme)} />

      <AppBar position="sticky" sx={styles.appBar(theme)}>
        <Toolbar sx={styles.toolbar}>
          <Box sx={styles.headerContainer}>
       

              <Typography 
                          variant="h1" 
                          sx={{ 
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                            mb: 2,
                            fontSize: isMobile ? '2.5rem' : '3.5rem',
                            background: primaryGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`
                          }}
                        >
                       Technical Portfolio
                        </Typography>
            <TextField
              variant="filled"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={styles.searchField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={styles.searchIcon} />
                  </InputAdornment>
                ),
                sx: styles.searchInput
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={styles.projectsContainer}>
        <Grid container spacing={4}>
          {displayedProjects.map(project => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard
                project={project}
                theme={theme}
                navigatingId={navigatingId}
                onHover={handleProjectHover}
                onClick={handleViewDetails}
              />
            </Grid>
          ))}
        </Grid>

        <Box id="sentinel" sx={styles.loadingContainer}>
          {isLoading ? (
            <CircularProgress size={40} thickness={4} sx={styles.spinner(theme)} />
          ) : hasMore ? (
            <Typography variant="body2" sx={styles.scrollText}>
              Scroll to load more
            </Typography>
          ) : (
            <Box sx={styles.endIndicator}>
              <CheckCircleOutlineIcon color="success" />
              <Typography variant="body2" sx={styles.endText}>
                All projects loaded
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

const ProjectCard = React.memo<ProjectCardProps>(({ project, theme, navigatingId, onHover, onClick }) => (
  <Tilt
    tiltMaxAngleX={5}
    tiltMaxAngleY={5}
    glareEnable={true}
    glareMaxOpacity={0.1}
    transitionSpeed={2000}
    scale={1.03}
  >
    <motion.div
      whileHover={{ y: -8 }}
      style={{
        height: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: theme.shadows[4],
        position: 'relative'
      }}
      onMouseEnter={() => onHover(project.id)}
    >
      <Box sx={styles.cardHeader}>
        <Box sx={styles.cardBackground(theme)} />
        <Box sx={styles.cardContent}>
          <Box sx={styles.clientInfo}>
            <Avatar sx={styles.avatar(theme)}>
              {project.icon ? React.createElement(project.icon, { sx: styles.icon }) : <CodeIcon sx={styles.icon} />}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={styles.clientName}>
                {project.clientName}
              </Typography>
              <Typography variant="caption" sx={styles.timeline}>
                {project.timeline}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h5" sx={styles.projectTitle}>
            {project.name}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.cardBody(theme)}>
        <Typography variant="body1" sx={styles.description}>
          {project.description}
        </Typography>
        <Box sx={styles.chipContainer}>
          {project.technologies.slice(0, 4).map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              sx={styles.techChip(theme)}
            />
          ))}
        </Box>
        <Box sx={styles.cardFooter}>
          <Badge badgeContent={project.teamSize} sx={styles.teamBadge}>
            <Typography variant="caption" sx={styles.teamText}>
              Team Members
            </Typography>
          </Badge>
          <IconButton
            onClick={() => onClick(project.id)}
            disabled={navigatingId === project.id}
            sx={styles.caseStudyButton(theme)}
          >
            {navigatingId === project.id ? (
              <CircularProgress size={24} sx={styles.buttonProgress} />
            ) : (
              <ArrowForwardIcon sx={styles.arrowIcon} />
            )}
          </IconButton>
        </Box>
      </Box>
    </motion.div>
  </Tilt>
));

const styles = {
  container: {
    backgroundColor: 'background.default',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  } as SxProps<Theme>,

  animatedBackground: (y: any) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    pointerEvents: 'none',
    y
  }),

  gradientBlob: (index: number, theme: Theme) => ({
    position: 'absolute',
    background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.08,
    width: 300 + index * 150,
    height: 300 + index * 150,
    top: `${index * 15}%`,
    left: `${index * 10}%`,
  }),

  cursor: (cursor: any, theme: Theme) => ({
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 9999,
    mixBlendMode: 'difference',
    borderRadius: '50%',
    background: theme.palette.common.white,
    width: cursor.variant === 'hover' ? 48 : 24,
    height: cursor.variant === 'hover' ? 48 : 24,
    left: cursor.x,
    top: cursor.y,
    transform: 'translate(-50%, -50%)',
    opacity: cursor.variant === 'hover' ? 0.8 : 0.5,
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
  }),

  appBar: (theme: Theme) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[4]
  }),

  toolbar: { py: 4 },

  headerContainer: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center'
  },

  headerText: (theme: Theme) => ({
    fontWeight: 800,
    fontSize: { xs: '2.5rem', md: '3.5rem' },
    lineHeight: 1.2,
    mb: 2,
    background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }),

  searchField: {
    width: '100%',
    '& .MuiFilledInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      '&:before, &:after': { display: 'none' }
    }
  },

  searchInput: {
    py: 2,
    fontSize: '1.1rem',
    color: 'text.primary'
  },

  searchIcon: {
    color: 'text.secondary',
    fontSize: '1.5rem'
  },

  projectsContainer: {
    py: 8,
    position: 'relative',
    zIndex: 1
  },

  cardHeader: {
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    p: 3
  },

  cardBackground: (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    opacity: 0.8
  }),

  cardContent: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  clientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 3
  },

  avatar: (theme: Theme) => ({
    width: 56,
    height: 56,
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    boxShadow: theme.shadows[4]
  }),

  icon: {
    fontSize: '1.75rem',
    color: 'common.white'
  },

  clientName: {
    color: 'common.white',
    fontWeight: 'bold'
  },

  timeline: {
    color: 'rgba(255, 255, 255, 0.8)'
  },

  projectTitle: {
    color: 'common.white',
    fontWeight: 800,
    lineHeight: 1.3,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  },

  cardBody: (theme: Theme) => ({
    p: 3,
    backgroundColor: 'background.paper',
    borderTop: `1px solid ${theme.palette.divider}`
  }),

  description: {
    color: 'text.secondary',
    mb: 3,
    lineHeight: 1.6,
    minHeight: 100
  },

  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mb: 3
  },

  techChip: (theme: Theme) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
    color: 'common.white',
    fontWeight: 600,
    borderRadius: '8px'
  }),

  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    pt: 2
  },

  teamBadge: {
    '& .MuiBadge-badge': {
      right: -8,
      top: 16,
      backgroundColor: 'secondary.main',
      fontWeight: 700
    }
  },

  teamText: {
    color: 'text.secondary'
  },

  caseStudyButton: (theme: Theme) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: 'common.white',
    borderRadius: '12px',
    padding: '12px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[6]
    }
  }),

  arrowIcon: {
    transition: 'transform 0.2s',
    '&:hover': { transform: 'translateX(4px)' }
  },

  buttonProgress: {
    color: 'common.white'
  },

  loadingContainer: {
    py: 6,
    textAlign: 'center'
  },

  spinner: (theme: Theme) => ({
    color: theme.palette.primary.main,
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: -8,
      left: -8,
      right: -8,
      bottom: -8,
      border: `3px solid ${theme.palette.primary.main}`,
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite'
    }
  }),

  scrollText: {
    color: 'text.secondary'
  },

  endIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: 'text.secondary'
  },

  endText: {
    color: 'text.secondary'
  }
};

export default Solutions;