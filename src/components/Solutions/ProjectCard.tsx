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
} from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';
import Image from 'next/image';
import { CVProject, technologyIconMap } from '../../data/cvProjects';
import { Code2 } from 'lucide-react';

// 💎 Premium Gradient with Diamond Dust Effect
const premiumBackground = `linear-gradient(145deg, 
  rgba(72, 37, 142, 0.95) 0%, 
  rgba(33, 120, 250, 0.9) 50%, 
  rgba(225, 225, 225, 0.85) 100%),
  url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

// ✨ Enhanced Hover Effect
const HoverEffect = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -4,
  left: -4,
  right: -4,
  bottom: -4,
  borderRadius: 18,
  background: `linear-gradient(145deg, 
    ${alpha(theme.palette.primary.main, 0.6)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.6)} 50%, 
    ${alpha('#fff', 0.5)} 100%)`,
  opacity: 0,
  transition: 'opacity 0.4s ease-in-out',
  filter: 'blur(12px)',
}));

// ✅ Tilt Effect Hook
const useTilt = (active: boolean) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Corrected useTransform calls without extra commas
  const rotateX = useTransform(y, [0, 1], [-8, 8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const handleMove = (e: React.PointerEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - bounds.left) / bounds.width);
    y.set((e.clientY - bounds.top) / bounds.height);
  };

  return {
    style: { rotateX: active ? rotateX : 0, rotateY: active ? rotateY : 0 },
    onPointerMove: active ? handleMove : undefined,
  };
};

// 🚀 Project Card Component
const ProjectCard = ({ project }: { project: CVProject }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const tilt = useTilt(hovered);
  const cardRef = useRef<HTMLDivElement>(null);

  // ⚡ Dynamic Icon Renderer with explicit type casting
  const renderTechIcon = (tech: string): JSX.Element => {
    const Icon = technologyIconMap[tech as keyof typeof technologyIconMap] || Code2;
    return <Icon size={16} strokeWidth={1.5} />;
  };

  return (
    <motion.div
      ref={cardRef}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ perspective: 1200, position: 'relative', margin: '16px' }}
      tabIndex={0}
    >
      <AnimatePresence>{hovered && <HoverEffect key="hoverEffect" />}</AnimatePresence>

      <motion.div {...tilt} style={{ ...tilt.style, transformStyle: 'preserve-3d' }}>
        <Card
          sx={{
            position: 'relative',
            overflow: 'hidden',
            bgcolor: premiumBackground,
            border: `1px solid ${alpha('#a2aebf', 0.4)}`,
            borderRadius: 16,
            boxShadow: '0px 16px 50px rgba(0, 0, 0, 0.3)',
            height: 480,
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 36px 70px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
          }}
        >
          <CardActionArea
            component={NextLink}
            href={`/projects/${project.id}`}
            sx={{ p: 4, display: 'flex', flexDirection: 'column', minHeight: 480 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} style={{ borderRadius: 8, overflow: 'hidden' }}>
              <Image
                src={project.image || '/placeholder.png'}
                alt={project.name}
                width={260}
                height={180}
                style={{ objectFit: 'cover' }}
              />
            </motion.div>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,
                }}
              >
                {project.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 1.5,
                  color: 'rgba(255,255,255,0.85)',
                  minHeight: 60,
                  overflow: 'hidden',
                }}
              >
                {project.description}
              </Typography>

              {/* Added Box for logo */}
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={`/logos/${project.clientName.toLowerCase().replace(/\s/g, '-')}.png`}
                  alt={`${project.clientName} logo`}
                  width={80}
                  height={40}
                />
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center',
                '& .MuiChip-root': {
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            >
              {project.technologies.map((tech: string, index: number) => (
                <Chip
                  key={index}
                  label={tech}
                  icon={renderTechIcon(tech)}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.light, 0.15),
                    color: 'white',
                    '& .MuiChip-icon': {
                      color: alpha(theme.palette.primary.light, 0.8),
                      ml: 0.5,
                    },
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.light, 0.25),
                    },
                  }}
                />
              ))}
            </Box>
          </CardActionArea>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
