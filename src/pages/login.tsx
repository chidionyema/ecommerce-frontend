import { NextPage } from 'next';
import React, { useState, FormEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  CircularProgress,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Alert } from '@mui/material';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const LoginPage: NextPage = () => {
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [notRobotChecked, setNotRobotChecked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext); // Access login from AuthContext

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

    if (!notRobotChecked) {
      setMessage('Please verify you are not a robot!');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      await login(credentials.email, credentials.password);
      setMessage('Login successful! Redirecting to the home page in 3 seconds...');
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Login failed. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        fontFamily: 'Arial, sans-serif',
        padding: { xs: '10px', sm: '20px' },
        backgroundColor: '#f8f8f8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh', // Ensure it takes at least the full height of the viewport
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '80%', md: '50%', lg: '40%' }, // More precise control over widths
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            width: '100%',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxHeight: '90vh', // Ensure it doesn't exceed the viewport height
            overflowY: 'auto', // Allow scrolling if needed
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
            aria-label="Email Address"
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
            aria-label="Password"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={notRobotChecked}
                onChange={(e) => setNotRobotChecked(e.target.checked)}
                name="notRobot"
              />
            }
            label="I am not a robot"
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
            aria-label="Login"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>

        <Divider sx={{ width: '100%', margin: '20px 0' }} />

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
            width: '100%',
            margin: '10px 0',
            '&:hover': {
              backgroundColor: '#c53929',
            },
          }}
          aria-label="Login with Google"
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
          aria-label="Not a member? Register here."
        >
          Not a member? Register here.
        </Typography>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={message.includes('successful') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
