import React from 'react';
import { Box, Typography, Skeleton, Badge, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { TouchApp, Star } from '@mui/icons-material';
import GoldCard from '../../../components/GoldCard';

interface ProjectCardHeaderProps {
  project: any;
  brandColor: string;
  imageLoaded: boolean;
  hovering: boolean;
}

export const ProjectCardHeader: React.FC<ProjectCardHeaderProps> = ({
  project,
  brandColor,
  imageLoaded,
  hovering,
}) => {
  return (
    <Box
      sx={{
        height: '40%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Show skeleton while loading */}
      {!imageLoaded ? (
        <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
      ) : (
        <Box
          component={motion.img}
          initial={{ scale: 1.1, filter: 'blur(10px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          src={project.imageUrl || '/images/placeholder.jpg'}
          alt={project.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            filter: hovering ? 'contrast(1.1) brightness(1.05)' : 'contrast(1.05) brightness(0.95)',
          }}
        />
      )}

      {/* Overlay for client info */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
        <Typography variant="body1" fontWeight={800} sx={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
          {project.clientName}
        </Typography>
      </Box>

      {/* Featured Badge */}
      {project.featured && (
        <Box
          component={motion.div}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: `linear-gradient(135deg, rgba(255,215,0,0.95), rgba(255,180,0,0.95))`,
            color: '#000',
            borderRadius: '30px',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
          }}
        >
          <Star sx={{ fontSize: '1.2rem' }} />
          <Typography variant="caption" fontWeight={800}>
            Featured Project
          </Typography>
        </Box>
      )}
    </Box>
  );
};
