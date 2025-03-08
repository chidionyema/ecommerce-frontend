'use client';

import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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

import { styled, useTheme } from '@mui/material/styles';

import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Home from '@mui/icons-material/Home';
import Book from '@mui/icons-material/Book';
import Paid from '@mui/icons-material/Paid';
import Email from '@mui/icons-material/Email';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

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
      : alpha(theme.palette.background.default, 0.7),
  backdropFilter: transparent ? 'none' : 'blur(10px)',
  boxShadow: scrolled ? '0 2px 12px rgba(0, 0, 0, 0.08)' : 'none',
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
      }, 500);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show skeleton while loading
  if (!isLoaded) {
    return (
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Skeleton variant="circular" width={36} height={36} 
          sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
        />
        <Skeleton variant="text" width={100} height={40} 
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
        {/* Logo Icon with Animation */}
        <Box 
          sx={{
            position: 'relative',
            transform: isAnimated ? 'scale(1)' : 'scale(0.8)',
            opacity: isAnimated ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
          }}
        >
          <Cpu 
            size={36} 
            color={theme.palette.primary.main} 
            style={{
              filter: isHovered ? `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.6)})` : 'none',
              transform: isHovered ? 'rotate(15deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease, filter 0.3s ease'
            }}
          />
          {/* Add a pulse effect behind the icon */}
          {isHovered && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 0.7,
                  },
                  '100%': {
                    transform: 'translate(-50%, -50%) scale(1.8)',
                    opacity: 0,
                  },
                },
              }}
            />
          )}
        </Box>

        {/* Enhanced Typography */}
        <Box
          sx={{
            overflow: 'hidden',
            transform: isAnimated ? 'translateX(0)' : 'translateX(10px)',
            opacity: isAnimated ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
            transitionDelay: '0.1s',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: '0.5px',
              color: theme.palette.text.primary,
              fontSize: { xs: '1.6rem', md: '1.9rem' },
              lineHeight: 1.1,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: isHovered ? '100%' : '0%',
                height: '6px',
                bottom: 0,
                left: 0,
                background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 100%)`,
                zIndex: -1,
                transition: 'width 0.3s ease',
              },
            }}
          >
            {/* First part of logo with normal styling */}
            <Box component="span" sx={{ 
              display: 'inline-block',
              position: 'relative',
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
            
            {/* Highlighted part with gradient and underline effect */}
            <Box 
              component="span" 
              sx={{
                background: isHovered 
                  ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
                  : theme.palette.primary.main,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 800,
                position: 'relative',
                transition: 'all 0.3s ease',
                textShadow: isHovered ? `0 2px 10px ${alpha(theme.palette.primary.main, 0.4)}` : 'none',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  bottom: '2px',
                  left: 0,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease-out',
                },
              }}
            >
              Stack
            </Box>
          </Typography>
        </Box>
        
        {/* Optional subtle tagline */}
        {isHovered && (
          <Fade in={isHovered} timeout={300}>
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: alpha(theme.palette.text.secondary, 0.8),
                fontStyle: 'italic',
                fontSize: '0.7rem',
                whiteSpace: 'nowrap',
                mt: 0.5,
              }}
            >
              modern tech stack
            </Typography>
          </Fade>
        )}
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

// --- NavItem Component with loading state ---
const NavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  
  if (isLoading) {
    return (
      <Skeleton 
        variant="rounded" 
        width={100} 
        height={36} 
        sx={{ 
          borderRadius: 1,
          backgroundColor: alpha(theme.palette.primary.main, 0.08)
        }} 
      />
    );
  }
  
  return (
    <Tooltip title={`View ${item.label}`} placement="bottom" arrow enterDelay={700}>
      <Button
        component={Link}
        href={item.path}
        onClick={onClick}
        startIcon={item.icon && <item.icon />}
        sx={{
          color: isActive
            ? theme.palette.primary.main
            : alpha(theme.palette.text.primary, 0.9),
          fontWeight: isActive ? 700 : 500,
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            transform: 'translateY(-1px)',
          },
          textTransform: 'none',
          px: 1.5,
          py: 0.75,
          borderRadius: 1,
          position: 'relative',
          transition: 'all 0.2s ease',
          ...(isActive && {
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '10%',
              width: '80%',
              height: '2px',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '2px'
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

// --- MobileNavItem Component ---
const MobileNavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  
  if (isLoading) {
    return (
      <Skeleton 
        variant="rounded" 
        width="100%" 
        height={48} 
        sx={{ 
          borderRadius: 1,
          backgroundColor: alpha(theme.palette.primary.main, 0.08) 
        }} 
      />
    );
  }
  
  const Icon = item.icon;
  
  return (
    <Button
      component={Link}
      href={item.path}
      onClick={onClick}
      startIcon={<Icon />}
      sx={{
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.text.primary,
        justifyContent: 'flex-start',
        fontSize: '1.1rem',
        '&:hover': {
          color: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          transform: 'translateX(4px)'
        },
        fontWeight: isActive ? 700 : 500,
        borderRadius: 1,
        py: 1.2,
        pl: 2,
        pr: 4,
        transition: 'all 0.2s ease',
        ...(isActive && {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderLeft: `3px solid ${theme.palette.primary.main}`,
        }),
      }}
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

// --- GetStarted Button with animated hover and loading state ---
const GetStartedButton = memo<GetStartedButtonProps>(({ isMobile, isLoading = false }) => {
  const theme = useTheme();
  
  if (isLoading) {
    return (
      <Skeleton 
        variant="rounded" 
        width={isMobile ? "100%" : 120} 
        height={isMobile ? 48 : 40} 
        sx={{ 
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          ml: isMobile ? 0 : 1,
          mt: isMobile ? 2 : 0,
        }} 
      />
    );
  }
  
  return (
    <Button
      variant="contained"
      endIcon={<KeyboardArrowDown sx={{ 
        transition: 'transform 0.2s ease',
        transform: 'rotate(-90deg)'
      }} />}
      sx={{
        ml: isMobile ? 0 : 1,
        mt: isMobile ? 2 : 0,
        px: 3,
        py: isMobile ? 1.5 : 1,
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease'
        },
        '&:hover': { 
          boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
          transform: 'translateY(-2px)',
          '&::before': {
            opacity: 1
          },
          '& .MuiSvgIcon-root': {
            transform: 'rotate(0deg)'
          }
        },
        '&:active': {
          transform: 'translateY(1px)',
          boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
        },
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 'bold',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>Get Started</span>
    </Button>
  );
});

GetStartedButton.displayName = 'GetStartedButton';

// --- Loading Screen Component ---
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
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true, // Avoid server-side rendering mismatch
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);
  
  // Page loading state
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Simulate initial content loading (remove in production, detect real loading)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1800); // 1.8 seconds for initial load
    
    return () => clearTimeout(timer);
  }, []);
  
  // Custom navigation state tracking for App Router
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let currentPath = pathname;
    
    const handleStartNavigation = () => {
      setIsPageLoading(true);
      setProgress(0);
      
      // Simulate progress increasing
      progressInterval = setInterval(() => {
        setProgress((oldProgress) => {
          // Slowly increase to 90% then wait for actual completion
          const newProgress = Math.min(oldProgress + (Math.random() * 10), 90);
          return newProgress;
        });
      }, 200);
    };
    
    const handleCompleteNavigation = () => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Small delay before hiding the progress bar
      setTimeout(() => {
        setIsPageLoading(false);
        setProgress(0);
      }, 500);
    };
    
    // Check for pathname changes to detect navigation
    if (pathname !== currentPath) {
      currentPath = pathname;
      handleCompleteNavigation();
    }
    
    // Use a MutationObserver to detect when the page is about to change
    // This is a workaround for the lack of navigation events in App Router
    const observer = new MutationObserver((mutations) => {
      const isNavigating = document.documentElement.classList.contains('nprogress-busy');
      if (isNavigating && !isPageLoading) {
        handleStartNavigation();
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => {
      clearInterval(progressInterval);
      observer.disconnect();
    };
  }, [pathname, isPageLoading]);

  // Check if we're on the homepage to apply transparent navbar
  useEffect(() => {
    setTransparent(pathname === '/');
  }, [pathname]);

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
        setScrolled(true);
        setTransparent(false);
      } else {
        setScrolled(false);
        setTransparent(pathname === '/');
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
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
    height: { xs: scrolled ? 60 : 64, md: scrolled ? 68 : 72 },
    justifyContent: 'space-between',
    px: { xs: 2, md: 3 },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [scrolled]);

  return (
    <>
      {/* Show progress bar during page transitions */}
      {isPageLoading && (
        <StyledProgressBar 
          variant="determinate" 
          value={progress} 
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
                <Stack direction="row" gap={2} alignItems="center">
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
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08)
                  }
                }}
              >
                {isInitialLoad ? (
                  <CircularProgress size={24} thickness={4} color="inherit" />
                ) : (
                  <Menu fontSize="large" />
                )}
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Empty toolbar for spacing when navbar is fixed */}
      <Toolbar sx={{ 
        height: { xs: 64, md: 72 },
        visibility: 'hidden'
      }} />

      {/* Mobile Menu - Using MUI's Drawer for better performance */}
      <Drawer
        anchor="right"
        open={isMobile && menuOpen}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 320,
            backgroundColor: alpha(theme.palette.background.default, 0.97),
            backdropFilter: 'blur(12px)',
            padding: '24px',
            boxShadow: '-4px 0 16px rgba(0,0,0,0.25)',
          },
        }}
        SlideProps={{
          style: { transitionDuration: '150ms' }  // Faster transition
        }}
      >
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <IconButton
            onClick={handleCloseMenu}
            sx={{ 
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: 'rotate(90deg)',
                transition: 'transform 0.3s ease'
              } 
            }}
          >
            <Close fontSize="large" />
          </IconButton>
        </Box>

        <Stack spacing={1.5}>
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
          <Divider sx={{ my: 2 }} />
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
        </Stack>
      </Drawer>
    </>
  );
};

export default memo(NavBar);