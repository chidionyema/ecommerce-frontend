'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  useTheme,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  alpha,
  CircularProgress,
  Alert,
  InputAdornment,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Code,
  Send,
  AccountCircle,
  Email,
  Phone,
  Description,
  FlashOn,
  WorkspacePremium,
  CorporateFare,
} from '@mui/icons-material';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

// EmailJS Configuration (replace with your actual values)
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  USER_ID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID!,
};

// Plan Type Definitions
type PlanType = 'hourly' | 'project' | 'retainer' | 'consultation';

const PLAN_DETAILS: Record<
  PlanType,
  { title: string; icon: JSX.Element }
> = {
  hourly: {
    title: 'Accelerate Success – On Demand Expertise',
    icon: <FlashOn fontSize="large" />,
  },
  project: {
    title: 'Bespoke Digital Mastery – Crafted for Impact',
    icon: <WorkspacePremium fontSize="large" />,
  },
  retainer: {
    title: 'Your Strategic Advantage – Elite Retainer Program',
    icon: <CorporateFare fontSize="large" />,
  },
  consultation: {
    title: 'Visionary Strategy – Unleash Your Potential',
    icon: <Code fontSize="large" />,
  },
};

// Zod Validation Schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(
      /^$|^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      'Invalid phone number'
    ),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormData, string>> & { form?: string };

// Initial States
const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

// Reusable Form Input Component
interface FormInputProps {
  label: string;
  name: keyof FormData;
  value: string;
  error?: string;
  disabled: boolean;
  icon: JSX.Element;
  multiline?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormInput = ({
  label,
  name,
  value,
  error,
  disabled,
  icon,
  multiline = false,
  onChange
}: FormInputProps) => {
  const theme = useTheme();
  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
          style: { color: theme.palette.text.primary },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
          },
          '& .MuiFormHelperText-root': {
            color: theme.palette.error.main,
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
          },
        }}
      />
    </Grid>
  );
};

// Main Contact Component
const Contact = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isReady, setIsReady] = useState(false);

  // Check if router is ready
  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router.isReady]);

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedPlan = isReady
    ? (router.query.plan as PlanType | undefined)
    : undefined;
  const { title: planTitle, icon: planIcon } = selectedPlan
    ? PLAN_DETAILS[selectedPlan]
    : {
        title: 'Your Inquiry',
        icon: (
          <Code
            fontSize="large"
            sx={{ color: theme.palette.text.primary }}
          />
        ),
      };

  // Field Validation Handler
  const validateField = (name: keyof FormData, value: string) => {
    try {
      formSchema.parse({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((e) => e.path[0] === name);
        setErrors((prev) => ({ ...prev, [name]: fieldError?.message }));
      }
    }
  };

  // Form Change Handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Form Submission Handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    try {
      setLoading(true);
      const validatedData = formSchema.parse(formData);

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          ...validatedData,
          plan: selectedPlan || 'General Inquiry',
        },
        EMAILJS_CONFIG.USER_ID
      );

      setSuccess(true);
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        form: 'Failed to send message. Please try again or contact us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        py: { xs: 8, md: 12 },
        background: theme.palette.background.default,
      }}
    >
      <Grid
        container
        spacing={{ xs: 6, md: 16 }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Left Section - Plan Details */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            aria-labelledby="plan-title"
          >
            <Box
              sx={{
                background: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 4,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: 3,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  mb: { xs: 6, md: 8 },
                }}
              >
                {planIcon}
                <Typography
                  variant="h2"
                  id="plan-title"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  {planTitle}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 6,
                  lineHeight: 1.8,
                }}
              >
                {selectedPlan
                  ? "Every breakthrough starts with a conversation. Let's strategize, refine, and execute a bold vision that propels your business forward."
                  : "Your future success is waiting. Let's craft a digital experience that transforms your business and captivates your audience."}
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        {/* Right Section - Contact Form */}
        <Grid item xs={12} md={6}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            aria-label="Contact form"
          >
            <Box
              sx={{
                background: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 4,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: 3,
                p: 4,
              }}
            >
              <Grid container spacing={4}>
                {/* Form Status Messages */}
                {errors.form && (
                  <Grid item xs={12}>
                    <Alert severity="error" role="alert">
                      {errors.form}
                    </Alert>
                  </Grid>
                )}

                {success && (
                  <Grid item xs={12}>
                    <Alert severity="success" role="status">
                      Message sent! We'll respond within 24 hours.
                    </Alert>
                  </Grid>
                )}

                {/* Form Inputs */}
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  disabled={loading}
                  icon={<AccountCircle sx={{ color: theme.palette.text.primary }} />}
                />

                <FormInput
                  label="Work Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={loading}
                  icon={<Email sx={{ color: theme.palette.text.primary }} />}
                />

                <FormInput
                  label="Phone (Optional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  disabled={loading}
                  icon={<Phone sx={{ color: theme.palette.text.primary }} />}
                />

                <FormInput
                  label="Project Details"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  disabled={loading}
                  icon={<Description sx={{ color: theme.palette.text.primary }} />}
                  multiline
                />

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading || Object.keys(errors).length > 0}
                    sx={{
                      background: theme.palette.primary.main,
                      color: theme.palette.common.white,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      py: 2,
                      '&:disabled': {
                        opacity: 0.7,
                        background: theme.palette.primary.main,
                      },
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.9),
                      },
                    }}
                    aria-live="polite"
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        sx={{ color: theme.palette.common.white }}
                        aria-label="Submitting form"
                      />
                    ) : (
                      <>
                        <Send sx={{ mr: 1 }} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </motion.form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;