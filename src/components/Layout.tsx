import React from 'react';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Footer from './Footer';
import { Box, Container, Typography, Paper, Button, Grid } from '@mui/material';
import BreadcrumbNavigation from './BreadcrumbNavigation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Roboto, sans-serif', transition: 'all 0.3s ease' }}>
            <Box
                component="header"
                sx={{
                    textAlign: 'center',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#FFF',
                    backgroundImage: 'linear-gradient(to right, rgba(0, 0, 255, 0.7), rgba(0, 255, 255, 0.7))', // Gradient color for overlay
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Empowering Your Spiritual Journey with Rituals and Community
                </Typography>
                <Button
                    variant="contained"
                    endIcon={<ArrowRightAlt />}
                    href="/get-started"
                    sx={{
                        mt: 2,
                        backgroundColor: '#FFF',
                        color: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#f1f1f1',
                        },
                    }}
                >
                    Get Started
                </Button>
            </Box>

            <Container maxWidth="lg" component="main" sx={{ my: 3 }}>
                <BreadcrumbNavigation />

                <Box sx={{ mb: 3 }}>
                    {children}
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
                            <Typography variant="h6" gutterBottom>Did You Know?</Typography>
                            <Typography>
                                Interesting facts about spiritual practices and rituals go here.
                            </Typography>
                            <Button variant="outlined" startIcon={<ArrowRightAlt />} href="/get-started" sx={{ mt: 2, borderColor: '#1976d2', color: '#1976d2' }}>Get Started</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
                            <Typography variant="h6" gutterBottom>Advertisement</Typography>
                            <Box sx={{ width: '100%', height: '120px', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px' }}>
                                Ad space
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Paper elevation={3} sx={{ p: 2, borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                        <Typography variant="h6" gutterBottom>Latest Spiritual News</Typography>
                        <Typography>
                            Stay updated with the latest news on spiritual practices and rituals.
                        </Typography>
                    </Paper>
                </Box>

                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                            <Typography variant="h6" gutterBottom>Rituals Overview</Typography>
                            <Typography>
                                Overview of different rituals and their significance.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                            <Typography variant="h6" gutterBottom>User Testimonial</Typography>
                            <Typography>
                                "Ritual Works has transformed my spiritual journey!" - Satisfied User
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Paper elevation={3} sx={{ p: 2, borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Button variant="outlined" endIcon={<ArrowRightAlt />} href="/contact" sx={{ borderColor: '#1976d2', color: '#1976d2' }}>Contact Us</Button>
                            <Button variant="outlined" endIcon={<ArrowRightAlt />} href="/testimonials" sx={{ borderColor: '#1976d2', color: '#1976d2' }}>Testimonials</Button>
                            <Button variant="outlined" endIcon={<ArrowRightAlt />} href="/faq" sx={{ borderColor: '#1976d2', color: '#1976d2' }}>FAQ</Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Layout;
