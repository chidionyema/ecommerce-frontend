// ProjectCard.tsx - Modified to fix technology icons and CTA visibility
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CardContent, Chip, Tooltip, useTheme, alpha, Collapse, Grid, Skeleton, Badge } from '@mui/material';
import { ArrowRightAlt, ExpandMore, ExpandLess, Star, TouchApp } from '@mui/icons-material';
import GoldCard from '../../GoldCard';
import { Code } from 'lucide-react';
import { GradientButton } from '../../../components/GradientButton';
import { motion } from 'framer-motion';
import { createStyles, CARD_SIZES, hexToRgb } from './ProjectCardStyles';

// Simple Project type (only what's needed)
export interface Project {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType | null;
  iconColor?: string;
  clientName: string;
  metrics: { value: string; label: string }[];
  technologies: string[];
  featured?: boolean;
  imageUrl?: string;
  brandColor?: string;
  tags?: string[];
  background?: string; // For gradient background
}

interface ProjectCardProps {
  project: Project;
  sx?: any;
  gridSpacing?: number;
  delay?: number;
}

interface ProjectGridProps {
  projects: Project[];
  spacing?: number;
  animate?: boolean;
}

// Main component with focus on marketing and presentation
const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  sx,
  gridSpacing = 4,
  delay = 0
}) => {
  const theme = useTheme();
  const cardRef = useRef<HTMLDivElement>(null); 
  const { width: CARD_WIDTH, height: CARD_HEIGHT } = CARD_SIZES.xlarge;
  const DefaultIcon = Code;
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  
  // Use correct default image path
  const imageUrl = project.imageUrl || '/images/istockphoto-todo.jpg';
  
  // Get all styles from the style creator function
  const styles = createStyles(theme);
  
  // Custom brand colors with fallback to theme colors
  const brandColor = project.brandColor || theme.palette.primary.main;
  const brandColorLight = alpha(brandColor, 0.2);
  
  // CSS variable for animations
  useEffect(() => {
    if (cardRef.current) {
      const rgbColor = hexToRgb(brandColor);
      cardRef.current.style.setProperty('--primary-rgb', rgbColor);
    }
  }, [brandColor]);

  // Progressive loading with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
            observer.disconnect();
          }, delay * 100);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);
  
  // Handle image loading - with better fallback handling
  useEffect(() => {
    // Always show loading state briefly for UX consistency
    const timer = setTimeout(() => {
      // If using a background gradient with no image, just mark as loaded
      if (project.background && !project.imageUrl) {
        setImageLoaded(true);
        return;
      }
      
      // If we have an image URL, try to load it
      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setImageLoaded(true);
        img.onerror = () => {
          console.error(`Failed to load image: ${imageUrl}`);
          setImageLoaded(true); // Still mark as loaded to avoid endless loading state
        };
      } else {
        // No image or background, just mark as loaded
        setImageLoaded(true);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [imageUrl, project.background]);

  // Handle card expansion
  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // A helper function to safely render the project icon
  const renderIcon = () => {
    try {
      if (project.icon) {
        return <project.icon size={24} color={project.iconColor || brandColor} />;
      }
      return <DefaultIcon size={24} color={brandColor} />;
    } catch (error) {
      console.error('Error rendering icon:', error);
      return <DefaultIcon size={24} color={brandColor} />;
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ 
      p: 2.5,
      display: 'flex', 
      justifyContent: 'center',
      mx: 'auto',
      my: 2 
    }}>
      {/* Main card container with animations */}
      <Box 
        ref={cardRef}
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: delay * 0.1
        }}
        sx={styles.cardContainer(hovering, brandColor)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* "Explore Case Study" badge - Always visible now */}
        <Badge
          badgeContent={
            <Box
              component={motion.div}
              initial={{ opacity: 0.9, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              sx={{
                ...styles.badgeContent(brandColor),
                opacity: 1, // Always visible
              }}
            >
              <TouchApp sx={{ fontSize: '1.1rem', mr: 0.7 }} />
              Explore Case Study
            </Box>
          }
          sx={{
            ...styles.badge(hovering),
            opacity: 1, // Always visible
          }}
        >
          {/* Card component */}
          <GoldCard
            href={`/projects/${project.id}`}
            sx={{
              ...styles.card(hovering, expanded, CARD_HEIGHT, project.featured, brandColor),
              ...sx
            }}
          >
            {/* Featured badge */}
            {project.featured && (
              <Box
                component={motion.div}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={styles.featuredBadge}
              >
                <Star sx={{ fontSize: '1.2rem' }} />
                <Typography variant="caption" fontWeight={800} sx={{ fontSize: '0.9rem' }}>
                  Featured Project
                </Typography>
              </Box>
            )}

            {/* Image section */}
            <Box sx={styles.imageContainer(hovering)}>
              {/* Loading state */}
              {!imageLoaded && (
                <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height="100%" 
                    animation="wave"
                    sx={{ 
                      bgcolor: alpha(brandColor, 0.15),
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }} 
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1.5,
                      zIndex: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: `3px solid ${alpha(brandColor, 0.2)}`,
                        borderTop: `3px solid ${brandColor}`,
                        animation: 'spin 1s linear infinite',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' },
                        }
                      }}
                    />
                    <Typography variant="caption" sx={{ color: brandColor, fontWeight: 600 }}>
                      Loading project...
                    </Typography>
                  </Box>
                </Box>
              )}
              
              {/* Background container */}
              {imageLoaded && (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    background: project.background || 'transparent',
                    filter: hovering ? 'contrast(1.1) brightness(1.05)' : 'contrast(1.05) brightness(0.95)',
                    transition: 'filter 0.5s ease',
                  }}
                >
                  {/* If no background gradient is specified, use the image */}
                  {!project.background && (
                    <Box
                      component="img"
                      src={imageUrl}
                      alt={project.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.7s ease-in-out',
                        transform: hovering ? 'scale(1.08)' : 'scale(1.01)',
                      }}
                    />
                  )}
                </Box>
              )}
              
              {/* Client info */}
              <Box sx={styles.clientInfoBox}>
                <Box
                  component={motion.div}
                  whileHover={{ rotate: [0, -10, 0, 10, 0], transition: { duration: 0.5 } }}
                  sx={styles.iconBox(hovering, brandColor)}
                >
                  {renderIcon()}
                </Box>
                <Typography 
                  variant="body1" 
                  fontWeight={800} 
                  component={motion.div}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={{ 
                    fontSize: '1.1rem',
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                    letterSpacing: '0.4px',
                  }}
                >
                  {project.clientName}
                </Typography>
              </Box>
            </Box>

            {/* Content section */}
            <CardContent sx={styles.cardContent}>
              {/* Project title */}
              <Typography
                variant="h5"
                component={motion.h2}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                sx={styles.projectTitle(hovering, brandColor)}
              >
                {project.name}
              </Typography>

              {/* Key metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <Box 
                  component={motion.div}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={styles.metricsBox(hovering, brandColor)}
                >
                  {project.metrics.slice(0, 3).map((metric, index) => (
                    <Tooltip 
                      key={index} 
                      title={metric.label} 
                      arrow 
                      placement="top"
                      enterDelay={500}
                    >
                      <Box 
                        component={motion.div}
                        whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                        sx={styles.metricItem(hovering, index)}
                      >
                        <Typography 
                          variant="h6" 
                          sx={styles.metricValue(brandColor)}
                        >
                          {metric.value}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary" 
                          sx={{ 
                            fontSize: '0.82rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.8px',
                            mt: 1,
                            fontWeight: 600,
                          }}
                        >
                          {metric.label.split(' ')[0]}
                        </Typography>
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              )}

              {/* Technology stack - Updated to always show technology chips */}
              <Box 
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={{
                  mt: 2.5,
                  p: 1.5,
                  borderRadius: theme.shape.borderRadius,
                  bgcolor: alpha(brandColor, 0.08),
                  border: `1px solid ${alpha(brandColor, 0.12)}`,
                  position: 'relative',
                  display: 'block', // Always display
                  opacity: 1, // Full opacity
                  visibility: 'visible'
                }}
              >
                <Typography 
                  variant="caption" 
                  fontWeight={700} 
                  display="block" 
                  mb={1.5}
                  sx={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    fontSize: '0.78rem',
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: brandColor,
                      display: 'inline-block',
                      boxShadow: `0 0 8px ${alpha(brandColor, 0.5)}`,
                    }}
                  />
                  Technology Stack
                </Typography>
                
                <Box sx={{
                  ...styles.techContainer(expanded, brandColorLight),
                  // Override any styles that might hide this based on hover
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  opacity: 1,
                  visibility: 'visible',
                }}>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      component={motion.div}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
                      size="small"
                      sx={{
                        ...styles.techChip(brandColor),
                        display: 'inline-flex', // Always visible
                        opacity: 1, // Full opacity
                      }}
                    />
                  ))}
                </Box>
                
                {/* Expand/collapse toggle */}
                {project.technologies.length > 5 && (
                  <Box
                    onClick={toggleExpand}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={styles.expandButton(brandColor)}
                  >
                    {expanded ? (
                      <>
                        <ExpandLess sx={{ fontSize: '1.2rem' }} />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ExpandMore sx={{ fontSize: '1.2rem' }} />
                        Show All ({project.technologies.length}) Technologies
                      </>
                    )}
                  </Box>
                )}
              </Box>

              {/* Project description */}
              <Box
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Collapse in={expanded} timeout="auto">
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={styles.description}
                  >
                    {project.description || 'No description available'}
                  </Typography>
                </Collapse>
                
                {!expanded && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={styles.truncatedDescription}
                  >
                    {project.description || 'No description available'}
                  </Typography>
                )}
              </Box>

              {/* CTA button - Updated to always be visible */}
              <Box
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                sx={{
                  display: 'flex',
                  mt: 'auto',
                  pt: 1.8,
                  justifyContent: 'center',
                  width: '100%',
                  position: 'relative',
                  opacity: 1, // Always visible
                }}
              >
                {/* Floating elements for visual interest */}
                <Box sx={styles.floatingElement1(brandColor)} />
                <Box sx={styles.floatingElement2(theme.palette.secondary.main)} />
                
                <GradientButton
                  href={`/projects/${project.id}`}
                  label="View Case Study"
                  endIcon={
                    <ArrowRightAlt 
                      sx={{ 
                        transition: 'transform 0.4s ease',
                        transform: hovering ? 'translateX(6px)' : 'translateX(0)',
                        fontSize: '1.4rem',
                      }} 
                    />
                  }
                  sizeVariant="medium"
                  sx={{
                    ...styles.ctaButton(hovering, brandColor),
                    opacity: 1, // Always visible
                    visibility: 'visible', // Ensure it's always visible
                    transform: 'translateY(0)', // Prevent any transform that might hide it
                  }}
                />
              </Box>
            </CardContent>
          </GoldCard>
        </Badge>
      </Box>
    </Grid>
  );
};

// Grid component to display multiple projects
export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects,
  spacing = 4,
  animate = true,
}) => {
  const theme = useTheme();
  
  return (
    <Grid 
      container 
      spacing={spacing}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        mt: 3,
        mb: 5,
        width: '100%',
        '& > .MuiGrid-item': {
          paddingTop: '0 !important',
          padding: theme.spacing(spacing / 2)
        }
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          gridSpacing={spacing}
          delay={animate ? index : 0}
        />
      ))}
    </Grid>
  );
};

// Preview component for testing
export const ProjectCardPreview = () => {
  const theme = useTheme();
  
  const sampleProject: Project = {
    id: 'sample-project',
    name: 'AI-Powered Portfolio Analytics Dashboard',
    description: 'Developed a comprehensive analytics platform for financial portfolio management with real-time data processing, advanced visualization, and AI-driven insights to optimize investment strategies.',
    icon: Code,
    iconColor: '#4A90E2',
    clientName: 'FinTech Innovations',
    metrics: [
      { value: '67%', label: 'Performance Increase' },
      { value: '12M', label: 'Data Points Processed' },
      { value: '3.2s', label: 'Response Time' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'TensorFlow', 'AWS', 'Material UI', 'D3.js'],
    featured: true,
    imageUrl: '/images/istockphoto-todo.jpg',  // Updated to use the correct image path
    brandColor: '#4A90E2',
    // Example of using a gradient background - commented out to show the image
    // background: 'linear-gradient(135deg, #1a237e, #283593)'
  };

  return (
    <Box sx={{ p: 4, bgcolor: alpha(theme.palette.background.default, 0.6) }}>
      <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 4, textAlign: 'center' }}>
        Project Card Preview
      </Typography>
      <ProjectCard project={sampleProject} />
    </Box>
  );
};

export default ProjectCard;