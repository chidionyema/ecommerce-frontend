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
  ButtonProps
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Code as CodeIcon,
  Book as BookIcon,
  LocalAtm as LocalAtmIcon,
  ContactMail as ContactMailIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider, useTheme, styled } from '@mui/material/styles';

// Color Constants
const PRIMARY_MAIN = '#0d1b3a';
const PRIMARY_LIGHT = '#1e88e5';
const ACCENT_COLOR = '#ff758c';

// --- Styled Components ---
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(90deg, ${PRIMARY_MAIN}, ${PRIMARY_MAIN}dd)`,
  color: theme.palette.text.primary,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(1),
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'scale(1.05)',
  },
  '& .logo-text': {
    fontWeight: 900,
    fontSize: '1.8rem',
    background: `linear-gradient(45deg, ${ACCENT_COLOR}, #fff)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-0.5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
}));

const StyledNavButton = styled(Button)<ButtonProps & { active?: boolean }>(
  ({ theme, active }) => ({
    color: '#ffffffdd !important',
    fontSize: '0.95rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    position: 'relative',
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(1),
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      width: active ? '100%' : '0',
      height: '2px',
      background: ACCENT_COLOR,
      transition: 'width 0.3s ease',
    },
    '&:hover': {
      color: '#fff !important',
      '&::after': {
        width: '100%',
      },
    },
  })
);

const NavBar: React.FC = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon sx={{ color: 'inherit' }} /> },
    { label: 'Solutions', path: '/solutions', icon: <CodeIcon sx={{ color: 'inherit' }} /> },
    { label: 'Resources', path: '/resources', icon: <BookIcon sx={{ color: 'inherit' }} /> },
    { label: 'Pricing', path: '/pricing', icon: <LocalAtmIcon sx={{ color: 'inherit' }} /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon sx={{ color: 'inherit' }} /> },
  ];

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: { main: PRIMARY_MAIN },
          secondary: { main: PRIMARY_LIGHT },
        },
        typography: {
          fontFamily: 'Poppins, Arial, sans-serif',
          allVariants: { color: '#fff' },
        },
      })}
    >
      <StyledAppBar position="sticky">
        <Container maxWidth="xl" disableGutters={isMobile}>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <LogoContainer onClick={() => router.push('/')}>
              <Typography variant="h4" className="logo-text">
                GluStack
              </Typography>
            </LogoContainer>

            {!isMobile ? (
              <Box display="flex" gap={4} alignItems="center">
                {navItems.map(({ label, path, icon }) => (
                  <Link href={path} key={label} passHref legacyBehavior>
                    <StyledNavButton
                      component="a"
                      active={router.pathname === path}
                      startIcon={icon}
                    >
                      {label}
                    </StyledNavButton>
                  </Link>
                ))}
              </Box>
            ) : (
              <IconButton onClick={() => setMobileOpen(true)} color="inherit">
                <MenuIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: PRIMARY_MAIN,
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <LogoContainer onClick={() => {
            router.push('/');
            setMobileOpen(false);
          }}>
            <Typography className="logo-text" sx={{ fontSize: '1.5rem' }}>
              GluStack
            </Typography>
          </LogoContainer>
          
          <Divider sx={{ my: 2, borderColor: '#ffffff33' }} />
          
          <List>
            {navItems.map(({ label, path, icon }) => (
              <Link href={path} key={label} passHref legacyBehavior>
                <ListItem
                  button
                  component="a"
                  sx={{
                    py: 2,
                    borderRadius: '8px',
                    '&:hover': {
                      background: '#ffffff11',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    {icon}
                    <Typography variant="body1">{label}</Typography>
                  </Box>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>

      {isNavigating && (
        <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
          <CircularProgress sx={{ color: ACCENT_COLOR }} size={40} />
        </Box>
      )}
    </ThemeProvider>
  );
};

export default NavBar;