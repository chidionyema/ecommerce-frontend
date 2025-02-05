import React, { memo } from 'react';
import { Box, Typography, Stack, alpha } from '@mui/material';
import { m } from 'framer-motion';
import HorizontalScrollPanel from './HorizontalScrollPanel';
import { PALETTE, GRADIENTS } from '../../theme/palette';
import { ThemeName } from '@/src/theme/types';

const PANEL_SECTIONS = {
  THEMES: 'Themes',
  FEATURES: 'New Features',
  COMMUNITY: 'Join Community',
  RESOURCES: 'Resources',
};

type PanelSection = 'Themes' | 'Features' | 'Community' | 'Resources';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const CyberButton = memo<CyberButtonProps>(({ children, onClick }) => (
  <m.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    style={{ cursor: 'pointer', flexShrink: 0 }}
    onClick={onClick}
  >
    <Box
      sx={{
        background: alpha(PALETTE.dark.accent, 0.1),
        borderRadius: '12px',
        p: 2,
        minWidth: 300,
        border: `1px solid ${alpha(PALETTE.dark.accent, 0.3)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          background: alpha(PALETTE.dark.accent, 0.15),
          boxShadow: `0 8px 24px ${alpha(PALETTE.dark.accent, 0.2)}`,
        },
      }}
    >
      {children}
    </Box>
  </m.div>
));

interface PanelContentProps {
  activeSection: PanelSection;
  handleThemeSelect: (themeName: ThemeName) => void;
  prefersReducedMotion: boolean;
}

const PanelContent: React.FC<PanelContentProps> = ({
  activeSection,
  handleThemeSelect,
}) => {
  return (
    <HorizontalScrollPanel>
      <Stack gap={4} sx={{ mt: 8, minWidth: '800px', overflowY: 'auto' }}>
        {activeSection === PANEL_SECTIONS.THEMES && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: PALETTE.dark.accent,
                mb: 3,
              }}
            >
              Visual Themes
            </Typography>
            <Stack gap={2} direction="row">
              {(['light', 'dark', 'tech', 'cyber'] as const).map((theme) => (
                <CyberButton
                  key={theme}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        background:
                          theme === 'light'
                            ? PALETTE.light.primary
                            : theme === 'dark'
                            ? PALETTE.dark.primary
                            : theme === 'tech'
                            ? GRADIENTS.tech
                            : GRADIENTS.cyber,
                      }}
                    />
                    <Typography variant="h6" textTransform="capitalize">
                      {theme} Mode
                    </Typography>
                  </Stack>
                </CyberButton>
              ))}
            </Stack>
          </m.div>
        )}

        {activeSection === PANEL_SECTIONS.FEATURES && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: PALETTE.dark.accent,
                mb: 3,
              }}
            >
              Latest Features
            </Typography>
            <Stack gap={2} direction="row">
              <CyberButton onClick={() => window.open('/features/quantum-editor')}>
                <Stack gap={1}>
                  <Typography variant="h6" sx={{ color: PALETTE.dark.accent }}>
                    🚀 Quantum Editor
                  </Typography>
                  <Typography variant="body2">
                    AI-powered code editor with real-time collaboration
                  </Typography>
                </Stack>
              </CyberButton>
              <CyberButton onClick={() => window.open('/features/analytics')}>
                <Stack gap={1}>
                  <Typography variant="h6" sx={{ color: PALETTE.dark.accent }}>
                    📈 Advanced Analytics
                  </Typography>
                  <Typography variant="body2">
                    Detailed application performance insights
                  </Typography>
                </Stack>
              </CyberButton>
            </Stack>
          </m.div>
        )}

        {activeSection === PANEL_SECTIONS.COMMUNITY && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: PALETTE.dark.accent,
                mb: 3,
              }}
            >
              Our Community
            </Typography>
            <Stack gap={2} direction="row">
              <CyberButton onClick={() => window.open('https://discord.gg/yourcommunity')}>
                <Stack direction="row" gap={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      background: `url(/discord-logo.svg) center/contain no-repeat`,
                    }}
                  />
                  <Typography variant="h6">Discord Server</Typography>
                </Stack>
              </CyberButton>
              <CyberButton onClick={() => window.open('https://github.com/yourorg')}>
                <Stack direction="row" gap={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      background: `url(/github-logo.svg) center/contain no-repeat`,
                    }}
                  />
                  <Typography variant="h6">GitHub Organization</Typography>
                </Stack>
              </CyberButton>
            </Stack>
          </m.div>
        )}

        {activeSection === PANEL_SECTIONS.RESOURCES && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: PALETTE.dark.accent,
                mb: 3,
              }}
            >
              Learning Resources
            </Typography>
            <Stack gap={2} direction="row">
              <CyberButton onClick={() => window.open('/docs')}>
                <Stack gap={1}>
                  <Typography variant="h6" sx={{ color: PALETTE.dark.accent }}>
                    📚 Documentation
                  </Typography>
                  <Typography variant="body2">
                    API references and development guides
                  </Typography>
                </Stack>
              </CyberButton>
              <CyberButton onClick={() => window.open('/tutorials')}>
                <Stack gap={1}>
                  <Typography variant="h6" sx={{ color: PALETTE.dark.accent }}>
                    🎥 Video Tutorials
                  </Typography>
                  <Typography variant="body2">
                    Step-by-step GLUStack tutorials
                  </Typography>
                </Stack>
              </CyberButton>
            </Stack>
          </m.div>
        )}

        <m.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Box
            sx={{
              mt: 4,
              p: 3,
              borderRadius: '16px',
              background: GRADIENTS.cyber,
              position: 'relative',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontFamily: "'Orbitron', sans-serif",
                color: '#fff',
              }}
            >
              Ready to Level Up?
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: alpha('#fff', 0.9) }}>
              Unlock premium features with GLUStack Pro
            </Typography>
            <CyberButton onClick={() => window.open('/pro')}>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                Upgrade to Pro →
              </Typography>
            </CyberButton>
          </Box>
        </m.div>
      </Stack>
    </HorizontalScrollPanel>
  );
};

export default memo(PanelContent);
