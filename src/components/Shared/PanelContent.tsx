'use client';

import React, { memo, useCallback, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  alpha,
  useMediaQuery,
  Input,
  Button,
} from '@mui/material';
import { m } from 'framer-motion';
import HorizontalScrollPanel from './HorizontalScrollPanel';
import { PALETTE, GRADIENTS } from '../../theme/palette';
import { ThemeName } from '../../theme/types';
import { ErrorBoundary } from 'react-error-boundary';

const PANEL_SECTIONS = {
  THEMES: 'Themes',
  FEATURES: 'New Features',
  COMMUNITY: 'Join Community',
  RESOURCES: 'Resources',
} as const;

type PanelSection = typeof PANEL_SECTIONS[keyof typeof PANEL_SECTIONS];

interface CyberButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const CyberButton = memo<CyberButtonProps>(({ children, onClick, disabled }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    },
    [onClick]
  );

  return (
    <m.div
      whileHover={disabled? {}: { scale: 1.02 }}
      whileTap={disabled? {}: { scale: 0.98 }}
      style={{ cursor: disabled? 'not-allowed': 'pointer', flexShrink: 0 }}
    >
      <Box
        role="button"
        tabIndex={disabled? -1: 0}
        onClick={disabled? undefined: onClick}
        onKeyPress={disabled? undefined: handleKeyPress}
        sx={{
          background: alpha(PALETTE.professional.primary, 0.05),
          borderRadius: '12px',
          p: isMobile? 1: 1.5,
          minWidth: isMobile? 180: 220,
          border: `1px solid ${alpha(PALETTE.professional.accent, 0.2)}`,
          transition: 'all 0.3s ease',
          '&:hover': disabled
          ? {}
          : {
                background: alpha(PALETTE.professional.accent, 0.08),
                boxShadow: `0 8px 24px ${alpha(PALETTE.professional.accent, 0.1)}`,
                borderColor: PALETTE.professional.accent,
              },
          '&:focus-visible': {
            outline: `2px solid ${PALETTE.professional.accent}`,
          },
        ...(disabled && {
            opacity: 0.5,
            pointerEvents: 'none',
          }),
        }}
      >
        {children}
      </Box>
    </m.div>
  );
});

interface PanelContentProps {
  activeSection: PanelSection;
  handleThemeSelect: (
    themeName: ThemeName | 'custom' | 'professional',
    colors?: { primary: string; secondary: string }
  ) => void;
  prefersReducedMotion: boolean;
}

const PanelSectionWrapper: React.FC<{
  title: string;
  prefersReducedMotion: boolean;
  children: React.ReactNode;
}> = ({ title, prefersReducedMotion, children }) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: prefersReducedMotion? 0: 0.4 }}
  >
    <Typography
      variant="h4"
      component="h2"
      sx={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        color: PALETTE.professional.accent,
        mb: 2,
      }}
    >
      {title}
    </Typography>
    <Stack gap={2} direction="row">
      {children}
    </Stack>
  </m.div>
);

/**
 * An enhanced ErrorFallback component that displays an error message and a retry button.
 */
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <Box
    sx={{
      p: 3,
      background: alpha(PALETTE.professional.error, 0.1),
      borderRadius: 2,
    }}
  >
    <Typography color="error" sx={{ mb: 1 }}>
      An error occurred: {error.message}
    </Typography>
    <Button onClick={resetErrorBoundary} variant="outlined">
      Retry
    </Button>
  </Box>
);

const PanelContent: React.FC<PanelContentProps> = ({
  activeSection,
  handleThemeSelect,
  prefersReducedMotion,
}) => {
  const themes = ['light', 'dark', 'professional'] as const;
  const [customColors, setCustomColors] = useState({
    primary: '#4A90E2',
    secondary: '#7F7F7F',
  });
  const [colorErrors, setColorErrors] = useState({
    primary: '',
    secondary: '',
  });

  const isValidHex = (hex: string) =>
    /^#([0-9A-F]{3}){1,2}$/i.test(hex.trim());

  const handleColorChange = (colorType: 'primary' | 'secondary') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      if (!isValidHex(newColor)) {
        setColorErrors((prev) => ({
        ...prev,
          [colorType]: 'Invalid hex code',
        }));
        // Optionally, do not update the color if invalid.
        return;
      } else {
        setColorErrors((prev) => ({...prev, [colorType]: '' }));
      }
      const newColors = {...customColors, [colorType]: newColor };
      setCustomColors(newColors);
      handleThemeSelect('custom', newColors);
    };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HorizontalScrollPanel>
        <Stack gap={4} sx={{ mt: 4, minWidth: '600px' }}>
          {activeSection === PANEL_SECTIONS.THEMES && (
            <PanelSectionWrapper
              title="Visual Themes"
              prefersReducedMotion={prefersReducedMotion}
            >
              {themes.map((theme) => (
                <CyberButton
                  key={theme}
                  onClick={() => handleThemeSelect(theme)} // 'professional' is now a valid theme
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <Box
                      aria-label={`${theme} theme preview`}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        background:
                          theme === 'light'
                          ? PALETTE.light.primary
                          : theme === 'dark'
                          ? PALETTE.dark.primary
                          : GRADIENTS.tech,
                      }}
                    />
                    <Typography variant="h6" textTransform="capitalize">
                      {theme} Theme
                    </Typography>
                  </Stack>
                </CyberButton>
              ))}

              {/* Custom Color Picker */}
              <CyberButton onClick={() => {}}>
                <Stack gap={1.5}>
                  <Typography variant="h6">Custom Colors</Typography>
                  <Stack direction="row" gap={2} alignItems="center">
                    <Box>
                      <Input
                        type="color"
                        value={customColors.primary}
                        onChange={handleColorChange('primary')}
                        sx={{ width: 48, height: 48, mr: 1 }}
                        aria-label="Primary color picker"
                      />
                      <Input
                        value={customColors.primary}
                        onChange={handleColorChange('primary')}
                        placeholder="#4A90E2"
                        inputProps={{ maxLength: 7 }}
                        aria-label="Primary color hex code"
                      />
                      {colorErrors.primary && (
                        <Typography variant="caption" color="error">
                          {colorErrors.primary}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Input
                        type="color"
                        value={customColors.secondary}
                        onChange={handleColorChange('secondary')}
                        sx={{ width: 48, height: 48, mr: 1 }}
                        aria-label="Secondary color picker"
                      />
                      <Input
                        value={customColors.secondary}
                        onChange={handleColorChange('secondary')}
                        placeholder="#7F7F7F"
                        inputProps={{ maxLength: 7 }}
                        aria-label="Secondary color hex code"
                      />
                      {colorErrors.secondary && (
                        <Typography variant="caption" color="error">
                          {colorErrors.secondary}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </CyberButton>
            </PanelSectionWrapper>
          )}

          {/* Other sections (FEATURES, COMMUNITY, RESOURCES) can be added here */}

          <m.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: prefersReducedMotion? 0: 0.4,
              delay: prefersReducedMotion? 0: 0.2,
            }}
          >
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: '16px',
                background: GRADIENTS.tech,
                position: 'relative',
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: 2,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                Ready to Level Up?
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, color: alpha('#fff', 0.9) }}
              >
                Unlock premium features with Professional Suite
              </Typography>
              <CyberButton onClick={() => window.open('/pro')}>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  Upgrade Now →
                </Typography>
              </CyberButton>
            </Box>
          </m.div>
        </Stack>
      </HorizontalScrollPanel>
    </ErrorBoundary>
  );
};

export default memo(PanelContent);