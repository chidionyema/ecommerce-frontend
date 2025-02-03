'use client';

import { Box, Typography, SvgIcon } from '@mui/material';
import { motion } from 'framer-motion';
import { Project } from '../../types/project';
import { styled } from '@mui/material/styles';

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
}));

export const ProjectHeader = ({ project }: { project: Project }) => {
  return (
    <Box sx={{ textAlign: 'center', p: 6 }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
        <SvgIcon component={project.icon} sx={{ fontSize: '4rem', color: 'primary.main', mb: 2 }} />
      </motion.div>
      <GradientText variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
        {project.name}
      </GradientText>
      <Typography variant="h5" sx={{ mt: 2, opacity: 0.85 }}>
        {project.description}
      </Typography>
    </Box>
  );
};
