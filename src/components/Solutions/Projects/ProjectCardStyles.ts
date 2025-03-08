// ProjectCardStyles.ts
import { keyframes, Theme, alpha } from '@mui/material/styles';

// Animation keyframes
export const animations = {
  shimmer: keyframes`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  `,
  pulse: keyframes`
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  `,
  float: keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  `,
  glow: keyframes`
    0% { 
      box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.3),
                 0 0 10px rgba(var(--primary-rgb), 0.2); 
    }
    50% { 
      box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.5),
                 0 0 25px rgba(var(--primary-rgb), 0.3); 
    }
    100% { 
      box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.3),
                 0 0 10px rgba(var(--primary-rgb), 0.2); 
    }
  `,
  reveal: keyframes`
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  `,
  rotateIn: keyframes`
    0% { transform: perspective(1200px) rotateX(10deg); opacity: 0; }
    100% { transform: perspective(1200px) rotateX(0); opacity: 1; }
  `
};

// Design constants
export const SIZES = {
  card: {
    width: { xs: '320px', sm: '360px', md: '380px' },
    height: { xs: '450px', sm: '480px', md: '500px' },
  },
  icon: {
    small: 36,
    medium: 44,
    large: 56,
  },
  borderRadius: {
    small: 2,
    medium: 3,
    large: 4,
  }
};

// Z-index management
export const Z_INDICES = {
  base: 1,
  imageOverlay: 2,
  content: 3,
  badge: 9,
  button: 10,
};

// Create common styles with theme integration
export const createCardStyles = (theme: Theme, brandColor: string, isHovering: boolean = false) => {
  const isDarkMode = theme.palette.mode === 'dark';
  const brandColorLight = alpha(brandColor, 0.15);
  const brandColorMedium = alpha(brandColor, 0.3);
  
  return {
    // Main card container
    card: {
      width: SIZES.card.width,
      height: SIZES.card.height,
      borderRadius: SIZES.borderRadius.large,
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: isHovering 
        ? `0 25px 50px -12px ${alpha(brandColor, 0.35)}`
        : `0 15px 30px -5px ${alpha(theme.palette.common.black, 0.2)}`,
      transition: 'all 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
      transform: isHovering ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    },
    
    // Featured card styles
    featuredCard: {
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        borderRadius: 'inherit',
        padding: '2px',
        background: `linear-gradient(45deg, ${brandColor}, ${alpha(theme.palette.secondary.main, 0.7)})`,
        WebkitMask: 
          'linear-gradient(#fff 0 0) content-box, ' +
          'linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        animation: `${animations.glow} 3s infinite ease-in-out`,
      }
    },
    
    // Featured badge
    featuredBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: Z_INDICES.badge,
      px: 2,
      py: 0.8,
      borderRadius: '30px',
      background: `linear-gradient(135deg, ${alpha('#FFD700', 0.95)}, ${alpha('#FFA500', 0.95)})`,
      backdropFilter: 'blur(4px)',
      boxShadow: `0 4px 12px ${alpha('#000', 0.15)}`,
      display: 'flex',
      alignItems: 'center',
      gap: 0.8,
      color: '#000',
      fontWeight: 700,
      fontSize: '0.8rem',
      transform: isHovering ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform 0.3s ease',
    },
    
    // Image container
    imageContainer: {
      height: '200px',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
    },
    
    // Loading skeleton
    skeleton: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      bgcolor: alpha(theme.palette.background.default, 0.1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(90deg, 
          ${alpha(theme.palette.background.default, 0)} 0%, 
          ${alpha(theme.palette.background.default, 0.15)} 50%, 
          ${alpha(theme.palette.background.default, 0)} 100%)`,
        animation: `${animations.shimmer} 2s infinite`,
      }
    },
    
    // Image background
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: isHovering ? 'scale(1.08)' : 'scale(1)',
      transition: 'transform 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
    },
    
    // Gradient overlay for images
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: isHovering
        ? `linear-gradient(to bottom, 
            ${alpha(theme.palette.common.black, 0.2)}, 
            ${alpha(theme.palette.common.black, 0.7)})`
        : `linear-gradient(to bottom, 
            ${alpha(theme.palette.common.black, 0.3)}, 
            ${alpha(theme.palette.common.black, 0.8)})`,
      transition: 'all 0.5s ease',
      zIndex: Z_INDICES.imageOverlay,
    },
    
    // Client info section
    clientInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      p: 2.5,
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      zIndex: Z_INDICES.content,
      width: '100%',
    },
    
    // Icon container
    iconContainer: {
      width: SIZES.icon.medium,
      height: SIZES.icon.medium,
      borderRadius: '12px',
      bgcolor: alpha('#fff', 0.92),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 4px 15px ${alpha(theme.palette.common.black, 0.25)}`,
      backdropFilter: 'blur(8px)',
      border: `1px solid ${alpha(brandColor, 0.6)}`,
      transform: isHovering ? 'scale(1.1) translateY(-4px)' : 'scale(1) translateY(0)',
      transition: 'all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
    },
    
    // Client name
    clientName: {
      color: '#fff',
      fontWeight: 700,
      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      fontSize: '1.1rem',
      transform: isHovering ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'all 0.4s ease',
    },
    
    // Content container
    contentContainer: {
      p: 2.5,
      pt: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2.5,
      position: 'relative',
      background: isDarkMode 
        ? `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 0.85)}, ${alpha(theme.palette.background.paper, 0.97)})`
        : theme.palette.background.paper,
      backdropFilter: 'blur(10px)',
      height: 'calc(100% - 200px)',
    },
    
    // Floating decoration
    floatingElement: (size: number, position: { top?: number | string; bottom?: number | string; left?: number | string; right?: number | string }, delay: number = 0) => ({
      position: 'absolute',
      width: size,
      height: size,
      ...position,
      background: `radial-gradient(circle, ${alpha(brandColor, 0.2)}, transparent 70%)`,
      borderRadius: '50%',
      animation: `${animations.float} ${5 + delay}s ease-in-out infinite ${delay}s`,
      zIndex: 0,
      opacity: isHovering ? 0.9 : 0.5,
      transition: 'opacity 0.5s ease',
    }),
    
    // Project title
    projectTitle: {
      fontSize: { xs: '1.25rem', sm: '1.4rem' },
      fontWeight: 800,
      lineHeight: 1.3,
      position: 'relative',
      pb: 1.5,
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: isHovering ? '80px' : '60px',
        height: '4px',
        background: `linear-gradient(90deg, ${brandColor}, ${alpha(brandColor, 0.5)})`,
        borderRadius: '4px',
        transition: 'width 0.4s ease',
        boxShadow: `0 2px 6px ${alpha(brandColor, 0.4)}`,
      }
    },
    
    // Metrics container
    metricsContainer: {
      display: 'flex',
      gap: 2,
      justifyContent: 'space-between',
      px: 2,
      py: 2,
      borderRadius: 3,
      background: isDarkMode 
        ? alpha(theme.palette.background.default, 0.6)
        : alpha(theme.palette.background.default, 0.8),
      border: `1px solid ${alpha(brandColor, 0.2)}`,
      boxShadow: `inset 0 0 15px ${alpha(brandColor, 0.05)}`,
      transform: isHovering ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -2,
        left: -2,
        right: -2,
        height: '1.5px',
        background: `linear-gradient(90deg, ${alpha(brandColor, 0.05)}, ${brandColor}, ${alpha(brandColor, 0.05)})`,
        zIndex: 1,
      }
    },
    
    // Metric item
    metricItem: (index: number, total: number) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      position: 'relative',
      '&::after': index < total - 1 ? {
        content: '""',
        position: 'absolute',
        right: -8,
        top: '20%',
        height: '60%',
        width: '1px',
        background: alpha(theme.palette.divider, 0.6),
      } : {},
    }),
    
    // Metric value
    metricValue: {
      fontWeight: 800,
      fontSize: '1.3rem',
      background: `linear-gradient(90deg, ${brandColor}, ${theme.palette.secondary.main})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    
    // Metric label
    metricLabel: {
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: 0.5,
      opacity: 0.8,
      mt: 0.5,
    },
    
    // Technology container
    technologiesContainer: {
      borderRadius: 3,
      p: 2,
      background: alpha(brandColorLight, isDarkMode ? 0.2 : 0.5),
      border: `1px solid ${alpha(brandColor, 0.2)}`,
      position: 'relative',
      transition: 'all 0.3s ease',
      transform: isHovering ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: isHovering 
        ? `0 8px 20px -5px ${alpha(brandColor, 0.25)}`
        : 'none',
    },
    
    // Tech label
    techLabel: {
      fontSize: '0.75rem',
      color: isDarkMode ? theme.palette.text.secondary : alpha(theme.palette.text.primary, 0.7),
      display: 'flex',
      alignItems: 'center',
      mb: 1.5,
      '&::before': {
        content: '""',
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: brandColor,
        mr: 1,
        boxShadow: `0 0 8px ${alpha(brandColor, 0.8)}`,
      }
    },
    
    // Tech chips wrapper
    techChipsWrapper: (expanded: boolean) => ({
      display: 'flex',
      flexWrap: 'wrap',
      gap: 0.8,
      maxHeight: expanded ? '200px' : '80px',
      overflowY: expanded ? 'auto' : 'hidden',
      position: 'relative',
      '&::after': !expanded ? {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '35px',
        background: `linear-gradient(to top, ${alpha(brandColorLight, 0.95)}, transparent)`,
        pointerEvents: 'none',
        zIndex: 1,
      } : {},
      // Custom scrollbar
      '&::-webkit-scrollbar': {
        width: '5px',
      },
      '&::-webkit-scrollbar-track': {
        background: alpha(theme.palette.background.default, 0.1),
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: alpha(brandColor, 0.3),
        borderRadius: '10px',
      },
    }),
    
    // Tech chip
    techChip: (index: number) => ({
      height: '28px',
      fontSize: '0.8rem',
      fontWeight: 600,
      borderRadius: '8px',
      mb: 0.8,
      background: `linear-gradient(120deg, ${alpha(brandColor, 0.1)}, ${alpha(brandColor, 0.25)})`,
      color: theme.palette.text.primary,
      border: `1px solid ${alpha(brandColor, 0.3)}`,
      transition: 'all 0.3s ease',
      animation: isHovering ? `${animations.pulse} ${3 + index % 2}s ease-in-out infinite` : 'none',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: `0 4px 8px ${alpha(brandColor, 0.3)}`,
        background: `linear-gradient(120deg, ${alpha(brandColor, 0.2)}, ${alpha(brandColor, 0.35)})`,
      },
      '& .MuiChip-label': { px: 1.2 },
    }),
    
    // Show more/less button
    showMoreButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0.5,
      mt: 1.5,
      py: 0.8,
      borderRadius: 2,
      cursor: 'pointer',
      color: brandColor,
      fontSize: '0.85rem',
      fontWeight: 600,
      transition: 'all 0.2s ease',
      background: alpha(brandColor, 0.05),
      '&:hover': {
        background: alpha(brandColor, 0.15),
      }
    },
    
    // Description text
    description: {
      fontSize: '0.95rem',
      lineHeight: 1.7,
      pb: 1,
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: alpha(theme.palette.divider, 0.5),
      }
    },
    
    // Truncated description
    truncatedDescription: {
      fontSize: '0.95rem',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      lineHeight: 1.7,
      mb: 1,
    },
    
    // CTA Button
    ctaButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      py: 1.2,
      px: 2,
      borderRadius: 2,
      background: `linear-gradient(90deg, ${brandColor}, ${theme.palette.secondary.main || alpha(brandColor, 0.7)})`,
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '0.95rem',
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transform: isHovering ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: isHovering 
        ? `0 10px 25px -5px ${alpha(brandColor, 0.6)}, 0 8px 10px -6px ${alpha(theme.palette.common.black, 0.2)}`
        : `0 6px 15px -3px ${alpha(brandColor, 0.4)}, 0 3px 6px -4px ${alpha(theme.palette.common.black, 0.1)}`,
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
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.2)}, transparent)`,
        zIndex: 2,
        animation: isHovering ? `${animations.shimmer} 2s infinite` : 'none',
      },
      '& > *': {
        zIndex: 3,
      },
    },
    
    // Quick view button
    quickViewButton: {
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: Z_INDICES.button,
      width: 40,
      height: 40,
      background: alpha(theme.palette.background.paper, 0.85),
      backdropFilter: 'blur(8px)',
      border: `1px solid ${alpha(brandColor, 0.3)}`,
      color: brandColor,
      boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
      '&:hover': {
        background: alpha(theme.palette.background.paper, 0.95),
        transform: 'scale(1.1)',
      },
    }
  };
};

// Utility functions
export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '75, 123, 236';
};

export const extractNumericValue = (value: string): number => {
  const match = value.match(/[-+]?[0-9]*\.?[0-9]+/);
  return match ? parseFloat(match[0]) : 0;
};

// Media query helper functions
export const generateResponsiveStyles = (
  property: string, 
  values: { xs?: any; sm?: any; md?: any; lg?: any; xl?: any }
) => {
  return Object.entries(values).reduce((acc, [breakpoint, value]) => {
    if (value !== undefined) {
      if (breakpoint === 'xs') {
        acc[property] = value;
      } else {
        acc[`@media (min-width: ${getBreakpointValue(breakpoint)}px)`] = {
          [property]: value
        };
      }
    }
    return acc;
  }, {} as Record<string, any>);
};

// Get breakpoint values
const getBreakpointValue = (breakpoint: string): number => {
  const breakpoints: Record<string, number> = {
    'xs': 0,
    'sm': 600,
    'md': 960, 
    'lg': 1280,
    'xl': 1920
  };
  return breakpoints[breakpoint] || 0;
};

export default createCardStyles;