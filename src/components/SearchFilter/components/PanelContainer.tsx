// src/components/SearchFilter/components/PanelContainer.tsx

import React, { useEffect, useRef } from 'react';
import { 
  Paper, Box, Typography, Fade, IconButton, 
  useMediaQuery, Theme, SwipeableDrawer
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ColorConfig } from '../types';

interface PanelContainerProps {
  title: string;
  onClose: () => void;
  colors: ColorConfig;
  isMobile: boolean;
  maxHeight?: number;
  children: React.ReactNode;
}

export const PanelContainer = React.forwardRef<HTMLDivElement, PanelContainerProps>(
  ({ title, onClose, colors, isMobile, maxHeight = 400, children }, ref) => {
    const panelRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      // Handler for clicking outside the panel
      const handleClickOutside = (event: MouseEvent) => {
        if (
          panelRef.current && 
          !panelRef.current.contains(event.target as Node) &&
          // Make sure we're not clicking on the button that toggles the panel
          ref && 'current' in ref && 
          ref.current && 
          !ref.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose, ref]);
    
    // Mobile drawer implementation
    if (isMobile) {
      return (
        <SwipeableDrawer
          anchor="bottom"
          open={true}
          onClose={onClose}
          onOpen={() => {}}
          disableSwipeToOpen
          swipeAreaWidth={0}
          ModalProps={{
            keepMounted: false,
          }}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              maxHeight: '85vh',
            },
          }}
        >
          <Box sx={{ 
            position: 'sticky', 
            top: 0, 
            bgcolor: colors.surface,
            borderBottom: `1px solid ${colors.divider}`,
            zIndex: 1,
          }}>
            <Box sx={{ 
              py: 2, 
              px: 2, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ 
            overflow: 'auto',
            maxHeight: 'calc(85vh - 56px)',
          }}>
            {children}
          </Box>
        </SwipeableDrawer>
      );
    }
    
    // Desktop panel implementation
    return (
      <Fade in={true}>
        <Paper
          ref={panelRef}
          elevation={4}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            right: 0,
            zIndex: 1300,
            width: 320,
            maxHeight: maxHeight,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 1,
            overflow: 'hidden',
            // Fine shadow for a premium look
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box 
            sx={{ 
              px: 2, 
              py: 1.5, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${colors.divider}`,
              bgcolor: colors.surface,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ 
            overflow: 'auto',
            maxHeight: maxHeight - 52, // Subtract header height
          }}>
            {children}
          </Box>
        </Paper>
      </Fade>
    );
  }
);