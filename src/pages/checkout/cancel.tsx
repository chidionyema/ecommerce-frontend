import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';

const Cancel: React.FC = () => {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <Box sx={{ padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Payment Canceled
            </Typography>
            <Typography variant="body1" gutterBottom>
                Your payment was canceled. You can try again.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBackToHome}>
                Back to Home
            </Button>
        </Box>
    );
};

export default Cancel;
