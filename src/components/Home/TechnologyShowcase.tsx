'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  styled
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { techIcons } from './tech-data'; // Importing tech icons

// Floating hover animation
const floatingVariants = {
  hover: {
    y: [-5, 5, -5],
    scale: 1.15,
    rotate: [0, 15, -15, 0],
    transition: {
      y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
      scale: { duration: 0.2 }
    }
  },
  rest: {
    y: [-3, 3, -3],
    scale: 1,
    rotate: 0,
    transition: {
      y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 0 }
    }
  }
};

// Styled Tech Card
const TechCard = styled(motion.div)<{ color: string }>(({ theme, color }) => ({
  position: 'relative',
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: '16px',
  cursor: 'pointer',
  overflow: 'hidden',
  background: `linear-gradient(145deg, ${color}10 0%, #ffffff30 100%)`,
  border: `1px solid ${color}30`,
  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
  width: '100%',
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05) translateY(-5px)',
    boxShadow: `0 12px 32px ${color}40`,
    borderColor: `${color}80`,
  }
}));

export const TechnologyShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <Box
      sx={{
        py: 10,
        width: '100vw', // Full viewport width
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: `linear-gradient(
          45deg, 
          ${theme.palette.primary.main} 0%, 
          ${theme.palette.secondary.main} 100%
        )`,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" ref={ref}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: 'common.white',
            fontWeight: 900,
            mb: 6,
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            letterSpacing: '-0.03em'
          }}
        >
          Core Technologies
        </Typography>

        <Grid 
          container 
          spacing={isMobile ? 2 : 4} 
          justifyContent="center"
          sx={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }} // Prevents unnecessary constraints
        >
          {techIcons.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id} sx={{ display: 'flex' }}>
              <TechCard
                color={tech.color}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.08, type: 'spring', stiffness: 80, damping: 12 }}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  variants={floatingVariants}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  style={{
                    marginBottom: theme.spacing(2),
                    display: 'flex',
                    justifyContent: 'center',
                    filter: `drop-shadow(0 0 12px ${tech.color}80)`
                  }}
                >
                  {React.cloneElement(tech.icon, { size: 40, strokeWidth: 1.2 })}
                </motion.div>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    background: `linear-gradient(45deg, ${tech.color}, ${tech.color}CC)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.015em'
                  }}
                >
                  {tech.title}
                </Typography>
              </TechCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
