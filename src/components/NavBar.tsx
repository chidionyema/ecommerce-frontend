import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  Divider,
  Box,
  Tooltip,
  useMediaQuery,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  AccountCircle,
} from '@mui/icons-material';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'List Products', path: '/add-listing' },
    { label: 'Community', path: '/community' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const DrawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Ritual Works
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ label, path }) => (
          <Link href={path} key={label} passHref>
            <ListItem button component="a">
              <Typography textAlign="center">{label}</Typography>
            </ListItem>
          </Link>
        ))}
        <Divider />
        <ListItem>
          <IconButton onClick={handleThemeToggle} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography variant="body1">
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );

  const customTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#673ab7',
      },
      secondary: {
        main: '#ff5722',
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => router.push('/')}
            >
              Ritual Works
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {navItems.map(({ label, path }) => (
                  <Button
                    key={label}
                    color="inherit"
                    onClick={() => router.push(path)}
                  >
                    {label}
                  </Button>
                ))}
                <Tooltip title="Toggle light/dark mode">
                  <IconButton onClick={handleThemeToggle} color="inherit">
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>
                {isAuthenticated && user ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} color="inherit">
                        <AccountCircle />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    color="inherit"
                    startIcon={<AccountCircle />}
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {DrawerContent}
      </Drawer>
    </ThemeProvider>
  );
};

export default NavBar;
