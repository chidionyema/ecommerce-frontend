import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

// MUI Core imports grouped together
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import useTheme from '@mui/material/styles/useTheme';
import { alpha } from '@mui/material';

// MUI Icons imported separately
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Star from '@mui/icons-material/Star';

// Local components
import GoldCard from '../../GoldCard';
import { GradientButton } from '../../../components/GradientButton';

// Dynamic import for framer-motion
const MotionBox = lazy(() => import('./MotionComponents').then(module => ({
  default: module.MotionBox
})));
// Code icon loaded from lucide-react
import { Code } from 'lucide-react';

// Project type definition
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
  background?: string;
}

// Props interface for ProjectCard component
interface ProjectCardProps {
  project: Project;
  sx?: Record<string, any>;
  delay?: number;
}

// Props interface for ProjectGrid component
interface ProjectGridProps {
  projects: Project[];
  spacing?: number;
  animate?: boolean;
}

// Card size constants
const CARD_SIZES = {
  width: { xs: '320px', sm: '340px', md: '360px' },
  height: { xs: '460px', sm: '470px', md: '480px' },
};

// Fallback loading component
const LoadingFallback = () => (
  <Box sx={{ 
    width: '100%', 
    height: '100%', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2
  }}>
    <Typography variant="body2">Loading...</Typography>
  </Box>
);

// Main component with improved readability and performance
const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  sx = {},
  delay = 0
}) => {
  const theme = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const DefaultIcon = Code;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  
  // Use correct default image path
  const imageUrl = project.imageUrl || '/images/placeholder.jpg';
  
  // Brand colors with fallback
  const brandColor = project.brandColor || theme.palette.primary.main;
  const brandColorLight = alpha(brandColor, 0.2);
  
  // Animations and effects
  const animations = {
    float: `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
      }
    `,
    shine: `
      @keyframes shine {
        0% { left: -100%; }
        20% { left: 100%; }
        100% { left: 100%; }
      }
    `,
  };

  // Set CSS variable for rgb color
  useEffect(() => {
    if (cardRef.current) {
      const rgbColor = hexToRgb(brandColor);
      cardRef.current.style.setProperty('--primary-rgb', rgbColor);
    }
  }, [brandColor]);

  // Progressive loading with IntersectionObserver
  useEffect(() => {
    // Only observe if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    
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
  
  // Handle image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (project.background && !project.imageUrl) {
        setImageLoaded(true);
        return;
      }
      
      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setImageLoaded(true);
        img.onerror = () => {
          console.error(`Failed to load image: ${imageUrl}`);
          setImageLoaded(true);
        };
      } else {
        setImageLoaded(true);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [imageUrl, project.background]);

  // Toggle expanded view
  const toggleExpand = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // Render icon with error handling
  const renderIcon = (): React.ReactNode => {
    try {
      if (project.icon) {
        const Icon = project.icon;
        return <Icon size={24} color={project.iconColor || brandColor} />;
      }
      return <DefaultIcon size={24} color={brandColor} />;
    } catch (error) {
      console.error('Error rendering icon:', error);
      return <DefaultIcon size={24} color={brandColor} />;
    }
  };

  // Convert hex to RGB for CSS variables
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '75, 123, 236';
  };

  // Card content without motion effects
  const renderCardContent = () => (
    <Box
      ref={cardRef}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        m: 2,
        position: 'relative',
        transition: 'transform 0.3s',
        transform: hovering ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <style>
        {animations.float}
        {animations.shine}
      </style>
      
      <GoldCard
        href={`/projects/${project.id}`}
        sx={{
          width: CARD_SIZES.width,
          height: expanded ? 'auto' : CARD_SIZES.height,
          p: 0,
          overflow: 'hidden',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          boxShadow: hovering 
            ? `0 20px 25px -15px ${alpha(theme.palette.common.black, 0.25)}`
            : `0 10px 20px -10px ${alpha(theme.palette.common.black, 0.15)}`,
          ...(project.featured && {
            border: `1px solid ${alpha(brandColor, 0.3)}`,
          }),
          ...sx
        }}
      >
        {/* Featured badge */}
        {project.featured && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(255, 160, 0, 0.9))',
              color: '#000',
              borderRadius: '20px',
              px: 2,
              py: 0.6,
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
              boxShadow: `0 4px 10px ${alpha('#000', 0.2)}`,
            }}
          >
            <Star sx={{ fontSize: '1rem' }} />
            <Typography variant="caption" fontWeight={700} sx={{ fontSize: '0.8rem' }}>
              Featured
            </Typography>
          </Box>
        )}

        {/* Image/header section */}
        <Box sx={{
          height: '160px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Loading skeleton */}
          {!imageLoaded && (
            <Box sx={{ 
              width: '100%', 
              height: '100%', 
              bgcolor: alpha(brandColor, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
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
            </Box>
          )}
          
          {/* Background/image */}
          {imageLoaded && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                background: project.background || 'transparent',
                transition: 'transform 0.5s ease',
                transform: hovering ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {!project.background && (
                <Box
                  component="img"
                  src={imageUrl}
                  alt={project.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
              
              {/* Gradient overlay */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))',
                zIndex: 1,
              }} />
            </Box>
          )}
          
          {/* Client info overlay */}
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            zIndex: 2,
            width: '100%',
          }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: alpha('#fff', 0.9),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              border: `2px solid ${alpha(brandColor, 0.7)}`,
            }}>
              {renderIcon()}
            </Box>
            
            <Typography 
              variant="subtitle1"
              sx={{
                color: '#fff',
                fontWeight: 700,
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {project.clientName}
            </Typography>
          </Box>
        </Box>

        {/* Content section */}
        <CardContent sx={{
          p: 2.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          {/* Project title */}
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 700,
              lineHeight: 1.3,
              position: 'relative',
              pb: 1.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: hovering ? '70px' : '50px',
                height: '3px',
                bgcolor: brandColor,
                transition: 'width 0.3s ease',
                borderRadius: '2px',
              }
            }}
          >
            {project.name}
          </Typography>

          {/* Key metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <Box 
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'space-between',
                px: 1,
                py: 1.5,
                bgcolor: alpha(theme.palette.background.default, 0.5),
                borderRadius: 1.5,
                border: `1px solid ${alpha(brandColor, 0.1)}`,
              }}
            >
              {project.metrics.slice(0, 3).map((metric, index) => (
                <Tooltip 
                  key={index} 
                  title={metric.label} 
                  arrow 
                  placement="top"
                >
                  <Box 
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        color: brandColor,
                      }}
                    >
                      {metric.value}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        opacity: 0.7,
                      }}
                    >
                      {metric.label.split(' ')[0]}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
            </Box>
          )}

          {/* Project description */}
          <Box>
            <Collapse in={expanded} timeout="auto">
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}
              >
                {project.description}
              </Typography>
            </Collapse>
            
            {!expanded && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{
                  fontSize: '0.9rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.6,
                }}
              >
                {project.description}
              </Typography>
            )}
          </Box>

          {/* Technology stack */}
          <Box 
            sx={{
              mt: 1,
              p: 1.5,
              borderRadius: 1.5,
              bgcolor: alpha(brandColor, 0.07),
              border: `1px solid ${alpha(brandColor, 0.1)}`,
            }}
          >
            <Typography 
              variant="caption" 
              fontWeight={600} 
              display="block" 
              mb={1}
              sx={{
                fontSize: '0.75rem',
                color: theme.palette.text.secondary,
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
              }}
            >
              <Box 
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: brandColor,
                }}
              />
              TECHNOLOGIES
            </Typography>
            
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.7,
              maxHeight: expanded ? '150px' : '70px',
              overflow: expanded ? 'auto' : 'hidden',
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
                  size="small"
                  sx={{
                    height: '24px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    bgcolor: alpha(brandColor, 0.12),
                    color: theme.palette.text.primary,
                    mb: 0.7,
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              ))}
            </Box>
            
            {/* Show more/less button */}
            {project.technologies.length > 5 && (
              <Box
                onClick={toggleExpand}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  mt: 1,
                  color: brandColor,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                {expanded ? (
                  <>
                    <ExpandLess sx={{ fontSize: '1rem', mr: 0.5 }} />
                    Show Less
                  </>
                ) : (
                  <>
                    <ExpandMore sx={{ fontSize: '1rem', mr: 0.5 }} />
                    Show All ({project.technologies.length})
                  </>
                )}
              </Box>
            )}
          </Box>

          {/* CTA button */}
          <GradientButton
            href={`/projects/${project.id}`}
            label="View Case Study"
            endIcon={
              <ArrowRightAlt 
                sx={{ 
                  transition: 'transform 0.3s ease',
                  transform: hovering ? 'translateX(4px)' : 'translateX(0)',
                }} 
              />
            }
            sizeVariant="medium"
            sx={{
              mt: 'auto',
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${brandColor}, ${alpha(brandColor, 0.8)})`,
              boxShadow: hovering 
                ? `0 8px 15px -5px ${alpha(brandColor, 0.5)}` 
                : `0 5px 10px -5px ${alpha(brandColor, 0.3)}`,
              transform: hovering ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.3s ease',
            }}
          />
        </CardContent>
      </GoldCard>
    </Box>
  );

  // Update the return statement
return visible ? (
  <Suspense fallback={<LoadingFallback />}>
    {typeof window !== 'undefined' && window.innerWidth > 768 ? (
      <MotionBox 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          delay: delay * 0.1
        }}
      >
        {renderCardContent()}
      </MotionBox>
    ) : (
      renderCardContent()
    )}
  </Suspense>
) : (
  renderCardContent()
);
};

// ProjectGrid component with proper type definitions
export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects, 
  spacing = 4, 
  animate = true 
}) => {
  return (
    <Box 
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: spacing,
        width: '100%',
        mt: 4,
        mb: 5,
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          delay={animate ? index : 0}
        />
      ))}
    </Box>
  );
};

// Create a separate file for MotionComponents.tsx
// export const MotionBox = motion(Box);

export default ProjectCard;