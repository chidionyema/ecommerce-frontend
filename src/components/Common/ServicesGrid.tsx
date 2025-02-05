'use client';
import { Grid, Typography, Box, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { SECTION_HEIGHT, COLORS, FONT_SIZES, SPACING, CARD_SIZES } from '../../utils/sharedStyles';
import {
  Briefcase,
  BookOpen,
  CheckCircle,
  Award,
  BarChart2,
  Layers,
} from 'react-feather';
import { NEUTRAL_BACKGROUND } from '../../utils/sharedColors';

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
                <Box
                  sx={{
                    p: SPACING.medium,
                    borderRadius: 16, // Matches the GoldCard aesthetic
                    background: `linear-gradient(45deg, ${NEUTRAL_BACKGROUND} 0%, rgba(255,255,255,0.05) 100%)`,
                    boxShadow: `0 4px 12px ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.7)'}`,
                    backdropFilter: 'blur(18px) saturate(180%)',
                    border: '2px solid rgba(255,255,255,0.1)',
                    width: CARD_SIZES.medium.width,
                    height: CARD_SIZES.medium.height,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 10px 28px ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.8)'}`,
                    },
                  }}
                >
                  {service.icon}
                  <Typography variant="h6" component="h3" textAlign="center" mt={2}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
                    {service.content}
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

export default ServicesGrid;
