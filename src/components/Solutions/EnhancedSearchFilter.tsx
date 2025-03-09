import React, { useState, useEffect, useRef } from 'react';
import { 
  useTheme, 
  Typography, 
  Box, 
  Container,
  TextField,
  InputAdornment,
  Chip,
  Fade,
  Grow,
  Autocomplete,
  Button,
  IconButton,
  Collapse,
  Stack,
  Divider,
  Paper,
  alpha,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import StoreIcon from '@mui/icons-material/Store';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Define the Project type
interface Project {
  title?: string;
  description?: string;
  tags?: string[];
}

// Props interface for the component
interface EnhancedSearchFilterProps {
  categories: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  projects: Project[];
  setFilteredProjects: (projects: Project[]) => void;
}

// Define FilterChip type
interface FilterChip {
  key: string;
  label: string;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
}

// Enhanced Search and Filter component
const EnhancedSearchFilter: React.FC<EnhancedSearchFilterProps> = ({ 
  categories, 
  activeFilter, 
  setActiveFilter, 
  projects, 
  setFilteredProjects 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFilters, setExpandedFilters] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterChips, setFilterChips] = useState<FilterChip[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [filterIsActive, setFilterIsActive] = useState<boolean>(false);
  
  const searchRef = useRef<HTMLInputElement>(null);
  
  // Extract all unique tags from projects
  useEffect(() => {
    if (projects && projects.length > 0) {
      const allTags = new Set<string>();
      projects.forEach(project => {
        if (project.tags && Array.isArray(project.tags)) {
          project.tags.forEach(tag => allTags.add(tag));
        }
      });
      setAvailableTags(Array.from(allTags).sort());
    }
  }, [projects]);
  
  // Apply search and filters
  useEffect(() => {
    let result = [...projects];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(project => 
        project.tags?.some(tag => tag.toLowerCase() === activeFilter)
      );
    }
    
    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter(project => 
        selectedTags.every(tag => project.tags?.includes(tag))
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title?.toLowerCase().includes(query) || 
        project.description?.toLowerCase().includes(query) ||
        project.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Update filter activity status for UI feedback
    setFilterIsActive(searchQuery !== '' || selectedTags.length > 0 || activeFilter !== 'all');
    
    // Update filtered projects
    setFilteredProjects(result);
    
    // Update filter chips for visual feedback
    const chips: FilterChip[] = [];
    if (activeFilter !== 'all') {
      chips.push({
        key: 'category',
        label: activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1),
        color: 'primary'
      });
    }
    
    selectedTags.forEach(tag => {
      chips.push({
        key: `tag-${tag}`,
        label: tag,
        color: 'secondary'
      });
    });
    
    if (searchQuery) {
      chips.push({
        key: 'search',
        label: `"${searchQuery}"`,
        color: 'info'
      });
    }
    
    setFilterChips(chips);
  }, [activeFilter, selectedTags, searchQuery, projects, setFilteredProjects]);
  
  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setActiveFilter('all');
  };
  
  // Remove a specific filter chip
  const handleRemoveChip = (chipToRemove: FilterChip) => {
    if (chipToRemove.key === 'search') {
      setSearchQuery('');
    } else if (chipToRemove.key === 'category') {
      setActiveFilter('all');
    } else if (chipToRemove.key.startsWith('tag-')) {
      const tagToRemove = chipToRemove.key.replace('tag-', '');
      setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    }
  };
  
  // Toggle expanded filters
  const toggleExpandedFilters = () => {
    setExpandedFilters(!expandedFilters);
  };
  
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        mb: 4,
        overflow: 'hidden',
        borderRadius: '16px',
        background: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.8)
          : theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 8px 32px rgba(33, 150, 243, 0.15)',
        transition: 'all 0.3s ease',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      {/* Search Bar */}
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <TextField
          inputRef={searchRef}
          fullWidth
          variant="outlined"
          placeholder="Search solutions by name, description, or tag..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color={isSearchFocused ? "primary" : "action"} />
              </InputAdornment>
            ),
            endAdornment: searchQuery ? (
              <InputAdornment position="end">
                <IconButton 
                  size="small" 
                  onClick={() => setSearchQuery('')}
                  aria-label="clear search"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
            sx: {
              borderRadius: '12px',
              transition: 'all 0.2s ease',
              backgroundColor: theme.palette.mode === 'dark' 
                ? alpha(theme.palette.common.white, 0.05)
                : alpha(theme.palette.common.black, 0.03),
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.common.white, 0.08)
                  : alpha(theme.palette.common.black, 0.05),
              },
              ...(isSearchFocused && {
                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
              }),
            }
          }}
        />
        
        {/* Filter Toggle Button */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              size="small"
              startIcon={expandedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={toggleExpandedFilters}
              sx={{ 
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              Advanced Filters
            </Button>
            
            {filterIsActive && (
              <Button
                size="small"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleClearFilters}
                sx={{ ml: 1 }}
              >
                Clear All
              </Button>
            )}
          </Box>
          
          {filterIsActive && (
            <Typography variant="caption" color="text.secondary">
              {filterChips.length} filter{filterChips.length !== 1 ? 's' : ''} applied
            </Typography>
          )}
        </Box>
        
        {/* Filter Chips - Show when filters are active */}
        {filterChips.length > 0 && (
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              mt: 2 
            }}
          >
            <Grow in={filterChips.length > 0}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {filterChips.map((chip) => (
                  <Chip
                    key={chip.key}
                    label={chip.label}
                    color={chip.color}
                    onDelete={() => handleRemoveChip(chip)}
                    size="small"
                    sx={{ 
                      borderRadius: '8px',
                      fontWeight: 500,
                      '& .MuiChip-deleteIcon': {
                        color: 'inherit',
                        opacity: 0.7,
                        '&:hover': {
                          opacity: 1,
                        }
                      }
                    }}
                  />
                ))}
              </Box>
            </Grow>
          </Box>
        )}
      </Box>
      
      {/* Expanded Filters Section */}
      <Collapse in={expandedFilters}>
        <Divider />
        <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {/* Category Filter */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CategoryIcon 
                  fontSize="small" 
                  color="primary" 
                  sx={{ mr: 1 }} 
                />
                <Typography variant="subtitle2" fontWeight="600">
                  Solution Category
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1
                }}
              >
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category === 'all' ? 'All Solutions' : category.charAt(0).toUpperCase() + category.slice(1)}
                    onClick={() => setActiveFilter(category)}
                    color={activeFilter === category ? "primary" : "default"}
                    variant={activeFilter === category ? "filled" : "outlined"}
                    sx={{ 
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      fontWeight: activeFilter === category ? 600 : 400
                    }}
                  />
                ))}
              </Box>
            </Box>
            
            {/* Tags Filter */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <LocalOfferIcon 
                  fontSize="small" 
                  color="primary" 
                  sx={{ mr: 1 }} 
                />
                <Typography variant="subtitle2" fontWeight="600">
                  Solution Tags
                </Typography>
              </Box>
              
              <Autocomplete
                multiple
                id="tags-filter"
                options={availableTags}
                value={selectedTags}
                onChange={(event, newValue) => setSelectedTags(newValue)}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    variant="outlined" 
                    placeholder="Select tags..."
                    size="small"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                      color="secondary"
                      sx={{ borderRadius: '8px' }}
                    />
                  ))
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.common.white, 0.05)
                      : alpha(theme.palette.common.black, 0.03),
                  }
                }}
              />
            </Box>
          </Stack>
        </Box>
      </Collapse>
      
      {/* Visual indicator for active filters - subtle glow effect */}
      {filterIsActive && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.5)}`,
          }}
        />
      )}
    </Paper>
  );
};

export default EnhancedSearchFilter;