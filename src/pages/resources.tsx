import React from "react";
import { Box, Typography, Grid, Button, Container, useTheme, useMediaQuery, alpha } from "@mui/material";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Cloud, VpnKey, Code } from "@mui/icons-material";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import SEO from "../components/SEO";
import BaseCard from "../components/BaseCard";
import { colors, COLORS, typography} from "../theme/branding"; 


// Styled card component - Brand Aligned

const LazyCard = styled(BaseCard)(({ theme }) => ({
  borderRadius: "24px",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  minHeight: 450,
  background: `
    linear-gradient(
      145deg, 
      ${alpha(COLORS.NEUTRAL_LIGHT, 0.9)}, 
      ${alpha(COLORS.NEUTRAL_LIGHT, 1)}
    )`,
  border: `1px solid ${alpha(COLORS.BRIGHT_ACCENT, 0.2)}`,
  "&:hover": {
    boxShadow: `
      0 16px 32px ${alpha(COLORS.BRIGHT_ACCENT, 0.2)},
      inset 0 0 24px ${alpha(COLORS.BRIGHT_ACCENT, 0.05)}
    `,
  },
}));

const resources = [
  {
    id: 1,
    title: "Mastering Cloud Computing",
    summary: "Comprehensive guide to cloud infrastructure and deployment strategies.",
    path: "/resources/cloud-computing",
    icon: Cloud,
  },
  {
    id: 2,
    title: "Secrets Management with Vault",
    summary: "Enterprise-grade secrets management in .NET using HashiCorp Vault.",
    path: "/resources/integrating-vault-dotnet",
    icon: VpnKey,
  },
  {
    id: 3,
    title: "Serverless Architecture Guide",
    summary: "Optimize cloud costs with serverless implementation best practices.",
    path: "/resources/serverless",
    icon: Code,
  },
];

const Resources = () => {

  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ backgroundColor: colors.PAGE_BG, py: 12, px: isMdDown ? 2 : 0 }}>
      <SEO
        title="Technical Resources - Expert Insights"
        description="Cutting-edge technical resources on cloud architecture, DevOps, and modern software development."
      />
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 3, color: colors.PRIMARY_DARK, fontFamily: typography.fontFamily }}>
              Explore Our Expert Guides
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary", fontFamily: typography.fontFamily, maxWidth: 700, mx: 'auto' }}>
              Cutting-edge insights distilled from years of enterprise-grade implementations.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {resources.map(({ id, title, summary, path, icon: Icon }) => (
            <Grid item xs={12} md={4} key={id}>
              <LazyCard sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 4 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                  <Icon sx={{ fontSize: 64, color: colors.PRIMARY_DARK }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: colors.PRIMARY_DARK, fontFamily: typography.fontFamily, textAlign: 'center' }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 4, flexGrow: 1, fontFamily: typography.fontFamily }}>
                  {summary}
                </Typography>
                <NextLink href={path} passHref legacyBehavior>
                  <Button 
                                      sx={{ 
                                        background: COLORS.GRADIENT_ACCENT,
                                        color: COLORS.NEUTRAL_LIGHT,
                                        fontWeight: 600,
                                        '&:hover': {
                                          background: `linear-gradient(135deg, ${alpha(COLORS.LIGHT_ACCENT, 0.8)}, ${alpha(COLORS.BRIGHT_ACCENT, 0.7)})`,
                                          boxShadow: `0 4px 12px ${alpha(COLORS.LIGHT_ACCENT, 0.3)}`,
                                        },
                                      }}
                  >
                    Access Resource
                  </Button>
                </NextLink>
              </LazyCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Resources;