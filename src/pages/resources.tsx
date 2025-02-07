'use client';

import React from 'react';
import { useTheme, Typography, Box, Button, Container, Grid } from '@mui/material';
import NextLink from 'next/link';
import GoldCard from '../components/GoldCard';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import CardGrid from '../components/CardGrid';
import PageSection from '../components/PageSection';
import TechnologyShowcase from '../components/Home/TechnologyShowcase';
import WhyChooseUs from '../components/Common/WhyChooseUs';
import ServicesGrid from '../components/Common/ServicesGrid';
import TestimonialsSection from '../components/Common/TestimonialsSection';
import { Cloud as CloudIcon, VpnKey, Code as CodeIcon, Security as SecurityIcon, Storage as StorageIcon } from '@mui/icons-material';
import { CARD_STYLES, getSharedStyles, SPACING } from '../utils/sharedStyles';

const resources = [
  {
    id: 1,
    title: 'Cloud Mastery',
    summary: 'Advanced cloud infrastructure deployment strategies.',
    icon: CloudIcon,
    path: '/resources/cloud',
    downloads: '2.4K+',
    trending: true,
    time: '18 min read',
  },
  {
    id: 2,
    title: 'Security Vaults',
    summary: 'Enterprise secrets management solutions.',
    icon: VpnKey,
    path: '/resources/security',
    downloads: '1.8K+',
    trending: true,
    time: '25 min read',
  },
  {
    id: 3,
    title: 'Code Architect',
    summary: 'Modern software architecture patterns.',
    icon: CodeIcon,
    path: '/resources/architecture',
    downloads: '3.1K+',
    trending: false,
    time: '30 min read',
  },
];

// Define resource categories (customize these!)
const resourceCategories = [
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    summary: 'Deep dive into cloud infrastructure, deployment, and optimization.',
    icon: CloudIcon,
    path: '/resources/cloud-computing-category', // Update with actual category path if needed
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    summary: 'Expert guides on enterprise security, threat mitigation, and data protection.',
    icon: SecurityIcon,
    path: '/resources/cybersecurity-category', // Update with actual category path if needed
  },
  {
    id: 'software-architecture',
    title: 'Software Architecture',
    summary: 'Explore modern software design patterns and scalable system architectures.',
    icon: CodeIcon,
    path: '/resources/software-architecture-category', // Update with actual category path if needed
  },
  {
    id: 'data-management',
    title: 'Data Management',
    summary: 'Resources on data storage, management, and strategies for data-driven decisions.',
    icon: StorageIcon,
    path: '/resources/data-management-category', // Update with actual category path if needed
  },
  // Add more categories as needed
];

const ResourcesPage: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);

  const renderResourceCard = (resource: typeof resources[0]) => {
    const IconComponent = resource.icon;
    return (
      <GoldCard
        onClick={() => { window.location.href = resource.path; }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: CARD_STYLES.minHeight,
          transition: CARD_STYLES.transition,
          '&:hover': { transform: CARD_STYLES.hoverTransform },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Updated icon container */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(25, 118, 210, 0.08)'
                : 'rgba(144, 202, 249, 0.08)',
              borderRadius: '16px',
              width: 60,
              height: 60,
              mb: 2,
              mx: 'auto',
              border: `1px solid ${theme.palette.mode === 'light'
                ? 'rgba(25, 118, 210, 0.3)'
                : 'rgba(144, 202, 249, 0.3)'}`
            }}
          >
            <IconComponent
              sx={{
                fontSize: 32,
                color: theme.palette.mode === 'light'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
                transform: 'rotate(-10deg)',
              }}
            />
          </Box>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              textAlign: 'center',
              color: theme.palette.text.primary,
            }}
          >
            {resource.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              textAlign: 'center',
              color: theme.palette.text.secondary,
              flexGrow: 1,
            }}
          >
            {resource.summary}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            component={NextLink}
            href={resource.path}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              mt: 'auto',
            }}
          >
            Explore Guide
          </Button>
        </Box>
      </GoldCard>
    );
  };

  const renderCategoryCard = (category: typeof resourceCategories[0]) => {
    const IconComponent = category.icon;
    return (
      <GoldCard
        onClick={() => { window.location.href = category.path; }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: CARD_STYLES.minHeight,
          transition: CARD_STYLES.transition,
          '&:hover': { transform: CARD_STYLES.hoverTransform },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Updated icon container */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(25, 118, 210, 0.08)'
                : 'rgba(144, 202, 249, 0.08)',
              borderRadius: '16px',
              width: 60,
              height: 60,
              mb: 2,
              mx: 'auto',
              border: `1px solid ${theme.palette.mode === 'light'
                ? 'rgba(25, 118, 210, 0.3)'
                : 'rgba(144, 202, 249, 0.3)'}`
            }}
          >
            <IconComponent
              sx={{
                fontSize: 32,
                color: theme.palette.mode === 'light'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
                transform: 'rotate(-10deg)',
              }}
            />
          </Box>
          <Typography
            variant="h6" // Reduced variant to h6 for categories
            component="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              textAlign: 'center',
              color: theme.palette.text.primary,
            }}
          >
            {category.title}
          </Typography>
          <Typography
            variant="body2" // Reduced variant to body2 for categories
            sx={{
              mb: 2,
              textAlign: 'center',
              color: theme.palette.text.secondary,
              flexGrow: 1,
            }}
          >
            {category.summary}
          </Typography>
          <Button
            variant="outlined" // Changed to outlined style for categories to differentiate
            color="primary"
            size="medium"
            component={NextLink}
            href={category.path}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              mt: 'auto',
            }}
          >
            Explore Category
          </Button>
        </Box>
      </GoldCard>
    );
  };

  return (
    <ConsistentPageLayout
      seoTitle="Technical Resources - Expert Guides"
      seoDescription="Access our comprehensive library of technical resources and implementation guides."
      title="Discover. Learn. Grow."
      subtitle="Access our expert technical resources to drive your success."
    >
      {/* Introduction Section */}
      <PageSection>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
            }}
          >
            Unlock a World of Expertise
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
          >
            Welcome to our comprehensive resource library. Here you'll find in-depth guides, articles, and insights crafted by our expert team to help you navigate the complexities of modern technology and achieve your business goals.
          </Typography>
          {/* Optional benefit points */}
          <Box component="ul" sx={{ listStyleType: 'none', m: 0, p: 0, maxWidth: 600, mx: 'auto' }}>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                Stay ahead of the curve with cutting-edge technical insights.
              </Typography>
            </Box>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                Gain practical knowledge you can immediately apply to your projects.
              </Typography>
            </Box>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                Learn from industry experts and accelerate your team's skill development.
              </Typography>
            </Box>
          </Box>
        </Container>
      </PageSection>

      {/* Featured Resources Section */}
      <PageSection>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 'bold',
          }}
        >
          Featured Resources
        </Typography>
        <CardGrid data={resources} renderItem={renderResourceCard} />
      </PageSection>

      {/* Explore Resources by Topic Section */}
      <PageSection>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
              mb: SPACING.medium,
              mx: 'auto',
            }}
          >
            Explore Resources by Topic
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: SPACING.large, mx: 'auto' }}
          >
            Dive deeper into specific areas of interest. Browse our resources categorized by technical domain to quickly find the guides and insights most relevant to your needs.
          </Typography>
          {/* Resource Categories Grid */}
          <CardGrid data={resourceCategories} renderItem={renderCategoryCard} sx={{ mx: 'auto' }} />
        </Container>
      </PageSection>

      {/* Why These Resources Matter Section */}
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
            }}
          >
            Why Leverage Our Expert Resources?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: SPACING.large }}
          >
            In today's fast-paced tech landscape, staying informed and skilled is crucial. Our resources are designed to equip tech leaders, developers, and innovators with the knowledge they need to build robust, secure, and scalable platforms. We cut through the noise and deliver actionable insights based on real-world experience.
          </Typography>
          {/* Optional target audience points */}
          <Box component="ul" sx={{ listStyleType: 'none', m: 0, p: 0, maxWidth: 600, mx: 'auto' }}>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                <b>Ideal for:</b> CTOs, VPs of Engineering, Lead Developers, Solution Architects, Security Engineers, Cloud Engineers
              </Typography>
            </Box>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                <b>Perfect for those seeking to:</b> Deepen technical expertise, implement best practices, solve complex tech challenges, drive innovation.
              </Typography>
            </Box>
          </Box>
        </Container>
      </PageSection>

 
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;
