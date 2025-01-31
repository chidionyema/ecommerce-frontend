'use client';

import { useState, useCallback, memo, useMemo, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Container,
  alpha,
  Stack,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useTransform,
  useScroll,
  useMotionTemplate,
} from 'framer-motion';
import {
  Menu,
  Close,
  Home,
  Code,
  Book,
  Whatshot,
  ContactMail,
} from '@mui/icons-material';

// Performance Constants
const DEBOUNCE_DELAY = 150;
const SCROLL_THRESHOLD = 100;
const LOADING_DURATION = 0.5;

// Cyberpunk Theme Constants
const NEON_ACCENT = '#64FFDA';
const CYBER_GRADIENT = `linear-gradient(135deg, ${NEON_ACCENT} 0%, #4361EE 100%)`;

const MotionAppBar = motion(AppBar);

const CyberAppBar = styled(MotionAppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.dark, 0.98),
  backdropFilter: 'blur(24px)',
  borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
  boxShadow: `0 0 24px ${alpha(theme.palette.secondary.main, 0.1)}`,
  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s linear',
  willChange: 'transform, opacity',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0%',
    height: '2px',
    background: CYBER_GRADIENT,
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  '&[data-scrolled="true"]::after': {
    left: 0,
    width: '100%',
  },
}));

const LoadingBar = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '3px',
  background: CYBER_GRADIENT,
  zIndex: 9999,
  transformOrigin: 'left',
  boxShadow: `0 0 16px ${alpha(NEON_ACCENT, 0.3)}`,
}));

interface HolographicButtonProps {
  $active?: boolean;
}

const HolographicButton = styled(motion.button)<HolographicButtonProps>(
  ({ theme, $active }) => ({
    position: 'relative',
    padding: theme.spacing(1.5, 3),
    fontWeight: 600,
    letterSpacing: '1px',
    background: 'transparent',
    border: 'none',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    cursor: 'pointer',
    color: $active ? NEON_ACCENT : alpha(theme.palette.text.primary, 0.9),
    transition: 'color 0.3s ease',

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
      background: alpha(theme.palette.action.disabled, 0.1),
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: CYBER_GRADIENT,
      opacity: $active ? 0.15 : 0,
      transition: 'opacity 0.3s ease',
    },

    '&:hover::before': {
      opacity: 0.1,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: CYBER_GRADIENT,
      transform: `scaleX(${$active ? 1 : 0})`,
      transformOrigin: 'right',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    },
  })
);

const CyberLogo = memo(() => {
  const theme = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${alpha(
    NEON_ACCENT,
    0.2
  )} 0%, transparent 80%)`;

  return (
    <Link href="/" passHref legacyBehavior>
      <motion.a
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          borderRadius: theme.shape.borderRadius,
          position: 'relative',
        }}
        whileHover="hover"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left);
          mouseY.set(e.clientY - rect.top);
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: glow,
          }}
        />

        <Code
          sx={{
            fontSize: '2.5rem',
            color: NEON_ACCENT,
            filter: 'drop-shadow(0 0 8px rgba(100, 255, 218, 0.5))',
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '2rem',
            fontWeight: 700,
            background: CYBER_GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          GLUStack
        </Typography>
      </motion.a>
    </Link>
  );
});

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [navigatingToPath, setNavigatingToPath] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const progress = useMotionValue(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const [scrolled, setScrolled] = useState(false);

  // Scroll-driven animations
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 100], [0, -20]);
  const opacityTransform = useTransform(scrollY, [0, 100], [1, 0.9]);

  const navItems = useMemo(
    () => [
      { label: 'Home', path: '/', icon: <Home /> },
      { label: 'Solutions', path: '/solutions', icon: <Code /> },
      { label: 'Resources', path: '/resources', icon: <Book /> },
      { label: 'Pricing', path: '/pricing', icon: <Whatshot /> },
      { label: 'Contact', path: '/contact', icon: <ContactMail /> },
    ],
    []
  );

  // Scroll debounce handler
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrolled(y > SCROLL_THRESHOLD);
      }, DEBOUNCE_DELAY);
    });

    return () => {
      unsubscribe();
      clearTimeout(scrollTimeout.current);
    };
  }, [scrollY]);

  // Navigation handler
  const handleNavigation = useCallback(
    async (href: string) => {
      if (pathname === href) return;

      try {
        setNavigatingToPath(href);
        animate(progress, 1, { duration: LOADING_DURATION, ease: 'easeOut' });
        await router.push(href);
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        animate(progress, 0, { duration: LOADING_DURATION * 0.6 }).then(() => {
          setNavigatingToPath(null);
        });
      }
    },
    [router, pathname, progress]
  );

  // Optimized CyberLink component
  const CyberLink = useMemo(
    () =>
      memo(({ item }: { item: (typeof navItems)[number] }) => {
        const isActive = pathname === item.path;
        const isNavigating = navigatingToPath === item.path;

        return (
          <HolographicButton
            $active={isActive}
            onClick={() => handleNavigation(item.path)}
            disabled={isNavigating}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {isNavigating ? (
                <CircularProgress size={20} sx={{ color: NEON_ACCENT }} />
              ) : (
                <motion.div
                  animate={{ rotate: isActive ? 15 : 0 }}
                  transition={{ type: 'spring' }}
                >
                  {item.icon}
                </motion.div>
              )}
              <span>{item.label}</span>
            </Box>
          </HolographicButton>
        );
      }),
    [pathname, navigatingToPath, handleNavigation]
  );

  return (
    <>
      <CyberAppBar
        style={{
          y: yTransform,
          opacity: opacityTransform.get(),
        }}
        data-scrolled={scrolled}
      >
        <LoadingBar style={{ scaleX: progress }} />

        <Container maxWidth="xl" component="nav">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              py: 1,
              minHeight: { xs: '64px', md: '80px' },
              gap: 4,
            }}
          >
            <CyberLogo />

            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'center',
                }}
              >
                {navItems.map((item) => (
                  <CyberLink key={item.path} item={item} />
                ))}
              </Box>
            )}

            {isMobile && (
              <IconButton
                onClick={() => setMenuOpen(!menuOpen)}
                sx={{ color: NEON_ACCENT }}
                aria-label="Open navigation menu"
              >
                <Menu fontSize="large" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </CyberAppBar>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
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
              borderLeft: `1px solid ${alpha(NEON_ACCENT, 0.2)}`,
            }}
            aria-label="Mobile navigation"
          >
            <IconButton
              onClick={() => setMenuOpen(false)}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: NEON_ACCENT,
              }}
              aria-label="Close navigation menu"
            >
              <Close fontSize="large" />
            </IconButton>
            <Stack spacing={3} sx={{ mt: 8 }}>
              {navItems.map((item) => (
                <CyberLink key={item.path} item={item} />
              ))}
            </Stack>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(NavBar);