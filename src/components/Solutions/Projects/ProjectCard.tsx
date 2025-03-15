import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
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
  icon: React.ElementType | null;
  iconColor?: string;
  clientName: string;
  metrics: Metric;
  technologies: string;
  featured?: boolean;
  brandColor?: string;
  tags?: string;
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

/**
 * Refined ProjectCard component with minimalist design and purposeful interactions
 */
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
  const SPACING = 2.5; // Reduced spacing
  const RADIUS = 10; // Reduced radius for more rectangular appearance
  const TRANSITION = {
    standard: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)',
    spring: { type: 'spring', stiffness: 70, damping: 18 }
  };

  // Design variables
  const bannerImage = project.bannerImage
    ? `/images/${project.bannerImage}`
    : '/images/placeholder.jpg';

  const brandColor = project.brandColor || theme.palette.primary.main;
  const brandColorLight = alpha(brandColor, 0.15);
  const isDarkMode = theme.palette.mode === 'dark';

  // Image loading effect
  useEffect(() => {
    if (priority || inView) {
      const img = new Image();
      img.src = bannerImage;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true);
      if (project.background && !project.bannerImage) setImageLoaded(true);
    }
  }, [priority, inView, bannerImage, project.background]);

  // Event handlers
  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // Helper functions
  const renderIcon = () => {
    try {
      if (project.icon) {
        const Icon = project.icon;
        return <Icon size={20} color={project.iconColor || brandColor} />;
      }
      return <DefaultIcon size={20} color={brandColor} />;
    } catch {
      return <DefaultIcon size={20} color={brandColor} />;
    }
  };

  const getMetricIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('time')) return <TimerOutlined fontSize="small" />;
    if (lowerLabel.includes('accessibility')) return <AccessibilityNewOutlined fontSize="small" />;
    if (lowerLabel.includes('deployment') || lowerLabel.includes('frequency')) return <CloudSyncOutlined fontSize="small" />;
    return <InsightsOutlined fontSize="small" />;
  };

  const getTechIcon = (techName: string) => {
    const techMapping: Record<string, string> = {
      'React': '/images/tech/react.svg',
      'TypeScript': '/images/tech/typescript.svg',
      'Node.js': '/images/tech/nodejs.svg',
      'JavaScript': '/images/tech/javascript.svg',
      'HTML': '/images/tech/html.svg',
      'CSS': '/images/tech/css.svg',
    };

    return techMapping[techName] || null;
  };

  // Early return if not in view
  if (!inView) return <Box ref={ref} sx={{ ...sx, my: SPACING }} />;

  return (
    <Box ref={ref} sx={{ width: '100%', my: SPACING, ...sx }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }} // Reduced animation distance
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...TRANSITION.spring, delay: delay * 0.1 }}
      >
        <Card
          elevation={0}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => onSelect?.(project.id)}
          sx={{
            width: '100%',
            height: { xs: 'auto', sm: 'auto', md: '620px', lg: '680px' }, // Adjusted card height
            display: 'flex',
            flexDirection: 'column',
            borderRadius: RADIUS,
            overflow: 'hidden',
            transition: TRANSITION.standard,
            backgroundColor: theme.palette.background.paper,
            boxShadow: isHovering
              ? `0 10px 20px -6px ${alpha(theme.palette.common.black, 0.12)}, 0 4px 12px -4px ${alpha(theme.palette.common.black, 0.08)}`
              : `0 4px 12px -6px ${alpha(theme.palette.common.black, 0.06)}`,
            border: project.featured ? `1px solid ${alpha(brandColor, 0.15)}` : `1px solid ${alpha(theme.palette.divider, 0.05)}`,
            transform: isHovering ? 'translateY(-4px)' : 'none', // Reduced hover lift
          }}
        >
          {/* Banner Image Section */}
          <Box sx={{ position: 'relative', width: '100%', height: { xs: '220px', sm: '260px', md: '320px' }, overflow: 'hidden' }}> {/* Increased banner height */}
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: alpha(theme.palette.background.default, 0.08),
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
                background: project.background || 'transparent',
              }}>
                <Box
                  component="img"
                  src={bannerImage}
                  alt={project.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.5s ease',
                    transform: isHovering ? 'scale(1.02)' : 'scale(1)', // Subtle scale effect
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
                    ${alpha(theme.palette.common.black, 0.3)} 60%,
                    ${alpha(theme.palette.common.black, 0.7)})`, // Adjusted overlay
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
              {project.featured && (
                <Chip
                  icon={<StarRounded sx={{ color: '#000 !important', fontSize: '1rem' }} />}
                  label="Featured"
                  size="small"
                  sx={{
                    mb: 1.5, // Reduced margin
                    height: '24px', // Smaller badge
                    fontWeight: 600,
                    fontSize: '0.7rem', // Smaller text
                    background: `linear-gradient(135deg, ${alpha('#FFD700', 0.95)}, ${alpha('#FFA500', 0.95)})`,
                    color: '#000',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '& .MuiChip-icon': { color: '#000' }
                  }}
                />
              )}

              {/* Banner Text */}
              {project.bannerText && (
                <Typography
                  variant="h6" // Reduced from h5
                  component="h2"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    mb: 1, // Reduced margin
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    letterSpacing: '-0.01em',
                    fontSize: '1.1rem', // Controlled font size
                  }}
                >
                  {project.bannerText}
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> {/* Reduced gap */}
                <Box sx={{
                  width: 32, // Smaller icon container
                  height: 32,
                  borderRadius: RADIUS / 2,
                  bgcolor: alpha('#fff', 0.95),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 2px 6px ${alpha(theme.palette.common.black, 0.2)}`,
                }}>
                  {renderIcon()}
                </Box>
                <Typography
                  variant="subtitle1" // Changed from h6
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    fontSize: '0.95rem', // Controlled font size
                  }}
                >
                  {project.clientName}
                </Typography>
              </Box>
            </Box>
          </Box>

          <CardContent sx={{
            p: SPACING,
            pt: 1.5, // Reduced top padding
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Project Title */}
            <Typography
              variant="h6" // Changed from h5
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2, // Reduced margin
                position: 'relative',
                pb: 1, // Reduced padding
                letterSpacing: '-0.01em',
                fontSize: '1.15rem', // Controlled font size
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '40px', // Shorter underline
                  height: '2px', // Thinner underline
                  background: brandColor,
                  borderRadius: '2px',
                }
              }}
            >
              {project.name}
            </Typography>

            {/* Metrics Section */}
            {project.metrics?.length > 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)', // Fixed 3-column grid for consistency
                  gap: 1, // Reduced gap
                  mb: 2, // Reduced margin
                  p: 1.5, // Reduced padding
                  borderRadius: RADIUS / 2,
                  background: alpha(brandColorLight, 0.3),
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
                        padding: 0.75, // Reduced padding
                        borderRadius: 1,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Box sx={{ color: brandColor, mb: 0.75 }}> {/* Reduced margin */}
                        {getMetricIcon(metric.label)}
                      </Box>
                      <Typography
                        variant="subtitle1" // Changed from h6
                        sx={{
                          fontWeight: 700,
                          color: brandColor,
                          mb: 0.25, // Reduced margin
                          fontSize: '1rem', // Smaller font size
                        }}
                      >
                        {metric.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          letterSpacing: 0.5,
                          fontSize: '0.65rem', // Smaller font size
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
              variant="body2" // Changed from body1
              sx={{
                mb: 2, // Reduced margin
                fontSize: '0.875rem', // Smaller font
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3, // Show fewer lines
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                height: '4.2rem', // Reduced height
                color: theme.palette.text.primary,
              }}
            >
              {project.description}
            </Typography>

            {/* Expandable Content */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }} // Faster transition
                >
                  <Box sx={{ display: 'grid', gap: 2, mb: 2 }}> {/* Reduced spacing */}
                    {/* Challenges Section */}
                    {project.challenges && (
                      <Box>
                        <Typography variant="subtitle2" sx={{
                          fontWeight: 700,
                          mb: 0.75, // Reduced margin
                          color: brandColor,
                          fontSize: '0.8rem', // Smaller font
                        }}>
                          Challenges
                        </Typography>
                        <Typography variant="body2" sx={{
                          lineHeight: 1.5,
                          fontSize: '0.8rem', // Smaller font
                        }}>
                          {project.challenges}
                        </Typography>
                      </Box>
                    )}

                    {/* Impact Section */}
                    {project.impact && (
                      <Box>
                        <Typography variant="subtitle2" sx={{
                          fontWeight: 700,
                          mb: 0.75, // Reduced margin
                          color: brandColor,
                          fontSize: '0.8rem', // Smaller font
                        }}>
                          Impact
                        </Typography>
                        <Typography variant="body2" sx={{
                          lineHeight: 1.5,
                          fontSize: '0.8rem', // Smaller font
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
            <Box sx={{ mb: 1.5, mt: 'auto' }}> {/* Reduced margin */}
              <Typography
                variant="caption" // Changed from subtitle2
                sx={{
                  fontWeight: 700,
                  mb: 1, // Reduced margin
                  color: alpha(theme.palette.text.primary, 0.7),
                  display: 'block',
                  fontSize: '0.7rem', // Smaller font
                }}
              >
                TECHNOLOGIES
              </Typography>
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.75, // Reduced gap
                maxHeight: '66px', // Limited height
                overflow: 'hidden'
              }}>
                {project.technologies.map((tech, index) => {
                  const iconPath = getTechIcon(tech);

                  return (
                    <Chip
                      key={index}
                      avatar={iconPath ? <Avatar src={iconPath} alt={tech} sx={{ bgcolor: 'transparent', width: 20, height: 20 }} /> : null}
                      label={tech}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.7rem', // Smaller font
                        height: '24px', // Smaller chip
                        bgcolor: alpha(brandColor, 0.08),
                        color: isDarkMode ? alpha(brandColor, 0.9) : brandColor,
                        border: `1px solid ${alpha(brandColor, 0.15)}`,
                        transition: 'all 0.2s ease',
                        '& .MuiChip-label': {
                          px: 1, // Reduced padding
                        }
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{
            px: SPACING,
            pb: SPACING,
            pt: 0,
            justifyContent: 'space-between',
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          }}>
            <Button
              onClick={toggleExpand}
              startIcon={expanded ? <ExpandLessRounded fontSize="small" /> : <ExpandMoreRounded fontSize="small" />}
              sx={{
                color: alpha(theme.palette.text.primary, 0.7),
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.8rem', // Smaller font
                '&:hover': {
                  color: brandColor,
                }
              }}
            >
              {expanded ? 'Show Less' : 'Learn More'}
            </Button>

            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect?.(project.id);
              }}
              endIcon={<ArrowRightAltRounded fontSize="small" />}
              variant="contained"
              size="small" // Smaller button
              sx={{
                bgcolor: brandColor,
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: RADIUS / 2,
                px: 1.5, // Reduced padding
                boxShadow: 'none',
                fontSize: '0.8rem', // Smaller font
                '&:hover': {
                  bgcolor: alpha(brandColor, 0.9),
                  boxShadow: `0 2px 6px ${alpha(brandColor, 0.25)}`,
                },
                transition: TRANSITION.standard,
              }}
            >
              Case Study
            </Button>
          </CardActions>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ProjectCard;