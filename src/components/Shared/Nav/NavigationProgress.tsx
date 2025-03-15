import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LinearProgress } from '@mui/material';

export const NavigationProgress = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Track navigation changes with pathname and searchParams
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);
  
  // Set up a way to trigger navigation start
  // This is a simplified version since Next.js 15 doesn't have router.events
  // You might need to integrate this with your NavigationContext
  useEffect(() => {
    // Listen to Next.js navigation start events
    // In a real app, you would need to use your context or other state management
    const handleBeforeNavigate = () => {
      setIsNavigating(true);
    };

    // You could add a click listener to capture link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && 
          link.getAttribute('href') && 
          !link.getAttribute('href')?.startsWith('http') && 
          !link.getAttribute('target')) {
        setIsNavigating(true);
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <LinearProgress
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        visibility: isNavigating ? 'visible' : 'hidden',
        zIndex: 9999,
        backgroundColor: 'transparent',
        '& .MuiLinearProgress-bar': {
          transition: 'transform 0.4s linear',
        },
      }}
    />
  );
};