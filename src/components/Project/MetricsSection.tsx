'use client';

import dynamic from 'next/dynamic';
import { Box, Typography, useTheme, CircularProgress, Stack } from '@mui/material';
import { motion } from 'framer-motion';

// ✅ Correct the import
const MetricTiles = dynamic(() => import('./DataVisualization'), { ssr: false });

interface Metric {
  value: number;
  label: string;
  description: string;
}

interface MetricTilesProps {
  metrics: Metric[];
}

const StyledTile = (props: any) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
        },
      }}
      {...props}
    />
  );
};

const MetricTilesContainer = ({ metrics }: MetricTilesProps) => {
  return (
    <Stack spacing={3} direction="row" justifyContent="center">
      {metrics.map((metric, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <StyledTile>
            <CircularProgress variant="determinate" value={metric.value} size={80} thickness={4} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {metric.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {metric.description}
            </Typography>
          </StyledTile>
        </motion.div>
      ))}
    </Stack>
  );
};

export default MetricTilesContainer;
