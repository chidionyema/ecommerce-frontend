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
import {
  SECTION_HEIGHT,
  COLORS,
  SPACING,
  FONT_SIZES,
  BUTTON_SIZES,
} from '../../utils/sharedStyles';

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
        py: SPACING.medium,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: 'white',
            fontWeight: 700,
            mb: SPACING.medium / 2,
            fontSize: isMobile ? FONT_SIZES.h4 : FONT_SIZES.h3,
          }}
        >
          Next-Level Digital Transformation
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: 'white',
            mb: SPACING.medium * 1.5,
            fontSize: isMobile ? FONT_SIZES.body1 : FONT_SIZES.h5,
          }}
        >
          Empowering startups with enterprise-grade cloud native solutions
        </Typography>

        <Grid
          container
          spacing={isMobile ? SPACING.small : SPACING.medium}
          justifyContent="center"
        >
          {TECH_LOGOS.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Grid item key={index} xs={isMobile ? 6 : true}>
                <Box sx={{ textAlign: 'center' }}>
                  <Icon
                    size={isMobile ? 40 : 60}
                    color={theme.palette.common.white}
                    style={{
                      filter: `drop-shadow(0 0 10px ${alpha(theme.palette.common.white, 0.8)})`,
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      mt: SPACING.small,
                      fontSize: isMobile ? FONT_SIZES.body2 : FONT_SIZES.subtitle1,
                    }}
                  >
                    {tech.name}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Centered Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: SPACING.medium }}>
          <NextLink href="/contact" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: BUTTON_SIZES.medium.padding,
                py: 2,
                fontWeight: 700,
                fontSize: isMobile ? FONT_SIZES.body1 : '1.25rem',
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
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
