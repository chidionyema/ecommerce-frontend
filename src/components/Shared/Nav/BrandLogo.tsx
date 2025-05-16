import React, { memo, useState, useCallback } from 'react'; // Added useCallback
import Link from 'next/link';
import { Box, Paper, Stack, Typography, useTheme, alpha } from '@mui/material';
import { Cpu } from 'lucide-react';

const BrandLogo = memo(() => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Event Handlers with useCallback for stability if passed to child components
  // though not strictly necessary here as they are used directly.
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // This handler will cause a flicker if the mouse remains over the logo
  // after navigation and re-render, as onMouseEnter will fire again.
  const handleClick = useCallback(() => {
    // setIsHovered(false); // <-- Uncomment this line to see the flicker effect
    // Navigation will proceed via the Link component
  }, []);


  // ... (your transition definitions remain the same)
  const primaryTransition = theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  });

  const iconContainerTransition = theme.transitions.create(['background', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  });

  const iconTransition = theme.transitions.create(['transform', 'filter'], {
    duration: '350ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  });

  const textTransition = theme.transitions.create('transform', {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  });

  const gradientTextTransition = theme.transitions.create('background-position', {
    duration: '400ms',
    easing: theme.transitions.easing.easeInOut,
  });

  return (
    <Link href="/" passHref style={{ textDecoration: 'none' }}>
      <Box
        component="div"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick} // Added onClick here
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          transition: primaryTransition,
          transform: isHovered ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)',
          textDecoration: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Paper
            elevation={isHovered ? 10 : 3}
            sx={{
              position: 'relative',
              width: 42,
              height: 42,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
              background: isHovered
                ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 70%, ${theme.palette.primary.light} 100%)`
                : theme.palette.background.paper,
              border: `1px solid ${isHovered ? alpha(theme.palette.primary.main, 0.5) : alpha(theme.palette.divider, 0.3)}`,
              boxShadow: isHovered
                ? `0 6px 18px ${alpha(theme.palette.primary.main, 0.35)}`
                : `0 3px 8px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: iconContainerTransition,
            }}
          >
            <Cpu
              size={24}
              color={isHovered ? theme.palette.common.white : theme.palette.primary.main}
              style={{
                filter: isHovered
                  ? `drop-shadow(0 0 5px ${alpha(theme.palette.common.white, 0.7)})`
                  : `drop-shadow(0 1px 1px ${alpha(theme.palette.common.black, 0.2)})`,
                transform: isHovered ? 'rotate(7deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                transition: iconTransition,
              }}
            />
          </Paper>

          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "'SF Pro Display', 'Roboto', 'Helvetica Neue', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.25px',
              fontSize: { xs: '1.9rem', md: '2.1rem' },
              lineHeight: 1,
              display: 'flex',
              alignItems: 'baseline',
              color: theme.palette.text.primary,
              transition: textTransition,
              transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
            }}
          >
            <Box component="span" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
              GLU
            </Box>
            <Box
              component="span"
              sx={{
                position: 'relative',
                background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
                backgroundSize: '200% 100%',
                backgroundPosition: isHovered ? '100% 0' : '0 0',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 800,
                ml: '1px',
                transition: gradientTextTransition,
              }}
            >
              Stack
            </Box>
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
});

BrandLogo.displayName = 'BrandLogo';

export default BrandLogo;