import { useState, useCallback, memo, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ButtonProps,
  Container,
  alpha,
  IconButton,
  useMediaQuery,
  Stack,
  useTheme
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import { Menu, Close, Home, Book, Whatshot, ContactMail } from "@mui/icons-material";

// Theme imports
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  TECH_GRADIENT,
  BACKDROP_BLUR,
  BORDER_RADIUS,
  METALLIC_GRADIENT
} from "../theme/branding";

// Styled Components
const LuxAppBar = styled(AppBar)(({ theme }) => ({
  background: `
    linear-gradient(145deg, 
      ${alpha(PRIMARY_DARK, 0.98)}, 
      ${alpha(SECONDARY_DARK, 0.98)})
    padding-box,
    ${METALLIC_GRADIENT}
    border-box`,
  backdropFilter: `${BACKDROP_BLUR} saturate(300%)`, // Increased saturation
  border: `1.5px solid ${alpha(LIGHT_ACCENT, 0.2)}`, // Added border
  boxShadow: `0 24px 48px ${alpha(PRIMARY_DARK, 0.6)}`, // Darker shadow
  borderRadius: BORDER_RADIUS,
  margin: "16px auto",
  maxWidth: "1536px",
  position: "fixed",
  left: 0,
  right: 0,
  transform: "none",
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  "&:hover": {
    transform: "scale(1.005)",
    boxShadow: `0 32px 64px ${alpha(PRIMARY_DARK, 0.6)}`,
  },
  [theme.breakpoints.down("sm")]: {
    margin: "8px auto",
    width: "calc(100% - 16px)",
    borderRadius: `calc(${BORDER_RADIUS} * 0.75)`,
  },
}));

const BrandMark = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: BORDER_RADIUS,
  background: `
    linear-gradient(145deg, 
      ${alpha(PRIMARY_DARK, 0.8)}, 
      ${alpha(SECONDARY_DARK, 0.6)})
    padding-box,
    ${METALLIC_GRADIENT}
    border-box`,
  border: `1.5px solid transparent`,
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: `0 8px 32px ${alpha(LIGHT_ACCENT, 0.3)}`,
    "& svg": {
      filter: "drop-shadow(0 2px 8px rgba(255,255,255,0.4))",
    }
  },
}));

const NavItem = styled(motion(Button))<ButtonProps & { active: boolean }>(({ active, theme }) => ({
  position: "relative",
  color: active ? LIGHT_ACCENT : alpha("#FFFFFF", 0.85),
  fontWeight: 600,
  fontSize: "1rem",
  letterSpacing: "1px",
  padding: "8px 20px",
  borderRadius: BORDER_RADIUS,
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: active ? alpha(LIGHT_ACCENT, 0.1) : "transparent",
    borderRadius: BORDER_RADIUS,
    zIndex: 0,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: active ? "80%" : "0%",
    height: "2px",
    background: TECH_GRADIENT,
    transform: "translateX(-50%)",
    transition: "width 0.3s ease",
  },
  "&:hover": {
    color: LIGHT_ACCENT,
    "&::before": {
      background: alpha(LIGHT_ACCENT, 0.1),
    },
    "&::after": {
      width: "60%",
    },
  },
  "& .MuiButton-startIcon": {
    transition: "transform 0.3s ease",
  },
  "&:hover .MuiButton-startIcon": {
    transform: "rotate(-15deg)",
  },
}));

const MobileMenu = styled(motion(Box))(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "min(100vw, 400px)",
  backdropFilter: `${BACKDROP_BLUR} saturate(180%)`,
  background: alpha(PRIMARY_DARK, 0.98),
  zIndex: 2000,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: `-16px 0 48px ${alpha(PRIMARY_DARK, 0.8)}`,
}));

const NavBar = memo(() => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const elevation = useTransform(scrollY, [0, 100], [0, 1], { clamp: true });

  const navItems = useMemo(() => [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Solutions", path: "/solutions", icon: <CodeIcon /> },
    { label: "Resources", path: "/resources", icon: <Book /> },
    { label: "Pricing", path: "/pricing", icon: <Whatshot /> },
    { label: "Contact", path: "/contact", icon: <ContactMail /> },
  ], []);

  const isActive = (path: string) => {
    return router.asPath === path || router.asPath.startsWith(`${path}/`);
  };

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  }, [menuOpen]);

  return (
    <>
      <LuxAppBar style={{ scale: elevation }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Link href="/" passHref legacyBehavior>
              <BrandMark component="a">
                <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring" }}>
                  <CodeIcon sx={{ 
                    fontSize: 42, 
                    color: LIGHT_ACCENT,
                    filter: "drop-shadow(0 2px 4px rgba(255,255,255,0.2))"
                  }} />
                </motion.div>
                <Box>
                  <Typography variant="h1" sx={{ 
                    fontSize: "2.2rem", 
                    fontWeight: 800,
                    background: TECH_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.5px",
                  }}>
                    GLUStack
                    <Box component="span" sx={{ 
                      fontSize: "0.6em", 
                      ml: 1, 
                      fontWeight: 700, 
                      color: LIGHT_ACCENT,
                      textShadow: `0 2px 8px ${alpha(LIGHT_ACCENT, 0.4)}`
                    }}>
                      PRO
                    </Box>
                  </Typography>
                </Box>
              </BrandMark>
            </Link>

            {!isMobile && (
              <Stack direction="row" spacing={2} alignItems="center">
                {navItems.map((item) => (
                  <Link href={item.path} key={item.path} passHref legacyBehavior>
                    <NavItem 
                      component="a" 
                      active={isActive(item.path)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      startIcon={<motion.span>{item.icon}</motion.span>}
                    >
                      {item.label}
                    </NavItem>
                  </Link>
                ))}
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                    background: TECH_GRADIENT,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    borderRadius: BORDER_RADIUS,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: `0 8px 24px ${alpha(LIGHT_ACCENT, 0.2)}`,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background: alpha("#fff", 0.1),
                      }
                    }
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            )}

            {isMobile && (
              <IconButton 
                onClick={toggleMenu} 
                sx={{ color: LIGHT_ACCENT }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <motion.div
                  animate={menuOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 90 },
                    closed: { rotate: 0 },
                  }}
                >
                  <Menu fontSize="large" />
                </motion.div>
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </LuxAppBar>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <IconButton 
              onClick={toggleMenu} 
              sx={{ 
                position: "absolute", 
                top: 24, 
                right: 24, 
                color: LIGHT_ACCENT,
              }}
              aria-label="Close menu"
            >
              <motion.div whileHover={{ rotate: 90 }}>
                <Close fontSize="large" />
              </motion.div>
            </IconButton>
            <Stack spacing={4} sx={{ width: "100%", textAlign: "center" }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.path} passHref legacyBehavior>
                    <NavItem 
                      component="a" 
                      onClick={toggleMenu}
                      active={isActive(item.path)}
                      sx={{ 
                        fontSize: "1.5rem", 
                        py: 2,
                        width: "100%",
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </NavItem>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: TECH_GRADIENT,
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    py: 2,
                    borderRadius: BORDER_RADIUS,
                    "&:hover": {
                      transform: "scale(1.02)",
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </Stack>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
});

export default NavBar;