import { motion } from "framer-motion";
import { Button, alpha, styled } from "@mui/material";

export const PersuasiveButton = styled(motion(Button))(({ theme }) => ({
  padding: "16px 32px",
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  letterSpacing: "0.8px",
  textTransform: "none",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));
