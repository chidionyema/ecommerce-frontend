// -------------------------------------
// components/BlogCard.tsx (Premium Version)
// -------------------------------------

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
  type SxProps,
  type Theme,
  alpha
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
  background: `
    linear-gradient(
      145deg, 
      ${alpha(theme.palette.background.paper, 0.95)} 0%,
      ${alpha(theme.palette.action.hover, 0.25)} 100%
    )`,
  position: 'relative',
  overflow: 'visible',
  backdropFilter: 'blur(24px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: '28px',
    background: `
      linear-gradient(
        145deg,
        ${alpha(theme.palette.primary.light, 0.4)} 0%,
        ${alpha(theme.palette.secondary.light, 0.2)} 50%,
        transparent 100%
      )`,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover:before': {
    opacity: 1,
  },
}));

const GlowEffect = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 'inherit',
  boxShadow: `0 24px 48px -12px ${alpha(theme.palette.primary.main, 0.3)}`,
  opacity: 0,
  transition: 'opacity 0.4s ease',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.common.white,
  fontWeight: 700,
  height: 32,
  borderRadius: '12px',
  padding: theme.spacing(0.5),
  '& .MuiChip-label': {
    padding: theme.spacing(0, 2),
  },
}));

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  summary, 
  path, 
  icon,
  sx = []
}) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ height: '100%', position: 'relative' }}
    >
      <GlowEffect className="card-glow" />
      <PremiumCard
        sx={[
          {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '28px',
            boxShadow: `0 24px 48px -12px ${alpha(theme.palette.primary.main, 0.1)}`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: `0 40px 64px -16px ${alpha(theme.palette.primary.main, 0.2)}`,
              '.card-glow': {
                opacity: 0.6,
              },
            },
          },
          ...(Array.isArray(sx) ? sx : [sx])
        ]}
      >
        <CardContent sx={{ p: 4, pb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                background: `
                  linear-gradient(
                    45deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${theme.palette.secondary.main} 100%
                  )`,
                width: 64,
                height: 64,
                mr: 3,
                boxShadow: `0 12px 24px -6px ${alpha(theme.palette.primary.main, 0.4)}`,
                '& svg': {
                  fontSize: '2rem',
                },
              }}
            >
              {icon}
            </Avatar>
            <Box>
              <Typography variant="overline" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: theme.palette.primary.light,
              }}>
                <StarsIcon sx={{ fontSize: '1.2rem' }} />
                PREMIUM GUIDE
              </Typography>
              <Typography variant="caption" sx={{
                display: 'block',
                mt: 0.5,
                color: alpha(theme.palette.text.secondary, 0.8),
                fontSize: '0.75rem',
                fontWeight: 500,
              }}>
                Enterprise-Grade Patterns
              </Typography>
            </Box>
          </Box>

          <Typography 
            variant="h4" 
            component="h3" 
            sx={{ 
              mb: 3,
              fontWeight: 800,
              lineHeight: 1.3,
              minHeight: '4rem',
              background: `
                linear-gradient(
                  45deg, 
                  ${theme.palette.text.primary} 30%, 
                  ${alpha(theme.palette.text.secondary, 0.9)} 100%
                )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.015em',
            }}
          >
            {title}
          </Typography>

          <Typography 
            variant="body1"
            sx={{ 
              mb: 4,
              opacity: 0.95,
              lineHeight: 1.7,
              minHeight: '4.5rem',
              color: alpha(theme.palette.text.secondary, 0.9),
              fontFamily: '"Inter", sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
            }}
          >
            {summary}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <StyledChip label="Cloud Architecture" />
            <StyledChip label="Best Practices" />
            <StyledChip label="Scalability" />
          </Box>
        </CardContent>

        <Box sx={{ 
          px: 3,
          pb: 3,
          pt: 0,
          marginTop: 'auto',
          transition: 'all 0.3s ease',
        }}>
          <NextLink href={path} passHref>
            <Button
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ 
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '1.2rem',
              }} />}
              sx={{
                py: 2,
                px: 4,
                background: `
                  linear-gradient(
                    45deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${theme.palette.secondary.main} 100%
                  )`,
                color: theme.palette.common.white,
                borderRadius: '14px',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textTransform: 'none',
                boxShadow: `0 12px 24px -6px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': {
                  background: `
                    linear-gradient(
                      45deg, 
                      ${theme.palette.primary.dark} 0%, 
                      ${theme.palette.secondary.dark} 100%
                    )`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 16px 32px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                  '& .MuiSvgIcon-root': {
                    transform: 'translateX(6px)',
                  }
                },
              }}
            >
              Explore Premium Guide
            </Button>
          </NextLink>
        </Box>
      </PremiumCard>
    </motion.div>
  );
};

export default BlogCard;