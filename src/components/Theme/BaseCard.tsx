import { styled, alpha, Box } from "@mui/material";
import { Card } from '@mui/material';

const BaseCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.9)}, ${alpha(theme.palette.secondary.dark, 0.85)})`,
  color: theme.palette.common.white,
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.25)}`,
  },
  '&:active': {
    transform: 'translateY(-4px) scale(0.98)',
  },
}));

export default BaseCard;