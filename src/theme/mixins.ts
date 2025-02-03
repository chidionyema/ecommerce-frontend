import { alpha } from "@mui/material";
import { PALETTE } from "./palette";

// theme/mixins.ts
export const cyberGlass = (intensity: number) => ({
    backgroundColor: alpha(PALETTE.dark.primary, intensity),
    backdropFilter: 'blur(8px)',
    border: `1px solid ${alpha(PALETTE.dark.secondary, 0.1)}`,
  });