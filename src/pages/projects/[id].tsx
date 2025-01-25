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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { motion, useScroll, useTransform } from 'framer-motion';

const CaseStudyHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.gradients?.primary || 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
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

const ImpactMetric = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(theme.palette.background.default, 0.5)})`,
  boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.1)}`,
  textAlign: 'center',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 64px ${alpha(theme.palette.primary.main, 0.2)}`
  }
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 100%)`,
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
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: '2px'
  }
}));

const ProjectDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

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

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <CaseStudyHeader>
        <motion.div style={{ y }} className="parallax-bg">
          <Box sx={{
            position: 'absolute',
            top: '30%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: `radial-gradient(${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%)`,
            filter: 'blur(60px)'
          }} />
          <Box sx={{
            position: 'absolute',
            top: '50%',
            right: '20%',
            width: '300px',
            height: '300px',
            background: `radial-gradient(${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 70%)`,
            filter: 'blur(80px)'
          }} />
        </motion.div>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            position: 'absolute',
            left: theme.spacing(4),
            top: theme.spacing(4),
            color: 'white',
            backdropFilter: 'blur(4px)',
            background: alpha('#ffffff', 0.1),
            borderRadius: '12px',
            py: 1.5,
            px: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: alpha('#ffffff', 0.2),
              transform: 'translateX(-4px)'
            }
          }}
        >
          Back
        </Button>

        <Container maxWidth="lg">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h1" sx={{ 
              fontWeight: 800, 
              mb: 3, 
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
              textShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              {project.name}
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

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative' }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            { value: '40%', label: 'Performance Improvement' },
            { value: '£1.2M', label: 'Annual Cost Savings' },
            { value: '98%', label: 'Uptime Achieved' },
          ].map((metric, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
              >
                <ImpactMetric>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 800, 
                    mb: 1,
                    background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
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
                </ImpactMetric>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Section title="The Challenge" defaultOpen>
              <Typography variant="body1" sx={{ 
                lineHeight: 1.8, 
                color: 'text.secondary',
                fontSize: '1.1rem'
              }}>
                {project.challenges}
              </Typography>
            </Section>

            <Section title="Our Approach" toggleable>
              <Typography variant="body1" paragraph sx={{ 
                lineHeight: 1.8, 
                color: 'text.secondary',
                fontSize: '1.1rem'
              }}>
                We implemented a three-phase strategy focusing on architectural modernization,
                continuous integration, and rigorous testing protocols.
              </Typography>
              <Timeline position="alternate" sx={{ my: 4 }}>
                {['Discovery & Planning', 'Implementation', 'Deployment & Optimization'].map((step, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot sx={{ 
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                      }} />
                      {index < 2 && <TimelineConnector sx={{ 
                        background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` 
                      }} />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600,
                        color: 'text.primary'
                      }}>
                        {step}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Section>

            <Section title="Key Achievements" toggleable>
              <List dense sx={{ '& .MuiListItem-root': { py: 1.5 } }}>
                {project.achievements?.map((achievement, index) => (
                  <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                    <Box sx={{
                      width: '8px',
                      height: '8px',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: '50%',
                      mt: 1.5,
                      mr: 2
                    }} />
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
                ))}
              </List>
            </Section>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: '100px' }}>
              <QuickFacts
                teamSize={project.teamSize}
                timeline={project.timeline}
                technologies={project.technologies}
                stakeholders={project.stakeholders}
              />
            </Box>
          </Grid>
        </Grid>

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
                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`
              }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  Before Implementation
                </Typography>
                <List>
                  {['Legacy system limitations', 'Manual processes', 'Frequent downtime'].map((item, index) => (
                    <ListItem key={index} sx={{ color: 'error.main', py: 0.5 }}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 4,
                borderRadius: '24px',
                background: `linear-gradient(145deg, ${alpha(theme.palette.success.light, 0.08)}, transparent)`,
                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`
              }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  After Implementation
                </Typography>
                <List>
                  {['Automated CI/CD pipelines', 'Scalable infrastructure', '99.9% availability'].map((item, index) => (
                    <ListItem key={index} sx={{ color: 'success.main', py: 0.5 }}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Section>
      </Container>
    </Box>
  );
};

const Section: React.FC<{
  title: string;
  toggleable?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, children, toggleable = false, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

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
          <IconButton sx={{ 
            background: alpha('#ffffff', 0.1),
            '&:hover': { background: alpha('#ffffff', 0.2) }
          }}>
            {open ? 
              <ExpandLessIcon sx={{ color: 'primary.main' }} /> : 
              <ExpandMoreIcon sx={{ color: 'primary.main' }} />}
          </IconButton>
        )}
      </Box>
      <Collapse in={!toggleable || open}>
        {children}
      </Collapse>
    </Box>
  );
};

const QuickFacts: React.FC<{
  teamSize: number;
  timeline: string;
  technologies: string[];
  stakeholders: string[];
}> = ({ teamSize, timeline, technologies, stakeholders }) => (
  <Box sx={{
    background: alpha('#ffffff', 0.02),
    borderRadius: '24px',
    p: 3,
    boxShadow: '0 8px 32px rgba(26, 35, 126, 0.1)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${alpha('#ffffff', 0.1)}`
  }}>
    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
      Project Quick Facts
    </Typography>
    <Stack spacing={3}>
      {[
        { label: 'Team Size', value: `${teamSize} members` },
        { label: 'Timeline', value: timeline },
        { label: 'Technologies', value: technologies },
        { label: 'Stakeholders', value: stakeholders },
      ].map((fact, index) => (
        <div key={index}>
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 600, 
            mb: 1,
            color: 'text.primary'
          }}>
            {fact.label}
          </Typography>
          {Array.isArray(fact.value) ? (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {fact.value.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item}
                  size="small"
                  sx={{ 
                    mb: 1, 
                    background: alpha('#ffffff', 0.05),
                    color: 'text.primary',
                    border: `1px solid ${alpha('#ffffff', 0.1)}`,
                    '&:hover': {
                      background: alpha('#ffffff', 0.1)
                    }
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography variant="body1" sx={{ 
              color: 'text.secondary',
              fontWeight: 500
            }}>
              {fact.value}
            </Typography>
          )}
        </div>
      ))}
    </Stack>
  </Box>
);

export default ProjectDetails;