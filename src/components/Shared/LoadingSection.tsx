'use client';

import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * LoadingSection
 * --------------
 * A fade-in placeholder shown while each client-side section
 * (Hero, TechnologyShowcase, etc.) is dynamically imported.
 */
export default function LoadingSection() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      sx={{
        minHeight: 240,          // keeps layout stable during hydration
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
      role="status"
      aria-label="Loading section"
    >
      <CircularProgress size={32} thickness={4} />
    </Box>
  );
}
