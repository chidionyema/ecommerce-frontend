// src/components/SearchFilter/hooks/useFilters.ts

import { useState, useEffect, useCallback, useMemo } from 'react';
import { FilterGroup } from '../types';

// Define local filter selection type
type FilterSelectionType = 'multi' | 'single' | 'range' | 'advanced' | 'text';

export const useFilters = (
  initialFilters: Record<string, any> = {},
  filterGroups: FilterGroup[] = [],
  onFilter?: (filters: Record<string, any>) => void,
  liveFiltering = false
) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>(initialFilters);
  const [pendingFilters, setPendingFilters] = useState<Record<string, any>>(initialFilters);
  
  // Reset pending filters when active filters change or filterGroups change
  useEffect(() => {
    setPendingFilters(activeFilters);
  }, [activeFilters, filterGroups]);
  
  // Check if there are pending changes
  const hasPendingChanges = useMemo(() => {
    return JSON.stringify(pendingFilters) !== JSON.stringify(activeFilters);
  }, [pendingFilters, activeFilters]);
  
  // Handle filter change
  const handleFilterChange = useCallback((
    group: string,
    filter: string,
    value: any,
    type: FilterSelectionType
  ) => {
    setPendingFilters(prev => {
      const newFilters = { ...prev };
      
      // Handle different filter types
      if (type === 'multi') {
        // For checkbox/multi-select filters
        if (!newFilters[group]) {
          newFilters[group] = [];
        }
        
        if (Array.isArray(newFilters[group])) {
          if (value) {
            // Add the option if not already present
            if (!newFilters[group].includes(filter)) {
              newFilters[group] = [...newFilters[group], filter];
            }
          } else {
            // Remove the option
            newFilters[group] = newFilters[group].filter((f: string) => f !== filter);
            // Clean up empty arrays
            if (newFilters[group].length === 0) {
              delete newFilters[group];
            }
          }
        } else {
          // Initialize as array if it wasn't before
          newFilters[group] = value ? [filter] : [];
        }
      } else if (type === 'single') {
        // For radio/single-select filters
        if (value) {
          newFilters[group] = filter;
        } else {
          delete newFilters[group];
        }
      } else if (type === 'range') {
        // For range filters
        if (!newFilters[group]) {
          newFilters[group] = {};
        }
        
        newFilters[group] = {
          ...newFilters[group],
          ...value
        };
        
        // Clean up empty range filters
        if (Object.keys(newFilters[group]).length === 0) {
          delete newFilters[group];
        }
      } else if (type === 'advanced') {
        // For advanced options - handle as nested object
        if (!newFilters[group]) {
          newFilters[group] = {};
        }
        
        newFilters[group] = {
          ...newFilters[group],
          [filter]: value
        };
        
        // Clean up if value is false/empty
        if (value === false || value === null || value === undefined || value === '') {
          delete newFilters[group][filter];
        }
        
        // Clean up empty objects
        if (Object.keys(newFilters[group]).length === 0) {
          delete newFilters[group];
        }
      } else {
        // For other filter types
        if (value === null || value === undefined || value === '') {
          delete newFilters[group];
        } else {
          newFilters[group] = value;
        }
      }
      
      return newFilters;
    });
    
    // If live filtering is enabled, apply changes immediately
    if (liveFiltering) {
      // This is handled in the parent component
    }
  }, [liveFiltering]);
  
  // Apply pending filters
  const handleApplyFilters = useCallback(() => {
    // Clean up empty values for a cleaner filter state
    const cleanedFilters = { ...pendingFilters };
    Object.entries(cleanedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length === 0) {
        delete cleanedFilters[key];
      } else if (value === undefined || value === '') {
        delete cleanedFilters[key];
      }
    });
    
    setActiveFilters(cleanedFilters);
    onFilter?.(cleanedFilters);
  }, [pendingFilters, onFilter]);
  
  // Remove a specific filter
  const handleRemoveFilter = useCallback((key: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    
    setPendingFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    
    onFilter?.(activeFilters);
  }, [activeFilters, onFilter]);
  
  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setActiveFilters({});
    setPendingFilters({});
    onFilter?.({});
  }, [onFilter]);
  
  // Check if an option is selected - UPDATED FUNCTION
  const isOptionSelected = useCallback(
    (groupId: string, optionId: string) => {
      // For multi-select (checkbox) filters
      if (pendingFilters[groupId] && Array.isArray(pendingFilters[groupId])) {
        return pendingFilters[groupId].includes(optionId);
      }
      
      // For single-select (radio) filters
      return pendingFilters[groupId] === optionId;
    },
    [pendingFilters]
  );
  
  // Set filters directly (for resetting or setting from saved state)
  const setFilters = useCallback((filters: Record<string, any>) => {
    setActiveFilters(filters);
    setPendingFilters(filters);
    onFilter?.(filters);
  }, [onFilter]);
  
  return {
    activeFilters,
    pendingFilters,
    hasPendingChanges,
    handleFilterChange,
    handleRemoveFilter,
    handleApplyFilters,
    handleClearFilters,
    isOptionSelected,
    setFilters
  };
};