'use client';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { motion } from 'framer-motion';
import { GlassCard } from '../Theme/GlassCard';
import { ApproachStep } from '../../types/project';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const CustomTimelineDot = ({ index }: { index: number }) => {
  const theme = useTheme();
  return (
    <TimelineDot
      sx={{
        bgcolor: 'transparent',
        border: `2px solid ${theme.palette.secondary.main}`,
        width: 48,
        height: 48,
        fontSize: '1rem',
        fontWeight: 'bold',
      }}
    >
      {index + 1}
    </TimelineDot>
  );
};

export const ApproachTimeline = ({ steps }: { steps: ApproachStep[] }) => {
  return (
    <Timeline sx={{ my: 4, position: 'relative' }}>
      {steps.map((step, index) => (
        <TimelineStep key={index} step={step} index={index} totalSteps={steps.length} />
      ))}
    </Timeline>
  );
};

const TimelineStep = ({
  step,
  index,
  totalSteps,
}: {
  step: ApproachStep;
  index: number;
  totalSteps: number;
}) => {
  const theme = useTheme();

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <TimelineItem>
        <TimelineSeparator>
          <CustomTimelineDot index={index} />
          {index < totalSteps - 1 && (
            <TimelineConnector
              sx={{
                bgcolor: theme.palette.secondary.main,
                height: 50,
                width: 2,
                ml: 'auto',
              }}
            />
          )}
        </TimelineSeparator>
        <TimelineContent>
          <GlassCard
            sx={{
              p: 3,
              mb: 3,
              border: `1px solid ${theme.palette.divider}`,
              backdropFilter: 'blur(4px)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-4px)' },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              {step.title}
            </Typography>
            <Typography variant="body2">{step.description}</Typography>
          </GlassCard>
        </TimelineContent>
      </TimelineItem>
    </motion.div>
  );
};
