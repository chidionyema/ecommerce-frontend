import { NextPage } from 'next';
import { setUsername, setCookie } from '../utility/sessionManager';
import { APIProxy } from '../utility/apiProxy';
import { useApiCall } from '../hooks/useApiCall';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Alert } from '@mui/lab';

// Create a single instance of APIProxy
const apiProxyInstance = new APIProxy();

const LoginPage: NextPage = () => {
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const loginApi = useApiCall(apiProxyInstance.fetchEndpoint);
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = 'https://api.dev.io:5000/auth/login/google';
  };

  const handleCustomLogin = async (e: FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setMessage('Invalid email format!');
      setSnackbarOpen(true);
      return;
    }

    if (credentials.password.length < 8) {
      setMessage('Password should be at least 8 characters!');
      setSnackbarOpen(true);
      return;
    }

    setMessage('Validation successful. Making API call to login endpoint...');
    setSnackbarOpen(true);

    try {
      const response = await loginApi.call('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (response && response.token) {
        setCookie('auth_tok', response.token as string, 30);
        setUsername(credentials.email);

        setMessage('Login successful! Redirecting to the home page in 3 seconds...');
        setSnackbarOpen(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else if (response && response.error) {
        setMessage(`Error: ${response.error}`);
        setSnackbarOpen(true);
      } else {
        setMessage('Login failed. Please try again.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Login failed. Please try again.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f8f8f8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ margin: '10px 0', color: '#2c3e50' }}>
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleCustomLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          type="email"
          required
          placeholder="Email Address"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          required
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: '#3498db',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '5px',
            margin: '10px 0',
            '&:hover': {
              backgroundColor: '#2980b9',
            },
          }}
        >
          {loginApi.loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </Box>

      <Divider sx={{ width: '80%', margin: '20px 0' }} />

      <Button
        onClick={handleGoogleLogin}
        sx={{
          backgroundColor: '#db4437',
          border: '1px solid #d23f31',
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          width: '80%',
          margin: '10px 0',
          '&:hover': {
            backgroundColor: '#c53929',
          },
        }}
      >
        Login with Google
      </Button>

      <Typography
        component="a"
        href="/register"
        sx={{
          marginTop: '10px',
          color: '#3f51b5',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        Not a member? Register here.
      </Typography>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
