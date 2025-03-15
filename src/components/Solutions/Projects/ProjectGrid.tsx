"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Box, Typography, CircularProgress, Grid, Tabs, Tab, Fade, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  name: string;
  clientName?: string;
  description: string;
  industry: string;
  technologies?: string[];
  tags?: string[];
  timeline?: string;
  metrics?: Array<{ label: string; value: string }>;
}

interface ProjectGridProps {
  projects: Project[];
  spacing?: number;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects = [], spacing = 6 }) => {
  const theme = useTheme();
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const initialLoadCount = 6;
  const loadMoreCount = 6;

  const transitions = { easing: [0.2, 0.0, 0.2, 1.0], duration: 0.6, stagger: 0.05 };

  const categories = useMemo(
    () =>
      ['all', ...Array.from(new Set(projects.reduce((cats: string[], project) => project.tags ? [...cats, ...project.tags] : cats, [])))],
    [projects]
  );

  useEffect(() => {
    if (projects.length) {
      const initial = projects.slice(0, initialLoadCount);
      setDisplayedProjects(initial);
      setFilteredProjects(initial);
      setHasMore(projects.length > initialLoadCount);
    }
  }, [projects]);

  useEffect(() => {
    setFilteredProjects(
      activeCategory === 'all'
        ? displayedProjects
        : displayedProjects.filter(project => project.tags?.includes(activeCategory))
    );
  }, [activeCategory, displayedProjects]);

  const handleSelect = (id: string) => {
    window.location.href = `/projects/${id}`;
  };

  const handleCategoryChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  };

  const loadMoreProjects = useCallback(() => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      const nextIndex = displayedProjects.length;
      const nextProjects = projects.slice(nextIndex, nextIndex + loadMoreCount);
      if (nextProjects.length) {
        setDisplayedProjects(prev => [...prev, ...nextProjects]);
        setHasMore(nextIndex + loadMoreCount < projects.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 600);
  }, [displayedProjects, hasMore, isLoading, projects]);

  useEffect(() => {
    if (loadingRef.current && hasMore) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) loadMoreProjects();
        },
        { threshold: 0.1, rootMargin: '200px' }
      );
      observerRef.current.observe(loadingRef.current);
    }
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMoreProjects, hasMore]);

  const getAnimationDelay = (index: number) => index * transitions.stagger;
  const useGridLayout = filteredProjects.length > 1;

  return (
    <Box sx={{ width: '100%', my: { xs: 4, md: 8 } }}>
      {categories.length > 1 && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '1280px',
            mx: 'auto',
            mb: { xs: 3, md: 5 },
            px: { xs: 2, sm: 3, md: 4 },
            overflow: 'auto',
            '&::-webkit-scrollbar': { height: '4px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: alpha(theme.palette.primary.main, 0.2), borderRadius: '2px' }
          }}
        >
          <Tabs
            value={activeCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                mx: 0.5,
                px: 2.5,
                py: 1.2,
                borderRadius: '8px',
                transition: 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
                color: theme.palette.text.primary,
                opacity: 0.7,
                letterSpacing: '0.01em',
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.07), opacity: 0.85 }
              },
              '& .Mui-selected': { color: theme.palette.primary.main, fontWeight: 600, opacity: 1 },
              '& .MuiTabs-indicator': { height: 0, borderRadius: 0 }
            }}
          >
            {categories.map((category) => (
              <Tab key={category} label={category.charAt(0).toUpperCase() + category.slice(1)} value={category} disableRipple />
            ))}
          </Tabs>
        </Box>
      )}

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: transitions.duration, ease: transitions.easing }}
        sx={{ width: '100%', maxWidth: '1280px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}
      >
        {useGridLayout ? (
          <Grid
            container
            // Increase horizontal space by increasing columnSpacing value
            columnSpacing={{ xs: spacing, md: spacing + 8 }}
            rowSpacing={spacing}
            sx={{ mt: 1 }}
          >
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Fade
                  in
                  timeout={400}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.2, 1)'
                  }}
                >
                  <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        height: '100%',
                        width: { xs: '100%', md: 'calc(100% + 20px)' },
                        mx: { xs: 0, md: '-10px' },
                        transition: 'all 0.3s ease',
                        transform: { md: 'scale(1.05)' },
                        transformOrigin: 'center'
                      }}
                    >
                      <ProjectCard
                        project={project}
                        delay={getAnimationDelay(index)}
                        priority={index < 6}
                        onSelect={handleSelect}
                      />
                    </Box>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ maxWidth: '640px', mx: 'auto' }}>
            {filteredProjects.map((project, index) => (
              <Box key={project.id} sx={{ mb: 4 }}>
                <ProjectCard
                  project={project}
                  delay={getAnimationDelay(index)}
                  priority={index < 2}
                  onSelect={handleSelect}
                />
              </Box>
            ))}
          </Box>
        )}

        {hasMore && (
          <Box ref={loadingRef} sx={{ display: 'flex', justifyContent: 'center', py: { xs: 5, md: 6 }, width: '100%' }}>
            {isLoading ? (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}
              >
                <CircularProgress size={36} thickness={3} sx={{ color: theme.palette.primary.main, opacity: 0.8 }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.01em', fontSize: '0.9rem' }}>
                  Loading more projects
                </Typography>
              </Box>
            ) : <Box sx={{ height: '50px' }} />}
          </Box>
        )}

        {!hasMore && displayedProjects.length > 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: transitions.easing }}
            sx={{ textAlign: 'center', py: { xs: 5, md: 7 }, opacity: 0.6 }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                display: 'inline-block',
                position: 'relative',
                px: 3,
                fontSize: '0.95rem',
                letterSpacing: '0.01em',
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  width: { xs: 40, sm: 80 },
                  height: 1,
                  backgroundColor: alpha(theme.palette.divider, 0.6)
                },
                '&:before': { right: '100%' },
                '&:after': { left: '100%' }
              }}
            >
              All projects shown
            </Typography>
          </Box>
        )}

        {filteredProjects.length === 0 && !isLoading && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: transitions.easing }}
            sx={{
              textAlign: 'center',
              py: { xs: 8, md: 10 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <Box component="img" src="/images/empty-folder.svg" alt="No projects found" sx={{ width: 36, height: 36, opacity: 0.7 }} />
            </Box>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.01em' }}>
              No projects found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', mb: 4, lineHeight: 1.6, letterSpacing: '0.01em' }}>
              There are no projects in the "{activeCategory}" category yet. Try selecting a different category.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setActiveCategory('all')}
              sx={{
                borderRadius: '10px',
                px: 3,
                py: 1,
                fontWeight: 500,
                textTransform: 'none',
                letterSpacing: '0.01em',
                transition: 'all 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05), transform: 'translateY(-2px)' }
              }}
            >
              View all projects
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProjectGrid;
