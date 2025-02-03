'use client';

import React from 'react';
import { Box, Typography, Grid, useTheme, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { Cloud, VpnKey, Code, Download, AccessTime, ErrorOutline, ArrowRight } from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import { sharedCardBackground } from '../utils/sharedStyles';

import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyPartner } from '../components/Common/WhyPartner';
import { ServicesGrid } from '../components/Common/ServicesGrid'; // Use named import
import { TestimonialsSection } from '../components/Common/TestimonialsSection'; // Use named import

const resources = [
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

const ResourcesPage: React.FC = () => {
  const theme = useTheme();

  return (
    <ConsistentPageLayout
      seoTitle="Technical Resources - Expert Guides"
      seoDescription="Access our comprehensive library of technical resources and implementation guides."
      subtitle="Access our expert technical resources to drive your success."
    >
      <Grid container justifyContent="center" spacing={4} sx={{ mt: 6, px: { xs: 2, md: 6 } }}>
        {resources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }}>
              <Card
                sx={{
                  width: '100%',
                  height: 450,
                  borderRadius: 4,
                  background: sharedCardBackground(theme),
                  color: theme.palette.common.white,
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <resource.icon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
                    {resource.trending && (
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 8,
                          bgcolor: theme.palette.warning.light,
                          color: theme.palette.warning.dark,
                          fontSize: '0.75rem',
                        }}
                      >
                        <ErrorOutline sx={{ fontSize: 14, mr: 1 }} />
                        Trending
                      </Box>
                    )}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {resource.title}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
                    {resource.summary}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: theme.palette.common.white }}>
                      <Download sx={{ fontSize: 16, mr: 1 }} />
                      {resource.downloads}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: theme.palette.common.white }}>
                      <AccessTime sx={{ fontSize: 16, mr: 1 }} />
                      {resource.time}
                    </Box>
                  </Box>
                  <motion.div whileHover={{ scale: 1.05 }}>
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
      <WhyPartner />
    <ServicesGrid />
    <TestimonialsSection />
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;
