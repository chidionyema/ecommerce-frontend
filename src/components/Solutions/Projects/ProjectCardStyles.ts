// ProjectCardStyles.ts - All the styles separated into one file
import { keyframes, alpha, Theme } from '@mui/material';

// Animations
export const animations = {
  shine: keyframes`
    0% { left: -100%; }
    20% { left: 100%; }
    100% { left: 100%; }
  `,
  float: keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `,
  glow: keyframes`
    0% { box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5), 0 0 20px rgba(var(--primary-rgb), 0.3); }
    50% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.8), 0 0 40px rgba(var(--primary-rgb), 0.5); }
    100% { box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5), 0 0 20px rgba(var(--primary-rgb), 0.3); }
  `,
};

// Constants
export const CARD_SIZES = {
  xlarge: {
    width: { xs: '320px', sm: '340px', md: '360px' },
    height: { xs: '460px', sm: '470px', md: '480px' },
  }
};

export const SPACING = {
  xsmall: 0.75,
  small: 1.5,
  medium: 2.5,
  large: 3.5,
  xlarge: 5,
};

// Style creator functions
export const createStyles = (theme: Theme) => {
  
  return {
    // Card container styles
    cardContainer: (hovering: boolean, brandColor: string) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      transform: hovering ? 'scale(1.03)' : 'scale(1)',
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      animation: hovering ? `${animations.float} 4s ease-in-out infinite` : 'none',
      cursor: 'pointer',
      position: 'relative',
      filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))',
    }),

    // Badge and badge content
    badge: (hovering: boolean) => ({
      '& .MuiBadge-badge': {
        top: 25,
        right: 25,
        opacity: hovering ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 20,
      },
    }),

    badgeContent: (brandColor: string) => ({
      display: 'flex',
      alignItems: 'center',
      bgcolor: alpha(brandColor, 0.95),
      color: '#fff',
      px: 1.8,
      py: 0.8,
      borderRadius: '30px',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      boxShadow: `0 2px 15px ${alpha(theme.palette.common.black, 0.35)}`,
      backdropFilter: 'blur(8px)',
    }),

    // Card styles
    card: (hovering: boolean, expanded: boolean, height: any, featured: boolean | undefined, brandColor: string) => ({
      width: CARD_SIZES.xlarge.width,
      height: expanded ? 'auto' : height,
      p: 2,
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer !important',
      '& *': { pointerEvents: 'none !important' },
      '& a, & button': { pointerEvents: 'all !important' },
      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: hovering 
        ? `0 25px 50px -10px ${alpha(theme.palette.common.black, 0.3)}, 0 10px 20px -5px ${alpha(theme.palette.common.black, 0.2)}`
        : `0 8px 20px -5px ${alpha(theme.palette.common.black, 0.15)}`,
      borderRadius: '24px',
      animation: featured ? `${animations.glow} 3s infinite ease-in-out` : 'none',
      '&:hover': {
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '70%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.35)}, transparent)`,
          transform: 'skewX(-25deg)',
          animation: `${animations.shine} 1.5s ease-in-out`,
          zIndex: 1,
        },
      },
      border: featured ? `1px solid ${alpha(brandColor, 0.3)}` : 'none',
      maxWidth: '100%',
      mx: 'auto',
    }),

    // Other component styles
    featuredBadge: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 10,
      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 180, 0, 0.95))',
      color: '#000',
      borderRadius: '30px',
      px: 2.2,
      py: 0.8,
      display: 'flex',
      alignItems: 'center',
      gap: 0.8,
      boxShadow: `0 4px 15px ${alpha(theme.palette.common.black, 0.3)}`,
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },

    imageContainer: (hovering: boolean) => ({
      height: '40%',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: hovering 
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.65))' 
          : 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.75))',
        transition: 'all 0.5s ease',
        zIndex: 1,
      }
    }),

    clientInfoBox: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      p: 2.8,
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      zIndex: 2,
    },

    iconBox: (hovering: boolean, brandColor: string) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: alpha(theme.palette.background.paper, 0.85),
      p: 1.3,
      borderRadius: '50%',
      width: 48,
      height: 48,
      backdropFilter: 'blur(10px)',
      border: `2px solid ${alpha(brandColor, 0.6)}`,
      boxShadow: `0 5px 15px ${alpha(theme.palette.common.black, 0.25)}`,
      transition: 'all 0.4s ease',
      transform: hovering ? 'scale(1.15)' : 'scale(1)',
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.85)}, ${alpha(theme.palette.background.paper, 0.95)})`,
    }),

    cardContent: {
      px: 3.8,
      py: 3.5,
      height: '60%',
      display: 'flex',
      flexDirection: 'column',
      '&:last-child': { pb: 3.5 },
      position: 'relative',
      zIndex: 2,
      bgcolor: alpha(theme.palette.background.paper, 0.98),
    },

    projectTitle: (hovering: boolean, brandColor: string) => ({
      fontSize: '1.7rem', 
      mb: SPACING.medium,
      lineHeight: 1.2,
      position: 'relative',
      display: 'inline-block',
      color: theme.palette.text.primary,
      fontWeight: 800,
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: -12,
        width: hovering ? '90px' : '60px',
        height: '5px',
        background: `linear-gradient(90deg, ${brandColor}, ${theme.palette.secondary.main})`,
        borderRadius: '3px',
        transition: 'width 0.4s ease',
      }
    }),

    metricsBox: (hovering: boolean, brandColor: string) => ({
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 2.8,
      mb: SPACING.medium,
      background: alpha(theme.palette.background.default, 0.7),
      p: 2.2,
      borderRadius: 3.5,
      border: `1px solid ${alpha(brandColor, 0.15)}`,
      backdropFilter: 'blur(8px)',
      boxShadow: `inset 0 0 15px ${alpha(brandColor, 0.08)}`,
      transition: 'all 0.4s ease',
      transform: hovering ? 'translateY(-3px)' : 'translateY(0)',
    }),

    metricItem: (hovering: boolean, index: number) => ({
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      p: 1,
      transition: 'all 0.4s ease',
      transform: hovering ? 'scale(1.05)' : 'scale(1)',
      position: 'relative',
      '&::after': index < 2 ? {
        content: '""',
        position: 'absolute',
        right: -10,
        top: '25%',
        height: '50%',
        width: '1px',
        background: alpha(theme.palette.divider, 0.5),
      } : {},
    }),

    metricValue: (brandColor: string) => ({
      fontSize: '1.45rem',
      lineHeight: 1.2,
      fontWeight: 800,
      background: `linear-gradient(90deg, ${brandColor}, ${theme.palette.secondary.main})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }),

    techBox: (hovering: boolean, brandColorLight: string, brandColor: string) => ({
      mb: SPACING.medium, 
      p: 2.2,
      borderRadius: 3,
      background: hovering 
        ? alpha(brandColorLight, 0.7)
        : alpha(brandColorLight, 0.4),
      border: `1px solid ${alpha(brandColor, 0.25)}`,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${brandColor}, transparent)`,
        zIndex: 1,
      },
    }),

    techContainer: (expanded: boolean, brandColorLight: string) => ({
      display: 'flex', 
      gap: 1.2, 
      flexWrap: 'wrap',
      maxHeight: expanded ? '300px' : '70px',
      overflow: expanded ? 'visible' : 'hidden',
      transition: 'max-height 0.5s ease',
      position: 'relative',
      '&::after': !expanded ? {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '25px',
        background: `linear-gradient(to top, ${alpha(brandColorLight, 0.9)}, transparent)`,
        pointerEvents: 'none',
      } : {},
    }),

    techChip: (brandColor: string) => ({
      height: '32px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      mb: 1,
      background: `linear-gradient(120deg, ${alpha(brandColor, 0.15)}, ${alpha(brandColor, 0.25)})`,
      border: `1px solid ${alpha(brandColor, 0.35)}`,
      '&:hover': {
        transform: 'translateY(-3px) scale(1.05)',
        boxShadow: `0 5px 15px ${alpha(brandColor, 0.3)}`,
        background: `linear-gradient(120deg, ${alpha(brandColor, 0.25)}, ${alpha(brandColor, 0.4)})`,
      },
      '& .MuiChip-label': { 
        px: 1.8,
        fontSize: '0.88rem',
        fontWeight: 600,
        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
      } 
    }),

    expandButton: (brandColor: string) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mt: 1.5,
      gap: 0.8,
      cursor: 'pointer',
      color: brandColor,
      fontWeight: 600,
      fontSize: '0.85rem',
      borderRadius: 2,
      py: 0.8,
      transition: 'all 0.3s ease',
      '&:hover': {
        background: alpha(brandColor, 0.1),
      }
    }),

    description: {
      fontSize: '0.98rem',
      mb: SPACING.medium,
      lineHeight: 1.75,
      pr: 0.5,
    },

    truncatedDescription: {
      fontSize: '0.98rem',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      mb: SPACING.medium,
      lineHeight: 1.75,
      pr: 0.5,
    },

    // Add the missing floating element styles
    floatingElement1: (brandColor: string) => ({
      position: 'absolute',
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${alpha(brandColor, 0.7)}, ${alpha(brandColor, 0.2)})`,
      filter: 'blur(8px)',
      top: -15,
      left: 10,
      opacity: 0.5,
      animation: `${animations.float} 5s ease-in-out infinite`,
    }),

    floatingElement2: (secondaryColor: string) => ({
      position: 'absolute',
      width: 25,
      height: 25,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${alpha(secondaryColor, 0.7)}, ${alpha(secondaryColor, 0.2)})`,
      filter: 'blur(6px)',
      bottom: -10,
      right: 15,
      opacity: 0.4,
      animation: `${animations.float} 4s ease-in-out infinite 1s`,
    }),

    ctaButton: (hovering: boolean, brandColor: string) => ({
      py: 1.8,
      px: 3.8,
      width: '100%',
      maxWidth: '250px',
      fontWeight: 800,
      borderRadius: 10,
      fontSize: '1.05rem',
      letterSpacing: '0.6px',
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      position: 'relative',
      overflow: 'hidden',
      background: `linear-gradient(90deg, ${brandColor}, ${alpha(theme.palette.secondary.main, 0.9)})`,
      boxShadow: hovering 
        ? `0 10px 30px -8px ${alpha(brandColor, 0.7)}, 0 6px 15px -5px ${alpha(theme.palette.common.black, 0.2)}` 
        : `0 8px 20px -5px ${alpha(brandColor, 0.5)}, 0 3px 10px -5px ${alpha(theme.palette.common.black, 0.1)}`,
      transform: hovering ? 'translateY(-5px)' : 'translateY(0)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0))',
        opacity: hovering ? 1 : 0.5,
        transition: 'opacity 0.4s ease',
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '70%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.4)}, transparent)`,
        transform: 'skewX(-25deg)',
        transition: 'all 0.7s ease',
        animation: hovering ? `${animations.shine} 1.5s infinite ease-in-out` : 'none',
        zIndex: 1,
      },
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        zIndex: 2,
      },
      '& .MuiTouchRipple-root': {
        zIndex: 1,
      },
    }),
  };
};

// Utility function
export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '75, 123, 236';
};