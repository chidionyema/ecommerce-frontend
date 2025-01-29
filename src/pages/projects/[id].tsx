import { useParams, useRouter } from 'next/navigation';
import { cvProjects } from '../../data/cvProjects';
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Chip,
  Stack,
  useTheme
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { motion } from 'framer-motion';

import { Code2 } from 'lucide-react';
import { PRIMARY_DARK, SECONDARY_DARK, GOLD_ACCENT } from '../../theme/branding';
import {ComparisonCard, MetricTiles, IconList } from '../../components/DataVisualization';

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.08)}, ${alpha(PRIMARY_DARK, 0.25)})`,
  backdropFilter: 'blur(24px)',
  borderRadius: '24px',
  border: `1px solid ${alpha(GOLD_ACCENT, 0.2)}`,
  boxShadow: `0 12px 48px ${alpha(PRIMARY_DARK, 0.3)}`,
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(120deg, ${alpha(GOLD_ACCENT, 0.05)} 20%, ${alpha(SECONDARY_DARK, 0.1)})`,
    zIndex: -1,
  },
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 16px 56px ${alpha(PRIMARY_DARK, 0.4)}`,
  },
}));


  
const AnimatedConnector = () => (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 0.5 }}
  >
    <TimelineConnector sx={{ bgcolor: GOLD_ACCENT, height: 40 }} />
  </motion.div>
);

const ProjectDetails = () => {
  const params = useParams();
  const id = params?.id; // Ensure id exists
  const router = useRouter();
  const theme = useTheme();
  const project = cvProjects.find((p) => p.id === id);

  if (!project) return (
    <Container>
      <Typography variant="h4">Project not found</Typography>
    </Container>
  );

  const ProjectIcon = project.icon;
  const TechnologyIcons = project.technologyIcons;


  return (
    <Box sx={{
      background: `linear-gradient(45deg, ${PRIMARY_DARK} 0%, ${SECONDARY_DARK} 100%)`,
      minHeight: '100vh',
      padding: '4rem 0',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/noise.png")', // Add a subtle noise texture
        opacity: 0.05,
        mixBlendMode: 'overlay',
      },
    }}>
      <Container maxWidth="lg">
        <GlassCard
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', mb: 6, position: 'relative' }}
        >
          <ProjectIcon 
            style={{ 
              position: 'absolute', 
              top: -40, 
              left: '50%', 
              transform: 'translateX(-50%)',
              fontSize: '4rem',
              color: project.iconColor,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }} 
          />
          <Typography variant="h2" sx={{ fontWeight: 700, color: GOLD_ACCENT, mt: 4 }}>
            {project.name}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, color: 'rgba(255,255,255,0.8)' }}>
            {project.description}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Chip 
              label={project.role} 
              sx={{ background: alpha(theme.palette.success.main, 0.2), color: theme.palette.success.main }} 
            />
            <Chip 
              label={project.clientName} 
              sx={{ background: alpha(theme.palette.info.main, 0.2), color: theme.palette.info.main }} 
            />
          </Stack>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ 
              mt: 4, 
              px: 4, 
              py: 1.5, 
              background: `linear-gradient(45deg, ${GOLD_ACCENT} 0%, ${alpha(GOLD_ACCENT, 0.7)} 100%)`,
              color: PRIMARY_DARK,
              fontWeight: 700,
              borderRadius: '12px',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 8px 24px ${alpha(GOLD_ACCENT, 0.3)}`,
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            Return to Portfolio
          </Button>
        </GlassCard>

        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <GlassCard sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ mb: 3, color: GOLD_ACCENT }}>The Challenge</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
                {project.challenges}
              </Typography>
            </GlassCard>

            {project.measurableOutcomes && (
              <ComparisonCard 
                before={project.measurableOutcomes.before}
                after={project.measurableOutcomes.after}
                sx={{ mb: 6 }}
              />
            )}

            <GlassCard sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ mb: 3, color: GOLD_ACCENT }}>Our Approach</Typography>
              <Timeline position="alternate" sx={{ my: 4 }}>
                {project.approach.map((step, index) => (
      
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <motion.div whileHover={{ scale: 1.1 }}>
                      <TimelineDot sx={{ 
                          background: 'transparent',
                          border: `2px solid ${GOLD_ACCENT}`,
                          boxShadow: `0 0 16px ${alpha(GOLD_ACCENT, 0.3)}`,
                          width: 40,
                          height: 40,
                          '&:hover': {
                            background: alpha(GOLD_ACCENT, 0.1),
                          }
                        }}>
                      
                        </TimelineDot>
                      </motion.div>
                      {index < project.approach.length - 1 && <AnimatedConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <motion.div whileHover={{ x: 5 }}>
                        <Typography variant="h6" sx={{ mb: 1, color: 'rgba(255,255,255,0.9)' }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {step.description}
                        </Typography>
                      </motion.div>
                    </TimelineContent>
</TimelineItem>
                ))}
              </Timeline>
            </GlassCard>

            {project.metrics && (
              <GlassCard sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{ mb: 3, color: GOLD_ACCENT }}>Key Metrics</Typography>
                <MetricTiles metrics={project.metrics} />
              </GlassCard>
            )}

            {project.achievements && (
              <GlassCard sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{ mb: 3, color: GOLD_ACCENT }}>Major Achievements</Typography>
                <IconList items={project.achievements} />
              </GlassCard>
            )}

            {project.lessonsLearned && (
              <GlassCard sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{ mb: 3, color: GOLD_ACCENT }}>Lessons Learned</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                  "{project.lessonsLearned}"
                </Typography>
              </GlassCard>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <QuickFacts
              teamSize={project.teamSize}
              timeline={project.timeline}
              technologies={project.technologies}
              stakeholders={project.stakeholders}
              technologyIcons={TechnologyIcons}
              role={project.role}
              client={project.clientName}
            />

            {project.impact && (
              <GlassCard sx={{ mt: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, color: GOLD_ACCENT }}>Project Impact</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {project.impact}
                </Typography>
              </GlassCard>
            )}

            {project.stakeholders && project.stakeholders.length > 0 && (
              <GlassCard sx={{ mt: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, color: GOLD_ACCENT }}>Key Stakeholders</Typography>
                <Stack spacing={1}>
                  {project.stakeholders.map((stakeholder, index) => (
                      <Chip 
                      label={project.role} 
                      sx={{ 
                        background: alpha(GOLD_ACCENT, 0.1),
                        color: GOLD_ACCENT,
                        border: `1px solid ${alpha(GOLD_ACCENT, 0.3)}`,
                        borderRadius: '8px',
                        '&:hover': {
                          background: alpha(GOLD_ACCENT, 0.2),
                        }
                      }} 
          />
                  ))}
                </Stack>
              </GlassCard>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

interface QuickFactsProps {
  teamSize: number;
  timeline: string;
  technologies: string[];
  stakeholders?: string[];
  technologyIcons: any[];
  role: string;
  client: string;
}

const QuickFacts: React.FC<QuickFactsProps> = ({ 
  teamSize, 
  timeline, 
  technologies, 
  technologyIcons,
  role,
  client
}) => (
  <GlassCard>
    <Typography variant="h6" sx={{ mb: 3, color: GOLD_ACCENT }}>Project Snapshot</Typography>
    <Stack spacing={3}>
      <Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Role</Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{role}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Client</Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{client}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Team Size</Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{teamSize}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Timeline</Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{timeline}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Tech Stack</Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
        
{technologies.map((tech, index) => {
  const Icon = technologyIcons[index] || Code2;
  return (
    <Chip 
      key={index}
      label={tech}
      icon={<Icon size={16} />}
      sx={{ 
        background: alpha(GOLD_ACCENT, 0.1),
        color: GOLD_ACCENT,
        justifyContent: 'flex-start',
        '.MuiChip-icon': { color: GOLD_ACCENT, ml: 1 }
      }}
    />
  );
})}
        </Stack>
      </Box>
    </Stack>
  </GlassCard>
);

export default ProjectDetails;