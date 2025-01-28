import { useState } from 'react';
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
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';

const planTitles: Record<string, string> = {
  hourly: '🌟 Priority Hourly Consult',
  project: '🚀 Tailored Project Partnership',
  retainer: '💎 Executive Retainer Program',
  consultation: '🔮 Strategic Vision Session',
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Minimal parallax effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Example submission logic
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('message', formData.message);
      form.append(
        'plan',
        planTitles[router.query.plan as string] || 'General Inquiry',
      );

      const response = await fetch('https://your-worker.your-domain.com', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.join(', ') || 'Submission failed');
      }

      setSuccess(true);
      setTimeout(() => router.push('/thank-you'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getGradient = (angle: number = 45) =>
    `linear-gradient(${angle}deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        background: `radial-gradient(circle at center, 
          ${alpha(theme.palette.background.paper, 0.1)} 0%, 
          ${alpha(theme.palette.background.default, 0.8)} 100%)`,
      }}
    >
      {/* Rotating gradient behind form */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: getGradient(25),
          y,
          opacity: 0.08,
          zIndex: -2,
          rotate: 15,
          scale: 1.2,
        }}
        animate={{ rotate: [15, 25, 15] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Subtle grid pattern + blur */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg,
            ${alpha(theme.palette.common.white, 0.03)} 0px,
            ${alpha(theme.palette.common.white, 0.03)} 1px,
            transparent 1px,
            transparent 10px)`,
          backdropFilter: 'blur(40px)',
          zIndex: -1,
        }}
      />

      <Grid
        container
        spacing={6}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 3,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                lineHeight: 1.2,
                background: getGradient(-45),
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {planTitles[router.query.plan as string] ||
                "Let's Create Something Amazing"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                color: 'text.secondary',
                lineHeight: 1.7,
              }}
            >
              {router.query.plan
                ? `Ready to elevate your project? Share a few details and we'll craft a solution that's uniquely yours.`
                : "Whether you're exploring possibilities or ready to launch, let's start a conversation that matters."}
            </Typography>
          </motion.div>
        </Grid>

        {/* RIGHT COLUMN (FORM) */}
        <Grid item xs={12} md={6}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <motion.div
              style={{
                background: alpha(theme.palette.background.paper, 0.8),
                borderRadius: '24px',
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
              }}
            >
              <Grid container spacing={3}>
                {/* ERROR / SUCCESS */}
                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                )}
                {success && (
                  <Grid item xs={12}>
                    <Alert severity="success">Message sent successfully!</Alert>
                  </Grid>
                )}

                {/* FIELDS */}
                {['name', 'email', 'phone'].map((field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label={`Enter your ${field}`}
                      name={field}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      disabled={loading}
                      sx={{
                        '& .MuiFilledInput-root': {
                          borderRadius: '12px',
                          background: alpha(theme.palette.background.paper, 0.1),
                          '&:hover': {
                            background: alpha(theme.palette.primary.main, 0.1),
                          },
                        },
                      }}
                    />
                  </Grid>
                ))}

                {/* MESSAGE */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    variant="filled"
                    label="Share Your Vision"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    sx={{
                      '& .MuiFilledInput-root': {
                        borderRadius: '12px',
                        background: alpha(
                          theme.palette.background.paper,
                          0.1,
                        ),
                      },
                    }}
                  />
                </Grid>

                {/* SUBMIT */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{ py: 2 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </motion.div>
          </motion.form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
