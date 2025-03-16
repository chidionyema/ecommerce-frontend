// src/utils/designSystem.js
import { alpha } from '@mui/material/styles';

// Shared spacing values
export const SPACING = {
  small: 2,
  medium: 4,
  large: 8,
  xlarge: 12,
};

// Standardized animations based on hero section
export const ANIMATIONS = {
  // Stagger container for child elements
  container: { 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: 0.2 
      } 
    } 
  },
  
  // Standard item fade and rise animations
  item: { 
    hidden: { opacity: 0, y: 20 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.2, 0, 0.2, 1] 
      } 
    } 
  },
  
  // Fade in with customizable delay
  fadeIn: (delay = 0) => ({
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        delay: delay + 0.05, 
        ease: [0.2, 0, 0.2, 1] 
      } 
    }
  }),
  
  // Slide in for transitioning content
  slideIn: {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.2, 0, 0.2, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      x: -20, 
      transition: { 
        duration: 0.3 
      } 
    }
  }
};

// Standardized styles for all sections
export const getSharedStyles = (theme) => ({
  // Layout and background
  sectionContainer: { 
    position: 'relative', 
    width: '100%',
    py: SPACING.large * 1.5,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
    position: 'relative', 
    overflow: 'hidden',
  },
  
  backgroundPattern: { 
    position: 'absolute', 
    inset: 0, 
    opacity: 0.05, 
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
  },
  
  contentContainer: { 
    position: 'relative', 
    zIndex: 2
  },
  
  // Typography
  sectionTitle: {
    color: 'white',
    mb: 2, 
    fontWeight: 800,
    fontSize: { xs: '2.2rem', sm: '2.7rem', md: '3.2rem' },
    letterSpacing: '-0.01em', 
    textShadow: '0 4px 12px rgba(0,0,0,0.6)',
    textAlign: 'center',
    position: 'relative',
    '&::after': { 
      content: '""', 
      position: 'absolute', 
      bottom: -16, 
      left: '50%', 
      transform: 'translateX(-50%)', 
      width: { xs: '60px', md: '80px' }, 
      height: '4px', 
      background: `linear-gradient(90deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.main, 0.1)})`, 
      borderRadius: '2px' 
    }
  },
  
  sectionSubtitle: {
    color: alpha(theme.palette.common.white, 0.9), 
    mb: 6, 
    maxWidth: '800px', 
    mx: 'auto',
    textShadow: '0 2px 4px rgba(0,0,0,0.4)', 
    fontSize: '1.2rem', 
    lineHeight: 1.6, 
    fontWeight: 500,
    textAlign: 'center'
  },
  
  accentText: { 
    background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`, 
    backgroundClip: 'text', 
    WebkitBackgroundClip: 'text', 
    color: 'transparent', 
    WebkitTextFillColor: 'transparent' 
  },
  
  // Buttons
  primaryButton: {
    px: 5, 
    py: 2, 
    height: 48, 
    fontSize: '1.1rem', 
    fontWeight: 700, 
    borderRadius: 12, 
    textTransform: 'none',
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.dark, 0.9)})`,
    boxShadow: `0 8px 16px ${alpha(theme.palette.secondary.main, 0.35)}`, 
    transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)',
    '&:hover': { 
      transform: 'translateY(-3px)', 
      boxShadow: `0 12px 24px ${alpha(theme.palette.secondary.main, 0.45)}` 
    },
    '&:active': { 
      transform: 'translateY(-1px)', 
      boxShadow: `0 8px 12px ${alpha(theme.palette.secondary.main, 0.4)}` 
    }
  },
  
  secondaryButton: {
    px: 4, 
    py: 1.75, 
    height: 48, 
    fontSize: '1rem', 
    fontWeight: 600, 
    borderRadius: 12, 
    textTransform: 'none', 
    borderWidth: 1.5, 
    borderColor: alpha('#fff', 0.8), 
    color: '#fff', 
    backgroundColor: alpha('#000', 0.12), 
    backdropFilter: 'blur(8px)',
    transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)', 
    '&:hover': { 
      borderColor: '#fff', 
      backgroundColor: alpha('#fff', 0.08), 
      transform: 'translateY(-3px)' 
    },
    '&:active': { 
      transform: 'translateY(-1px)', 
      backgroundColor: alpha('#fff', 0.05) 
    }
  },
  
  // Cards
  benefitCard: { 
    p: 3, 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    background: alpha('#1a56db', 0.15), 
    border: `1px solid ${alpha('#4285f4', 0.3)}`, 
    borderRadius: 16, 
    backdropFilter: 'blur(12px)', 
    transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)', 
    boxShadow: `0 8px 16px ${alpha('#000', 0.15)}`, 
    '&:hover': { 
      transform: 'translateY(-4px)', 
      background: alpha('#1a56db', 0.2), 
      boxShadow: `0 20px 40px ${alpha('#000', 0.2)}`, 
      border: `1px solid ${alpha('#4285f4', 0.4)}` 
    } 
  },
  
  ctaCard: { 
    mt: 6, 
    mb: 4, 
    mx: 'auto', 
    maxWidth: '700px', 
    p: 3, 
    borderRadius: 3,
    background: alpha(theme.palette.background.paper, 0.95), 
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`
  },
  
  // UI Elements
  blueCheckBox: { 
    width: 20, 
    height: 20, 
    borderRadius: '50%', 
    backgroundColor: theme.palette.primary.main,
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: 'white',
    fontSize: '0.8rem', 
    fontWeight: 'bold'
  },
  
  blueCheckmarkStyle: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: 1.5, 
    mb: 1.5 
  },
  
  iconBox: { 
    borderRadius: '50%', 
    p: 1.5, 
    color: '#fff', 
    width: 'fit-content', 
    mb: 2, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    boxShadow: `0 6px 12px ${alpha('#000', 0.2)}` 
  },
});

// Consistent card styling for TechCard component
export const getTechCardStyles = (theme, color = theme.palette.primary.main, isHovered = false) => ({
  card: {
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    p: 3,
    borderRadius: 16,
    border: `1px solid ${alpha(color, 0.3)}`,
    background: alpha('#1a56db', isHovered ? 0.2 : 0.15),
    backdropFilter: 'blur(12px)',
    transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
    boxShadow: `0 8px 16px ${alpha('#000', 0.15)}`,
    '&:hover': {
      transform: 'translateY(-4px)',
      background: alpha('#1a56db', 0.2),
      boxShadow: `0 20px 40px ${alpha('#000', 0.2)}`,
      border: `1px solid ${alpha(color, 0.4)}`
    }
  },
  
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    mb: 2
  },
  
  icon: {
    p: 1.5,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${alpha(color, 0.3)}, ${alpha(color, 0.1)})`,
    boxShadow: `0 6px 12px ${alpha(color, 0.2)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    border: `1px solid ${alpha(color, 0.3)}`
  },
  
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: theme.palette.mode === 'light' ? theme.palette.text.primary : 'white',
    textAlign: 'center',
    mb: 1,
    letterSpacing: '-0.01em'
  },
  
  content: {
    textAlign: 'center',
    mt: 1,
    fontWeight: 500,
    color: alpha(theme.palette.text.primary, 0.95),
    flexGrow: 1,
    lineHeight: 1.6
  }
});