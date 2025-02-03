'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ProjectCardBackground } from '../../theme/themes';;
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  Award,
} from 'react-feather';

const services = [
  {
    title: 'Strategic Consulting',
    content: 'Tailored, data-driven strategies for business excellence.',
    icon: <Briefcase size={48} color="#03DAC6" strokeWidth={1.5}/>, // Added Feather Icon
  },
  {
    title: 'Expert Guidance',
    content: 'Leverage deep industry insights for impactful decisions.',
    icon: <BookOpen size={48} color="#03DAC6" strokeWidth={1.5} />, // Added Feather Icon
  },
  {
    title: 'Custom Solutions',
    content: 'Precision-engineered solutions for unparalleled growth.',
    icon: <CheckCircle size={48} color="#03DAC6" strokeWidth={1.5} />, // Added Feather Icon
  },
  {
    title: 'Industry Insights',
    content: 'Cutting-edge intelligence to stay ahead of the curve.',
    icon: <Award size={48} color="#03DAC6" strokeWidth={1.5} />, // Added Feather Icon
  },
];

export const ServicesGrid = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography
        variant="h2"
        textAlign="center"
        fontWeight={900}
        mb={8}
        sx={{
          background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '3.5rem',
          lineHeight: 1.2,
        }}
      >
        Exclusive Services Tailored for You
      </Typography>
      <Grid container spacing={6}>
        {services.map((service, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              whileHover={{ y: -8, scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.2, 
                ease: 'easeInOut', 
                delay: index * 0.1 
              }}
            >
              <ProjectCardBackground>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    color={theme.palette.primary.light}
                    mb={2}
                    sx={{
                      fontSize: '1.75rem',
                      textAlign: 'center',
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                      textAlign: 'center',
                    }}
                  >
                    {service.content}
                  </Typography>
                </CardContent>
              </ProjectCardBackground>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};