'use client';

import React, { useRef, useState } from 'react';
import { Box, Container, Typography, Grid, useTheme, Button, Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';


// Import missing icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Dynamic import of TechCard to avoid SSR issues
const TechCard = dynamic(() => import('../Common/TechCard'), { ssr: false });

// Animation variants for consistent brand motion
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
};

// Define interface for tech items
interface TechItem {
  icon: React.ReactElement;
  title: string;
  description: string;
  color: string;
  category: string;
}

// Enhanced tech icons array
const enhancedTechIcons: TechItem[] = [
  {
    icon: <SiAmazonaws size={48} />,
    title: 'AWS Cloud',
    description:
      "Enterprise-ready infrastructure with EC2, Lambda, S3, and ECS. We've built systems that handle millions of users and petabytes of data.",
    color: '#FF9900',
    category: 'Cloud',
  },
  {
    icon: <SiMicrosoftazure size={48} />,
    title: 'Azure Services',
    description:
      "Comprehensive solutions with Azure DevOps, Functions, AKS, and Azure AD. Perfect for businesses with existing Microsoft ecosystems.",
    color: '#0078D4',
    category: 'Cloud',
  },
  {
    icon: <SiDocker size={48} />,
    title: 'Containerization',
    description:
      "Consistent, portable environments with Docker and Docker Compose. We implement best practices for security and performance.",
    color: '#2496ED',
    category: 'DevOps',
  },
  {
    icon: <SiKubernetes size={48} />,
    title: 'Kubernetes',
    description:
      "Production-grade container orchestration that scales from startups to enterprises. Our implementations focus on observability and resilience.",
    color: '#326CE5',
    category: 'DevOps',
  },
  {
    icon: <SiTerraform size={48} />,
    title: 'Infrastructure as Code',
    description:
      "Automated, version-controlled infrastructure with Terraform. We create modular, reusable components that speed up future deployments.",
    color: '#7B42BC',
    category: 'DevOps',
  },
  {
    icon: <SiReact size={48} />,
    title: 'React & Modern JS',
    description:
      "Component-based frontend applications built for performance and maintainability. We follow enterprise patterns for state management.",
    color: '#61DAFB',
    category: 'Frontend',
  },
  {
    icon: <SiNextdotjs size={48} />,
    title: 'Next.js',
    description:
      "SEO-friendly React apps with server-side rendering and static site generation. Our implementations follow the latest Next.js best practices.",
    color: '#000000',
    category: 'Frontend',
  },
  {
    icon: <SiDotnet size={48} />,
    title: '.NET Core',
    description:
      "Scalable, cross-platform backend systems with C# and ASP.NET. We implement clean architecture patterns developed at enterprise scale.",
    color: '#512BD4',
    category: 'Backend',
  },
];

// Import additional icons from react-icons (if needed)
import {
  SiAmazonaws,
  SiMicrosoftazure,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiReact,
  SiNextdotjs,
  SiDotnet,
} from 'react-icons/si';

// Feature item component
const FeatureItem: React.FC<{ icon: React.ElementType; text: string }> = ({ icon: Icon, text }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="flex-start" gap={2} my={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderRadius: '16px',
          width: 40,
          height: 40,
          minWidth: 40,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        <Icon sx={{ fontSize: 24, color: theme.palette.primary.main, transform: 'rotate(-10deg)' }} />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

// Extra feature item with check mark
const ExtraFeatureItem: React.FC<{ text: string }> = ({ text }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="flex-start" gap={1.5} my={1.5}>
      <CheckCircleIcon
        fontSize="small"
        sx={{
          color: theme.palette.success.main,
          mt: 0.5,
        }}
      />
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

// Function to render a plan card (simplified for brevity)
const renderPlanCard = (
  plan: TechItem,
  handlePlanClick: (type: string) => void,
  theme: any,
  isAnnual: boolean
) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      key={plan.title}
    >
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          p: 3,
          borderRadius: 4,
          position: 'relative',
          background: theme.palette.mode === 'light' ? 'white' : '#28282a',
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            {plan.title}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {plan.description}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePlanClick(plan.title)}
            sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Select {plan.title}
          </Button>
        </Box>
      </Paper>
    </motion.div>
  </Box>
);

const TechnologyShowcase: React.FC = () => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [filter, setFilter] = useState('All');

  const filteredTech = filter === 'All'
    ? enhancedTechIcons
    : enhancedTechIcons.filter(tech => tech.category === filter);

  const categories = ['All', ...new Set(enhancedTechIcons.map(tech => tech.category))];

  const handlePlanClick = (type: string) => {
    // Navigate or perform any action based on the plan clicked.
    console.log(`Plan clicked: ${type}`);
  };

  const handleFaqChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    // For FAQ expansion if needed
  };

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        width: '100%',
        py: 8,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'url("/images/grid-pattern.svg")',
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography variant="h2" align="center" gutterBottom sx={{ color: 'white', fontWeight: 800 }}>
              Enterprise-Grade Technology Stack
            </Typography>
          </motion.div>

          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 4 }}>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? 'contained' : 'outlined'}
                  onClick={() => setFilter(category)}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: filter === category ? alpha(theme.palette.secondary.main, 0.8) : 'transparent',
                    '&:hover': {
                      backgroundColor: filter === category ? alpha(theme.palette.secondary.main, 0.9) : alpha(theme.palette.common.white, 0.15),
                      transform: 'translateY(-2px)',
                    },
                    fontWeight: 600,
                    borderRadius: 10,
                    px: 3,
                    py: 1,
                    mx: 0.5,
                    transition: 'all 0.2s ease',
                    textTransform: 'none',
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {filteredTech.map((tech, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
                sx={{ display: 'flex' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <motion.div variants={ANIMATION_VARIANTS.item} style={{ width: '100%', height: '100%' }}>
                  <TechCard
                    icon={tech.icon}
                    title={tech.title}
                    accentColor={tech.color}
                    category={tech.category}
                    importance={hoveredIndex === index ? 'primary' : 'secondary'}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, fontWeight: 500, color: alpha(theme.palette.text.primary, 0.95), flexGrow: 1, lineHeight: 1.6 }}>
                      {tech.description}
                    </Typography>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/stack"
                sx={{
                  px: 5,
                  py: 1.6,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}, 0 2px 6px rgba(0, 0, 0, 0.3)`,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.7)}, 0 4px 10px rgba(0, 0, 0, 0.4)`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Explore Our Full Technology Stack
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TechnologyShowcase;
