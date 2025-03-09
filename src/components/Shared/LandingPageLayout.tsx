'use client';

import { ReactNode } from 'react';
import {
  Container,
  Box,
  styled,
  SxProps,
  Theme,
  Button,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  cta?: ReactNode;
}

const LandingPageLayout = ({ children, maxWidth = 'lg', sx, cta }: PageLayoutProps) => {
  return (
    <Container maxWidth={maxWidth} sx={sx}>
      <ContentWrapper>{children}</ContentWrapper>

      {/* CTA container using flex to center the button, with extra margin bottom */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 8 }}>
        {cta ? (
          cta // Render the custom CTA if provided
        ) : (
          // Default CTA with animation
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                px: 6,
                py: 2,
                fontWeight: 700,
                fontSize: '1.2rem',
                borderRadius: 4,
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'common.white',
                boxShadow: (theme) =>
                  `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': {
                  boxShadow: (theme) =>
                    `0 12px 24px ${alpha(theme.palette.primary.main, 0.6)}`,
                },
              }}
            >
              Explore Solutions
            </Button>
          </motion.div>
        )}
      </Box>
    </Container>
  );
};

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

export default LandingPageLayout;
