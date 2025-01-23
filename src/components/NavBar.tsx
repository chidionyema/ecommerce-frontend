import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Code as CodeIcon,
  Book as BookIcon,
  LocalAtm as LocalAtmIcon,
  ContactMail as ContactMailIcon,
  RocketLaunch as RocketIcon
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';

// Color Constants
const NAVY_BLUE = '#003366';
const GOLD_ACCENT = '#b58900';
const WHITE = '#ffffff';

const StyledAppBar = styled(AppBar)({
  backgroundColor: NAVY_BLUE,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
});

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    opacity: 0.9,
  },
}));

const StyledNavButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  color: WHITE,
  fontSize: '0.95rem',
  fontWeight: 500,
  letterSpacing: '0.3px',
  transition: 'all 0.2s ease',
  position: 'relative',
  '& .MuiButton-startIcon': {
    color: active ? GOLD_ACCENT : WHITE,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: active ? '100%' : '0',
    height: '2px',
    background: GOLD_ACCENT,
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '&::after': {
      width: '100%',
    },
    '& .MuiButton-startIcon': {
      color: GOLD_ACCENT,
    }
  },
}));

const NavBar: React.FC = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Solutions', path: '/solutions', icon: <CodeIcon /> },
    { label: 'Resources', path: '/resources', icon: <BookIcon /> },
    { label: 'Pricing', path: '/pricing', icon: <LocalAtmIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
  ];

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <LogoContainer onClick={() => router.push('/')}>
            <RocketIcon sx={{ color: GOLD_ACCENT, fontSize: '2rem' }} />
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              color: WHITE,
              letterSpacing: '-0.5px'
            }}>
              GluStack
            </Typography>
          </LogoContainer>

          {!isMobile ? (
            <Box display="flex" gap={2}>
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
            <IconButton 
              onClick={() => setMobileOpen(true)}
              sx={{ color: WHITE }}
            >
              <MenuIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: NAVY_BLUE,
            color: WHITE,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <LogoContainer onClick={() => {
            router.push('/');
            setMobileOpen(false);
          }}>
            <RocketIcon sx={{ color: GOLD_ACCENT, fontSize: '1.8rem' }} />
            <Typography variant="h6" sx={{ color: WHITE }}>
              GluStack
            </Typography>
          </LogoContainer>
          
          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          
          <List>
            {navItems.map(({ label, path, icon }) => (
              <Link href={path} key={label} passHref legacyBehavior>
                <ListItem
                  button
                  component="a"
                  sx={{
                    py: 2,
                    borderRadius: '4px',
                    color: router.pathname === path ? GOLD_ACCENT : WHITE,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    {React.cloneElement(icon, { 
                      sx: { color: router.pathname === path ? GOLD_ACCENT : WHITE } 
                    })}
                    <Typography variant="body1">{label}</Typography>
                  </Box>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </StyledAppBar>
  );
};

export default NavBar;