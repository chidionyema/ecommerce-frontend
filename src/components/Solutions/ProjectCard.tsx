'use client';

import React from 'react';
import {
  Box,
  Typography,
  Chip,
  CardContent,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightAlt } from '@mui/icons-material';
import GoldCard from '../GoldCard';
import { LucideIcon } from 'lucide-react';
import { NEUTRAL_TEXT } from '../../utils/sharedColors';
import { keyframes } from '@emotion/react';

const subtlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  clientName: string;
  image?: string;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  icon?: LucideIcon;
  iconColor: string;
}

import {
  Cloud,
  Code as Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Terminal,
  Box as BoxIcon,
  CircuitBoard,
} from 'lucide-react';

const technologyIconMap: {
  [key: string]: { icon: LucideIcon; color: string };
} = {
  ".NET Core": { icon: Code2, color: '#512bd4' },
  "Java": { icon: Terminal, color: '#007396' },
  "WebSockets": { icon: GitBranch, color: '#00aced' },
  "RabbitMQ": { icon: Database, color: '#E51B24' },
  "MQTT": { icon: Layers, color: '#7FBA00' },
  "Docker": { icon: Server, color: '#2496ED' },
  "Kubernetes": { icon: Cloud, color: '#326CE5' },
  "Terraform": { icon: BoxIcon, color: '#623CE4' },
  "AWS": { icon: Cloud, color: '#FF9900' },
  "Azure": { icon: Cloud, color: '#007FFF' },
  "C#": { icon: Cpu, color: '#178600' },
  "EF Core": { icon: Database, color: '#512bd4' },
  "SQL": { icon: Database, color: '#D82B2B' },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();

  return (
    <GoldCard 
      href={`/projects/${project.id}`}
      sx={{
        margin: '0 !important',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        // Hover state: reveal the button inside the card
        '&:hover .view-details-button': {
          opacity: 1,
          transform: 'translateY(0)'
        }
      }}
    >
      {/* Image container with fixed height */}
      {project.image && (
        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            height: 200, // Fixed height for images
            mb: 2,
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
            }}
          />
        </Box>
      )}

      {/* Card content with flex behavior */}
      <CardContent sx={{ 
        px: 0, 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: NEUTRAL_TEXT }}>
            {project.name}
          </Typography>
          {project.clientName && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              {project.icon && (
                <Box sx={{ mr: 1 }}>
                  <project.icon size={24} color={theme.palette.primary.light} />
                </Box>
              )}
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: theme.palette.grey[300] }}>
                {project.clientName}
              </Typography>
            </Box>
          )}
          <Typography variant="body2" sx={{ color: theme.palette.grey[400], mb: 2 }}>
            {project.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {project.technologies.map((tech) => {
              const techData = technologyIconMap[tech];
              return (
                <Chip
                  key={tech}
                  icon={
                    techData ? (
                      <techData.icon size={16} color={techData.color} />
                    ) : undefined
                  }
                  label={tech}
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.primary.light, 0.1),
                    color: theme.palette.grey[200],
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Button container: initially hidden, becomes visible on hover */}
        <Box sx={{ 
          mt: 3,
          opacity: 0,
          transform: 'translateY(10px)',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1
        }}>
          <Button
            className="view-details-button"
            component={NextLink}
            href={`/projects/${project.id}`}
            endIcon={<ArrowRightAlt />}
            sx={{
              background: 'linear-gradient(45deg, #B8860B, #FFB90F)',
              color: '#000',
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.4)}`,
              animation: `${subtlePulse} 2s infinite ease-in-out`,
              '&:hover': {
                background: 'linear-gradient(45deg, #A07B0A, #E6A200)',
                boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.6)}`,
              },
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </GoldCard>
  );
};

export default ProjectCard;
