"use client";
import React, { useRef, useState, useMemo } from "react";
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
  Calendar, // Keep if used elsewhere, otherwise can be removed if only for Calendly button icon
  Download,
  ChevronRight
} from "lucide-react";
import { getSharedStyles, ANIMATIONS } from "../../utils/designSystem"; // Assuming this path is correct
import TechCard from "../Common/TechCard"; // Assuming this path is correct
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Calendly to improve initial load time
const CalendlyBooking = dynamic(() => import("../CalendlyBooking"), { // Assuming this path is correct
  ssr: false,
  loading: () => (
    <Box sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bgcolor: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <Typography color="white">Loading scheduling tool...</Typography>
    </Box>
  )
});

// Enhanced benefit-oriented reasons with refined styling
const reasons = [
  {
    id: 1,
    text: "Deep Enterprise Expertise",
    description:
      "Benefit from insights of seasoned consultants with experience at ASOS, Tesco, and Philip Morris. Our team brings practical knowledge from scaling systems for millions of users.",
    icon: <Lightbulb strokeWidth={1.5} size={18} color="#FF5722" />,
    color: "#FF5722"
  },
  {
    id: 2,
    text: "Tailored, Battle-Tested Solutions",
    description:
      "Receive custom-crafted strategies and proven solutions designed specifically for your unique challenges. We apply patterns that work in enterprise environments.",
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
      "Deploy future-proof solutions architected for scalability as your business expands. We design systems that grow from thousands to millions of users without requiring rewrites.",
    icon: <TrendingUp strokeWidth={1.5} size={18} color="#E91E63" />,
    color: "#E91E63"
  }
];

// Resources for CTA
const resources = [
  { title: "Microservices Architecture at Scale", icon: Video, color: "#2196F3" },
  { title: "Cloud Migration Patterns", icon: FileText, color: "#4CAF50" },
  { title: "OAuth 2.0 Implementation Guide", icon: FileText, color: "#FF5722" },
  { title: "Performance Optimization Techniques", icon: FileText, color: "#9C27B0" }
];

interface ResourceItemProps {
  title: string;
  Icon: React.ComponentType<{ size?: number | string, color?: string }>;
  color: string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ title, Icon, color }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          backgroundColor: alpha(color, 0.9),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "0.6rem",
          mt: 0.25,
          flexShrink: 0,
          boxShadow: `0 2px 4px ${alpha(color, 0.3)}`
        }}
      >
        <Icon size={10} color="white" />
      </Box>
      <Typography
        color={theme.palette.text.primary}
        sx={{
          fontSize: "0.85rem",
          letterSpacing: "0.01em",
          lineHeight: 1.4,
          fontWeight: 500
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

const WhyChooseUs: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme); // Assuming getSharedStyles is correctly defined
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Purple color for the consultation button
  const purpleColor = "#673AB7";

  // Custom animations with refined physics
  const refinedAnimations = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.05,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    },
    card: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      },
      hover: {
        y: -6,
        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 20
        }
      }
    }
  }), []);

  // Define your Calendly event link part
  const calendlyEventLinkPart = "glustack/consultation";

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        position: "relative",
        py: { xs: 8, md: 10 },
        background: "linear-gradient(180deg, #18407F 0%, #1A438A 100%)",
        overflow: "hidden"
      }}
    >
      {/* Subtle background pattern for depth */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.035,
          backgroundImage: "url('/images/grid-pattern.svg')", // Ensure this path is correct
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{
        ...styles.contentContainer,
        position: "relative",
        zIndex: 1
      }}>
        <motion.div
          variants={refinedAnimations.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header with refined typography */}
          <Box sx={{ mb: { xs: 5, md: 6 }, textAlign: "center" }}>
            <motion.div variants={refinedAnimations.item}>
              <Typography
                variant="h2"
                sx={{
                  ...styles.sectionTitle,
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                  fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
                  mb: 1.5
                }}
              >
                Why Partner with{" "}
                <Box component="span" sx={{
                  background: "linear-gradient(135deg, #673AB7, #3F51B5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "#673AB7", // Fallback color
                }}>
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
                  maxWidth: "700px",
                  fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                  mx: "auto"
                }}
              >
                We bring <Box component="span" sx={{ fontWeight: 600 }}>enterprise-grade expertise</Box> and solutions to
                growing businesses
              </Typography>
            </motion.div>
          </Box>

          {/* Benefit cards with improved layout and hover states */}
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
            {reasons.map((reason, index) => (
              <Grid item key={reason.id} xs={12} sm={6} md={3} sx={{ display: "flex" }}>
                <motion.div
                  variants={refinedAnimations.card}
                  whileHover="hover"
                  style={{ width: "100%", height: "100%" }}
                  // initial="hidden" // Already handled by parent container stagger
                  // animate="visible"
                  transition={{ delay: index * 0.08 }} // This is fine for item-specific delays if parent staggers
                >
                  <TechCard
                    icon={reason.icon}
                    title={reason.text}
                    accentColor={reason.color}
                    importance="primary" // Ensure TechCard handles this prop
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      background: `linear-gradient(145deg, ${alpha("#1a56db", 0.1)}, ${alpha("#1a56db", 0.05)})`,
                      border: `1px solid ${alpha("#4285f4", 0.12)}`,
                      boxShadow: `0 8px 24px ${alpha("#000", 0.07)}`,
                      borderRadius: "16px",
                      transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 28px ${alpha("#000", 0.12)}`
                      }
                    }}
                  >
                    <Typography
                      variant="body2"
                      color={alpha("#fff", 0.9)}
                      sx={{
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        letterSpacing: "0.01em",
                        textAlign: "center",
                        fontWeight: 400,
                        mt: 1
                      }}
                    >
                      {reason.description}
                    </Typography>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Refined CTA section with elegant styling */}
          <motion.div variants={refinedAnimations.item}>
            <Paper
              elevation={0}
              sx={{
                ...styles.ctaCard, // Ensure this style is defined in getSharedStyles
                mt: { xs: 2, md: 4 },
                mb: 2,
                borderRadius: "16px",
                background: `linear-gradient(145deg, ${alpha(
                  theme.palette.background.paper, // Ensure theme.palette.background.paper is appropriate
                  0.97
                )}, ${alpha(theme.palette.background.paper, 0.87)})`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 10px 30px ${alpha("#000", 0.08)}`,
                maxWidth: "900px",
                mx: "auto",
                p: 0,
                overflow: "hidden",
                border: `1px solid ${alpha(theme.palette.divider, 0.05)}`
              }}
            >
              {/* Header with subtle gradient background */}
              <Box
                sx={{
                  p: 3,
                  background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(purpleColor, 0.05)})`,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  fontWeight={600}
                  align="center"
                  color={theme.palette.primary.main}
                  sx={{ letterSpacing: "-0.01em", fontSize: "1.1rem", mb: 1 }}
                >
                  Take the Next Step
                </Typography>

                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                  align="center"
                  sx={{
                    letterSpacing: "0.01em",
                    maxWidth: "75%",
                    mx: "auto",
                    fontSize: "0.85rem",
                    lineHeight: 1.6
                  }}
                >
                  Explore our resources or schedule a consultation to discover how we can
                  help your business achieve its technology goals
                </Typography>
              </Box>

              {/* Two-column layout with content */}
              <Grid container>
                {/* Left side: Resources */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    borderRight: { xs: "none", md: `1px solid ${alpha(theme.palette.divider, 0.08)}` },
                    p: 3,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 2,
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Enterprise Resources Library
                  </Typography>

                  <Grid container spacing={1.5}>
                    {resources.map((resource, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <ResourceItem
                          title={resource.title}
                          Icon={resource.icon}
                          color={resource.color}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Download size={14} />}
                    href="/resources" // Assuming this is the correct link
                    sx={{
                      mt: 2.5,
                      px: 2.5,
                      py: 0.75,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      borderRadius: 8,
                      letterSpacing: "0.01em",
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                      "&:hover": {
                        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.35)}`,
                        transform: "translateY(-2px)"
                      },
                      transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)"
                    }}
                  >
                    Access Enterprise Resources
                  </Button>
                </Grid>

                {/* Right side: Consultation CTA */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    borderTop: { xs: `1px solid ${alpha(theme.palette.divider, 0.08)}`, md: "none" },
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: { xs: "transparent", md: alpha(purpleColor, 0.03) }
                  }}
                >
                  <Box sx={{ textAlign: "center", maxWidth: "90%" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: purpleColor,
                        mb: 2,
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        letterSpacing: "0.01em",
                      }}
                    >
                      Ready to Transform Your Business?
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2.5,
                        color: theme.palette.text.secondary,
                        fontSize: "0.85rem",
                        letterSpacing: "0.01em",
                        lineHeight: 1.6,
                      }}
                    >
                      Book a no-obligation consultation with our enterprise experts and
                      discover tailored solutions for your specific technology challenges.
                    </Typography>

                    <Button
                      variant="contained"
                      endIcon={<ChevronRight size={14} />}
                      onClick={() => setIsCalendlyOpen(true)}
                      sx={{
                        px: 2.5,
                        py: 0.75,
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        borderRadius: 8,
                        letterSpacing: "0.01em",
                        bgcolor: purpleColor,
                        "&:hover": {
                          bgcolor: alpha(purpleColor, 0.9),
                          boxShadow: `0 6px 16px ${alpha(purpleColor, 0.35)}`,
                          transform: "translateY(-2px)"
                        },
                        transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
                        boxShadow: `0 4px 12px ${alpha(purpleColor, 0.25)}`
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

      {/* Calendly integration - FIXED */}
      {isCalendlyOpen && (
        <CalendlyBooking
          // Use the correct prop 'calendlyEventLink'
          calendlyEventLink={calendlyEventLinkPart}
          // Provide the event link part, not the full URL
          prefill={{
            name: "", // Consider populating with actual user data if available
            email: "" // Consider populating with actual user data if available
          }}
          isOpen={isCalendlyOpen}
          onClose={() => setIsCalendlyOpen(false)}
          // You can also add 'pageSettings' and 'utm' props here if needed,
          // similar to the HeroSection example:
          // pageSettings={{
          //   backgroundColor: 'ffffff', // Example
          //   primaryColor: '00a2ff',    // Example
          //   textColor: '4d5055'       // Example
          // }}
          // utm={{
          //   utmCampaign: 'WhyChooseUs_ConsultationCTA', // Example
          //   utmSource: 'Website',                         // Example
          //   utmMedium: 'CalendlyModalCTA'                 // Example
          // }}
        />
      )}
    </Box>
  );
};

export default WhyChooseUs;