'use client';

import { useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { cvProjects } from '../data/cvProjects';
import SEO from '../components/SEO';

// Dynamically import ProjectCard
const ProjectCard = dynamic(() => import('../components/Solutions/ProjectCard'), {
  ssr: false,
  loading: () => <Box>Loading...</Box>, // Add a loading fallback
});

const PAGE_SIZE = 9; // Number of projects to display per page

const Solutions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Select the first PAGE_SIZE projects from the cvProjects array
  const displayedProjects = useMemo(() => cvProjects.slice(0, PAGE_SIZE), []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        py: 10,
        px: isMobile ? 2 : 0,
      }}
    >
      <SEO
        title="Client Solutions - Enterprise Solutions"
        description="Explore our portfolio of enterprise-grade technical solutions and client success stories."
        keywords="enterprise solutions, cloud architecture, DevOps, technical resources"
      />

      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2rem', sm: '3rem' },
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
            }}
          >
            Enterprise-Grade Solutions
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Scalable, secure, and future-proof strategies built for enterprises aiming for innovation.
          </Typography>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {displayedProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box textAlign="center" mt={8}>
          <NextLink href="/contact" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: theme.palette.common.white,
                fontWeight: 700,
                fontSize: '1.2rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}
            >
              Request a Demo
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Solutions;
