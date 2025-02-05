// pages/Contact.tsx
'use client';

import { useState, useCallback } from 'react';
import {
  useTheme,
  TextField,
  Button,
  Box,
  Stack,
  CircularProgress,
  Typography,
  IconButton,
  InputAdornment,
  styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { TechnologyShowcase } from '../components/Home/TechnologyShowcase';
import { WhyChooseUs } from '../components/Common/WhyChooseUs';
import { ServicesGrid } from '../components/Common/ServicesGrid';
import { TestimonialsSection } from '../components/Common/TestimonialsSection';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import { NEUTRAL_BACKGROUND } from '../utils/sharedColors';
import { Visibility, VisibilityOff, Person, Email, Phone, ChatBubbleOutline } from '@mui/icons-material';

// EmailJS configuration
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

// Create a styled container using the Gold Card aesthetic
const GoldFormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  padding: theme.spacing(4),
  borderRadius: 16,
  background: `linear-gradient(45deg, ${NEUTRAL_BACKGROUND} 0%, rgba(255,255,255,0.05) 100%)`,
  boxShadow: `0 4px 12px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.7)'}`,
  backdropFilter: 'blur(18px) saturate(180%)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
}));

const Contact = () => {
  const theme = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = useCallback((name: keyof FormData, value: string) => {
    try {
      const fieldSchema = z.object({ [name]: formSchema.shape[name as keyof FormData] });
      fieldSchema.parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
        {/* Consistent outer container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            mt: 8,
            p: 8,
          }}
        >
          <GoldFormContainer
            component={motion.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.125rem' }}>
              Let's Connect
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'white' }}>
              Ready to discuss your project? Fill out the form below, and we'll be in touch soon to schedule a free consultation.
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
              />
              {step >= 1 && (
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {step >= 2 && (
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {step >= 3 && (
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder="Tell us about your project..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ChatBubbleOutline sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Stack>
            <Button type="submit" fullWidth size="large" variant="contained" disabled={loading} sx={{ mt: 8 }}>
              {loading ? <CircularProgress size={24} /> : 'Send Message'}
            </Button>
          </GoldFormContainer>
        </Box>
        {/* Spacing between the form and the next section */}
        <Box sx={{ mb: 30, mt: 30 }} />
        {/* Other Sections */}
        <TechnologyShowcase />
        <WhyChooseUs />
        <ServicesGrid />
        <TestimonialsSection />
      </ConsistentPageLayout>
    </>
  );
};

export default Contact;
