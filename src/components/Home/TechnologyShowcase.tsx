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

// Dynamic import with reduced SSR concerns and better loading experience
const TechCard = dynamic(() => import("../Common/TechCard"), { 
  ssr: false,
  loading: () => (
    <Box sx={{ 
      height: 240, 
      borderRadius: 3, 
      background: "rgba(255,255,255,0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Box sx={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
    </Box>
  )
});

// Tech items data with refined descriptions
const TECH_ITEMS = [
  {
    icon: <SiAmazonaws size={42} />,
    title: "AWS Cloud",
    description:
      "Enterprise-ready infrastructure with EC2, Lambda, S3, and ECS. Built to handle millions of users and petabytes of data.",
    color: "#FF9900",
    category: "Cloud",
  },
  {
    icon: <SiMicrosoftazure size={42} />,
    title: "Azure Services",
    description:
      "Comprehensive solutions with Azure DevOps, Functions, AKS, and Azure AD. Ideal for businesses with existing Microsoft ecosystems.",
    color: "#0078D4",
    category: "Cloud",
  },
  {
    icon: <SiDocker size={42} />,
    title: "Containerization",
    description:
      "Consistent, portable environments with Docker and Docker Compose. Implemented with security and performance best practices.",
    color: "#2496ED",
    category: "DevOps",
  },
  {
    icon: <SiKubernetes size={42} />,
    title: "Kubernetes",
    description:
      "Production-grade container orchestration that scales from startups to enterprises. Focused on observability and resilience.",
    color: "#326CE5",
    category: "DevOps",
  },
  {
    icon: <SiTerraform size={42} />,
    title: "Infrastructure as Code",
    description:
      "Automated, version-controlled infrastructure with Terraform. Modular, reusable components that accelerate future deployments.",
    color: "#7B42BC",
    category: "DevOps",
  },
  {
    icon: <SiReact size={42} />,
    title: "React & Modern JS",
    description:
      "Component-based frontend applications built for performance and maintainability. Enterprise patterns for state management.",
    color: "#61DAFB",
    category: "Frontend",
  },
  {
    icon: <SiNextdotjs size={42} />,
    title: "Next.js",
    description:
      "SEO-friendly React apps with server-side rendering and static site generation. Implementing latest Next.js best practices.",
    color: "#000000",
    category: "Frontend",
  },
  {
    icon: <SiDotnet size={42} />,
    title: ".NET Core",
    description:
      "Scalable, cross-platform backend systems with C# and ASP.NET. Clean architecture patterns developed at enterprise scale.",
    color: "#512BD4",
    category: "Backend",
  },
];

// CTA resources data with more precise wording
const RESOURCE_ITEMS = [
  "Enterprise architecture patterns",
  "Performance optimization guides",
  "Security implementation tutorials",
  "Infrastructure templates & blueprints",
];

// Define an interface for CategoryButton props
interface CategoryButtonProps {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

// Refined category button with Jony Ive-inspired aesthetic
const CategoryButton: React.FC<CategoryButtonProps> = memo(
  ({ category, isActive, onClick }) => {
    const theme = useTheme();
    return (
      <Button
        size="small"
        onClick={onClick}
        sx={{
          py: 0.75,
          px: 2,
          borderRadius: 12,
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
          boxShadow: isActive ? `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}` : "none",
        }}
      >
        {category}
      </Button>
    );
  }
);
CategoryButton.displayName = "CategoryButton";

// Elegant checkmark item component
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
ElegantCheckmarkItem.displayName = "ElegantCheckmarkItem";

// Tech card item component with refined hover effects
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
          whileHover={{ 
            y: -5,
            transition: { duration: 0.2, ease: [0.26, 0.54, 0.32, 1] }
          }}
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
TechCardItem.displayName = "TechCardItem";

// Resource item component for the CTA section
const ResourceItem = memo(({ text }: { text: string }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1.2 }}>
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
      <Typography
        color={theme.palette.text.primary}
        sx={{ 
          fontSize: "0.85rem", 
          letterSpacing: "0.01em", 
          lineHeight: 1.4,
          fontWeight: 500
        }}
      >
        {text}
      </Typography>
    </Box>
  );
});
ResourceItem.displayName = "ResourceItem";

// Main component with refined aesthetics and performance optimizations
const TechnologyShowcase = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [filter, setFilter] = useState("All");

  // Derived data with memoization for performance
  const filteredTech = useMemo(
    () => (filter === "All" ? TECH_ITEMS : TECH_ITEMS.filter((tech) => tech.category === filter)),
    [filter]
  );
  
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(TECH_ITEMS.map((tech) => tech.category)))], 
    []
  );

  // Custom purple accent color
  const purpleColor = "#673AB7";

  // Animation variants with subtle spring physics
  const refinedAnimations = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { 
          staggerChildren: 0.1,
          delayChildren: 0.1,
          duration: 0.5,
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
    }
  }), []);

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        position: "relative",
        py: { xs: 8, md: 10 },
        background: "linear-gradient(180deg, #18407F 0%, #1A438A 100%)",
        overflow: "hidden",
      }}
    >
      {/* Subtle background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.035,
          backgroundImage: "url('/images/grid-pattern.svg')",
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />

      <Container sx={styles.contentContainer}>
        <motion.div
          variants={refinedAnimations.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header with improved typography */}
          <motion.div variants={refinedAnimations.item}>
            <Typography
              variant="h2"
              sx={{ 
                ...styles.sectionTitle, 
                letterSpacing: "-0.02em", 
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
                mb: 1.5,
                textAlign: "center"
              }}
            >
              Enterprise-Grade{" "}
              <Box component="span" sx={{
                background: "linear-gradient(135deg, #673AB7, #3F51B5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#673AB7",
              }}>
                Technology Stack
              </Box>
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                ...styles.sectionSubtitle, 
                letterSpacing: "0.01em", 
                fontWeight: 400,
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                mb: 4,
                textAlign: "center",
                maxWidth: "800px",
                mx: "auto"
              }}
            >
              Leverage our experience from ASOS, Tesco, and Philip Morris to build
              <Box component="span" sx={{ fontWeight: 600 }}> scalable, secure, and efficient</Box> technology for your business
            </Typography>
          </motion.div>

          {/* Category filters with refined styling */}
          <motion.div variants={refinedAnimations.item}>
            <Box
              sx={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: 1, 
                flexWrap: "wrap", 
                mb: 4,
                px: 2
              }}
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

          {/* Tech cards grid with improved spacing */}
          <Grid 
            container 
            spacing={3} 
            justifyContent="center"
            sx={{ mb: 5 }}
          >
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

          {/* Refined CTA card with elegantly separated sections */}
          <motion.div variants={refinedAnimations.item}>
            <Paper
              elevation={0}
              sx={{
                ...styles.ctaCard,
                mt: 6,
                mb: 2,
                borderRadius: "16px",
                background: `linear-gradient(145deg, ${alpha(
                  theme.palette.background.paper,
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
                  Explore Our Technology Resources
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
                  Discover our full technology stack and access free learning resources to accelerate your enterprise development.
                </Typography>
              </Box>

              {/* Two-column layout with content */}
              <Grid container>
                {/* Left: Resources */}
                <Grid
                  item
                  xs={12}
                  md={7}
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
                    Free Enterprise Resources
                  </Typography>

                  <Grid container spacing={2}>
                    {RESOURCE_ITEMS.map((item, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <ResourceItem text={item} />
                      </Grid>
                    ))}
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Download size={14} />}
                    href="/resources"
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
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: { xs: "transparent", md: alpha(purpleColor, 0.03) }
                  }}
                >
                  <Box sx={{ maxWidth: "90%" }}>
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
                      Discover Our Full Capabilities
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
                      Explore our complete technology stack that powers enterprise solutions across financial services, healthcare, and retail industries.
                    </Typography>

                    {/* Purple explore button with refined styling */}
                    <Button
                      variant="contained"
                      endIcon={<ChevronRight size={14} />}
                      href="/stack"
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