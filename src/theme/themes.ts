import { createTheme, responsiveFontSizes, styled, Theme, ThemeOptions } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import {
  PALETTE,
  typography,
  fontLoader,
  THEME_VARS,
  GRADIENTS,
} from "./palette";
import Paper, { PaperProps } from "@mui/material/Paper";

// --- Custom Theme Options ---

// Define custom transitions interface
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

// Define a custom interface for CyberAppBar theme options
interface CyberAppBarThemeOptions {
  appBarBackgroundColor: string;
  appBarBorderColor: string;
  appBarBoxShadow: string;
  appBarUnderlineColor: string;
}

// Extend Material-UI theme with custom transitions and CyberAppBar options
declare module "@mui/material/styles" {
  interface Theme {
    customTransitions: CustomTransitions;
    cyberAppBar: CyberAppBarThemeOptions;
  }
  interface ThemeOptions {
    customTransitions?: CustomTransitions;
    cyberAppBar?: Partial<CyberAppBarThemeOptions>;
  }
}

// --- Base Theme Options ---

const baseThemeOptions: ThemeOptions = {
  typography,
  shape: {
    borderRadius: Number(THEME_VARS.borderRadius.replace("px", "")),
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
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // This is handled in typography.button now
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: THEME_VARS.borderRadius,
          padding: "16px",
        },
      },
    },
  },
  customTransitions: {
    spring: { type: "spring", stiffness: 300, damping: 20, mass: 0.5 },
    quick: { duration: 0.3, ease: "easeInOut" },
  },
  // CyberAppBar theme options
  cyberAppBar: {
    appBarBackgroundColor: alpha(PALETTE.dark.primaryDark, 0.98),
    appBarBorderColor: alpha(PALETTE.dark.primary, 0.2),
    appBarBoxShadow: `0 0 24px ${alpha(PALETTE.dark.primary, 0.2)}`,
    appBarUnderlineColor: GRADIENTS.tech,
  },
};

// --- Theme Creation ---

// Create baseTheme from baseThemeOptions
const baseTheme = createTheme(baseThemeOptions);

// Dark Theme
export const darkTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "dark",
      primary: {
        main: PALETTE.dark.primary,
        contrastText: PALETTE.dark.textPrimary,
      },
      secondary: {
        main: PALETTE.dark.secondary,
        contrastText: PALETTE.dark.textPrimary,
      },
      error: {
        main: PALETTE.dark.error,
      },
      background: {
        default: PALETTE.dark.background,
        paper: PALETTE.dark.paper,
      },
      text: {
        primary: PALETTE.dark.textPrimary,
        secondary: PALETTE.dark.textSecondary,
      },
      divider: PALETTE.dark.divider,
    },
  })
);

// Light Theme
export const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "light",
      primary: {
        main: PALETTE.light.primary,
        contrastText: PALETTE.light.textPrimary,
      },
      secondary: {
        main: PALETTE.light.secondary,
        contrastText: PALETTE.light.textPrimary,
      },
      error: {
        main: PALETTE.light.error,
      },
      background: {
        default: PALETTE.light.background,
        paper: PALETTE.light.paper,
      },
      text: {
        primary: PALETTE.light.textPrimary,
        secondary: PALETTE.light.textSecondary,
      },
      divider: PALETTE.light.divider,
    },
  })
);

// Tech Blue Theme
export const techTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "dark",
      primary: {
        main: PALETTE.dark.primary,
        contrastText: PALETTE.dark.textPrimary,
      },
      secondary: {
        main: PALETTE.dark.primaryLight,
        contrastText: PALETTE.dark.textPrimary,
      },
      background: {
        default: PALETTE.dark.background,
        paper: PALETTE.dark.paper,
      },
      text: {
        primary: PALETTE.dark.textPrimary,
        secondary: PALETTE.dark.textSecondary,
      },
      divider: PALETTE.dark.divider,
    },
  })
);


export const ProjectCardBackground = styled(Paper)<PaperProps>(({ theme }) => ({
  background: `
    linear-gradient(145deg, #1F1B24 0%, #3D3A45 100%),
    radial-gradient(circle at 70% 20%, rgba(212,175,55,0.15) 0%, transparent 70%)
  `,
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`, // Use divider color from theme
  boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2)', // From your ProjectCard
  borderRadius: 16,
  padding: theme.spacing(3), // Add default padding for consistency
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Add transition for hover effect
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.25)}`, // From your ProjectCard
  },
}));


// Cyber Theme (using the cyberAppBar theme options)
export const cyberTheme = responsiveFontSizes(
  createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "dark",
      primary: {
        main: PALETTE.dark.primary,
        contrastText: PALETTE.dark.textPrimary,
      },
      secondary: {
        main: PALETTE.dark.secondary,
        contrastText: PALETTE.dark.textPrimary,
      },
      error: {
        main: PALETTE.dark.error,
      },
      background: {
        default: PALETTE.dark.background,
        paper: PALETTE.dark.paper,
      },
      text: {
        primary: PALETTE.dark.textPrimary,
        secondary: PALETTE.dark.textSecondary,
      },
      divider: PALETTE.dark.divider,
    },
  })
);