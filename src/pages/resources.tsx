'use client';

import React from 'react';
import { 
  Box, Typography, Grid, useTheme, Card, CardContent, Button 
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { 
  Cloud, VpnKey, Code, Download, AccessTime, ErrorOutline, ArrowRight 
} from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyChooseUs } from '../components/Common/WhyChooseUs';
import { ServicesGrid } from '../components/Common/ServicesGrid';
import { TestimonialsSection } from '../components/Common/TestimonialsSection';

// 🌟 **DEEP RICH GOLD-GREEN GRADIENT**
const GOLD_GREEN_GRADIENT = `linear-gradient(135deg, #B8860B 0%, #556B2F 100%)`; // **Deep Goldenrod → Dark Olive Green**
const GOLD_GREEN_HOVER = `linear-gradient(135deg, #A07800 0%, #44582D 100%)`; // **Refined Hover Effect**

const resources = [
  {
    id: 1,
    title: 'Cloud Mastery',
    summary: 'Advanced cloud infrastructure deployment strategies',
    icon: Cloud,
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
    icon: Code,
    path: '/resources/architecture',
    downloads: '3.1K+',
    trending: false,
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
      <Grid container justifyContent="center" spacing={6} sx={{ mt: 6, px: { xs: 2, md: 6 } }}>
        {resources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }}>
              <Card
                sx={{
                  width: '100%',
                  height: 450,
                  borderRadius: 4,
                  background: GOLD_GREEN_GRADIENT,
                  color: '#FFF',
                  boxShadow: '0px 10px 30px rgba(184, 134, 11, 0.5)', // Gold-green glow
                  display: 'flex',
                  flexDirection: 'column',
                  backdropFilter: 'blur(18px) saturate(180%)',
                  border: `2px solid rgba(184, 134, 11, 0.5)`, // Subtle golden edge
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 32px rgba(85, 107, 47, 0.7)', // Gold-green brilliance
                    background: GOLD_GREEN_HOVER,
                  },
                }}
              >
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <resource.icon sx={{ fontSize: 40, color: '#FFF' }} />
                    {resource.trending && (
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 8,
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: '#FFF',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
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
                  <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                    {resource.summary}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#FFF' }}>
                      <Download sx={{ fontSize: 16, mr: 1 }} />
                      {resource.downloads}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#FFF' }}>
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
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: '#FFF',
                          fontWeight: 600,
                          transition: 'background 0.3s',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.3)',
                          },
                        }}
                      >
                        Explore Guide <ArrowRight sx={{ fontSize: 18, ml: 1 }} />
                      </Box>
                    </NextLink>
                  </motion.div>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ 
                      mt: 2, 
                      color: '#FFF', 
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        borderColor: '#FFF',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      }
                    }} 
                  >
                    Contact Us
                  </Button> 
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Additional Sections */}
      <Box sx={{ mt: 30 }}>
        <TechnologyShowcase />
      </Box>
      <Box>
        <WhyChooseUs />
      </Box>
      <Box>
        <ServicesGrid />
      </Box>
      <Box>
        <TestimonialsSection />
      </Box>
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;
