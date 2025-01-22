import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Box,
  Typography,
  TextField,
  Button,
  Container,
  useTheme,
  styled,
  useMediaQuery,
  Grid,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';

const FormContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  padding: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  fontWeight: 700,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const Contact: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Plan selection logic
  const { plan } = router.query;
  const planTitles: { [key: string]: string } = {
    hourly: 'Hourly Consulting',
    project: 'Project-Based',
    retainer: 'Retainer Model',
    consultation: 'General Consultation'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      selectedPlan: planTitles[plan as string] || 'Custom Inquiry'
    };
    console.log('Form Data Submitted:', submissionData);
    router.push('/thank-you');
  };

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 800,
            fontSize: isMobile ? '2rem' : '2.5rem',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          {plan ? 'Start Your Project' : 'Contact Us'}
        </Typography>

        {plan && (
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Chip
              label={`Selected Plan: ${planTitles[plan as string] || 'Custom Inquiry'}`}
              color="primary"
              sx={{
                fontSize: '1rem',
                py: 1,
                px: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: theme.palette.common.white,
                '& .MuiChip-label': { padding: '0 16px' }
              }}
            />
          </Box>
        )}

        <Typography
          variant="body1"
          align="center"
          sx={{ 
            mb: 6,
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto',
            fontSize: isMobile ? '1rem' : '1.1rem'
          }}
        >
          {plan ? 
            "Let's finalize your project details and get started:" : 
            "Have questions or want to discuss a custom solution? We're here to help."
          }
        </Typography>

        <FormContainer component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                label={plan ? "Project Requirements" : "How Can We Help?"}
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
              <SubmitButton
                type="submit"
                size="large"
                sx={{ 
                  width: isMobile ? '100%' : 'auto',
                  px: 6,
                  fontSize: '1.1rem'
                }}
              >
                {plan ? 'Start Project Now' : 'Send Message'}
              </SubmitButton>
            </Grid>
          </Grid>
        </FormContainer>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Prefer direct contact? Reach us at{' '}
            <Box 
              component="a" 
              href="mailto:support@gluestack.com"
              sx={{ 
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              support@gluestack.com
            </Box>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Contact;