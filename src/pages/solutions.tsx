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
  Skeleton,
  useTheme,
  useMediaQuery,
  styled,
  Button,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { CVProject, cvProjects } from '../data/cvProjects';

const PAGE_SIZE = 9;

const GradientButton = styled(Button)(({ theme }) => ({
  background: theme.gradients.primary,
  color: theme.palette.common.white,
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  fontWeight: 700,
  textTransform: 'uppercase',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    background: theme.gradients.secondary,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const Solutions: React.FC = () => {
  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const loaderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProjects = useMemo(() => {
    return cvProjects.filter((project) =>
      project.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
    );
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const newProjects = filteredProjects.slice(startIndex, endIndex);

        setDisplayedProjects((prev) => {
          const uniqueProjects = newProjects.filter(
            (newProject) => !prev.some((prevProject) => prevProject.id === newProject.id)
          );
          return [...prev, ...uniqueProjects];
        });

        if (newProjects.length < PAGE_SIZE) setHasMore(false);
      } catch (error) {
        setErrorMessage('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [page, filteredProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, hasMore, isLoading]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
    setDisplayedProjects([]);
    setHasMore(true);
  };

  const handleViewDetails = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: theme.gradients.secondary,
          backdropFilter: 'blur(8px)',
          color: 'common.white',
          boxShadow: theme.shadows[4],
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          py: 2,
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            whiteSpace: 'nowrap'
          }}>
            Tech Solutions Portfolio
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            disabled={isLoading}
            sx={{ 
              width: { xs: '100%', sm: '300px', md: '400px' }, 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                color: 'common.white',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                '&.Mui-focused fieldset': { borderColor: 'common.white' },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: 'common.white' }}>
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={isMobile ? 2 : 3}>
          {isLoading && !displayedProjects.length
            ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton 
                    variant="rectangular" 
                    height={300} 
                    animation="wave" 
                    sx={{ borderRadius: '15px' }}
                  />
                  <Skeleton variant="text" height={30} animation="wave" />
                  <Skeleton variant="text" height={20} animation="wave" />
                </Grid>
              ))
            : displayedProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <motion.div 
                    whileHover={{ translateY: -8 }} 
                    style={{ height: '100%' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        backgroundColor: 'background.paper',
                        borderRadius: '15px',
                        boxShadow: 3,
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': { 
                          boxShadow: 6,
                          transform: 'translateY(-4px)'
                        },
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          background: theme.gradients.primary,
                          color: 'common.white',
                          py: 2,
                          px: 3,
                          textAlign: 'center',
                          position: 'relative',
                          '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'url(/grid-pattern.svg) repeat',
                            opacity: 0.1,
                          }
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {project.bannerText}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            mt: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '4px',
                            px: 1.5,
                            py: 0.5,
                            display: 'inline-block',
                            fontSize: '0.8rem',
                          }}
                        >
                          {project.clientName}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          height: 140,
                          backgroundImage: `url(${project.imageUrl || '/placeholder.png'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '40%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                          }
                        }}
                      />

                      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 'bold', 
                            mb: 1,
                            color: 'primary.main'
                          }}>
                            {project.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {project.description}
                          </Typography>
                        </Box>

                        <Box sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: 1,
                          mt: 'auto',
                          pt: 2
                        }}>
                          {project.technologies.map((tech, index) => (
                            <Chip
                              key={index}
                              label={tech}
                              size="small"
                              sx={{
                                backgroundColor: 'action.hover',
                                color: 'primary.main',
                                fontWeight: 600,
                                '&:hover': { backgroundColor: 'action.selected' }
                              }}
                            />
                          ))}
                        </Box>

                        <Box sx={{ mt: 2 }}>
                          <GradientButton
                            onClick={() => handleViewDetails(project.id)}
                            endIcon={<ArrowForwardIcon />}
                            fullWidth
                          >
                            View Case Study
                          </GradientButton>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
        </Grid>

        <Box ref={loaderRef} sx={{ 
          height: '50px', 
          textAlign: 'center', 
          mt: 4,
          color: 'primary.main'
        }}>
          {isLoading && hasMore ? (
            <CircularProgress color="inherit" />
          ) : hasMore ? (
            <Typography variant="body2">
              Scroll to explore more solutions...
            </Typography>
          ) : (
            <Typography variant="body2">
              All solutions loaded 🎉
            </Typography>
          )}
        </Box>
      </Container>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="error" 
          onClose={() => setErrorMessage('')}
          sx={{ 
            background: 'secondary.dark',
            color: 'common.white',
            borderRadius: '8px',
            backdropFilter: 'blur(4px)',
            '& .MuiAlert-icon': { color: 'common.white' }
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

function useDebounce(value: string, delay: number) {
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