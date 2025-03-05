'use client';

import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  alpha,
  Stack,
  useMediaQuery,
  Box,
  Button,
  Divider,
  Drawer,
  Fade,
  Tooltip,
  AppBarProps,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Menu, Close, Home, Book, Paid, Email, KeyboardArrowDown } from '@mui/icons-material';
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

// --- Brand Logo Component ---
const BrandLogo = memo(() => {
  const theme = useTheme();
  return (
    <Link href="/" passHref legacyBehavior>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          textDecoration: 'none',
          '&:hover': { 
            opacity: 0.9,
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease'
          },
          transition: 'all 0.2s ease'
        }}
        component="a"
      >
        <Cpu size={32} color={theme.palette.primary.main} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: { xs: '1.5rem', md: '1.8rem' },
            lineHeight: 1.2,
            '& span': {
              color: theme.palette.primary.main,
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                transform: 'scaleX(0)',
                height: '2px',
                bottom: 0,
                left: 0,
                backgroundColor: theme.palette.primary.main,
                transformOrigin: 'bottom right',
                transition: 'transform 0.25s ease-out'
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
                transformOrigin: 'bottom left'
              }
            },
          }}
        >
          GLU<span>Stack</span>
        </Typography>
      </Stack>
    </Link>
  );
});

BrandLogo.displayName = 'BrandLogo';

// --- Define proper interfaces for component props ---
interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick?: () => void;
}

// --- NavItem Component ---
const NavItem = memo<NavItemProps>(({ item, isActive, onClick }) => {
  const theme = useTheme();
  
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
const MobileNavItem = memo<NavItemProps>(({ item, isActive, onClick }) => {
  const theme = useTheme();
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
}

// --- GetStarted Button with animated hover ---
const GetStartedButton = memo<GetStartedButtonProps>(({ isMobile }) => {
  const theme = useTheme();
  
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

// --- NavBar Component ---
const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true, // Avoid server-side rendering mismatch
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const pathname = usePathname();

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
                        />
                      </Box>
                    </Fade>
                  ))}
                  <Fade in={true} style={{ transitionDelay: `${NAV_ITEMS.length * 75}ms` }}>
                    <Box>
                      <GetStartedButton isMobile={false} />
                    </Box>
                  </Fade>
                </Stack>
              </Fade>
            ) : (
              <IconButton
                edge="end"
                onClick={handleOpenMenu}
                sx={{ 
                  color: theme.palette.text.primary,
                  transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08)
                  }
                }}
              >
                <Menu fontSize="large" />
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
              <GetStartedButton isMobile={true} />
            </Box>
          </Fade>
        </Stack>
      </Drawer>
    </>
  );
};

export default memo(NavBar);