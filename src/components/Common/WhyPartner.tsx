'use client';
import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemIcon, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle } from '@mui/icons-material';

export const WhyPartner = () => {
  const theme = useTheme();

  const reasons = [
    "Expert Consultation",
    "Innovative Solutions",
    "Reliable Execution",
    "Scalable Growth"
  ];

  return (
    <Box sx={{ 
      py: { xs: 10, md: 16 }, 
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)}, ${alpha(theme.palette.secondary.dark, 0.95)})`,
      color: 'white',
    }}>
      <Container maxWidth="md">
        {/* Premium Gradient Title */}
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 900, 
            mb: 6,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
          }}>
          Why Choose Us?
        </Typography>

        {/* List-Based Layout */}
        <List sx={{ mx: 'auto', width: '100%', maxWidth: 600 }}>
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <ListItem sx={{ py: 2, borderBottom: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}` }}>
                <ListItemIcon>
                  <CheckCircle sx={{ color: theme.palette.primary.light }} />
                </ListItemIcon>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
                  {reason}
                </Typography>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Container>
    </Box>
  );
};
