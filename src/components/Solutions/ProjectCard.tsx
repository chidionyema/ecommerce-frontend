'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  useTheme,
  alpha,
  Button,
  styled,
  keyframes,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { SHARED_CARD_BACKGROUND } from '../../utils/sharedStyles';

// Import shared colors
import { NEUTRAL_BACKGROUND, NEUTRAL_TEXT } from '../../utils/sharedColors';

// ---------------------------------------------------------------------------
// KEYFRAMES & ANIMATIONS
// ---------------------------------------------------------------------------
const subtlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// ---------------------------------------------------------------------------
// STYLED COMPONENTS
// ---------------------------------------------------------------------------
// FixedStyledCard now uses a fixed width of 350px and a fixed height of 400px.
// The background uses a subtle linear-gradient for a premium neutral color blend.
const FixedStyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(45deg, ${NEUTRAL_BACKGROUND} 0%, rgba(255, 255, 255, 0.05) 100%)`, // Matches Pricing Card
  borderRadius: 16,
  boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.5)}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  width: 350,
  height: 400,
  margin: '20px', // Increased spacing for more separation
  backdropFilter: 'blur(18px) saturate(180%)', // Soft glassmorphism
  border: `2px solid rgba(255, 255, 255, 0.1)`, // Subtle border for refinement
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 10px 28px ${alpha(theme.palette.common.black, 0.7)}`,
  },
}));


// A clean overlay for the card that appears on hover (optional)
const HoverOverlay = styled(motion.div)({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  pointerEvents: 'none',
});

// ---------------------------------------------------------------------------
// PROJECT INTERFACE
// ---------------------------------------------------------------------------
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

// A simple map for technology icons (if needed)
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
} from 'lucide-react';

const technologyIconMap: Record<string, LucideIcon> = {
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

// ---------------------------------------------------------------------------
// PROJECT CARD COMPONENT
// ---------------------------------------------------------------------------
const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ perspective: 1000, outline: 'none' }}
      tabIndex={0}
      role="article"
      aria-label={`Project: ${project.name}`}
    >
      <FixedStyledCard>
        {/* Optional hover overlay */}
        <AnimatePresence>
          {hovered && (
            <HoverOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <CardActionArea
          component={NextLink}
          href={`/projects/${project.id}`}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* Image Section (if provided) */}
          {project.image && (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
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

          <CardContent
            sx={{
              px: 0,
              flexGrow: 1,
              textAlign: 'center',
            }}
          >
            {/* Title */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: NEUTRAL_TEXT,
              }}
            >
              {project.name}
            </Typography>

            {/* Client Info */}
            {project.clientName && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                {project.icon && (
                  <Box sx={{ mr: 1 }}>
                    <project.icon size={24} color={theme.palette.primary.light} />
                  </Box>
                )}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.grey[300],
                  }}
                >
                  {project.clientName}
                </Typography>
              </Box>
            )}

            {/* Description */}
            <Typography
              variant="body2"
              sx={{ color: theme.palette.grey[400], mb: 2 }}
            >
              {project.description}
            </Typography>

            {/* Technology Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {project.technologies.map((tech) => {
                const TechIcon = technologyIconMap[tech];
                return (
                  <Chip
                    key={tech}
                    icon={
                      TechIcon ? <TechIcon size={16} color={theme.palette.primary.light} /> : undefined
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
        </CardActionArea>

        {/* Floating CTA Button */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: 24,
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
                  backgroundColor: theme.palette.primary.dark,
                  color: NEUTRAL_TEXT,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.4)}`,
                  animation: `${subtlePulse} 2s infinite ease-in-out`,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.6)}`,
                  },
                }}
              >
                Enter Innovation Portal
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </FixedStyledCard>
    </motion.div>
  );
};

export default ProjectCard;
