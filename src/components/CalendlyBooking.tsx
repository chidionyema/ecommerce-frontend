import { useState, useEffect, useCallback } from 'react';
import { Box, Dialog, IconButton, CircularProgress } from '@mui/material';
import Close from '@mui/icons-material/Close';
import Script from 'next/script';

export interface CalendlyProps {
  eventTypeUrl: string;
  prefill?: {
    name?: string;
    email?: string;
  };
  isOpen?: boolean;
  onClose?: () => void;
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

// Named export for regular imports
export const CalendlyBooking = ({
  eventTypeUrl,
  prefill,
  isOpen = false,
  onClose
}: CalendlyProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const initCalendly = useCallback(() => {
    if (typeof window.Calendly !== 'undefined') {
      window.Calendly.initPopupWidget({
        url: `${eventTypeUrl}?${new URLSearchParams(prefill || {}).toString()}`
      });
      setIsLoading(false);
    }
  }, [eventTypeUrl, prefill]);

  useEffect(() => {
    if (isOpen) {
      initCalendly();
    } else if (typeof window.Calendly !== 'undefined') {
      window.Calendly.closePopupWidget();
    }
  }, [isOpen, initCalendly]);

  const handleClose = () => {
    if (typeof window.Calendly !== 'undefined') {
      window.Calendly.closePopupWidget();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://assets.calendly.com/assets/external/widget.js"
        onLoad={isOpen ? initCalendly : undefined}
      />
      
      {isOpen && isLoading && (
        <Dialog
          open={true}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress />
          </Box>
        </Dialog>
      )}
    </>
  );
};

// Default export for React.lazy compatibility
export default CalendlyBooking;