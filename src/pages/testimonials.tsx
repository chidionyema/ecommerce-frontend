import React from 'react';
import { Container, Typography, Box, Paper, Grid, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const testimonials = [
  {
    name: 'John Doe',
    title: 'Spiritual Seeker',
    image: '/images/testimonial1.jpg',
    feedback: 'Ritual Works has transformed my spiritual journey. The community is incredibly supportive, and the resources are invaluable.',
  },
  {
    name: 'Jane Smith',
    title: 'Meditation Enthusiast',
    image: '/images/testimonial2.jpg',
    feedback: 'The guided practices on Ritual Works have helped me find peace and balance in my daily life. Highly recommend it to everyone!',
  },
  {
    name: 'Carlos Mendoza',
    title: 'Yoga Practitioner',
    image: '/images/testimonial3.jpg',
    feedback: 'I love the variety of rituals and the sense of community on this platform. It has been a wonderful addition to my spiritual practice.',
  },
];

const TestimonialsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          What Our Community Says
        </Typography>
        <Typography variant="body1" paragraph>
          Hear from our community members about their experiences with Ritual Works. Your feedback is our greatest inspiration!
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{ width: 80, height: 80, margin: '0 auto 16px' }}
                />
                <Typography variant="h6" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {testimonial.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {testimonial.feedback}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} color="primary" />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default TestimonialsPage;
