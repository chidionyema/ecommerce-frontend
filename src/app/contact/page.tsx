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
} from '../../data/contactPageData'; // Ensure icons in this data are accessible
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

// Back to Top Button (remains largely the same)
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

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [animateIn, setAnimateIn] = useState(false);
  const successTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setAnimateIn(true);
    const plan = searchParams.get('plan');
    const custom = searchParams.get('custom');
    if (plan) setFormData(prev => ({ ...prev, message: `I'm interested in the ${plan} plan.` }));
    else if (custom) setFormData(prev => ({ ...prev, message: "I'm interested in discussing a custom solution for my business." }));
  }, [searchParams]);

  useEffect(() => {
    if (submitStatus === 'success' && successTitleRef.current) {
      successTitleRef.current.focus();
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setSubmitStatus('loading');
      setTimeout(() => { setSubmitStatus('success'); }, 1500);
    } catch (err) {
      setSubmitStatus('idle');
      if (err instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach(error => { if (error.path) validationErrors[error.path] = error.message; });
        setErrors(validationErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const updated = { ...prev }; delete updated[name]; return updated; });
    }
  };

  const renderStars = (rating: number) => (
    <Box sx={{ display: 'flex' }} aria-label={`${rating} out of 5 stars`}>
      {Array(5).fill(0).map((_, i) => (
        <icons.starIcon key={i} sx={{
          color: i < rating ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
          fontSize: { xs: '1rem', sm: '1.1rem' }, mr: 0.4 
        }} />
      ))}
    </Box>
  );

  if (submitStatus === 'success') {
    return (
      <ConsistentPageLayout /* ...props... */ >
        <Zoom in={true} timeout={800}>
          <Box className={styles.successContainer} sx={{ textAlign: 'center', py: { xs: 4, md: 8 }}}>
            <Box className={styles.successIconCircle} sx={{
                backgroundColor: alpha(theme.palette.success.main, 0.15), width: { xs: 70, md: 90 }, height: { xs: 70, md: 90 },
                /* ... other styles ... */
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5,
            }}>
              <icons.checkCircle style={{ fontSize: '2.5rem', color: theme.palette.success.main, width: '1.5em', height: '1.5em' }} />
            </Box>
            <Typography ref={successTitleRef} tabIndex={-1} variant="h2" component="h2" className={styles.successTitle}
              sx={{ letterSpacing: iveStyles.letterSpacing.heading, mb: 1.5, fontSize: { xs: '1.7rem', sm: '2rem', md: '2.3rem' } }}>
              {successPageData.title}
            </Typography>
            <Typography variant="body1" className={styles.successMessage} sx={{
                color: theme.palette.text.secondary, letterSpacing: iveStyles.letterSpacing.body, lineHeight: 1.6, mb: 3,
                maxWidth: '550px', mx: 'auto', fontSize: { xs: '0.85rem', sm: '0.95rem'}
            }}>
              {successPageData.message}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => router.push('/')} className={styles.successButton} sx={{
                /* ...button styles... */
                px: {xs: 2.5, sm: 3.5}, py: {xs: 0.8, sm: 1.2},
            }}>
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
        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5, md: 8 }, px: { xs: 2, sm: 2.5, md: 3 } }}>
          <Fade in={animateIn} timeout={1000}>
            <Box className={styles.heroContainer} sx={{ mb: { xs: 4, md: 7 }, textAlign: 'center' }}>
              <Typography variant="h1" component="h1" className={styles.heroTitle} sx={{
                  /* ...hero title styles... */
                  fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' } 
              }}>
                {heroSection.title}
              </Typography>
              <Typography variant="h5" component="p" className={styles.heroSubtitle} sx={{
                  /* ...hero subtitle styles... */
                  fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' }
              }}>
                {heroSection.subtitle}
              </Typography>
            </Box>
          </Fade>

          <Box className={styles.contactGrid} sx={{ 
              mb: { xs: 5, md: 7 }, 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
              gap: { xs: 2.5, md: 3 } // Reduced gap
          }}>
            <Slide direction="right" in={animateIn} timeout={800}>
              <Box className={styles.contactInfoBox} sx={{
                /* ... backdropFilter, boxShadow, borderRadius ... */
                backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.8 : 0.98),
                p: {xs: 2, sm:2.5, md: 3}, // Reduced padding
                position: 'relative', overflow: 'hidden', transition: iveStyles.transition,
                '&:hover': { boxShadow: iveStyles.shadows.medium(theme.palette.common.black) }
              }}>
                <Box className={styles.contactInfoAccent} sx={{ /* ... */ }} />
                <Box className={styles.contactInfoHeader} sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}> {/* Reduced mb */}
                  <Box className={styles.iconCircle} sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    width: { xs: 44, md: 50 }, height: { xs: 44, md: 50 }, // Reduced size
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: {xs: 1.5, md: 2},
                    transition: iveStyles.transition, '&:hover': { transform: iveStyles.hover.scale }
                  }}>
                    {React.createElement(heroSection.contactInfoIcon, { sx: { fontSize: {xs: 20, md: 24}, color: theme.palette.primary.main } })} {/* Reduced icon size */}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="h2" className={styles.contactInfoTitle} sx={{
                      mb: 0.25, letterSpacing: iveStyles.letterSpacing.heading, fontWeight: 600,
                      fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' } // Reduced font size
                    }}>
                      {heroSection.contactInfoTitle}
                    </Typography>
                    <Typography variant="body2" className={styles.contactInfoSubtitle} sx={{ color: theme.palette.text.secondary, letterSpacing: iveStyles.letterSpacing.body, fontSize: {xs: '0.75rem', md: '0.8rem'} }}> {/* Reduced font size */}
                      {heroSection.contactInfoSubtitle}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" className={styles.contactInfoDescription} sx={{ color: theme.palette.text.secondary, mb: 2.5, letterSpacing: iveStyles.letterSpacing.body, lineHeight: 1.5, fontSize: {xs: '0.85rem', md: '0.9rem'} }}> {/* Reduced font size & mb */}
                  {heroSection.contactInfoDescription}
                </Typography>
                <Divider sx={{ mb: 2.5, borderColor: alpha(theme.palette.divider, 0.1) }} /> {/* Reduced mb */}
                <List disablePadding className={styles.contactItemsList}>
                  {contactInfoItems.map((item, index) => (
                    <ListItem key={index} disableGutters className={styles.contactItem} sx={{ mb: index < contactInfoItems.length - 1 ? 2 : 0 }}> {/* Reduced mb */}
                      <ListItemIcon className={styles.contactItemIcon} sx={{minWidth: 'auto', mr: 1.5}}>
                        <Box className={styles.contactItemCircle} sx={{
                           backgroundColor: alpha(theme.palette.primary.main, 0.15), width: {xs:32, md:36}, height: {xs:32, md:36}, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: iveStyles.transition, '&:hover': { transform: iveStyles.hover.scale } // Reduced size
                        }}>
                          {React.createElement(item.icon, { sx: { fontSize: {xs:16, md:18}, color: theme.palette.primary.main }, "aria-hidden": "true" })} {/* Reduced icon size */}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.primaryText}
                        secondary={item.secondaryText}
                        primaryTypographyProps={{ variant: 'body2', color: theme.palette.text.secondary, fontWeight: 500, mb: 0.25, className: styles.contactItemPrimary, sx: { letterSpacing: iveStyles.letterSpacing.body, fontSize: {xs: '0.75rem', md: '0.8rem'} } }} // Reduced font size
                        secondaryTypographyProps={{ variant: 'body1', color: theme.palette.text.primary, fontWeight: 600, className: styles.contactItemSecondary, sx: {fontSize: {xs: '0.85rem', md: '0.95rem'}} }} // Reduced font size
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
                  aria-busy={submitStatus === 'loading'}
                  className={styles.formCard}
                  sx={{
                    p: {xs: 2, sm:2.5, md: 3}, height: '100%', display: 'flex', flexDirection: 'column', // Reduced padding
                    /* ... other GoldCard styles ... */
                    backgroundColor: alpha(theme.palette.background.paper, 0.98),
                    backdropFilter: 'blur(10px)',
                    boxShadow: iveStyles.shadows.medium(theme.palette.common.black),
                    borderRadius: iveStyles.borderRadius.card,
                    transition: iveStyles.transition,
                    '&:hover': { boxShadow: iveStyles.shadows.prominent(theme.palette.common.black), transform: 'translateY(-3px)'},
                  }}
                >
                  <Box className={styles.formHeader} sx={{ mb: {xs:2.5, md:3}, textAlign: 'center' }}> {/* Reduced mb */}
                    <Box className={styles.formIconCircle} sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      width: {xs: 48, md: 56}, height: {xs:48, md:56}, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', mb: 1.5, // Reduced size & mb
                      /* ... */
                    }}>
                      {React.createElement(heroSection.formIcon, { sx: { fontSize: {xs:24, md:28}, color: 'white' } })} {/* Reduced icon size */}
                    </Box>
                    <Typography variant="h3" component="h2" className={styles.formTitle} sx={{ mb: 0.5, letterSpacing: iveStyles.letterSpacing.heading, fontWeight: 600, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}> {/* Reduced font size */}
                      {heroSection.formTitle}
                    </Typography>
                    <Typography variant="body1" className={styles.formSubtitle} sx={{ color: theme.palette.text.secondary, letterSpacing: iveStyles.letterSpacing.body, lineHeight: 1.5, maxWidth: '90%', mx: 'auto', fontSize: {xs: '0.85rem', md: '0.9rem'} }}> {/* Reduced font size */}
                      {heroSection.formSubtitle}
                    </Typography>
                  </Box>

                  <Stack spacing={{xs: 1.5, md: 2.5}} className={styles.formFieldsContainer} sx={{ mb: 'auto' }}> {/* Reduced spacing */}
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
                          startAdornment: ( <InputAdornment position="start"> {React.createElement(field.icon, { "aria-hidden": "true", style:{fontSize: '1.1rem'} })} </InputAdornment> ), // Slightly smaller adornment icon
                          className: styles.textFieldInput,
                          sx: { borderRadius: iveStyles.borderRadius.input, transition: iveStyles.transition, '&.Mui-focused': { boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}` } }
                        }}
                        variant="outlined"
                        size="small" // Makes TextFields more compact
                      />
                    ))}
                    <TextField
                      fullWidth
                      label={formAdditionalText.messageLabel}
                      name="message"
                      multiline
                      rows={3} // Reduced rows for message field
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
                      size="small" // Makes TextFields more compact
                    />
                    <Box component="div" aria-live="polite" sx={{ position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: '0', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: '0' }}>
                        {submitStatus === 'loading' && "Submitting your message, please wait."}
                    </Box>
                    <Button type="submit" fullWidth size="large" variant="contained" disabled={submitStatus === 'loading'} className={styles.submitButton} sx={{
                        mt: 1.5, height: 52, // Slightly reduced margin-top and height
                        /* ... other button styles ... */
                         '&.Mui-disabled': { background: alpha(theme.palette.action.disabledBackground, 0.5), color: theme.palette.action.disabled, boxShadow: 'none' }
                      }}>
                      {submitStatus === 'loading' ? <CircularProgress size={24} color="inherit" /> : formCTA}
                    </Button>
                    {errors.form && <Typography color="error" variant="body2" sx={{mt:1, textAlign:'center'}}>{errors.form}</Typography>}
                  </Stack>
                </GoldCard>
              </Box>
            </Slide>
          </Box>

          <Box className={styles.testimonialsSection} sx={{ py: {xs:3, md:5}, mb: {xs:3, md:5} }}>
            <Typography variant="h2" component="h2" className={styles.testimonialsSectionTitle} sx={{
              /* ... */ fontSize: { xs: '1.7rem', sm: '2rem', md: '2.3rem' }
            }}>
              {testimonialSection.title}
            </Typography>
            <Typography variant="body1" className={styles.testimonialsSectionSubtitle} sx={{
              /* ... */ fontSize: {xs: '0.9rem', md: '0.95rem'}, mb: {xs:2.5, md:4}
            }}>
              {testimonialSection.subtitle}
            </Typography>
            <Grid container spacing={{xs:2, sm:2.5, md:3}} justifyContent="center">
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
                  <Zoom in={animateIn} style={{ transitionDelay: `${index * 150}ms` }}>
                    <Paper elevation={4} className={styles.testimonialCard} sx={{
                        p: {xs:1.5, sm:2, md:2.5}, /* ... */
                    }}>
                      <Box className={styles.starsContainer} sx={{ mb: 1.5 }}>{renderStars(testimonial.rating)}</Box>
                      <Typography variant="body1" className={styles.testimonialContent} sx={{
                          /* ... */ fontSize: {xs: '0.85rem', md: '0.9rem'}, mb: 2,
                      }}>
                        "{testimonial.content}"
                      </Typography>
                      <Box className={styles.testimonialAuthor} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={testimonial.avatar} alt={testimonial.name} className={styles.testimonialAvatar} sx={{
                            /* ... */ width: {xs: 36, md: 44}, height: {xs:36, md:44}, mr: 1.5
                          }}/>
                        <Box>
                          <Typography variant="h6" className={styles.testimonialName} sx={{ fontSize: {xs: '0.9rem', md: '0.95rem'}, /* ... */ }}>{testimonial.name}</Typography>
                          <Typography variant="body2" sx={{ /* ... */ fontSize: {xs: '0.75rem', md: '0.8rem'} }}>{testimonial.role}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>

          <FAQ items={faqItems} title="Frequently Asked Questions" subtitle="Find answers to common questions about our services and solutions"
            sx={{ mb: { xs: 5, md: 7 } }} />
          <BackToTopButton />
        </Container>
      </ConsistentPageLayout>
      {/* ... comments about prefers-reduced-motion and color contrast ... */}
    </>
  );
}