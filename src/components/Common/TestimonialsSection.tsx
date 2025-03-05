import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  useTheme,
  Button,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard'; 

// Define the type for a testimonial
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO, TechCorp',
    content: 'Their strategy transformed our entire approach.',
    avatar: '/avatar1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO, InnovateX',
    content: 'Precision execution that elevated our tech stack.',
    avatar: '/avatar2.jpg',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Founder, StartupHub',
    content: 'Top-tier consultancy with next-level expertise.',
    avatar: '/avatar3.jpg',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Marketing Director, GlobalReach',
    content: 'Exceptional results that exceeded our expectations.',
    avatar: '/avatar4.jpg',
  },
  {
    id: 5,
    name: 'David Lee',
    role: 'Product Manager, AgileSolutions',
    content: 'Innovative solutions that drove significant growth.',
    avatar: '/avatar5.jpg',
  },
  {
    id: 6,
    name: 'Sarah Chen',
    role: 'Lead Developer, CodeCrafters',
    content: 'Expert guidance that streamlined our development process.',
    avatar: '/avatar6.jpg',
  },
];

const TestimonialsSection = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [showAll, setShowAll] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: SPACING.large * 1.5,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: 'white',
            mb: SPACING.large,
            fontWeight: 700,
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
            [theme.breakpoints.down('sm')]: {
              fontSize: '2rem', // Smaller font size on mobile
            },
          }}
        >
          Client Success Stories
        </Typography>

        <Grid container spacing={SPACING.medium} justifyContent="center">
          {(showAll ? testimonials : testimonials.slice(0, 3)).map((t, index) => (
            <Grid item key={t.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <TechCard
                  icon={null}
                  title={t.name}
                >
                  <Avatar
                    src={t.avatar}
                    sx={{
                      width: 60,
                      height: 60,
                      mb: SPACING.small,
                      mx: 'auto',
                      border: `2px solid ${theme.palette.secondary.main}`,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)', 
                    }}
                  >
                    "{t.content}"
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white',
                      textAlign: 'center',
                      display: 'block',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {t.role}
                  </Typography>
                </TechCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {!showAll && (
          <Box sx={{ 
            textAlign: 'center', 
            mt: SPACING.medium,
            [theme.breakpoints.down('sm')]: {
              mt: 4, // Reduced margin on mobile
            }
          }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/contact"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.5)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}`,
                },
                transition: 'all 0.3s ease',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '1rem', // Smaller font on mobile
                  px: 3,
                  py: 1.25,
                }
              }}
            >
              View More
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;