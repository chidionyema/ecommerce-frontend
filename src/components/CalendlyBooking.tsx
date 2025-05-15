// src/components/CalendlyBooking.tsx
"use client"; // If using Next.js App Router

import React from 'react';
import { PopupModal } from 'react-calendly';

interface CalendlyBookingProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyEventLink: string; // Your specific Calendly event link part, e.g., "your-username/30min"
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: { [key: string]: string };
  };
  pageSettings?: {
    backgroundColor?: string;
    hideEventTypeDetails?: boolean;
    hideLandingPageDetails?: boolean;
    primaryColor?: string;
    textColor?: string;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

const CalendlyBooking: React.FC<CalendlyBookingProps> = ({
  isOpen,
  onClose,
  calendlyEventLink,
  prefill,
  pageSettings,
  utm,
}) => {
  if (!isOpen) {
    return null;
  }

  // Construct the full Calendly URL
  const fullCalendlyUrl = `https://calendly.com/${calendlyEventLink}`;

  // Ensure rootElement is correctly identified. For Next.js, it's often '__next'.
  // For other React apps, it might be 'root' or another ID.
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    // Ensure this runs client-side only
    const element = document.getElementById("__next") || document.getElementById("root") || document.body;
    setRootElement(element);
  }, []);

  if (!rootElement) {
      // You might want a loader here or handle the case where rootElement is not found
      return null;
  }

  return (
    <PopupModal
      url={fullCalendlyUrl}
      onModalClose={onClose}
      open={isOpen}
      rootElement={rootElement}
      prefill={prefill}
      pageSettings={pageSettings}
      utm={utm}
    />
  );
};

export default CalendlyBooking;