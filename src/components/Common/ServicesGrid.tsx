'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Button, Card, CardContent, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

const services = [
  { title: "Strategic Consulting", content: "Tailored, data-driven strategies for business excellence." },
  { title: "Expert Guidance", content: "Leverage deep industry insights for impactful decisions." },
  { title: "Custom Solutions", content: "Precision-engineered solutions for unparalleled growth." },
  { title: "Industry Insights", content: "Cutting-edge intelligence to stay ahead of the curve." }
];

export const ServicesGrid = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      py: { xs: 10, md: 16 }, 
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.25)}, ${alpha(theme.palette.primary.light, 0.1)})`,
      color: 'white'
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
          Exclusive Services Tailored for You
        </Typography>

        <Grid container spacing={6}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.06 }}
              >
                <Card sx={{ 
                  borderRadius: 3, 
                  textAlign: 'center', 
                  p: 5, 
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.2)}, rgba(255,255,255,0.1))`,
                  boxShadow: `0px 12px 40px ${alpha(theme.palette.secondary.light, 0.4)}`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`
                }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: theme.palette.primary.light }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                      {service.content}
                    </Typography>
                    <Button 
                      variant="contained" 
                      sx={{
                        borderRadius: '25px',
                        background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: 'white',
                        px: 5,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 700,
                        boxShadow: `0px 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                        '&:hover': {
                          boxShadow: `0px 10px 30px ${alpha(theme.palette.primary.main, 0.7)}`,
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
