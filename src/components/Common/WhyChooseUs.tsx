"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  alpha,
  Button,
  Paper
} from "@mui/material";
import {
  Lightbulb,
  Rocket,
  ShieldCheck,
  TrendingUp,
  FileText,
  Video,
  Calendar,
  Download
} from "lucide-react";
import { getSharedStyles, ANIMATIONS } from "../../utils/designSystem";
import TechCard from "../Common/TechCard";
import { motion, useInView } from "framer-motion";
import { CalendlyBooking } from "../CalendlyBooking";

// Enhanced benefit-oriented reasons with refined styling
const reasons = [
  {
    id: 1,
    text: "Deep Enterprise Expertise",
    description:
      "Benefit from the insights of seasoned consultants with extensive experience at ASOS, Tesco, and Philip Morris International. Our team brings practical knowledge from scaling systems that serve millions of users.",
    icon: <Lightbulb strokeWidth={1.5} size={18} color="#FF5722" />,
    color: "#FF5722"
  },
  {
    id: 2,
    text: "Tailored, Battle-Tested Solutions",
    description:
      "Receive custom-crafted strategies and proven solutions designed specifically for your unique challenges and growth goals. We don't reinvent the wheel—we apply patterns that work in enterprise environments.",
    icon: <Rocket strokeWidth={1.5} size={18} color="#2196F3" />,
    color: "#2196F3"
  },
  {
    id: 3,
    text: "Enterprise-Grade Security",
    description:
      "Implement secure solutions with SOC 2, GDPR & ISO 27001 compliance from day one. Our security-first approach ensures your data and systems are protected at every level.",
    icon: <ShieldCheck strokeWidth={1.5} size={18} color="#4CAF50" />,
    color: "#4CAF50"
  },
  {
    id: 4,
    text: "Scalable Architecture for Growth",
    description:
      "Deploy future-proof solutions architected for scalability, supporting your business as it expands. We design systems that can grow from thousands to millions of users without requiring complete rewrites.",
    icon: <TrendingUp strokeWidth={1.5} size={18} color="#E91E63" />,
    color: "#E91E63"
  }
];

// Resources for CTA
const resources = [
  { title: "Video Walkthrough: Microservices at Scale", icon: Video },
  { title: "White Paper: Cloud Migration Patterns", icon: FileText },
  { title: "Technical Guide: OAuth 2.0 Implementation", icon: FileText },
  { title: "Case Study: Ecommerce Performance Tuning", icon: FileText }
];

interface ElegantCheckmarkItemProps {
  text: string;
  Icon?: React.ComponentType<{ size?: number | string }>;
}

const ElegantCheckmarkItem: React.FC<ElegantCheckmarkItemProps> = ({ text, Icon }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "0.7rem"
        }}
      >
        {Icon ? <Icon size={8} /> : "✓"}
      </Box>
      <Typography
        color={theme.palette.text.primary}
        sx={{ fontSize: "0.9rem", letterSpacing: "0.015em" }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const WhyChooseUs: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Purple color for the consultation button
  const purpleColor = "#673AB7";

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        position: "relative",
        py: 10,
        background: "linear-gradient(180deg, #18407F 0%, #1A438A 100%)",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="lg" sx={styles.contentContainer}>
        <motion.div
          variants={ANIMATIONS.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <motion.div variants={ANIMATIONS.item}>
              <Typography
                variant="h2"
                sx={{
                  ...styles.sectionTitle,
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Why Partner with{" "}
                <Box component="span" sx={styles.accentText}>
                  GLUStack
                </Box>
                ?
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  ...styles.sectionSubtitle,
                  letterSpacing: "0.01em",
                  fontWeight: 400,
                  maxWidth: "85%",
                  mx: { xs: "auto", md: 0 }
                }}
              >
                We bring <strong>enterprise-grade expertise</strong> and solutions to
                growing businesses
              </Typography>
            </motion.div>
          </Box>

          {/* Benefit cards */}
          <Grid container spacing={3} justifyContent="center">
            {reasons.map((reason) => (
              <Grid item key={reason.id} xs={12} sm={6} md={3} sx={{ display: "flex" }}>
                <motion.div
                  variants={ANIMATIONS.item}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TechCard
                    icon={reason.icon}
                    title={reason.text}
                    accentColor={reason.color}
                    importance="primary"
                    sx={{
                      background: `linear-gradient(145deg, ${alpha("#1a56db", 0.12)}, ${alpha("#1a56db", 0.05)})`,
                      border: `1px solid ${alpha("#4285f4", 0.12)}`,
                      boxShadow: `0 4px 20px ${alpha("#000", 0.05)}`
                    }}
                  >
                    <Typography
                      variant="body2"
                      color={alpha("#fff", 0.9)}
                      sx={{
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        letterSpacing: "0.01em",
                        textAlign: "center",
                        fontWeight: 400
                      }}
                    >
                      {reason.description}
                    </Typography>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Compact CTA section */}
          <motion.div variants={ANIMATIONS.item}>
            <Paper
              elevation={2}
              sx={{
                ...styles.ctaCard,
                mt: { xs: 5, md: 6 },
                mb: 5, // Added bottom margin
                borderRadius: "14px",
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(
                  theme.palette.background.paper,
                  0.85
                )})`,
                backdropFilter: "blur(8px)",
                boxShadow: `0 8px 24px ${alpha("#000", 0.06)}`,
                maxWidth: "900px",
                mx: "auto",
                py: 2.5, // Reduced padding
                px: { xs: 2, md: 3 }
              }}
            >
              <Typography
                variant="h6" // Downgraded from h5
                component="h3"
                fontWeight={600}
                mb={0.75} // Reduced margin
                align="center"
                color={theme.palette.primary.main}
                sx={{ letterSpacing: "-0.01em", fontSize: "1.1rem" }}
              >
                Take the Next Step
              </Typography>

              <Typography
                variant="body2" // Downgraded
                color={theme.palette.text.secondary}
                mb={1.5} // Reduced margin
                align="center"
                sx={{ letterSpacing: "0.01em", maxWidth: "75%", mx: "auto", fontSize: "0.85rem" }}
              >
                Explore our resources or schedule a consultation to discover how we can
                help your business
              </Typography>

              <Grid container spacing={2}>
                {/* Left side: Resources */}
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    borderRight: { xs: "none", md: `1px solid ${alpha(theme.palette.divider, 0.08)}` },
                    pb: { xs: 1.5, md: 0 }
                  }}
                >
                  <Typography
                    variant="subtitle2" // Downgraded from h6
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 0.75, // Reduced margin
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "0.01em"
                    }}
                  >
                    Enterprise Resources Library
                  </Typography>

                  {/* More compact resource layout */}
                  <Box sx={{ mb: 1.5 }}>
                    {resources.map((resource, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 0.75, mb: 0.5 }}>
                        <Box
                          sx={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.primary.main,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "0.6rem",
                            mt: 0.25,
                            flexShrink: 0
                          }}
                        >
                          {resource.icon ? <resource.icon size={7} /> : "✓"}
                        </Box>
                        <Typography
                          color={theme.palette.text.primary}
                          sx={{ fontSize: "0.75rem", letterSpacing: "0.01em", lineHeight: 1.3 }}
                        >
                          {resource.title}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Download size={12} />}
                    href="/resources"
                    sx={{
                      mt: 0.5,
                      px: 1.5,
                      py: 0.5,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: 6,
                      letterSpacing: "0.01em",
                      boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    Access Enterprise Resources
                  </Button>
                </Grid>

                {/* Right side: Consultation CTA */}
                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{
                    borderTop: { xs: `1px solid ${alpha(theme.palette.divider, 0.08)}`, md: "none" },
                    pt: { xs: 1.5, md: 0 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Box sx={{ textAlign: "center", maxWidth: "85%" }}>
                    <Typography
                      variant="subtitle2" // Downgraded from h6
                      sx={{
                        color: purpleColor,
                        mb: 0.75, // Reduced margin
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        letterSpacing: "0.01em"
                      }}
                    >
                      Ready to Transform Your Business?
                    </Typography>

                    <Typography
                      variant="body2" // Downgraded
                      sx={{
                        mb: 1.5, // Reduced margin
                        color: theme.palette.text.secondary,
                        fontSize: "0.8rem",
                        letterSpacing: "0.01em",
                        lineHeight: 1.3
                      }}
                    >
                      Book a no-obligation consultation with our enterprise experts and
                      discover tailored solutions for your specific challenges.
                    </Typography>

                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<Calendar size={12} />}
                      onClick={() => setIsCalendlyOpen(true)}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        borderRadius: 6,
                        letterSpacing: "0.01em",
                        bgcolor: purpleColor,
                        boxShadow: `0 2px 6px ${alpha(purpleColor, 0.25)}`,
                      }}
                    >
                      Schedule a Consultation
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>

      <CalendlyBooking
        eventTypeUrl="https://calendly.com/glustack/consultation"
        prefill={{ name: "", email: "" }}
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </Box>
  );
};

export default WhyChooseUs;