'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  Avatar,
  alpha,
  Button,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { User, Users, Smile, ThumbsUp, Star, Heart } from 'react-feather';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO, TechCorp',
    testimonial: 'Their strategy transformed our entire approach.',
    avatar: '/avatar1.jpg',
    icon: <User size={64} color="#03DAC6" strokeWidth={1.5} />,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO, InnovateX',
    testimonial: 'Precision execution that elevated our tech stack.',
    avatar: '/avatar2.jpg',
    icon: <Users size={64} color="#03DAC6" strokeWidth={1.5} />,
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Founder, StartupHub',
    testimonial: 'Top-tier consultancy with next-level expertise.',
    avatar: '/avatar3.jpg',
    icon: <Smile size={64} color="#03DAC6" strokeWidth={1.5} />,
  },
  {
    id: 4,
    name: 'Sarah Lee',
    role: 'Manager, TechSolutions',
    testimonial: 'Best team we ever worked with.',
    avatar: '/avatar4.jpg',
    icon: <ThumbsUp size={64} color="#03DAC6" strokeWidth={1.5} />,
  },
  {
    id: 5,
    name: 'David Brown',
    role: 'Director, InnovateNow',
    testimonial: 'Great support and expertise.',
    avatar: '/avatar5.jpg',
    icon: <Star size={64} color="#03DAC6" strokeWidth={1.5} />,
  },
  {
    id: 6,
    name: 'Emily Davis',
    role: 'CEO, FutureTech',
    testimonial: 'Absolutely game-changing.',
    avatar: '/avatar6.jpg',
    icon: <Heart size={64} color="#03DAC6" strokeWidth={1.5} />,
  },
];

const ViewMoreButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  borderRadius: 25,
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0px 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
  color: theme.palette.common.white,
  '&:hover': {
    background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    boxShadow: `0px 6px 20px ${alpha(theme.palette.secondary.main, 0.5)}`,
  },
  padding: '12px 24px',
  fontSize: '1.1rem',
}));

const TestimonialCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(
    theme.palette.background.default,
    0.9
  )})`,
  borderRadius: '12px',
  padding: '24px',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

export const TestimonialsSection = () => {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);

  return (
    <Box sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 900,
            mb: 8,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Client Success Stories
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {(showAll ? testimonials : testimonials.slice(0, 3)).map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <TestimonialCard>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {t.icon}
                    </Box>
                    <Avatar
                      src={t.avatar}
                      sx={{
                        width: 100,
                        height: 100,
                        mb: 3,
                        mx: 'auto',
                        border: `2px solid ${theme.palette.primary.main}`,
                      }}
                    />
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3 }}>
                      "{t.testimonial}"
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {t.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t.role}
                    </Typography>
                  </CardContent>
                </TestimonialCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {!showAll && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <ViewMoreButton variant="contained" size="large" onClick={() => setShowAll(true)}>
              View More
            </ViewMoreButton>
          </Box>
        )}
      </Container>
    </Box>
  );
};
