// src/components/SearchFilter/components/ActiveFilters.tsx

import React from 'react';
import {
  Box,
  Chip,
  Button,
  Typography,
  Stack,
  Fade,
} from '@mui/material';
import { ColorConfig, FilterGroup, SortOption } from '../types';

interface ActiveFiltersProps {
  activeFilters: Record<string, any>;
  filterGroups: FilterGroup[];
  activeSort: string;
  sortOptions: SortOption[];
  handleRemoveFilter: (key: string) => void;
  handleSortChange: (sortId: string) => void;
  handleClearAll: () => void;
  showAllFilters: boolean;
  setShowAllFilters: (show: boolean) => void;
  maxVisibleFilters: number;
  colors: ColorConfig;
  loading?: boolean;
  isMobile: boolean;
}

export const ActiveFilters = ({
  activeFilters,
  filterGroups,
  activeSort,
  sortOptions,
  handleRemoveFilter,
  handleSortChange,
  handleClearAll,
  showAllFilters,
  setShowAllFilters,
  maxVisibleFilters,
  colors,
  loading = false,
  isMobile,
}: ActiveFiltersProps) => {
  // Helper to get filter display name
  const getFilterLabel = (key: string, value: any): string => {
    const [groupId, filterId] = key.split('.');
    
    // Find the filter group
    const group = filterGroups.find(g => g.id === groupId);
    if (!group) return key;
    
    if (filterId) {
      // Find the specific option
      const option = group.options?.find(o => o.id === filterId);
      return option 
        ? `${group.label}: ${option.label}`
        : `${group.label}: ${filterId}`;
    } else if (group.type === 'range') {
      // Format range values
      const { min, max } = value || {};
      const minVal = min !== undefined ? min : '—';
      const maxVal = max !== undefined ? max : '—';
      return `${group.label}: ${minVal} - ${maxVal}`;
    } else if (group.type === 'text') {
      // Text value
      return `${group.label}: "${value}"`;
    }
    
    return key;
  };
  
  // Generate chips for all active filters
  const filterChips = Object.entries(activeFilters).map(([key, value]) => {
    if (value === undefined || (Array.isArray(value) && value.length === 0)) {
      return null;
    }
    
    const label = getFilterLabel(key, value);
    
    return (
      <Chip
        key={key}
        label={label}
        onDelete={() => handleRemoveFilter(key)}
        disabled={loading}
        size={isMobile ? 'small' : 'medium'}
        sx={{
          borderRadius: 1,
          bgcolor: 'transparent',
          border: `1px solid ${colors.border}`,
          color: colors.text,
          '& .MuiChip-label': {
            px: 1.5,
          },
          '& .MuiChip-deleteIcon': {
            color: colors.textSecondary,
            '&:hover': {
              color: colors.primary,
            },
          },
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: colors.bgLight,
          },
        }}
      />
    );
  }).filter(Boolean);
  
  // Add an active sort chip if there is one
  const activeSortOption = activeSort ? sortOptions.find(o => o.id === activeSort) : null;
  
  if (activeSortOption) {
    filterChips.push(
      <Chip
        key="active-sort"
        label={`Sort: ${activeSortOption.label}`}
        onDelete={() => handleSortChange('')}
        disabled={loading}
        size={isMobile ? 'small' : 'medium'}
        sx={{
          borderRadius: 1,
          bgcolor: colors.bgLight,
          color: colors.primary,
          '& .MuiChip-label': {
            px: 1.5,
            fontWeight: 500,
          },
          '& .MuiChip-deleteIcon': {
            color: colors.primary,
            '&:hover': {
              color: colors.error,
            },
          },
        }}
      />
    );
  }
  
  // No filters to show
  if (filterChips.length === 0) {
    return null;
  }
  
  // Determine which chips to show based on maxVisibleFilters
  const visibleChips = showAllFilters 
    ? filterChips 
    : filterChips.slice(0, maxVisibleFilters);
  
  const hiddenCount = filterChips.length - visibleChips.length;
  
  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        flexWrap="wrap"
        sx={{ gap: 1 }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary"
          component="span"
          sx={{ mr: 1, display: 'flex', alignItems: 'center' }}
        >
          Active:
        </Typography>
        
        {visibleChips}
        
        {hiddenCount > 0 && (
          <Chip
            label={`+${hiddenCount} more`}
            onClick={() => setShowAllFilters(true)}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              borderRadius: 1,
              bgcolor: 'transparent',
              border: `1px solid ${colors.border}`,
              color: colors.text,
              '&:hover': {
                bgcolor: colors.bgLight,
              },
            }}
          />
        )}
        
        {showAllFilters && filterChips.length > maxVisibleFilters && (
          <Button
            size="small"
            variant="text"
            onClick={() => setShowAllFilters(false)}
            sx={{ 
              minWidth: 'auto', 
              color: colors.textSecondary,
              '&:hover': {
                bgcolor: 'transparent',
                color: colors.primary,
              },
            }}
          >
            Show Less
          </Button>
        )}
        
        <Button
          size="small"
          variant="text"
          color="error"
          onClick={handleClearAll}
          disabled={loading}
          sx={{ 
            minWidth: 'auto',
            ml: 'auto',
            fontSize: '0.75rem',
            textTransform: 'none',
          }}
        >
          Clear All
        </Button>
      </Stack>
    </Box>
  );
};