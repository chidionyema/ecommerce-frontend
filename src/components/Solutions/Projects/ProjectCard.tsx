import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import useTheme from '@mui/material/styles/useTheme';
import { alpha } from '@mui/material/styles';
import ArrowRightAltRounded from '@mui/icons-material/ArrowRightAltRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import TimerOutlined from '@mui/icons-material/TimerOutlined';
import AccessibilityNewOutlined from '@mui/icons-material/AccessibilityNewOutlined';
import CloudSyncOutlined from '@mui/icons-material/CloudSyncOutlined';
import InsightsOutlined from '@mui/icons-material/InsightsOutlined';
import { Code as DefaultIcon } from 'lucide-react';

// Import all technologyIconMap icons
import {
  Shield, Building2, DollarSign, Landmark, Cloud, CircuitBoard, Cpu, Server, Key, Settings, Mail,
  Terminal, Database, Code2, GitBranch, Box as BoxIcon, Layers, Code, BarChart3, Network
} from 'lucide-react';

// Define technologyIconMap in the component since import might be failing
const technologyIconMap = {
  ".NET Core": { 
    icon: Code,  
    color: '#512bd4'  // .NET purple
  },
  "Java": {
    icon: Terminal,
    color: '#007396'  // Java blue
  },
  "AWS": {
    icon: Cloud,
    color: '#FF9900'  // AWS orange
  },
  "Docker": {
    icon: Server,
    color: '#2496ED'  // Docker blue
  },
  "Kubernetes": {
    icon: Cloud,
    color: '#326CE5'  // Kubernetes blue
  },
  "React": {
    icon: CircuitBoard,
    color: '#61DAFB'  // React cyan
  },
  "TypeScript": {
    icon: Code2,
    color: '#3178C6'  // TypeScript blue
  },
  "CQRS": {
    icon: Database,
    color: '#7B68EE'  // Medium slate blue
  },
  "Azure": {
    icon: Cloud,
    color: '#0078D4'  // Azure blue
  },
  "Terraform": {
    icon: Settings,
    color: '#7B42BC'  // Terraform purple
  },
  "RabbitMQ": {
    icon: Network,
    color: '#FF6600'  // RabbitMQ orange
  },
  "Microservices": {
    icon: BoxIcon,
    color: '#43A047'  // Green
  },
  "CI/CD": {
    icon: GitBranch,
    color: '#F05033'  // Git red
  },
  "Analytics": {
    icon: BarChart3,
    color: '#1976D2'  // Blue
  }
};

// Types
export interface Metric {
  value: string;
  label: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  bannerImage?: string;
  bannerText?: string;
  icon?: React.ElementType | null;
  iconColor?: string;
  clientName?: string;
  metrics?: Metric[];
  technologies?: string[];
  featured?: boolean;
  brandColor?: string;
  tags?: string[];
  background?: string;
  impact?: string;
  challenges?: string;
}

export interface ProjectCardProps {
  project: Project;
  sx?: any;
  delay?: number;
  priority?: boolean;
  onSelect?: (id: string) => void;
}

const ProjectCard = ({
  project,
  sx = {},
  delay = 0,
  priority = false,
  onSelect
}: ProjectCardProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Design constants
  const SPACING = 2;
  const RADIUS = 2; // Modern sharp edges
  const TRANSITION = {
    standard: 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
    spring: { type: 'spring', stiffness: 60, damping: 15 }
  };

  // Design variables
  const bannerImage = project?.bannerImage
    ? `/images/${project.bannerImage}`
    : '/images/placeholder.jpg';

  const brandColor = project?.brandColor || theme.palette.primary.main;
  const brandColorLight = alpha(brandColor, 0.12);
  const isDarkMode = theme.palette.mode === 'dark';

  // Image loading effect
  useEffect(() => {
    if (priority || inView) {
      const img = new Image();
      img.src = bannerImage;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true);
      if (project?.background && !project?.bannerImage) setImageLoaded(true);
    }
  }, [priority, inView, bannerImage, project?.background]);

  // Event handlers
  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // Helper functions
  const renderIcon = () => {
    try {
      if (project?.icon) {
        // Instead of assuming icon is a component, render it explicitly
        const iconColor = project?.iconColor || brandColor;
        
        // Handle both string color formats (like "text-blue-600") and regular colors
        const colorValue = iconColor.startsWith('text-') 
          ? iconColor // Use the text class directly if it's a Tailwind class
          : iconColor; // Otherwise use the color value
          
        // Create the icon
        return React.createElement(project.icon, { 
          size: 28, 
          color: colorValue,
          className: iconColor.startsWith('text-') ? iconColor : undefined
        });
      }
      return <DefaultIcon size={28} color={brandColor} />;
    } catch (error) {
      console.error('Error rendering icon:', error);
      return <DefaultIcon size={28} color={brandColor} />;
    }
  };

  const getMetricIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    
    // Apply color to metric icons
    const iconColor = project?.brandColor || brandColor;
    
    if (lowerLabel.includes('time')) return <TimerOutlined fontSize="small" style={{ color: iconColor }} />;
    if (lowerLabel.includes('accessibility')) return <AccessibilityNewOutlined fontSize="small" style={{ color: iconColor }} />;
    if (lowerLabel.includes('deployment') || lowerLabel.includes('frequency')) return <CloudSyncOutlined fontSize="small" style={{ color: iconColor }} />;
    return <InsightsOutlined fontSize="small" style={{ color: iconColor }} />;
  };

  // Helper for tech icons
  const getTechIcon = (techName: string) => {
    if (technologyIconMap && technologyIconMap[techName]) {
      return technologyIconMap[techName].icon;
    }
    return null;
  };

  // Early return if not in view
  if (!inView) return <Box ref={ref} sx={{ ...sx, my: SPACING }} />;

  return (
    <Box ref={ref} sx={{ width: '100%', my: SPACING, ...sx }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...TRANSITION.spring, delay: delay * 0.1 }}
      >
        <Card
          elevation={0}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => onSelect?.(project?.id)}
          sx={{
            width: '100%',
            maxWidth: '100%',
            minHeight: { xs: '600px', sm: '680px', md: '720px' },
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: RADIUS,
            overflow: 'hidden',
            transition: TRANSITION.standard,
            backgroundColor: theme.palette.background.paper,
            boxShadow: isHovering
              ? `0 8px 24px -8px ${alpha(theme.palette.common.black, 0.1)}, 0 4px 8px -4px ${alpha(theme.palette.common.black, 0.06)}`
              : `0 2px 12px -6px ${alpha(theme.palette.common.black, 0.04)}`,
            border: project?.featured ? `1px solid ${alpha(brandColor, 0.12)}` : `1px solid ${alpha(theme.palette.divider, 0.04)}`,
            transform: isHovering ? 'translateY(-3px)' : 'none',
            aspectRatio: { xs: 'auto', md: '3/4' },
          }}
        >
          {/* Banner Image Section */}
          <Box sx={{ 
            position: 'relative', 
            width: '100%', 
            paddingTop: '62.5%', // 8:5 ratio for banner (larger)
            overflow: 'hidden'
          }}>
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: alpha(theme.palette.background.default, 0.06),
              }} />
            )}

            {/* Banner Image with Overlay */}
            {imageLoaded && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: project?.background || 'transparent',
              }}>
                <Box
                  component="img"
                  src={bannerImage}
                  alt={project?.name || 'Project image'}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.5s ease',
                    transform: isHovering ? 'scale(1.03)' : 'scale(1)',
                  }}
                />

                {/* Gradient overlay */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(to bottom,
                    ${alpha(theme.palette.common.black, 0)},
                    ${alpha(theme.palette.common.black, 0.2)} 70%,
                    ${alpha(theme.palette.common.black, 0.7)})`,
                }} />
              </Box>
            )}

            {/* Banner Overlay Content */}
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              p: SPACING,
              zIndex: 2,
            }}>
              {/* Featured Badge */}
              {project?.featured && (
                <Chip
                  icon={<StarRounded sx={{ color: '#000 !important', fontSize: '0.875rem' }} />}
                  label="Featured"
                  size="small"
                  sx={{
                    mb: 1.5,
                    height: '22px',
                    fontWeight: 600,
                    fontSize: '0.675rem',
                    background: `linear-gradient(135deg, ${alpha('#FFD700', 0.92)}, ${alpha('#FFA500', 0.92)})`,
                    color: '#000',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    '& .MuiChip-icon': { color: '#000' }
                  }}
                />
              )}

              {/* Banner Text */}
              {project?.bannerText && (
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    mb: 1,
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em',
                    fontSize: '1.05rem',
                  }}
                >
                  {project.bannerText}
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '2px',
                  bgcolor: alpha('#fff', 0.95),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 1px 4px ${alpha(theme.palette.common.black, 0.15)}`,
                  overflow: 'visible', // Make sure icon isn't clipped
                }}>
                  {renderIcon()}
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: '#fff',
                    fontWeight: 500,
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    fontSize: '0.9rem',
                  }}
                >
                  {project?.clientName || ''}
                </Typography>
              </Box>
            </Box>
          </Box>

          <CardContent sx={{
            p: SPACING,
            pt: 2,
            pb: 0,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            {/* Project Title */}
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
                position: 'relative',
                pb: 2,
                letterSpacing: '-0.01em',
                fontSize: '1.5rem',
                lineHeight: 1.3,
                color: theme.palette.text.primary,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '48px',
                  height: '2px',
                  background: brandColor,
                  borderRadius: 0,
                }
              }}
            >
              {project?.name || 'Project'}
            </Typography>

            {/* Metrics Section */}
            {project?.metrics && Array.isArray(project.metrics) && project.metrics.length > 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 0.75,
                  p: 1.5,
                  borderRadius: 0,
                  background: brandColorLight,
                }}
              >
                {project.metrics.map((metric, index) => (
                  <Tooltip key={index} title={metric.description || metric.label} arrow placement="top">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: 0.75,
                        borderRadius: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
              <Box 
                sx={{ 
                  color: brandColor, 
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center' 
                }}>
                {getMetricIcon(metric.label)}
              </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: brandColor,
                          mb: 0.25,
                          fontSize: '0.95rem',
                        }}
                      >
                        {metric.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          textTransform: 'uppercase',
                          fontWeight: 500,
                          letterSpacing: 0.5,
                          fontSize: '0.62rem',
                          opacity: 0.85,
                        }}
                      >
                        {metric.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            )}

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: '1rem',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: alpha(theme.palette.text.primary, 0.9),
              }}
            >
              {project?.description || 'No description available'}
            </Typography>

            {/* Expandable Content */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Box sx={{ display: 'grid', gap: 2, my: 1 }}>
                    {/* Challenges Section */}
                    {project?.challenges && (
                      <Box>
                        <Typography variant="subtitle2" sx={{
                          fontWeight: 600,
                          mb: 0.75,
                          color: brandColor,
                          fontSize: '0.8rem',
                        }}>
                          Challenges
                        </Typography>
                        <Typography variant="body2" sx={{
                          lineHeight: 1.5,
                          fontSize: '0.8rem',
                          color: alpha(theme.palette.text.primary, 0.85),
                        }}>
                          {project.challenges}
                        </Typography>
                      </Box>
                    )}

                    {/* Impact Section */}
                    {project?.impact && (
                      <Box>
                        <Typography variant="subtitle2" sx={{
                          fontWeight: 600,
                          mb: 0.75,
                          color: brandColor,
                          fontSize: '0.8rem',
                        }}>
                          Impact
                        </Typography>
                        <Typography variant="body2" sx={{
                          lineHeight: 1.5,
                          fontSize: '0.8rem',
                          color: alpha(theme.palette.text.primary, 0.85),
                        }}>
                          {project.impact}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Technology Stack */}
            <Box sx={{ mt: 'auto', pt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: alpha(theme.palette.text.primary, 0.6),
                  display: 'block',
                  fontSize: '0.65rem',
                  letterSpacing: '0.03em',
                }}
              >
                TECHNOLOGIES
              </Typography>
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.75,
                maxHeight: '60px',
                overflow: 'hidden'
              }}>
                {Array.isArray(project?.technologies) ? project.technologies.map((tech, index) => {
                  // Get icon and color from the technology mapping if available
                  const iconInfo = technologyIconMap?.[tech];
                  const iconPath = getTechIcon(tech);
                  const techColor = iconInfo?.color || brandColor;
                  const TechIcon = iconInfo?.icon;

                  return (
                    <Chip
                      key={index}
                      icon={TechIcon ? React.createElement(TechIcon, { 
                        size: 16, 
                        color: techColor, 
                        style: { marginRight: -4, marginLeft: 4 } 
                      }) : null}
                      label={tech}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.675rem',
                        height: '28px', // Slightly taller to accommodate icons
                        bgcolor: alpha(techColor, 0.06),
                        color: isDarkMode ? alpha(techColor, 0.9) : techColor,
                        border: `1px solid ${alpha(techColor, 0.12)}`,
                        transition: 'all 0.2s ease',
                        '& .MuiChip-label': {
                          px: 1,
                        }
                      }}
                    />
                  );
                }) : null}
              </Box>
            </Box>
            
            {/* Toggle Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', mb: 2, mt: 2 }}>
              <Button
                onClick={toggleExpand}
                startIcon={expanded ? <ExpandLessRounded fontSize="small" /> : <ExpandMoreRounded fontSize="small" />}
                sx={{
                  color: alpha(theme.palette.text.primary, 0.7),
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  letterSpacing: '0.01em',
                  '&:hover': {
                    color: brandColor,
                    background: 'transparent',
                  }
                }}
              >
                {expanded ? 'Show Less' : 'Learn More'}
              </Button>
            </Box>
          </CardContent>

          {/* Full-width CTA Footer */}
          <Box 
            sx={{
              width: '100%',
              mt: 'auto',
              p: 0,
              bgcolor: brandColor,
            }}
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect?.(project?.id);
              }}
              endIcon={<ArrowRightAltRounded fontSize="medium" />}
              variant="contained"
              fullWidth
              size="large"
              disableElevation
              sx={{
                bgcolor: brandColor,
                fontWeight: 600,
                textTransform: 'uppercase',
                borderRadius: 0,
                py: 2,
                boxShadow: 'none',
                fontSize: '1rem',
                letterSpacing: '0.1em',
                color: '#FFFFFF', // Ensuring text is white for contrast
                '&:hover': {
                  bgcolor: alpha(brandColor, 0.9),
                  boxShadow: 'none',
                },
                transition: TRANSITION.standard,
              }}
            >
              View Case Study
            </Button>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ProjectCard;