'use client';

import React from 'react';
import { Grid, Button, Box, Container, useTheme, alpha } from '@mui/material';
import NextLink from 'next/link';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard from '../components/Solutions/ProjectCard';
import { cvProjects } from '../data/cvProjects';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyChooseUs } from '../components/Common/WhyChooseUs';
import { ServicesGrid } from '../components/Common/ServicesGrid';
import { TestimonialsSection } from '../components/Common/TestimonialsSection';

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
        title="Tailored Solutions for Your Business"
        subtitle="Our enterprise solutions empower your business to innovate and grow."
      >
        <Container maxWidth="lg">
          {/* Outer wrapper with adjusted spacing */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8, // Reduced gap between sections
              mt: 4,  // Reduced top margin
              p: 4,   // Reduced padding
            }}
          >
            <Grid
              container
              spacing={4} // 32px gap between items (4 * 8px)
              sx={{ 
                justifyContent: 'center',
                // Critical negative margin adjustment to compensate for inner padding:
                margin: '-16px !important',
                width: 'calc(100% + 32px)'
              }}
            >
              {cvProjects.map((project) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={project.id}
                  sx={{
                    padding: '16px !important', // 16px padding to match grid spacing
                    '&:hover': {
                      zIndex: 2 // Ensures hovered card appears above others
                    }
                  }}
                >
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>

            <Box textAlign="center" mt={10} mb={30}>
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
          </Box>
        </Container>
        <TechnologyShowcase />
        <WhyChooseUs />
        <ServicesGrid />
        <TestimonialsSection />
      </ConsistentPageLayout>
    </>
  );
};

export default Solutions;
