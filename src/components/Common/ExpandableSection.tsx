// components/Theme/GlassCard.tsx
'use client';
import * as React from 'react';
import { styled, Typography, TypographyProps } from '@mui/material';

interface GradientTextProps extends TypographyProps {
  variant?: React.ComponentProps<typeof Typography>['variant'];
}

export const GradientText = styled(Typography)<GradientTextProps>(
  ({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 70%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  })
);

// Other exports like GlassCard...

// components/Common/ExpandableSection.tsx
'use client';
import { useState } from 'react';
import { IconButton, Collapse, Box, useTheme } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GradientText } from '../Theme/GlassCard';
import { GlassCard } from '../Theme/GlassCard';

export const ExpandableSection = ({ 
  title, 
  children, 
  defaultExpanded = false 
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
        <GradientText variant="h4" component="div" sx={{ mb: 2 }}> {/* Now you can use variant */}
          {title}
        </GradientText>
        <IconButton sx={{ color: theme.palette.secondary.main }}>
          {expanded? <ExpandLess />: <ExpandMore />}
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