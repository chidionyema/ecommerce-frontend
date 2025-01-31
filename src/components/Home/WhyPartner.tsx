import { Box, Container, Grid, Typography, useTheme, alpha } from "@mui/material";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";
import { PRIMARY_DARK, SECONDARY_DARK } from "../../theme/palette";
import { useMemo } from "react";

export const WhyPartner = () => {
  const theme = useTheme();

  const reasonsToPartner = useMemo(
    () => [
      "Military-grade Security & Compliance",
      "24/7 Production Support (99.99% Uptime)",
      "Full Development Lifecycle Management",
      "Scalable Cloud Architectures",
      "AI-Driven Analytics & Optimization",
      "Cross-Platform Integration Expertise",
    ],
   
  );

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(
          PRIMARY_DARK,
          0.98
        )}, ${alpha(SECONDARY_DARK, 0.95)})`,
        color: "white",
        py: 10,
        position: "relative", // Add relative positioning for the pseudo-element
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.02) 0px,
            rgba(255, 255, 255, 0.02) 2px,
            transparent 2px,
            transparent 8px
          )`,
          pointerEvents: "none",
          zIndex: -1, // Ensure the pseudo-element is behind the content
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 800 }}>
                Why Choose Us
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Combining enterprise robustness with agile innovation for
                digital excellence.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            {reasonsToPartner.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircleOutline
                    sx={{ mr: 2, color: theme.palette.success.main }}
                  />
                  <Typography variant="body1">{reason}</Typography>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};