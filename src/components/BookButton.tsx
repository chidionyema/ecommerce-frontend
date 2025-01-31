// components/BookButton.tsx
import { Button } from '@mui/material';
import { useCalendly } from '../hooks/useCalendly';
import { CalendlyBooking } from './CalendlyBooking';

const EVENT_TYPES = {
  consultation: 'https://calendly.com/your-link/consultation',
  demo: 'https://calendly.com/your-link/demo'
};

export const BookButton = () => {
  const { openBooking, isBookingOpen, currentEventType } = useCalendly();

  return (
    <>
      <Button 
        variant="contained" 
        onClick={() => openBooking(EVENT_TYPES.consultation)}
      >
        Book Consultation
      </Button>

      <Button 
        variant="outlined" 
        onClick={() => openBooking(EVENT_TYPES.demo)}
      >
        Schedule Demo
      </Button>

      <CalendlyBooking
        eventTypeUrl={currentEventType || ''}
        isOpen={isBookingOpen}
        prefill={{
          name: 'John Doe',
          email: 'john@example.com'
        }}
      />
    </>
  );
};