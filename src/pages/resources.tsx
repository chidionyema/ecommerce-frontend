'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  alpha,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';
import SEO from '../components/SEO';
import BaseCard from '../components/BaseCard';
import { Cloud, VpnKey, Code, TrendingUp } from '@mui/icons-material';

// ✅ Define TypeScript Interface
interface Resource {
  id: number;
  title: string;
  summary: string;
  path: string;
  icon: React.ElementType;
  downloads: string;
  trending: boolean;
  tags: string[];
  time: string;
}

// ✅ Resource Data (Mock or API Fetched)
const resources: Resource[] = [
  {
    id: 1,
    title: 'Mastering Cloud Computing',
    summary: 'Comprehensive guide to cloud infrastructure and deployment strategies.',
    path: '/resources/cloud-computing',
    icon: Cloud,
    downloads: '1.2K+',
    trending: true,
    tags: ['devops', 'cloud', 'guide'],
    time: '15 min read',
  },
  {
    id: 2,
    title: 'Secrets Management with Vault',
    summary: 'Enterprise-grade secrets management in .NET using HashiCorp Vault.',
    path: '/resources/integrating-vault-dotnet',
    icon: VpnKey,
    downloads: '850+',
    trending: false,
    tags: ['security', '.NET', 'devops'],
    time: '20 min read',
  },
  {
    id: 3,
    title: 'Serverless Architecture Guide',
    summary: 'Optimize cloud costs with serverless implementation best practices.',
    path: '/resources/serverless',
    icon: Code,
    downloads: '2K+',
    trending: true,
    tags: ['serverless', 'cloud', 'cost-optimization'],
    time: '25 min read',
  },
];

// ✅ Instant ResourceCard Rendering
const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const theme = useTheme();

  return (
    <BaseCard
      component={motion.div}
      whileHover={{ scale: 1.03 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        p: 4,
        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.96)}, ${alpha(theme.palette.secondary.dark, 0.96)})`,
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: `0 24px 48px ${alpha(theme.palette.secondary.main, 0.3)}`,
        },
      }}
    >
      {/* Trending Badge */}
      {resource.trending && (
        <Chip
          icon={<TrendingUp fontSize="small" />}
          label="Trending"
          color="secondary"
          sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 700 }}
        />
      )}

      {/* Icon Section */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <resource.icon sx={{ fontSize: 64, color: theme.palette.secondary.main }} />
      </Box>

      {/* Title and Summary */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
        {resource.title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
        {resource.summary}
      </Typography>

      {/* Call-to-Action */}
      <Box sx={{ textAlign: 'center', mt: 'auto' }}>
        <NextLink href={resource.path} passHref>
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontWeight: 700, px: 6, py: 1.5 }}
          >
            View Resource
          </Button>
        </NextLink>
      </Box>
    </BaseCard>
  );
};

// ✅ Main Component: Resources Page
const Resources: React.FC = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ✅ Preload and Memoize Resources
  const filteredResources = useMemo(() => {
    return resources.filter((res) =>
      filter === 'all' ? true : filter === 'trending' ? res.trending : res.tags.includes(filter)
    );
  }, [filter]);

  // ✅ Remove Delay & Show Instant Placeholder Instead
  useEffect(() => {
    setIsLoading(false); // 🚀 Instantly set to false
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilter = (_: React.MouseEvent<HTMLElement>, newFilter: string) => setFilter(newFilter);
  return (
    <Box
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
        title="Premium Resources - Expert Insights"
        description="Explore cutting-edge resources for modern software and cloud architecture."
        keywords="resources, cloud computing, devops, guides"
      />

      <Container maxWidth="xl">
        {/* Header */}
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
            Tech Resources
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Unlock your potential with expert-curated guides and insights.
          </Typography>

          {/* Filter Buttons */}
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilter}
            sx={{ mt: 4 }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="trending">Trending</ToggleButton>
            <ToggleButton value="devops">DevOps</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* ✅ Grid Layout for Cards */}
        <Grid container spacing={4}>
          <AnimatePresence>
            {isLoading
              ? Array(3).fill(0).map((_, i) => (
                  <Grid item xs={12} md={4} key={i}>
                    <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                  </Grid>
                ))
              : filteredResources.map((resource) => (
                  <Grid item xs={12} md={4} key={resource.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ResourceCard resource={resource} />
                    </motion.div>
                  </Grid>
                ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </Box>
  );
};

export default Resources;
