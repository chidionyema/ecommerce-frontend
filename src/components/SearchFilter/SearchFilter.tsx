'use client';

// src/components/SearchFilter/SearchFilter.tsx

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Box, Paper, Typography, Stack, useTheme, useMediaQuery, alpha } from '@mui/material';

// Import sub-components
import { SearchInput } from './components/SearchInput';
import { PanelButtons } from './components/PanelButtons';
import { FilterPanel } from './components/FilterPanel';
import { SortPanel } from './components/SortPanel';
import { AdvancedPanel } from './components/AdvancedPanel';
import { ActiveFilters } from './components/ActiveFilters';
import { ResultsInfo } from './components/ResultsInfo';

// Import hooks and utils
import { useFilters } from './hooks/useFilters';
import { useSearchHistory } from './hooks/useSearchHistory';
import { usePersistence } from './hooks/usePersistence';
import { debounce } from 'lodash';

// Import types
import { 
  FilterType, PanelType, FilterOption, FilterGroup, 
  SortOption, SearchFilterProps, ColorConfig, SearchHistoryItem,
  SortDirection
} from './types';

export default function SearchFilter({
  // Core functionality props
  onSearch,
  onFilter,
  onSort, 
  onSortDirectionChange,
  filterGroups = [],
  sortOptions = [],
  initialValues = {},
  loading = false,
  results = { count: 0, total: 0 },
  
  // UI customization props
  title = "Search & Filter",
  placeholder = "Search...",
  primaryColor,
  compact = false,
  showSearchHistory = false,
  maxVisibleFilters = 3,
  
  // Performance props
  debounceDelay = 300,
  
  // Advanced configuration
  renderCustomFilterOption,
  filterAccessibilityLabels = {},
  
  // Styling props
  className,
  style,
  elevation = 2,
  borderRadius = 2,
  
  // Enhanced functionality props
  liveFiltering = false,
  enableTypoTolerance = false,
  autocompleteOptions = [],
  autocompleteFetch,
  enableSortDirection = false,
  persistState = false,
  persistStateKey = 'search_filter_state',
  enableFilterSearch = false,
  synonymMap = {},
  saveSearches = false,
}: SearchFilterProps) {
  // Theme and responsive state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';
  
  // Create color configuration
  const colors: ColorConfig = useMemo(() => ({
    primary: primaryColor || theme.palette.primary.main,
    surface: theme.palette.background.paper,
    text: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    bgLight: alpha(primaryColor || theme.palette.primary.main, isDark ? 0.15 : 0.08),
    border: alpha(primaryColor || theme.palette.primary.main, isDark ? 0.3 : 0.2),
    divider: alpha(theme.palette.divider, 0.8),
    error: theme.palette.error.main,
  }), [theme, isDark, primaryColor]);
  
  // Persistence hook
  const { saveState, loadState, isInitialized } = usePersistence(persistStateKey, persistState);
  
  // Local state management
  const [searchQuery, setSearchQuery] = useState(initialValues.search || '');
  const [activeSort, setActiveSort] = useState(initialValues.sort || '');
  const [sortDir, setSortDir] = useState<SortDirection>(initialValues.sortDirection || 'asc');
  const [activePanel, setActivePanel] = useState<PanelType | null>(null);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState<Record<string, string>>({});
  
  // State for anchor elements - critical for panel positioning
  const [anchorEls, setAnchorEls] = useState<Record<string, HTMLElement | null>>({
    filter: null,
    sort: null,
    advanced: null
  });
  
  // Access the custom hooks
  const { 
    activeFilters, pendingFilters, hasPendingChanges, 
    handleFilterChange, handleRemoveFilter, handleApplyFilters, 
    handleClearFilters, isOptionSelected, setFilters
  } = useFilters(initialValues.filters, filterGroups, onFilter, liveFiltering);
  
  const {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    selectHistoryItem,
    saveSearch,
    getSavedSearches
  } = useSearchHistory(5);
  
  // Load saved searches
  useEffect(() => {
    if (saveSearches) {
      setSavedSearches(getSavedSearches());
    }
  }, [saveSearches, getSavedSearches]);
  
  // Load persisted state
  useEffect(() => {
    if (persistState && isInitialized) {
      const state = loadState();
      if (state) {
        setSearchQuery(state.search || '');
        setActiveSort(state.sort || '');
        setSortDir(state.sortDirection || 'asc');
        setFilters(state.filters || {});
        
        // Call the callbacks with the loaded state
        onSearch?.(state.search || '');
        onFilter?.(state.filters || {});
        onSort?.(state.sort || '');
        onSortDirectionChange?.(state.sortDirection || 'asc');
      }
    }
  }, [isInitialized, loadState, persistState, onSearch, onFilter, onSort, onSortDirectionChange, setFilters]);
  
  // Save state when values change
  useEffect(() => {
    if (persistState) {
      saveState({
        search: searchQuery,
        filters: activeFilters,
        sort: activeSort,
        sortDirection: sortDir
      });
    }
  }, [searchQuery, activeFilters, activeSort, sortDir, persistState, saveState]);
  
  // Search handling with debounce
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch?.(value);
      if (value && value.trim() !== '') {
        addToSearchHistory(value);
      }
    }, debounceDelay),
    [onSearch, debounceDelay, addToSearchHistory]
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    debouncedSearch('');
  };
  
  // Panel handling - updated to properly capture anchor elements
  const togglePanel = (panel: PanelType, event: React.MouseEvent<HTMLElement>) => {
    if (loading) return;
    
    if (activePanel !== panel) {
      setAnchorEls(prev => ({
        ...prev,
        [panel]: event.currentTarget // Store the button element
      }));
      setActivePanel(panel);
    } else {
      setAnchorEls(prev => ({
        ...prev,
        [panel]: null
      }));
      setActivePanel(null);
    }
  };
  
  const closePanel = () => {
    setActivePanel(null);
    // Clear all anchor elements
    setAnchorEls({
      filter: null,
      sort: null,
      advanced: null
    });
  };
  
  // Sort handling
  const handleSortChange = (sortId: string) => {
    if (loading) return;
    setActiveSort(sortId);
    onSort?.(sortId);
    
    // If we're switching from no sort to a sort, initialize with the default direction
    if (!activeSort && sortId) {
      const option = sortOptions.find(o => o.id === sortId);
      const newDirection = option?.defaultDirection || 'asc';
      setSortDir(newDirection);
      onSortDirectionChange?.(newDirection);
    }
    
    closePanel();
  };
  
  // Sort direction handling
  const handleSortDirectionChange = (direction: SortDirection) => {
    if (loading) return;
    setSortDir(direction);
    onSortDirectionChange?.(direction);
  };
  
  // Clear all filters and search
  const handleClearAll = () => {
    if (loading) return;
    setSearchQuery('');
    handleClearFilters();
    setActiveSort('');
    setSortDir('asc');
    onSearch?.('');
    onSort?.('');
    onSortDirectionChange?.('asc');
  };
  
  // History item selection
  const handleSelectHistoryItem = (item: SearchHistoryItem) => {
    setSearchQuery(item.query);
    onSearch?.(item.query);
  };
  
  // Save search
  const handleSaveSearch = (query: string, name: string) => {
    saveSearch(query, name);
    setSavedSearches(getSavedSearches());
  };
  
  // Filter change with live filtering support
  const handleFilterChangeWithLive = useCallback((
    group: string,
    filter: string,
    value: any,
    type: FilterType
  ) => {
    handleFilterChange(group, filter, value, type);
    
    if (liveFiltering) {
      // We need to delay this slightly to allow the state to update
      setTimeout(() => {
        handleApplyFilters();
      }, 10);
    }
  }, [handleFilterChange, liveFiltering, handleApplyFilters]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePanel) {
        closePanel();
      } else if (e.key === 'Enter' && activePanel === 'filter' && hasPendingChanges) {
        handleApplyFilters();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanel, handleApplyFilters, hasPendingChanges]);
  
  // Calculate active filter count for badge display
  const activeFilterCount = useMemo(() => 
    Object.values(activeFilters).reduce((count, value) => {
      if (Array.isArray(value)) return count + value.length;
      if (typeof value === 'object' && value !== null) {
        // For range filters, count as one active filter if min or max is set
        const hasValue = Object.values(value).some(v => v !== undefined && v !== '');
        return hasValue ? count + 1 : count;
      }
      return value != null && value !== '' ? count + 1 : count;
    }, 0), 
  [activeFilters]);
  
  // Determine if any filtering/searching is active
  const hasAnyActive = activeFilterCount > 0 || !!searchQuery || !!activeSort;
  
  // Get the current sort option label
  const currentSortLabel = useMemo(() => 
    activeSort ? (sortOptions.find(o => o.id === activeSort)?.label || 'Default') : 'Default',
  [activeSort, sortOptions]);
  
  return (
    <Box className={className} style={style}>
      {/* Main component container */}
      <Paper 
        elevation={elevation} 
        sx={{ 
          p: compact ? 1.5 : 2, 
          borderRadius, 
          position: 'relative', 
          overflow: 'visible', 
          bgcolor: colors.surface, 
          minHeight: compact ? 62 : 72,
          transition: theme.transitions.create(['box-shadow'], {
            duration: theme.transitions.duration.short,
          }),
        }}
      >
        {/* Title (optional) */}
        {title && (
          <Typography 
            variant={compact ? 'subtitle1' : 'h6'} 
            component="h2" 
            sx={{ mb: 2, fontWeight: 600 }}
          >
            {title}
          </Typography>
        )}
        
        {/* Search input and panel buttons row */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5, 
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          ...(isMobile && { mb: 1 }) 
        }}>
          {/* Search input with enhanced functionality */}
          <SearchInput 
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={placeholder}
            theme={theme}
            colors={colors}
            onClear={handleClearSearch}
            history={showSearchHistory ? searchHistory : undefined}
            onSelectHistoryItem={handleSelectHistoryItem}
            onClearHistory={clearSearchHistory}
            onSaveSearch={handleSaveSearch}
            savedSearches={saveSearches ? savedSearches : undefined}
            // Advanced search features
            autocompleteOptions={autocompleteOptions}
            autocompleteFetch={autocompleteFetch}
            enableTypoTolerance={enableTypoTolerance}
            synonymMap={synonymMap}
            saveSearchesEnabled={saveSearches}
          />
          
          {/* Filter, Sort, Advanced buttons */}
          <PanelButtons 
            activePanel={activePanel}
            togglePanel={togglePanel}  // Pass the updated togglePanel function
            activeFilterCount={activeFilterCount}
            activeSort={activeSort}
            currentSortLabel={currentSortLabel}
            hasAnyActive={hasAnyActive}
            handleClearAll={handleClearAll}
            compact={compact}
            isMobile={isMobile}
            colors={colors}
            loading={loading}
          />
        </Box>
        
        {/* Loading indicator */}
        {loading && (
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: 3, 
              bgcolor: alpha(colors.primary, 0.3),
              borderBottomLeftRadius: borderRadius, 
              borderBottomRightRadius: borderRadius,
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                height: '100%', 
                width: '30%', 
                bgcolor: colors.primary,
                animation: 'searchFilterProgress 1.5s infinite ease-in-out',
                '@keyframes searchFilterProgress': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(400%)' }
                }
              }} 
            />
          </Box>
        )}
      </Paper>
      
      {/* Active filters display */}
      {hasAnyActive && (
        <Box sx={{ mt: 2 }}>
          <Stack spacing={1.5}>
            {/* Active filter chips */}
            <ActiveFilters 
              activeFilters={activeFilters}
              filterGroups={filterGroups}
              activeSort={activeSort}
              sortOptions={sortOptions}
              handleRemoveFilter={handleRemoveFilter}
              handleSortChange={handleSortChange}
              handleClearAll={handleClearAll}
              showAllFilters={showAllFilters}
              setShowAllFilters={setShowAllFilters}
              maxVisibleFilters={isMobile ? Math.min(2, maxVisibleFilters) : maxVisibleFilters}
              colors={colors}
              loading={loading}
              isMobile={isMobile}
            />
            
            {/* Results count text */}
            <ResultsInfo 
              loading={loading}
              results={results}
              colors={colors}
            />
          </Stack>
        </Box>
      )}
      
      {/* Render appropriate panel based on active selection */}
      {activePanel === 'filter' && (
        <FilterPanel 
          anchorEl={anchorEls.filter}
          pendingFilters={pendingFilters}
          filterGroups={filterGroups}
          handleFilterChange={handleFilterChangeWithLive}
          handleApplyFilters={handleApplyFilters}
          isOptionSelected={isOptionSelected}
          hasPendingChanges={hasPendingChanges}
          closePanel={closePanel}
          colors={colors}
          isMobile={isMobile}
          renderCustomFilterOption={renderCustomFilterOption}
          accessibilityLabels={filterAccessibilityLabels}
          liveFiltering={liveFiltering}
          enableFilterSearch={enableFilterSearch}
        />
      )}
      
      {activePanel === 'sort' && (
        <SortPanel 
          anchorEl={anchorEls.sort}
          sortOptions={sortOptions}
          activeSort={activeSort}
          handleSortChange={handleSortChange}
          closePanel={closePanel}
          colors={colors}
          isMobile={isMobile}
          enableSortDirection={enableSortDirection}
          sortDirection={sortDir}
          onSortDirectionChange={handleSortDirectionChange}
        />
      )}
      
      {activePanel === 'advanced' && (
        <AdvancedPanel 
          anchorEl={anchorEls.advanced}
          pendingFilters={pendingFilters}
          handleFilterChange={handleFilterChangeWithLive}
          handleApplyFilters={handleApplyFilters}
          hasPendingChanges={hasPendingChanges}
          closePanel={closePanel}
          colors={colors}
          isMobile={isMobile}
          liveFiltering={liveFiltering}
        />
      )}
    </Box>
  );
}