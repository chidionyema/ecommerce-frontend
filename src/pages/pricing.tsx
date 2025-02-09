import React from 'react';
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
} from '@mui/material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccessTime,
  EmojiEvents as EmojiEventsIcon,
  CalendarToday as CalendarTodayIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  Info as InfoIcon,
  Headset,
} from '@mui/icons-material';
import { CheckCircle } from 'lucide-react';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import GoldCard from '../components/GoldCard';
import { CARD_STYLES, getSharedStyles, SPACING } from '../utils/sharedStyles';

// ======================================================================
// CONTENT EXTRACTION: Change copy here without affecting styles.
// ======================================================================
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
      },
      {
        title: 'Project Execution (Project‑Based)',
        description:
          'Best for organizations requiring comprehensive project delivery and dedicated support.',
      },
      {
        title: 'Strategic Partnership (Retainer)',
        description: 'Perfect for businesses seeking continuous support and proactive strategy.',
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
    ],
  },
  finalCta: {
    heading: 'Ready to Accelerate Your Growth?',
    description:
      'Have questions or ready to get started? Contact us today to discover how our expert solutions can drive your business forward.',
    cta: 'Get Your Free Consultation',
  },
};

// ======================================================================
// PRICING PLANS DATA (Content for pricing cards)
// ======================================================================
type Plan = {
  type: string;
  title: string;
  tagline: string;
  features: { icon: React.ElementType; text: string }[];
  price: string;
  cardStyle: { backgroundColor: string };
  recommended?: boolean;
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
    price: '$295/hr',
    cardStyle: {
      backgroundColor: 'rgba(25, 118, 210, 0.05)', // Muted blue
    },
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
    price: 'Custom Quote',
    cardStyle: {
      backgroundColor: 'rgba(0, 121, 107, 0.05)', // Muted teal
    },
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
    price: 'Starting at $15k/mo',
    cardStyle: {
      backgroundColor: 'rgba(63, 81, 181, 0.05)', // Muted indigo
    },
    recommended: true,
  },
];

// ======================================================================
// HELPER COMPONENT: FeatureItem for bullet points in pricing cards
// ======================================================================
const FeatureItem: React.FC<{ icon: React.ElementType; text: string }> = ({
  icon: Icon,
  text,
}) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center" gap={1} my={0.5}>
      <Icon fontSize="small" sx={{ color: theme.palette.primary.main }} />
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

// ======================================================================
// RENDER FUNCTION FOR PRICING CARD (receives theme as a parameter)
// ======================================================================
const renderPlanCard = (
  plan: Plan,
  handlePlanClick: (type: string) => void,
  theme: Theme
) => (
  <GoldCard
    key={plan.type}
    onClick={() => handlePlanClick(plan.type)}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      minHeight: 450, // Adjusted for better card size consistency
      p: 3,
      borderRadius: 4,
      position: 'relative',
      background: `linear-gradient(135deg, ${plan.cardStyle.backgroundColor} 0%, transparent 100%)`,
      border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
      boxShadow: theme.shadows[3],
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)', // Slightly stronger hover effect
        boxShadow: theme.shadows[6],
      },
    }}
  >
    {plan.recommended && (
      <Chip
        label="Most Popular"
        color="secondary"
        size="small"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
          fontSize: '0.8rem',
          px: 1,
          fontWeight: 'bold',
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      />
    )}
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        {plan.title}
      </Typography>
      <Typography variant="subtitle1" mb={2} color="text.secondary">
        {plan.tagline}
      </Typography>
      {plan.features.map((feature, i) => (
        <FeatureItem key={i} icon={feature.icon} text={feature.text} />
      ))}
    </Box>
    <Box mt={2}>
      <Typography variant="h6" fontWeight="bold" color="primary">
        {plan.price}
      </Typography>
    </Box>
    <Button
      variant="contained"
      color="primary"
      onClick={() => handlePlanClick(plan.type)}
      sx={{
        mt: 3,
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        px: 4,
        py: 1.5,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        boxShadow: theme.shadows[3],
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: theme.shadows[6],
        },
      }}
    >
      Select Plan
    </Button>
  </GoldCard>
);

// ======================================================================
// MAIN PRICING PAGE COMPONENT
// ======================================================================
const PricingPage: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const router = useRouter();

  const handlePlanClick = (type: string) => {
    router.push(`/contact?plan=${type}`);
  };

  return (
    <ConsistentPageLayout
      title={pricingPageContent.hero.title}
      subtitle={pricingPageContent.hero.subtitle}
    >
      {/* HERO SECTION */}
      <PageSection>
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}
          >
            Pricing That Fuels Your Growth
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: alpha('#fff', 0.8), mb: 4 }}
          >
            {pricingPageContent.hero.subtitle}
          </Typography>
          <Box textAlign="center">
            <Button
              aria-label="Explore our pricing plans"
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
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                boxShadow: theme.shadows[4],
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              {pricingPageContent.hero.cta}
            </Button>
          </Box>
        </Container>
      </PageSection>

      {/* PRICING PLANS SECTION */}
      <PageSection>
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
        >
          {pricingPageContent.pricingSection.heading}
        </Typography>
        <Container>
          <Grid container spacing={SPACING.medium} justifyContent="center" sx={{ mt: 4 }}>
            {plans.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan.type}>
                {renderPlanCard(plan, handlePlanClick, theme)}
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* WHICH PLAN IS RIGHT FOR YOU SECTION */}
      <PageSection>
        <Typography variant="h3" textAlign="center" gutterBottom>
          {pricingPageContent.guideSection.heading}
        </Typography>
        <Typography variant="body1" textAlign="center" maxWidth={800} mx="auto">
          {pricingPageContent.guideSection.description}
        </Typography>
        <Box display="flex" flexDirection="column" gap={4} mt={4}>
          {pricingPageContent.guideSection.items.map((item, index) => (
            <Box key={index} p={2} borderRadius={2} boxShadow={alpha(theme.palette.divider, 0.2)}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {item.title}
              </Typography>
              <Typography variant="body2">{item.description}</Typography>
            </Box>
          ))}
        </Box>
      </PageSection>

      {/* FAQ SECTION */}
      <PageSection>
        <Typography variant="h3" textAlign="center" gutterBottom>
          {pricingPageContent.faqSection.heading}
        </Typography>
        <Box maxWidth={800} mx="auto">
          {pricingPageContent.faqSection.items.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: theme.shadows[2] },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
                sx={{
                  transition: 'background-color 0.3s ease',
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.light, 0.2) },
                }}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </PageSection>

      {/* FINAL CALL TO ACTION SECTION */}
      <PageSection>
        <Typography variant="h3" textAlign="center" gutterBottom>
          {pricingPageContent.finalCta.heading}
        </Typography>
        <Typography variant="body1" textAlign="center" maxWidth={600} mx="auto" mb={4}>
          {pricingPageContent.finalCta.description}
        </Typography>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            component={NextLink}
            href="/contact"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: theme.shadows[4],
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[6],
              },
            }}
          >
            {pricingPageContent.finalCta.cta}
          </Button>
        </Box>
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default PricingPage;
