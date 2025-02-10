'use client';

import { useState, useCallback } from 'react';
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
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Person, Email, Phone, ChatBubbleOutline, Headset, KeyboardArrowUp } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import GoldCard from '../components/GoldCard';
import { getSharedStyles } from '../utils/sharedStyles';
import * as yup from 'yup';

interface FormData {
  name: string;
  email: string;
  phone?: string;  // Make phone optional
  message?: string;  // Make message optional
}

const validationSchema: yup.ObjectSchema<FormData> = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: yup.string()
    .optional()  // No need to require phone
    .matches(
      /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,
      'Invalid phone number format (e.g. +1 555-123-4567)'
    )
    .max(20, 'Phone number cannot exceed 20 characters'),
  message: yup.string()
    .optional()  // No need to require message
    .max(500, 'Message cannot exceed 500 characters'),
});

const faqItems = [
  {
    question: "What services do you offer?",
    answer: "We provide comprehensive technology consulting services including digital transformation strategy, cloud solutions, software development, and IT infrastructure optimization."
  },
  {
    question: "How quickly can I get a tech roadmap?",
    answer: "We typically deliver initial roadmaps within 24-48 hours of receiving your project details. Complex projects may require additional time for thorough analysis."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We have expertise across multiple sectors including healthcare, finance, e-commerce, and manufacturing. Our solutions are tailored to meet industry-specific challenges."
  },
  {
    question: "What are your security standards?",
    answer: "We adhere to ISO 27001 standards and implement end-to-end encryption for all client communications. Regular security audits ensure continuous protection of your data."
  }
];

const Contact: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const navBackgroundColor = alpha(theme.palette.background.default, 0.7);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'form', string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2000);

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

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, [setFormData]);

  if (success) {
    return (
      <ConsistentPageLayout
        seoTitle="Thank You"
        seoDescription="Thank you for contacting us!"
        title="Message Sent!"
        subtitle="We’ll be in touch shortly."
      >
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body1"
            role="alert"
            aria-live="assertive"
            sx={{
              mb: 3,
              color: theme.palette.success.contrastText,
              backgroundColor: theme.palette.success.main,
              p: 3,
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            Thank you for your message. We have received it and will get back to you as soon as possible.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push('/')}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
        <BackToTopButton />
      </ConsistentPageLayout>
    );
  }

  const textFieldStyles = {
    '& .MuiInputBase-root': {
      borderRadius: 2,
      height: { xs: '54px', md: '60px' },
      backgroundColor: 'white',
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    '& .Mui-focused': {
      borderColor: `${theme.palette.secondary.main} !important`,
      boxShadow: `0 0 0 2px ${alpha(theme.palette.secondary.main, 0.2)}`,
    },
  };

  return (
    <>
      <SEO
        title="Contact Us - Expert Tech Solutions"
        description="Reach out for tailored technology consulting and solutions. Let our experts guide your digital transformation."
        keywords="contact, support, inquiry, partnership, technology consulting"
      />
      <ConsistentPageLayout>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
              gap: { xs: 4, md: 6 },
              width: '100%',
              maxWidth: 1400,
              mx: 'auto',
              py: { xs: 3, md: 5 },
            }}
          >
            {/* Contact Information Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                backgroundColor: navBackgroundColor,
                boxShadow: theme.shadows[3],
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Headset sx={{ fontSize: 40, color: theme.palette.secondary.main, mr: 2 }} />
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    color: theme.palette.text.primary,
                  }}
                >
                  Get in Touch Today
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.7,
                  fontSize: '1.1rem',
                }}
              >
                We’d love to hear about your projects and challenges. Contact us to explore how our tailored tech solutions can accelerate your business.
              </Typography>
              <Divider sx={{ my: 2, borderColor: alpha(theme.palette.divider, 0.2) }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Phone sx={{ color: theme.palette.text.secondary }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="+1 (555) 123-4567"
                    primaryTypographyProps={{
                      sx: {
                        color: theme.palette.text.primary,
                        fontWeight: 500
                      }
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email sx={{ color: theme.palette.text.secondary }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="contact@techsolutions.com"
                    primaryTypographyProps={{
                      sx: {
                        color: theme.palette.text.primary,
                        fontWeight: 500
                      }
                    }}
                  />
                </ListItem>
              </List>
            </Box>

            {/* Contact Form Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <GoldCard
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: { xs: 4, sm: 5, md: 6 },
                  borderRadius: 4,
                  width: '100%',
                  height: 'auto',
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  boxShadow: theme.shadows[3],
                  textAlign: { xs: 'center', md: 'left' }, // Added for mobile centering
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.text.primary,
                  }}
                >
                  Get a Custom Tech Roadmap in 24 Hours
                </Typography>
                <Stack spacing={4} sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={textFieldStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: theme.palette.text.secondary }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email *"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={textFieldStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: theme.palette.text.secondary }} />
                        </InputAdornment>
                      ),
                    }}
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
                          <Phone sx={{ color: theme.palette.text.secondary }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!errors.message}
                    helperText={errors.message || `${formData.message?.length || 0}/500`}
                    sx={{
                      ...textFieldStyles,
                      '& .MuiInputBase-root': {
                        ...textFieldStyles['& .MuiInputBase-root'],
                        height: { xs: '150px', md: '200px' },
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ChatBubbleOutline sx={{ color: theme.palette.text.secondary }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                    sx={{
                      py: 2.5,
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      textTransform: 'none',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        backgroundColor: theme.palette.secondary.dark,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Send Inquiry'
                    )}
                  </Button>
                </Stack>
              </GoldCard>
            </Box>
          </Box>
        </Container>


        {/* Enhanced FAQ Section */}
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Typography variant="h2" component="h2" sx={{
            mb: 6,
            textAlign: { xs: 'center', md: 'center' }, // Added to ensure heading is centered on mobile
            fontWeight: 800,
            color: theme.palette.primary.main,
            fontSize: { xs: '2.5rem', md: '3rem' },
            letterSpacing: '-0.5px'
          }}>
            Frequently Asked Questions
          </Typography>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}>
            <GoldCard sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              width: '100%',
              maxWidth: 1000,
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              boxShadow: theme.shadows[8],
              textAlign: { xs: 'center', md: 'left' }, // Added for mobile centering
            }}>
              {faqItems.map((item, index) => (
                <Accordion
                  key={index}
                  sx={{
                    mb: 3,
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                    backgroundColor: 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{
                      color: theme.palette.secondary.main,
                      fontSize: '2rem'
                    }} />}
                    sx={{
                      minHeight: 72,
                      padding: { xs: 2, md: 3 },
                      '& .MuiAccordionSummary-content': {
                        my: 1,
                        alignItems: 'center'
                      },
                      backgroundColor: alpha(theme.palette.primary.light, 0.1),
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h5" sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1.2rem', md: '1.4rem' }
                    }}>
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="body1" sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7,
                      pl: 2,
                      fontSize: { xs: '1rem', md: '1.1rem' }
                    }}>
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </GoldCard>
          </Box>
        </Container>

        <BackToTopButton />
      </ConsistentPageLayout>
    </>
  );
};

const BackToTopButton = () => {
  const theme = useTheme();
  return (
    <Fab
      color="secondary"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        boxShadow: theme.shadows[6],
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      }}
    >
      <KeyboardArrowUp />
    </Fab>
  );
};

export default Contact;