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
  keyframes,
} from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt, ErrorOutline } from '@mui/icons-material';
import Image from 'next/image';
import { sharedCardBackground } from '../../utils/sharedStyles';
import { technologyIconMap } from '../../data/cvProjects';

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  clientName: string;
  image?: string;
  metrics?: Array<{ label: string; value: string }>;
  icon?: any;
  iconColor: string;
  achievements?: string[];
  trending?: boolean;
}

const neuroFlicker = keyframes`
  0%   { filter: brightness(1) contrast(1); }
  50%  { filter: brightness(1.02) contrast(1.1); }
  100% { filter: brightness(1) contrast(1); }
`;

const attentionPulse = keyframes`
  0%   { transform: scale(1);   opacity: 1; }
  50%  { transform: scale(1.02);opacity: 0.8; }
  100% { transform: scale(1);   opacity: 1; }
`;

const particleFloat = (x: number, y: number) => keyframes`
  0%   { transform: translate(${x}px, ${y}px) scale(0); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translate(${x * 2}px, ${y - 150}px) scale(1); opacity: 0; }
`;

const achievementsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const achievementItem = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const useHyperTilt = (active: boolean) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springConfig = { stiffness: 400, damping: 15 };

  const rotateX = useSpring(useTransform(y, [0, 1], [-15, 15]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), springConfig);
  const scale = useSpring(active ? 1.08 : 1, springConfig);

  const handlePointerMove = (e: React.PointerEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - bounds.left) / bounds.width);
    y.set((e.clientY - bounds.top) / bounds.height);
  };

  return {
    style: { rotateX, rotateY, scale, transformPerspective: 1600 },
    onPointerMove: active ? handlePointerMove : undefined,
  };
};

const ProjectCard = ({ project }: { project?: Project }) => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  if (!project) return null;

  const [hovered, setHovered] = useState(false);
  const { style, onPointerMove } = useHyperTilt(hovered);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hovered || !cardRef.current) return;
    const container = cardRef.current;
    const particles = 20;

    const spawnParticle = () => {
      const particle = document.createElement('div');
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${alpha(primaryColor, Math.random() * 0.4 + 0.4)};
        border-radius: 50%;
        animation: ${particleFloat(Math.random() * 40 - 20, Math.random() * 40 - 20)}
          ${Math.random() * 0.6 + 0.8}s ease-out;
        left: ${startX}%;
        top: ${startY}%;
        z-index: 9999;
      `;
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    };

    Array.from({ length: particles }).forEach(spawnParticle);
  }, [hovered, primaryColor]);

  return (
    <motion.div
      ref={cardRef}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onPointerMove={onPointerMove}
      style={{ perspective: 1600, position: 'relative', margin: '16px auto' }}
      tabIndex={0}
      role="article"
      aria-label={`Project: ${project.name}`}
    >
      <motion.div style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}>
        <Card
          sx={{
            position: 'relative',
            overflow: 'visible',
            borderRadius: 16,
            bgcolor: '#1D2B44',
            boxShadow: `0 32px 64px ${alpha(primaryColor, 0.15)}`,
            height: 600,
            width: '100%',
            maxWidth: 440,
            padding: '20px',
            background: sharedCardBackground(theme),
            animation: `${neuroFlicker} 3s infinite, ${attentionPulse} 8s infinite cubic-bezier(0.4, 0, 0.6, 1)`,
            '&:hover': {
              animation: `${neuroFlicker} 1.5s infinite ease-in-out, ${attentionPulse} 3s infinite ease-in-out`,
              boxShadow: `0 48px 96px ${alpha(primaryColor, 0.6)}`,
              outline: `2px solid ${primaryColor}`,
              outlineOffset: '0px',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 16,
              pointerEvents: 'none',
              boxShadow: `
                12px 12px 24px ${alpha('#000', 0.4)},
                -8px -8px 16px ${alpha('#FFF', 0.05)}`,
            },
          }}
        >
          <CardActionArea
            component={NextLink}
            href={`/projects/${project.id}`}
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              textDecoration: 'none',
              position: 'relative',
            }}
          >
            {/* Updated Badge (No Conditional, Always Visible) */}
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                py: 0.5,
                borderRadius: 8,
                bgcolor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                fontSize: '0.75rem',
                boxShadow: theme.shadows[2],
              }}
            >
              <ErrorOutline sx={{ fontSize: 14, mr: 1 }} />
              Featured Project {/* Updated Label */}
            </Box>

            {project.image && (
              <motion.div
                style={{
                  scale: hovered ? 1.04 : 1,
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 180,
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
                </Box>
              </motion.div>
            )}

            <CardContent sx={{ px: 1, flexGrow: 1, position: 'relative' }}>
              <motion.div
                initial={{ x: 120, opacity: 0 }}
                animate={
                  hovered
                    ? { x: 0, opacity: 1, transition: { duration: 0.4 } }
                    : { x: 120, opacity: 0, transition: { duration: 0.3 } }
                }
                style={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowRightAlt />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    backgroundColor: primaryColor,
                    color: theme.palette.getContrastText(primaryColor),
                    '&:hover': {
                      backgroundColor: alpha(primaryColor, 0.8),
                    },
                    boxShadow: `0 0 16px ${alpha(primaryColor, 0.5)}`,
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                  }}
                >
                  Explore Guide
                </Button>
              </motion.div>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  textAlign: 'center',
                  color: '#fff',
                  textShadow: `0 0 6px ${primaryColor}, 0 0 12px ${primaryColor}`,
                  mb: 1.5,
                }}
              >
                {project.name}
              </Typography>

              {project.icon && project.clientName && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    mb: 2,
                    p: 1.5,
                    backgroundColor: alpha(primaryColor, 0.1),
                    borderRadius: '14px',
                    border: `1px solid ${alpha(primaryColor, 0.3)}`,
                    width: 'fit-content',
                    mx: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      backgroundColor: alpha(primaryColor, 0.2),
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <project.icon
                      size={28}
                      style={{
                        color: primaryColor,
                        filter: `drop-shadow(0 0 5px ${primaryColor})`,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: '#fff',
                      textShadow: `0 0 4px ${primaryColor}`,
                    }}
                  >
                    {project.clientName}
                  </Typography>
                </Box>
              )}

              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: '#ccc',
                  mb: 2,
                  textShadow: `0 0 4px ${primaryColor}`,
                }}
              >
                {project.description}
              </Typography>

              <Box
                sx={{ 
                  display: 'flex', 
                  gap: 1.5, 
                  flexWrap: 'wrap', 
                  justifyContent: 'center', 
                  mb: 2 
                }}
              >
                {project.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      fontSize: '0.875rem',
                      borderRadius: 2,
                      bgcolor: alpha(primaryColor, 0.12),
                      color: primaryColor,
                      '&:hover': { bgcolor: alpha(primaryColor, 0.2) },
                      textShadow: `0 0 4px ${primaryColor}`,
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                {project.technologies.map((tech) => {
                  const TechIcon = technologyIconMap[tech];
                  if (!TechIcon) return null;
                  return (
                    <Box
                      key={tech}
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: alpha(primaryColor, 0.1),
                        borderRadius: '14px',
                        p: 1.2,
                        border: `1px solid ${alpha(primaryColor, 0.3)}`,
                        boxShadow: `0 4px 12px ${alpha(primaryColor, 0.2)}`,
                      }}
                    >
                      <TechIcon
                        size={28}
                        style={{
                          color: primaryColor,
                          filter: `drop-shadow(0 0 6px ${primaryColor})`,
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>

              {project.achievements && project.achievements.length > 0 && (
                <motion.div
                  variants={achievementsContainer}
                  initial="hidden"
                  animate={hovered ? 'show' : 'hidden'}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                      color: primaryColor,
                      textAlign: 'center',
                      textShadow: `0 0 4px ${primaryColor}`,
                      mb: 1,
                    }}
                  >
                    Key Achievements
                  </Typography>
                  <motion.ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    {project.achievements.map((achievement, idx) => (
                      <motion.li key={idx} variants={achievementItem}>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            color: '#fff',
                            textShadow: `0 0 4px ${primaryColor}`,
                          }}
                        >
                          {achievement}
                        </Typography>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;