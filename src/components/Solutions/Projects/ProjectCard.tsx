"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Typography, Tooltip, Button, Card, useTheme, alpha, IconButton } from '@mui/material';
import { ArrowForwardRounded, StarRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { ArrowUp } from 'lucide-react';
import { Code as DefaultIcon } from 'lucide-react';
import { Cloud, CircuitBoard, Server, Settings, Terminal, Database, Code2, GitBranch, Box as BoxIcon, Network, BarChart3 } from 'lucide-react';
import { SxProps, Theme } from '@mui/material/styles';
import { LucideIcon } from 'lucide-react';

// Define interfaces for the project and related data
interface Metric {
  label: string;
  value: string | number;
  description?: string;
}

interface Project {
  id?: string;
  name?: string;
  clientName?: string;
  industry?: string;
  description?: string;
  challenges?: string;
  impact?: string;
  bannerImage?: string;
  brandColor?: string;
  background?: string;
  technologies?: string[];
  technologyIcons?: React.ComponentType<any>[];
  metrics?: Metric[];
  featured?: boolean;
  icon?: React.ComponentType<any>;
  iconColor?: string;
}

interface ProjectCardProps {
  project?: Project;
  sx?: SxProps<Theme>;
  delay?: number;
  priority?: boolean;
  onSelect?: (id: string) => void;
}

// Consolidated data objects
const BACKGROUNDS: Record<string, string> = {
  '1': 'linear-gradient(135deg, #1a237e, #283593)',
  '2': 'linear-gradient(135deg, #4a148c, #6a1b9a)',
  '3': 'linear-gradient(135deg, #004d40, #00695c)',
  '4': 'linear-gradient(135deg, #0d47a1, #1565c0)',
  '5': 'linear-gradient(135deg, #006064, #00838f)',
  '6': 'linear-gradient(135deg, #b71c1c, #c62828)',
  '7': 'linear-gradient(135deg, #e65100, #ef6c00)',
  '8': 'linear-gradient(135deg, #1b5e20, #2e7d32)',
  '9': 'linear-gradient(135deg, #01579b, #0277bd)',
  '10': 'linear-gradient(135deg, #880e4f, #ad1457)',
  '11': 'linear-gradient(135deg, #ff6f00, #ff8f00)'
};

interface TechIconInfo {
  icon: LucideIcon;
  color: string;
}

const TECH_ICONS: Record<string, TechIconInfo> = {
  ".NET Core": { icon: Code2, color: '#512bd4' },
  "Java": { icon: Terminal, color: '#007396' },
  "AWS": { icon: Cloud, color: '#FF9900' },
  "Docker": { icon: Server, color: '#2496ED' },
  "Kubernetes": { icon: Cloud, color: '#326CE5' },
  "React": { icon: CircuitBoard, color: '#61DAFB' },
  "TypeScript": { icon: Code2, color: '#3178C6' },
  "CQRS": { icon: Database, color: '#7B68EE' },
  "Azure": { icon: Cloud, color: '#0078D4' },
  "Terraform": { icon: Settings, color: '#7B42BC' },
  "RabbitMQ": { icon: Network, color: '#FF6600' },
  "Microservices": { icon: BoxIcon, color: '#43A047' },
  "CI/CD": { icon: GitBranch, color: '#F05033' },
  "Analytics": { icon: BarChart3, color: '#1976D2' },
  "Helm": { icon: Settings, color: '#0F1689' }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, sx = {}, delay = 0, priority = false, onSelect }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const design = useMemo(() => ({
    bannerImage: project?.bannerImage ? `/images/${project.bannerImage}` : '/images/placeholder.jpg',
    brandColor: project?.brandColor || theme.palette.primary.main,
    background: (project?.id && BACKGROUNDS[project.id]) || project?.background || 'linear-gradient(135deg, #1565c0, #0d47a1)',
    hasDetailedContent: Boolean(project?.challenges || project?.impact || (project?.description && project.description.length > 120)),
    techCount: project?.technologies?.length || 0,
    shouldCollapseTechs: (project?.technologies?.length || 0) > 10,
    hasTechnologyIcons: Array.isArray(project?.technologyIcons) && project.technologyIcons.length > 0,
    hasMetrics: Array.isArray(project?.metrics) && project.metrics.length > 0
  }), [project, theme.palette.primary.main]);

  useEffect(() => {
    if ((!priority && !inView) || (project?.background && !project?.bannerImage)) {
      setImageLoaded(true);
      return;
    }
    const img = new Image();
    img.src = design.bannerImage;
    const timeoutId = setTimeout(() => setImageLoaded(true), 800);
    img.onload = () => { clearTimeout(timeoutId); setImageLoaded(true); };
    img.onerror = () => { clearTimeout(timeoutId); setImageLoaded(true); };
    return () => clearTimeout(timeoutId);
  }, [priority, inView, design.bannerImage, project?.background]);

  useEffect(() => { setExpanded(false); }, [project?.id]);

  const renderIcon = useMemo(() => {
    if (!project?.icon) return <DefaultIcon size={18} color={design.brandColor} strokeWidth={1.5} />;
    try {
      const iconColor = project.iconColor || design.brandColor;
      return React.createElement(project.icon, {
        size: 18,
        color: iconColor.startsWith('text-') ? undefined : iconColor,
        className: iconColor.startsWith('text-') ? iconColor : undefined,
        strokeWidth: 1.5
      });
    } catch (error) {
      return <DefaultIcon size={18} color={design.brandColor} strokeWidth={1.5} />;
    }
  }, [project?.icon, project?.iconColor, design.brandColor]);

  const toggleExpanded = (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setExpanded(!expanded);
  };
  
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    onSelect?.(project?.id || '');
  };

  // Changed height from 680 to 612 (10% reduction)
  if (!inView) return <Box ref={ref} sx={{ ...sx, my: 4, width: 380, height: 612 }} />;

  const technologyIcons = project?.technologyIcons || [];
  const metrics = project?.metrics || [];
  const technologies = project?.technologies || [];

  const renderSection = (title: string, content: string) => (
    <Box sx={{ mb: title === "Impact" ? 0 : 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Box sx={{
          width: 16, height: 16, borderRadius: '50%',
          background: `linear-gradient(135deg, ${alpha(design.brandColor, 0.15)}, ${alpha(design.brandColor, 0.3)})`,
          border: `1px solid ${alpha(design.brandColor, 0.4)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: design.brandColor }} />
        </Box>
        <Typography sx={{
          fontWeight: 700, fontSize: '13px', color: design.brandColor,
          textTransform: 'uppercase', textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'
        }}>
          {title}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(10, 30, 60, 0.78)' }}>
        {content}
      </Typography>
    </Box>
  );

  return (
    <Box ref={ref} sx={{ width: 380, my: expanded ? 5 : 4, mx: 4, ...sx, position: 'relative' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}>
        <Card
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          component="article"
          role="region"
          tabIndex={0}
          sx={{
            width: 380,
            // Changed height from 680 to 612 (10% reduction)
            height: expanded ? 'auto' : 612,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(245, 250, 255, 0.94), rgba(236, 242, 255, 0.92))',
            boxShadow: isHovering && !expanded
              ? '0 20px 40px rgba(0, 30, 60, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
              : expanded
                ? '0 24px 48px rgba(0, 20, 50, 0.14), 0 0 0 1px rgba(255, 255, 255, 0.75), inset 0 0 0 1px rgba(255, 255, 255, 0.6)'
                : '0 12px 28px rgba(0, 20, 50, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.65), inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            transform: expanded ? 'scale(1.03)' : isHovering ? 'translateY(-4px) scale(1.01)' : 'none',
            position: 'relative',
            zIndex: expanded ? 10 : 1
          }}>
          {/* Technology Icons in header removed as requested */}
          {/* Featured badge */}
          {project?.featured && (
            <Box sx={{
              position: 'absolute', zIndex: 10, top: 16, right: 16, borderRadius: '8px',
              px: 1.5, py: 0.5, display: 'flex', alignItems: 'center', gap: 0.5,
              background: 'rgba(255, 200, 30, 0.9)', backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              transform: isHovering && !expanded ? 'translateY(-2px)' : 'translateY(0)'
            }}>
              <StarRounded sx={{ color: '#fff', fontSize: '14px' }} />
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
                Featured
              </Typography>
            </Box>
          )}

          {/* Banner Image Section */}
          <Box sx={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
            {!imageLoaded ? (
              <Box
                component={motion.div}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 0.6, 0.4], transition: { repeat: Infinity, duration: 2 } }}
                sx={{ position: 'absolute', inset: 0, bgcolor: '#10101a' }}
              />
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovering && !expanded ? 1.02 : 1 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                style={{ width: '100%', height: '100%', position: 'relative' }}>
                {/* Banner Image */}
                <Box
                  component="img"
                  src={design.bannerImage}
                  alt={`${project?.name || 'Project'} banner`}
                  loading={priority ? "eager" : "lazy"}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
                />
                {/* Background overlays */}
                <Box sx={{ position: 'absolute', inset: 0, background: design.background, opacity: 0.6, mixBlendMode: 'overlay', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)', zIndex: 2 }} />
                <Box sx={{ position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 80%)', zIndex: 1 }} />
                {/* Header content */}
                <Box sx={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 2, zIndex: 3 }}>
                  <Box sx={{
                    width: 40, height: 40, backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)',
                    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                  }}>
                    {project?.icon ? React.createElement(project.icon, { size: 22, color: '#fff' }) : <DefaultIcon size={22} color="#fff" />}
                  </Box>
                </Box>
                {/* Project title */}
                <Box sx={{ position: 'absolute', top: 20, left: 80, right: 20, zIndex: 3 }}>
                  <Typography variant="h6" sx={{
                    color: '#fff', fontWeight: 700, fontSize: '18px', lineHeight: 1.2,
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
                  }}>
                    {project?.name || 'Project Title'}
                  </Typography>
                  <Typography sx={{
                    color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', mt: 0.5, fontWeight: 500,
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
                  }}>
                    {project?.clientName || 'Client'}
                  </Typography>
                </Box>
                {/* Industry label */}
                <Box sx={{ position: 'absolute', left: 16, bottom: 16, zIndex: 2, maxWidth: 'calc(100% - 32px)' }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '13px', fontWeight: 500 }}>
                    {project?.industry || 'Case Study'}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Content Area */}
          <Box sx={{
            // Changed height from 416px to 374px (10% reduction)
            height: expanded ? 'auto' : '374px',
            display: 'flex', flexDirection: 'column',
            px: 3, pt: 3, position: 'relative', background: 'transparent'
          }}>
            <Typography sx={{
              fontSize: '14px', lineHeight: 1.5, color: 'rgba(20, 30, 50, 0.85)', mb: 2.5,
              ...(expanded ? {} : {
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                overflow: 'hidden', position: 'relative',
                minHeight: '4.5em', maxHeight: '4.5em'
              }),
              '&::after': !expanded && project?.description && project.description.length > 120 ? {
                content: '""', position: 'absolute', bottom: 0, right: 0, width: '40%', height: '1.5em',
                background: 'linear-gradient(to right, rgba(240,245,255,0) 0%, rgba(240,245,255,0.95) 80%)', pointerEvents: 'none'
              } : {}
            }}>
              {project?.description || 'No description available'}
            </Typography>

            {design.hasMetrics && (
              <Box sx={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderRadius: '10px',
                background: design.background, overflow: 'visible', mb: 3, mt: 1, height: '80px',
                border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 12px rgba(0, 20, 50, 0.15)'
              }}>
                {metrics.map((metric, index) => (
                  <Tooltip key={index} title={metric.description || metric.label} arrow>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1.5,
                      borderRight: index < metrics.length - 1 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
                    }}>
                      <Typography sx={{ fontSize: '17px', fontWeight: 600, color: 'white', mb: 0.5, lineHeight: 1.2 }}>
                        {metric.value}
                      </Typography>
                      <Typography sx={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 500, lineHeight: 1.2 }}>
                        {metric.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            )}

            {expanded && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ height: '1px',
                  background: 'linear-gradient(to right, rgba(10,30,80,0.02), rgba(10,30,80,0.08), rgba(10,30,80,0.02))',
                  my: 2 }} />
                {project?.challenges && renderSection("Challenges", project.challenges)}
                {project?.impact && renderSection("Impact", project.impact)}
              </Box>
            )}

            <Box sx={{ mb: 3, mt: !expanded ? 'auto' : 3, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'rgba(10, 30, 60, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  TECHNOLOGIES
                </Typography>
                {design.hasDetailedContent && (
                  <Button
                    onClick={toggleExpanded}
                    size="small"
                    endIcon={expanded ? <KeyboardArrowUpRounded fontSize="small" /> : <KeyboardArrowDownRounded fontSize="small" />}
                    sx={{
                      minWidth: 'auto', fontSize: '11px', fontWeight: 600, py: 0, px: 1,
                      color: 'rgba(10, 30, 60, 0.85)', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                  >
                    {expanded ? 'Show Less' : 'Show More'}
                  </Button>
                )}
              </Box>
              <Box sx={{
                display: 'flex', flexWrap: 'wrap', gap: '8px',
                maxHeight: !expanded && design.shouldCollapseTechs ? '90px' : 'none',
                height: !expanded ? '90px' : 'auto',
                overflowY: !expanded && design.shouldCollapseTechs ? 'hidden' : 'visible',
                position: 'relative', pb: !expanded && design.shouldCollapseTechs ? 2 : 0,
                mx: -0.5, px: 0.5,
                '&:after': !expanded && design.shouldCollapseTechs ? {
                  content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
                  background: 'linear-gradient(to bottom, rgba(245,250,255,0) 0%, rgba(245,250,255,0.98) 90%)',
                  pointerEvents: 'none'
                } : {}
              }}>
                {technologies.map((tech, index) => {
                  if (!expanded && design.shouldCollapseTechs && index >= 10) return null;
                  const iconInfo = TECH_ICONS[tech];
                  const techColor = iconInfo?.color || '#697dcf';
                  const TechIcon = iconInfo?.icon;
                  return (
                    <Box key={index} sx={{
                      height: '28px', display: 'flex', alignItems: 'center', gap: 0.5,
                      fontSize: '12px', fontWeight: 600, borderRadius: '14px', padding: '0 10px',
                      color: '#fff', background: `linear-gradient(180deg, ${alpha(techColor, 0.85)}, ${alpha(techColor, 0.7)})`,
                      border: `1px solid ${alpha(techColor, 0.9)}`,
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', whiteSpace: 'nowrap',
                      '&:hover': { transform: 'translateY(-1px)' }
                    }}>
                      {TechIcon && (<TechIcon size={12} color="#fff" strokeWidth={2.2} style={{ flexShrink: 0 }} />)}
                      <span>{tech}</span>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box sx={{
              px: 3, pb: 3, pt: 2, position: 'relative', zIndex: 1, mt: 'auto', mx: -3,
              background: design.background,
              borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.35)'
            }}>
              <motion.div whileHover={{ scale: 1.01, y: -1 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                <Button
                  onClick={handleViewDetails}
                  endIcon={
                    <Box sx={{ width: '24px', height: '24px', borderRadius: '50%',
                      bgcolor: 'rgba(255, 255, 255, 0.95)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0, 20, 50, 0.2)' }}>
                      <ArrowForwardRounded sx={{ color: 'rgba(10, 30, 60, 0.87)', fontSize: '14px' }} />
                    </Box>
                  }
                  disableElevation
                  fullWidth
                  sx={{
                    background: 'rgba(255, 255, 255, 0.75)', borderRadius: '12px',
                    height: '44px', fontWeight: 600, fontSize: '15px', color: 'rgba(10, 30, 60, 0.9)',
                    textTransform: 'none', border: '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: expanded ? '0 6px 20px rgba(0, 20, 50, 0.1)' : '0 4px 16px rgba(0, 20, 50, 0.08)',
                    backdropFilter: 'blur(4px)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 6px 20px rgba(0, 20, 50, 0.16)',
                      borderColor: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {expanded ? 'View Full Case Study' : 'View Case Study'}
                  </Typography>
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Card>
      </motion.div>

      {/* Floating Show Less Button (optional, can be kept as additional method to collapse) */}
      {expanded && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: 48,
            height: 48
          }}
        >
          <IconButton
            aria-label="Show Less"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(false);
            }}
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#1976d2',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#1565c0',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.35)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <ArrowUp size={24} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ProjectCard;