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
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  borderRadius: '16px',
  padding: theme.spacing(1.5, 4),
  fontWeight: 700,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%', // Fixed: Added quotes around the percentage value
    width: '200%',
    height: '100%',
    background: `linear-gradient(
      120deg,
      transparent,
      rgba(255,255,255,0.3),
      transparent
    )`,
    transition: '0.4s',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
    '&:before': {
      left: '100%',
    },
  },
  '&.Mui-disabled': {
    background: theme.palette.action.disabledBackground,
  },
}));

const PremiumCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    padding: '2px',
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover:before': {
    opacity: 0.3,
  },
}));

const Solutions: React.FC = () => {
  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [navigatingProjectId, setNavigatingProjectId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');

  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const filteredProjects = useMemo(() => {
    return cvProjects.filter(project => 
      project.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
    );
  }, [debouncedSearchQuery]);

  useEffect(() => {
    setPage(1);
    setDisplayedProjects([]);
    setHasMore(true);
  }, [filteredProjects]);

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
    <Box sx={{ 
      backgroundColor: 'background.default', 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }} ref={containerRef}>
      
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
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.08,
              width: 300 + i * 150,
              height: 300 + i * 150,
              top: i * 15 + '%',
              left: i * 10 + '%'
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </motion.div>

      <AppBar position="sticky" sx={{ 
        backgroundColor: 'rgba(255,255,255,0.01)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[2],
      }}>
        <Toolbar sx={{ py: 4 }}>
          <Box sx={{ 
            width: '100%',
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <Typography variant="h1" sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Technical Portfolio
            </Typography>
            <TextField
              variant="filled"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ 
                width: '100%',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  '&:before, &:after': { display: 'none' },
                  '& input': {
                    py: 2,
                    fontSize: '1.1rem',
                    color: 'text.primary',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={{ 
                      color: 'text.secondary',
                      fontSize: '1.5rem' 
                    }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {displayedProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={project.id}>
              <Tilt
                tiltEnable={!isMobile}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor={theme.palette.common.white}
                glarePosition="all"
                glareBorderRadius="24px"
                transitionSpeed={2000}
                scale={1.05}
              >
                <PremiumCard>
                  <MotionBox 
                    whileHover={!shouldReduceMotion ? { y: -8 } : undefined}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      height: '100%',
                      backgroundColor: 'background.paper',
                      borderRadius: '24px',
                      boxShadow: 4,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                    data-cursor-hover
                  >
                    <Box sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      p: 3,
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: `linear-gradient(transparent 0%, ${theme.palette.background.paper} 100%)`,
                        zIndex: 1,
                      }
                    }}>
                      <Box sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                        opacity: 0.8,
                        zIndex: 0,
                      }} />

                      <Box sx={{ position: 'relative', zIndex: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                          <Avatar sx={{ 
                            width: 56,
                            height: 56,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            boxShadow: theme.shadows[4],
                          }}>
                            {project.icon ? (
                              React.createElement(project.icon, { 
                                sx: { 
                                  fontSize: '1.75rem',
                                  color: theme.palette.common.white 
                                } 
                              })
                            ) : (
                              <CodeIcon sx={{ color: 'common.white' }} />
                            )}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold" color="common.white">
                              {project.clientName}
                            </Typography>
                            <Typography variant="caption" color="rgba(255,255,255,0.8)">
                              {project.timeline}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography variant="h5" fontWeight="800" color="common.white" sx={{ 
                          mb: 2,
                          lineHeight: 1.3,
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                          {project.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ 
                      p: 3,
                      position: 'relative',
                      zIndex: 2,
                      backgroundColor: 'background.paper'
                    }}>
                      <Typography variant="body1" color="text.secondary" sx={{ 
                        mb: 3,
                        lineHeight: 1.6,
                        minHeight: 100
                      }}>
                        {project.description}
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="overline" component="div" sx={{ 
                          display: 'block',
                          mb: 1.5,
                          color: 'text.secondary',
                          letterSpacing: '0.1em',
                          fontWeight: 700
                        }}>
                          Core Technologies
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {project.technologies.slice(0, 4).map((tech, index) => (
                            <Chip
                              key={index}
                              label={tech}
                              size="small"
                              sx={{
                                background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                                color: 'common.white',
                                fontWeight: 600,
                                borderRadius: '8px',
                                '&:hover': {
                                  transform: 'translateY(-1px)'
                                }
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: `1px solid ${theme.palette.divider}`,
                        pt: 2
                      }}>
                        <Badge
                          badgeContent={project.teamSize}
                          sx={{
                            '& .MuiBadge-badge': {
                              right: -8,
                              top: 16,
                              backgroundColor: 'secondary.main',
                              fontWeight: 700
                            }
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Team Members
                          </Typography>
                        </Badge>

                        <GradientButton
                          onClick={() => handleViewDetails(project.id)}
                          endIcon={<ArrowForwardIcon sx={{ transition: 'transform 0.2s' }} />}
                          disabled={navigatingProjectId === project.id}
                          sx={{
                            '&:hover': {
                              '& .MuiSvgIcon-root': {
                                transform: 'translateX(4px)'
                              }
                            }
                          }}
                        >
                          Case Study
                        </GradientButton>
                      </Box>
                    </Box>
                  </MotionBox>
                </PremiumCard>
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