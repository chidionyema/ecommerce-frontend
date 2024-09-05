import React from 'react';
import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const CommunityPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Join Our Community
        </Typography>
        <Typography variant="body1" paragraph>
          At Ritual Works, we believe in the power of community. Join us to connect with like-minded individuals, share your experiences, and grow together on your spiritual journey.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Participate in Forums
              </Typography>
              <Typography variant="body1" paragraph>
                Join our forums to discuss various spiritual practices, ask questions, and share your insights with others. Our community is here to support you.
              </Typography>
              <Button variant="contained" color="primary" startIcon={<ForumIcon />} href="/forums">
                Visit Forums
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Join Community Groups
              </Typography>
              <Typography variant="body1" paragraph>
                Connect with smaller groups focused on specific practices or interests. Find your tribe within our larger community.
              </Typography>
              <Button variant="contained" color="primary" startIcon={<GroupIcon />} href="/groups">
                Join Groups
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Access Resources
              </Typography>
              <Typography variant="body1" paragraph>
                Explore our library of resources, including articles, guides, and videos, to deepen your understanding and enhance your spiritual practices.
              </Typography>
              <Button variant="contained" color="primary" startIcon={<LibraryBooksIcon />} href="/resources">
                Access Resources
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Follow Us on Social Media
              </Typography>
              <Typography variant="body1" paragraph>
                Stay updated with the latest news, events, and community highlights by following us on social media.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" startIcon={<FacebookIcon />} href="https://www.facebook.com/RitualWorks">
                  Facebook
                </Button>
                <Button variant="contained" color="primary" startIcon={<TwitterIcon />} href="https://www.twitter.com/RitualWorks">
                  Twitter
                </Button>
                <Button variant="contained" color="primary" startIcon={<InstagramIcon />} href="https://www.instagram.com/RitualWorks">
                  Instagram
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CommunityPage;
