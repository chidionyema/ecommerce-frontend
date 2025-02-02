'use client';

import { Box, Typography, Grid, CircularProgress, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/Theme/GlassCard'; // Ensure correct import
import { Metric } from '@/src/types/project';
import { useTheme } from '@mui/material'; // ✅ Import theme hook



  export const MetricTilesContainer = ({ metrics }: { metrics: Metric[] }) => {
    const theme = useTheme(); // ✅ Define the theme variable inside the function
  
    return (
      <Grid container spacing={3}>
        {metrics.map((metric, index) => {
          const progress = metric.progressValue ?? (parseFloat(metric.value.toString()) || 0);
  
          return (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <GlassCard sx={{ p: 3 }}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box sx={{ position: 'relative' }}>
                      <CircularProgress
                        variant="determinate"
                        value={progress}
                        size={72}
                        thickness={3}
                        sx={{
                          color: index % 2 ? theme.palette.primary.main : theme.palette.secondary.main, // ✅ theme is now defined
                          transform: 'rotate(-90deg)',
                        }}
                      />
                      <Typography variant="h6" sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontWeight: 700,
                      }}>
                        {metric.value}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {metric.label}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {metric.description}
                      </Typography>
                    </Box>
                  </Stack>
                </GlassCard>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  