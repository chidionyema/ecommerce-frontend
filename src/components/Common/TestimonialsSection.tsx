"use client";
import React, { useState, useRef, useMemo } from "react";
import {
  Box, Container, Typography, Grid, Avatar, useTheme,
  Button, useMediaQuery
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getSharedStyles, ANIMATIONS } from "../../utils/designSystem";
import { Star, FileText, Download, ChevronDown, ChevronUp } from "lucide-react";
import TechCard from "../Common/TechCard";

// Precise types and consolidated data
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  projectType: string;
}

const DATA = {
  testimonials: [
    {
      id: 1,
      name: "Stefan Feissli",
      role: "CTO, TechCorp",
      content: "GLUStack's strategic approach transformed our entire development pipeline. Their enterprise expertise helped us resolve complex scaling issues that had plagued us for months.",
      avatar: "/avatar1.jpg",
      rating: 5,
      projectType: "Cloud Migration"
    },
    {
      id: 2,
      name: "Rudolphe Cabral",
      role: "Manager, Philip Morris",
      content: "The precision and expertise they brought to our Azure migration delivered exceptional ROI. We've seen a 40% decrease in infrastructure costs and significantly improved reliability.",
      avatar: "/avatar2.jpg",
      rating: 5,
      projectType: "DevOps"
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Manager, BBC Worldwide",
      content: "We needed enterprise-level architecture but with a sustainable approach. GLUStack delivered exactly that, setting us up for sustainable growth without technical debt.",
      avatar: "/avatar3.jpg",
      rating: 5,
      projectType: "Architecture"
    },
    {
      id: 4,
      name: "Saudamini Bhadange",
      role: "Product Director, Asos",
      content: "Their team's ability to seamlessly integrate microservices into our legacy system exceeded our expectations. The migration was smooth and the performance gains were immediate.",
      avatar: "/avatar4.jpg",
      rating: 5,
      projectType: "Microservices"
    },
    {
      id: 5,
      name: "Colin Page",
      role: "Product Manager, CognitionFoundry",
      content: "GLUStack's security implementation was remarkable. They identified vulnerabilities we weren't even aware of and implemented OAuth 2.0 with zero disruption to our customers.",
      avatar: "/avatar5.jpg",
      rating: 5,
      projectType: "Security"
    },
    {
      id: 6,
      name: "Simeon Langford",
      role: "CEO, MoodyCow",
      content: "The knowledge transfer and documentation during our Kubernetes migration was exemplary. Our team is now fully self-sufficient thanks to their systematic approach to training.",
      avatar: "/avatar6.jpg",
      rating: 4,
      projectType: "Infrastructure"
    }
  ],
  caseStudies: [
    "ASOS E-commerce Migration Study",
    "Tesco DevOps Transformation Guide",
    "Microservices Implementation Patterns",
    "Enterprise Security Playbook"
  ]
};

// Optimized components
interface ElegantCheckmarkItemProps {
  text: string;
  icon?: React.ElementType<{ size?: number }>;
}

const ElegantCheckmarkItem = React.memo<ElegantCheckmarkItemProps>(({ text, icon: Icon }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
      <Box sx={{
        width: 18, height: 18, borderRadius: "50%",
        background: `radial-gradient(circle at 65% 15%, ${alpha(theme.palette.primary.main, 0.9)}, ${theme.palette.primary.main})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontSize: "0.7rem",
        boxShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.2)}`
      }}>
        {Icon ? <Icon size={10} /> : "✓"}
      </Box>
      <Typography sx={{ fontSize: "0.95rem", letterSpacing: "0.02em", fontWeight: 450 }} color="text.primary">
        {text}
      </Typography>
    </Box>
  );
});

ElegantCheckmarkItem.displayName = "ElegantCheckmarkItem";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const TestimonialCard = React.memo<TestimonialCardProps>(({ 
  testimonial, isHovered, onMouseEnter, onMouseLeave
}) => {
  const theme = useTheme();
  const iveEasing = "cubic-bezier(0.42, 0.0, 0.58, 1.0)";
  
  return (
    <Box 
      sx={{ 
        height: "100%", width: "100%",
        transition: `transform 0.5s ${iveEasing}`,
        transform: isHovered ? "scale(1.01)" : "scale(1)"
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TechCard
        icon={
          <Avatar 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            sx={{
              width: 74, height: 74,
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
              mb: 1.5, transition: `all 0.5s ${iveEasing}`,
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              backgroundColor: alpha(theme.palette.primary.light, 0.1),
            }} 
          />
        }
        title={testimonial.name}
        subtitle={testimonial.role}
        category={testimonial.projectType}
        accentColor={theme.palette.primary.main}
        importance={isHovered ? "primary" : "secondary"}
      >
        <Box sx={{ 
          textAlign: "center", mb: 2.5, mt: 1,
          transition: `all 0.5s ${iveEasing}`,
          transform: isHovered ? "scale(1.05)" : "scale(1)"
        }}>
          <Box component="span" sx={{ 
            display: "inline-flex",
            background: isHovered 
              ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.primary.light, 0.9)})` 
              : "transparent",
            padding: isHovered ? "4px 10px" : "4px 0",
            borderRadius: "12px",
            transition: `all 0.5s ${iveEasing}`,
          }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                style={{
                  color: i < testimonial.rating 
                    ? theme.palette.primary.main 
                    : alpha(theme.palette.primary.main, 0.2),
                  fill: i < testimonial.rating 
                    ? theme.palette.primary.main 
                    : "transparent",
                  marginRight: i < 4 ? "2px" : 0,
                  transition: `all 0.4s ${iveEasing}`,
                  transform: isHovered ? "scale(1.1)" : "scale(1)"
                }}
                size={16}
              />
            ))}
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{
          fontStyle: "italic", lineHeight: 1.65, fontSize: "0.9rem",
          color: isHovered ? theme.palette.text.primary : alpha(theme.palette.text.primary, 0.85),
          textAlign: "center", letterSpacing: "0.015em", minHeight: "7.5rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: `all 0.5s ${iveEasing}`,
        }}>
          "{testimonial.content}"
        </Typography>
      </TechCard>
    </Box>
  );
});

TestimonialCard.displayName = "TestimonialCard";

// Main component
const TestimonialsSection: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Memoized values
  const displayedTestimonials = useMemo(() => 
    showAll ? DATA.testimonials : DATA.testimonials.slice(0, 3),
    [showAll]
  );

  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary?.main || "#673AB7";
  
  // Animation variants
  const testimonialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.42, 0.0, 0.58, 1.0] }
    })
  };
  
  // Style definitions
  const sxStyles = {
    section: {
      position: "relative", py: { xs: 8, sm: 10, md: 12 },
      background: "linear-gradient(175deg, #18407F 0%, #1A438A 80%, #1E4A9A 100%)",
      overflow: "hidden",
      "&::before": {
        content: '""', position: "absolute", top: 0, left: 0, right: 0, height: "120px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.09), rgba(0,0,0,0))", zIndex: 0
      },
      "&::after": {
        content: '""', position: "absolute", bottom: 0, left: 0, right: 0, height: "160px",
        background: "linear-gradient(to top, rgba(0,0,0,0.07), rgba(0,0,0,0))", zIndex: 0
      }
    },
    contentContainer: { ...styles.contentContainer, position: "relative", zIndex: 1 },
    title: { 
      ...styles.sectionTitle, letterSpacing: "-0.025em", fontWeight: 600, mb: 2,
      fontSize: { xs: "2.25rem", md: "2.75rem" }, textShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
    subtitle: { 
      ...styles.sectionSubtitle, letterSpacing: "0.01em", fontWeight: 400, 
      maxWidth: "85%", mx: { xs: "auto", md: 0 },
      color: alpha("#ffffff", 0.85), lineHeight: 1.5
    },
    accentText: {
      ...styles.accentText,
      background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
      backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      textShadow: "none"
    },
    ctaCard: {
      mt: { xs: 6, md: 5 }, borderRadius: "16px",
      background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.97)}, ${alpha(theme.palette.background.paper, 0.87)})`,
      backdropFilter: "blur(12px)",
      boxShadow: `0 16px 40px ${alpha("#000", 0.09)}`,
      maxWidth: 900, mx: "auto", py: 3.5, px: { xs: 3, sm: 4, md: 5 },
      overflow: "hidden", position: "relative",
      "&::before": {
        content: '""', position: "absolute", top: 0, left: 0, right: 0, height: "4px",
        background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`, zIndex: 0
      }
    },
    ctaTitle: { 
      letterSpacing: "-0.01em", fontSize: "1.2rem", fontWeight: 600, 
      mb: 1, textAlign: "center", color: primaryColor,
      position: "relative", display: "inline-block",
      "&::after": {
        content: '""', position: "absolute", bottom: -5, left: "50%",
        transform: "translateX(-50%)", width: "40px", height: "2px",
        background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
      }
    },
    ctaSubtitle: { 
      letterSpacing: "0.01em", maxWidth: { xs: "90%", md: "75%" }, 
      mx: "auto", fontSize: "0.9rem", mb: 4, mt: 2,
      textAlign: "center", color: theme.palette.text.secondary, lineHeight: 1.5
    },
    studiesHeading: { 
      color: primaryColor, mb: 2, fontWeight: 600, fontSize: "0.95rem", 
      letterSpacing: "0.01em", position: "relative", display: "inline-block",
      "&::after": {
        content: '""', position: "absolute", bottom: -5, left: 0,
        width: "20px", height: "2px", background: primaryColor,
      }
    },
    buttonContainer: { 
      display: "flex", flexDirection: { xs: "column", sm: "row" }, 
      justifyContent: "center", alignItems: "center", gap: 2.5, pt: 1.5, mt: 1
    },
    primaryBtn: {
      px: 3, py: 1, textTransform: "none", fontWeight: 500, fontSize: "0.9rem",
      borderRadius: 8, letterSpacing: "0.01em",
      boxShadow: `0 3px 10px ${alpha(primaryColor, 0.25)}`,
      transition: "all 0.35s cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      flexGrow: { xs: 1, sm: 0 }, width: { xs: "100%", sm: "auto" },
      "&:hover": {
        transform: "translateY(-2px) scale(1.02)",
        boxShadow: `0 6px 14px ${alpha(primaryColor, 0.3)}`
      },
      "&:active": { transform: "translateY(1px) scale(0.98)" }
    },
    secondaryBtn: {
      px: 3, py: 1, textTransform: "none", fontWeight: 500, fontSize: "0.9rem",
      borderRadius: 8, letterSpacing: "0.01em",
      transition: "all 0.35s cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      flexGrow: { xs: 1, sm: 0 }, width: { xs: "100%", sm: "auto" },
      bgcolor: secondaryColor, color: "white",
      boxShadow: `0 3px 10px ${alpha(secondaryColor, 0.25)}`,
      "&:hover": {
        transform: "translateY(-2px) scale(1.02)",
        bgcolor: alpha(secondaryColor, 0.9),
        boxShadow: `0 6px 14px ${alpha(secondaryColor, 0.35)}`
      },
      "&:active": { transform: "translateY(1px) scale(0.98)" }
    }
  };

  return (
    <Box component="section" ref={ref} sx={sxStyles.section}>
      {/* Background pattern */}
      <Box sx={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.03, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
        backgroundSize: "30px 30px", pointerEvents: "none"
      }} />
      
      <Container maxWidth="lg" sx={sxStyles.contentContainer}>
        <motion.div 
          variants={ANIMATIONS.container} 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Header */}
          <Box sx={{ mb: { xs: 6, md: 7 } }}>
            <motion.div variants={ANIMATIONS.item}>
              <Typography variant="h2" align="center" sx={sxStyles.title}>
                Client <Box component="span" sx={sxStyles.accentText}>Success Stories</Box>
              </Typography>
              <Typography variant="subtitle1" align="center" sx={sxStyles.subtitle}>
                See how our <strong>enterprise expertise</strong> has transformed businesses across industries
              </Typography>
            </motion.div>
          </Box>

          {/* Testimonial Grid */}
          <Grid container spacing={4} justifyContent="center" sx={{ mb: { xs: 3, md: 4 } }}>
            <AnimatePresence>
              {displayedTestimonials.map((testimonial, index) => (
                <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
                  <motion.div 
                    custom={index}
                    variants={testimonialVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <TestimonialCard 
                      testimonial={testimonial} 
                      isHovered={hoveredIndex === index && !isMobile}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(-1)}
                    />
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>

          {/* CTA Section */}
          <motion.div variants={ANIMATIONS.item}>
            <Box sx={sxStyles.ctaCard}>
              <Box textAlign="center" sx={{ mb: 3 }}>
                <Typography variant="h5" component="h3" sx={sxStyles.ctaTitle}>
                  Enterprise Proof Points
                </Typography>
                <Typography variant="body1" sx={sxStyles.ctaSubtitle}>
                  Explore our case studies and discover how we've helped businesses achieve success
                </Typography>
              </Box>
              
              <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} md={7} sx={{
                  borderRight: { xs: "none", md: `1px solid ${alpha(theme.palette.divider, 0.08)}` },
                  pb: { xs: 3, md: 0 },
                }}>
                  <Typography variant="subtitle2" sx={sxStyles.studiesHeading}>
                    Success Evidence
                  </Typography>
                  <Box sx={{ pt: 1 }}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {DATA.caseStudies.map((item, i) => (
                        <Grid item xs={12} sm={6} key={i}>
                          <ElegantCheckmarkItem text={item} icon={FileText as React.ElementType<{ size?: number }>} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={5} sx={{
                  borderTop: { xs: `1px solid ${alpha(theme.palette.divider, 0.08)}`, md: "none" },
                  pt: { xs: 3, md: 0 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                  <Box sx={{ maxWidth: "95%" }}>
                    <Typography variant="subtitle2" sx={{
                      color: secondaryColor, mb: 1.5, fontWeight: 600, fontSize: "0.95rem",
                      letterSpacing: "0.01em", position: "relative", display: "inline-block",
                      "&::after": {
                        content: '""', position: "absolute", bottom: -5, left: 0,
                        width: "20px", height: "2px", background: secondaryColor,
                      }
                    }}>
                      Discover All Client Stories
                    </Typography>
                    
                    <Typography variant="body2" sx={{
                      mb: 1.5, mt: 1, color: theme.palette.text.secondary,
                      fontSize: "0.85rem", letterSpacing: "0.01em", lineHeight: 1.6,
                    }}>
                      Learn how we've helped organizations across industries achieve their goals with scalable, enterprise-grade solutions.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={sxStyles.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/case-studies"
                  startIcon={<Download size={16} />}
                  sx={sxStyles.primaryBtn}
                >
                  Download Case Studies
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setShowAll(!showAll)}
                  endIcon={showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  sx={sxStyles.secondaryBtn}
                >
                  {showAll ? "Show Fewer Stories" : "View All Testimonials"}
                </Button>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;