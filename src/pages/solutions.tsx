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
import { CARD_GRID_CONFIG } from '../utils/sharedStyles';

const Solutions = () => {
  const theme = useTheme();

  return (
    <ConsistentPageLayout
      seoTitle="Client Solutions - Premium Solutions"
      seoDescription="Explore our portfolio of enterprise-grade technical solutions and client success stories."
      seoKeywords="enterprise solutions, cloud architecture, DevOps, technical resources"
      title="Tailored Solutions for Your Business"
      subtitle="Our enterprise solutions empower your business to innovate and grow."
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            mt: 4,
            p: 4,
          }}
        >
          <Grid
            container
            spacing={CARD_GRID_CONFIG.container.spacing}
            sx={CARD_GRID_CONFIG.container.sx}
          >
            {cvProjects.map((project) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4} // 3 cards per row on medium screens and up
                key={project.id}
                sx={{
                  ...CARD_GRID_CONFIG.item.sx,
                  display: 'flex',
                  flexDirection: 'column',
                  '& > *': {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
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
  );
};

export default Solutions;
