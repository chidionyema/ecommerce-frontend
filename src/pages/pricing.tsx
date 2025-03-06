'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Container,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  alpha,
  Paper,
  Slider,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccessTime,
  EmojiEvents as EmojiEventsIcon,
  CalendarToday as CalendarTodayIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Support as SupportIcon,
  Analytics as AnalyticsIcon,
  Speed as SpeedIcon,
  ArrowForward as ArrowForwardIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';

import { SPACING, getSharedStyles } from '../utils/sharedStyles';

// Modified pricing data with alternative pricing approaches
const plansWithAlternativePricing = [
  {
    type: 'basic',
    title: 'Basic',
    tagline: 'For small businesses just getting started',
    // Value-based pricing approach
    priceDisplay: {
      type: 'value-based',
      valueText: 'Basic',
      subText: 'Affordable starter package',
      ctaText: 'See pricing details'
    },
    recommended: false,
    features: [
      { icon: SpeedIcon, text: 'Quick setup and onboarding process' },
      { icon: SupportIcon, text: 'Email support within 48 hours' },
      { icon: CheckCircleIcon, text: 'Essential features for small teams' },
    ],
    extraFeatures: [
      'Basic analytics dashboard',
      'Up to 3 team members',
      '1GB storage'
    ],
    ctaText: 'Get Started'
  },
  {
    type: 'professional',
    title: 'Professional',
    tagline: 'For growing businesses with specific needs',
    // Starting-from pricing approach
    priceDisplay: {
      type: 'starting-from',
      startingPrice: '$99',
      unit: 'per month',
      subText: 'Custom features available',
      ctaText: 'See pricing details'
    },
    recommended: true,
    features: [
      { icon: SpeedIcon, text: 'Priority setup and dedicated onboarding' },
      { icon: SupportIcon, text: 'Priority support with 24-hour response' },
      { icon: AnalyticsIcon, text: 'Advanced analytics and reporting tools' },
    ],
    extraFeatures: [
      'Custom dashboard configuration',
      'Up to 10 team members',
      '10GB storage',
      'API access'
    ],
    ctaText: 'Get Professional Plan'
  },
  {
    type: 'enterprise',
    title: 'Enterprise',
    tagline: 'For established businesses with complex requirements',
    // Custom quote approach
    priceDisplay: {
      type: 'custom-quote',
      valueText: 'Custom Solution',
      subText: 'Tailored to your specific needs',
      ctaText: 'Request custom quote'
    },
    recommended: false,
    features: [
      { icon: WorkIcon, text: 'White-glove implementation and setup' },
      { icon: SupportIcon, text: 'Dedicated account manager and 24/7 support' },
      { icon: GroupIcon, text: 'Enterprise-grade security and compliance' },
    ],
    extraFeatures: [
      'Unlimited team members',
      'Unlimited storage',
      'Custom integrations',
      'Advanced security features',
      'Service level agreements'
    ],
    ctaText: 'Contact Sales'
  }
];

// Additional sample plans for more pricing approaches
const additionalPlans = [
  {
    type: 'flexible',
    title: 'Flexible',
    tagline: 'Adaptable solutions that grow with you',
    // Price range approach
    priceDisplay: {
      type: 'price-range',
      rangeStart: '$199',
      rangeEnd: '$499',
      unit: 'per month',
      subText: 'Based on feature selection and usage',
      ctaText: 'Explore options'
    },
    features: [
      { icon: SpeedIcon, text: 'Scalable resources that grow with your needs' },
      { icon: SupportIcon, text: 'Dedicated support team' },
      { icon: AnalyticsIcon, text: 'Customizable analytics dashboard' },
    ],
    ctaText: 'See Flexible Options'
  },
  {
    type: 'comparison',
    title: 'Value Plus',
    tagline: 'More features, better value',
    // Comparison-based pricing
    priceDisplay: {
      type: 'comparison',
      valueText: '30% more affordable',
      subText: 'than leading competitor solutions',
      ctaText: 'See value comparison'
    },
    features: [
      { icon: EmojiEventsIcon, text: 'All features of top competitors combined' },
      { icon: SpeedIcon, text: '2x faster implementation than industry average' },
      { icon: SupportIcon, text: 'Premium support with guaranteed response times' },
    ],
    ctaText: 'See Value Comparison'
  }
];

const FeatureItem = ({ icon: Icon, text }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="flex-start" gap={2} my={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderRadius: '16px',
          width: 40,
          height: 40,
          minWidth: 40,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        <Icon sx={{ fontSize: 24, color: theme.palette.primary.main, transform: 'rotate(-10deg)' }} />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

const ExtraFeatureItem = ({ text }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="flex-start" gap={1.5} my={1.5}>
      <CheckCircleIcon 
        fontSize="small" 
        sx={{ 
          color: theme.palette.success.main,
          mt: 0.5,
        }} 
      />
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

// Render price display based on the pricing approach
const renderPriceDisplay = (priceDisplay, isAnnual, theme) => {
  // Function to apply annual discount if applicable
  const adjustForAnnual = (price) => {
    if (!isAnnual || !price || typeof price !== 'string') return price;
    if (price.startsWith('$')) {
      const numericValue = parseFloat(price.substring(1));
      if (!isNaN(numericValue)) {
        const annualPrice = Math.round(numericValue * 0.9);
        return `$${annualPrice}`;
      }
    }
    return price;
  };

  switch (priceDisplay.type) {
    case 'value-based':
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {priceDisplay.valueText}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
            {priceDisplay.subText}
          </Typography>
        </Box>
      );

    case 'starting-from':
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Starting from {adjustForAnnual(priceDisplay.startingPrice)}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
            {priceDisplay.unit}
          </Typography>
          {isAnnual && (
            <Typography variant="caption" color="success.main" sx={{ fontWeight: 'medium', mt: 0.5, display: 'block' }}>
              Save 10% with annual billing
            </Typography>
          )}
        </Box>
      );

    case 'price-range':
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {adjustForAnnual(priceDisplay.rangeStart)} - {adjustForAnnual(priceDisplay.rangeEnd)}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
            {priceDisplay.unit}
          </Typography>
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
            {priceDisplay.subText}
          </Typography>
        </Box>
      );

    case 'custom-quote':
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            {priceDisplay.valueText}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
            {priceDisplay.subText}
          </Typography>
        </Box>
      );

    case 'comparison':
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="success.main">
            {priceDisplay.valueText}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
            {priceDisplay.subText}
          </Typography>
        </Box>
      );

    default:
      return (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Contact Us
          </Typography>
        </Box>
      );
  }
};

// Updated renderPlanCard function with revised pricing display
const renderPlanCard = (
  plan,
  handlePlanClick,
  handlePricingDetailsClick,
  theme,
  isAnnual
) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%',
    width: '100%'
  }}>
    <motion.div
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        width: '100%'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: plan.type === 'basic' ? 0 : plan.type === 'professional' ? 0.1 : 0.2,
      }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      key={plan.type}
    >
      <Paper
        elevation={plan.recommended ? 8 : 4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          p: 3,
          borderRadius: 4,
          position: 'relative',
          background: plan.recommended
            ? `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${
                theme.palette.mode === 'light' ? 'white' : '#28282a'
              } 100%)`
            : theme.palette.mode === 'light'
            ? 'white'
            : '#28282a',
          border: plan.recommended
            ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
            : `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          boxShadow: plan.recommended ? theme.shadows[8] : theme.shadows[4],
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {plan.recommended && (
          <Chip
            label="Most Popular"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              fontSize: '0.8rem',
              px: 1,
              fontWeight: 600,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
            }}
          />
        )}
        {plan.recommended && (
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 100,
              height: 100,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: '50%',
              zIndex: 0,
            }}
          />
        )}
        <Box 
          position="relative" 
          zIndex={1} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" mb={1}>
              {plan.title}
            </Typography>
            <Typography variant="subtitle1" mb={3} color="text.secondary">
              {plan.tagline}
            </Typography>
            
            {/* Pricing display component */}
            {renderPriceDisplay(plan.priceDisplay, isAnnual, theme)}
            
            {/* Show "See pricing details" button for plans with details */}
            {plan.priceDisplay && plan.priceDisplay.ctaText && (
              <Button
                variant="text"
                size="small"
                color="primary"
                onClick={() => handlePricingDetailsClick(plan)}
                sx={{ mb: 2, textTransform: 'none', p: 0 }}
              >
                {plan.priceDisplay.ctaText}
              </Button>
            )}
          </Box>
          
          <Box sx={{ 
            mb: 3,
            flex: '1 0 auto',
            height: { xs: 'auto', md: '250px' },
            overflow: 'auto'
          }}>
            {plan.features.map((feature, i) => (
              <FeatureItem key={i} icon={feature.icon} text={feature.text} />
            ))}
            
            {plan.extraFeatures && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold" mb={1.5} color="text.primary">
                  Also includes:
                </Typography>
                {plan.extraFeatures.map((feature, i) => (
                  <ExtraFeatureItem key={i} text={feature} />
                ))}
              </Box>
            )}
          </Box>
          
          <Button
            variant={plan.recommended ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePlanClick(plan.type)}
            sx={{
              mt: 'auto',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 4,
              py: 1.5,
              transition: 'all 0.3s ease',
              boxShadow: plan.recommended ? theme.shadows[3] : 'none',
              ...(plan.recommended && {
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              }),
            }}
            endIcon={<ArrowForwardIcon />}
          >
            {plan.ctaText || 'Select Plan'}
          </Button>
        </Box>
      </Paper>
    </motion.div>
  </Box>
);

// Value Calculator Component
const ValueCalculator = ({ onClose, theme }) => {
  const [teamSize, setTeamSize] = useState(5);
  const [complexity, setComplexity] = useState('medium');
  const [features, setFeatures] = useState(5);
  
  // Calculate estimated range based on inputs
  const calculateRange = () => {
    let basePrice = 99;
    
    // Adjust for team size
    const teamFactor = Math.round(teamSize * 15);
    
    // Adjust for complexity
    const complexityFactor = 
      complexity === 'low' ? 1 :
      complexity === 'medium' ? 1.5 :
      complexity === 'high' ? 2.5 : 1;
    
    // Adjust for features
    const featureFactor = features * 20;
    
    const estimatedPrice = Math.round((basePrice + teamFactor + featureFactor) * complexityFactor);
    const lowerBound = Math.round(estimatedPrice * 0.9);
    const upperBound = Math.round(estimatedPrice * 1.1);
    
    return { lower: lowerBound, upper: upperBound };
  };
  
  const range = calculateRange();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Estimate Your Custom Solution
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Adjust the parameters below to get an estimated price range for your specific needs.
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography id="team-size-slider" gutterBottom>
          Team Size: {teamSize} users
        </Typography>
        <Slider
          value={teamSize}
          onChange={(e, newValue) => setTeamSize(newValue)}
          aria-labelledby="team-size-slider"
          min={1}
          max={50}
          valueLabelDisplay="auto"
        />
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="complexity-select-label">Project Complexity</InputLabel>
          <Select
            labelId="complexity-select-label"
            value={complexity}
            label="Project Complexity"
            onChange={(e) => setComplexity(e.target.value)}
          >
            <MenuItem value="low">Low - Basic implementation</MenuItem>
            <MenuItem value="medium">Medium - Standard customization</MenuItem>
            <MenuItem value="high">High - Complex integration</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography id="features-slider" gutterBottom>
          Additional Features: {features}
        </Typography>
        <Slider
          value={features}
          onChange={(e, newValue) => setFeatures(newValue)}
          aria-labelledby="features-slider"
          min={0}
          max={15}
          valueLabelDisplay="auto"
        />
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3, bgcolor: alpha(theme.palette.primary.light, 0.05) }}>
        <Typography variant="h5" gutterBottom align="center">
          Estimated Price Range
        </Typography>
        <Typography variant="h4" align="center" fontWeight="bold" color="primary">
          ${range.lower} - ${range.upper}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
          per month, based on your specific requirements
        </Typography>
      </Paper>
      
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 2 }}>
        This is an estimate only. Contact our sales team for a precise quote.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={onClose} sx={{ mr: 1 }}>
          Close
        </Button>
        <Button variant="contained" onClick={onClose} endIcon={<ArrowForwardIcon />}>
          Contact Sales
        </Button>
      </Box>
    </Box>
  );
};

// Custom section component
const CustomSection = ({ children, id, sx = [], ...props }) => {
  const theme = useTheme();
  return (
    <Box
      component="section"
      id={id}
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          background: theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.background.paper,
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

// Pricing details dialog component
const PricingDetailsDialog = ({ open, plan, onClose, theme, isAnnual }) => {
  if (!plan) return null;
  
  const priceDisplay = plan.priceDisplay;
  
  // Content based on pricing display type
  const renderPricingDetails = () => {
    switch (priceDisplay.type) {
      case 'value-based':
        return (
          <>
            <DialogTitle>{plan.title} Plan Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Our {plan.title} plan is designed for {plan.tagline.toLowerCase()}. We focus on providing essential features at an affordable price point.
              </DialogContentText>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">What's included:</Typography>
                {plan.features.map((feature, i) => (
                  <FeatureItem key={i} icon={feature.icon} text={feature.text} />
                ))}
                {plan.extraFeatures && plan.extraFeatures.map((feature, i) => (
                  <ExtraFeatureItem key={i} text={feature} />
                ))}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">Pricing:</Typography>
                <Typography variant="body1">
                  Contact our sales team for personalized pricing based on your specific requirements.
                </Typography>
              </Box>
            </DialogContent>
          </>
        );
      
      case 'starting-from':
        return (
          <>
            <DialogTitle>{plan.title} Plan Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Our {plan.title} plan starts from {priceDisplay.startingPrice} {priceDisplay.unit} and includes premium features for growing businesses.
              </DialogContentText>
              {isAnnual && (
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  Save 10% with annual billing
                </Typography>
              )}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">What's included:</Typography>
                {plan.features.map((feature, i) => (
                  <FeatureItem key={i} icon={feature.icon} text={feature.text} />
                ))}
                {plan.extraFeatures && plan.extraFeatures.map((feature, i) => (
                  <ExtraFeatureItem key={i} text={feature} />
                ))}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">Add-ons available:</Typography>
                <Typography variant="body2">
                  • Additional team members: $15/user/month<br />
                  • Extra storage: $10/GB/month<br />
                  • Premium support package: $99/month
                </Typography>
              </Box>
            </DialogContent>
          </>
        );
      
      case 'price-range':
        return (
          <>
            <DialogTitle>{plan.title} Plan Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Our {plan.title} plan ranges from {priceDisplay.rangeStart} to {priceDisplay.rangeEnd} {priceDisplay.unit} depending on your specific requirements.
              </DialogContentText>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">Factors that affect pricing:</Typography>
                <Typography variant="body2">
                  • Number of users<br />
                  • Storage requirements<br />
                  • Integration complexity<br />
                  • Support level needed<br />
                  • Custom feature development
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">What's included:</Typography>
                {plan.features.map((feature, i) => (
                  <FeatureItem key={i} icon={feature.icon} text={feature.text} />
                ))}
              </Box>
            </DialogContent>
          </>
        );
      
      case 'custom-quote':
        return (
          <>
            <DialogTitle>{plan.title} Solution</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Our {plan.title} solutions are fully customized to your organization's specific needs. We'll work closely with you to understand your requirements and provide a tailored quote.
              </DialogContentText>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">Enterprise features include:</Typography>
                {plan.features.map((feature, i) => (
                  <FeatureItem key={i} icon={feature.icon} text={feature.text} />
                ))}
                {plan.extraFeatures && plan.extraFeatures.map((feature, i) => (
                  <ExtraFeatureItem key={i} text={feature} />
                ))}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">Request a quote:</Typography>
                <Typography variant="body2">
                  Contact our enterprise sales team to schedule a consultation and receive a customized quote based on your organization's needs.
                </Typography>
              </Box>
            </DialogContent>
          </>
        );
      
      case 'comparison':
        return (
          <>
            <DialogTitle>Value Comparison</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Our {plan.title} plan offers exceptional value at {priceDisplay.valueText} than leading competitor solutions with more features included.
              </DialogContentText>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">Competitive advantages:</Typography>
                {plan.features.map((feature, i) => (
                  <FeatureItem key={i} icon={feature.icon} text={feature.text} />
                ))}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">Competitor comparison:</Typography>
                <Paper variant="outlined" sx={{ p: 2, mt: 1, borderRadius: 2 }}>
                  <Typography variant="body2">
                    <strong>Us:</strong> All essential features included at a single price point<br />
                    <strong>Competitors:</strong> Multiple add-ons required for similar functionality
                  </Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, mt: 2, borderRadius: 2 }}>
                  <Typography variant="body2">
                    <strong>Us:</strong> Transparent pricing with no hidden fees<br />
                    <strong>Competitors:</strong> Additional charges for implementation and support
                  </Typography>
                </Paper>
              </Box>
            </DialogContent>
          </>
        );
      
      default:
        return (
          <>
            <DialogTitle>{plan.title} Plan Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please contact our sales team for detailed pricing information for the {plan.title} plan.
              </DialogContentText>
            </DialogContent>
          </>
        );
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      fullWidth
      aria-labelledby="pricing-details-title"
    >
      {renderPricingDetails()}
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained" 
          onClick={onClose}
          endIcon={<ArrowForwardIcon />}
        >
          Contact Sales
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PricingPage = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  
  // For demo purposes, using our modified pricing data
  const plans = plansWithAlternativePricing;
  const pricingPageContent = {
    hero: {
      title: "Flexible Pricing For Your Business",
      subtitle: "Choose the perfect plan that fits your needs with transparent pricing and no hidden fees.",
      cta: "View Pricing Options"
    },
    pricingSection: {
      heading: "Find the Right Solution",
      description: "We offer various pricing approaches to accommodate businesses of all sizes and needs."
    },
    guideSection: {
      heading: "How Our Pricing Works",
      description: "We believe in transparent pricing that scales with your business needs.",
      items: [
        {
          title: "Value-Based Pricing",
          icon: EmojiEventsIcon,
          description: "Our Basic tier focuses on delivering essential features at an affordable price point without compromising quality."
        },
        {
          title: "Customizable Solutions",
          icon: AnalyticsIcon,
          description: "Our Professional and Enterprise plans can be tailored to your specific business requirements, with pricing that scales based on your needs."
        },
        {
          title: "Transparent Pricing",
          icon: InfoIcon,
          description: "We provide clear pricing information upfront, so you know exactly what you're getting and what to expect as your business grows."
        }
      ]
    },
    faqSection: {
      heading: "Frequently Asked Questions",
      items: [
        {
          question: "How do I know which pricing option is right for me?",
          answer: "We recommend evaluating your current needs and growth projections. Our Basic plan works well for small teams just getting started, while the Professional plan is ideal for growing businesses with more complex requirements. Enterprise solutions are best for larger organizations needing custom configurations. You can also contact our sales team for a personalized recommendation."
        },
        {
          question: "Can I change plans later?",
          answer: "Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, the change takes effect immediately. When downgrading, the change will take effect at the start of your next billing cycle."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees. We believe in transparent pricing. The price you see is what you pay, with no surprise charges. For custom enterprise solutions, we provide detailed quotes that outline all costs before you commit."
        },
        {
          question: "Do you offer discounts for non-profits or educational institutions?",
          answer: "Yes, we offer special pricing for qualified non-profit organizations, educational institutions, and startups. Please contact our sales team to learn more about our discount programs."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also offer invoicing with net-30 payment terms. International payments are supported through multiple currencies."
        }
      ]
    },
    finalCta: {
      heading: "Ready to Get Started?",
      description: "Choose the plan that's right for your business and start growing today. Not sure which plan is best? Contact our team for a personalized recommendation.",
      cta: "Contact Sales"
    }
  };

  const handlePlanClick = (type) => {
    router.push(`/contact?plan=${type}`);
  };

  const handlePricingDetailsClick = (plan) => {
    setSelectedPlan(plan);
    setDetailsOpen(true);
  };

  const handleFaqChange = (panel) => (event, isExpanded) => {
    setActiveFaq(isExpanded ? panel : null);
  };

  const handleCalculatorOpen = () => {
    setCalculatorOpen(true);
  };

  return (
    <ConsistentPageLayout title={pricingPageContent.hero.title} subtitle={pricingPageContent.hero.subtitle}>
      {/* HERO SECTION */}
      <CustomSection sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            opacity: 0.1,
            backgroundImage: 'url("/images/grid-pattern.svg")',
            backgroundSize: 'cover',
          }}
        />
        {/* Decorative shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.4)} 0%, transparent 70%)`,
            zIndex: 0,
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.3)} 0%, transparent 70%)`,
            zIndex: 0,
            opacity: 0.6,
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Typography
              variant="h2"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: '#fff',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              Pricing That Fuels <Box component="span" sx={{ color: alpha('#fff', 0.85) }}>Your Growth</Box>
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                color: alpha('#fff', 0.85),
                mb: 5,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              {pricingPageContent.hero.subtitle}
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="secondary"
                component={NextLink}
                href="#pricing-plans"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  color: theme.palette.getContrastText(theme.palette.secondary.main),
                  background: theme.palette.secondary.main,
                  boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.6)}`,
                  },
                }}
              >
                {pricingPageContent.hero.cta}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </CustomSection>

      {/* PRICING PLANS SECTION */}
      <CustomSection id="pricing-plans" sx={{ py: { xs: 10, md: 12 } }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h3"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                mb: 1,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {pricingPageContent.pricingSection.heading}
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                color: theme.palette.text.secondary,
                mb: 6,
                maxWidth: 700,
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              {pricingPageContent.pricingSection.description}
            </Typography>
          </motion.div>
          
          {/* FIXED: Grid container with consistent height handling */}
          <Grid 
            container 
            spacing={4} 
            sx={{ 
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            {plans.map((plan) => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={plan.type} 
                sx={{ 
                  display: 'flex',
                  height: '100%',
                }}
              >
                {renderPlanCard(plan, handlePlanClick, handlePricingDetailsClick, theme, isAnnual)}
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setIsAnnual(!isAnnual)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              Toggle {isAnnual ? 'Monthly' : 'Annual'} Billing
            </Button>
            
            {/* Value Calculator Button */}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<CalculateIcon />}
              onClick={handleCalculatorOpen}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              Try Our Price Calculator
            </Button>
          </Box>
        </Container>
      </CustomSection>

      {/* ADDITIONAL PRICING APPROACHES SECTION */}
      <CustomSection sx={{ 
        py: { xs: 10, md: 12 },
        bgcolor: alpha(theme.palette.background.default, 0.4),
      }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h3"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                mb: 1,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              More Flexible Options
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                color: theme.palette.text.secondary,
                mb: 6,
                maxWidth: 700,
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              Explore our additional pricing approaches designed for businesses with specific requirements.
            </Typography>
          </motion.div>
          
          <Grid 
            container 
            spacing={4} 
            sx={{ 
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            {additionalPlans.map((plan) => (
              <Grid 
                item 
                xs={12} 
                md={6} 
                key={plan.type} 
                sx={{ 
                  display: 'flex',
                  height: '100%',
                }}
              >
                {renderPlanCard(plan, handlePlanClick, handlePricingDetailsClick, theme, isAnnual)}
              </Grid>
            ))}
          </Grid>
        </Container>
      </CustomSection>

      {/* GUIDE SECTION - COMPLETELY FIXED WITH ABSOLUTE HEIGHTS */}
      <CustomSection sx={{ py: { xs: 10, md: 12 } }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h3"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                mb: SPACING.large,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {pricingPageContent.guideSection.heading}
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                color: theme.palette.text.secondary,
                mb: SPACING.large,
                fontSize: '1.1rem',
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              {pricingPageContent.guideSection.description}
            </Typography>
          </motion.div>
          
          {/* FIXED WITH ABSOLUTE POSITIONING */}
          <Grid 
            container 
            spacing={4} 
            sx={{ 
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            {pricingPageContent.guideSection.items.map((item, index) => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={index} 
                sx={{ 
                  display: 'flex',
                  height: { md: '420px' }, // FIXED ABSOLUTE HEIGHT
                }}
              >
                <motion.div
                  style={{ 
                    width: '100%',
                    height: '100%'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(
                        theme.palette.background.paper,
                        0.7
                      )} 100%)`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      position: 'relative', // Important for absolute positioning
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                      }}
                    >
                      {item.icon && React.createElement(item.icon, { sx: { fontSize: 30, color: 'white' } })}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                      {item.title}
                    </Typography>
                    <Box 
                      sx={{
                        overflow: 'auto',
                        flex: 1,
                        maxHeight: 'calc(100% - 150px)', // Fixed content area
                      }}
                    >
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </CustomSection>

      {/* FAQ SECTION */}
      <CustomSection sx={{ py: { xs: 10, md: 12 }, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h3"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                mb: 1,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {pricingPageContent.faqSection.heading}
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                color: theme.palette.text.secondary,
                mb: 6,
                maxWidth: 700,
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              Have questions? We've got answers to help you choose the right plan.
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              {pricingPageContent.faqSection.items.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={activeFaq === index}
                  onChange={handleFaqChange(index)}
                  sx={{
                    mb: 2,
                    borderRadius: '12px !important',
                    overflow: 'hidden',
                    boxShadow: activeFaq === index ? theme.shadows[3] : theme.shadows[1],
                    transition: 'all 0.3s ease',
                    '&:before': { display: 'none' },
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: '1.5rem',
                          transition: 'transform 0.3s ease',
                          transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                        }}
                      />
                    }
                    sx={{
                      minHeight: 64,
                      px: 3,
                      py: 1,
                      bgcolor: activeFaq === index ? alpha(theme.palette.primary.light, 0.08) : theme.palette.background.paper,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: activeFaq === index ? theme.palette.primary.main : theme.palette.text.primary,
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, py: 2, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                            {faq.answer}
                          </Typography>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </motion.div>
        </Container>
      </CustomSection>

      {/* FINAL CTA SECTION */}
      <CustomSection
        sx={{
          py: { xs: 10, md: 14 },
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(
            theme.palette.primary.main,
            0.85
          )} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            opacity: 0.05,
            backgroundImage: 'url("/images/pattern-dots.svg")',
            backgroundSize: 'cover',
          }}
        />
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Typography
              variant="h2"
              textAlign="center"
              sx={{
                fontWeight: 800,
                color: '#fff',
                mb: 3,
                fontSize: { xs: '2.2rem', md: '3rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              {pricingPageContent.finalCta.heading}
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{
                color: alpha('#fff', 0.9),
                mb: 6,
                maxWidth: 700,
                mx: 'auto',
                fontWeight: 'normal',
                lineHeight: 1.7,
              }}
            >
              {pricingPageContent.finalCta.description}
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="secondary"
                component={NextLink}
                href="/contact"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  color: theme.palette.getContrastText(theme.palette.secondary.main),
                  background: theme.palette.secondary.main,
                  boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.5)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.03)',
                    boxShadow: `0 12px 30px ${alpha(theme.palette.secondary.main, 0.7)}`,
                  },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                {pricingPageContent.finalCta.cta}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </CustomSection>

      {/* Pricing Details Dialog */}
      <PricingDetailsDialog
        open={detailsOpen}
        plan={selectedPlan}
        onClose={() => setDetailsOpen(false)}
        theme={theme}
        isAnnual={isAnnual}
      />

      {/* Price Calculator Dialog */}
      <Dialog
        open={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        maxWidth="md"
        fullWidth
        aria-labelledby="calculator-dialog-title"
      >
        <DialogTitle id="calculator-dialog-title">
          Price Calculator
        </DialogTitle>
        <DialogContent dividers>
          <ValueCalculator onClose={() => setCalculatorOpen(false)} theme={theme} />
        </DialogContent>
      </Dialog>
    </ConsistentPageLayout>
  );
};

export default PricingPage;