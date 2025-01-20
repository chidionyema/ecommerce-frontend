import { useState } from 'react';
import { useRouter } from 'next/router';
import { cvProjects } from '../../data/cvProjects'; // Adjust the import path
import {
  Box,
  Typography,
  Chip,
  Container,
  Button,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ProjectDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the project ID from the URL
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State to manage section visibility
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    challenges: false,
    impact: false,
    teamSize: false,
    stakeholders: false,
    lessonsLearned: false,
    timeline: false,
    achievements: false,
  });

  // Toggle section visibility
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Find the project by ID
  const project = cvProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Project not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 3, textTransform: 'none', fontWeight: 600 }}
      >
        Back to Projects
      </Button>

      {/* Project Content */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '15px',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Grid container spacing={4}>
          {/* Project Details */}
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              {project.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 4, color: theme.palette.text.secondary }}
            >
              {project.description}
            </Typography>

            {/* Technologies */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}
              >
                Technologies Used:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.technologies.map((tech: string, index: number) => (
                  <Chip
                    key={index}
                    label={tech}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Role */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}
              >
                Role:
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                {project.role}
              </Typography>
            </Box>

            {/* Rating */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.text.primary }}
              >
                Rating:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon sx={{ color: theme.palette.warning.main }} />
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  {project.rating}/5
                </Typography>
              </Box>
            </Box>

            {/* Additional Fields */}
            <>
              {/* Challenges */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
                  >
                    Challenges:
                  </Typography>
                  <IconButton onClick={() => toggleSection('challenges')}>
                    {openSections.challenges ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={openSections.challenges}>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {project.challenges}
                  </Typography>
                </Collapse>
              </Box>

              {/* Impact */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
                  >
                    Impact:
                  </Typography>
                  <IconButton onClick={() => toggleSection('impact')}>
                    {openSections.impact ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={openSections.impact}>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {project.impact}
                  </Typography>
                </Collapse>
              </Box>

              {/* Team Size */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
                  >
                    Team Size:
                  </Typography>
                  <IconButton onClick={() => toggleSection('teamSize')}>
                    {openSections.teamSize ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={openSections.teamSize}>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {project.teamSize}
                  </Typography>
                </Collapse>
              </Box>

              {/* Stakeholders */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
                  >
                    Stakeholders:
                  </Typography>
                  <IconButton onClick={() => toggleSection('stakeholders')}>
                    {openSections.stakeholders ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={openSections.stakeholders}>
                  <List dense>
                    {project.stakeholders?.map((stakeholder: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText primary={stakeholder} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>

              {/* Lessons Learned */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
                  >
                    Lessons Learned:
                  </Typography>
                  <IconButton onClick={() => toggleSection('lessonsLearned')}>
                    {openSections.lessonsLearned ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={openSections.lessonsLearned}>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {project.lessonsLearned}
                  </Typography>
                </Collapse>
              </Box>

              {/* Timeline */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
                  >
                    Timeline:
                  </Typography>
                  <IconButton onClick={() => toggleSection('timeline')}>
                    {openSections.timeline ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={openSections.timeline}>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {project.timeline}
                  </Typography>
                </Collapse>
              </Box>

              {/* Achievements */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
                  >
                    Achievements:
                  </Typography>
                  <IconButton onClick={() => toggleSection('achievements')}>
                    {openSections.achievements ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={openSections.achievements}>
                  <List dense>
                    {project.achievements?.map((achievement: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText primary={achievement} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            </>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProjectDetails;