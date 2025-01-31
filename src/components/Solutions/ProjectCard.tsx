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
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import Image from 'next/image';
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
  technologies: string [];
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
  const imageSize = 200;

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      initial={false}
      style={{ height: '100%', position: 'relative' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.1)}`,
          },
        }}
      >
        <CardActionArea
          component={NextLink}
          href={`/projects/${project.id}`}
          sx={{
            textDecoration: 'none',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {project.image && (
            <Box
              sx={{
                width: '100%',
                height: imageSize,
                position: 'relative',
              }}
            >
              <Image
                src={project.image}
                alt={project.name}
                layout="fill"
                objectFit="cover"
              />
            </Box>
          )}

          <CardContent sx={{ pb: 2, px: 3, py: 3, flexGrow: 1 }}>
            {/* Icon */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
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
              }}
            >
              {project.name}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {project.clientName}
            </Typography>

            {/* Technologies - Updated to use icon map */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 2,
              }}
            >
              {project.technologies.map((tech) => {
                const TechIcon =
                  technologyIconMap[tech as keyof typeof technologyIconMap];
                return (
                  <Chip
                    key={tech}
                    icon={<TechIcon size={16} />}
                    label={tech}
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                      background: alpha(theme.palette.primary.main, 0.02),
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.15),
                        transform: 'translateY(-1px)',
                        boxShadow: theme.shadows,
                      },
                    }}
                  />
                );
              })}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {project.metrics.map((metric, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {metric.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {metric.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </CardActionArea>

        <Button
          component={NextLink}
          href={`/projects/${project.id}`}
          endIcon={<ArrowRightAlt />}
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            py: 2,
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          View Details
        </Button>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;