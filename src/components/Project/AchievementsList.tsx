'use client';

import { Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { GlassCard } from '../Theme/GlassCard';
import { useTheme } from '@mui/material/styles';

export const AchievementsList = ({ achievements }: { achievements?: string[] }) => {
  if (!achievements) return null;

  return (
    <Grid container spacing={4} sx={{ mt: 2 }}>
      {achievements.map((achievement, index) => (
        <AchievementItem key={index} achievement={achievement} />
      ))}
    </Grid>
  );
};

const AchievementItem = ({ achievement }: { achievement: string }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6}>
      <motion.div
        whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
        whileTap={{ scale: 0.98 }}
      >
        <GlassCard
          sx={{
            p: 3,
            height: '100%',
            border: `2px solid ${theme.palette.secondary.main}`,
            boxShadow: 3,
            transition: 'all 0.3s ease-in-out',
            '&:hover': { boxShadow: 8 },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Sparkles style={{ color: theme.palette.secondary.main, fontSize: '1.8rem' }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {achievement}
            </Typography>
          </Stack>
        </GlassCard>
      </motion.div>
    </Grid>
  );
};
