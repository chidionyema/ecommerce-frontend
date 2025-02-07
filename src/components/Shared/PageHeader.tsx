// components/Shared/PageHeader.tsx
'use client';

import React from 'react';
import { Box, Typography, useTheme, SxProps, Theme, Button, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowForward } from '@mui/icons-material'; // Import an icon

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, sx }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '25vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 70%)`,
        ...sx,
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: 'white',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, // Responsive font size
          }}
        >
          {title} {/* Use a benefit-oriented title */}
        </Typography>
      </motion.div>
      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{
            color: alpha(theme.palette.common.white, 0.8),
            maxWidth: 700,
            mx: 'auto',
            mt: 1,
            fontFamily: theme.typography.fontFamily,
            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }, // Responsive font size
          }}
        >
          {subtitle} {/* Expand on the title, highlight benefits */}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <NextLink href="/contact" passHref legacyBehavior>
          <Button
            variant="contained"
            color="secondary"
            aria-label="Get a free UI consultation"
            endIcon={<ArrowForward />} // Add an icon
            sx={{
              mt: 2,
              borderRadius: 2,
              fontWeight: 700,
              textTransform: 'none',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Claim Your Free UI Audit {/* More action-oriented text */}
          </Button>
        </NextLink>
      </Box>
    </Box>
  );
};

export default PageHeader;