// src/components/SearchFilter/components/PanelButtons.tsx

import React from 'react';
import { 
  Box, IconButton, Badge, Tooltip, Button, 
  Typography, Divider, ButtonGroup
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { PanelType, ColorConfig } from '../types';

interface PanelButtonsProps {
  activePanel: PanelType | null;
  togglePanel: (panel: PanelType, event: React.MouseEvent<HTMLElement>) => void; // Updated to include event
  activeFilterCount: number;
  activeSort: string;
  currentSortLabel: string;
  hasAnyActive: boolean;
  handleClearAll: () => void;
  compact?: boolean;
  isMobile?: boolean;
  colors: ColorConfig;
  loading?: boolean;
}

export function PanelButtons({
  activePanel,
  togglePanel,
  activeFilterCount,
  activeSort,
  currentSortLabel,
  hasAnyActive,
  handleClearAll,
  compact = false,
  isMobile = false,
  colors,
  loading = false,
}: PanelButtonsProps) {
  
  const getButtonStyle = (panel: PanelType) => ({
    backgroundColor: activePanel === panel ? colors.bgLight : 'transparent',
    border: `1px solid ${activePanel === panel ? colors.primary : colors.border}`,
    color: colors.text,
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: colors.bgLight,
      border: `1px solid ${colors.primary}`,
    },
    minWidth: 'auto',
    px: compact ? 1 : 1.5,
    py: compact ? 0.5 : 0.75,
    opacity: loading ? 0.7 : 1,
    pointerEvents: loading ? 'none' : 'auto',
  });
  
  // Critical fix: Create proper event handlers with correct event passing
  const handleButtonClick = (panel: PanelType) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    togglePanel(panel, e);
  };
  
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <ButtonGroup 
        variant="outlined" 
        size={compact ? 'small' : 'medium'}
        sx={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          '.MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: colors.border
          }
        }}
      >
        <Button
          aria-label={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount} active)` : ''}`}
          startIcon={
            <Badge badgeContent={activeFilterCount} 
              color="primary" 
              sx={{ 
                '& .MuiBadge-badge': { 
                  fontSize: '0.65rem',
                  minWidth: '18px',
                  height: '18px',
                } 
              }}
            >
              <FilterListIcon fontSize={compact ? 'small' : 'medium'} />
            </Badge>
          }
          onClick={handleButtonClick('filter')}
          sx={{
            ...getButtonStyle('filter'),
            border: 'none', // Remove individual button borders within ButtonGroup
            borderRadius: 0,
            '&.Mui-focusVisible': {
              boxShadow: `0 0 0 2px ${colors.primary}`
            }
          }}
        >
          {!isMobile && 'Filters'}
        </Button>
        
        <Button
          aria-label={`Sort${activeSort ? `: ${currentSortLabel}` : ''}`}
          startIcon={<SortIcon fontSize={compact ? 'small' : 'medium'} />}
          onClick={handleButtonClick('sort')}
          sx={{
            ...getButtonStyle('sort'),
            border: 'none', // Remove individual button borders within ButtonGroup
            borderRadius: 0,
            '&.Mui-focusVisible': {
              boxShadow: `0 0 0 2px ${colors.primary}`
            }
          }}
        >
          {isMobile ? (
            activeSort ? (
              <Tooltip title={currentSortLabel}>
                <FilterListIcon fontSize="small" sx={{ opacity: 0, width: 0, mr: -1 }} /> 
              </Tooltip>
            ) : null
          ) : (
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              Sort
              {activeSort && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.75, height: '60%', my: 'auto' }} />
                  <Typography variant="body2" component="span" noWrap sx={{ maxWidth: 80 }}>
                    {currentSortLabel}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Button>
        
        <Tooltip title="Advanced Options">
          <Button
            aria-label="Advanced Options"
            onClick={handleButtonClick('advanced')}
            sx={{
              ...getButtonStyle('advanced'),
              border: 'none', // Remove individual button borders within ButtonGroup
              minWidth: 40,
              borderRadius: 0,
              '&.Mui-focusVisible': {
                boxShadow: `0 0 0 2px ${colors.primary}`
              }
            }}
          >
            <MoreVertIcon fontSize={compact ? 'small' : 'medium'} />
          </Button>
        </Tooltip>
      </ButtonGroup>
      
      {hasAnyActive && (
        <Tooltip title="Clear all filters">
          <IconButton
            onClick={handleClearAll}
            aria-label="Clear all filters and search"
            sx={{
              border: `1px solid ${colors.border}`,
              borderRadius: 1,
              p: compact ? 0.5 : 0.75,
              opacity: loading ? 0.7 : 1,
              pointerEvents: loading ? 'none' : 'auto',
              '&:hover': {
                backgroundColor: colors.bgLight,
                border: `1px solid ${colors.primary}`,
              }
            }}
            disabled={loading}
            size={compact ? 'small' : 'medium'}
          >
            <ClearAllIcon fontSize={compact ? 'small' : 'medium'} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}