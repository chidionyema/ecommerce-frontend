import React from 'react';
import { useTheme, Typography, Grid, Box, Container } from '@mui/material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard from '../components/Solutions/ProjectCard';
import { cvProjects } from '../data/cvProjects';
import PageSection from '../components/PageSection';
import CardGrid from '../components/CardGrid';
import { SPACING, getSharedStyles } from '../utils/sharedStyles';
// Import the additional components
import ServicesGrid from '../components/Common/ServicesGrid';
import TestimonialsSection from '../components/Common/TestimonialsSection';
import WhyChooseUs from '../components/Common/WhyChooseUs';

const Solutions: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme); // Get shared styles
  const renderProjectCard = (project: typeof cvProjects[0]) => (
    <ProjectCard project={project} />
  );

  return (
    <ConsistentPageLayout
      seoTitle="Client Solutions - Premium Solutions"
      seoDescription="Explore our portfolio of enterprise-grade technical solutions and client success stories."
      seoKeywords="enterprise solutions, cloud architecture, DevOps, technical resources"
      title="Tailored Solutions for Your Business"
      subtitle="Our enterprise solutions empower your business to innovate and grow."
    >
      {/* Understanding Our Solutions Section */}
      <PageSection>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
              mb: SPACING.medium,
              fontWeight: 'bold',
            }}
          >
            What are GLUStack's Solutions?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              mb: SPACING.large,
              background: 'rgba(0, 0, 0, 0.5)', // Darkened overlay for better readability
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              lineHeight: 1.8, // Improved line spacing for readability
            }}
          >
            At GLUStack, our 'Solutions' go beyond off-the-shelf products. We engineer bespoke technology solutions precisely tailored to address the unique challenges and opportunities of your business. We take a consultative approach, deeply understanding your needs to craft solutions that deliver measurable impact and drive sustainable growth.
          </Typography>
        </Container>
      </PageSection>

      {/* Our Featured Solutions Section */}
      <PageSection>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 'bold',
            mb: SPACING.medium,
          }}
        >
          Our Featured Solutions
        </Typography>
        {/* Data Validation and Filtering - BEST PRACTICE*/}
        <CardGrid
          data={cvProjects.filter(
            (project) =>
              project && typeof project.id === 'string' && project.id.trim() !== ''
          )}
          renderItem={(project) => (
            <Grid item sx={{ m: SPACING.medium }}>
              <ProjectCard project={project} />
            </Grid>
          )}
          spacing={SPACING.medium}
          sx={{ mx: 'auto' }} // ADDED THIS LINE TO CENTER CardGrid
        />
      </PageSection>

      {/* Industries We Serve Section */}
      <PageSection>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
              mb: SPACING.medium,
              fontWeight: 'bold',
            }}
          >
            Industries We Empower with Technology Solutions
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              mb: SPACING.large,
              background: 'rgba(0, 0, 0, 0.5)', // Darkened overlay for better readability
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              lineHeight: 1.8, // Improved line spacing for readability
            }}
          >
            GLUStack has a proven track record of empowering businesses across a range of industries, including: Technology (building and scaling cloud platforms, microservices, and DevOps), Financial Services (secure banking platforms and fintech solutions), E-commerce (optimizing digital platforms and user experiences), Media (streamlining workflows and automating content delivery), and Public Sector (digital transformation and cloud migration). This diverse experience allows us to understand your unique challenges and deliver tailored solutions.
          </Typography>
        </Container>
      </PageSection>

      {/* Benefits of Our Solutions Section */}
      <PageSection>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
              mb: SPACING.medium,
              fontWeight: 'bold',
            }}
          >
            Unlock the Benefits of GLUStack Solutions
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              mb: SPACING.large,
              background: 'rgba(0, 0, 0, 0.5)', // Darkened overlay for better readability
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              lineHeight: 1.8, // Improved line spacing for readability
            }}
          >
            Partnering with GLUStack provides key benefits: enhanced scalability and reliability, improved security, accelerated innovation, increased efficiency, and cost optimization. We empower you to achieve your business goals by providing expert technology solutions that enhance your capabilities, drive innovation, and deliver tangible value.
          </Typography>
        </Container>
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default Solutions;
