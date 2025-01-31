// components/Solutions/ProjectCard.tsx
'use client';

import { 
  memo, 
  useRef, 
  useEffect, 
  useCallback, 
  useMemo, 
  useState 
} from 'react';
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useTransform, 
  useAnimation,
  useDragControls,
  animate
} from 'framer-motion';
import { 
  Box, 
  Typography, 
  Tooltip, 
  useTheme, 
  styled, 
  alpha, 
  Chip,
  IconButton 
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { NEON_ACCENT, CYBER_GRADIENT } from '../../theme/palette';
import { CVProject } from '../../data/cvProjects';
import { Expand, Github, Link2, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: CVProject;
  index: number;
}

const NeuroGlowEffect = ({ baseColor = NEON_ACCENT }: { baseColor?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const gradient = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, 
    ${alpha(baseColor, 0.4)} 0%, 
    transparent 70%
  )`;

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        background: gradient,
        opacity,
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
};

const HolographicGrid = () => {
  const angle = useMotionValue(0);
  const grid = useMotionTemplate`repeating-linear-gradient(
    ${angle}deg,
    ${alpha(NEON_ACCENT, 0.1)} 0px,
    ${alpha(NEON_ACCENT, 0.1)} 1px,
    transparent 1px,
    transparent 20px
  )`;

  useEffect(() => {
    animate(angle, 360, {
      duration: 40,
      repeat: Infinity,
      ease: 'linear'
    });
  }, [angle]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        background: grid,
        maskImage: 'linear-gradient(to bottom, transparent 10%, black 40%, transparent 90%)',
        pointerEvents: 'none'
      }}
    />
  );
};

const ProjectCard = memo(({ project, index }: ProjectCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const controls = useDragControls();
  
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
    velocityX: useMotionValue(0),
    velocityY: useMotionValue(0)
  };

  const rotate3D = {
    x: useTransform(mouse.y, [0, 1], [-15, 15]),
    y: useTransform(mouse.x, [0, 1], [15, -15])
  };

  const shadow = useTransform(
    [mouse.x, mouse.y], 
    ([x, y]) => ` 
      ${x * 40 - 20}px ${y * 40 - 20}px 40px ${alpha(NEON_ACCENT, 0.2)},
      ${x * -30 + 15}px ${y * -30 + 15}px 30px ${alpha(theme.palette.primary.main, 0.3)}
    `
  );

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouse.x.set((e.clientX - rect.left) / rect.width);
    mouse.y.set((e.clientY - rect.top) / rect.height);
    
    mouse.velocityX.set((e.movementX / rect.width) * 100);
    mouse.velocityY.set((e.movementY / rect.height) * 100);
  }, [mouse.x, mouse.y, mouse.velocityX, mouse.velocityY]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    element.addEventListener('mousemove', updateMousePosition);
    return () => element.removeEventListener('mousemove', updateMousePosition);
  }, [updateMousePosition]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDragging || (e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/projects/${project.id}`);
  };

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: 'relative',
        perspective: 1000,
        cursor: 'pointer',
        scale: isExpanded ? 1.1 : 1
      }}
      onClick={handleCardClick}
      drag={!isExpanded}
      dragControls={controls}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        setTimeout(() => setIsDragging(false), 100);
      }}
      whileDrag={{ cursor: 'grabbing' }}
      whileHover={{ zIndex: 100 }}
      onDoubleClick={() => setIsExpanded(!isExpanded)}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <NeuroGlowEffect />
      <HolographicGrid />

      <motion.div
        style={{
          position: 'relative',
          borderRadius: '24px',
          width: 'clamp(320px, 90vw, 400px)',
          height: '600px',
          background: `
            linear-gradient(145deg,
              ${alpha(theme.palette.primary.main, 0.96)},
              ${alpha(theme.palette.secondary.main, 0.96)}
            )`,
          transformStyle: 'preserve-3d',
          rotateX: rotate3D.x,
          rotateY: rotate3D.y,
          boxShadow: shadow
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '24px',
            background: CYBER_GRADIENT,
            filter: 'blur(40px)',
            opacity: 0.3,
            pointerEvents: 'none'
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            padding: theme.spacing(4),
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(24px)',
            background: alpha(theme.palette.background.paper, 0.9),
            overflow: 'hidden',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 3,
            mb: 4,
            position: 'relative'
          }}>
            <motion.div 
              whileHover={{ rotate: 45, scale: 1.1 }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <project.icon
                style={{
                  fontSize: '3rem',
                  color: NEON_ACCENT,
                  filter: 'drop-shadow(0 0 12px currentColor)',
                  opacity: 0.9
                }}
              />
            </motion.div>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: '"Orbitron", sans-serif',
                background: CYBER_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.1em',
                textShadow: `0 0 20px ${alpha(NEON_ACCENT, 0.3)}`
              }}
            >
              {project.clientName}
            </Typography>
          </Box>

          <Box sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            overflowY: 'auto',
            pr: 2
          }}>
            <Typography variant="h5" component="h3" sx={{ lineHeight: 1.3 }}>
              {project.name}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {project.technologies.map((tech) => (
                <motion.div
                  key={tech}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring' }}
                >
                  <Chip
                    label={tech}
                    sx={{
                      bgcolor: alpha(theme.palette.secondary.main, 0.15),
                      '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.3) }
                    }}
                  />
                </motion.div>
              ))}
            </Box>

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 3,
              py: 3
            }}>
              {project.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <Box sx={{ 
                    p: 2,
                    border: `1px solid ${alpha(NEON_ACCENT, 0.2)}`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    background: alpha(theme.palette.background.default, 0.4)
                  }}>
                    <Typography variant="h3" sx={{ color: NEON_ACCENT }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="caption" component="p">
                      {metric.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>

            <Box sx={{ 
              mt: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}>
              {project.githubUrl && (
                <IconButton
                  onClick={handleGitHubClick}
                  sx={{ 
                    color: NEON_ACCENT,
                    '&:hover': { 
                      background: alpha(NEON_ACCENT, 0.1),
                      transform: 'scale(1.1)'
                    },
                    transition: 'transform 0.2s ease-in-out'
                  }}
                  aria-label="View source code"
                >
                  <Github size={24} />
                </IconButton>
              )}
              
              <motion.div 
                whileHover={{ x: 5 }}
                style={{ pointerEvents: 'none' }}
              >
                <ArrowRight 
                  size={28} 
                  color={NEON_ACCENT}
                  aria-label="View project details"
                />
              </motion.div>
            </Box>
          </Box>
        </Box>
      </motion.div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '32px',
            border: `2px solid ${NEON_ACCENT}`,
            filter: 'blur(30px)',
            pointerEvents: 'none',
            zIndex: -1
          }}
        />
      )}
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;