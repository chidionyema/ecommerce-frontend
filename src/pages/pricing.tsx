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
  Theme,
  Switch,
  FormControlLabel,
  Tooltip,
  Paper,
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
  Favorite as FavoriteIcon,
  ArrowForward as ArrowForwardIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import { CARD_STYLES, getSharedStyles, SPACING } from '../utils/sharedStyles';


const pricingPageContent = {
  hero: {
    title: 'Flexible Pricing for Your Growing Startup',
    subtitle:
      'Choose the plan that best fits your needs and budget, and get access to expert technology solutions that drive measurable results.',
    cta: 'Explore Our Plans',
  },
  pricingSection: {
    heading: 'Our Flexible Pricing Plans',
    description:
      'Choose the plan that best fits your needs and unlock expert technology solutions designed to propel your business forward.',
  },
  guideSection: {
    heading: 'Which Plan Is Right for You?',
    description:
      'Whether you need on‑demand advice, complete project delivery, or a long‑term strategic partner, we have a plan tailored for your business.',
    items: [
      {
        title: 'Rapid Consultation (Hourly)',
        description: 'Ideal for immediate expert guidance without long‑term commitments.',
        icon: SpeedIcon,
      },
      {
        title: 'Project Execution (Project‑Based)',
        description:
          'Best for organizations requiring comprehensive project delivery and dedicated support.',
        icon: WorkIcon,
      },
      {
        title: 'Strategic Partnership (Retainer)',
        description: 'Perfect for businesses seeking continuous support and proactive strategy.',
        icon: SupportIcon,
      },
    ],
  },
  faqSection: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept major credit cards, bank transfers, and PayPal. Our transparent pricing means no hidden fees.',
      },
      {
        question: 'Are there any long‑term contracts?',
        answer:
          'Our Hourly and Project‑Based plans are flexible with no long‑term commitments, while our Strategic Partnership plans involve tailored, longer‑term engagements.',
      },
      {
        question: 'What does a custom quote include?',
        answer:
          'For our Project Execution plans, custom quotes are based on project scope, resource requirements, and timelines—ensuring a solution built just for you.',
      },
      {
        question: 'How quickly can you start on my project?',
        answer:
          'For Rapid Consultation, we can typically schedule within 24-48 hours. For Project Execution, we\'ll provide a detailed timeline during our initial consultation based on your specific needs and our current capacity.',
      },
      {
        question: 'Do you offer any refunds or guarantees?',
        answer:
          'We stand behind our work with a satisfaction guarantee. If you\'re not completely satisfied with our services, we\'ll work with you to make it right or provide a refund according to our terms of service.',
      },
    ],
  },
  comparisonSection: {
    heading: 'Plan Comparison',
    description: 'See how our plans stack up to find your perfect fit.',
    features: [
      { name: 'Response Time', consultation: '24-48 hours', project: 'As per schedule', retainer: 'Priority (same day)' },
      { name: 'Team Size', consultation: '1 expert', project: 'Dedicated team', retainer: 'Full agency access' },
      { name: 'Tech Stack Support', consultation: 'Specific focus', project: 'Project scope', retainer: 'Comprehensive' },
      { name: 'Strategy Sessions', consultation: 'Optional', project: 'Included', retainer: 'Weekly' },
      { name: 'Performance Reports', consultation: 'Not included', project: 'Project-based', retainer: 'Monthly' },
    ]
  },
  testimonials: [
    {
      quote: "The Strategic Partnership plan revolutionized our approach to technology. We've seen a 43% increase in development efficiency since working with this team.",
      author: "Sarah Johnson",
      position: "CTO, GrowthTech Solutions",
      planType: "retainer"
    },
    {
      quote: "Their Project Execution plan delivered our e-commerce platform on time and under budget. The dedicated team approach made all the difference.",
      author: "Michael Chen",
      position: "Founder, Urban Retail",
      planType: "project"
    },
    {
      quote: "The Rapid Consultation option was exactly what we needed to solve our immediate challenges without a long-term commitment.",
      author: "Jessica Rivera",
      position: "Product Manager, LaunchPad Startups",
      planType: "consultation"
    }
  ],
  finalCta: {
    heading: 'Ready to Accelerate Your Growth?',
    description:
      'Have questions or ready to get started? Contact us today to discover how our expert solutions can drive your business forward.',
    cta: 'Get Your Free Consultation',
  },
};

type Plan = {
  type: string;
  title: string;
  tagline: string;
  features: { icon: React.ElementType; text: string }[];
  extraFeatures?: string[];
  price: string;
  annualPrice?: string;
  cardStyle: { backgroundColor: string };
  recommended?: boolean;
  ctaText?: string;
};

const plans: Plan[] = [
  {
    type: 'consultation',
    title: 'Rapid Consultation',
    tagline: 'Get immediate expert advice when you need it most.',
    features: [
      { icon: AccessTime, text: 'On-Demand Expertise' },
      { icon: EmojiEventsIcon, text: 'Real-Time Problem Solving' },
      { icon: CalendarTodayIcon, text: 'Instant Scheduling' },
    ],
    extraFeatures: [
      'No minimum commitment',
      'Access to knowledge base',
      'Email support',
    ],
    price: '$295/hr',
    cardStyle: { backgroundColor: 'rgba(25, 118, 210, 0.05)' },
    ctaText: 'Book Consultation',
  },
  {
    type: 'project',
    title: 'Project Execution',
    tagline: 'End-to-end solutions for your complex initiatives.',
    features: [
      { icon: WorkIcon, text: 'Complete Project Delivery' },
      { icon: GroupIcon, text: 'Dedicated Team Support' },
      { icon: EmojiEventsIcon, text: 'Quality Assurance' },
    ],
    extraFeatures: [
      'Dedicated project manager',
      'Bi-weekly progress reports',
      'Post-launch support (30 days)',
    ],
    price: 'Custom Quote',
    cardStyle: { backgroundColor: 'rgba(0, 121, 107, 0.05)' },
    ctaText: 'Request Quote',
  },
  {
    type: 'retainer',
    title: 'Strategic Partnership',
    tagline: 'A long-term ally for continuous growth and innovation.',
    features: [
      { icon: GroupIcon, text: '24/7 Ongoing Support' },
      { icon: InfoIcon, text: 'Tailored Technology Roadmap' },
      { icon: EmojiEventsIcon, text: 'Monthly Performance Reviews' },
    ],
    extraFeatures: [
      'Priority response times',
      'Quarterly strategy sessions',
      'Dedicated account executive',
      'Technology trend briefings',
    ],
    price: 'Starting at $15k/mo',
    annualPrice: 'Starting at $162k/yr',
    cardStyle: { backgroundColor: 'rgba(63, 81, 181, 0.05)' },
    recommended: true,
    ctaText: 'Schedule Strategy Call',
  },
];

const FeatureItem: React.FC<{ icon: React.ElementType; text: string }> = ({
  icon: Icon,
  text,
}) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center" gap={2} my={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderRadius: '16px',
          width: 40,
          height: 40,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        <Icon
          sx={{
            fontSize: 24,
            color: theme.palette.primary.main,
            transform: 'rotate(-10deg)',
          }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

const ExtraFeatureItem: React.FC<{ text: string }> = ({ text }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center" gap={1.5} my={1.5}>
      <CheckCircleIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

const renderPlanCard = (
  plan: Plan,
  handlePlanClick: (type: string) => void,
  theme: Theme,
  isAnnual: boolean
) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: plan.type === 'consultation' ? 0 : plan.type === 'project' ? 0.1 : 0.2 }}
    viewport={{ once: true }}
    key={plan.type}
    whileHover={{ 
      y: -10,
      transition: { duration: 0.3 } 
    }}
  >
    <Paper
      elevation={plan.recommended ? 8 : 4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: 520,
        p: 3,
        borderRadius: 4,
        position: 'relative',
        background: plan.recommended 
          ? `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${theme.palette.mode === 'light' ? 'white' : '#28282a'} 100%)`
          : theme.palette.mode === 'light' ? 'white' : '#28282a',
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
            zIndex: 0
          }}
        />
      )}
      
      <Box position="relative" zIndex={1}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          {plan.title}
        </Typography>
        <Typography variant="subtitle1" mb={3} color="text.secondary">
          {plan.tagline}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {isAnnual && plan.annualPrice ? plan.annualPrice : plan.price}
          </Typography>
          {isAnnual && plan.annualPrice && (
            <Typography variant="caption" color="success.main" sx={{ fontWeight: 'medium', display: 'block', mt: 0.5 }}>
              Save 10% with annual billing
            </Typography>
          )}
        </Box>
        
        <Box sx={{ mb: 4 }}>
          {plan.features.map((feature, i) => (
            <FeatureItem key={i} icon={feature.icon} text={feature.text} />
          ))}
        </Box>
        
        {plan.extraFeatures && (
          <Box sx={{ mb: 4 }}>
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
        variant={plan.recommended ? "contained" : "outlined"}
        color="primary"
        onClick={() => handlePlanClick(plan.type)}
        sx={{
          mt: 2,
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
    </Paper>
  </motion.div>
);

const PricingPage: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handlePlanClick = (type: string) => {
    router.push(`/contact?plan=${type}`);
  };

  const handleFaqChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setActiveFaq(isExpanded ? panel : null);
  };

  return (
    <ConsistentPageLayout
      title={pricingPageContent.hero.title}
      subtitle={pricingPageContent.hero.subtitle}
    >
      {/* HERO SECTION */}
      <PageSection
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
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
      </PageSection>

      {/* PRICING PLANS SECTION */}
      <PageSection id="pricing-plans" sx={{ py: { xs: 10, md: 12 } }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
              Client Success Stories
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
              Hear from our clients about how our flexible pricing models have helped them achieve their goals.
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
          </motion.div>
        </Container>
      </PageSection>

      {/* GUIDE SECTION */}
      <PageSection sx={{ py: { xs: 10, md: 12 }, bgcolor: alpha(theme.palette.background.default, 0.6) }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {pricingPageContent.guideSection.items.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      height: '100%',
                      background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
                      {item.icon && React.createElement(item.icon, {
                        sx: { fontSize: 30, color: 'white' }
                      })}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {item.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* FAQ SECTION */}
      <PageSection sx={{ py: { xs: 10, md: 12 } }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
                      <ExpandMoreIcon sx={{ 
                        color: theme.palette.primary.main,
                        fontSize: '1.5rem',
                        transition: 'transform 0.3s ease',
                        transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                      }} />
                    }
                    sx={{
                      minHeight: 64,
                      px: 3,
                      py: 1,
                      bgcolor: activeFaq === index 
                        ? alpha(theme.palette.primary.light, 0.08)
                        : theme.palette.background.paper,
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
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: theme.palette.text.secondary,
                              lineHeight: 1.7,
                            }}
                          >
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
      </PageSection>

      {/* FINAL CTA SECTION */}
      <PageSection 
        sx={{ 
          py: { xs: 10, md: 14 },
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
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
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
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
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default PricingPage