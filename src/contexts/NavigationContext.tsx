import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
  startNavigation: () => void;
  endNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  startNavigation: () => {},
  endNavigation: () => {},
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset navigation state when the route changes
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  // Provide methods to manually control navigation state
  const startNavigation = () => setIsNavigating(true);
  const endNavigation = () => setIsNavigating(false);

  // Add a global click event listener to detect navigation starts
  useEffect(() => {
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
    <NavigationContext.Provider value={{ isNavigating, startNavigation, endNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);