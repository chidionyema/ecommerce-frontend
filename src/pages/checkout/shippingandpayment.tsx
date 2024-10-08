import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  CssBaseline,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  CircularProgress,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useBasket } from '../../context/BasketContext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { BasketItem } from '../../types/types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

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
  hidePostalCode: true,
};

const ShippingAndPaymentForm: React.FC = () => {
  const { state: basketState, dispatch: basketDispatch } = useBasket();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'GB', // Default to UK
  });

  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'GB', // Default to UK
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    address: false,
    city: false,
    state: false,
    zip: false,
    country: false,
  });

  const [loading, setLoading] = useState(false);

  const isDigitalOnly = useMemo(() => {
    return basketState.items.every((item: BasketItem) => item.type === 'digital');
  }, [basketState.items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.closest('.billing-info')) {
      setBillingInfo({ ...billingInfo, [name]: value });
    } else {
      setShippingInfo({ ...shippingInfo, [name]: value });
      if (sameAsShipping) {
        setBillingInfo({ ...shippingInfo, [name]: value });
      }
    }

    if (value.trim() === '') {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateInfo = (info: typeof shippingInfo): boolean => {
    const newErrors = {
      name: info.name.trim() === '',
      address: info.address.trim() === '',
      city: info.city.trim() === '',
      state: info.state.trim() === '',
      zip: info.zip.trim() === '',
      country: info.country.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isShippingValid = validateInfo(shippingInfo);
    const isBillingValid = sameAsShipping ? true : validateInfo(billingInfo);

    if (!isShippingValid || !isBillingValid) {
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/checkout/create-session', { items: basketState.items });
      const sessionId = response.data.id;
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
        billing_details: {
          name: billingInfo.name,
          address: {
            line1: billingInfo.address,
            city: billingInfo.city,
            state: billingInfo.state,
            postal_code: billingInfo.zip,
            country: billingInfo.country,
          },
        },
      });

      if (error) {
        console.error('Error creating payment method', error);
        setLoading(false);
        return;
      }

      const { error: stripeError } = await stripe.confirmCardPayment(sessionId, {
        payment_method: paymentMethod.id,
      });

      if (stripeError) {
        console.error('Error confirming card payment', stripeError);
        setLoading(false);
        return;
      }

      router.push('/checkout/thankyou');
    } catch (error) {
      console.error('Error creating checkout session', error);
      setLoading(false);
    }
  };

  const updateBasketQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      basketDispatch({ type: 'REMOVE_FROM_BASKET', id });
    } else {
      basketDispatch({ type: 'UPDATE_BASKET_QUANTITY', id, quantity });
    }
  }, [basketDispatch]);

  const removeAllQuantities = useCallback((id: string) => {
    basketDispatch({ type: 'REMOVE_ALL_QUANTITY', id });
  }, [basketDispatch]);

  const totalPrice = useMemo((): number => {
    return basketState.items.reduce((total: number, item: BasketItem) => total + item.price * item.quantity, 0);
  }, [basketState.items]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <CssBaseline />
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 2, backgroundColor: '#ffffff' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#2c3e50' }}>
          Checkout
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#34495e' }}>
              Shipping Details
            </Typography>
            <form className="shipping-info">
              <Grid container spacing={3}>
                {['name', 'address', 'city', 'state', 'zip', 'country'].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      required
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={shippingInfo[field as keyof typeof shippingInfo]}
                      onChange={handleInputChange}
                      error={errors[field as keyof typeof errors]}
                      helperText={errors[field as keyof typeof errors] && `${field.charAt(0).toUpperCase() + field.slice(1)} is required`}
                    />
                  </Grid>
                ))}
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sameAsShipping}
                    onChange={() => {
                      setSameAsShipping(!sameAsShipping);
                      if (!sameAsShipping) {
                        setBillingInfo(shippingInfo);
                      } else {
                        setBillingInfo({
                          name: '',
                          address: '',
                          city: '',
                          state: '',
                          zip: '',
                          country: 'GB',
                        });
                      }
                    }}
                    name="sameAsShipping"
                    color="primary"
                  />
                }
                label="Billing address is the same as shipping address"
                sx={{ mt: 2 }}
              />
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#34495e' }}>
              Billing Details
            </Typography>
            <form className="billing-info">
              <Grid container spacing={3}>
                {['name', 'address', 'city', 'state', 'zip', 'country'].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      required
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={sameAsShipping ? shippingInfo[field as keyof typeof shippingInfo] : billingInfo[field as keyof typeof billingInfo]}
                      onChange={handleInputChange}
                      error={errors[field as keyof typeof errors]}
                      helperText={errors[field as keyof typeof errors] && `${field.charAt(0).toUpperCase() + field.slice(1)} is required`}
                      disabled={sameAsShipping}
                    />
                  </Grid>
                ))}
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ color: '#34495e' }}>
              Payment Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  border: '1px solid #dcdcdc',
                  borderRadius: '4px',
                  padding: '16px',
                  mt: 2,
                }}
              >
                <CardElement options={cardElementOptions} />
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{
                  width: '100%',
                  mt: 3,
                  py: 1.5,
                  backgroundColor: '#3498db',
                  '&:hover': {
                    backgroundColor: '#2980b9',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Confirm Order'}
              </Button>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ color: '#34495e' }}>
              Shopping Basket
            </Typography>
            <List>
              {basketState.items.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  Your basket is empty
                </Typography>
              ) : (
                basketState.items.map((item: BasketItem) => (
                  <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="div"
                      sx={{ width: '100px', height: '100px', marginRight: '1rem', position: 'relative' }}
                    >
                      {/* Ensure item.images is defined and has at least one element */}
                      {item.images && item.images.length > 0 ? (
                        <Image
                          src={item.images[0]} // Safely access the first image if available
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
            <Box sx={{ padding: '1rem', textAlign: 'right' }}>
              <Typography variant="h6" sx={{ color: '#e74c3c' }}>
                Total: ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const ShippingAndPayment: React.FC = () => (
  <Elements stripe={stripePromise}>
    <ShippingAndPaymentForm />
  </Elements>
);

export default ShippingAndPayment;
