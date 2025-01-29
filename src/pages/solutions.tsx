import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Grid, Container, Button, alpha, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { cvProjects } from "../data/cvProjects";
import SEO from "../components/SEO";
import { PRIMARY_DARK, PAGE_BG, TITLE_GRADIENT } from "../theme/branding";

const ProjectCard = dynamic(() => import("../components/ProjectCard")
  .then(mod => mod.default)
  .catch(() => () => <div style={{ color: 'red' }}>Component Load Error</div>), 
  { 
    ssr: false,
    loading: () => <div>Loading project...</div>
  }
);
const PAGE_SIZE = 9;

// Static styles moved outside component
const titleStyles = { 
  fontWeight: 700, 
  mb: 3, 
  color: PRIMARY_DARK, 
};

const subtitleStyles = {
  color: "text.secondary",
  maxWidth: 800,
  mx: "auto",
  fontSize: { xs: "1.1rem", md: "1.3rem" },
  lineHeight: 1.6,
};

const buttonStyles = {
  background: TITLE_GRADIENT,
  px: 8,
  py: 2.5,
  fontWeight: 700,
  fontSize: { xs: "1.2rem", md: "1.4rem" },
  color: "white",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    boxShadow: `0 8px 24px ${alpha(PRIMARY_DARK, 0.3)}`,
    transform: "scale(1.04)",
  },
};

const Solutions = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();

  // Memoize displayed projects array
  const displayedProjects = useMemo(
    () => cvProjects.slice(0, PAGE_SIZE),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ backgroundColor: PAGE_BG, minHeight: "100vh", pt: { xs: "80px", md: "96px" } }}>
      <SEO
        title="Client Solutions - Enterprise Solutions"
        description="Explore our portfolio of enterprise-grade technical solutions and client success stories."
      />
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ ...titleStyles, fontFamily: theme.typography.fontFamily }}>
              Transform Your Enterprise with Cutting-Edge Solutions
            </Typography>
            <Typography variant="subtitle1" sx={subtitleStyles}>
              Scalable, secure, and future-proof strategies built for enterprises aiming for innovation.
            </Typography>
          </Box>
        </motion.div>

        {/* Projects Grid */}
        <Grid container spacing={6}>
          {displayedProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} index={index}/>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action Button */}
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <NextLink href="/contact" passHref legacyBehavior>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                component="a"
                variant="contained"
                sx={buttonStyles}
              >
                Request Solution Demo
              </Button>
            </motion.div>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Solutions;