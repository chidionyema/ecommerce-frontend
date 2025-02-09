import { useState, useCallback } from 'react';
import {
  useTheme,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  InputAdornment,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Fab,
  Stack,
} from '@mui/material';
import { Person, Email, Phone, ChatBubbleOutline, Headset, KeyboardArrowUp } from '@mui/icons-material';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import GoldCard from '../components/GoldCard';
import PageSection from '../components/PageSection';
import { getSharedStyles, SPACING } from '../utils/sharedStyles';

// Define the interface for FormData
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);

  // Define formData state with the correct type
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'form', string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form validation and submission logic
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    // Simulate a form submission delay
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true); // Show success page
    }, 2000);
  }, []);

  if (success) {
    return (
      <ConsistentPageLayout
        seoTitle="Thank You"
        seoDescription="Thank you for contacting us!"
        title="Message Sent!"
        subtitle="We’ll be in touch shortly."
      >
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" sx={{ mb: 3, color: theme.palette.primary.contrastText }}>
            Thank you for your message. We have received it and will get back to you as soon as possible.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => (window.location.href = '/')}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
        <BackToTopButton />
      </ConsistentPageLayout>
    );
  }

  return (
    <>
      <SEO
        title="Contact Us - Expert Tech Solutions"
        description="Reach out for tailored technology consulting and solutions. Let our experts guide your digital transformation."
        keywords="contact, support, inquiry, partnership, technology consulting"
      />
      <ConsistentPageLayout>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 6 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100vh', // Full viewport height to center vertically
              maxWidth: 1400,
              mx: 'auto',
              py: { xs: 3, md: 5 },
            }}
          >
            <GoldCard
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: { xs: 4, sm: 5, md: 6 },
                borderRadius: 4,
                width: '100%',
                height: 'auto',
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center vertically
                alignItems: 'center',      // Center horizontally
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3], // Add some shadow to make form stand out
              }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: theme.palette.text.primary,
                }}
              >
                Get a Custom Tech Roadmap in 24 Hours
              </Typography>
              <Stack spacing={4} sx={{ width: '100%' }}>
                {/* Form Fields */}
                <TextField
                  fullWidth
                  label="Full Name *"
                  name="name"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      height: { xs: '54px', md: '60px' },
                      backgroundColor: theme.palette.background.paper,
                    },
                    '& .Mui-focused': {
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Email *"
                  name="email"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      height: { xs: '54px', md: '60px' },
                      backgroundColor: theme.palette.background.paper,
                    },
                    '& .Mui-focused': {
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      height: { xs: '54px', md: '60px' },
                      backgroundColor: theme.palette.background.paper,
                    },
                    '& .Mui-focused': {
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      height: { xs: '150px', md: '200px' },
                      backgroundColor: theme.palette.background.paper,
                    },
                    '& .Mui-focused': {
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ChatBubbleOutline sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  sx={{
                    py: 2.5,
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    textTransform: 'none',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Send Inquiry'
                  )}
                </Button>
              </Stack>
            </GoldCard>
          </Box>
        </Container>
      </ConsistentPageLayout>
    </>
  );
};

// BackToTopButton with updated styling
const BackToTopButton = () => {
  const theme = useTheme();
  return (
    <Fab
      color="secondary"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        boxShadow: theme.shadows[6],
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      }}
    >
      <KeyboardArrowUp />
    </Fab>
  );
};

export default Contact;
