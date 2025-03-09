import { motion } from "framer-motion";
import { Typography, alpha, Box } from "@mui/material";
import { FaMicrosoft, FaGoogle, FaAws, FaJava, FaDocker } from "react-icons/fa";

export const TrustIndicators = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
    <Typography variant="subtitle1" sx={{ color: alpha("#fff", 0.85), mb: 2, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
      Trusted by global innovators
      <Box sx={{ display: "flex", gap: "2rem", "& svg": { fontSize: 32 } }}>
        <FaMicrosoft />
        <FaGoogle />
        <FaAws />
        <FaJava />
        <FaDocker />
      </Box>
    </Typography>
  </motion.div>
);
