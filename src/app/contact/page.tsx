'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as yup from 'yup';
import {
  Box, Container, Typography, Divider, Grid, Stack, Paper, Avatar,
  List, ListItem, ListItemIcon, ListItemText, TextField, Button,
  InputAdornment, CircularProgress, Fab, Slide, Fade, Zoom,
  useTheme, alpha
} from '@mui/material';
import SEO from '../../components/SEO'; // Assuming SEO component handles meta tags including viewport
import ConsistentPageLayout from '../../components/Shared/ConsistentPageLayout';
import GoldCard from '../../components/GoldCard';
import FAQ from '../../components/Common/FAQ';
import {
  faqItems, testimonials, contactInfoItems, heroSection,
  testimonialSection, successPageData, icons, formCTA,
  formAdditionalText, seoData, validationConfig
} from '../../data/contactPageData'; // Ensure icons in this data are accessible (e.g. MUI icons or SVGs with titles/aria-hidden)
import styles from '@/styles/contact.module.css';

// Define form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Validation schema (remains the same)
const validationSchema = yup.object().shape({
  name: yup.string()
    .required(validationConfig.name.requiredMessage)
    .min(validationConfig.name.minLength, validationConfig.name.minLengthMessage)
    .max(validationConfig.name.maxLength, validationConfig.name.maxLengthMessage),
  email: yup.string()
    .required(validationConfig.email.requiredMessage)
    .email(validationConfig.email.invalidMessage),
  phone: yup.string()
    .optional()
    .matches(validationConfig.phone.pattern, validationConfig.phone.patternMessage)
    .max(validationConfig.phone.maxLength, validationConfig.phone.maxLengthMessage),
  message: yup.string()
    .optional()
    .max(validationConfig.message.maxLength, validationConfig.message.maxLengthMessage),
});

// Ive-inspired styles (remains the same)
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

// Back to Top Button (remains largely the same, ensure icons.backToTop is accessible)
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
        aria-label="Back to Top" // Good for accessibility
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={styles.backToTopButton}
        sx={{
          position: 'fixed', // From styles.backToTopButton usually
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
        {/* Ensure icons.backToTop is an accessible SVG (e.g., with <title>) or MUI Icon */}
        <icons.backToTop />
      </Fab>
    </Zoom>
  );
};

export default function Contact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle'); // More descriptive
  const [animateIn, setAnimateIn] = useState(false);

  const successTitleRef = useRef<HTMLHeadingElement>(null); // For focusing on success title

  useEffect(() => {
    setAnimateIn(true);
    const plan = searchParams.get('plan');
    const custom = searchParams.get('custom');

    if (plan) setFormData(prev => ({ ...prev, message: `I'm interested in the ${plan} plan.` }));
    else if (custom) setFormData(prev => ({ ...prev, message: "I'm interested in discussing a custom solution for my business." }));
  }, [searchParams]);

  useEffect(() => {
    if (submitStatus === 'success' && successTitleRef.current) {
      successTitleRef.current.focus(); // Focus on success title for A11y
    }
  }, [submitStatus]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setSubmitStatus('loading');
      // Simulate API call
      setTimeout(() => {
        setSubmitStatus('success');
      }, 1500);
    } catch (err) {
      setSubmitStatus('idle');
      if (err instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach(error => { if (error.path) validationErrors[error.path] = error.message; });
        setErrors(validationErrors);
        // Optional: Focus on the first field with an error
        // if (err.inner.length > 0 && err.inner[0].path) {
        //   const firstErrorField = document.querySelector(`[name="${err.inner[0].path}"]`) as HTMLElement;
        //   firstErrorField?.focus();
        // }
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const renderStars = (rating: number) => (
    <Box sx={{ display: 'flex' }} aria-label={`${rating} out of 5 stars`}> {/* A11y for star rating */}
      {Array(5).fill(0).map((_, i) => (
        // Ensure icons.starIcon is accessible or aria-hidden if decorative
        <icons.starIcon key={i} sx={{
          color: i < rating ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
          fontSize: { xs: '1rem', sm: '1.2rem' }, mr: 0.5
        }} />
      ))}
    </Box>
  );

  if (submitStatus === 'success') {
    return (
      <ConsistentPageLayout
        seoTitle={successPageData.seoTitle}
        seoDescription={successPageData.seoDescription}
        title={successPageData.title} // This title might be redundant if the h2 below is focused
        subtitle={successPageData.subtitle}
        scrollOptions={{ showSectionMenu: false, showProgressIndicator: false }}
      >
        <Zoom in={true} timeout={800}>
          <Box className={styles.successContainer} sx={{ textAlign: 'center', py: { xs: 4, md: 8 }}}>
            <Box
              className={styles.successIconCircle}
              sx={{
                backgroundColor: alpha(theme.palette.success.main, 0.15),
                transition: iveStyles.transition,
                '&:hover': { transform: iveStyles.hover.scale },
                width: { xs: 80, md: 100 }, // Responsive icon circle
                height: { xs: 80, md: 100 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              {/* Ensure icons.checkCircle is accessible (e.g. MUI Icon) */}
              <icons.checkCircle style={{ fontSize: '3rem', color: theme.palette.success.main, width: '1.5em', height: '1.5em' }} />
            </Box>
            <Typography
              ref={successTitleRef} // Ref for focusing
              tabIndex={-1} // Make it focusable
              variant="h2" // More appropriate than h3 if this is the main message
              component="h2"
              className={styles.successTitle}
              sx={{
                letterSpacing: iveStyles.letterSpacing.heading,
                mb: 2,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
              }}
            >
              {successPageData.title}
            </Typography>
            <Typography
              variant="body1"
              className={styles.successMessage}
              sx={{
                color: theme.palette.text.secondary,
                letterSpacing: iveStyles.letterSpacing.body,
                lineHeight: 1.6,
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '0.9rem', sm: '1rem'}
              }}
            >
              {successPageData.message}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/')}
              className={styles.successButton}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: iveStyles.shadows.medium(theme.palette.primary.main),
                borderRadius: iveStyles.borderRadius.button,
                textTransform: 'none',
                fontWeight: 600,
                px: {xs: 3, sm: 4},
                py: {xs: 1, sm: 1.5},
                transition: iveStyles.transition,
                '&:hover': {
                  boxShadow: iveStyles.shadows.prominent(theme.palette.primary.main),
                  transform: iveStyles.hover.transform
                }
              }}
            >
              {successPageData.buttonText}
            </Button>
          </Box>
        </Zoom>
        <BackToTopButton />
      </ConsistentPageLayout>
    );
  }

  return (
    <>
      <SEO title={seoData.title} description={seoData.description} keywords={seoData.keywords} />
      <ConsistentPageLayout scrollOptions={{ showSectionMenu: false, showProgressIndicator: false }}>
        <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 10 }, px: { xs: 2, sm: 3, md: 4 } }}> {/* Adjusted padding */}
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
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' } // Responsive font size
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
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } // Responsive font size
                }}
              >
                {heroSection.subtitle}
              </Typography>
            </Box>
          </Fade>

          <Box className={styles.contactGrid} sx={{ mb: { xs: 6, md: 8 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
            <Slide direction="right" in={animateIn} timeout={800}>
              <Box className={styles.contactInfoBox} sx={{
                backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.8 : 0.98),
                backdropFilter: 'blur(10px)',
                boxShadow: iveStyles.shadows.subtle(theme.palette.common.black),
                borderRadius: iveStyles.borderRadius.card,
                p: {xs: 2.5, sm:3, md: 4}, // Responsive padding
                position: 'relative',
                overflow: 'hidden',
                transition: iveStyles.transition,
                '&:hover': { boxShadow: iveStyles.shadows.medium(theme.palette.common.black) }
              }}>
                <Box className={styles.contactInfoAccent} sx={{ /* ... */ }} />
                <Box className={styles.contactInfoHeader} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Box className={styles.iconCircle} sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    width: { xs: 50, md: 60 }, // Consider responsive size
                    height: { xs: 50, md: 60 }, // Consider responsive size
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: {xs: 2, md: 3},
                    transition: iveStyles.transition, '&:hover': { transform: iveStyles.hover.scale }
                  }}>
                    {/* Ensure heroSection.contactInfoIcon is accessible or aria-hidden */}
                    {React.createElement(heroSection.contactInfoIcon, { sx: { fontSize: {xs: 24, md: 28}, color: theme.palette.primary.main } })}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="h2" className={styles.contactInfoTitle} sx={{
                      mb: 0.5, letterSpacing: iveStyles.letterSpacing.heading, fontWeight: 600,
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } // Responsive
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
                          {/* Ensure item.icon is accessible (MUI Icon) or aria-hidden if purely decorative */}
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

            <Slide direction="left" in={animateIn} timeout={800}>
              <Box sx={{ height: '100%' }}>
                <GoldCard
                  component="form"
                  onSubmit={handleSubmit as React.FormEventHandler<HTMLDivElement>}
                  aria-busy={submitStatus === 'loading'} // A11y: indicate loading state
                  className={styles.formCard}
                  sx={{
                    p: {xs: 2.5, sm:3, md: 4}, height: '100%', display: 'flex', flexDirection: 'column',
                    /* ... other GoldCard styles ... */
                    backgroundColor: alpha(theme.palette.background.paper, 0.98),
                    backdropFilter: 'blur(10px)',
                    boxShadow: iveStyles.shadows.medium(theme.palette.common.black),
                    borderRadius: iveStyles.borderRadius.card,
                    transition: iveStyles.transition,
                    '&:hover': { 
                      boxShadow: iveStyles.shadows.prominent(theme.palette.common.black),
                      transform: 'translateY(-3px)'
                    },
                  }}
                >
                  <Box className={styles.formHeader} sx={{ mb: {xs:3, md:4}, textAlign: 'center' }}>
                    <Box className={styles.formIconCircle} sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      width: {xs: 56, md: 64}, height: {xs:56, md:64}, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', mb: 2,
                      /* ... */
                    }}>
                       {/* Ensure heroSection.formIcon is accessible or aria-hidden */}
                      {React.createElement(heroSection.formIcon, { sx: { fontSize: {xs:28, md:32}, color: 'white' } })}
                    </Box>
                    <Typography variant="h3" component="h2" className={styles.formTitle} sx={{ mb: 1, letterSpacing: iveStyles.letterSpacing.heading, fontWeight: 600, fontSize: { xs: '1.7rem', sm: '2rem', md: '2.2rem' } }}>
                      {heroSection.formTitle}
                    </Typography>
                    <Typography variant="body1" className={styles.formSubtitle} sx={{ color: theme.palette.text.secondary, letterSpacing: iveStyles.letterSpacing.body, lineHeight: 1.6, maxWidth: '90%', mx: 'auto', fontSize: {xs: '0.9rem', md: '1rem'} }}>
                      {heroSection.formSubtitle}
                    </Typography>
                  </Box>

                  <Stack spacing={{xs: 2, md: 3}} className={styles.formFieldsContainer} sx={{ mb: 'auto' }}>
                    {[
                      { name: 'name', label: formAdditionalText.nameLabel, icon: icons.person, required: true },
                      { name: 'email', label: formAdditionalText.emailLabel, icon: icons.email, required: true },
                      { name: 'phone', label: formAdditionalText.phoneLabel, icon: icons.phone }
                    ].map(field => (
                      <TextField
                        key={field.name}
                        fullWidth
                        label={field.label}
                        name={field.name}
                        value={formData[field.name as keyof FormData]}
                        onChange={handleInputChange}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]}
                        className={styles.textField}
                        required={field.required}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {/* Assuming these icons are decorative due to labels; otherwise, provide aria-label */}
                              {React.createElement(field.icon, { "aria-hidden": "true" })}
                            </InputAdornment>
                          ),
                          className: styles.textFieldInput,
                          sx: { borderRadius: iveStyles.borderRadius.input, transition: iveStyles.transition, '&.Mui-focused': { boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}` } }
                        }}
                        variant="outlined" // Or "filled", "standard" as per your design
                      />
                    ))}
                    <TextField
                      fullWidth
                      label={formAdditionalText.messageLabel}
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!errors.message}
                      helperText={errors.message || `${formData.message?.length || 0}/${validationConfig.message.maxLength} characters`}
                      className={styles.messageField}
                      InputProps={{
                        className: styles.messageFieldInput,
                        sx: { borderRadius: iveStyles.borderRadius.input, transition: iveStyles.transition, '&.Mui-focused': { boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}` } }
                      }}
                      variant="outlined"
                    />
                    {/* Visually hidden polite live region for form submission status */}
                    <Box component="div" aria-live="polite" sx={{
                        position: 'absolute', width: '1px', height: '1px',
                        margin: '-1px', padding: '0', overflow: 'hidden',
                        clip: 'rect(0, 0, 0, 0)', border: '0'
                    }}>
                        {submitStatus === 'loading' && "Submitting your message, please wait."}
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      disabled={submitStatus === 'loading'}
                      className={styles.submitButton}
                      sx={{
                        mt: 2, height: 56, borderRadius: iveStyles.borderRadius.button,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        boxShadow: iveStyles.shadows.medium(theme.palette.primary.main),
                        textTransform: 'none', fontWeight: 600, fontSize: '1.05rem', letterSpacing: iveStyles.letterSpacing.body,
                        transition: iveStyles.transition,
                        '&:hover': { boxShadow: iveStyles.shadows.prominent(theme.palette.primary.main), transform: iveStyles.hover.transform },
                        '&:active': { transform: 'translateY(0)' },
                        '&.Mui-disabled': { // Style for disabled state if needed
                            background: alpha(theme.palette.action.disabledBackground, 0.5),
                            color: theme.palette.action.disabled,
                            boxShadow: 'none',
                        }
                      }}
                    >
                      {submitStatus === 'loading' ? <CircularProgress size={24} color="inherit" /> : formCTA}
                    </Button>
                    {errors.form && <Typography color="error" variant="body2" sx={{mt:1, textAlign:'center'}}>{errors.form}</Typography>}
                  </Stack>
                </GoldCard>
              </Box>
            </Slide>
          </Box>

          <Box className={styles.testimonialsSection} sx={{ py: {xs:4, md:6}, mb: {xs:4, md:6} }}>
            <Typography variant="h2" component="h2" className={styles.testimonialsSectionTitle} sx={{
              mb: 1, letterSpacing: iveStyles.letterSpacing.heading, fontWeight: 600, textAlign: 'center',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive
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
                          alt={testimonial.name} // Good for A11y
                          className={styles.testimonialAvatar}
                          sx={{
                            border: `2px solid ${theme.palette.primary.main}`, mr: 2,
                            width: {xs: 40, md: 48}, height: {xs:40, md:48}, // Responsive avatar
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
            // Ensure FAQ component itself is accessible (e.g. proper ARIA for accordions)
          />
          <BackToTopButton />
        </Container>
      </ConsistentPageLayout>
      {/*
        Consider global CSS for prefers-reduced-motion if not handled by MUI defaults for custom transitions:
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        Thoroughly test color contrast with browser dev tools or online checkers.
      */}
    </>
  );
}