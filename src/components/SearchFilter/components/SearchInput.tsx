// src/components/SearchFilter/components/SearchInput.tsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  InputBase, IconButton, Paper, Box, Popper, 
  List, ListItem, ListItemText, ClickAwayListener,
  Typography, Fade, Theme, Chip, Stack, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { ColorConfig, SearchHistoryItem } from '../types';



interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
  theme: Theme;
  colors: ColorConfig;
  history?: SearchHistoryItem[];
  onSelectHistoryItem?: (item: SearchHistoryItem) => void;
  onClearHistory?: () => void;
  onSaveSearch?: (query: string, name: string) => void;
  savedSearches?: Record<string, string>;
  
  // Advanced search features
  autocompleteOptions?: string[];
  autocompleteFetch?: (query: string) => Promise<string[]>;
  enableTypoTolerance?: boolean;
  synonymMap?: Record<string, string[]>;
  saveSearchesEnabled?: boolean;
}

export const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  theme,
  colors,
  history,
  onSelectHistoryItem,
  onClearHistory,
  onSaveSearch,
  savedSearches = {},
  
  autocompleteOptions = [],
  autocompleteFetch,
  enableTypoTolerance = false,
  synonymMap = {},
  saveSearchesEnabled = false,
}: SearchInputProps) => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [savedSearchesOpen, setSavedSearchesOpen] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const historyButtonRef = useRef<HTMLButtonElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  
  // Create an expanded search set by adding synonyms
  const expandedAutocompleteOptions = useCallback(() => {
    const expanded = [...autocompleteOptions];
    
    // Add synonyms for each option
    autocompleteOptions.forEach(option => {
      const terms = option.toLowerCase().split(' ');
      terms.forEach(term => {
        const synonyms = synonymMap[term] || [];
        synonyms.forEach(synonym => {
          // Create a new option by replacing the term with its synonym
          const newOption = option.toLowerCase().replace(term, synonym);
          if (!expanded.includes(newOption)) {
            expanded.push(newOption);
          }
        });
      });
    });
    
    return expanded;
  }, [autocompleteOptions, synonymMap]);
  
  // Handle autocomplete suggestions
  useEffect(() => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const getSuggestions = async () => {
      // If we have a fetch function for dynamic suggestions, use it
      if (autocompleteFetch) {
        try {
          const fetchedSuggestions = await autocompleteFetch(value);
          setSuggestions(fetchedSuggestions);
          setShowSuggestions(fetchedSuggestions.length > 0);
          return;
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }
      
      // Use the expanded options set
      const options = expandedAutocompleteOptions();
      
      // Otherwise use static options with fuzzy search if enabled
      if (enableTypoTolerance && options.length > 0) {
        const fzf = new Fzf(options, {
          fuzzy: 'v2',
          limit: 5,
        });
        const results = fzf.find(value);
        const filteredSuggestions = results.map(result => result.item);
        setSuggestions(filteredSuggestions);
        setShowSuggestions(filteredSuggestions.length > 0);
      } else if (options.length > 0) {
        // Regular prefix matching
        const filtered = options
          .filter(option => 
            option.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      }
    };
    
    getSuggestions();
  }, [value, autocompleteOptions, autocompleteFetch, enableTypoTolerance, expandedAutocompleteOptions]);
  
  const handleFocus = () => {
    if (value && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    // Create a synthetic event to pass to onChange
    const event = {
      target: { value: suggestion }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(event);
    setShowSuggestions(false);
  };
  
  const toggleHistory = () => {
    setSavedSearchesOpen(false);
    setHistoryOpen((prev) => !prev);
    setShowSuggestions(false);
  };
  
  const toggleSavedSearches = () => {
    setHistoryOpen(false);
    setSavedSearchesOpen((prev) => !prev);
    setShowSuggestions(false);
  };
  
  const handleHistoryItemClick = (item: SearchHistoryItem) => {
    onSelectHistoryItem?.(item);
    setHistoryOpen(false);
  };
  
  const handleClearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClearHistory?.();
    setHistoryOpen(false);
  };
  
  const handleSaveSearch = () => {
    if (value && searchName.trim()) {
      onSaveSearch?.(value, searchName.trim());
      setSaveDialogOpen(false);
      setSearchName('');
    }
  };
  
  const handleSelectSavedSearch = (query: string) => {
    // Create a synthetic event to pass to onChange
    const event = {
      target: { value: query }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(event);
    setSavedSearchesOpen(false);
  };
  
  return (
    <Box sx={{ position: 'relative', flexGrow: 1 }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 1.5,
          py: 0.5,
          border: `1px solid ${colors.border}`,
          '&:hover': {
            borderColor: colors.primary,
          },
          '&:focus-within': {
            borderColor: colors.primary,
            boxShadow: `0 0 0 2px ${colors.bgLight}`,
          },
          borderRadius: 1,
          transition: theme.transitions.create([
            'border-color', 
            'box-shadow'
          ], {
            duration: theme.transitions.duration.short,
          }),
        }}
      >
        <SearchIcon sx={{ color: colors.textSecondary, mr: 1 }} />
        <InputBase
          inputRef={inputRef}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          fullWidth
          sx={{ 
            color: colors.text,
            '& .MuiInputBase-input': {
              py: 0.75,
              fontSize: theme.typography.body1.fontSize,
            }
          }}
          inputProps={{
            'aria-label': 'search',
            autoComplete: 'off',
          }}
        />
        {value && (
          <IconButton 
            size="small" 
            onClick={onClear}
            aria-label="clear search"
            sx={{ mx: 0.5 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        
        {saveSearchesEnabled && value && (
          <Tooltip title="Save this search">
            <IconButton
              ref={saveButtonRef}
              size="small"
              onClick={() => setSaveDialogOpen(true)}
              aria-label="save search"
              sx={{ mx: 0.5 }}
            >
              <BookmarkBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        
        {saveSearchesEnabled && Object.keys(savedSearches).length > 0 && (
          <Tooltip title="Saved searches">
            <IconButton
              size="small"
              onClick={toggleSavedSearches}
              aria-label="saved searches"
              sx={{ mx: 0.5 }}
            >
              <BookmarkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        
        {history && history.length > 0 && (
          <Tooltip title="Search history">
            <IconButton
              ref={historyButtonRef}
              size="small"
              onClick={toggleHistory}
              aria-label="search history"
              sx={{ ml: 0.5 }}
            >
              <HistoryIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Paper>
      
      {/* Autocomplete suggestions */}
      <Popper
        open={showSuggestions && suggestions.length > 0}
        anchorEl={inputRef.current}
        placement="bottom-start"
        transition
        style={{ width: inputRef.current?.offsetWidth, zIndex: 1301 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper 
              elevation={3} 
              sx={{ 
                mt: 1, 
                maxHeight: 300, 
                overflow: 'auto',
                borderRadius: 1,
              }}
            >
              <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
                <List dense disablePadding>
                  {suggestions.map((suggestion, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleSuggestionClick(suggestion)}
                      sx={{
                        py: 1,
                        '&:hover': {
                          bgcolor: colors.bgLight,
                        },
                      }}
                    >
                      <ListItemText primary={suggestion} />
                    </ListItem>
                  ))}
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      
      {/* History dropdown */}
      <Popper
        open={historyOpen}
        anchorEl={historyButtonRef.current}
        placement="bottom-end"
        transition
        style={{ width: 250, zIndex: 1301 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper 
              elevation={3} 
              sx={{ 
                mt: 1,
                borderRadius: 1,
              }}
            >
              <ClickAwayListener onClickAway={() => setHistoryOpen(false)}>
                <Box>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      p: 1.5,
                      borderBottom: `1px solid ${colors.divider}`
                    }}
                  >
                    <Typography variant="subtitle2">Recent Searches</Typography>
                    <IconButton size="small" onClick={handleClearHistory}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <List dense disablePadding sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {history?.map((item) => (
                      <ListItem 
                        key={item.timestamp} 
                        button
                        onClick={() => handleHistoryItemClick(item)}
                        sx={{
                          py: 1.5,
                          '&:hover': {
                            bgcolor: colors.bgLight,
                          },
                        }}
                      >
                        <HistoryIcon 
                          fontSize="small" 
                          sx={{ mr: 1.5, color: colors.textSecondary }} 
                        />
                        <ListItemText 
                          primary={item.query} 
                          primaryTypographyProps={{
                            noWrap: true,
                            style: { maxWidth: '180px' }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      
      {/* Saved searches dropdown */}
      <Popper
        open={savedSearchesOpen}
        anchorEl={saveButtonRef.current}
        placement="bottom-end"
        transition
        style={{ width: 250, zIndex: 1301 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper 
              elevation={3} 
              sx={{ 
                mt: 1,
                borderRadius: 1,
              }}
            >
              <ClickAwayListener onClickAway={() => setSavedSearchesOpen(false)}>
                <Box>
                  <Box 
                    sx={{ 
                      p: 1.5,
                      borderBottom: `1px solid ${colors.divider}`
                    }}
                  >
                    <Typography variant="subtitle2">Saved Searches</Typography>
                  </Box>
                  <List dense disablePadding sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {Object.entries(savedSearches).map(([name, query]) => (
                      <ListItem 
                        key={name} 
                        button
                        onClick={() => handleSelectSavedSearch(query)}
                        sx={{
                          py: 1.5,
                          '&:hover': {
                            bgcolor: colors.bgLight,
                          },
                        }}
                      >
                        <BookmarkIcon 
                          fontSize="small" 
                          sx={{ mr: 1.5, color: colors.textSecondary }} 
                        />
                        <ListItemText 
                          primary={name} 
                          secondary={query.length > 25 ? `${query.substring(0, 25)}...` : query}
                          primaryTypographyProps={{
                            noWrap: true,
                            style: { maxWidth: '180px' }
                          }}
                          secondaryTypographyProps={{
                            noWrap: true,
                            style: { maxWidth: '180px' }
                          }}
                        />
                      </ListItem>
                    ))}
                    {Object.keys(savedSearches).length === 0 && (
                      <ListItem sx={{ py: 2 }}>
                        <ListItemText 
                          primary="No saved searches yet"
                          primaryTypographyProps={{
                            align: 'center',
                            color: 'text.secondary',
                            variant: 'body2'
                          }}
                        />
                      </ListItem>
                    )}
                  </List>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      
      {/* Save search dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Current Search</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" gutterBottom>
              Current search query:
            </Typography>
            <Chip 
              label={value} 
              variant="outlined" 
              sx={{ 
                maxWidth: '100%', 
                mb: 2,
                '.MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '280px',
                }
              }} 
            />
            <TextField
              autoFocus
              label="Name for this search"
              type="text"
              fullWidth
              variant="outlined"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              sx={{ mt: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveSearch} 
            variant="contained"
            disabled={!searchName.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};