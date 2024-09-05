import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';

const Success: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const { session_id } = router.query;
        if (session_id) {
            // Optionally fetch the session details or confirm order processing
            console.log(`Payment succeeded for session ID: ${session_id}`);
        }
    }, [router.query]);

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <Box sx={{ padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Payment Successful
            </Typography>
            <Typography variant="body1" gutterBottom>
                Thank you for your purchase!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBackToHome}>
                Back to Home
            </Button>
        </Box>
    );
};

export default Success;
