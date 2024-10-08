import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  CssBaseline,
} from '@mui/material';
import { useBasket } from '../context/BasketContext';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { styled } from '@mui/system';
import { BasketItem, BasketState } from '../types/types';

const stripePromise = loadStripe('your-publishable-key-here');

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      iconColor: '#c4f0ff',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const CustomCardElement = styled(CardElement)({
  padding: '16px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
  marginBottom: '16px',
});

const CheckoutForm: React.FC = () => {
  const { state: basketState, dispatch: basketDispatch } = useBasket() as { state: BasketState; dispatch: React.Dispatch<any> };
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestInfo({ ...guestInfo, [name]: value });
  };

  const handleGuestCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
      billing_details: {
        name: guestInfo.name,
        email: guestInfo.email,
        address: {
          line1: guestInfo.address,
          city: guestInfo.city,
          postal_code: guestInfo.zip,
        },
      },
    });

    if (error) {
      console.error('Error creating payment method:', error);
      setLoading(false);
      return;
    }

    // Implement your order creation logic here
    console.log('Guest info:', guestInfo);
    console.log('Basket items:', basketState.items);
    console.log('Payment method:', paymentMethod);

    // Redirect to a thank you page or order summary
    setLoading(false);
    router.push('/checkout/thankyou');
  };

  const updateBasketQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      basketDispatch({ type: 'REMOVE_FROM_BASKET', id });
    } else {
      basketDispatch({ type: 'UPDATE_BASKET_QUANTITY', id, quantity });
    }
  };

  const removeAllQuantities = (id: string) => {
    basketDispatch({ type: 'REMOVE_ALL_QUANTITY', id });
  };

  const totalPrice = useMemo(() => {
    return basketState.items.reduce((total: number, item: BasketItem) => total + item.price * item.quantity, 0);
  }, [basketState.items]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <CssBaseline />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Box component="form" onSubmit={handleGuestCheckout}>
              <Typography variant="h4" gutterBottom>
                Guest Checkout
              </Typography>
              <CustomCardElement options={cardElementOptions} />
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                value={guestInfo.name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={guestInfo.email}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={guestInfo.address}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={guestInfo.city}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                label="ZIP Code"
                name="zip"
                value={guestInfo.zip}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={!stripe || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Place Order'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" gutterBottom>
              Shopping Basket
            </Typography>
            <List>
              {basketState.items.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  Your basket is empty
                </Typography>
              ) : (
                basketState.items.map((item) => (
                  <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="div"
                      sx={{ width: '100px', height: '100px', marginRight: '1rem', position: 'relative' }}
                    >
                      {/* Ensure the item.images array is defined and has at least one element */}
                      {item.images && item.images.length > 0 ? (
                        <Image
                          src={item.images[0]} // Safe access to the first image
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          sizes="(max-width: 600px) 100px, (max-width: 960px) 100px, 100px"
                          loading="lazy"
                          aria-hidden="true"
                        />
                      ) : (
                        <Image
                          src="/placeholder.png" // Fallback image if item.images is undefined or empty
                          alt="Placeholder"
                          layout="fill"
                          objectFit="cover"
                          sizes="(max-width: 600px) 100px, (max-width: 960px) 100px, 100px"
                          loading="lazy"
                          aria-hidden="true"
                        />
                      )}
                    </Box>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                          <Typography variant="body2">Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
                        </Box>
                      }
                    />
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => updateBasketQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton onClick={() => updateBasketQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Tooltip title="Remove all quantities">
                      <IconButton edge="end" aria-label="Remove from basket" onClick={() => removeAllQuantities(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                ))
              )}
            </List>
            <Divider />
            <Box sx={{ padding: '1rem' }}>
              <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const GuestCheckout: React.FC = () => (
  <Elements stripe={stripePromise}>
    <Container maxWidth="lg">
      <CheckoutForm />
    </Container>
  </Elements>
);

export default GuestCheckout;
