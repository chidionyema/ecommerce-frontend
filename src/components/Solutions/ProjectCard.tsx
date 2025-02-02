'use client';

import { useState, useRef, useEffect } from 'react';
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
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  MotionValue,
} from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';
import Image from 'next/image';
import {
  Cloud,
  Code as Code2, // Import Code as Code2
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Terminal,
  Box as BoxIcon,
} from 'lucide-react';

// Define a type for Lucide icons (since lucide-react doesn't export one)
type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Project interface
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
  icon?: LucideIcon; // Mark icon as optional
  iconColor: string;
}

// Technology icon map with type safety
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

// Color mapping with type safety – adjust these as needed for a radical new look
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

// Animation keyframes for the glint effect
const glintAnimation = keyframes`
  0% { transform: translateX(-150%); }
  100% { transform: translateX(150%); }
`;

// Styled component for the glint effect
const GlintEffect = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  backgroundImage:
    'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
  animation: `${glintAnimation} 2.5s linear infinite`,
  pointerEvents: 'none',
  borderRadius: 16,
}));

// A simple hover overlay (optional)
const HoverEffectLayer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(45deg, ${alpha(
    theme.palette.primary.main,
    0.3
  )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

// Tilt hook with proper typing
const useTilt = (active: boolean) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [-8, 8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

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
  } as {
    style: {
      rotateX: MotionValue<number>;
      rotateY: MotionValue<number>;
    };
    onPointerMove?: React.PointerEventHandler;
  };
};

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const tilt = useTilt(hovered);
  const cardRef = useRef<HTMLDivElement>(null);
  // Use the iconColor from your mapping or fallback to theme.primary
  const iconColor = colorMap[project.iconColor] || theme.palette.primary.main;

  // Fallback for project.icon if missing
  const IconComponent = project.icon ? project.icon : Code2;

  // Enable keyboard navigation: trigger click on Enter
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (document.activeElement === cardRef.current && e.key === 'Enter') {
        cardRef.current?.click();
      }
    };

    cardRef.current?.addEventListener('keypress', handleKeyPress);
    return () => cardRef.current?.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        perspective: 1200,
        position: 'relative',
        overflow: 'visible',
        margin: '16px', // Adjusted margin
      }}
      tabIndex={0}
      role="article"
      aria-label={`Project card: ${project.name}`}
    >
      <AnimatePresence>{hovered && <GlintEffect key="glint" />}</AnimatePresence>

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
            border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
            borderRadius: 16,
            boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
            height: 420,
            display: 'flex',
            flexDirection: 'column',
            // NEW: Use theme.palette.background.default for a neutral base,
            // then overlay a very subtle radial gradient.
            background: `
              linear-gradient(145deg, ${alpha(theme.palette.background.default, 1)} 0%, ${alpha(
              theme.palette.background.default,
              1
            )} 100%),
              radial-gradient(circle at 70% 20%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 60%)
            `,
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.25)}`,
            },
            '&:active': {
              transform: 'translateY(-4px) scale(0.98)',
            },
          }}
        >
          <HoverEffectLayer sx={{ '&:hover': { opacity: 0.2 } }} />
          <CardActionArea
            component={NextLink}
            href={`/projects/${project.id}`}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 420,
            }}
          >
            {project.image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    width: 220,
                    height: 160,
                    position: 'relative',
                    mx: 'auto',
                    mb: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: alpha(theme.palette.divider, 0.1),
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                  />
                </Box>
              </motion.div>
            )}

            <CardContent
              sx={{
                textAlign: 'center',
                px: 0,
                width: '100%',
                flexGrow: 1,
              }}
            >
              <Typography
                variant="h5"
                component={motion.div}
                animate={hovered ? { y: -5 } : { y: 0 }}
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${alpha(
                    theme.palette.text.primary,
                    0.7
                  )} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  textAlign: 'center',
                }}
              >
                {project.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: '0.9rem',
                  minHeight: 60,
                  mb: 2,
                  px: 2,
                  textAlign: 'center',
                }}
              >
                {project.description}
              </Typography>

              <Box sx={{ mb: 4, overflow: 'hidden' }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Main Technologies
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 3,
                    mb: 3,
                  }}
                >
                  {project.technologies.map((tech, index) => {
                    const TechIcon =
                      technologyIconMap[tech as keyof typeof technologyIconMap];
                    if (index < 3 && TechIcon) {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <TechIcon size={24} color={iconColor} />
                        </motion.div>
                      );
                    }
                    return null;
                  })}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {project.technologies.map((tech, index) => {
                    const TechIcon =
                      technologyIconMap[tech as keyof typeof technologyIconMap];
                    if (index < 3 && TechIcon) {
                      return (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
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
                      );
                    }
                    return null;
                  })}
                </Box>
              </Box>

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
                    whileTap={{ scale: 0.95 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.03),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        textAlign: 'center',
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

          {/* Progressive CTA overlay that appears on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 16,
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
                    bgcolor: alpha(iconColor, 0.9),
                    color: theme.palette.getContrastText(iconColor),
                    borderRadius: 30,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': { bgcolor: alpha(iconColor, 1) },
                  }}
                >
                  Explore Project
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
