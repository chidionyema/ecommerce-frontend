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
import GoldCard from '../GoldCard'; // adjust the path if necessary
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
        margin: '0 !important', // Remove any default margins
        height: '100%', // Fill grid cell
        padding: 2, // Internal spacing (theme.spacing(2) equals 16px)
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 24px 48px ${alpha(theme.palette.common.black, 0.4)}`,
        }
      }}
    >
      {project.image && (
        <Box
          sx={{
            position: 'relative',
            width: 'calc(100% - 16px)', // Account for internal padding
            margin: '8px', // Balanced spacing around the image
            height: 150,
            borderRadius: 2,
            overflow: 'hidden',
            mb: 2,
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

      <CardContent sx={{ px: 0, flexGrow: 1, textAlign: 'center' }}>
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
      </CardContent>

      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <Button
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
        </motion.div>
      </AnimatePresence>
    </GoldCard>
  );
};

export default ProjectCard;
