'use client';

import React, { useState, useEffect, FormEventHandler } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as yup from 'yup';
import {
  Box, Container, Typography, Divider, Grid, Stack, Paper, Avatar, 
  List, ListItem, ListItemIcon, ListItemText, TextField, Button, 
  InputAdornment, CircularProgress, Fab, Slide, Fade, Zoom,
  useTheme, alpha
} from '@mui/material';
import SEO from '../../components/SEO';
import ConsistentPageLayout from '../../components/Shared/ConsistentPageLayout';
import GoldCard from '../../components/GoldCard';
import FAQ from '../../components/Common/FAQ';
import { 
  faqItems, testimonials, contactInfoItems, heroSection, 
  testimonialSection, successPageData, icons, formCTA, 
  formAdditionalText, seoData, validationConfig
} from '../../data/contactPageData';
import styles from '@/styles/contact.module.css';

// Validation schema
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

// Ive-inspired styles
const iveStyles = {
  transition: 'all 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
  letterSpacing: { heading: '-0.01em', body: '0.01em' },
  hover: {
    transform: 'translateY(-2px)',
    scale: 'scale(1.05)'
  }
};

// Back to Top Button
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
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: `0 4px 14px ${alpha('#000', 0.15)}`,
          transition: iveStyles.transition,
          '&:hover': { 
            boxShadow: `0 6px 18px ${alpha('#000', 0.2)}`,
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
  
  // State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
    const plan = searchParams.get('plan');
    const custom = searchParams.get('custom');
    
    if (plan) setFormData(prev => ({ ...prev, message: `I'm interested in the ${plan} plan.` }));
    else if (custom) setFormData(prev => ({ ...prev, message: "I'm interested in discussing a custom solution for my business." }));
  }, [searchParams]);

  // Form submission handler - changed to match FormEventHandler<HTMLDivElement>
  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach(error => { if (error.path) validationErrors[error.path] = error.message; });
        setErrors(validationErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  // Input change handler
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

  // Star rating helper
  const renderStars = (rating: number) => (
    <Box sx={{ display: 'flex' }}>
      {Array(5).fill(0).map((_, i) => (
        <icons.starIcon key={i} sx={{ 
          color: i < rating ? theme.palette.secondary.main : alpha(theme.palette.divider, 0.5),
          fontSize: '1.2rem', mr: 0.5
        }} />
      ))}
    </Box>
  );

  // Success page
  if (success) {
    return (
      <ConsistentPageLayout
        seoTitle={successPageData.seoTitle}
        seoDescription={successPageData.seoDescription}
        title={successPageData.title}
        subtitle={successPageData.subtitle}
        scrollOptions={{ showSectionMenu: false, showProgressIndicator: false }}
      >
        <Zoom in={true} timeout={800}>
          <Box className={styles.successContainer}>
            <Box 
              className={styles.successIconCircle} 
              sx={{ 
                backgroundColor: alpha(theme.palette.success.main, 0.15),
                transition: iveStyles.transition,
                '&:hover': { transform: iveStyles.hover.scale }
              }}
            >
              <icons.checkCircle style={{ fontSize: 80, color: theme.palette.success.main, width: '1.5em', height: '1.5em' }} />
            </Box>
            <Typography 
              variant="h3" 
              component="h2" 
              className={styles.successTitle}
              sx={{ letterSpacing: iveStyles.letterSpacing.heading }}
            >
              {successPageData.title}
            </Typography>
            <Typography 
              variant="body1" 
              className={styles.successMessage} 
              sx={{ 
                color: theme.palette.text.secondary,
                letterSpacing: iveStyles.letterSpacing.body,
                lineHeight: 1.6
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
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                borderRadius: '12px',
                textTransform: 'none',
                transition: iveStyles.transition,
                '&:hover': { 
                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
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

  // Main contact page
  return (
    <>
      <SEO title={seoData.title} description={seoData.description} keywords={seoData.keywords} />
      <ConsistentPageLayout scrollOptions={{ showSectionMenu: false, showProgressIndicator: false }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 4, md: 6 } }}>
          {/* Hero Header */}
          <Fade in={animateIn} timeout={1000}>
            <Box className={styles.heroContainer} sx={{ mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="h1"
                component="h1"
                className={styles.heroTitle}
                sx={{ 
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  letterSpacing: '-0.015em',
                  fontWeight: 700,
                  lineHeight: 1.2
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
                  lineHeight: 1.6
                }}
              >
                {heroSection.subtitle}
              </Typography>
            </Box>
          </Fade>

          <Box className={styles.contactGrid} sx={{ mb: { xs: 6, md: 8 } }}>
            {/* Contact Information Section */}
            <Slide direction="right" in={animateIn} timeout={800}>
              <Box className={styles.contactInfoBox} sx={{
                backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.8 : 0.95),
                backdropFilter: 'blur(8px)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                borderRadius: '16px',
                p: 4,
                position: 'relative',
                overflow: 'hidden',
                transition: iveStyles.transition,
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                }
              }}>
                <Box className={styles.contactInfoAccent} sx={{ 
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 4,
                  height: '100%'
                }} />
                
                <Box className={styles.contactInfoHeader} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Box className={styles.iconCircle} sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.15), 
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    transition: iveStyles.transition,
                    '&:hover': { transform: iveStyles.hover.scale }
                  }}>
                    {React.createElement(heroSection.contactInfoIcon, { sx: { fontSize: 28, color: theme.palette.primary.main } })}
                  </Box>
                  <Box>
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      className={styles.contactInfoTitle} 
                      sx={{ 
                        mb: 0.5,
                        letterSpacing: iveStyles.letterSpacing.heading
                      }}
                    >
                      {heroSection.contactInfoTitle}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      className={styles.contactInfoSubtitle} 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        letterSpacing: iveStyles.letterSpacing.body
                      }}
                    >
                      {heroSection.contactInfoSubtitle}
                    </Typography>
                  </Box>
                </Box>

                <Typography 
                  variant="body1" 
                  className={styles.contactInfoDescription} 
                  sx={{ 
                    color: theme.palette.text.secondary, 
                    mb: 3,
                    letterSpacing: iveStyles.letterSpacing.body,
                    lineHeight: 1.6
                  }}
                >
                  {heroSection.contactInfoDescription}
                </Typography>

                <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.divider, 0.1) }} />

                <List disablePadding className={styles.contactItemsList}>
                  {contactInfoItems.map((item, index) => (
                    <ListItem key={index} disableGutters className={styles.contactItem} sx={{ mb: index < contactInfoItems.length - 1 ? 3 : 0 }}>
                      <ListItemIcon className={styles.contactItemIcon}>
                        <Box className={styles.contactItemCircle} sx={{ 
                          backgroundColor: alpha(theme.palette.primary.main, 0.15),
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: iveStyles.transition,
                          '&:hover': { transform: iveStyles.hover.scale }
                        }}>
                          {React.createElement(item.icon, { sx: { fontSize: 20, color: theme.palette.primary.main } })}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.primaryText}
                        secondary={item.secondaryText}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                          mb: 0.5,
                          className: styles.contactItemPrimary,
                          sx: { letterSpacing: iveStyles.letterSpacing.body }
                        }}
                        secondaryTypographyProps={{
                          variant: 'body1',
                          color: theme.palette.text.primary,
                          fontWeight: 600,
                          className: styles.contactItemSecondary
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Slide>

            {/* Contact Form Section */}
            <Slide direction="left" in={animateIn} timeout={800}>
              <Box sx={{ height: '100%' }}>
                <GoldCard
                  component="form"
                  onSubmit={handleSubmit}
                  className={styles.formCard}
                  sx={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    borderRadius: '16px',
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: iveStyles.transition,
                    '&:hover': { 
                      boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                      transform: iveStyles.hover.transform
                    },
                  }}
                >
                  <Box className={styles.formHeader} sx={{ mb: 4, textAlign: 'center' }}>
                    <Box className={styles.formIconCircle} sx={{ 
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      mb: 2,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                      transition: iveStyles.transition,
                      '&:hover': { transform: iveStyles.hover.scale }
                    }}>
                      {React.createElement(heroSection.formIcon, { sx: { fontSize: 32, color: 'white' } })}
                    </Box>
                    <Typography 
                      variant="h3" 
                      component="h2" 
                      className={styles.formTitle} 
                      sx={{ 
                        mb: 1,
                        letterSpacing: iveStyles.letterSpacing.heading
                      }}
                    >
                      {heroSection.formTitle}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      className={styles.formSubtitle} 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        letterSpacing: iveStyles.letterSpacing.body,
                        lineHeight: 1.6
                      }}
                    >
                      {heroSection.formSubtitle}
                    </Typography>
                  </Box>

                  <Stack spacing={3} className={styles.formFieldsContainer} sx={{ mb: 'auto' }}>
                    {/* Form Fields */}
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
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]}
                        className={styles.textField}
                        required={field.required}
                        InputProps={{
                          startAdornment: (<InputAdornment position="start">{React.createElement(field.icon)}</InputAdornment>),
                          className: styles.textFieldInput,
                          sx: {
                            borderRadius: '10px',
                            transition: iveStyles.transition,
                            '&.Mui-focused': {
                              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                            }
                          }
                        }}
                      />
                    ))}

                    {/* Message Field */}
                    <TextField
                      fullWidth
                      label={formAdditionalText.messageLabel}
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!errors.message}
                      helperText={errors.message || `${formData.message?.length || 0}/500 characters`}
                      className={styles.messageField}
                      InputProps={{
                        className: styles.messageFieldInput,
                        sx: {
                          borderRadius: '10px',
                          transition: iveStyles.transition,
                          '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                          }
                        }
                      }}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      disabled={loading}
                      className={styles.submitButton}
                      sx={{
                        mt: 2,
                        height: 52,
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        textTransform: 'none',
                        fontWeight: 600,
                        letterSpacing: iveStyles.letterSpacing.body,
                        transition: iveStyles.transition,
                        '&:hover': { 
                          boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                          transform: iveStyles.hover.transform
                        },
                        '&:active': {
                          transform: 'translateY(0)'
                        }
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : formCTA}
                    </Button>
                  </Stack>
                </GoldCard>
              </Box>
            </Slide>
          </Box>

          {/* Testimonials Section */}
          <Box className={styles.testimonialsSection} sx={{ py: 6, mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              className={styles.testimonialsSectionTitle} 
              sx={{ 
                mb: 1,
                letterSpacing: iveStyles.letterSpacing.heading
              }}
            >
              {testimonialSection.title}
            </Typography>
            <Typography 
              variant="body1" 
              className={styles.testimonialsSectionSubtitle} 
              sx={{ 
                color: theme.palette.text.secondary, 
                mb: 4,
                letterSpacing: iveStyles.letterSpacing.body,
                lineHeight: 1.6
              }}
            >
              {testimonialSection.subtitle}
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
                  <Zoom in={animateIn} style={{ transitionDelay: `${index * 150}ms` }}>
                    <Paper
                      elevation={4}
                      className={styles.testimonialCard}
                      sx={{
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: alpha(theme.palette.background.paper, 0.9),
                        borderRadius: '14px',
                        transition: iveStyles.transition,
                        '&:hover': { 
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          transform: 'translateY(-3px)'
                        },
                      }}
                    >
                      <Box className={styles.starsContainer} sx={{ mb: 2 }}>
                        {renderStars(testimonial.rating)}
                      </Box>
                      <Typography 
                        variant="body1" 
                        className={styles.testimonialContent} 
                        sx={{ 
                          mb: 3, 
                          flexGrow: 1,
                          letterSpacing: iveStyles.letterSpacing.body,
                          lineHeight: 1.6
                        }}
                      >
                        "{testimonial.content}"
                      </Typography>
                      <Box className={styles.testimonialAuthor} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className={styles.testimonialAvatar}
                          sx={{ 
                            border: `2px solid ${theme.palette.primary.main}`, 
                            mr: 2,
                            boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`
                          }}
                        />
                        <Box>
                          <Typography variant="h6" className={styles.testimonialName} sx={{ fontSize: '1rem', fontWeight: 600, letterSpacing: iveStyles.letterSpacing.body }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: iveStyles.letterSpacing.body }}>
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

          {/* FAQ Section */}
          <FAQ 
            items={faqItems} 
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and solutions"
            sx={{ mb: { xs: 6, md: 8 } }}
          />
          
          <BackToTopButton />
        </Container>
      </ConsistentPageLayout>
    </>
  );
}