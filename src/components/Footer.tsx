import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ py: 3, textAlign: 'center', backgroundColor: '#333', color: '#FFF' }}>
            <Typography variant="body2" component="p">
                &copy; {new Date().getFullYear()} GluStack. All rights reserved.
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>Privacy Policy</Link>
                <Link href="/terms" color="inherit" sx={{ mx: 1 }}>Terms of Service</Link>
            </Box>
        </Box>
    );
};

export default Footer;
