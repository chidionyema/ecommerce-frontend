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
const GLASS_BACKGROUND = 'rgba(10, 26, 47, 0.98)';
const BACKDROP_BLUR = 'blur(24px)';
const BORDER_RADIUS = '16px';
const TRANSITION_TIMING = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Enhanced Animations
const logoShine = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const drawerItemAnimation = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `${GLASS_BACKGROUND} !important`,
  backdropFilter: `${BACKDROP_BLUR} saturate(180%)`,
  borderBottom: `1px solid ${alpha(PLATINUM, 0.15)}`,
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.25)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '96px',
  '&.scrolled': {
    height: '72px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  padding: theme.spacing(1.5, 3),
  borderRadius: BORDER_RADIUS,
  background: `linear-gradient(145deg, ${alpha(DEEP_NAVY, 0.9)} 0%, ${alpha(DEEP_NAVY, 0.95)} 100%)`,
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${alpha(PLATINUM, 0.15)}`,
  transition: 'all 0.4s ease',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.2)',
  willChange: 'transform',

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '6px 6px 16px rgba(0, 0, 0, 0.3)',
    '&:after': { opacity: 0.4 }
  },

  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-200%',
    width: '200%',
    height: '100%',
    background: `linear-gradient(
      90deg,
      transparent 25%,
      ${alpha(PLATINUM, 0.2)} 50%,
      transparent 75%
    )`,
    animation: `${logoShine} 8s infinite linear`,
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: BORDER_RADIUS,
    padding: '2px',
    background: `linear-gradient(45deg, ${GOLD_ACCENT} 0%, ${alpha(PLATINUM, 0.4)} 50%, ${GOLD_ACCENT} 100%)`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    animation: `${float} 6s infinite ${TRANSITION_TIMING}`,
  }
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '2rem !important',
  letterSpacing: '2px',
  fontFamily: "'Bebas Neue', sans-serif",
  background: `linear-gradient(45deg, ${PLATINUM} 30%, ${alpha(GOLD_ACCENT, 0.8)} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  textShadow: `0 2px 8px ${alpha(DEEP_NAVY, 0.3)}`,
  transition: 'all 0.4s ease',
  position: 'relative',
  zIndex: 1,
}));

const StyledNavButton = styled(Button, {
  shouldForwardProp: (prop) => !['active'].includes(prop as string),
})<{ active?: boolean }>(({ theme, active }) => ({
  color: alpha(PLATINUM, active ? 1 : 0.9),
  fontSize: '1.05rem',
  fontWeight: 500,
  letterSpacing: '1px',
  padding: theme.spacing(2, 3),
  borderRadius: BORDER_RADIUS,
  position: 'relative',
  transition: 'all 0.4s ease',
  overflow: 'hidden',
  willChange: 'transform',
  
  '&:before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: GOLD_ACCENT,
    transform: `scaleX(${active ? 1 : 0})`,
    transformOrigin: 'right',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '0',
    height: '0',
    borderRadius: '50%',
    background: alpha(GOLD_ACCENT, 0.1),
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  '&:hover': {
    transform: 'translateY(-2px)',
    '&:before': {
      transform: 'scaleX(1)',
      transformOrigin: 'left'
    },
    '&:after': {
      width: '150%',
      height: '150%',
      opacity: 0.3
    },
    '& .MuiButton-startIcon': {
      animation: `${float} 1.2s ease infinite`
    }
  },
  
  '& .MuiButton-startIcon': {
    color: GOLD_ACCENT,
    transition: 'all 0.4s ease',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
    willChange: 'transform',
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
        <StyledAppBar position="sticky" className={scrolled ? 'scrolled' : ''}>
          <Container maxWidth="xl">
            <Toolbar sx={{ 
              justifyContent: 'space-between', 
              py: 1,
              minHeight: { xs: '64px', md: '96px' },
              transition: 'min-height 0.4s ease'
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
                {navItems.map(({ label, path }, index) => (
                  <ListItem 
                    key={label} 
                    disablePadding
                    sx={{
                      animation: `${drawerItemAnimation} 0.4s ease forwards`,
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0
                    }}
                  >
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