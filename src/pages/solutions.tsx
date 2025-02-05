'use client';

import { Grid, Button, Box, Container, useTheme, alpha } from '@mui/material';
import NextLink from 'next/link';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard from '../components/Solutions/ProjectCard';
import { cvProjects } from '../data/cvProjects';

import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyChooseUs } from '../components/Common/WhyChooseUs';
import { ServicesGrid } from '../components/Common/ServicesGrid'; // Use named import
import { TestimonialsSection } from '../components/Common/TestimonialsSection'; // Use named import

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
        title="Accelerate Your Path to Market"
        subtitle="Our enterprise solutions empower your business to innovate and grow."
      >
        <Container maxWidth="lg">
          {/* 
            spacing={5} creates enough gap between columns/rows.
            md=4 => Each item is 4/12 columns on desktop => 3 columns total
          */}
          <Grid
            container
            spacing={5}
            sx={{
              justifyContent: 'center',
              alignItems: 'stretch',
              mt: 8,
              px: { xs: 3, md: 6 },
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
                  display: 'flex',
                  justifyContent: 'center',
                  // Let the Card grow/shrink as needed
                  height: 'auto',
                }}
              >
                {/* 
                  The ProjectCard will fill this grid cell's width. 
                  Since md=4 => 3 columns on medium & above.
                */}
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={10} mb={30} >
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
        <TechnologyShowcase />
    <WhyChooseUs />
    <ServicesGrid />
    <TestimonialsSection />
      </ConsistentPageLayout>
  
    </>
  );
};

export default Solutions;
