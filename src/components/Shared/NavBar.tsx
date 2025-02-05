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
  Palette,
  Menu
} from '@mui/icons-material';
import { useThemeContext } from '@/src/theme/ThemeContext';
import PanelContent from './PanelContent'; 
import ControlPanelTabs from './ControlPanelTabs';

interface NavItem {
  label: string;
  path: string;
  icon: FC<SvgIconProps>;
}

const QUANTUM_SPRING = {
  type: 'spring',
  stiffness: 350,
  damping: 25,
  mass: 0.8,
  restDelta: 0.001
} as const;

const SCROLL_THRESHOLDS = {
  DESKTOP: 92,
  MOBILE: 64
} as const;

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
  cosmic: `linear-gradient(270deg,
    #ff00ff,
    #00ffff,
    #00ff88,
    #ff3d7f
  )`,
  tech: 'linear-gradient(135deg, #00ff88 0%, #00ffee 100%)',
  cyber: 'linear-gradient(135deg, #ff0099 0%, #ff3d7f 100%)'
} as const;

const StyledAppBar = styled(m(AppBar))(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  backdropFilter: 'blur(14px)',
  backgroundColor: alpha(theme.palette.primary.dark, 0.70),
  borderBottom: `1px solid ${alpha('#00ff88', 0.4)}`,
  transition: 'background-color 0.3s, border-color 0.3s',
  willChange: 'transform, opacity',
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
        <m.div animate={controls} style={{ perspective: '1000px' }}>
          <Code sx={{ 
            fontSize: '3.2rem', 
            color: logoColor,
            filter: `drop-shadow(0 0 6px ${alpha(logoColor, 0.5)})`
          }} />
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

const NavLink: FC<{ item: NavItem; onClick?: () => void }> = memo(({ item, onClick }) => {
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
          onClick={onClick}
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
              <item.icon sx={{
                fontSize: '1.8rem',
                color: isActive ? PALETTE.dark.accent : theme.palette.text.secondary,
                transition: 'color 0.3s ease'
              }} />
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

const NavBar: FC = () => {
  const { activeTheme, setActiveTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const panelWidth = isMobile ? '100vw' : '800px';

  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Themes');
  
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 100], [0, -20]);
  const scrolled = useTransform(scrollY, (val) => 
    val > (isMobile ? SCROLL_THRESHOLDS.MOBILE : SCROLL_THRESHOLDS.DESKTOP)
  );

  const navItems = useMemo<NavItem[]>(() => [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Solutions', path: '/solutions', icon: Code },
    { label: 'Resources', path: '/resources', icon: Book },
    { label: 'Pricing', path: '/pricing', icon: Whatshot },
    { label: 'Contact', path: '/contact', icon: ContactMail },
  ], []);

  const mobileMenuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  };

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
        <Container maxWidth="xl" component="nav">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            py: 1, 
            minHeight: { xs: '72px', md: '88px' } 
          }}>
            <BrandLogo />
            
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                sx={{ ml: 2 }}
              >
                <Menu sx={{ color: PALETTE.dark.accent }} />
              </IconButton>
            )}

            <Stack direction="row" gap={4} alignItems="center">
              {!isMobile && (
                <Stack direction="row" gap={2}>
                  {navItems.map((item) => (
                    <NavLink key={item.path} item={item} />
                  ))}
                </Stack>
              )}
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

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <m.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={QUANTUM_SPRING}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: 320,
              zIndex: 9999,
              backdropFilter: 'blur(20px)',
              backgroundColor: alpha(theme.palette.background.default, 0.95),
              boxShadow: `-4px 0 16px rgba(0,0,0,0.3)`,
              padding: theme.spacing(4),
            }}
          >
            <IconButton
              onClick={() => setIsMobileMenuOpen(false)}
              sx={{ position: 'absolute', right: 16, top: 16 }}
            >
              <Close sx={{ color: PALETTE.dark.accent }} />
            </IconButton>
            
            <Stack spacing={3} mt={8}>
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  item={item} 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </Stack>
          </m.div>
        )}
      </AnimatePresence>

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
              backdropFilter: 'blur(20px)',
              backgroundColor: alpha(theme.palette.background.default, 0.85),
              boxShadow: `-4px 0 16px rgba(0,0,0,0.3)`,
            }}
          >
            <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(PALETTE.dark.accent, 0.3)}` }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", color: PALETTE.dark.accent }}>
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
                />
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', position: 'relative', p: 2 }}>
              <PanelContent
                activeSection={activeSection as any}
                handleThemeSelect={setActiveTheme}
              />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40px',
                pointerEvents: 'none',
                background: `linear-gradient(to top, ${theme.palette.background.default} 0%, ${alpha(theme.palette.background.default, 0)} 100%)`
              }} />
            </Box>

            <Box sx={{ p: 2, borderTop: `1px solid ${alpha(PALETTE.dark.accent, 0.3)}` }}>
              <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: GRADIENTS.cyber,
                  boxShadow: `0 8px 32px ${alpha(PALETTE.dark.accent, 0.2)}`,
                }}>
                  <Typography variant="h5" sx={{ mb: 1.5, fontFamily: "'Orbitron', sans-serif", color: '#fff' }}>
                    🚀 Pro Feature Unlock
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2.5, color: alpha('#fff', 0.9), lineHeight: 1.6 }}>
                    Get access to premium themes, advanced analytics, and priority support.
                  </Typography>
                  <Box component="button" onClick={() => window.open('/pro', '_blank')}
                    style={{
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      background: GRADIENTS.cyber,
                      cursor: 'pointer'
                    }}>
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

      <style jsx global>{`
        @keyframes cosmicGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </LazyMotion>
  );
};

export default memo(NavBar);