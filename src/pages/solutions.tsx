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
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { cvProjects } from '../data/cvProjects'; // Make sure this path is correct
import SEO from '../components/SEO';

const ProjectCard = dynamic(
  () => import('../components/Solutions/ProjectCard'), // Make sure this path is correct
  {
    ssr: false,
    loading: () => <Box>Loading...</Box>,
  }
);

const PAGE_SIZE = 9;

const Solutions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const displayedProjects = useMemo(() => cvProjects.slice(0, PAGE_SIZE), [cvProjects]);

  return (
    <Box // Outer Box - Now correctly closed
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: isMobile ? 2 : 6,
        paddingRight: isMobile ? 2 : 6,
        marginLeft: 6,
        marginRight: 6,
      }}
    >
      <SEO
        title="Client Solutions - Enterprise Solutions"
        description="Explore our portfolio of enterprise-grade technical solutions and client success stories."
        keywords="enterprise solutions, cloud architecture, DevOps, technical resources"
      />

      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 70%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.3)}`,
            }}
          >
            Enterprise-Grade Solutions
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              textAlign: 'center',
            }}
          >
            Scalable, secure, and future-proof strategies built for enterprises
            aiming for innovation.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {displayedProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={8}>
          <NextLink href="/contact" passHref>
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
    </Box> // Closing tag for the outer Box
  );
};

export default Solutions;