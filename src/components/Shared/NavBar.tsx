'use client';

import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

// MUI Imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import { AppBarProps } from '@mui/material/AppBar';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';

// Icons
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Home from '@mui/icons-material/Home';
import Book from '@mui/icons-material/Book';
import Paid from '@mui/icons-material/Paid';
import Email from '@mui/icons-material/Email';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Cpu } from 'lucide-react';
import { SvgIconComponent } from '@mui/icons-material';

// Define proper types for navigation items
interface NavItemType {
  label: string;
  path: string;
  icon: SvgIconComponent;
}

// Constants moved outside component to prevent recreation
const NAV_ITEMS: NavItemType[] = [
  { label: 'Solutions', path: '/solutions', icon: Home },
  { label: 'Resources', path: '/resources', icon: Book },
  { label: 'Pricing', path: '/pricing', icon: Paid },
  { label: 'Contact', path: '/contact', icon: Email },
];

// Define types for StyledAppBar props
interface StyledAppBarProps extends AppBarProps {
  transparent?: boolean;
  scrolled?: boolean;
}

// --- Styled Components ---
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'transparent' && prop !== 'scrolled'
})<StyledAppBarProps>(({ theme, transparent, scrolled }) => ({
  backgroundColor: transparent 
    ? 'transparent' 
    : scrolled 
      ? theme.palette.background.paper
      : alpha(theme.palette.background.default, 0.85),
  backdropFilter: transparent ? 'none' : 'blur(20px)',
  boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
  borderBottom: scrolled 
    ? 'none'
    : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// Custom progress bar for page transitions
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

// --- Enhanced Brand Logo Component ---
const BrandLogo = memo(() => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
      
      // Simulate full content load after animation completes
      setTimeout(() => {
        setIsLoaded(true);
      }, 50);
    }, 30);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show skeleton while loading
  if (!isLoaded) {
    return (
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Skeleton variant="circular" width={42} height={42} 
          sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
        />
        <Skeleton variant="text" width={120} height={40} 
          sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
        />
      </Stack>
    );
  }
  
  return (
    <Link href="/" passHref legacyBehavior>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          textDecoration: 'none',
          position: 'relative',
          '&:hover': { 
            transform: 'translateY(-2px)',
          },
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        component="a"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Icon with Advanced Animation */}
        <Paper
          elevation={isHovered ? 12 : 4}
          sx={{
            position: 'relative',
            transform: isAnimated ? 'scale(1)' : 'scale(0.8)',
            opacity: isAnimated ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            width: 42,
            height: 42,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          
          {/* Dynamic background effect */}
          {isHovered && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.2,
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

        {/* Enhanced Typography Logo */}
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
            {/* First part of logo with bolder styling */}
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
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main,
                bottom: 0,
                right: '-2px',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }
            }}>
              GLU
            </Box>
            
            {/* Highlighted part with premium gradient effect */}
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
                  width: '100%',
                  height: '3px',
                  bottom: '0px',
                  left: 0,
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
          
          {/* Animated tagline */}
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(-5px)',
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              mt: 0.5,
              transition: 'all 0.3s ease',
              ml: '3px',
            }}
          >
            enterprise technology solutions
          </Typography>
        </Box>
      </Stack>
    </Link>
  );
});

BrandLogo.displayName = 'BrandLogo';

// --- Define proper interfaces for component props ---
interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

// --- Redesigned NavItem Component with navigation transition ---
const NavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  if (isLoading) {
    return (
      <Skeleton 
        variant="rounded" 
        width={110} 
        height={40} 
        sx={{ 
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.08)
        }} 
      />
    );
  }
  
  // Simple click handler
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    router.push(item.path);
  };
  
  return (
    <Tooltip title={`View ${item.label}`} placement="bottom" arrow enterDelay={700}>
      <Button
        component={Link}
        href={item.path}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        startIcon={item.icon && <item.icon 
          sx={{ 
            color: isActive || isHovered ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.7),
            transition: 'all 0.2s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }} 
        />}
        sx={{
          color: isActive
            ? theme.palette.primary.main
            : alpha(theme.palette.text.primary, 0.9),
          fontWeight: isActive ? 700 : 600,
          fontSize: '0.95rem',
          letterSpacing: '0.3px',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            transform: 'translateY(-2px)',
          },
          textTransform: 'none',
          px: 2,
          py: 1,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.25s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(120deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.08)} 50%, transparent 100%)`,
            transform: isHovered ? 'translateX(0%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease',
          },
          ...(isActive && {
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '6px',
              left: '20%',
              width: '60%',
              height: '3px',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '8px',
              boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.4)}`
            }
          }),
        }}
      >
        {item.label}
      </Button>
    </Tooltip>
  );
});

NavItem.displayName = 'NavItem';

// --- Redesigned MobileNavItem Component with navigation transition ---
const MobileNavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  if (isLoading) {
    return (
      <Skeleton 
        variant="rounded" 
        width="100%" 
        height={54} 
        sx={{ 
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.08) 
        }} 
      />
    );
  }
  
  // Simple click handler
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    router.push(item.path);
  };
  
  const Icon = item.icon;
  
  return (
    <Button
      component={Link}
      href={item.path}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      startIcon={
        <Box
          sx={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            backgroundColor: isActive || isHovered 
              ? alpha(theme.palette.primary.main, 0.15)
              : 'transparent',
            transition: 'all 0.2s ease',
          }}
        >
          <Icon 
            sx={{ 
              color: isActive || isHovered 
                ? theme.palette.primary.main 
                : alpha(theme.palette.text.primary, 0.7),
              fontSize: '1.2rem',
              transition: 'color 0.2s ease'
            }} 
          />
        </Box>
      }
      sx={{
        color: isActive || isHovered
          ? theme.palette.primary.main
          : theme.palette.text.primary,
        justifyContent: 'flex-start',
        fontSize: '1.1rem',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          transform: 'translateX(6px)'
        },
        fontWeight: isActive ? 700 : 500,
        borderRadius: 2,
        py: 1.5,
        pl: 2,
        pr: 2,
        mb: 0.5,
        position: 'relative',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(isActive && {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderLeft: `4px solid ${theme.palette.primary.main}`,
          pl: 1.5,
        }),
      }}
      endIcon={
        isActive || isHovered ? (
          <ArrowForwardIos 
            fontSize="small" 
            sx={{ 
              opacity: 0.7,
              fontSize: '0.8rem',
              transform: 'translateX(0)',
              transition: 'transform 0.2s ease',
            }} 
          />
        ) : null
      }
    >
      {item.label}
    </Button>
  );
});

MobileNavItem.displayName = 'MobileNavItem';

// --- Define interface for GetStartedButton props ---
interface GetStartedButtonProps {
  isMobile: boolean;
  isLoading?: boolean;
}

// --- Redesigned GetStarted Button with premium effects ---
const GetStartedButton = memo<GetStartedButtonProps>(({ isMobile, isLoading = false }) => {
  const theme = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  if (isLoading) {
    return (
      <Skeleton 
        variant="rounded" 
        width={isMobile ? "100%" : 140} 
        height={isMobile ? 52 : 44} 
        sx={{ 
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          ml: isMobile ? 0 : 2,
          mt: isMobile ? 2 : 0,
        }} 
      />
    );
  }
  
  // Simple click handler
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/get-started');
  };
  
  return (
    <Button
      variant="contained"
      component={Link}
      href="/get-started"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      endIcon={
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
          }}
        >
          <ArrowForwardIos 
            sx={{ 
              fontSize: '0.7rem', 
              color: 'white',
              transition: 'all 0.3s ease',
            }} 
          />
        </Box>
      }
      sx={{
        ml: isMobile ? 0 : 2,
        mt: isMobile ? 2 : 0,
        px: isMobile ? 3 : 2.5,
        py: isMobile ? 1.5 : 1.2,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.5px',
        fontSize: '0.95rem',
        backgroundColor: theme.palette.primary.main,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered 
          ? `0 8px 25px ${alpha(theme.palette.primary.main, 0.5)}`
          : `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        // Gradient background effect
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
        },
        // Shine effect
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(60deg, transparent, rgba(255,255,255,0.15), transparent)',
          transform: 'rotate(30deg)',
          transition: 'all 0.5s ease-out',
          opacity: isHovered ? 1 : 0,
          animation: isHovered ? 'shine 1.5s infinite' : 'none',
          '@keyframes shine': {
            '0%': {
              left: '-50%',
            },
            '100%': {
              left: '150%',
            },
          },
          zIndex: 1,
        },
      }}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>Get Started</span>
    </Button>
  );
});

GetStartedButton.displayName = 'GetStartedButton';

// --- LoadingOverlay Component ---
const LoadingOverlay = memo(() => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(4px)',
        zIndex: 1999, // Just below AppBar
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
      }}
    >
      <CircularProgress 
        size={60} 
        thickness={4} 
        sx={{ 
          color: theme.palette.primary.main,
          mb: 3,
        }} 
      />
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 500, 
          color: theme.palette.text.primary,
          animation: 'fadeInOut 2s infinite',
          '@keyframes fadeInOut': {
            '0%': { opacity: 0.5 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.5 },
          }
        }}
      >
        Loading content...
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 1,
          color: alpha(theme.palette.text.secondary, 0.8),
          maxWidth: 300,
          textAlign: 'center',
        }}
      >
        Please wait while we prepare your experience
      </Typography>
    </Box>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

// --- NavBar Component ---
const NavBar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Memoize isMobile to prevent unnecessary re-renders
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true, // Avoid server-side rendering mismatch
  });
  
  // State management
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Simulate initial content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500);
    
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
          const offset = window.scrollY;
          if (offset > 60) {
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

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once to initialize
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Memoized toolbar styles based on scroll position
  const toolbarStyles = useMemo(() => ({
    height: { xs: scrolled ? 64 : 70, md: scrolled ? 70 : 76 },
    justifyContent: 'space-between',
    px: { xs: 2, md: 3 },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [scrolled]);

  return (
    <>
      {/* Show progress bar during page transitions */}
      {isNavigating && (
        <StyledProgressBar
          sx={{
            opacity: 1,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
      
      {/* Initial page load overlay */}
      {isInitialLoad && <LoadingOverlay />}
      
      <StyledAppBar 
        position="fixed" 
        elevation={0} 
        transparent={transparent} 
        scrolled={scrolled}
      >
        <Container maxWidth="xl">
          <Toolbar sx={toolbarStyles}>
            <BrandLogo />

            {!isMobile ? (
              <Fade in={true} timeout={600}>
                <Stack direction="row" gap={1.5} alignItems="center">
                  {NAV_ITEMS.map((item, index) => (
                    <Fade
                      key={item.path}
                      in={true}
                      style={{ transitionDelay: `${index * 75}ms` }}
                    >
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
                      <GetStartedButton 
                        isMobile={false} 
                        isLoading={isInitialLoad}
                      />
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
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15)
                    },
                    width: 42,
                    height: 42,
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

        {/* Empty toolbar for spacing when navbar is fixed */}
        <Toolbar sx={{ 
          height: { xs: 70, md: 76 },
          visibility: 'hidden'
        }} />

        {/* Mobile Menu - Redesigned with modern look */}
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
          SlideProps={{
            style: { transitionDuration: '250ms' }
          }}
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
                width: 42,
                height: 42,
              }}
            >
              <Close fontSize="medium" />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={0.75}>
            {NAV_ITEMS.map((item, index) => (
              <Fade 
                key={item.path} 
                in={menuOpen} 
                style={{ transformOrigin: 'left', transitionDelay: `${index * 50}ms` }}
              >
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
              <Fade 
                in={menuOpen} 
                style={{ transformOrigin: 'left', transitionDelay: `${NAV_ITEMS.length * 50 + 50}ms` }}
              >
                <Box>
                  <GetStartedButton 
                    isMobile={true}
                    isLoading={isInitialLoad && menuOpen}
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