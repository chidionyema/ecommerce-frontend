import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import {
  PALETTE,
  PRIMARY_DARK,
  SECONDARY_DARK,
  NEON_ACCENT,
  TECH_BLUE,
  TECH_GRADIENT,
  GLOW_EFFECT,
  STANDARD_BORDER,
  BACKDROP_BLUR,
  BORDER_RADIUS,
  typography,
  fontLoader,
  microShine,
  gradientShift,
} from "./palette";

// Define custom transitions
interface CustomTransitions {
  spring: {
    type: "spring";
    stiffness: number;
    damping: number;
    mass: number;
  };
  quick: {
    duration: number;
    ease: string;
  };
}

// Extend Material-UI theme with custom transitions
declare module "@mui/material/styles" {
  interface Theme {
    customTransitions: CustomTransitions;
  }
  interface ThemeOptions {
    customTransitions?: CustomTransitions;
  }
}

// Define baseThemeOptions as ThemeOptions
const baseThemeOptions: ThemeOptions = {
  typography,
  shape: {
    borderRadius: Number(BORDER_RADIUS.replace("px", "")),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "@font-face": fontLoader,
        },
        body: {
          transition: "background 0.3s ease, color 0.3s ease",
        },
        ".cyber-button": {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: GLOW_EFFECT,
          },
        },
        "@keyframes microShine": microShine,
        "@keyframes gradientShift": gradientShift,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "16px",
        },
      },
    },
  },
  customTransitions: {
    spring: { type: "spring", stiffness: 300, damping: 20, mass: 0.5 },
    quick: { duration: 0.3, ease: "easeInOut" },
  },
};

// Create baseTheme from baseThemeOptions
const baseTheme = createTheme(baseThemeOptions);

// Dark Theme using baseThemeOptions
export const darkTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions, // Spread ThemeOptions instead of Theme instance
    palette: {
      mode: "dark",
      primary: {
        main: PALETTE.deepBlue,
        contrastText: PALETTE.white,
      },
      secondary: {
        main: PALETTE.electric,
        contrastText: PALETTE.white,
      },
      error: {
        main: PALETTE.errorRed,
      },
      background: {
        default: PRIMARY_DARK,
        paper: alpha(PRIMARY_DARK, 0.9),
      },
      text: {
        primary: PALETTE.white,
        secondary: alpha(NEON_ACCENT, 0.8),
      },
    },
  })
);

// Light Theme using baseThemeOptions
export const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "light",
      primary: {
        main: PALETTE.lightGray,
        contrastText: PALETTE.offBlack,
      },
      secondary: {
        main: PALETTE.skyGlow,
        contrastText: PALETTE.offBlack,
      },
      error: {
        main: PALETTE.errorRed,
      },
      background: {
        default: PALETTE.white,
        paper: PALETTE.lightGray,
      },
      text: {
        primary: PALETTE.offBlack,
        secondary: PALETTE.slate,
      },
    },
  })
);

// Tech Blue Theme using baseThemeOptions
export const techTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "dark",
      primary: {
        main: TECH_BLUE,
        contrastText: PALETTE.white,
      },
      secondary: {
        main: PALETTE.neonAqua,
        contrastText: PALETTE.offBlack,
      },
      background: {
        default: PALETTE.deepBlue,
        paper: alpha(TECH_BLUE, 0.9),
      },
      text: {
        primary: PALETTE.white,
        secondary: alpha(PALETTE.neonAqua, 0.8),
      },
    },
  })
);
