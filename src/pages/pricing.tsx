import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Container, 
  useTheme, 
  styled,
  useMediaQuery
} from '@mui/material';
import { Info, Award, Clock, Users, Mail, Calendar, Briefcase } from 'lucide-react';
import { useRouter } from 'next/router';

const PricingCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8]
  }
}));

const PricingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handlePlanSelection = (planType: string) => {
    router.push(`/contact?plan=${encodeURIComponent(planType)}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Value Proposition Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" sx={{ 
          fontWeight: 800,
          color: 'primary.main',
          mb: 3,
          fontSize: isMobile ? '2rem' : '2.75rem'
        }}>
          Tailored Solutions for Your Business Needs
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Our flexible engagement models ensure you get exactly the expertise you need
        </Typography>
      </Box>

      {/* Pricing Models */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <PricingCard>
            <Clock size={48} color={theme.palette.primary.main} style={{ marginBottom: 16 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Hourly Consulting
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Perfect for specific challenges or short-term needs
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Info size={20} style={{ marginRight: 8 }} />
                <Typography>Expert guidance on demand</Typography>
              </Box>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Award size={20} style={{ marginRight: 8 }} />
                <Typography>Senior-level expertise</Typography>
              </Box>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Calendar size={20} style={{ marginRight: 8 }} />
                <Typography>Flexible scheduling</Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ mt: 3 }}
              onClick={() => handlePlanSelection('hourly')}
              startIcon={<Mail size={20} />}
            >
              Discuss Your Needs
            </Button>
          </PricingCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <PricingCard>
            <Briefcase size={48} color={theme.palette.primary.main} style={{ marginBottom: 16 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Project-Based
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Comprehensive solutions for defined initiatives
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Info size={20} style={{ marginRight: 8 }} />
                <Typography>Fixed scope & deliverables</Typography>
              </Box>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Award size={20} style={{ marginRight: 8 }} />
                <Typography>Dedicated project team</Typography>
              </Box>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Calendar size={20} style={{ marginRight: 8 }} />
                <Typography>Clear timeline & milestones</Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ mt: 3 }}
              onClick={() => handlePlanSelection('project')}
              startIcon={<Mail size={20} />}
            >
              Start Your Project
            </Button>
          </PricingCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <PricingCard>
            <Users size={48} color={theme.palette.primary.main} style={{ marginBottom: 16 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Retainer Model
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Ongoing partnership for continuous support
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Info size={20} style={{ marginRight: 8 }} />
                <Typography>Priority support</Typography>
              </Box>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Award size={20} style={{ marginRight: 8 }} />
                <Typography>Strategic advisory</Typography>
              </Box>
              <Box component="li" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Calendar size={20} style={{ marginRight: 8 }} />
                <Typography>Predictable budgeting</Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ mt: 3 }}
              onClick={() => handlePlanSelection('retainer')}
              startIcon={<Mail size={20} />}
            >
              Build a Partnership
            </Button>
          </PricingCard>
        </Grid>
      </Grid>

      {/* CTA Section */}
      <Box sx={{ 
        backgroundColor: 'primary.main', 
        color: 'primary.contrastText',
        borderRadius: 4,
        p: 6,
        textAlign: 'center'
      }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 800,
          mb: 3,
          fontSize: isMobile ? '1.75rem' : '2.5rem'
        }}>
          Ready to Transform Your Business?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Schedule a free consultation to discuss your project needs
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ px: 6, py: 2 }}
          onClick={() => handlePlanSelection('consultation')}
        >
          Start Your Consultation
        </Button>
      </Box>
    </Container>
  );
};

export default PricingPage;