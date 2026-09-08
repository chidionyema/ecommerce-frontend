import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import { getSharedStyles, SPACING } from '../utils/sharedStyles';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const styles = getSharedStyles(theme);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
        await login({ username: formData.username, password: formData.password });

      const redirect = router.query.redirect as string;
      if (redirect) {
        router.push(redirect);
      } else {
        router.push('/resources'); // Default redirect after login
      }
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    }
  };

  return (
    <ConsistentPageLayout
      seoTitle="Login"
      seoDescription="Log in to access your account and premium resources."
      title="Welcome Back!"
      subtitle="Log in to your account to access premium resources and manage your subscription."
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
                Sign in
              </Typography>
              {error && (
                <Typography variant="body2" color="error" align="center" mb={2}>
                  {error}
                </Typography>
              )}
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  Sign In
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <NextLink href="/register" passHref legacyBehavior>
                    <Button
                      component="a"
                      variant="text"
                      color="primary"
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      Don't have an account? Sign Up
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

export default LoginPage;