// components/Home/HeroSection.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, Button, useTheme, alpha, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { SiAmazonaws, SiMicrosoftazure, SiGooglecloud, SiKubernetes, SiNvidia } from 'react-icons/si';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles'; // Import shared styles
import PageHeader from '../Shared/PageHeader'; // Import PageHeader


const TECH_LOGOS = [
  { icon: SiAmazonaws, name: 'AWS' },
  { icon: SiMicrosoftazure, name: 'Microsoft Azure' },
  { icon: SiGooglecloud, name: 'Google Cloud' },
  { icon: SiKubernetes, name: 'Kubernetes' },
  { icon: SiNvidia, name: 'GPU Accelerated' },
];

export const HeroSection = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme); // Get shared styles

    //Instead of using useMediaQuery, use Material UI breakpoints.
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    //Removed box and use PageHeader Instead
     <PageHeader
      title="Launch Your Startup with Cloud-Native Solutions"
      subtitle="Accelerate growth with enterprise-grade technology and expert support."
       />
  );
};

export default HeroSection;