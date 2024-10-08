import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  useMediaQuery, AppBar, Toolbar, Button, Drawer, List, ListItem, IconButton, Typography, Box, Menu, MenuItem, Divider, Tooltip, Container,
} from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, AccountCircle, Menu as MenuIcon, ShoppingCart } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

// Custom Styled Components for dynamic styles
const StyledButton = (props) => (
  <Button
    sx={{
      textTransform: 'uppercase',
      fontWeight: 'bold',
      transition: 'color 0.3s, background 0.3s',
      '&:hover': {
        color: '#ffffff',
        backgroundColor: '#1976d2',
      },
    }}
    {...props}
  />
);

const NavBar: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/rituals', label: 'Rituals' },
    { path: '/add-listing', label: 'List Products' },
    { path: '/community', label: 'Community' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  // Set username when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setUsername('chid'); // Replace with actual logic to fetch username
    }
  }, [isAuthenticated]);

  // Themes for light and dark mode
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#000' },
      background: { default: '#f5f5f5', paper: '#ffffff' },
      text: { primary: '#000000', secondary: '#1976d2' },
    },
    typography: { fontFamily: 'Roboto, sans-serif' },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#bb86fc' },
      secondary: { main: '#03dac6' },
      background: { default: '#121212', paper: '#1e1e1e' },
      text: { primary: '#ffffff', secondary: '#bb86fc' },
    },
    typography: { fontFamily: 'Roboto, sans-serif' },
  });

  // Toggle light/dark theme
  const handleThemeToggle = () => setDarkMode((prev) => !prev);

  // Logout functionality
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      router.push('/');
    } catch {
      toast.error('Logout failed. Please try again.');
    }
  };

  // Open/close user menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <AppBar position="static" color="inherit">
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              {/* Logo or App Name */}
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, cursor: 'pointer', color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }}
                onClick={() => router.push('/')}
              >
                Ritual Works
              </Typography>

              {/* Navigation Links for Desktop */}
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 3 }}>
                  {navItems.map(({ path, label }) => (
                    <Link href={path} key={path} passHref>
                      <StyledButton color="inherit">{label}</StyledButton>
                    </Link>
                  ))}
                </Box>
              )}

              {/* Right side controls */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Theme Toggle Button */}
                <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                  <IconButton onClick={handleThemeToggle} sx={{ color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }}>
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>

                {/* Show Login/Profile Button based on auth state */}
                {isAuthenticated ? (
                  <>
                    <Typography variant="body1" sx={{ mr: 1, color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }}>
                      Welcome, {username}
                    </Typography>
                    <IconButton onClick={handleMenuOpen} color="inherit">
                      <AccountCircle sx={{ color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Link href="/login" passHref>
                    <StyledButton startIcon={<AccountCircle />}>Login</StyledButton>
                  </Link>
                )}

                {/* Mobile Navigation Menu */}
                <IconButton onClick={() => setMobileNavOpen(true)} sx={{ display: { xs: 'block', sm: 'none' }, color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }}>
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>

          {/* Mobile Drawer */}
          <Drawer anchor="right" open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
            <Box
              sx={{
                width: 250,
                backgroundColor: darkMode ? darkTheme.palette.background.paper : lightTheme.palette.background.paper,
                height: '100%',
              }}
              onClick={() => setMobileNavOpen(false)}
            >
              <List>
                {navItems.map(({ path, label }) => (
                  <Link href={path} key={path} passHref>
                    <ListItem button>
                      <Typography variant="body1" sx={{ color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary }}>{label}</Typography>
                    </ListItem>
                  </Link>
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
