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
  styled 
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

interface BlogCardProps {
  title: string;
  summary: string;
  path: string;
  icon: React.ReactNode;
}

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.common.white,
  fontWeight: 600,
  height: 24,
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1),
  },
}));

const BlogCard: React.FC<BlogCardProps> = ({ title, summary, path, icon }) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.secondary.main,
                width: 48,
                height: 48,
                mr: 2,
              }}
            >
              {icon}
            </Avatar>
            <Typography variant="overline" component="div" sx={{ 
              opacity: 0.9,
              letterSpacing: '0.08em',
              lineHeight: 1.2,
              color: theme.palette.common.white
            }}>
              Technical Resource
            </Typography>
          </Box>

          <Typography 
            variant="h5" 
            component="h3" 
            sx={{ 
              mb: 2,
              fontWeight: 700,
              lineHeight: 1.3,
              minHeight: '3.9rem',
              color: theme.palette.common.white
            }}
          >
            {title}
          </Typography>

          <Typography 
            variant="body2"
            sx={{ 
              mb: 3,
              opacity: 0.9,
              lineHeight: 1.6,
              minHeight: '4.5rem',
              color: theme.palette.common.white
            }}
          >
            {summary}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <StyledChip label="Cloud Computing" size="small" />
            <StyledChip label="Best Practices" size="small" />
            <StyledChip label="Architecture" size="small" />
          </Box>
        </CardContent>

        <Box sx={{ p: 3, pt: 0 }}>
          <NextLink href={path} passHref>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: theme.palette.common.white,
                borderColor: theme.palette.secondary.main,
                '&:hover': {
                  borderColor: theme.palette.common.white,
                  backgroundColor: theme.palette.secondary.dark
                },
              }}
            >
              Read Guide
            </Button>
          </NextLink>
        </Box>
      </Card>
    </motion.div>
  );
};

export default BlogCard;