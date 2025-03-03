// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  Link,
  Grid,
} from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { useAuth } from '../contexts/AuthContext';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import { getSharedStyles, SPACING } from '../utils/sharedStyles';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const RegisterPage: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { register, loginWithProvider } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Get the executeRecaptcha function.
  const { executeRecaptcha } = useGoogleReCaptcha();

  const styles = getSharedStyles(theme);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!executeRecaptcha) {
      setError('Recaptcha not yet available');
      return;
    }

    try {
      // Execute reCAPTCHA v3 with the "register" action.
      const token = await executeRecaptcha('register');
      setCaptchaToken(token);

      if (!token) {
        setError('CAPTCHA verification failed');
        return;
      }

      // Call the register function. If registration fails, it will throw an error.
      await register({ ...formData, captchaToken: token });
      // On successful registration, redirect to login.
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      setCaptchaToken(null);
    }
  };

  return (
    <ConsistentPageLayout
      seoTitle="Register"
      seoDescription="Create a new account to access free and premium resources."
      title="Create a New Account"
      subtitle="Sign up to access our free resources and unlock premium content with a subscription."
    >
      <PageSection>
        <Container maxWidth="xs">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 4,
                background: theme.palette.mode === 'light' ? 'white' : '#28282a',
                borderRadius: 4,
                boxShadow: theme.shadows,
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  ...styles.pageTitle,
                  color: theme.palette.text.primary,
                  mb: SPACING.medium,
                }}
              >
                Sign up
              </Typography>

              {error && (
                <Box
                  sx={{
                    width: '100%',
                    p: 1.5,
                    mb: 2,
                    bgcolor: 'error.light',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'error.main',
                  }}
                >
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                </Box>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Typography variant="caption" sx={{ mt: 1, textAlign: 'center' }}>
                  This site is protected by reCAPTCHA and the Google{' '}
                  <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="https://policies.google.com/terms" target="_blank" rel="noopener">
                    Terms of Service
                  </Link>{' '}
                  apply.
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  Create Account
                </Button>

                <Box sx={{ width: '100%', textAlign: 'center', my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <NextLink href="/login" passHref legacyBehavior>
                      <Link sx={{ fontWeight: 600 }}>Sign in here</Link>
                    </NextLink>
                  </Typography>
                </Box>

                <Box sx={{ width: '100%', position: 'relative', mt: 2 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      width: '100%',
                      height: '1px',
                      bgcolor: 'divider',
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: 'relative',
                      bgcolor: 'background.paper',
                      px: 2,
                      mx: 'auto',
                      width: 'fit-content',
                      color: 'text.secondary',
                    }}
                  >
                    OR CONTINUE WITH
                  </Typography>
                </Box>

                <Box sx={{ width: '100%', mt: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    startIcon={<GoogleIcon />}
                    onClick={() => loginWithProvider('google')}
                    sx={{
                      mb: 2,
                      color: 'text.primary',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'action.active' },
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    startIcon={<GitHubIcon />}
                    onClick={() => loginWithProvider('github')}
                    sx={{
                      mb: 2,
                      color: 'text.primary',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'action.active' },
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    GitHub
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    startIcon={<MicrosoftIcon />}
                    onClick={() => loginWithProvider('microsoft')}
                    sx={{
                      color: 'text.primary',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'action.active' },
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Microsoft
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default RegisterPage;
