// Core component structure with improved flexibility and organization
// src/components/SearchFilter/SearchFilter.tsx

'use client';

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
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
import { debounce } from 'lodash';

// Import types
import { 
  FilterType, PanelType, Filter, FilterOption, FilterGroup, 
  SortOption, SearchFilterProps, ColorConfig, SearchHistoryItem 
} from './types';

export default function SearchFilter({
  // Core functionality props
  onSearch,
  onFilter,
  onSort, 
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
  
  // Local state management
  const [searchQuery, setSearchQuery] = useState(initialValues.search || '');
  const [activeSort, setActiveSort] = useState(initialValues.sort || '');
  const [activePanel, setActivePanel] = useState<PanelType | null>(null);
  const [showAllFilters, setShowAllFilters] = useState(false);
  
  // Access the custom hooks
  const { 
    activeFilters, pendingFilters, hasPendingChanges, 
    handleFilterChange, handleRemoveFilter, handleApplyFilters, 
    handleClearFilters, isOptionSelected
  } = useFilters(initialValues.filters, filterGroups, onFilter);
  
  const {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    selectHistoryItem
  } = useSearchHistory(5); // Limit to last 5 searches
  
  // Refs for panel positioning
  const refs = {
    filter: useRef<HTMLButtonElement>(null),
    sort: useRef<HTMLButtonElement>(null),
    advanced: useRef<HTMLButtonElement>(null),
  };
  
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
  
  // Panel handling
  const togglePanel = (panel: PanelType) => {
    if (loading) return;
    setActivePanel(current => current === panel ? null : panel);
  };
  
  const closePanel = () => setActivePanel(null);
  
  // Sort handling
  const handleSortChange = (sortId: string) => {
    if (loading) return;
    setActiveSort(sortId);
    onSort?.(sortId);
    closePanel();
  };
  
  // Clear all filters and search
  const handleClearAll = () => {
    if (loading) return;
    setSearchQuery('');
    handleClearFilters();
    setActiveSort('');
    onSearch?.('');
    onSort?.('');
  };
  
  // History item selection
  const handleSelectHistoryItem = (item: SearchHistoryItem) => {
    setSearchQuery(item.query);
    onSearch?.(item.query);
  };
  
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
          minHeight: compact ? 62 : 72 
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
          flexWrap: isMobile ? 'wrap' : 'nowrap' 
        }}>
          {/* Search input with history support */}
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
          />
          
          {/* Filter, Sort, Advanced buttons */}
          <PanelButtons 
            refs={refs}
            activePanel={activePanel}
            togglePanel={togglePanel}
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
              borderBottomLeftRadius: 8, 
              borderBottomRightRadius: 8,
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
          ref={refs.filter}
          pendingFilters={pendingFilters}
          filterGroups={filterGroups}
          handleFilterChange={handleFilterChange}
          handleApplyFilters={handleApplyFilters}
          isOptionSelected={isOptionSelected}
          hasPendingChanges={hasPendingChanges}
          closePanel={closePanel}
          colors={colors}
          isMobile={isMobile}
          renderCustomFilterOption={renderCustomFilterOption}
          accessibilityLabels={filterAccessibilityLabels}
        />
      )}
      
      {activePanel === 'sort' && (
        <SortPanel 
          ref={refs.sort}
          sortOptions={sortOptions}
          activeSort={activeSort}
          handleSortChange={handleSortChange}
          closePanel={closePanel}
          colors={colors}
          isMobile={isMobile}
        />
      )}
      
      {activePanel === 'advanced' && (
        <AdvancedPanel 
          ref={refs.advanced}
          pendingFilters={pendingFilters}
          handleFilterChange={handleFilterChange}
          handleApplyFilters={handleApplyFilters}
          hasPendingChanges={hasPendingChanges}
          closePanel={closePanel}
          colors={colors}
          isMobile={isMobile}
        />
      )}
    </Box>
  );
}