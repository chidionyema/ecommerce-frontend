"use client"; // If using Next.js App Router

import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Slider,
  TextField,
  InputAdornment,
  Grid,
  Button,
  alpha,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, TrendingUp, ChevronRight, Info, ChevronDown } from "lucide-react";

// Assuming your styles object is accessible or you define a new one
// For now, let's define some specific to this page, inspired by the Hero's styles
const calculatorStyles = {
  colors: {
    primary: "#6366F1", // from Hero
    primaryLight: alpha("#6366F1", 0.1),
    text: "#1A202C", // Darker text for light background
    textLight: "#4A5568",
    textVeryLight: "#718096",
    background: "#F7FAFC", // Very light grey
    paperBackground: "#FFFFFF",
    sliderTrack: alpha("#6366F1", 0.25),
    sliderThumb: "#6366F1",
    borderColor: alpha("#000000", 0.12),
    accordionBorder: alpha("#6366F1", 0.2),
  },
  shadows: {
    card: "0 10px 30px rgba(0, 0, 0, 0.07)",
    focus: `0 0 0 3px ${alpha("#6366F1", 0.5)}`,
    accordion: "0 4px 12px rgba(0,0,0,0.05)",
  },
  borderRadius: "16px",
  borderRadiusSmall: "12px",
};

// Styled Components
const PageWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: calculatorStyles.colors.background,
  paddingTop: "var(--header-height, 64px)", // Account for a potential fixed header
  paddingBottom: "48px",
  display: "flex",
  flexDirection: "column", // Allow content to flow downwards
  alignItems: "center",
  // justifyContent: "center", // Removed to allow scrolling for more content
});

const CalculatorPaper = styled(Paper)({
  padding: "40px 48px",
  borderRadius: calculatorStyles.borderRadius,
  boxShadow: calculatorStyles.shadows.card,
  backgroundColor: calculatorStyles.colors.paperBackground,
  maxWidth: "700px",
  width: "100%",
  margin: "32px auto", // Centered with auto margins
});

const SectionTitle = styled(Typography)({
  fontWeight: 600,
  color: calculatorStyles.colors.text,
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: calculatorStyles.borderRadiusSmall,
    backgroundColor: alpha(calculatorStyles.colors.primaryLight, 0.2),
    "& fieldset": {
      borderColor: calculatorStyles.colors.borderColor,
    },
    "&:hover fieldset": {
      borderColor: calculatorStyles.colors.primary,
    },
    "&.Mui-focused fieldset": {
      borderColor: calculatorStyles.colors.primary,
      boxShadow: calculatorStyles.shadows.focus,
    },
  },
  "& .MuiInputBase-input": {
    fontWeight: 500,
    fontSize: "1.1rem",
  },
}));

const StyledSlider = styled(Slider)({
  color: calculatorStyles.colors.sliderThumb,
  height: "8px",
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: calculatorStyles.colors.sliderThumb,
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: calculatorStyles.colors.sliderTrack,
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: `3px solid ${calculatorStyles.colors.sliderThumb}`,
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: `0 0 0 6px ${alpha(calculatorStyles.colors.sliderThumb, 0.16)}`,
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: calculatorStyles.colors.primary,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const ResultBox = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  padding: "32px",
  backgroundColor: calculatorStyles.colors.primaryLight,
  border: `1px solid ${alpha(calculatorStyles.colors.primary, 0.3)}`,
  borderRadius: calculatorStyles.borderRadius,
  textAlign: "center",
}));

const SavingsAmount = styled(Typography)({
  fontSize: "clamp(2.5rem, 6vw, 4rem)",
  fontWeight: 700,
  color: calculatorStyles.colors.primary,
  lineHeight: 1.2,
  margin: "8px 0",
});

const SavingsLabel = styled(Typography)({
  color: calculatorStyles.colors.textLight,
  fontWeight: 500,
  marginBottom: "16px",
});

const CalculationBreakdownText = styled(Typography)({
  fontSize: "0.875rem",
  color: calculatorStyles.colors.textVeryLight,
  marginTop: "8px",
});

// --- NEW STYLED COMPONENTS FOR DISCOVERY/FAQ SECTION ---
const DiscoverySectionWrapper = styled(Box)({
  maxWidth: "700px",
  width: "100%",
  margin: "48px auto", // Spacing from calculator or button
  padding: "0 16px", // Padding for content within this wrapper
});

const StyledAccordion = styled(Accordion)({
  backgroundColor: calculatorStyles.colors.paperBackground,
  color: calculatorStyles.colors.text,
  borderRadius: `${calculatorStyles.borderRadiusSmall} !important`, // Override default MUI squaring
  boxShadow: calculatorStyles.shadows.accordion,
  border: `1px solid ${calculatorStyles.colors.accordionBorder}`,
  "&:before": {
    display: "none", // Remove default MUI top border
  },
  "&.Mui-expanded": {
    margin: "16px 0", // More pronounced margin when expanded
  },
  "&:first-of-type": {
    borderTopLeftRadius: `${calculatorStyles.borderRadiusSmall} !important`,
    borderTopRightRadius: `${calculatorStyles.borderRadiusSmall} !important`,
  },
  "&:last-of-type": {
    borderBottomLeftRadius: `${calculatorStyles.borderRadiusSmall} !important`,
    borderBottomRightRadius: `${calculatorStyles.borderRadiusSmall} !important`,
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
  "& .MuiAccordionSummary-content": {
    fontWeight: 500,
    fontSize: "1.1rem",
    color: calculatorStyles.colors.text,
  },
  "& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root": { // For MUI default icon
     color: calculatorStyles.colors.primary,
  },
   "& .MuiAccordionSummary-expandIconWrapper": { // For Lucide icon
     color: calculatorStyles.colors.primary,
  }
});

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: "8px 24px 24px", // Adjust padding
  fontSize: "1rem",
  color: calculatorStyles.colors.textLight,
  lineHeight: 1.7,
});


// --- FAQ Data ---
const faqData = [
  {
    id: "faq1",
    question: "How do your solutions generate savings?",
    answer: "Our innovative platform streamlines your existing workflows, identifies inefficiencies, and automates key processes. This directly translates to reduced operational costs, optimized resource allocation, and minimized waste, leading to significant annual savings."
  },
  {
    id: "faq2",
    question: "What kind of organizations are these savings typical for?",
    answer: "While results can vary, organizations across various sectors, from SMEs to large enterprises, experience substantial savings. The calculator provides an estimate based on common efficiency gains we observe in areas like procurement, resource management, and operational overhead."
  },
  {
    id: "faq3",
    question: "Is this a one-time saving or ongoing?",
    answer: "The savings are typically ongoing. Initial implementation yields immediate benefits, and our continuous improvement model ensures that your operations become progressively more efficient, sustaining and often increasing these savings over time."
  },
  {
    id: "faq4",
    question: "How accurate is this calculator?",
    answer: "This calculator provides an estimate based on typical client results and the data you input. For a personalized assessment and a detailed breakdown of how we can achieve these savings for your specific organization, we recommend scheduling a consultation with our experts."
  }
];

// --- Component ---
const SavingsCalculatorPage: React.FC = () => {
  const theme = useTheme();

  const [currentExpenditure, setCurrentExpenditure] = useState<number | "">(100000);
  const [savingsRate, setSavingsRate] = useState<number>(30);
  const [isDiscoveryVisible, setIsDiscoveryVisible] = useState<boolean>(false); // State for FAQ visibility

  const handleExpenditureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCurrentExpenditure(value === "" ? "" : parseFloat(value));
  };

  const handleSavingsRateChange = (event: Event, newValue: number | number[]) => {
    setSavingsRate(newValue as number);
  };

  const estimatedSavings = useMemo(() => {
    const expenditure = typeof currentExpenditure === 'number' ? currentExpenditure : 0;
    if (expenditure <= 0 || savingsRate <= 0) return 0;
    return expenditure * (savingsRate / 100);
  }, [currentExpenditure, savingsRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDiscoverToggle = useCallback(() => {
    setIsDiscoveryVisible(prev => !prev);
  }, []);

  return (
    <PageWrapper>
      <Container maxWidth="md" disableGutters>
        <CalculatorPaper elevation={0}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: calculatorStyles.colors.text,
              mb: 2,
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            }}
          >
            Estimate Your Potential Savings
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: calculatorStyles.colors.textLight,
              mb: 5,
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            See how our solutions can translate into tangible financial benefits for your organization.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <SectionTitle variant="h6">
                <DollarSign size={20} />
                Current Annual Expenditure
              </SectionTitle>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="e.g., 100000"
                value={currentExpenditure === "" ? "" : currentExpenditure}
                onChange={handleExpenditureChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ color: calculatorStyles.colors.textLight }}>$</Typography>
                    </InputAdornment>
                  ),
                  inputProps: {
                    min: 0,
                    step: 1000,
                  }
                }}
                aria-label="Current Annual Expenditure in USD"
              />
            </Grid>

            <Grid item xs={12}>
              <SectionTitle variant="h6">
                <TrendingUp size={20} />
                Potential Savings Rate
              </SectionTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1 }}>
                <StyledSlider
                  value={savingsRate}
                  onChange={handleSavingsRateChange}
                  aria-labelledby="savings-rate-slider"
                  valueLabelDisplay="auto"
                  min={5}
                  max={75}
                  marks={[
                    { value: 10, label: "10%" },
                    { value: 30, label: "30%" },
                    { value: 47, label: "47%" }, // A specific interesting mark
                    { value: 60, label: "60%" },
                  ]}
                />
                <Typography sx={{ fontWeight: 600, color: calculatorStyles.colors.primary, minWidth: '40px' }}>
                  {savingsRate}%
                </Typography>
              </Box>
               <Typography variant="caption" sx={{color: calculatorStyles.colors.textVeryLight, display: 'block', mt: 1}}>
                Adjust the slider to explore different saving scenarios. Our solutions typically deliver between 20-50% savings.
              </Typography>
            </Grid>
          </Grid>

          <ResultBox>
            <SavingsLabel>Estimated Annual Savings</SavingsLabel>
            <AnimatePresence mode="wait">
              <motion.div
                key={estimatedSavings}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <SavingsAmount>
                  {formatCurrency(estimatedSavings)}
                </SavingsAmount>
              </motion.div>
            </AnimatePresence>
            <CalculationBreakdownText>
              Based on a {savingsRate}% reduction of an annual expenditure of {formatCurrency(typeof currentExpenditure === 'number' ? currentExpenditure : 0)}.
            </CalculationBreakdownText>
          </ResultBox>

          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              endIcon={isDiscoveryVisible ? <ChevronDown style={{ transform: 'rotate(180deg)'}} /> : <ChevronRight />}
              sx={{
                backgroundColor: calculatorStyles.colors.primary,
                color: "#fff",
                borderRadius: calculatorStyles.borderRadiusSmall,
                padding: "12px 28px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: `0 4px 14px ${alpha(calculatorStyles.colors.primary, 0.3)}`,
                "&:hover": {
                  backgroundColor: alpha(calculatorStyles.colors.primary, 0.85),
                  boxShadow: `0 6px 20px ${alpha(calculatorStyles.colors.primary, 0.4)}`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onClick={handleDiscoverToggle} // Updated onClick handler
            >
              {isDiscoveryVisible ? "Hide Details" : "Discover How We Achieve This"}
            </Button>
          </Box>
        </CalculatorPaper>

        {/* --- NEW DISCOVERY/FAQ SECTION --- */}
        <AnimatePresence>
          {isDiscoveryVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ overflow: 'hidden' }} // Prevents content spill during animation
            >
              <DiscoverySectionWrapper>
                <Typography variant="h4" component="h2" sx={{textAlign: "center", fontWeight: 600, color: calculatorStyles.colors.text, mb: 4, mt:3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                  <Info size={28} strokeWidth={2.5} style={{color: calculatorStyles.colors.primary}}/> How Savings Are Calculated
                </Typography>
                {faqData.map((faqItem) => (
                  <StyledAccordion key={faqItem.id} TransitionProps={{ timeout: 400 }}>
                    <StyledAccordionSummary
                      expandIcon={<ChevronDown size={20} />} // Using Lucide icon
                      aria-controls={`${faqItem.id}-content`}
                      id={`${faqItem.id}-header`}
                    >
                      {faqItem.question}
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                      {faqItem.answer}
                    </StyledAccordionDetails>
                  </StyledAccordion>
                ))}
              </DiscoverySectionWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </PageWrapper>
  );
};

export default SavingsCalculatorPage;