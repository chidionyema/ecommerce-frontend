'use client';

import React from 'react';
import { Box, Typography, useTheme, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, sx }) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: 'center', mb: 4, ...sx }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </motion.div>
      {subtitle && (
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.secondary',
            maxWidth: 700,
            mx: 'auto',
            mt: 1,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Promotional CTA */}
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'red', // Debug color for visibility
            textAlign: 'center',
          }}
        >
          Powered by Next.js.{' '}
          <NextLink href="/contact" passHref legacyBehavior>
            <a
              style={{
                color: 'blue', // Debug color for link visibility
                textDecoration: 'underline',
                fontWeight: 700,
              }}
            >
            Ready to modernize your UI? Contact us.
            </a>
          </NextLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default PageHeader;
