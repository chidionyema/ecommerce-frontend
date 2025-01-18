import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import axios from 'axios';

const SuccessPage = () => {
  const router = useRouter();
  const { orderId } = router.query; // Get orderId from query params
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (!orderId) {
      setError('Invalid or missing order information.');
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://api.local.ritualworks.com/api/orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Loading your order details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => router.push('/')}>
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4">Payment Successful!</Typography>
      <Typography mt={2}>Thank you for your order. Here are your details:</Typography>
      <Box mt={3}>
        <Typography>Order ID: {orderDetails?.id}</Typography>
        <Typography>Total Amount: ${orderDetails?.totalAmount.toFixed(2)}</Typography>
        <Typography>Status: {orderDetails?.status}</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={() => router.push('/')}>
        Continue Shopping
      </Button>
    </Box>
  );
};

export default SuccessPage;
