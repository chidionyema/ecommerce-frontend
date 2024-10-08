// pages/Register.tsx

import React, { useState, FormEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Grow,
} from '@mui/material';
import { Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notRobotChecked, setNotRobotChecked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    username: false,
  });
  const router = useRouter();
  const { register } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Reset input errors
    setInputErrors({ email: false, password: false, confirmPassword: false, username: false });

    // Basic validation checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setInputErrors((prev) => ({ ...prev, email: true }));
      setMessage('Invalid email format!');
      setSnackbarOpen(true);
      return;
    }

    if (credentials.username.trim() === '') {
      setInputErrors((prev) => ({ ...prev, username: true }));
      setMessage('Username is required!');
      setSnackbarOpen(true);
      return;
    }

    if (credentials.password.length < 8) {
      setInputErrors((prev) => ({ ...prev, password: true }));
      setMessage('Password should be at least 8 characters!');
      setSnackbarOpen(true);
      return;
    }

    // Validation for non-alphanumeric characters
    const nonAlphanumericRegex = /[^a-zA-Z0-9]/;
    if (!nonAlphanumericRegex.test(credentials.password)) {
      setInputErrors((prev) => ({ ...prev, password: true }));
      setMessage('Password must have at least one non-alphanumeric character!');
      setSnackbarOpen(true);
      return;
    }

    if (credentials.password !== confirmPassword) {
      setInputErrors((prev) => ({ ...prev, confirmPassword: true }));
      setMessage('Passwords do not match!');
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
      await register(credentials.email, credentials.password, credentials.username);
      setMessage('Registration successful! Redirecting to the home page in 3 seconds...');
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error: any) {
      console.error('Error during registration:', error);

      let errorMessage = 'Registration failed. Please try again.';
      // Extract error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grow in={true}>
      <Box
        sx={{
          fontFamily: 'Arial, sans-serif',
          padding: { xs: '10px', sm: '20px' },
          backgroundColor: '#f4f6f8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" sx={{ margin: '10px 0', color: '#2c3e50' }}>
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '80%', md: '50%' },
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            marginTop: '20px',
            '&:hover': {
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <TextField
            type="text"
            required
            placeholder="Username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            error={inputErrors.username}
            helperText={inputErrors.username && 'Username is required'}
            variant="outlined"
            fullWidth
            margin="normal"
            aria-label="Username"
          />
          <TextField
            type="email"
            required
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            error={inputErrors.email}
            helperText={inputErrors.email && 'Invalid email format'}
            variant="outlined"
            fullWidth
            margin="normal"
            aria-label="Email"
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            error={inputErrors.password}
            helperText={
              inputErrors.password &&
              'Password must be at least 8 characters and include at least one non-alphanumeric character'
            }
            variant="outlined"
            fullWidth
            margin="normal"
            aria-label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type={showConfirmPassword ? 'text' : 'password'}
            required
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={inputErrors.confirmPassword}
            helperText={inputErrors.confirmPassword && 'Passwords do not match'}
            variant="outlined"
            fullWidth
            margin="normal"
            aria-label="Confirm Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: '#3498db',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '8px',
              margin: '10px 0',
              boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)',
              '&:hover': {
                backgroundColor: '#2980b9',
                boxShadow: '0 6px 18px rgba(0, 123, 255, 0.3)',
              },
            }}
            aria-label="Register"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </Box>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={message.includes('successful') ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Grow>
  );
};

export default Register;
