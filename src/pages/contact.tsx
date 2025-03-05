'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  useTheme,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  InputAdornment,
  Container,
  Divider,
  Fab,
  Stack,
  Grid,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Avatar,
  useMediaQuery,
  Slide,
  Fade,
  Zoom
} from '@mui/material';
import { 
  Person, 
  Email, 
  Phone, 
  KeyboardArrowUp,
  Star,
  CheckCircle
} from '@mui/icons-material';
import { SPACING } from '../utils/sharedStyles';
import { GradientButton } from '../components/GradientButton';
import { useRouter } from 'next/navigation';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import GoldCard from '../components/GoldCard';
import { getSharedStyles } from '../utils/sharedStyles';
import * as yup from 'yup';
// Update the import path to use the common folder
import FAQ from '../components/Common/FAQ';
import { 
  faqItems, 
  testimonials, 
  contactInfoItems, 
  heroSection, 
  testimonialSection,
  successPageData
} from '../data/contactPageData';
import { CheckCircleIcon } from 'lucide-react';

// Form validation schema
const validationSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: yup.string()
    .optional()
    .matches(
      /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,
      'Invalid phone number format (e.g. +1 555-123-4567)'
    )
    .max(20, 'Phone number cannot exceed 20 characters'),
  message: yup.string()
    .optional()
    .max(500, 'Message cannot exceed 500 characters'),
});

// Form data interface
interface FormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'form', string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Animation control
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 1500);

    } catch (validationError: any) {
      if (validationError instanceof yup.ValidationError) {
        const validationErrors: Partial<Record<keyof FormData, string>> = {};
        validationError.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            validationErrors[err.path as keyof FormData] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
        console.error("Form submission error:", validationError);
      }
    }
  }, [formData]);

  // Input change handler
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name as keyof FormData];
        return updated;
      });
    }
  }, [setFormData, errors]);

  // Success page
  if (success) {
    return (
      <ConsistentPageLayout
        seoTitle={successPageData.seoTitle}
        seoDescription={successPageData.seoDescription}
        title={successPageData.title}
        subtitle={successPageData.subtitle}
      >
        <Zoom in={true} timeout={800}>
          <Box sx={{ 
            mt: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            maxWidth: 600,
            mx: 'auto'
          }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.success.main, 0.15),
                mb: 4
              }}
            >
             <CheckCircleIcon 
    style={{ 
      fontSize: 80, 
      color: theme.palette.success.main,
      width: '1.5em',  // Add explicit sizing
      height: '1.5em'
    }} 
  />
            </Box>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                textAlign: 'center'
              }}
            >
              {successPageData.title}
            </Typography>
            <Typography
              variant="body1"
              role="alert"
              aria-live="assertive"
              sx={{
                mb: 4,
                fontSize: '1.25rem',
                color: theme.palette.text.secondary,
                textAlign: 'center',
                lineHeight: 1.6
              }}
            >
              {successPageData.message}
            </Typography>
            <GradientButton
              href="/"
              label={successPageData.buttonText}
              sizeVariant="large"
              sx={{ my: 2, px: 6 }}
            />
          </Box>
        </Zoom>
        <BackToTopButton />
      </ConsistentPageLayout>
    );
  }

  // TextField styling
  const textFieldStyles = {
    '& .MuiInputBase-root': {
      borderRadius: 2,
      height: { xs: '54px', md: '60px' },
      backgroundColor: 'white',
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        borderColor: theme.palette.primary.main,
      }
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderWidth: 1,
        borderColor: alpha(theme.palette.divider, 0.3),
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
        borderWidth: 2,
      },
    },
    '& .Mui-focused': {
      boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.2)}`,
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      '&.Mui-focused': {
        color: theme.palette.secondary.main,
      },
    },
    '& .MuiInputAdornment-root': {
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  };

  // Create stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star key={index} sx={{ 
        color: index < rating ? theme.palette.secondary.main : alpha(theme.palette.divider, 0.5),
        fontSize: '1.2rem' 
      }} />
    ));
  };

  return (
    <>
      <SEO
        title="Contact Us - Expert Tech Solutions"
        description="Reach out for tailored technology consulting and solutions. Let our experts guide your digital transformation."
        keywords="contact, support, inquiry, partnership, technology consulting"
      />
      <ConsistentPageLayout>
        <Container 
          maxWidth="lg" 
          sx={{ 
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 6, md: 10 }
          }}
        >
          {/* Hero Header */}
          <Fade in={animateIn} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  mb: 2,
                }}
              >
                {heroSection.title}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                {heroSection.subtitle}
              </Typography>
            </Box>
          </Fade>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
              gap: { xs: 6, md: 8 },
              width: '100%',
              maxWidth: 1400,
              mx: 'auto',
              mb: { xs: 8, md: 12 },
            }}
          >
            {/* Contact Information Section */}
            <Slide direction="right" in={animateIn} timeout={800}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  p: { xs: 4, md: 5 },
                  borderRadius: 4,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.background.paper, 0.8)
                    : alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(8px)',
                  boxShadow: theme.shadows[6],
                  height: 'fit-content',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                      mr: 3
                    }}
                  >
                    {React.createElement(heroSection.contactInfoIcon, { 
                      sx: { fontSize: 28, color: theme.palette.primary.main } 
                    })}
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        color: theme.palette.text.primary,
                      }}
                    >
                      {heroSection.contactInfoTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mt: 0.5,
                      }}
                    >
                      {heroSection.contactInfoSubtitle}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7,
                    fontSize: '1.05rem',
                  }}
                >
                  Ready to accelerate your digital transformation? Our team of experts is here to help you navigate the complexities of modern technology and create solutions tailored to your specific business needs.
                </Typography>

                <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.1) }} />

                <List disablePadding>
                  {contactInfoItems.map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ mb: index < contactInfoItems.length - 1 ? 2 : 0 }}>
                      <ListItemIcon sx={{ minWidth: 42 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            backgroundColor: alpha(theme.palette.primary.main, 0.15),
                          }}
                        >
                          {React.createElement(item.icon, { 
                            sx: { fontSize: 20, color: theme.palette.primary.main } 
                          })}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.primaryText}
                        secondary={item.secondaryText}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                          mb: 0.5
                        }}
                        secondaryTypographyProps={{
                          variant: 'body1',
                          color: theme.palette.text.primary,
                          fontWeight: 600
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Slide>

            {/* Contact Form Section */}
            <Slide direction="left" in={animateIn} timeout={800}>
              <Box>
                <GoldCard
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    p: { xs: 4, sm: 5, md: 6 },
                    borderRadius: 4,
                    width: '100%',
                    height: 'auto',
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(8px)',
                    boxShadow: theme.shadows[8],
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: theme.shadows[12],
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 5
                  }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        mb: 3,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      }}
                    >
                      {React.createElement(heroSection.formIcon, { 
                        sx: { fontSize: 40, color: 'white' } 
                      })}
                    </Box>
                    <Typography
                      variant="h3"
                      component="h2"
                      align="center"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        color: theme.palette.text.primary,
                        mb: 1,
                      }}
                    >
                      {heroSection.formTitle}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      align="center"
                      sx={{
                        color: theme.palette.text.secondary,
                        maxWidth: 500,
                      }}
                    >
                      {heroSection.formSubtitle}
                    </Typography>
                  </Box>

                  <Stack spacing={4} sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      sx={textFieldStyles}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: theme.palette.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />

                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={textFieldStyles}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: theme.palette.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />

                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      sx={textFieldStyles}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone sx={{ color: theme.palette.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Tell us about your project"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!errors.message}
                      helperText={errors.message ? errors.message : `${formData.message?.length || 0}/500 characters`}
                      sx={{
                        ...textFieldStyles,
                        '& .MuiInputBase-root': {
                          ...textFieldStyles['& .MuiInputBase-root'],
                          height: 'auto',
                          minHeight: { xs: '150px', md: '180px' },
                          alignItems: 'flex-start',
                          padding: '16px 14px',
                        },
                        '& .MuiInputAdornment-root': {
                          height: 'auto',
                          maxHeight: '24px',
                          marginTop: '2px',
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                         
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        py: 3,
                        mt: 2,
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        },
                        '&:active': {
                          transform: 'translateY(1px)',
                        },
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={28} color="inherit" />
                      ) : (
                        'Request Your Tech Roadmap'
                      )}
                    </Button>
                  </Stack>
                </GoldCard>
              </Box>
            </Slide>
          </Box>

          {/* Testimonials Section */}
          <Box sx={{ py: SPACING.large, mb: { xs: 8, md: 12 } }}>
            <Typography 
              variant="h2" 
              component="h2" 
              align="center" 
              sx={{ 
                mb: 2, 
                fontWeight: 800,
                fontSize: { xs: '2.2rem', md: '2.8rem' }
              }}
            >
              {testimonialSection.title}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 800,
                mx: 'auto',
                mb: 8,
                fontSize: '1.1rem'
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
                      sx={{
                        p: 4,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: theme.shadows[12],
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        {renderStars(testimonial.rating)}
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontStyle: 'italic', 
                          mb: 4, 
                          lineHeight: 1.8,
                          flex: 1,
                          color: theme.palette.text.primary,
                          fontSize: '1.05rem'
                        }}
                      >
                        "{testimonial.content}"
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          sx={{ 
                            width: 56, 
                            height: 56, 
                            mr: 2,
                            border: `2px solid ${theme.palette.primary.main}`
                          }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{testimonial.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* FAQ Section - Using the reusable component */}
          <FAQ 
            items={faqItems} 
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and solutions"
            sx={{ mb: { xs: 8, md: 12 } }}
          />
          
          <BackToTopButton />
        </Container>
      </ConsistentPageLayout>
    </>
  );
};

// Back to Top Button Component
const BackToTopButton = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        aria-label="Back to Top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: theme.spacing(4),
          right: theme.spacing(4),
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          zIndex: 1100,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

export default Contact;