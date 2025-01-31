'use client';

import { useParams, useRouter } from 'next/navigation';
import { memo, useMemo, useRef, useState } from 'react';
import { cvProjects } from '../../data/cvProjects';
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Chip,
  Stack,
  useTheme,
  IconButton,
  Collapse,
  Divider,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  PersonOutline,
  BusinessCenter,
  PeopleAlt,
  Schedule,
  Code as CodeIcon
} from '@mui/icons-material';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  clientName: string;
  challenges: string;
  measurableOutcomes?: {
    before: any;
    after: any;
  };
  approach: ApproachStep[];
  metrics?: Metric[];
  achievements?: string[];
  lessonsLearned?: string;
  teamSize: string;
  timeline: string;
  technologies: string[];
  technologyIcons: React.ElementType[];
  icon: React.ElementType;
}

interface ApproachStep {
  title: string;
  description: string;
}

interface Metric {
  value: number;
  label: string;
  description: string;
}

const FloatingParticles = ({ quantity = 30 }: { quantity?: number }) => {
  return (
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      {[...Array(quantity)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
            borderRadius: '50%',
            width: 6,
            height: 6
          }}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100,
            y: Math.random() * 100
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            x: Math.random() * 100,
            y: Math.random() * 100
          }}
          transition={{
            duration: 2 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </Box>
  );
};

const BeforeAfterSlider = ({ before, after }: { before: any; after: any }) => {
  const [position, setPosition] = useState(50);
  const theme = useTheme();

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: 300,
      borderRadius: 2,
      overflow: 'hidden',
      mt: 4
    }}>
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        opacity: 0.1
      }} />
      
      <Box sx={{
        position: 'absolute',
        left: 0,
        width: `${position}%`,
        height: '100%',
        overflow: 'hidden'
      }}>
        <Box sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: alpha(theme.palette.primary.main, 0.1)
        }}>
          <Typography variant="h6" color="primary">Before</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>{before.value}</Typography>
          <Typography color="textSecondary">{before.label}</Typography>
        </Box>
      </Box>

      <Box sx={{
        position: 'absolute',
        right: 0,
        width: `${100 - position}%`,
        height: '100%',
        overflow: 'hidden'
      }}>
        <Box sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          background: alpha(theme.palette.secondary.main, 0.1)
        }}>
          <Typography variant="h6" color="secondary">After</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>{after.value}</Typography>
          <Typography color="textSecondary">{after.label}</Typography>
        </Box>
      </Box>

      <motion.div
        style={{
          position: 'absolute',
          left: `${position}%`,
          top: 0,
          bottom: 0,
          width: 4,
          background: theme.palette.common.white,
          cursor: 'col-resize'
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={(e, { delta }) => {
          setPosition(prev => Math.min(Math.max(prev + delta.x / 3, 10), 90));
        }}
      />
    </Box>
  );
};

const ProjectTimeline = ({ approach }: { approach: ApproachStep[] }) => {
  const theme = useTheme();
  
  return (
    <Timeline position="alternate" sx={{ my: 4 }}>
      {approach.map((step, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot sx={{ 
              bgcolor: 'transparent',
              border: `2px solid ${theme.palette.secondary.main}`,
              width: 40,
              height: 40,
            }}>
              {index + 1}
            </TimelineDot>
            {index < approach.length - 1 && (
              <TimelineConnector sx={{ bgcolor: 'divider' }} />
            )}
          </TimelineSeparator>
          <TimelineContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box sx={{ p: 3, position: 'relative' }}>
                <Divider sx={{ 
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  height: '60%',
                  borderColor: theme.palette.secondary.main,
                  transform: 'translateY(-50%)'
                }} />
                <Typography variant="h6" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </motion.div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const ProjectDetails = () => {
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [expandedSection, setExpandedSection] = useState<string | null>('challenge');

  const project = useMemo(
    () => cvProjects.find((p: Project) => p.id === id),
    [id]
  );

  if (!project) return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Container>
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Box
      component="main"
      ref={containerRef}
      sx={{
        background: `radial-gradient(circle at top left, 
          ${alpha(theme.palette.primary.dark, 0.2)}, 
          ${theme.palette.background.default})`,
        minHeight: '100vh',
        padding: '7rem 0 4rem',
        position: 'relative'
      }}
    >
      <FloatingParticles />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 1000,
            backdropFilter: 'blur(8px)',
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            '&:hover': {
              bgcolor: alpha(theme.palette.background.paper, 0.9)
            }
          }}
        >
          Return
        </Button>

        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              lineHeight: 1.2
            }}>
              {project.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              {project.description}
            </Typography>
          </motion.div>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={6}>
          <Grid item xs={12} lg={8}>
            {/* Challenge Section */}
            <Box sx={{
              background: alpha(theme.palette.background.paper, 0.8),
              borderRadius: 4,
              p: 4,
              mb: 4,
              backdropFilter: 'blur(12px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
              <Box onClick={() => toggleSection('challenge')} sx={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>The Challenge</Typography>
                  <IconButton>
                    {expandedSection === 'challenge' ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={expandedSection === 'challenge'}>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  {project.challenges}
                </Typography>
                {project.measurableOutcomes && (
                  <BeforeAfterSlider 
                    before={project.measurableOutcomes.before}
                    after={project.measurableOutcomes.after}
                  />
                )}
              </Collapse>
            </Box>

            {/* Approach Section */}
            <Box sx={{
              background: alpha(theme.palette.background.paper, 0.8),
              borderRadius: 4,
              p: 4,
              mb: 4,
              backdropFilter: 'blur(12px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
              <Box onClick={() => toggleSection('approach')} sx={{ cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>Our Approach</Typography>
                  <IconButton>
                    {expandedSection === 'approach' ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={expandedSection === 'approach'}>
                <ProjectTimeline approach={project.approach} />
              </Collapse>
            </Box>

            {/* Achievements Section */}
            {project.achievements && (
              <Box sx={{
                background: alpha(theme.palette.background.paper, 0.8),
                borderRadius: 4,
                p: 4,
                mb: 4,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}>
                <Typography variant="h3" sx={{ mb: 4 }}>Key Achievements</Typography>
                <Grid container spacing={4}>
                  {project.achievements.map((achievement, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Box sx={{
                          p: 3,
                          background: alpha(theme.palette.secondary.main, 0.05),
                          borderRadius: 2,
                          borderLeft: `4px solid ${theme.palette.secondary.main}`,
                          height: '100%'
                        }}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{
                              width: 40,
                              height: 40,
                              background: alpha(theme.palette.secondary.main, 0.1),
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="h6" color="secondary">
                                {index + 1}
                              </Typography>
                            </Box>
                            <Typography variant="body1">{achievement}</Typography>
                          </Stack>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>

          {/* Sidebar Section */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              {/* Project Overview */}
              <Box sx={{
                background: alpha(theme.palette.background.paper, 0.8),
                borderRadius: 4,
                p: 4,
                mb: 4,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}>
                <Typography variant="h4" sx={{ mb: 3 }}>Project Overview</Typography>
                <Stack spacing={3}>
                  <QuickFactItem
                    icon={<PersonOutline />}
                    label="Role"
                    value={project.role}
                  />
                  <QuickFactItem
                    icon={<BusinessCenter />}
                    label="Client"
                    value={project.clientName}
                  />
                  <QuickFactItem
                    icon={<PeopleAlt />}
                    label="Team Size"
                    value={project.teamSize}
                  />
                  <QuickFactItem
                    icon={<Schedule />}
                    label="Timeline"
                    value={project.timeline}
                  />
                </Stack>
              </Box>

              {/* Tech Stack */}
              <Box sx={{
                background: alpha(theme.palette.background.paper, 0.8),
                borderRadius: 4,
                p: 4,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}>
                <Typography variant="h4" sx={{ mb: 3 }}>Technology Stack</Typography>
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  '& svg': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.2)',
                      color: theme.palette.secondary.main
                    }
                  }
                }}>
                  {project.technologies.map((tech, index) => {
                    const Icon = project.technologyIcons[index] || CodeIcon;
                    return (
                      <Tooltip key={tech} title={tech} arrow>
                        <Icon sx={{ 
                          fontSize: 32,
                          color: theme.palette.text.secondary,
                          m: 1
                        }} />
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const QuickFactItem = ({ icon, label, value }: { 
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2,
      background: alpha(theme.palette.background.default, 0.4),
      borderRadius: 2
    }}>
      <Box sx={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: alpha(theme.palette.secondary.main, 0.1),
        borderRadius: '50%'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Box>
  );
};

export default ProjectDetails;