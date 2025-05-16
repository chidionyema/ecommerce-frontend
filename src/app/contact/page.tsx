// ./src/app/contact/page.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react'; // Removed FormEvent
import { useRouter, useSearchParams } from 'next/navigation';
// import * as yup from 'yup'; // Removed yup
import dynamic from 'next/dynamic'; // Added for dynamic import
import {
  Box, Container, Typography, Divider, Grid, Stack, Paper, Avatar,
  List, ListItem, ListItemIcon, ListItemText, Button, // Removed TextField, InputAdornment
  CircularProgress, Fab, Slide, Fade, Zoom,
  useTheme, alpha
} from '@mui/material';
import SEO from '../../components/SEO';
import ConsistentPageLayout from '../../components/Shared/ConsistentPageLayout';
import GoldCard from '../../components/GoldCard';
import FAQ from '../../components/Common/FAQ';
import {
  faqItems, testimonials, contactInfoItems, heroSection,
  testimonialSection, /*successPageData,*/ icons, formCTA, // Removed successPageData
  /*formAdditionalText,*/ seoData, /*validationConfig*/ // Removed formAdditionalText, validationConfig
} from '../../data/contactPageData'; // Assuming this path is correct
import styles from '@/styles/contact.module.css';
// Assuming CalendlyBooking component is in this path
// and its styles/loading state defined as per previous discussions
const CalendlyBooking = dynamic(() => import('../../components/CalendlyBooking'), {
  ssr: false,
  loading: () => (
    <Box sx={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column', gap: 2, backgroundColor: "rgba(10, 10, 25, 0.85)", backdropFilter: "blur(8px)", zIndex: 10000 }}>
      <CircularProgress sx={{ color: "#6366F1" /* Example primary color */ }} />
      <Typography sx={{ fontFamily: "'SF Pro Display', 'Roboto', sans-serif", color: "#FFFFFF", fontSize: '1.1rem', fontWeight: 500 }}>
        Loading Scheduler...
      </Typography>
    </Box>
  )
});


// Removed FormData interface
// Removed validationSchema

// Ive-inspired styles (keeping as is from your provided code)
const iveStyles = {
  transition: 'all 0.28s cubic-bezier(0.22, 0.01, 0.21, 1)',
  letterSpacing: { heading: '-0.01em', body: '0.01em' },
  hover: {
    transform: 'translateY(-2px)',
    scale: 'scale(1.03)',
  },
  borderRadius: {
    button: '12px',
    card: '16px',
    input: '10px'
  },
  shadows: {
    subtle: (color: string) => `0 6px 16px ${alpha(color, 0.08)}`,
    medium: (color: string) => `0 8px 24px ${alpha(color, 0.12)}`,
    prominent: (color: string) => `0 10px 30px ${alpha(color, 0.18)}`
  }
};

// Back to Top Button (keeping as is)
const BackToTopButton = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        aria-label="Back to Top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={styles.backToTopButton}
        sx={{
          position: 'fixed',
          bottom: { xs: theme.spacing(2), md: theme.spacing(4) },
          right: { xs: theme.spacing(2), md: theme.spacing(4) },
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          boxShadow: iveStyles.shadows.medium(theme.palette.primary.dark),
          transition: iveStyles.transition,
          '&:hover': {
            boxShadow: iveStyles.shadows.prominent(theme.palette.primary.dark),
            transform: iveStyles.hover.transform
          }
        }}
      >
        <icons.backToTop />
      </Fab>
    </Zoom>
  );
};

export default function Contact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();

  // State for Calendly modal
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const [calendlyPrefillMessage, setCalendlyPrefillMessage] = useState<string | undefined>(undefined);
  const [isLoadingCalendly, setIsLoadingCalendly] = useState(false); // For button loading state

  // Removed formData, errors, submitStatus states related to the old form

  const [animateIn, setAnimateIn] = useState(false);

  // User details for prefill (example, you might get this from auth state)
  const [currentUserEmail, setCurrentUserEmail] = useState<string | undefined>(undefined);
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAnimateIn(true);
    const plan = searchParams.get('plan');
    const custom = searchParams.get('custom');

    if (plan) {
      setCalendlyPrefillMessage(`Interested in the ${plan} plan.`);
    } else if (custom) {
      setCalendlyPrefillMessage("Interested in discussing a custom solution for my business.");
    }

    // Example: simulate fetching logged-in user data
    // Replace with your actual auth logic if available
    setTimeout(() => {
      // setCurrentUserEmail("testuser@example.com");
      // setCurrentUserName("Test User");
    }, 500);

  }, [searchParams]);


  const renderStars = (rating: number) => (
    <Box sx={{ display: 'flex' }} aria-label={`${rating} out of 5 stars`}>
      {Array(5).fill(0).map((_, i) => (
        <icons.starIcon key={i} sx={{
          color: i < rating ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
          fontSize: { xs: '1rem', sm: '1.2rem' }, mr: 0.5
        }} />
      ))}
    </Box>
  );

  const handleOpenCalendlyModal = useCallback(() => {
    setIsLoadingCalendly(true); // Show loading state on button
    // The dynamic import of CalendlyBooking will start loading its chunk.
    // The actual modal opening is controlled by isCalendlyModalOpen.
    // A short delay can make the loading state on button feel more responsive if chunk is small.
    setTimeout(() => {
        setIsCalendlyModalOpen(true);
        setIsLoadingCalendly(false); // Hide loading state on button once modal is ready to open
    }, 300); // Adjust delay as needed, or remove if dynamic loading is very fast
  }, []);

  const handleCloseCalendlyModal = useCallback(() => {
    setIsCalendlyModalOpen(false);
  }, []);

  // Define your Calendly event link (replace with your actual link)
  const YOUR_CALENDLY_EVENT_LINK = "https://calendly.com/glustack000/30min";


  // Removed handleSubmit and handleInputChange functions
  // Removed success state rendering for the form

  return (
    <>
      <SEO title={seoData.title} description={seoData.description} keywords={seoData.keywords} />
      <ConsistentPageLayout scrollOptions={{ showSectionMenu: false, showProgressIndicator: false }}>
        <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 10 }, px: { xs: 2, sm: 3, md: 4 } }}>
          <Fade in={animateIn} timeout={1000}>
            <Box className={styles.heroContainer} sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
              <Typography
                variant="h1"
                component="h1"
                className={styles.heroTitle}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  letterSpacing: '-0.015em',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' }
                }}
              >
                {heroSection.title}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                className={styles.heroSubtitle}
                sx={{
                  color: theme.palette.text.secondary,
                  letterSpacing: iveStyles.letterSpacing.body,
                  lineHeight: 1.6,
                  maxWidth: '800px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                }}
              >
                {heroSection.subtitle}
              </Typography>
            </Box>
          </Fade>

          <Box className={styles.contactGrid} sx={{ mb: { xs: 6, md: 8 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
            {/* Contact Info Box (Left Side) - Kept as is */}
            <Slide direction="right" in={animateIn} timeout={800}>
              <Box className={styles.contactInfoBox} sx={{
                backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.8 : 0.98),
                backdropFilter: 'blur(10px)',
                boxShadow: iveStyles.shadows.subtle(theme.palette.common.black),
                borderRadius: iveStyles.borderRadius.card,
                p: {xs: 2.5, sm:3, md: 4},
                position: 'relative',
                overflow: 'hidden',
                transition: iveStyles.transition,
                '&:hover': { boxShadow: iveStyles.shadows.medium(theme.palette.common.black) }
              }}>
                <Box className={styles.contactInfoAccent} sx={{ /* ... */ }} />
                <Box className={styles.contactInfoHeader} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Box className={styles.iconCircle} sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 },
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: {xs: 2, md: 3},
                    transition: iveStyles.transition, '&:hover': { transform: iveStyles.hover.scale }
                  }}>
                    {React.createElement(heroSection.contactInfoIcon, { sx: { fontSize: {xs: 24, md: 28}, color: theme.palette.primary.main } })}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="h2" className={styles.contactInfoTitle} sx={{
                      mb: 0.5, letterSpacing: iveStyles.letterSpacing.heading, fontWeight: 600,
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                    }}>
                      {heroSection.contactInfoTitle}
                    </Typography>
                    <Typography variant="body2" className={styles.contactInfoSubtitle} sx={{ color: theme.palette.text.secondary, letterSpacing: iveStyles.letterSpacing.body, fontSize: {xs: '0.8rem', md: '0.875rem'} }}>
                      {heroSection.contactInfoSubtitle}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" className={styles.contactInfoDescription} sx={{ color: theme.palette.text.secondary, mb: 3, letterSpacing: iveStyles.letterSpacing.body, lineHeight: 1.6, fontSize: {xs: '0.9rem', md: '1rem'} }}>
                  {heroSection.contactInfoDescription}
                </Typography>
                <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.divider, 0.1) }} />
                <List disablePadding className={styles.contactItemsList}>
                  {contactInfoItems.map((item, index) => (
                    <ListItem key={index} disableGutters className={styles.contactItem} sx={{ mb: index < contactInfoItems.length - 1 ? 2.5 : 0 }}>
                      <ListItemIcon className={styles.contactItemIcon} sx={{minWidth: 'auto', mr: 2}}>
                        <Box className={styles.contactItemCircle} sx={{
                           backgroundColor: alpha(theme.palette.primary.main, 0.15), width: {xs:36, md:40}, height: {xs:36, md:40}, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: iveStyles.transition, '&:hover': { transform: iveStyles.hover.scale }
                        }}>
                          {React.createElement(item.icon, { sx: { fontSize: {xs:18, md:20}, color: theme.palette.primary.main }, "aria-hidden": "true" })}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.primaryText}
                        secondary={item.secondaryText}
                        primaryTypographyProps={{ variant: 'body2', color: theme.palette.text.secondary, fontWeight: 500, mb: 0.5, className: styles.contactItemPrimary, sx: { letterSpacing: iveStyles.letterSpacing.body, fontSize: {xs: '0.8rem', md: '0.875rem'} } }}
                        secondaryTypographyProps={{ variant: 'body1', color: theme.palette.text.primary, fontWeight: 600, className: styles.contactItemSecondary, sx: {fontSize: {xs: '0.9rem', md: '1rem'}} }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Slide>

            {/* Calendly CTA Box (Right Side) - Replaces the form */}
            <Slide direction="left" in={animateIn} timeout={800}>
              <Box sx={{ height: '100%' }}>
                <GoldCard
                  // component="form" // No longer a form
                  // onSubmit={handleSubmit} // Removed onSubmit
                  className={styles.formCard} // Can keep class name if styles are still relevant for GoldCard
                  sx={{
                    p: {xs: 2.5, sm:3, md: 4}, height: '100%', display: 'flex', flexDirection: 'column',
                    backgroundColor: alpha(theme.palette.background.paper, 0.98),
                    backdropFilter: 'blur(10px)',
                    boxShadow: iveStyles.shadows.medium(theme.palette.common.black),
                    borderRadius: iveStyles.borderRadius.card,
                    transition: iveStyles.transition,
                    '&:hover': { 
                      boxShadow: iveStyles.shadows.prominent(theme.palette.common.black),
                      transform: 'translateY(-3px)'
                    },
                    justifyContent: 'center', // Center content vertically
                  }}
                >
                  <Box className={styles.formHeader} sx={{ mb: {xs:3, md:4}, textAlign: 'center' }}>
                    <Box className={styles.formIconCircle} sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      width: {xs: 56, md: 64}, height: {xs:56, md:64}, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', mb: 2,
                    }}>
                      {/* Changed icon to Calendar or similar */}
                      <icons.starIcon sx={{ fontSize: {xs:28, md:32}, color: 'white' }} /> 
                      {/* Replace heroSection.formIcon with a Calendar icon if desired:
                       <CalendarToday sx={{ fontSize: {xs:28, md:32}, color: 'white' }} />
                      */}
                    </Box>
                    <Typography variant="h3" component="h2" className={styles.formTitle} sx={{ mb: 1, letterSpacing: iveStyles.letterSpacing.heading, fontWeight: 600, fontSize: { xs: '1.7rem', sm: '2rem', md: '2.2rem' } }}>
                      {heroSection.formTitle} {/* e.g., "Get a Custom Tech Roadmap" */}
                    </Typography>
                    <Typography variant="body1" className={styles.formSubtitle} sx={{ color: theme.palette.text.secondary, letterSpacing: iveStyles.letterSpacing.body, lineHeight: 1.6, maxWidth: '90%', mx: 'auto', fontSize: {xs: '0.9rem', md: '1rem'} }}>
                      {/* Modified subtitle for Calendly */}
                      Schedule a session to discuss your personalized technology roadmap.
                    </Typography>
                  </Box>

                  <Stack spacing={{xs: 2, md: 3}} sx={{ mt: 3, alignItems: 'center' }}>
                    <Button
                      onClick={handleOpenCalendlyModal}
                      fullWidth
                      size="large"
                      variant="contained"
                      disabled={isLoadingCalendly}
                      className={styles.submitButton} // Can reuse submit button styles
                      sx={{
                        height: 56, borderRadius: iveStyles.borderRadius.button,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        boxShadow: iveStyles.shadows.medium(theme.palette.primary.main),
                        textTransform: 'none', fontWeight: 600, fontSize: '1.05rem', letterSpacing: iveStyles.letterSpacing.body,
                        transition: iveStyles.transition,
                        '&:hover': { boxShadow: iveStyles.shadows.prominent(theme.palette.primary.main), transform: iveStyles.hover.transform },
                        '&:active': { transform: 'translateY(0)' },
                        '&.Mui-disabled': {
                            background: alpha(theme.palette.action.disabledBackground, 0.5),
                            color: theme.palette.action.disabled,
                            boxShadow: 'none',
                        }
                      }}
                    >
                      {isLoadingCalendly ? <CircularProgress size={24} color="inherit" /> : formCTA /* e.g., "Request Your Tech Roadmap" */}
                    </Button>
                  </Stack>
                </GoldCard>
              </Box>
            </Slide>
          </Box>

          {/* Testimonials and FAQ sections remain the same */}
          <Box className={styles.testimonialsSection} sx={{ py: {xs:4, md:6}, mb: {xs:4, md:6} }}>
            <Typography variant="h2" component="h2" className={styles.testimonialsSectionTitle} sx={{
              mb: 1, letterSpacing: iveStyles.letterSpacing.heading, fontWeight: 600, textAlign: 'center',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
            }}>
              {testimonialSection.title}
            </Typography>
            <Typography variant="body1" className={styles.testimonialsSectionSubtitle} sx={{
              color: theme.palette.text.secondary, mb: {xs:3, md:5}, letterSpacing: iveStyles.letterSpacing.body,
              lineHeight: 1.6, textAlign: 'center', maxWidth: '800px', mx: 'auto',
              fontSize: {xs: '0.9rem', md: '1rem'}
            }}>
              {testimonialSection.subtitle}
            </Typography>
            <Grid container spacing={{xs:2, sm:3, md:4}} justifyContent="center">
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
                  <Zoom in={animateIn} style={{ transitionDelay: `${index * 150}ms` }}>
                    <Paper
                      elevation={4}
                      className={styles.testimonialCard}
                      sx={{
                        p: {xs:2, sm:2.5, md:3}, height: '100%', display: 'flex', flexDirection: 'column',
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '14px', border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        transition: iveStyles.transition,
                        '&:hover': { boxShadow: iveStyles.shadows.medium(theme.palette.common.black), transform: 'translateY(-3px)' },
                      }}
                    >
                      <Box className={styles.starsContainer} sx={{ mb: 2 }}>
                        {renderStars(testimonial.rating)}
                      </Box>
                      <Typography variant="body1" className={styles.testimonialContent} sx={{
                        mb: 3, flexGrow: 1, letterSpacing: iveStyles.letterSpacing.body,
                        lineHeight: 1.6, color: theme.palette.text.primary, fontStyle: 'italic',
                        fontSize: {xs: '0.9rem', md: '1rem'}
                      }}>
                        "{testimonial.content}"
                      </Typography>
                      <Box className={styles.testimonialAuthor} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className={styles.testimonialAvatar}
                          sx={{
                            border: `2px solid ${theme.palette.primary.main}`, mr: 2,
                            width: {xs: 40, md: 48}, height: {xs:40, md:48},
                            boxShadow: iveStyles.shadows.subtle(theme.palette.common.black)
                          }}
                        />
                        <Box>
                          <Typography variant="h6" className={styles.testimonialName} sx={{
                            fontSize: {xs: '0.95rem', md: '1rem'}, fontWeight: 600, letterSpacing: iveStyles.letterSpacing.body,
                            color: theme.palette.text.primary
                          }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" sx={{ letterSpacing: iveStyles.letterSpacing.body, color: theme.palette.text.secondary, fontSize: {xs: '0.8rem', md: '0.875rem'} }}>
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>

          <FAQ
            items={faqItems}
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and solutions"
            sx={{ mb: { xs: 6, md: 8 } }}
          />
          <BackToTopButton />
        </Container>
      </ConsistentPageLayout>

      {/* Calendly Booking Modal */}
      {/* Check for window to ensure client-side rendering for dynamic import and modal */}
      {typeof window !== 'undefined' && isCalendlyModalOpen && (
         <Suspense fallback={<Box sx={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}><CircularProgress /></Box>}>
            <CalendlyBooking
              isOpen={isCalendlyModalOpen}
              onClose={handleCloseCalendlyModal}
              calendlyEventLink={YOUR_CALENDLY_EVENT_LINK} // Ensure this is correctly set
              prefill={{
                email: currentUserEmail, // Example: pass fetched/authed user email
                name: currentUserName,   // Example: pass fetched/authed user name
                customAnswers: calendlyPrefillMessage
                  ? { a1: calendlyPrefillMessage } // 'a1' is an example, map to your Calendly custom question field
                  : undefined,
              }}
              pageSettings={{
                backgroundColor: theme.palette.mode === 'dark' ? '1a1a1a' : 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: theme.palette.primary.main.substring(1), // Remove #
                textColor: theme.palette.text.primary.substring(1), // Remove #
              }}
              utm={{
                utmCampaign: 'ContactPageCTA',
                utmSource: 'Website',
                utmMedium: 'CalendlyModal',
              }}
            />
        </Suspense>
      )}
    </>
  );
}