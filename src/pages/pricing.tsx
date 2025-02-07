'use client';
import React from 'react';
import { Box, Typography, Button, useTheme, Container, Accordion, AccordionSummary, AccordionDetails, alpha, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import GoldCard from '../components/GoldCard';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import CardGrid from '../components/CardGrid';
import PageSection from '../components/PageSection';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CARD_STYLES, getSharedStyles, SPACING } from '../utils/sharedStyles';

// Define the type for a single plan
type Plan = {
  type: string;
  title: string;
  features: { icon: React.ElementType; text: string }[];
  price: string;
  cardStyle: { backgroundColor: string };
};

// Feature Item Component
const FeatureItem: React.FC<{ icon: React.ElementType; text: string }> = ({ icon: Icon, text }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center" gap={1} my={1}>
      <Icon fontSize="small" sx={{ color: theme.palette.primary.main }} />
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

// Pricing Plans Data
const plans: Plan[] = [
  {
    type: 'hourly',
    title: 'Expert Consultation',
    features: [
      { icon: AccessTimeIcon, text: 'Flexible hourly consulting' },
      { icon: EmojiEventsIcon, text: 'Expert technical guidance' },
      { icon: CalendarTodayIcon, text: 'Priority scheduling' },
    ],
    price: '$295/hr',
    cardStyle: {
      backgroundColor: 'rgba(255, 235, 59, 0.08)',
    },
  },
  {
    type: 'project',
    title: 'Managed Solutions',
    features: [
      { icon: WorkIcon, text: 'End-to-end project management' },
      { icon: GroupIcon, text: 'Dedicated engineering team' },
      { icon: EmojiEventsIcon, text: 'Quality assurance guarantee' },
    ],
    price: 'Custom Quote',
    cardStyle: {
      backgroundColor: 'rgba(76, 175, 80, 0.08)',
    },
  },
  {
    type: 'retainer',
    title: 'Strategic Partnership',
    features: [
      { icon: GroupIcon, text: '24/7 technical support' },
      { icon: InfoIcon, text: 'Strategic technology roadmap' },
      { icon: EmojiEventsIcon, text: 'Monthly performance reviews' },
    ],
    price: 'Starting at $15k/mo',
    cardStyle: {
      backgroundColor: 'rgba(33, 150, 243, 0.08)',
    },
  },
];

// Pricing Page Component
const PricingPage: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const router = useRouter();

  // Handle plan selection
  const handlePlanClick = (type: string) => {
    router.push(`/contact?plan=${type}`);
  };

  // Render individual plan cards
  const renderPlanCard = (plan: Plan) => (
    <GoldCard
      key={plan.type}
      onClick={() => handlePlanClick(plan.type)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: CARD_STYLES.minHeight,
        transition: CARD_STYLES.transition,
        '&:hover': {
          transform: CARD_STYLES.hoverTransform,
          boxShadow: theme.shadows[6],
        },
        ...plan.cardStyle,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {plan.title}
      </Typography>
      {plan.features.map((feature, i) => (
        <FeatureItem key={i} icon={feature.icon} text={feature.text} />
      ))}
      <Typography variant="h6" mt={2} fontWeight="bold">
        {plan.price}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handlePlanClick(plan.type)}
        sx={{
          mt: 'auto',
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 2,
        }}
      >
        Select Plan
      </Button>
    </GoldCard>
  );

  return (
    <ConsistentPageLayout>
      {/* Introduction Section */}
      <PageSection>
        <Typography variant="h2" textAlign="center" gutterBottom>
          Transparent Pricing, Exceptional Value
        </Typography>
        <Typography variant="body1" textAlign="center" maxWidth={600} mx="auto">
          We believe in transparent and flexible pricing that aligns with your business needs and delivers exceptional value.
          Our pricing plans are designed to provide you with access to expert-level technology consulting and solutions that drive tangible results.
        </Typography>
      </PageSection>

      {/* Pricing Plans Section */}
      <PageSection>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Our Pricing Plans
        </Typography>
        <Container>
          {/* Use Grid Container for Layout */}
          <Grid container spacing={SPACING.medium} justifyContent="center">
            {plans.map((plan) => (
              // Each card takes up 6 columns (50% width) on medium and larger screens
              <Grid item xs={12} sm={6} key={plan.type}>
                {renderPlanCard(plan)}
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* Which Plan is Right For You Section */}
      <PageSection>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Find Your Ideal Plan
        </Typography>
        <Typography variant="body1" textAlign="center" maxWidth={800} mx="auto">
          Choosing the right plan depends on your specific needs and goals. Here's a quick guide to help you decide:
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} mt={4}>
          <Typography variant="h6" fontWeight="bold">
            Expert Consultation (Hourly):
          </Typography>
          <Typography variant="body2">
            Ideal for businesses needing focused, short-term expert advice or strategic guidance.
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Managed Solutions (Project-Based):
          </Typography>
          <Typography variant="body2">
            Best for organizations seeking complete project delivery and dedicated team for complex initiatives.
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Strategic Partnership (Retainer):
          </Typography>
          <Typography variant="body2">
            Designed for businesses seeking ongoing support, strategic roadmap, and proactive technology management.
          </Typography>
        </Box>
      </PageSection>

      {/* Pricing FAQs Section */}
      <PageSection>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Pricing FAQs
        </Typography>
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content-1" id="faq-header-1">
              <Typography variant="h6">What payment methods do you accept?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                We accept major credit cards, bank transfers, and PayPal.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content-2" id="faq-header-2">
              <Typography variant="h6">Are there any hidden fees or long-term contracts?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                We are committed to transparent pricing. There are no hidden fees. Long-term contracts apply to our Strategic
                Partnership (retainer) plan, with flexible terms. Our Hourly and Managed Solutions are project-based.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content-3" id="faq-header-3">
              <Typography variant="h6">What is included in "Custom Quote" for Managed Solutions?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Custom quotes for Managed Solutions are tailored to the specific scope and complexity of your project. They
                include a dedicated team, project management, development, quality assurance, and ongoing support as defined
                in the project scope.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </PageSection>

      {/* Ready to Get Started Section */}
      <PageSection>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" textAlign="center" maxWidth={600} mx="auto" mb={4}>
          Have questions about our pricing plans or need help choosing the right option for your business? Our team is here
          to assist you.
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
              px: 4,
              py: 1.5,
            }}
          >
            Contact Us For a Free Consultation
          </Button>
        </Box>
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default PricingPage;