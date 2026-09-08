'use client';
import { useState } from 'react';
import {
  IconButton,
  Collapse,
  Box,
  useTheme,
  Typography,
  TypographyProps,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { ProjectCardBackground } from '../../theme/themes';;
import { ChevronDown } from 'react-feather';

const GradientText = styled(Typography)<TypographyProps>(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 900,
  fontSize: '1.35rem',
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
    <ProjectCardBackground sx={{ mb: 4 }}>
      <Box
        component={motion.div}
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
          px: 2,
          py: 1,
        }}
      >
        <GradientText variant="h4" component="div">
          {title}
        </GradientText>
        <IconButton
          component={motion.button}
          whileTap={{ scale: 0.9 }}
          sx={{
            color: theme.palette.secondary.main,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'rotate(90deg)',
              color: theme.palette.primary.main,
            },
          }}
        >
          {expanded ? (
            <ChevronDown
              size={28}
              color={theme.palette.secondary.main}
              strokeWidth={2}
            />
          ) : (
            <ChevronDown
              size={28}
              color={theme.palette.secondary.main}
              strokeWidth={2}
            />
          )}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Box sx={{ px: 4, py: 2 }}>{children}</Box>
        </motion.div>
      </Collapse>
    </ProjectCardBackground>
  );
};