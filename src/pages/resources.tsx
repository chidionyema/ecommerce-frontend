'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { Cloud, VpnKey, Code } from '@mui/icons-material';

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
    time: '18 min read'
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
    time: '25 min read'
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
    time: '30 min read'
  },
];

const ResourceHexagon = ({ resource }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      component={motion.div}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      sx={{
        position: 'relative',
        width: 300,
        height: 300,
        cursor: 'pointer',
        perspective: 1000,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: `
            linear-gradient(
              45deg,
              ${alpha(theme.palette.primary.main, 0.8)} 0%,
              ${alpha(theme.palette.secondary.main, 0.8)} 100%
            )`,
          transform: hovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backfaceVisibility: 'hidden',
            p: 4,
          }}
        >
          <resource.icon sx={{ fontSize: 48, mb: 2, color: 'white' }} />
          <Typography variant="h6" align="center" sx={{ color: 'white' }}>
            {resource.title}
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
          }}
        >
          <Typography variant="body2" paragraph>
            {resource.summary}
          </Typography>
          <NextLink href={resource.path} passHref>
            <Button variant="contained" size="small" sx={{ mt: 2 }}>
              Explore Guide
            </Button>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};

export default function ResourcesPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box sx={{ 
        py: 8, 
        background: `
          radial-gradient(
            circle at 50% 100%,
            ${alpha(theme.palette.primary.dark, 0.8)} 0%,
            ${alpha(theme.palette.secondary.dark, 0.9)} 100%
          )`
      }}>
        <Container maxWidth="xl">
          <Typography variant="h2" align="center" sx={{ 
            color: 'white', 
            mb: 8,
            fontWeight: 900,
            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            Interactive Tech Resources
          </Typography>
          <Grid container justifyContent="center" spacing={8}>
            {resources.map((resource) => (
              <Grid item key={resource.id}>
                <ResourceHexagon resource={resource} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}