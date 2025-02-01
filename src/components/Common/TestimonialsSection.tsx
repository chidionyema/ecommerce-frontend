'use client';
import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Button, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  { id: 1, name: "John Doe", role: "CEO, TechCorp", testimonial: "Their strategy transformed our entire approach.", avatar: "/avatar1.jpg" },
  { id: 2, name: "Jane Smith", role: "CTO, InnovateX", testimonial: "Precision execution that elevated our tech stack.", avatar: "/avatar2.jpg" },
  { id: 3, name: "Michael Johnson", role: "Founder, StartupHub", testimonial: "Top-tier consultancy with next-level expertise.", avatar: "/avatar3.jpg" },
];

export const TestimonialsSection = () => {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);

  return (
    <Box sx={{ 
      py: { xs: 10, md: 16 }, 
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.85)}, ${alpha(theme.palette.secondary.dark, 0.95)})`, 
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
          Client Success Stories
        </Typography>

        <Grid container spacing={6}>
          {(showAll ? testimonials : testimonials.slice(0, 2)).map((t) => (
            <Grid item xs={12} md={4} key={t.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ 
                  borderRadius: 4, 
                  textAlign: 'center', 
                  p: 5, 
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.15)}, rgba(255,255,255,0.08))`,
                  boxShadow: `0px 12px 40px ${alpha(theme.palette.secondary.light, 0.4)}`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`
                }}>
                  <CardContent>
                    <Avatar src={t.avatar} sx={{ width: 100, height: 100, mb: 3, mx: "auto", border: `4px solid ${theme.palette.primary.main}` }} />
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, color: theme.palette.text.secondary }}>
                      "{t.testimonial}"
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.primary.light }}>
                      {t.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t.role}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        {!showAll && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => setShowAll(true)}
              sx={{ 
                fontWeight: 'bold', 
                borderRadius: '25px', 
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, 
                boxShadow: `0px 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
              }}
            >
              View More
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};
