import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  useMediaQuery,
  Container,
  Drawer,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  ArrowForward,
} from '@mui/icons-material';
import { createTheme, ThemeProvider, useTheme, styled, Theme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeItem, clearCart } from '../store/cartSlice';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// --- Styled Components ---
const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}80, ${theme.palette.primary.main}40)`,
  color: theme.palette.text.primary,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
}));

const StyledToolbar = styled(Toolbar)(({ theme }: { theme: Theme }) => ({
  minHeight: 90,
  padding: theme.spacing(0, 3),
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
}));

const LogoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: theme.spacing(4),
  marginLeft: theme.spacing(18), // Keep the logo position unchanged
  '& img': {
    height: '50px',
    marginRight: theme.spacing(1),
  },
  '& .logo-text': {
    fontWeight: 800,
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.text.primary,
    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
  },
}));

const DesktopNav = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  gap: theme.spacing(4), // Space between menu items
  alignItems: 'center',
  marginLeft: theme.spacing(18), // Increased margin to shift menu items to the right
}));

const StyledNavButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: 600,
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.shape.borderRadius,
  },
}));

const StyledCartItem = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CartDrawer = styled(Drawer)(({ theme }: { theme: Theme }) => ({
  '& .MuiDrawer-paper': {
    width: '400px',
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  },
}));

const StyledBanner = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.secondary.main}80, ${theme.palette.secondary.main}40)`,
  color: theme.palette.text.primary,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  fontSize: '0.95rem',
  fontWeight: 600,
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
}));

const getStripe = (): Promise<Stripe | null> => {
  return loadStripe('pk_test_u2QCN9D3ihcc18VM37nooAXC'); 
};

const NavBar: React.FC = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCartDrawerToggle = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Resources', path: '/resources' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleCheckout = async () => {
    try {
      const checkoutItems = cartItems.map((item) => ({
        ProductId: item.productid,
        Quantity: item.quantity,
        UnitPrice: item.unitPrice,
        Name: item.name,
      }));

      // Make API request to start checkout
      const response = await fetch('https://api.local.ritualworks.com/api/checkout/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: checkoutItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Checkout failed.');
      }

      const { sessionId, orderId } = await response.json();

      const stripe = await getStripe();

      if (!stripe) {
        console.error('Stripe failed to initialize.');
        alert('Stripe is not available. Please try again later.');
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId, 
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        alert('Error: ' + error.message);
      } else {
        dispatch(clearCart());
        router.push(`/checkout/success?orderId=${orderId}`);
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert('Error initiating checkout. Please try again later.' + error.message);
    }
  };

  const CartDrawerContent = (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Your Cart</Typography>
        <IconButton onClick={handleCartDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {cartItems.length === 0 ? (
        <Typography align="center" mt={2}>
          Your cart is empty.
        </Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item.productid}>
              <StyledCartItem>
                <Box>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2">
                    ${item.unitPrice.toFixed(2)} x {item.quantity}
                  </Typography>
                </Box>
                <IconButton onClick={() => dispatch(removeItem(item.productid))}>
                  <DeleteIcon />
                </IconButton>
              </StyledCartItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}

      {cartItems.length > 0 && (
        <>
          <Box mt={2} display="flex" justifyContent="space-around">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForward />}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#6a11cb' },
          secondary: { main: '#ff758c' },
          text: { primary: '#fff', secondary: '#000' },
        },
        typography: { fontFamily: 'Poppins, Arial, sans-serif' },
      })}
    >
      <StyledAppBar position="sticky">
        <StyledBanner>
          Get expert insights and a personalized strategy with a free consultation. No obligation, just valuable advice. Book your free session now!
        </StyledBanner>
        <Container maxWidth="xl">
          <StyledToolbar>
            <LogoContainer onClick={() => router.push('/')}>
              <Typography variant="h4" className="logo-text">
                GluStack
              </Typography>
            </LogoContainer>
            {!isMobile ? (
              <DesktopNav>
                {navItems.map(({ label, path }) => (
                  <StyledNavButton key={label} onClick={() => router.push(path)}>
                    {label}
                  </StyledNavButton>
                ))}
              </DesktopNav>
            ) : (
              <IconButton onClick={handleDrawerToggle} color="inherit">
                <MenuIcon />
              </IconButton>
            )}
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} 
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            GluStack
          </Typography>
          <Divider />
          <List>
            {navItems.map(({ label, path }) => (
              <Link href={path} key={label} passHref>
                <ListItem button component="a">
                  {label}
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer anchor="right" open={cartDrawerOpen} onClose={handleCartDrawerToggle}>
        {CartDrawerContent}
      </CartDrawer>
    </ThemeProvider>
  );
};

export default NavBar;