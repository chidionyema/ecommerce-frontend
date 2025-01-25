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
  styled
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
import { motion } from 'framer-motion';

// Styled Components
const CaseStudyHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.gradients?.primary || 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  color: theme.palette.common.white,
  padding: theme.spacing(12, 4),
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
    background: 'url(/grid-pattern.svg) repeat',
    opacity: 0.1,
  },
}));

const ImpactMetric = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  background: 'linear-gradient(145deg, #ffffff, #f8f9fc)',
  boxShadow: '0 8px 32px rgba(26, 35, 126, 0.15)',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(26, 35, 126, 0.2)',
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1a237e',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '64px',
    height: '4px',
    background: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));

const ProjectDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

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
    <Box sx={{ backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
      <CaseStudyHeader>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            position: 'absolute',
            left: theme.spacing(4),
            top: theme.spacing(4),
            color: 'white',
            backdropFilter: 'blur(4px)',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Back
        </Button>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: isMobile ? '2.5rem' : '3.5rem' }}>
              {project.name}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ImpactMetric>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a237e', mb: 1 }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
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
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#444' }}>
                {project.challenges}
              </Typography>
            </Section>

            <Section title="Our Approach" toggleable>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: '#444' }}>
                We implemented a three-phase strategy focusing on architectural modernization,
                continuous integration, and rigorous testing protocols.
              </Typography>
              <Timeline position="alternate">
                {['Discovery & Planning', 'Implementation', 'Deployment & Optimization'].map((step, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      {index < 2 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {step}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Section>

            <Section title="Key Achievements" toggleable>
              <List dense>
                {project.achievements?.map((achievement, index) => (
                  <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                    <ListItemText
                      primary={achievement}
                      primaryTypographyProps={{ variant: 'body1', sx: { color: '#444' } }}
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

        <Divider sx={{ my: 8 }} />

        <Section title="Measurable Outcomes" defaultOpen>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Before Implementation
              </Typography>
              <List>
                <ListItem>Legacy system limitations</ListItem>
                <ListItem>Manual deployment processes</ListItem>
                <ListItem>Frequent downtime incidents</ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                After Implementation
              </Typography>
              <List>
                <ListItem>Automated CI/CD pipelines</ListItem>
                <ListItem>Scalable cloud infrastructure</ListItem>
                <ListItem>99.9% system availability</ListItem>
              </List>
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
          <IconButton>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
    background: 'white',
    borderRadius: '16px',
    p: 3,
    boxShadow: '0 8px 32px rgba(26, 35, 126, 0.1)',
  }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
      Project Quick Facts
    </Typography>
    <Stack spacing={2}>
      {[
        { label: 'Team Size', value: `${teamSize} members` },
        { label: 'Timeline', value: timeline },
        { label: 'Technologies', value: technologies },
        { label: 'Stakeholders', value: stakeholders },
      ].map((fact, index) => (
        <div key={index}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a237e' }}>
            {fact.label}
          </Typography>
          {Array.isArray(fact.value) ? (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {fact.value.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item}
                  size="small"
                  sx={{ mb: 1, background: '#f0f2f5', color: '#1a237e' }}
                />
              ))}
            </Stack>
          ) : (
            <Typography variant="body1" sx={{ color: '#666' }}>
              {fact.value}
            </Typography>
          )}
        </div>
      ))}
    </Stack>
  </Box>
);

export default ProjectDetails;