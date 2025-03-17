import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Typography, Tooltip, Button, Card, useTheme, alpha, IconButton } from '@mui/material';
import { ArrowForwardRounded, StarRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded, InfoOutlined } from '@mui/icons-material';
import { Code as DefaultIcon } from 'lucide-react';
import { Cloud, CircuitBoard, Server, Settings, Terminal, Database, Code2, GitBranch, Box as BoxIcon, Network, BarChart3 } from 'lucide-react';

// Consolidate static data
const projectBackgrounds: Record<string, string> = {
  '1': 'linear-gradient(135deg, #1a237e, #283593)', '2': 'linear-gradient(135deg, #4a148c, #6a1b9a)',
  '3': 'linear-gradient(135deg, #004d40, #00695c)', '4': 'linear-gradient(135deg, #0d47a1, #1565c0)',
  '5': 'linear-gradient(135deg, #006064, #00838f)', '6': 'linear-gradient(135deg, #b71c1c, #c62828)',
  '7': 'linear-gradient(135deg, #e65100, #ef6c00)', '8': 'linear-gradient(135deg, #1b5e20, #2e7d32)',
  '9': 'linear-gradient(135deg, #01579b, #0277bd)', '10': 'linear-gradient(135deg, #880e4f, #ad1457)',
  '11': 'linear-gradient(135deg, #ff6f00, #ff8f00)'
};

interface TechnologyIconInfo {
  icon: React.ElementType;
  color: string;
}

const technologyIconMap: Record<string, TechnologyIconInfo> = {
  ".NET Core": { icon: Code2, color: '#7662EA' }, "Java": { icon: Terminal, color: '#FF7E50' },
  "AWS": { icon: Cloud, color: '#FF9D3B' }, "Docker": { icon: Server, color: '#5BBBFF' },
  "Kubernetes": { icon: Cloud, color: '#4C7BFF' }, "React": { icon: CircuitBoard, color: '#61DBFB' },
  "TypeScript": { icon: Code2, color: '#5E8AFF' }, "CQRS": { icon: Database, color: '#9D8BFF' },
  "Azure": { icon: Cloud, color: '#45AEF5' }, "Terraform": { icon: Settings, color: '#A26FF8' },
  "RabbitMQ": { icon: Network, color: '#FF895D' }, "Microservices": { icon: BoxIcon, color: '#56D67E' },
  "CI/CD": { icon: GitBranch, color: '#FF7878' }, "Analytics": { icon: BarChart3, color: '#4F9DF3' },
  "Helm": { icon: Settings, color: '#0F1689' }
};

// Define types for the component props
interface ProjectMetric {
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
  background?: string;
  brandColor?: string;
  icon?: React.ElementType;
  iconColor?: string;
  featured?: boolean;
  technologies?: string[];
  technologyIcons?: React.ElementType[];
  metrics?: ProjectMetric[];
}

interface ProjectCardProps {
  project?: Project;
  sx?: Record<string, any>;
  delay?: number;
  priority?: boolean;
  onSelect?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, sx = {}, delay = 0, priority = false, onSelect }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Consolidated design variables and computed properties
  const designVars = useMemo(() => {
    // Fix for the type error - safely check description length
    const descriptionLength = project?.description ? project.description.length : 0;
    const hasLongDescription = descriptionLength > 120;
    
    return {
      bannerImage: project?.bannerImage ? `/images/${project.bannerImage}` : '/images/placeholder.jpg',
      brandColor: project?.brandColor || theme.palette.primary.main,
      cardBg: '#000000',
      projectBackground: (project?.id && project.id in projectBackgrounds ? projectBackgrounds[project.id] : null) || project?.background || null,
      hasDetailedContent: Boolean(project?.challenges || project?.impact || hasLongDescription),
      techCount: project?.technologies?.length || 0,
      shouldCollapseTechs: (project?.technologies?.length || 0) > 5,
      hasTechnologyIcons: Array.isArray(project?.technologyIcons) && project.technologyIcons.length > 0,
      hasMetrics: Array.isArray(project?.metrics) && project.metrics.length > 0
    };
  }, [project, theme]);

  // Load image
  useEffect(() => {
    if ((!priority && !inView) || (project?.background && !project?.bannerImage)) {
      setImageLoaded(true);
      return;
    }
    
    const img = new Image();
    img.src = designVars.bannerImage;
    const timeoutId = setTimeout(() => setImageLoaded(true), 800);
    img.onload = () => { clearTimeout(timeoutId); setImageLoaded(true); };
    img.onerror = () => { clearTimeout(timeoutId); setImageLoaded(true); };
    
    return () => clearTimeout(timeoutId);
  }, [priority, inView, designVars.bannerImage, project?.background]);

  // Reset expanded state when project changes
  useEffect(() => { setExpanded(false); }, [project?.id]);

  // Icon helpers
  const renderIcon = useMemo(() => {
    if (!project?.icon) return <DefaultIcon size={18} color={designVars.brandColor} strokeWidth={1.5} />;
    try {
      const iconColor = project.iconColor || designVars.brandColor;
      return React.createElement(project.icon, { 
        size: 18,
        color: iconColor.startsWith('text-') ? undefined : iconColor,
        className: iconColor.startsWith('text-') ? iconColor : undefined,
        strokeWidth: 1.5
      });
    } catch (error) {
      return <DefaultIcon size={18} color={designVars.brandColor} strokeWidth={1.5} />;
    }
  }, [project?.icon, project?.iconColor, designVars.brandColor]);

  // Action handlers
  const toggleExpanded = (e?: React.MouseEvent) => { 
    if (e) { 
      e.preventDefault(); 
      e.stopPropagation(); 
    } 
    setExpanded(!expanded); 
  };
  
  const handleViewDetails = (e: React.MouseEvent) => { 
    e.preventDefault(); 
    e.stopPropagation(); 
    onSelect?.(project?.id || ''); 
  };

  if (!inView) return <Box ref={ref} sx={{ ...sx, my: 4, width: 380, height: 680 }} />;

  // Card style based on state
  const cardStyle = {
    width: 380, 
    height: expanded ? 'auto' : 680, 
    display: 'flex', 
    flexDirection: 'column',
    borderRadius: '16px', 
    overflow: 'hidden', 
    background: '#000000',
    boxShadow: isHovering && !expanded
      ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.12)' 
      : expanded 
        ? '0 24px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15)'
        : '0 12px 28px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transform: expanded ? 'scale(1.03)' : isHovering ? 'translateY(-4px) scale(1.01)' : 'none',
    position: 'relative',
    zIndex: expanded ? 10 : 1
  };

  // Safe access to arrays
  const technologyIcons = project?.technologyIcons || [];
  const metrics = project?.metrics || [];
  const technologies = project?.technologies || [];

  return (
    <Box ref={ref} sx={{ width: 380, my: expanded ? 5 : 4, mx: 4, ...sx }}>
      <motion.div 
        initial={{ opacity: 0, y: 16 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}>
        <Card
          elevation={0}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => !expanded && onSelect?.(project?.id || '')}
          component="article"
          role="button"
          tabIndex={0}
          sx={cardStyle}>
          
          {/* Technology Icons */}
          {!expanded && designVars.hasTechnologyIcons && (
            <Box sx={{ display: 'flex', gap: 1.25, position: 'absolute', top: 12, left: 12, zIndex: 5 }}>
              {technologyIcons.slice(0, 4).map((Icon, index) => (
                <Box key={index} sx={{
                  width: 32, height: 32, borderRadius: '8px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', 
                  bgcolor: 'rgba(20, 20, 30, 0.85)', backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  '&:hover': { transform: 'translateY(-2px)' }
                }}>
                  {React.createElement(Icon, { size: 16, color: '#fff', strokeWidth: 1.75 })}
                </Box>
              ))}
            </Box>
          )}
          
          {/* Featured badge */}
          {project?.featured && (
            <Box sx={{
              position: 'absolute', zIndex: 10, top: 16, right: 16, borderRadius: '8px', 
              px: 1.5, py: 0.5, display: 'flex', alignItems: 'center', gap: 0.5,
              background: 'rgba(20, 20, 30, 0.85)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: isHovering && !expanded ? 'translateY(-2px)' : 'translateY(0)'
            }}>
              <StarRounded sx={{ color: '#ffd54f', fontSize: '14px' }} />
              <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>
                Featured
              </Typography>
            </Box>
          )}

          {/* Banner Image */}
          <Box sx={{ position: 'relative', width: '100%', height: '230px', overflow: 'hidden' }}>
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
                <Box
                  component="img"
                  src={designVars.bannerImage}
                  alt={`${project?.name || 'Project'} banner`}
                  loading={priority ? "eager" : "lazy"}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
                />
                <Box sx={{ position: 'absolute', inset: 0, 
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%)', zIndex: 1 }} />
              </motion.div>
            )}

            {/* Client badge */}
            <Box sx={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', 
                     alignItems: 'center', gap: 12, zIndex: 2, maxWidth: 'calc(100% - 32px)' }}>
              <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: '10px', display: 'flex',
                       alignItems: 'center', justifyContent: 'center',
                       bgcolor: 'rgba(20, 20, 30, 0.85)', backdropFilter: 'blur(20px)',
                       border: '1px solid rgba(255, 255, 255, 0.12)',
                       transform: isHovering && !expanded ? 'translateY(-2px)' : 'translateY(0)' }}>
                {renderIcon}
              </Box>
              <Box sx={{ overflow: 'hidden' }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '15px', whiteSpace: 'nowrap' }}>
                  {project?.clientName || ''}
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '12px', 
                                fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {project?.industry || 'Case Study'}
                </Typography>
              </Box>
            </Box>
            
            {/* Info/Expand Quick Action */}
            {!expanded && designVars.hasDetailedContent && (
              <IconButton 
                onClick={toggleExpanded}
                aria-label="Show project details"
                sx={{
                  position: 'absolute', right: 16, bottom: 16, zIndex: 5, width: 36, height: 36,
                  background: `linear-gradient(135deg, ${alpha(designVars.brandColor, 0.3)}, ${alpha(designVars.brandColor, 0.5)})`,
                  backdropFilter: 'blur(8px)', border: `1px solid ${alpha(designVars.brandColor, 0.4)}`,
                  color: '#fff',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(designVars.brandColor, 0.4)}, ${alpha(designVars.brandColor, 0.6)})`,
                  }
                }}>
                <InfoOutlined fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Content Area */}
          <Box sx={{ 
            flex: expanded ? '0 0 auto' : 1, display: 'flex', flexDirection: 'column', 
            px: 3, pt: 3, position: 'relative', background: '#000000'
          }}>
            {/* Title with Quick Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography component="h2" sx={{
                fontWeight: 700, fontSize: '21px', lineHeight: 1.25, color: '#fff', 
                position: 'relative', paddingBottom: 1.75, flex: 1,
                '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, 
                             width: '32px', height: '3px', borderRadius: '1.5px', 
                             background: designVars.brandColor }
              }}>
                {project?.name || 'Project'}
              </Typography>
              
              {expanded && (
                <IconButton onClick={toggleExpanded} aria-label="Collapse details" size="small"
                  sx={{ mt: -0.5, color: 'rgba(255, 255, 255, 0.6)',
                        '&:hover': { background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.9)' }
                }}>
                  <KeyboardArrowUpRounded />
                </IconButton>
              )}
            </Box>

            {/* Description */}
            <Typography sx={{
              fontSize: '14px', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.85)', mb: 2.5,
              ...(expanded ? {} : {
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                overflow: 'hidden', position: 'relative'
              }),
              '&::after': !expanded && project?.description && project.description.length > 120 ? {
                content: '""', position: 'absolute', bottom: 0, right: 0, width: '40%', height: '1.5em',
                background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, #000000 80%)', pointerEvents: 'none'
              } : {}
            }}>
              {project?.description || 'No description available'}
            </Typography>

            {/* Metrics */}
            {designVars.hasMetrics && (
              <Box sx={{ 
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderRadius: '10px', 
                background: 'rgba(25, 25, 35, 0.6)', overflow: 'hidden', 
                mb: expanded ? 3.5 : 3, mt: expanded ? 1 : 0,
                border: '1px solid rgba(255, 255, 255, 0.08)' 
              }}>
                {metrics.map((metric, index) => (
                  <Tooltip key={index} title={metric.description || metric.label} arrow>
                    <Box sx={{ 
                      display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1.75,
                      borderRight: index < metrics.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
                    }}>
                      <Typography sx={{ fontSize: '17px', fontWeight: 600, color: designVars.brandColor, mb: 0.75 }}>
                        {metric.value}
                      </Typography>
                      <Typography sx={{ fontSize: '11px', textTransform: 'uppercase', 
                                      color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>
                        {metric.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            )}

            {/* Expanded Content */}
            {expanded && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ height: '1px', 
                         background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                         my: 2 }} />
                
                {/* Challenges and Impact sections */}
                {(project?.challenges || project?.impact) && (
                  <>
                    {project?.challenges && renderContentSection("Challenges", project.challenges, designVars.brandColor)}
                    {project?.impact && renderContentSection("Impact", project.impact, designVars.brandColor)}
                  </>
                )}
              </Box>
            )}

            {/* Technologies Section */}
            <Box sx={{ mb: 3, mt: expanded ? 2 : 'auto', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.75 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase',
                               color: 'rgba(255, 255, 255, 0.5)' }}>
                  Technologies
                </Typography>
                
                {expanded && designVars.shouldCollapseTechs && (
                  <Typography sx={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                    {designVars.techCount} total
                  </Typography>
                )}
              </Box>
              
              {/* Technology Pills */}
              <Box sx={{ 
                display: 'flex', flexWrap: 'wrap', gap: 1.4, 
                maxHeight: !expanded && designVars.shouldCollapseTechs ? '56px' : 'none',
                overflowY: !expanded && designVars.shouldCollapseTechs ? 'hidden' : 'visible', 
                position: 'relative',
                '&:after': !expanded && designVars.shouldCollapseTechs ? {
                  content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: '30px',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 90%)', pointerEvents: 'none'
                } : {}
              }}>
                {technologies.map((tech, index) => {
                  if (!expanded && designVars.shouldCollapseTechs && index >= 5) return null;
                  
                  const iconInfo = technologyIconMap[tech];
                  const techColor = iconInfo?.color || '#697dcf';
                  const TechIcon = iconInfo?.icon;
                  
                  return (
                    <Box key={index} sx={{
                      height: '28px', display: 'flex', alignItems: 'center', gap: 0.75,
                      fontSize: '12px', fontWeight: 500, borderRadius: '14px', padding: '0 12px',
                      color: '#fff', background: `linear-gradient(180deg, ${alpha(techColor, 0.3)} 0%, ${alpha(techColor, 0.15)} 100%)`,
                      border: `1px solid ${alpha(techColor, 0.35)}`,
                      '&:hover': { transform: 'translateY(-1px)' }
                    }}>
                      {TechIcon && (<TechIcon size={13} color="#fff" strokeWidth={2} />)}
                      <span>{tech}</span>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: expanded ? 1 : 0.5 }}>
              {!expanded ? (
                designVars.hasDetailedContent && (
                  <Button
                    onClick={toggleExpanded}
                    variant="text"
                    endIcon={<KeyboardArrowDownRounded fontSize="small" />}
                    sx={{
                      minWidth: 120, height: '32px', borderRadius: '16px', fontSize: '11px',
                      fontWeight: 500, textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.12)', backgroundColor: 'rgba(30, 30, 40, 0.5)',
                      '&:hover': { backgroundColor: 'rgba(40, 40, 50, 0.7)', color: 'rgba(255, 255, 255, 0.75)' }
                    }}
                  >
                    More Details
                  </Button>
                )
              ) : (
                <Button
                  onClick={toggleExpanded}
                  variant="text"
                  startIcon={<KeyboardArrowUpRounded fontSize="small" />}
                  sx={{
                    minWidth: 100, height: '32px', borderRadius: '16px', fontSize: '11px',
                    fontWeight: 500, textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'rgba(30, 30, 40, 0.4)',
                    '&:hover': { backgroundColor: 'rgba(40, 40, 50, 0.6)', color: 'rgba(255, 255, 255, 0.7)' }
                  }}
                >
                  Collapse
                </Button>
              )}
            </Box>
          </Box>

          {/* CTA Section */}
          <Box sx={{ 
            px: 3, pb: 3, position: 'relative', zIndex: 1,
            background: designVars.projectBackground || 'linear-gradient(120deg, #121221, #1a1a2e)',
            borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px',
            borderTop: expanded ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
            mt: expanded ? 'auto' : 0
          }}>
            <motion.div whileHover={{ scale: 1.01, y: -1 }} 
                       transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
              <Button
                onClick={handleViewDetails}
                endIcon={
                  <Box sx={{ width: '24px', height: '24px', borderRadius: '50%', 
                           bgcolor: 'rgba(255, 255, 255, 0.95)', display: 'flex', 
                           alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowForwardRounded sx={{ 
                      color: designVars.projectBackground ? 'rgba(0, 0, 0, 0.87)' : designVars.brandColor, 
                      fontSize: '14px' 
                    }} />
                  </Box>
                }
                disableElevation
                fullWidth
                sx={{
                  background: 'rgba(255, 255, 255, 0.15)', borderRadius: '12px', 
                  height: '46px', fontWeight: 600, fontSize: '15px', color: '#fff', 
                  textTransform: 'none', border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: expanded ? '0 6px 20px rgba(0, 0, 0, 0.25)' : '0 4px 16px rgba(0, 0, 0, 0.2)',
                  '&:hover': { 
                    background: 'rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                    borderColor: 'rgba(255, 255, 255, 0.35)'
                  }
                }}
              >
                {expanded ? 'View Full Case Study' : 'View Case Study'}
              </Button>
            </motion.div>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

// Helper function for rendering content sections (challenges, impact)
const renderContentSection = (title: string, content: string, brandColor: string) => (
  <Box sx={{ mb: title === "Impact" ? 0 : 2.5 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <Box sx={{ 
        width: 16, height: 16, borderRadius: '50%', 
        background: `linear-gradient(135deg, ${alpha(brandColor, 0.15)}, ${alpha(brandColor, 0.3)})`,
        border: `1px solid ${alpha(brandColor, 0.4)}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: brandColor }} />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '13px', color: brandColor, textTransform: 'uppercase' }}>
        {title}
      </Typography>
    </Box>
    <Typography sx={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.78)' }}>
      {content}
    </Typography>
  </Box>
);

export default ProjectCard;