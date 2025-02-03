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
  useSpring,
} from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

// ---------------------------
// Define your technology icon map
// ---------------------------
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

// ---------------------------
// Other constants and styled components
// ---------------------------
const gradientMap: Record<string, string> = {
  'text-blue-600': 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
  'text-purple-600': 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
  'text-green-600': 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
  'text-indigo-600': 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
  'text-sky-500': 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
  'text-red-600': 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
  'text-orange-600': 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
  'text-emerald-600': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  'text-teal-500': 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',
  'text-rose-600': 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
  'text-amber-600': 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
};

const particleAnimation = keyframes`
  0% { transform: translateY(0) scale(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100px) scale(1); opacity: 0; }
`;

const HolographicGlow = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(45deg,
    ${alpha(theme.palette.primary.main, 0.4)} 0%,
    ${alpha(theme.palette.secondary.main, 0.2)} 50%,
    ${alpha(theme.palette.primary.main, 0.4)} 100%)`,
  filter: 'blur(60px)',
  opacity: 0,
  transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: -1,
}));

const ParticleSystem = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  borderRadius: 16,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(800px circle at var(--x) var(--y),
      ${alpha(theme.palette.primary.main, 0.15)},
      transparent 40%)`,
  },
}));

const BorderGradient = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  borderRadius: 16,
  padding: '2px',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
  background: `linear-gradient(45deg,
    ${alpha(theme.palette.primary.main, 0.8)},
    ${alpha(theme.palette.secondary.main, 0.4)})`,
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

const useTilt = (active: boolean) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(y, [0, 1], [-12, 12]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), springConfig);
  const scale = useSpring(active ? 1.03 : 1, springConfig);

  const handleMove = (e: React.PointerEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - bounds.left) / bounds.width);
    y.set((e.clientY - bounds.top) / bounds.height);
  };

  return {
    style: {
      rotateX,
      rotateY,
      scale,
      transformPerspective: 1200,
    },
    onPointerMove: active ? handleMove : undefined,
  };
};

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ---------------------------
// Project Interface
// ---------------------------
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
  icon?: LucideIcon; // Company icon (if provided)
  iconColor: string;
}

// ---------------------------
// ProjectCard Component
// ---------------------------
const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const tilt = useTilt(hovered);
  const cardRef = useRef<HTMLDivElement>(null);
  const gradient = gradientMap[project.iconColor] || gradientMap['text-blue-600'];

  // Particle effect on hover
  useEffect(() => {
    if (!hovered || !cardRef.current) return;
    const particles = 12;
    const container = cardRef.current;
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${alpha(theme.palette.primary.main, 0.8)};
        border-radius: 50%;
        animation: ${particleAnimation} 1.2s ease-out;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 1200);
    }
  }, [hovered, theme]);

  return (
    <motion.div
      ref={cardRef}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ perspective: 1200, position: 'relative' }}
      tabIndex={0}
      role="article"
      aria-label={`Project: ${project.name}`}
    >
      <ParticleSystem style={{ opacity: hovered ? 1 : 0 }} />

      <motion.div
        {...tilt}
        style={{
          ...tilt.style,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <Card
          sx={{
            position: 'relative',
            overflow: 'visible',
            bgcolor: 'background.paper',
            border: 'none',
            borderRadius: 16,
            boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.1)}`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            height: 440,
            background: `
              linear-gradient(145deg, #1F1B24 0%, #3D3A45 100%),
              radial-gradient(circle at 70% 20%, rgba(212,175,55,0.15) 0%, transparent 70%)
            `,
            '&:hover': {
              boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.3)}`,
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 16,
              background: `
                linear-gradient(45deg,
                  ${alpha(theme.palette.primary.main, 0.1)},
                  ${alpha(theme.palette.secondary.main, 0.05)})
              `,
            },
          }}
        >
          <HolographicGlow sx={{ opacity: hovered ? 0.6 : 0 }} />
          <BorderGradient sx={{ opacity: hovered ? 1 : 0 }} />

          <CardActionArea
            component={NextLink}
            href={`/projects/${project.id}`}
            sx={{
              p: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Image section with parallax effect */}
            {project.image && (
              <motion.div
                style={{
                  scale: hovered ? 1.05 : 1,
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 160,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transform: 'translateZ(60px)',
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(180deg, ${alpha(
                        '#000',
                        0.2
                      )} 0%, transparent 100%)`,
                    }}
                  />
                </Box>
              </motion.div>
            )}

            <CardContent sx={{ px: 0, flexGrow: 1 }}>
              {/* Title with gradient text and defined variants (using a larger variant for readability) */}
              <Typography
                variant="h4"
                component={motion.div}
                variants={titleVariants}
                initial="initial"
                animate="animate"
                sx={{
                  fontWeight: 900,
                  background: gradient,
                  backgroundSize: '100% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1.5,
                  textAlign: 'center',
                  transition: 'background-size 0.6s ease',
                }}
              >
                {project.name}
              </Typography>

              {/* Company Info: Icon & Name with larger text for readability */}
              {project.clientName && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  {project.icon && (
                    <Box sx={{ mr: 1 }}>
                      <project.icon size={24} color={theme.palette.primary.main} />
                    </Box>
                  )}
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
                    {project.clientName}
                  </Typography>
                </Box>
              )}

              {/* Description with animated underline and larger font */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  position: 'relative',
                  pb: 1.5,
                  textAlign: 'center',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: hovered ? '100%' : '0%',
                    height: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.3),
                    transform: 'translateX(-50%)',
                    transition: 'width 0.4s ease',
                  },
                }}
              >
                {project.description}
              </Typography>

              {/* Technology chips with staggered animation */}
              <Box sx={{ my: 3 }}>
                <Box
                  component={motion.div}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
                  }}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    justifyContent: 'center',
                  }}
                >
                  {project.technologies.map((tech) => {
                    const TechIcon = technologyIconMap[tech as keyof typeof technologyIconMap];
                    return (
                      <motion.div
                        key={tech}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <Chip
                          icon={TechIcon ? <TechIcon size={18} color={theme.palette.primary.main} /> : undefined}
                          label={tech}
                          size="small"
                          sx={{
                            fontSize: '0.875rem',
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) },
                            transition: 'all 0.2s ease',
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>

          {/* Floating CTA button */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
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
                  endIcon={<ArrowRightAlt sx={{ transition: 'transform 0.3s ease' }} />}
                  sx={{
                    background: gradient,
                    color: theme.palette.common.white,
                    borderRadius: 30,
                    px: 3,
                    py: 1,
                    fontWeight: 700,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      '& svg': { transform: 'translateX(4px)' },
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Explore Innovation
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
