'use client';

import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { Typography, useTheme, alpha, Box } from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';

// Glass morphism effect constants
const GLASS_OPACITY = 0.07;
const GLASS_BLUR = '12px';

export interface TechCardProps {
    icon?: ReactElement | null;
    title: string;
    index?: number;
    children?: ReactNode;
    sx?: any;
    accentColor?: string;
    category?: string;
    importance?: 'primary' | 'secondary' | 'tertiary';
}

// Enhanced NumberedCircle with interactive elements
const NumberedCircle = ({ number, theme, accentColor }: { number: number; theme: any; accentColor?: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.12, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
        >
            <Box
                sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${accentColor || theme.palette.primary.main} 0%, ${alpha(accentColor || theme.palette.primary.dark, 0.8)} 100%)`,
                    boxShadow: isHovered 
                        ? `0 8px 32px ${alpha(accentColor || theme.palette.primary.main, 0.5)}`
                        : `0 4px 12px ${alpha(accentColor || theme.palette.primary.main, 0.3)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle circular pulse animation */}
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
                        fontSize: '1.25rem',
                        fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
                        letterSpacing: '0.5px',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {number}
                </Typography>
            </Box>
        </motion.div>
    );
};

// Define interface for the GlassBackdrop props
interface GlassBackdropProps {
    blurAmount?: string;
    opacityLevel?: number;
}

// Glass effect backdrop with customizable blur and opacity
const GlassBackdrop = styled(Box)<GlassBackdropProps>(({ theme, blurAmount = GLASS_BLUR, opacityLevel = GLASS_OPACITY }) => ({
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

// Shine effect for light mode cards
const ShineEffect = styled(motion.div)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '150%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    transform: 'translateX(-100%)',
    pointerEvents: 'none',
    zIndex: 1,
});

// Category label component
const CategoryLabel = ({ category, theme }: { category: string; theme: any }) => (
    <Box
        sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: alpha(theme.palette.primary.main, 0.15),
            color: theme.palette.primary.main,
            fontSize: '0.7rem',
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
    >
        {category}
    </Box>
);

// Define interface for StyledTechCard props
interface StyledTechCardProps {
    importance?: 'primary' | 'secondary' | 'tertiary';
    accentColor?: string;
}

// Styled TechCard with premium glass morphism and depth effects
const StyledTechCard = styled(motion.div)<StyledTechCardProps>(({ theme, importance, accentColor }) => {
    // Get the color based on importance
    const getImportanceStyles = () => {
        switch(importance) {
            case 'primary':
                return {
                    borderWidth: 2,
                    boxShadow: `0px 20px 40px ${alpha(accentColor || theme.palette.primary.main, 0.2)}`,
                };
            case 'secondary':
                return {
                    borderWidth: 1,
                    boxShadow: `0px 12px 28px ${alpha(theme.palette.grey[800], 0.15)}`,
                };
            case 'tertiary':
            default:
                return {
                    borderWidth: 1,
                    boxShadow: `0px 8px 16px ${alpha(theme.palette.grey[800], 0.1)}`,
                };
        }
    };

    const importanceStyles = getImportanceStyles();
    
    return {
        position: 'relative',
        padding: theme.spacing(5), // More luxurious padding
        borderRadius: 24, // Modern rounded corners
        height: '100%',
        background: 'transparent', // Transparent background for glass effect
        border: `${importanceStyles.borderWidth}px solid ${
            theme.palette.mode === 'light'
                ? alpha(accentColor || theme.palette.primary.light, 0.2)
                : alpha(accentColor || theme.palette.primary.dark, 0.3)
        }`,
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Premium animation curve
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        width: '100%',
        overflow: 'hidden',
        boxShadow: importanceStyles.boxShadow,
        transform: importance === 'primary' ? 'scale(1.05)' : 'scale(1)', // Primary cards slightly larger
        '&:hover': {
            transform: `translateY(-12px) ${importance === 'primary' ? 'scale(1.07)' : 'scale(1.02)'}`,
            boxShadow: theme.palette.mode === 'light' 
                ? `0px 24px 48px ${alpha(accentColor || theme.palette.primary.main, 0.25)}`
                : `0px 24px 48px ${alpha(theme.palette.common.black, 0.5)}`,
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
            height: '10px',
            background: `linear-gradient(90deg, ${accentColor || theme.palette.primary.main}, ${accentColor ? alpha(accentColor, 0.6) : theme.palette.primary.light})`,
            opacity: 0.8,
            transition: 'height 0.3s ease',
        },
        '&:hover::after': {
            height: '15px',
        },
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
}) => {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.1, once: true });
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Animation variants for better organization
    const cardVariants = {
        hidden: { opacity: 0, y: 80, scale: 0.8 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                delay: (index ?? 0) * 0.15, 
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
                delay: (index ?? 0) * 0.15 + 0.2,
                duration: 0.5
            } 
        }
    };

    // Trigger shine effect on hover
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
        >
            {/* Glass morphism backdrop */}
            <GlassBackdrop 
                blurAmount={isHovered ? '16px' : GLASS_BLUR}
                opacityLevel={isHovered ? GLASS_OPACITY + 0.03 : GLASS_OPACITY} 
            />
            
            {/* Shine effect for light mode */}
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
            
            {/* Category label if provided */}
            {category && <CategoryLabel category={category} theme={theme} />}
            
            {/* Card content with animations */}
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
                                    width: 56,
                                    height: 56,
                                    color: accentColor || 
                                        (theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light),
                                    filter: `drop-shadow(0 4px 6px ${alpha(
                                        accentColor || theme.palette.primary.main, 
                                        0.4
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
                            fontSize: '1.35rem',
                            fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
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