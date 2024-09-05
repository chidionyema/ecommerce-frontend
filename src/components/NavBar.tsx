import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery, Theme } from '@mui/material';
import { Divider, AppBar, Toolbar, Button, Drawer, List, ListItem, IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../context/AuthContext';

const NavBar: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/rituals', label: 'Rituals' },
    { path: '/add-listing', label: 'List Products' },
    { path: '/community', label: 'Community' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#1976d2',
      },
      background: {
        default: '#f5f5f5',
        paper: '#f5f5f5',
      },
      text: {
        primary: '#000000',
        secondary: '#1976d2',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h6: {
        fontWeight: 700,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 700,
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#bb86fc',
      },
      secondary: {
        main: '#03dac6',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#bb86fc',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h6: {
        fontWeight: 700,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 700,
      },
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedInUsername('chid'); // Replace with the actual logic to get the username
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <AppBar
          position="static"
          color="primary"
          sx={{
            backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: matchesSm ? '0 1rem' : '0 2rem',
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Link href="/" passHref>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ cursor: 'pointer', color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }}
                >
                  Ritual Works
                </Typography>
              </Link>
              <Divider orientation="vertical" flexItem sx={{ height: 24, mx: 1, bgcolor: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }} />
              {navItems.map((item, index) => (
                <React.Fragment key={item.path}>
                  <Link href={item.path} passHref>
                    <Button sx={{ color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }}>{item.label}</Button>
                  </Link>
                  {index < navItems.length - 1 && <Divider orientation="vertical" flexItem sx={{ height: 24, mx: 1, bgcolor: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }} />}
                </React.Fragment>
              ))}
            </Box>
            <Divider orientation="vertical" flexItem sx={{ height: 24, mt: 1.7, bgcolor: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                marginLeft: '0.5rem',
                flexGrow: 1,
              }}
            >
              <IconButton color="inherit" onClick={toggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                {darkMode ? <Brightness7Icon sx={{ color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }} /> : <Brightness4Icon sx={{ color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }} />}
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ height: 24, mx: 1, bgcolor: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }} />
              {isAuthenticated ? (
                <>
                  <Typography sx={{ marginLeft: 2, marginRight: 1, color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }}>Welcome, {loggedInUsername}!</Typography>
                  <Button color="inherit" onClick={handleMenuOpen}>
                    Account
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    aria-labelledby="account-menu"
                  >
                    <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href="/login" passHref>
                  <IconButton color="inherit" aria-label="Login">
                    <AccountCircle sx={{ color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }} />
                  </IconButton>
                </Link>
              )}
            </Box>
          </Toolbar>

          <Drawer anchor="right" open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => setMobileNavOpen(false)}
              onKeyDown={() => setMobileNavOpen(false)}
            >
              <List>
                {navItems.map((item) => (
                  <React.Fragment key={item.path}>
                    <Divider orientation="horizontal" flexItem sx={{ bgcolor: 'text.primary' }} />
                    <Link href={item.path} passHref>
                      <ListItem button>
                        <Typography variant="body1">{item.label}</Typography>
                      </ListItem>
                    </Link>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Drawer>
        </AppBar>
        <ToastContainer />
      </motion.div>
    </ThemeProvider>
  );
};

export default NavBar;
