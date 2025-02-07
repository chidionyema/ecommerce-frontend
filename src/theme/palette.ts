import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

// --- Color Palette ---
export const PALETTE = {
  // Dark Theme
  dark: {
    primary: "#0077b6", // Electric blue
    primaryDark: "#03045e", // Deep blue (for dark backgrounds)
    primaryLight: "#90e0ef", // Neon aqua (for lighter accents)
    secondary: "#6C63FF", // Cyber purple
    accent: "#50fa7b", // Neon green
    error: "#ef476f", // Error red
    textPrimary: "#ffffff", // Pure white
    textSecondary: "#a0aec0", // Light gray
    background: "#023e8a", // Midnight (dark background)
    paper: "#03045e", // Deep blue (for elevated surfaces)
    divider: "#111827",
  },
  // Light Theme
  light: {
    primary: "#4a90e2", // Soft blue
    primaryDark: "#f0f0f0", // Light gray (for backgrounds)
    primaryLight: "#e0f2f1", // Sky glow (for accents)
    secondary: "#6C63FF", // Cyber purple
    accent: "#00bfa5", // Teal
    error: "#d32f2f", // Darker red
    textPrimary: "#212121", // Almost black
    textSecondary: "#757575", // Medium gray
    background: "#ffffff", // Pure white
    paper: "#f5f5f5", // Light gray (for elevated surfaces)
    divider: "#bdbdbd",
  },
  professional: {
    primary: "#283e51", // Example: Darker, more professional primary
    secondary: "#673ab7", // Example: A more muted secondary
    accent: "#00acc1", // Example: A subtle accent color
    textPrimary: "#37474f", // Darker text for light backgrounds
    textSecondary: "#78909c", // Slightly lighter secondary text
    background: "#ffffff", // Clean white background
    paper: "#f5f5f5", // Light gray for paper elements
    error: "#b00020",
  },
  // Common Colors
  common: {
    black: "#000000",
    white: "#ffffff",
    grey: "#bdbdbd", // Example using grey
  },
};

// --- Typography ---
export const typography: TypographyOptions = {
  fontFamily: "'Orbitron', 'IBM Plex Sans', Arial, sans-serif",
  h1: {
    fontWeight: 800,
    fontSize: "3.5rem",
    lineHeight: 1.2,
    letterSpacing: "-0.05em",
  },
  h2: {
    fontWeight: 700,
    fontSize: "2.5rem",
    lineHeight: 1.3,
    letterSpacing: "-0.025em",
  },
  h3: {
    fontWeight: 600,
    fontSize: "2rem",
    lineHeight: 1.4,
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: 1.5,
  },
  h5: {
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: 1.6,
  },
  h6: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.75,
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.75,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
  },
  button: {
    fontWeight: 600,
    textTransform: "none",
    letterSpacing: "0.05em",
  },
  caption: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 600,
    lineHeight: 2.66,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
};

// --- Font Loading (Consider moving to fonts.ts) ---
export const fontLoader = [
  {
    fontFamily: "Orbitron",
    fontStyle: "normal",
    fontWeight: 400,
    src: `
      local('Orbitron-Regular'),
      url('/fonts/Orbitron-Regular.woff2') format('woff2')
    `,
  },
  {
    fontFamily: "Orbitron",
    fontStyle: "normal",
    fontWeight: 700,
    src: `
      local('Orbitron-Bold'),
      url('/fonts/Orbitron-Bold.woff2') format('woff2')
    `,
  },
  // ... add other font weights for Orbitron if needed
  {
    fontFamily: "IBM Plex Sans",
    fontStyle: "normal",
    fontWeight: 400,
    src: `
      local('IBM Plex Sans'),
      local('IBMPlexSans'),
      url('/fonts/IBMPlexSans-Regular.woff2') format('woff2'),
      url('/fonts/IBMPlexSans-Regular.woff') format('woff')
    `,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
];

// In your palette.ts
export const GRADIENTS = {
  tech: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
  cyber: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
  quantum: 'linear-gradient(135deg, #8A2BE2 0%, #00BFFF 100%)' // Add this
};

// --- Theme Variables ---
export const THEME_VARS = {
  borderRadius: "12px",
  glowEffect: `0px 2px 4px -1px ${alpha(
    PALETTE.dark.accent,
    0.4
  )}, 0px 4px 5px 0px ${alpha(
    PALETTE.dark.accent,
    0.28
  )}, 0px 1px 10px 0px ${alpha(PALETTE.dark.accent, 0.24)}`,
  standardBorder: `1px solid ${alpha(PALETTE.dark.primary, 0.2)}`,
  backdropBlur: "blur(24px)",
};


// --- Animations (Consider moving to animations.ts) ---
export const ANIMATIONS = {
  springStiff: {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  } as const,
  microShine: keyframes`
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  `,
  gradientShift: keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `,
};
export const NEON_ACCENT = '#00FF00'; // Example neon color
// --- Mixins ---
export const MIXINS = {
  cyberGlass: (intensity: number) => ({
    backgroundColor: alpha(PALETTE.dark.primaryDark, intensity),
    backdropFilter: THEME_VARS.backdropBlur,
    border: THEME_VARS.standardBorder,
  }),
  neonBorder: () => ({
    border: `2px solid ${PALETTE.dark.accent}`,
    boxShadow: THEME_VARS.glowEffect,
  }),
  holographicEffect: () => ({
    background: `linear-gradient(135deg, ${alpha(PALETTE.dark.primaryLight, 0.3)} 0%, ${alpha(PALETTE.dark.secondary, 0.3)} 100%)`,
    backdropFilter: THEME_VARS.backdropBlur,
  }),
  textGradient: (gradient: keyof typeof GRADIENTS) => ({
    background: GRADIENTS[gradient],
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }),
  cyberButton: (active: boolean) => ({
    background: active ? GRADIENTS.tech : "transparent",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: THEME_VARS.glowEffect,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
      background: alpha(PALETTE.dark.textSecondary, 0.1),
      boxShadow: "none",
    },
  }),
  loadingBar: () => ({
    height: "4px",
    background: GRADIENTS.tech,
    boxShadow: `0 0 16px ${alpha(PALETTE.dark.primaryLight, 0.5)}`,
  }),
  cyberIcon: () => ({
    filter: `drop-shadow(0 0 6px ${alpha(PALETTE.dark.accent, 0.7)})`,
    transition: "filter 0.3s ease",
  }),
  animatedUnderline: () => ({
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "2px",
      background: GRADIENTS.tech,
      transform: "scaleX(0)",
      transformOrigin: "right",
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    "&:hover::after": {
      transform: "scaleX(1)",
      transformOrigin: "left",
    },
  }),
  cyberScrollbar: () => ({
    "&::-webkit-scrollbar": {
      width: "8px",
      background: PALETTE.dark.primaryDark,
    },
    "&::-webkit-scrollbar-thumb": {
      background: GRADIENTS.tech,
      borderRadius: "4px",
    },
  }),
};