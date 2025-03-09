'use client';
import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { 
  AppBar, Toolbar, Typography, IconButton, Container, Stack, useMediaQuery, 
  Box, Divider, Drawer, Fade, CircularProgress,
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

const BrandLogo = memo(() => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a href="/">
      <Box 
        component="div"
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
          </Paper>

          <Box>
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
              }}>
                GLU
              </Box>
              
              <Box 
                component="span" 
                sx={{
                  position: 'relative',
                  background: `linear-gradient(90deg, ${theme.palette.primary.dark} 20%, ${theme.palette.primary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 900,
                  ml: 0.5,
                }}
              >
                Stack
              </Box>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </a>
  );
});

BrandLogo.displayName = 'BrandLogo';

const NavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  
  return (
    <a href={item.path} style={{ textDecoration: 'none' }}>
      <Box
        component="div"
        onClick={onClick}
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
            color: isActive ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.7),
            transition: 'all 0.2s ease',
            mr: 1
          }
        })}
        {item.label}
      </Box>
    </a>
  );
});

NavItem.displayName = 'NavItem';

const MobileNavItem = memo<NavItemProps>(({ item, isActive, isLoading = false, onClick }) => {
  const theme = useTheme();
  
  return (
    <a href={item.path} style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
      <Box
        component="div"
        onClick={onClick}
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
    </a>
  );
});

MobileNavItem.displayName = 'MobileNavItem';

const GetStartedButton = memo<GetStartedButtonProps>(({ isMobile, isLoading = false, onClick }) => {
  const theme = useTheme();
  
  return (
    <a href="/get-started" style={{ textDecoration: 'none' }}>
      <Box
        component="div"
        onClick={onClick}
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
    </a>
  );
});

GetStartedButton.displayName = 'GetStartedButton';

const NavBar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);

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

  const toolbarStyles = useMemo(() => ({
    height: { xs: scrolled ? 64 : 70, md: scrolled ? 70 : 76 },
    justifyContent: 'space-between',
    px: { xs: 2, md: 3 },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [scrolled]);

  return (
    <>
      <StyledAppBar position="fixed" elevation={0} transparent={transparent} scrolled={scrolled}>        
        <Container maxWidth="xl">
          <Toolbar sx={toolbarStyles}>
            <BrandLogo />

            {!isMobile ? (
              <Stack direction="row" gap={1.5} alignItems="center">
                {NAV_ITEMS.map((item) => (
                  <NavItem 
                    key={item.path}
                    item={item} 
                    isActive={pathname === item.path}
                  />
                ))}
                <GetStartedButton isMobile={false} />
              </Stack>
            ) : (
              <IconButton
                edge="end"
                onClick={handleOpenMenu}
                sx={{ 
                  color: theme.palette.text.primary,
                  transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.15) },
                  width: 42, height: 42,
                }}
              >
                <Menu fontSize="medium" />
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
          {NAV_ITEMS.map((item) => (
            <Box key={item.path}>
              <MobileNavItem
                item={item}
                isActive={pathname === item.path}
                onClick={handleCloseMenu} 
              />
            </Box>
          ))}
          <Box mt={3}>
            <GetStartedButton 
              isMobile={true} 
              onClick={handleCloseMenu}
            />
          </Box>
        </Stack>
      </Drawer>
    </>
  );
};

export default memo(NavBar);