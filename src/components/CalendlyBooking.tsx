"use client";

import React, { useState, useEffect } from 'react';
import { PopupModal } from 'react-calendly';

interface CalendlyBookingProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyEventLink: string;
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
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // This effect runs once after the component mounts on the client-side
    if (typeof window !== 'undefined') {
      // Try to find common root elements, falling back to document.body
      const element = document.getElementById("__next") || document.getElementById("root") || document.body;
      if (element) {
        setRootElement(element);
      } else {
        // This should be a very rare case as document.body should always exist
        console.error("CalendlyBooking: Critical - Could not find a root element for the modal, including document.body. Modal may not function correctly.");
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // If the modal is not supposed to be open, or if the rootElement hasn't been determined yet,
  // don't render the PopupModal.
  if (!isOpen || !rootElement) {
    if (isOpen && typeof window !== 'undefined' && !rootElement) {
      // Log only if we are on the client and expecting to show the modal but rootElement isn't ready.
      // This state is expected briefly on initial load.
      console.log("CalendlyBooking: Modal is set to open, but rootElement is not yet available. Waiting for DOM to be ready.");
    }
    return null; // Or return a loader/placeholder if preferred
  }

  // At this point, isOpen is true AND rootElement is guaranteed to be an HTMLElement.
  console.log("CalendlyBooking: Rendering PopupModal. URL:", calendlyEventLink);

  const modalProps = {
    url: calendlyEventLink,
    onModalClose: onClose,
    open: isOpen, // Will be true here
    prefill: prefill,
    pageSettings: pageSettings,
    utm: utm,
    rootElement: rootElement, // rootElement is now guaranteed to be non-null
  };

  return <PopupModal {...modalProps} />;
};

export default CalendlyBooking;