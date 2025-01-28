import React, { useState, useCallback, memo } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  alpha,
  IconButton,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { styled, keyframes, useTheme } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';

import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Book as BookIcon,
  LocalAtm as LocalAtmIcon,
  ContactMail as ContactMailIcon,
} from '@mui/icons-material';

/* --------------------------------------------------------------------------
 *  Design Tokens
 * -------------------------------------------------------------------------- */
const PRIMARY_DARK = '#0A1A2F';
const SECONDARY_DARK = '#532F73';
const LIGHT_ACCENT = '#F2E7FE';
const TECH_GRADIENT = 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)';
const BACKDROP_BLUR = 'blur(32px)';
const BORDER_RADIUS = '20px';
const TRANSITION_TIMING = 'cubic-bezier(0.23, 1, 0.32, 1)';

/* --------------------------------------------------------------------------
 *  Animations
 * -------------------------------------------------------------------------- */
const microShine = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

/* --------------------------------------------------------------------------
 *  Styled Components
 * -------------------------------------------------------------------------- */
const LuxAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  background: `linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.98)}, ${alpha(SECONDARY_DARK, 0.95)})`,
  backdropFilter: `${BACKDROP_BLUR} saturate(200%)`,
  borderBottom: `1px solid ${alpha(LIGHT_ACCENT, 0.15)}`,
  boxShadow: `0 12px 48px ${alpha(PRIMARY_DARK, 0.3)}`,
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  zIndex: theme.zIndex.drawer + 1,
}));

const BrandContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateX(4px)',
    '& svg': {
      transform: 'rotate(180deg)'
    }
  },
  '& svg': {
    transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
  }
});

const LuxBadge = styled(Box)({
  position: 'relative',
  padding: '6px 14px',
  background: alpha(LIGHT_ACCENT, 0.1),
  borderRadius: '8px',
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.2)}`,
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: LIGHT_ACCENT,
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(90deg, transparent, ${alpha(LIGHT_ACCENT, 0.1)}, transparent)`,
    animation: `${microShine} 6s infinite linear`,
  }
});

const NavButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  color: active ? LIGHT_ACCENT : alpha(LIGHT_ACCENT, 0.8),
  fontWeight: 500,
  letterSpacing: '0.5px',
  padding: '12px 24px',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: active ? '24px' : '0px',
    height: '2px',
    background: TECH_GRADIENT,
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  '&:hover': {
    color: LIGHT_ACCENT,
    '&:after': {
      width: '60%',
    }
  }
}));

const CTALuxButton = styled(Button)(({ theme }) => ({
  background: TECH_GRADIENT,
  color: LIGHT_ACCENT,
  padding: '14px 36px',
  borderRadius: BORDER_RADIUS,
  fontWeight: 600,
  letterSpacing: '0.8px',
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.3)}`,
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(90deg, transparent, ${alpha(LIGHT_ACCENT, 0.1)}, transparent)`,
    animation: `${microShine} 6s infinite linear`,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 32px ${alpha('#4361EE', 0.3)}`,
  }
}));

const MobileNavPanel = styled(Box)<{ open?: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(135deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
  backdropFilter: BACKDROP_BLUR,
  borderLeft: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
  zIndex: 2000,
  display: 'flex',
  flexDirection: 'column',
  padding: '32px',
  opacity: open ? 1 : 0,
  visibility: open ? 'visible' : 'hidden',
  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
}));

const NavDivider = styled(Divider)({
  background: alpha(LIGHT_ACCENT, 0.1),
  margin: '24px 0',
});

/* --------------------------------------------------------------------------
 *  Component Implementation
 * -------------------------------------------------------------------------- */
const NavBar: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Solutions', path: '/solutions', icon: <CodeIcon /> },
    { label: 'Resources', path: '/resources', icon: <BookIcon /> },
    { label: 'Pricing', path: '/pricing', icon: <LocalAtmIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
  ];

  const handleNavToggle = useCallback(() => setMobileOpen((prev) => !prev), []);
  const handleNavigate = useCallback((path: string) => {
    setMobileOpen(false);
    router.push(path);
  }, [router]);

  return (
    <>
      <LuxAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            minHeight: 88, 
            justifyContent: 'space-between',
            py: { xs: 1, md: 0 }
          }}>
            <BrandContainer onClick={() => handleNavigate('/')}>
              <CodeIcon sx={{ 
                fontSize: 36,
                color: LIGHT_ACCENT,
                transform: 'rotate(45deg)'
              }} />
              <Box>
                <Typography variant="h1" sx={{
                  fontFamily: "'Bai Jamjuree', sans-serif",
                  fontSize: '1.8rem',
                  color: LIGHT_ACCENT,
                  lineHeight: 1.2,
                  fontWeight: 700,
                  letterSpacing: '0.5px'
                }}>
                  GLU
                  <Box component="span" sx={{ 
                    background: TECH_GRADIENT,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>Stack</Box>
                </Typography>
                <LuxBadge sx={{ mt: 0.5 }}>
                  <CodeIcon sx={{ fontSize: 14, mr: 1 }} />
                  ENGINEERED PRECISION
                </LuxBadge>
              </Box>
            </BrandContainer>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.path}
                    active={router.pathname === item.path}
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.label}
                  </NavButton>
                ))}
                <CTALuxButton onClick={() => router.push('/contact')}>
                  Schedule Consultation
                </CTALuxButton>
              </Box>
            )}

            {isMobile && (
              <IconButton
                onClick={handleNavToggle}
                sx={{ color: LIGHT_ACCENT, ml: 'auto' }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </LuxAppBar>

      {/* Spacer for content separation */}
      <Box sx={{ 
        height: { xs: '88px', md: '88px' },
        background: `linear-gradient(${PRIMARY_DARK} 20%, transparent)`,
        opacity: 0.6
      }} />

      <MobileNavPanel open={mobileOpen}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={handleNavToggle}
            sx={{ color: LIGHT_ACCENT }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                fontSize: '2rem',
                color: LIGHT_ACCENT,
                py: 2,
                textAlign: 'left',
                '&:hover': {
                  background: alpha(LIGHT_ACCENT, 0.05)
                }
              }}
            >
              {item.label}
            </Button>
          ))}
          <NavDivider />
          <CTALuxButton sx={{ alignSelf: 'flex-start' }}>
            Contact Us
          </CTALuxButton>
        </Box>
      </MobileNavPanel>
    </>
  );
};

export default memo(NavBar);