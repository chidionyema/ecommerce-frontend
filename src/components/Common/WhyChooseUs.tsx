'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  Grid,
  Button,
} from '@mui/material';
import { Lightbulb, Rocket, ShieldCheck, TrendingUp } from 'lucide-react';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';

const WhyChooseUs = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);

  // Benefit-oriented reasons
  const reasons = [
    {
      id: 1,
      text: 'Deep Industry Expertise',
      description:
        'Benefit from the insights of seasoned consultants with extensive experience across diverse technology sectors.',
      icon: Lightbulb,
    },
    {
      id: 2,
      text: 'Tailored, Innovative Solutions',
      description:
        'Receive custom-crafted strategies and cutting-edge solutions designed specifically for your unique challenges and goals.',
      icon: Rocket,
    },
    {
      id: 3,
      text: 'Reliable & Agile Execution',
      description:
        'Count on our proven methodologies and adaptable approach to ensure projects are delivered on time and to the highest standards.',
      icon: ShieldCheck,
    },
    {
      id: 4,
      text: 'Scalable Solutions for Growth',
      description:
        'Implement future-proof solutions architected for scalability, supporting your business as it expands and evolves.',
      icon: TrendingUp,
    },
  ];

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
            mb: SPACING.medium,
            fontWeight: 700,
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
            [theme.breakpoints.down('sm')]: {
              fontSize: '2rem', // Smaller font size on mobile
            },
          }}
        >
          Why Partner with Us?
        </Typography>

        <Grid
          container
          spacing={SPACING.medium}
          justifyContent="center"
        >
          {reasons.map((reason) => (
            <Grid 
              item 
              key={reason.id} 
              xs={12} 
              md={6}
              sx={{
                display: 'flex',
                alignItems: 'stretch'
              }}
            >
              <TechCard
                title={reason.text}
                index={reason.id - 1}
                icon={<reason.icon />}
                sx={{
                  height: '100%', // Make card full height of its grid item
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="body1" 
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mt: 1,
                      fontWeight: 500,
                      color: alpha(theme.palette.text.primary, 0.9),
                      textAlign: 'center'
                    }}
                  >
                    {reason.description}
                  </Typography>
                </Box>
              </TechCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          textAlign: 'center', 
          mt: SPACING.large,
          [theme.breakpoints.down('sm')]: {
            mt: 4, // Reduced margin on mobile
          }
        }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="/solutions"
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
            Explore Our Services
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;