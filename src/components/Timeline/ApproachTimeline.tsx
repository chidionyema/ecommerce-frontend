// components/Timeline/ApproachTimeline.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { GlassCard } from '../Theme/GlassCard';
import { ApproachStep } from '../../types/project';

export const ApproachTimeline = ({ steps }: { steps: ApproachStep[] }) => {
  return (
    <Box sx={{ 
      width: '100%',
      overflowX: 'auto',
      py: 2,
      mx: -2,
      px: 2
    }}>
      <Box sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        minWidth: steps.length * 250 + 'px',
        gap: 2
      }}>
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Box sx={{
              flexBasis: 250,
              flexShrink: 0,
              flexGrow: 1,
              px: 1
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
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </Box>
              </Box>

              {/* Step Card */}
              <GlassCard sx={{
                p: 3,
                minHeight: 180,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2">
                  {step.description}
                </Typography>
              </GlassCard>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};