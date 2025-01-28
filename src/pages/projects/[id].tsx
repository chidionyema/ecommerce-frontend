"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import { cvProjects } from '../../data/cvProjects';
import {
  Box,
  Typography,
  Chip,
  Container,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Stack,
  Divider,
  styled,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { motion, AnimatePresence } from 'framer-motion';

// Brand color constants
const PRIMARY_DARK = '#0A1A2F';
const SECONDARY_DARK = '#532F73';
const GOLD_ACCENT = '#C5A46D';
const LIGHT_ACCENT = '#F2E7FE';
const PAGE_BG = '#F9FAFD';

const FloatingParticle = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  background: `radial-gradient(${alpha(theme.palette.primary.main, 0.3)} 0%, transparent 70%)`,
  filter: 'blur(40px)',
  borderRadius: '50%',
}));

const CaseStudyHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${SECONDARY_DARK} 100%)`,
  color: theme.palette.common.white,
  padding: theme.spacing(15, 4),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, ${alpha('#ffffff', 0.05)} 25%, transparent 100%)`,
    pointerEvents: 'none'
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: `linear-gradient(to top, ${theme.palette.background.default} 0%, transparent 100%)`
  }
}));

const ImpactMetric = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.default, 0.2)})`,
  boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.1)}`,
  textAlign: 'center',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  cursor: 'pointer',
  transformStyle: 'preserve-3d',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 64px ${alpha(theme.palette.primary.main, 0.3)}`,
    '&:after': { opacity: 0.2 }
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    background: `linear-gradient(45deg, ${alpha(GOLD_ACCENT, 0.1)}, transparent)`,
    opacity: 0,
    transition: 'opacity 0.3s ease'
  }
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${GOLD_ACCENT} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  paddingBottom: theme.spacing(2),
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '64px',
    height: '4px',
    background: `linear-gradient(90deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
    borderRadius: '2px',
    transformOrigin: 'left center',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  '&:hover:after': {
    transform: 'scaleX(1.5)'
  }
}));

const Section: React.FC<{
  title: string;
  toggleable?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, children, toggleable = false, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const theme = useTheme();

  return (
    <Box sx={{ mb: 6 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          cursor: toggleable ? 'pointer' : 'default',
        }}
        onClick={() => toggleable && setOpen(!open)}
      >
        <SectionHeader variant="h4">
          {title}
        </SectionHeader>
        {toggleable && (
          <IconButton
            sx={{
              background: alpha('#ffffff', 0.05),
              '&:hover': { background: alpha('#ffffff', 0.1) }
            }}
          >
            {open ? (
              <ExpandLessIcon sx={{ color: GOLD_ACCENT }} />
            ) : (
              <ExpandMoreIcon sx={{ color: GOLD_ACCENT }} />
            )}
          </IconButton>
        )}
      </Box>
      <Collapse in={!toggleable || open}>
        {children}
      </Collapse>
    </Box>
  );
};

const ProjectDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const project = cvProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Project not found
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: PAGE_BG, minHeight: '100vh' }}>
      <CaseStudyHeader>
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <FloatingParticle
            animate={{
              x: ['10%', '-10%', '10%'],
              y: ['30%', '50%', '30%'],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '200px', height: '200px' }}
          />
          <FloatingParticle
            animate={{
              x: ['-20%', '20%', '-20%'],
              y: ['60%', '40%', '60%'],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '300px', height: '300px' }}
          />
        </Box>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ position: 'absolute', left: 32, top: 32 }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{
              color: 'white',
              backdropFilter: 'blur(12px)',
              background: alpha('#ffffff', 0.1),
              borderRadius: '16px',
              py: 1.5,
              px: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: `1px solid ${alpha(GOLD_ACCENT, 0.2)}`,
              '&:hover': { 
                background: alpha('#ffffff', 0.2),
                boxShadow: `0 12px 40px ${alpha(GOLD_ACCENT, 0.2)}`
              }
            }}
          >
            <Typography variant="button" sx={{ fontWeight: 600 }}>
              Back
            </Typography>
          </Button>
        </motion.div>

        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h1" sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: isMobile ? '2.5rem' : '4rem',
              lineHeight: 1.2,
              textShadow: '0 4px 12px rgba(0,0,0,0.2)',
              position: 'relative'
            }}>
              {project.name}
              <motion.div
                style={{
                  position: 'absolute',
                  top: -10,
                  left: -20,
                  width: 12,
                  height: 12,
                  background: `radial-gradient(${PRIMARY_DARK}, ${alpha(PRIMARY_DARK, 0.3)})`,
                  borderRadius: '50%',
                  filter: 'blur(2px)'
                }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: -10,
                  right: -20,
                  width: 12,
                  height: 12,
                  background: `radial-gradient(${SECONDARY_DARK}, ${alpha(SECONDARY_DARK, 0.3)})`,
                  borderRadius: '50%',
                  filter: 'blur(2px)'
                }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </Typography>
            <Typography variant="h5" sx={{
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.9,
              fontWeight: 400,
              letterSpacing: '0.5px'
            }}>
              {project.description}
            </Typography>
          </motion.div>
        </Container>
      </CaseStudyHeader>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            { value: '40%', label: 'Performance Improvement' },
            { value: '£1.2M', label: 'Annual Cost Savings' },
            { value: '98%', label: 'Uptime Achieved' },
          ].map((metric, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ImpactMetric
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{
                  rest: { rotateX: 0, rotateY: 0 },
                  hover: { rotateX: 5, rotateY: 5 }
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div variants={{ hover: { translateZ: 20 } }}>
                  <Typography variant="h2" sx={{
                    fontWeight: 800,
                    mb: 1,
                    background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${GOLD_ACCENT})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: 'text.secondary',
                    fontWeight: 500
                  }}>
                    {metric.label}
                  </Typography>
                </motion.div>
              </ImpactMetric>
            </Grid>
          ))}
        </Grid>

        <AnimatePresence>
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Section title="The Challenge" defaultOpen>
                  <Typography variant="body1" sx={{
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    fontSize: '1.1rem'
                  }}>
                    {project.challenges}
                  </Typography>
                </Section>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Section title="Our Approach" toggleable>
                  <Timeline position="alternate" sx={{ my: 4 }}>
                    {['Discovery & Planning', 'Implementation', 'Deployment & Optimization'].map((step, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                          >
                            <TimelineDot sx={{
                              background: `linear-gradient(45deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
                              boxShadow: `0 4px 12px ${alpha(PRIMARY_DARK, 0.3)}`
                            }} />
                          </motion.div>
                          {index < 2 && (
                            <TimelineConnector sx={{
                              background: `linear-gradient(to bottom, ${alpha(PRIMARY_DARK, 0.3)}, ${alpha(SECONDARY_DARK, 0.3)})`,
                              position: 'relative'
                            }} />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 + 0.1 }}
                          >
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {step}
                            </Typography>
                          </motion.div>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Section>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Section title="Key Achievements" toggleable>
                  <List dense>
                    {project.achievements?.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ListItem sx={{ alignItems: 'flex-start' }}>
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Box sx={{
                              width: 8,
                              height: 8,
                              background: `linear-gradient(45deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
                              borderRadius: '50%',
                              mt: 1.5,
                              mr: 2
                            }} />
                          </motion.div>
                          <ListItemText
                            primary={achievement}
                            primaryTypographyProps={{ 
                              variant: 'body1', 
                              sx: { 
                                color: 'text.secondary',
                                lineHeight: 1.6
                              } 
                            }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Section>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ position: 'sticky', top: '100px' }}
              >
                <motion.div whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <QuickFacts
                    teamSize={project.teamSize}
                    timeline={project.timeline}
                    technologies={project.technologies}
                    stakeholders={project.stakeholders}
                  />
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </AnimatePresence>

        <Divider sx={{ 
          my: 8,
          borderColor: alpha(theme.palette.divider, 0.1),
          borderWidth: '2px'
        }} />

        <Section title="Measurable Outcomes" defaultOpen>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 4,
                borderRadius: '24px',
                background: `linear-gradient(145deg, ${alpha(theme.palette.error.light, 0.08)}, transparent)`,
                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
                    Before Implementation
                  </Typography>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 800,
                    background: `linear-gradient(45deg, ${theme.palette.error.main} 30%, ${theme.palette.warning.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {project.measurableOutcomes?.before.percentage}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'text.secondary', 
                    mt: 1,
                    lineHeight: 1.6
                  }}>
                    {project.measurableOutcomes?.before.description}
                  </Typography>
                </motion.div>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 4,
                borderRadius: '24px',
                background: `linear-gradient(145deg, ${alpha(theme.palette.success.light, 0.08)}, transparent)`,
                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
                    After Implementation
                  </Typography>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 800,
                    background: `linear-gradient(45deg, ${theme.palette.success.main} 30%, ${theme.palette.info.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {project.measurableOutcomes?.after.percentage}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'text.secondary', 
                    mt: 1,
                    lineHeight: 1.6
                  }}>
                    {project.measurableOutcomes?.after.description}
                  </Typography>
                </motion.div>
              </Box>
            </Grid>
          </Grid>

          {project.metrics && (
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {project.metrics.map((metric, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: alpha(theme.palette.background.paper, 0.6),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    backdropFilter: 'blur(12px)'
                  }}>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 1
                    }}>
                      {metric.label}
                    </Typography>
                    <Typography variant="h4" sx={{
                      fontWeight: 800,
                      color: GOLD_ACCENT
                    }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      mt: 0.5
                    }}>
                      {metric.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Section>
      </Container>
    </Box>
  );
};

const QuickFacts: React.FC<{
  teamSize: number;  // Changed from string to number
  timeline: string;
  technologies: string[];
  stakeholders: string[];
}> = ({ teamSize, timeline, technologies, stakeholders }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{
      p: 4,
      borderRadius: '24px',
      background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.default, 0.2)})`,
      boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.1)}`,
      backdropFilter: 'blur(12px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
    }}>
      <Typography variant="h6" sx={{ 
        mb: 3,
        fontWeight: 700,
        color: GOLD_ACCENT
      }}>
        Project Snapshot
      </Typography>
      
      <Stack spacing={3}>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Team Size
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {teamSize}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Timeline
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {timeline}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Technologies
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
            {technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                size="small"
                sx={{
                  background: alpha(PRIMARY_DARK, 0.1),
                  color: PRIMARY_DARK,
                  fontWeight: 600,
                  mb: 1
                }}
              />
            ))}
          </Stack>
        </Box>
        
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Key Stakeholders
          </Typography>
          <List dense>
            {stakeholders.map((stakeholder, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText
                  primary={stakeholder}
                  primaryTypographyProps={{ 
                    variant: 'body1',
                    sx: { fontWeight: 500 } 
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProjectDetails;