'use client';
import React from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

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
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 900, 
            mb: 8,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
          }}>
          Why Choose Us?
        </Typography>

        <Grid container spacing={6}>
          {reasons.map((reason, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.06 }}
              >
                <Box sx={{
                  p: 5,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.2)}, rgba(255,255,255,0.1))`,
                  boxShadow: `0px 12px 40px ${alpha(theme.palette.secondary.light, 0.4)}`,
                  backdropFilter: 'blur(15px)',
                  borderRadius: 3,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  border: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.primary.light }}>
                    {reason}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
