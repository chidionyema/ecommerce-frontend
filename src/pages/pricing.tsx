'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';

// MUI direct imports for better tree-shaking
import { Box, Typography, Button, Container, Grid, Accordion, AccordionSummary, 
  AccordionDetails, Chip, Paper, useTheme, alpha } from '@mui/material';

// MUI Icons - consolidated imports
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  EmojiEvents as EmojiEventsIcon, CalendarToday as CalendarIcon, Work as WorkIcon,
  Group as GroupIcon, Info as InfoIcon, CheckCircle as CheckIcon, Support as SupportIcon,
  Analytics as AnalyticsIcon, Speed as SpeedIcon, ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import { SPACING } from '../utils/sharedStyles';
import { pricingPageContent } from '../data/pricingPageData';

// Dynamic imports with types
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false });

// Define types for our plan features
interface FeatureItemProps {
  icon: SvgIconComponent;
  text: string;
}

interface ExtraFeatureItemProps {
  text: string;
}

interface Plan {
  type: string;
  title: string;
  tagline: string;
  value: string;
  features: FeatureItemProps[];
  extraFeatures: string[];
  ctaText: string;
  recommended: boolean;
}

interface CustomSectionProps {
  children: React.ReactNode;
  id?: string;
  sx?: any;
  [key: string]: any;
}

// Updated plans with value proposition instead of pricing
const enhancedPlans: Plan[] = [
  {
    type: 'consultation',
    title: 'Basic',
    tagline: 'For smaller projects',
    value: 'Core architecture and implementation',
    features: [
      { icon: SpeedIcon, text: 'Standard deployment architecture' },
      { icon: SupportIcon, text: 'Email-based technical support' },
      { icon: AnalyticsIcon, text: 'Basic monitoring setup' }
    ],
    extraFeatures: [
      'CI/CD pipeline templates',
      'Documentation access',
      'Implementation within 3 weeks'
    ],
    ctaText: 'Request Basic Info',
    recommended: false
  },
  {
    type: 'project',
    title: 'Professional',
    tagline: 'For growing enterprises',
    value: 'Advanced architecture with dedicated support',
    features: [
      { icon: SpeedIcon, text: 'High-performance architecture' },
      { icon: SupportIcon, text: 'Priority support with dedicated engineer' },
      { icon: AnalyticsIcon, text: 'Advanced monitoring and alerting' }
    ],
    extraFeatures: [
      'Advanced deployment strategies',
      'Infrastructure as code templates',
      'Implementation within 2 weeks',
      'Dedicated technical account manager'
    ],
    ctaText: 'Schedule Consultation',
    recommended: true
  },
  {
    type: 'enterprise',
    title: 'Enterprise',
    tagline: 'For mission-critical systems',
    value: 'Custom enterprise solutions with SLA guarantees',
    features: [
      { icon: SpeedIcon, text: 'Fully custom high-availability architecture' },
      { icon: SupportIcon, text: '24/7 premium support with SLA guarantee' },
      { icon: AnalyticsIcon, text: 'Comprehensive monitoring suite' }
    ],
    extraFeatures: [
      'Fully managed infrastructure',
      'Custom integration development',
      'Implementation within 10 days',
      'Dedicated architect and support team'
    ],
    ctaText: 'Contact Enterprise Team',
    recommended: false
  }
];

// Reusable components as function expressions
const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, text }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="flex-start" gap={2} my={2}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        borderRadius: '16px', width: 40, height: 40, minWidth: 40,
        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
      }}>
        <Icon sx={{ fontSize: 24, color: theme.palette.primary.main, transform: 'rotate(-10deg)' }} />
      </Box>
      <Typography variant="body2" color="text.secondary">{text}</Typography>
    </Box>
  );
};

const ExtraFeatureItem: React.FC<ExtraFeatureItemProps> = ({ text }) => (
  <Box display="flex" alignItems="flex-start" gap={1.5} my={1.5}>
    <CheckIcon fontSize="small" sx={{ color: 'success.main', mt: 0.5 }} />
    <Typography variant="body2" color="text.secondary">{text}</Typography>
  </Box>
);

const CustomSection: React.FC<CustomSectionProps> = ({ children, id, sx = [], ...props }) => {
  const theme = useTheme();
  return (
    <Box component="section" id={id} sx={[{
      position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      pt: { xs: 8, md: 12 }, pb: { xs: 12, md: 16 },
    }, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {children}
    </Box>
  );
};

const PricingPage: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Animation variants
  const fadeIn = { opacity: 0, y: 20 };
  const fadeInScale = { opacity: 0, scale: 0.95 };
  
  // Reusable styles
  const ctaButtonStyle = {
    textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 6, py: 2, fontSize: '1.1rem',
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    background: theme.palette.secondary.main,
    boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.6)}`,
    },
  };
  
  const sectionHeadingStyle = {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    mb: 1,
    fontSize: { xs: '2rem', md: '2.5rem' },
  };
  
  const sectionDescStyle = {
    color: theme.palette.text.secondary,
    mb: 6,
    maxWidth: 700,
    mx: 'auto',
    fontSize: '1.1rem',
  };

  // Event handlers
  const handlePlanClick = (type: string) => router.push(`/contact?plan=${type}`);
  const handleFaqChange = (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => setActiveFaq(isExpanded ? panel : null);

  // Plan card renderer
  const renderPlanCard = (plan: Plan) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <MotionDiv
        style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: plan.type === 'consultation' ? 0 : plan.type === 'project' ? 0.1 : 0.2 }}
        viewport={{ once: true }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        key={plan.type}
      >
        <Paper
          elevation={plan.recommended ? 8 : 4}
          sx={{
            display: 'flex', flexDirection: 'column', width: '100%', height: '100%', p: 3, borderRadius: 4,
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
            <>
              <Chip
                label="Most Popular"
                size="small"
                sx={{
                  position: 'absolute', top: 16, right: 16, zIndex: 1, fontSize: '0.8rem', px: 1, fontWeight: 600,
                  bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
                }}
              />
              <Box sx={{
                position: 'absolute', top: -50, right: -50, width: 100, height: 100,
                bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: '50%', zIndex: 0,
              }} />
            </>
          )}
          
          <Box position="relative" zIndex={1} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box>
              <Typography variant="h5" fontWeight="bold" mb={1}>{plan.title}</Typography>
              <Typography variant="subtitle1" mb={3} color="text.secondary">{plan.tagline}</Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={500} color="text.primary" sx={{ mb: 1, fontSize: '0.9rem' }}>
                  Custom pricing based on your needs
                </Typography>
                <Typography variant="h6" fontWeight="bold" color={plan.recommended ? "primary.main" : "text.primary"}>
                  {plan.value}
                </Typography>
              </Box>
            </Box>

            {/* Feature list */}
            <Box sx={{ mb: 3, flex: '1 0 auto', height: { xs: 'auto', md: '250px' }, overflow: 'auto' }}>
              {plan.features.map((feature, i) => (
                <FeatureItem key={i} icon={feature.icon} text={feature.text} />
              ))}

              {plan.extraFeatures && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" fontWeight="bold" mb={1.5} color="text.primary">
                    Also includes:
                  </Typography>
                  {plan.extraFeatures.map((extra, i) => (
                    <ExtraFeatureItem key={i} text={extra} />
                  ))}
                </Box>
              )}
            </Box>

            <Button
              variant={plan.recommended ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handlePlanClick(plan.type)}
              sx={{
                mt: 'auto', textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 4, py: 1.5,
                transition: 'all 0.3s ease', boxShadow: plan.recommended ? theme.shadows[3] : 'none',
                ...(plan.recommended && {
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }),
              }}
              endIcon={<ArrowIcon />}
            >
              {plan.ctaText}
            </Button>
          </Box>
        </Paper>
      </MotionDiv>
    </Box>
  );

  return (
    <ConsistentPageLayout
      title={pricingPageContent.hero.title}
      subtitle={pricingPageContent.hero.subtitle}
    >
      {/* HERO SECTION */}
      <CustomSection>
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.1, backgroundImage: 'url("/images/grid-pattern.svg")', backgroundSize: 'cover' }} />
        
        {/* Decorative shapes */}
        <Box sx={{ position: 'absolute', top: '10%', left: '5%', width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.4)} 0%, transparent 70%)`, zIndex: 0, opacity: 0.6 }} />
        <Box sx={{ position: 'absolute', bottom: '15%', right: '10%', width: 250, height: 250, borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.3)} 0%, transparent 70%)`, zIndex: 0, opacity: 0.6 }} />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Typography variant="h2" textAlign="center" sx={{
              fontWeight: 800, color: '#fff', mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Solutions Tailored To <Box component="span" sx={{ color: alpha('#fff', 0.85) }}>Your Business</Box>
            </Typography>
          </MotionDiv>
          
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Typography variant="body1" textAlign="center" sx={{
              color: alpha('#fff', 0.85), mb: 5, fontSize: { xs: '1rem', md: '1.2rem' },
              maxWidth: 700, mx: 'auto', lineHeight: 1.7
            }}>
              Select the solution that fits your specific requirements. Our pricing is customized based on your project scope and business needs.
            </Typography>
          </MotionDiv>
          
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <Box textAlign="center">
              <Button variant="contained" color="secondary" component={NextLink} href="#pricing-plans" sx={ctaButtonStyle}>
                Explore Solutions
              </Button>
            </Box>
          </MotionDiv>
        </Container>
      </CustomSection>

      {/* PRICING PLANS SECTION */}
      <CustomSection id="pricing-plans" sx={{ py: { xs: 10, md: 12 } }}>
        <Container>
          <MotionDiv initial={fadeIn} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" textAlign="center" sx={sectionHeadingStyle}>
              Choose Your Implementation Approach
            </Typography>
            <Typography variant="body1" textAlign="center" sx={sectionDescStyle}>
              Each solution is customized to your specific requirements with transparent value-based pricing.
            </Typography>
          </MotionDiv>

          <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'stretch' }}>
            {enhancedPlans.map((plan) => (
              <Grid item xs={12} md={4} key={plan.type} sx={{ display: 'flex', height: '100%' }}>
                {renderPlanCard(plan)}
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={6} sx={{
            p: 3,
            backgroundColor: alpha(theme.palette.primary.light, 0.05),
            borderRadius: 2,
            maxWidth: 700,
            mx: 'auto',
            border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`
          }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>Need a custom solution?</Typography>
            <Typography variant="body2" mb={2}>Contact our team for a personalized consultation to discuss your specific requirements.</Typography>
            <Button variant="outlined" onClick={() => router.push('/contact?custom=true')} endIcon={<ArrowIcon />}>
              Request Custom Consultation
            </Button>
          </Box>
        </Container>
      </CustomSection>

      {/* GUIDE SECTION */}
      <CustomSection sx={{ py: { xs: 10, md: 12 }, bgcolor: alpha(theme.palette.background.default, 0.6) }}>
        <Container>
          <MotionDiv initial={fadeIn} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" textAlign="center" sx={{...sectionHeadingStyle, mb: SPACING.large}}>
              {pricingPageContent.guideSection.heading}
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{...sectionDescStyle, mb: SPACING.large, maxWidth: 800}}>
              {pricingPageContent.guideSection.description}
            </Typography>
          </MotionDiv>

          <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'stretch' }}>
            {pricingPageContent.guideSection.items.map((item, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', height: { md: '420px' } }}>
                <MotionDiv
                  style={{ width: '100%', height: '100%' }}
                  initial={fadeIn}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Paper elevation={3} sx={{
                    p: 4, borderRadius: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                    background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                    backdropFilter: 'blur(10px)', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, position: 'relative',
                  }}>
                    <Box sx={{
                      width: 64, height: 64, borderRadius: '16px', mb: 3,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}>
                      {item.icon && React.createElement(item.icon, { sx: { fontSize: 30, color: 'white' } })}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" mb={2}>{item.title}</Typography>
                    <Box sx={{ overflow: 'auto', flex: 1, maxHeight: 'calc(100% - 150px)' }}>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.description}</Typography>
                    </Box>
                  </Paper>
                </MotionDiv>
              </Grid>
            ))}
          </Grid>
        </Container>
      </CustomSection>

      {/* FAQ SECTION */}
      <CustomSection sx={{ py: { xs: 10, md: 12 } }}>
        <Container>
          <MotionDiv initial={fadeIn} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" textAlign="center" sx={sectionHeadingStyle}>
              {pricingPageContent.faqSection.heading}
            </Typography>
            <Typography variant="body1" textAlign="center" sx={sectionDescStyle}>
              Have questions? We've got answers to help you choose the right plan.
            </Typography>
          </MotionDiv>
          
          <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              {[
                { 
                  question: 'How is pricing determined for each solution?', 
                  answer: 'We develop custom pricing based on your specific requirements, implementation complexity, team size, and ongoing support needs. This value-based approach ensures you only pay for what delivers results for your business.'
                },
                { 
                  question: 'Can I upgrade my solution as my needs change?', 
                  answer: 'Absolutely. Our solutions are designed to scale with your business. We make the transition smooth with flexible upgrade paths tailored to your evolving requirements.'
                },
                { 
                  question: 'What\'s included in the implementation process?', 
                  answer: 'All solutions include architecture design, deployment planning, infrastructure setup, knowledge transfer, and documentation. Higher tiers include additional services like custom integrations and dedicated implementation teams.'
                },
                { 
                  question: 'How does your support system work?', 
                  answer: 'Support varies by solution tier. Basic offers standard email support, Professional includes priority support with faster response times, and Enterprise provides 24/7 premium support with guaranteed SLAs.'
                },
                { 
                  question: 'Do you offer refunds if I\'m not satisfied?', 
                  answer: 'We stand behind our solutions with a satisfaction guarantee. If our implementation doesn\'t meet the agreed specifications, we\'ll work with you to resolve any issues at no additional cost.'
                }
              ].map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={activeFaq === index}
                  onChange={handleFaqChange(index)}
                  sx={{
                    mb: 2, borderRadius: '12px !important', overflow: 'hidden',
                    boxShadow: activeFaq === index ? theme.shadows[3] : theme.shadows[1],
                    transition: 'all 0.3s ease', '&:before': { display: 'none' },
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{
                      color: theme.palette.primary.main, fontSize: '1.5rem',
                      transition: 'transform 0.3s ease', transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                    }} />}
                    sx={{
                      minHeight: 64, px: 3, py: 1,
                      bgcolor: activeFaq === index ? alpha(theme.palette.primary.light, 0.08) : theme.palette.background.paper,
                    }}
                  >
                    <Typography variant="h6" component="div" sx={{
                      fontWeight: 600, fontSize: '1.1rem',
                      color: activeFaq === index ? theme.palette.primary.main : theme.palette.text.primary,
                    }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  
                  <AccordionDetails sx={{ px: 3, py: 2, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <MotionDiv
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                            {faq.answer}
                          </Typography>
                        </MotionDiv>
                      )}
                    </AnimatePresence>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </MotionDiv>
        </Container>
      </CustomSection>

      {/* FINAL CTA SECTION */}
      <CustomSection sx={{
        py: { xs: 10, md: 14 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.05, backgroundImage: 'url("/images/pattern-dots.svg")', backgroundSize: 'cover' }} />
        
        {/* Decorative elements */}
        <Box sx={{ position: 'absolute', top: '20%', right: '5%', width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 70%)`, zIndex: 0 }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 350, height: 350, borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 70%)`, zIndex: 0 }} />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <MotionDiv initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Typography variant="h2" textAlign="center" sx={{
              fontWeight: 800, color: '#fff', mb: 3, fontSize: { xs: '2.2rem', md: '3rem' },
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}>
              Ready to get started?
            </Typography>
          </MotionDiv>
          
          <MotionDiv initial={fadeIn} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Typography variant="h6" textAlign="center" sx={{
              color: alpha('#fff', 0.9), mb: 6, maxWidth: 700, mx: 'auto',
              fontWeight: 'normal', lineHeight: 1.7,
            }}>
              Let's discuss your requirements and find the perfect solution for your business needs.
            </Typography>
          </MotionDiv>
          
          <MotionDiv initial={fadeInScale} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="secondary"
                component={NextLink}
                href="/contact"
                sx={{
                  ...ctaButtonStyle,
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.03)',
                    boxShadow: `0 12px 30px ${alpha(theme.palette.secondary.main, 0.7)}`,
                  },
                }}
                endIcon={<ArrowIcon />}
              >
                Schedule Consultation
              </Button>
            </Box>
          </MotionDiv>
        </Container>
      </CustomSection>
    </ConsistentPageLayout>
  );
};

export default PricingPage;