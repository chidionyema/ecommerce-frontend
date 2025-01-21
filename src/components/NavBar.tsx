import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  useMediaQuery,
  Container,
  Drawer,
  List,
  ListItem,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider, useTheme, styled, Theme } from '@mui/material/styles';

// --- Styled Components ---
const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}80, ${theme.palette.primary.main}40)`,
  color: theme.palette.text.primary,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
}));

const StyledToolbar = styled(Toolbar)(({ theme }: { theme: Theme }) => ({
  minHeight: 80,
  padding: theme.spacing(0, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const LogoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  '& img': {
    height: '40px',
    marginRight: theme.spacing(1),
  },
  '& .logo-text': {
    fontWeight: 700,
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
  },
}));

const DesktopNav = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'center',
  margin: '0 auto',
}));

const StyledNavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.9rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  borderBottom: active ? `2px solid ${theme.palette.secondary.main}` : 'none',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledBanner = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.secondary.main}80, ${theme.palette.secondary.main}40)`,
  color: theme.palette.text.primary,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '0.85rem',
  fontWeight: 500,
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    padding: theme.spacing(0.5),
    whiteSpace: 'normal',
  },
}));

const NavBar: React.FC = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
    };

    const handleRouteChangeError = () => {
      setIsNavigating(false);
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Resources', path: '/resources' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#6a11cb' },
          secondary: { main: '#ff758c' },
          text: { primary: '#fff', secondary: '#000' },
        },
        typography: { 
          fontFamily: 'Poppins, Arial, sans-serif',
          allVariants: {
            color: '#fff'
          }
        },
      })}
    >
      <StyledAppBar position="sticky">
        <StyledBanner>
          Get expert insights and personalized strategy with a free consultation.
        </StyledBanner>
        <Container maxWidth="xl" disableGutters={isMobile}>
          <StyledToolbar>
            <LogoContainer onClick={() => router.push('/')}>
              <Typography variant="h4" className="logo-text">
                Gluestack
              </Typography>
            </LogoContainer>
            
            {!isMobile ? (
              <DesktopNav>
                {navItems.map(({ label, path }) => (
                  <Link href={path} key={label} passHref legacyBehavior>
                    <StyledNavButton
                      component="a"
                      active={router.pathname === path}
                      onClick={() => setIsNavigating(true)}
                      disabled={isNavigating}
                    >
                      {label}
                    </StyledNavButton>
                  </Link>
                ))}
              </DesktopNav>
            ) : (
              <Box display="flex" alignItems="center">
                <IconButton onClick={handleDrawerToggle} color="inherit">
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Gluestack
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List sx={{ py: 0 }}>
            {navItems.map(({ label, path }) => (
              <Link href={path} key={label} passHref legacyBehavior>
                <ListItem
                  button
                  component="a"
                  sx={{
                    py: 1.5,
                    justifyContent: 'center',
                    borderLeft: router.pathname === path ? `4px solid ${theme.palette.secondary.main}` : 'none',
                  }}
                >
                  <Typography variant="body2">{label}</Typography>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>

      {isNavigating && (
        <Box
          sx={{
            position: 'fixed',
            top: theme.spacing(2),
            right: theme.spacing(2),
            zIndex: 9999,
          }}
        >
          <CircularProgress color="secondary" size={40} />
        </Box>
      )}
    </ThemeProvider>
  );
};

export default NavBar;