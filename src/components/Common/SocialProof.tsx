'use client';
import { Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useRecentEngagements } from '../../hooks/useRecentEngagements';
import { ProjectCardBackground } from '../../theme/themes';;
import { CheckCircle } from 'react-feather'; // Import Feather Icon

export const SocialProof = () => {
  const theme = useTheme();
  const recentEngagement = useRecentEngagements();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: 'easeInOut' }}
    >
      <ProjectCardBackground
        sx={{
          mt: 6,
          textAlign: 'center',
          py: 3,
          borderRadius: 12,
        }}
      >
        <Typography
          variant="body1"
          component="p"
          sx={{
            color: alpha(theme.palette.text.primary, 0.9),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            fontWeight: 700,
            fontSize: '1.2rem',
          }}
        >
          <CheckCircle
            size={28}
            color={theme.palette.success.light}
            strokeWidth={2}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {recentEngagement}
          </motion.span>
        </Typography>
      </ProjectCardBackground>
    </motion.div>
  );
};