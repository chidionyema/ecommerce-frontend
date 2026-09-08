// GradientButton.tsx
import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import LinkComponent from './LinkComponent';

export interface GradientButtonProps extends ButtonProps {
  /** Size variant: small, medium, or large */
  sizeVariant?: 'small' | 'medium' | 'large';
  /** Optional URL for link behavior */
  href?: string;
  /** Button label */
  label: string;
  /** Additional MUI sx styling */
  sx?: SxProps<Theme>;
}

/**
 * Helper function to merge default and custom sx props.
 * Here we simply return an array so that MUI merges them internally.
 */
const mergeSx = (sx1: SxProps<Theme>, sx2?: SxProps<Theme>): SxProps<Theme> =>
  [sx1, sx2].filter(Boolean) as SxProps<Theme>;

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ sizeVariant = 'medium', href, label, sx, ...props }, ref) => {
    const defaultStyles: SxProps<Theme> = {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: '#fff',
      padding:
        sizeVariant === 'small'
          ? '4px 8px'
          : sizeVariant === 'large'
          ? '12px 24px'
          : '8px 16px',
      borderRadius: '4px',
      textTransform: 'none',
      // Hover effect: reverse the gradient
      '&:hover': {
        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
      },
    };

    // If an href is provided, use LinkComponent; otherwise, use a regular button element.
    const Component = href ? LinkComponent : 'button';

    return (
      <Button
        variant="contained"
        color="primary"
        component={Component}
        ref={ref} // Forward the ref to the underlying MUI Button
        {...(href ? { href } : {})}
        sx={mergeSx(defaultStyles, sx)}
        {...props}
      >
        {label}
      </Button>
    );
  }
);

GradientButton.displayName = 'GradientButton';
