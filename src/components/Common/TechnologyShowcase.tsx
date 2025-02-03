'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const TechnologyShowcaseBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  textAlign: 'center',
}));

export const TechnologyShowcase = () => {
  const theme = useTheme();

  return (
    <TechnologyShowcaseBox>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 4 }}>
            Cutting-Edge Technologies
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Leveraging the latest tech stacks to drive your business forward.
          </Typography>
        </motion.div>
      </Container>
    </TechnologyShowcaseBox>
  );
};