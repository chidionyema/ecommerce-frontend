import { styled, alpha, Box } from "@mui/material";
import { motion } from "framer-motion";
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  BACKDROP_BLUR,
  TITLE_GRADIENT,
} from "../theme/palette";

const BaseCard = styled(motion(Box))(({ theme }) => ({
  position: "relative",
  borderRadius: 24,
  overflow: "hidden",
  cursor: "pointer",
  background: `
    linear-gradient(145deg, 
      ${alpha(theme.palette.background.paper, 0.8)}, 
      ${alpha(theme.palette.background.default, 0.9)}
    )`,
  boxShadow: `0 32px 64px -12px ${alpha(PRIMARY_DARK, 0.2)}`,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  // Apply padding here
  padding: theme.spacing(4), // Adjust the value (4) as needed
  height: "100%",
  backdropFilter: BACKDROP_BLUR,

  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 40px 80px -24px ${alpha(SECONDARY_DARK, 0.2)}`,
    borderColor: TITLE_GRADIENT, // Customize or remove as needed
  },
}));

export default BaseCard;