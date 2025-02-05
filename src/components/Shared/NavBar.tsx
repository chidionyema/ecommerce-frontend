'use client';

import { useState, useCallback, memo, useMemo, useEffect, useDeferredValue, FC } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  m, 
  LazyMotion, 
  domAnimation, 
  AnimatePresence, 
  useAnimation, 
  useScroll, 
  useTransform, 
  useMotionValue 
} from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Container,
  alpha,
  Stack,
  useTheme,
  useMediaQuery,
  Tooltip,
  Theme,
  SvgIconProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Close, 
  Home, 
  Code, 
  Book, 
  Whatshot, 
  ContactMail, 
  Palette 
} from '@mui/icons-material';
import { useThemeContext } from '@/src/theme/ThemeContext';
import PanelContent from './PanelContent'; 
import ControlPanelTabs from './ControlPanelTabs';

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------
interface NavItem {
  label: string;
  path: string;
  icon: FC<SvgIconProps>;
}

// ---------------------------------------------------------------------------
// Constants & Styled Components
// ---------------------------------------------------------------------------
/**
 * Framer Motion's "quantum spring" for snappy transitions
 */
const QUANTUM_SPRING = {
  type: 'spring',
  stiffness: 350,
  damping: 25,
  mass: 0.8,
  restDelta: 0.001
} as const;

/**
 * Scroll thresholds for toggling 'scrolled' state
 */
const SCROLL_THRESHOLDS = {
  DESKTOP: 92,
  MOBILE: 64
} as const;

/**
 * Palettes & Gradients
 */
const PALETTE = {
  dark: {
    primary: '#0a192f',
    secondary: '#64ffda',
    accent: '#00ff88',
    text: '#ccd6f6'
  },
  light: {
    primary: '#ffffff'
  }
} as const;

const GRADIENTS = {
  /* animated gradient for brand + nav background */
  cosmic: `linear-gradient(270deg,
    #ff00ff,
    #00ffff,
    #00ff88,
    #ff3d7f
  )`,
  /* for loading bar or highlights */
  tech: 'linear-gradient(135deg, #00ff88 0%, #00ffee 100%)',
  cyber: 'linear-gradient(135deg, #ff0099 0%, #ff3d7f 100%)'
} as const;

const MIXINS = {
  loadingBar: () => ({
    height: '3px',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(0,255,136,0.4)'
  })
} as const;

/**
 * Glassy, neon AppBar with an animated cosmic gradient.
 * Note we apply a "mask-image" trick to animate the gradient behind text or shapes if desired.
 */
const StyledAppBar = styled(m(AppBar))(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  backdropFilter: 'blur(14px)', 
  // subtle semi-transparent background
  backgroundColor: alpha(theme.palette.primary.dark, 0.70),
  // neon border at the bottom
  borderBottom: `1px solid ${alpha('#00ff88', 0.4)}`,
  transition: 'background-color 0.3s, border-color 0.3s',
  willChange: 'transform, opacity',
  // fancy under-bar neon lighting
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0%',
    height: '3px',
    background: GRADIENTS.tech,
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&[data-scrolled="true"]::after': {
    left: 0,
    width: '100%',
  },
}));

/**
 * A neon-loading bar at the top, scaling horizontally.
 */
const QuantumLoader = styled(m.div)({
  ...MIXINS.loadingBar(),
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  background: GRADIENTS.tech,
  transformOrigin: 'left',
});

/**
 * Animated Brand Logo
 */
const BrandLogo = memo(() => {
  const { activeTheme } = useThemeContext();
  const logoColor = useDeferredValue(
    activeTheme === 'cyber' ? PALETTE.dark.accent : PALETTE.dark.secondary
  );
  const controls = useAnimation();

  const handleHover = useCallback(
    async (state: boolean) => {
      await controls.start({
        rotate: state ? [0, 360] : [360, 0],
        transition: { duration: 0.8, ease: 'easeInOut' }
      });
    },
    [controls]
  );

  return (
    <Link href="/" passHref legacyBehavior>
      <m.a
        onHoverStart={() => handleHover(true)}
        onHoverEnd={() => handleHover(false)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          textDecoration: 'none'
        }}
      >
        <m.div
          animate={controls}
          style={{
            perspective: '1000px',
          }}
        >
          <Code 
            sx={{ 
              fontSize: '3.2rem', 
              color: logoColor,
              filter: `drop-shadow(0 0 6px ${alpha(logoColor, 0.5)})`
            }} 
          />
        </m.div>
        <Typography 
          variant="h1" 
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '2.6rem',
            fontWeight: 900,
            backgroundImage: GRADIENTS.cosmic,
            backgroundSize: '600% 600%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'cosmicGradient 6s ease infinite',
          }}
        >
          GluStack
        </Typography>
      </m.a>
    </Link>
  );
});

/**
 * Individual Nav Link with premium hover expansions.
 */
const NavLink: FC<{ item: NavItem }> = memo(({ item }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const controls = useAnimation();
  const isActive = pathname === item.path;

  const handleHover = useCallback(
    async (hoverState: boolean) => {
      await controls.start({
        scale: hoverState ? 1.1 : 1,
        transition: { duration: 0.3 }
      });
    },
    [controls]
  );

  return (
    <Tooltip title={item.label} arrow>
      <Link href={item.path} passHref legacyBehavior>
        <m.a
          style={{
            padding: '12px 24px',
            textDecoration: 'none',
            position: 'relative',
            cursor: 'pointer',
            borderRadius: '8px',
          }}
          onHoverStart={() => handleHover(true)}
          onHoverEnd={() => handleHover(false)}
        >
          <Stack direction="row" gap={1.5} alignItems="center">
            <m.div animate={controls}>
              <item.icon 
                sx={{
                  fontSize: '1.8rem',
                  color: isActive ? PALETTE.dark.accent : theme.palette.text.secondary,
                  transition: 'color 0.3s ease'
                }} 
              />
            </m.div>
            <Typography 
              variant="button" 
              fontWeight="800" 
              sx={{
                color: isActive ? PALETTE.dark.accent : theme.palette.text.secondary,
                transition: 'color 0.3s ease'
              }}
            >
              {item.label}
            </Typography>
          </Stack>
          {isActive && (
            <m.div
              layoutId="activeNavLink"
              style={{
                position: 'absolute',
                bottom: -6,
                left: '50%',
                width: '60%',
                height: '3px',
                background: GRADIENTS.cyber,
                transform: 'translateX(-50%)',
                borderRadius: '4px',
                boxShadow: `0 0 6px ${alpha('#ff3d7f', 0.6)}`
              }}
            />
          )}
        </m.a>
      </Link>
    </Tooltip>
  );
});

// ---------------------------------------------------------------------------
// Main NavBar Component with Premium Panel
// ---------------------------------------------------------------------------
const NavBar: FC = () => {
  const { activeTheme, setActiveTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const panelWidth = isMobile ? '100vw' : '800px';

  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Themes'); 
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 100], [0, -20]);
  const scrolled = useTransform(scrollY, (val) => 
    val > (isMobile ? SCROLL_THRESHOLDS.MOBILE : SCROLL_THRESHOLDS.DESKTOP)
  );

  /**
   * Navigation Items
   */
  const navItems = useMemo<NavItem[]>(() => [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Solutions', path: '/solutions', icon: Code },
    { label: 'Resources', path: '/resources', icon: Book },
    { label: 'Pricing', path: '/pricing', icon: Whatshot },
    { label: 'Contact', path: '/contact', icon: ContactMail },
  ], []);

  useEffect(() => {
    return () => {
      yTransform.stop();
      scrolled.stop();
      progress.stop();
    };
  }, [yTransform, scrolled, progress]);

  return (
    <LazyMotion features={domAnimation}>
      <StyledAppBar
        style={{ y: yTransform }}
        data-scrolled={scrolled}
        position="sticky"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={QUANTUM_SPRING}
      >
        {/* Neon Loading Progress */}
        <QuantumLoader style={{ scaleX: progress }} />
        
        <Container maxWidth="xl" component="nav">
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between', 
              py: 1, 
              minHeight: { xs: '72px', md: '88px' } 
            }}
          >
            <BrandLogo />
            <Stack direction="row" gap={4} alignItems="center">
              {/* Desktop Nav Links */}
              {!isMobile && (
                <Stack direction="row" gap={2}>
                  {navItems.map((item) => (
                    <NavLink key={item.path} item={item} />
                  ))}
                </Stack>
              )}
              {/* Control Panel Button */}
              <Tooltip title="Open Control Panel" arrow>
                <IconButton
                  onClick={() => setThemePanelOpen((prev) => !prev)}
                  sx={{
                    background: alpha(PALETTE.dark.accent, 0.1),
                    '&:hover': { background: alpha(PALETTE.dark.accent, 0.2) },
                    boxShadow: `0 0 10px ${alpha(PALETTE.dark.accent, 0.4)}`
                  }}
                >
                  <Palette sx={{ color: PALETTE.dark.accent }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Premium Slide-In Control Panel */}
      <AnimatePresence>
        {themePanelOpen && (
          <m.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={QUANTUM_SPRING}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: panelWidth,
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              // glassy background
              backdropFilter: 'blur(20px)',
              backgroundColor: alpha(theme.palette.background.default, 0.85),
              boxShadow: `-4px 0 16px rgba(0,0,0,0.3)`,
            }}
          >
            {/* Panel Header with Close Button & Tabs */}
            <Box 
              sx={{ 
                p: 2, 
                borderBottom: `1px solid ${alpha(PALETTE.dark.accent, 0.3)}`,
                position: 'relative',
              }}
            >
              <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Orbitron', sans-serif", 
                    color: PALETTE.dark.accent 
                  }}
                >
                  Control Panel
                </Typography>
                <IconButton onClick={() => setThemePanelOpen(false)}>
                  <Close sx={{ color: PALETTE.dark.accent }} />
                </IconButton>
              </Stack>
              <Box sx={{ mt: 1 }}>
                <ControlPanelTabs 
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </Box>
            </Box>

            {/* Scrollable Content Area with Faded Bottom */}
            <Box sx={{ 
              flex: 1, 
              overflowY: 'auto', 
              position: 'relative', 
              p: 2 
            }}>
              <PanelContent
                activeSection={activeSection as any}
                handleThemeSelect={setActiveTheme}
                prefersReducedMotion={prefersReducedMotion}
              />
              {/* Fade overlay at bottom to indicate more content */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40px',
                  pointerEvents: 'none',
                  background: `linear-gradient(to top, ${
                    theme.palette.background.default
                  } 0%, ${alpha(theme.palette.background.default, 0)} 100%)`
                }}
              />
            </Box>

            {/* Panel Footer: Premium Feature Card */}
            <Box 
              sx={{ 
                p: 2, 
                borderTop: `1px solid ${alpha(PALETTE.dark.accent, 0.3)}` 
              }}
            >
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Box 
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: GRADIENTS.cyber,
                    boxShadow: `0 8px 32px ${alpha(PALETTE.dark.accent, 0.2)}`,
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{
                      mb: 1.5,
                      fontFamily: "'Orbitron', sans-serif",
                      color: '#fff',
                    }}
                  >
                    🚀 Pro Feature Unlock
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2.5, 
                      color: alpha('#fff', 0.9), 
                      lineHeight: 1.6 
                    }}
                  >
                    Get access to premium themes, advanced analytics, and priority support.
                  </Typography>
                  <Box 
                    component="button" 
                    onClick={() => window.open('/pro', '_blank')}
                    style={{
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      background: GRADIENTS.cyber,
                      cursor: 'pointer'
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      Upgrade Now →
                    </Typography>
                  </Box>
                </Box>
              </m.div>
            </Box>
          </m.nav>
        )}
      </AnimatePresence>

      {/* Example keyframe for the cosmic gradient if you want the brand text to animate */}
      <style jsx global>{`
        @keyframes cosmicGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </LazyMotion>
  );
};

export default memo(NavBar);
