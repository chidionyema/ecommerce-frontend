// src/pages/register.tsx
import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  Link,
  Grid, // Import Grid component
} from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { useAuth } from '../contexts/AuthContext';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import { getSharedStyles, SPACING } from '../utils/sharedStyles';

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
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const styles = getSharedStyles(theme);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password!== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!captchaToken) {
      setError('Please complete the CAPTCHA');
      return;
    }

    try {
      await register({...formData, captchaToken });
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      // Reset CAPTCHA after submission
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
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
                background: theme.palette.mode === 'light'? 'white': '#28282a',
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
                <Typography variant="body2" color="error" align="center" mb={2}>
                  {error}
                </Typography>
              )}
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}> {/* Wrap TextFields in Grid */}
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

                {/* CAPTCHA with instructions and accessibility link */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    This site is protected by reCAPTCHA and the Google{' '}
                    <Link href="https://policies.google.com/privacy">Privacy Policy</Link> and{' '}
                    <Link href="https://policies.google.com/terms">Terms of Service</Link> apply.
                  </Typography>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={handleCaptchaChange}
                  />
                  <Typography variant="caption" sx={{ mt: 1 }}>
                    If you have difficulty completing the CAPTCHA, you can try the{' '}
                    <Link href="https://www.google.com/recaptcha/api2/demo" target="_blank" rel="noopener">
                      audio challenge
                    </Link>
                  .
                  </Typography>
                </Box>

                {/* Social media login buttons */}
                <Box sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<GoogleIcon />}
                    onClick={() => loginWithProvider('google')}
                    sx={{
                      mb: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Sign up with Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    startIcon={<GitHubIcon />}
                    onClick={() => loginWithProvider('github')}
                    sx={{
                      mb: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Sign up with GitHub
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="info"
                    startIcon={<MicrosoftIcon />}
                    onClick={() => loginWithProvider('microsoft')}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Sign up with Microsoft
                  </Button>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  Sign Up
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <NextLink href="/login" passHref legacyBehavior>
                    <Button
                      component="a"
                      variant="text"
                      color="primary"
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      Already have an account? Sign in
                    </Button>
                  </NextLink>
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