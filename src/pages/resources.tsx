'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Grid, useTheme, alpha, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { Cloud, VpnKey, Code, Download, AccessTime, ErrorOutline, ArrowRight } from '@mui/icons-material';
import SEO from '../components/SEO';
import PageLayout from '../components/Shared/PageLayout';
import PageHeader from '../components/Shared/PageHeader';

// Dynamic Import (Fixing Type Error)


// Define the Resource interface
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

// Sample resource data
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

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          width: 340,
          borderRadius: 4,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
          color: theme.palette.common.white,
          position: 'relative',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Icon & Badge */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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

          {/* Title & Description */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {resource.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
            {resource.summary}
          </Typography>

          {/* Metadata */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <Download sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="caption">{resource.downloads}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <AccessTime sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="caption">{resource.time}</Typography>
            </Box>
          </Box>

          {/* Tags */}
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

          {/* Hover Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '85%',
            }}
          >
            <NextLink href={resource.path} passHref>
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
  );
};

const ResourcesGrid = () => {
  return (
    <>
      <SEO
        title="Technical Resources - Expert Guides"
        description="Access our comprehensive library of technical resources and implementation guides."
        keywords="technical resources, cloud guides, security, architecture"
      />
      <PageLayout>
        <PageHeader title="Interactive Tech Resources" />
        <Grid container justifyContent="center" spacing={4}>
          {resources.map((resource) => (
            <Grid item key={resource.id}>
              <ResourceCard resource={resource} />
            </Grid>
          ))}
        </Grid>
      </PageLayout>
    </>
  );
};

export default ResourcesGrid;
