import React, { useState, useCallback, memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  alpha,
  Slide,
  IconButton,
  Grow,
  GlobalStyles,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Code as CodeIcon,
  Book as BookIcon,
  LocalAtm as LocalAtmIcon,
  ContactMail as ContactMailIcon,
} from '@mui/icons-material';
import { styled, keyframes, useTheme } from '@mui/material/styles';

/* --------------------------------------------------------------------------
 *  Brand Colors & Tokens
 * -------------------------------------------------------------------------- */
const DEEP_NAVY = '#0A1A2F';
const PLATINUM = '#E5E4E2';
const GOLD_ACCENT = '#C5A46D';
const BACKDROP_BLUR = 'blur(24px)';
const BORDER_RADIUS = 24;

/* --------------------------------------------------------------------------
 *  Keyframe Animations
 * -------------------------------------------------------------------------- */
/** Subtle shimmering gradient for the header background. */
const headerGradient = keyframes`
  0% {
    background-position: 0 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

/** Fade + slide in the full-screen mobile nav overlay. */
const overlaySlideIn = keyframes`
  0% {
    opacity: 0; 
    transform: translateX(100%);
  }
  100% {
    opacity: 1; 
    transform: translateX(0);
  }
`;

const overlaySlideOut = keyframes`
  0% {
    opacity: 1; 
    transform: translateX(0);
  }
  100% {
    opacity: 0; 
    transform: translateX(100%);
  }
`;

/* --------------------------------------------------------------------------
 *  Minimal Brand Icon (inline SVG)
 * -------------------------------------------------------------------------- */
const BrandIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    style={{ display: 'block' }}
  >
    {/* A simpler “stacked” shape than before */}
    <path fill={GOLD_ACCENT} d="M32 2 L14 12 L14 32 L32 42 L50 32 L50 12 Z" />
    <path fill={alpha(GOLD_ACCENT, 0.7)} d="M14 32 L32 42 L32 62 L14 52 Z" />
    <path fill={alpha(GOLD_ACCENT, 0.5)} d="M50 32 L32 42 L32 62 L50 52 Z" />
  </svg>
);

/* --------------------------------------------------------------------------
 *  Styled Components
 * -------------------------------------------------------------------------- */
const PremiumAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  background: `linear-gradient(120deg,
    ${alpha(DEEP_NAVY, 0.95)},
    ${alpha(DEEP_NAVY, 0.9)}
  )`,
  backgroundSize: '200% 200%',
  animation: `${headerGradient} 10s ease infinite`,
  backdropFilter: BACKDROP_BLUR,
  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.3)`,
  transition: 'all 0.4s ease',
}));

/** Large brand text with a subtle shimmer. */
const BrandText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: '2rem',
  letterSpacing: '2px',
  fontWeight: 800,
  background: `linear-gradient(45deg, ${alpha(PLATINUM, 0.8)}, ${GOLD_ACCENT})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

/** Desktop Nav button styling. */
const DesktopNavButton = styled(Button)<{ active?: boolean }>(({
  theme, active
}) => ({
  color: active ? PLATINUM : alpha(PLATINUM, 0.8),
  fontWeight: 600,
  letterSpacing: '1px',
  borderRadius: BORDER_RADIUS,
  padding: theme.spacing(1, 2.5),
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(PLATINUM, 0.1),
    color: PLATINUM,
    transform: 'translateY(-1px)',
  },
}));

/** CTA button with a gradient fill. */
const CTAButton = styled(Button)(({ theme }) => ({
  color: DEEP_NAVY,
  background: `linear-gradient(to right, ${GOLD_ACCENT}, ${alpha(PLATINUM, 0.6)})`,
  fontWeight: 700,
  padding: theme.spacing(1.2, 3),
  borderRadius: BORDER_RADIUS,
  textTransform: 'none',
  boxShadow: `0 4px 12px ${alpha(GOLD_ACCENT, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(to right, ${alpha(GOLD_ACCENT, 0.9)}, ${alpha(PLATINUM, 0.7)})`,
    transform: 'translateY(-1px)',
  },
}));

/** Fullscreen overlay for mobile nav. */
const MobileNavOverlay = styled('div')<{ open?: boolean }>(({
  theme, open
}) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: `linear-gradient(120deg, 
    ${alpha(DEEP_NAVY, 0.9)}, 
    ${alpha(DEEP_NAVY, 0.85)}
  )`,
  display: open ? 'flex' : 'none',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
  animation: `${open ? overlaySlideIn : overlaySlideOut} 0.4s forwards`,
}));

/** Mobile nav items in the overlay. */
const MobileNavItem = styled(Button)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 600,
  color: alpha(PLATINUM, 0.9),
  textTransform: 'none',
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    color: PLATINUM,
    background: 'none',
    transform: 'translateY(-2px)',
  },
}));

/* --------------------------------------------------------------------------
 *  NavBar Component
 * -------------------------------------------------------------------------- */
const NavBar: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Solutions', path: '/solutions', icon: <CodeIcon /> },
    { label: 'Resources', path: '/resources', icon: <BookIcon /> },
    { label: 'Pricing', path: '/pricing', icon: <LocalAtmIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
  ];

  useEffect(() => {
    // Track scroll for shrinking header
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    // Pre-fetch routes
    navItems.forEach(({ path }) => router.prefetch(path));
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router, navItems]);

  const handleNavToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (path: string) => {
      setMobileOpen(false);
      document.documentElement.classList.add('page-transition');
      router.push(path).then(() => {
        setTimeout(() => {
          document.documentElement.classList.remove('page-transition');
        }, 300);
      });
    },
    [router]
  );

  return (
    <>
      <GlobalStyles
        styles={{
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '.page-transition': {
            animation: 'fadeIn 300ms ease-out',
          },
        }}
      />

      {/* Main AppBar */}
      <Slide in={!scrolled} direction="down" appear={false}>
        <PremiumAppBar>
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: isMobile ? 'space-between' : 'space-between',
                alignItems: 'center',
                minHeight: isMobile ? 56 : 80,
                transition: 'min-height 0.3s ease',
              }}
            >
              {/* Mobile: Brand & hamburger on the same line, brand centered if you prefer */}
              {isMobile ? (
                <>
                  <IconButton onClick={handleNavToggle} sx={{ color: PLATINUM }}>
                    <MenuIcon />
                  </IconButton>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      flex: 1,
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleNavigate('/')}
                  >
                    <BrandIcon />
                    <BrandText>GLUSTACK</BrandText>
                  </Box>
                </>
              ) : (
                /* Desktop: Brand left, nav items + CTA right */
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      gap: 1.5,
                    }}
                    onClick={() => handleNavigate('/')}
                  >
                    <BrandIcon />
                    <BrandText>GLUSTACK</BrandText>
                  </Box>
                  <Box flex={1} />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {navItems.map(({ label, path, icon }) => (
                      <DesktopNavButton
                        key={label}
                        startIcon={icon}
                        active={router.pathname === path}
                        onClick={() => handleNavigate(path)}
                      >
                        {label}
                      </DesktopNavButton>
                    ))}
                    <CTAButton onClick={() => alert('CTA clicked!')}>
                      Free Architecture Review
                    </CTAButton>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </PremiumAppBar>
      </Slide>

      {/* Fullscreen Mobile Nav Overlay */}
      <MobileNavOverlay open={mobileOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        >
          <IconButton
            onClick={handleNavToggle}
            sx={{
              color: PLATINUM,
              backgroundColor: alpha(PLATINUM, 0.05),
              '&:hover': {
                backgroundColor: alpha(PLATINUM, 0.15),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Mobile Nav Items */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4,
            gap: 3,
          }}
        >
          {navItems.map(({ label, path, icon }) => (
            <MobileNavItem
              key={label}
              onClick={() => handleNavigate(path)}
              startIcon={icon}
            >
              {label}
            </MobileNavItem>
          ))}

          <Button
            variant="contained"
            sx={{
              mt: 3,
              background: `linear-gradient(to right, ${GOLD_ACCENT}, ${alpha(PLATINUM, 0.6)})`,
              color: DEEP_NAVY,
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: BORDER_RADIUS,
              px: 3,
              py: 1.2,
              boxShadow: `0 4px 12px ${alpha(GOLD_ACCENT, 0.3)}`,
              '&:hover': {
                background: `linear-gradient(to right, ${alpha(GOLD_ACCENT, 0.9)}, ${alpha(PLATINUM, 0.7)})`,
              },
            }}
            onClick={() => alert('CTA clicked!')}
          >
            Free Architecture Review
          </Button>
        </Box>
      </MobileNavOverlay>
    </>
  );
};

export default memo(NavBar);
