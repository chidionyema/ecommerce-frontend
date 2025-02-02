'use client';
import { useState } from 'react';
import { IconButton, Collapse, Box, useTheme, Typography, TypographyProps } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GlassCard } from '../Theme/GlassCard';
import { styled } from '@mui/system';

// Define styled component with proper typing
const GradientText = styled(Typography)<TypographyProps>(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export const ExpandableSection = ({
  title,
  children,
  defaultExpanded = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <GlassCard sx={{ mb: 4 }}>
      <Box
        component={motion.div}
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <GradientText 
          variant="h4" 
          component="div" 
          sx={{ mb: 2 }}
        >
          {title}
        </GradientText>
        <IconButton sx={{ color: theme.palette.secondary.main }}>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Collapse>
    </GlassCard>
  );
};