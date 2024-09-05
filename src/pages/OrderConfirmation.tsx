import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useBasket } from '../context/BasketContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderConfirmation: React.FC = () => {
  const { dispatch } = useBasket();
  const router = useRouter();

  const handleBackToShop = () => {
    dispatch({ type: 'INIT_BASKET', items: [] });
    router.push('/');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: '2rem' }}>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: '4rem' }} />
      <Typography variant="h4" gutterBottom sx={{ marginTop: '1rem' }}>
        Order Confirmation
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your order! Your order has been placed successfully.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackToShop}
        sx={{ marginTop: '2rem' }}
      >
        Back to Shop
      </Button>
    </Container>
  );
};

export default OrderConfirmation;
