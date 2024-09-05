import React from 'react';
import Link from 'next/link';
import { Button, Typography, Box, Grid, Paper } from '@mui/material';
import {
    Search as SearchIcon,
    Security as SecurityIcon,
    AccessTime as AccessTimeIcon,
    Forum as ForumIcon,
    MonetizationOn as MonetizationOnIcon,
    Favorite as FavoriteIcon
} from '@mui/icons-material';
import { styled } from '@mui/system';
import Footer from '../components/Footer';

const HighlightedNumber = styled('span')({
    fontWeight: 'bold',
    color: '#1976d2',
    fontSize: '1.1rem',
});

const HeroSection = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(to right, rgba(0, 123, 255, 0.7), rgba(0, 230, 255, 0.7))',
    color: '#fff',
    textAlign: 'center',
    padding: '100px 20px',
    [theme.breakpoints.down('sm')]: {
        padding: '60px 20px',
    },
}));

const Section = styled(Box)(({ theme }) => ({
    padding: '60px 20px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: '40px 20px',
    },
}));

const FeaturePaper = styled(Paper)(({ theme }) => ({
    padding: '20px',
    textAlign: 'center',
    borderRadius: '10px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '15px',
    },
}));

const HomePage: React.FC = () => {
    return (
        <Box sx={{ fontFamily: '"Poppins", sans-serif', background: '#f5f5f5', color: '#333' }}>
            {/* Hero Section */}
            <HeroSection>
                <Typography variant="h2" gutterBottom>
                    Unlock Your Potential with Ritual Works
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Your ultimate guide to self-expression and growth.
                </Typography>
                <Link href="/shop" passHref>
                    <Button variant="contained" color="secondary" sx={{ mt: 3 }}>
                        Shop Now
                    </Button>
                </Link>
            </HeroSection>

            {/* Features Section */}
            <Section>
                <Typography variant="h4" gutterBottom>
                    Features of Ritual Works
                </Typography>
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <FeaturePaper elevation={3}>
                            <SearchIcon fontSize="large" color="primary" />
                            <Typography variant="h6" gutterBottom>
                                Discover New Rituals
                            </Typography>
                            <Typography>Explore a variety of guided practices to suit your needs.</Typography>
                        </FeaturePaper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeaturePaper elevation={3}>
                            <SecurityIcon fontSize="large" color="primary" />
                            <Typography variant="h6" gutterBottom>
                                Secure & Private
                            </Typography>
                            <Typography>Confidential support for your personal growth.</Typography>
                        </FeaturePaper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeaturePaper elevation={3}>
                            <AccessTimeIcon fontSize="large" color="primary" />
                            <Typography variant="h6" gutterBottom>
                                Track Your Progress
                            </Typography>
                            <Typography>Witness your growth with immersive dashboards.</Typography>
                        </FeaturePaper>
                    </Grid>
                </Grid>
            </Section>

            {/* Benefits Section */}
            <Section>
                <Typography variant="h4" gutterBottom>
                    Why Choose Ritual Works?
                </Typography>
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <FeaturePaper elevation={3}>
                            <ForumIcon fontSize="large" color="primary" />
                            <Typography variant="h6" gutterBottom>
                                Community Support
                            </Typography>
                            <Typography>Join a community of like-minded individuals.</Typography>
                        </FeaturePaper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeaturePaper elevation={3}>
                            <MonetizationOnIcon fontSize="large" color="primary" />
                            <Typography variant="h6" gutterBottom>
                                Make an Impact
                            </Typography>
                            <Typography>Support causes that matter through donations and petitions.</Typography>
                        </FeaturePaper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeaturePaper elevation={3}>
                            <FavoriteIcon fontSize="large" color="primary" />
                            <Typography variant="h6" gutterBottom>
                                Personalized Experiences
                            </Typography>
                            <Typography>Receive tailored guidance and support.</Typography>
                        </FeaturePaper>
                    </Grid>
                </Grid>
            </Section>

            {/* Testimonials Section */}
            <Section sx={{ backgroundColor: '#fff', color: '#333' }}>
                <Typography variant="h4" gutterBottom>
                    What Our Users Say
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 4 }}>
                    "Ritual Works has transformed my spiritual journey!" - Satisfied User
                </Typography>
            </Section>

            {/* Call to Action Section */}
            <Section>
                <Typography variant="h4" gutterBottom>
                    Ready to Get Started?
                </Typography>
                <Link href="/shop" passHref>
                    <Button variant="contained" color="secondary" sx={{ mt: 3 }}>
                        Join Now
                    </Button>
                </Link>
            </Section>

            <Footer />
        </Box>
    );
};

export default HomePage;
