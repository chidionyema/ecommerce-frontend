// hooks/useServiceStatus.ts
import { useState, useEffect, useRef } from 'react';

type ServiceStatus = 'ok' | 'degraded' | 'down';

export function useServiceStatus(endpoint: string) {
  const [status, setStatus] = useState<ServiceStatus>('ok');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef<boolean>(true);
  
  // Track failed endpoints to avoid hammering them
  const failedRef = useRef<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    
    // One-time check function that respects the failed state
    const checkOnce = async () => {
      if (failedRef.current) return; // Skip if already failed
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        if (isMountedRef.current) {
          setStatus(response.ok ? 'ok' : 'degraded');
          setLastChecked(new Date());
        }
      } catch (error) {
        // Mark as failed to prevent retries
        failedRef.current = true;
        if (isMountedRef.current) {
          setStatus('down');
          setLastChecked(new Date());
        }
      }
    };
    
    // Initial check
    checkOnce();
    
    // Only set up interval if in production
    if (process.env.NODE_ENV === 'production') {
      intervalRef.current = setInterval(checkOnce, 30000);
    }
    
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [endpoint]);

  return { status, lastChecked };
}