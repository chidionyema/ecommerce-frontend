'use client';

import React, { memo, useState, useMemo, FC } from 'react';
import Link from 'next/link';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
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
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Menu, Close, Home, Book, Paid, Email } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { Cpu } from 'lucide-react';

// --- Styled Components ---
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.7),
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: 'all 0.2s ease',
}));

// --- Animation Variants ---
const mobileMenuVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { x: '100%', transition: { duration: 0.2 } }
};

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
          '&:hover': { opacity: 0.9 },
        }}
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
            },
          }}
        >
          GLU<span>Stack</span>
        </Typography>
      </Stack>
    </Link>
  );
});

// --- NavBar Component ---
interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const NavBar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: 'Solutions', path: '/solutions', icon: Home },
      { label: 'Resources', path: '/resources', icon: Book },
      { label: 'Pricing', path: '/pricing', icon: Paid },
      { label: 'Contact', path: '/contact', icon: Email },
    ],
    []
  );

  return (
    <LazyMotion features={domAnimation}>
      <StyledAppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              height: { xs: 64, md: 72 },
              justifyContent: 'space-between',
              px: { xs: 2, md: 3 },
            }}
          >
            <BrandLogo />

            {!isMobile ? (
              <Stack direction="row" gap={3} alignItems="center">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  const Icon = item.icon;

                  return (
                    <Button
                      key={item.path}
                      component={Link}
                      href={item.path}
                      sx={{
                        color: isActive
                          ? theme.palette.primary.main
                          : alpha(theme.palette.text.primary, 0.9),
                        fontWeight: isActive ? 700 : 500,
                        '&:hover': {
                          color: theme.palette.primary.main,
                          backgroundColor: 'transparent',
                        },
                        textTransform: 'none',
                        px: 1.5,
                        py: 0.75,
                        ...(isActive && {
                          borderBottom: `2px solid ${theme.palette.primary.main}`,
                        }),
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
                <Button
                  variant="contained"
                  sx={{
                    ml: 1,
                    px: 3,
                    py: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.9),
                    '&:hover': { 
                      bgcolor: theme.palette.primary.dark,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                    },
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            ) : (
              <IconButton
                edge="end"
                onClick={() => setMenuOpen(true)}
                sx={{ color: theme.palette.text.primary }}
              >
                <Menu fontSize="large" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1299,
              }}
              onClick={() => setMenuOpen(false)}
            />

            <m.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80%',
                maxWidth: 320,
                zIndex: 1300,
                backgroundColor: alpha(theme.palette.background.default, 0.95),
                backdropFilter: 'blur(12px)',
                padding: '24px',
                boxShadow: '-4px 0 16px rgba(0,0,0,0.3)',
                overflowY: 'auto',
              }}
            >
              <Box display="flex" justifyContent="flex-end" mb={3}>
                <IconButton
                  onClick={() => setMenuOpen(false)}
                  sx={{ color: theme.palette.text.primary }}
                >
                  <Close fontSize="large" />
                </IconButton>
              </Box>

              <Stack spacing={2}>
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.path}
                      component={Link}
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      startIcon={<Icon />}
                      sx={{
                        color: isActive
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                        justifyContent: 'flex-start',
                        fontSize: '1.1rem',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                        },
                        fontWeight: isActive ? 700 : 500,
                        borderRadius: 1,
                        py: 1,
                        pl: 2,
                        pr: 4,
                        ...(isActive && {
                          borderBottom: `2px solid ${theme.palette.primary.main}`,
                        }),
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
                <Divider sx={{ my: 1 }} />
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.9),
                    '&:hover': { 
                      bgcolor: theme.palette.primary.dark,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                    },
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default memo(NavBar);