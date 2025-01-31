import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const PALETTE = {
  // Base Hues
  deepBlue: "#03045e",
  midnight: "#023e8a",
  electric: "#0077b6",
  skyGlow: "#00b4d8",
  neonAqua: "#90e0ef",

  // Functional Shades
  offBlack: "#111827",
  slate: "#374151",
  lightGray: "#f0f0f0",
  white: "#ffffff",

  // Accent Colors
  cyberPurple: "#6C63FF",
  neonGreen: "#50fa7b",
  errorRed: "#ef476f",
  techBlue: "#0088cc",
} as const;

// Theme Constants
export const PRIMARY_DARK = "#1B1B1B";
export const SECONDARY_DARK = "#2A2A2A";
export const NEON_ACCENT = PALETTE.neonGreen;
export const TECH_BLUE = PALETTE.techBlue;
export const LIGHT_ACCENT = "#E0E0E0";
export const PAGE_BG = "#111";

// Effects
export const HOLO_GRADIENT = `linear-gradient(135deg, ${alpha(
  PALETTE.neonAqua,
  0.3
)} 0%, ${alpha(PALETTE.electric, 0.3)} 50%, ${alpha(
  PALETTE.cyberPurple,
  0.3
)} 100%)`;

export const TECH_GRADIENT = `linear-gradient(135deg, ${PALETTE.electric} 0%, ${PALETTE.neonAqua} 100%)`;
export const GLOW_EFFECT = `0 0 20px ${alpha(PALETTE.cyberPurple, 0.4)}`;
export const STANDARD_BORDER = `1px solid ${alpha(PALETTE.white, 0.1)}`;
export const BACKDROP_BLUR = "blur(16px)";
export const BORDER_RADIUS = "16px";

// Animations
export const microShine = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Typography
export const typography: TypographyOptions = {
  fontFamily:
    '"InterVariable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  htmlFontSize: 16,
  h1: {
    fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontSize: "clamp(2rem, 5vw + 1rem, 3rem)",
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },
  h3: {
    fontSize: "clamp(1.75rem, 4vw + 1rem, 2.5rem)",
    fontWeight: 600,
    lineHeight: 1.3,
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.43,
  },
};

export const fontLoader = `
  @font-face {
    font-family: 'InterVariable';
    src: url('/fonts/Inter-VariableFont_slnt,wght.ttf') format('truetype supports variations'),
         url('/fonts/Inter-VariableFont_slnt,wght.ttf') format('truetype-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
`;

