'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  alpha,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import {
  Cloud,
  VpnKey,
  Code,
  Download,
  AccessTime,
  ErrorOutline,
  ArrowRight,
} from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';

interface Resource {
  id: number;
  title: string;
  summary: string;
  icon: React.ElementType;
  path: string;
  downloads: string;
  trending: boolean;
  tags: string[];
  time: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'Cloud Mastery',
    summary: 'Advanced cloud infrastructure deployment strategies',
    icon: Cloud,
    path: '/resources/cloud',
    downloads: '2.4K+',
    trending: true,
    tags: ['devops', 'aws', 'azure'],
    time: '18 min read',
  },
  {
    id: 2,
    title: 'Security Vaults',
    summary: 'Enterprise secrets management solutions',
    icon: VpnKey,
    path: '/resources/security',
    downloads: '1.8K+',
    trending: true,
    tags: ['security', 'encryption'],
    time: '25 min read',
  },
  {
    id: 3,
    title: 'Code Architect',
    summary: 'Modern software architecture patterns',
    icon: Code,
    path: '/resources/architecture',
    downloads: '3.1K+',
    trending: false,
    tags: ['design', 'patterns'],
    time: '30 min read',
  },
];

const ResourcesGrid: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container justifyContent="center" spacing={4} sx={{ mt: 6, px: { xs: 2, md: 6 } }}>
      {resources.map((resource) => (
        <Grid
          item
          key={resource.id}
          xs={12}
          sm={6}
          md={4}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: 400,
                height: 450,
                borderRadius: 4,
                overflow: 'hidden',
                background: `linear-gradient(145deg, ${alpha(
                  theme.palette.primary.dark,
                  0.9
                )}, ${alpha(theme.palette.secondary.dark, 0.85)})`,
                color: theme.palette.common.white,
                position: 'relative',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ p: 4, flex: 1, position: 'relative' }}>
                {/* Icon & Trending Badge */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <resource.icon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
                  {resource.trending && (
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 8,
                        bgcolor: alpha(theme.palette.warning.main, 0.2),
                        color: theme.palette.warning.light,
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 600,
                      }}
                    >
                      <ErrorOutline sx={{ fontSize: 14, mr: 1 }} />
                      Trending
                    </Box>
                  )}
                </Box>

                {/* Title */}
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {resource.title}
                </Typography>
                {/* Summary */}
                <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
                  {resource.summary}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <Download sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="body2">{resource.downloads}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <AccessTime sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="body2">{resource.time}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {resource.tags.map((tag) => (
                    <Box
                      key={tag}
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 8,
                        fontSize: '0.75rem',
                        bgcolor: alpha(theme.palette.info.main, 0.2),
                        color: theme.palette.info.light,
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
                </Box>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '85%',
                  }}
                >
                  <NextLink href={resource.path} passHref legacyBehavior>
                    <Box
                      component="a"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        fontWeight: 600,
                        transition: '0.3s',
                        '&:hover': { bgcolor: theme.palette.primary.dark },
                      }}
                    >
                      Explore Guide <ArrowRight sx={{ fontSize: 18, ml: 1 }} />
                    </Box>
                  </NextLink>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

const ResourcesPage: React.FC = () => {
  return (
    <ConsistentPageLayout
      seoTitle="Technical Resources - Expert Guides"
      seoDescription="Access our comprehensive library of technical resources and implementation guides."
      seoKeywords="technical resources, cloud guides, security, architecture"
      subtitle="Access our expert technical resources to drive your success."
    >
      <ResourcesGrid />
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;
