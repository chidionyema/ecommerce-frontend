'use client';
import { useState, useCallback, memo, useMemo, useEffect, useDeferredValue } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { m, LazyMotion, domAnimation, AnimatePresence, useMotionValue, useTransform, useScroll, useSpring, animate } from 'framer-motion';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Container,
  alpha, Stack, useTheme, useMediaQuery, CircularProgress,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, Close, Home, Code, Book, Whatshot, ContactMail, Palette } from '@mui/icons-material';
import { useThemeContext } from '../../theme/ThemeContext';
import { PALETTE, GRADIENTS, MIXINS, ANIMATIONS, THEME_VARS } from '../../theme/palette';

// Constants
const QUANTUM_SPRING = { type: 'spring', stiffness: 400, damping: 25, mass: 0.8 };
const NEON_TRANSITION = { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] };
const SCROLL_THRESHOLDS = {
  DESKTOP: 92,
  MOBILE: 64,
  LOADING: 0.88,
};
const PANEL_SECTIONS = {
  THEMES: 'Themes',
  FEATURES: 'New Features',
  COMMUNITY: 'Join Community',
  RESOURCES: 'Resources',
};

// Styled Components
const StyledAppBar = styled(m(AppBar))(({ theme }) => ({
  backdropFilter: THEME_VARS.backdropBlur,
  backgroundColor: alpha(theme.palette.primary.dark, 0.98),
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.18)}`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0%',
    height: '2px',
    background: GRADIENTS.tech,
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  '&[data-scrolled="true"]::after': {
    left: 0,
    width: '100%',
  },
}));

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

// Brand Logo Component
const BrandLogo = memo(() => {
  const { activeTheme } = useThemeContext();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverScale = useSpring(1, QUANTUM_SPRING);
  const logoColor = useDeferredValue(activeTheme === 'cyber' ? PALETTE.dark.accent : PALETTE.dark.secondary);

  const handleHover = useCallback((state: boolean) => {
    hoverScale.set(state ? 1.08 : 1);
  }, [hoverScale]);

  return (
    <Link href="/" passHref legacyBehavior>
      <m.a
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left);
          mouseY.set(e.clientY - rect.top);
        }}
        onHoverStart={() => handleHover(true)}
        onHoverEnd={() => handleHover(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          position: 'relative',
          scale: hoverScale,
        }}
      >
        <m.div
          style={{
            position: 'absolute',
            inset: -4,
            background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px,
              ${alpha(logoColor, 0.4)} 0%, transparent 80%)`,
            borderRadius: '16px',
          }}
          transition={NEON_TRANSITION}
        />
        <Code sx={{
          fontSize: '2.8rem',
          color: logoColor,
          filter: `drop-shadow(0 0 8px ${alpha(logoColor, 0.4)})`,
        }} />
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '2.4rem',
            fontWeight: 900,
            backgroundImage: GRADIENTS.tech,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: PALETTE.dark.accent,
          }}
        >
          GLUStack
        </Typography>
      </m.a>
    </Link>
  );
});

// Main NavBar Component
const NavBar = () => {
  const { activeTheme, setActiveTheme } = useThemeContext();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [activePanelSection, setActivePanelSection] = useState(PANEL_SECTIONS.THEMES);
  const [isNavigating, setIsNavigating] = useState(false);
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 100], [0, -20]);
  const opacityTransform = useTransform(scrollY, [0, 100], [1, 0.92]);
  const scrolled = useTransform(scrollY, (val) =>
    val > (isMobile ? SCROLL_THRESHOLDS.MOBILE : SCROLL_THRESHOLDS.DESKTOP)
  );

  const navItems = useMemo(() => [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Solutions', path: '/solutions', icon: <Code /> },
    { label: 'Resources', path: '/resources', icon: <Book /> },
    { label: 'Pricing', path: '/pricing', icon: <Whatshot /> },
    { label: 'Contact', path: '/contact', icon: <ContactMail /> },
  ], []);

  useEffect(() => {
    if (!isNavigating) return;

    const animateProgress = async () => {
      await animate(progress, SCROLL_THRESHOLDS.LOADING, {
        duration: 1.5,
        ease: "easeInOut",
      });
    };

    animateProgress();
  }, [isNavigating, progress]);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleNavigationStart = useCallback((href: string) => {
    if (pathname === href || isNavigating) return;
    setIsNavigating(true);
  }, [pathname, isNavigating]);

  const handleThemeSelect = (themeName: string) => {
    setActiveTheme(themeName as any);
    setThemePanelOpen(false);
  };

  // Panel Sub-components
  const PanelSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={NEON_TRANSITION}
    >
      <Typography variant="h4" sx={{
        fontFamily: "'Orbitron', sans-serif",
        color: PALETTE.dark.accent,
        mb: 3,
        textShadow: `0 0 12px ${alpha(PALETTE.dark.accent, 0.4)}`
      }}>
        {title}
      </Typography>
      {children}
    </m.div>
  );

  const CyberButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <m.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Box sx={{
        background: alpha(PALETTE.dark.accent, 0.1),
        borderRadius: '12px',
        p: 2,
        border: `1px solid ${alpha(PALETTE.dark.accent, 0.3)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          background: alpha(PALETTE.dark.accent, 0.15),
          boxShadow: `0 8px 24px ${alpha(PALETTE.dark.accent, 0.2)}`
        }
      }}>
        {children}
      </Box>
    </m.div>
  );

  return (
    <LazyMotion features={domAnimation}>
      <StyledAppBar
        style={{
          y: yTransform,
          opacity: opacityTransform as unknown as number
        }}
        data-scrolled={scrolled}
        position="sticky"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={QUANTUM_SPRING}
      >
        <QuantumLoader style={{ scaleX: progress }} />
        <Container maxWidth="xl" component="nav">
          <Toolbar sx={{
            justifyContent: 'space-between',
            py: 1,
            minHeight: { xs: '72px', md: '88px' },
          }}>
            <BrandLogo />

            <Stack direction="row" gap={4} alignItems="center">
              {!isMobile && (
                <Stack direction="row" gap={2}>
                  {navItems.map((item) => (
                    <Tooltip key={item.path} title={item.label} arrow>
                      <Link href={item.path} passHref legacyBehavior prefetch>
                        <m.a
                          onClick={() => handleNavigationStart(item.path)}
                          style={{
                            padding: '12px 24px',
                            textDecoration: 'none',
                            position: 'relative',
                            cursor: isNavigating ? 'wait' : 'pointer',
                          }}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <m.div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              borderRadius: '12px',
                              background: pathname === item.path
                                ? alpha(PALETTE.dark.accent, 0.15)
                                : 'transparent',
                            }}
                            transition={NEON_TRANSITION}
                          />
                          <Stack direction="row" gap={1} alignItems="center">
                            <m.div
                              animate={{ rotate: pathname === item.path ? [0, 15, 0] : 0 }}
                              transition={{ duration: 1.2, loop: Infinity }}
                            >
                              {isNavigating ? (
                                <CircularProgress size={20} sx={{ color: PALETTE.dark.accent }} />
                              ) : (
                                item.icon
                              )}
                            </m.div>
                            <Typography variant="button" fontWeight="700" color="textPrimary">
                              {item.label}
                            </Typography>
                          </Stack>
                        </m.a>
                      </Link>
                    </Tooltip>
                  ))}
                </Stack>
              )}

              <Tooltip title="Open Control Panel" arrow>
                <IconButton
                  onClick={() => setThemePanelOpen(true)}
                  sx={{
                    background: alpha(PALETTE.dark.accent, 0.1),
                    '&:hover': { background: alpha(PALETTE.dark.accent, 0.2) }
                  }}
                >
                  <Palette sx={{ color: PALETTE.dark.accent }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Enhanced Control Panel */}
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
              width: 'min(100vw, 480px)',
              background: `
                linear-gradient(
                  45deg,
                  ${alpha(theme.palette.background.default, 0.98)} 60%,
                  ${alpha(PALETTE.dark.accent, 0.05)} 100%
                )`,
              backdropFilter: 'blur(24px)',
              zIndex: 9998,
              padding: theme.spacing(4),
              borderLeft: `2px solid ${alpha(PALETTE.dark.accent, 0.3)}`,
              boxShadow: `-16px 0 48px ${alpha(PALETTE.dark.accent, 0.2)}`,
            }}
          >
            <IconButton
              onClick={() => setThemePanelOpen(false)}
              sx={{
                position: 'absolute',
                top: 24,
                right: 24,
                color: PALETTE.dark.accent,
              }}
            >
              <Close fontSize="large" />
            </IconButton>

            <Stack gap={4} sx={{ mt: 8, height: '90vh', overflowY: 'auto' }}>
              {/* Navigation Tabs */}
              <Stack direction="row" gap={1} sx={{ mb: 4 }}>
                {Object.values(PANEL_SECTIONS).map((section) => (
                  <m.div key={section} whileHover={{ y: -2 }}>
                    <Typography
                      onClick={() => setActivePanelSection(section)}
                      sx={{
                        px: 3,
                        py: 1,
                        cursor: 'pointer',
                        borderRadius: '8px',
                        background: activePanelSection === section
                          ? alpha(PALETTE.dark.accent, 0.2)
                          : 'transparent',
                        color: activePanelSection === section
                          ? PALETTE.dark.accent
                          : theme.palette.text.secondary,
                        fontWeight: 700,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: alpha(PALETTE.dark.accent, 0.1),
                        }
                      }}
                    >
                      {section}
                    </Typography>
                  </m.div>
                ))}
              </Stack>

              {/* Theme Section */}
              {activePanelSection === PANEL_SECTIONS.THEMES && (
                <PanelSection title="Visual Themes">
                  <Stack gap={2}>
                    {['light', 'dark', 'tech', 'cyber'].map((theme) => (
                      <CyberButton key={theme} onClick={() => handleThemeSelect(theme)}>
                        <Stack direction="row" gap={2} alignItems="center">
                          <Box sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            background:
                              theme === 'light' ? PALETTE.light.primary :
                              theme === 'dark' ? PALETTE.dark.primary :
                              theme === 'tech' ? GRADIENTS.tech :
                              GRADIENTS.cyber,
                            boxShadow: `0 4px 12px ${alpha(PALETTE.dark.accent, 0.3)}`
                          }} />
                          <Typography variant="h6" textTransform="capitalize">
                            {theme} Mode
                          </Typography>
                        </Stack>
                      </CyberButton>
                    ))}
                  </Stack>
                </PanelSection>
              )}

              {/* Features Section */}
              {activePanelSection === PANEL_SECTIONS.FEATURES && (
                <PanelSection title="Latest Features">
                  <Stack gap={2}>
                    <CyberButton onClick={() => window.open('/features/quantum-editor')}>
                      <Stack gap={1}>
                        <Typography variant="h6" sx={{ color: PALETTE.dark.accent }}>
                          🚀 Quantum Editor
                        </Typography>
                        <Typography variant="body2">
                          Try our new AI-powered code editor with real-time collaboration
                        </Typography>
                      </Stack>
                    </CyberButton>

                    <CyberButton onClick={() => window.open('/features/analytics')}>
                      <Stack gap={1}>
                        <Typography variant="h6" sx={{ color: PALETTE.dark.accent }}>
                          📈 Advanced Analytics
                        </Typography>
                        <Typography variant="body2">
                          Get deep insights into your application's performance
                        </Typography>
                      </Stack>
                    </CyberButton>
                  </Stack>
                </PanelSection>
              )}

              {/* Community Section */}
              {activePanelSection === PANEL_SECTIONS.COMMUNITY && (
                <PanelSection title="Join Our Community">
                  <Stack gap={2}>
                    <CyberButton onClick={() => window.open('https://discord.gg/yourcommunity')}>
                      <Stack direction="row" gap={2} alignItems="center">
                        <Box sx={{
                          width: 40,
                          height: 40,
                          background: `url(/discord-logo.svg) center/contain no-repeat`
                        }} />
                        <Typography variant="h6">
                          Join Discord Server
                        </Typography>
                      </Stack>
                    </CyberButton>

                    <CyberButton onClick={() => window.open('https://github.com/yourorg')}>
                      <Stack direction="row" gap={2} alignItems="center">
                        <Box sx={{
                          width: 40,
                          height: 40,
                          background: `url(/github-logo.svg) center/contain no-repeat`
                        }} />
                        <Typography variant="h6">
                          Contribute on GitHub
                        </Typography>
                      </Stack>
                    </CyberButton>
                  </Stack>
                </PanelSection>
              )}

              {/* Resources Section */}
              {activePanelSection === PANEL_SECTIONS.RESOURCES && (
                <PanelSection title="Learning Resources">
                  <Stack gap={2}>
                    <CyberButton onClick={() => window.open('/docs')}>
                      <Stack gap={1}>
                        <Typography variant="h6" sx={{ color: PALETTE.dark.accent }}>
                          📚 Documentation
                        </Typography>
                        <Typography variant="body2">
                          Deep dive into our API references and guides
                        </Typography>
                      </Stack>
                    </CyberButton>

                    <CyberButton onClick={() => window.open('/tutorials')}>
                      <Stack gap={1}>
                        <Typography variant="h6" sx={{ color: PALETTE.dark.accent }}>
                          🎥 Video Tutorials
                        </Typography>
                        <Typography variant="body2">
                          Master GLUStack with our step-by-step videos
                        </Typography>
                      </Stack>
                    </CyberButton>
                  </Stack>
                </PanelSection>
              )}

              {/* Universal CTA Section */}
              <m.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ ...NEON_TRANSITION, delay: 0.2 }}
              >
                <Box sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: '16px',
                  background: GRADIENTS.cyber,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 32px ${alpha(PALETTE.dark.accent, 0.3)}`
                  }
                }}>
                  <Typography variant="h5" sx={{
                    mb: 2,
                    fontFamily: "'Orbitron', sans-serif",
                    color: '#fff',
                    textShadow: `0 0 12px ${alpha(PALETTE.dark.accent, 0.4)}`
                  }}>
                    Ready to Level Up?
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: alpha('#fff', 0.9) }}>
                    Unlock premium features and priority support with GLUStack Pro
                  </Typography>
                  <CyberButton onClick={() => window.open('/pro')}>
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      Upgrade to Pro →
                    </Typography>
                  </CyberButton>
                </Box>
              </m.div>
            </Stack>
          </m.nav>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default memo(NavBar);