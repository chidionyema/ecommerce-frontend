'use client';
import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { ProjectCardBackground } from '../../theme/themes';
import {
  Cloud,
  Lock,
  Database,
  Cpu,
  Zap,
  Server,
  PieChart,
  Smartphone,
} from 'react-feather';

const techIcons = [
  {
    id: 1,
    title: 'Cloud Computing',
    icon: <Cloud size={32} strokeWidth={1.5} color="#673ab7" />, // Reduced icon size
    color: '#673ab7',
  },
  {
    id: 2,
    title: 'Security & Encryption',
    icon: <Lock size={32} strokeWidth={1.5} color="#f44336" />, // Reduced icon size
    color: '#f44336',
  },
  {
    id: 3,
    title: 'Data Storage & Management',
    icon: <Database size={32} strokeWidth={1.5} color="#2196f3" />, // Reduced icon size
    color: '#2196f3',
  },
  {
    id: 4,
    title: 'API Development',
    icon: <Cpu size={32} strokeWidth={1.5} color="#4caf50" />, // Reduced icon size
    color: '#4caf50',
  },
  {
    id: 5,
    title: 'Artificial Intelligence',
    icon: <Zap size={32} strokeWidth={1.5} color="#ff9800" />, // Reduced icon size
    color: '#ff9800',
  },
  {
    id: 6,
    title: 'Web & Mobile Development',
    icon: <Smartphone size={32} strokeWidth={1.5} color="#009688" />, // Reduced icon size
    color: '#009688',
  },
  {
    id: 7,
    title: 'High Performance Computing',
    icon: <Server size={32} strokeWidth={1.5} color="#ff5722" />, // Reduced icon size
    color: '#ff5722',
  },
  {
    id: 8,
    title: 'Big Data & Analytics',
    icon: <PieChart size={32} strokeWidth={1.5} color="#3f51b5" />, // Reduced icon size
    color: '#3f51b5',
  },
];

const TechCard = styled(motion.div)<{ color: string }>`
  text-align: center;
  padding: 20px; // Reduced padding
  border-radius: 12px; // Reduced border-radius
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid transparent;

  ${(props) => {
    const theme = props.theme as Theme;
    const background = theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.05)';
    return `background: ${background};`;
  }}

  &:hover {
    transform: scale(1.03); // Reduced scale on hover
    box-shadow: 0 8px 24px ${(props) => props.color}; // Reduced box-shadow on hover
    border: 1px solid ${(props) => props.color};

    ${(props) => {
      const theme = props.theme as Theme;
      const hoverBackground = theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)';
      return `background: ${hoverBackground};`;
    }}
  }

  @media (max-width: 768px) {
    padding: 12px; // Reduced padding for mobile
  }
`;

export const TechnologyShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <ProjectCardBackground
      sx={{
        py: 8, // Reduced vertical padding
      }}
    >
      <Box sx={{ py: { xs: 8, md: 12 } }}> {/* Reduced vertical padding */}
        <Container maxWidth="xl" ref={ref}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 900,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Reduced font sizes
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&::after': {
                content: '""',
                display: 'block',
                width: '60px', // Reduced width
                height: '3px', // Reduced height
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px',
                margin: '1rem auto 0', // Reduced margin-top
              },
            }}
          >
            Core Technologies
          </Typography>

          <Grid container spacing={isMobile? 2: 3}> {/* Reduced spacing */}
            {techIcons.map((tech, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
                <TechCard
                  color={tech.color}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView? { opacity: 1, y: 0 }: {}}
                  transition={{ delay: index * 0.1, ease: 'easeInOut' }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  tabIndex={0}
                  aria-label={`Learn more about ${tech.title}`}
                >
                  <motion.div
                    animate={{
                      y: hoveredIndex === index? [-2, 2, -2]: 0,
                      scale: hoveredIndex === index? 1.1: 1,
                      rotate: hoveredIndex === index? [0, 5, -5, 0]: 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      marginBottom: '12px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {tech.icon}
                  </motion.div>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      fontSize: '0.9rem', // Reduced font size
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
    </ProjectCardBackground>
  );
};