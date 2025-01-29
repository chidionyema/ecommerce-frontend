import { useState, useCallback, memo } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
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
      ${alpha(PRIMARY_DARK, 0.96)}, 
      ${alpha(SECONDARY_DARK, 0.96)})
    padding-box,
    ${METALLIC_GRADIENT}
    border-box`,
  backdropFilter: `${BACKDROP_BLUR} saturate(200%)`,
  border: `1.5px solid transparent`,
  boxShadow: `0 24px 48px ${alpha(PRIMARY_DARK, 0.4)}`,
  borderRadius: BORDER_RADIUS,
  margin: "16px auto",
  maxWidth: "1536px",
  position: "fixed",
  left: 0,
  right: 0,
  transform: "none",
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  "&:hover": {
    boxShadow: `0 32px 64px ${alpha(PRIMARY_DARK, 0.6)}`,
  },
  [theme.breakpoints.down("sm")]: {
    margin: "8px auto",
    width: "calc(100% - 16px)",
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
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 8px 32px ${alpha(LIGHT_ACCENT, 0.2)}`,
  },
}));

const NavItem = styled(motion(Button))<ButtonProps & { active: boolean }>(({ active }) => ({
  position: "relative",
  color: active ? LIGHT_ACCENT : alpha("#FFFFFF", 0.85),
  fontWeight: 600,
  fontSize: "1rem",
  letterSpacing: "1px",
  padding: "8px 16px",
  borderRadius: BORDER_RADIUS,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: active ? "80%" : "0%",
    height: "2px",
    background: METALLIC_GRADIENT,
    transform: "translateX(-50%)",
    transition: "width 0.3s ease",
  },
  "&:hover": {
    color: LIGHT_ACCENT,
    background: alpha(LIGHT_ACCENT, 0.1),
    "&:before": {
      width: "60%",
    },
  },
}));

const CTAButton = styled(motion(Button))<ButtonProps>(() => ({
  padding: "12px 24px",
  fontSize: "0.875rem",
  fontWeight: 700,
  letterSpacing: "1px",
  borderRadius: BORDER_RADIUS,
  position: "relative",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const MobileMenu = styled(motion(Box))(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backdropFilter: `${BACKDROP_BLUR} saturate(180%)`,
  background: alpha(PRIMARY_DARK, 0.97),
  zIndex: 2000,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const NavBar = memo(() => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Solutions", path: "/solutions", icon: <CodeIcon /> },
    { label: "Resources", path: "/resources", icon: <Book /> },
    { label: "Pricing", path: "/pricing", icon: <Whatshot /> },
    { label: "Contact", path: "/contact", icon: <ContactMail /> },
  ];

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  }, [menuOpen]);

  return (
    <>
      <LuxAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link href="/" passHref legacyBehavior>
              <BrandMark component="a">
                <CodeIcon sx={{ fontSize: 42, color: LIGHT_ACCENT }} />
                <Box>
                  <Typography variant="h1" sx={{ fontSize: "2.2rem", fontWeight: 800 }}>
                    GLUStack
                    <Box component="span" sx={{ fontSize: "0.6em", ml: 1, fontWeight: 700, color: LIGHT_ACCENT }}>
                      PRO
                    </Box>
                  </Typography>
                </Box>
              </BrandMark>
            </Link>

            {!isMobile && (
              <Stack direction="row" spacing={3}>
                {navItems.map((item) => (
                  <Link href={item.path} key={item.path} passHref legacyBehavior>
                    <NavItem component="a" active={router.pathname === item.path}>
                      {item.icon}
                      {item.label}
                    </NavItem>
                  </Link>
                ))}
              </Stack>
            )}

            {isMobile && (
              <IconButton onClick={toggleMenu} sx={{ color: LIGHT_ACCENT }}>
                <Menu fontSize="large" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </LuxAppBar>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}>
            <IconButton onClick={toggleMenu} sx={{ position: "absolute", top: 24, right: 24, color: LIGHT_ACCENT }}>
              <Close fontSize="large" />
            </IconButton>
            <Stack spacing={3}>
            // In the MobileMenu section, update the NavItem usage:
                  {navItems.map((item) => (
                    <Link href={item.path} key={item.path} passHref legacyBehavior>
                      <NavItem 
                        component="a" 
                        onClick={toggleMenu}
                        active={router.pathname === item.path} // Add this line
                      >
                        {item.icon}
                        {item.label}
                      </NavItem>
                    </Link>
                
              ))}
            </Stack>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
});

export default NavBar;
