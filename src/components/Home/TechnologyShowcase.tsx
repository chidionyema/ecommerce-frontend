// components/Home/TechnologyShowcase.tsx
'use client';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SECTION_HEIGHT, COLORS, FONT_SIZES, SPACING } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';
import { techIcons } from './tech-data';

const floatingVariants = {
  hover: {
    y: [-5, 5, -5],
    scale: 1.15,
    rotate: [0, 15, -15, 0],
    transition: {
      y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
      scale: { duration: 0.2 },
    },
  },
  rest: {
    y: [-3, 3, -3],
    scale: 1,
    rotate: 0,
    transition: {
      y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 0 },
    },
  },
};

export const TechnologyShowcase = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  const cloudComputingColor = techIcons.find(tech => tech.title === 'Cloud Computing')?.color;

  return (
    <Box
      sx={{
        minHeight: SECTION_HEIGHT,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: `linear-gradient(45deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        overflow: 'hidden',
        py: SPACING.medium,
      }}
    >
      <Container maxWidth="lg" ref={ref}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: 'common.white',
            fontWeight: 900,
            mb: SPACING.medium,
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            letterSpacing: '-0.03em',
            fontSize: FONT_SIZES.h2,
          }}
        >
          Core Technologies
        </Typography>

        <Grid container spacing={SPACING.medium} justifyContent="center">
          {techIcons.map((tech, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <TechCard
                icon={tech.icon}
                title={tech.title}
                color={tech.color}
                index={index}
                floatingVariants={floatingVariants}
                textColor={cloudComputingColor}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TechnologyShowcase;