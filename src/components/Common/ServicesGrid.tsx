"use client";
import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  alpha,
  Button,
  Divider
} from "@mui/material";
import { getSharedStyles, ANIMATIONS } from "../../utils/designSystem";
import TechCard from "../Common/TechCard";
import { motion, useInView } from "framer-motion";
import {
  Layers,
  Cloud,
  Code,
  ShieldCheck,
  Cpu,
  Database,
  BookOpen,
  Wrench,
  ArrowRight,
  Download,
  FileText,
  ChevronRight
} from "lucide-react";
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout";

// Services data with icons formatted for TechCard
const services = [
  {
    title: "Enterprise Architecture",
    content:
      "Strategic design of scalable, maintainable systems based on our experience at ASOS and Tesco.",
    icon: <Layers strokeWidth={1.5} size={18} color="#FF5722" />,
    color: "#FF5722",
    ctaLink: "/services/enterprise-architecture"
  },
  {
    title: "Cloud Migration",
    content:
      "Seamless transitions to AWS, Azure, and GCP with proven methodologies from StepStone and PMI.",
    icon: <Cloud strokeWidth={1.5} size={18} color="#2196F3" />,
    color: "#2196F3",
    ctaLink: "/services/cloud-migration"
  },
  {
    title: "DevOps & Infrastructure",
    content:
      "Automate deployment pipelines with Docker, Kubernetes, and Terraform for maximum efficiency.",
    icon: <Wrench strokeWidth={1.5} size={18} color="#4CAF50" />,
    color: "#4CAF50",
    ctaLink: "/services/devops"
  },
  {
    title: "Custom Software Development",
    content:
      "Full-stack solutions in .NET, React, Next.js, and more with enterprise-grade quality.",
    icon: <Code strokeWidth={1.5} size={18} color="#673AB7" />,
    color: "#673AB7",
    ctaLink: "/services/development"
  },
  {
    title: "Machine Learning Integration",
    content:
      "Practical AI implementation leveraging expertise from Imperial College certification.",
    icon: <Cpu strokeWidth={1.5} size={18} color="#E91E63" />,
    color: "#E91E63",
    ctaLink: "/services/machine-learning"
  },
  {
    title: "Security & Authentication",
    content:
      "Implement OAuth 2.0, OpenID Connect, and secure architecture patterns from day one.",
    icon: <ShieldCheck strokeWidth={1.5} size={18} color="#FFC107" />,
    color: "#FFC107",
    ctaLink: "/services/security"
  },
  {
    title: "Microservices Architecture",
    content:
      "Design and implement scalable microservices with messaging systems like RabbitMQ and SQS.",
    icon: <Database strokeWidth={1.5} size={18} color="#00BCD4" />,
    color: "#00BCD4",
    ctaLink: "/services/microservices"
  },
  {
    title: "Technical Documentation",
    content:
      "Comprehensive, accessible documentation that empowers your team for long-term success.",
    icon: <BookOpen strokeWidth={1.5} size={18} color="#9E9E9E" />,
    color: "#9E9E9E",
    ctaLink: "/services/documentation"
  }
];

// Resources list for CTA
const resources = [
  "Weekly technical tutorials",
  "Code snippets & templates",
  "Architecture best practices",
  "Security & performance tips"
];

// Define the ElegantCheckmarkItem props using React.ElementType for the icon
interface ElegantCheckmarkItemProps {
  text: string;
  icon?: React.ElementType;
}

const ElegantCheckmarkItem: React.FC<ElegantCheckmarkItemProps> = ({ text, icon: Icon }) => {
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
      <Typography sx={{ fontSize: "0.9rem", letterSpacing: "0.015em" }} color={theme.palette.text.primary}>
        {text}
      </Typography>
    </Box>
  );
};

const ServicesGrid: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
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
        <motion.div variants={ANIMATIONS.container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <motion.div variants={ANIMATIONS.item}>
              <Typography
                variant="h2"
                sx={{ ...styles.sectionTitle, letterSpacing: "-0.02em", fontWeight: 600, mb: 2 }}
              >
                Enterprise Solutions for{" "}
                <Box component="span" sx={styles.accentText}>
                  Growing Businesses
                </Box>
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
                Leverage our experience from <strong>ASOS, Tesco, and Philip Morris</strong> to build scalable,
                secure, and efficient technology for your growing company
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {services.map((service, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{ display: "flex" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <motion.div variants={ANIMATIONS.item} style={{ width: "100%", height: "100%" }}>
                  <TechCard
                    icon={
                      hoveredIndex === index
                        ? React.cloneElement(service.icon, { strokeWidth: 1.75 })
                        : service.icon
                    }
                    title={service.title}
                    accentColor={service.color}
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
                        flexGrow: 1,
                        textAlign: "center",
                        mb: 2,
                        fontWeight: 400
                      }}
                    >
                      {service.content}
                    </Typography>
                    <Divider sx={{ mb: 1.5, borderColor: alpha("#fff", 0.15), width: "70%", mx: "auto" }} />
                    <Button
                      variant="text"
                      color="inherit"
                      endIcon={<ArrowRight size={14} />}
                      href={service.ctaLink}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        color: alpha("#fff", 0.95),
                        py: 0.5,
                        letterSpacing: "0.01em",
                        "&:hover": {
                          backgroundColor: alpha("#fff", 0.07),
                          transform: "translateY(-1px)"
                        },
                        transition: "all 0.2s ease"
                      }}
                    >
                      Learn More
                    </Button>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div variants={ANIMATIONS.item}>
            <TechCard
              title="Enterprise Resources & Services"
              importance="primary"
              sx={{
                mt: { xs: 6, md: 8 },
                borderRadius: "16px",
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(
                  theme.palette.background.paper,
                  0.85
                )})`,
                backdropFilter: "blur(8px)",
                boxShadow: `0 8px 32px ${alpha("#000", 0.08)}`
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                fontWeight={600}
                mb={1}
                align="center"
                color={theme.palette.primary.main}
                sx={{ letterSpacing: "-0.01em", fontSize: "1.3rem" }}
              >
                Enterprise Resources & Services
              </Typography>
              <Typography
                variant="body1"
                color={theme.palette.text.secondary}
                mb={4}
                align="center"
                sx={{ letterSpacing: "0.01em", maxWidth: "85%", mx: "auto", fontSize: "0.95rem" }}
              >
                Access free resources and explore our full range of enterprise solutions
              </Typography>
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    borderRight: { xs: "none", md: `1px solid ${alpha(theme.palette.divider, 0.08)}` },
                    pb: { xs: 3, md: 0 }
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 2,
                      fontWeight: 600,
                      fontSize: "1rem",
                      letterSpacing: "0.01em"
                    }}
                  >
                    Free Enterprise Resources
                  </Typography>
                  <Grid container spacing={1.5}>
                    {resources.map((item, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <ElegantCheckmarkItem text={item} icon={FileText} />
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
                      py: 0.8,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      borderRadius: 6,
                      letterSpacing: "0.01em",
                      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                      }
                    }}
                  >
                    Access Free Resources
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    borderTop: { xs: `1px solid ${alpha(theme.palette.divider, 0.08)}`, md: "none" },
                    pt: { xs: 3, md: 0 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: { xs: "center", md: "flex-start" }
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: purpleColor,
                      mb: 1.5,
                      fontWeight: 600,
                      fontSize: "1rem",
                      letterSpacing: "0.01em"
                    }}
                  >
                    Explore Our Enterprise Solutions
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: theme.palette.text.secondary,
                      fontSize: "0.9rem",
                      letterSpacing: "0.01em",
                      lineHeight: 1.6,
                      maxWidth: { xs: "100%", md: "90%" }
                    }}
                  >
                    Discover our full range of enterprise-grade services designed to help your business scale efficiently and securely.
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={<ChevronRight size={14} />}
                    href="/solutions"
                    sx={{
                      px: 2.5,
                      py: 0.8,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      borderRadius: 6,
                      letterSpacing: "0.01em",
                      bgcolor: purpleColor,
                      boxShadow: `0 2px 8px ${alpha(purpleColor, 0.3)}`,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha(purpleColor, 0.9),
                        transform: "translateY(-1px)",
                        boxShadow: `0 4px 12px ${alpha(purpleColor, 0.35)}`
                      }
                    }}
                  >
                    View All Enterprise Services
                  </Button>
                </Grid>
              </Grid>
            </TechCard>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesGrid;
