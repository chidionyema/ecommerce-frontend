"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { Box, Typography, Container, Grid, Chip, useTheme, alpha, 
  Stack, Paper, Button, IconButton, Tooltip, Divider } from '@mui/material';
import { ArrowForwardRounded, CheckCircleRounded, InfoOutlined, CompareArrowsRounded,
  StarRounded, ShieldRounded, SupportRounded, SpeedRounded, CloseRounded } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ConsistentPageLayout from '../../components/Shared/ConsistentPageLayout';
import { theme as brandKit } from '../../theme/brandKit';
import { Theme } from '@mui/material/styles';

// Types
type BillingCycle = 'monthly' | 'annual';

interface Plan {
  type: string; 
  title: string; 
  tagline: string; 
  price: string;
  values?: string[]; 
  recommended?: boolean; 
  icon?: string;
}

interface Feature { 
  name: string; 
  values: Record<string, boolean | string>; 
}

// Define plans directly
const plans: Plan[] = [
  {
    type: "strategy",
    title: "Strategy Session",
    tagline: "Diagnose your key challenges and get a clear roadmap.",
    price: "£797", // GBP price
    values: ["Problem Diagnosis", "High-Level Roadmap", "Expert Recommendations"],
    icon: 'star',
  },
  {
    type: "project",
    title: "Project Implementation",
    tagline: "Get hands-on support to achieve your specific goals.",
    price: "Starting at £4,000", // GBP price
    values: ["Customized Solution", "Dedicated Project Management", "Tangible Results"],
    recommended: true,
    icon: 'speed',
  },
  {
    type: "custom",
    title: "Custom Solutions",
    tagline: "For complex projects and ongoing support.",
    price: "Contact Us",
    values: ["Tailored to Your Needs", "Long-Term Partnership", "Maximum Impact"],
    icon: 'shield',
  },
];

// Define feature comparison matrix
const allFeatures: Record<string, Feature[]> = {
  core: [
    { name: 'Problem Assessment', values: { strategy: true, project: true, custom: true } },
    { name: 'Solution Roadmap', values: { strategy: 'High-Level', project: 'Detailed', custom: 'Detailed' } },
    { name: 'Project Management', values: { strategy: false, project: true, custom: true } },
  ],
  support: [
    { name: 'Email Support', values: { strategy: true, project: true, custom: true } },
    { name: 'Priority Support', values: { strategy: false, project: true, custom: true } },
  ],
  security: [
    { name: 'Data Security', values: { strategy: true, project: true, custom: true } },
    { name: 'Confidentiality', values: { strategy: true, project: true, custom: true } },
  ],
};

// FAQ items
const faqItems = [
  {
    question: "How does the Project Implementation pricing work?",
    answer: "Project Implementation pricing starts at £4,000 but may vary based on the scope, complexity, and specific requirements of your project. We'll provide a detailed quote after understanding your needs during the initial consultation."
  },
  {
    question: "Do you offer international payment options?",
    answer: "Yes, we accept payments in major currencies including GBP, USD, and EUR. You can select your preferred currency using the currency switcher at the top of the page."
  },
  {
    question: "What's included in the Strategy Session?",
    answer: "The Strategy Session includes a comprehensive assessment of your business challenges, a high-level roadmap for addressing these challenges, and expert recommendations from our team of consultants."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity and scope. A typical implementation project ranges from 4-12 weeks, while custom solutions may extend further based on requirements."
  }
];

// Component helpers
const FeatureCheck = ({ color = 'primary', size = 'medium' }: { color?: 'primary' | 'success', size?: 'small' | 'medium' }) => {
  const theme = useTheme();
  const dims = size === 'small' ? 18 : 22;
  const iconSize = size === 'small' ? 14 : 16;
  
  return (
    <Box sx={{ width: dims, height: dims, borderRadius: '50%', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', bgcolor: alpha(color === 'primary' ? theme.palette.primary.main : theme.palette.success.main, 0.12) }}>
      <CheckCircleRounded sx={{ fontSize: iconSize, color: color === 'primary' ? theme.palette.primary.main : theme.palette.success.main }} />
    </Box>
  );
};

const FeatureCell = ({ value, plan, theme }: { value: boolean | string, plan: Plan, theme: Theme }) => {
  if (value === true) {
    return (
      <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: alpha(theme.palette.success.main, 0.12),
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircleRounded sx={{ fontSize: 16, color: theme.palette.success.main }} />
      </Box>
    );
  }
  if (value === false) {
    return <Box component="span" sx={{ width: 16, height: 2, bgcolor: alpha(theme.palette.text.disabled, 0.3), 
      display: 'inline-block', borderRadius: 1 }} />;
  }
  return <Typography variant="body2" sx={{ fontWeight: 600, 
    color: plan.recommended ? theme.palette.primary.main : theme.palette.text.primary }}>{value}</Typography>;
};

const PlanIcon = ({ icon, isRecommended, theme }: { icon: string, isRecommended: boolean, theme: Theme }) => {
  const iconColor = isRecommended ? theme.palette.primary.main : theme.palette.grey[700];
  const iconMap: Record<string, React.ReactNode> = {
    star: <StarRounded sx={{ fontSize: 20, color: iconColor }} />,
    shield: <ShieldRounded sx={{ fontSize: 20, color: iconColor }} />,
    speed: <SpeedRounded sx={{ fontSize: 20, color: iconColor }} />,
    support: <SupportRounded sx={{ fontSize: 20, color: iconColor }} />
  };
  
  return (
    <Box sx={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      bgcolor: alpha(isRecommended ? theme.palette.primary.main : theme.palette.grey[500], 0.1) }}>
      {iconMap[icon] || <StarRounded sx={{ fontSize: 20, color: iconColor }} />}
    </Box>
  );
};

const PlanCard = ({ plan, isRecommended, onClick, isHovered, onHover, currentCurrency }: 
  { plan: Plan, isRecommended: boolean, onClick: (planType: string) => void, 
    isHovered: boolean, onHover: (planType: string | null) => void, currentCurrency: string }) => {
  const theme = useTheme();
  
  // Get displayed price based on current currency
  const displayPrice = plan.price; // This would be updated with currency conversion logic
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      style={{ height: '100%' }} onMouseEnter={() => onHover(plan.type)} onMouseLeave={() => onHover(null)}>
      {isRecommended && (
        <Box sx={{ position: 'absolute', top: 12, right: -30, transform: 'rotate(45deg)',
          bgcolor: theme.palette.primary.main, color: '#fff', px: 4, py: 0.5,
          fontSize: '0.75rem', fontWeight: 600, zIndex: 1 }}>RECOMMENDED</Box>
      )}

      <Paper elevation={0} sx={{ bgcolor: 'background.paper', 
        border: `1px solid ${isRecommended ? alpha(theme.palette.primary.main, 0.25) : alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 4, p: 3.5, height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s', 
        boxShadow: isRecommended ? '0 8px 24px rgba(51,102,255,0.15)' : '0 2px 12px rgba(0,0,0,0.06)',
        ...(isHovered && { transform: 'translateY(-8px)', 
          boxShadow: isRecommended ? '0 16px 40px rgba(51,102,255,0.2)' : '0 12px 28px rgba(0,0,0,0.1)' }),
        minHeight: 450 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          {plan.icon && <PlanIcon icon={plan.icon} isRecommended={isRecommended} theme={theme} />}
          <Typography variant="h5" sx={{ fontWeight: 700, 
            color: isRecommended ? theme.palette.primary.main : theme.palette.text.primary }}>{plan.title}</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5, minHeight: 48 }}>{plan.tagline}</Typography>

        <Stack spacing={2.5} sx={{ mb: 4 }}>
          {plan.values?.map((feature, i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="center">
              <FeatureCheck color={isRecommended ? 'primary' : 'success'} />
              <Typography variant="body2" sx={{ color: isRecommended ? theme.palette.text.primary 
                : theme.palette.text.secondary, fontWeight: 500 }}>{feature}</Typography>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.12), my: 3.5 }} />

        <Box sx={{ mb: 3.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: isRecommended ? theme.palette.primary.main 
            : theme.palette.text.primary, display: 'inline-flex', alignItems: 'baseline', gap: 1 }}
            className="price-value" data-plan={plan.type}>
            {displayPrice}
          </Typography>
        </Box>

        <Button variant={isRecommended ? 'contained' : 'outlined'} fullWidth onClick={() => onClick(plan.type)}
          sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2.5, py: 1.75, mt: 'auto',
            ...(isRecommended && { background: brandKit.gradient.primary(theme), 
              boxShadow: '0 4px 14px rgba(51,102,255,0.35)',
              '&:hover': { boxShadow: '0 6px 20px rgba(51,102,255,0.5)', transform: 'translateY(-2px)' } }) }}
          endIcon={<ArrowForwardRounded />}>
          {plan.type === 'strategy' ? 'Get Started with Strategy' : 
           plan.type === 'project' ? 'Start Your Project' : 'Request a Consultation'}
        </Button>
      </Paper>
    </motion.div>
  );
};

const SectionHeading = ({ label, title, description }: { label?: string, title: string, description?: string }) => {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      {label && (
        <Typography component="span" sx={{ fontSize: '0.875rem', fontWeight: 600, color: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.main, 0.1), py: 0.75, px: 2, borderRadius: 5,
          display: 'inline-block', mb: 2, textTransform: 'uppercase' }}>{label}</Typography>
      )}
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>{title}</Typography>
      {description && <Typography variant="body1" color="text.secondary" 
        sx={{ maxWidth: 600, mx: 'auto' }}>{description}</Typography>}
    </Box>
  );
};

// Currency conversion function (conceptual)
const getExchangeRate = async (fromCurrency: string, toCurrency: string) => {
  // In a real implementation, you would fetch this from an API like Open Exchange Rates
  // For now, we'll use a simple mapping
  const rates = {
    GBP: { USD: 1.27, EUR: 1.18 },
    USD: { GBP: 0.79, EUR: 0.93 },
    EUR: { GBP: 0.85, USD: 1.08 }
  };
  
  if (fromCurrency === toCurrency) return 1;
  return rates[fromCurrency as keyof typeof rates][toCurrency as keyof typeof rates[keyof typeof rates]] || 1;
};

// Main component
export default function PricingPage() {
  const theme = useTheme();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [compareMode, setCompareMode] = useState(false);
  const [hoverCard, setHoverCard] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('GBP');

  useEffect(() => { 
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePlanClick = (planType: string) => {
    if (planType === 'strategy') {
      router.push('/contact?plan=strategy');
    } else if (planType === 'project') {
      router.push('/contact?plan=project');
    } else {
      router.push('/contact');
    }
  };

  // This would update prices based on selected currency
  const updatePrices = async (newCurrency: string) => {
    if (newCurrency === currentCurrency) return;
    
    // In a real implementation, this would update the DOM with converted prices
    // For demo purposes, we're just updating the state
    setCurrentCurrency(newCurrency);
  };

  const handleCurrencyChange = async (currency: string) => {
    await updatePrices(currency);
  };

  // Categories for feature comparison
  const categories = [
    { name: 'Core Features', id: 'core', icon: <SpeedRounded fontSize="small" /> },
    { name: 'Support', id: 'support', icon: <SupportRounded fontSize="small" /> },
    { name: 'Security', id: 'security', icon: <ShieldRounded fontSize="small" /> },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', overflow: 'hidden', pb: 10 }}>
      <ConsistentPageLayout scrollOptions={{ showSectionMenu: false, showProgressIndicator: false }}>
        {/* Hero Section */}
        <Container maxWidth="md" sx={{ mt: { xs: 8, md: 12 }, mb: { xs: 8, md: 10 } }}>
          <Box textAlign="center">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: animateIn ? 1 : 0, y: animateIn ? 0 : 15 }}
              transition={{ duration: 0.5 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.25rem' }, fontWeight: 800, mb: 3,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Simple Pricing, Powerful Results
              </Typography>

              <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 6, maxWidth: 600, 
                mx: 'auto', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                Choose the right plan to accelerate your business growth...
              </Typography>
            </motion.div>

            {/* Currency Switcher */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: animateIn ? 1 : 0, y: animateIn ? 0 : 15 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 6 }}>
                <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.06),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  borderRadius: 10, p: 0.75, display: 'inline-flex' }}>
                  <Button onClick={() => handleCurrencyChange('GBP')}
                    variant={currentCurrency === 'GBP' ? 'contained' : 'text'} disableElevation
                    sx={{ minWidth: 80, borderRadius: 8, textTransform: 'none', fontWeight: 600,
                      color: currentCurrency === 'GBP' ? '#fff' : theme.palette.text.primary }}>GBP (£)</Button>
                  <Button onClick={() => handleCurrencyChange('USD')}
                    variant={currentCurrency === 'USD' ? 'contained' : 'text'} disableElevation
                    sx={{ minWidth: 80, borderRadius: 8, textTransform: 'none', fontWeight: 600,
                      color: currentCurrency === 'USD' ? '#fff' : theme.palette.text.primary }}>USD ($)</Button>
                  <Button onClick={() => handleCurrencyChange('EUR')}
                    variant={currentCurrency === 'EUR' ? 'contained' : 'text'} disableElevation
                    sx={{ minWidth: 80, borderRadius: 8, textTransform: 'none', fontWeight: 600,
                      color: currentCurrency === 'EUR' ? '#fff' : theme.palette.text.primary }}>EUR (€)</Button>
                </Box>
              </Stack>
            </motion.div>
          </Box>
        </Container>

        {/* Pricing Cards */}
        <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 10 } }}>
          {/* Plan cards */}
          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan, index) => {
              const isRecommended = plan.type === 'project' || !!plan.recommended;
              
              return (
                <Grid item xs={12} sm={6} md={4} key={plan.type} sx={{ zIndex: isRecommended ? 2 : 1 }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: animateIn ? 1 : 0, y: animateIn ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}>
                    <PlanCard 
                      plan={plan} 
                      isRecommended={isRecommended}
                      onClick={handlePlanClick}
                      isHovered={hoverCard === plan.type} 
                      onHover={setHoverCard}
                      currentCurrency={currentCurrency}
                    />
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          {/* Compare All Features Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setCompareMode(true)}
              startIcon={<CompareArrowsRounded />}
              sx={{ mt: 4 }}
            >
              Compare All Features
            </Button>
          </Box>
        </Container>

        {/* Feature comparison table */}
        <AnimatePresence>
          {compareMode && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <Container maxWidth="lg">
                <Paper elevation={0} sx={{ border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 4, overflow: 'hidden', mb: { xs: 10, md: 16 } }}>
                  <Box sx={{ overflowX: 'auto' }}>
                    <Box sx={{ minWidth: 900, p: 3 }}>
                      <Grid container>
                        {/* Plan headers */}
                        <Grid item xs={4}>
                          <Box sx={{ height: 90, display: 'flex', alignItems: 'flex-end', pb: 2, pl: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                              Plan Features
                            </Typography>
                          </Box>
                        </Grid>
                        
                        {plans.map((plan) => (
                          <Grid item xs={8 / plans.length} key={`header-${plan.type}`}>
                            <Box sx={{ height: 90, display: 'flex', flexDirection: 'column',
                              justifyContent: 'space-between', alignItems: 'center',
                              bgcolor: plan.recommended ? alpha(theme.palette.primary.main, 0.06) : 'transparent',
                              borderRadius: '12px 12px 0 0' }}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <PlanIcon icon={plan.icon || ''} isRecommended={!!plan.recommended} theme={theme} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>{plan.title}</Typography>
                              </Stack>
                              <Typography variant="body2" sx={{ fontWeight: 600 }} className="price-value" data-plan={plan.type}>
                                {plan.price}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}

                        {/* Features by category */}
                        {categories.map((category, categoryIndex) => (
                          <React.Fragment key={category.id}>
                            {/* Category header */}
                            <Grid item xs={12} sx={{ mt: categoryIndex === 0 ? 2 : 5 }}>
                              <Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5,
                                borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.04),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, mb: 2 }}>
                                <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', 
                                  alignItems: 'center', justifyContent: 'center',
                                  bgcolor: alpha(theme.palette.primary.main, 0.12) }}>{category.icon}</Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{category.name}</Typography>
                              </Box>
                            </Grid>
                            
                            {/* Features for this category */}
                            {allFeatures[category.id].map((feature, featureIndex) => (
                              <React.Fragment key={`${category.id}-feature-${featureIndex}`}>
                                {/* Feature name column */}
                                <Grid item xs={4}>
                                  <Box sx={{ py: 2.5, pl: 3, pr: 2,
                                    borderTop: featureIndex === 0 ? 'none' : `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                    display: 'flex', alignItems: 'center',
                                    bgcolor: featureIndex % 2 === 0 ? alpha(theme.palette.background.default, 0.4) : 'transparent' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                                      {feature.name}
                                      <Tooltip title={`More information about ${feature.name}`} arrow>
                                        <IconButton size="small" sx={{ ml: 0.75, opacity: 0.6 }}>
                                          <InfoOutlined sx={{ fontSize: 16 }} />
                                        </IconButton>
                                      </Tooltip>
                                    </Typography>
                                  </Box>
                                </Grid>

                                {/* Feature values by plan */}
                                {plans.map((plan) => (
                                  <Grid item xs={8 / plans.length} key={`${category.id}-${feature.name}-${plan.type}`}>
                                    <Box sx={{ py: 2.5, borderTop: featureIndex === 0 ? 'none' : `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                      textAlign: 'center', bgcolor: featureIndex % 2 === 0 ? 
                                        alpha(theme.palette.background.default, 0.4) : 'transparent' }}>
                                      <FeatureCell value={feature.values[plan.type]} plan={plan} theme={theme} />
                                    </Box>
                                  </Grid>
                                ))}
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Box>
                  </Box>

                  {/* Hide Comparison Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => setCompareMode(false)}
                      startIcon={<CloseRounded />}
                      sx={{ mt: 2 }}
                    >
                      Hide Comparison
                    </Button>
                  </Box>
                </Paper>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Value Proposition Section (Optional) */}
        <Box sx={{ py: 8, bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
          <Container maxWidth="lg">
            <SectionHeading 
              label="Why Choose Us" 
              title="Delivering Real Value" 
              description="Our services are designed to provide tangible results for your business"
            />
            
            <Grid container spacing={4} justifyContent="center">
              {[
                { title: "Expert Guidance", description: "Work with industry specialists who understand your challenges", icon: "star" },
                { title: "Proven Results", description: "Our methodologies have delivered success for hundreds of clients", icon: "speed" },
                { title: "Ongoing Support", description: "We're with you every step of the way, from strategy to implementation", icon: "support" }
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 4, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                      <PlanIcon icon={item.icon} isRecommended={false} theme={theme} />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* FAQ section */}
        <Box sx={{ position: 'relative', py: { xs: 12, md: 16 },
          backgroundImage: `radial-gradient(circle at 10% 90%, ${alpha(theme.palette.primary.light, 0.08)} 0%, transparent 60%)` }}>
          <Container maxWidth="md" sx={{ position: 'relative' }}> 
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
              <SectionHeading label="Support" title="Frequently asked questions" 
                description="Everything you need to know about our pricing and plans" />
            </motion.div>

            {/* FAQ cards */}
            <Grid container spacing={4}>
              {faqItems.map((faq, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }} 
                    transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}>
                    <Paper elevation={0} sx={{ borderRadius: 4, p: 3.5, height: '100%', 
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      bgcolor: index % 2 === 0 ? alpha(theme.palette.background.paper, 0.8) : 
                        alpha(theme.palette.primary.main, 0.05),
                      '&:hover': { borderColor: alpha(theme.palette.primary.main, 0.25), transform: 'translateY(-6px)' } }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{faq.question}</Typography>
                      <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                        {faq.answer}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        {/* CTA section */}
        <Container maxWidth="lg" sx={{ mb: { xs: 10, md: 12 } }}>
          <Box sx={{ position: 'relative', py: { xs: 8, md: 10 }, 
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            borderRadius: 4 }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 6, md: 8 }, 
              alignItems: 'center', justifyContent: 'space-between' }}>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}
                style={{ maxWidth: 480 }}>
                <Typography component="span" sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff',
                  bgcolor: alpha('#fff', 0.15), py: 0.75, px: 2, borderRadius: 5,
                  display: 'inline-block', mb: 2.5, textTransform: 'uppercase',
                  border: `1px solid ${alpha('#fff', 0.2)}` }}>Get Started Today</Typography>
                
                <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, 
                  fontWeight: 800, color: '#fff', mb: 3 }}>Ready to transform your business?</Typography>

                <Typography variant="body1" sx={{ color: alpha('#fff', 0.9), mb: 4 }}>
                  Join hundreds of growing businesses that trust our solutions to scale and succeed.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                  <Button component={NextLink} href="/contact" size="large" variant="contained" 
                    sx={{ bgcolor: '#fff', color: theme.palette.primary.dark, 
                      textTransform: 'none', fontWeight: 700, py: 1.75, px: 4, borderRadius: 3,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                    Get started now
                  </Button>
                  <Button variant="outlined" component={NextLink} href="/contact?demo=true" size="large" 
                    sx={{ borderColor: alpha('#fff', 0.6), color: '#fff', 
                      textTransform: 'none', fontWeight: 600, py: 1.75, px: 4, borderRadius: 3,
                      bgcolor: alpha('#fff', 0.05) }}>
                    Request demo
                  </Button>
                </Stack>
              </motion.div>

              {/* Stats card */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }}
                style={{ width: '100%', maxWidth: 350 }}>
                <Paper elevation={0} sx={{ backdropFilter: 'blur(10px)', bgcolor: alpha('#fff', 0.08),
                  borderRadius: 4, border: `1px solid ${alpha('#fff', 0.2)}`, p: 4, width: '100%',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3.5 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', 
                      justifyContent: 'center', bgcolor: alpha('#fff', 0.15) }}>
                      <StarRounded sx={{ fontSize: 20, color: '#fff' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>Trusted globally</Typography>
                  </Stack>

                  <Grid container spacing={3}>
                    {[
                      { value: '97%', label: 'Client satisfaction', icon: <StarRounded fontSize="small" /> },
                      { value: '500+', label: 'Projects completed', icon: <SpeedRounded fontSize="small" /> },
                      { value: '4.9', label: 'TrustPilot rating', icon: <ShieldRounded fontSize="small" /> },
                      { value: '24/7', label: 'Customer support', icon: <SupportRounded fontSize="small" /> }
                    ].map((stat, i) => (
                      <Grid item xs={6} key={i}>
                        <motion.div whileHover={{ y: -5 }}>
                          <Box sx={{ p: 2, textAlign: 'center', bgcolor: alpha('#fff', 0.05), borderRadius: 3,
                            border: `1px solid ${alpha('#fff', 0.1)}`, height: '100%', display: 'flex', 
                            flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, opacity: 0.7 }}>{stat.icon}</Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', mb: 0.5 }}>{stat.value}</Typography>
                            <Typography variant="body2" sx={{ color: alpha('#fff', 0.8), fontSize: '0.75rem' }}>{stat.label}</Typography>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </motion.div>
            </Container>
          </Box>
        </Container>
        
        {/* Support section */}
        <Container maxWidth="md" sx={{ mb: { xs: 12, md: 16 } }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              bgcolor: alpha(theme.palette.background.paper, 0.8), position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` }} />
              
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.palette.primary.main }}>
                    <SupportRounded />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Have more questions?</Typography>
                </Stack>
                
                <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary }}>
                  Our support team is here to help you find the right plan for your needs and answer any questions 
                  you may have about our pricing, features, or implementation.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth component={NextLink} href="/contact" variant="outlined" size="large"
                      sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.5 }}>Contact sales</Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth component={NextLink} href="/contact?demo=true" variant="contained" size="large"
                      sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.5 }}>Schedule a demo</Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </motion.div>
        </Container>

        {/* Visual footer divider */}
        <Box sx={{ height: 1, width: '100%', maxWidth: 1200, mx: 'auto',
          background: `linear-gradient(90deg, ${alpha(theme.palette.divider, 0)}, 
            ${alpha(theme.palette.divider, 0.5)}, ${alpha(theme.palette.divider, 0)})`, mb: 8 }} />
      </ConsistentPageLayout>
    </Box>
  );
}