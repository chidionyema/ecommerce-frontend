'use client';

import { Typography } from '@mui/material';
import { GlassCard } from '../Theme/GlassCard';

export const LessonsLearned = ({ lesson }: { lesson?: string }) => {
  if (!lesson) return null;

  return (
    <GlassCard
      sx={{
        mt: 4,
        p: 3,
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'box-shadow 0.3s ease',
        '&:hover': { boxShadow: 8 },
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        💡 Lessons Learned
      </Typography>
      <Typography variant="body1" fontStyle="italic" sx={{ fontSize: '1rem' }}>
        "{lesson}"
      </Typography>
    </GlassCard>
  );
};
