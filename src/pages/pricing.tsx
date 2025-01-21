import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Container, 
  useTheme, 
  styled,
  useMediaQuery,
  Modal 
} from '@mui/material';
import { Info, Award, Clock, Users, Mail, Calendar, Briefcase } from 'lucide-react';
import { InlineWidget } from "react-calendly";

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
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const handleCalendlyOpen = () => setCalendlyOpen(true);
  const handleCalendlyClose = () => setCalendlyOpen(false);

  const CalendlyModal = () => (
    <Modal
      open={calendlyOpen}
      onClose={handleCalendlyClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(3px)'
      }}
    >
      <Box sx={{
        backgroundColor: 'background.paper',
        borderRadius: 4,
        p: 2,
        width: '95%',
        maxWidth: 800,
        height: '80vh',
        overflow: 'hidden'
      }}>
        <InlineWidget
          url="https://calendly.com/your-username/your-event-type"
          styles={{
            height: '100%',
            width: '100%'
          }}
          pageSettings={{
            backgroundColor: theme.palette.background.default,
            hideEventTypeDetails: false,
            primaryColor: theme.palette.primary.main,
            textColor: theme.palette.text.primary
          }}
        />
      </Box>
    </Modal>
  );

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
              onClick={handleCalendlyOpen}
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
              onClick={handleCalendlyOpen}
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
              onClick={handleCalendlyOpen}
              startIcon={<Mail size={20} />}
            >
              Build a Partnership
            </Button>
          </PricingCard>
        </Grid>
      </Grid>

      {/* Value Comparison Section */}
      <Box sx={{ 
        backgroundColor: 'background.default', 
        borderRadius: 4,
        p: 4,
        mb: 8
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: 'primary.main',
          mb: 4,
          textAlign: 'center'
        }}>
          What's Included in Every Engagement
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Users size={32} style={{ marginRight: 16 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Dedicated Team</Typography>
                <Typography color="text.secondary">
                  Direct access to senior consultants and technical experts
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Award size={32} style={{ marginRight: 16 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Quality Assurance</Typography>
                <Typography color="text.secondary">
                  Rigorous quality control and performance monitoring
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Info size={32} style={{ marginRight: 16 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Transparent Reporting</Typography>
                <Typography color="text.secondary">
                  Regular progress updates and performance metrics
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Calendar size={32} style={{ marginRight: 16 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Flexible Scheduling</Typography>
                <Typography color="text.secondary">
                  Adaptable timelines to meet your business needs
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: 'primary.main',
          mb: 4,
          textAlign: 'center'
        }}>
          Common Questions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: 'background.paper', 
              borderRadius: 2,
              p: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                How do you determine pricing?
              </Typography>
              <Typography color="text.secondary">
                We create custom proposals based on your specific requirements, 
                project complexity, and desired outcomes.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: 'background.paper', 
              borderRadius: 2,
              p: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                What's included in the initial consultation?
              </Typography>
              <Typography color="text.secondary">
                Our free consultation includes a needs assessment, scope discussion, 
                and high-level recommendations.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: 'background.paper', 
              borderRadius: 2,
              p: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Can we adjust engagement terms mid-project?
              </Typography>
              <Typography color="text.secondary">
                Yes, we maintain flexible agreements that can evolve with your 
                changing business needs.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: 'background.paper', 
              borderRadius: 2,
              p: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                What payment methods do you accept?
              </Typography>
              <Typography color="text.secondary">
                We accept all major credit cards, bank transfers, and offer 
                flexible payment terms for enterprise clients.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

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
          onClick={handleCalendlyOpen}
        >
          Start Your Consultation
        </Button>
      </Box>

      <CalendlyModal />
    </Container>
  );
};

export default PricingPage;