'use client';

import React from 'react';
import { Box, Typography, Link, Container, Grid, useTheme, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// Import Material UI Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

// Styled component for social media icons (improved)
const SocialIconLink = styled(IconButton)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  color: theme.palette.text.secondary, // Corrected: Use secondary text color
  backgroundColor: alpha(theme.palette.primary.main, 0.1), // Subtle background
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[3],
  },
  margin: theme.spacing(0, 0.5), // Reduced margin, use theme spacing
}));

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.background.paper, // Use paper color
        color: theme.palette.text.secondary, // Use secondary text color
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h6" color="textPrimary" gutterBottom sx={{ fontWeight: 700 }}> {/*Use Primary text color */}
              About Us
            </Typography>
            <Typography variant="body2">
              We are a team of experienced consultants dedicated to helping
              businesses thrive.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h6" color="textPrimary" gutterBottom sx={{ fontWeight: 700 }}>{/*Use Primary text color */}
              Contact
            </Typography>
            <Typography variant="body2">
              123 Tech Street, Innovation City
            </Typography>
            <Typography variant="body2">
              Email: info@glustack.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} textAlign="center">
            <Typography variant="h6" color="textPrimary" gutterBottom sx={{ fontWeight: 700 }}>{/*Use Primary text color */}
              Follow Us
            </Typography>
            <Box sx={{ mt: 1 }}>
              <SocialIconLink href="#" aria-label="Facebook">
                <FacebookIcon />
              </SocialIconLink>
              <SocialIconLink href="#" aria-label="Twitter">
                <TwitterIcon />
              </SocialIconLink>
              <SocialIconLink href="#" aria-label="LinkedIn">
                <LinkedInIcon />
              </SocialIconLink>
              <SocialIconLink href="#" aria-label="Instagram">
                <InstagramIcon />
              </SocialIconLink>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
            <Typography variant="body2" color="textSecondary">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    GLUStack
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            <Link color="inherit" href="/privacy-policy">
                Privacy Policy
            </Link>
            {' | '}
            <Link color="inherit" href="/terms-of-service">
                Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;