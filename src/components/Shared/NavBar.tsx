'use client';
import { 
  useState, 
  useCallback, 
  memo, 
  useMemo, 
  useEffect, 
  useDeferredValue,
  FC,
  ReactNode
} from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  m, 
  LazyMotion, 
  domAnimation, 
  AnimatePresence, 
  useMotionValue, 
  useTransform, 
  useScroll, 
  useSpring, 
  useAnimation,
  MotionValue
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
  CircularProgress,
  Tooltip,
  Theme,
  SvgIconProps
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
  Palette 
} from '@mui/icons-material';
import { useThemeContext } from '@/src/theme/ThemeContext';

// ========== Type Definitions ==========
interface NavItem {
  label: string;
  path: string;
  icon: FC<SvgIconProps>;
}

interface ThemeContextProps {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
}

interface BrandLogoProps {
  logoColor: string;
}

// ========== Constants ==========
const QUANTUM_SPRING = { 
  type: 'spring', 
  stiffness: 350,
  damping: 25,
  mass: 0.8,
  restDelta: 0.001
} as const;

const SCROLL_THRESHOLDS = {
  DESKTOP: 92,
  MOBILE: 64,
  LOADING: 0.88
} as const;

const PALETTE = {
  dark: {
    primary: '#0a192f',
    secondary: '#64ffda',
    accent: '#00ff88',
    text: '#ccd6f6'
  }
} as const;

const GRADIENTS = {
  tech: 'linear-gradient(135deg, #00ff88 0%, #00ffee 100%)'
} as const;

const MIXINS = {
  loadingBar: () => ({
    height: '3px',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(0,255,136,0.4)'
  })
} as const;

// ========== Styled Components ==========
const StyledAppBar = styled(m(AppBar))(({ theme }: { theme: Theme }) => ({
  backdropFilter: 'blur(12px)',
  backgroundColor: alpha(theme.palette.primary.dark, 0.98),
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
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

// ========== Components ==========
const BrandLogo = memo(() => {
  const { activeTheme } = useThemeContext();
  const logoColor = useDeferredValue(
    activeTheme === 'cyber' ? PALETTE.dark.accent : PALETTE.dark.secondary
  );
  const controls = useAnimation();

  const handleHover = useCallback(async (state: boolean) => {
    await controls.start({
      rotate: state ? 360 : 0,
      transition: { duration: 0.8, ease: 'easeInOut' }
    });
  }, [controls]);

  return (
    <Link href="/" passHref legacyBehavior>
      <m.a
        onHoverStart={() => handleHover(true)}
        onHoverEnd={() => handleHover(false)}
        style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
      >
        <m.div animate={controls}>
          <Code sx={{ fontSize: '3.2rem', color: logoColor }} />
        </m.div>
        <Typography variant="h1" sx={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '2.8rem',
          fontWeight: 900,
          backgroundImage: GRADIENTS.tech,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          GLUStack
        </Typography>
      </m.a>
    </Link>
  );
});

const NavLink: FC<{ item: NavItem }> = memo(({ item }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleHover = useCallback(async (hoverState: boolean) => {
    setIsHovered(hoverState);
    await controls.start({
      scale: hoverState ? 1.1 : 1,
      transition: { duration: 0.3 }
    });
  }, [controls]);

  return (
    <Tooltip title={item.label} arrow>
      <Link href={item.path} passHref legacyBehavior>
        <m.a
          style={{
            padding: '12px 24px',
            textDecoration: 'none',
            position: 'relative',
            cursor: 'pointer',
          }}
          onHoverStart={() => handleHover(true)}
          onHoverEnd={() => handleHover(false)}
        >
          <Stack direction="row" gap={1.5} alignItems="center">
            <m.div animate={controls}>
              <item.icon sx={{ 
                fontSize: '1.8rem',
                color: pathname === item.path ? PALETTE.dark.accent : theme.palette.text.secondary
              }} />
            </m.div>
            <Typography variant="button" fontWeight="800" sx={{
              color: pathname === item.path ? PALETTE.dark.accent : theme.palette.text.secondary,
              transition: 'color 0.3s ease'
            }}>
              {item.label}
            </Typography>
          </Stack>
          {pathname === item.path && (
            <m.div
              style={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                width: '60%',
                height: '3px',
                background: GRADIENTS.tech,
                transform: 'translateX(-50%)',
              }}
            />
          )}
        </m.a>
      </Link>
    </Tooltip>
  );
});

// ========== Main Component ==========
const NavBar: FC = () => {
  const { activeTheme, setActiveTheme } = useThemeContext();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const progress = useMotionValue(0);
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
                    <NavLink key={item.path} item={item} />
                  ))}
                </Stack>
              )}

              <Tooltip title="Open Control Panel" arrow>
                <IconButton
                  onClick={() => setThemePanelOpen(!themePanelOpen)}
                  sx={{
                    background: alpha(PALETTE.dark.accent, 0.1),
                    '&:hover': { 
                      background: alpha(PALETTE.dark.accent, 0.2),
                    }
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
              background: theme.palette.background.default,
              zIndex: 9998,
              padding: theme.spacing(4),
              borderLeft: `2px solid ${alpha(PALETTE.dark.accent, 0.3)}`,
            }}
          >
            {/* Theme panel content */}
            <Stack spacing={4}>
              <Typography variant="h4" fontWeight="bold" color="textPrimary">
                Theme Settings
              </Typography>
              <Stack spacing={2}>
                <Typography variant="body1" color="textSecondary">
                  Choose your preferred theme:
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    onClick={() => setActiveTheme('light')}
                    sx={{
                      background: activeTheme === 'light' ? alpha(PALETTE.dark.accent, 0.2) : 'transparent',
                      '&:hover': {
                        background: alpha(PALETTE.dark.accent, 0.3),
                      },
                    }}
                  >
                    <Typography variant="body1" color="textPrimary">
                      Light
                    </Typography>
                  </IconButton>
                  <IconButton
                    onClick={() => setActiveTheme('dark')}
                    sx={{
                      background: activeTheme === 'dark' ? alpha(PALETTE.dark.accent, 0.2) : 'transparent',
                      '&:hover': {
                        background: alpha(PALETTE.dark.accent, 0.3),
                      },
                    }}
                  >
                    <Typography variant="body1" color="textPrimary">
                      Dark
                    </Typography>
                  </IconButton>
                  <IconButton
                    onClick={() => setActiveTheme('cyber')}
                    sx={{
                      background: activeTheme === 'cyber' ? alpha(PALETTE.dark.accent, 0.2) : 'transparent',
                      '&:hover': {
                        background: alpha(PALETTE.dark.accent, 0.3),
                      },
                    }}
                  >
                    <Typography variant="body1" color="textPrimary">
                      Cyber
                    </Typography>
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </m.nav>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default memo(NavBar);
