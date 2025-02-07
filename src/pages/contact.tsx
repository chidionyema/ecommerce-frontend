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
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { z } from 'zod';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import GoldCard from '../components/GoldCard';
import PageSection from '../components/PageSection';
import { Person, Email, Phone, ChatBubbleOutline, AccessTime, Headset } from '@mui/icons-material';
import { CheckCircle } from 'lucide-react';
import { getSharedStyles, SPACING } from '../utils/sharedStyles';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Invalid email address').trim(),
  phone: z
    .string()
    .regex(/^$|^[+]?[()0-9\s.-]{7,15}$/, 'Invalid phone number')
    .trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').trim(),
});

type FormData = z.infer<typeof formSchema>;

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const Contact: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'form', string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const styles = getSharedStyles(theme);

  const validateField = useCallback((name: keyof FormData, value: string) => {
    try {
      const fieldSchema = z.object({ [name]: formSchema.shape[name] });
      fieldSchema.parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      formSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
        setLoading(false);
        return;
      }
    }

    try {
      // Placeholder for email sending logic
      // await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, formData, EMAILJS_CONFIG.USER_ID);
      setSuccess(true);
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error('Failed to send email:', error);
      setErrors({ form: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <ConsistentPageLayout
        seoTitle="Thank You"
        seoDescription="Thank you for contacting us!"
        title="Message Sent!"
        subtitle="We'll be in touch shortly."
      >
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1">
            Thank you for your message. We have received it and will get back to you as soon as possible.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = '/')}
            sx={{ mt: 3 }}
          >
            Back to Home
          </Button>
        </Box>
      </ConsistentPageLayout>
    );
  }

  return (
    <>
      <SEO
        title="Contact Us - Expert Tech Solutions - GLUStack"
        description="Contact GLUStack for expert technology consulting and solutions. Let's discuss your project and drive your success."
        keywords="contact, support, inquiry, partnership, technology consulting, expert solutions"
      />
      <ConsistentPageLayout
        seoTitle="Contact Us - Expert Tech Solutions - GLUStack"
        seoDescription="Reach out to our team for inquiries, support, or partnership opportunities."
        seoKeywords="contact, support, inquiry, partnership"
        title="Let's Discuss Your Technology Needs"
        subtitle="Our team is ready to provide expert guidance and solutions."
      >
        <Container 
          maxWidth="lg"
          sx={{ 
            p: styles.containerPadding,
            px: { xs: 2, sm: 4, md: 6 }
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.4fr 1.6fr' },
              gap: { xs: 4, md: 6 },
              width: '100%',
              maxWidth: 1400,
              mx: 'auto',
              py: { xs: 3, md: 5 },
              alignItems: 'start',
              // Center each grid item on mobile
              justifyItems: { xs: 'center', md: 'unset' },
            }}
          >
            {/* Left-side Contact Info */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, md: 4 },
                justifyContent: 'flex-start',
                textAlign: { xs: 'center', md: 'left' },
                alignItems: { xs: 'center', md: 'flex-start' },
                p: { xs: 1, md: 2 },
                pl: 0, // Remove left padding
                borderRadius: 2,
                backgroundColor: theme.palette.background.default,
                boxShadow: theme.shadows[1],
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.text.primary,
                  fontSize: { xs: '1.8rem', md: '2.2rem' }
                }}
              >
                Get in Touch Today
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  color: theme.palette.text.secondary, 
                  lineHeight: 1.7, 
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  mb: 2
                }}
              >
                We're eager to learn about your projects and challenges. Reach out to us, and let's explore how our expert technology solutions can drive your business forward.
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 1 }}
                >
                  Office Hours
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.primary.main }}>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText
                      primary="Monday - Friday: 9AM - 6PM EST"
                      secondary="General Inquiries & Consultations"
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.primary.main }}>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText
                      primary="Saturday: By Appointment"
                      secondary="Scheduled Meetings Only"
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.primary.main }}>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sunday: Closed"
                      secondary="Weekend Rest"
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 1 }}
                >
                  Quick Support
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.primary.main }}>
                      <Headset />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email: support@yourcompany.com"
                      secondary="For Prompt Assistance"
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.primary.main }}>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText
                      primary="Emergency: +1 (555) 123-4567"
                      secondary="Urgent Technical Issues"
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                </List>
              </Box>
            </Box>

            {/* Right-side Contact Form */}
            <GoldCard
              component="form"
              onSubmit={handleSubmit}
              elevation={3}
              sx={{
                width: '100%',
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                // Center the form on mobile
                mx: { xs: 'auto', md: 0 },
              }}
            >
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    placeholder="Enter your full name"
                    sx={{ 
                      '& .MuiInputBase-root': { 
                        borderRadius: 2,
                        height: { xs: '50px', md: '56px' }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                      ...styles.input,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Professional Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    placeholder="Your work email address"
                    sx={{ 
                      '& .MuiInputBase-root': { 
                        borderRadius: 2,
                        height: { xs: '50px', md: '56px' }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                      ...styles.input,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone || 'Optional - for quicker follow-up'}
                    placeholder="Optional phone number"
                    sx={{ 
                      '& .MuiInputBase-root': { 
                        borderRadius: 2,
                        height: { xs: '50px', md: '56px' }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="primary" />
                        </InputAdornment>
                      ),
                      ...styles.input,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Project Details or Inquiry"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    required
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    placeholder="Describe your project needs or questions here..."
                    sx={{ 
                      '& .MuiInputBase-root': { 
                        borderRadius: 2
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                          <ChatBubbleOutline sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                      ...styles.input,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{
                      py: 2,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      borderRadius: 2,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" aria-label="Sending message" />
                    ) : (
                      'Send Inquiry'
                    )}
                  </Button>
                  {errors.form && (
                    <Typography color="error" align="center" role="alert" sx={{ mt: 2 }}>
                      {errors.form}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </GoldCard>
          </Box>

          {/* Additional Sections */}
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
                  fontWeight: 700,
                }}
              >
                Why Reach Out to GLUStack?
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{ mb: SPACING.large, lineHeight: 1.7, fontSize: '1.05rem' }}
              >
                Connecting with us is the first step towards transforming your technology landscape. Whether you're facing complex challenges, seeking innovative solutions, or aiming for strategic growth, our expertise is at your service. By reaching out, you gain access to:
              </Typography>
              <List sx={{ maxWidth: 600, mx: 'auto' }}>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.secondary.main }}>
                    <CheckCircle size={20} strokeWidth={3} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Expert Consultation: Receive tailored advice from seasoned tech professionals."
                    primaryTypographyProps={{ fontWeight: 500, color: 'text.primary' }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.secondary.main }}>
                    <CheckCircle size={20} strokeWidth={3} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Customized Solutions: Discuss your unique needs and explore bespoke technology strategies."
                    primaryTypographyProps={{ fontWeight: 500, color: 'text.primary' }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.secondary.main }}>
                    <CheckCircle size={20} strokeWidth={3} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project Clarity: Gain clear insights into project scope, timelines, and potential outcomes."
                    primaryTypographyProps={{ fontWeight: 500, color: 'text.primary' }}
                  />
                </ListItem>
              </List>
            </Container>
          </PageSection>

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
                  fontWeight: 700,
                }}
              >
                What to Expect After Contacting Us
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{ mb: SPACING.large, lineHeight: 1.7, fontSize: '1.05rem' }}
              >
                We value your time and inquiries. Here’s what you can expect when you reach out to our team:
              </Typography>
              <List sx={{ maxWidth: 600, mx: 'auto', pt: 2 }}>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.primary.main }}>
                    <Typography variant="body2" color="text.primary" fontWeight={600}>
                      1.
                    </Typography>
                  </ListItemIcon>
                  <ListItemText
                    primary="Prompt Acknowledgment: Expect a confirmation within 24 business hours that we've received your inquiry."
                    primaryTypographyProps={{ color: 'text.primary' }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.primary.main }}>
                    <Typography variant="body2" color="text.primary" fontWeight={600}>
                      2.
                    </Typography>
                  </ListItemIcon>
                  <ListItemText
                    primary="Expert Review: Your inquiry will be reviewed by a specialist to understand your needs thoroughly."
                    primaryTypographyProps={{ color: 'text.primary' }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: theme.palette.primary.main }}>
                    <Typography variant="body2" color="text.primary" fontWeight={600}>
                      3.
                    </Typography>
                  </ListItemIcon>
                  <ListItemText
                    primary="Personalized Follow-up: We'll contact you to schedule a consultation or provide a detailed response tailored to your inquiry."
                    primaryTypographyProps={{ color: 'text.primary' }}
                  />
                </ListItem>
              </List>
            </Container>
          </PageSection>
        </Container>
      </ConsistentPageLayout>
    </>
  );
};

export default Contact;
