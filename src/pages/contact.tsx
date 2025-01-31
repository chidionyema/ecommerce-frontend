'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  useTheme, Container, Grid, TextField, Button, Typography, useMediaQuery, alpha, CircularProgress, InputAdornment, Box
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Send, AccountCircle, Email, Phone, Description } from '@mui/icons-material';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

// ✅ EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  USER_ID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID!,
};

// ✅ Validation Schema using Zod
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      setSelectedPlan(router.query.plan as string | undefined);
    }
  }, [router.isReady, router.query]);

  const validateField = useCallback((name: keyof FormData, value: string) => {
    try {
      formSchema.pick({ [name]: formSchema.shape[name] }).parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error) {
      console.error('Error:', error);
      setErrors({ form: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{ textAlign: 'center', pb: 4 }}
      >
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 4px 10px ${alpha(theme.palette.primary.dark, 0.2)}`,
          }}
        >
          Let's Connect 🚀
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
          {selectedPlan ? `Interested in our ${selectedPlan} plan? Let's talk!` : 'We’d love to hear from you!'}
        </Typography>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.dark, 0.2)}`,
            background: theme.palette.background.paper,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
            },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Phone (Optional)"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Project Details"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                fullWidth
                multiline
                rows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                  sx={{
                    background: theme.palette.primary.main,
                    '&:hover': {
                      background: theme.palette.primary.dark,
                    },
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.form>
    </Container>
  );
};

export default Contact;
