"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Box, Typography, Button, Container, useTheme, SxProps, Theme,
  alpha, useMediaQuery, Paper
} from '@mui/material';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Types with precise documentation
interface CTAProps {
  text: string;
  link: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
  secondary?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  sx?: SxProps<Theme>;
  primaryCta?: CTAProps;
  secondaryCta?: CTAProps;
  children?: React.ReactNode;
  id?: string;
  overlayStrength?: 'light' | 'medium' | 'strong' | 'premium';
  highlights?: string[];
  accentText?: string;
  backgroundPattern?: boolean;
  backgroundBlur?: boolean;
  visualDensity?: 'comfortable' | 'compact' | 'spacious';
  appearance?: 'default' | 'elevated' | 'glass' | 'minimal';
}

/**
 * Ultimate PageHeader - Creates an exquisitely crafted visual experience
 * with unparalleled attention to detail and responsive nuance.
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage = '/images/istockphoto-realhero.jpg',
  sx,
  children,
  primaryCta = { text: 'Get Started', link: '/contact', icon: <ArrowRight size={16} strokeWidth={2} /> },
  secondaryCta,
  id = 'page-header',
  overlayStrength = 'medium',
  highlights = [],
  accentText,
  backgroundPattern = true,
  backgroundBlur = false,
  visualDensity = 'comfortable',
  appearance = 'default',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced parallax effects with spring physics
  const { scrollY } = useScroll({ target: headerRef });
  const parallaxFactor = useMemo(() => isMobile ? 0.5 : 1, [isMobile]);
  
  const rawBackgroundY = useTransform(scrollY, [0, 500], [0, 120 * parallaxFactor]);
  const rawBackgroundScale = useTransform(scrollY, [0, 400], [1, 1.12]);
  const rawContentY = useTransform(scrollY, [0, 300], [0, -40 * parallaxFactor]);
  const rawContentOpacity = useTransform(scrollY, [0, 250], [1, 0.78]);
  
  // Apply spring physics to create more organic movement
  const backgroundY = useSpring(rawBackgroundY, { mass: 0.8, stiffness: 30, damping: 20 });
  const backgroundScale = useSpring(rawBackgroundScale, { mass: 1, stiffness: 40, damping: 25 });
  const contentY = useSpring(rawContentY, { mass: 0.6, stiffness: 50, damping: 20 });
  const contentOpacity = useSpring(rawContentOpacity, { stiffness: 60, damping: 20 });
  
  // Nuanced overlay opacity based on strength
  const overlaySettings = useMemo(() => {
    const baseSettings = {
      light: { gradient: [0.62, 0.52, 0.68], opacity: 0.92 },
      medium: { gradient: [0.78, 0.65, 0.82], opacity: 0.95 },
      strong: { gradient: [0.88, 0.75, 0.92], opacity: 0.97 },
      premium: { gradient: [0.92, 0.82, 0.95], opacity: 0.98 }
    };
    return baseSettings[overlayStrength];
  }, [overlayStrength]);
  
  // Visual density scaling factors
  const densityFactors = useMemo(() => {
    const base = {
      spacing: { compact: 0.8, comfortable: 1, spacious: 1.2 },
      typography: { compact: 0.95, comfortable: 1, spacious: 1.05 }
    };
    return {
      spacing: base.spacing[visualDensity],
      typography: base.typography[visualDensity]
    };
  }, [visualDensity]);
  
  // Handle intersection observation for enhanced entry animations
  useEffect(() => {
    if (!headerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Optimized image loading with priority handling
  useEffect(() => {
    if (!backgroundImage) {
      setImageLoaded(true);
      return;
    }
    
    const img = new window.Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
    
    return () => { img.onload = null; };
  }, [backgroundImage]);

  // Animation variants
  const ANIM = {
    fadeIn: (delay = 0, distance = 5) => ({
      initial: { opacity: 0, y: distance },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.72,
          delay: delay + 0.05,
          ease: [0.165, 0.015, 0.12, 0.995]
        }
      }
    }),
    stagger: {
      container: {
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.055,
            delayChildren: 0.25,
            staggerDirection: 1
          }
        }
      },
      item: {
        initial: { opacity: 0, y: 8, scale: 0.98 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 14,
            mass: 0.8
          }
        }
      }
    },
    appearWithBlur: {
      initial: { opacity: 0, filter: "blur(12px)" },
      animate: { 
        opacity: 1, 
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.165, 0.015, 0.12, 0.995] }
      }
    }
  };

  return (
    <Box
      component="header"
      id={id}
      aria-labelledby={`${id}-title`}
      ref={headerRef}
      sx={{
        position: 'relative',
        minHeight: { 
          xs: `${380 * densityFactors.spacing}px`, 
          sm: `${420 * densityFactors.spacing}px`, 
          md: `${480 * densityFactors.spacing}px` 
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 8 * densityFactors.spacing, md: 10 * densityFactors.spacing },
        pb: { xs: 8 * densityFactors.spacing, md: 10 * densityFactors.spacing },
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.dark,
        borderRadius: { xs: 0, sm: appearance === 'minimal' ? 0 : theme.shape.borderRadius * 1.5 },
        boxShadow: appearance === 'elevated' 
          ? `0 16px 50px -12px ${alpha(theme.palette.common.black, 0.3)}, 0 0 1px ${alpha(theme.palette.common.black, 0.4)}`
          : appearance === 'minimal' ? 'none'
          : `0 8px 32px ${alpha(theme.palette.common.black, 0.18)}`,
        mt: 0,
        mb: { xs: 4, sm: 5, md: 6 },
        mx: { xs: 0, sm: appearance === 'minimal' ? 0 : 3, md: appearance === 'minimal' ? 0 : 4 },
        isolation: 'isolate',
        ...(sx as any)
      }}
    >
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <Box 
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            component={motion.div}
            style={{
              position: 'absolute',
              inset: 0,
              y: isMobile ? 0 : backgroundY,
              scale: backgroundScale,
              opacity: imageLoaded ? 1 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority={true}
              quality={95}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                filter: `brightness(${appearance === 'glass' ? 0.9 : 1}) contrast(1.2) saturate(${appearance === 'glass' ? 0.95 : 1.1})`,
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </Box>
          
          {backgroundBlur && (
            <Box sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              backdropFilter: 'blur(8px)',
            }} />
          )}
        </Box>
      )}

      {/* Background pattern */}
      {backgroundPattern && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            overflow: 'hidden',
            opacity: 0.35
          }}
        >
          {/* Floating particles */}
          {Array(isMobile ? 10 : 18).fill(null).map((_, index) => {
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 30 + 20;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const depth = Math.random();
            
            return (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  width: size,
                  height: size,
                  backgroundColor: alpha('#ffffff', 0.3 + (depth * 0.2)),
                  left: `${initialX}%`,
                  top: `${initialY}%`,
                  filter: `blur(${(1 - depth) * 1.5}px)`,
                  zIndex: Math.floor(depth * 10),
                }}
                component={motion.div}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 0.7, 0],
                }}
                transition={{ 
                  duration, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 10
                }}
              />
            );
          })}
          
          {/* Accent glow */}
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40%',
              height: '40%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0)} 70%)`,
              filter: 'blur(80px)',
              opacity: 0.8,
              mixBlendMode: 'soft-light',
            }}
          />
        </Box>
      )}

      {/* Overlay */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: `radial-gradient(ellipse at center, 
          ${alpha(theme.palette.primary.dark, overlaySettings.gradient[0])} 0%, 
          ${alpha(theme.palette.primary.main, overlaySettings.gradient[1])} 65%, 
          ${alpha(theme.palette.primary.dark, overlaySettings.gradient[2])} 100%)`,
        opacity: overlaySettings.opacity,
        mixBlendMode: 'multiply',
        backdropFilter: backgroundBlur ? 'blur(4px)' : 'none',
      }} />

      {/* Content container */}
      <Container 
        maxWidth="lg" 
        sx={{
          position: 'relative',
          zIndex: 3,
          my: 4 * densityFactors.spacing,
          width: '100%',
        }}
      >
        <Box
          component={motion.div}
          style={{
            y: contentY,
            opacity: contentOpacity
          }}
        >
          {/* Headline */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.72,
                delay: 0.05,
                ease: [0.165, 0.015, 0.12, 0.995]
              }
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              id={`${id}-title`}
              sx={{
                fontSize: { 
                  xs: `${2.5 * densityFactors.typography}rem`, 
                  sm: `${3 * densityFactors.typography}rem`, 
                  md: `${3.75 * densityFactors.typography}rem` 
                },
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                position: 'relative',
                color: alpha('#fff', 0.98),
                textAlign: 'center',
                mb: 3,
                overflowWrap: 'break-word',
                hyphens: 'auto',
                maxWidth: '96%',
                mx: 'auto',
                textShadow: appearance === 'glass' ? '0 2px 10px rgba(0,0,0,0.2)' : 'none',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: { xs: '60px', md: '80px' },
                  height: '2.5px',
                  background: `linear-gradient(90deg, 
                    ${alpha(theme.palette.secondary.main, 0.05)}, 
                    ${theme.palette.secondary.main}, 
                    ${alpha(theme.palette.secondary.main, 0.05)})`,
                  borderRadius: '1.25px'
                }
              }}
            >
              {accentText ? (
                <>
                  {title.split(accentText)[0]}
                  <Box 
                    component="span" 
                    sx={{
                      background: `linear-gradient(135deg, 
                        ${theme.palette.secondary.light}, 
                        ${theme.palette.secondary.main})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      transform: 'translateZ(0)',
                      fontWeight: 800,
                    }}
                  >
                    {accentText}
                  </Box>
                  {title.split(accentText)[1]}
                </>
              ) : (
                title
              )}
            </Typography>
          </Box>

          {/* Subheadline */}
          {subtitle && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 5 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.72,
                  delay: 0.15,
                  ease: [0.165, 0.015, 0.12, 0.995]
                }
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { 
                    xs: `${1.1 * densityFactors.typography}rem`, 
                    sm: `${1.2 * densityFactors.typography}rem`, 
                    md: `${1.3 * densityFactors.typography}rem` 
                  },
                  fontWeight: 400,
                  lineHeight: 1.55,
                  letterSpacing: '0.008em',
                  textAlign: 'center',
                  color: alpha('#ffffff', 0.9),
                  maxWidth: '800px',
                  mx: 'auto',
                  mt: 3 * densityFactors.spacing,
                  mb: 4 * densityFactors.spacing,
                  textShadow: appearance === 'glass' ? '0 1px 5px rgba(0,0,0,0.15)' : 'none',
                  '& strong': {
                    fontWeight: 600,
                    color: alpha(theme.palette.secondary.light, 0.98)
                  }
                }}
              >
                {subtitle.split(' ').map((word, i, arr) =>
                  i === arr.length - 2 ? <strong key={i}>{word} </strong> :
                    i === arr.length - 1 ? <strong key={i}>{word}</strong> : word + ' '
                )}
              </Typography>
            </Box>
          )}

          {/* Highlights */}
          {highlights.length > 0 && (
            <Box
              component={motion.div}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={ANIM.stagger.container}
              sx={{ width: '100%', mb: 5 * densityFactors.spacing }}
            >
              <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: highlights.length > 2 ? 'column' : 'row', md: 'row' },
                    gap: 2 * densityFactors.spacing,
                    justifyContent: 'center',
                    mt: 4 * densityFactors.spacing,
                  }}
                >
                  {highlights.map((highlight, index) => (
                    <Box 
                      key={index} 
                      component={motion.div} 
                      variants={ANIM.stagger.item} 
                      sx={{ flex: 1 }}
                    >
                      <Paper 
                        elevation={0} 
                        sx={{
                          p: 2.5 * densityFactors.spacing,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: appearance === 'glass' 
                            ? alpha('#1a56db', 0.1)
                            : alpha('#1a56db', 0.13),
                          border: `1px solid ${alpha('#4285f4', appearance === 'glass' ? 0.2 : 0.25)}`,
                          borderRadius: 12,
                          backdropFilter: 'blur(12px)',
                          transition: 'all 0.38s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
                          boxShadow: `0 8px 16px ${alpha('#000', 0.14)}`,
                          '&:hover': {
                            transform: 'translateY(-3px) scale(1.02)',
                            background: alpha('#1a56db', appearance === 'glass' ? 0.14 : 0.17),
                            boxShadow: `0 18px 36px ${alpha('#000', 0.18)}`,
                            border: `1px solid ${alpha('#4285f4', 0.38)}`
                          },
                          '&:after': appearance === 'glass' ? {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 'inherit',
                            padding: 1,
                            background: `linear-gradient(135deg, ${alpha('#fff', 0.25)}, ${alpha('#fff', 0.05)})`,
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            pointerEvents: 'none',
                          } : {}
                        }}
                      >
                        <Typography
                          color="white"
                          sx={{
                            fontWeight: 600,
                            fontSize: `${1 * densityFactors.typography}rem`,
                            textAlign: 'center',
                            textShadow: appearance === 'glass' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                          }}
                        >
                          {highlight}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {/* CTA Buttons */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.72,
                delay: 0.2,
                ease: [0.165, 0.015, 0.12, 0.995]
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2 * densityFactors.spacing, sm: 3 * densityFactors.spacing },
                justifyContent: 'center',
                mt: 2 * densityFactors.spacing,
                alignItems: 'center',
              }}
            >
              <Button
                component={NextLink}
                href={primaryCta.link}
                variant="contained"
                endIcon={primaryCta.icon || <ArrowRight size={16} strokeWidth={2} />}
                aria-label={primaryCta.ariaLabel || primaryCta.text}
                sx={{
                  borderRadius: 9,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  transition: 'all 0.32s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
                  position: 'relative',
                  letterSpacing: '0.01em',
                  lineHeight: 1.2,
                  px: 4.5 * densityFactors.spacing,
                  py: 1.75 * densityFactors.spacing,
                  background: `linear-gradient(135deg, 
                    ${theme.palette.secondary.main}, 
                    ${alpha(theme.palette.secondary.dark, 0.92)})`,
                  color: '#fff',
                  boxShadow: `0 12px 20px ${alpha(theme.palette.secondary.main, 0.3)}, 0 2px 4px ${alpha(theme.palette.secondary.dark, 0.2)}`,
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    padding: 1,
                    background: `linear-gradient(135deg, ${alpha('#fff', 0.15)}, ${alpha('#fff', 0.05)})`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                  },
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: `0 16px 28px ${alpha(theme.palette.secondary.main, 0.4)}, 0 4px 8px ${alpha(theme.palette.secondary.dark, 0.2)}`,
                    background: `linear-gradient(135deg, 
                      ${theme.palette.secondary.main}, 
                      ${alpha(theme.palette.secondary.dark, 0.88)})`,
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(1.01)',
                    boxShadow: `0 10px 14px ${alpha(theme.palette.secondary.main, 0.36)}, 0 2px 3px ${alpha(theme.palette.secondary.dark, 0.2)}`,
                  }
                }}
              >
                {primaryCta.text}
              </Button>

              {secondaryCta && (
                <Button
                  component={NextLink}
                  href={secondaryCta.link}
                  variant="outlined"
                  endIcon={secondaryCta.icon || <ArrowRight size={16} strokeWidth={2} />}
                  aria-label={secondaryCta.ariaLabel || secondaryCta.text}
                  sx={{
                    borderRadius: 9,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    transition: 'all 0.32s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
                    position: 'relative',
                    letterSpacing: '0.01em',
                    lineHeight: 1.2,
                    px: 3.5 * densityFactors.spacing,
                    py: 1.65 * densityFactors.spacing,
                    borderWidth: 1.5,
                    borderColor: alpha('#fff', 0.85),
                    color: '#fff',
                    backgroundColor: appearance === 'glass' ? alpha('#000', 0.08) : alpha('#000', 0.12),
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: alpha('#fff', 0.08),
                      transform: 'translateY(-2px) scale(1.02)',
                      boxShadow: `0 8px 16px ${alpha('#000', 0.25)}`,
                    },
                    '&:active': {
                      transform: 'translateY(-1px) scale(1.01)',
                      backgroundColor: alpha('#fff', 0.05),
                      boxShadow: `0 4px 8px ${alpha('#000', 0.2)}`,
                    }
                  }}
                >
                  {secondaryCta.text}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Child components */}
      {children && (
        <Box sx={{ position: 'relative', zIndex: 5, width: '100%' }}>
          <AnimatePresence>
            <Box
              component={motion.div}
              variants={ANIM.appearWithBlur}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ delay: 0.3 }}
            >
              {children}
            </Box>
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;