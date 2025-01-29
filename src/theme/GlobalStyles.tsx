import { GlobalStyles as MuiGlobalStyles } from "@mui/material";

export const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      body: {
        fontFeatureSettings: "'cv11', 'ss01', 'ss03'", // Ensure ligatures and font variations
        fontVariantLigatures: "common-ligatures",
        textRendering: "optimizeLegibility",
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        fontFamily: `"Clash Display", sans-serif`,
        fontSize: "16px",
        lineHeight: 1.6,
        letterSpacing: "-0.015em",
      },
      "h1, h2, h3": {
        fontVariationSettings: "'wght' 700, 'slnt' -5",
        letterSpacing: "-0.02em",
      },
      h1: { fontWeight: 800, fontSize: "2.5rem" },
      h2: { fontWeight: 700, fontSize: "2rem" },
      h3: { fontWeight: 600, fontSize: "1.75rem" },
      button: { textTransform: "none", fontWeight: 700 },
    }}
  />
);
