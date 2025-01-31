import { Typography, useTheme, alpha } from "@mui/material";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";
import { useRecentEngagements } from "./useRecentEngagements";

export const SocialProof = () => {
  const theme = useTheme();
  const recentEngagement = useRecentEngagements();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: "3rem" }}>
      <Typography variant="body2" sx={{ color: alpha("#fff", 0.8), fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
        <CheckCircleOutline sx={{ fontSize: 16, color: theme.palette.success.light }} />
        {recentEngagement}
      </Typography>
    </motion.div>
  );
};
