"use client";
import React, { useRef, useState, memo, useMemo } from "react";
import { Box, Container, Typography, Grid, useTheme, Button, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import {
  SiAmazonaws,
  SiMicrosoftazure,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiReact,
  SiNextdotjs,
  SiDotnet,
} from "react-icons/si";
import { ChevronRight, FileText, Download } from "lucide-react";
import { ANIMATIONS, getSharedStyles } from "../../utils/designSystem";

// Dynamic import with reduced SSR concerns
const TechCard = dynamic(() => import("../Common/TechCard"), { ssr: false });

// Tech items data
const TECH_ITEMS = [
  {
    icon: <SiAmazonaws size={42} />,
    title: "AWS Cloud",
    description:
      "Enterprise-ready infrastructure with EC2, Lambda, S3, and ECS. We've built systems that handle millions of users and petabytes of data.",
    color: "#FF9900",
    category: "Cloud",
  },
  {
    icon: <SiMicrosoftazure size={42} />,
    title: "Azure Services",
    description:
      "Comprehensive solutions with Azure DevOps, Functions, AKS, and Azure AD. Perfect for businesses with existing Microsoft ecosystems.",
    color: "#0078D4",
    category: "Cloud",
  },
  {
    icon: <SiDocker size={42} />,
    title: "Containerization",
    description:
      "Consistent, portable environments with Docker and Docker Compose. We implement best practices for security and performance.",
    color: "#2496ED",
    category: "DevOps",
  },
  {
    icon: <SiKubernetes size={42} />,
    title: "Kubernetes",
    description:
      "Production-grade container orchestration that scales from startups to enterprises. Our implementations focus on observability and resilience.",
    color: "#326CE5",
    category: "DevOps",
  },
  {
    icon: <SiTerraform size={42} />,
    title: "Infrastructure as Code",
    description:
      "Automated, version-controlled infrastructure with Terraform. We create modular, reusable components that speed up future deployments.",
    color: "#7B42BC",
    category: "DevOps",
  },
  {
    icon: <SiReact size={42} />,
    title: "React & Modern JS",
    description:
      "Component-based frontend applications built for performance and maintainability. We follow enterprise patterns for state management.",
    color: "#61DAFB",
    category: "Frontend",
  },
  {
    icon: <SiNextdotjs size={42} />,
    title: "Next.js",
    description:
      "SEO-friendly React apps with server-side rendering and static site generation. Our implementations follow the latest Next.js best practices.",
    color: "#000000",
    category: "Frontend",
  },
  {
    icon: <SiDotnet size={42} />,
    title: ".NET Core",
    description:
      "Scalable, cross-platform backend systems with C# and ASP.NET. We implement clean architecture patterns developed at enterprise scale.",
    color: "#512BD4",
    category: "Backend",
  },
];

// CTA resources data
const RESOURCE_ITEMS = [
  "Weekly technical tutorials",
  "Code snippets & templates",
  "Architecture best practices",
  "Security & performance tips",
];

// Define an interface for CategoryButton props
interface CategoryButtonProps {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

// Refined component definitions with Ive-inspired aesthetic
const CategoryButton: React.FC<CategoryButtonProps> = memo(
  ({ category, isActive, onClick }) => {
    const theme = useTheme();
    return (
      <Button
        size="small"
        onClick={onClick}
        sx={{
          py: 0.8,
          px: 1.8,
          borderRadius: 6,
          fontSize: "0.85rem",
          fontWeight: 500,
          background: isActive ? alpha(theme.palette.primary.main, 0.1) : "transparent",
          border: `1px solid ${
            isActive ? theme.palette.primary.main : alpha("#fff", 0.15)
          }`,
          color: isActive ? theme.palette.primary.main : alpha("#fff", 0.85),
          "&:hover": {
            background: isActive ? alpha(theme.palette.primary.main, 0.15) : alpha("#fff", 0.04),
            transform: "translateY(-1px)",
          },
          transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
          textTransform: "none",
          mx: 0.5,
          letterSpacing: "0.01em",
        }}
      >
        {category}
      </Button>
    );
  }
);

// Refined minimal checkmark icon
const ElegantCheckmarkItem = memo(
  ({ text, icon: Icon }: { text: string; icon?: React.ComponentType<{ size?: number }> }) => {
    const theme = useTheme();
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: alpha(theme.palette.primary.main, 0.9),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "0.7rem",
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
  }
);

const TechCardItem = memo(
  ({ tech, isHovered, onMouseEnter, onMouseLeave }: { 
    tech: { icon: JSX.Element; title: string; description: string; color: string; category: string };
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  }) => {
    const theme = useTheme();
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        sx={{ display: "flex" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <motion.div
          variants={ANIMATIONS.item}
          style={{ width: "100%", height: "100%" }}
        >
          <TechCard
            icon={tech.icon}
            title={tech.title}
            accentColor={tech.color}
            category={tech.category}
            importance={isHovered ? "primary" : "secondary"}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 2,
                fontWeight: 400,
                color: alpha(theme.palette.text.primary, 0.95),
                flexGrow: 1,
                lineHeight: 1.6,
                fontSize: "0.85rem",
                letterSpacing: "0.01em",
              }}
            >
              {tech.description}
            </Typography>
          </TechCard>
        </motion.div>
      </Grid>
    );
  }
);

// Main component with refined aesthetics
const TechnologyShowcase = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [filter, setFilter] = useState("All");

  // Derived data
  const filteredTech = useMemo(
    () => (filter === "All" ? TECH_ITEMS : TECH_ITEMS.filter((tech) => tech.category === filter)),
    [filter]
  );
  const categories = useMemo(() => ["All", ...Array.from(new Set(TECH_ITEMS.map((tech) => tech.category)))], []);

  // Purple color for the Explore button
  const purpleColor = "#673AB7";

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        position: "relative",
        py: 10,
        background: "linear-gradient(180deg, #18407F 0%, #1A438A 100%)",
        overflow: "hidden",
      }}
    >
      <Container sx={styles.contentContainer}>
        <motion.div
          variants={ANIMATIONS.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={ANIMATIONS.item}>
            <Typography
              variant="h2"
              sx={{ ...styles.sectionTitle, letterSpacing: "-0.02em", fontWeight: 600 }}
            >
              Enterprise-Grade{" "}
              <Box component="span" sx={styles.accentText}>
                Technology Stack
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{ ...styles.sectionSubtitle, letterSpacing: "0.01em", fontWeight: 400 }}>
              Leverage our experience from ASOS, Tesco, and Philip Morris to build
              <strong> scalable, secure, and efficient</strong> technology for your business
            </Typography>
          </motion.div>

          {/* Category filters */}
          <motion.div variants={ANIMATIONS.item}>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap", mb: 4 }}
            >
              {categories.map((category) => (
                <CategoryButton
                  key={category}
                  category={category}
                  isActive={filter === category}
                  onClick={() => setFilter(category)}
                />
              ))}
            </Box>
          </motion.div>

          {/* Tech cards grid */}
          <Grid container spacing={3} justifyContent="center">
            {filteredTech.map((tech, index) => (
              <TechCardItem
                key={tech.title}
                tech={tech}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              />
            ))}
          </Grid>

          {/* Refined combined CTA card with improved margins */}
          <motion.div variants={ANIMATIONS.item}>
            <Paper
              elevation={2}
              sx={{
                ...styles.ctaCard,
                mt: 5,
                mb: 5, // Added bottom margin
                borderRadius: "14px",
                background: `linear-gradient(145deg, ${alpha(
                  theme.palette.background.paper,
                  0.95
                )}, ${alpha(theme.palette.background.paper, 0.85)})`,
                backdropFilter: "blur(8px)",
                boxShadow: `0 8px 24px ${alpha("#000", 0.06)}`,
                maxWidth: "900px",
                mx: "auto", // Center the card
                py: 3, // Vertical padding
                px: { xs: 3, md: 4 } // Increased horizontal padding
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
                Explore Our Technology Resources
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.text.secondary}
                mb={2}
                align="center"
                sx={{ letterSpacing: "0.01em", maxWidth: "75%", mx: "auto", fontSize: "0.85rem" }}
              >
                Discover our full technology stack and access free learning resources.
              </Typography>

              {/* Two-column layout */}
              <Grid container spacing={3}> {/* Increased spacing from 2 to 3 */}
                {/* Left: Resources */}
                <Grid
                  item
                  xs={12}
                  md={7}
                  sx={{
                    borderRight: { xs: "none", md: `1px solid ${alpha(theme.palette.divider, 0.08)}` },
                    pb: { xs: 2, md: 0 },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 1,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Free Enterprise Resources:
                  </Typography>

                  <Grid container spacing={1}>
                    {RESOURCE_ITEMS.map((item, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.75 }}>
                          <Box
                            sx={{
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              backgroundColor: alpha(theme.palette.primary.main, 0.9),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontSize: "0.6rem",
                              mt: 0.3
                            }}
                          >
                         <Box
                          sx={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            backgroundColor: alpha(theme.palette.primary.main, 0.9),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "0.6rem",
                            mt: 0.3
                          }}
                        >
                          <FileText size={7} />
                        </Box>
                          </Box>
                          <Typography
                            color={theme.palette.text.primary}
                            sx={{ fontSize: "0.8rem", letterSpacing: "0.01em", lineHeight: 1.3 }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Download size={12} />}
                    href="/resources"
                    sx={{
                      mt: 1.5,
                      px: 2,
                      py: 0.6,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      borderRadius: 6,
                      letterSpacing: "0.01em",
                      boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    Access Free Resources
                  </Button>
                </Grid>

                {/* Right: Capabilities */}
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{
                    borderTop: { xs: `1px solid ${alpha(theme.palette.divider, 0.08)}`, md: "none" },
                    pt: { xs: 2, md: 0 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ maxWidth: "90%" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: purpleColor,
                        mb: 1,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        letterSpacing: "0.01em",
                      }}
                    >
                      Discover Our Full Capabilities
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1.5,
                        color: theme.palette.text.secondary,
                        fontSize: "0.8rem",
                        letterSpacing: "0.01em",
                        lineHeight: 1.4,
                      }}
                    >
                      See our complete technology stack that powers enterprise solutions across industries.
                    </Typography>

                    {/* Purple Explore button */}
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<ChevronRight size={12} />}
                      href="/stack"
                      sx={{
                        px: 2,
                        py: 0.6,
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        borderRadius: 6,
                        letterSpacing: "0.01em",
                        bgcolor: purpleColor,
                        boxShadow: `0 2px 6px ${alpha(purpleColor, 0.25)}`,
                      }}
                    >
                      Explore Our Full Stack
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default memo(TechnologyShowcase);