'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles'; // Make sure path is correct
import TechCard from '../Common/TechCard'; // Make sure path is correct

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
        py: SPACING.large,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Image with Stronger Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/istockphoto-1303809341-1024x1024.jpg")', // Ensure path is correct
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Increase overlay opacity
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: 'white', // Ensure text is white for contrast
            mb: SPACING.large,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)', // Increase text shadow for better readability
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
                  sx={{ 
                    backgroundColor: alpha(theme.palette.background.paper, 0.95), // Strong background color
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.5)', // Strong shadow
                    borderRadius: 3, // Slightly increase border radius
                    padding: SPACING.medium,
                    zIndex: 2, // Ensure cards are on top
                    border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`, // Add subtle border for better definition
                    ':hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)', // Increase hover shadow
                    },
                  }} 
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
                      fontStyle: 'italic',
                      mb: SPACING.small,
                      color: 'white', // Ensure testimonial content is white for contrast
                      textAlign: 'center',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)', // Add subtle shadow to testimonial text
                    }}
                  >
                    "{t.content}"
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white', // Ensure role is white for contrast
                      textAlign: 'center',
                      display: 'block',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)', // Add subtle shadow to role text
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
          <Box sx={{ textAlign: 'center', mt: SPACING.medium }}>
            <NextLink href="/contact" passHref legacyBehavior>
              <Button variant="contained" color="secondary" sx={styles.button}>
                View More
              </Button>
            </NextLink>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;