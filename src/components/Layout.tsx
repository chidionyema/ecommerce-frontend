import React from 'react';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Footer from './Footer';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';

const HeroSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#ffffff',
  padding: '40px 20px', // Further reduced padding
  height: '50vh', // Reduced height
  maxHeight: '400px', // Capped maximum height
  backgroundImage: 'url("/hero-background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  zIndex: 1,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1,
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#FF6B6B',
  color: '#ffffff',
  padding: '10px 20px', // Reduced padding
  marginTop: '15px', // Reduced margin
  textTransform: 'uppercase',
  fontWeight: 700,
  borderRadius: '50px',
  boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)', // Smaller shadow
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#FF3B3B',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(255, 59, 59, 0.4)',
  },
});

const InfoCard = styled(Card)({
  borderRadius: '15px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-4px)',
  },
});

const InfoCardContent = styled(CardContent)({
  textAlign: 'center',
  padding: '24px',
});

const InfoCardActions = styled(CardActions)({
  justifyContent: 'center',
  padding: '16px',
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
     

      {/* Main Content */}
      <Container maxWidth="lg" component="main" sx={{ my: 5 }}>
        <Box sx={{ mb: 5 }}>{children}</Box>

        {/* Info Cards Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InfoCard>
              <InfoCardContent>
                <Typography variant="h6" gutterBottom>Proven Solutions</Typography>
                <Typography>
                  Explore a library of reliable, tested solutions tailored for developers and businesses.
                </Typography>
              </InfoCardContent>
              <InfoCardActions>
                <Button variant="outlined" href="/solutions">
                  Learn More
                </Button>
              </InfoCardActions>
            </InfoCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard>
              <InfoCardContent>
                <Typography variant="h6" gutterBottom>Working Examples</Typography>
                <Typography>
                  Each solution includes detailed working examples to make implementation a breeze.
                </Typography>
              </InfoCardContent>
              <InfoCardActions>
                <Button variant="outlined" href="/examples">
                  View Examples
                </Button>
              </InfoCardActions>
            </InfoCard>
          </Grid>
        </Grid>

        {/* Call to Action Section */}
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>Ready to Solve Your Next Challenge?</Typography>
          <Button
            variant="contained"
            color="primary"
            href="/solutions"
            sx={{
              padding: '10px 28px',
              fontSize: '1rem',
              borderRadius: '50px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#155b9f' },
            }}
          >
            Find Your Solution
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
