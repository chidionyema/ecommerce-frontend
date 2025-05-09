"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Box, Typography, CircularProgress, Grid, Tabs, Tab, Fade, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import ProjectCard from './ProjectCard';
import designSystem from './DesignSystem';

const { typography, animations, colorSystem, borderRadius } = designSystem;
const spacing = { 1: 8, 2: 16, 3: 24, 4: 32, 5: 40 };

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

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects = [], spacing: gridSpacing = 4 }) => {
  const theme = useTheme();
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  
  const INITIAL_LOAD_COUNT = 6;
  const LOAD_MORE_COUNT = 6;

  const categories = useMemo(() => {
    const allTags = projects.reduce((acc: string[], project) => 
      project.tags ? [...acc, ...project.tags] : acc, []);
    return ['all', ...Array.from(new Set(allTags))];
  }, [projects]);

  // Initialize projects
  useEffect(() => {
    if (projects.length && !isInitialized) {
      const initial = projects.slice(0, INITIAL_LOAD_COUNT);
      setDisplayedProjects(initial);
      setFilteredProjects(activeCategory === 'all' 
        ? initial 
        : initial.filter(p => p.tags?.includes(activeCategory)));
      setHasMore(projects.length > INITIAL_LOAD_COUNT);
      setIsInitialized(true);
    }
  }, [projects, activeCategory, isInitialized]);

  // Filter when category changes
  useEffect(() => {
    if (displayedProjects.length) {
      setFilteredProjects(activeCategory === 'all'
        ? displayedProjects
        : displayedProjects.filter(p => p.tags?.includes(activeCategory)));
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, [activeCategory, displayedProjects]);

  const handleSelect = useCallback((id: string) => {
    window.location.href = `/projects/${id}`;
  }, []);

  const handleCategoryChange = useCallback((_: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
  }, []);

  const loadMoreProjects = useCallback(() => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    
    setTimeout(() => {
      const nextIndex = displayedProjects.length;
      const nextProjects = projects.slice(nextIndex, nextIndex + LOAD_MORE_COUNT);
      
      if (nextProjects.length) {
        setDisplayedProjects(prev => [...prev, ...nextProjects]);
        setHasMore(nextIndex + LOAD_MORE_COUNT < projects.length);
      } else {
        setHasMore(false);
      }
      
      setIsLoading(false);
    }, 600);
  }, [displayedProjects, hasMore, isLoading, projects]);

  // Set up intersection observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    
    if (loadingRef.current && hasMore) {
      observerRef.current = new IntersectionObserver(
        entries => entries[0].isIntersecting && loadMoreProjects(),
        { threshold: 0.1, rootMargin: '200px' }
      );
      observerRef.current.observe(loadingRef.current);
    }
    
    return () => observerRef.current?.disconnect();
  }, [loadMoreProjects, hasMore]);

  const useGridLayout = filteredProjects.length > 1;
  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: animations.durations.standard, ease: animations.easings.standard }
  };

  return (
    <Box sx={{ width: '100%', my: { xs: 4, md: 4 }, mt: 6 }}>
      {/* Category Tabs */}
      {categories.length > 1 && (
        <Box sx={{
          width: '100%', maxWidth: '1280px', mx: 'auto', mb: { xs: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 },
          overflow: 'auto', scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { height: '4px', display: { xs: 'none', sm: 'block' } },
          '&::-webkit-scrollbar-track': { backgroundColor: colorSystem.alpha(theme.palette.divider, 'faint') },
          '&::-webkit-scrollbar-thumb': { backgroundColor: colorSystem.alpha(theme.palette.primary.main, 'light'), borderRadius: '4px' }
        }}>
          <Tabs
            value={activeCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none', fontWeight: typography.fontWeights.medium,
                fontSize: { xs: typography.fontSizes.body2, sm: typography.fontSizes.body1 },
                mx: { xs: 0.5, sm: 1 }, px: { xs: 2, sm: 3 }, py: 2, borderRadius: borderRadius.md,
                transition: animations.transitions.standard, color: theme.palette.text.primary,
                opacity: 0.7, letterSpacing: typography.letterSpacing.normal,
                minHeight: { xs: '40px', sm: 'auto' }, minWidth: 'auto',
                '&:hover': { bgcolor: colorSystem.alpha(theme.palette.primary.main, 'faint'), opacity: 0.85 }
              },
              '& .Mui-selected': { color: theme.palette.primary.main, fontWeight: typography.fontWeights.semibold, opacity: 1 },
              '& .MuiTabs-indicator': { height: 0 }
            }}
          >
            {categories.map(category => (
              <Tab
                key={category}
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                value={category}
                disableRipple
                aria-label={`Show ${category} projects`}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Main Content */}
      <Box component={motion.div} {...animationProps} sx={{ width: '100%', maxWidth: '1280px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
        {useGridLayout ? (
          <Box sx={{ mt: 3 }}>
            <Grid
              container
              columnSpacing={22}
              rowSpacing={0}
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              {filteredProjects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Fade in timeout={400} style={{ transitionDelay: `${index * 40}ms`, transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.2, 1)' }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <ProjectCard
                        project={project}
                        delay={index * 0.04}
                        priority={index < 6}
                        onSelect={handleSelect}
                      />
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, mt: 3 }}>
            {filteredProjects.map((project, index) => (
              <Box key={project.id} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <ProjectCard project={project} delay={index * 0.04} priority={index < 2} onSelect={handleSelect} />
              </Box>
            ))}
          </Box>
        )}

        {/* Loading Indicator */}
        {hasMore && (
          <Box ref={loadingRef} sx={{ display: 'flex', justifyContent: 'center', py: { xs: 3, md: 4 }, width: '100%' }}>
            {isLoading ? (
              <Box component={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                   transition={{ duration: animations.durations.standard, ease: animations.easings.standard }}
                   sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={36} thickness={3} sx={{ color: theme.palette.primary.main, opacity: 0.8 }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: typography.fontWeights.medium, letterSpacing: typography.letterSpacing.normal, fontSize: typography.fontSizes.body2 }}>
                  Loading more projects
                </Typography>
              </Box>
            ) : (
              <Box sx={{ height: '30px' }} />
            )}
          </Box>
        )}

        {/* End of List */}
        {!hasMore && displayedProjects.length > 0 && filteredProjects.length > 0 && (
          <Box component={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: animations.durations.standard, ease: animations.easings.standard }}
               sx={{ textAlign: 'center', py: { xs: 3, md: 4 }, opacity: 0.6 }}>
            <Typography variant="body1" color="text.secondary" sx={{
              fontWeight: typography.fontWeights.medium, display: 'inline-block', position: 'relative', px: 3,
              fontSize: typography.fontSizes.body1, letterSpacing: typography.letterSpacing.normal,
              '&:before, &:after': {
                content: '""', position: 'absolute', top: '50%', width: { xs: 40, sm: 80 }, height: 1,
                backgroundColor: colorSystem.alpha(theme.palette.divider, 'medium')
              },
              '&:before': { right: '100%' }, '&:after': { left: '100%' }
            }}>
              All projects shown
            </Typography>
          </Box>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && !isLoading && (
          <Box component={motion.div} {...animationProps} sx={{
            textAlign: 'center', py: { xs: spacing[4], md: spacing[5] },
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300
          }}>
            <Box sx={{
              width: 80, height: 80, borderRadius: '50%',
              backgroundColor: colorSystem.alpha(theme.palette.primary.main, 'faint'),
              display: 'flex', alignItems: 'center', justifyContent: 'center', mb: spacing[3]
            }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 4,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  No projects found
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{
              fontWeight: typography.fontWeights.semibold,
              fontSize: { xs: typography.fontSizes.subtitle, md: typography.fontSizes.title3 },
              letterSpacing: typography.letterSpacing.tight
            }}>
              No projects found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              maxWidth: 400, mx: 'auto', mb: spacing[4], lineHeight: typography.lineHeights.normal,
              letterSpacing: typography.letterSpacing.normal, px: spacing[2]
            }}>
              There are no projects in the "{activeCategory}" category yet. Try selecting a different category.
            </Typography>
            <Button variant="outlined" onClick={() => setActiveCategory('all')} sx={{
              borderRadius: borderRadius.md, px: spacing[3], py: spacing[1],
              fontWeight: typography.fontWeights.medium, textTransform: 'none',
              letterSpacing: typography.letterSpacing.normal, transition: animations.transitions.standard,
              '&:hover': { backgroundColor: colorSystem.alpha(theme.palette.primary.main, 'faint'), transform: 'translateY(-2px)' }
            }}>
              View all projects
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProjectGrid;