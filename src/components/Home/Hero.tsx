"use client";
import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from "react";
import { Box, Typography, Button, Container, alpha, Grid, Paper, Stack, Chip } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"; // Added useTheme
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, TrendingUp, DollarSign, Users, Calendar, ChevronRight, Clock } from "lucide-react";
import { SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiGooglecloud } from "react-icons/si";

const CalendlyBooking = lazy(() => import('../CalendlyBooking'));

// ErrorBoundary (remains the same)
interface ErrorBoundaryProps { children: React.ReactNode; fallback?: React.ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void { console.error("Error caught:", error, errorInfo); }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Box sx={{ p: 3, textAlign: 'center', color: '#fff' }}>
          <Typography>Something went wrong.</Typography>
          <Button sx={{ mt: 2, color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} variant="outlined" onClick={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

// Styles and theme constants (remains the same)
const styles = {
  gradients: { primary: "linear-gradient(135deg, #6366F1, #8B5CF6)", secondary: "linear-gradient(135deg, #A78BFA, #6366F1)", accent1: "linear-gradient(135deg, #F97316, #EC4899)", accent2: "linear-gradient(135deg, #14B8A6, #0EA5E9)" },
  colors: { primary: "#6366F1", primaryHover: "#5457EF", text: "#fff", textSecondary: "rgba(255,255,255,0.85)" },
  shadows: { primary: "0 4px 14px rgba(99, 102, 241, 0.4)", hover: "0 6px 20px rgba(99, 102, 241, 0.5)", card: "0 4px 24px rgba(0, 0, 0, 0.1)" },
  animations: { short: "all 0.2s ease", medium: "all 0.25s ease" },
  spacing: { section: 8 }
};

// Animation
const fadeVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
  componentStyle?: React.CSSProperties; // Allow passing custom styles
}
const FadeInView: React.FC<FadeInViewProps> = ({ children, delay = 0, once = false, componentStyle }) => (
  <motion.div
    initial="hidden"
    animate={!once ? "visible" : undefined}
    whileInView={once ? "visible" : undefined}
    viewport={once ? { once: true } : undefined}
    variants={fadeVariants}
    transition={{ delay }}
    style={{ width: "100%", ...componentStyle }} // Default to width 100%, allow other styles to be passed/overridden
  >
    {children}
  </motion.div>
);

// Styled components
const Section = styled(Box)(({ theme }) => ({
  position: "relative", display: "flex", alignItems: "center",
  paddingTop: theme.spacing(styles.spacing.section), // Ensure top padding
  paddingBottom: theme.spacing(styles.spacing.section), // Ensure bottom padding
  overflow: "hidden",
  minHeight: "80vh", // Adjusted minHeight for better adaptability
  [theme.breakpoints.up("md")]: { minHeight: "95vh" }
}));

const BgOverlay = styled(Box)({ /* ... (remains the same) ... */
  position: "absolute", inset: 0, zIndex: 1, mixBlendMode: "multiply",
  background: `radial-gradient(ellipse at center, ${alpha("#1a3674", 0.97)} 0%, ${alpha("#1a3674", 0.85)} 70%, ${alpha("#1a3674", 0.97)} 100%)`,
});

const ContentArea = styled(Box)(({theme}) => ({ // Added theme
  position: "relative", zIndex: 3, width: "100%",
  paddingTop: theme.spacing(6), // Default top padding for ContentArea
  paddingBottom: theme.spacing(6), // Default bottom padding
  [theme.breakpoints.down("sm")]: { // Mobile specific padding for ContentArea
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(2rem, 6vw, 3rem)", // Responsive font size
  lineHeight: 1.2, fontWeight: 700, color: styles.colors.text, textAlign: "center",
  margin: "0 auto", // Centering the headline block
  marginBottom: theme.spacing(2), // Spacing below headline
  maxWidth: 900,
}));

const Subheadline = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1rem, 3.5vw, 1.125rem)", // Responsive font size
  fontWeight: 400, color: styles.colors.textSecondary, textAlign: "center",
  margin: "0 auto", // Centering the subheadline block
  // maxWidth will be controlled by its parent Stack or sx prop for finer control
}));

const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'secondary'
})<{ secondary?: boolean }>(({ theme, secondary }) => ({
  color: styles.colors.text,
  fontWeight: 600,
  borderRadius: 8,
  textTransform: "none",
  padding: theme.spacing(1.25, 2.5), // Adjusted padding for better mobile fit
  fontSize: "0.9rem", // Slightly smaller base font for mobile
  width: '100%', // Mobile first: buttons are full width
  maxWidth: { xs: '320px', sm: 'none' }, // Max width for buttons on mobile, centered by Stack
  [theme.breakpoints.up('sm')]: {
    width: 'auto', // Auto width for larger screens
    fontSize: "1rem", // Restore font size
    padding: theme.spacing(1.5, 3), // Restore padding
  },
  backgroundColor: secondary ? "transparent" : styles.colors.primary,
  border: secondary ? `1.5px solid ${alpha(styles.colors.text, 0.75)}` : "none", // Adjusted border color
  boxShadow: secondary ? "none" : styles.shadows.primary,
  transition: styles.animations.short,
  "&:hover": {
    backgroundColor: secondary ? alpha(styles.colors.text, 0.12) : styles.colors.primaryHover,
    transform: "translateY(-2px)",
    boxShadow: secondary ? "none" : styles.shadows.hover,
    borderColor: secondary ? styles.colors.text : 'none', // Hover border for secondary
  }
}));

const OfferChip = styled(Chip)(({theme}) => ({ // Added theme
  height: 'auto', // Auto height for text wrapping if needed
  padding: theme.spacing(0.75, 1.5),
  backgroundColor: alpha(styles.colors.primary, 0.18), // Adjusted alpha
  color: styles.colors.text,
  fontWeight: 600,
  fontSize: '0.875rem', // Responsive font size
  border: `1px solid ${alpha(styles.colors.primary, 0.4)}`, // Adjusted border
  boxShadow: "0 4px 10px rgba(99, 102, 241, 0.16)",
  '& .MuiChip-icon': { color: alpha(styles.colors.text, 0.97), fontSize: '1.1rem' },
  '& .MuiChip-label': {
    whiteSpace: 'normal', // Allow label to wrap
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  }
}));

const PersonaButton = styled(Button, { /* ... (remains the same) ... */
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.02em", borderRadius: 12, transition: styles.animations.medium, padding: theme.spacing(0.9, 2.5), minWidth: 110,
  ...(active
    ? { background: styles.gradients.primary, boxShadow: styles.shadows.primary, color: styles.colors.text, "&:hover": { background: styles.gradients.primary, filter: "brightness(1.05)" } }
    : { background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: alpha(styles.colors.text, 0.9), "&:hover": { background: "rgba(255, 255, 255, 0.15)", transform: "translateY(-1px)", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" } })
}));

const BenefitCard = styled(Paper)(({ theme }) => ({ /* ... (ensure width: 100% as before) ... */
  padding: theme.spacing(3.5),
  borderRadius: 16,
  width: "100%",
  height: "100%",
  minHeight: 220,
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
    border: "1px solid rgba(255, 255, 255, 0.1)"
  }
}));
const IconCircle = styled(Box)({ /* ... (remains the same) ... */
  width: 60, height: 60, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 20,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)", border: "1px solid rgba(255, 255, 255, 0.15)"
});

// Data structure (remains the same)
interface PersonaData { headline: string; subheadline: string; benefits: string[]; }
interface Benefit { icon: React.ReactNode; text: string; subtext: string; gradient: string; }
interface TechStack { icon: React.ComponentType; name: string; color: string; }
interface DataStructure { personas: { [key: string]: PersonaData; }; benefits: Benefit[]; techStack: TechStack[]; successIndicators: string[]; }
const DATA: DataStructure = { /* ... (data remains the same) ... */
  personas: {
    developer: { headline: "Enterprise Solutions Delivered 10× Faster", subheadline: "Accelerate development with meticulously crafted enterprise-grade architectures", benefits: ["CI/CD Pipeline Integration", "Microservices Architecture", "Containerization", "Infrastructure as Code"] },
    executive: { headline: "Enterprise Solutions with 47% Cost Reduction", subheadline: "Optimize technology investments with precision-engineered enterprise solutions", benefits: ["TCO Optimization", "Automated Workflows", "Resource Optimization", "Reduced Maintenance"] },
    security: { headline: "Enterprise Solutions with Enterprise-Grade Security", subheadline: "Deploy secure enterprise solutions with comprehensive protection built from first principles", benefits: ["SOC 2 Type II Compliance", "Data Encryption", "Security Scanning", "Role-Based Access"] }
  },
  benefits: [
    { icon: <TrendingUp size={22} strokeWidth={1.5} />, text: "73% Faster Deployment", subtext: "From concept to production in weeks", gradient: styles.gradients.primary },
    { icon: <ShieldCheck size={22} strokeWidth={1.5} />, text: "Enterprise Security", subtext: "SOC 2, GDPR & ISO 27001 compliant", gradient: styles.gradients.accent1 },
    { icon: <DollarSign size={22} strokeWidth={1.5} />, text: "47% Cost Reduction", subtext: "Optimized infrastructure & reduced overhead", gradient: styles.gradients.accent2 },
    { icon: <Users size={22} strokeWidth={1.5} />, text: "99.99% Uptime SLA", subtext: "Built for enterprise-grade reliability", gradient: "linear-gradient(135deg, #8B5CF6, #6366F1)" }
  ],
  techStack: [ { icon: SiAmazonaws, name: "AWS", color: "#FF9900" }, { icon: SiMicrosoftazure, name: "Azure", color: "#0078D4" }, { icon: SiGooglecloud, name: "GCP", color: "#4285F4" }, { icon: SiDocker, name: "Docker", color: "#2496ED" }, { icon: SiKubernetes, name: "K8s", color: "#326CE5" }, { icon: SiTerraform, name: "Terraform", color: "#7B42BC" } ],
  successIndicators: [ "Used by leading FinTech companies", "Trusted by global Healthcare providers", "Chosen by innovative E-commerce platforms" ]
};


// Main Component
const HeroSection: React.FC = () => {
  const theme = useTheme(); // For accessing theme breakpoints
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>("executive");

  const validPersonas = useMemo(() => new Set(Object.keys(DATA.personas)), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlPersona = params.get("persona");
    let initialPersona = "executive";
    if (urlPersona && validPersonas.has(urlPersona)) {
      initialPersona = urlPersona;
    } else {
      const storedPersona = localStorage.getItem("userPersona");
      if (storedPersona && validPersonas.has(storedPersona)) {
        initialPersona = storedPersona;
      }
    }
    setSelectedPersona(initialPersona);
  }, [validPersonas]);

  useEffect(() => { localStorage.setItem("userPersona", selectedPersona); }, [selectedPersona]);

  const personaData = useMemo(() => DATA.personas[selectedPersona] || DATA.personas.executive, [selectedPersona]);

  const handleOpenCalendly = useCallback(() => setIsCalendlyOpen(true), []);
  const handleCloseCalendly = useCallback(() => setIsCalendlyOpen(false), []);
  const handleViewCaseStudies = useCallback(() => window.open("/case-studies", "_self"), []);
  const handleOpenCalculator = useCallback(() => window.open("/calculator", "_self"), []);
  
  // CTAButtonGroup now directly uses styled CTAButton which handles its own mobile width
  const CTAButtonGroup = useMemo(() => (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1.5, sm: 2.5 }} // Adjusted spacing
      alignItems="center" // Center buttons within the Stack, especially when in a row
      sx={{ width: "100%" }} // Let buttons define their own width via styled-component logic
    >
      <CTAButton onClick={handleOpenCalendly} endIcon={<Calendar size={16} strokeWidth={2} />} aria-label="Schedule your strategy session">
        Schedule Strategy Session
      </CTAButton>
      <CTAButton onClick={handleViewCaseStudies} endIcon={<ChevronRight size={16} strokeWidth={2} />} secondary aria-label="View case studies">
        View Case Studies
      </CTAButton>
    </Stack>
  ), [handleOpenCalendly, handleViewCaseStudies]);

  return (
    <Section>
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <Image src="/images/istockphoto-realhero.jpg" alt="Enterprise technology background" layout="fill" objectFit="cover" priority style={{ filter: "saturate(1.1) brightness(0.75)", opacity: 0.95 }} quality={95}/>
      </Box>
      <BgOverlay />
      <Container maxWidth="lg"> {/* Container helps with max width and centering on large screens */}
        <ContentArea>
          {/* Main content block for hero text and primary CTAs */}
          <FadeInView componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Headline>
              Enterprise Solutions with <Box component="span" sx={{ background: styles.gradients.secondary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: styles.colors.primary, textShadow: "0 2px 10px rgba(139, 92, 246, 0.3)" }}>47% Cost Reduction</Box>
            </Headline>

            {/* Stack for Subheadline, OfferChip, and CTA Buttons for better mobile layout and centering */}
            <Stack
              spacing={{ xs: 2.5, sm: 3.5 }} // Control spacing between these elements
              alignItems="center" // Center items within this stack
              sx={{ 
                width: '100%', 
                mt: {xs: 1, sm: 0}, // Margin top to separate from headline
                mb: { xs: 4, sm: 5 }  // Overall margin bottom for this block
              }}
            >
              <Subheadline sx={{ maxWidth: { xs: '100%', sm: '90%', md: 760 } }}>
                {personaData.subheadline}
              </Subheadline>
              
              <OfferChip
                icon={<Clock size={18} strokeWidth={2} />} // Slightly larger icon
                label="Limited Time: Free Strategy Sessions" // Slightly shortened for mobile
              />
              
              {CTAButtonGroup}
            </Stack>
          </FadeInView>

          {/* Persona Selector */}
          <FadeInView delay={0.1} componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{ 
                width: '100%',
                maxWidth: {xs: '100%', sm: 'max-content'}, // Allow it to be wider on sm+
                mb: { xs: 4, sm: 5 },
                display: "flex", flexDirection: { xs: "column", sm: "row" },
                alignItems: "center", justifyContent: "center",
                p: {xs: 1.5, sm: 2},
                borderRadius: 3,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)" 
            }}>
              <Typography 
                sx={{ 
                  color: "rgba(255,255,255,0.9)", fontSize: "0.925rem", fontWeight: 500, 
                  mr: { xs: 0, sm: 2.5 }, mb: { xs: 1.5, sm: 0 },
                  textAlign: {xs: 'center', sm: 'left'}
                }}
              >
                I am a:
              </Typography>
              <Stack 
                direction="row" 
                spacing={{xs: 1, sm: 1.5}}
                sx={{ flexWrap: "wrap", justifyContent: "center" }} // Allow wrap for many personas on small screens
              >
                {Object.keys(DATA.personas).map((p) => (
                  <PersonaButton key={p} active={selectedPersona === p} onClick={() => setSelectedPersona(p)} aria-checked={selectedPersona === p} role="radio">
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </PersonaButton>
                ))}
              </Stack>
            </Box>
          </FadeInView>

          {/* Benefits Grid (FadeInView usage here for individual cards is different) */}
          <Box sx={{ mb: { xs: 4, sm: 6 } }}>
            <Typography variant="h3" sx={{ fontSize: "clamp(1.25rem, 5vw, 1.625rem)", textAlign: "center", color: "white", mb: {xs: 3, sm: 4}, fontWeight: 600, position: "relative", display: "inline-block", left: "50%", transform: "translateX(-50%)", "&::after": { content: '""', position: "absolute", bottom: -10, left: "25%", width: "50%", height: 3, borderRadius: 2, background: styles.gradients.primary } }}>
              Why Organizations Choose Our Solutions
            </Typography>
            <Grid container spacing={{xs: 2, sm: 3}} sx={{ alignItems: "stretch" }}>
              {DATA.benefits.map((b, i) => (
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: "flex" }}>
                  {/* This FadeInView is for a single BenefitCard, so display:flex and height:100% is appropriate */}
                  <FadeInView delay={i * 0.1} once componentStyle={{ display: 'flex', width: '100%', height: '100%' }}>
                    <BenefitCard>
                      <IconCircle sx={{ background: b.gradient }}>{b.icon}</IconCircle>
                      <Typography sx={{ fontWeight: 600, color: "#fff", mb: 1.5, fontSize: "1.125rem", lineHeight: 1.3 }}>{b.text}</Typography>
                      <Typography sx={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", flexGrow: 1 }}>{b.subtext}</Typography>
                    </BenefitCard>
                  </FadeInView>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Calculator Section */}
          <FadeInView once componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box 
              sx={{
                width: '100%',
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(to bottom, rgba(99, 102, 241, 0.12), rgba(99, 102, 241, 0.06))",
                p: {xs: 3, sm: 4.5}, borderRadius: 3, border: "1px solid rgba(99, 102, 241, 0.25)",
                mb: { xs: 4, sm: 6 }, boxShadow: "0 8px 32px rgba(99, 102, 241, 0.1)"
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <DollarSign size={22} color={styles.colors.primary} strokeWidth={2} />
                <Typography variant="h6" color={styles.colors.primary} fontWeight={600} sx={{fontSize: "clamp(1.1rem, 4vw, 1.25rem)"}}>
                    Calculate Potential Savings
                </Typography>
              </Stack>
              <Typography sx={{ color: "rgba(255,255,255,0.9)", maxWidth: 600, mx: "auto", fontSize: "clamp(0.875rem, 3vw, 0.95rem)", textAlign: "center", mb: 3.5, lineHeight: 1.6 }}>
                Our solutions typically reduce development costs by 30-50%. See how much your organization could save.
              </Typography>
              <Button 
                variant="contained"
                color="primary" 
                sx={{ 
                  bgcolor: styles.colors.primary, 
                  "&:hover": { bgcolor: styles.colors.primaryHover, transform: "translateY(-2px)" },
                  borderRadius: 2, boxShadow: styles.shadows.primary, px: {xs:3, sm:4}, py: 1.25, fontWeight: 600, 
                  fontSize: "clamp(0.875rem, 3vw, 0.925rem)", transition: "all 0.2s ease"
                }}
                onClick={handleOpenCalculator}
              >
                Open Savings Calculator
              </Button>
            </Box>
          </FadeInView>

          {/* Final CTA */}
          <FadeInView once componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{ 
                width: '100%', textAlign: "center", 
                pt: {xs: 3, sm: 4}, pb: {xs: 1, sm: 2}, mb: 2, 
                p: {xs: 2, sm:3}, borderRadius: 4, 
                background: "linear-gradient(to bottom, rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.02))" 
            }}>
              <Typography sx={{ color: "#fff", fontSize: "clamp(1.25rem, 5vw, 1.625rem)", fontWeight: 700, mb: 3, maxWidth: 700, mx: "auto", lineHeight: 1.3 }}>
                Ready to transform your enterprise technology?
              </Typography>
              <CTAButton onClick={handleOpenCalendly} endIcon={<Calendar size={16} strokeWidth={2} />} aria-label="Schedule your strategy session" sx={{ px: {xs:3, sm:4}, py: 1.5, fontSize: "clamp(0.9rem, 3.5vw, 1rem)" }}>
                Schedule Strategy Session
              </CTAButton>
            </Box>
          </FadeInView>
        </ContentArea>
      </Container>

      {/* Calendly Widget */}
      <ErrorBoundary fallback={<div>Calendly could not be loaded. Please try again.</div>}>
        {isCalendlyOpen && (
          <Suspense fallback={ <Box sx={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.75)", zIndex: 9999 }}> <Typography color="white">Loading booking system...</Typography> </Box> }>
            <CalendlyBooking key={`calendly-${Date.now()}`} isOpen={isCalendlyOpen} onClose={handleCloseCalendly} eventTypeUrl="https://calendly.com/glustack/strategy-session" prefill={{ name: "", email: "" }} />
          </Suspense>
        )}
      </ErrorBoundary>
    </Section>
  );
};

export default HeroSection;