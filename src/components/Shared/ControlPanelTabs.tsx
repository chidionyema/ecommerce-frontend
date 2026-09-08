import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface ControlPanelTabsProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  prefersReducedMotion: boolean;
}

const ControlPanelTabs: React.FC<ControlPanelTabsProps> = ({
  activeSection,
  setActiveSection,
  prefersReducedMotion,
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveSection(newValue);
  };

  return (
    <Tabs
      value={activeSection}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      textColor="inherit"
      indicatorColor="secondary"
      aria-label="Control Panel Tabs"
      sx={{
        maxWidth: '100vw',
        '& .MuiTab-root': { minWidth: 120 },
        transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
      }}
    >
      <Tab label="Themes" value="Themes" />
      <Tab label="New Features" value="New Features" />
      <Tab label="Join Community" value="Join Community" />
      <Tab label="Resources" value="Resources" />
    </Tabs>
  );
};

export default ControlPanelTabs;
