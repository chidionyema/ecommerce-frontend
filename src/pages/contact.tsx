import React from 'react';
import { Container, Typography, Box, Paper, Grid, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContactPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We would love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out to us. Fill out the form below or contact us through our social media channels.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                required
                label="Name"
                fullWidth
              />
              <TextField
                required
                label="Email"
                type="email"
                fullWidth
              />
              <TextField
                required
                label="Message"
                multiline
                rows={4}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                type="submit"
              >
                Send Message
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Our Contact Information
            </Typography>
            <Typography variant="body1" paragraph>
              Email: support@ritualworks.com
            </Typography>
            <Typography variant="body1" paragraph>
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body1" paragraph>
              Address: 123 Ritual Works St., Spiritual City, SC 12345
            </Typography>
            <Typography variant="h5" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body1" paragraph>
              Stay connected with us through our social media channels:
            </Typography>
            <Typography variant="body1" paragraph>
              Facebook: @RitualWorks
            </Typography>
            <Typography variant="body1" paragraph>
              Twitter: @RitualWorks
            </Typography>
            <Typography variant="body1" paragraph>
              Instagram: @RitualWorks
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ContactPage;
