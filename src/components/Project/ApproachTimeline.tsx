// components/Timeline/ApproachTimeline.tsx
'use client';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import { motion } from 'framer-motion';
import { GlassCard } from '../Theme/GlassCard';
import { ApproachStep } from '../../types/project';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const CustomTimelineDot = ({ index }: { index: number }) => {
  const theme = useTheme();
  return (
    <TimelineDot sx={{
      bgcolor: 'transparent',
      border: `2px solid ${theme.palette.secondary.main}`,
      width: 40,
      height: 40,
    }}>
      {index + 1}
    </TimelineDot>
  );
};

export const ApproachTimeline = ({ steps }: { steps: ApproachStep[] }) => {
  return (
    <Timeline sx={{ my: 4 }}>
      {steps.map((step, index) => (
        <TimelineStep key={index} step={step} index={index} totalSteps={steps.length} />
      ))}
    </Timeline>
  );
};

const TimelineStep = ({ step, index, totalSteps }: { 
  step: ApproachStep, 
  index: number, 
  totalSteps: number 
}) => {
  const theme = useTheme();
  
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <TimelineItem>
        <TimelineSeparator>
          <CustomTimelineDot index={index} />
          {index < totalSteps - 1 && (
            <TimelineConnector sx={{ 
              bgcolor: theme.palette.secondary.main,
              height: 40 
            }} />
          )}
        </TimelineSeparator>
        <TimelineContent>
          <GlassCard sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {step.title}
            </Typography>
            <Typography variant="body2">
              {step.description}
            </Typography>
          </GlassCard>
        </TimelineContent>
      </TimelineItem>
    </motion.div>
  );
};