// SocialProof.tsx
import { Typography, useTheme, alpha, Box } from "@mui/material";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";
import { useRecentEngagements } from "./useRecentEngagements";

export const SocialProof = () => {
  const theme = useTheme();
  const recentEngagement = useRecentEngagements();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, type: 'spring' }}
      style={{ marginTop: theme.spacing(6) }}
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
          fontWeight: 500,
        }}
      >
        <CheckCircleOutline 
          sx={{ 
            color: theme.palette.success.light,
            fontSize: '1.2rem',
            filter: `drop-shadow(0 2px 4px ${alpha(theme.palette.success.dark, 0.2)})`
          }} 
          aria-hidden="true"
        />
        <span>{recentEngagement}</span>
      </Typography>
    </motion.div>
  );
};