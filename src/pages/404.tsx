'use client';

import React from 'react';

import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import NextLink from 'next/link';

import GoldCard from '../components/GoldCard';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import CardGrid from '../components/CardGrid';
import PageSection from '../components/PageSection';

import CloudIcon from '@mui/icons-material/Cloud';
import VpnKey from '@mui/icons-material/VpnKey';
import CodeIcon from '@mui/icons-material/Code';

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(25, 118, 210, 0.1)'
                : 'rgba(144, 202, 249, 0.1)',
              borderRadius: '50%',
              width: 60,
              height: 60,
              mb: 2,
              mx: 'auto',
            }}
          >
            <IconComponent sx={{ fontSize: 32, color: theme.palette.primary.main }} />
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
              mb: SPACING.medium,
            }}
          >
            Unlock a World of Expertise
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: SPACING.large }}
          >
            Welcome to our comprehensive resource library. Here you'll find in-depth guides, articles, and insights crafted by our expert team to help you navigate the complexities of modern technology and achieve your business goals.
          </Typography>
          {/* Optional benefit points - customize these! */}
          <Box component="ul" sx={{ listStyleType: 'none', m: 0, p: 0, maxWidth: 600, mx: 'auto' }}>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}>Stay ahead of the curve with cutting-edge technical insights.</Typography>
            </Box>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}>Gain practical knowledge you can immediately apply to your projects.</Typography>
            </Box>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}>Learn from industry experts and accelerate your team's skill development.</Typography>
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
          {/* Optional target audience points - customize these! */}
          <Box component="ul" sx={{ listStyleType: 'none', m: 0, p: 0, maxWidth: 600, mx: 'auto' }}>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}><b>Ideal for:</b> CTOs, VPs of Engineering, Lead Developers, Solution Architects, Security Engineers, Cloud Engineers</Typography>
            </Box>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}><b>Perfect for those seeking to:</b> Deepen technical expertise, implement best practices, solve complex tech challenges, drive innovation.</Typography>
            </Box>
          </Box>
        </Container>
      </PageSection>

      {/* Optional: Explore by Topic Section (for future expansion) */}
      {/*
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
            Explore Resources by Topic
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: SPACING.large }}
          >
            [Placeholder:  Briefly describe resource categories and guide users to browse by topic if you have categories or plan to add them.]
          </Typography>
          {/* Add category list/grid here if you have categories */}
        {/* </Container>
      </PageSection>
      */}
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;