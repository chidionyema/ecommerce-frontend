import React, { useRef, useState, memo, useMemo } from 'react';
import { Box, Container, Typography, Grid, useTheme, Button, Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes,
  SiTerraform, SiReact, SiNextdotjs, SiDotnet
} from 'react-icons/si';
import { ANIMATIONS, getSharedStyles } from '../../utils/designSystem';

// Dynamic import with reduced SSR concerns
const TechCard = dynamic(() => import('../Common/TechCard'), { ssr: false });

// Tech items data - unchanged from original
const TECH_ITEMS = [
  {
    icon: <SiAmazonaws size={48} />,
    title: 'AWS Cloud',
    description: "Enterprise-ready infrastructure with EC2, Lambda, S3, and ECS. We've built systems that handle millions of users and petabytes of data.",
    color: '#FF9900',
    category: 'Cloud'
  },
  {
    icon: <SiMicrosoftazure size={48} />,
    title: 'Azure Services',
    description: "Comprehensive solutions with Azure DevOps, Functions, AKS, and Azure AD. Perfect for businesses with existing Microsoft ecosystems.",
    color: '#0078D4',
    category: 'Cloud'
  },
  {
    icon: <SiDocker size={48} />,
    title: 'Containerization',
    description: "Consistent, portable environments with Docker and Docker Compose. We implement best practices for security and performance.",
    color: '#2496ED',
    category: 'DevOps'
  },
  {
    icon: <SiKubernetes size={48} />,
    title: 'Kubernetes',
    description: "Production-grade container orchestration that scales from startups to enterprises. Our implementations focus on observability and resilience.",
    color: '#326CE5',
    category: 'DevOps'
  },
  {
    icon: <SiTerraform size={48} />,
    title: 'Infrastructure as Code',
    description: "Automated, version-controlled infrastructure with Terraform. We create modular, reusable components that speed up future deployments.",
    color: '#7B42BC',
    category: 'DevOps'
  },
  {
    icon: <SiReact size={48} />,
    title: 'React & Modern JS',
    description: "Component-based frontend applications built for performance and maintainability. We follow enterprise patterns for state management.",
    color: '#61DAFB',
    category: 'Frontend'
  },
  {
    icon: <SiNextdotjs size={48} />,
    title: 'Next.js',
    description: "SEO-friendly React apps with server-side rendering and static site generation. Our implementations follow the latest Next.js best practices.",
    color: '#000000',
    category: 'Frontend'
  },
  {
    icon: <SiDotnet size={48} />,
    title: '.NET Core',
    description: "Scalable, cross-platform backend systems with C# and ASP.NET. We implement clean architecture patterns developed at enterprise scale.",
    color: '#512BD4',
    category: 'Backend'
  }
];

// CTA resources data
const RESOURCE_ITEMS = [
  'Weekly technical tutorials',
  'Code snippets & templates',
  'Architecture best practices',
  'Security & performance tips'
];

// Category Button styled consistently with hero persona switcher
const CategoryButton = memo(({ category, isActive, onClick }) => {
  const theme = useTheme();
  
  return (
    <Button 
      size="small" 
      onClick={onClick}
      sx={{
        py: 1, px: 2, 
        borderRadius: 8, 
        fontSize: '0.85rem', 
        fontWeight: 500, 
        background: isActive ? alpha(theme.palette.secondary.main, 0.15) : 'transparent',
        border: `1px solid ${isActive ? theme.palette.secondary.main : alpha('#fff', 0.2)}`,
        color: isActive ? theme.palette.secondary.main : alpha('#fff', 0.8),
        '&:hover': { 
          background: isActive ? alpha(theme.palette.secondary.main, 0.2) : alpha('#fff', 0.05),
          transform: 'translateY(-2px)'
        },
        transition: 'all 0.25s cubic-bezier(0.2, 0, 0, 1)',
        textTransform: 'none',
        mx: 0.5
      }}
    >
      {category}
    </Button>
  );
});

// Blue checkmark component like in hero section
const BlueCheckmarkItem = memo(({ text }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ 
        width: 20, height: 20, borderRadius: '50%', backgroundColor: theme.palette.primary.main,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: '0.8rem', fontWeight: 'bold'
      }}>
        ✓
      </Box>
      <Typography color={theme.palette.text.primary}>{text}</Typography>
    </Box>
  );
});

// Tech Card Item with consistent hover effects
const TechCardItem = memo(({ tech, isHovered, onMouseEnter, onMouseLeave }) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    lg={3}
    sx={{ display: 'flex' }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <motion.div variants={ANIMATIONS.item} style={{ width: '100%', height: '100%' }}>
      <TechCard
        icon={tech.icon}
        title={tech.title}
        accentColor={tech.color}
        category={tech.category}
        importance={isHovered ? 'primary' : 'secondary'}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center', 
            mt: 2, 
            fontWeight: 500, 
            color: theme => alpha(theme.palette.text.primary, 0.95), 
            flexGrow: 1, 
            lineHeight: 1.6 
          }}
        >
          {tech.description}
        </Typography>
      </TechCard>
    </motion.div>
  </Grid>
));

// Set display names for debugging
CategoryButton.displayName = 'CategoryButton';
BlueCheckmarkItem.displayName = 'BlueCheckmarkItem';
TechCardItem.displayName = 'TechCardItem';

// Main component with standardized structure
const TechnologyShowcase = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [filter, setFilter] = useState('All');

  // Derived data
  const filteredTech = useMemo(() => 
    filter === 'All' ? TECH_ITEMS : TECH_ITEMS.filter(tech => tech.category === filter),
    [filter]
  );

  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(TECH_ITEMS.map(tech => tech.category)))],
    []
  );

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        position: 'relative',
        py: 10,
        background: 'linear-gradient(180deg, #18407F 0%, #1A438A 100%)', // Match hero section gradient exactly
        overflow: 'hidden'
      }}
    >
      <Container sx={styles.contentContainer}>
        <motion.div
          variants={ANIMATIONS.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header - consistent typography with hero */}
          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="h2" sx={styles.sectionTitle}>
              Enterprise-Grade <Box component="span" sx={styles.accentText}>Technology Stack</Box>
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="subtitle1" sx={styles.sectionSubtitle}>
              Leverage our experience from ASOS, Tesco, and Philip Morris to build 
              <strong> scalable, secure, and efficient</strong> technology for your business
            </Typography>
          </motion.div>

          {/* Category filters - styled like persona switcher in hero */}
          <motion.div variants={ANIMATIONS.item}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 4 }}>
              {categories.map(category => (
                <CategoryButton
                  key={category}
                  category={category}
                  isActive={filter === category}
                  onClick={() => setFilter(category)}
                />
              ))}
            </Box>
          </motion.div>

          {/* Tech cards grid */}
          <Grid container spacing={4} justifyContent="center">
            {filteredTech.map((tech, index) => (
              <TechCardItem
                key={tech.title}
                tech={tech}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              />
            ))}
          </Grid>

          {/* Strategic blue CTA resource section - styled like hero CTA card */}
          <motion.div variants={ANIMATIONS.item}>
            <Paper
              elevation={4}
              sx={styles.ctaCard}
            >
              <Typography 
                variant="h5" 
                component="h3" 
                fontWeight={700} 
                mb={1}
                align="center"
                color={theme.palette.primary.main}
              >
                Free Enterprise Resources
              </Typography>
              
              <Typography 
                variant="body1" 
                color={theme.palette.text.secondary} 
                mb={3}
                align="center"
              >
                Get access to free resources, tutorials, and code samples from our enterprise library.
              </Typography>
              
              {/* Blue CTA-style resource features with grid layout */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {RESOURCE_ITEMS.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <BlueCheckmarkItem text={item} />
                  </Grid>
                ))}
              </Grid>
              
              {/* Blue CTA-style button */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/resources"
                  sx={{
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                  }}
                >
                  Access Free Resources
                </Button>
              </Box>
            </Paper>
          </motion.div>

          {/* CTA Button - matches hero button styling */}
          <motion.div variants={ANIMATIONS.item}>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/stack"
                sx={styles.primaryButton}
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

export default memo(TechnologyShowcase);