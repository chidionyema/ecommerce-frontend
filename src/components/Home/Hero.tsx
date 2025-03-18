"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  alpha,
  Grid,
  Paper,
  Slider,
  Stack,
  IconButton,
  TextField,
  Chip,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import {
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  ArrowRight,
  Calendar,
  Clock,
  MessageCircle,
  Info,
  ChevronDown
} from "lucide-react";
import {
  SiAmazonaws,
  SiMicrosoftazure,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGooglecloud
} from "react-icons/si";
import { CalendlyBooking } from "../CalendlyBooking";

// -------------------- STYLES --------------------
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(8, 0),
  overflow: "hidden",
  minHeight: 680,
  [theme.breakpoints.up("md")]: { minHeight: "95vh" }
}));

const BgOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  background: `radial-gradient(ellipse at center,
    ${alpha("#263B66", 0.96)} 0%,
    ${alpha("#263B66", 0.75)} 70%,
    ${alpha("#263B66", 0.96)} 100%)`
});

const ContentArea = styled(Box)({
  position: "relative",
  zIndex: 3,
  marginTop: 32,
  marginBottom: 32
});

const Headline = styled(Typography)({
  fontSize: "2.5rem",
  lineHeight: 1.1,
  fontWeight: 800,
  color: "#fff",
  textAlign: "center",
  margin: "0 auto 16px",
  maxWidth: 900
});

const Subheadline = styled(Typography)({
  fontSize: "1.125rem",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.95)",
  textAlign: "center",
  margin: "0 auto 32px",
  maxWidth: 760
});

const CTAButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 600,
  borderRadius: 10,
  textTransform: "none",
  padding: theme.spacing(1.75, 4),
  background: `linear-gradient(135deg,
    ${alpha(theme.palette.secondary.main, 0.9)},
    ${alpha(theme.palette.secondary.dark, 0.9)})`,
  boxShadow: `0 8px 16px ${alpha(theme.palette.secondary.main, 0.3)}`,
  transition: "all 0.28s cubic-bezier(0.165, 0.015, 0.12, 0.995)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 12px 24px ${alpha(theme.palette.secondary.main, 0.4)}`
  }
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  backdropFilter: "blur(10px)",
  marginBottom: theme.spacing(4),
  background: alpha(theme.palette.primary.main, 0.13),
  border: `1px solid ${alpha(theme.palette.primary.light, 0.25)}`,
  boxShadow: `0 8px 16px ${alpha("#000", 0.13)}`
}));

const OfferChip = styled(Chip)(({ theme }) => ({
  height: 36,
  backgroundColor: alpha(theme.palette.error.main, 0.13),
  color: "#fff",
  fontWeight: 600,
  border: `1px solid ${alpha(theme.palette.error.light, 0.36)}`,
  boxShadow: `0 4px 10px ${alpha(theme.palette.error.main, 0.16)}`,
  "& .MuiChip-icon": { color: alpha("#fff", 0.97) }
}));

// Use shouldForwardProp to prevent "active" from reaching the DOM
const PersonaButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  fontSize: "0.82rem",
  fontWeight: 500,
  borderRadius: 6,
  transition: "all 0.28s",
  padding: theme.spacing(0.85, 1.85),
  ...(active
    ? {
        background: alpha(theme.palette.secondary.main, 0.13),
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        "&:hover": { background: alpha(theme.palette.secondary.main, 0.17) }
      }
    : {
        border: `1px solid ${alpha("#fff", 0.17)}`,
        color: alpha("#fff", 0.85),
        "&:hover": { background: alpha("#fff", 0.04) }
      })
}));

const IconCircle = styled(Box)({
  borderRadius: "50%",
  padding: 12,
  color: "#fff",
  width: "fit-content",
  marginBottom: 16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 5px 10px rgba(0,0,0,0.17)"
});

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// -------------------- DATA --------------------
const DATA = {
  personas: {
    developer: {
      headline: "Enterprise Solutions Delivered 10× Faster",
      subheadline: "Accelerate development with meticulously crafted enterprise-grade architectures",
      benefits: [
        "CI/CD Pipeline Integration",
        "Microservices Architecture",
        "Containerization",
        "Infrastructure as Code"
      ]
    },
    executive: {
      headline: "Enterprise Solutions with 47% Cost Reduction",
      subheadline: "Optimize technology investments with precision-engineered enterprise solutions",
      benefits: [
        "TCO Optimization",
        "Automated Workflows",
        "Resource Optimization",
        "Reduced Maintenance"
      ]
    },
    security: {
      headline: "Enterprise Solutions with Enterprise-Grade Security",
      subheadline:
        "Deploy secure enterprise solutions with comprehensive protection built from first principles",
      benefits: [
        "SOC 2 Type II Compliance",
        "Data Encryption",
        "Security Scanning",
        "Role-Based Access"
      ]
    }
  },
  benefits: [
    {
      icon: <TrendingUp size={20} strokeWidth={1.5} />,
      text: "73% Faster Deployment",
      subtext: "From concept to production in weeks",
      gradient: "linear-gradient(135deg, #00C6FB, #005BEA)"
    },
    {
      icon: <ShieldCheck size={20} strokeWidth={1.5} />,
      text: "Enterprise Security",
      subtext: "SOC 2, GDPR & ISO 27001 compliant",
      gradient: "linear-gradient(135deg, #FF9966, #FF5E62)"
    },
    {
      icon: <DollarSign size={20} strokeWidth={1.5} />,
      text: "47% Cost Reduction",
      subtext: "Optimized infrastructure & reduced overhead",
      gradient: "linear-gradient(135deg, #38ef7d, #11998e)"
    },
    {
      icon: <Users size={20} strokeWidth={1.5} />,
      text: "99.99% Uptime SLA",
      subtext: "Built for enterprise-grade reliability",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)"
    }
  ],
  techStack: [
    { icon: SiAmazonaws, name: "AWS", color: "#FF9900" },
    { icon: SiMicrosoftazure, name: "Azure", color: "#0078D4" },
    { icon: SiGooglecloud, name: "GCP", color: "#4285F4" },
    { icon: SiDocker, name: "Docker", color: "#2496ED" },
    { icon: SiKubernetes, name: "K8s", color: "#326CE5" },
    { icon: SiTerraform, name: "Terraform", color: "#7B42BC" }
  ],
  successIndicators: [
    "Used by leading FinTech companies",
    "Trusted by global Healthcare providers",
    "Chosen by innovative E-commerce platforms"
  ]
};

// -------------------- HELPER COMPONENTS --------------------
const CheckItem = ({ text }: { text: string }) => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
    <Box
      sx={{
        width: 17,
        height: 17,
        borderRadius: "50%",
        bgcolor: "#4285f4",
        color: "#fff",
        fontSize: "0.7rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      ✓
    </Box>
    <Typography sx={{ color: "rgba(255, 255, 255, 0.94)", fontSize: "0.85rem", fontWeight: 500 }}>
      {text}
    </Typography>
  </Stack>
);

// -------------------- MAIN COMPONENT --------------------
function HeroSection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<keyof typeof DATA.personas>("developer");
  const [showCalculator, setShowCalculator] = useState(false);
  const [teamSize, setTeamSize] = useState(5);
  const [roi, setRoi] = useState(30);

useEffect(() => {
  const p = new URLSearchParams(window.location.search).get("persona");
  if (p && (p === "developer" || p === "executive" || p === "security")) {
    setSelectedPersona(p as keyof typeof DATA.personas);
  } else {
    const stored = localStorage.getItem("userPersona");
    if (stored && (stored === "developer" || stored === "executive" || stored === "security")) {
      setSelectedPersona(stored as keyof typeof DATA.personas);
    }
  }
}, []);

  const personaData = DATA.personas[selectedPersona];
  const annualSavings = useMemo(() => {
    const monthlyCost = teamSize * 10000;
    const rate = selectedPersona === "executive" ? 47 : roi;
    return Math.round(monthlyCost * 12 * (rate / 100));
  }, [teamSize, roi, selectedPersona]);

  return (
    <Section>
      {/* Background */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <Image
          src="/images/istockphoto-realhero.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          priority
          style={{ filter: "saturate(1.01) brightness(0.9)", opacity: 0.9 }}
        />
      </Box>
      <BgOverlay />

      <Container maxWidth="lg">
        <ContentArea>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
            <Headline>
              {personaData.headline.split(" ").slice(0, -1).join(" ")}{" "}
              <Box
                component="span"
                sx={(theme) => ({
                  background: `linear-gradient(135deg,
                    ${theme.palette.secondary.light},
                    ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                })}
              >
                {personaData.headline.split(" ").slice(-1)}
              </Box>
            </Headline>
            <Subheadline>{personaData.subheadline}</Subheadline>

            {/* CTA */}
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <OfferChip icon={<Clock size={14} strokeWidth={2} />} label="Limited Time: 2 Free Strategy Sessions" />
              </Box>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 3 }} justifyContent="center">
                <CTAButton onClick={() => setIsCalendlyOpen(true)} endIcon={<Calendar size={16} strokeWidth={2} />}>
                  Schedule Your Strategy Session
                </CTAButton>
                <CTAButton
                  onClick={() => window.open("/solutions", "_self")}
                  endIcon={<ArrowRight size={16} strokeWidth={2} />}
                  sx={{
                    backgroundColor: alpha("#000", 0.1),
                    background: "none",
                    border: `1.5px solid ${alpha("#fff", 0.85)}`
                  }}
                >
                  View Case Studies
                </CTAButton>
              </Stack>
            </Box>
          </motion.div>

          {/* Persona Selector */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 5,
                borderRadius: 2,
                mx: "auto",
                maxWidth: "fit-content",
                backgroundColor: "rgba(0,0,0,0.1)",
                p: 1,
                backdropFilter: "blur(8px)"
              }}
            >
              <Typography sx={{ color: "rgba(255,255,255,0.7)", mr: 2, alignSelf: "center", fontSize: "0.85rem" }}>
                I am a:
              </Typography>
              <Stack direction="row" spacing={1}>
                {Object.keys(DATA.personas).map((p) => (
                  <PersonaButton
                    key={p}
                    active={selectedPersona === p}
                    onClick={() => setSelectedPersona(p as keyof typeof DATA.personas)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </PersonaButton>
                ))}
              </Stack>
            </Box>
          </motion.div>

          {/* Benefits */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              sx={{ fontSize: "1.5rem", textAlign: "center", color: "white", mb: 3, fontWeight: 600 }}
            >
              Why Organizations Choose Our Solutions
            </Typography>
            <Grid container spacing={2.5}>
              {DATA.benefits.map((b, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
                    <GlassPaper
                      sx={{
                        "&:hover": {
                          transform: "translateY(-3px)",
                          background: alpha("#263B66", 0.17)
                        }
                      }}
                    >
                      <IconCircle sx={{ background: b.gradient }}>{b.icon}</IconCircle>
                      <Typography sx={{ fontWeight: 600, color: "#fff", mb: 1, fontSize: "1.05rem" }}>
                        {b.text}
                      </Typography>
                      <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5, color: "rgba(255,255,255,0.94)" }}>
                        {b.subtext}
                      </Typography>
                    </GlassPaper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* ROI Calculator */}
          <Box sx={{ mb: 6 }}>
            {!showCalculator ? (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
                <GlassPaper
                  onClick={() => setShowCalculator(true)}
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }
                  }}
                >
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <DollarSign size={20} color="#4285f4" strokeWidth={2} />
                    <Typography variant="h6" color="#4285f4" fontWeight={600}>
                      Calculate Your Potential Savings
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "rgba(255,255,255,0.9)", maxWidth: 600, mx: "auto", fontSize: "0.95rem" }}>
                    Our solutions typically reduce development costs by 30-50%. See how much your organization could save.
                  </Typography>
                </GlassPaper>
              </motion.div>
            ) : (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
                <GlassPaper>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <DollarSign size={20} color="#4285f4" strokeWidth={2} />
                      <Typography sx={{ color: "#4285f4", fontWeight: 600, fontSize: "1.05rem" }}>
                        Enterprise Cost Savings Calculator
                      </Typography>
                    </Stack>
                    <Tooltip title="See methodology">
                      <IconButton size="small" color="primary">
                        <Info size={16} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ color: "#fff", fontSize: "0.9rem", mb: 1, fontWeight: 500 }}>
                        Development Team Size: {teamSize}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", mb: 1 }}>
                        Est. monthly cost: ${(teamSize * 10000).toLocaleString()}
                      </Typography>
                      <Slider
                        value={teamSize}
                        onChange={(e, val) => setTeamSize(val as number)}
                        min={1}
                        max={50}
                        step={1}
                        valueLabelDisplay="auto"
                        sx={{ color: "#4285f4" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ color: "#fff", fontSize: "0.9rem", mb: 1, fontWeight: 500 }}>
                        Efficiency Improvement: {roi}%
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", mb: 1 }}>
                        Industry average: 30-45%
                      </Typography>
                      <Slider
                        value={roi}
                        onChange={(e, val) => setRoi(val as number)}
                        min={10}
                        max={60}
                        step={5}
                        valueLabelDisplay="auto"
                        sx={{ color: "#4285f4" }}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "rgba(66,133,244,0.1)",
                      p: 2,
                      borderRadius: 1
                    }}
                  >
                    <Typography sx={{ color: "#fff", fontSize: "0.95rem", fontWeight: 500 }}>
                      Potential annual savings:
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#4285f4", fontWeight: 700 }}>
                      ${annualSavings.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center", mt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsCalendlyOpen(true)}
                      sx={{ borderRadius: 2 }}
                    >
                      Get Detailed Analysis
                    </Button>
                  </Box>
                </GlassPaper>
              </motion.div>
            )}
          </Box>

          {/* Persona Features */}
          <Box sx={{ mb: 6 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
              <GlassPaper sx={{ maxWidth: 720, mx: "auto" }}>
                <Typography sx={{ color: "#4285f4", fontWeight: 600, textAlign: "center", mb: 3, fontSize: "1.15rem" }}>
                  {selectedPersona === "developer"
                    ? "Developer-Focused Features"
                    : selectedPersona === "executive"
                    ? "Business Value Accelerators"
                    : "Security & Compliance Features"}
                </Typography>
                <Grid container spacing={2}>
                  {personaData.benefits.map((feature, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <CheckItem text={feature} />
                    </Grid>
                  ))}
                </Grid>
              </GlassPaper>
            </motion.div>
          </Box>

          {/* Social Proof */}
          <Box sx={{ mb: 6 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
              <GlassPaper sx={{ maxWidth: "sm", mx: "auto", py: 3, px: { xs: 2, sm: 4 } }}>
                <Typography sx={{ textAlign: "center", color: "#fff", fontWeight: 600, mb: 3, fontSize: "1rem" }}>
                  Trusted by industry leaders
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 3 }} justifyContent="center">
                  {DATA.successIndicators.map((item, i) => (
                    <CheckItem key={i} text={item} />
                  ))}
                </Stack>
              </GlassPaper>
            </motion.div>
          </Box>

          {/* Tech Stack: Always Visible */}
          <Box sx={{ mb: 6 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
              <GlassPaper>
                <Typography
                  sx={{ color: "#fff", textAlign: "center", mb: 3, fontWeight: 600, fontSize: "1rem" }}
                >
                  Pre-built architectures for leading enterprise technologies
                </Typography>
                <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                  {DATA.techStack.map((tech, i) => (
                    <Grid item key={i} xs={4} sm={2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1.5,
                          transition: "transform 0.3s ease",
                          "&:hover": { transform: "translateY(-5px)" }
                        }}
                      >
                        <tech.icon color={tech.color} size={36} />
                        <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>
                          {tech.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </GlassPaper>
            </motion.div>
          </Box>

          {/* Final CTA */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariants}>
              <Typography sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, mb: 3, maxWidth: 600, mx: "auto" }}>
                Ready to transform your enterprise technology?
              </Typography>
              <CTAButton onClick={() => setIsCalendlyOpen(true)} endIcon={<Calendar size={16} strokeWidth={2} />}>
                Schedule Your Strategy Session
              </CTAButton>
            </motion.div>
          </Box>
        </ContentArea>
      </Container>

      {/* Chatbot */}
      <IconButton
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: "50%",
          zIndex: 1000,
          background: (theme) => theme.palette.secondary.main,
          color: "#fff",
          boxShadow: "0 4px 18px rgba(0,0,0,0.3)",
          "&:hover": { background: (theme) => theme.palette.secondary.dark, transform: "scale(1.05)" }
        }}
      >
        <MessageCircle size={24} />
      </IconButton>

      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <Box
              sx={{
                position: "fixed",
                bottom: 90,
                right: 24,
                width: 340,
                maxHeight: 480,
                borderRadius: 12,
                p: 2,
                background: "rgba(30,41,59,0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                zIndex: 1000,
                boxShadow: "0 10px 36px rgba(0,0,0,0.3)",
                overflow: "hidden"
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ color: "#4285f4", fontWeight: 700 }}>Enterprise AI Assistant</Typography>
                <IconButton size="small" onClick={() => setIsChatbotOpen(false)} sx={{ color: "rgba(255,255,255,0.7)" }}>
                  <ChevronDown size={18} />
                </IconButton>
              </Stack>
              <Typography sx={{ color: "#fff", fontSize: "0.9rem", mb: 2 }}>
                How can I help with your enterprise solution needs today?
              </Typography>
              <TextField
                fullWidth
                placeholder="Ask me anything..."
                variant="outlined"
                size="small"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&.Mui-focused fieldset": { borderColor: "#4285f4" }
                  }
                }}
              />
              <Button fullWidth variant="contained" color="primary" size="small">
                Send
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendly */}
      <CalendlyBooking
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        eventTypeUrl="https://calendly.com/glustack/strategy-session"
        prefill={{ name: "", email: "" }}
      />
    </Section>
  );
}

export default HeroSection;
