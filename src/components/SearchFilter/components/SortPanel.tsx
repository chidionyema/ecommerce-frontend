// src/components/SearchFilter/components/SortPanel.tsx
import React from 'react';
import { 
  Paper, Box, Typography, List, ListItem, ListItemText, 
  IconButton, Radio, FormControlLabel, Stack, Divider, 
  useMediaQuery, useTheme, Popover
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SortOption, ColorConfig, SortDirection } from '../types';

interface SortPanelProps {
  anchorEl: HTMLElement | null;
  sortOptions: SortOption[];
  activeSort: string;
  handleSortChange: (sortId: string) => void;
  closePanel: () => void;
  colors: ColorConfig;
  isMobile?: boolean;
  enableSortDirection?: boolean;
  sortDirection?: SortDirection;
  onSortDirectionChange?: (direction: SortDirection) => void;
}

export const SortPanel = ({
  anchorEl,
  sortOptions,
  activeSort,
  handleSortChange,
  closePanel,
  colors,
  isMobile = false,
  enableSortDirection = false,
  sortDirection = 'asc',
  onSortDirectionChange,
}: SortPanelProps) => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));
  
  // Handle direction toggle
  const handleDirectionToggle = (direction: SortDirection) => {
    if (onSortDirectionChange) {
      onSortDirectionChange(direction);
    }
  };
  
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
      sx={{
        '& .MuiPaper-root': {
          width: isMobile ? '100%' : 'auto',
          maxWidth: isMobile ? '100%' : 350,
          minWidth: 280,
          maxHeight: isMobile ? '80vh' : 500,
          overflow: 'hidden',
          mt: 0.5
        }
      }}
    >
      <Paper
        elevation={4}
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
            Sort By
          </Typography>
          <IconButton 
            size="small" 
            onClick={closePanel}
            aria-label="Close sort panel"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {/* Sort direction toggle - only shown when a sort option is selected */}
        {enableSortDirection && activeSort && (
          <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${colors.divider}` }}>
            <Typography variant="subtitle2" gutterBottom>
              Direction
            </Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Radio
                    checked={sortDirection === 'asc'}
                    onChange={() => handleDirectionToggle('asc')}
                    size="small"
                    sx={{
                      color: colors.textSecondary,
                      '&.Mui-checked': {
                        color: colors.primary,
                      },
                    }}
                  />
                }
                label={
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <ArrowUpwardIcon fontSize="small" />
                    <Typography variant="body2">Ascending</Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={sortDirection === 'desc'}
                    onChange={() => handleDirectionToggle('desc')}
                    size="small"
                    sx={{
                      color: colors.textSecondary,
                      '&.Mui-checked': {
                        color: colors.primary,
                      },
                    }}
                  />
                }
                label={
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <ArrowDownwardIcon fontSize="small" />
                    <Typography variant="body2">Descending</Typography>
                  </Stack>
                }
              />
            </Stack>
          </Box>
        )}
        
        {/* Sort options list with improved styling */}
        <List sx={{ py: 0.5, maxHeight: 300, overflow: 'auto' }}>
          {/* Default "No sort" option */}
          <ListItem
            button
            selected={!activeSort}
            onClick={() => handleSortChange('')}
            sx={{
              px: 2,
              py: 1.5,
              '&.Mui-selected': {
                backgroundColor: colors.bgLight,
                '&:hover': {
                  backgroundColor: colors.bgLight,
                },
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemText 
              primary="Default" 
              primaryTypographyProps={{ 
                variant: 'body2',
                color: !activeSort ? colors.primary : 'inherit',
                fontWeight: !activeSort ? 600 : 400,
              }}
            />
            {!activeSort && (
              <CheckIcon fontSize="small" sx={{ color: colors.primary }} />
            )}
          </ListItem>
          
          <Divider />
          
          {/* Sort options */}
          {sortOptions.map((option) => (
            <ListItem
              key={option.id}
              button
              selected={activeSort === option.id}
              onClick={() => handleSortChange(option.id)}
              sx={{
                px: 2,
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: colors.bgLight,
                  '&:hover': {
                    backgroundColor: colors.bgLight,
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemText 
                primary={option.label} 
                secondary={option.description || null}
                primaryTypographyProps={{ 
                  variant: 'body2',
                  color: activeSort === option.id ? colors.primary : 'inherit',
                  fontWeight: activeSort === option.id ? 600 : 400,
                }}
                secondaryTypographyProps={{ 
                  variant: 'caption',
                  sx: { mt: 0.5 }
                }}
              />
              {activeSort === option.id && (
                <CheckIcon fontSize="small" sx={{ color: colors.primary }} />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Popover>
  );
};