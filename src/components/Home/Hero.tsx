"use client";
import React, { useState, useEffect, useMemo, Suspense, lazy, FC, ReactNode } from "react";
import {
  Box, Typography, Button, Container, alpha, Grid, Paper,
  Stack, Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck, TrendingUp, DollarSign, Users, Calendar,
  Clock, ChevronRight
} from "lucide-react";
import {
  SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiGooglecloud
} from "react-icons/si";

// Lazy load external components
const CalendlyBooking = lazy(() => import('../CalendlyBooking'));

// -------------------- ERROR BOUNDARY --------------------
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Box sx={{ p: 3, textAlign: 'center', color: '#fff' }}>
          <Typography>Something went wrong.</Typography>
          <Button 
            sx={{ mt: 2, color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}
            variant="outlined" 
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

// -------------------- STYLED COMPONENTS & COMMON STYLES --------------------
// Common styles to reduce repetition
const styles = {
  gradients: {
    primary: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    secondary: "linear-gradient(135deg, #A78BFA, #6366F1)",
    accent1: "linear-gradient(135deg, #F97316, #EC4899)",
    accent2: "linear-gradient(135deg, #14B8A6, #0EA5E9)",
  },
  colors: {
    primary: "#6366F1",
    primaryHover: "#5457EF",
    text: "#fff",
    textSecondary: "rgba(255,255,255,0.85)",
  },
  shadows: {
    primary: "0 4px 14px rgba(99, 102, 241, 0.4)",
    hover: "0 6px 20px rgba(99, 102, 241, 0.5)",
    card: "0 4px 24px rgba(0, 0, 0, 0.1)",
  },
  animations: {
    short: "all 0.2s ease",
    medium: "all 0.25s ease",
  },
  spacing: {
    section: 8,
  }
};

// Motion animation variants
const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    } 
  }
};

// Reusable fade-in motion component
interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  once?: boolean;
}

const FadeInView: FC<FadeInViewProps> = ({ children, delay = 0, once = false }) => (
  <motion.div 
    initial="hidden" 
    animate={!once ? "visible" : undefined}
    whileInView={once ? "visible" : undefined}
    viewport={once ? { once: true } : undefined}
    variants={fadeVariants}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

// Section components
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(styles.spacing.section, 0),
  overflow: "hidden",
  minHeight: 680,
  [theme.breakpoints.up("md")]: { minHeight: "95vh" }
}));

const BgOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  background: `radial-gradient(ellipse at center,
    ${alpha("#1a3674", 0.97)} 0%,
    ${alpha("#1a3674", 0.85)} 70%,
    ${alpha("#1a3674", 0.97)} 100%)`,
  mixBlendMode: "multiply"
});

const ContentArea = styled(Box)({
  position: "relative",
  zIndex: 3,
  width: "100%",
  marginTop: 48,
  marginBottom: 48
});

// Typography components
const Headline = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  lineHeight: 1.2,
  fontWeight: 700,
  color: styles.colors.text,
  textAlign: "center",
  margin: "0 auto 16px",
  maxWidth: 900,
  [theme.breakpoints.down("md")]: { fontSize: "2.5rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "2rem" }
}));

const Subheadline = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 400,
  color: styles.colors.textSecondary,
  textAlign: "center",
  margin: "0 auto 32px",
  maxWidth: 760,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    maxWidth: "85%"
  }
}));

// Button and interactive components
interface CTAButtonProps {
  secondary?: boolean;
}

const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'secondary'
})<CTAButtonProps>(({ theme, secondary }) => ({
  color: styles.colors.text,
  fontWeight: 600,
  borderRadius: 8,
  textTransform: "none",
  padding: theme.spacing(1.5, 3),
  backgroundColor: secondary ? "transparent" : styles.colors.primary,
  border: secondary ? "1.5px solid rgba(255, 255, 255, 0.85)" : "none",
  boxShadow: secondary ? "none" : styles.shadows.primary,
  transition: styles.animations.short,
  "&:hover": {
    backgroundColor: secondary ? "rgba(255, 255, 255, 0.12)" : styles.colors.primaryHover,
    transform: "translateY(-2px)",
    boxShadow: secondary ? "none" : styles.shadows.hover
  }
}));

// CTA Button Group component
interface CTAButtonGroupProps {
  onSchedule: () => void;
  onCaseStudies: () => void;
}

const CTAButtonGroup: FC<CTAButtonGroupProps> = ({ onSchedule, onCaseStudies }) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 3 }} justifyContent="center">
    <CTAButton
      onClick={onSchedule}
      endIcon={<Calendar size={16} strokeWidth={2} />}
      aria-label="Schedule your strategy session"
    >
      Schedule Your Strategy Session
    </CTAButton>
    <CTAButton
      onClick={onCaseStudies}
      endIcon={<ChevronRight size={16} strokeWidth={2} />}
      secondary
      aria-label="View case studies"
    >
      View Case Studies
    </CTAButton>
  </Stack>
);

const OfferChip = styled(Chip)({
  height: 36,
  backgroundColor: "rgba(99, 102, 241, 0.15)",
  color: styles.colors.text,
  fontWeight: 600,
  border: "1px solid rgba(99, 102, 241, 0.3)",
  boxShadow: "0 4px 10px rgba(99, 102, 241, 0.16)",
  "& .MuiChip-icon": { color: alpha(styles.colors.text, 0.97) }
});

// Refined Persona Button with improved styling
interface PersonaButtonProps {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}

const PersonaButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active"
})<PersonaButtonProps>(({ theme, active }) => ({
  fontSize: "0.875rem",
  fontWeight: 600, // Increased from 500 for better visibility
  letterSpacing: "0.02em", // Slightly improved letter spacing
  borderRadius: 12,
  transition: styles.animations.medium,
  padding: theme.spacing(0.9, 2.5), // Increased padding for better clickable area
  minWidth: 110, // Ensure consistent width across tabs
  ...(active
    ? {
        background: styles.gradients.primary, // Use gradient for active state
        boxShadow: styles.shadows.primary,
        color: styles.colors.text,
        "&:hover": { 
          background: styles.gradients.primary,
          filter: "brightness(1.05)"
        }
      }
    : {
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.15)", // Added subtle border
        color: alpha(styles.colors.text, 0.9), // Increased opacity for better visibility
        "&:hover": { 
          background: "rgba(255, 255, 255, 0.15)", 
          transform: "translateY(-1px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
        }
      })
}));

// Consistent and improved benefit card
const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5), // Increased padding
  borderRadius: 16,
  height: "100%", // This ensures the height is always 100% of the parent container
  minHeight: 180, // Set a minimum height for consistency
  display: "flex",
  flexDirection: "column",
  transition: styles.animations.medium,
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  boxShadow: styles.shadows.card,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.1)" // Subtle border enhancement on hover
  }
}));

// Improved icon circle with consistent size and better appearance
const IconCircle = styled(Box)({
  width: 60, // Slightly increased from 56
  height: 60, // Slightly increased from 56
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.15)" // Added subtle border
});

// -------------------- DATA --------------------
interface Persona {
  headline: string;
  subheadline: string;
  benefits: string[];
}

interface Benefit {
  icon: JSX.Element;
  text: string;
  subtext: string;
  gradient: string;
}

interface Tech {
  icon: React.ComponentType<{ color: string; size: number }>;
  name: string;
  color: string;
}

interface DataStructure {
  personas: { [key: string]: Persona };
  benefits: Benefit[];
  techStack: Tech[];
  successIndicators: string[];
}

const DATA: DataStructure = {
  personas: {
    developer: {
      headline: "Enterprise Solutions Delivered 10× Faster",
      subheadline:
        "Accelerate development with meticulously crafted enterprise-grade architectures",
      benefits: [
        "CI/CD Pipeline Integration",
        "Microservices Architecture",
        "Containerization",
        "Infrastructure as Code"
      ]
    },
    executive: {
      headline: "Enterprise Solutions with 47% Cost Reduction",
      subheadline:
        "Optimize technology investments with precision-engineered enterprise solutions",
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
      icon: <TrendingUp size={22} strokeWidth={1.5} />, // Slightly larger icon
      text: "73% Faster Deployment",
      subtext: "From concept to production in weeks",
      gradient: styles.gradients.primary
    },
    {
      icon: <ShieldCheck size={22} strokeWidth={1.5} />, // Slightly larger icon
      text: "Enterprise Security",
      subtext: "SOC 2, GDPR & ISO 27001 compliant",
      gradient: styles.gradients.accent1
    },
    {
      icon: <DollarSign size={22} strokeWidth={1.5} />, // Slightly larger icon
      text: "47% Cost Reduction",
      subtext: "Optimized infrastructure & reduced overhead",
      gradient: styles.gradients.accent2
    },
    {
      icon: <Users size={22} strokeWidth={1.5} />, // Slightly larger icon
      text: "99.99% Uptime SLA",
      subtext: "Built for enterprise-grade reliability",
      gradient: "linear-gradient(135deg, #8B5CF6, #6366F1)"
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
interface CheckItemProps {
  text: string;
}

const CheckItem: FC<CheckItemProps> = React.memo(({ text }) => (
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        bgcolor: styles.colors.primary,
        color: styles.colors.text,
        fontSize: "0.7rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      ✓
    </Box>
    <Typography
      sx={{
        color: "rgba(255, 255, 255, 0.94)",
        fontSize: "0.875rem",
        fontWeight: 500
      }}
    >
      {text}
    </Typography>
  </Stack>
));
CheckItem.displayName = "CheckItem";

// -------------------- MAIN COMPONENT --------------------
const HeroSection: FC = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<keyof DataStructure["personas"]>("executive");
  const [teamSize, setTeamSize] = useState<number>(5);
  const [roi, setRoi] = useState<number>(30);

  // Track persona in URL and localStorage
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("persona");
    if (p && ["developer", "executive", "security"].includes(p)) {
      setSelectedPersona(p as keyof DataStructure["personas"]);
    } else {
      const stored = localStorage.getItem("userPersona");
      if (stored && ["developer", "executive", "security"].includes(stored)) {
        setSelectedPersona(stored as keyof DataStructure["personas"]);
      }
    }
  }, []);

  // Update localStorage when persona changes - Fixed TypeScript error with type assertion
  useEffect(() => {
    localStorage.setItem("userPersona", selectedPersona as string);
  }, [selectedPersona]);

  const personaData = DATA.personas[selectedPersona];
  const annualSavings = useMemo(() => {
    const monthlyCost = teamSize * 10000;
    const rate = selectedPersona === "executive" ? 47 : roi;
    return Math.round(monthlyCost * 12 * (rate / 100));
  }, [teamSize, roi, selectedPersona]);

  // Handle actions
  const handleOpenCalendly = () => setIsCalendlyOpen(true);
  const handleCloseCalendly = () => setIsCalendlyOpen(false);
  const handleViewCaseStudies = () => window.open("/case-studies", "_self");
  const handleOpenCalculator = () => window.open("/calculator", "_self");

  // Loading state for Calendly
  const calendlyLoadingFallback = (
    <Box sx={{ 
      position: "fixed", 
      inset: 0, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundColor: "rgba(0,0,0,0.75)", 
      zIndex: 9999 
    }}>
      <Typography color="white">Loading booking system...</Typography>
    </Box>
  );

  return (
    <Section>
      {/* Background with improved quality */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <Image
          src="/images/istockphoto-realhero.jpg"
          alt="Enterprise technology background"
          layout="fill"
          objectFit="cover"
          priority
          style={{ filter: "saturate(1.1) brightness(0.75)", opacity: 0.95 }} // Slightly enhanced saturation
          quality={95} // Increased from 90
        />
      </Box>
      <BgOverlay />

      <Container maxWidth="lg">
        <ContentArea>
          <FadeInView>
            <Headline>
              Enterprise Solutions with{" "}
              <Box
                component="span"
                sx={{
                  background: styles.gradients.secondary,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: styles.colors.primary,
                  textShadow: "0 2px 10px rgba(139, 92, 246, 0.3)" // Subtle text glow
                }}
              >
                47% Cost Reduction
              </Box>
            </Headline>
            <Subheadline>{personaData.subheadline}</Subheadline>

            {/* CTA with improved spacing */}
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <OfferChip
                  icon={<Clock size={14} strokeWidth={2} />}
                  label="Limited Time: 2 Free Strategy Sessions"
                />
              </Box>
              <CTAButtonGroup 
                onSchedule={handleOpenCalendly} 
                onCaseStudies={handleViewCaseStudies} 
              />
            </Box>
          </FadeInView>

          {/* Improved Persona Selector Tab Section */}
          <FadeInView delay={0.1}>
            <Box
              sx={{
                mb: 5,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "center",
                p: 1.5, // Added padding around the entire section
                borderRadius: 3,
                background: "rgba(255,255,255,0.03)", // Very subtle background
                border: "1px solid rgba(255,255,255,0.06)" // Subtle border
              }}
            >
              <Typography 
                sx={{ 
                  color: "rgba(255,255,255,0.9)", 
                  fontSize: "0.925rem", 
                  fontWeight: 500,
                  mr: { xs: 0, sm: 3 }, 
                  mb: { xs: 2, sm: 0 }
                }}
              >
                I am a:
              </Typography>
              <Stack 
                direction="row" 
                spacing={1.5} // Increased spacing between buttons
                sx={{
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  justifyContent: "center"
                }}
              >
                {Object.keys(DATA.personas).map((p) => (
                  <PersonaButton
                    key={p}
                    active={selectedPersona === p}
                    onClick={() => setSelectedPersona(p as keyof DataStructure["personas"])}
                    aria-checked={selectedPersona === p}
                    role="radio"
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </PersonaButton>
                ))}
              </Stack>
            </Box>
          </FadeInView>

          {/* Improved Benefits Grid with consistent sizing */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              sx={{ 
                fontSize: "1.625rem", // Slightly larger 
                textAlign: "center", 
                color: "white", 
                mb: 4, 
                fontWeight: 600,
                position: "relative",
                display: "inline-block",
                left: "50%",
                transform: "translateX(-50%)",
                "&::after": { // Added underline decoration
                  content: '""',
                  position: "absolute",
                  bottom: -10,
                  left: "25%",
                  width: "50%",
                  height: 3,
                  borderRadius: 2,
                  background: styles.gradients.primary,
                }
              }}
            >
              Why Organizations Choose Our Solutions
            </Typography>
            <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
              {DATA.benefits.map((b, i) => (
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: "flex" }}>
                  <FadeInView delay={i * 0.1} once>
                    <BenefitCard>
                      <IconCircle sx={{ background: b.gradient }}>{b.icon}</IconCircle>
                      <Typography 
                        sx={{ 
                          fontWeight: 600, 
                          color: "#fff", 
                          mb: 1.5, // Increased from 1
                          fontSize: "1.125rem", // Increased from 1.05rem
                          lineHeight: 1.3 
                        }}
                      >
                        {b.text}
                      </Typography>
                      <Typography 
                        sx={{ 
                          fontSize: "0.875rem", 
                          lineHeight: 1.6, 
                          color: "rgba(255,255,255,0.85)",
                          flexGrow: 1 // Ensures text takes available space
                        }}
                      >
                        {b.subtext}
                      </Typography>
                    </BenefitCard>
                  </FadeInView>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Improved Calculator Section */}
          <FadeInView once>
            <Box 
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to bottom, rgba(99, 102, 241, 0.12), rgba(99, 102, 241, 0.06))", // Slightly more visible
                p: 4.5, // Increased padding
                borderRadius: 3,
                border: "1px solid rgba(99, 102, 241, 0.25)", // More visible border
                mb: 6,
                boxShadow: "0 8px 32px rgba(99, 102, 241, 0.1)" // Subtle glow
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <DollarSign size={22} color={styles.colors.primary} strokeWidth={2} />
                <Typography variant="h6" color={styles.colors.primary} fontWeight={600}>
                  Calculate Your Potential Savings
                </Typography>
              </Stack>
              <Typography 
                sx={{ 
                  color: "rgba(255,255,255,0.9)", 
                  maxWidth: 600, 
                  mx: "auto", 
                  fontSize: "0.95rem", 
                  textAlign: "center", 
                  mb: 3.5, // Increased spacing
                  lineHeight: 1.6
                }}
              >
                Our solutions typically reduce development costs by 30-50%. See how much your organization could save.
              </Typography>
              <Button 
                variant="contained"
                color="primary" 
                sx={{ 
                  bgcolor: styles.colors.primary, 
                  "&:hover": { 
                    bgcolor: styles.colors.primaryHover,
                    transform: "translateY(-2px)"
                  },
                  borderRadius: 2,
                  boxShadow: styles.shadows.primary,
                  px: 4,
                  py: 1.25, // Taller button
                  fontWeight: 600,
                  fontSize: "0.925rem",
                  transition: "all 0.2s ease"
                }}
                onClick={handleOpenCalculator}
              >
                Open Savings Calculator
              </Button>
            </Box>
          </FadeInView>

          {/* Improved Final CTA */}
          <Box 
            sx={{ 
              textAlign: "center", 
              pt: 4, 
              pb: 2,
              mb: 2,
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(to bottom, rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.02))", // Very subtle background
            }}
          >
            <FadeInView once>
              <Typography 
                sx={{ 
                  color: "#fff", 
                  fontSize: "1.625rem", // Increased from 1.5rem
                  fontWeight: 700, 
                  mb: 3.5, // Increased from 3
                  maxWidth: 700, // Wider
                  mx: "auto",
                  lineHeight: 1.3
                }}
              >
                Ready to transform your enterprise technology?
              </Typography>
              <CTAButton
                onClick={handleOpenCalendly}
                endIcon={<Calendar size={16} strokeWidth={2} />}
                aria-label="Schedule your strategy session"
                sx={{ 
                  px: 4, // Wider button
                  py: 1.5, // Taller button
                  fontSize: "1rem" // Slightly larger text
                }}
              >
                Schedule Your Strategy Session
              </CTAButton>
            </FadeInView>
          </Box>
        </ContentArea>
      </Container>

      {/* Calendly Widget (Lazy Loaded with Error Boundary) */}
      <ErrorBoundary fallback={<div>Calendly could not be loaded. Please try again.</div>}>
        {isCalendlyOpen && (
          <Suspense fallback={calendlyLoadingFallback}>
            <CalendlyBooking
              isOpen={isCalendlyOpen}
              onClose={handleCloseCalendly}
              eventTypeUrl="https://calendly.com/glustack/strategy-session"
              prefill={{ name: "", email: "" }}
            />
          </Suspense>
        )}
      </ErrorBoundary>
    </Section>
  );
};

export default HeroSection;