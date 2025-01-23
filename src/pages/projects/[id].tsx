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

const CaseStudyHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.gradients?.primary || 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  color: theme.palette.common.white,
  padding: theme.spacing(8),
  textAlign: 'center',
  position: 'relative',
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
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: 'linear-gradient(145deg, #ffffff, #f8f9fc)',
  boxShadow: '0 4px 20px rgba(26, 35, 126, 0.1)',
  textAlign: 'center',
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
            left: theme.spacing(2),
            top: theme.spacing(2),
            color: 'white'
          }}
        >
          Back
        </Button>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              {project.name}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: '800px', margin: '0 auto' }}>
              {project.description}
            </Typography>
          </motion.div>
        </Container>
      </CaseStudyHeader>

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative' }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <ImpactMetric>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a237e' }}>
                40%
              </Typography>
              <Typography variant="body1">Performance Improvement</Typography>
            </ImpactMetric>
          </Grid>
          <Grid item xs={12} md={4}>
            <ImpactMetric>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a237e' }}>
                £1.2M
              </Typography>
              <Typography variant="body1">Annual Cost Savings</Typography>
            </ImpactMetric>
          </Grid>
          <Grid item xs={12} md={4}>
            <ImpactMetric>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a237e' }}>
                98%
              </Typography>
              <Typography variant="body1">Uptime Achieved</Typography>
            </ImpactMetric>
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Section title="The Challenge" defaultOpen>
              <Typography variant="body1">{project.challenges}</Typography>
            </Section>

            <Section title="Our Approach" toggleable>
              <Typography variant="body1" paragraph>
                We implemented a three-phase strategy focusing on architectural modernization,
                continuous integration, and rigorous testing protocols.
              </Typography>
              <Timeline position="alternate">
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Discovery & Planning</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Implementation</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                  </TimelineSeparator>
                  <TimelineContent>Deployment & Optimization</TimelineContent>
                </TimelineItem>
              </Timeline>
            </Section>

            <Section title="Key Achievements" toggleable>
              <List dense>
                {project.achievements?.map((achievement, index) => (
                  <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                    <ListItemText
                      primary={achievement}
                      primaryTypographyProps={{ variant: 'body1' }}
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
              <Typography variant="h6" sx={{ mb: 2 }}>
                Before Implementation
              </Typography>
              <List>
                <ListItem>Legacy system limitations</ListItem>
                <ListItem>Manual deployment processes</ListItem>
                <ListItem>Frequent downtime incidents</ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
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
          cursor: toggleable ? 'pointer' : 'default'
        }}
        onClick={() => toggleable && setOpen(!open)}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e' }}>
          {title}
        </Typography>
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
    boxShadow: '0 4px 20px rgba(26, 35, 126, 0.1)'
  }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
      Project Quick Facts
    </Typography>
    <Stack spacing={2}>
      <div>
        <Typography variant="subtitle2">Team Size</Typography>
        <Typography variant="body1">{teamSize} members</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">Timeline</Typography>
        <Typography variant="body1">{timeline}</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">Technologies</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              sx={{ mb: 1, background: '#f0f2f5', color: '#1a237e' }}
            />
          ))}
        </Stack>
      </div>
      <div>
        <Typography variant="subtitle2">Stakeholders</Typography>
        <List dense>
          {stakeholders.map((stakeholder, index) => (
            <ListItem key={index}>
              <ListItemText primary={stakeholder} />
            </ListItem>
          ))}
        </List>
      </div>
    </Stack>
  </Box>
);

export default ProjectDetails;