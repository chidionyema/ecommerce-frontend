// context/BookingContext.tsx
import { createContext, useContext, useState } from 'react';

interface BookingContextType {
  openCalendly: (eventType: string) => void;
  closeCalendly: () => void;
  selectedEventType: string | null;
}

const BookingContext = createContext<BookingContextType>({
  openCalendly: () => {},
  closeCalendly: () => {},
  selectedEventType: null
});

export const BookingProvider = ({ children }) => {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);

  const openCalendly = (eventType: string) => setSelectedEventType(eventType);
  const closeCalendly = () => setSelectedEventType(null);

  return (
    <BookingContext.Provider value={{ openCalendly, closeCalendly, selectedEventType }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);