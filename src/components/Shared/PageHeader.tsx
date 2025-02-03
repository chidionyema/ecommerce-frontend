'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Changed variant to h4 and reduced font weight */}
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
    </Box>
  );
};

export default PageHeader;
