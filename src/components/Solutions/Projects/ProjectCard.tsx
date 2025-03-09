import React, { useState, useEffect, useRef, Suspense, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// MUI Core imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/material/styles/useTheme';
import { alpha, keyframes, SxProps, Theme } from '@mui/material/styles';

// MUI Icons
import ArrowRightAltRounded from '@mui/icons-material/ArrowRightAltRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';

// Import our TechnologyChip component
import TechnologyChip from './TechnologyChip';

import dynamic from 'next/dynamic';

const StylizedButton = dynamic(() => import('./StylizedButton'), {
  loading: () => <div>Loading...</div>
});

const MetricCounter = dynamic(() => import('./MetricCounter'), {
  loading: () => <div>Loading...</div>
});

// Default fallback icon
import { Code as DefaultIcon, Play, CloudLightning } from 'lucide-react';

// Project type definition
export interface Metric {
  value: string;
  label: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: ElementType | null;
  iconColor?: string;
  clientName: string;
  metrics: Metric[];
  technologies: string[];
  featured?: boolean;
  imageUrl?: string;
  brandColor?: string;
  tags?: string[];
  background?: string;
}

// Props interface for ProjectCard
interface ProjectCardProps {
  project: Project;
  sx?: SxProps<Theme>;
  delay?: number;
  priority?: boolean;
  onSelect?: (id: string) => void;
}

// Props interface for ProjectGrid
interface ProjectGridProps {
  projects: Project[];
  spacing?: number;
  animate?: boolean;
  columnCount?: { 
    xs?: number; 
    sm?: number; 
    md?: number; 
    lg?: number;
  };
}

// Animation keyframes
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const spotlight = keyframes`
  0%, 100% { 
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  50% { 
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Fallback component for suspense
const FallbackButton: React.FC<{ brandColor: string }> = ({ brandColor }) => (
  <Box
    sx={{
      mt: 'auto',
      py: 1.5,
      px: 3,
      textAlign: 'center',
      borderRadius: 3,
      background: `linear-gradient(90deg, ${brandColor}, ${alpha(brandColor, 0.8)})`,
      color: '#fff',
      fontWeight: 700,
    }}
  >
    View Case Study
  </Box>
);

// Particle effect component for featured projects
const ParticleEffect: React.FC<{ color: string }> = ({ color }) => {
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {particles.map((_, index) => {
        const size = Math.floor(Math.random() * 3) + 2;
        const duration = Math.floor(Math.random() * 15) + 10;
        const delay = Math.random() * 5;
        
        return (
          <Box
            key={index}
            component={motion.div}
            sx={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: color,
              filter: `blur(${size > 3 ? 1 : 0}px)`,
              opacity: Math.random() * 0.5 + 0.2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: 0, x: 0 }}
            animate={{
              y: [0, -(Math.random() * 50 + 20), 0],
              x: [0, (Math.random() * 40 - 20), 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        );
      })}
    </Box>
  );
};

// Component's main function
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  sx = {},
  delay = 0,
  priority = false,
  onSelect
}) => {
  const theme = useTheme();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSpotlight, setShowSpotlight] = useState(false);
  
  // Using Intersection Observer through react-intersection-observer
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px 0px"
  });
  
  // Default image path and brand color
  const imageUrl = project.imageUrl || '/images/placeholder.jpg';
  const brandColor = project.brandColor || theme.palette.primary.main;
  const brandColorLight = alpha(brandColor, 0.15);
  const brandColorMedium = alpha(brandColor, 0.3);
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Handle image preloading
  useEffect(() => {
    if (priority || inView) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => {
        console.error(`Failed to load image: ${imageUrl}`);
        setImageLoaded(true); // Set as loaded anyway to show fallback
      };
      
      // If using background instead of image
      if (project.background && !project.imageUrl) {
        setImageLoaded(true);
      }
    }

    // Set CSS variable for RGB color to use in animations
    if (cardRef.current) {
      const rgbColor = hexToRgb(brandColor);
      cardRef.current.style.setProperty('--primary-rgb', rgbColor);
    }
  }, [priority, inView, imageUrl, project.background, brandColor]);

  // Handle mouse move for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    if (!showSpotlight) {
      setShowSpotlight(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowSpotlight(false);
  };

  // Toggle expanded state
  const toggleExpand = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // Handle card click
  const handleCardClick = (): void => {
    if (onSelect) {
      onSelect(project.id);
    }
  };

  // Render project icon
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

  // Extract numeric value for animations
  const extractNumericValue = (value: string): number => {
    const match = value.match(/[-+]?[0-9]*\.?[0-9]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  // 3D rotation values
  const rotateX = isHovering ? ((mousePosition.y / (cardRef.current?.clientHeight || 1)) - 0.5) * 5 : 0;
  const rotateY = isHovering ? ((mousePosition.x / (cardRef.current?.clientWidth || 1)) - 0.5) * -5 : 0;

  // Card content
  return (
    <Box
      ref={ref}
      sx={{
        perspective: '1200px',
        m: { xs: 1, sm: 2 },
        transition: 'all 0.3s ease',
        transformStyle: 'preserve-3d',
        ...sx
      }}
    >
      <AnimatePresence>
        {inView && (
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: delay * 0.1
            }}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: 'transform 0.1s ease'
            }}
          >
            <Box
              ref={cardRef}
              onClick={handleCardClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              sx={{
                width: { xs: '320px', sm: '360px', md: '380px' },
                height: expanded ? 'auto' : { xs: '450px', sm: '480px', md: '500px' },
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: isHovering 
                  ? `0 25px 50px -12px ${alpha(brandColor, 0.35)}, 0 0 30px ${alpha(brandColor, 0.1)}`
                  : `0 15px 30px -5px ${alpha(theme.palette.common.black, 0.2)}`,
                transition: 'all 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
                transform: isHovering ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                '&::before': project.featured ? {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  borderRadius: 'inherit',
                  padding: '2px',
                  background: `linear-gradient(45deg, ${brandColor}, ${alpha(theme.palette.secondary.main, 0.7)})`,
                  backgroundSize: '400% 400%',
                  animation: `${gradientShift} 15s ease infinite`,
                  WebkitMask: 
                    'linear-gradient(#fff 0 0) content-box, ' +
                    'linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                } : {},
                ...sx
              }}
            >
              {/* Spotlight effect */}
              {showSpotlight && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: mousePosition.y,
                    left: mousePosition.x,
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(brandColor, 0.15)} 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    opacity: 0.8,
                  }}
                />
              )}

              {/* Particle effect for featured projects */}
              {project.featured && (
                <ParticleEffect color={brandColor} />
              )}

              {/* Featured Badge */}
              {project.featured && (
                <Box
                  component={motion.div}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 9,
                    px: 2,
                    py: 0.8,
                    borderRadius: '30px',
                    background: `linear-gradient(135deg, ${alpha('#FFD700', 0.95)}, ${alpha('#FFA500', 0.95)})`,
                    backdropFilter: 'blur(4px)',
                    boxShadow: `0 4px 12px ${alpha('#000', 0.15)}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'inherit',
                      padding: '1px',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.2))',
                      WebkitMask: 
                        'linear-gradient(#fff 0 0) content-box, ' +
                        'linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      opacity: isHovering ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }
                  }}
                >
                  <motion.div 
                    animate={{ rotate: [0, 5, 0, -5, 0] }} 
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5, 
                      ease: "easeInOut" 
                    }}
                  >
                    <StarRounded sx={{ fontSize: '1rem', color: '#000' }} />
                  </motion.div>
                  <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    Featured
                  </Typography>
                </Box>
              )}

              {/* Image/Background Section */}
              <Box
                sx={{
                  height: '200px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Loading Skeleton */}
                {!imageLoaded && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      bgcolor: alpha(theme.palette.background.default, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(90deg, 
                          ${alpha(theme.palette.background.default, 0)} 0%, 
                          ${alpha(theme.palette.background.default, 0.15)} 50%, 
                          ${alpha(theme.palette.background.default, 0)} 100%)`,
                        animation: `${shimmer} 2s infinite`,
                      }
                    }}
                  />
                )}

                {/* Background/Image with animated gradient overlay */}
                {imageLoaded && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: project.background || 'transparent',
                      transform: isHovering ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
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

                    {/* Dynamic gradient overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: isHovering
                          ? `linear-gradient(to bottom, 
                              ${alpha(theme.palette.common.black, 0.2)}, 
                              ${alpha(theme.palette.common.black, 0.7)})`
                          : `linear-gradient(to bottom, 
                              ${alpha(theme.palette.common.black, 0.3)}, 
                              ${alpha(theme.palette.common.black, 0.8)})`,
                        transition: 'all 0.5s ease',
                        zIndex: 1,
                      }}
                    />
                  </Box>
                )}

                {/* Client Info Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    p: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    zIndex: 2,
                    width: '100%',
                  }}
                >
                  <Box
                    component={motion.div}
                    whileHover={{ 
                      scale: 1.15,
                      rotateZ: [0, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      bgcolor: alpha('#fff', 0.92),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 15px ${alpha(theme.palette.common.black, 0.25)}`,
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${alpha(brandColor, 0.6)}`,
                      transform: isHovering ? 'scale(1.1) translateY(-4px)' : 'scale(1) translateY(0)',
                      transition: 'all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '150%',
                        height: '150%',
                        borderRadius: 'inherit',
                        background: `radial-gradient(circle, ${alpha(brandColor, 0.5)}, transparent 70%)`,
                        opacity: isHovering ? 0.4 : 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: -1,
                      }
                    }}
                  >
                    {renderIcon()}
                  </Box>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                      fontSize: '1.1rem',
                      transform: isHovering ? 'translateY(-2px)' : 'translateY(0)',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    {project.clientName}
                  </Typography>
                </Box>
              </Box>

              {/* Content Section */}
              <Box
                sx={{
                  p: 2.5,
                  pt: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  position: 'relative',
                  background: theme.palette.mode === 'dark' 
                    ? `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 0.85)}, ${alpha(theme.palette.background.paper, 0.97)})`
                    : theme.palette.background.paper,
                  backdropFilter: 'blur(10px)',
                  height: expanded ? 'auto' : 'calc(100% - 200px)',
                }}
              >
                {/* Floating decoration elements */}
                <Box
                  component={motion.div}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  sx={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    top: -20,
                    right: -20,
                    background: `radial-gradient(circle, ${alpha(brandColor, 0.2)}, transparent 70%)`,
                    borderRadius: '50%',
                    zIndex: 0,
                    opacity: isHovering ? 0.9 : 0.5,
                    transition: 'opacity 0.5s ease',
                  }}
                />

                <Box
                  component={motion.div}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                  sx={{
                    position: 'absolute',
                    width: 30,
                    height: 30,
                    bottom: expanded ? 'auto' : 30,
                    left: 10,
                    background: `radial-gradient(circle, ${alpha(brandColor, 0.3)}, transparent 70%)`,
                    borderRadius: '50%',
                    zIndex: 0,
                    opacity: isHovering ? 0.9 : 0.5,
                    transition: 'opacity 0.5s ease',
                  }}
                />

                {/* Project Title */}
                <Typography
                  variant="h5"
                  component={motion.h2}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + delay * 0.1, duration: 0.5 }}
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.4rem' },
                    fontWeight: 800,
                    lineHeight: 1.3,
                    position: 'relative',
                    pb: 1.5,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: isHovering ? '80px' : '60px',
                      height: '4px',
                      background: `linear-gradient(90deg, ${brandColor}, ${alpha(brandColor, 0.5)})`,
                      borderRadius: '4px',
                      transition: 'width 0.4s ease',
                      boxShadow: `0 2px 6px ${alpha(brandColor, 0.4)}`,
                    }
                  }}
                >
                  {project.name}
                </Typography>

                {/* Key Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + delay * 0.1, duration: 0.5 }}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'space-between',
                      px: 2,
                      py: 2,
                      borderRadius: 3,
                      background: isDarkMode 
                        ? alpha(theme.palette.background.default, 0.6)
                        : alpha(theme.palette.background.default, 0.8),
                      border: `1px solid ${alpha(brandColor, 0.2)}`,
                      boxShadow: `inset 0 0 15px ${alpha(brandColor, 0.05)}`,
                      transform: isHovering ? 'translateY(-4px)' : 'translateY(0)',
                      transition: 'all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -2,
                        left: -2,
                        right: -2,
                        height: '1.5px',
                        background: `linear-gradient(90deg, ${alpha(brandColor, 0.05)}, ${brandColor}, ${alpha(brandColor, 0.05)})`,
                        zIndex: 1,
                      },
                      '&::after': isHovering ? {
                        content: '""',
                        position: 'absolute',
                        top: '25%',
                        left: -150,
                        width: '100px',
                        height: '200%',
                        background: `linear-gradient(90deg, transparent, ${alpha(brandColor, 0.05)}, transparent)`,
                        transform: 'rotate(35deg)',
                        animation: `${shimmer} 3s infinite`,
                        zIndex: 2,
                      } : {}
                    }}
                  >
                    {project.metrics.slice(0, 3).map((metric, index) => (
                      <Tooltip
                        key={index}
                        title={metric.description || metric.label}
                        arrow
                        placement="top"
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                            position: 'relative',
                            zIndex: 3,
                            '&::after': index < project.metrics.length - 1 ? {
                              content: '""',
                              position: 'absolute',
                              right: -8,
                              top: '20%',
                              height: '60%',
                              width: '1px',
                              background: alpha(theme.palette.divider, 0.6),
                            } : {},
                          }}
                        >
                          <Suspense fallback={
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 800,
                                fontSize: '1.3rem',
                                color: brandColor,
                              }}
                            >
                              {metric.value}
                            </Typography>
                          }>
                            <MetricCounter
                              value={metric.value}
                              color={brandColor}
                              isVisible={inView}
                              delay={index * 0.2 + 0.5}
                              sx={{
                                fontWeight: 800,
                                fontSize: '1.3rem',
                                background: `linear-gradient(90deg, ${brandColor}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            />
                          </Suspense>
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: '0.75rem',
                              textTransform: 'uppercase',
                              fontWeight: 600,
                              letterSpacing: 0.5,
                              opacity: 0.8,
                              mt: 0.5,
                            }}
                          >
                            {metric.label.split(' ')[0]}
                          </Typography>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                )}

                {/* Project Description */}
                <Box component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + delay * 0.1, duration: 0.5 }}>
                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: '0.95rem',
                            lineHeight: 1.7,
                            pb: 1,
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              height: '1px',
                              background: alpha(theme.palette.divider, 0.5),
                            }
                          }}
                        >
                          {project.description}
                        </Typography>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: '0.95rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.7,
                            mb: 1,
                          }}
                        >
                          {project.description}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>

                {/* Technology Stack */}
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + delay * 0.1, duration: 0.5 }}
                  sx={{
                    borderRadius: 3,
                    p: 2,
                    background: alpha(brandColorLight, isDarkMode ? 0.2 : 0.5),
                    border: `1px solid ${alpha(brandColor, 0.2)}`,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    transform: isHovering ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHovering 
                      ? `0 8px 20px -5px ${alpha(brandColor, 0.25)}`
                      : 'none',
                    overflow: 'hidden',
                    '&::after': isHovering ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: -100,
                      width: '40px',
                      height: '300%',
                      background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.1)}, transparent)`,
                      transform: 'rotate(35deg)',
                      animation: `${shimmer} 3s infinite ease-in-out`,
                      zIndex: 1,
                    } : {}
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{
                      fontSize: '0.75rem',
                      color: isDarkMode ? theme.palette.text.secondary : alpha(theme.palette.text.primary, 0.7),
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1.5,
                      zIndex: 2,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: brandColor,
                        mr: 1,
                        boxShadow: `0 0 8px ${alpha(brandColor, 0.8)}`,
                      }
                    }}
                  >
                    TECHNOLOGIES
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.8,
                      maxHeight: expanded ? '200px' : '80px',
                      overflowY: expanded ? 'auto' : 'hidden',
                      position: 'relative',
                      zIndex: 2,
                      '&::after': !expanded ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '35px',
                        background: `linear-gradient(to top, ${alpha(brandColorLight, 0.95)}, transparent)`,
                        pointerEvents: 'none',
                        zIndex: 1,
                      } : {},
                      '&::-webkit-scrollbar': {
                        width: '5px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: alpha(theme.palette.background.default, 0.1),
                        borderRadius: '10px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: alpha(brandColor, 0.3),
                        borderRadius: '10px',
                      },
                    }}
                  >
                    {project.technologies.map((tech, index) => (
                      <TechnologyChip
                        key={index}
                        tech={tech}
                        isHovering={isHovering}
                        brandColor={brandColor}
                        index={index}
                      />
                    ))}
                  </Box>

                  {/* Show more/less button */}
                  {project.technologies.length > 6 && (
                    <Box
                      onClick={toggleExpand}
                      component={motion.div}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                        mt: 1.5,
                        py: 0.8,
                        borderRadius: 2,
                        cursor: 'pointer',
                        color: brandColor,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        background: alpha(brandColor, 0.05),
                        '&:hover': {
                          background: alpha(brandColor, 0.15),
                        },
                        zIndex: 2,
                        position: 'relative',
                      }}
                    >
                      {expanded ? (
                        <>
                          <ExpandLessRounded sx={{ fontSize: '1.1rem' }} />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ExpandMoreRounded sx={{ fontSize: '1.1rem' }} />
                          Show All ({project.technologies.length})
                        </>
                      )}
                    </Box>
                  )}
                </Box>

                {/* CTA Button */}
                <Suspense fallback={<FallbackButton brandColor={brandColor} />}>
                  <Box component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + delay * 0.1, duration: 0.5 }}>
                    <StylizedButton
                      href={`/projects/${project.id}`}
                      label="View Case Study"
                      endIcon={
                        <ArrowRightAltRounded
                          sx={{
                            transition: 'transform 0.3s ease',
                            transform: isHovering ? 'translateX(4px)' : 'translateX(0)',
                          }}
                        />
                      }
                      isHovering={isHovering}
                      brandColor={brandColor}
                      sx={{
                        mt: 'auto',
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                </Suspense>
              </Box>

              {/* Live demo button */}
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '20px',
                      background: alpha(theme.palette.background.paper, 0.85),
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${alpha(brandColor, 0.3)}`,
                      color: brandColor,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
                      cursor: 'pointer',
                      '&:hover': {
                        background: alpha(theme.palette.background.paper, 0.95),
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/projects/${project.id}/demo`, '_blank');
                    }}
                  >
                    <Play size={14} />
                    Live Demo
                  </Box>
                </motion.div>
              )}

              {/* Quick view button */}
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <IconButton
                    aria-label="Quick view"
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleCardClick();
                    }}
                    sx={{
                      position: 'absolute',
                      bottom: isHovering ? 16 : -50,
                      right: 16,
                      zIndex: 10,
                      width: 44,
                      height: 44,
                      background: alpha(brandColor, 0.85),
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${alpha('#fff', 0.3)}`,
                      color: '#fff',
                      boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.3)}`,
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      '&:hover': {
                        background: alpha(brandColor, 0.95),
                      },
                    }}
                  >
                    <OpenInNewRounded fontSize="small" />
                  </IconButton>
                </motion.div>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

// Component for the Project Grid
export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  spacing = 4,
  animate = true,
  columnCount = { xs: 1, sm: 2, md: 3, lg: 3 }
}) => {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string): void => {
    setSelectedId(id);
    // Navigate to the project detail page
    window.location.href = `/projects/${id}`;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${columnCount.xs || 1}, 1fr)`,
          sm: `repeat(${columnCount.sm || 2}, 1fr)`,
          md: `repeat(${columnCount.md || 3}, 1fr)`,
          lg: `repeat(${columnCount.lg || 3}, 1fr)`,
        },
        gap: spacing,
        width: '100%',
        my: 4,
        justifyItems: 'center',
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          delay={animate ? index : 0}
          priority={index < 3} // Prioritize loading for first 3 items
          onSelect={handleSelect}
        />
      ))}
    </Box>
  );
};

export default ProjectCard;