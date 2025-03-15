import React from 'react';
import { Button, useTheme } from '@mui/material';
import { buttonStyles } from '../../theme/componentStyles';

export const StyledButton = ({ 
  children, 
  variant = 'contained', 
  color = 'primary',
  styleVariant = 'primary',
  sx = {}, 
  ...props 
}) => {
  const theme = useTheme();
  
  const getButtonStyle = () => {
    if (variant === 'text') return buttonStyles.text(theme);
    if (variant === 'outlined') return buttonStyles.secondary(theme);
    return buttonStyles.primary(theme);
  };
  
  return (
    <Button
      variant={variant}
      color={color}
      sx={{
        ...getButtonStyle(),
        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
