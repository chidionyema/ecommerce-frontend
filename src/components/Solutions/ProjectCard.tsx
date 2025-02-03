'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  useSpring,
} from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt, ErrorOutline } from '@mui/icons-material';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { sharedCardBackground } from '../../utils/sharedStyles';


// ---------------------------
// KEYFRAMES & ANIMATIONS
// ---------------------------

// Original animations
const neuroFlicker = keyframes`
  0%   { filter: brightness(1) contrast(1); }
  50%  { filter: brightness(1.02) contrast(1.1); }
  100% { filter: brightness(1) contrast(1); }
`;

const hyperFlow = keyframes`
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const neonPulse = keyframes`
  0%   { opacity: 0.5; }
  50%  { opacity: 1; }
  100% { opacity: 0.5; }
`;

const particleFloat = (x: number, y: number) => keyframes`
  0%   { transform: translate(${x}px, ${y}px) scale(0); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translate(${x * 2}px, ${y - 150}px) scale(1); opacity: 0; }
`;

const particleAnimation = keyframes`
  0%   { transform: translateY(0) scale(0); opacity: 0; }
  50%  { opacity: 1; }
  100% { transform: translateY(-100px) scale(1); opacity: 0; }
`;

// ADDED: A slow attention pulse for the entire card
const attentionPulse = keyframes`
  0%   { transform: scale(1);   opacity: 1; }
  50%  { transform: scale(1.02);opacity: 0.8; }
  100% { transform: scale(1);   opacity: 1; }
`;

// ADDED: A hue rotation for color cycling on NeuralGlow
const hueRotate = keyframes`
  from { filter: hue-rotate(0deg); }
  to   { filter: hue-rotate(360deg); }
`;

// ---------------------------
// STYLED COMPONENTS
// ---------------------------

// Glowing backdrop effect
const NeuralGlow = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: -2,
  borderRadius: 18,
  background: `linear-gradient(45deg,
    ${alpha(theme.palette.primary.main, 0.8)},
    ${alpha(theme.palette.secondary.main, 0.6)},
    ${alpha(theme.palette.error.main, 0.4)})`,
  filter: 'blur(80px)',
  opacity: 0,
  transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: -2,
  // ADDED: Hue rotation
  animation: `${hueRotate} 40s linear infinite`,
}));

// Grid-like overlay with slow background flow (hypnotic swirl)
const HologridLayer = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `
    linear-gradient(to right, ${alpha(theme.palette.divider, 0.1)} 1px, transparent 1px),
    linear-gradient(to bottom, ${alpha(theme.palette.divider, 0.1)} 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
  opacity: 0.3,
  animation: `${hyperFlow} 20s linear infinite`,
  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0))',
}));

// Soft holographic glow
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

// Particle system container
const ParticleSystem = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  borderRadius: 16,
  // ADDED: Subtle repeating linear gradient in the background
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    background: `
      repeating-linear-gradient(
        45deg,
        ${alpha(theme.palette.primary.main, 0.1)} 0% 2%,
        transparent 2% 10%
      )`,
    animation: `${hyperFlow} 30s linear infinite`,
    opacity: 0.2,
  },
  // Original radial overlay
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(800px circle at var(--x) var(--y),
      ${alpha(theme.palette.primary.main, 0.15)},
      transparent 40%)`,
  },
}));

// Border gradient with neon pulse animation for extra allure
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
  animation: `${neonPulse} 3s infinite`,
}));

// ---------------------------
// HOOK: USE HYPERTILT
// ---------------------------
const useHyperTilt = (active: boolean) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springConfig = { stiffness: 400, damping: 15 };

  const rotateX = useSpring(useTransform(y, [0, 1], [-15, 15]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), springConfig);
  const scale = useSpring(active ? 1.08 : 1, springConfig);
  const shadowX = useSpring(useTransform(x, [0, 1], [-30, 30]), springConfig);
  const shadowY = useSpring(useTransform(y, [0, 1], [-30, 30]), springConfig);

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
      transformPerspective: 1600,
    },
    shadowStyle: {
      x: shadowX,
      y: shadowY,
    },
    onPointerMove: active ? handleMove : undefined,
  };
};

// ---------------------------
// CONSTANTS & ICON MAPS
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

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ---------------------------
// PROJECT INTERFACE
// ---------------------------
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

// ---------------------------
// PROJECT CARD COMPONENT
// ---------------------------
const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const { style, shadowStyle, onPointerMove } = useHyperTilt(hovered);
  const cardRef = useRef<HTMLDivElement>(null);
  const gradient = gradientMap[project.iconColor] || gradientMap['text-blue-600'];

  // Particle effect: burst particles when hovered
  useEffect(() => {
    if (!hovered || !cardRef.current) return;
    const particles = 24;
    const container = cardRef.current;
    const spawnParticle = () => {
      const particle = document.createElement('div');
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${alpha(theme.palette.primary.main, Math.random() * 0.4 + 0.4)};
        border-radius: 50%;
        animation: ${particleFloat(Math.random() * 40 - 20, Math.random() * 40 - 20)}
          ${Math.random() * 0.6 + 0.8}s ease-out;
        left: ${startX}%;
        top: ${startY}%;
      `;
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    };
    Array.from({ length: particles }).forEach(() => spawnParticle());
  }, [hovered, theme]);

  return (
    <motion.div
      ref={cardRef}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onPointerMove={onPointerMove}
      style={{ perspective: 1600, position: 'relative' }}
      tabIndex={0}
      role="article"
      aria-label={`Project: ${project.name}`}
    >
      {/* Particle overlay */}
      <ParticleSystem style={{ opacity: hovered ? 1 : 0 }} />

      {/* Shadow effect (from hyper-tilt) */}
      <motion.div
        style={{
          ...shadowStyle,
          position: 'absolute',
          inset: 0,
          borderRadius: 18,
          background: alpha(theme.palette.primary.main, 0.1),
          filter: 'blur(60px)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <motion.div
        style={{
          ...style,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <Card
          // ADDED: Subtle attention pulse (and faster on hover)
          // Deep Sea Blue: #1D2B44 - A rich, calming blue that evokes a sense of depth and tranquility.
        //Cyberpunk Purple: #3B1F50 - A dark, mysterious purple with a hint of danger and intrigue.
        //Forest Night Green: #183D3D - A deep, grounding green that suggests stability and growth.
        //Molten Gold (Darkened): #5D4037 - A luxurious, warm color that contrasts well with cooler tones.
          
          
          sx={{
            position: 'relative',
            overflow: 'visible',
            bgcolor: '#1D2B44',
            borderRadius: 16,
            boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.2)}`,
            height: 520,
            width: 350,
            margin: '20px auto',
            padding: '20px',
            background: sharedCardBackground(theme),
            animation: `${neuroFlicker} 3s infinite, attentionPulse 8s infinite cubic-bezier(0.4, 0, 0.6, 1)`,
            '&:hover': {
              animation: `${neuroFlicker} 1.5s infinite ease-in-out, attentionPulse 3s infinite ease-in-out`,
              boxShadow: `0 48px 96px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
            // ADDED: Neuromorphic depth illusion
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 16,
              boxShadow: `
                12px 12px 24px ${alpha(theme.palette.common.black, 0.4)},
                -8px -8px 16px ${alpha(theme.palette.common.white, 0.05)}`,
              pointerEvents: 'none',
            },
          }}
        >
          {/* Background layers */}
          <HologridLayer />
          <NeuralGlow sx={{ opacity: hovered ? 0.8 : 0 }} />
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
            {/* Optional image with parallax effect */}
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
                      background: `linear-gradient(180deg, ${alpha('#000', 0.2)} 0%, transparent 100%)`,
                    }}
                  />
                </Box>
              </motion.div>
            )}

            <CardContent
              // ADDED: Cognitive anchoring (persistent subtle motion on hover)
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{ px: 0, flexGrow: 1 }}
            >
              <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 8,
                          bgcolor: theme.palette.warning.light,
                          color: theme.palette.warning.dark,
                          fontSize: '0.75rem',
                        }}
                      >
                        <ErrorOutline sx={{ fontSize: 14, mr: 1 }} />
                        Trending
                      </Box>
              {/* Title */}
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
                  // ADDED: Sensory deprivation contrast
                  textShadow: `
                    0 2px 10px ${alpha(theme.palette.primary.main, 0.5)},
                    0 -1px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
                  filter: 'saturate(1.2)',
                }}
              >
                {project.name}
              </Typography>

              {/* Client info: Icon & Name */}
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
                      <project.icon size={24} color={theme.palette.primary.main} />
                    </Box>
                  )}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {project.clientName}
                  </Typography>
                </Box>
              )}

              {/* Description */}
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

              {/* Technology Chips */}
              <Box sx={{ my: 3 }}>
                <Box
                  component={motion.div}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
                  }}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    justifyContent: 'center',
                  }}
                >
                  {project.technologies.map((tech) => {
                    const TechIcon = technologyIconMap[tech];
                    return (
                      <motion.div
                        key={tech}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <Chip
                          icon={
                            TechIcon ? <TechIcon size={18} color={theme.palette.primary.main} /> : undefined
                          }
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

          {/* Floating CTA Button with subtle pulsation */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  position: 'absolute',
                  bottom: 32,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                }}
              >
                <Button
                  component={NextLink}
                  href={`/projects/${project.id}`}
                  endIcon={
                    <ArrowRightAlt
                      sx={{
                        transition: 'transform 0.3s ease',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                      }}
                    />
                  }
                  sx={{
                    background: `linear-gradient(45deg, ${alpha(
                      theme.palette.primary.main,
                      0.9
                    )}, ${alpha(theme.palette.secondary.main, 0.7)})`,
                    color: theme.palette.common.white,
                    borderRadius: 8,
                    px: 4,
                    py: 1.5,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                    transform: 'translateZ(40px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    // ADDED: Subliminal swirl effect on CTA
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: `
                        linear-gradient(
                          45deg,
                          transparent 45%,
                          ${alpha(theme.palette.common.white, 0.3)} 50%,
                          transparent 55%
                        )`,
                      animation: `${hyperFlow} 3s infinite linear`,
                      opacity: 0.3,
                    },
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.05)',
                      '& svg': { transform: 'translateX(6px)' },
                    },
                  }}
                >
                  Enter Innovation Portal
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
