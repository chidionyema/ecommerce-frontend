import React, { useState, useCallback, memo, useEffect } from 'react';
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
  useTheme,
  Stack,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';

import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Book as BookIcon,
  LocalAtm as LocalAtmIcon,
  ContactMail as ContactMailIcon,
  Assessment as AssessmentIcon,
  Whatshot as WhatshotIcon,
} from '@mui/icons-material';

import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  TECH_GRADIENT,
  BACKDROP_BLUR,
  BORDER_RADIUS,
  TECH_GRADIENT_SHADOW,
  microShine,
} from '../theme/branding';

const useSeatsLeft = (initialSeats = 5) => {
  const [seatsLeft, setSeatsLeft] = useState(initialSeats);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => Math.max(1, prev - 1));
    }, 70000);
    return () => clearInterval(interval);
  },);
  return seatsLeft;
};

const LuxAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  background: alpha(PRIMARY_DARK, 0.92),
  backdropFilter: `${BACKDROP_BLUR} saturate(180%)`,
  borderBottom: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
  boxShadow: `0 2px 12px ${alpha(PRIMARY_DARK, 0.2)}`, // Added shadow
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  zIndex: theme.zIndex.drawer + 1,
  minHeight: 120,
  borderRadius: BORDER_RADIUS,
  margin: '12px',
  padding: theme.spacing(2, 3), // Add padding
  marginBottom: theme.spacing(4),
  width: 'calc(100% - 24px)',
  [theme.breakpoints.down('sm')]: {
    margin: '6px',
    width: 'calc(100% - 12px)',
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1.5), 
  },
}));

const BrandContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  padding: theme.spacing(1, 2),
  borderRadius: BORDER_RADIUS,
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.15)}`,
  background: alpha(PRIMARY_DARK, 0.3),
  margin: theme.spacing(1.5),
  boxShadow: `0 2px 8px ${alpha(LIGHT_ACCENT, 0.1)}`, // Added shadow
  
  '&:hover': {
    transform: 'translateX(4px) scale(1.02)', // Added scale
    '& svg': { transform: 'rotate(180deg)' },
  },
}));

const LuxBadge = styled(Box)({
  position: 'relative',
  padding: '4px 12px',
  background: alpha(LIGHT_ACCENT, 0.08),
  borderRadius: '8px',
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.15)}`,
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  color: LIGHT_ACCENT,
  marginTop: '8px',
  marginBottom: '5px',
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(90deg, transparent, ${alpha(LIGHT_ACCENT, 0.1)}, transparent)`,
    animation: `${microShine} 6s infinite linear`,
  },
});

const NavButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  color: active? LIGHT_ACCENT: alpha(LIGHT_ACCENT, 0.8),
  fontWeight: 600,
  fontSize: '0.875rem',
  letterSpacing: '0.8px',
  padding: '8px 16px',
  transition: 'all 0.3s ease', // Added transition for smoother hover effect
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: active? '32px': '0px',
    height: '2px',
    background: TECH_GRADIENT,
    transition: 'width 0.4s ease',
  },
  '&:hover': {
    color: LIGHT_ACCENT,
    transform: 'translateY(-2px)',
    boxShadow: `0 2px 8px ${alpha(TECH_GRADIENT_SHADOW, 0.3)}`,
    '&:after': { width: '60%' },
  },
}));

const CTALuxButton = styled(Button)(({ theme }) => ({
  background: TECH_GRADIENT,
  color: LIGHT_ACCENT,
  padding: '8px 16px',
  minWidth: '100px',
  maxWidth: '180px',
  borderRadius: BORDER_RADIUS,
  fontWeight: 700,
  fontSize: '0.875rem',
  letterSpacing: '1px',
  position: 'relative',
  overflow: 'hidden',
  whiteSpace: 'nowrap', 
  border: `1px solid ${alpha(LIGHT_ACCENT, 0.3)}`,
  transition: 'all 0.3s ease', // Added transition for boxShadow
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(90deg, transparent, ${alpha(LIGHT_ACCENT, 0.1)}, transparent)`,
    animation: `${microShine} 6s infinite linear`,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 16px ${alpha('#4361EE', 0.4)}`,
  },
}));

const MobileNavPanel = styled(Box)<{ open?: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: alpha(PRIMARY_DARK, 0.96),
  backdropFilter: BACKDROP_BLUR,
  zIndex: 2000,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  opacity: open? 1: 0,
  visibility: open? 'visible': 'hidden',
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
}));

const PremiumBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, 
  color: alpha(LIGHT_ACCENT, 0.9),
  padding: '8px 16px',
  borderRadius: BORDER_RADIUS,
  border: `1px solid ${alpha('#1B5E20', 0.3)}`,
  width: '160px',
  fontWeight: 700,
  fontSize: '0.875rem',
  whiteSpace: 'nowrap', 
  height: '36px',
  transition: 'all 0.3s ease', // Added transition for boxShadow
  cursor: 'pointer',
  '&:hover': {
    background: '#1B5E20',
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 16px ${alpha('#1B5E20', 0.3)}`,
  },
}));

const ScarcityBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  background: `linear-gradient(135deg, #E53935, #FF6F61)`,
  color: LIGHT_ACCENT,
  width: '160px',
  padding: '8px 16px',
  borderRadius: BORDER_RADIUS, 
  boxShadow: `0 8px 32px ${alpha(theme.palette.error.main, 0.3)}`,
  fontWeight: 700,
  fontSize: '0.875rem',
  whiteSpace: 'nowrap', 
  height: '36px',
  transition: 'all 0.3s ease', // Added transition for boxShadow
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 16px ${alpha(theme.palette.error.main, 0.3)}`,
  },
}));

const NavBar: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const seatsLeft = useSeatsLeft(5);

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Solutions', path: '/solutions', icon: <CodeIcon /> },
    { label: 'Resources', path: '/resources', icon: <BookIcon /> },
    { label: 'Pricing', path: '/pricing', icon: <LocalAtmIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
  ];

  const handleNavToggle = useCallback(() => setMobileOpen((prev) =>!prev),);
  const handleNavigate = useCallback((path: string) => {
    setMobileOpen(false);
    router.push(path);
  }, [router]);

  return (
    <>
      <LuxAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            minHeight: 100,
            justifyContent: 'space-around', // Distribute space around
            gap: 1, // Reduced gap for a tighter layout
            flexWrap: 'nowrap',
            position: 'relative'
          }}>
            <BrandContainer onClick={() => handleNavigate('/')}>
              <CodeIcon sx={{
                fontSize: 40,
                color: LIGHT_ACCENT,
                transform: 'rotate(45deg)',
              }} />
              <Box>
                <Typography variant="h1" sx={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  GLUStack
                </Typography>
                <LuxBadge>
                  <CodeIcon sx={{ fontSize: 14, mr: 1 }} />
                  ENGINEERED PRECISION
                </LuxBadge>
              </Box>
            </BrandContainer>

            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                flexShrink: 0,
                border: `1px solid ${alpha(LIGHT_ACCENT, 0.15)}`,
                borderRadius: BORDER_RADIUS,
                padding: theme.spacing(1),
                background: `linear-gradient(to right, ${alpha(PRIMARY_DARK, 0.4)}, ${alpha(SECONDARY_DARK, 0.4)})`, // Added gradient
                boxShadow: `0 2px 8px ${alpha(LIGHT_ACCENT, 0.1)}`, // Added shadow
              }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.path}
                    active={router.pathname === item.path}
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </Box>
            )}

            {!isMobile && (
              <Stack
                spacing={1}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  border: `1px solid ${alpha(LIGHT_ACCENT, 0.15)}`,
                  borderRadius: BORDER_RADIUS,
                  padding: theme.spacing(1),
                  background: alpha(PRIMARY_DARK, 0.3),
                  boxShadow: `0 2px 8px ${alpha(LIGHT_ACCENT, 0.1)}`, // Added shadow
                }}
              >
                <CTALuxButton 
                  onClick={() => router.push('/contact')}
                  sx={{
                    px: 2,
                    flexShrink: 0,
                    height: '36px', 
                    fontSize: '0.875rem', 
                    padding: '8px 16px',
                    width: '160px', 
                  }}
                >
                  Book Now
                </CTALuxButton>
                <PremiumBadge onClick={() => router.push('/contact?offer=cloudAssess')}>
                  <AssessmentIcon sx={{ fontSize: 14 }} />
                  Free Stack Review
                </PremiumBadge>
                
                <ScarcityBadge>
                  <WhatshotIcon sx={{ fontSize: 14 }} />
                  {seatsLeft} SLOTS LEFT
                </ScarcityBadge>
              </Stack>
            )}

            {isMobile && (
              <IconButton onClick={handleNavToggle} sx={{ color: LIGHT_ACCENT }}>
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </LuxAppBar>

      <Box 
        sx={{ 
          height: { 
            xs: '140px',  
            sm: '160px', 
            md: '180px'  
          } 
        }} 
      />

      <MobileNavPanel open={mobileOpen}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={handleNavToggle}
            sx={{ color: LIGHT_ACCENT }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            mt: -4,
            marginTop: theme.spacing(2),
          }}
        >
          <Stack direction="column" spacing={1} sx={{ width: "100%", mb: 2 }}>
            <PremiumBadge
              sx={{ justifyContent: "center", width: "100%" }}
            >
              <AssessmentIcon sx={{ fontSize: 14 }} />
              Free Cloud Assessment
            </PremiumBadge>

            <ScarcityBadge
              sx={{ justifyContent: "center", width: "100%" }}
            >
              <WhatshotIcon sx={{ fontSize: 14 }} />
              {seatsLeft} SLOTS LEFT
            </ScarcityBadge>
          </Stack>

          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                fontSize: "1.6rem",
                color: LIGHT_ACCENT,
                py: 3,
                "&:hover": { background: alpha(LIGHT_ACCENT, 0.05) },
              }}
            >
              {item.label}
            </Button>
          ))}

          <Divider sx={{ borderColor: alpha(LIGHT_ACCENT, 0.1), my: 3 }} />
        </Box>
      </MobileNavPanel>
    </>
  );
};

export default memo(NavBar);