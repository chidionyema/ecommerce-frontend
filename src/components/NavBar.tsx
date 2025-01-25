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
  Divider,
  alpha
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

// Premium Color Scheme
const NAVY_BLUE = '#0A2342';
const GOLD_GRADIENT = 'linear-gradient(135deg, #C5A46D 0%, #D4B88E 100%)';
const GLASS_BACKGROUND = 'rgba(10, 35, 66, 0.85)';
const BACKDROP_BLUR = 'blur(10px)';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `${GLASS_BACKGROUND} !important`,
  backdropFilter: BACKDROP_BLUR,
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

interface StyledNavButtonProps {
  active?: boolean;
  component?: React.ElementType;
}

const StyledNavButton = styled(Button, {
  shouldForwardProp: (prop) => !['active'].includes(prop as string),
})<StyledNavButtonProps>(({ theme, active }) => ({
  color: theme.palette.common.white,
  fontSize: '0.95rem',
  fontWeight: 600,
  letterSpacing: '0.3px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  
  '& .MuiButton-startIcon': {
    background: GOLD_GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: active ? '80%' : '0%',
    height: '2px',
    background: GOLD_GRADIENT,
    transition: 'width 0.3s ease',
  },
  
  '&:hover': {
    background: alpha(theme.palette.common.white, 0.05),
    '&::before': {
      width: '100%',
    },
    '& .MuiButton-startIcon': {
      animation: 'iconPulse 1.5s infinite',
    }
  },
  
  '@keyframes iconPulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  }
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
            <RocketIcon sx={{
              fontSize: '2rem',
              background: GOLD_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }} />
            <Typography variant="h5" sx={{ 
              fontWeight: 800,
              background: GOLD_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              GluStack
            </Typography>
          </LogoContainer>

          {!isMobile ? (
            <Box display="flex" gap={1}>
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
              sx={{ color: 'white' }}
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
            width: 300,
            background: GLASS_BACKGROUND,
            backdropFilter: BACKDROP_BLUR,
            borderLeft: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <LogoContainer onClick={() => {
            router.push('/');
            setMobileOpen(false);
          }}>
            <RocketIcon sx={{
              fontSize: '1.8rem',
              background: GOLD_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }} />
            <Typography variant="h6" sx={{ 
              background: GOLD_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
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
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    background: router.pathname === path ? 
                      alpha(theme.palette.common.white, 0.05) : 'transparent',
                    '&:hover': {
                      background: alpha(theme.palette.common.white, 0.08),
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    {React.cloneElement(icon, { 
                      sx: { 
                        background: GOLD_GRADIENT,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      } 
                    })}
                    <Typography variant="body1" sx={{ 
                      color: 'white',
                      fontWeight: 600 
                    }}>
                      {label}
                    </Typography>
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