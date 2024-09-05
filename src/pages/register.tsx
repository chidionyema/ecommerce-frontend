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
  Checkbox
} from '@mui/material';
import { Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notRobotChecked, setNotRobotChecked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useContext(AuthContext); // Access register from AuthContext

  const handleSubmit = async (e: FormEvent) => {
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

    if (credentials.password !== confirmPassword) {
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
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Registration failed. Please try again.');
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
        height: '100vh',
        justifyContent: 'center',
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
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          type="text"
          required
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          variant="outlined"
          fullWidth
          margin="normal"
          aria-label="Username"
        />
        <TextField
          type="email"
          required
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          variant="outlined"
          fullWidth
          margin="normal"
          aria-label="Email"
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          required
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
          aria-label="Register"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={message.includes('successful') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
