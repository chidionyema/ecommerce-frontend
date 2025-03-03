import React, { useState, useEffect } from 'react';
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
import GoldCard from '../GoldCard';
import { Code } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';

// Enhanced animations
const shineAnimation = keyframes`
  0% { left: -100%; }
  20% { left: 100%; }
  100% { left: 100%; }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(255, 215, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Optimized card sizes
const CARD_SIZES = {
  xlarge: {
    width: '360px',
    height: '480px',
  }
};

// Spacing system
const SPACING = {
  xsmall: 0.5,
  small: 1,
  medium: 2,
  large: 3,
  xlarge: 4,
};

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
}

interface ProjectCardProps {
  project: Project;
  sx?: any;
  gridSpacing?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  sx,
  gridSpacing = 3
}) => {
  const theme = useTheme();
  const { width: CARD_WIDTH, height: CARD_HEIGHT } = CARD_SIZES.xlarge;
  const DefaultIcon = Code;
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);
  
  // Handle image loading
  useEffect(() => {
    if (project.imageUrl) {
      const img = new Image();
      img.src = project.imageUrl || '/images/istockphoto-todo.jpg';
      img.onload = () => setImageLoaded(true);
    } else {
      setImageLoaded(true);
    }
  }, [project.imageUrl]);
  
  // Handle card expansion
  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ 
      p: 2, 
      display: 'flex', 
      justifyContent: 'center',
      // Add margin auto to ensure proper centering
      mx: 'auto'
    }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%',
          width: '100%',
          transform: hovering ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: hovering ? `${floatAnimation} 3s ease-in-out infinite` : 'none',
          // Add a cursor pointer to indicate clickability
          cursor: 'pointer',
          position: 'relative',
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Clickable indicator that appears on hover */}
        <Badge
          badgeContent={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.9),
                color: '#fff',
                px: 1.5,
                py: 0.7,
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                boxShadow: `0 2px 10px ${alpha(theme.palette.common.black, 0.3)}`,
              }}
            >
              <TouchApp sx={{ fontSize: '1rem', mr: 0.5 }} />
              Click to View
            </Box>
          }
          sx={{
            '& .MuiBadge-badge': {
              top: 20,
              right: 20,
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
              p: 0,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: hovering 
                ? `0 20px 40px -8px ${alpha(theme.palette.common.black, 0.25)}, 0 8px 16px -4px ${alpha(theme.palette.common.black, 0.15)}`
                : `0 5px 15px -3px ${alpha(theme.palette.common.black, 0.15)}`,
              borderRadius: '20px',
              animation: project.featured 
                ? `${pulseAnimation} 2.5s infinite cubic-bezier(0.66, 0, 0, 1)` 
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
                    0.3
                  )}, transparent)`,
                  transform: 'skewX(-25deg)',
                  animation: `${shineAnimation} 1.8s ease-in-out`,
                  zIndex: 1,
                },
              },
              // Ensure card takes full height in container
              maxWidth: '100%',
              mx: 'auto', // Center horizontally
              ...sx,
            }}
          >
            {/* Featured badge */}
            {project.featured && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  zIndex: 10,
                  bgcolor: 'rgba(255, 215, 0, 0.95)',
                  color: '#000',
                  borderRadius: '30px',
                  px: 2,
                  py: 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.7,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.25)}`,
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Star sx={{ fontSize: '1.1rem' }} />
                <Typography variant="caption" fontWeight={800} sx={{ fontSize: '0.85rem' }}>
                  Featured
                </Typography>
              </Box>
            )}

            {/* Enhanced Header with Image & Client Info */}
            <Box
              sx={{
                height: '45%',
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
                    ? 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' 
                    : 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))',
                  transition: 'all 0.5s ease',
                  zIndex: 1,
                }
              }}
            >
              {!imageLoaded && (
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height="100%" 
                  animation="wave"
                  sx={{ bgcolor: alpha(theme.palette.primary.main, 0.15) }} 
                />
              )}
              
              {imageLoaded && (
                <Box
                  component="img"
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
              
              {/* Client info */}
              <Box 
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2.5,
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    p: 1.2,
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.2)}`,
                    transition: 'all 0.3s ease',
                    transform: hovering ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {project.icon ? (
                    <project.icon
                      size={22}
                      color={project.iconColor || theme.palette.primary.main}
                    />
                  ) : (
                    <DefaultIcon size={22} color={theme.palette.primary.main} />
                  )}
                </Box>
                <Typography variant="body1" fontWeight={800} sx={{ 
                  fontSize: '1.05rem',
                  color: '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  letterSpacing: '0.3px',
                }}>
                  {project.clientName}
                </Typography>
              </Box>
            </Box>

            {/* Main Content */}
            <CardContent
              sx={{
                px: 3.5,
                py: 3,
                height: '55%',
                display: 'flex',
                flexDirection: 'column',
                '&:last-child': { pb: 3 },
                position: 'relative',
                zIndex: 2,
                bgcolor: alpha(theme.palette.background.paper, 0.98),
              }}
            >
              {/* Project Title */}
              <Typography
                variant="h5"
                component="h2"
                fontWeight={800}
                sx={{ 
                  fontSize: '1.6rem', 
                  mb: 2.5,
                  lineHeight: 1.2,
                  position: 'relative',
                  display: 'inline-block',
                  color: theme.palette.text.primary,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: -10,
                    width: hovering ? '80px' : '50px',
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: '2px',
                    transition: 'width 0.4s ease',
                  }
                }}
              >
                {project.name}
              </Typography>

              {/* Metrics Display */}
              {project.metrics && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 2.5,
                    mb: 3,
                    background: alpha(theme.palette.background.default, 0.6),
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    backdropFilter: 'blur(5px)',
                    boxShadow: `inset 0 0 10px ${alpha(theme.palette.primary.main, 0.05)}`,
                    transition: 'all 0.3s ease',
                    transform: hovering ? 'translateY(-3px)' : 'translateY(0)',
                  }}
                >
                  {project.metrics.slice(0, 3).map((metric, index) => (
                    <Tooltip key={index} title={metric.label} arrow placement="top">
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center',
                          flex: 1,
                          p: 0.8,
                          transition: 'all 0.3s ease',
                          transform: hovering ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          color="primary.main" 
                          fontWeight={800} 
                          sx={{ 
                            fontSize: '1.35rem',
                            lineHeight: 1.2,
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.7px',
                            mt: 0.8,
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

              {/* Technologies with IMPROVED VISIBILITY */}
              <Box 
                sx={{ 
                  mb: 2.5, 
                  p: 2,
                  borderRadius: 2,
                  // Adding a distinct background to highlight technologies
                  background: hovering 
                    ? alpha(theme.palette.secondary.light, 0.2)
                    : alpha(theme.palette.secondary.light, 0.1),
                  border: `1px dashed ${alpha(theme.palette.secondary.main, 0.3)}`,
                  // Add a subtle pulsing animation to draw attention
                  animation: hovering ? `${pulseAnimation} 3s infinite cubic-bezier(0.66, 0, 0, 1)` : 'none',
                }}
              >
                <Typography 
                  variant="caption" 
                  fontWeight={700} 
                  display="block" 
                  mb={1.2}
                  sx={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.7px',
                    fontSize: '0.75rem',
                    color: theme.palette.text.primary, // Make title more visible
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: theme.palette.secondary.main,
                      display: 'inline-block',
                    }}
                  />
                  Core Technologies
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      sx={{ 
                        height: '28px', // Slightly taller
                        borderRadius: '6px',
                        transition: 'all 0.3s ease',
                        mb: 0.8,
                        background: hovering 
                          ? `linear-gradient(120deg, ${alpha(theme.palette.primary.light, 0.25)}, ${alpha(theme.palette.primary.main, 0.4)})` 
                          : `linear-gradient(120deg, ${alpha(theme.palette.primary.light, 0.15)}, ${alpha(theme.palette.primary.main, 0.25)})`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.35),
                          transform: 'translateY(-2px)',
                        },
                        '& .MuiChip-label': { 
                          px: 1.5,
                          fontSize: '0.85rem', // Larger font
                          fontWeight: 600,
                          color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary, // Better contrast
                        } 
                      }}
                    />
                  ))}
                  {project.technologies.length > 4 && (
                    <Tooltip 
                      title={project.technologies.slice(4).join(', ')}
                      arrow
                      placement="top"
                    >
                      <Chip
                        icon={<Info sx={{ fontSize: '1rem' }} />}
                        label={`+${project.technologies.length - 4}`}
                        size="small"
                        sx={{ 
                          height: '28px',
                          borderRadius: '6px',
                          bgcolor: alpha(theme.palette.secondary.main, 0.25),
                          border: `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
                          mb: 0.8,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.secondary.main, 0.35),
                            transform: 'translateY(-2px)',
                          },
                          '& .MuiChip-label': { 
                            px: 1,
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                          } 
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Box>

              {/* Collapsible Description */}
              <Box>
                <Box 
                  onClick={toggleExpand} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    mb: 1.2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(3px)',
                    }
                  }}
                >
                  <Typography 
                    variant="caption" 
                    fontWeight={700}
                    sx={{
                      textTransform: 'uppercase',
                      letterSpacing: '0.7px',
                      fontSize: '0.75rem',
                      color: expanded ? theme.palette.primary.main : theme.palette.text.secondary
                    }}
                  >
                    Description
                  </Typography>
                  {expanded ? 
                    <ExpandLess sx={{ fontSize: '1.2rem', ml: 0.7, color: theme.palette.primary.main }} /> : 
                    <ExpandMore sx={{ fontSize: '1.2rem', ml: 0.7 }} />
                  }
                </Box>
                
                <Collapse in={expanded} timeout="auto">
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: '0.95rem',
                      mb: 2.5,
                      lineHeight: 1.7,
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
                      fontSize: '0.95rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      mb: 2.5,
                      lineHeight: 1.7,
                      pr: 0.5,
                    }}
                  >
                    {project.description || 'No description available'}
                  </Typography>
                )}
              </Box>

              {/* Enhanced CTA Button - CLEARER CALL TO ACTION */}
              <Box
                sx={{
                  display: 'flex',
                  mt: 'auto',
                  pt: 1.5,
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
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
                    py: 1.5,
                    px: 3.5,
                    width: '100%',
                    maxWidth: '240px',
                    fontWeight: 800,
                    borderRadius: 8,
                    fontSize: '1rem',
                    letterSpacing: '0.5px',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: hovering 
                      ? `0 8px 25px -5px ${alpha(theme.palette.primary.main, 0.6)}, 0 4px 10px -5px ${alpha(theme.palette.common.black, 0.2)}` 
                      : `0 6px 15px -5px ${alpha(theme.palette.primary.main, 0.4)}, 0 2px 8px -5px ${alpha(theme.palette.common.black, 0.1)}`,
                    transform: hovering ? 'translateY(-5px)' : 'translateY(0)',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0))',
                      opacity: hovering ? 1 : 0,
                      transition: 'opacity 0.4s ease',
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

// Improved ProjectGrid component for better centering
interface ProjectGridProps {
  projects: Project[];
  spacing?: number;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects,
  spacing = 3
}) => {
  return (
    <Grid 
      container 
      spacing={spacing} 
      sx={{ 
        mt: 2, 
        mb: 4,
        // Improve centering with these properties
        justifyContent: 'center',
        width: '100%', 
        mx: 'auto',  // Auto margins for horizontal centering
        maxWidth: '1400px', // Max width to prevent stretching on wide screens
        px: { xs: 1, sm: 2, md: 3 }, // Responsive padding
      }}
    >
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          gridSpacing={spacing}
        />
      ))}
    </Grid>
  );
};

export default ProjectCard;