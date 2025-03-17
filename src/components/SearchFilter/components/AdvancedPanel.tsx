// src/components/SearchFilter/components/AdvancedPanel.tsx

import React from 'react';
import { 
  Paper, Box, Typography, Button, IconButton, Divider,
  Switch, FormControlLabel, Stack, Tooltip, useTheme,
  useMediaQuery, Popover
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ColorConfig, FilterType } from '../types';

interface AdvancedPanelProps {
  anchorEl: HTMLElement | null;
  pendingFilters: Record<string, any>;
  handleFilterChange: (group: string, filter: string, value: any, type: FilterType) => void;
  handleApplyFilters: () => void;
  hasPendingChanges: boolean;
  closePanel: () => void;
  colors: ColorConfig;
  isMobile?: boolean;
  liveFiltering?: boolean;
}

export function AdvancedPanel({
  anchorEl,
  pendingFilters,
  handleFilterChange,
  handleApplyFilters,
  hasPendingChanges,
  closePanel,
  colors,
  isMobile = false,
  liveFiltering = false,
}: AdvancedPanelProps) {
  const theme = useTheme();
  
  // In a real implementation, you'd load these from saved options or user preferences
  const advancedOptions = {
    includeArchived: Boolean(pendingFilters?.advanced?.includeArchived),
    caseSensitive: Boolean(pendingFilters?.advanced?.caseSensitive),
    fuzzySearch: Boolean(pendingFilters?.advanced?.fuzzySearch),
    smartFiltering: Boolean(pendingFilters?.advanced?.smartFiltering) ?? true,
  };
  
  const handleToggleOption = (option: string, checked: boolean) => {
    handleFilterChange(
        'advanced',
        option,
        checked,
        'advanced' as FilterType
      );
      
    
    if (liveFiltering) {
      // We need to delay this slightly to allow the state to update
      setTimeout(() => {
        handleApplyFilters();
      }, 10);
    }
  };
  
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={closePanel}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      slotProps={{
        paper: {
          elevation: 4,
          sx: {
            mt: 0.5,
            minWidth: 280,
            maxWidth: isMobile ? '90%' : 350
          }
        }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          backgroundColor: colors.surface,
          borderRadius: 1,
          border: `1px solid ${colors.border}`,
        }}
      >
        {/* Header with title and close button */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${colors.divider}`,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Advanced Options
          </Typography>
          <IconButton 
            size="small" 
            onClick={closePanel}
            aria-label="Close advanced options panel"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {/* Advanced options */}
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            {/* Search Options */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Search Options
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={advancedOptions.caseSensitive}
                    onChange={(e) => handleToggleOption('caseSensitive', e.target.checked)}
                    size="small"
                    color="primary"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="body2">Case sensitive</Typography>
                    <Tooltip title="Match exact case when searching">
                      <InfoOutlinedIcon fontSize="small" sx={{ color: colors.textSecondary, fontSize: '16px' }} />
                    </Tooltip>
                  </Stack>
                }
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={advancedOptions.fuzzySearch}
                    onChange={(e) => handleToggleOption('fuzzySearch', e.target.checked)}
                    size="small"
                    color="primary"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="body2">Fuzzy search</Typography>
                    <Tooltip title="Find similar matches, even with typos">
                      <InfoOutlinedIcon fontSize="small" sx={{ color: colors.textSecondary, fontSize: '16px' }} />
                    </Tooltip>
                  </Stack>
                }
              />
            </Box>
            
            <Divider />
            
            {/* Filter Options */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Filter Options
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={advancedOptions.includeArchived}
                    onChange={(e) => handleToggleOption('includeArchived', e.target.checked)}
                    size="small"
                    color="primary"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="body2">Include archived</Typography>
                    <Tooltip title="Show both active and archived items">
                      <InfoOutlinedIcon fontSize="small" sx={{ color: colors.textSecondary, fontSize: '16px' }} />
                    </Tooltip>
                  </Stack>
                }
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={advancedOptions.smartFiltering}
                    onChange={(e) => handleToggleOption('smartFiltering', e.target.checked)}
                    size="small"
                    color="primary"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="body2">Smart filtering</Typography>
                    <Tooltip title="Automatically include related items">
                      <InfoOutlinedIcon fontSize="small" sx={{ color: colors.textSecondary, fontSize: '16px' }} />
                    </Tooltip>
                  </Stack>
                }
              />
            </Box>
          </Stack>
        </Box>
        
        {/* Footer with action buttons */}
        {!liveFiltering && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              p: 2,
              borderTop: `1px solid ${colors.divider}`,
            }}
          >
            <Button 
              onClick={closePanel}
              sx={{ 
                mr: 1,
                color: colors.text,
                '&:hover': {
                  backgroundColor: colors.bgLight,
                },
              }}
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
                '&:hover': {
                  bgcolor: colors.primary,
                  filter: 'brightness(0.9)',
                },
              }}
            >
              Apply
            </Button>
          </Box>
        )}
      </Paper>
    </Popover>
  );
}