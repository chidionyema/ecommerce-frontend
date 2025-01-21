// BlogCard.tsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActionArea, 
  useTheme, 
  useMediaQuery, 
  styled, 
  Box
} from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  summary: string;
  path: string;
  icon: React.ReactNode;
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
  borderRadius: '15px',
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s, box-shadow 0.3s',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));

const BlogCard: React.FC<BlogCardProps> = ({ title, summary, path, icon }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <StyledCard>
        <Link href={path} passHref>
          <CardActionArea sx={{ p: 3, height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme.gradients.primary,
                  borderRadius: '50%',
                  mb: 3,
                  color: 'common.white',
                  fontSize: '2.5rem',
                }}
              >
                {icon}
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 2,
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: 1.6,
                }}
              >
                {summary}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </StyledCard>
    </motion.div>
  );
};

export default BlogCard;