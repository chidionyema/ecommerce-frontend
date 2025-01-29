import { useParams, useRouter } from 'next/navigation';
import { cvProjects } from '../../data/cvProjects';
import { 
  Box, Typography, Container, Button, Grid, Chip, Stack, useTheme 
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
import { 
  PRIMARY_DARK, SECONDARY_DARK, NEUTRAL_LIGHT, GLASS_BACKGROUND,
  TITLE_GRADIENT, HIGHLIGHT_COLOR, ACCENT_SECONDARY, colors
} from '../../theme/branding';
import { ComparisonCard, MetricTiles, IconList } from '../../components/DataVisualization';

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: `linear-gradient(145deg, 
    ${alpha(PRIMARY_DARK, 0.7)} 0%, 
    ${alpha(SECONDARY_DARK, 0.5)} 100%)`, // Adjusted opacities
  boxShadow: `0 12px 24px ${alpha(PRIMARY_DARK, 0.5)},
    inset 0 0 0 1px ${alpha(NEUTRAL_LIGHT, 0.2)}`, // Brighter inset border
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: "translateY(-8px)",
    boxShadow: `0 16px 32px ${alpha(PRIMARY_DARK, 0.4)},
      inset 0 0 0 1px ${alpha(NEUTRAL_LIGHT, 0.2)}`
  },
}));

const AnimatedConnector = () => (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 0.5 }}
  >
    <TimelineConnector sx={{ 
      bgcolor: HIGHLIGHT_COLOR, 
      height: 40,
      boxShadow: `0 2px 4px ${alpha(HIGHLIGHT_COLOR, 0.2)}`
    }} />
  </motion.div>
);

const ProjectDetails = () => {
  const params = useParams();
  const id = params?.id;
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
   // Replace the existing Box sx prop with this:
<Box sx={{
  background: `linear-gradient(45deg, 
    ${colors.PRIMARY_DARK} 0%, 
    ${alpha(colors.SECONDARY_DARK, 0.3)} 100%)`, // Reduced secondary dark opacity
  minHeight: '100vh',
  padding: '7rem 0 4rem',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/noise.png")',
    opacity: 0.15, // Increased noise opacity
    mixBlendMode: 'soft-light',
    zIndex: 0
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, 
      ${alpha(colors.PRIMARY_DARK, 0.7)} 30%, 
      transparent 100%)`,
    zIndex: 0
  }
}}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <GlassCard
          sx={{
            mb: 8,
            background: GLASS_BACKGROUND,
            position: 'relative',
            overflow: 'visible',
            textAlign: 'center'
          }}
        >
          <Box sx={{
            position: 'absolute',
            top: -64,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 112,
            height: 112,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(45deg, 
              ${alpha(colors.HIGHLIGHT_COLOR, 0.2)}, 
              ${alpha(colors.ACCENT_SECONDARY, 0.1)})`,
            borderRadius: '50%',
            boxShadow: `0 8px 32px ${alpha(colors.HIGHLIGHT_COLOR, 0.2)}`,
            border: `2px solid ${alpha(colors.NEUTRAL_LIGHT, 0.1)}`
          }}>
            <ProjectIcon style={{ 
              fontSize: '3.5rem',
              color: colors.HIGHLIGHT_COLOR,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }} />
          </Box>

            <Typography variant="h2" sx={{
            background: colors.TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4,
            lineHeight: 1.1,
            textShadow: colors.TEXT_SHADOW
          }}>
            {project.name}
        </Typography>

          <Typography variant="lead" sx={{ 
            color: colors.NEUTRAL_LIGHT,
            fontWeight: 400,
            lineHeight: 1.7,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: '1.25rem'
          }}>
            {project.description}
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ 
            mt: 6,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Chip 
              label={project.role}
              sx={{ 
                background: alpha(colors.HIGHLIGHT_COLOR, 0.15),
                color: colors.HIGHLIGHT_COLOR,
                border: `1px solid ${alpha(colors.HIGHLIGHT_COLOR, 0.3)}`,
                fontWeight: 600,
                '&:hover': { background: alpha(colors.HIGHLIGHT_COLOR, 0.25) }
              }}
            />
            <Chip 
              label={project.clientName}
              sx={{ 
                background: alpha(colors.ACCENT_SECONDARY, 0.15),
                color: colors.ACCENT_SECONDARY,
                border: `1px solid ${alpha(colors.ACCENT_SECONDARY, 0.3)}`,
                fontWeight: 600,
                '&:hover': { background: alpha(colors.ACCENT_SECONDARY, 0.25) }
              }}
            />
          </Stack>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ 
              mt: 6,
              px: 6,
              py: 1.8,
              background: colors.TITLE_GRADIENT,
              color: colors.PRIMARY_DARK,
              fontWeight: 700,
              borderRadius: colors.BORDER_RADIUS,
              '&:hover': {
                boxShadow: `0 8px 32px ${alpha(colors.HIGHLIGHT_COLOR, 0.3)}`,
                transform: "scale(1.02)",
              }
            }}
          >
            Return to Portfolio
          </Button>
        </GlassCard>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ pr: { md: 4 } }}>
            {/* Challenge Section */}
            <GlassCard sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                '&::after': {
                  content: '""',
                  flex: 1,
                  ml: 3,
                  height: '2px',
                  background: `linear-gradient(90deg, 
                    ${alpha(colors.HIGHLIGHT_COLOR, 0.4)}, 
                    transparent)`,
                }
              }}>
                <Box component="span" sx={{ 
                  background: colors.TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  The Challenge
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ 
                color: colors.NEUTRAL_LIGHT,
                lineHeight: 1.8,
                fontSize: '1.1rem',
                '&::first-letter': {
                  initialLetter: '2.5 1',
                  color: colors.HIGHLIGHT_COLOR,
                  fontWeight: 600,
                  mr: 0.5
                }
              }}>
                {project.challenges}
              </Typography>
            </GlassCard>

            {project.measurableOutcomes && (
              <GlassCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                sx={{ mb: 6 }}
              >
                <ComparisonCard 
                  before={project.measurableOutcomes.before}
                  after={project.measurableOutcomes.after}
                />
              </GlassCard>
            )}

            <GlassCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              sx={{ mb: 6 }}
            >
              <Typography variant="h4" sx={{ 
                mb: 3, 
                background: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Our Approach
              </Typography>
              <Timeline position="alternate" sx={{ my: 4 }}>
                {project.approach.map((step, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <TimelineDot sx={{ 
                          background: 'transparent',
                          border: `2px solid ${HIGHLIGHT_COLOR}`,
                          boxShadow: `0 0 16px ${alpha(HIGHLIGHT_COLOR, 0.3)}`,
                          width: 40,
                          height: 40,
                          '&:hover': {
                            background: alpha(HIGHLIGHT_COLOR, 0.1),
                          }
                        }}/>
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
              <GlassCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                sx={{ mb: 6 }}
              >
                <Typography variant="h4" sx={{ 
                  mb: 3, 
                  background: TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Key Metrics
                </Typography>
                <MetricTiles metrics={project.metrics} />
              </GlassCard>
            )}

            {project.achievements && (
              <GlassCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                sx={{ mb: 6 }}
              >
                <Typography variant="h4" sx={{ 
                  mb: 3, 
                  background: TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Major Achievements
                </Typography>
                <IconList items={project.achievements} />
              </GlassCard>
            )}

            {project.lessonsLearned && (
              <GlassCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h4" sx={{ 
                  mb: 3, 
                  background: TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Lessons Learned
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  fontStyle: 'italic',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
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
              <GlassCard
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                sx={{ mt: 6 }}
              >
                <Typography variant="h6" sx={{ 
                  mb: 2, 
                  background: TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Project Impact
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {project.impact}
                </Typography>
              </GlassCard>
            )}

            {project.stakeholders && project.stakeholders.length > 0 && (
              <GlassCard
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                sx={{ mt: 6 }}
              >
                <Typography variant="h6" sx={{ 
                  mb: 2, 
                  background: TITLE_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Key Stakeholders
                </Typography>
                <Stack spacing={1}>
                  {project.stakeholders.map((stakeholder, index) => (
                    <Chip 
                      key={index}
                      label={stakeholder}
                      sx={{ 
                        background: alpha(HIGHLIGHT_COLOR, 0.1),
                        color: HIGHLIGHT_COLOR,
                        border: `1px solid ${alpha(HIGHLIGHT_COLOR, 0.3)}`,
                        borderRadius: '8px',
                        '&:hover': {
                          background: alpha(HIGHLIGHT_COLOR, 0.2),
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
  <GlassCard
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Typography variant="h6" sx={{ 
      mb: 3, 
      background: TITLE_GRADIENT,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}>
      Project Snapshot
    </Typography>
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
                key={tech}
                label={tech}
                icon={<Icon style={{ 
                  color: HIGHLIGHT_COLOR,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  fontSize: '1.6rem'
                }} />}
                sx={{ 
                  background: alpha(HIGHLIGHT_COLOR, 0.15),
                  color: HIGHLIGHT_COLOR,
                  border: `1px solid ${alpha(HIGHLIGHT_COLOR, 0.3)}`,
                  '&:hover': {
                    background: alpha(HIGHLIGHT_COLOR, 0.25),
                    transform: "scale(1.05)"
                  },
                  transition: "all 0.2s ease",
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