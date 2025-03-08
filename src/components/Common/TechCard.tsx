'use client';

import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { Typography, useTheme, Box } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { motion, useInView, AnimatePresence } from 'framer-motion';

import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const GLASS_OPACITY = 0.08;
const GLASS_BLUR = '16px';

export interface TechCardProps {
  icon?: ReactElement | null;
  title: string;
  index?: number;
  children?: ReactNode;
  sx?: SxProps<Theme>;
  accentColor?: string;
  category?: string;
  importance?: 'primary' | 'secondary' | 'tertiary';
  blurAmount?: string;
  opacityLevel?: number;
}


const NumberedCircle = ({ number, theme, accentColor }: { 
  number: number; 
  theme: Theme;
  accentColor?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box
        sx={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${accentColor || theme.palette.primary.main} 0%, ${alpha(accentColor || theme.palette.primary.dark, 0.8)} 100%)`,
          boxShadow: `0 ${isHovered ? '8' : '4'}px ${isHovered ? '32' : '16'}px ${alpha(accentColor || theme.palette.primary.main, isHovered ? 0.6 : 0.35)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(accentColor || theme.palette.primary.light, 0.8)} 0%, transparent 70%)`,
          }}
        />
        
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          color="white" 
          sx={{ 
            fontSize: '1.35rem',
            fontFamily: '"Space Grotesk", "Poppins", "Roboto", sans-serif',
            letterSpacing: '0.5px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {number}
        </Typography>
      </Box>
    </motion.div>
  );
};

interface GlassBackdropProps {
  blurAmount?: string;
  opacityLevel?: number;
}

const GlassBackdrop = styled(Box, {
  shouldForwardProp: (prop) => !['blurAmount', 'opacityLevel'].includes(prop as string)
})<GlassBackdropProps>(({ theme, blurAmount = GLASS_BLUR, opacityLevel = GLASS_OPACITY }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backdropFilter: `blur(${blurAmount})`,
  backgroundColor: alpha(
    theme.palette.mode === 'light' ? '#ffffff' : '#000000', 
    opacityLevel
  ),
  borderRadius: 'inherit',
  zIndex: -1,
}));

const ShineEffect = styled(motion.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '150%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
  transform: 'translateX(-100%)',
  pointerEvents: 'none',
  zIndex: 1,
});

const CategoryLabel = ({ category, theme }: { category: string; theme: Theme }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 16,
      right: 16,
      background: alpha(theme.palette.primary.main, 0.18),
      color: theme.palette.primary.main,
      fontSize: '0.7rem',
      fontWeight: 700,
      padding: '4px 10px',
      borderRadius: '6px',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      backdropFilter: 'blur(6px)',
      border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`,
    }}
  >
    {category}
  </Box>
);

interface StyledTechCardProps {
  importance?: 'primary' | 'secondary' | 'tertiary';
  accentColor?: string;
}

const StyledTechCard = styled(motion.div, {
  shouldForwardProp: (prop) => !['importance', 'accentColor'].includes(prop as string)
})<StyledTechCardProps>(({ theme, importance, accentColor }) => {
  const getImportanceStyles = () => {
    switch(importance) {
      case 'primary':
        return {
          borderWidth: 2,
          boxShadow: `0px 20px 60px ${alpha(accentColor || theme.palette.primary.main, 0.25)}`,
          transform: 'scale(1.05)',
        };
      case 'secondary':
        return {
          borderWidth: 1.5,
          boxShadow: `0px 15px 35px ${alpha(theme.palette.grey[800], 0.18)}`,
          transform: 'scale(1)',
        };
      case 'tertiary':
      default:
        return {
          borderWidth: 1,
          boxShadow: `0px 10px 20px ${alpha(theme.palette.grey[800], 0.12)}`,
          transform: 'scale(1)',
        };
    }
  };

  const importanceStyles = getImportanceStyles();
  
  return {
    position: 'relative',
    padding: theme.spacing(5),
    borderRadius: 24,
    height: '100%',
    background: 'transparent',
    border: `${importanceStyles.borderWidth}px solid ${
      theme.palette.mode === 'light'
        ? alpha(accentColor || theme.palette.primary.light, 0.25)
        : alpha(accentColor || theme.palette.primary.dark, 0.35)
    }`,
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    overflow: 'hidden',
    boxShadow: importanceStyles.boxShadow,
    transform: importanceStyles.transform,
    '&:hover': {
      transform: `translateY(-12px) ${importance === 'primary' ? 'scale(1.07)' : 'scale(1.02)'}`,
      boxShadow: theme.palette.mode === 'light' 
        ? `0px 30px 70px ${alpha(accentColor || theme.palette.primary.main, 0.3)}`
        : `0px 30px 60px ${alpha(theme.palette.common.black, 0.5)}`,
      '& .card-content': {
        transform: 'translateY(-8px)',
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: importance === 'primary' ? '15px' : '10px',
      background: `linear-gradient(90deg, ${accentColor || theme.palette.primary.main}, ${accentColor ? alpha(accentColor, 0.7) : theme.palette.primary.light})`,
      opacity: 0.9,
      transition: 'height 0.3s ease',
    },
    '&:hover::after': {
      height: importance === 'primary' ? '18px' : '12px',
    },
    '@media (max-width: 599.95px)': {
      padding: theme.spacing(3),
    }
  };
});

const TechCard: React.FC<TechCardProps> = ({
  icon,
  title,
  index = 0,
  children,
  sx,
  accentColor,
  category,
  importance = 'secondary',
  blurAmount,
  opacityLevel,
  ...rest
}) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        delay: index * 0.15, 
        type: 'spring', 
        stiffness: 80, 
        damping: 20 
      } 
    },
    hover: { 
      scale: isMobile ? 1 : 1.03,
      transition: { type: 'spring', stiffness: 400, damping: 25 } 
    },
    tap: { scale: 0.98 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.15 + 0.2,
        duration: 0.5
      } 
    }
  };

  const triggerShine = () => {
    if (!isMobile && theme.palette.mode === 'light') {
      return {
        translateX: ['100%', '-100%'],
        transition: { duration: 1.5, ease: 'easeInOut' }
      };
    }
    return {};
  };

  return (
    <StyledTechCard
      ref={ref}
      importance={importance}
      accentColor={accentColor}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      sx={sx}
      {...rest}
    >
      <GlassBackdrop 
        blurAmount={isHovered ? '24px' : blurAmount || GLASS_BLUR}
        opacityLevel={isHovered ? (opacityLevel || GLASS_OPACITY) + 0.04 : opacityLevel || GLASS_OPACITY} 
      />
      
      {theme.palette.mode === 'light' && (
        <AnimatePresence>
          {isHovered && (
            <ShineEffect
              initial={{ translateX: '-100%' }}
              animate={triggerShine()}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      )}
      
      {category && <CategoryLabel category={category} theme={theme} />}
      
      <Box className="card-content" sx={{ transition: 'transform 0.5s ease', zIndex: 2 }}>
        {index > 0 && (
          <NumberedCircle number={index} theme={theme} accentColor={accentColor} />
        )}

        {icon && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ scale: 1.15, rotate: isHovered ? 5 : 0 }}
          >
            <Box sx={{ mb: 3, display: 'inline-block' }}>
              {React.cloneElement(icon, {
                sx: {
                  width: 60,
                  height: 60,
                  color: accentColor || 
                    (theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light),
                  filter: `drop-shadow(0 4px 8px ${alpha(
                    accentColor || theme.palette.primary.main, 
                    0.5
                  )})`,
                  transition: 'all 0.4s ease',
                }
              })}
            </Box>
          </motion.div>
        )}

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 800,
              fontSize: '1.45rem',
              fontFamily: '"Space Grotesk", "Poppins", sans-serif',
              color: theme.palette.text.primary,
              textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0, 0, 0, 0.7)' : 'none',
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: isHovered ? '100%' : '40%',
                height: 3,
                borderRadius: '2px',
                backgroundColor: accentColor || theme.palette.primary.main,
                transition: 'width 0.3s ease',
              }
            }}
          >
            {title}
          </Typography>

          <Box sx={{ mt: 3, opacity: 0.95 }}>
            {children}
          </Box>
        </motion.div>
      </Box>
    </StyledTechCard>
  );
};

export default TechCard;