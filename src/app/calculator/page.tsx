// SavingsCalculatorPage.tsx
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, TrendingUp, ChevronRight, Info } from "lucide-react"; // Or other suitable icons

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
  },
  shadows: {
    card: "0 10px 30px rgba(0, 0, 0, 0.07)",
    focus: `0 0 0 3px ${alpha("#6366F1", 0.5)}`,
  },
  borderRadius: "16px",
};

// Styled Components
const PageWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: calculatorStyles.colors.background,
  paddingTop: "var(--header-height, 64px)", // Account for a potential fixed header
  paddingBottom: "48px",
  display: "flex",
  alignItems: "center", // Vertically center if content is not too tall
  justifyContent: "center",
});

const CalculatorPaper = styled(Paper)({
  padding: "40px 48px",
  borderRadius: calculatorStyles.borderRadius,
  boxShadow: calculatorStyles.shadows.card,
  backgroundColor: calculatorStyles.colors.paperBackground,
  maxWidth: "700px",
  width: "100%",
  margin: "32px", // Margin for smaller screens
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
    borderRadius: "12px",
    backgroundColor: alpha(calculatorStyles.colors.primaryLight, 0.2), // Very subtle background
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
      display: "none", // Remove default ripple
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
  fontSize: "clamp(2.5rem, 6vw, 4rem)", // Responsive font size
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

// --- Component ---
const SavingsCalculatorPage: React.FC = () => {
  const theme = useTheme(); // For any direct theme access if needed

  const [currentExpenditure, setCurrentExpenditure] = useState<number | "">(100000); // Default to a realistic number
  const [savingsRate, setSavingsRate] = useState<number>(30); // Default to 30%

  const handleExpenditureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string for clearing input, otherwise parse as float
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
      currency: "USD", // Make this configurable if needed
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

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
            {/* Input 1: Current Expenditure */}
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
                    step: 1000, // Adjust step as needed
                  }
                }}
                aria-label="Current Annual Expenditure in USD"
              />
            </Grid>

            {/* Input 2: Savings Rate */}
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
                  min={5} // Sensible min
                  max={75} // Sensible max, e.g. if "up to 47%" is the headline, allow a bit more
                  marks={[
                    { value: 10, label: "10%" },
                    { value: 30, label: "30%" },
                    { value: 47, label: "47%" },
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

          {/* Results */}
          <ResultBox>
            <SavingsLabel>Estimated Annual Savings</SavingsLabel>
            <AnimatePresence mode="wait">
              <motion.div
                key={estimatedSavings} // Key change triggers animation
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} // Ive-like easing
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

          {/* Optional CTA */}
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ChevronRight />}
              sx={{
                backgroundColor: calculatorStyles.colors.primary,
                color: "#fff",
                borderRadius: "12px",
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
            // onClick={() => { /* Navigate to contact or demo page */ }}
            >
              Discover How We Achieve This
            </Button>
          </Box>
        </CalculatorPaper>
      </Container>
    </PageWrapper>
  );
};

export default SavingsCalculatorPage;