import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NEON_ACCENT, PALETTE } from '../theme/palette';

// Styled component for social media icons
const SocialIconLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? PALETTE.light.divider
      : PALETTE.dark.divider,
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: NEON_ACCENT,
    color: PALETTE.dark.textPrimary, // Use a contrasting color
  },
  margin: theme.spacing(0, 1),
}));

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4} md={3} textAlign="center">
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are a team of experienced consultants dedicated to helping
              businesses thrive.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} textAlign="center">
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Tech Street, Innovation City
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@glustack.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} textAlign="center">
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ mt: 1 }}>
              <SocialIconLink href="#">
                {/* Replace with actual social media icons */}
                <i className="fab fa-facebook-f"></i>
              </SocialIconLink>
              <SocialIconLink href="#">
                <i className="fab fa-twitter"></i>
              </SocialIconLink>
              <SocialIconLink href="#">
                <i className="fab fa-linkedin-in"></i>
              </SocialIconLink>
              <SocialIconLink href="#">
                <i className="fab fa-instagram"></i>
              </SocialIconLink>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
              GLUStack
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
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