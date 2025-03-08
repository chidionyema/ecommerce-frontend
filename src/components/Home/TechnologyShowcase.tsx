'use client';

import { Box, Container, Typography, Grid, useTheme, Button } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { SPACING } from '../../utils/sharedStyles';
import { alpha } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiReact, SiNextdotjs, SiDotnet } from 'react-icons/si';

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
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
};

// Define interface for tech items
interface TechItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  category: string;
}

// Enhanced tech icons with enterprise-focused descriptions and more detailed explanations
const enhancedTechIcons: TechItem[] = [
  {
    icon: <SiAmazonaws size={48} />,
    title: 'AWS Cloud',
    description: "Enterprise-ready infrastructure with EC2, Lambda, S3, and ECS. We've built systems that handle millions of users and petabytes of data.",
    color: '#FF9900',
    category: 'Cloud',
  },
  {
    icon: <SiMicrosoftazure size={48} />,
    title: 'Azure Services',
    description: "Comprehensive solutions with Azure DevOps, Functions, AKS, and Azure AD. Perfect for businesses with existing Microsoft ecosystems.",
    color: '#0078D4',
    category: 'Cloud',
  },
  {
    icon: <SiDocker size={48} />,
    title: 'Containerization',
    description: "Consistent, portable environments with Docker and Docker Compose. We implement best practices for security and performance.",
    color: '#2496ED',
    category: 'DevOps',
  },
  {
    icon: <SiKubernetes size={48} />,
    title: 'Kubernetes',
    description: "Production-grade container orchestration that scales from startups to enterprises. Our implementations focus on observability and resilience.",
    color: '#326CE5',
    category: 'DevOps',
  },
  {
    icon: <SiTerraform size={48} />,
    title: 'Infrastructure as Code',
    description: "Automated, version-controlled infrastructure with Terraform. We create modular, reusable components that speed up future deployments.",
    color: '#7B42BC',
    category: 'DevOps',
  },
  {
    icon: <SiReact size={48} />,
    title: 'React & Modern JS',
    description: "Component-based frontend applications built for performance and maintainability. We follow enterprise patterns for state management.",
    color: '#61DAFB',
    category: 'Frontend',
  },
  {
    icon: <SiNextdotjs size={48} />,
    title: 'Next.js',
    description: "SEO-friendly React apps with server-side rendering and static site generation. Our implementations follow the latest Next.js best practices.",
    color: '#000000',
    category: 'Frontend',
  },
  {
    icon: <SiDotnet size={48} />,
    title: '.NET Core',
    description: "Scalable, cross-platform backend systems with C# and ASP.NET. We implement clean architecture patterns developed at enterprise scale.",
    color: '#512BD4',
    category: 'Backend',
  },
];

const TechnologyShowcase = () => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [filter, setFilter] = useState('All');

  const filteredTech = filter === 'All' 
    ? enhancedTechIcons
    : enhancedTechIcons.filter(tech => tech.category === filter);

  const categories = ['All', ...new Set(enhancedTechIcons.map(tech => tech.category))];

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        width: '100%',
        py: SPACING.large * 1.5,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />
      
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{
                color: 'white',
                mb: 2,
                fontWeight: 800,
                fontSize: { xs: '2.2rem', sm: '2.7rem', md: '3.2rem' },
                letterSpacing: '-0.01em',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              }}
            >
              Enterprise-Grade Technology Stack
            </Typography>
          </motion.div>

          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography 
              variant="subtitle1"
              align="center"
              sx={{
                color: alpha(theme.palette.common.white, 0.9),
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                fontSize: '1.2rem',
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              Skip trial and error with proven technologies used by industry leaders
            </Typography>
          </motion.div>

          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mb: 5,
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "contained" : "outlined"}
                  onClick={() => setFilter(category)}
                  sx={{
                    borderColor: 'white',
                    color: filter === category ? 'white' : 'white',
                    backgroundColor: filter === category 
                      ? alpha(theme.palette.secondary.main, 0.8)
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: filter === category 
                        ? alpha(theme.palette.secondary.main, 0.9)
                        : alpha(theme.palette.common.white, 0.15),
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

          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
          >
            {filteredTech.map((tech, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                key={index}
                sx={{
                  display: 'flex',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <motion.div 
                  variants={ANIMATION_VARIANTS.item}
                  style={{ width: '100%', height: '100%' }}
                >
                  <TechCard
                    icon={tech.icon}
                    title={tech.title}
                    accentColor={tech.color}
                    category={tech.category}
                    importance={hoveredIndex === index ? 'primary' : 'secondary'}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ 
                        textAlign: 'center', 
                        mt: 2,
                        fontWeight: 500,
                        color: alpha(theme.palette.text.primary, 0.95),
                        flexGrow: 1,
                        lineHeight: 1.6,
                      }}
                    >
                      {tech.description}
                    </Typography>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box sx={{ 
              textAlign: 'center', 
              mt: 8,
            }}>
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
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
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