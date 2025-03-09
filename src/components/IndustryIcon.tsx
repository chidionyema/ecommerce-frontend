// src/components/IndustryIcon.tsx
import { LucideIcon } from 'lucide-react';
import { useTheme } from '@mui/material';

interface IndustryIconProps {
  icon: LucideIcon;
  color?: string;
  size?: number;
}

const IndustryIcon = ({ icon: Icon, color, size = 64 }: IndustryIconProps) => {
  const theme = useTheme();
  
  return (
    <Icon
      size={size}
      color={color || theme.palette.primary.main}
      strokeWidth={1.5}
      style={{
        filter: `drop-shadow(0 2px 4px ${theme.palette.action.hover})`
      }}
    />
  );
};

export default IndustryIcon;