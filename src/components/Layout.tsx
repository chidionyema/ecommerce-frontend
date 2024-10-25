import React from 'react';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Footer from './Footer';
import { Box, Container, Typography, Paper, Button, Grid, Card, CardContent, CardActions, Divider } from '@mui/material';
import { styled } from '@mui/system';

// Custom Styled Components
const HeroSection = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#ffffff',
    padding: '100px 20px',
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
    padding: '12px 24px',
    marginTop: '20px',
    textTransform: 'uppercase',
    fontWeight: 700,
    borderRadius: '50px',
    boxShadow: '0 6px 18px rgba(255, 107, 107, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#FF3B3B',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(255, 59, 59, 0.4)',
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
            {/* Hero Section */}
            <HeroSection>
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' } }}>
                    Exclusive Deals on Top Products
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, maxWidth: '600px' }}>
                    Discover the latest arrivals and save big on premium products.
                </Typography>
                <StyledButton endIcon={<ArrowRightAlt />} href="/shop">
                    Shop Now
                </StyledButton>
            </HeroSection>

            {/* Main Content */}
            <Container maxWidth="lg" component="main" sx={{ my: 5 }}>
                {/* Optional Breadcrumb Navigation */}
                {/* <BreadcrumbNavigation /> */}

                {/* Featured Sections */}
                <Box sx={{ mb: 5 }}>
                    {children}
                </Box>

                {/* Info Cards Section */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <InfoCard>
                            <InfoCardContent>
                                <Typography variant="h6" gutterBottom>Free Shipping</Typography>
                                <Typography>
                                    Enjoy free shipping on all orders over $50.
                                </Typography>
                            </InfoCardContent>
                            <InfoCardActions>
                                <Button variant="outlined" href="/shipping-info">
                                    Learn More
                                </Button>
                            </InfoCardActions>
                        </InfoCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoCard>
                            <InfoCardContent>
                                <Typography variant="h6" gutterBottom>New Arrivals</Typography>
                                <Typography>
                                    Check out the latest trends and additions to our collection.
                                </Typography>
                            </InfoCardContent>
                            <InfoCardActions>
                                <Button variant="outlined" href="/new-arrivals">
                                    Shop Now
                                </Button>
                            </InfoCardActions>
                        </InfoCard>
                    </Grid>
                </Grid>

                {/* Featured Product & Testimonial Section */}
                <Box sx={{ mt: 5 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <InfoCard>
                                <InfoCardContent>
                                    <Typography variant="h6" gutterBottom>Featured Product</Typography>
                                    <Typography>
                                        Discover our top-selling product of the month, crafted for ultimate quality.
                                    </Typography>
                                </InfoCardContent>
                                <InfoCardActions>
                                    <Button variant="outlined" href="/featured-product">
                                        View Product
                                    </Button>
                                </InfoCardActions>
                            </InfoCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoCard>
                                <InfoCardContent>
                                    <Typography variant="h6" gutterBottom>Customer Testimonial</Typography>
                                    <Typography>"The products are amazing, and the customer service is top-notch!" - Happy Customer</Typography>
                                </InfoCardContent>
                            </InfoCard>
                        </Grid>
                    </Grid>
                </Box>

                {/* Call to Action Section */}
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="h5" sx={{ mb: 2 }}>Ready to Start Shopping?</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        href="/shop"
                        sx={{
                            padding: '12px 32px',
                            fontSize: '1.1rem',
                            borderRadius: '50px',
                            backgroundColor: '#1976d2',
                            '&:hover': { backgroundColor: '#155b9f' },
                        }}
                    >
                        Explore Products
                    </Button>
                </Box>
            </Container>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default Layout;
