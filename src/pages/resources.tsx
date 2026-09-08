// src/pages/resources.tsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Container,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import {
  Cloud as CloudIcon,
  VpnKey,
  Code as CodeIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import CardGrid from '../components/CardGrid';
import { CARD_STYLES, getSharedStyles, SPACING } from '../utils/sharedStyles';
import { useAuth } from '../contexts/AuthContext';

// ---------------------------
// Resource data arrays
// ---------------------------

// Free Resources
const freeResources = [
  {
    id: 1,
    title: 'Basic Cloud Concepts',
    summary: 'Introduction to cloud infrastructure and basic concepts.',
    icon: CloudIcon,
    path: '/free-resources/cloud',
    downloads: '1.5K+',
    trending: true,
    time: '10 min read',
  },
  {
    id: 2,
    title: 'Basic Security Vaults',
    summary: 'Learn the basics of securing your infrastructure with vaults.',
    icon: VpnKey,
    path: '/free-resources/security',
    downloads: '1.2K+',
    trending: true,
    time: '12 min read',
  },
  {
    id: 3,
    title: 'Introduction to API Security',
    summary: 'Learn how to secure APIs with best practices and minimal overhead.',
    icon: SecurityIcon,
    path: '/free-resources/api-security',
    downloads: '1.1K+',
    trending: false,
    time: '15 min read',
  },
];

// Premium Resources
const premiumResources = [
  {
    id: 1,
    title: 'Cloud Mastery',
    summary:
      'Complete guide with scripts, code, and docs to master cloud infrastructure.',
    icon: CloudIcon,
    path: '/premium-resources/cloud',
    downloads: '2.4K+',
    trending: true,
    time: '18 min read',
  },
  {
    id: 2,
    title: 'Security Vaults',
    summary:
      'Full premium package with security vault setup scripts and complete documentation.',
    icon: VpnKey,
    path: '/premium-resources/security',
    downloads: '1.8K+',
    trending: true,
    time: '25 min read',
  },
  {
    id: 3,
    title: 'Code Architect',
    summary:
      'Detailed code architecture patterns with production-ready examples.',
    icon: CodeIcon,
    path: '/premium-resources/architecture',
    downloads: '3.1K+',
    trending: false,
    time: '30 min read',
  },
];

// ---------------------------
// Main Component
// ---------------------------
const ResourcesPage: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, isSubscribed } = useAuth();
  const styles = getSharedStyles(theme);

  // This function will be called when a resource (card or button) is clicked.
  // For premium resources, it will redirect to login/subscribe as needed.
  const handleResourceClick = (resource: any) => {
    const isPremium = resource.path.startsWith('/premium-resources');

    if (!isPremium) {
      router.push(resource.path);
      return;
    }

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(resource.path)}`);
    } else if (!isSubscribed) {
      router.push(`/subscribe?redirect=${encodeURIComponent(resource.path)}`);
    } else {
      router.push(resource.path);
    }
  };

  // Render a single resource card. The card uses framer-motion for animation
  // and calls handleResourceClick on both the card container and its button.
  const renderResourceCard = (
    resource: typeof freeResources[0] | typeof premiumResources[0]
  ) => {
    const IconComponent = resource.icon;
    const isPremium = resource.path.startsWith('/premium-resources');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        viewport={{ once: true }}
      >
        <Box
          onClick={() => handleResourceClick(resource)}
          sx={{
            background: theme.palette.mode === 'light' ? 'white' : '#28282a',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: 450,
            maxWidth: 350,
            width: '100%',
            borderRadius: 4,
            boxShadow: theme.shadows[5],
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? 'rgba(25, 118, 210, 0.08)'
                    : 'rgba(144, 202, 249, 0.08)',
                borderRadius: '16px',
                width: 80,
                height: 80,
                mb: 3,
                mx: 'auto',
                border: `2px solid ${
                  theme.palette.mode === 'light'
                    ? 'rgba(25, 118, 210, 0.3)'
                    : 'rgba(144, 202, 249, 0.3)'
                }`,
              }}
            >
              <IconComponent
                sx={{
                  fontSize: 40,
                  color:
                    theme.palette.mode === 'light'
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
                mb: 2,
                textAlign: 'center',
                color: theme.palette.text.primary,
                fontSize: '1.25rem',
              }}
            >
              {resource.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                textAlign: 'center',
                color: theme.palette.text.secondary,
                fontSize: '1rem',
              }}
            >
              {resource.summary}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              {resource.trending && (
                <Chip label="Trending" color="primary" size="small" />
              )}
              <Chip label={resource.time} size="small" />
              {isPremium && (
                <Chip
                  label={isSubscribed ? 'Subscribed' : 'Subscription Required'}
                  color={isSubscribed ? 'success' : 'error'}
                  size="small"
                />
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              // Stop propagation so that clicking the button doesn't trigger the card's onClick twice.
              onClick={(e) => {
                e.stopPropagation();
                handleResourceClick(resource);
              }}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                mt: 'auto',
                py: 1.5,
                fontSize: '1rem',
              }}
            >
              {isPremium
                ? isSubscribed
                  ? 'Access Resource'
                  : 'Subscribe to Access'
                : 'Access Free Resource'}
            </Button>
          </Box>
        </Box>
      </motion.div>
    );
  };

  return (
    <ConsistentPageLayout
      seoTitle="Technical Resources - Free & Premium Code & Docs"
      seoDescription="Access both free and premium resources with production-ready code, test scripts, and documentation."
      title="Unlock Premium & Free Resources"
      subtitle="Get access to free and premium resources including code, scripts, and production-ready docs."
    >
      {/* Introduction Section */}
      <PageSection>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
              mb: SPACING.medium,
              fontWeight: 'bold',
            }}
          >
            Free & Premium Resources for Your Projects
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              mb: SPACING.medium,
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            Access production-ready code, comprehensive test scripts, and in-depth
            documentation. Perfect for developers and tech teams who want to hit the
            ground running.
          </Typography>
        </Container>
      </PageSection>

      {/* Free Resources Section */}
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
          Featured Free Resources
        </Typography>
        <CardGrid
          data={freeResources}
          renderItem={renderResourceCard}
          sx={{ mx: 'auto', gap: SPACING.medium }}
        />
      </PageSection>

      {/* Premium Resources Section */}
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
          Featured Premium Resources
        </Typography>
        <CardGrid
          data={premiumResources}
          renderItem={renderResourceCard}
          sx={{ mx: 'auto', gap: SPACING.medium }}
        />
      </PageSection>

      {/* Why Choose Our Resources Section */}
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
            Why Choose Our Resources?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              mb: SPACING.large,
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            Our free and premium resources are designed to save you time and help you deliver
            results faster. Each resource comes with complete code, test scripts, and documentation
            to ensure you're always prepared for success. Learn from industry experts, follow best
            practices, and ship your projects faster while saving on development costs.
          </Typography>
        </Container>
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;
