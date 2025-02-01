// pages/solutions.tsx
'use client';

import { Typography, Grid, Button, Box, useTheme, alpha } from '@mui/material';
import NextLink from 'next/link';
import { cvProjects } from '../data/cvProjects';
import SEO from '../components/SEO';
import PageLayout from '../components/Shared/PageLayout';
import PageHeader from '../components/Shared/PageHeader';

import ProjectCard from '../components/Solutions/ProjectCard';

const PAGE_SIZE = 9;

const Solutions = () => {
  const theme = useTheme();

  return (
    <>
      <SEO
        title="Client Solutions - Enterprise Solutions"
        description="Explore our portfolio of enterprise-grade technical solutions and client success stories."
        keywords="enterprise solutions, cloud architecture, DevOps, technical resources"
      />

      <PageLayout maxWidth="xl">
        <PageHeader title="Enterprise-Grade Solutions" />
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {cvProjects.slice(0, PAGE_SIZE).map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={8}>
          <NextLink href="/contact" passHref legacyBehavior>
            <Button
              component="a"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: theme.palette.common.white,
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Request a Demo
            </Button>
          </NextLink>
        </Box>
      </PageLayout>
    </>
  );
};

export default Solutions;
