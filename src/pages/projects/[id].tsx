'use client';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  CircularProgress, 
  Grid,
  useTheme // Added
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { cvProjects } from '../../data/cvProjects';
import { Project } from '../../types/project';
import { Particles } from '../../components/Particles';
import { GlassCard } from '../../components/Theme/GlassCard';
import QuickFacts from '../../components/Project/QuickFacts';
import { LessonsLearned } from '../../components/Project/LessonsLearned';
import { ChallengeSection } from '../../components/Project/ChallengeSection';
import { ApproachTimeline } from '../../components/Project/ApproachTimeline';
import { MetricTilesContainer } from '../../components/Project/MetricsSection';
import { AchievementsList } from '../../components/Project/AchievementsList';
import { ReturnButton } from '../../components/Project/ReturnButton'; // Fixed import
import {ProjectHeader } from '../../components/Project/ProjectHeader'; // Fixed path

const ProjectDetails = () => {
  const theme = useTheme(); // Added theme hook
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef(null);
 
  const projectId = params?.id as string;
  const project = useMemo(
    () => cvProjects.find((p: Project) => p.id === projectId),
    [projectId]
  );

  if (!project) {
    return (
      <Container sx={{ 
        display: 'flex', 
        height: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h4" sx={{ ml: 3 }}>
          Loading Project...
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      component="main"
      ref={containerRef}
      sx={{
        background: `linear-gradient(45deg, 
          ${alpha(theme.palette.primary.dark, 0.95)} 0%, 
          ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`,
        minHeight: '100vh',
        padding: '7rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Particles />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <ReturnButton onClick={() => router.back()} />
        
        <GlassCard sx={{ mb: 8, position: 'relative' }}>
          <ProjectHeader project={project} />
        </GlassCard>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <ChallengeSection challenge={project.challenges} />
            <MetricTilesContainer metrics={project.metrics} />
            <ApproachTimeline steps={project.approach} />
          </Grid>

          <Grid item xs={12} md={4}>
            <QuickFacts
              teamSize={project.teamSize} // Convert to string
              timeline={project.timeline}
              technologies={project.technologies}
              technologyIcons={project.technologyIcons}
              role={project.role}
              clientName={project.clientName}
            />
          </Grid>
        </Grid>

        <AchievementsList achievements={project.achievements} />
        <LessonsLearned lesson={project.lessonsLearned} />
      </Container>
    </Box>
  );
};

export default ProjectDetails;