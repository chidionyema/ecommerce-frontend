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
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccessTime,
  EmojiEvents as EmojiEventsIcon,
  CalendarToday as CalendarTodayIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import GoldCard from '../components/GoldCard';
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
    cardStyle: { backgroundColor: 'rgba(25, 118, 210, 0.05)' },
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
    cardStyle: { backgroundColor: 'rgba(0, 121, 107, 0.05)' },
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
    cardStyle: { backgroundColor: 'rgba(63, 81, 181, 0.05)' },
    recommended: true,
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
        <Icon sx={{
          fontSize: 24,
          color: theme.palette.primary.main,
          transform: 'rotate(-10deg)',
        }} />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

const renderPlanCard = (
  plan: Plan,
  handlePlanClick: (type: string) => void,
  theme: Theme
) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    viewport={{ once: true }}
    key={plan.type}
  >
    <GoldCard
      onClick={() => handlePlanClick(plan.type)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: 450,
        p: 3,
        borderRadius: 4,
        position: 'relative',
        background: theme.palette.mode === 'light' ? 'white' : '#28282a',
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        boxShadow: theme.shadows[5],
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: theme.shadows[8],
        },
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
      </Box>
    </GoldCard>
  </motion.div>
);

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
              {pricingPageContent.hero.cta}
            </Button>
          </Box>
        </Container>
      </PageSection>

      {/* PRICING PLANS SECTION */}
      <PageSection>
        <Container>
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              mb: SPACING.large,
            }}
          >
            {pricingPageContent.pricingSection.heading}
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            {plans.map((plan) => (
              <Grid item key={plan.type} xs={12} sm={6} lg={4}>
                {renderPlanCard(plan, handlePlanClick, theme)}
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* GUIDE SECTION */}
      <PageSection>
        <Typography
          variant="h3"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            mb: SPACING.medium,
          }}
        >
          {pricingPageContent.guideSection.heading}
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            color: theme.palette.text.secondary,
            mb: SPACING.medium,
            fontSize: '1.1rem',
          }}
        >
          {pricingPageContent.guideSection.description}
        </Typography>
        <Box display="flex" flexDirection="column" gap={4} mt={4}>
          {pricingPageContent.guideSection.items.map((item, index) => (
            <Box key={index} p={3} borderRadius={2} boxShadow={alpha(theme.palette.divider, 0.2)}>
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

      {/* FINAL CTA SECTION */}
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
