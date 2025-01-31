import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import {
  Cloud,
  VpnKey,
  Storage,
  Api,
} from '@mui/icons-material';
import styled from 'styled-components';

// Define techIcons array correctly
const techIcons = [
  {
    id: 1,
    title: 'Cloud Computing',
    icon: <Cloud sx={{ fontSize: '4rem', color: '#673ab7' }} />,
    color: '#673ab7',
  },
  {
    id: 2,
    title: 'Security',
    icon: <VpnKey sx={{ fontSize: '4rem', color: '#f44336' }} />,
    color: '#f44336',
  },
  {
    id: 3,
    title: 'Data Storage',
    icon: <Storage sx={{ fontSize: '4rem', color: '#2196f3' }} />,
    color: '#2196f3',
  },
  {
    id: 4,
    title: 'API Development',
    icon: <Api sx={{ fontSize: '4rem', color: '#4caf50' }} />,
    color: '#4caf50',
  },
];

// Styled Motion Card
const TechCard = styled(motion.div)<{ color: string }>`
  text-align: center;
  padding: 24px;
  border-radius: 20px;
  cursor: pointer;
  background: ${(props) => alpha(props.color, 0.1)};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px ${(props) => alpha(props.color, 0.3)};
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const TechnologyShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 }); // ✅ Fix threshold issue

  return (
    <Box
      sx={{
        py: 10,
        background: `radial-gradient(ellipse at top left, ${alpha(
          theme.palette.primary.light,
          0.05
        )}, transparent 80%),
          radial-gradient(ellipse at bottom right, ${alpha(
            theme.palette.secondary.light,
            0.05
          )}, transparent 80%)`,
        position: 'relative',
      }}
    >
      <Container maxWidth="xl" ref={ref}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontWeight: 900,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            '&::after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '2px',
              margin: '2rem auto 0',
            },
          }}
        >
          Core Technologies
        </Typography>

        <Grid container spacing={isMobile ? 3 : 4}>
          {techIcons.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <TechCard
                color={tech.color} // ✅ Fix: Explicitly passing color
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                tabIndex={0}
                aria-label={`Learn more about ${tech.title}`}
              >
                <motion.div
                  animate={{
                    y: hoveredIndex === index ? [-2, 2, -2] : 0,
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 360 : 0, // Add rotation for dynamic effect
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    marginBottom: '10px',
                  }}
                >
                  {tech.icon}
                </motion.div>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
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
