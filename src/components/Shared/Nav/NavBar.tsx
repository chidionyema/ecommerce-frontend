import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Stack,
  useMediaQuery,
  Box,
  alpha,
  styled,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useNavigation } from '../../../contexts/NavigationContext';
import { NAV_ITEMS } from './navItems';
import NavItem from './NavItem';
import { MobileNav } from './MobileNav';
import BrandLogo from './BrandLogo';
import { NavigationProgress } from './NavigationProgress';
import { throttle } from 'lodash';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'transparent' && prop !== 'scrolled',
})<{ transparent?: boolean; scrolled?: boolean }>(({ theme, transparent, scrolled }) => ({
  backgroundColor: transparent
    ? 'transparent'
    : scrolled
    ? alpha(theme.palette.background.paper, 0.98)
    : alpha(theme.palette.background.default, 0.92),
  backdropFilter: transparent ? 'none' : 'blur(24px)',
  boxShadow: scrolled ? `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}` : 'none',
  borderBottom: scrolled ? `1px solid ${alpha(theme.palette.divider, 0.08)}` : 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const NavBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname(); // Use the usePathname hook
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isNavigating } = useNavigation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [navigationPending, setNavigationPending] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setTransparent(pathname === '/' && window.scrollY <= 60);
      setScrolled(window.scrollY > 60);
    }
  }, [pathname]);

  // In Next.js 15, we no longer need router.events
  // Instead, rely on the isNavigating from your NavigationContext
  useEffect(() => {
    setNavigationPending(isNavigating);
  }, [isNavigating]);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (typeof window !== 'undefined') {
          const shouldScroll = window.scrollY > 60;
          setScrolled(shouldScroll);
          setTransparent(!shouldScroll && pathname === '/');
        }
      }, 100),
    [pathname]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        handleScroll.cancel?.();
      };
    }
  }, [handleScroll]);

  const handleOpenMenu = useCallback(() => {
    if (!navigationPending && !isNavigating) setMenuOpen(true);
  }, [navigationPending, isNavigating]);

  const handleCloseMenu = useCallback(() => {
    if (!navigationPending) setMenuOpen(false);
  }, [navigationPending]);

  return (
    <>
      <StyledAppBar position="fixed" elevation={0} transparent={transparent} scrolled={scrolled}>
        <Container maxWidth="xl">
          <Toolbar sx={{
            height: { xs: scrolled ? 64 : 70, md: scrolled ? 70 : 76 },
            justifyContent: 'space-between',
            px: { xs: 2, md: 3 },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <BrandLogo />
            {mounted && !isMobile ? (
              <Stack direction="row" gap={1.5} alignItems="center">
                {NAV_ITEMS.map((item) => (
                  <NavItem key={item.path} {...item} />
                ))}
              </Stack>
            ) : (
              <IconButton
                edge="end"
                onClick={handleOpenMenu}
                disabled={navigationPending || isNavigating}
                sx={{
                  color: theme.palette.text.primary,
                  transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.15) },
                  width: 42,
                  height: 42,
                }}
              >
                {navigationPending || isNavigating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <Menu fontSize="medium" />
                )}
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <NavigationProgress />
      
      <MobileNav
        isOpen={menuOpen}
        onClose={handleCloseMenu}
      />
    </>
  );
};

export default NavBar;