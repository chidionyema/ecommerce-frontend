import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Grid,
  CssBaseline,
  TextField,
  InputAdornment,
  Container,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  CircularProgress,
  Skeleton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import Carousel from 'react-material-ui-carousel';
import { useRouter } from 'next/router';
import { CVProject, cvProjects } from '../data/cvProjects'; // Import CVProject and cvProjects

const PAGE_SIZE = 9;

const Solutions: React.FC = () => {
  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<CVProject | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const loaderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Filter projects based on search query
  const filteredProjects = cvProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Simulate fetching CV projects
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const newProjects = filteredProjects.slice(startIndex, endIndex);

        // Append new projects to the existing list
        setDisplayedProjects((prev) => {
          // Avoid duplicates by checking if the project already exists in the list
          const uniqueProjects = newProjects.filter(
            (newProject) => !prev.some((prevProject) => prevProject.id === newProject.id)
          );
          return [...prev, ...uniqueProjects];
        });

        // Check if there are more projects to load
        if (newProjects.length < PAGE_SIZE) setHasMore(false);
      } catch (error) {
        setErrorMessage('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [page, searchQuery]); // Re-fetch when page or searchQuery changes

  // Infinite scroll setup
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

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset page when search query changes
    setDisplayedProjects([]); // Clear displayed projects
    setHasMore(true); // Reset hasMore flag
  };

  const handleQuickViewOpen = (project: CVProject) => {
    setQuickViewProduct(project);
    setQuickViewOpen(true);
  };

  const handleQuickViewClose = () => setQuickViewOpen(false);

  const handleViewDetails = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar & Search */}
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Showcase Projects
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              disabled={isLoading}
              sx={{ width: { xs: '100%', sm: '400px' }, backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              aria-label="Search projects"
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Product Grid */}
        <Grid container spacing={3}>
          {isLoading && !displayedProjects.length
            ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" height={300} animation="wave" />
                  <Skeleton variant="text" height={30} animation="wave" />
                  <Skeleton variant="text" height={20} animation="wave" />
                </Grid>
              ))
            : displayedProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <motion.div whileHover={{ translateY: -3 }} style={{ height: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        backgroundColor: '#fff',
                        borderRadius: '15px',
                        boxShadow: '0 2px 12px rgba(173, 80, 180, 0.1)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': { boxShadow: '0 4px 16px rgba(173, 80, 180, 0.15)' },
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Banner */}
                      <Box
                        sx={{
                          background: 'linear-gradient(90deg, #AB47BC, #F06292)',
                          color: '#fff',
                          py: 2,
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {project.bannerText}
                        </Typography>
                      </Box>

                      {/* Image Section */}
                      <Box
                        sx={{
                          height: 140,
                          backgroundImage: `url(${project.imageUrl || '/placeholder.png'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                        role="img"
                        aria-label={`Image for ${project.name}`}
                      />

                      {/* Content Section */}
                      <Box
                        sx={{
                          p: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          gap: 2,
                        }}
                      >
                        {/* Title and Description */}
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {project.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {project.description}
                          </Typography>
                        </Box>

                        {/* Technologies */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {project.technologies.map((tech, index) => (
                            <Chip
                              key={index}
                              label={tech}
                              size="small"
                              aria-label={`Technology: ${tech}`}
                            />
                          ))}
                        </Box>

                        {/* Actions */}
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            width: '100%',
                            mt: 'auto'
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                            onClick={() => handleQuickViewOpen(project)}
                            aria-label={`Quick view ${project.name}`}
                          >
                            Quick View
                          </Button>
                          <IconButton
                            onClick={() => handleViewDetails(project.id)}
                            sx={{ 
                              border: '1px solid rgba(0,0,0,0.2)', 
                              '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } 
                            }}
                            aria-label={`View details of ${project.name}`}
                          >
                            <ArrowForwardIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
        </Grid>

        {/* Loader */}
        <Box ref={loaderRef} sx={{ height: '50px', textAlign: 'center', mt: 2 }}>
          {isLoading && hasMore ? (
            <CircularProgress aria-label="Loading more projects" />
          ) : hasMore ? (
            <Typography variant="body2" color="text.secondary">
              Scroll down to load more...
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No more projects to show.
            </Typography>
          )}
        </Box>
      </Container>

      {/* Quick View Dialog */}
      {quickViewProduct && (
        <Dialog
          open={quickViewOpen}
          onClose={handleQuickViewClose}
          maxWidth="md"
          fullWidth
          aria-labelledby="quick-view-dialog-title"
        >
          <DialogTitle id="quick-view-dialog-title">{quickViewProduct.name}</DialogTitle>
          <DialogContent>
            <Carousel aria-label="Project images">
              <img
                src={quickViewProduct.imageUrl || '/placeholder.png'}
                alt={quickViewProduct.name}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
              />
            </Carousel>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {quickViewProduct.description}
            </Typography>
          </DialogContent>
        </Dialog>
      )}

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage('')}
        aria-live="assertive"
      >
        <Alert severity="error" onClose={() => setErrorMessage('')} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Solutions;