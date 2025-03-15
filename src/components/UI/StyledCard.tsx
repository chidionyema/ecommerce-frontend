import React from 'react';
import { Card, alpha, useTheme } from '@mui/material';

/**
 * A professionally designed card component with clean, minimal aesthetics
 * and attention to subtle details like shadows and transitions.
 */
export const StyledCard = ({ 
  children, 
  variant = 'standard', 
  isHovered = false,
  sx = {}, 
  ...props 
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Base styles with professional design considerations
  const getBaseStyles = () => ({
    borderRadius: '12px', // Consistent, comfortable radius
    backgroundColor: isDark 
      ? alpha(theme.palette.background.paper, 0.85) 
      : theme.palette.background.paper,
    boxShadow: variant === 'featured'
      ? `0 10px 30px ${alpha(theme.palette.common.black, isDark ? 0.25 : 0.08)}`
      : `0 2px 10px ${alpha(theme.palette.common.black, isDark ? 0.2 : 0.05)}`,
    border: `1px solid ${alpha(
      isDark ? theme.palette.grey[800] : theme.palette.grey[200], 
      0.8
    )}`,
    padding: theme.spacing(2.5),
    transition: 'all 280ms cubic-bezier(0.4, 0, 0.2, 1)', // Material design easing
    position: 'relative',
    overflow: 'hidden'
  });
  
  // Hover styles for elevation and subtle transform
  const getHoverStyles = () => ({
    transform: 'translateY(-4px)',
    boxShadow: `0 14px 40px ${alpha(theme.palette.common.black, isDark ? 0.35 : 0.12)}`,
    borderColor: alpha(
      isDark ? theme.palette.grey[700] : theme.palette.grey[300], 
      0.9
    )
  });
  
  // Featured variant styles - subtle accent
  const getFeaturedStyles = () => ({
    borderTop: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: isDark 
      ? alpha(theme.palette.background.paper, 0.9) 
      : alpha(theme.palette.background.paper, 1)
  });
  
  return (
    <Card
      elevation={0}
      sx={{
        ...getBaseStyles(),
        ...(variant === 'featured' && getFeaturedStyles()),
        ...(isHovered && getHoverStyles()),
        ...sx
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default StyledCard;