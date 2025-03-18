import { useEffect, useState } from 'react';

/**
 * A React hook that detects if the user prefers reduced motion
 * based on their system preferences.
 * 
 * @returns {boolean} True if the user prefers reduced motion, false otherwise
 */
function usePrefersReducedMotion(): boolean {
  // Initialize with the current preference if available, otherwise default to false
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    // Check if window is defined (for SSR compatibility)
    if (typeof window === 'undefined') return false;
    
    // Check if the matchMedia API is available
    if (!window.matchMedia) return false;
    
    // Return true if the user prefers reduced motion
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    // Skip if window or matchMedia isn't available
    if (typeof window === 'undefined' || !window.matchMedia) return;

    // Create a media query list
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Update state when preference changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

// Named export
export { usePrefersReducedMotion };

// Default export as a fallback
export default usePrefersReducedMotion;