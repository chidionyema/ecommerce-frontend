import React, { useState, useCallback, memo, useEffect } from 'react';
import { useRouter } from 'next/router';
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

/* --------------------------------------------------------------------------
 *  Premium Design Tokens
 * -------------------------------------------------------------------------- */
const DEEP_NAVY = '#0A1A2F';
const PLATINUM = '#E5E4E2';
const GOLD_ACCENT = '#C5A46D';
const GLASS_BACKGROUND = 'rgba(10, 26, 47, 0.9)';
const BACKDROP_BLUR = 'blur(24px)';
const BORDER_RADIUS = 24; // Increased for a more dramatic, modern feel

/* --------------------------------------------------------------------------
 *  Keyframe Animations
 * -------------------------------------------------------------------------- */
/** Creates a soft shimmering bar at the top of the AppBar */
const shimmerBar = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const hologramEffect = keyframes`
  0% {
    filter: drop-shadow(0 0 4px ${alpha(GOLD_ACCENT, 0.4)});
  }
  50% {
    filter: drop-shadow(0 0 10px ${alpha(GOLD_ACCENT, 0.7)}) hue-rotate(25deg);
  }
  100% {
    filter: drop-shadow(0 0 4px ${alpha(GOLD_ACCENT, 0.4)});
  }
`;

const drawerItemEntrance = keyframes`
  0% {
    opacity: 0; 
    transform: translateX(30px) rotateY(90deg); 
  }
  100% {
    opacity: 1; 
    transform: translateX(0) rotateY(0); 
  }
`;

const brandGlow = keyframes`
  0% {
    text-shadow: 0 0 4px ${alpha(GOLD_ACCENT, 0.3)};
  }
  50% {
    text-shadow: 0 0 12px ${alpha(GOLD_ACCENT, 0.6)};
  }
  100% {
    text-shadow: 0 0 4px ${alpha(GOLD_ACCENT, 0.3)};
  }
`;

/** A swirling halo effect behind the new brand icon. */
const iconHalo = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
    filter: blur(0) brightness(1);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    filter: blur(2px) brightness(1.25);
  }
  100% {
    transform: scale(1) rotate(0deg);
    filter: blur(0) brightness(1);
  }
`;

/** Promo bar text gradient shimmer on hover */
const promoTextGlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

/** Pulsing ring effect around the CTA button on hover */
const ctaRingPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0px ${alpha(GOLD_ACCENT, 0.6)};
  }
  100% {
    box-shadow: 0 0 0 12px transparent;
  }
`;

/* --------------------------------------------------------------------------
 *  Custom GluStack Icon (inline SVG)
 *  - A geometric, stacked-cube motif in a gold hue
 * -------------------------------------------------------------------------- */
const GluStackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    style={{ display: 'block' }}
  >
    {/* Top cube */}
    <path
      fill={GOLD_ACCENT}
      d="M32 6 L10 18 L32 30 L54 18 Z"
    />
    {/* Middle cube */}
    <path
      fill={alpha(GOLD_ACCENT, 0.9)}
      d="M32 30 L10 18 L10 42 L32 54 L54 42 L54 18 Z"
    />
    {/* Very bottom small shadow or highlight */}
    <path
      fill={alpha(GOLD_ACCENT, 0.6)}
      d="M10 42 L32 54 L32 59 L10 47 Z"
    />
    <path
      fill={alpha(GOLD_ACCENT, 0.8)}
      d="M54 42 L32 54 L32 59 L54 47 Z"
    />
  </svg>
);

/* --------------------------------------------------------------------------
 *  Styled Components
 * -------------------------------------------------------------------------- */

/** Glassy, conic backdrop for the AppBar. */
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `${GLASS_BACKGROUND} !important`,
  backdropFilter: `${BACKDROP_BLUR} saturate(180%)`,
  position: 'sticky',
  borderBottom: `1px solid ${alpha(PLATINUM, 0.15)}`,
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.25)',
  transition: 'all 0.4s ease',
  minHeight: '100px',
  overflow: 'visible',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(
      120deg,
      ${alpha(GOLD_ACCENT, 0.3)} 0%,
      ${alpha(PLATINUM, 0.1)} 50%,
      ${alpha(GOLD_ACCENT, 0.3)} 100%
    )`,
    backgroundSize: '200% 100%',
    animation: `${shimmerBar} 6s linear infinite`,
    zIndex: 3,
  },

  '&.scrolled': {
    minHeight: '70px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    '& $LogoContainer': {
      transform: 'scale(0.9)',
    },
  },
}));

/**
 * 3D container for the brand icon with rotating conic gradient behind it.
 */
const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  padding: theme.spacing(1.5, 2),
  position: 'relative',
  borderRadius: BORDER_RADIUS,
  background: `linear-gradient(
    145deg,
    ${alpha(DEEP_NAVY, 0.85)} 0%,
    ${alpha(DEEP_NAVY, 0.95)} 100%
  )`,
  backdropFilter: BACKDROP_BLUR,
  boxShadow: `4px 4px 12px rgba(0, 0, 0, 0.2)`,
  perspective: 1000,
  transformStyle: 'preserve-3d',
  transition: 'transform 0.4s ease',
  overflow: 'hidden',

  '&:hover': {
    transform: 'translateY(-2px) scale(1.04)',
    boxShadow: '6px 6px 20px rgba(0, 0, 0, 0.35)',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: BORDER_RADIUS,
    background: `conic-gradient(
      ${alpha(GOLD_ACCENT, 0.25)},
      ${alpha(PLATINUM, 0.1)},
      ${alpha(GOLD_ACCENT, 0.25)}
    )`,
    animation: `${rotate} 12s linear infinite`,
    opacity: 0.12,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: BORDER_RADIUS,
    animation: `${hologramEffect} 3.5s infinite`,
    zIndex: 2,
  },
}));
(LogoContainer as any).displayName = 'LogoContainer';

/**
 * “Halo” behind the custom GluStackIcon.
 */
const IconHaloWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,

  '&::before': {
    content: '""',
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: '50%',
    backgroundColor: alpha(GOLD_ACCENT, 0.1),
    zIndex: -1,
    animation: `${iconHalo} 4.5s infinite`,
  },
}));

/**
 * Shimmering brand text with a gentle pulsing glow.
 */
const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.4rem',
  letterSpacing: '5px',
  fontFamily: "'Bebas Neue', sans-serif",
  background: `linear-gradient(
    45deg,
    ${alpha(PLATINUM, 0.85)} 25%,
    ${GOLD_ACCENT} 50%,
    ${PLATINUM} 75%
  )`,
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  transition: 'all 0.4s ease',
  animation: `${brandGlow} 3.5s ease-in-out infinite`,
}));

/**
 * Promo Text with a subtle gradient + glow on hover
 */
const PromoText = styled(Typography)(({ theme }) => ({
  letterSpacing: '1px',
  fontWeight: 500,
  textAlign: 'center',
  fontSize: '0.9rem',
  background: `linear-gradient(
    90deg,
    ${alpha(GOLD_ACCENT, 0.9)} 0%,
    ${alpha(PLATINUM, 0.7)} 50%,
    ${alpha(GOLD_ACCENT, 0.9)} 100%
  )`,
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'background-position 0.3s ease',
  '&:hover': {
    animation: `${promoTextGlow} 3s infinite`,
  },
  // Slight color fallback if gradient doesn't load
  color: GOLD_ACCENT,
}));

/**
 * Main nav items (desktop).
 */
const StyledNavButton = styled(Button, {
  shouldForwardProp: (prop) => !['active'].includes(prop as string),
})<{ active?: boolean }>(({ theme, active }) => ({
  color: alpha(PLATINUM, active ? 1 : 0.9),
  fontSize: '1.15rem',
  fontWeight: 600,
  letterSpacing: '1px',
  padding: theme.spacing(2, 3),
  borderRadius: BORDER_RADIUS,
  position: 'relative',
  transition: 'all 0.4s ease',
  overflow: 'hidden',
  textTransform: 'none',
  backdropFilter: 'blur(4px)',

  '&:hover': {
    transform: 'translateY(-1px)',
    backgroundColor: alpha(DEEP_NAVY, 0.4),
    '&::after': {
      transform: 'scaleX(1)',
    },
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: BORDER_RADIUS,
    background: active ? alpha(GOLD_ACCENT, 0.07) : 'transparent',
    border: `1px solid ${alpha(GOLD_ACCENT, active ? 0.4 : 0.1)}`,
    zIndex: -2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 4,
    left: '50%',
    transform: `translateX(-50%) scaleX(${active ? 1 : 0})`,
    width: '40%',
    height: '2px',
    background: `linear-gradient(
      90deg,
      transparent 0%,
      ${GOLD_ACCENT} 50%,
      transparent 100%
    )`,
    borderRadius: 4,
    transition: 'transform 0.4s ease',
    zIndex: -1,
  },

  '& .MuiButton-startIcon': {
    color: GOLD_ACCENT,
    transition: 'all 0.3s ease',
    transform: `scale(${active ? 1.05 : 1})`,
  },
  '&:hover .MuiButton-startIcon': {
    filter: `drop-shadow(0 2px 4px ${alpha(GOLD_ACCENT, 0.4)})`,
    transform: 'scale(1.1)',
  },
}));

/**
 * The CTA button with a glowing ring effect on hover.
 */
const CTAPremiumButton = styled(Button)(({ theme }) => ({
  color: DEEP_NAVY,
  background: `linear-gradient(to right, ${alpha(GOLD_ACCENT, 1)} 0%, ${alpha(PLATINUM, 0.4)} 100%)`,
  fontWeight: 700,
  textTransform: 'none',
  borderRadius: BORDER_RADIUS,
  padding: theme.spacing(1.5, 3),
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `0 8px 24px ${alpha(GOLD_ACCENT, 0.4)}`,
  transition: 'background 0.3s ease, transform 0.3s ease',
  '&:hover': {
    background: `linear-gradient(to right, ${alpha(GOLD_ACCENT, 0.9)} 0%, ${alpha(PLATINUM, 0.6)} 100%)`,
    transform: 'translateY(-2px)',
    '&::before': {
      animation: `${ctaRingPulse} 1s infinite`,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: BORDER_RADIUS,
    pointerEvents: 'none',
    boxShadow: `0 0 0 0 ${alpha(GOLD_ACCENT, 0.6)}`,
  },
}));

/**
 * Mobile Drawer styling.
 */
const PremiumDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 300,
    background: `${alpha(DEEP_NAVY, 0.98)} !important`,
    backdropFilter: `${BACKDROP_BLUR} saturate(180%)`,
    borderLeft: `1px solid ${alpha(PLATINUM, 0.15)}`,
    boxShadow: `-16px 0 48px ${alpha(DEEP_NAVY, 0.5)}`,
    overflowX: 'hidden',
  },
  '& .MuiListItem-root': {
    animation: `${drawerItemEntrance} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
    transformOrigin: 'right center',
  },
}));

/* --------------------------------------------------------------------------
 *  Memoized Components
 * -------------------------------------------------------------------------- */
const MemoizedNavButton = memo(StyledNavButton);
const MemoizedLogoContainer = memo(LogoContainer);

/* --------------------------------------------------------------------------
 *  Navbar Component
 * -------------------------------------------------------------------------- */
const NavBar: React.FC = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Solutions', path: '/solutions', icon: <CodeIcon /> },
    { label: 'Resources', path: '/resources', icon: <BookIcon /> },
    { label: 'Pricing', path: '/pricing', icon: <LocalAtmIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Pre-fetch routes for snappier navigation
    navItems.forEach(({ path }) => router.prefetch(path));

    return () => window.removeEventListener('scroll', handleScroll);
  }, [router, navItems]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleNavigation = useCallback(
    (path: string) => {
      if (isMobile) setMobileOpen(false);
      document.documentElement.classList.add('page-transition');
      router.push(path).then(() => {
        setTimeout(() => document.documentElement.classList.remove('page-transition'), 300);
      });
    },
    [router, isMobile]
  );

  return (
    <>
      {/* Global page transition styles */}
      <GlobalStyles
        styles={{
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '.page-transition': {
            viewTransitionName: 'root-transition',
            animation: 'fadeIn 300ms ease-out',
          },
          '.page-transition::view-transition-old(root), .page-transition::view-transition-new(root)': {
            animationDuration: '300ms',
          },
        }}
      />

      {/* Top Promo Bar */}
      <AppBar
        sx={{
          backgroundColor: alpha(DEEP_NAVY, 0.85),
          backdropFilter: BACKDROP_BLUR,
          boxShadow: 'none',
          position: 'static',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ minHeight: 36, justifyContent: 'center' }}>
            <PromoText variant="body2">
              Discover next-level AI/ML solutions. Limited-time offer inside.
            </PromoText>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main AppBar */}
      <Slide in={!scrolled} direction="down" appear={false}>
        <StyledAppBar position="sticky" className={scrolled ? 'scrolled' : ''}>
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                justifyContent: 'space-between',
                py: 1.25,
                transition: 'min-height 0.4s ease',
                minHeight: { xs: '68px', md: '100px' },
              }}
            >
              {/* IconHaloWrapper + Brand Text */}
              <MemoizedLogoContainer onClick={() => handleNavigation('/')}>
                <IconHaloWrapper>
                  <GluStackIcon />
                </IconHaloWrapper>
                <LogoText>GLUSTACK</LogoText>
              </MemoizedLogoContainer>

              {/* Desktop Nav */}
              {!isMobile ? (
                <Box display="flex" gap={2}>
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
                  {/* CTA Button */}
                  <CTAPremiumButton onClick={() => alert('Promo CTA clicked!')}>
                    Free Architecture Review
                  </CTAPremiumButton>
                </Box>
              ) : (
                /* Mobile Drawer Toggle */
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: PLATINUM,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: alpha(PLATINUM, 0.1),
                      transform: 'rotate(90deg)',
                    },
                  }}
                >
                  <MenuIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              )}
            </Toolbar>
          </Container>

          {/* Mobile Drawer */}
          <PremiumDrawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            transitionDuration={600}
          >
            <Box p={2}>
              <MemoizedLogoContainer
                onClick={() => handleNavigation('/')}
                sx={{ mb: 2 }}
              >
                <IconHaloWrapper>
                  <GluStackIcon />
                </IconHaloWrapper>
                <LogoText>GLUSTACK</LogoText>
              </MemoizedLogoContainer>

              <Divider
                sx={{
                  my: 1,
                  borderColor: alpha(PLATINUM, 0.1),
                  transition: 'all 0.3s ease',
                }}
              />

              <List>
                {navItems.map(({ label, path }, index) => (
                  <ListItem
                    key={label}
                    disablePadding
                    sx={{
                      animation: `${drawerItemEntrance} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                    }}
                  >
                    <Button
                      fullWidth
                      onClick={() => handleNavigation(path)}
                      sx={{
                        color: alpha(PLATINUM, 0.9),
                        py: 1.5,
                        px: 3,
                        justifyContent: 'flex-start',
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: PLATINUM,
                          background: alpha(PLATINUM, 0.05),
                        },
                      }}
                    >
                      {label}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </PremiumDrawer>
        </StyledAppBar>
      </Slide>
    </>
  );
};

export default React.memo(NavBar);
