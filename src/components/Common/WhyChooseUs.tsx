import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha, Button, Paper } from '@mui/material';
import { Lightbulb, Rocket, ShieldCheck, TrendingUp, FileText, Video } from 'lucide-react';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';
import { motion, useInView } from 'framer-motion';
import { CalendlyBooking } from '../CalendlyBooking';

// Define the type for reason items
interface ReasonItem {
  id: number;
  text: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

// Enhanced benefit-oriented reasons - compressed format
const reasons: ReasonItem[] = [
  { id: 1, text: 'Deep Enterprise Expertise', description: "Benefit from the insights of seasoned consultants with extensive experience at ASOS, Tesco, and Philip Morris International. Our team brings practical knowledge from scaling systems that serve millions of users.", icon: Lightbulb, color: '#FF9900' },
  { id: 2, text: 'Tailored, Battle-Tested Solutions', description: "Receive custom-crafted strategies and proven solutions designed specifically for your unique challenges and growth goals. We don't reinvent the wheel—we apply patterns that work in enterprise environments.", icon: Rocket, color: '#2196F3' },
  { id: 3, text: 'Reliable & Agile Execution', description: "Count on our proven methodologies and adaptable approach to ensure projects are delivered on time and to the highest standards. Our transparent project management gives you visibility at every stage.", icon: ShieldCheck, color: '#4CAF50' },
  { id: 4, text: 'Scalable Architecture for Growth', description: "Implement future-proof solutions architected for scalability, supporting your business as it expands. We design systems that can grow from thousands to millions of users without requiring complete rewrites.", icon: TrendingUp, color: '#E91E63' },
];

// Simplified animations
const ANIM = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } },
  item: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }
};

const WhyChooseUs = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Resources for blue CTA
  const resources = [
    { title: 'Video Walkthrough: Microservices at Scale', icon: Video },
    { title: 'White Paper: Cloud Migration Patterns', icon: FileText },
    { title: 'Technical Guide: OAuth 2.0 Implementation', icon: FileText },
    { title: 'Case Study: Ecommerce Performance Tuning', icon: FileText }
  ];

  const handleConsultationClick = () => {
    setIsCalendlyOpen(true);
  };
  
  const handleCalendlyClose = () => {
    setIsCalendlyOpen(false);
  };

  return (
    <Box component="section" ref={ref} sx={{
      width: '100%', py: SPACING.large * 1.5,
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.05, 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' 
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div variants={ANIM.container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={ANIM.item}>
            <Typography variant="h2" component="h2" align="center" sx={{
              ...styles.pageTitle, color: 'white', mb: 2, fontWeight: 800,
              fontSize: { xs: '2.2rem', sm: '2.7rem', md: '3.2rem' },
              letterSpacing: '-0.01em', textShadow: '0 4px 12px rgba(0,0,0,0.6)',
            }}>Why Partner with GLUStack?</Typography>
          </motion.div>

          <motion.div variants={ANIM.item}>
            <Typography variant="subtitle1" align="center" sx={{
              color: alpha(theme.palette.common.white, 0.9), mb: 6, maxWidth: '800px', mx: 'auto',
              textShadow: '0 2px 4px rgba(0,0,0,0.4)', fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 500,
            }}>We bring enterprise-grade expertise and solutions to growing businesses</Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {reasons.map((reason) => {
              const IconComponent = reason.icon;
              return (
                <Grid item key={reason.id} xs={12} md={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                  <motion.div variants={ANIM.item} style={{ width: '100%', height: '100%' }}>
                    <TechCard
                      title={reason.text}
                      icon={<IconComponent color={reason.color} />}
                      accentColor={reason.color}
                      importance={reason.id <= 2 ? 'primary' : 'secondary'}
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <Typography variant="body1" sx={{
                        mt: 1, fontWeight: 500, color: alpha(theme.palette.text.primary, 0.95),
                        textAlign: 'center', lineHeight: 1.6
                      }}>
                        {reason.description}
                      </Typography>
                    </TechCard>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          {/* Strategic blue CTA section */}
          <motion.div variants={ANIM.item}>
            <Paper elevation={4} sx={{ 
              mt: 6, mb: 4, mx: 'auto', maxWidth: '700px', p: 3, borderRadius: 3,
              background: alpha(theme.palette.background.paper, 0.95), backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`
            }}>
              <Typography variant="h5" align="center" fontWeight={700} mb={2} color={theme.palette.primary.main}>
                Enterprise Resources Library
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {resources.map((resource, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ 
                        width: 20, height: 20, borderRadius: '50%', backgroundColor: theme.palette.primary.main,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                      }}>
                        <resource.icon size={12} />
                      </Box>
                      <Typography>{resource.title}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" href="/resources" sx={{
                  px: 3, py: 1, textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', borderRadius: 2
                }}>
                  Access Enterprise Resources
                </Button>
              </Box>
            </Paper>
          </motion.div>

          <motion.div variants={ANIM.item}>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button variant="contained" color="secondary" size="large" onClick={handleConsultationClick} sx={{
                px: 5, py: 1.6, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, textTransform: 'none',
                boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}, 0 2px 6px rgba(0,0,0,0.3)`,
                '&:hover': { transform: 'translateY(-3px)',
                  boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.7)}, 0 4px 10px rgba(0,0,0,0.4)` },
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                Schedule a Consultation
              </Button>
            </Box>
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
        onClose={handleCalendlyClose}
      />
    </Box>
  );
};

export default WhyChooseUs;