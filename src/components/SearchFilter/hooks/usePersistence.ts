// src/components/SearchFilter/hooks/usePersistence.ts

import { useState, useEffect, useCallback } from 'react';
import { PersistedState } from '../types';

/**
 * Hook for persisting and retrieving search filter state to/from localStorage
 */
export const usePersistence = (
  key: string = 'search_filter_state',
  enabled: boolean = false
) => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Save state to localStorage
  const saveState = useCallback(
    (state: PersistedState) => {
      if (!enabled) return;
      
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error('Error saving search filter state:', error);
      }
    },
    [key, enabled]
  );
  
  // Load state from localStorage
  const loadState = useCallback((): PersistedState | null => {
    if (!enabled) return null;
    
    try {
      const storedState = localStorage.getItem(key);
      if (!storedState) return null;
      
      return JSON.parse(storedState);
    } catch (error) {
      console.error('Error loading search filter state:', error);
      return null;
    }
  }, [key, enabled]);
  
  // Clear state from localStorage
  const clearState = useCallback(() => {
    if (!enabled) return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing search filter state:', error);
    }
  }, [key, enabled]);
  
  // Initialize the hook
  useEffect(() => {
    setIsInitialized(true);
  }, []);
  
  return {
    saveState,
    loadState,
    clearState,
    isInitialized
  };
};