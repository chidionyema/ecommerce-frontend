import React, { useState, useCallback, memo, useEffect } from 'react';
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
  alpha,
  Slide,
  GlobalStyles
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
import { styled, useTheme, keyframes } from '@mui/material/styles';

// Premium Color Scheme
const NAVY_BLUE = '#0A2342';
const GOLD_GRADIENT = 'linear-gradient(135deg, #C5A46D 0%, #D4B88E 100%)';
const GLASS_BACKGROUND = 'rgba(10, 35, 66, 0.98)';
const BACKDROP_BLUR = 'blur(16px)';

// Custom Animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const logoFloat = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% { mask-position: -100%; }
  80% { mask-position: 200%; }
  100% { mask-position: 200%; }
`;

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `${GLASS_BACKGROUND} !important`,
  backdropFilter: BACKDROP_BLUR,
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  boxShadow: '0 16px 60px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  padding: theme.spacing(2, 3),
  borderRadius: '24px',
  background: GLASS_BACKGROUND,
  backdropFilter: BACKDROP_BLUR,
  border: `2px solid ${alpha(theme.palette.common.white, 0.2)}`,
  boxShadow: '0 16px 60px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  
  '&:hover': {
    transform: 'scale(1.05) translateY(-2px) rotateX(1deg) rotateY(2deg)',
    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6)',
    '&:after': {
      opacity: 1,
      maskPosition: '200%'
    },
    '& $LogoIcon': {
      filter: 'drop-shadow(0 0 20px rgba(197, 164, 109, 0.6))',
    }
  },
  '&:active': {
    transform: 'scale(0.98) translateY(0)',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(45deg, 
      ${alpha('#C5A46D', 0.1)} 0%,
      transparent 50%,
      ${alpha('#C5A46D', 0.1)} 100%
    )`,
    opacity: 0.3,
    zIndex: 0,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)',
    mask: 'linear-gradient(-45deg, transparent 25%, black 50%, transparent 75%)',
    maskSize: '300% 300%',
    animation: `${shine} 1.8s ease-out forwards`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  }
}));

const LogoIcon = styled(RocketIcon)(({ theme }) => ({
  fontSize: '4rem !important',
  background: GOLD_GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 0 16px rgba(197, 164, 109, 0.5))',
  animation: `${logoFloat} 4s ease-in-out infinite`,
  transition: 'all 0.4s ease !important',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.8rem !important',
  letterSpacing: '-1.5px',
  fontFamily: "'Bebas Neue', sans-serif",
  background: GOLD_GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
  animation: `${gradientShift} 8s ease infinite`,
  position: 'relative',
  paddingRight: '12px',
  textShadow: '0 2px 8px rgba(197, 164, 109, 0.4)',
  
  '&:after': {
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: '-6px',
    width: '100%',
    height: '3px',
    background: GOLD_GRADIENT,
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 12px rgba(197, 164, 109, 0.3)',
  },
  
  '&:hover:after': {
    transform: 'scaleX(1)',
    transformOrigin: 'left'
  }
}));

const StyledNavButton = styled(Button, {
  shouldForwardProp: (prop) => !['active'].includes(prop as string),
})<{ active?: boolean }>(({ theme, active }) => ({
  color: alpha(theme.palette.common.white, 0.95),
  fontSize: '1.1rem',
  fontWeight: 600,
  letterSpacing: '0.5px',
  padding: theme.spacing(2, 3),
  borderRadius: '14px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: GOLD_GRADIENT,
    opacity: active ? 0.15 : 0,
    transition: 'opacity 0.4s ease',
  },
  
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: active ? '80%' : '0%',
    height: '2px',
    background: GOLD_GRADIENT,
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  '&:hover': {
    background: alpha(theme.palette.common.white, 0.05),
    transform: 'translateY(-2px)',
    
    '&:before': {
      opacity: 0.1,
    },
    
    '&:after': {
      width: '100%',
    }
  },
  
  '& .MuiButton-startIcon': {
    transition: 'transform 0.3s ease',
    background: GOLD_GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
}));

const MemoizedNavButton = memo(StyledNavButton);
const MemoizedLogoContainer = memo(LogoContainer);

const NavBar: React.FC = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    ['/', '/solutions', '/resources', '/pricing', '/contact'].forEach(route => router.prefetch(route));
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Solutions', path: '/solutions', icon: <CodeIcon /> },
    { label: 'Resources', path: '/resources', icon: <BookIcon /> },
    { label: 'Pricing', path: '/pricing', icon: <LocalAtmIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
  ];

  const handleDrawerToggle = useCallback(() => setMobileOpen(prev => !prev), []);
  const handleNavigation = useCallback((path: string) => {
    if (isMobile) setMobileOpen(false);
    document.documentElement.classList.add('page-transition');
    router.push(path).then(() => {
      setTimeout(() => document.documentElement.classList.remove('page-transition'), 300);
    });
  }, [router, isMobile]);

  return (
    <>
      <GlobalStyles
        styles={{
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          },
          '.page-transition': {
            viewTransitionName: 'root-transition',
            animation: 'fadeIn 300ms ease-out',
          },
          '.page-transition::view-transition-old(root), .page-transition::view-transition-new(root)': {
            animationDuration: '300ms'
          }
        }}
      />
      
      <Slide in={!scrolled} direction="down" appear={false}>
        <StyledAppBar position="sticky">
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
              <MemoizedLogoContainer onClick={() => handleNavigation('/')}>
                <LogoIcon />
                <LogoText>GluStack</LogoText>
              </MemoizedLogoContainer>

              {!isMobile ? (
                <Box display="flex" gap={1}>
                  {navItems.map(({ label, path, icon }) => (
                    <MemoizedNavButton
                      key={label}
                      startIcon={icon}
                      active={router.pathname === path}
                      onClick={() => handleNavigation(path)}
                    >
                      {label}
                    </MemoizedNavButton>
                  ))}
                </Box>
              ) : (
                <IconButton 
                  onClick={handleDrawerToggle}
                  sx={{ color: 'white', '&:hover': { background: alpha(theme.palette.common.white, 0.1) } }}
                >
                  <MenuIcon sx={{ fontSize: '2.4rem' }} />
                </IconButton>
              )}
            </Toolbar>
          </Container>

          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            transitionDuration={400}
            sx={{
              '& .MuiDrawer-paper': {
                width: 340,
                background: alpha(NAVY_BLUE, 0.98),
                backdropFilter: BACKDROP_BLUR,
                borderLeft: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              },
            }}
          >
            <Box p={2}>
              <MemoizedLogoContainer onClick={() => handleNavigation('/')}>
                <LogoIcon />
                <LogoText>GluStack</LogoText>
              </MemoizedLogoContainer>
              <Divider sx={{ my: 2, borderColor: alpha(theme.palette.common.white, 0.2) }} />
              <List>
                {navItems.map(({ label, path }) => (
                  <ListItem key={label} disablePadding>
                    <Link href={path} passHref legacyBehavior>
                      <Button
                        component="a"
                        fullWidth
                        onClick={() => handleNavigation(path)}
                        sx={{
                          color: 'white',
                          py: 2,
                          px: 3,
                          justifyContent: 'flex-start',
                          '&:hover': { background: alpha(theme.palette.common.white, 0.05) }
                        }}
                      >
                        {label}
                      </Button>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </StyledAppBar>
      </Slide>
    </>
  );
};

export default React.memo(NavBar);