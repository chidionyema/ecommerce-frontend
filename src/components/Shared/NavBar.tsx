'use client';

import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { 
  AppBar, Toolbar, Typography, IconButton, Container, Stack, useMediaQuery, 
  Box, Divider, Drawer, Fade, LinearProgress, CircularProgress,
  Skeleton, Paper, alpha, styled, useTheme
} from '@mui/material';
import { Menu, Close, Home, Book, Paid, Email, ArrowForwardIos } from '@mui/icons-material';
import { Cpu } from 'lucide-react';
import type { SvgIconComponent } from '@mui/icons-material';
import type { AppBarProps } from '@mui/material/AppBar';

// Types
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

// Constants
const NAV_ITEMS: NavItemType[] = [
  { label: 'Solutions', path: '/solutions', icon: Home },
  { label: 'Resources', path: '/resources', icon: Book },
  { label: 'Pricing', path: '/pricing', icon: Paid },
  { label: 'Contact', path: '/contact', icon: Email },
];

// Styled Components
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

// Component Implementations
const BrandLogo = memo(() => {
  const theme = useTheme();
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
    <a href="/" style={{ textDecoration: 'none' }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          '&:hover': { transform: 'translateY(-2px)' },
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
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
          
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: '100%', left: 0,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(-5px)',
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              mt: 0.5, ml: '3px',
              transition: 'all 0.3s ease',
            }}
          >
            enterprise technology solutions
          </Typography>
        </Box>
      </Stack>
    </a>
  );
});

BrandLogo.displayName = 'BrandLogo';

// Extremely simplified NavItem using plain HTML anchor
const NavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  if (isLoading) {
    return (
      <Skeleton variant="rounded" width={110} height={40} 
        sx={{ borderRadius: 2, backgroundColor: alpha(theme.palette.primary.main, 0.08) }} />
    );
  }
  
  // Basic anchor tag with inline styles - nothing fancy
  return (
    <a 
      href={item.path}
      onClick={(e) => {
        console.log(`Clicked navigation to ${item.path}`);
        if (onClick) onClick();
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: isActive ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.9),
        fontWeight: isActive ? 700 : 600,
        fontSize: '0.95rem',
        letterSpacing: '0.3px',
        backgroundColor: isHovered ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        position: 'relative',
        marginLeft: '6px',
        marginRight: '6px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.icon && React.createElement(item.icon, { 
        style: { 
          color: isActive || isHovered ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.7),
          transition: 'all 0.2s ease',
          marginRight: '8px',
          fontSize: '20px'
        }
      })}
      {item.label}
    </a>
  );
});

NavItem.displayName = 'NavItem';

// Simplified MobileNavItem using plain HTML anchor
const MobileNavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  if (isLoading) {
    return (
      <Skeleton variant="rounded" width="100%" height={54} 
        sx={{ borderRadius: 2, backgroundColor: alpha(theme.palette.primary.main, 0.08) }} />
    );
  }
  
  return (
    <a 
      href={item.path}
      onClick={(e) => {
        console.log(`Clicked mobile navigation to ${item.path}`);
        if (onClick) onClick();
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: isActive || isHovered ? theme.palette.primary.main : theme.palette.text.primary,
        fontWeight: isActive ? 700 : 500,
        fontSize: '1.1rem',
        backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
        borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : 'none',
        paddingLeft: isActive ? '12px' : '16px',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        marginBottom: '4px',
        width: '100%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: isActive || isHovered ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
          marginRight: '12px'
        }}>
          {React.createElement(item.icon, { 
            style: { 
              color: isActive || isHovered ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.7),
              fontSize: '1.2rem',
            }
          })}
        </span>
        {item.label}
      </span>
      
      {(isActive || isHovered) && (
        <ArrowForwardIos style={{ 
          opacity: 0.7,
          fontSize: '0.8rem',
          color: theme.palette.text.primary
        }} />
      )}
    </a>
  );
});

MobileNavItem.displayName = 'MobileNavItem';

// Simplified GetStartedButton using plain HTML anchor
const GetStartedButton = memo<GetStartedButtonProps>(({ isMobile, isLoading = false, onClick }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
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
    <a 
      href="/get-started"
      onClick={(e) => {
        console.log('Clicked Get Started button');
        if (onClick) onClick();
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '12px 24px' : '10px 20px',
        marginLeft: isMobile ? 0 : '16px',
        marginTop: isMobile ? '16px' : 0,
        borderRadius: '12px',
        textDecoration: 'none',
        color: 'white',
        fontWeight: 600,
        letterSpacing: '0.5px',
        fontSize: '0.95rem',
        backgroundColor: theme.palette.primary.main,
        boxShadow: isHovered 
          ? `0 8px 25px ${alpha(theme.palette.primary.main, 0.5)}`
          : `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>Get Started</span>
      
      <span style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        marginLeft: '8px',
        transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
        transition: 'all 0.3s ease',
      }}>
        <ArrowForwardIos style={{ 
          fontSize: '0.7rem', 
          color: 'white'
        }} />
      </span>
    </a>
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
      <Typography variant="body2" sx={{ 
        mt: 1,
        color: alpha(theme.palette.text.secondary, 0.8),
        maxWidth: 300,
        textAlign: 'center',
      }}>
        Please wait while we prepare your experience
      </Typography>
    </Box>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

// Main NavBar Component
const NavBar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Simulate initial content loading
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Check if we're on the homepage to apply transparent navbar
  useEffect(() => {
    setTransparent(pathname === '/');
  }, [pathname]);

  // Handle scroll events for navbar appearance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            setScrolled(true);
            setTransparent(false);
          } else {
            setScrolled(false);
            setTransparent(pathname === '/');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleOpenMenu = useCallback(() => setMenuOpen(true), []);
  const handleCloseMenu = useCallback(() => setMenuOpen(false), []);

  const toolbarStyles = useMemo(() => ({
    height: { xs: scrolled ? 64 : 70, md: scrolled ? 70 : 76 },
    justifyContent: 'space-between',
    px: { xs: 2, md: 3 },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [scrolled]);

  return (
    <>
      {isNavigating && <StyledProgressBar />}
      {isInitialLoad && <LoadingOverlay />}
      
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

      {/* Empty toolbar for spacing */}
      <Toolbar sx={{ height: { xs: 70, md: 76 }, visibility: 'hidden' }} />

      {/* Mobile Menu */}
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
        SlideProps={{ style: { transitionDuration: '250ms' } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <BrandLogo />
          
          <IconButton
            onClick={handleCloseMenu}
            sx={{ 
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                transform: 'rotate(90deg)',
                transition: 'transform 0.3s ease'
              },
              width: 42, height: 42,
            }}
          >
            <Close fontSize="medium" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={0.75}>
          {NAV_ITEMS.map((item, index) => (
            <Fade key={item.path} in={menuOpen} style={{ transformOrigin: 'left', transitionDelay: `${index * 50}ms` }}>
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
            <Fade in={menuOpen} style={{ transformOrigin: 'left', transitionDelay: `${NAV_ITEMS.length * 50 + 50}ms` }}>
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