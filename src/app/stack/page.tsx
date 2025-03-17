"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  useTheme,
  alpha,
  useMediaQuery
} from "@mui/material";
import { motion } from "framer-motion";
import {
  SiAmazonaws,
  SiMicrosoftazure,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiReact,
  SiNextdotjs,
  SiDotnet,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiGithubactions,
  SiGraphql
} from "react-icons/si";
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout";

// Define the interface for a technology item.
interface TechItem {
  icon: React.ReactElement;
  title: string;
  description: string;
  color: string;
}

const TECH_CATEGORIES = [
  {
    id: "cloud",
    label: "Cloud Infrastructure",
    items: [
      { icon: <SiAmazonaws size={48} />, title: "AWS Cloud", description: "Enterprise-ready infrastructure with EC2, Lambda, S3, and ECS.", color: "#FF9900" },
      { icon: <SiMicrosoftazure size={48} />, title: "Azure Services", description: "Solutions with Azure DevOps, Functions, AKS, and Azure AD.", color: "#0078D4" },
      { icon: <SiDocker size={48} />, title: "Docker", description: "Consistent environments with Docker and Docker Compose.", color: "#2496ED" },
      { icon: <SiKubernetes size={48} />, title: "Kubernetes", description: "Production-grade container orchestration at any scale.", color: "#326CE5" },
      { icon: <SiTerraform size={48} />, title: "Terraform", description: "Infrastructure as code for automated deployments.", color: "#7B42BC" }
    ]
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { icon: <SiReact size={48} />, title: "React", description: "Component-based UI applications built for performance.", color: "#61DAFB" },
      { icon: <SiNextdotjs size={48} />, title: "Next.js", description: "SEO-friendly React apps with server-side rendering.", color: "#000000" }
    ]
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { icon: <SiNodedotjs size={48} />, title: "Node.js", description: "Scalable server-side applications and APIs.", color: "#339933" },
      { icon: <SiDotnet size={48} />, title: ".NET Core", description: "Cross-platform backend systems with C# and ASP.NET.", color: "#512BD4" },
      { icon: <SiGraphql size={48} />, title: "GraphQL", description: "Efficient API design with precise data fetching.", color: "#E10098" }
    ]
  },
  {
    id: "database",
    label: "Databases",
    items: [
      { icon: <SiPostgresql size={48} />, title: "PostgreSQL", description: "Powerful, open-source relational database.", color: "#336791" },
      { icon: <SiMongodb size={48} />, title: "MongoDB", description: "Flexible document database for modern applications.", color: "#47A248" }
    ]
  },
  {
    id: "devops",
    label: "DevOps",
    items: [
      { icon: <SiGithubactions size={48} />, title: "GitHub Actions", description: "Automated CI/CD workflows from your GitHub repo.", color: "#2088FF" }
    ]
  }
];

// TechCard component with explicit prop types.
const TechCard: React.FC<{ tech: TechItem; index: number }> = ({ tech, index }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          background: isDark
            ? alpha(theme.palette.background.paper, 0.8)
            : theme.palette.background.paper,
          border: `1px solid ${alpha(tech.color, 0.2)}`,
          boxShadow: `0 10px 30px -5px ${alpha(tech.color, 0.1)}`,
          transition: "all 0.3s ease",
          overflow: "hidden",
          position: "relative",
          "&:hover": {
            transform: "translateY(-12px)",
            boxShadow: `0 15px 35px -5px ${alpha(tech.color, 0.2)}`,
            border: `1px solid ${alpha(tech.color, 0.4)}`
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${tech.color}, ${alpha(tech.color, 0.5)})`
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            color: tech.color,
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.1)" }
          }}
        >
          {tech.icon}
        </Box>
        <Typography
          variant="h6"
          component="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, fontSize: "1.2rem", mb: 2, color: theme.palette.text.primary }}
        >
          {tech.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", lineHeight: 1.6 }}>
          {tech.description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

// BenefitCard component
const BenefitCard: React.FC<{ benefit: string; index: number }> = ({ benefit, index }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Paper
        sx={{
          p: 4,
          height: "100%",
          background: alpha("#fff", 0.08),
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          color: "white",
          border: `1px solid ${alpha("#fff", 0.1)}`,
          transition: "all 0.3s ease",
          boxShadow: `0 10px 30px -5px ${alpha("#000", 0.2)}`,
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: `0 15px 35px -5px ${alpha("#000", 0.3)}`,
            background: alpha("#fff", 0.12)
          }
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            fontSize: "1.2rem",
            "&::before": {
              content: '""',
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: alpha("#fff", 0.8),
              mr: 2
            }
          }}
        >
          {benefit}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const StackPage: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentCategory = TECH_CATEGORIES[activeTab];

  return (
    <ConsistentPageLayout
      title="Our Technology Stack"
      subtitle="Enterprise-grade technologies for scalable, secure applications"
    >
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            zIndex: 0,
            backgroundImage: 'url("/images/grid-pattern.svg")',
            backgroundSize: "cover"
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: { xs: 120, md: 200 },
            height: { xs: 120, md: 200 },
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha("#fff", 0.2)} 0%, transparent 70%)`,
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: { xs: 150, md: 250 },
            height: { xs: 150, md: 250 },
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha("#fff", 0.15)} 0%, transparent 70%)`,
            zIndex: 0
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "0 2px 10px rgba(0,0,0,0.2)"
              }}
            >
              Our Technology Stack
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 4, maxWidth: 800, mx: "auto", fontWeight: 400, color: alpha("#fff", 0.9) }}
            >
              Enterprise-grade technologies for building scalable, secure, and high-performance applications
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Technologies Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: theme.palette.background.default, position: "relative" }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Box
                sx={{
                  p: 1.5,
                  px: 3,
                  mb: 3,
                  background: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: "30px",
                  display: "inline-block"
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: theme.palette.primary.main, textTransform: "uppercase", letterSpacing: 1 }}
                >
                  Technology Stack
                </Typography>
              </Box>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}>
                Best-in-Class Technologies
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: "auto", fontSize: "1.1rem", lineHeight: 1.6 }}>
                We select best-in-class technologies that work together to deliver exceptional results for your business needs.
              </Typography>
            </motion.div>
          </Box>
          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "center",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: theme.palette.divider
              }
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              allowScrollButtonsMobile
              centered={!isMobile}
              sx={{
                "& .MuiTabs-indicator": { height: 3, borderRadius: "3px 3px 0 0" },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "0.85rem", md: "1rem" },
                  minWidth: { xs: "auto", md: 120 },
                  px: { xs: 2, md: 3 },
                  py: 2,
                  "&.Mui-selected": { color: theme.palette.primary.main }
                }
              }}
            >
              {TECH_CATEGORIES.map((category) => (
                <Tab
                  key={category.id}
                  label={category.label}
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": { color: theme.palette.primary.main, opacity: 0.8 }
                  }}
                />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ mb: 8, mt: 6 }}>
            {TECH_CATEGORIES.map((category, index) => (
              <Box
                key={category.id}
                role="tabpanel"
                hidden={activeTab !== index}
                id={`tabpanel-${category.id}`}
                sx={{ display: activeTab === index ? "block" : "none", transition: "all 0.5s ease" }}
              >
                {activeTab === index && (
                  <Grid container spacing={4}>
                    {category.items.map((tech, techIndex) => (
                      <Grid item xs={12} sm={6} md={4} key={tech.title}>
                        <TechCard tech={tech} index={techIndex} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Enterprise Benefits Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            zIndex: 0,
            backgroundImage: 'url("/images/pattern-dots.svg")'
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha("#fff", 0.15)} 0%, transparent 70%)`,
            zIndex: 0
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Box
              sx={{
                p: 1.5,
                px: 3,
                mb: 3,
                background: alpha("#fff", 0.1),
                borderRadius: "30px",
                mx: "auto",
                textAlign: "center"
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: 1 }}>
                Key Benefits
              </Typography>
            </Box>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 2, color: "white", fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Enterprise-Grade Benefits
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Typography variant="body1" align="center" sx={{ color: alpha("#fff", 0.9), mb: 6, maxWidth: 800, mx: "auto", fontSize: "1.1rem", lineHeight: 1.6 }}>
              Our technology choices deliver these critical benefits for your enterprise applications
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {[
              "Scalable Architecture",
              "Performance Optimized",
              "Security First",
              "High Availability",
              "Observability Built-in",
              "DevOps Ready"
            ].map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <BenefitCard benefit={benefit} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ConsistentPageLayout>
  );
};

export default StackPage;
