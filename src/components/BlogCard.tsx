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
  type Theme
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface BlogCardProps {
  title: string;
  summary: string;
  path: string;
  icon: React.ReactNode;
  sx?: SxProps<Theme>;
}

const PremiumCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
  position: 'relative',
  overflow: 'visible',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    padding: '2px',
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover:before': {
    opacity: 0.15,
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.common.white,
  fontWeight: 600,
  height: 28,
  borderRadius: '8px',
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1.5),
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
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ height: '100%' }}
    >
      <PremiumCard
        sx={[
          {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '24px',
            boxShadow: theme.shadows[4],
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: theme.shadows[8],
            },
          },
          ...(Array.isArray(sx) ? sx : [sx])
        ]}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                width: 56,
                height: 56,
                mr: 2,
                boxShadow: theme.shadows[4],
              }}
            >
              {icon}
            </Avatar>
            <Typography variant="overline" component="div" sx={{ 
              opacity: 0.8,
              letterSpacing: '0.1em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: theme.palette.text.secondary
            }}>
              Expert Insight
            </Typography>
          </Box>

          <Typography 
            variant="h4" 
            component="h3" 
            sx={{ 
              mb: 2,
              fontWeight: 800,
              lineHeight: 1.25,
              minHeight: '3.9rem',
              background: `linear-gradient(45deg, ${theme.palette.text.primary} 0%, ${theme.palette.text.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>

          <Typography 
            variant="body1"
            sx={{ 
              mb: 3,
              opacity: 0.9,
              lineHeight: 1.7,
              minHeight: '4.5rem',
              color: theme.palette.text.secondary,
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            {summary}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <StyledChip label="Cloud Architecture" size="medium" />
            <StyledChip label="Best Practices" size="medium" />
            <StyledChip label="Scalability" size="medium" />
          </Box>
        </CardContent>

        <Box sx={{ p: 4, pt: 0 }}>
          <NextLink href={path} passHref>
            <Button
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ transition: 'transform 0.2s' }} />}
              sx={{
                py: 1.5,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: theme.palette.common.white,
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  '& .MuiSvgIcon-root': {
                    transform: 'translateX(4px)',
                  }
                },
              }}
            >
              Explore Guide
            </Button>
          </NextLink>
        </Box>
      </PremiumCard>
    </motion.div>
  );
};

export default BlogCard;