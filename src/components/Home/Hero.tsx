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

// --- JONY IVE POLISH: Refined Loading State for Calendly ---
const CalendlyBooking = dynamic(() => import('../CalendlyBooking'), { // Ensure this path is correct
  ssr: false,
  loading: () => (
    <Box sx={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: 'column', gap: 2.5,
      backgroundColor: "rgba(10, 10, 25, 0.85)", // Slightly more refined dark overlay
      backdropFilter: "blur(8px)", // Subtle blur for depth
      zIndex: 10000
    }}>
      <CircularProgress sx={{ color: styles.colors.primary }} />
      <Typography sx={{
        fontFamily: styles.typography.fontFamily, // Consistent font
        color: styles.colors.text,
        fontSize: '1.1rem',
        fontWeight: 500,
      }}>
        Loading Scheduler...
      </Typography>
    </Box>
  )
});

// --- JONY IVE POLISH: Refined ErrorBoundary Fallback UI ---
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
        <Box sx={{
          p: 4, textAlign: 'center', color: styles.colors.text,
          background: 'rgba(20, 20, 40, 0.7)', borderRadius: 3, m: 2,
          fontFamily: styles.typography.fontFamily, // Consistent font
          border: `1px solid ${alpha(styles.colors.primary, 0.2)}`
        }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1.5, fontWeight: 600 }}>
            Scheduler Unavailable
          </Typography>
          <Typography sx={{ mb: 3, color: styles.colors.textSecondary, fontSize: '0.95rem' }}>
            The booking module could not be loaded at this moment. Please try again shortly.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => this.setState({ hasError: false })}
            sx={{
              color: styles.colors.text,
              borderColor: alpha(styles.colors.text, 0.5),
              textTransform: 'none',
              borderRadius: '8px',
              padding: '8px 20px',
              fontWeight: 500,
              transition: styles.animations.short,
              '&:hover': {
                borderColor: styles.colors.text,
                backgroundColor: alpha(styles.colors.text, 0.08)
              }
            }}
          >
            Try Again
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}


// --- JONY IVE POLISH: Refined Styles and Theme Constants ---
const styles = {
  gradients: { // Using fewer, more impactful gradients
    primary: "linear-gradient(135deg, #6366F1, #8B5CF6)", // Main brand gradient
    secondaryHighlight: "linear-gradient(135deg, #A78BFA, #6366F1)", // For text highlights
    subtleGlow: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))", // For subtle backgrounds
    benefitCard1: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    benefitCard2: "linear-gradient(135deg, #F97316, #EC4899)", // Accent
    benefitCard3: "linear-gradient(135deg, #14B8A6, #0EA5E9)", // Another Accent
    benefitCard4: "linear-gradient(135deg, #8B5CF6, #A78BFA)" // Variation of primary
  },
  colors: {
    primary: "#6366F1", // Main interactive color
    primaryHover: "#5457EF", // Darker for hover
    text: "#FFFFFF", // Pure white for clarity
    textSecondary: "rgba(255, 255, 255, 0.8)", // Slightly reduced opacity for secondary text
    backgroundDark: "#0A0A19", // Very dark blue/purple, for base background if image isn't full bleed
    subtleBorder: "rgba(255, 255, 255, 0.1)", // For faint borders on dark UI elements
  },
  shadows: { // Softer, more layered shadows
    primary: "0 4px 12px rgba(99, 102, 241, 0.3), 0 1px 3px rgba(99, 102, 241, 0.2)",
    hover: "0 6px 18px rgba(99, 102, 241, 0.35), 0 2px 6px rgba(99, 102, 241, 0.25)",
    card: "0 3px 8px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0,0,0,0.05)", // Subtle default card shadow
    cardHover: "0 8px 16px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0,0,0,0.08)", // Lifted card shadow
  },
  animations: { // Slightly more graceful timings
    short: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)", // MUI's standard easing
    medium: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  spacing: { // Define a base unit, e.g. 8px. Sections are multiples of this.
    baseUnit: 1, // Corresponds to theme.spacing(1) = 8px by default in MUI
    sectionVertical: 10, // theme.spacing(10) = 80px
    contentPadding: 3, // theme.spacing(3) = 24px
  },
  typography: { // Centralize font family
    fontFamily: "'SF Pro Display', 'Roboto', 'Helvetica Neue', Arial, sans-serif", // Added Arial as a generic fallback
    letterSpacings: {
      heading: '-0.01em', // Slight tightening for larger headings
      body: '0.005em',   // Normal to slightly open for body
    }
  }
};

// Animation
const fadeVariants = {
  hidden: { opacity: 0, y: 25 }, // Slightly increased y for a more noticeable entrance
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } // Slightly longer duration
};

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
  componentStyle?: React.CSSProperties;
}

const FadeInView: React.FC<FadeInViewProps> = ({ children, delay = 0, once = true, componentStyle }) => ( // Default once to true
  <motion.div
    initial="hidden"
    whileInView="visible" // Simplified: always use whileInView if once=true
    viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
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
  paddingTop: theme.spacing(styles.spacing.sectionVertical),
  paddingBottom: theme.spacing(styles.spacing.sectionVertical),
  overflow: "hidden",
  minHeight: "90vh", // Slightly less aggressive minHeight if content is dense
  fontFamily: styles.typography.fontFamily,
  [theme.breakpoints.up("md")]: {
    minHeight: "95vh"
  }
}));

// --- JONY IVE POLISH: Subtler Background Overlay ---
const BgOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  // Simpler gradient, less color, more focus on creating depth for text
  background: `linear-gradient(180deg, ${alpha(styles.colors.backgroundDark, 0.6)} 0%, ${alpha(styles.colors.backgroundDark, 0.85)} 60%, ${alpha(styles.colors.backgroundDark, 0.95)} 100%)`,
});

const ContentArea = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 3,
  width: "100%",
  paddingTop: theme.spacing(styles.spacing.contentPadding + 3), // More top padding
  paddingBottom: theme.spacing(styles.spacing.contentPadding + 3),
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(styles.spacing.contentPadding -1),
    paddingRight: theme.spacing(styles.spacing.contentPadding -1),
    paddingTop: theme.spacing(styles.spacing.contentPadding),
    paddingBottom: theme.spacing(styles.spacing.contentPadding),
  }
}));

const Headline = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "clamp(2.2rem, 6vw, 3.2rem)",
  lineHeight: 1.25,
  fontWeight: 700,
  color: styles.colors.text,
  textAlign: "center",
  margin: "0 auto",
  marginBottom: theme.spacing(2.5),
  maxWidth: 900,
  letterSpacing: styles.typography.letterSpacings.heading,
}));

const Subheadline = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "clamp(1rem, 3.5vw, 1.15rem)",
  fontWeight: 400,
  color: styles.colors.textSecondary,
  textAlign: "center",
  margin: "0 auto",
  maxWidth: 700,
  lineHeight: 1.6,
  letterSpacing: styles.typography.letterSpacings.body,
}));

const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'secondary' && prop !== 'theme'
})<{ secondary?: boolean; theme?: Theme }>(({ theme, secondary }) => ({
  color: styles.colors.text,
  fontFamily: styles.typography.fontFamily,
  fontWeight: 500,
  borderRadius: 10,
  textTransform: "none",
  transition: styles.animations.short,
  backgroundColor: secondary ? "transparent" : styles.colors.primary,
  border: secondary ? `1.5px solid ${styles.colors.subtleBorder}` : `1.5px solid ${styles.colors.primary}`,
  boxShadow: secondary ? "none" : styles.shadows.primary,
  width: '100%',
  padding: theme.spacing(1.35, 2.5),
  fontSize: "0.9rem",
  letterSpacing: '0.015em',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    padding: theme.spacing(1.6, 3.5),
    fontSize: "1rem",
  },
  "&:hover": {
    backgroundColor: secondary ? alpha(styles.colors.text, 0.08) : styles.colors.primaryHover,
    transform: "translateY(-3px) scale(1.02)",
    boxShadow: secondary ? `0 0 0 1.5px ${styles.colors.text}` : styles.shadows.hover,
    borderColor: secondary ? styles.colors.text : styles.colors.primaryHover,
  }
}));

const OfferChip = styled(Chip)(({ theme }) => ({
  height: 'auto',
  padding: theme.spacing(1, 1.75),
  fontFamily: styles.typography.fontFamily,
  backgroundColor: alpha(styles.colors.primary, 0.1),
  color: styles.colors.text,
  fontWeight: 500,
  fontSize: '0.85rem',
  border: `1px solid ${alpha(styles.colors.primary, 0.25)}`,
  boxShadow: `0 2px 8px ${alpha(styles.colors.primary, 0.1)}`,
  '& .MuiChip-icon': {
    color: alpha(styles.colors.text, 0.85),
    fontSize: '1rem',
    marginLeft: theme.spacing(0.5)
  },
  '& .MuiChip-label': {
    whiteSpace: 'normal',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  }
}));

const PersonaButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== 'theme'
})<{ active?: boolean; theme?: Theme }>(({ theme, active }) => ({
  fontSize: "0.85rem",
  fontFamily: styles.typography.fontFamily,
  fontWeight: 500,
  letterSpacing: "0.015em",
  borderRadius: 10,
  transition: styles.animations.medium,
  padding: theme.spacing(1, 2.25),
  minWidth: 100,
  ...(active
    ? {
        background: styles.gradients.primary,
        boxShadow: styles.shadows.primary,
        color: styles.colors.text,
        "&:hover": {
          background: styles.gradients.primary,
          filter: "brightness(1.1)",
        }
      }
    : {
        background: alpha(styles.colors.text, 0.05),
        border: `1px solid ${styles.colors.subtleBorder}`,
        color: styles.colors.textSecondary,
        "&:hover": {
          background: alpha(styles.colors.text, 0.1),
          borderColor: alpha(styles.colors.text, 0.3),
          transform: "translateY(-2px)",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)"
        }
      })
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 14,
  width: "100%",
  height: "100%",
  minHeight: 230,
  display: "flex",
  flexDirection: "column",
  fontFamily: styles.typography.fontFamily,
  transition: styles.animations.medium,
  backdropFilter: "blur(12px) saturate(150%)",
  background: alpha(styles.colors.backgroundDark, 0.5),
  border: `1px solid ${alpha(styles.colors.text, 0.08)}`,
  boxShadow: styles.shadows.card,
  "&:hover": {
    transform: "translateY(-6px) scale(1.01)",
    boxShadow: styles.shadows.cardHover,
    borderColor: alpha(styles.colors.text, 0.15),
    background: alpha(styles.colors.backgroundDark, 0.65),
  }
}));

const IconCircle = styled(Box)({
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  boxShadow: `inset 0 1px 2px ${alpha("#000000", 0.1)}, 0 2px 4px ${alpha("#000000", 0.05)}`,
  color: styles.colors.text,
  '& svg': {
    filter: `drop-shadow(0 1px 1px ${alpha(styles.colors.backgroundDark, 0.3)})`
  }
});

// --- JONY IVE POLISH: Updated Data Structure for Headline & Icons ---
interface PersonaData {
  headlineMain: string;
  highlightedPhrase?: string;
  subheadline: string;
  benefits: string[];
  metaTitle: string;
  metaDescription: string;
}

// **MODIFIED HERE: Benefit interface uses renderIcon**
interface Benefit {
  renderIcon: (props?: { color?: string; [key: string]: any }) => React.ReactNode; // Function that returns a ReactNode
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
  benefitsDisplay: Benefit[];
  techStack: TechStackItem[];
  successIndicators: string[];
}

// **MODIFIED HERE: DATA.benefitsDisplay uses renderIcon functions**
const DATA: DataStructure = {
  personas: {
    developer: {
      headlineMain: "Enterprise Solutions Delivered",
      highlightedPhrase: "10× Faster",
      subheadline: "Accelerate development with meticulously crafted enterprise-grade architectures and pre-built modules for peak performance.",
      benefits: ["CI/CD Pipeline Integration", "Microservices Architecture"],
      metaTitle: "Faster Enterprise Solutions for Developers | GluStack",
      metaDescription: "Discover how GluStack helps developers deliver enterprise solutions 10x faster. Schedule a demo!"
    },
    executive: {
      headlineMain: "Enterprise Solutions with 33%",
      highlightedPhrase: "Cost Reduction",
      subheadline: "Optimize technology investments and drive operational efficiency with our precision-engineered enterprise solutions for executives.",
      benefits: ["Total Cost of Ownership (TCO) Optimization", "Automated Business Workflows"],
      metaTitle: "Reduce Costs with Enterprise Solutions for Executives | GluStack",
      metaDescription: "Achieve significant cost reduction (avg. 33%) with GluStack's enterprise solutions. Book a strategy call."
    },
    security: {
      headlineMain: "Enterprise Solutions with",
      highlightedPhrase: "Fortified Security",
      subheadline: "Deploy highly secure enterprise solutions with comprehensive protection, ensuring compliance and data integrity for security professionals.",
      benefits: ["SOC 2 Type II & ISO 27001 Ready", "End-to-End Data Encryption"],
      metaTitle: "Fortified Security in Enterprise Solutions | GluStack",
      metaDescription: "Secure your enterprise with GluStack's solutions, featuring SOC 2 readiness. Learn more."
    }
  },
  benefitsDisplay: [
    {
      renderIcon: (props) => <TrendingUp size={24} strokeWidth={1.5} {...props} />,
      text: "73% Faster Deployment",
      subtext: "From concept to production in weeks, not months.",
      gradient: styles.gradients.benefitCard1
    },
    {
      renderIcon: (props) => <ShieldCheck size={24} strokeWidth={1.5} {...props} />,
      text: "Enterprise-Grade Security",
      subtext: "SOC 2, GDPR & ISO 27001 compliant solutions.",
      gradient: styles.gradients.benefitCard2
    },
    {
      renderIcon: (props) => <DollarSign size={24} strokeWidth={1.5} {...props} />,
      text: "33% Average Cost Reduction",
      subtext: "Optimized infrastructure and reduced operational overhead.",
      gradient: styles.gradients.benefitCard3
    },
    {
      renderIcon: (props) => <Users size={24} strokeWidth={1.5} {...props} />,
      text: "99.99% Uptime SLA",
      subtext: "Built for mission-critical enterprise reliability.",
      gradient: styles.gradients.benefitCard4
    }
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
  ],
};


const HeroSection: React.FC = () => {
  const theme = useTheme();
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>("executive");
  const [currentUserEmail, setCurrentUserEmail] = useState<string | undefined>(undefined);
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(undefined);

  const YOUR_CALENDLY_EVENT_LINK_PART = "https://calendly.com/glustack000/30min";
  const YOUR_COMPANY_NAME_FOR_SEO = "GluStack";
  const YOUR_WEBSITE_URL_BASE = "https://yourglustackwebsite.com"; // Replace with actual

  const validPersonas = useMemo(() => new Set(Object.keys(DATA.personas)), []);

  useEffect(() => {
    const timer = setTimeout(() => {
        setCurrentUserEmail("testuser@example.com");
        setCurrentUserName("Test User");
    }, 1200);

    const params = new URLSearchParams(window.location.search);
    const urlPersona = params.get("persona")?.toLowerCase();
    let initialPersona = "executive";

    if (urlPersona && validPersonas.has(urlPersona)) {
      initialPersona = urlPersona;
    } else {
      const storedPersona = localStorage.getItem("glustackUserPersona")?.toLowerCase();
      if (storedPersona && validPersonas.has(storedPersona)) {
        initialPersona = storedPersona;
      }
    }
    setSelectedPersona(initialPersona);
    return () => clearTimeout(timer);
  }, [validPersonas]);

  useEffect(() => {
    localStorage.setItem("glustackUserPersona", selectedPersona);
  }, [selectedPersona]);

  const personaData = useMemo(() => DATA.personas[selectedPersona] || DATA.personas.executive, [selectedPersona]);

  const handleOpenCalendlyModal = useCallback(() => setIsCalendlyModalOpen(true), []);
  const handleCloseCalendlyModal = useCallback(() => setIsCalendlyModalOpen(false), []);

  const handleViewCaseStudies = useCallback(() => window.open("/solutions", "_self"), []);
  const handleOpenCalculator = useCallback(() => window.open("/calculator", "_self"), []);


  const CTAButtonGroup = useMemo(() => (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1.5, sm: 2 }}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", mt: 0.5 }}
    >
      <CTAButton onClick={handleOpenCalendlyModal} endIcon={<Calendar size={18} strokeWidth={2.5} />} aria-label="Schedule your strategy session">
        Schedule Strategy Session
      </CTAButton>
      <CTAButton onClick={handleViewCaseStudies} endIcon={<ChevronRight size={18} strokeWidth={2.5} />} secondary aria-label="View case studies">
        View Case Studies
      </CTAButton>
    </Stack>
  ), [handleOpenCalendlyModal, handleViewCaseStudies]);


  return (
    <Section>
      <Head>
        <title>{personaData.metaTitle.replace("YourCompanyName", YOUR_COMPANY_NAME_FOR_SEO)}</title>
        <meta name="description" content={personaData.metaDescription.replace("YourCompanyName", YOUR_COMPANY_NAME_FOR_SEO)} />
        <meta property="og:title" content={personaData.metaTitle.replace("YourCompanyName", YOUR_COMPANY_NAME_FOR_SEO)} />
        <meta property="og:description" content={personaData.metaDescription.replace("YourCompanyName", YOUR_COMPANY_NAME_FOR_SEO)} />
        <meta property="og:image" content={`${YOUR_WEBSITE_URL_BASE}/images/og-hero-image.jpg`} />
        <meta property="og:url" content={`${YOUR_WEBSITE_URL_BASE}/hero?persona=${selectedPersona}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${YOUR_WEBSITE_URL_BASE}/hero?persona=${selectedPersona}`} />
      </Head>

      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <Image
            src="/images/istockphoto-realhero.jpg"
            alt={`Abstract background for ${personaData.headlineMain} - ${YOUR_COMPANY_NAME_FOR_SEO}`}
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={90}
            unoptimized={process.env.NODE_ENV === 'development'}
        />
      </Box>
      <BgOverlay />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <ContentArea>
          <FadeInView componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Headline component="h1">
              {personaData.headlineMain}
              {personaData.highlightedPhrase && (
                <>
                  {' '}
                  <Box component="span" sx={{
                    background: styles.gradients.secondaryHighlight,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: styles.colors.primary,
                  }}>
                    {personaData.highlightedPhrase}
                  </Box>
                </>
              )}
            </Headline>
            <Stack spacing={{ xs: 3, sm: 4 }} alignItems="center" sx={{ width: '100%', mt: {xs: 0.5, sm: 0.5}, mb: { xs: 4.5, sm: 5.5 } }}>
              <Subheadline component="h2" sx={{maxWidth: 720}}>
                {personaData.subheadline}
              </Subheadline>
              <OfferChip icon={<Clock size={18} strokeWidth={2.5} />} label="Limited Time: Free Strategy Sessions Available" />
              {CTAButtonGroup}
            </Stack>
          </FadeInView>

          <FadeInView delay={0.15} componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{
                width: '100%',
                maxWidth: {xs: '100%', sm: 'max-content'},
                mb: { xs: 5, sm: 6 },
                display: "flex", flexDirection: { xs: "column", sm: "row" },
                alignItems: "center", justifyContent: "center",
                p: {xs: 1.25, sm: 1.5},
                borderRadius: '14px',
                background: alpha(styles.colors.text, 0.03),
                border: `1px solid ${alpha(styles.colors.text, 0.06)}`,
            }}>
              <Typography
                sx={{
                  color: styles.colors.textSecondary, fontSize: "0.9rem", fontWeight: 500,
                  fontFamily: styles.typography.fontFamily,
                  mr: { xs: 0, sm: 2 }, mb: { xs: 1.5, sm: 0 },
                  textAlign: {xs: 'center', sm: 'left'}
                }}
              >
                I am a:
              </Typography>
              <Stack
                direction="row"
                spacing={{xs: 1, sm: 1.25}}
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

          <Box sx={{ mb: { xs: 5, sm: 7 } }}>
            <Typography variant="h2" component="h3" sx={{
                fontSize: "clamp(1.3rem, 5vw, 1.75rem)",
                textAlign: "center", color: styles.colors.text, mb: {xs: 3.5, sm: 4.5},
                fontWeight: 600, position: "relative", display: "inline-block",
                fontFamily: styles.typography.fontFamily, letterSpacing: styles.typography.letterSpacings.heading,
                left: "50%", transform: "translateX(-50%)",
                "&::after": {
                    content: '""', position: "absolute", bottom: -12, left: "30%",
                    width: "40%", height: "3px", borderRadius: "2px",
                    background: styles.gradients.primary,
                    transition: 'width 0.5s ease-out',
                }
            }}>
              Why Organizations Choose Our Solutions
            </Typography>
            <Grid container spacing={{xs: 2.5, sm: 3.5}} sx={{ alignItems: "stretch" }}>
              {DATA.benefitsDisplay.map((b, i) => (
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: "flex" }}>
                  <FadeInView delay={i * 0.12} componentStyle={{ display: 'flex', width: '100%', height: '100%' }}>
                    <BenefitCard>
                      {/* **MODIFIED HERE: Rendering icon via function call** */}
                      <IconCircle sx={{ background: b.gradient }}>
                        {b.renderIcon({ color: styles.colors.text })}
                      </IconCircle>
                      <Typography variant="h4" component="h4" sx={{
                          fontWeight: 600, color: styles.colors.text, mb: 1.25,
                          fontSize: "1.05rem", lineHeight: 1.35, fontFamily: styles.typography.fontFamily,
                       }}>
                        {b.text}
                       </Typography>
                      <Typography sx={{
                          fontSize: "0.85rem", lineHeight: 1.65, color: styles.colors.textSecondary,
                          flexGrow: 1, fontFamily: styles.typography.fontFamily,
                      }}>
                        {b.subtext}
                      </Typography>
                    </BenefitCard>
                  </FadeInView>
                </Grid>
              ))}
            </Grid>
          </Box>

          <FadeInView once delay={0.25} componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{
                width: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: styles.gradients.subtleGlow,
                p: {xs: 3.5, sm: 5}, borderRadius: '16px',
                border: `1px solid ${alpha(styles.colors.primary, 0.15)}`,
                mb: { xs: 5, sm: 7 }, boxShadow: `0 8px 32px ${alpha(styles.colors.primary, 0.08)}`,
            }}>
              <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 2.5 }}>
                <DollarSign size={24} color={styles.colors.primary} strokeWidth={2} />
                <Typography variant="h3" component="h3" color={styles.colors.primary} fontWeight={600} sx={{fontSize: "clamp(1.15rem, 4vw, 1.3rem)", fontFamily: styles.typography.fontFamily}}>
                    Calculate Potential Savings
                </Typography>
              </Stack>
              <Typography sx={{
                  color: styles.colors.textSecondary, maxWidth: 600, mx: "auto",
                  fontSize: "clamp(0.9rem, 3vw, 1rem)", textAlign: "center", mb: 3.5, lineHeight: 1.65,
                  fontFamily: styles.typography.fontFamily
              }}>
                Our solutions typically reduce development costs by 30-50% and accelerate time-to-market. See how much your organization could save.
              </Typography>
              <CTAButton
                sx={{
                    px: {xs:3.5, sm:4.5}, py: 1.35,
                    fontSize: "clamp(0.9rem, 3vw, 0.95rem)",
                }}
                onClick={handleOpenCalculator}
              >
                Open Savings Calculator
              </CTAButton>
            </Box>
          </FadeInView>

          <FadeInView once delay={0.35} componentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{
                width: '100%', textAlign: "center",
                pt: {xs: 3.5, sm: 4.5}, pb: {xs: 3.5, sm: 4.5},
                borderRadius: '16px', background: alpha(styles.colors.backgroundDark, 0.3)
            }}>
              <Typography variant="h2" component="h3" sx={{
                  color: styles.colors.text, fontSize: "clamp(1.3rem, 5vw, 1.75rem)", fontWeight: 600,
                  mb: 3.5, maxWidth: 700, mx: "auto", lineHeight: 1.35,
                  fontFamily: styles.typography.fontFamily, letterSpacing: styles.typography.letterSpacings.heading,
              }}>
                Ready to Transform Your Enterprise Technology?
              </Typography>
              <CTAButton onClick={handleOpenCalendlyModal} endIcon={<Calendar size={18} strokeWidth={2.5} />} aria-label="Schedule your free strategy session" sx={{ px: {xs:3.5, sm:5}, py: 1.6, fontSize: "clamp(0.95rem, 3.5vw, 1.05rem)" }}>
                Schedule Free Strategy Session
              </CTAButton>
            </Box>
          </FadeInView>
        </ContentArea>
      </Container>

      <ErrorBoundary>
        <Suspense fallback={null}>
          {isCalendlyModalOpen && (
            <CalendlyBooking
              isOpen={isCalendlyModalOpen}
              onClose={handleCloseCalendlyModal}
              calendlyEventLink={YOUR_CALENDLY_EVENT_LINK_PART}
              prefill={{
                email: currentUserEmail,
                name: currentUserName,
                customAnswers: {
                  a1: `Persona: ${selectedPersona}`,
                  a2: 'Source: Hero Section CTA'
                }
              }}
              pageSettings={{
                backgroundColor: styles.colors.backgroundDark.substring(1),
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: styles.colors.primary.substring(1),
                textColor: styles.colors.text.substring(1)
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