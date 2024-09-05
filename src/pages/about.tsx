import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          About Ritual Works
        </Typography>
        <Typography variant="body1" paragraph>
          Ritual Works is a platform dedicated to empowering individuals on their spiritual journeys through the integration of technology and tradition. We believe in the power of rituals to bring about personal transformation, connect communities, and foster a deeper understanding of oneself and the world.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/images/community.jpg"
                alt="Community"
                width={400}
                height={300}
                style={{ borderRadius: '8px' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to provide a platform that blends ancient wisdom with modern technology, making it easier for people to incorporate meaningful rituals into their daily lives. We offer a wide range of resources, including guided practices, expert advice, and a supportive community.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body1" component="div" paragraph>
              At Ritual Works, we are committed to:
              <ul>
                <li>Inclusivity: Welcoming people of all backgrounds and beliefs.</li>
                <li>Authenticity: Honoring the true essence of spiritual practices.</li>
                <li>Community: Building a supportive network for shared growth.</li>
                <li>Innovation: Leveraging technology to enhance spiritual experiences.</li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/images/ritual.jpg"
                alt="Ritual"
                width={400}
                height={300}
                style={{ borderRadius: '8px' }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Meet the Team
          </Typography>
          <Typography variant="body1" paragraph>
            Our team consists of passionate individuals who are dedicated to making Ritual Works a valuable resource for anyone seeking spiritual growth. From experts in spiritual practices to tech enthusiasts, our diverse team brings a wealth of knowledge and experience to the platform.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/images/team1.jpg"
                alt="Team Member 1"
                width={200}
                height={200}
                style={{ borderRadius: '50%' }}
              />
            </Box>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Team Member 1
            </Typography>
            <Typography variant="body2" align="center">
              Founder & Spiritual Guide
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/images/team2.jpg"
                alt="Team Member 2"
                width={200}
                height={200}
                style={{ borderRadius: '50%' }}
              />
            </Box>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Team Member 2
            </Typography>
            <Typography variant="body2" align="center">
              Tech Lead
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/images/team3.jpg"
                alt="Team Member 3"
                width={200}
                height={200}
                style={{ borderRadius: '50%' }}
              />
            </Box>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Team Member 3
            </Typography>
            <Typography variant="body2" align="center">
              Community Manager
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Join Our Community
          </Typography>
          <Typography variant="body1" paragraph>
            We invite you to join our community of like-minded individuals who are on a journey to discover the power of rituals. Together, we can share experiences, support each other, and grow spiritually.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage;
