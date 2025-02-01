import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  useTheme, 
  Box, 
  Avatar, 
  Chip,
  styled,
  useMediaQuery,
  alpha,
  SxProps,
  Theme
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarsIcon from '@mui/icons-material/Stars';

interface BlogCardProps {
  title: string;
  summary: string;
  path: string;
  icon: React.ReactNode;
  sx?: SxProps<Theme>;
}

const PremiumCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: 520,
  transition: 'all 0.3s ease-in-out',
  background: 'transparent', // Card background is transparent
  boxShadow: `0 8px 16px ${alpha(theme.palette.grey[900], 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 24px ${alpha(theme.palette.grey[900], 0.15)}`,
  },
}));

const GlowLayer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `radial-gradient(circle at 50% 0%, ${alpha(theme.palette.primary.main, 0.15)}, transparent 60%)`,
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  zIndex: 0,
  pointerEvents: 'none',
}));

const BlogCard: React.FC<BlogCardProps> = ({ title, summary, path, icon, sx = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      position: 'relative', 
      height: 520,
      backgroundColor: theme.palette.background.paper, // Background set on the outer Box
    }}>
      <GlowLayer className="glow-layer" />
      <motion.div style={{ height: '100%' }}>
        <PremiumCard sx={[
          { height: '100%' },
          ...(Array.isArray(sx) ? sx : [sx])
        ]}>
          <CardContent sx={{ 
            p: 4,
            pb: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 72px)',
            [theme.breakpoints.down('sm')]: { p: 3 }
          }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                mr: 2,
                width: 48,
                height: 48,
                '& svg': {
                  color: theme.palette.primary.main,
                  fontSize: '1.5rem'
                }
              }}>
                {icon}
              </Avatar>
              <Chip
                icon={<StarsIcon />}
                label="Premium"
                sx={{
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.main,
                  fontWeight: 700
                }}
              />
            </Box>

            <Typography 
              variant="h4" 
              component="h3" 
              sx={{ 
                mb: 3,
                fontWeight: 700,
                lineHeight: 1.3,
                background: theme.palette.gradients?.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {title}
            </Typography>

            <Typography 
              variant="body1"
              sx={{ 
                mb: 4,
                flex: 1,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                color: theme.palette.text.secondary,
                lineHeight: 1.6
              }}
            >
              {summary}
            </Typography>

            <Box sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 3
            }}>
              <Chip label="Security" size="small" />
              <Chip label="Cloud" size="small" />
              <Chip label="Guide" size="small" />
            </Box>
          </CardContent>

          <Box sx={{ 
            px: 4,
            pb: 3,
            pt: 0,
            [theme.breakpoints.down('sm')]: { px: 3 }
          }}>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              component={NextLink}
              href={path}
              sx={{
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              Read Guide
            </Button>
          </Box>
        </PremiumCard>
      </motion.div>
    </Box>
  );
};

export default BlogCard;