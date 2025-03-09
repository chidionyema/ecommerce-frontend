import React, { useState, useEffect, ReactNode } from 'react';
import { keyframes, SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

// Animation keyframes
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(var(--primary-rgb), 0); }
  100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0); }
`;

// Define types for the component props
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'subtle' | 'solid' | 'gradient' | 'outline' | 'ghost';

// Define a type for the icon elements that includes fontSize
interface IconElementProps {
  fontSize?: string | number;
}

interface StylizedButtonProps {
  href?: string;
  label: string;
  startIcon?: React.ReactElement<IconElementProps>;
  endIcon?: React.ReactElement<IconElementProps>;
  isHovering?: boolean;
  brandColor?: string;
  sx?: SxProps<Theme>;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  pulse?: boolean;
  disabled?: boolean;
  external?: boolean;
  [key: string]: any; // For other props that might be passed
}

/**
 * StylizedButton - A highly customizable button component with advanced styling and animations
 */
const StylizedButton: React.FC<StylizedButtonProps> = ({
  href,
  label,
  startIcon,
  endIcon,
  isHovering = false,
  brandColor,
  sx = {},
  onClick,
  size = 'medium',
  variant = 'gradient',
  pulse: pulsing = false,
  disabled = false,
  external = false,
  ...rest
}) => {
  const theme = useTheme();
  const [isPulsing, setIsPulsing] = useState<boolean>(pulsing);
  const isDarkMode = theme.palette.mode === 'dark';

  // Convert hex color to rgb for CSS variables
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '75, 123, 236';
  };

  // Set pulsing state based on props
  useEffect(() => {
    setIsPulsing(pulsing);
  }, [pulsing]);

  // Size mappings
  const sizeMap: Record<ButtonSize, Record<string, any>> = {
    small: {
      py: 0.8,
      px: 1.8,
      fontSize: '0.85rem',
      borderRadius: 1.5,
    },
    medium: {
      py: 1.2,
      px: 2.5,
      fontSize: '0.95rem',
      borderRadius: 2,
    },
    large: {
      py: 1.5,
      px: 3,
      fontSize: '1.05rem',
      borderRadius: 2.5,
    },
  };

  // Get color values
  const primaryColor = brandColor || theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main || alpha(primaryColor, 0.7);
  const textColor = variant === 'outline' || variant === 'ghost' 
    ? primaryColor 
    : (isDarkMode ? '#fff' : '#fff');

  // Generate style based on variant
  const getVariantStyle = (): Record<string, any> => {
    const baseStyle = {
      color: textColor,
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transform: isHovering && !disabled ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    switch (variant) {
      case 'subtle':
        return {
          ...baseStyle,
          background: alpha(primaryColor, 0.1),
          color: primaryColor,
          boxShadow: 'none',
          '&:hover': {
            background: alpha(primaryColor, 0.2),
          },
        };
      case 'outline':
        return {
          ...baseStyle,
          background: 'transparent',
          border: `2px solid ${primaryColor}`,
          boxShadow: isHovering && !disabled 
            ? `0 6px 15px -3px ${alpha(primaryColor, 0.3)}`
            : 'none',
        };
      case 'ghost':
        return {
          ...baseStyle,
          background: 'transparent',
          boxShadow: 'none',
          '&:hover': {
            background: alpha(primaryColor, 0.1),
          },
        };
      case 'solid':
        return {
          ...baseStyle,
          background: primaryColor,
          boxShadow: isHovering && !disabled 
            ? `0 10px 20px -5px ${alpha(primaryColor, 0.5)}, 0 6px 12px -8px ${alpha(theme.palette.common.black, 0.3)}`
            : `0 6px 12px -6px ${alpha(primaryColor, 0.4)}`,
        };
      case 'gradient':
      default:
        return {
          ...baseStyle,
          background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
          boxShadow: isHovering && !disabled 
            ? `0 10px 25px -5px ${alpha(primaryColor, 0.6)}, 0 8px 10px -6px ${alpha(theme.palette.common.black, 0.2)}`
            : `0 6px 15px -3px ${alpha(primaryColor, 0.4)}, 0 3px 6px -4px ${alpha(theme.palette.common.black, 0.1)}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0))',
            zIndex: 1,
          },
        };
    }
  };

  // Combine all styles
  const combinedStyle = {
    ...sizeMap[size],
    ...getVariantStyle(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    fontWeight: 600,
    letterSpacing: '0.02em',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    animation: isPulsing ? `${pulse} 2s infinite` : 'none',
    '--primary-rgb': hexToRgb(primaryColor),
    '&::after': (variant === 'gradient' && isHovering && !disabled) ? {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.2)}, transparent)`,
      zIndex: 2,
      animation: `${shimmer} 2s infinite`,
    } : {},
    '& > *': {
      zIndex: 3,
    },
    ...sx
  };

  // Handle click events
  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  // Button content
  const ButtonContent = (
    <>
      {startIcon && React.isValidElement<IconElementProps>(startIcon) && 
        React.cloneElement(startIcon, { fontSize: 'inherit' as any })}
      {label}
      {endIcon && React.isValidElement<IconElementProps>(endIcon) && 
        React.cloneElement(endIcon, { fontSize: 'inherit' as any })}
    </>
  );

  // If it's an external link or just a regular href
  if (href) {
    return (
      <Box
        component="a"
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        sx={combinedStyle}
        {...rest}
      >
        {ButtonContent}
      </Box>
    );
  }

  // Regular button
  return (
    <Box
      component="button"
      type="button"
      onClick={handleClick}
      disabled={disabled}
      sx={{
        ...combinedStyle,
        border: 'none',
        outline: 'none',
      }}
      {...rest}
    >
      {ButtonContent}
    </Box>
  );
};

export default StylizedButton;