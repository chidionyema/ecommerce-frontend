 // components/CalendlyBooking.tsx
 'use client';  // Add this at the top
import { useState, useEffect, useCallback } from 'react';
import { Box, Dialog, IconButton, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import Script from 'next/script';

interface CalendlyProps {
  eventTypeUrl: string;
  prefill?: {
    name?: string;
    email?: string;
  };
}

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget: () => void;
      showPopupWidget: (url: string) => void;
    };
  }
}

export const CalendlyBooking = ({ eventTypeUrl, prefill }: CalendlyProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initCalendly = useCallback(() => {
    if (typeof window.Calendly !== 'undefined') {
      window.Calendly.initPopupWidget({
        url: `${eventTypeUrl}?${new URLSearchParams(prefill).toString()}`
      });
      setIsLoading(false);
    }
  }, [eventTypeUrl, prefill]);

  useEffect(() => {
    if (isOpen) {
      initCalendly();
    }
  }, [isOpen, initCalendly]);

  const handleClose = () => {
    window.Calendly?.closePopupWidget();
    setIsOpen(false);
  };

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://assets.calendly.com/assets/external/widget.js"
        onLoad={initCalendly}
      />
      
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { height: '90vh' } }}
      >
        <Box position="relative" height="100%">
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
          >
            <Close />
          </IconButton>
          
          {isLoading && (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          )}
          
          <Box
            id="calendly-inline-widget"
            sx={{
              height: '100%',
              minHeight: '700px',
              '.calendly-spinner': { display: 'none !important' }
            }}
          />
        </Box>
      </Dialog>
    </>
  );
};