'use client';

import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  useTheme,
  Icon,
  alpha,
  Button,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';
import {
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Terminal,
  Box as BoxIcon,
  Shield,
} from 'lucide-react';

const technologyIconMap = {
  '.NET Core': Code2,
  Java: Terminal,
  WebSockets: GitBranch,
  RabbitMQ: Database,
  MQTT: Layers,
  Docker: Server,
  Kubernetes: Cloud,
  Terraform: BoxIcon,
  AWS: Cloud,
  Azure: Cloud,
  'C#': Cpu,
  'EF Core': Database,
  SQL: Database,
};

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[]; // Array of strings
  clientName: string;
  image?: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  icon: any;
  iconColor: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      style={{ height: '100%' }} // Ensure motion.div takes full height
    >
      <Card
        sx={{
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 3,
          transition: 'box-shadow 0.2s ease',
          width: '100%',
          height: '100%', // Ensure consistent height
          display: 'flex', // Use flexbox for layout
          flexDirection: 'column', // Stack content vertically
          '&:hover': {
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardActionArea
          component={NextLink}
          href={`/projects/${project.id}`}
          sx={{ textDecoration: 'none', flexGrow: 1 }} // Allow content to grow
        >
          {project.image && (
            <Box
              component="img"
              src={project.image}
              alt={project.name}
              sx={{
                width: '100%',
                height: 200, // Fixed height for images
                objectFit: 'cover',
              }}
            />
          )}

          <CardContent sx={{ pb: 2, px: 3, py: 3, flexGrow: 1 }}>
            {/* Icon */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Icon
                sx={{
                  color: project.iconColor,
                  fontSize: '2rem',
                }}
              >
                <project.icon />
              </Icon>
            </Box>

            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                lineHeight: 1.2,
                '&:hover': { textDecoration: 'underline' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap', // Prevent text from wrapping
              }}
            >
              {project.name}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {project.clientName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                flexWrap: 'wrap',
                my: 1,
              }}
            >
              {project.technologies.map((tech) => {
                const TechIcon = technologyIconMap[tech];
                return TechIcon ? (
                  <Chip
                    key={tech}
                    icon={
                      <Icon
                        sx={{
                          color: theme.palette.grey[500],
                          '&:hover': { color: theme.palette.primary.main },
                        }}
                      >
                        <TechIcon size={16} />
                      </Icon>
                    }
                    label={tech}
                    sx={{
                      background: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  />
                ) : null;
              })}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
              }}
            >
              {project.metrics.map((metric, index) => (
                <Box key={index}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {metric.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textAlign: 'center' }}
                  >
                    {metric.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
        <LinearProgress
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '0%',
            height: 4,
            background: 'transparent',
            transition: 'width 0.3s ease',
            '&.MuiLinearProgress-bar': {
              background: theme.palette.primary.main,
            },
            '&:hover': {
              width: '100%',
            },
          }}
        />
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to top, ${alpha(
              theme.palette.primary.main,
              0.8,
            )}, ${alpha(theme.palette.primary.main, 0)})`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': { opacity: 1 },
          }}
        >
          <Button
            component={NextLink}
            href={`/projects/${project.id}`}
            endIcon={<ArrowRightAlt />}
            sx={{
              color: 'common.white',
              fontWeight: 600,
              '&:hover': {
                textDecoration: 'underline',
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            View Details
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;