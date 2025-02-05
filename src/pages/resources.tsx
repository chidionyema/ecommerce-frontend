'use client';

import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRight, Download, AccessTime, ErrorOutline } from '@mui/icons-material';
import GoldCard from '../components/GoldCard';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyChooseUs } from '../components/Common/WhyChooseUs';
import { ServicesGrid } from '../components/Common/ServicesGrid';
import { TestimonialsSection } from '../components/Common/TestimonialsSection';
import { CARD_GRID_CONFIG } from '../utils/sharedStyles';
import { Cloud as CloudIcon, VpnKey, Code as CodeIcon } from '@mui/icons-material';

const resources = [
  {
    id: 1,
    title: 'Cloud Mastery',
    summary: 'Advanced cloud infrastructure deployment strategies',
    icon: CloudIcon,
    path: '/resources/cloud',
    downloads: '2.4K+',
    trending: true,
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
    time: '25 min read',
  },
  {
    id: 3,
    title: 'Code Architect',
    summary: 'Modern software architecture patterns',
    icon: CodeIcon,
    path: '/resources/architecture',
    downloads: '3.1K+',
    trending: false,
    time: '30 min read',
  },
];

const ResourcesPage: React.FC = () => {
  return (
    <ConsistentPageLayout
      seoTitle="Technical Resources - Expert Guides"
      seoDescription="Access our comprehensive library of technical resources and implementation guides."
      subtitle="Access our expert technical resources to drive your success."
      title="Discover. Learn. Grow."
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          mt: 8,
          p: 8,
        }}
      >
        <Grid
          container
          spacing={CARD_GRID_CONFIG.container.spacing}
          sx={CARD_GRID_CONFIG.container.sx}
          justifyContent="center"
        >
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={resource.id} sx={CARD_GRID_CONFIG.item.sx}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <GoldCard href={resource.path}>
                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(255, 215, 0, 0.2)',
                          borderRadius: '50%',
                          width: 70,
                          height: 70,
                          mb: 1,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 40, color: '#FFD700' }} />
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#FFF' }}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1, color: '#FFF' }}>
                        {resource.summary}
                      </Typography>
                      {resource.trending && (
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 8,
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            color: '#FFF',
                            fontSize: '0.75rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <ErrorOutline sx={{ fontSize: 14, mr: 0.5 }} />
                          Trending
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 1,
                          mb: 1,
                          color: '#FFF',
                          fontSize: '0.875rem',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Download sx={{ fontSize: 16, mr: 0.25 }} />
                          {resource.downloads}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime sx={{ fontSize: 16, mr: 0.25 }} />
                          {resource.time}
                        </Box>
                      </Box>
                      <NextLink href={resource.path} passHref legacyBehavior>
                        <Button variant="contained" size="small">
                          Explore Guide <ArrowRight sx={{ ml: 0.5 }} />
                        </Button>
                      </NextLink>
                    </Box>
                  </GoldCard>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{ mb: 30, mt: 30 }} />
      <TechnologyShowcase />
      <WhyChooseUs />
      <ServicesGrid />
      <TestimonialsSection />
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;
