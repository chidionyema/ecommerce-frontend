'use client';
import { Typography, useTheme, alpha, Box } from "@mui/material";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";
import { useRecentEngagements } from "../../hooks/useRecentEngagements";

export const SocialProof = () => {
  const theme = useTheme();
  const recentEngagement = useRecentEngagements();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, type: 'spring' }}
      style={{ 
        marginTop: theme.spacing(6),
        textAlign: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)}, ${alpha(theme.palette.secondary.dark, 0.95)})`,
        padding: theme.spacing(3),
        borderRadius: '12px',
        boxShadow: `0px 10px 30px ${alpha(theme.palette.primary.light, 0.3)}`,
        color: 'white',
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
          fontWeight: 500,
        }}
      >
        <CheckCircleOutline 
          sx={{ 
            color: 'success.light',
            fontSize: '1.5rem',
          }} 
          aria-hidden="true"
        />
        <span>{recentEngagement}</span>
      </Typography>
    </motion.div>
  );
};
