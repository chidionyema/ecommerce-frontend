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
  SiGo,         // New
  SiPython,     // New
  SiAngular,    // New
  SiVuedotjs    // New
} from "react-icons/si";
import { FaJava } from "react-icons/fa"
import { ChevronRight, FileText, Download } from "lucide-react";
import { ANIMATIONS, getSharedStyles } from "../../utils/designSystem"; // Assuming designSystem.ts is in utils

// Dynamic import with reduced SSR concerns and better loading experience
const TechCard = dynamic(() => import("../Common/TechCard"), { // Assuming TechCard is in Common
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
    icon: <SiAngular size={42} />, // New Frontend
    title: "Angular",
    description: "Comprehensive framework for building feature-rich SPAs. Strong opinions and robust tooling for large enterprise projects.",
    color: "#DD0031",
    category: "Frontend",
  },
  {
    icon: <SiVuedotjs size={42} />, // New Frontend
    title: "Vue.js",
    description: "Progressive framework for intuitive UIs. Known for its gentle learning curve, flexibility, and excellent performance.",
    color: "#4FC08D",
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
  {
    icon: <SiGo size={42} />, // New Backend
    title: "Golang",
    description: "High-performance concurrent backends and microservices. Known for simplicity, efficiency, and strong networking capabilities.",
    color: "#00ADD8",
    category: "Backend",
  },
  {
    icon: <SiPython size={42} />, // New Backend
    title: "Python",
    description: "Versatile backend development with Django & Flask. Widely used for web apps, data science, and AI/ML integration.",
    color: "#3776AB",
    category: "Backend",
  },
  {
    icon: <FaJava size={42} />, // New Backend
    title: "Java & Spring",
    description: "Robust, scalable enterprise applications with Spring Boot. Battle-tested for large-scale systems and microservices.",
    color: "#f89820",
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
          border: `1px solid ${isActive ? theme.palette.primary.main : alpha("#fff", 0.15)
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
          color={theme.palette.text.primary} // Ensure this uses theme's text color for the background
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
        lg={3} // Adjusted lg for potentially 4 items per row on larger screens
        sx={{ display: "flex" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <motion.div
          variants={ANIMATIONS.item} // Ensure ANIMATIONS.item is defined in your designSystem
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
                color: alpha(theme.palette.text.primary, 0.95), // Use themed text color
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
        color={theme.palette.text.primary} // Use themed text color
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
  const styles = getSharedStyles(theme); // Ensure getSharedStyles is correctly defined
  const ref = useRef(null);

  // MODIFICATION: Adjusted the 'amount' threshold for useInView
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  // For debugging on mobile, you can uncomment the line below:
  // console.log(`TechnologyShowcase isInView: ${isInView}`);

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [filter, setFilter] = useState("All");

  // Derived data with memoization for performance
  const filteredTech = useMemo(
    () => (filter === "All" ? TECH_ITEMS : TECH_ITEMS.filter((tech) => tech.category === filter)),
    [filter]
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(TECH_ITEMS.map((tech) => tech.category)))],
    [] // TECH_ITEMS is stable, so empty dependency array is fine.
  );

  // Custom purple accent color
  const purpleColor = "#673AB7"; // Consider adding to theme or styles object if used elsewhere

  // Animation variants with subtle spring physics
  const refinedAnimations = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.07, // Slightly faster stagger
          delayChildren: 0.1,
          duration: 0.5, // Ensure this is a reasonable duration
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
          duration: 0.5, // Consistent duration
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
        background: "linear-gradient(180deg, #18407F 0%, #1A438A 100%)", // Consider theme colors
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
          opacity: 0.035, // Very subtle
          backgroundImage: "url('/images/grid-pattern.svg')", // Ensure this path is correct
          backgroundSize: "cover", // Or 'contain', 'auto' depending on SVG
          zIndex: 0,
        }}
      />

      <Container sx={styles.contentContainer}> {/* Ensure styles.contentContainer is defined */}
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
                ...styles.sectionTitle, // Ensure styles.sectionTitle is defined
                letterSpacing: "-0.02em",
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
                mb: 1.5,
                textAlign: "center",
                color: theme.palette.common.white // Explicitly set for contrast on dark bg
              }}
            >
              Enterprise-Grade{" "}
              <Box component="span" sx={{
                background: "linear-gradient(135deg, #673AB7, #3F51B5)", // Example gradient
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#673AB7", // Fallback color
              }}>
                Technology Stack
              </Box>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                ...styles.sectionSubtitle, // Ensure styles.sectionSubtitle is defined
                letterSpacing: "0.01em",
                fontWeight: 400,
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                mb: 4,
                textAlign: "center",
                maxWidth: "800px",
                mx: "auto",
                color: alpha(theme.palette.common.white, 0.85) // Lighter text for subtitle
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
                gap: { xs: 0.5, sm: 1 }, // Adjusted gap for mobile
                flexWrap: "wrap",
                mb: 4,
                px: { xs: 1, sm: 2 } // Add some horizontal padding on mobile
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
            spacing={{ xs: 2, sm: 3 }} // Adjusted spacing for mobile
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
              elevation={0} // Use 0 for flatter design if backdropFilter is primary
              sx={{
                ...styles.ctaCard, // Ensure styles.ctaCard is defined
                mt: 6,
                mb: 2,
                borderRadius: "16px", // Standardized border radius
                background: `linear-gradient(145deg, ${alpha( // Using theme's paper or a custom dark shade
                  theme.palette.background.paper, // Assuming dark theme, paper is dark
                  0.97 // Adjust opacity as needed
                )}, ${alpha(
                  theme.palette.background.paper,
                  0.87
                )})`,
                backdropFilter: "blur(10px)", // Ensure this is visually effective
                boxShadow: `0 10px 30px ${alpha("#000", 0.08)}`, // Softer shadow
                maxWidth: "900px",
                mx: "auto",
                p: 0, // Padding will be applied to inner Boxes
                overflow: "hidden", // Important for rounded corners with inner content
                border: `1px solid ${alpha(theme.palette.divider, 0.15)}` // Slightly more visible border
              }}
            >
              {/* Header with subtle gradient background */}
              <Box
                sx={{
                  p: {xs: 2, sm: 3}, // Responsive padding
                  background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(purpleColor, 0.05)})`,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` // Subtler divider
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  fontWeight={600}
                  align="center"
                  color={theme.palette.primary.main}
                  sx={{ letterSpacing: "-0.01em", fontSize: {xs: "1rem", sm: "1.1rem"}, mb: 1 }}
                >
                  Explore Our Technology Resources
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary} // Use theme's secondary text color
                  align="center"
                  sx={{
                    letterSpacing: "0.01em",
                    maxWidth: {xs: "90%", sm: "75%"},
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
                    borderRight: { xs: "none", md: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
                    p: {xs: 2, sm: 3},
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

                  <Grid container spacing={{xs: 1, sm: 2}}>
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
                    href="/resources" // Ensure this link is correct
                    sx={{
                      mt: 2.5,
                      px: 2.5,
                      py: 0.75,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      borderRadius: 8, // Consistent border radius
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
                    borderTop: { xs: `1px solid ${alpha(theme.palette.divider, 0.1)}`, md: "none" },
                    p: {xs: 2, sm: 3},
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: { xs: "transparent", md: alpha(purpleColor, 0.03) } // Subtle bg on md+
                  }}
                >
                  <Box sx={{ maxWidth: {xs: "100%", sm:"90%"} }}> {/* Allow full width on xs */}
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
                      href="/stack" // Ensure this link is correct
                      sx={{
                        px: 2.5,
                        py: 0.75,
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        borderRadius: 8,
                        letterSpacing: "0.01em",
                        bgcolor: purpleColor, // Use the defined purple color
                        color: theme.palette.common.white, // Ensure text is white for contrast
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