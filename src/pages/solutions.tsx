import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  styled,
  Button,
  Avatar,
  Badge,
  type SxProps,
  type Theme
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';
import { CVProject, cvProjects } from '../data/cvProjects';
import Tilt from 'react-parallax-tilt';
import type { HTMLMotionProps } from 'framer-motion';

interface MotionDivProps extends HTMLMotionProps<"div"> {
  sx?: SxProps<Theme>;
}

const MotionBox = motion(Box);

const PAGE_SIZE = 9;

const Cursor = styled(Box)(({ theme }) => ({
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  mixBlendMode: 'difference',
  borderRadius: '50%',
  background: theme.palette.common.white,
  transition: 'transform 0.15s, opacity 0.15s',
  transform: 'translate(-50%, -50%)'
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: theme.palette.gradients.secondary,
  color: theme.palette.common.white,
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  fontWeight: 700,
  textTransform: 'uppercase',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    background: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
  '&.Mui-disabled': {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
  },
}));

const Solutions: React.FC = () => {
  // State management
  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [navigatingProjectId, setNavigatingProjectId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');

  // Refs and hooks
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const shouldReduceMotion = useReducedMotion();

  // Scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Cursor effects
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const hoverables = Array.from(document.querySelectorAll('button, a, [data-cursor-hover]'));
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => setCursorVariant('hover'));
      el.addEventListener('mouseleave', () => setCursorVariant('default'));
    });

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', () => setCursorVariant('hover'));
        el.removeEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };
  }, []);

  // Search and filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const filteredProjects = useMemo(() => {
    return cvProjects.filter(project => 
      project.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
    );
  }, [debouncedSearchQuery]);

  // Pagination controls
  useEffect(() => {
    setPage(1);
    setDisplayedProjects([]);
    setHasMore(true);
  }, [filteredProjects]);

  // Project loading
  useEffect(() => {
    let isCurrent = true;

    const loadProjects = () => {
      if (!isCurrent || isLoading) return;

      setIsLoading(true);
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const newProjects = filteredProjects.slice(startIndex, endIndex);

      setDisplayedProjects(prev => [
        ...(page === 1 ? [] : prev),
        ...newProjects
      ]);
      setHasMore(endIndex < filteredProjects.length);
      setIsLoading(false);
    };

    loadProjects();

    return () => {
      isCurrent = false;
    };
  }, [page, filteredProjects, isLoading]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, isLoading]);

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = async (projectId: string) => {
    setNavigatingProjectId(projectId);
    try {
      await router.push(`/projects/${projectId}`);
    } catch (error) {
      setErrorMessage('Failed to navigate to project details');
    } finally {
      setNavigatingProjectId(null);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }} ref={containerRef}>
      <style>{`
        @keyframes ripple {
          0% { opacity: 1; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(1.8); }
        }
      `}</style>

      <Cursor
        sx={{
          width: cursorVariant === 'hover' ? 48 : 24,
          height: cursorVariant === 'hover' ? 48 : 24,
          opacity: cursorVariant === 'hover' ? 0.8 : 0.5,
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 1.5 : 1})`
        }}
      />

      <motion.div
        style={{
          y,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
              opacity: 0.1,
              width: 200 + i * 100,
              height: 200 + i * 100,
              top: i * 20 + '%',
              left: i * 15 + '%'
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>

      <AppBar position="sticky" sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(8px)',
        boxShadow: theme.shadows[1],
      }}>
        <Toolbar sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          py: 4,
          gap: 3
        }}>
          <Box sx={{ 
            textAlign: 'center',
            mb: 2
          }}>
            <Typography variant="h2" sx={{
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '2.75rem' },
              mb: 1
            }}>
              Portfolio
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Explore our technical implementations
            </Typography>
          </Box>

          <TextField
            variant="outlined"
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="medium"
            sx={{ 
              width: '100%', 
              maxWidth: 600,
              backgroundColor: 'background.default',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                color: 'text.primary',
                fontSize: '1rem',
                padding: theme.spacing(1.25, 2),
                '& fieldset': { borderColor: theme.palette.divider },
                '&:hover fieldset': { borderColor: theme.palette.primary.main },
                '&.Mui-focused': {
                  boxShadow: `${theme.palette.primary.main} 0 0 0 2px`,
                },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon fontSize="medium" />
                </InputAdornment>
              ),
              'aria-label': 'Search projects',
            }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} component="main">
          {displayedProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={project.id}>
              <Tilt
                tiltEnable={!isMobile}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor={theme.palette.common.white}
                glarePosition="all"
                glareBorderRadius="24px"
                transitionSpeed={1500}
                scale={1.02}
              >
                <MotionBox 
                  whileHover={!shouldReduceMotion ? { translateY: -8 } : undefined}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: '100%' }}
                  initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : undefined}
                  animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <Box 
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'background.paper',
                      borderRadius: '24px',
                      boxShadow: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s',
                      position: 'relative',
                      '&:hover': {
                        boxShadow: 6,
                      },
                      '&:hover:after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '24px',
                        border: `2px solid ${theme.palette.primary.main}`,
                        zIndex: 1,
                        pointerEvents: 'none',
                      }
                    }}
                    data-cursor-hover
                  >
                    <Box sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
                      backgroundBlendMode: 'multiply',
                      position: 'relative',
                      overflow: 'hidden',
                      p: 3,
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at 100% 0%, ${theme.palette.primary.light} 0%, transparent 40%)`,
                      }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, position: 'relative', zIndex: 1 }}>
                        <Avatar sx={{ 
                          backgroundColor: theme.palette.secondary.main, 
                          width: 48, 
                          height: 48,
                          boxShadow: theme.shadows[2]
                        }}>
                          {project.icon ? (
                            React.createElement(project.icon, { className: project.iconColor })
                          ) : (
                            <CodeIcon />
                          )}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" component="h2" fontWeight="bold" color="common.white">
                            {project.clientName}
                          </Typography>
                          <Typography variant="caption" component="time" sx={{
                            color: 'common.white',
                            backgroundColor: 'primary.dark',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            display: 'inline-block',
                            backdropFilter: 'blur(4px)'
                          }}>
                            {project.timeline}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" component="h3" fontWeight="bold" color="common.white" sx={{ position: 'relative', zIndex: 1 }}>
                        {project.name}
                      </Typography>
                    </Box>

                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {project.description}
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="caption" fontWeight="bold" color="text.secondary">
                          KEY TECHNOLOGIES
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                          {project.technologies.slice(0, 4).map((tech, index) => (
                            <Chip
                              key={index}
                              label={tech}
                              size="small"
                              sx={{
                                border: `1px solid ${theme.palette.divider}`,
                                background: 'transparent',
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                                '&:hover': {
                                  background: theme.palette.action.hover
                                }
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Badge
                          badgeContent={project.teamSize}
                          sx={{
                            '& .MuiBadge-badge': {
                              right: -8,
                              top: 13,
                              backgroundColor: theme.palette.secondary.main,
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">Team Size</Typography>
                        </Badge>
                        
                        <GradientButton
                          onClick={() => handleViewDetails(project.id)}
                          endIcon={navigatingProjectId === project.id ? (
                            <Box sx={{
                              position: 'relative',
                              display: 'inline-block',
                              '&:after': {
                                content: '""',
                                position: 'absolute',
                                top: -8,
                                left: -8,
                                right: -8,
                                bottom: -8,
                                border: `3px solid ${theme.palette.primary.main}`,
                                borderRadius: '50%',
                                animation: 'ripple 1.2s infinite',
                              }
                            }}>
                              <CircularProgress size={20} />
                            </Box>
                          ) : <ArrowForwardIcon />}
                          disabled={navigatingProjectId === project.id}
                        >
                          Details
                        </GradientButton>
                      </Box>
                    </Box>
                  </Box>
                </MotionBox>
              </Tilt>
            </Grid>
          ))}
        </Grid>

        <Box ref={loaderRef} sx={{ py: 6, textAlign: 'center' }}>
          {isLoading ? (
            <Box sx={{
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                top: -8,
                left: -8,
                right: -8,
                bottom: -8,
                border: `3px solid ${theme.palette.primary.main}`,
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite',
              }
            }}>
              <CircularProgress size={40} thickness={4} sx={{ color: 'primary.main' }} />
            </Box>
          ) : hasMore ? (
            <Typography variant="body2" color="text.secondary">
              Scroll to load more projects
            </Typography>
          ) : displayedProjects.length > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircleOutlineIcon color="success" />
              <Typography variant="body2" color="text.secondary">
                You've reached the end of our case studies
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Container>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default Solutions;