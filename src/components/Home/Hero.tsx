"use client";
import React, { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import dynamic from 'next/dynamic';
import { Box, Typography, Button, Container, alpha, Grid, Paper, Stack, Chip, Theme, CircularProgress, TypographyProps } from "@mui/material";
import { styled, useTheme, SxProps } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import { ShieldCheck, TrendingUp, DollarSign, Users, Calendar, ChevronRight, Clock } from "lucide-react";
import { SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiGooglecloud } from "react-icons/si";

// IMPORT the CalendlyBooking component using next/dynamic for client-side only rendering
// Ensure this path is correct: ../Calendly/CalendlyBooking.tsx
const CalendlyBooking = dynamic(() => import('../CalendlyBooking'), {
  ssr: false,
  loading: () => (
    <Box sx={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column', gap: 2, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 10000 }}>
      <CircularProgress sx={{color: styles.colors.primary}} />
      <Typography color="white" variant="h6">Loading Scheduler...</Typography>
    </Box>
  )
});

// ErrorBoundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Box sx={{ p: 3, textAlign: 'center', color: '#fff', background: 'rgba(0,0,0,0.7)', borderRadius: 2, m: 2 }}>
          <Typography variant="h6">Oops! Something went wrong.</Typography>
          <Typography>The booking module could not be loaded.</Typography>
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

// Styles and theme constants
const styles = {
  gradients: {
    primary: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    secondary: "linear-gradient(135deg, #A78BFA, #6366F1)",
    accent1: "linear-gradient(135deg, #F97316, #EC4899)",
    accent2: "linear-gradient(135deg, #14B8A6, #0EA5E9)"
  },
  colors: {
    primary: "#6366F1",
    primaryHover: "#5457EF",
    text: "#fff",
    textSecondary: "rgba(255,255,255,0.85)"
  },
  shadows: {
    primary: "0 4px 14px rgba(99, 102, 241, 0.4)",
    hover: "0 6px 20px rgba(99, 102, 241, 0.5)",
    card: "0 4px 24px rgba(0, 0, 0, 0.1)"
  },
  animations: {
    short: "all 0.2s ease",
    medium: "all 0.25s ease"
  },
  spacing: {
    section: 8
  }
};

// Animation
const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
  componentStyle?: React.CSSProperties;
}

const FadeInView: React.FC<FadeInViewProps> = ({ children, delay = 0, once = false, componentStyle }) => (
  <motion.div
    initial="hidden"
    animate={!once ? "visible" : undefined}
    whileInView={once ? "visible" : undefined}
    viewport={once ? { once: true } : undefined}
    variants={fadeVariants}
    transition={{ delay }}
    style={{ width: "100%", ...componentStyle }}
  >
    {children}
  </motion.div>
);

// Styled components
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(styles.spacing.section),
  paddingBottom: theme.spacing(styles.spacing.section),
  overflow: "hidden",
  minHeight: "80vh",
  [theme.breakpoints.up("md")]: {
    minHeight: "95vh"
  }
}));

const BgOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  mixBlendMode: "multiply",
  background: `radial-gradient(ellipse at center, ${alpha("#1a3674", 0.97)} 0%, ${alpha("#1a3674", 0.85)} 70%, ${alpha("#1a3674", 0.97)} 100%)`,
});

const ContentArea = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 3,
  width: "100%",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

const Headline = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "clamp(2rem, 6vw, 3rem)",
  lineHeight: 1.2,
  fontWeight: 700,
  color: styles.colors.text,
  textAlign: "center",
  margin: "0 auto",
  marginBottom: theme.spacing(2),
  maxWidth: 900,
}));

const Subheadline = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "clamp(1rem, 3.5vw, 1.125rem)",
  fontWeight: 400,
  color: styles.colors.textSecondary,
  textAlign: "center",
  margin: "0 auto",
}));

const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'secondary' && prop !== 'theme'
})<{ secondary?: boolean; theme?: Theme }>(({ theme, secondary }) => ({
  color: styles.colors.text,
  fontWeight: 600,
  borderRadius: 8,
  textTransform: "none",
  transition: styles.animations.short,
  backgroundColor: secondary ? "transparent" : styles.colors.primary,
  border: secondary ? `1.5px solid ${alpha(styles.colors.text, 0.75)}` : "none",
  boxShadow: secondary ? "none" : styles.shadows.primary,
  width: '100%',
  maxWidth: '320px',
  padding: theme.spacing(1.25, 2),
  fontSize: "0.9rem",
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    maxWidth: 'none',
    padding: theme.spacing(1.5, 3),
    fontSize: "1rem",
  },
  "&:hover": {
    backgroundColor: secondary ? alpha(styles.colors.text, 0.12) : styles.colors.primaryHover,
    transform: "translateY(-2px)",
    boxShadow: secondary ? "none" : styles.shadows.hover,
    borderColor: secondary ? styles.colors.text : 'none',
  }
}));

const OfferChip = styled(Chip)(({ theme }) => ({
  height: 'auto',
  padding: theme.spacing(0.75, 1.5),
  backgroundColor: alpha(styles.colors.primary, 0.18),
  color: styles.colors.text,
  fontWeight: 600,
  fontSize: '0.875rem',
  border: `1px solid ${alpha(styles.colors.primary, 0.4)}`,
  boxShadow: "0 4px 10px rgba(99, 102, 241, 0.16)",
  '& .MuiChip-icon': {
    color: alpha(styles.colors.text, 0.97),
    fontSize: '1.1rem'
  },
  '& .MuiChip-label': {
    whiteSpace: 'normal',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  }
}));

const PersonaButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== 'theme'
})<{ active?: boolean; theme?: Theme }>(({ theme, active }) => ({
  fontSize: "0.875rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
  borderRadius: 12,
  transition: styles.animations.medium,
  padding: theme.spacing(0.9, 2.5),
  minWidth: 110,
  ...(active
    ? {
        background: styles.gradients.primary,
        boxShadow: styles.shadows.primary,
        color: styles.colors.text,
        "&:hover": {
          background: styles.gradients.primary,
          filter: "brightness(1.05)"
        }
      }
    : {
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: alpha(styles.colors.text, 0.9),
        "&:hover": {
          background: "rgba(255, 255, 255, 0.15)",
          transform: "translateY(-1px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
        }
      })
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
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

const IconCircle = styled(Box)({
  width: 60,
  height: 60,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.15)"
});

// Data structure
interface PersonaData {
  headline: string;
  subheadline: string;
  benefits: string[];
  metaTitle: string;
  metaDescription: string;
}
interface Benefit {
  icon: React.ReactNode;
  text: string;
  subtext: string;
  gradient: string;
}
interface TechStackItem {
  icon: React.ComponentType<any>;
  name: string;
  color: string;
}
interface DataStructure {
  personas: { [key: string]: PersonaData; };
  benefits: Benefit[];
  techStack: TechStackItem[];
  successIndicators: string[];
}

const DATA: DataStructure = {
  personas: {
    developer: {
      headline: "Enterprise Solutions Delivered 10× Faster",
      subheadline: "Accelerate development with meticulously crafted enterprise-grade architectures and pre-built modules for peak performance.",
      benefits: ["CI/CD Pipeline Integration", "Microservices Architecture", "Containerization & Orchestration", "Infrastructure as Code (IaC)"],
      metaTitle: "Faster Enterprise Solutions for Developers | GluStack",
      metaDescription: "Discover how GluStack helps developers deliver enterprise solutions 10x faster with advanced architectures and tools. Schedule a demo!"
    },
    executive: {
      headline: "Enterprise Solutions with 33% Cost Reduction",
      subheadline: "Optimize technology investments and drive operational efficiency with our precision-engineered enterprise solutions for executives.",
      benefits: ["Total Cost of Ownership (TCO) Optimization", "Automated Business Workflows", "Cloud Resource Optimization", "Reduced Long-term Maintenance"],
      metaTitle: "Reduce Costs with Enterprise Solutions for Executives | GluStack",
      metaDescription: "Achieve significant cost reduction (avg. 33%) and boost efficiency with GluStack's enterprise solutions tailored for executives. Book a strategy call."
    },
    security: {
      headline: "Enterprise Solutions with Fortified Security",
      subheadline: "Deploy highly secure enterprise solutions with comprehensive protection, ensuring compliance and data integrity for security professionals.",
      benefits: ["SOC 2 Type II & ISO 27001 Ready", "End-to-End Data Encryption", "Automated Security Scanning & Pen Testing", "Granular Role-Based Access Control (RBAC)"],
      metaTitle: "Fortified Security in Enterprise Solutions | GluStack",
      metaDescription: "Secure your enterprise with GluStack's solutions, featuring SOC 2 readiness, data encryption, and robust access controls. Learn more."
    }
  },
  benefits: [
    { icon: <TrendingUp size={22} strokeWidth={1.5} />, text: "73% Faster Deployment", subtext: "From concept to production in weeks, not months.", gradient: styles.gradients.primary },
    { icon: <ShieldCheck size={22} strokeWidth={1.5} />, text: "Enterprise-Grade Security", subtext: "SOC 2, GDPR & ISO 27001 compliant solutions.", gradient: styles.gradients.accent1 },
    { icon: <DollarSign size={22} strokeWidth={1.5} />, text: "47% Average Cost Reduction", subtext: "Optimized infrastructure and reduced operational overhead.", gradient: styles.gradients.accent2 },
    { icon: <Users size={22} strokeWidth={1.5} />, text: "99.99% Uptime SLA", subtext: "Built for mission-critical enterprise reliability.", gradient: "linear-gradient(135deg, #8B5CF6, #6366F1)" }
  ],
  techStack: [
    { icon: SiAmazonaws, name: "AWS", color: "#FF9900" },
    { icon: SiMicrosoftazure, name: "Azure", color: "#0078D4" },
    { icon: SiGooglecloud, name: "GCP", color: "#4285F4" },
    { icon: SiDocker, name: "Docker", color: "#2496ED" },
    { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5" },
    { icon: SiTerraform, name: "Terraform", color: "#7B42BC" }
  ],
  successIndicators: [
    "Used by leading FinTech companies globally",
    "Trusted by major Healthcare providers for critical systems",
    "Chosen by innovative E-commerce platforms for scalability"
  ]
};

// Main Component (HeroSection)
const HeroSection: React.FC = () => {
  const theme = useTheme();
  // Consistent state variable name for modal visibility
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>("executive");
  const [currentUserEmail, setCurrentUserEmail] = useState<string | undefined>(undefined);
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(undefined);

  // Use the event link part from your error message for this example
  const YOUR_CALENDLY_EVENT_LINK_PART = "glustack/consultation";
  const YOUR_COMPANY_NAME_FOR_SEO = "GluStack";

  const validPersonas = useMemo(() => new Set(Object.keys(DATA.personas)), []);

  useEffect(() => {
    setTimeout(() => {
        setCurrentUserEmail("testuser@example.com"); // Replace with actual user data logic
        setCurrentUserName("Test User"); // Replace with actual user data logic
    }, 1000);

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

  useEffect(() => {
    localStorage.setItem("userPersona", selectedPersona);
  }, [selectedPersona]);

  const personaData = useMemo(() => DATA.personas[selectedPersona] || DATA.personas.executive, [selectedPersona]);

  // Consistent handler names
  const handleOpenCalendlyModal = useCallback(() => setIsCalendlyModalOpen(true), []);
  const handleCloseCalendlyModal = useCallback(() => setIsCalendlyModalOpen(false), []);

  const handleViewCaseStudies = useCallback(() => window.open("/solutions", "_self"), []);
  const handleOpenCalculator = useCallback(() => window.open("/calculator", "_self"), []);

  const CTAButtonGroup = useMemo(() => (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1.5, sm: 2.5 }}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      <CTAButton onClick={handleOpenCalendlyModal} endIcon={<Calendar size={16} strokeWidth={2} />} aria-label="Schedule your strategy session">
        Schedule Strategy Session
      </CTAButton>
      <CTAButton onClick={handleViewCaseStudies} endIcon={<ChevronRight size={16} strokeWidth={2} />} secondary aria-label="View case studies">
        View Case Studies
      </CTAButton>
    </Stack>
  ), [handleOpenCalendlyModal, handleViewCaseStudies]);

  const headlineParts = personaData.headline.split(" with ");
  const headlinePrefix = headlineParts[0];
  const headlineSuffix = headlineParts.length > 1 ? ` with ${headlineParts.slice(1).join(" with ")}` : "";
  const suffixWords = headlineSuffix.split(" ");
  const headlineHighlight = suffixWords.length > 1 ? suffixWords.slice(-2).join(" ") : (suffixWords[0] || "");
  const headlineSuffixMain = headlineSuffix.replace(headlineHighlight, "").trim();

  return (
    <Section>
      <Head>
        <title>{personaData.metaTitle.replace("YourCompanyName", YOUR_COMPANY_NAME_FOR_SEO)}</title>
        <meta name="description" content={personaData.metaDescription.replace("YourCompanyName", YOUR_COMPANY_NAME_FOR_SEO)} />
        <meta property="og:title" content={personaData.metaTitle.replace("YourCompanyName", YOUR_COMPANY_NAME_FOR_SEO)} />
        <meta property="og:description" content={personaData.metaDescription.replace("YourCompanyName", YOUR_COMPANY_NAME_FOR_SEO)} />
        <meta property="og:image" content="/images/og-hero-image.jpg" />
        <meta property="og:url" content={`https://yourwebsite.com/hero?persona=${selectedPersona}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://yourwebsite.com/hero?persona=${selectedPersona}`} />
      </Head>

      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <Image
            src="/images/istockphoto-realhero.jpg"
            alt={`Abstract background for ${personaData.headline} - ${YOUR_COMPANY_NAME_FOR_SEO}`}
            layout="fill"
            objectFit="cover"
            priority
            style={{ filter: "saturate(1.1) brightness(0.75)", opacity: 0.95 }}
            quality={95}
            unoptimized={process.env.NODE_ENV === 'development'}
        />
      </Box>
      <BgOverlay />
      <Container maxWidth="lg">
        <ContentArea>
          <FadeInView componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Headline component="h1">
              {headlinePrefix}
              {headlineSuffixMain && (
                <>{headlineSuffixMain} </>
              )}
              <Box component="span" sx={{ background: styles.gradients.secondary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: styles.colors.primary, textShadow: "0 2px 10px rgba(139, 92, 246, 0.3)" }}>
                {headlineHighlight || "Key Benefits"}
              </Box>
            </Headline>
            <Stack spacing={{ xs: 2.5, sm: 3.5 }} alignItems="center" sx={{ width: '100%', mt: {xs: 1, sm: 0}, mb: { xs: 4, sm: 5 } }}>
              <Subheadline component="h2">
                {personaData.subheadline}
              </Subheadline>
              <OfferChip icon={<Clock size={18} strokeWidth={2} />} label="Limited Time: Free Strategy Sessions Available" />
              {CTAButtonGroup}
            </Stack>
          </FadeInView>

           <FadeInView delay={0.1} once componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{
                width: '100%',
                maxWidth: {xs: '100%', sm: 'max-content'},
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
                sx={{ flexWrap: "wrap", justifyContent: "center" }}
              >
                {Object.keys(DATA.personas).map((p) => (
                  <PersonaButton key={p} active={selectedPersona === p} onClick={() => setSelectedPersona(p)} aria-checked={selectedPersona === p} role="radio">
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </PersonaButton>
                ))}
              </Stack>
            </Box>
          </FadeInView>

          <Box sx={{ mb: { xs: 4, sm: 6 } }}>
            <Typography variant="h2" component="h2" sx={{ fontSize: "clamp(1.25rem, 5vw, 1.625rem)", textAlign: "center", color: "white", mb: {xs: 3, sm: 4}, fontWeight: 600, position: "relative", display: "inline-block", left: "50%", transform: "translateX(-50%)", "&::after": { content: '""', position: "absolute", bottom: -10, left: "25%", width: "50%", height: 3, borderRadius: 2, background: styles.gradients.primary } }}>
              Why Organizations Choose Our Solutions
            </Typography>
            <Grid container spacing={{xs: 2, sm: 3}} sx={{ alignItems: "stretch" }}>
              {DATA.benefits.map((b, i) => (
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: "flex" }}>
                  <FadeInView delay={i * 0.1} once componentStyle={{ display: 'flex', width: '100%', height: '100%' }}>
                    <BenefitCard>
                      <IconCircle sx={{ background: b.gradient }}>{b.icon}</IconCircle>
                      <Typography variant="h3" component="h3" sx={{ fontWeight: 600, color: "#fff", mb: 1.5, fontSize: "1.125rem", lineHeight: 1.3 }}>{b.text}</Typography>
                      <Typography sx={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", flexGrow: 1 }}>{b.subtext}</Typography>
                    </BenefitCard>
                  </FadeInView>
                </Grid>
              ))}
            </Grid>
          </Box>

          <FadeInView once delay={0.2} componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom, rgba(99, 102, 241, 0.12), rgba(99, 102, 241, 0.06))", p: {xs: 3, sm: 4.5}, borderRadius: 3, border: "1px solid rgba(99, 102, 241, 0.25)", mb: { xs: 4, sm: 6 }, boxShadow: "0 8px 32px rgba(99, 102, 241, 0.1)" }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <DollarSign size={22} color={styles.colors.primary} strokeWidth={2} />
                <Typography variant="h3" component="h3" color={styles.colors.primary} fontWeight={600} sx={{fontSize: "clamp(1.1rem, 4vw, 1.25rem)"}}>
                    Calculate Potential Savings
                </Typography>
              </Stack>
              <Typography sx={{ color: "rgba(255,255,255,0.9)", maxWidth: 600, mx: "auto", fontSize: "clamp(0.875rem, 3vw, 0.95rem)", textAlign: "center", mb: 3.5, lineHeight: 1.6 }}>
                Our solutions typically reduce development costs by 30-50% and accelerate time-to-market. See how much your organization could save.
              </Typography>
              <Button variant="contained" color="primary" sx={{ bgcolor: styles.colors.primary, "&:hover": { bgcolor: styles.colors.primaryHover, transform: "translateY(-2px)" }, borderRadius: 2, boxShadow: styles.shadows.primary, px: {xs:3, sm:4}, py: 1.25, fontWeight: 600, fontSize: "clamp(0.875rem, 3vw, 0.925rem)", transition: "all 0.2s ease" }} onClick={handleOpenCalculator}>
                Open Savings Calculator
              </Button>
            </Box>
          </FadeInView>

          <FadeInView once delay={0.3} componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{ width: '100%', textAlign: "center", pt: {xs: 3, sm: 4}, pb: {xs: 1, sm: 2}, mb: 2, p: {xs: 2, sm:3}, borderRadius: 4, background: "linear-gradient(to bottom, rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.02))" }}>
              <Typography variant="h2" component="h2" sx={{ color: "#fff", fontSize: "clamp(1.25rem, 5vw, 1.625rem)", fontWeight: 700, mb: 3, maxWidth: 700, mx: "auto", lineHeight: 1.3 }}>
                Ready to Transform Your Enterprise Technology?
              </Typography>
              <CTAButton onClick={handleOpenCalendlyModal} endIcon={<Calendar size={16} strokeWidth={2} />} aria-label="Schedule your free strategy session" sx={{ px: {xs:3, sm:4}, py: 1.5, fontSize: "clamp(0.9rem, 3.5vw, 1rem)" }}>
                Schedule Free Strategy Session
              </CTAButton>
            </Box>
          </FadeInView>
        </ContentArea>
      </Container>

      <ErrorBoundary fallback={
        <Box sx={{ p:3, textAlign: 'center', color: '#fff', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6">Booking Unavailable</Typography>
          <Typography>The scheduling module could not be loaded. Please try again later or contact support.</Typography>
        </Box>
      }>
        <Suspense fallback={null}>
          {isCalendlyModalOpen && (
            <CalendlyBooking
              isOpen={isCalendlyModalOpen}
              onClose={handleCloseCalendlyModal}
              calendlyEventLink={YOUR_CALENDLY_EVENT_LINK_PART} // Correct prop name
              prefill={{
                email: currentUserEmail,
                name: currentUserName,
                customAnswers: {
                  a1: `Persona: ${selectedPersona}`,
                  a2: 'Source: Hero Section CTA'
                }
              }}
              pageSettings={{
                backgroundColor: '1a1a1a',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: styles.colors.primary.substring(1),
                textColor: 'ffffff'
              }}
              utm={{
                utmCampaign: `HeroSection_${selectedPersona}`,
                utmSource: 'Website',
                utmMedium: 'CalendlyModalCTA',
                utmContent: 'StrategySessionBooking'
              }}
            />
          )}
        </Suspense>
      </ErrorBoundary>
    </Section>
  );
};

export default HeroSection;
