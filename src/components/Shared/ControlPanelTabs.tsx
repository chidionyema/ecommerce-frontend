import { memo } from 'react';
import { Stack, Typography, alpha } from '@mui/material';
import { m } from 'framer-motion';
import { PALETTE } from '../../theme/palette';

const PANEL_SECTIONS = {
  THEMES: 'Themes',
  FEATURES: 'New Features',
  COMMUNITY: 'Join Community',
  RESOURCES: 'Resources',
};

interface ControlPanelTabsProps {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  prefersReducedMotion: boolean;
}

const ControlPanelTabs: React.FC<ControlPanelTabsProps> = ({ activeSection, setActiveSection, prefersReducedMotion }) => {
  return (
    <Stack direction="row" gap={1} sx={{ mb: 4 }}>
      {Object.values(PANEL_SECTIONS).map((section) => (
        <m.div
          key={section}
          whileHover={prefersReducedMotion ? {} : { y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Typography
            onClick={() => setActiveSection(section)}
            sx={{
              px: 3,
              py: 1,
              cursor: 'pointer',
              borderRadius: '8px',
              background: activeSection === section
                ? alpha(PALETTE.dark.accent, 0.2)
                : 'transparent',
              color: activeSection === section
                ? PALETTE.dark.accent
                : alpha(PALETTE.dark.accent, 0.7),
              fontWeight: 700,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: alpha(PALETTE.dark.accent, 0.1),
              }
            }}
          >
            {section}
          </Typography>
        </m.div>
      ))}
    </Stack>
  );
};

export default ControlPanelTabs;