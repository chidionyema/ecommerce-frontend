// Resources.tsx
'use client';

import { Box, Typography, Grid, Button, Container, useTheme, useMediaQuery, alpha } from "@mui/material";
import { motion } from "framer-motion";
import NextLink from "next/link";
import SEO from "../components/SEO";
import BaseCard from "../components/BaseCard";
import { Cloud, VpnKey, Code } from "@mui/icons-material";

const resources = [
  {
    id: 1,
    title: "Mastering Cloud Computing",
    summary:
      "Comprehensive guide to cloud infrastructure and deployment strategies.",
    path: "/resources/cloud-computing",
    icon: Cloud,
  },
  {
    id: 2,
    title: "Secrets Management with Vault",
    summary:
      "Enterprise-grade secrets management in .NET using HashiCorp Vault.",
    path: "/resources/integrating-vault-dotnet",
    icon: VpnKey,
  },
  {
    id: 3,
    title: "Serverless Architecture Guide",
    summary:
      "Optimize cloud costs with serverless implementation best practices.",
    path: "/resources/serverless",
    icon: Code,
  },
];


const Resources = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        background: `linear-gradient(145deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        minHeight: "100vh",
        py: 12,
        px: isMdDown ? 2 : 0,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `
            repeating-linear-gradient(
              45deg,
              ${alpha(theme.palette.secondary.main, 0.02)} 0px,
              ${alpha(theme.palette.secondary.main, 0.02)} 2px,
              transparent 2px,
              transparent 8px
            )`,
          pointerEvents: "none",
        },
      }}
    >
      {/* Add proper SEO props */}
      <SEO 
        title="Technical Resources - Expert Insights"
        description="Cutting-edge technical resources on cloud architecture, DevOps, and modern software development."
        keywords="cloud computing, devops, technical resources"
      />

      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                mb: 3,
                background: theme.palette.background.paper,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.2)}`,
                fontFamily: theme.typography.fontFamily,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Explore Our Expert Guides
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                fontFamily: theme.typography.fontFamily,
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Cutting-edge insights distilled from years of enterprise-grade implementations.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6}>
          {resources.map(({ id, title, summary, path, icon: Icon }) => (
            <Grid item xs={12} md={4} key={id}>
              <BaseCard
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  p: 4,
                  background: `linear-gradient(145deg, ${alpha(
                    theme.palette.primary.dark,
                    0.96
                  )}, ${alpha(theme.palette.secondary.dark, 0.96)})`,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.dark, 0.5)}`,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `
                      0 16px 32px ${alpha(theme.palette.secondary.main, 0.2)},
                      inset 0 0 24px ${alpha(theme.palette.secondary.main, 0.05)}
                    `,
                  },
                }}
              >
                <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                  <Icon sx={{ fontSize: 64, color: theme.palette.secondary.main }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 70%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: theme.typography.fontFamily,
                    textAlign: "center",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mb: 4,
                    flexGrow: 1,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: "1rem",
                  }}
                >
                  {summary}
                </Typography>
                <NextLink href={path} passHref legacyBehavior>
                  <Button
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.9)}, ${alpha(theme.palette.primary.main, 0.8)})`,
                      color: theme.palette.getContrastText(theme.palette.secondary.main),
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      "&:hover": {
                        boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.3)}`,
                      },
                    }}
                  >
                    Access Resource
                  </Button>
                </NextLink>
              </BaseCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Resources;