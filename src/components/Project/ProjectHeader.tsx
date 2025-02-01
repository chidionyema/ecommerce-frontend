// components/Project/ProjectHeader.tsx
'use client';
import { Typography, Box, SvgIcon } from '@mui/material';
import { motion } from 'framer-motion';
import { Project } from '../../types/project';
import { GradientText } from '../Theme/GlassCard';

export const ProjectHeader = ({ project }: { project: Project }) => {
  return (
    <Box sx={{ textAlign: 'center', p: 6 }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <SvgIcon
          component={project.icon}
          sx={{ 
            fontSize: '4rem', 
            color: 'primary.main', 
            mb: 2 
          }}
        />
      </motion.div>
      <GradientText variant="h1">{project.name}</GradientText>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {project.description}
      </Typography>
    </Box>
  );
};