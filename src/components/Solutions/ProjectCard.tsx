'use client';

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
import { useState } from 'react';
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
  LucideIcon,
} from 'lucide-react';
import Image from 'next/image';

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
  Terraform: BoxIcon,
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

const glintAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const GlintEffect = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)`,
  animation: `${glintAnimation} 2s linear infinite`,
  pointerEvents: 'none',
}));

const HoverEffectLayer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(
    theme.palette.secondary.main,
    0.1
  )} 100%)`,
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  // Convert iconColor to hex using colorMap or default to primary main
  const iconColor = colorMap[project.iconColor] || theme.palette.primary.main;

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      style={{ position: 'relative', overflow: 'visible' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
     <Card sx={{
            position: 'relative',
            overflow: 'visible',
            bgcolor: 'background.paper',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            borderRadius: 4,
            boxShadow: theme.shadows, // Corrected boxShadow
            transition: 'all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.2)}`,
            },
            height: 450, // Fixed height for the card
            display: 'flex',
            flexDirection: 'column',

            // Added margin and padding
            margin: theme.spacing(2), // Adjust margin size as needed
            padding: theme.spacing(3), // Adjust padding size as needed
          }}
        >

        <HoverEffectLayer sx={{ '&:hover': { opacity: 0.2 } }} />
        {/* Optional Glint Effect */}
        {hovered && <GlintEffect />}

        <CardActionArea
          component={NextLink}
          href={`/projects/${project.id}`}
          sx={{
            p: 5, // Increased padding
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 450, // Increased min height to match card height
          }}
        >
          {/* Project Icon */}
          <motion.div
            animate={hovered? { scale: 1.1 }: { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              position: 'relative',
          
              marginBottom: theme.spacing(3),
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(45deg, ${iconColor} 0%, ${alpha(
                  iconColor,
                  0.3
                )} 100%)`,
                borderRadius: '50%',
                overflow: 'visible',
                zIndex: 2, // Ensure icon is on top
              }}
            >
              <project.icon
                size={40}
                style={{
                  color: theme.palette.getContrastText(iconColor),
                }}
              />
            </Box>
          </motion.div>

          {project.image && (
            <Box
              sx={{
                width: 200, // Fixed width for the image
                height: 150, // Fixed height for the image
                position: 'relative',
                marginBottom: theme.spacing(2),
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

          <CardContent sx={{ textAlign: 'center', px: 0, width: '100%', flexGrow: 1 }}>
            {/* Project Name */}
            <Typography
              variant="h5"
              component={motion.div}
              animate={hovered? { y: -5 }: { y: 0 }}
              sx={{
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${alpha(
                  theme.palette.text.primary,
                  0.7
                )} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              {project.name}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.9rem',
                minHeight: 60,
                mb: 2,
                px: 2,
              }}
            >
              {project.description}
            </Typography>

            {/* Technology Icons Section */}
            <Box sx={{ mb: 5, overflow: 'hidden' }}> {/* Increased margin bottom */}
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Main Technologies
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 4, // Increased gap
                  mb: 4, // Increased margin bottom
                  '& > *': { // Target direct children for animation
                    opacity: 0, // Initially hide icons
                  },
                  '& > *[data-animated]': { // Style animated icons
                    opacity: 1,
                  },
                }}
              >
                {project.technologies.map((tech, index) => {
                  const TechIcon = technologyIconMap[tech as keyof typeof technologyIconMap];
                  return TechIcon? (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      data-animated // Add data attribute for animated icons
                    >
                      <TechIcon size={24} color={iconColor} />
                    </motion.div>
                  ): null;
                })}
              </Box>

              {/* Technology Chips */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 3, // Increased gap
                  justifyContent: 'center',
                  overflow: 'hidden',
                  '& > *': { // Target direct children for animation
                    opacity: 0, // Initially hide chips
                  },
                  '& > *[data-animated]': { // Style animated chips
                    opacity: 1,
                  },
                }}
              >
                {project.technologies.map((tech, index) => {
                  const TechIcon =
                    technologyIconMap[tech as keyof typeof technologyIconMap];
                  return TechIcon? (
                    <motion.div
                      key={tech}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      data-animated // Add data attribute for animated chips
                    >
                      <Chip
                        icon={<TechIcon size={16} />}
                        label={tech}
                        size="small"
                        sx={{
                          borderRadius: 2,
                          bgcolor: alpha(iconColor, 0.1),
                          '&:hover': { bgcolor: alpha(iconColor, 0.2) },
                        }}
                      />
                    </motion.div>
                  ): null;
                })}
              </Box>
            </Box>

            {/* Metrics Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3, // Increased gap
                mb: 4, // Increased margin bottom
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
                      p: 2, // Increased padding
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.03),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {metric.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </CardContent>
        </CardActionArea>

        {/* Explore Button */}
        <Box sx={{ p: 3, textAlign: 'center' }}> {/* Increased padding */}
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