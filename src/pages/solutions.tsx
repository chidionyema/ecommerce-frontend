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
  Badge
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import { CVProject, cvProjects } from '../data/cvProjects';

const PAGE_SIZE = 9;

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
  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [navigatingProjectId, setNavigatingProjectId] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const shouldReduceMotion = useReducedMotion();

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
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ 
        background: theme.palette.primary.main,
        boxShadow: theme.shadows[4],
      }}>
        <Toolbar sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          py: 3,
          gap: 2
        }}>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 'bold', 
            color: 'common.white',
            textAlign: 'center',
            fontSize: isMobile ? '1.5rem' : '2.125rem'
          }}>
            Technical Portfolio
          </Typography>
          
          <TextField
            variant="outlined"
            placeholder="Search projects..."
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
                '& fieldset': { borderColor: theme.palette.secondary.main },
                '&:hover fieldset': { borderColor: theme.palette.secondary.dark },
                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                  <SearchOutlinedIcon fontSize="medium" />
                </InputAdornment>
              ),
              'aria-label': 'Search projects',
            }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4} component="main">
          {displayedProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={project.id}>
              <motion.div 
                whileHover={!shouldReduceMotion ? { translateY: -8 } : undefined}
                style={{ height: '100%' }}
                initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : undefined}
                animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'background.default',
                  borderRadius: '16px',
                  boxShadow: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 6,
                  }
                }}>
                  <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: 'common.white',
                    p: 3,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ 
                        backgroundColor: theme.palette.secondary.main, 
                        width: 48, 
                        height: 48
                      }}>
                        {project.icon ? (
                          React.createElement(project.icon, { className: project.iconColor })
                        ) : (
                          <CodeIcon />
                        )}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" component="h2" fontWeight="bold">
                          {project.clientName}
                        </Typography>
                        <Typography variant="caption" component="time" sx={{
                          color: 'common.white',
                          backgroundColor: 'primary.dark',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          display: 'inline-block'
                        }}>
                          {project.timeline}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" component="h3" fontWeight="bold">
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
                              backgroundColor: theme.palette.secondary.light,
                              color: 'common.white',
                              fontWeight: 600,
                              fontSize: '0.75rem'
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
                            fontSize: '0.75rem'
                          }
                        }}
                      >
                        <Typography variant="caption">Team Size</Typography>
                      </Badge>
                      
                      <GradientButton
                        onClick={() => handleViewDetails(project.id)}
                        endIcon={navigatingProjectId === project.id ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
                        disabled={navigatingProjectId === project.id}
                      >
                        Details
                      </GradientButton>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box ref={loaderRef} sx={{ py: 6, textAlign: 'center' }}>
          {isLoading ? (
            <CircularProgress size={40} thickness={4} sx={{ color: 'primary.main' }} />
          ) : hasMore ? (
            <Typography variant="body2" color="text.secondary">
              Scroll to load more projects
            </Typography>
          ) : displayedProjects.length > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircleOutlineIcon color="success" />
              <Typography variant="body2" color="text.secondary">
                Showing {displayedProjects.length} of {filteredProjects.length} projects
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No projects found matching your search
            </Typography>
          )}
        </Box>
      </Container>

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
        <Alert severity="error" sx={{ width: '100%' }}>
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