'use client';

import React from 'react';
import { Grid, Typography, Box, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { SECTION_HEIGHT, COLORS, FONT_SIZES, SPACING, CARD_SIZES } from '../../utils/sharedStyles';
import { NEUTRAL_BACKGROUND } from '../../utils/sharedColors';
import {
  Briefcase,
  BookOpen,
  CheckCircle,
  Award,
  BarChart2,
  Layers,
} from 'react-feather';
// Import your TechCard component which now has optional props
import TechCard from '../Common/TechCard';

const services = [
  {
    title: 'Strategic Consulting',
    content: 'Tailored, data-driven strategies for business excellence.',
    icon: <Briefcase size={40} color={COLORS.primary} strokeWidth={1.5} />,
  },
  {
    title: 'Expert Guidance',
    content: 'Leverage deep industry insights for impactful decisions.',
    icon: <BookOpen size={40} color={COLORS.primary} strokeWidth={1.5} />,
  },
  {
    title: 'Custom Solutions',
    content: 'Precision-engineered solutions for unparalleled growth.',
    icon: <CheckCircle size={40} color={COLORS.primary} strokeWidth={1.5} />,
  },
  {
    title: 'Industry Insights',
    content: 'Cutting-edge intelligence to stay ahead of the curve.',
    icon: <Award size={40} color={COLORS.primary} strokeWidth={1.5} />,
  },
  {
    title: 'Data Analytics',
    content: 'Transform raw data into actionable business intelligence.',
    icon: <BarChart2 size={40} color={COLORS.primary} strokeWidth={1.5} />,
  },
  {
    title: 'Cloud Solutions',
    content: 'Scalable and secure cloud infrastructure for modern businesses.',
    icon: <Layers size={40} color={COLORS.primary} strokeWidth={1.5} />,
  },
];

export const ServicesGrid = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflow: 'hidden',
        background: `linear-gradient(45deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        width: '100vw',
        position: 'relative',
        minHeight: SECTION_HEIGHT,
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        py: SPACING.medium,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight={900}
          sx={{
            color: 'common.white',
            fontSize: FONT_SIZES.h2,
            lineHeight: 1.2,
            mb: SPACING.medium,
          }}
        >
          Exclusive Services Tailored for You
        </Typography>
        <Grid container spacing={SPACING.medium} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <TechCard
                  icon={service.icon}
                  title={service.title}
                  color={theme.palette.primary.main}
                >
                  <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
                    {service.content}
                  </Typography>
                </TechCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesGrid;
