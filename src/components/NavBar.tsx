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
} from '@mui/icons-material';
import { styled, useTheme, keyframes } from '@mui/material/styles';

// Premium Design Tokens
const DEEP_NAVY = '#0A1A2F';
const PLATINUM = '#E5E4E2';
const GOLD_ACCENT = '#C5A46D';
const GLASS_BACKGROUND = 'rgba(10, 26, 47, 0.95)';
const BACKDROP_BLUR = 'blur(20px)';
const BORDER_RADIUS = '12px';
const TRANSITION_TIMING = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Subtle Animations
const logoShine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `${GLASS_BACKGROUND} !important`,
  backdropFilter: BACKDROP_BLUR,
  borderBottom: `1px solid ${alpha(PLATINUM, 0.1)}`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  padding: theme.spacing(1.5, 2.5),
  borderRadius: BORDER_RADIUS,
  background: alpha(DEEP_NAVY, 0.7),
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${alpha(PLATINUM, 0.1)}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    background: alpha(DEEP_NAVY, 0.8),
    transform: 'translateY(-1px)',
    '&:after': { opacity: 0.3 }
  },
// In the LogoContainer styled component's &:after selector
'&:after': {
  content: '""',
  position: 'absolute',
  top: 0,
  left: '-100%', // Add quotes around the negative value
  width: '200%',
  height: '100%',
  background: `linear-gradient(
    90deg,
    transparent 25%,
    ${alpha(PLATINUM, 0.1)} 50%,
    transparent 75%
  )`,
  animation: `${logoShine} 6s infinite linear`,
  opacity: 0,
  transition: 'opacity 0.3s ease',
}
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.8rem !important',
  letterSpacing: '1.5px',
  fontFamily: "'Avenir Next', sans-serif",
  color: PLATINUM,
  position: 'relative',
  
  '&:before': {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    width: '100%',
    height: '1px',
    background: GOLD_ACCENT,
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  '&:hover:before': {
    transform: 'scaleX(1)',
    transformOrigin: 'left'
  }
}));

const StyledNavButton = styled(Button, {
  shouldForwardProp: (prop) => !['active'].includes(prop as string),
})<{ active?: boolean }>(({ theme, active }) => ({
  color: alpha(PLATINUM, active ? 1 : 0.8),
  fontSize: '1rem',
  fontWeight: 500,
  letterSpacing: '0.8px',
  padding: theme.spacing(1.5, 2.5),
  borderRadius: BORDER_RADIUS,
  position: 'relative',
  transition: 'all 0.3s ease',
  
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% + 16px)',
    height: 'calc(100% + 16px)',
    borderRadius: '16px',
    background: alpha(GOLD_ACCENT, 0.1),
    opacity: active ? 1 : 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover': {
    color: PLATINUM,
    background: alpha(PLATINUM, 0.03),
    '&:before': { opacity: 1 }
  },
  
  '& .MuiButton-startIcon': {
    color: GOLD_ACCENT,
    transition: 'transform 0.3s ease',
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
            <Toolbar sx={{ 
              justifyContent: 'space-between', 
              py: 1,
              minHeight: { xs: '64px', md: '80px' }
            }}>
              <MemoizedLogoContainer onClick={() => handleNavigation('/')}>
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
                  sx={{ 
                    color: PLATINUM, 
                    '&:hover': { 
                      background: alpha(PLATINUM, 0.1),
                      transform: 'rotate(90deg)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <MenuIcon sx={{ fontSize: '2rem' }} />
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
                width: 320,
                background: alpha(DEEP_NAVY, 0.98),
                backdropFilter: BACKDROP_BLUR,
                borderLeft: `1px solid ${alpha(PLATINUM, 0.1)}`,
              },
            }}
          >
            <Box p={2}>
              <MemoizedLogoContainer onClick={() => handleNavigation('/')}>
                <LogoText>GluStack</LogoText>
              </MemoizedLogoContainer>
              <Divider sx={{ 
                my: 2, 
                borderColor: alpha(PLATINUM, 0.1),
                transition: 'all 0.3s ease'
              }} />
              <List>
                {navItems.map(({ label, path }) => (
                  <ListItem key={label} disablePadding>
                    <Link href={path} passHref legacyBehavior>
                      <Button
                        component="a"
                        fullWidth
                        onClick={() => handleNavigation(path)}
                        sx={{
                          color: alpha(PLATINUM, 0.8),
                          py: 1.5,
                          px: 3,
                          justifyContent: 'flex-start',
                          fontSize: '1.1rem',
                          '&:hover': { 
                            color: PLATINUM,
                            background: alpha(PLATINUM, 0.05)
                          },
                          transition: 'all 0.3s ease'
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