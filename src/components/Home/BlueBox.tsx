"use client";
import React, { ReactNode } from "react";
import { Box, Typography, Grid, Button, Paper, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { ANIMATIONS } from "../../utils/designSystem";

interface BlueBoxProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: number | string;
}

/**
 * BlueBox component - A reusable blue gradient box with consistent styling
 * that can be used across different sections of the application.
 */
const BlueBox: React.FC<BlueBoxProps> = ({
  title,
  subtitle,
  children,
  maxWidth = 900
}) => {
  const theme = useTheme();

  return (
    <motion.div variants={ANIMATIONS.item}>
      <Paper
        elevation={2}
        sx={{
          mt: 5,
          mb: 5,
          borderRadius: "14px",
          background: `linear-gradient(145deg, ${alpha(
            theme.palette.background.paper,
            0.95
          )}, ${alpha(theme.palette.background.paper, 0.85)})`,
          backdropFilter: "blur(8px)",
          boxShadow: `0 8px 24px ${alpha("#000", 0.06)}`,
          maxWidth: maxWidth,
          mx: "auto",
          py: 3,
          px: { xs: 3, md: 4 }
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          fontWeight={600}
          mb={1}
          align="center"
          color={theme.palette.primary.main}
          sx={{ letterSpacing: "-0.01em", fontSize: "1.1rem" }}
        >
          {title}
        </Typography>
        
        {subtitle && (
          <Typography
            variant="body2"
            color={theme.palette.text.secondary}
            mb={2}
            align="center"
            sx={{ letterSpacing: "0.01em", maxWidth: "75%", mx: "auto", fontSize: "0.85rem" }}
          >
            {subtitle}
          </Typography>
        )}

        {children}
      </Paper>
    </motion.div>
  );
};

export default BlueBox;