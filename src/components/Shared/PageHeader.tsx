'use client';

import React from 'react';
import { Box, Typography, Button, useTheme, SxProps, Theme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowForward } from '@mui/icons-material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, sx }) => {
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        // Use a fixed height that adapts to the viewport
        height: '25vh',
        // Center content vertically and horizontally
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // Refined background gradient using theme colors
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${alpha(
          theme.palette.primary.main,
          0.8
        )} 70%)`,
        // Apply horizontal padding for a bit of breathing room on small screens
        px: theme.spacing(2),
        ...sx,
      }}
    >
      {/* Title with a smooth fade and slide-up animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#fff',
            letterSpacing: 1, // Subtle letter spacing for polish
            mb: theme.spacing(1),
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          {title}
        </Typography>
      </motion.div>

      {/* Subtitle with controlled width and responsive font size */}
      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{
            color: alpha(theme.palette.common.white, 0.85),
            maxWidth: 700,
            mx: 'auto',
            mt: theme.spacing(1),
            fontFamily: theme.typography.fontFamily,
            letterSpacing: 0.5,
            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Call-to-Action Button with refined spacing and hover effect */}
      <Box sx={{ mt: theme.spacing(2) }}>
        <NextLink href="/contact" passHref legacyBehavior>
          <Button
            variant="contained"
            color="secondary"
            aria-label="Claim your free UI audit"
            endIcon={<ArrowForward />}
            sx={{
              mt: theme.spacing(2),
              borderRadius: 2,
              fontWeight: 700,
              textTransform: 'none',
              px: theme.spacing(4),
              py: theme.spacing(1.5),
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                transform: 'translateY(-2px)',
              },
            }}
          >
            Claim Your Free UI Audit
          </Button>
        </NextLink>
      </Box>
    </Box>
  );
};

export default PageHeader;
