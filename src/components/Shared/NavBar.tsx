'use client';
import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  AppBar, Toolbar, Typography, IconButton, Container, Stack, useMediaQuery, 
  Box, Divider, Drawer, Fade, LinearProgress, CircularProgress,
  Skeleton, Paper, alpha, styled, useTheme
} from '@mui/material';
import { Menu, Close, Home, Book, Paid, Email, ArrowForwardIos } from '@mui/icons-material';
import { Cpu } from 'lucide-react';
import type { SvgIconComponent } from '@mui/icons-material';
import type { AppBarProps } from '@mui/material/AppBar';

interface NavItemType {
  label: string;
  path: string;
  icon: SvgIconComponent;
}

interface StyledAppBarProps extends AppBarProps {
  transparent?: boolean;
  scrolled?: boolean;
}

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

interface GetStartedButtonProps {
  isMobile: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const NAV_ITEMS: NavItemType[] = [
  { label: 'Solutions', path: '/solutions', icon: Home },
  { label: 'Resources', path: '/resources', icon: Book },
  { label: 'Pricing', path: '/pricing', icon: Paid },
  { label: 'Contact', path: '/contact', icon: Email },
];

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'transparent' && prop !== 'scrolled'
})<StyledAppBarProps>(({ theme, transparent, scrolled }) => ({
  backgroundColor: transparent 
    ? 'transparent' 
    : scrolled ? theme.palette.background.paper : alpha(theme.palette.background.default, 0.85),
  backdropFilter: transparent ? 'none' : 'blur(20px)',
  boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
  borderBottom: scrolled ? 'none' : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const StyledProgressBar = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 3,
  zIndex: 2000,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const BrandLogo = memo(() => {
  const theme = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
      setTimeout(() => setIsLoaded(true), 50);
    }, 30);
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoaded) {
    return (
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Skeleton variant="circular" width={42} height={42} 
          sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }} />
        <Skeleton variant="text" width={120} height={40} 
          sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }} />
      </Stack>
    );
  }
  
  return (
    <div onClick={() => {
      console.log("Logo clicked");
      setTimeout(() => {
        console.log("Navigating to home");
        router.push('/');
      }, 0);
    }}>
      <Box 
        sx={{ 
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': { transform: 'translateY(-2px)' },
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Paper
            elevation={isHovered ? 12 : 4}
            sx={{
              position: 'relative',
              transform: isAnimated ? 'scale(1)' : 'scale(0.8)',
              opacity: isAnimated ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              width: 42, height: 42, borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              background: isHovered
                ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`
                : theme.palette.primary.main,
              boxShadow: isHovered
                ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`
                : `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <Cpu 
              size={24} 
              color="white"
              style={{
                filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
                transform: isHovered ? 'rotate(15deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                transition: 'all 0.4s ease',
              }}
            />
            {isHovered && (
              <Box
                sx={{
                  position: 'absolute', inset: 0, opacity: 0.2,
                  background: `radial-gradient(circle at center, ${theme.palette.primary.light} 0%, transparent 70%)`,
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.1 },
                    '50%': { opacity: 0.3 },
                    '100%': { opacity: 0.1 },
                  },
                }}
              />
            )}
          </Paper>

          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              transform: isAnimated ? 'translateX(0)' : 'translateX(10px)',
              opacity: isAnimated ? 1 : 0,
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
              transitionDelay: '0.1s',
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                letterSpacing: '0.5px',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box component="span" sx={{ 
                display: 'inline-block',
                color: theme.palette.text.primary,
                fontWeight: 900,
                position: 'relative',
                letterSpacing: isHovered ? '1px' : '0.5px',
                transition: 'all 0.3s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '4px', height: '4px', borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  bottom: 0, right: '-2px',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }
              }}>
                GLU
              </Box>
              
              <Box 
                component="span" 
                sx={{
                  position: 'relative',
                  background: isHovered 
                    ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
                    : `linear-gradient(90deg, ${theme.palette.primary.dark} 20%, ${theme.palette.primary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 900,
                  ml: 0.5,
                  letterSpacing: isHovered ? '1px' : '0.5px',
                  transition: 'all 0.3s ease',
                  textShadow: isHovered ? `0 2px 15px ${alpha(theme.palette.primary.main, 0.6)}` : 'none',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%', height: '3px', bottom: '0px', left: 0,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    borderRadius: '2px',
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0.3)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  },
                }}
              >
                Stack
              </Box>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </div>
  );
});

BrandLogo.displayName = 'BrandLogo';

const NavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  if (isLoading) {
    return (
      <Skeleton variant="rounded" width={110} height={40} 
        sx={{ borderRadius: 2, backgroundColor: alpha(theme.palette.primary.main, 0.08) }} />
    );
  }
  
  return (
    <div onClick={() => {
      console.log("NavItem clicked:", item.path);
      // Call any passed onClick handler
      if (onClick) onClick();
      // Direct navigation with timeout to ensure event queue is clear
      setTimeout(() => {
        console.log("Navigating to:", item.path);
        router.push(item.path);
      }, 0);
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderRadius: 2,
          textDecoration: 'none',
          color: isActive ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.9),
          fontWeight: isActive ? 700 : 600,
          transition: 'all 0.25s ease',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            transform: 'translateY(-2px)',
          },
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {item.icon && React.createElement(item.icon, { 
          sx: { 
            color: isActive || isHovered ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.7),
            transition: 'all 0.2s ease',
            mr: 1
          }
        })}
        {item.label}
      </Box>
    </div>
  );
});

NavItem.displayName = 'NavItem';

const MobileNavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  const router = useRouter();
  
  if (isLoading) {
    return (
      <Skeleton variant="rounded" width="100%" height={54} 
        sx={{ borderRadius: 2, backgroundColor: alpha(theme.palette.primary.main, 0.08) }} />
    );
  }
  
  return (
    <div onClick={() => {
      console.log("MobileNavItem clicked:", item.path);
      // Call any passed onClick handler
      if (onClick) onClick();
      // Direct navigation with timeout to ensure event queue is clear
      setTimeout(() => {
        console.log("Navigating to:", item.path);
        router.push(item.path);
      }, 0);
    }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
          pl: 2,
          pr: 2,
          mb: 0.5,
          borderRadius: 2,
          textDecoration: 'none',
          color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
          fontWeight: isActive ? 700 : 500,
          backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
          borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
              mr: 1.5
            }}
          >
            {React.createElement(item.icon, { 
              sx: { 
                color: isActive ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.7),
              }
            })}
          </Box>
          {item.label}
        </Box>
        {isActive && (
          <ArrowForwardIos sx={{ 
            opacity: 0.7,
            fontSize: '0.8rem',
            color: theme.palette.text.primary
          }} />
        )}
      </Box>
    </div>
  );
});

MobileNavItem.displayName = 'MobileNavItem';

const GetStartedButton = memo<GetStartedButtonProps>(({ isMobile, isLoading = false, onClick }) => {
  const theme = useTheme();
  const router = useRouter();
  
  if (isLoading) {
    return (
      <Skeleton variant="rounded" width={isMobile ? "100%" : 140} height={isMobile ? 52 : 44} 
        sx={{ 
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          ml: isMobile ? 0 : 2,
          mt: isMobile ? 2 : 0,
        }} />
    );
  }
  
  return (
    <div onClick={() => {
      console.log("GetStartedButton clicked");
      // Call any passed onClick handler
      if (onClick) onClick();
      // Direct navigation with timeout to ensure event queue is clear
      setTimeout(() => {
        console.log("Navigating to: /get-started");
        router.push('/get-started');
      }, 0);
    }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: isMobile ? 3 : 2.5,
          py: isMobile ? 1.5 : 1.2,
          ml: isMobile ? 0 : 2,
          mt: isMobile ? 2 : 0,
          borderRadius: 3,
          textDecoration: 'none',
          color: 'white',
          fontWeight: 600,
          backgroundColor: theme.palette.primary.main,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Get Started
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            ml: 1,
          }}
        >
          <ArrowForwardIos sx={{ fontSize: '0.7rem', color: 'white' }} />
        </Box>
      </Box>
    </div>
  );
});

GetStartedButton.displayName = 'GetStartedButton';

const LoadingOverlay = memo(() => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(4px)',
        zIndex: 1999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.main, mb: 3 }} />
      <Typography variant="h6" sx={{ 
        fontWeight: 500, 
        color: theme.palette.text.primary,
        animation: 'fadeInOut 2s infinite',
        '@keyframes fadeInOut': {
          '0%': { opacity: 0.5 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.5 },
        }
      }}>
        Loading content...
      </Typography>
    </Box>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

const NavBar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // Handle navigation state
  useEffect(() => {
    const handleStart = () => {
      setIsNavigating(true);
    };
    
    const handleComplete = () => {
      setIsNavigating(false);
    };
    
    // Explicitly listen for router events
    window.addEventListener('popstate', handleComplete);
    
    return () => {
      window.removeEventListener('popstate', handleComplete);
    };
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTransparent(pathname === '/');
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 60;
      setScrolled(shouldScroll);
      if (shouldScroll) setTransparent(false);
      else setTransparent(pathname === '/');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleOpenMenu = useCallback(() => setMenuOpen(true), []);
  const handleCloseMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toolbarStyles = useMemo(() => ({
    height: { xs: scrolled ? 64 : 70, md: scrolled ? 70 : 76 },
    justifyContent: 'space-between',
    px: { xs: 2, md: 3 },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [scrolled]);

  return (
    <>
      {(isInitialLoad || isNavigating) && <LoadingOverlay />}
      
      <StyledAppBar position="fixed" elevation={0} transparent={transparent} scrolled={scrolled}>
        <Container maxWidth="xl">
          <Toolbar sx={toolbarStyles}>
            <BrandLogo />

            {!isMobile ? (
              <Fade in={true} timeout={600}>
                <Stack direction="row" gap={1.5} alignItems="center">
                  {NAV_ITEMS.map((item, index) => (
                    <Fade key={item.path} in={true} style={{ transitionDelay: `${index * 75}ms` }}>
                      <Box>
                        <NavItem 
                          item={item} 
                          isActive={pathname === item.path}
                          isLoading={isInitialLoad}
                        />
                      </Box>
                    </Fade>
                  ))}
                  <Fade in={true} style={{ transitionDelay: `${NAV_ITEMS.length * 75}ms` }}>
                    <Box>
                      <GetStartedButton isMobile={false} isLoading={isInitialLoad} />
                    </Box>
                  </Fade>
                </Stack>
              </Fade>
            ) : (
              <IconButton
                edge="end"
                onClick={handleOpenMenu}
                disabled={isInitialLoad}
                sx={{ 
                  color: theme.palette.text.primary,
                  transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.15) },
                  width: 42, height: 42,
                }}
              >
                {isInitialLoad ? (
                  <CircularProgress size={24} thickness={4} color="inherit" />
                ) : (
                  <Menu fontSize="medium" />
                )}
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Toolbar sx={{ height: { xs: 70, md: 76 }, visibility: 'hidden' }} />

      <Drawer
        anchor="right"
        open={isMobile && menuOpen}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            width: '85%',
            maxWidth: 340,
            backgroundColor: alpha(theme.palette.background.default, 0.97),
            backdropFilter: 'blur(12px)',
            padding: '24px 16px',
            boxShadow: '-4px 0 25px rgba(0,0,0,0.15)',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <BrandLogo />
          <IconButton
            onClick={handleCloseMenu}
            sx={{ 
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.15) },
              width: 42, height: 42,
            }}
          >
            <Close fontSize="medium" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={0.75}>
          {NAV_ITEMS.map((item, index) => (
            <Fade key={item.path} in={menuOpen} style={{ transitionDelay: `${index * 50}ms` }}>
              <Box>
                <MobileNavItem
                  item={item}
                  isActive={pathname === item.path}
                  onClick={handleCloseMenu} 
                  isLoading={isInitialLoad && menuOpen}
                />
              </Box>
            </Fade>
          ))}
          <Box mt={3}>
            <Fade in={menuOpen} style={{ transitionDelay: `${NAV_ITEMS.length * 50 + 50}ms` }}>
              <Box>
                <GetStartedButton 
                  isMobile={true} 
                  isLoading={isInitialLoad && menuOpen} 
                  onClick={handleCloseMenu}
                />
              </Box>
            </Fade>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
};

export default memo(NavBar);