'use client';

import { useState, useCallback, memo, useMemo, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from 'framer-motion';
import type { Theme } from '@mui/material/styles';
import { 
  AppBar, Toolbar, Typography, Box, IconButton, Container,
  alpha, Stack, useTheme, useMediaQuery, CircularProgress,
  Menu, MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Close,
  Home,
  Code,
  Book,
  Whatshot,
  ContactMail,
} from '@mui/icons-material';
import { useThemeContext } from '../../theme/ThemeContext';
import type { ThemeName } from '../../theme/ThemeContext';
import { PALETTE, GRADIENTS, MIXINS, ANIMATIONS, THEME_VARS } from '../../theme/palette';

// Constants
const SCROLL_SETTINGS = {
  THRESHOLD: 100,
  DEBOUNCE: 150,
  LOADING_TIME: 500,
} as const;

// Types
interface NavItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

interface HolographicButtonProps {
  $active: boolean;
  theme?: Theme;
}

// Optimized styled components with memoization
const StyledAppBar = styled(motion(AppBar))(({ theme }) => {
  const baseStyles = {
    backdropFilter: THEME_VARS.backdropBlur,
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s linear',
    willChange: 'transform, opacity',
    backgroundColor: alpha(theme.palette.primary.dark, 0.98),
    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    boxShadow: `0 0 24px ${alpha(theme.palette.primary.main, 0.2)}`,
  };

  const progressBar = {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: '0%',
      height: '2px',
      background: theme.palette.primary.main,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    '&[data-scrolled="true"]::after': {
      left: 0,
      width: '100%',
    },
  };

  return { ...baseStyles, ...progressBar };
});

const LoadingIndicator = styled(motion.div)({
  ...MIXINS.loadingBar(),
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  transformOrigin: 'left',
});

// Optimized Logo component with reduced re-renders
const BrandLogo = memo(() => {
  const { activeTheme } = useThemeContext();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, []);

  const glow = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, ${alpha(
      activeTheme === 'cyber' ? PALETTE.dark.accent : PALETTE.dark.secondary,
      0.3
    )} 0%, transparent 80%)`
  );

  return (
    <Link href="/" passHref>
      <motion.a
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.02 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          borderRadius: THEME_VARS.borderRadius,
          position: 'relative',
        }}
      >
        <motion.div style={{ position: 'absolute', inset: 0, background: glow }} />
        <Code sx={{
          fontSize: '2.5rem',
          color: activeTheme === 'cyber' ? PALETTE.dark.accent : PALETTE.dark.secondary,
          ...MIXINS.cyberIcon(),
        }} />
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '2rem',
            fontWeight: 800,
            ...MIXINS.textGradient(activeTheme === 'cyber' ? 'tech' : 'tech'),
          }}
        >
          GLUStack
        </Typography>
      </motion.a>
    </Link>
  );
});

BrandLogo.displayName = 'BrandLogo';

// Navigation Button with optimized rendering
const NavButton = styled(motion.button)<HolographicButtonProps>(
  ({ theme, $active }) => ({
    ...MIXINS.cyberButton($active),
    ...MIXINS.animatedUnderline(),
    position: 'relative',
    padding: theme.spacing(1.5, 3),
    fontWeight: 700,
    letterSpacing: '1px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: $active ? PALETTE.dark.accent : theme.palette.text.primary,
    transition: 'all 0.3s ease',
    
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
      background: alpha(theme.palette.text.secondary, 0.1),
      boxShadow: 'none',
      color: theme.palette.text.secondary,
    },
    
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  })
);

// Main NavBar Component
const NavBar = () => {
  const { activeTheme, setActiveTheme } = useThemeContext();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingToPath, setNavigatingToPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [themeAnchor, setThemeAnchor] = useState<null | HTMLElement>(null);
  
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();
  
  // Optimized transforms
  const yTransform = useTransform(scrollY, [0, 100], [0, -20]);
  const opacityTransform = useTransform(scrollY, [0, 100], [1, 0.9]);

  // Memoized navigation items
  const navItems = useMemo<NavItem[]>(() => [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Solutions', path: '/solutions', icon: <Code /> },
    { label: 'Resources', path: '/resources', icon: <Book /> },
    { label: 'Pricing', path: '/pricing', icon: <Whatshot /> },
    { label: 'Contact', path: '/contact', icon: <ContactMail /> },
  ], []);

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrolled(scrollY.get() > SCROLL_SETTINGS.THRESHOLD);
      }, SCROLL_SETTINGS.DEBOUNCE);
    };

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => {
      unsubscribe();
      clearTimeout(scrollTimeout.current);
    };
  }, [scrollY]);

  // Navigation handler with loading state
  const handleNavigation = useCallback(async (href: string) => {
    if (pathname === href || isNavigating) return;

    try {
      setIsNavigating(true);
      setNavigatingToPath(href);
      progress.set(0);
      await Promise.all([
        router.push(href),
        new Promise(resolve => setTimeout(resolve, SCROLL_SETTINGS.LOADING_TIME))
      ]);
      progress.set(1);
    } finally {
      setTimeout(() => {
        setIsNavigating(false);
        setNavigatingToPath(null);
        progress.set(0);
      }, SCROLL_SETTINGS.LOADING_TIME / 2);
    }
  }, [router, pathname, isNavigating, progress]);

  // Theme handling
  const handleThemeSelect = useCallback((themeName: ThemeName) => {
    setActiveTheme(themeName);
    setThemeAnchor(null);
  }, [setActiveTheme]);

  // Mobile menu handlers
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <StyledAppBar
        style={{ y: yTransform, opacity: opacityTransform }}
        data-scrolled={scrolled}
        position="sticky"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={ANIMATIONS.springStiff}
      >
        <LoadingIndicator style={{ scaleX: progress }} />
        
        <Container maxWidth="xl" component="nav">
          <Toolbar sx={{
            justifyContent: 'space-between',
            py: 1,
            minHeight: { xs: '64px', md: '80px' },
          }}>
            <BrandLogo />

            <Stack direction="row" spacing={3} alignItems="center">
              {!isMobile && (
                <Stack direction="row" spacing={2}>
                  {navItems.map(item => (
                    <NavButton
                      key={item.path}
                      $active={pathname === item.path}
                      onClick={() => handleNavigation(item.path)}
                      disabled={isNavigating}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isNavigating && navigatingToPath === item.path ? (
                          <CircularProgress size={20} sx={{ color: PALETTE.dark.accent }} />
                        ) : (
                          <motion.div animate={{ rotate: pathname === item.path ? 15 : 0 }}>
                            {item.icon}
                          </motion.div>
                        )}
                        {item.label}
                      </Box>
                    </NavButton>
                  ))}
                </Stack>
              )}

              <IconButton
                onClick={(e) => setThemeAnchor(e.currentTarget)}
                sx={{ ml: 2 }}
              >
                <Typography variant="button">{activeTheme}</Typography>
              </IconButton>

              {isMobile && (
                <IconButton
                  onClick={toggleMenu}
                  sx={{ color: PALETTE.dark.accent }}
                  disabled={isNavigating}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Menu
        anchorEl={themeAnchor}
        open={Boolean(themeAnchor)}
        onClose={() => setThemeAnchor(null)}
      >
        {['light', 'dark', 'tech', 'cyber'].map((theme) => (
          <MenuItem
            key={theme}
            onClick={() => handleThemeSelect(theme as ThemeName)}
          >
            {theme}
          </MenuItem>
        ))}
      </Menu>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(100vw, 400px)',
              background: alpha(theme.palette.background.default, 0.98),
              backdropFilter: 'blur(16px)',
              zIndex: 9998,
              padding: theme.spacing(4),
              borderLeft: `1px solid ${alpha(PALETTE.dark.accent, 0.2)}`,
            }}
          >
            <IconButton
              onClick={toggleMenu}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: PALETTE.dark.accent,
              }}
            >
              <Close fontSize="large" />
            </IconButton>
            <Stack spacing={3} sx={{ mt: 8 }}>
              {navItems.map(item => (
                <NavButton
                  key={item.path}
                  $active={pathname === item.path}
                  onClick={() => {
                    handleNavigation(item.path);
                    toggleMenu();
                  }}
                  disabled={isNavigating}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.icon}
                    {item.label}
                  </Box>
                </NavButton>
              ))}
            </Stack>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(NavBar);