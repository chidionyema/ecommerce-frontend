'use client';

import React from 'react';
import { Box, Typography, Button, useTheme, Grid, Container, Accordion, AccordionSummary, AccordionDetails, alpha } from '@mui/material';
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

interface FeatureItemProps {
  icon: React.ElementType;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, text }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        px: 2,
        backgroundColor: theme.palette.mode === 'light'
          ? alpha(theme.palette.primary.light, 0.1) // Subtle light primary color
          : alpha(theme.palette.primary.dark, 0.1), // Subtle dark primary color
        borderRadius: '12px',
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.mode === 'light'
            ? alpha(theme.palette.primary.light, 0.2) // Slightly darker light primary
            : alpha(theme.palette.primary.dark, 0.2), // Slightly darker dark primary
          borderRadius: '50%',
          width: 36,
          height: 36,
          mr: 2,
        }}
      >
        <Icon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
        {text}
      </Typography>
    </Box>
  );
};

const plans = [
  {
    type: 'hourly',
    title: 'Expert Consultation',
    features: [
      { icon: AccessTimeIcon, text: 'Flexible hourly consulting' },
      { icon: EmojiEventsIcon, text: 'Expert technical guidance' },
      { icon: CalendarTodayIcon, text: 'Priority scheduling' },
    ],
    price: '$295/hr',
    cardStyle: { // New cardStyle for Hourly plan
      backgroundColor: 'rgba(255, 235, 59, 0.08)', // Subtle Yellow for Hourly - adjust alpha for intensity
      "&:hover": {
        backgroundColor: 'rgba(255, 235, 59, 0.15)', // Slightly darker on hover
      }
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
    cardStyle: { // New cardStyle for Project plan
      backgroundColor: 'rgba(76, 175, 80, 0.08)', // Subtle Green for Project - adjust alpha for intensity
      "&:hover": {
        backgroundColor: 'rgba(76, 175, 80, 0.15)', // Slightly darker on hover
      }
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
    cardStyle: { // New cardStyle for Retainer plan
      backgroundColor: 'rgba(33, 150, 243, 0.08)', // Subtle Blue for Retainer - adjust alpha for intensity
      "&:hover": {
        backgroundColor: 'rgba(33, 150, 243, 0.15)', // Slightly darker on hover
      }
    },
  },
];

const PricingPage: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const router = useRouter();

  const handlePlanClick = (type: string) => {
    router.push(`/contact?plan=${type}`);
  };

  const renderPlanCard = (plan: typeof plans[0]) => (
    <GoldCard
      onClick={() => handlePlanClick(plan.type)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: CARD_STYLES.minHeight,
        transition: CARD_STYLES.transition,
        '&:hover': { transform: CARD_STYLES.hoverTransform },
        ...plan.cardStyle, // Apply cardStyle from plan data here!
      }}
    >
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
            color: theme.palette.text.primary,
          }}
        >
          {plan.title}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {plan.features.map((feature, i) => (
            <FeatureItem key={i} icon={feature.icon} text={feature.text} />
          ))}
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mt: 2,
            mb: 2,
            textAlign: 'center',
            color: theme.palette.text.primary,
          }}
        >
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
      </Box>
    </GoldCard>
  );

  return (
    <ConsistentPageLayout
      seoTitle="Fuel Your Startup's Growth: Premium Tech Consulting Pricing"
      seoDescription="Unlock your startup's full potential with our tailored pricing plans. Our expert consultants provide the guidance and support you need to succeed."
      title="Flexible Plans for Every Need."
      subtitle="Choose the plan that aligns with your ambitious vision."
    >
      {/* Introduction Section */}
      <PageSection sx={{  }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
            }}
          >
            Transparent Pricing, Exceptional Value
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
          >
            We believe in transparent and flexible pricing that aligns with your business needs and delivers exceptional value. Our pricing plans are designed to provide you with access to expert-level technology consulting and solutions that drive tangible results.
          </Typography>
        </Container>
      </PageSection>

      {/* Pricing Plans Section */}
      <PageSection sx={{ }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 'bold',
          }}
        >
          Our Pricing Plans
        </Typography>
        <CardGrid data={plans} renderItem={renderPlanCard} />
      </PageSection>

      {/* Which Plan is Right For You Section */}
      <PageSection sx={{ mb: SPACING.small }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
            }}
          >
            Find Your Ideal Plan
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
          >
            Choosing the right plan depends on your specific needs and goals. Here's a quick guide to help you decide:
          </Typography>
          {/* Plan Selector Guide - Customize these descriptions! */}
          <Box component="ul" sx={{ listStyleType: 'none', m: 0, p: 0, maxWidth: 600, mx: 'auto' }}>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}><b>Expert Consultation (Hourly):</b> Ideal for businesses needing focused, short-term expert advice or strategic guidance.</Typography>
            </Box>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}><b>Managed Solutions (Project-Based):</b> Best for organizations seeking complete project delivery and dedicated team for complex initiatives.</Typography>
            </Box>
            <Box component="li" sx={{ py: 0.5, textAlign: 'center' }}>
              <Typography variant="body1" color="text.primary" fontWeight={500}><b>Strategic Partnership (Retainer):</b> Designed for businesses seeking ongoing support, strategic roadmap, and proactive technology management.</Typography>
            </Box>
          </Box>
          {/* Optional Key Considerations Checklist - Customize these questions! */}
          <Box sx={{ mt: SPACING.medium, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6" align="center" sx={{ mb: SPACING.small, color: theme.palette.text.primary }}>Key Considerations:</Typography>
            <Box component="ul" sx={{ listStyleType: 'none', m: 0, p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Typography variant="body2" color="text.secondary"> <Box component="span" fontWeight={500}>Scope of Need:</Box>  Hourly, Project-Based, or Ongoing?</Typography>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Typography variant="body2" color="text.secondary"> <Box component="span" fontWeight={500}>Team & Management:</Box> Do you need a dedicated team and project management?</Typography>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Typography variant="body2" color="text.secondary"> <Box component="span" fontWeight={500}>Support & Strategy:</Box> Do you require ongoing support and strategic technology roadmap?</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </PageSection>

      {/* Pricing FAQs Section */}
      <PageSection>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
              mb: SPACING.medium,
            }}
          >
            Pricing FAQs
          </Typography>
          {/* FAQ Accordion - Customize questions and answers! */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content-1" id="faq-header-1">
              <Typography variant="subtitle1" fontWeight={500}>What payment methods do you accept?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                [Placeholder: Answer to payment methods question. E.g., We accept major credit cards, bank transfers, and PayPal.]
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content-2" id="faq-header-2">
              <Typography variant="subtitle1" fontWeight={500}>Are there any hidden fees or long-term contracts?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                [Placeholder: Answer to hidden fees/contracts question. E.g.,  We are committed to transparent pricing. There are no hidden fees. Long-term contracts apply to our Strategic Partnership (retainer) plan, with flexible terms. Our Hourly and Managed Solutions are project-based.]
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content-3" id="faq-header-3">
              <Typography variant="subtitle1" fontWeight={500}>What is included in "Custom Quote" for Managed Solutions?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                [Placeholder: Answer to "Custom Quote" question. E.g., Custom quotes for Managed Solutions are tailored to the specific scope and complexity of your project. They include a dedicated team, project management, development, quality assurance, and ongoing support as defined in the project scope.]
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Add more FAQ Accordions as needed */}
        </Container>
      </PageSection>

      {/* Ready to Get Started Section */}
      <PageSection>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              ...styles.pageTitle,
              color: theme.palette.text.primary,
              mb: SPACING.medium,
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: SPACING.large }}
          >
            Have questions about our pricing plans or need help choosing the right option for your business? Our team is here to assist you.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={NextLink}
              href="/contact"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                py: 1.5,
              }}
            >
              Contact Us For a Free Consultation
            </Button>
          </Box>
        </Container>
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default PricingPage;