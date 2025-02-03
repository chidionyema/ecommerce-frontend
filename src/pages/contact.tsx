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
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Send, AccountCircle, Email, Phone, Close } from '@mui/icons-material';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import { sharedCardBackground } from '../utils/sharedStyles';

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
  const [step, setStep] = useState(0);

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
        formData,
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
      <ConsistentPageLayout
        seoTitle="Contact Us - Get in Touch"
        seoDescription="Reach out to our team for inquiries, support, or partnership opportunities."
        seoKeywords="contact, support, inquiry, partnership"
        title="Let's Work Together"
        subtitle="Fill out the form below and we'll get back to you soon."
      >
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
            background: sharedCardBackground(theme),
            boxShadow: `0px 12px 24px rgba(0, 0, 0, 0.4)`,
            mt: 6,
            position: 'relative',
          }}
        >
          <Stack spacing={3}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} />
            {step >= 1 && <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} />}
            {step >= 2 && <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} />}
            {step >= 3 && <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleChange} multiline rows={4} />}
          </Stack>

          <Button type="submit" fullWidth size="large" variant="contained" disabled={loading} sx={{ mt: 8 }}>
            {loading ? <CircularProgress size={24} /> : 'Send Message'}
          </Button>
        </Box>
      </ConsistentPageLayout>
    </>
  );
};

export default Contact;
