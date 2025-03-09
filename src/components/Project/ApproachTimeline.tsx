// components/Timeline/ApproachTimeline.tsx
'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { GlassCard } from '../Theme/GlassCard';
import { ApproachStep } from '../../types/project';

export const ApproachTimeline = ({ steps }: { steps: ApproachStep[] }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      width: '100%',
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      gap: 4,
      py: 4
    }}>
      {steps.map((step, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            {/* Step Number */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2
            }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 2,
                borderColor: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                {index + 1}
              </Box>
            </Box>

            {/* Step Card */}
            <GlassCard sx={{
              p: 3,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}>
              <Typography variant="h6" sx={{ 
                mb: 1.5, 
                fontWeight: 600,
                color: theme.palette.text.primary
              }}>
                {step.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6
                }}
              >
                {step.description}
              </Typography>
            </GlassCard>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};