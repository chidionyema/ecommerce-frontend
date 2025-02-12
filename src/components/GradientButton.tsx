import React from 'react';
import NextLink from 'next/link';
import Button, { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
// Import SystemStyleObject from @mui/system instead of @mui/material/styles
import { SystemStyleObject } from '@mui/system';

export interface GradientButtonProps extends ButtonProps {
  /**
   * Size variant for the button: "small", "medium", or "large".
   * Defaults to "medium".
   */
  sizeVariant?: 'small' | 'medium' | 'large';
  /**
   * Optional URL to link to. If provided, the button will behave as a link.
   */
  href?: string;
  /**
   * The button label.
   */
  label: React.ReactNode;
  /**
   * Optional additional styles.
   */
  sx?: SxProps<Theme>;
}

// Define size styles as a record of SystemStyleObject for stricter typing.
const sizeStyles: Record<'small' | 'medium' | 'large', SystemStyleObject<Theme>> = {
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

/**
 * Merges two SxProps objects into one.
 *
 * This helper converts the merged result into a function that receives the theme.
 */
const mergeSxProps = (
  defaultSx: SxProps<Theme>,
  sx?: SxProps<Theme>
): SxProps<Theme> => {
  return (theme: Theme) => {
    // Convert each sx prop to an object using the theme if it's a function
    const defaultObj =
      typeof defaultSx === 'function' ? defaultSx(theme) : defaultSx;
    const sxObj = typeof sx === 'function' ? sx(theme) : sx ?? {};
    return { ...defaultObj, ...sxObj };
  };
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  sizeVariant = 'medium',
  href,
  label,
  sx,
  ...props
}) => {
  // Define the default styles (as a SystemStyleObject)
  const defaultStyles: SystemStyleObject<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    background: (theme: Theme) =>
      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: (theme: Theme) => theme.shadows[4],
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: (theme: Theme) => theme.shadows[6],
    },
    ...sizeStyles[sizeVariant],
  };

  // Use NextLink if an href is provided, otherwise use a regular button element
  const Component = href ? NextLink : 'button';

  return (
    <Button
      variant="contained"
      color="primary"
      component={Component}
      {...(href ? { href } : {})}
      // Merge defaultStyles with any passed-in sx using the helper
      sx={mergeSxProps(defaultStyles, sx)}
      {...props}
    >
      {label}
    </Button>
  );
};
