'use client';

import { Box, Typography, Chip, Card, CardContent, useTheme, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';

const ProjectCard = ({ project }) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        y: -5,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ position: 'relative' }}
    >
      <Card
        component={NextLink}
        href={`/projects/${project.id}`}
        sx={{
          height: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          textDecoration: 'none',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: `0 16px 32px ${theme.palette.primary.main}40`,
            transform: 'translateY(-5px)',
            '& .overlay': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
        role="article"
        aria-label={`View details of ${project.name}`}
      >
        {/* Image Section */}
        {project.image && (
          <Box
            className="project-image"
            sx={{
              height: 200,
              background: `url(${project.image}) center/cover no-repeat`,
              transition: 'transform 0.3s ease-in-out',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />
        )}

        <CardContent>
          {/* Project Title */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
              transition: 'color 0.3s ease',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {project.name}
          </Typography>

          {/* Client Name */}
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 2,
              fontSize: '0.875rem',
            }}
          >
            {project.clientName}
          </Typography>

          {/* Technologies */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                sx={{
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              />
            ))}
          </Box>

          {/* Metrics */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              borderTop: `1px solid ${theme.palette.divider}`,
              pt: 2,
            }}
          >
            {project.metrics.map((metric, index) => (
              <Box key={index} textAlign="center">
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                  {metric.value}
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
                  {metric.label.toUpperCase()}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>

        {/* View Details Overlay - Appears on Hover */}
        <motion.div
          className="overlay"
          initial={{ opacity: 0, transform: 'translateY(10px)' }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            color: theme.palette.common.white,
            fontWeight: 700,
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
          }}
        >
          View Details
          <IconButton sx={{ color: 'white' }}>
            <ArrowRightAlt />
          </IconButton>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
