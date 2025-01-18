import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const CookieBanner = styled(Box)(({ theme }) => ({
  position: 'fixed', // Keeps the banner at the bottom
  bottom: 0,         // Anchors it to the bottom of the viewport
  left: 0,
  width: '100%',     // Full width of the page
  
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    isVisible && (
      <CookieBanner>
        <Typography variant="body2">
          This website uses cookies to ensure you get the best experience on our website.{' '}
          <Link href="/privacy-policy" color="primary" underline="hover">
            Learn more
          </Link>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAccept}>
          Accept
        </Button>
      </CookieBanner>
    )
  );
};

export default CookieConsent;
