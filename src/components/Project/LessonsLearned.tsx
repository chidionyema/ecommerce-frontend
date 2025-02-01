// components/Project/LessonsLearned.tsx
'use client';
import { Typography } from '@mui/material';
import { GlassCard } from '../Theme/GlassCard';

export const LessonsLearned = ({ lesson }: { lesson?: string }) => {
  if (!lesson) return null;

  return (
    <GlassCard sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        💡 Lessons Learned
      </Typography>
      <Typography variant="body1" fontStyle="italic">
        "{lesson}"
      </Typography>
    </GlassCard>
  );
};