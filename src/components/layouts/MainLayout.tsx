import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  IconButton, 
  Badge, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useMediaQuery, 
  useTheme, 
  Divider, 
  alpha 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ShoppingCart as ShoppingCartIcon, 
  AccountCircle, 
  Favorite, 
  Search, 
  ArrowUpward 
} from '@mui/icons-material';
import Footer from '../Footer';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'GLUStack E-Commerce',
  description = 'Premium e-commerce platform with high-quality products',
  keywords = 'e-commerce, online shopping, premium products',
  ogImage = '/images/og-image.jpg',
  noIndex = false,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  
  // Navigation items
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/store/products' },
    { label: 'Categories', path: '/store/categories' },
    { label: 'Deals', path: '/store/deals' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];
  
  // Handle scroll events
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        color: 'white' 
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          GLUStack Store
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.label} 
            component={Link}
            href={item.path}
            selected={router.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }
            }}
          >
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ fontWeight: router.pathname === item.path ? 'bold' : 'normal' }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} href="/account/login">
          <ListItemText primary="Sign In" />
        </ListItem>
        <ListItem button component={Link} href="/account/register">
          <ListItemText primary="Register" />
        </ListItem>
      </List>
    </Box>
  );
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yoursite.com${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* AppBar */}
        <AppBar 
          position="sticky" 
          elevation={scrolled ? 4 : 0}
          sx={{
            backgroundColor: scrolled 
              ? theme.palette.mode === 'dark' 
                ? alpha(theme.palette.background.paper, 0.9) 
                : alpha(theme.palette.background.paper, 0.9)
              : theme.palette.mode === 'dark'
                ? theme.palette.background.paper
                : theme.palette.background.paper,
            color: theme.palette.text.primary,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Mobile menu icon */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              {/* Logo */}
              <Typography
                variant="h6"
                component={Link}
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  flexGrow: { xs: 1, md: 0 }
                }}
              >
                GLUStack
              </Typography>
              
              {/* Desktop navigation */}
              {!isMobile && (
                <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      component={Link}
                      href={item.path}
                      sx={{
                        my: 2,
                        mx: 1,
                        color: 'inherit',
                        display: 'block',
                        fontWeight: router.pathname === item.path ? 'bold' : 'normal',
                        position: 'relative',
                        '&::after': router.pathname === item.path ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 10,
                          left: '20%',
                          width: '60%',
                          height: '3px',
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: '1.5px'
                        } : {}
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              )}
              
              {/* Action icons */}
              <Box sx={{ display: 'flex' }}>
                <IconButton color="inherit" aria-label="search">
                  <Search />
                </IconButton>
                <IconButton color="inherit" aria-label="favorites">
                  <Badge badgeContent={4} color="error">
                    <Favorite />
                  </Badge>
                </IconButton>
                <IconButton 
                  color="inherit" 
                  aria-label="shopping cart"
                  component={Link}
                  href="/store/cart"
                >
                  <Badge badgeContent={3} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton 
                  color="inherit" 
                  aria-label="account"
                  component={Link}
                  href="/account/profile"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        
        {/* Mobile navigation drawer */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 250 
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        
        {/* Footer */}
        <Footer />
        
        {/* Scroll to top button */}
        {showScrollTop && (
          <IconButton
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              zIndex: 999,
              boxShadow: theme.shadows[4],
            }}
          >
            <ArrowUpward />
          </IconButton>
        )}
      </Box>
    </>
  );
};

export default MainLayout;