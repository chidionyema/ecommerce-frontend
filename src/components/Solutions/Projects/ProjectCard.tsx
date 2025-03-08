// Update to ProjectCard.tsx to import and use the TechnologyChip component

import React, { useState, useEffect, useRef, lazy, Suspense, ElementType } from 'react';
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
import { Code as DefaultIcon } from 'lucide-react';

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
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Box
              ref={cardRef}
              onClick={handleCardClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              sx={{
                width: { xs: '320px', sm: '360px', md: '380px' },
                height: expanded ? 'auto' : { xs: '450px', sm: '480px', md: '500px' },
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: isHovering 
                  ? `0 25px 50px -12px ${alpha(brandColor, 0.35)}`
                  : `0 15px 30px -5px ${alpha(theme.palette.common.black, 0.2)}`,
                transition: 'all 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
                transform: isHovering ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                '&::before': project.featured ? {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  borderRadius: 'inherit',
                  padding: '2px',
                  background: `linear-gradient(45deg, ${brandColor}, ${alpha(theme.palette.secondary.main, 0.7)})`,
                  WebkitMask: 
                    'linear-gradient(#fff 0 0) content-box, ' +
                    'linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                } : {},
                ...sx
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <Box
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
                  }}
                >
                  <StarRounded sx={{ fontSize: '1rem' }} />
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
                  sx={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    top: -20,
                    right: -20,
                    background: `radial-gradient(circle, ${alpha(brandColor, 0.2)}, transparent 70%)`,
                    borderRadius: '50%',
                    animation: `${float} 6s ease-in-out infinite`,
                    zIndex: 0,
                    opacity: isHovering ? 0.9 : 0.5,
                    transition: 'opacity 0.5s ease',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    width: 30,
                    height: 30,
                    bottom: expanded ? 'auto' : 30,
                    left: 10,
                    background: `radial-gradient(circle, ${alpha(brandColor, 0.3)}, transparent 70%)`,
                    borderRadius: '50%',
                    animation: `${float} 5s ease-in-out infinite 1s`,
                    zIndex: 0,
                    opacity: isHovering ? 0.9 : 0.5,
                    transition: 'opacity 0.5s ease',
                  }}
                />

                {/* Project Title */}
                <Typography
                  variant="h5"
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
                      }
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
                <Box>
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
                        }
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
                </Suspense>
              </Box>

              {/* Quick view button */}
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconButton
                    aria-label="Quick view"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleCardClick();
                    }}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 10,
                      width: 40,
                      height: 40,
                      background: alpha(theme.palette.background.paper, 0.85),
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${alpha(brandColor, 0.3)}`,
                      color: brandColor,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
                      '&:hover': {
                        background: alpha(theme.palette.background.paper, 0.95),
                        transform: 'scale(1.1)',
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