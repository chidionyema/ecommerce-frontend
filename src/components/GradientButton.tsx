// src/components/GradientButton.tsx
import React from 'react';
import NextLink from 'next/link';
import Button, { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

export interface GradientButtonProps extends ButtonProps {
  /**
   * Size variant for the button: "small", "medium", or "large".
   * Defaults to "medium".
   */
  sizeVariant?: 'small' | 'medium' | 'large';
  /**
   * The URL to link to.
   */
  href: string;
  /**
   * The button label.  
   */
  label: string;
  /**
   * Optional additional styles.
   */
  sx?: SxProps<Theme>;
}

const sizeStyles = {
  small: {
    px: 3,
    py: 1,
    fontSize: '0.8rem',
  },
  medium: {
    px: 6,
    py: 2,
    fontSize: '1.1rem',
  },
  large: {
    px: 8,
    py: 3,
    fontSize: '1.3rem',
  },
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  sizeVariant = 'medium',
  href,
  label,
  sx,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      component={NextLink}
      href={href}
      sx={(theme) => ({
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        boxShadow: theme.shadows[4],
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: theme.shadows[6],
        },
        ...sizeStyles[sizeVariant],
        ...sx,
      })}
      {...props}
    >
      {label}
    </Button>
  );
};
