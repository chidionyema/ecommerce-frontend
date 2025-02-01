// components/Achievements/AchievementsList.tsx
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
      <motion.div whileHover={{ scale: 1.02 }}>
        <GlassCard sx={{ p: 3, height: '100%' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Sparkles style={{ color: theme.palette.secondary.main }} />
            <Typography variant="body1">
              {achievement}
            </Typography>
          </Stack>
        </GlassCard>
      </motion.div>
    </Grid>
  );
};