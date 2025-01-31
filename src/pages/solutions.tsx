
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  alpha,
  useTheme,
  Skeleton,
  useMediaQuery
} from '@mui/material';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { cvProjects } from '../data/cvProjects';
import SEO from '../components/SEO';

const ProjectCard = dynamic(() => import('../components/Solutions/ProjectCard'), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rectangular"
      width={300}
      height={400}
      aria-label="Loading project..."
    />
  ),
});

const PAGE_SIZE = 9;

const Solutions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const displayedProjects = useMemo(() => cvProjects.slice(0, PAGE_SIZE), [cvProjects]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        minHeight: '100vh',
          p: theme.spacing(6),
          py: 12,
          px: isMdDown ? 2 : 0,
      }}
    >
      <SEO
        title="Client Solutions - Enterprise Solutions"
        description="Explore our portfolio of enterprise-grade technical solutions and client success stories."
        keywords="enterprise solutions, cloud architecture, DevOps, technical resources"
      />

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          aria-live="polite"
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 70%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.2)}`,
                fontFamily: theme.typography.fontFamily,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                letterSpacing: '-0.03em',
              }}
            >
              Enterprise-Grade Solutions
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                fontFamily: theme.typography.fontFamily,
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Scalable, secure, and future-proof strategies built for
              enterprises aiming for innovation.
            </Typography>
          </Box>
        </motion.div>

        <Suspense
          fallback={
            <Grid container spacing={6}>
              {Array(3).fill(0).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rectangular" width="100%" height={400} />
                </Grid>
              ))}
            </Grid>
          }
        >
          <Grid container spacing={6} component="section" aria-label="Projects">
            {displayedProjects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard
                  project={project}
                  index={index}
                  aria-labelledby={`project-${project.id}-title`}
                  isLoading={false}
                />
              </Grid>
            ))}
          </Grid>
        </Suspense>

        <Box
          sx={{ textAlign: 'center', mt: 10 }}
          component="section"
          aria-label="Call to Action"
        >
          <NextLink href="/contact" passHref legacyBehavior>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Button
                component="a"
                variant="contained"
                sx={{
                  background: `
                    linear-gradient(
                      145deg,
                      ${alpha(theme.palette.primary.main, 0.9)},
                      ${alpha(theme.palette.secondary.main, 0.9)}
                    )
                    padding-box,
                    ${theme.palette.mode === 'dark' ? 
                      `linear-gradient(145deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})` : 
                      `linear-gradient(145deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`}
                    border-box`,
                  border: '1px solid transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  px: 8,
                  py: 2.5,
                  fontWeight: 700,
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  color: theme.palette.getContrastText(theme.palette.primary.main),
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: `0 0 32px ${alpha(theme.palette.secondary.main, 0.3)}`,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `
                      linear-gradient(
                        90deg,
                        transparent 25%,
                        ${alpha(theme.palette.secondary.main, 0.1)} 50%,
                        transparent 75%
                      )`,
                    animation: 'hologramScan 6s infinite linear',
                    opacity: 0.5,
                  },
                  '@keyframes hologramScan': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                  },
                }}
                aria-label="Request a solution demo"
              >
                Request Solution Demo
              </Button>
            </motion.div>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Solutions;