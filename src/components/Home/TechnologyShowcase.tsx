import React, { useRef, useState, memo, useMemo } from 'react';
import { Box, Container, Typography, Grid, useTheme, Button, Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes,
  SiTerraform, SiReact, SiNextdotjs, SiDotnet
} from 'react-icons/si';

// Dynamic import with reduced SSR concerns
const TechCard = dynamic(() => import('../Common/TechCard'), { ssr: false });

// Simplified animation variants
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }
};

// Tech items data
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

// CTA resources data - styled with blue from CTA card
const RESOURCE_ITEMS = [
  'Weekly technical tutorials',
  'Code snippets & templates',
  'Architecture best practices',
  'Security & performance tips'
];

// Sub-components with reduced complexity
const FeatureItem = memo(({ icon: Icon, text }) => (
  <Box display="flex" alignItems="flex-start" gap={2} my={2}>
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
      borderRadius: '16px',
      width: 40, 
      height: 40, 
      minWidth: 40,
      border: theme => `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
    }}>
      <Icon sx={{ 
        fontSize: 24, 
        color: theme => theme.palette.primary.main, 
        transform: 'rotate(-10deg)' 
      }} />
    </Box>
    <Typography variant="body2" color="text.secondary">{text}</Typography>
  </Box>
));

const ExtraFeatureItem = memo(({ text }) => (
  <Box display="flex" alignItems="flex-start" gap={1.5} my={1.5}>
    <CheckCircleIcon
      fontSize="small"
      sx={{ color: theme => theme.palette.success.main, mt: 0.5 }}
    />
    <Typography variant="body2" color="text.secondary">{text}</Typography>
  </Box>
));

const PlanCard = memo(({ plan, handlePlanClick }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
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
          background: theme => theme.palette.mode === 'light' ? 'white' : '#28282a',
          border: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>{plan.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>{plan.description}</Typography>
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
));

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
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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

const CategoryButton = memo(({ category, isActive, onClick }) => (
  <Button
    variant={isActive ? 'contained' : 'outlined'}
    onClick={onClick}
    sx={{
      borderColor: 'white',
      color: 'white',
      backgroundColor: theme => isActive ? alpha(theme.palette.secondary.main, 0.8) : 'transparent',
      '&:hover': {
        backgroundColor: theme => isActive ? 
          alpha(theme.palette.secondary.main, 0.9) : 
          alpha(theme.palette.common.white, 0.15),
        transform: 'translateY(-2px)'
      },
      fontWeight: 600,
      borderRadius: 10,
      px: 3,
      py: 1,
      mx: 0.5,
      transition: 'all 0.2s ease',
      textTransform: 'none'
    }}
  >
    {category}
  </Button>
));

// Blue CTA-style checkmark component - styled like the CTA card
const BlueCheckmarkItem = memo(({ text }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5,
        mb: 1.5
      }}
    >
      <Box 
        sx={{ 
          width: 20, 
          height: 20, 
          borderRadius: '50%', 
          backgroundColor: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}
      >
        ✓
      </Box>
      <Typography color="white">{text}</Typography>
    </Box>
  );
});

// Set display names for debugging
FeatureItem.displayName = 'FeatureItem';
ExtraFeatureItem.displayName = 'ExtraFeatureItem';
PlanCard.displayName = 'PlanCard';
TechCardItem.displayName = 'TechCardItem';
CategoryButton.displayName = 'CategoryButton';
BlueCheckmarkItem.displayName = 'BlueCheckmarkItem';

// Main component with simplified structure
const TechnologyShowcase = () => {
  const theme = useTheme();
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
        width: '100%',
        py: 8,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
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
          backgroundImage: 'url("/images/grid-pattern.svg")',
          willChange: 'transform'
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={ANIMATIONS.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="h2" align="center" gutterBottom sx={{ color: 'white', fontWeight: 800 }}>
              Enterprise-Grade Technology Stack
            </Typography>
          </motion.div>

          {/* Category filters */}
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

          {/* Strategic blue CTA resource section - styled like the blue CTA card */}
          <motion.div variants={ANIMATIONS.item}>
            <Paper
              elevation={4}
              sx={{
                mt: 6,
                mb: 6,
                mx: 'auto',
                maxWidth: '800px',
                p: 4,
                borderRadius: 3,
                background: alpha(theme.palette.background.paper, 0.95),
                backdropFilter: 'blur(10px)',
                boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.2)}`,
                border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
              }}
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
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
                        mb: 1.5
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          backgroundColor: theme.palette.primary.main,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}
                      >
                        ✓
                      </Box>
                      <Typography color={theme.palette.text.primary}>{item}</Typography>
                    </Box>
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

          {/* CTA Button */}
          <motion.div variants={ANIMATIONS.item}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
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
                    boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.7)}, 0 4px 10px rgba(0, 0, 0, 0.4)`
                  },
                  transition: 'all 0.3s ease'
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

export default memo(TechnologyShowcase);