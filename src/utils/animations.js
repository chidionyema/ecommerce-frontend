Create a dedicated animation system file (src/utils/animations.js)

// Enhanced keyframe animations
export const keyframes = {
  shine: `
    0% { left: -100%; }
    20% { left: 100%; }
    100% { left: 100%; }
  `,
  
  float: `
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `,
  
  pulse: `
    0% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.4); }
    70% { box-shadow: 0 0 0 15px rgba(var(--primary-rgb), 0); }
    100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0); }
  `,
  
  glow: `
    0% { box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5), 0 0 20px rgba(var(--primary-rgb), 0.3); }
    50% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.8), 0 0 40px rgba(var(--primary-rgb), 0.5); }
    100% { box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5), 0 0 20px rgba(var(--primary-rgb), 0.3); }
  `,
  
  shimmer: `
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  `
};

// Enhanced framer-motion variants for consistent animations
export const motionVariants = {
  card: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  
  slideInRight: {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  
  slideInLeft: {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  
  slideInUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  staggerItem: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }
};

// Animation utility for scroll reveal
export const createScrollRevealAnimation = (threshold = 0.1, rootMargin = '0px') => {
  return {
    variants: motionVariants.slideInUp,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, threshold, rootMargin }
  };
};

// Generate color transformations for dynamic theming
export const generateColorVariations = (baseColor, theme) => {
  // Convert hex to rgb helper
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : null;
  };
  
  const rgbColor = hexToRgb(baseColor);
  
  return {
    rgbValue: rgbColor,
    light: theme.palette.mode === 'dark' 
      ? `rgba(${rgbColor}, 0.2)`
      : `rgba(${rgbColor}, 0.15)`,
    medium: theme.palette.mode === 'dark' 
      ? `rgba(${rgbColor}, 0.5)`
      : `rgba(${rgbColor}, 0.4)`,
    gradient: `linear-gradient(135deg, ${baseColor}, ${theme.palette.secondary.main})`,
    glassMorphism: theme.palette.mode === 'dark'
      ? `rgba(${rgbColor}, 0.12)`
      : `rgba(${rgbColor}, 0.05)`,
    glow: `0 0 20px rgba(${rgbColor}, 0.5), 0 0 40px rgba(${rgbColor}, 0.3)`
  };
};
