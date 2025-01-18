import React from 'react';
import { Box, Container, Typography, Button, Link } from '@mui/material';
import NextLink from 'next/link';

const ConsultationPage = () => {
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="md">
        {/* Page Title */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
            mb: 4,
            textAlign: 'center',
          }}
        >
          Consultation Process
        </Typography>

        {/* Introduction */}
        <Typography variant="h5" component="p" sx={{ mb: 6, textAlign: 'center' }}>
          Learn more about how our consultation process works and how we can help you achieve your goals.
        </Typography>

        {/* Consultation Steps */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            How It Works
          </Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <Typography variant="body1" component="li" sx={{ mb: 2 }}>
              <strong>Step 1:</strong> Schedule a consultation by filling out the booking form.
            </Typography>
            <Typography variant="body1" component="li" sx={{ mb: 2 }}>
              <strong>Step 2:</strong> We’ll reach out to confirm your appointment and discuss your needs.
            </Typography>
            <Typography variant="body1" component="li" sx={{ mb: 2 }}>
              <strong>Step 3:</strong> During the consultation, we’ll provide tailored solutions and answer your questions.
            </Typography>
            <Typography variant="body1" component="li" sx={{ mb: 2 }}>
              <strong>Step 4:</strong> After the consultation, we’ll follow up with a detailed plan and next steps.
            </Typography>
          </Box>
        </Box>

        {/* Pricing */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Pricing
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Our consultation fees start at $100 per hour. We offer flexible packages for long-term projects.
          </Typography>
        </Box>

        {/* Testimonials */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            What Our Clients Say
          </Typography>
          <Box sx={{ fontStyle: 'italic' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              "The consultation was incredibly helpful! The team provided clear and actionable advice."
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              "Highly recommend their services. They really understand our business needs."
            </Typography>
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center' }}>
          <NextLink href="/" passHref>
            <Button variant="contained" size="large" sx={{ mt: 4 }}>
              Back to Home
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default ConsultationPage;