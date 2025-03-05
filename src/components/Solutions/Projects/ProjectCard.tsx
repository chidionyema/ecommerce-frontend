import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  CardContent,
  Chip,
  Tooltip,
  useTheme,
  alpha,
  keyframes,
  Collapse,
  Grid,
  Skeleton,
  Badge,
} from '@mui/material';
import { ArrowRightAlt, ExpandMore, ExpandLess, Info, Star, TouchApp } from '@mui/icons-material';
import GoldCard from '../../GoldCard';
import { Code } from 'lucide-react';
import { GradientButton } from '../../../components/GradientButton';
import { motion } from 'framer-motion'; // For ultra-modern animations
import { useRouter } from 'next/router';
// Enhanced animations
const shineAnimation = keyframes`
  0% { left: -100%; }
  20% { left: 100%; }
  100% { left: 100%; }
`;


const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Improved glowing effect
const glowAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5), 0 0 20px rgba(var(--primary-rgb), 0.3); }
  50% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.8), 0 0 40px rgba(var(--primary-rgb), 0.5); }
  100% { box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5), 0 0 20px rgba(var(--primary-rgb), 0.3); }
`;

// Optimized card sizes with responsive values
const CARD_SIZES = {
  xlarge: {
    width: { xs: '320px', sm: '340px', md: '360px' },
    height: { xs: '460px', sm: '470px', md: '480px' },
  }
};

// Enhanced spacing system for better visual hierarchy
const SPACING = {
  xsmall: 0.75,
  small: 1.5,
  medium: 2.5,
  large: 3.5,
  xlarge: 5,
};

// Type definitions
interface Project {
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
  brandColor?: string; // Added for brand cohesion
}

interface ProjectCardProps {
  project: Project;
  sx?: any;
  gridSpacing?: number;
  delay?: number; // For staggered animations
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  sx,
  gridSpacing = 4, // Increased default spacing
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
  
  // Custom brand colors with fallback to theme colors
  const brandColor = project.brandColor || theme.palette.primary.main;
  const brandColorLight = alpha(brandColor, 0.2);
  const brandColorMedium = alpha(brandColor, 0.5);
  
  // CSS variable for animations
  useEffect(() => {
    if (cardRef.current) {
      const rgbColor = hexToRgb(brandColor);
      cardRef.current.style.setProperty('--primary-rgb', rgbColor);
    }
  }, [brandColor, cardRef]);

  // Progressive loading with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add slight delay for staggered effect
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
  
  // Handle image loading with progress tracking
  useEffect(() => {
    if (project.imageUrl) {
      const img = new Image();
      img.src = project.imageUrl || '/images/istockphoto-todo.jpg';
      img.onload = () => setImageLoaded(true);
    } else {
      setImageLoaded(true);
    }
  }, [project.imageUrl]);
  
  const router = useRouter();

  // Handle card expansion
  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // Convert hex to rgb for CSS variables
  const hexToRgb = (hex: string) => { // Add parameter type
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '75, 123, 236';
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ 
      p: SPACING.medium,
      display: 'flex', 
      justifyContent: 'center',
      mx: 'auto',
      my: 2 
    }}>
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
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%',
          width: '100%',
          transform: hovering ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: hovering ? `${floatAnimation} 4s ease-in-out infinite` : 'none',
          cursor: 'pointer',
          position: 'relative',
          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))',
          '--primary-rgb': hexToRgb(brandColor),
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Improved clickable indicator that appears on hover */}
        <Badge
          badgeContent={
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={hovering ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: alpha(brandColor, 0.95),
                color: '#fff',
                px: 1.8,
                py: 0.8,
                borderRadius: '30px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                boxShadow: `0 2px 15px ${alpha(theme.palette.common.black, 0.35)}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <TouchApp sx={{ fontSize: '1.1rem', mr: 0.7 }} />
              Explore Case Study
            </Box>
          }
          sx={{
            '& .MuiBadge-badge': {
              top: 25,
              right: 25,
              opacity: hovering ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: 20,
            },
          }}
        >
          <GoldCard
            href={`/projects/${project.id}`}
            sx={{
              width: CARD_WIDTH,
              height: expanded ? 'auto' : CARD_HEIGHT,
              p: 2,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer !important',
        // Add pointer event prioritization
              '& *': {
                pointerEvents: 'none !important'
              },
              '& a, & button': {
                pointerEvents: 'all !important'
              },
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: hovering 
                ? `0 25px 50px -10px ${alpha(theme.palette.common.black, 0.3)}, 0 10px 20px -5px ${alpha(theme.palette.common.black, 0.2)}`
                : `0 8px 20px -5px ${alpha(theme.palette.common.black, 0.15)}`,
              borderRadius: '24px',
              animation: project.featured 
                ? `${glowAnimation} 3s infinite ease-in-out` 
                : 'none',
              '&:hover': {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '70%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, ${alpha(
                    theme.palette.common.white,
                    0.35
                  )}, transparent)`,
                  transform: 'skewX(-25deg)',
                  animation: `${shineAnimation} 1.5s ease-in-out`,
                  zIndex: 1,
                },
              },
              border: project.featured ? `1px solid ${alpha(brandColor, 0.3)}` : 'none',
              maxWidth: '100%',
              mx: 'auto',
              ...sx,
            }}
          >
            {/* Enhanced featured badge */}
            {project.featured && (
              <Box
                component={motion.div}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  zIndex: 10,
                  background: `linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 180, 0, 0.95))`,
                  color: '#000',
                  borderRadius: '30px',
                  px: 2.2,
                  py: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                  boxShadow: `0 4px 15px ${alpha(theme.palette.common.black, 0.3)}`,
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Star sx={{ fontSize: '1.2rem' }} />
                <Typography variant="caption" fontWeight={800} sx={{ fontSize: '0.9rem' }}>
                  Featured Project
                </Typography>
              </Box>
            )}

            {/* Enhanced Header with Image & Client Info */}
            <Box
              sx={{
                height: '40%',
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: hovering 
                    ? 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.65))' 
                    : 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.75))',
                  transition: 'all 0.5s ease',
                  zIndex: 1,
                }
              }}
            >
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
                  {/* Loading indicator */}
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
                        animation: `spin 1s linear infinite`,
                        '@keyframes spin': {
                          '0%': {
                            transform: 'rotate(0deg)',
                          },
                          '100%': {
                            transform: 'rotate(360deg)',
                          },
                        },
                      }}
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: brandColor,
                        fontWeight: 600 
                      }}
                    >
                      Loading project...
                    </Typography>
                  </Box>
                </Box>
              )}
              
              {imageLoaded && (
                <Box
                  component={motion.img}
                  initial={{ scale: 1.1, filter: 'blur(10px)' }}
                  animate={{ scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8 }}
                  src={project.imageUrl || "/images/istockphoto-todo.jpg"}
                  alt={project.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    filter: hovering ? 'contrast(1.1) brightness(1.05)' : 'contrast(1.05) brightness(0.95)',
                    transition: 'transform 0.7s ease-in-out, filter 0.5s ease',
                    transform: hovering ? 'scale(1.08)' : 'scale(1.01)',
                  }}
                />
              )}
              
              {/* Client info with brand color integration */}
              <Box 
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2.8,
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  zIndex: 2,
                }}
              >
                <Box
                  component={motion.div}
                  whileHover={{ 
                    rotate: [0, -10, 0, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.background.paper, 0.85),
                    p: 1.3,
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${alpha(brandColor, 0.6)}`,
                    boxShadow: `0 5px 15px ${alpha(theme.palette.common.black, 0.25)}`,
                    transition: 'all 0.4s ease',
                    transform: hovering ? 'scale(1.15)' : 'scale(1)',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.85)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                  }}
                >
                  {project.icon ? (
                    <project.icon
                      size={24}
                      color={project.iconColor || brandColor}
                    />
                  ) : (
                    <DefaultIcon size={24} color={brandColor} />
                  )}
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

            {/* Main Content */}
            <CardContent
              sx={{
                px: 3.8,
                py: 3.5,
                height: '60%',
                display: 'flex',
                flexDirection: 'column',
                '&:last-child': { pb: 3.5 },
                position: 'relative',
                zIndex: 2,
                bgcolor: alpha(theme.palette.background.paper, 0.98),
              }}
            >
              {/* Project Title with brand accent */}
              <Typography
                variant="h5"
                component={motion.h2}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                fontWeight={800}
                sx={{ 
                  fontSize: '1.7rem', 
                  mb: SPACING.medium,
                  lineHeight: 1.2,
                  position: 'relative',
                  display: 'inline-block',
                  color: theme.palette.text.primary,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: -12,
                    width: hovering ? '90px' : '60px',
                    height: '5px',
                    background: `linear-gradient(90deg, ${brandColor}, ${theme.palette.secondary.main})`,
                    borderRadius: '3px',
                    transition: 'width 0.4s ease',
                  }
                }}
              >
                {project.name}
              </Typography>

              {/* Enhanced Metrics Display with brand colors */}
              {project.metrics && (
                <Box 
                  component={motion.div}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 2.8,
                    mb: SPACING.medium,
                    background: alpha(theme.palette.background.default, 0.7),
                    p: 2.2,
                    borderRadius: 3.5,
                    border: `1px solid ${alpha(brandColor, 0.15)}`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: `inset 0 0 15px ${alpha(brandColor, 0.08)}`,
                    transition: 'all 0.4s ease',
                    transform: hovering ? 'translateY(-3px)' : 'translateY(0)',
                  }}
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
                        whileHover={{ 
                          scale: 1.08,
                          transition: { duration: 0.2 }
                        }}
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center',
                          flex: 1,
                          p: 1,
                          transition: 'all 0.4s ease',
                          transform: hovering ? 'scale(1.05)' : 'scale(1)',
                          position: 'relative',
                          '&::after': index < 2 ? {
                            content: '""',
                            position: 'absolute',
                            right: -10,
                            top: '25%',
                            height: '50%',
                            width: '1px',
                            background: alpha(theme.palette.divider, 0.5),
                          } : {},
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          fontWeight={800} 
                          sx={{ 
                            fontSize: '1.45rem',
                            lineHeight: 1.2,
                            background: `linear-gradient(90deg, ${brandColor}, ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
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

              {/* Ultra-modern Technologies display */}
              <Box 
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={{ 
                  mb: SPACING.medium, 
                  p: 2.2,
                  borderRadius: 3,
                  background: hovering 
                    ? alpha(brandColorLight, 0.7)
                    : alpha(brandColorLight, 0.4),
                  border: `1px solid ${alpha(brandColor, 0.25)}`,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${brandColor}, transparent)`,
                    zIndex: 1,
                  },
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
                      boxShadow: `0 0 8px ${brandColorMedium}`,
                    }}
                  />
                  Technology Stack
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1.2, 
                  flexWrap: 'wrap',
                  maxHeight: expanded ? '300px' : '70px',
                  overflow: expanded ? 'visible' : 'hidden',
                  transition: 'max-height 0.5s ease',
                  position: 'relative',
                  '&::after': !expanded ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '25px',
                    background: `linear-gradient(to top, ${alpha(brandColorLight, 0.9)}, transparent)`,
                    pointerEvents: 'none',
                  } : {},
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
                        height: '32px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        mb: 1,
                        background: `linear-gradient(120deg, ${alpha(brandColor, 0.15)}, ${alpha(brandColor, 0.25)})`,
                        border: `1px solid ${alpha(brandColor, 0.35)}`,
                        '&:hover': {
                          transform: 'translateY(-3px) scale(1.05)',
                          boxShadow: `0 5px 15px ${alpha(brandColor, 0.3)}`,
                          background: `linear-gradient(120deg, ${alpha(brandColor, 0.25)}, ${alpha(brandColor, 0.4)})`,
                        },
                        '& .MuiChip-label': { 
                          px: 1.8,
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                        } 
                      }}
                    />
                  ))}
                </Box>
                
                {/* Show more/less toggle for technologies */}
                {project.technologies.length > 5 && (
                  <Box
                    onClick={toggleExpand}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mt: 1.5,
                      gap: 0.8,
                      cursor: 'pointer',
                      color: brandColor,
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      borderRadius: 2,
                      py: 0.8,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: alpha(brandColor, 0.1),
                      }
                    }}
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

              {/* Improved Description Display */}
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
                    sx={{ 
                      fontSize: '0.98rem',
                      mb: SPACING.medium,
                      lineHeight: 1.75,
                      pr: 0.5,
                    }}
                  >
                    {project.description || 'No description available'}
                  </Typography>
                </Collapse>
                
                {!expanded && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: '0.98rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      mb: SPACING.medium,
                      lineHeight: 1.75,
                      pr: 0.5,
                    }}
                  >
                    {project.description || 'No description available'}
                  </Typography>
                )}
              </Box>

              {/* Ultra-modern CTA Button with brand colors */}
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
                }}
              >
                {/* Interactive floating elements for visual interest */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-5px',
                    left: '15%',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: alpha(brandColor, 0.6),
                    boxShadow: `0 0 12px ${alpha(brandColor, 0.4)}`,
                    animation: 'float 3s ease-in-out infinite alternate',
                    '@keyframes float': {
                      '0%': { transform: 'translateY(0px)' },
                      '100%': { transform: 'translateY(-15px)' },
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '20%',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.secondary.main, 0.5),
                    boxShadow: `0 0 12px ${alpha(theme.palette.secondary.main, 0.4)}`,
                    animation: 'float2 4s ease-in-out infinite alternate',
                    '@keyframes float2': {
                      '0%': { transform: 'translateY(0px) translateX(0px)' },
                      '100%': { transform: 'translateY(-10px) translateX(10px)' },
                    },
                  }}
                />
                
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
                    py: 1.8,
                    px: 3.8,
                    width: '100%',
                    maxWidth: '250px',
                    fontWeight: 800,
                    borderRadius: 10,
                    fontSize: '1.05rem',
                    letterSpacing: '0.6px',
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(90deg, ${brandColor}, ${alpha(theme.palette.secondary.main, 0.9)})`,
                    boxShadow: hovering 
                      ? `0 10px 30px -8px ${alpha(brandColor, 0.7)}, 0 6px 15px -5px ${alpha(theme.palette.common.black, 0.2)}` 
                      : `0 8px 20px -5px ${alpha(brandColor, 0.5)}, 0 3px 10px -5px ${alpha(theme.palette.common.black, 0.1)}`,
                    transform: hovering ? 'translateY(-5px)' : 'translateY(0)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0))',
                      opacity: hovering ? 1 : 0.5,
                      transition: 'opacity 0.4s ease',
                      zIndex: 0,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '70%',
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.4)}, transparent)`,
                      transform: 'skewX(-25deg)',
                      transition: 'all 0.7s ease',
                      animation: hovering ? `${shineAnimation} 1.5s infinite ease-in-out` : 'none',
                      zIndex: 1,
                    },
                    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                      zIndex: 2,
                    },
                    '& .MuiTouchRipple-root': {
                      zIndex: 1,
                    },
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

// Optimized ProjectGrid component for better responsiveness and spacing
interface ProjectGridProps {
  projects: Project[];
  spacing?: number;
  animate?: boolean; // Enable/disable animations
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects,
  spacing = 4,
  animate = true,
}) => {
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
        // Remove horizontal padding from container
        '& > .MuiGrid-item': {
          // Remove manual padding-top
          paddingTop: '0 !important',
          // Add proper spacing
          padding: theme => theme.spacing(spacing / 2)
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

// Preview component for demonstrating the ProjectCard with sample data
export const ProjectCardPreview = () => {
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
    imageUrl: '/images/istockphoto-todo.jpg',
    brandColor: '#4A90E2',
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 4, textAlign: 'center' }}>
        Project Card Preview
      </Typography>
      <ProjectCard project={sampleProject} />
    </Box>
  );
};

export default ProjectCard;