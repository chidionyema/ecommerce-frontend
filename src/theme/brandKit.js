// FILE: src/theme/brandKit.js
// Create a single compact file with all brand design tokens

import { alpha } from '@mui/material';

export const theme = {
  // Basic design tokens
  color: {
    primary: '#3366FF',
    secondary: '#FF6B3D',
    success: '#10B981'
  },
  
  // Common values that help maintain consistency
  radius: { sm: 1, md: 2, lg: 3 },
  alpha: { faint: 0.05, light: 0.1, medium: 0.3, strong: 0.6, solid: 0.9 },
  anim: { fast: 300, normal: 500, slow: 800 },
  
  // Prebuilt style objects for direct use
  gradient: {
    primary: (t) => `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${t.palette.secondary.main} 100%)`,
    secondary: (t) => `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
    dark: (t) => `linear-gradient(135deg, ${t.palette.primary.dark} 0%, ${t.palette.primary.main} 100%)`
  },
  
  shadow: {
    card: (t) => `0 4px 12px ${t.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
    hover: (t) => `0 8px 20px ${t.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'}`
  },
  
  // Common component styles
  styles: {
    // Card variations
    card: {
      standard: (t) => ({
        border: `1px solid ${alpha(t.palette.divider, 0.1)}`,
        borderRadius: t.shape.borderRadius * 2,
        p: 3,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': { boxShadow: theme.shadow.card(t) }
      }),
      
      featured: (t) => ({
        boxShadow: t.shadows[3],
        borderRadius: t.shape.borderRadius * 2,
        p: 3,
        height: '100%',
        border: `1px solid ${alpha(t.palette.primary.main, 0.3)}`,
        transition: 'all 0.3s ease',
        '&:hover': { boxShadow: theme.shadow.hover(t) }
      }),
      
      glass: (t) => ({
        backdropFilter: 'blur(8px)',
        backgroundColor: alpha(t.palette.background.paper, t.palette.mode === 'dark' ? 0.8 : 0.9),
        borderRadius: t.shape.borderRadius * 2,
        p: 3,
        height: '100%'
      })
    },
    
    // Button variations
    button: {
      primary: (t) => ({ 
        background: theme.gradient.primary(t),
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: t.shape.borderRadius * 2,
        py: 1.5, px: 3
      }),
      
      secondary: (t) => ({
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: t.shape.borderRadius * 2,
        py: 1.5, px: 3,
        borderColor: alpha(t.palette.primary.main, 0.3)
      })
    },
    
    // Typography styles
    text: {
      heading: { fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 700, mb: 2 },
      section: { fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 1.5 },
      component: { fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 600, mb: 1 }
    },
    
    // Icon styles
    icon: {
      circleBase: (t) => ({ 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: alpha(t.palette.primary.main, 0.1)
      }),
      sizes: {
        sm: { width: 32, height: 32, '& > svg': { fontSize: 16 } },
        md: { width: 40, height: 40, '& > svg': { fontSize: 20 } },
        lg: { width: 56, height: 56, '& > svg': { fontSize: 28 } }
      }
    }
  }
};