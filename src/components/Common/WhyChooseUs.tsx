import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha, Button, Paper, Divider } from '@mui/material';
import { Lightbulb, Rocket, ShieldCheck, TrendingUp, FileText, Video, Calendar, Download, ExternalLink } from 'lucide-react';
import { getSharedStyles, ANIMATIONS } from '../../utils/designSystem';
import TechCard from '../Common/TechCard';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CalendlyBooking } from '../CalendlyBooking';

// Enhanced benefit-oriented reasons aligned with hero benefits
const reasons = [
  { 
    id: 1, 
    text: 'Deep Enterprise Expertise', 
    description: "Benefit from the insights of seasoned consultants with extensive experience at ASOS, Tesco, and Philip Morris International. Our team brings practical knowledge from scaling systems that serve millions of users.", 
    icon: <Lightbulb strokeWidth={1.5} size={20} color="#FF9900" />, 
    color: '#FF9900',
    gradient: 'linear-gradient(135deg, #FF9966, #FF5E62)'
  },
  { 
    id: 2, 
    text: 'Tailored, Battle-Tested Solutions', 
    description: "Receive custom-crafted strategies and proven solutions designed specifically for your unique challenges and growth goals. We don't reinvent the wheel—we apply patterns that work in enterprise environments.", 
    icon: <Rocket strokeWidth={1.5} size={20} color="#2196F3" />, 
    color: '#2196F3',
    gradient: 'linear-gradient(135deg, #00C6FB, #005BEA)'
  },
  { 
    id: 3, 
    text: 'Enterprise-Grade Security', 
    description: "Implement secure solutions with SOC 2, GDPR & ISO 27001 compliance from day one. Our security-first approach ensures your data and systems are protected at every level.", 
    icon: <ShieldCheck strokeWidth={1.5} size={20} color="#4CAF50" />, 
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #38ef7d, #11998e)'
  },
  { 
    id: 4, 
    text: 'Scalable Architecture for Growth', 
    description: "Deploy future-proof solutions architected for scalability, supporting your business as it expands. We design systems that can grow from thousands to millions of users without requiring complete rewrites.", 
    icon: <TrendingUp strokeWidth={1.5} size={20} color="#E91E63" />, 
    color: '#E91E63',
    gradient: 'linear-gradient(135deg, #6a11cb, #2575fc)'
  },
];

// Resources for blue CTA - matching hero content pattern
const resources = [
  { title: 'Video Walkthrough: Microservices at Scale', icon: Video },
  { title: 'White Paper: Cloud Migration Patterns', icon: FileText },
  { title: 'Technical Guide: OAuth 2.0 Implementation', icon: FileText },
  { title: 'Case Study: Ecommerce Performance Tuning', icon: FileText }
];

const WhyChooseUs = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Blue checkmark component matching hero section styling
  const BlueCheckmarkItem = ({ text, Icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ 
        width: 20, height: 20, borderRadius: '50%', backgroundColor: theme.palette.primary.main,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
      }}>
        {Icon ? <Icon size={12} /> : '✓'}
      </Box>
      <Typography color={theme.palette.text.primary}>{text}</Typography>
    </Box>
  );

  return (
    <Box 
      component="section" 
      ref={ref} 
      sx={{
        position: 'relative',
        py: 10,
        background: 'linear-gradient(180deg, #18407F 0%, #1A438A 100%)',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg" sx={styles.contentContainer}>
        <motion.div 
          variants={ANIMATIONS.container} 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="h2" sx={styles.sectionTitle}>
              Why Partner with <Box component="span" sx={styles.accentText}>GLUStack</Box>?
            </Typography>
          </motion.div>

          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="subtitle1" sx={styles.sectionSubtitle}>
              We bring <strong>enterprise-grade expertise</strong> and solutions to growing businesses
            </Typography>
          </motion.div>

          {/* Benefit cards using TechCard component */}
          <Grid container spacing={4} justifyContent="center">
            {reasons.map((reason) => (
              <Grid item key={reason.id} xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
                <motion.div variants={ANIMATIONS.item} style={{ width: '100%', height: '100%' }}>
                  <TechCard
                    icon={reason.icon}
                    title={reason.text}
                    accentColor={reason.color}
                    importance="primary"
                    sx={{
                      background: `linear-gradient(145deg, ${alpha('#1a56db', 0.15)}, ${alpha('#1a56db', 0.07)})`,
                      border: `1px solid ${alpha('#4285f4', 0.15)}`,
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      color={alpha('#fff', 0.9)}
                      sx={{ 
                        fontSize: '0.9rem', 
                        lineHeight: 1.5, 
                        letterSpacing: '0.01em',
                        textAlign: 'center' 
                      }}
                    >
                      {reason.description}
                    </Typography>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Combined CTA section */}
          <motion.div variants={ANIMATIONS.item}>
            <TechCard
              title="Take the Next Step"
              importance="primary"
              sx={{
                ...styles.ctaCard,
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                mt: 6
              }}
            >
              <Grid container spacing={3}>
                {/* Left side: Resources */}
                <Grid item xs={12} md={7} sx={{ 
                  borderRight: { xs: 'none', md: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
                  pb: { xs: 3, md: 0 }
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: theme.palette.primary.main, 
                      mb: 2, 
                      fontWeight: 600 
                    }}
                  >
                    Enterprise Resources Library
                  </Typography>
                  
                  <Grid container spacing={1}>
                    {resources.map((resource, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <BlueCheckmarkItem text={resource.title} Icon={resource.icon} />
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Download size={16} />}
                    href="/resources" 
                    sx={{
                      mt: 2,
                      px: 3, 
                      py: 1, 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      fontSize: '0.95rem', 
                      borderRadius: 2,
                    }}
                  >
                    Access Enterprise Resources
                  </Button>
                </Grid>
                
                {/* Right side: Consultation CTA */}
                <Grid item xs={12} md={5} sx={{ 
                  borderTop: { xs: `1px solid ${alpha(theme.palette.divider, 0.1)}`, md: 'none' },
                  pt: { xs: 3, md: 0 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Box sx={{ textAlign: 'center', maxWidth: '90%' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: theme.palette.secondary.main, 
                        mb: 2, 
                        fontWeight: 600 
                      }}
                    >
                      Ready to Transform Your Business?
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3,
                        color: theme.palette.text.primary 
                      }}
                    >
                      Book a no-obligation consultation with our enterprise experts and discover tailored solutions for your specific challenges.
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="large"
                      endIcon={<Calendar size={16} strokeWidth={2} />}
                      onClick={() => setIsCalendlyOpen(true)} 
                      sx={{
                        px: 4,
                        py: 1.5,
                        textTransform: 'none', 
                        fontWeight: 600, 
                        fontSize: '1rem', 
                        borderRadius: 2
                      }}
                    >
                      Schedule a Consultation
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TechCard>
          </motion.div>
        </motion.div>
      </Container>

      {/* Calendly Integration */}
      <CalendlyBooking 
        eventTypeUrl="https://calendly.com/glustack/consultation" 
        prefill={{
          name: "",
          email: ""
        }}
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </Box>
  );
};

export default WhyChooseUs;