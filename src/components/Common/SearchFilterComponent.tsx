import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  useTheme,
  Container,
  Paper,
  Collapse,
  IconButton,
  Grid,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  SelectChangeEvent,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterList from '@mui/icons-material/FilterList';
import Clear from '@mui/icons-material/Clear';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Check from '@mui/icons-material/Check';

// Types for the component - Fixed icon type to be ReactElement instead of ReactNode
export interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactElement; // Changed from React.ReactNode to React.ReactElement
  color?: string;
}

export interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

export interface SearchFilterProps {
  title?: string;
  subtitle?: string;
  onSearch: (searchTerm: string) => void;
  onFilter: (selectedFilters: Record<string, string[]>) => void;
  filterCategories: FilterCategory[];
  searchPlaceholder?: string;
  initialSearchTerm?: string;
  initialFilters?: Record<string, string[]>;
  showFilterByDefault?: boolean;
  variant?: 'minimal' | 'standard' | 'expanded';
  contentColor?: 'primary' | 'secondary' | 'default';
  containerProps?: any;
  sx?: any;
  sortOptions?: Array<{value: string, label: string}>;
  onSort?: (value: string) => void;
  initialSortValue?: string;
}

const SearchFilterComponent: React.FC<SearchFilterProps> = ({
  title,
  subtitle,
  onSearch,
  onFilter,
  filterCategories,
  searchPlaceholder = 'Search...',
  initialSearchTerm = '',
  initialFilters = {},
  showFilterByDefault = false,
  variant = 'standard',
  contentColor = 'primary',
  containerProps = { maxWidth: 'lg' },
  sx = {},
  sortOptions,
  onSort,
  initialSortValue = '',
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [showFilters, setShowFilters] = useState(showFilterByDefault);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters);
  const [sortValue, setSortValue] = useState(initialSortValue);

  // Apply colors based on the contentColor prop
  const getColors = () => {
    switch (contentColor) {
      case 'primary':
        return {
          main: theme.palette.primary.main,
          light: alpha(theme.palette.primary.main, 0.1),
          lighter: alpha(theme.palette.primary.main, 0.05),
          medium: alpha(theme.palette.primary.main, 0.2),
          contrastText: theme.palette.primary.contrastText,
        };
      case 'secondary':
        return {
          main: theme.palette.secondary.main,
          light: alpha(theme.palette.secondary.main, 0.1),
          lighter: alpha(theme.palette.secondary.main, 0.05),
          medium: alpha(theme.palette.secondary.main, 0.2),
          contrastText: theme.palette.secondary.contrastText,
        };
      default:
        return {
          main: theme.palette.text.primary,
          light: alpha(theme.palette.text.primary, 0.1),
          lighter: alpha(theme.palette.text.primary, 0.05),
          medium: alpha(theme.palette.text.primary, 0.2),
          contrastText: theme.palette.background.paper,
        };
    }
  };

  const colors = getColors();

  // Apply search debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  // Apply filters
  useEffect(() => {
    onFilter(selectedFilters);
  }, [selectedFilters, onFilter]);

  // Handle filter toggle
  const handleFilterToggle = (categoryId: string, filterId: string) => {
    setSelectedFilters((prev) => {
      const category = filterCategories.find((cat) => cat.id === categoryId);
      const isMultiSelect = category?.multiSelect !== false;
      
      // For multi-select, toggle the filter in the array
      if (isMultiSelect) {
        const currentFilters = prev[categoryId] || [];
        const isSelected = currentFilters.includes(filterId);
        
        return {
          ...prev,
          [categoryId]: isSelected
            ? currentFilters.filter((id) => id !== filterId)
            : [...currentFilters, filterId],
        };
      } 
      // For single-select, replace the entire array
      else {
        const currentFilters = prev[categoryId] || [];
        const isSelected = currentFilters.includes(filterId);
        
        return {
          ...prev,
          [categoryId]: isSelected ? [] : [filterId],
        };
      }
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedFilters({});
    setSearchTerm('');
    setSortValue('');
    onSearch('');
    onFilter({});
    if (onSort) onSort('');
  };

  // Any active filters?
  const hasActiveFilters = Object.values(selectedFilters).some((values) => values.length > 0) || searchTerm !== '';

  // Handle sort change
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSortValue(value);
    if (onSort) onSort(value);
  };

  // Render filter chips for selected filters
  const renderFilterChips = () => {
    const chips: React.ReactNode[] = [];

    Object.entries(selectedFilters).forEach(([categoryId, filterIds]) => {
      const category = filterCategories.find((cat) => cat.id === categoryId);
      
      if (category) {
        filterIds.forEach((filterId) => {
          const option = category.options.find((opt) => opt.id === filterId);
          
          if (option) {
            chips.push(
              <Chip
                key={`${categoryId}-${filterId}`}
                label={`${category.label}: ${option.label}`}
                onDelete={() => handleFilterToggle(categoryId, filterId)}
                sx={{
                  m: 0.5,
                  fontWeight: 500,
                  bgcolor: option.color || colors.lighter,
                  color: theme.palette.text.primary,
                  '& .MuiChip-deleteIcon': {
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.error.main,
                    },
                  },
                }}
                size="medium"
              />
            );
          }
        });
      }
    });

    return chips;
  };

  // Make the component more compact for the minimal variant
  const isMinimal = variant === 'minimal';
  const isExpanded = variant === 'expanded';

  return (
    <Box
      sx={{
        mb: 4,
        ...sx,
      }}
    >
      <Container {...containerProps}>
        <Paper
          elevation={isMinimal ? 0 : 3}
          sx={{
            p: isMinimal ? 2 : 3,
            borderRadius: isMinimal ? 2 : 3,
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.7)
              : theme.palette.background.paper,
            backdropFilter: 'blur(8px)',
            border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.1 : 0.05)}`,
          }}
        >
          {(title || subtitle) && !isMinimal && (
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              {title && (
                <Typography
                  variant={isExpanded ? "h4" : "h5"}
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                  }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    maxWidth: 700,
                    mx: 'auto',
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}

          <Grid container spacing={2} alignItems="center">
            {/* Search Field */}
            <Grid item xs={12} md={isExpanded ? 6 : sortOptions ? 6 : 8}>
              <TextField
                fullWidth
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size={isMinimal ? "small" : "medium"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchTerm('')}
                        edge="end"
                        aria-label="clear search"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: isMinimal ? 3 : 2,
                  },
                }}
              />
            </Grid>

            {/* Sort Dropdown */}
            {sortOptions && (
              <Grid item xs={6} md={isExpanded ? 2 : 3}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size={isMinimal ? "small" : "medium"}
                >
                  <InputLabel id="sort-select-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    value={sortValue}
                    onChange={handleSortChange}
                    label="Sort By"
                    sx={{
                      borderRadius: isMinimal ? 3 : 2,
                    }}
                  >
                    <MenuItem value="">
                      <em>Default</em>
                    </MenuItem>
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Filter Toggle Button */}
            <Grid item xs={sortOptions ? 6 : 12} md={isExpanded ? 2 : 3}>
              <Button
                fullWidth
                variant={showFilters ? "contained" : "outlined"}
                color={contentColor === 'default' ? 'primary' : contentColor}
                onClick={() => setShowFilters(!showFilters)}
                startIcon={<FilterListIcon />}
                endIcon={<ArrowDropDownIcon
                  sx={{
                    transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}
                />}
                size={isMinimal ? "small" : "medium"}
                sx={{
                  borderRadius: isMinimal ? 3 : 2,
                  textTransform: 'none',
                  py: isMinimal ? 0.7 : 1,
                  fontWeight: 500,
                }}
              >
                Filters {hasActiveFilters ? `(${renderFilterChips().length})` : ''}
              </Button>
            </Grid>

            {/* Clear Button (expanded view only) */}
            {isExpanded && hasActiveFilters && (
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={handleClearFilters}
                  startIcon={<ClearIcon />}
                  size={isMinimal ? "small" : "medium"}
                  sx={{
                    borderRadius: isMinimal ? 3 : 2,
                    textTransform: 'none',
                    py: isMinimal ? 0.7 : 1,
                  }}
                >
                  Clear All
                </Button>
              </Grid>
            )}
          </Grid>

          {/* Filter Chips */}
          {hasActiveFilters && !isExpanded && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              {renderFilterChips()}
              
              {hasActiveFilters && (
                <Chip
                  icon={<ClearIcon fontSize="small" />}
                  label="Clear All"
                  onClick={handleClearFilters}
                  color="default"
                  variant="outlined"
                  sx={{
                    m: 0.5,
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                      borderColor: theme.palette.error.main,
                      color: theme.palette.error.main,
                    },
                  }}
                />
              )}
            </Box>
          )}

          {/* Filter Categories */}
          <Collapse in={showFilters}>
            <Box 
              sx={{ 
                mt: 3, 
                pt: 2, 
                borderTop: hasActiveFilters ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
              }}
            >
              <Grid container spacing={3}>
                {filterCategories.map((category) => (
                  <Grid item xs={12} sm={6} md={isExpanded ? 3 : 4} key={category.id}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {category.label}
                      {!category.multiSelect && (
                        <Tooltip title="Single selection only">
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{
                              ml: 1,
                              color: theme.palette.text.secondary,
                              fontWeight: 400,
                            }}
                          >
                            (Select one)
                          </Typography>
                        </Tooltip>
                      )}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {category.options.map((option) => {
                        const isSelected = (selectedFilters[category.id] || []).includes(option.id);
                        
                        // Create a CheckIcon element to use as avatar for selected chips
                        const checkIconElement = isSelected ? <CheckIcon /> : undefined;
                        
                        return (
                          <Chip
                            key={`${category.id}-${option.id}`}
                            label={option.label}
                            icon={option.icon}
                            onClick={() => handleFilterToggle(category.id, option.id)}
                            color={isSelected ? contentColor : "default"}
                            variant={isSelected ? "filled" : "outlined"}
                            avatar={checkIconElement}
                            sx={{
                              fontWeight: 500,
                              mb: 1,
                              '&:hover': {
                                bgcolor: isSelected 
                                  ? undefined 
                                  : option.color || colors.lighter,
                              },
                              ...(option.color && !isSelected && {
                                borderColor: option.color,
                              }),
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              {/* Clear buttons (only on expanded view) */}
              {isExpanded && hasActiveFilters && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearFilters}
                    startIcon={<ClearIcon />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Box>
              )}
            </Box>
          </Collapse>
        </Paper>
      </Container>
    </Box>
  );
};

export default SearchFilterComponent;