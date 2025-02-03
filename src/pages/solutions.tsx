'use client';

import { Grid, Button, Box, Container, useTheme, alpha } from '@mui/material';
import NextLink from 'next/link';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard from '../components/Solutions/ProjectCard';
import { cvProjects } from '../data/cvProjects';

const Solutions = () => {
  const theme = useTheme();

  return (
    <>
      <SEO
        title="Client Solutions - Premium Solutions"
        description="Explore our portfolio of enterprise-grade technical solutions and client success stories."
        keywords="enterprise solutions, cloud architecture, DevOps, technical resources"
      />
      <ConsistentPageLayout
        seoTitle="Client Solutions - Premium Solutions"
        seoDescription="Explore our portfolio of enterprise-grade technical solutions and client success stories."
        seoKeywords="enterprise solutions, cloud architecture, DevOps, technical resources"
        title="Unlock Your Business Potential"
        subtitle="Our enterprise solutions empower your business to innovate and grow."
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ justifyContent: 'center', mt: 6, px: { xs: 2, md: 6 } }}>
            {cvProjects.map((project) => (
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
                  borderRadius: '12px',
                  boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.5)}`,
                  '&:hover': {
                    background: `linear-gradient(to right, ${alpha(
                      theme.palette.primary.main,
                      0.85
                    )}, ${alpha(theme.palette.secondary.main, 0.85)})`,
                  },
                }}
              >
                Request a Demo
              </Button>
            </NextLink>
          </Box>
        </Container>
      </ConsistentPageLayout>
    </>
  );
};

export default Solutions;
