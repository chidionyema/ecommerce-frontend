'use client';

import { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Card, 
  CardContent, 
  useTheme, 
  alpha, 
  Button,
  styled,
  keyframes
} from '@mui/material';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';
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
  Box as BoxIcon,
  LucideIcon,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  clientName: string;
  image?: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  icon: LucideIcon;
  iconColor: string;
}

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

const useTilt = (active: boolean) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useTransform(y, [0, 1], [-10, 10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);
  
  const handleMove = (e: React.PointerEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - bounds.left) / bounds.width);
    y.set((e.clientY - bounds.top) / bounds.height);
  };
  
  return {
    style: {
      rotateX: active ? rotateX : 0,
      rotateY: active ? rotateY : 0,
    },
    onPointerMove: active ? handleMove : undefined,
  };
};

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const tilt = useTilt(hovered);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconColor = colorMap[project.iconColor] || theme.palette.primary.main;

  return (
    <motion.div
      ref={cardRef}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ perspective: 1000, position: 'relative' }}
    >
      {hovered && <GlintEffect />}
      
      <motion.div
        {...tilt}
        style={{
          ...tilt.style,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        <Card
          sx={{
            position: 'relative',
            overflow: 'visible',
            bgcolor: 'background.paper',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            borderRadius: 4,
            boxShadow: theme.shadows[4],
            transition: 'all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1)',
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            background: `
              linear-gradient(145deg, 
                ${alpha(theme.palette.background.paper, 0.98)}, 
                ${alpha(theme.palette.background.paper, 1)}
              ),
              radial-gradient(
                circle at 75% 30%,
                ${alpha(iconColor, 0.1)} 0%,
                transparent 40%
              )
            `,
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.2)}`,
            },
          }}
        >
          <Box
            component={NextLink}
            href={`/projects/${project.id}`}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textDecoration: 'none',
              p: 3
            }}
          >
            {/* Project Image */}
            {project.image && (
              <Box sx={{
                width: 200,
                height: 150,
                position: 'relative',
                mx: 'auto',
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <Image
                  src={project.image}
                  alt={project.name}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            )}

            {/* Project Icon */}
            <motion.div
              animate={hovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ textAlign: 'center' }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  width: 80,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(45deg, ${iconColor} 0%, ${alpha(iconColor, 0.3)} 100%)`,
                  borderRadius: '50%',
                  mb: 2,
                }}
              >
                <project.icon
                  size={40}
                  style={{ color: theme.palette.getContrastText(iconColor) }}
                />
              </Box>
            </motion.div>

            {/* Project Name */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${alpha(theme.palette.text.primary, 0.7)} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                textAlign: 'center'
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
                textAlign: 'center'
              }}
            >
              {project.description}
            </Typography>

            {/* Technology Chips */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center',
                mb: 2
              }}
            >
              {project.technologies.slice(0, 3).map((tech, index) => {
                const TechIcon = technologyIconMap[tech as keyof typeof technologyIconMap];
                return TechIcon ? (
                  <Chip
                    key={index}
                    icon={<TechIcon size={16} />}
                    label={tech}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      bgcolor: alpha(iconColor, 0.1),
                      '&:hover': { bgcolor: alpha(iconColor, 0.2) },
                    }}
                  />
                ) : null;
              })}
            </Box>

            {/* Metrics Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                mb: 3,
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
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.03),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      textAlign: 'center'
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

            {/* Explore Button */}
            <Box sx={{ textAlign: 'center' }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  component="div"
                  endIcon={
                    <motion.div
                      animate={{ x: hovered ? [0, 5, 0] : 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
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
          </Box>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;