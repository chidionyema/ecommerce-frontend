'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  useTheme,
  alpha,
  Button,
  Tooltip,
  IconButton,
  Collapse,
  CardActionArea,
} from '@mui/material';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt, ExpandMore, ExpandLess } from '@mui/icons-material';
import Image from 'next/image';
import {
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Terminal,

  LucideIcon,
} from 'lucide-react'

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
  icon: LucideIcon;
  iconColor: string;
}


// Moved technologyIconMap inside the component
const technologyIconMap = {
  '.NET Core': Code2,
  Java: Terminal,
  WebSockets: GitBranch,
  RabbitMQ: Database,
  MQTT: Layers,
  Docker: Server,
  Kubernetes: Cloud,
  Terraform: Cloud,
  AWS: Cloud,
  Azure: Cloud,
  'C#': Cpu,
  'EF Core': Database,
  SQL: Database,
};

// Convert Tailwind color classes to hex values
const colorMap: Record<string, string> = {
  'text-blue-600': '#2563eb',
  'text-purple-600': '#9333ea',
  'text-green-600': '#16a34a',
  'text-indigo-600': '#4f46e5',
  'text-sky-500': '#0ea5e9',
  'text-red-600': '#dc2626',
  'text-orange-600': '#ea580c',
  'text-emerald-600': '#059669',
  'text-teal-500': '#14b8a6',
  'text-rose-600': '#e11d48',
  'text-amber-600': '#d97706',
};
const cardVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Convert iconColor to hex using colorMap or default to primary main
  const iconColor = colorMap[project.iconColor] || theme.palette.primary.main;

  const toggleExpansion = () => setExpanded(!expanded);

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial="initial"
      style={{ position: 'relative', overflow: 'visible' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card
        sx={{
          position: 'relative',
          overflow: 'visible',
          bgcolor: 'background.paper',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 4,
          boxShadow: theme.shadows,
          transition: 'all 0.3s ease',
          height: '100%', // Ensure card takes full height
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardActionArea
          component={NextLink}
          href={`/projects/${project.id}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 400, // Ensure minimum height for content
          }}
        >
          <CardContent
            sx={{
              textAlign: 'center',
              width: '100%',
              flexGrow: 1, // Allow content to fill available space
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between', // Distribute space between elements
              gap: 2,
            }}
          >
            {/* Project Icon */}
            <motion.div
              animate={hovered? { scale: 1.1 }: { scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 60, // Reduced size
                  height: 60, // Reduced size
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(45deg, ${iconColor} 0%, ${alpha(
                    iconColor,
                    0.3,
                  )} 100%)`,
                  borderRadius: '50%',
                  overflow: 'visible',
                }}
              >
                <project.icon
                  size={30} // Reduced size
                  style={{
                    color: theme.palette.getContrastText(iconColor),
                  }}
                />
              </Box>
            </motion.div>

            {/* Project Name */}
            <Typography
              variant="h5"
              component={motion.div}
              animate={hovered? { y: -5 }: { y: 0 }}
              sx={{
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${alpha(
                  theme.palette.text.primary,
                  0.7,
                )} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {project.name}
            </Typography>

            {/* Compact Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.9rem',
                lineHeight: 1.2, // Improved readability
                display: '-webkit-box',
                WebkitLineClamp: 2, // Reduced lines
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.description}
            </Typography>

            {/* Technology Chips (Limited to 3) */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                flexWrap: 'wrap', // Allow wrapping if necessary
              }}
            >
              {project.technologies.slice(0, 3).map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    bgcolor: alpha(iconColor, 0.1),
                    '&:hover': { bgcolor: alpha(iconColor, 0.2) },
                    '&.MuiChip-label': {
                      fontSize: '0.75rem',
                      whiteSpace: 'nowrap', // Prevent text from wrapping
                    },
                  }}
                />
              ))}
            </Box>

            {/* Metrics Section (Progressive Disclosure) */}
            <Collapse in={expanded} collapsedSize={40}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                  gap: 1,
                }}
              >
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.03),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {metric.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Collapse>

            {/* Expand Button */}
            <IconButton size="small" onClick={toggleExpansion}>
              {expanded? <ExpandLess />: <ExpandMore />}
            </IconButton>
          </CardContent>
        </CardActionArea>

        {/* Explore Button */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              component={NextLink}
              href={`/projects/${project.id}`}
              endIcon={
                <motion.div
                  animate={hovered? { x: 5 }: { x: 0 }}
                  transition={{ repeat: Infinity, repeatType: 'mirror', duration: 1.2 }}
                >
                  <ArrowRightAlt />
                </motion.div>
              }
              sx={{
                width: '100%',
                bgcolor: alpha(iconColor, 0.9),
                color: theme.palette.getContrastText(iconColor),
                '&:hover': {
                  bgcolor: alpha(iconColor, 1),
                },
              }}
            >
              Explore Project
            </Button>
          </motion.div>
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;