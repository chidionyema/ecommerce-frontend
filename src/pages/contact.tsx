'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  useTheme, Container, Grid, TextField, Button, Typography, useMediaQuery, 
  alpha, CircularProgress, InputAdornment, Box, Alert, IconButton, Collapse
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Send, AccountCircle, Email, Phone, Description, Close } from '@mui/icons-material';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) setSelectedPlan(router.query.plan as string | undefined);
  }, [router.isReady, router.query]);

  const validateField = useCallback((name: keyof FormData, value: string) => {
    try {
      formSchema.pick({ [name]: formSchema.shape[name] }).parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
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
      setErrors({ form: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 }, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              textAlign: 'center',
              fontWeight: 800,
              background: `linear-gradient(150deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
            }}
          >
            {selectedPlan ? `Get Started with ${selectedPlan}` : "Let's Work Together"}
          </Typography>

          <Typography variant="h6" sx={{ 
            textAlign: 'center', 
            color: 'text.secondary',
            mb: 6,
            px: 2,
            fontSize: isMobile ? '1rem' : '1.25rem'
          }}>
            {selectedPlan ? `Share details about your project to get started with our ${selectedPlan} plan` : 'Fill out the form below and we’ll get back to you within 24 hours'}
          </Typography>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Box sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: alpha(theme.palette.background.paper, 0.9),
            boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.05)}`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
            <Collapse in={!!errors.form}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setErrors(prev => ({ ...prev, form: undefined }))}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 3 }}
              >
                {errors.form}
              </Alert>
            </Collapse>

            <Grid container spacing={3}>
              {['name', 'email', 'phone'].map((field, index) => (
                <Grid item xs={12} md={field === 'phone' ? 12 : 6} key={field}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    error={!!errors[field]}
                    helperText={errors[field]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {field === 'name' ? <AccountCircle /> : 
                           field === 'email' ? <Email /> : <Phone />}
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiFilledInput-root': {
                        borderRadius: 2,
                        background: alpha(theme.palette.background.default, 0.4),
                        '&:hover, &.Mui-focused': {
                          background: alpha(theme.palette.primary.main, 0.05),
                        }
                      }
                    }}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Project Details"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  multiline
                  rows={5}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      borderRadius: 2,
                      background: alpha(theme.palette.background.default, 0.4),
                      '&:hover, &.Mui-focused': {
                        background: alpha(theme.palette.primary.main, 0.05),
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      height: 56,
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      '&:disabled': {
                        background: theme.palette.action.disabledBackground
                      }
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Send sx={{ fontSize: 20 }} />
                        Send Message
                      </Box>
                    )}
                  </Button>
                </motion.div>
              </Grid>
            </Grid>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ marginTop: 16 }}
                >
                  <Alert
                    severity="success"
                    icon={<CheckCircle sx={{ color: 'success.main' }} />}
                    sx={{ 
                      border: `1px solid ${theme.palette.success.main}`,
                      background: alpha(theme.palette.success.main, 0.1)
                    }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        Message sent successfully! 🎉
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        We'll get back to you within 24 hours
                      </Typography>
                    </Box>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </motion.form>
      </Box>
    </Container>
  );
};

export default Contact;