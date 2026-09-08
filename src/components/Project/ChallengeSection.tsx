'use client';

import { Typography } from '@mui/material';
import { ExpandableSection } from '../Common/ExpandableSection';
import { GlassCard } from '../Theme/GlassCard';

export const ChallengeSection = ({ challenge }: { challenge: string }) => {
  return (
    <ExpandableSection title="The Challenge" defaultExpanded>
      <GlassCard sx={{ p: 3, border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.01)' } }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          {challenge}
        </Typography>
      </GlassCard>
    </ExpandableSection>
  );
};
