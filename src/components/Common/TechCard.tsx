'use client';

import React, { useRef, useState } from 'react';
import { Box, Typography, useTheme, styled, alpha } from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';

const TechCard = ({ icon, title, children, accentColor, sx }: any) => {
  const theme = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box ref={ref} sx={{ ...sx, position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, ...sx }}>
          {icon && (
            <Box sx={{ mb: 2, color: accentColor || theme.palette.primary.main }}>
              {icon}
            </Box>
          )}
          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            {title}
          </Typography>
          {children && (
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              {children}
            </Typography>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default TechCard;
