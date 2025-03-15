// src/components/SearchFilter/components/FilterPanel.tsx

import React, { useState, useEffect } from 'react';
import { 
  Paper, Box, Typography, Button, IconButton, 
  Collapse, Divider, Checkbox, FormControlLabel, 
  TextField, useMediaQuery, useTheme,
  Radio, RadioGroup, InputAdornment, 
  Chip, Popover
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Fzf } from 'fzf';
import { FilterType, FilterOption, FilterGroup, ColorConfig } from '../types';

export function FilterPanel(props) {
  const {
    anchorEl,
    pendingFilters,
    filterGroups,
    handleFilterChange,
    handleApplyFilters,
    isOptionSelected,
    hasPendingChanges,
    closePanel,
    colors,
    isMobile = false,
    liveFiltering = false,
    enableFilterSearch = false,
  } = props;

  const theme = useTheme();
  
  const [expandedGroups, setExpandedGroups] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // Initialize expanded groups
  useEffect(() => {
    const expanded = {};
    filterGroups.forEach((group, index) => {
      expanded[group.id] = index < 2;
    });
    setExpandedGroups(expanded);
  }, [filterGroups]);
  
  // Handle toggling group expansion
  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  
  // Filter visible groups based on search
  const filteredGroups = React.useMemo(() => {
    if (!searchTerm.trim() || !enableFilterSearch) return filterGroups;
    
    const fzf = new Fzf(filterGroups, {
      selector: item => `${item.label} ${item.options?.map(o => o.label).join(' ')}`,
      fuzzy: true,
      limit: filterGroups.length
    });
    
    return fzf.find(searchTerm).map(result => result.item);
  }, [searchTerm, filterGroups, enableFilterSearch]);
  
  // Handle checkbox change
  const handleCheckboxChange = (group, option) => {
    const isSelected = isOptionSelected(group.id, option.id);
    handleFilterChange(group.id, option.id, !isSelected, 'multi');
  };
  
  // Handle radio change
  const handleRadioChange = (group, value) => {
    const isAlreadySelected = pendingFilters[group.id] === value;
    if (isAlreadySelected) {
      handleFilterChange(group.id, value, false, 'single');
    } else {
      handleFilterChange(group.id, value, true, 'single');
    }
  };
  
  // Calculate the selected options count for a group
  const getSelectedCount = (groupId) => {
    if (!pendingFilters[groupId]) return 0;
    
    // For multi-select filters (checkbox)
    if (Array.isArray(pendingFilters[groupId])) {
      return pendingFilters[groupId].length;
    }
    
    // For single-value filters (radio)
    return pendingFilters[groupId] ? 1 : 0;
  };

  // Get total number of selected filters
  const getTotalSelectedCount = () => {
    let count = 0;
    Object.keys(pendingFilters).forEach(groupId => {
      if (Array.isArray(pendingFilters[groupId])) {
        count += pendingFilters[groupId].length;
      } else if (pendingFilters[groupId]) {
        count += 1;
      }
    });
    return count;
  };
  
  // Render checkbox group
  const renderCheckboxGroup = (group) => (
    <Box sx={{ pt: 1 }}>
      {group.options?.map(option => {
        const isSelected = isOptionSelected(group.id, option.id);
        return (
          <Box 
            key={option.id} 
            sx={{ 
              mb: 0.5,
              borderRadius: 1,
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: colors.bgLight,
              }
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(group, option)}
                  size="small"
                  sx={{
                    color: isSelected ? colors.primary : colors.textSecondary,
                    '&.Mui-checked': {
                      color: colors.primary,
                    },
                  }}
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: isSelected ? colors.primary : 'inherit',
                  }}
                >
                  {option.label}
                  {option.count !== undefined && (
                    <Typography component="span" variant="caption" sx={{ ml: 0.5, color: colors.textSecondary }}>
                      ({option.count})
                    </Typography>
                  )}
                </Typography>
              }
              sx={{ width: '100%', ml: -1 }}
            />
          </Box>
        );
      })}
    </Box>
  );
  
  // Render radio group
  const renderRadioGroup = (group) => (
    <RadioGroup
      value={pendingFilters[group.id] || ''}
      onChange={(e) => handleRadioChange(group, e.target.value)}
      sx={{ mt: 0.5 }}
    >
      {group.options?.map(option => {
        const isSelected = pendingFilters[group.id] === option.id;
        return (
          <Box
            key={option.id}
            sx={{ 
              mb: 0.5,
              borderRadius: 1,
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: colors.bgLight,
              }
            }}
          >
            <FormControlLabel
              value={option.id}
              control={
                <Radio 
                  size="small"
                  sx={{
                    color: isSelected ? colors.primary : colors.textSecondary,
                    '&.Mui-checked': {
                      color: colors.primary,
                    },
                  }}
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: isSelected ? colors.primary : 'inherit',
                  }}
                >
                  {option.label}
                  {option.count !== undefined && (
                    <Typography component="span" variant="caption" sx={{ ml: 0.5, color: colors.textSecondary }}>
                      ({option.count})
                    </Typography>
                  )}
                </Typography>
              }
              sx={{ width: '100%', ml: -1 }}
            />
          </Box>
        );
      })}
    </RadioGroup>
  );
  
  // Render filter group content based on type
  const renderGroupContent = (group) => {
    switch (group.type) {
      case 'checkbox':
        return renderCheckboxGroup(group);
      case 'radio':
        return renderRadioGroup(group);
      default:
        return null;
    }
  };
  
  const totalSelectedCount = getTotalSelectedCount();
  
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={closePanel}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          width: isMobile ? 'calc(100vw - 32px)' : 360,
          maxHeight: 'calc(100vh - 100px)',
          overflow: 'hidden',
        }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: colors.surface,
          borderRadius: 1,
          border: `1px solid ${colors.border}`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          borderBottom: `1px solid ${colors.divider}`,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
            {totalSelectedCount > 0 && (
              <Chip
                label={totalSelectedCount}
                size="small"
                sx={{ 
                  ml: 1,
                  height: 20,
                  fontSize: '0.7rem',
                  bgcolor: colors.primary,
                  color: 'white',
                }}
              />
            )}
          </Box>
          <IconButton 
            size="small" 
            onClick={closePanel}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {/* Search field */}
        {enableFilterSearch && (
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <TextField
              fullWidth
              placeholder="Search filters..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: colors.textSecondary }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Box>
        )}
        
        {/* Filter groups with scrolling */}
        <Box sx={{ 
          flexGrow: 1,
          overflowY: 'auto',
          py: 1,
        }}>
          {filteredGroups.length === 0 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                No matching filters found
              </Typography>
            </Box>
          ) : (
            filteredGroups.map((group) => {
              const selectedCount = getSelectedCount(group.id);
              return (
                <Box key={group.id} sx={{ mb: 0.5 }}>
                  {/* Group header */}
                  <Box
                    onClick={() => toggleGroup(group.id)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: colors.bgLight,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 600,
                          color: selectedCount > 0 ? colors.primary : 'inherit',
                        }}
                      >
                        {group.label}
                      </Typography>
                      
                      {selectedCount > 0 && (
                        <Chip
                          label={selectedCount}
                          size="small"
                          sx={{ 
                            ml: 1,
                            height: 20,
                            fontSize: '0.7rem',
                            bgcolor: colors.primary,
                            color: 'white',
                          }}
                        />
                      )}
                    </Box>
                    
                    {expandedGroups[group.id] ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </Box>
                  
                  {/* Group content */}
                  <Collapse in={expandedGroups[group.id]} timeout="auto">
                    <Box sx={{ px: 2, pb: 2 }}>
                      {renderGroupContent(group)}
                    </Box>
                  </Collapse>
                  
                  <Divider />
                </Box>
              );
            })
          )}
        </Box>
        
        {/* Footer with buttons */}
        {!liveFiltering && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            p: 2,
            borderTop: `1px solid ${colors.divider}`,
          }}>
            <Button 
              onClick={closePanel}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            
            <Button 
              variant="contained"
              disabled={!hasPendingChanges}
              onClick={() => {
                handleApplyFilters();
                closePanel();
              }}
              sx={{ 
                bgcolor: colors.primary,
                position: 'relative'
              }}
            >
              {hasPendingChanges && totalSelectedCount > 0 ? `Apply (${totalSelectedCount})` : 'Apply'}
            </Button>
          </Box>
        )}
      </Paper>
    </Popover>
  );
}