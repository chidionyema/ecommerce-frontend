'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Avatar, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import NextLink from 'next/link';
import TechCard from '../Common/TechCard';

const testimonials = [
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
    name: 'John Doe',
    role: 'CEO, TechCorp',
    content: 'Their strategy transformed our entire approach.',
    avatar: '/avatar1.jpg',
  },
  {
    id: 5,
    name: 'Jane Smith',
    role: 'CTO, InnovateX',
    content: 'Precision execution that elevated our tech stack.',
    avatar: '/avatar2.jpg',
  },
  {
    id: 6,
    name: 'Michael Johnson',
    role: 'Founder, StartupHub',
    content: 'Top-tier consultancy with next-level expertise.',
    avatar: '/avatar3.jpg',
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
        bgcolor: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle,
            color: theme.palette.text.primary,
            mb: SPACING.large,
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
                <TechCard icon={null} title={t.name} color={theme.palette.text.primary}  >
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
                      color: theme.palette.text.secondary,
                      textAlign: 'center',
                    }}
                  >
                    "{t.content}"
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      textAlign: 'center',
                      display: 'block',
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
