// components/Project/ChallengeSection.tsx
'use client';
import { Typography } from '@mui/material';
import { ExpandableSection } from '../Common/ExpandableSection';
import { GlassCard } from '../Theme/GlassCard';

export const ChallengeSection = ({ challenge }: { challenge: string }) => {
  return (
    <ExpandableSection title="The Challenge" defaultExpanded>
      <GlassCard sx={{ p: 3 }}>
        <Typography variant="body1">
          {challenge}
        </Typography>
      </GlassCard>
    </ExpandableSection>
  );
};