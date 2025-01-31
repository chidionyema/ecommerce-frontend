'use client';

import { useParams, useRouter } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';
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
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { motion, useMotionTemplate } from 'framer-motion';
import { Code2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  PersonOutline,
  BusinessCenter,
  PeopleAlt,
  Schedule,
  Code as CodeIcon,
} from '@mui/icons-material';

// Type definitions
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
  metrics?: any;
  achievements?: any[];
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

interface ComparisonCardProps {
  before: any;
  after: any;
}

interface MetricTilesProps {
  metrics: any;
}

interface IconListProps {
  items: any[];
}

interface QuickFactsProps {
  teamSize: string;
  timeline: string;
  technologies: string[];
  technologyIcons: React.ElementType[];
  role: string;
  client: string;
}

interface InfoItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  progressValue?: number;
}

// Dynamic imports with theme-aware styling
const ComparisonCard = dynamic<ComparisonCardProps>(
  () =>
    import('../../components/DataVisualization').then((mod) => {
      const ThemedComparisonCard = styled(mod.ComparisonCard)(({ theme }) => ({
        // Add theme-aware styles here
      }));
      return { default: ThemedComparisonCard };
    }),
  { ssr: false }
);

const MetricTiles = dynamic<MetricTilesProps>(
  () =>
    import('../../components/DataVisualization').then((mod) => {
      const ThemedMetricTiles = styled(mod.MetricTiles)(({ theme }) => ({
        // Add theme-aware styles here
      }));
      return { default: ThemedMetricTiles };
    }),
  { ssr: false }
);

const IconList = dynamic<IconListProps>(
  () =>
    import('../../components/DataVisualization').then((mod) => {
      const ThemedIconList = styled(mod.IconList)(({ theme }) => ({
        // Add theme-aware styles here
      }));
      return { default: ThemedIconList };
    }),
  { ssr: false }
);

// Styled components
const GlassCard = memo(styled(motion.div)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(
    theme.palette.primary.dark,
    0.82
  )} 0%, ${alpha(theme.palette.secondary.dark, 0.78)} 100%)`,
  backdropFilter: 'blur(24px) saturate(180%)',
  boxShadow: `0 12px 24px ${alpha(
    theme.palette.primary.dark,
    0.5
  )}, inset 0 0 0 1px ${alpha(theme.palette.secondary.main, 0.3)}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 48px ${alpha(
      theme.palette.primary.dark,
      0.6
    )}, inset 0 0 0 1px ${alpha(theme.palette.secondary.main, 0.4)}`,
  },
})));

const AnimatedConnector = memo(styled(TimelineConnector)(({ theme }) => ({
  height: 40,
  background: `linear-gradient(to bottom, ${alpha(
    theme.palette.secondary.main,
    0.8
  )}, ${alpha(theme.palette.primary.main, 0.6)})`,
  boxShadow: `0 2px 8px ${alpha(theme.palette.secondary.main, 0.3)}`,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(to bottom, ${alpha(
      theme.palette.secondary.main,
      0.4
    )}, transparent)`,
    animation: 'flow 2s linear infinite',
    '@keyframes flow': {
      '0%': { transform: 'translateY(-100%)' },
      '100%': { transform: 'translateY(100%)' },
    },
  },
})));

const ProjectDetails = () => {
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const project = useMemo(
    () => cvProjects.find((p: Project) => p.id === id),
    [id]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const cards = document.querySelectorAll('.glass-card');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cards.forEach((card: Element) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      (card as HTMLElement).style.setProperty(
        '--mouse-x',
        `${mouseX - rect.left}px`
      );
      (card as HTMLElement).style.setProperty(
        '--mouse-y',
        `${mouseY - rect.top}px`
      );
    });
  }, []);

  const mouseTemplate = useMotionTemplate`radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), ${alpha(
    theme.palette.secondary.main,
    0.15
  )} 0%, transparent 60%)`;

  if (!project)
    return (
      <Container>
        <Typography variant="h4">Project not found</Typography>
      </Container>
    );

  return (
    <Box
      component="main"
      sx={{
        background: `linear-gradient(45deg, ${
          theme.palette.primary.dark
        } 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`,
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
          backgroundImage: 'url("/noise.webp")',
          opacity: 0.15,
          mixBlendMode: 'soft-light',
        },
      }}
      onMouseMove={handleMouseMove}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <GlassCard className="glass-card">
          <motion.div
            className="project-icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
            style={{
              position: 'absolute',
              top: -92,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 144,
              height: 144,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(45deg, ${alpha(
                theme.palette.secondary.main,
                0.3
              )}, ${alpha(theme.palette.primary.main, 0.2)})`,
              borderRadius: '50%',
              boxShadow: `0 12px 48px ${alpha(
                theme.palette.secondary.main,
                0.3
              )}`,
              border: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
            }}
          >
            <project.icon
              style={{ fontSize: '4rem', color: theme.palette.secondary.main }}
            />
          </motion.div>

          <Box position="relative">
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: mouseTemplate,
                opacity: 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
              }}
              whileHover={{ opacity: 0.2 }}
            />

            <Typography
              variant="h2"
              sx={{
                background: theme.palette.secondary.main,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4,
                lineHeight: 1.1,
                textShadow: `0 2px 4px ${alpha(theme.palette.primary.dark, 0.3)}`,
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              {project.name}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.secondary.main,
                fontWeight: 400,
                lineHeight: 1.8,
                maxWidth: '800px',
                mx: 'auto',
                fontSize: '1.25rem',
                position: 'relative',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: '60%',
                  height: '2px',
                  background: `linear-gradient(90deg, 
                    ${alpha(theme.palette.secondary.main, 0.4)}, 
                    transparent)`,
                  margin: '2.5rem auto 0',
                },
              }}
            >
              {project.description}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{
                mt: 6,
                flexWrap: 'wrap',
                gap: 2,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Chip
                label={project.role}
                sx={{
                  background: alpha(theme.palette.secondary.main, 0.15),
                  color: theme.palette.secondary.main,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                  fontWeight: 600,
                  '&:hover': {
                    background: alpha(theme.palette.secondary.main, 0.25),
                  },
                }}
              />
              <Chip
                label={project.clientName}
                sx={{
                  background: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  fontWeight: 600,
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.25),
                  },
                }}
              />
            </Stack>

            <Button
              startIcon={<ArrowBackIcon sx={{ transition: 'transform 0.3s' }} />}
              onClick={() => router.back()}
              sx={{
                mt: 6,
                px: 6,
                py: 1.8,
                background: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
                fontWeight: 700,
                borderRadius: '12px',
                '&:hover': {
                  boxShadow: `0 12px 40px ${alpha(
                    theme.palette.secondary.main,
                    0.4
                  )}`,
                  '& svg': { transform: 'translateX(-4px)' },
                },
              }}
            >
              Return to Portfolio
            </Button>
          </Box>
        </GlassCard>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ pr: { md: 4 } }}>
            <GlassCard className="glass-card" sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '&::after': {
                    content: '""',
                    flex: 1,
                    ml: 3,
                    height: '2px',
                    background: `linear-gradient(90deg, 
                    ${alpha(theme.palette.secondary.main, 0.4)}, 
                    transparent)`,
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: theme.palette.secondary.main,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  The Challenge
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.secondary.main,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  '&::first-letter': {
                    initialLetter: '2.5 1',
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    mr: 0.5,
                  },
                }}
              >
                {project.challenges}
              </Typography>
            </GlassCard>

            {project.measurableOutcomes && (
              <GlassCard className="glass-card" sx={{ mb: 6 }}>
                <ComparisonCard
                  before={project.measurableOutcomes.before}
                  after={project.measurableOutcomes.after}
                />
              </GlassCard>
            )}

            <GlassCard className="glass-card" sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  background: theme.palette.secondary.main,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Our Approach
              </Typography>
              <Timeline
                position="alternate"
                sx={{
                  my: 4,
                  '&.MuiTimelineItem-root:before': { flex: 0, padding: 0 },
                }}
              >
                {project.approach.map((step: ApproachStep, index: number) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <TimelineDot
                          sx={{
                            background: 'transparent',
                            border: `2px solid ${theme.palette.secondary.main}`,
                            boxShadow: `0 0 24px ${alpha(
                              theme.palette.secondary.main,
                              0.4
                            )}`,
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                              background: alpha(theme.palette.secondary.main, 0.1),
                            },
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              fontSize: '1.4rem',
                              color: theme.palette.secondary.main,
                            }}
                          >
                            {index + 1}
                          </Box>
                        </TimelineDot>
                      </motion.div>
                      {index < project.approach.length - 1 && (
                        <AnimatedConnector />
                      )}
                    </TimelineSeparator><TimelineContent>
                      <motion.div
                        whileHover={{ x: 8 }}
                        style={{ cursor: 'pointer' }}
                      >
                        <GlassCard
                          sx={{
                            p: 3,
                            mb: 4,
                            background: alpha(theme.palette.primary.dark, 0.6),
                            '&:hover': {
                              background: alpha(theme.palette.primary.dark, 0.7),
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 1,
                              color: theme.palette.text.primary,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                width: 8,
                                height: 8,
                                background: theme.palette.secondary.main,
                                borderRadius: '50%',
                              }}
                            />
                            {step.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              lineHeight: 1.7,
                              pl: 3.5,
                            }}
                          >
                            {step.description}
                          </Typography>
                        </GlassCard>
                      </motion.div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </GlassCard>

            {project.metrics && (
              <GlassCard className="glass-card" sx={{ mb: 6 }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    background: theme.palette.secondary.main,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Key Metrics
                </Typography>
                <MetricTiles metrics={project.metrics} />
              </GlassCard>
            )}

            {project.achievements && (
              <GlassCard className="glass-card" sx={{ mb: 6 }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    background: theme.palette.secondary.main,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Major Achievements
                </Typography>
                <IconList items={project.achievements} />
              </GlassCard>
            )}

            {project.lessonsLearned && (
              <GlassCard className="glass-card">
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    background: theme.palette.secondary.main,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Lessons Learned
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    fontStyle: 'italic',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
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
              technologyIcons={project.technologyIcons}
              role={project.role}
              client={project.clientName}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const QuickFacts = memo(
  ({
    teamSize,
    timeline,
    technologies,
    technologyIcons,
    role,
    client,
  }: QuickFactsProps) => {
    const theme = useTheme();
    return (
      <GlassCard className="glass-card" sx={{ position: 'sticky', top: 120 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            pb: 2,
            background: theme.palette.secondary.main,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            borderBottom: `2px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
          }}
        >
          Project Snapshot
        </Typography>

        <Stack spacing={3}>
          <InfoItem
            label="Role"
            value={role}
            icon={<PersonOutline sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />}
          />
          <InfoItem
            label="Client"
            value={client}
            icon={<BusinessCenter sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />}
          />
          <InfoItem
            label="Team Size"
            value={teamSize}
            progressValue={Math.min((Number(teamSize) / 10) * 100, 100)}
            icon={<PeopleAlt sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />}
          />
          <InfoItem
            label="Timeline"
            value={timeline}
            icon={<Schedule sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />}
          />

          <Box>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1.5,
              }}
            >
              <CodeIcon sx={{ fontSize: 20 }} />
              Tech Stack
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {technologies.map((tech: string, index: number) => {
                const Icon = technologyIcons[index] || Code2;
                return (
                  <Grid item xs={6} key={tech}>
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Chip
                        label={tech}
                        icon={
                          <Icon
                            style={{
                              color: theme.palette.secondary.main,
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                              fontSize: '1.6rem',
                            }}
                          />
                        }
                        sx={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          background: alpha(theme.palette.secondary.main, 0.1),
                          color: theme.palette.secondary.main,
                          border: `1px solid ${alpha(
                            theme.palette.secondary.main,
                            0.2
                          )}`,
                          '&:hover': {
                            background: alpha(theme.palette.secondary.main, 0.2),
                          },
                        }}
                      />
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      </GlassCard>
    );
  }
);

const InfoItem = ({
  label,
  value,
  icon,
  progressValue,
}: InfoItemProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: alpha(theme.palette.secondary.main, 0.08),
        borderRadius: 2,
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': { background: alpha(theme.palette.secondary.main, 0.12) },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        {icon}
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          pl: label === 'Role' || label === 'Client' ? 4.5 : label === 'Team Size' ? 4.5 : label === 'Timeline' ? 4.5 : 0,
        }}
      >
        {value}
      </Typography>
      {progressValue && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: alpha(theme.palette.secondary.main, 0.2),
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progressValue}%`,
              background: theme.palette.secondary.main,
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          }}
        />
      )}
    </Box>
  );
};

export default ProjectDetails;