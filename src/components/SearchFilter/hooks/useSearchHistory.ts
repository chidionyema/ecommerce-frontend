// src/components/SearchFilter/hooks/useSearchHistory.ts

import { useState, useEffect, useCallback } from 'react';
import { SearchHistoryItem } from '../types';

export const useSearchHistory = (
  limit: number = 5,
  persistenceKey: string = 'search_history'
) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  
  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(persistenceKey);
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, [persistenceKey]);
  
  // Save history to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(persistenceKey, JSON.stringify(searchHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, [searchHistory, persistenceKey]);
  
  // Add a new item to search history
  const addToSearchHistory = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      
      setSearchHistory(prev => {
        // Remove this query if it already exists
        const filtered = prev.filter(item => item.query.toLowerCase() !== query.toLowerCase());
        
        // Add new item at the beginning and limit total
        return [
          { query, timestamp: Date.now() },
          ...filtered
        ].slice(0, limit);
      });
    },
    [limit]
  );
  
  // Clear all history
  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    try {
      localStorage.removeItem(persistenceKey);
    } catch (error) {
      console.error('Error removing search history from storage:', error);
    }
  }, [persistenceKey]);
  
  // Retrieve an item
  const selectHistoryItem = useCallback(
    (item: SearchHistoryItem) => {
      // Move this item to the top of the list by "re-adding" it
      addToSearchHistory(item.query);
      return item.query;
    },
    [addToSearchHistory]
  );
  
  // Save a search with a name
  const saveSearch = useCallback(
    (query: string, name: string) => {
      try {
        const savedSearches = JSON.parse(localStorage.getItem('saved_searches') || '{}');
        savedSearches[name] = query;
        localStorage.setItem('saved_searches', JSON.stringify(savedSearches));
      } catch (error) {
        console.error('Error saving search:', error);
      }
    },
    []
  );
  
  // Get all saved searches
  const getSavedSearches = useCallback(
    () => {
      try {
        return JSON.parse(localStorage.getItem('saved_searches') || '{}');
      } catch (error) {
        console.error('Error getting saved searches:', error);
        return {};
      }
    },
    []
  );
  
  return {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    selectHistoryItem,
    saveSearch,
    getSavedSearches
  };
};