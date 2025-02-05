// components/Home/HeroSection.js
'use client';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import NextLink from 'next/link';
import {
  SiAmazonaws,
  SiMicrosoftazure,
  SiGooglecloud,
  SiKubernetes,
  SiNvidia,
} from 'react-icons/si';
import { SECTION_HEIGHT, COLORS, SPACING, FONT_SIZES, BUTTON_SIZES } from '../../utils/sharedStyles'; // Import BUTTON_SIZES

const TECH_LOGOS = [
  { icon: SiAmazonaws, name: 'AWS' },
  { icon: SiMicrosoftazure, name: 'Microsoft Azure' },
  { icon: SiGooglecloud, name: 'Google Cloud' },
  { icon: SiKubernetes, name: 'Kubernetes' },
  { icon: SiNvidia, name: 'GPU Accelerated' },
];

export const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: SECTION_HEIGHT,
        background: `linear-gradient(45deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: SPACING.medium, // Use SPACING.medium for consistent padding
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: 'white',
            fontWeight: 700,
            mb: SPACING.medium / 2, // Use SPACING.medium / 2 for consistent margin
            fontSize: isMobile? FONT_SIZES.h4: FONT_SIZES.h3, // Use FONT_SIZES for font sizes
          }}
        >
          Next-Level Digital Transformation
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: 'white',
            mb: SPACING.medium * 1.5, // Use SPACING.medium * 1.5 for consistent margin
            fontSize: isMobile? FONT_SIZES.body1: FONT_SIZES.h5, // Use FONT_SIZES for font sizes
          }}
        >
          Empowering startups with enterprise-grade cloud native solutions
        </Typography>

        <Grid container spacing={isMobile? SPACING.small: SPACING.medium} justifyContent="center"> {/* Use SPACING for consistent spacing */}
          {TECH_LOGOS.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Grid item key={index} xs={isMobile? 6: true}>
                <Box sx={{ textAlign: 'center' }}>
                  <Icon
                    size={isMobile? 40: 60}
                    color={theme.palette.common.white}
                    style={{
                      filter: `drop-shadow(0 0 10px ${alpha(theme.palette.common.white, 0.8)})`,
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      mt: SPACING.small, // Use SPACING.small for consistent margin
                      fontSize: isMobile? FONT_SIZES.body2: FONT_SIZES.subtitle1, // Use FONT_SIZES for font sizes
                    }}
                  >
                    {tech.name}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <NextLink href="/contact" passHref>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: SPACING.medium, // Use SPACING.medium for consistent margin
              px: BUTTON_SIZES.medium.padding, // Use BUTTON_SIZES.medium.padding for consistent padding
              py: 2,
              fontWeight: 700,
              fontSize: isMobile? FONT_SIZES.body1: '1.25rem', // Use FONT_SIZES for font sizes
              borderRadius: 2,
              background: theme.palette.secondary.main,
              color: 'white',
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': {
                background: theme.palette.secondary.dark,
              },
            }}
          >
            Get in Touch
          </Button>
        </NextLink>
      </Container>
    </Box>
  );
};

export default HeroSection;