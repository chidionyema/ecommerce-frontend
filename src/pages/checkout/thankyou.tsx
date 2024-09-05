// src/pages/checkout/thankyou.tsx

import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useRouter } from 'next/router';

const ThankYouPage: React.FC = () => {
    const router = useRouter();

    const handleContinueShopping = () => {
        router.push('/');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Thank You for Your Order!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Your order has been placed successfully. You will receive a confirmation email shortly.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleContinueShopping}>
                    Continue Shopping
                </Button>
            </Box>
        </Container>
    );
};

export default ThankYouPage;
