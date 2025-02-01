'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  useTheme,
  TextField,
  Button,
  alpha,
  CircularProgress,
  InputAdornment,
  Box,
  Alert,
  IconButton,
  Collapse,
  Stack,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Send, AccountCircle, Email, Phone, Description, Close, CheckCircle } from '@mui/icons-material';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
import PageLayout from '../components/Shared/PageLayout';
import PageHeader from '../components/Shared/PageHeader';

const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  USER_ID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID!,
};

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^$|^[+]?[()0-9\s.-]{7,15}$/, 'Invalid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const Contact = () => {
  const theme = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>();
  const [step, setStep] = useState(0); // Track which fields are visible

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedPlan(params.get('plan') || undefined);
  }, []);

  const validateField = useCallback((name: keyof FormData, value: string) => {
    try {
      formSchema.pick({ [name]: formSchema.shape[name] }).parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);

    // Progressive Form: Reveal the next field when a valid input is detected
    if (name === 'name' && value.length > 1) setStep(1);
    if (name === 'email' && formSchema.shape.email.safeParse(value).success) setStep(2);
    if (name === 'phone' && formSchema.shape.phone.safeParse(value).success) setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setLoading(true);

    try {
      formSchema.parse(formData);
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        { ...formData, plan: selectedPlan || 'General Inquiry' },
        EMAILJS_CONFIG.USER_ID
      );
      setSuccess(true);
      setFormData(INITIAL_FORM_DATA);
      setStep(0);
    } catch (error) {
      setErrors({ form: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch"
        description="Reach out to our team for inquiries, support, or partnership opportunities."
        keywords="contact, support, inquiry, partnership"
      />
      <PageLayout>
        <PageHeader title={selectedPlan ? `Get Started with ${selectedPlan}` : "Let's Work Together"} />

        <Box
          component={motion.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            maxWidth: 500,
            mx: 'auto',
            p: 4,
            borderRadius: 6,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 1)})`,
            boxShadow: `0px 12px 24px ${alpha(theme.palette.primary.dark, 0.1)}`,
            mt: 6,
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          <Collapse in={!!errors.form}>
            <Alert
              severity="error"
              action={
                <IconButton onClick={() => setErrors(prev => ({ ...prev, form: '' }))}>
                  <Close />
                </IconButton>
              }
              sx={{ mb: 3 }}
            >
              {errors.form}
            </Alert>
          </Collapse>

          <Stack spacing={3}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>

            {step >= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  multiline
                  rows={4}
                />
              </motion.div>
            )}
          </Stack>

          <Button type="submit" fullWidth size="large" variant="contained" disabled={loading} startIcon={loading ? <CircularProgress size={24} /> : <Send />} sx={{ mt: 4, borderRadius: '50px' }}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
      </PageLayout>
    </>
  );
};

export default Contact;
