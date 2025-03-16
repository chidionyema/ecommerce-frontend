"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, useTheme, alpha, Grid, Chip, Stack, Paper, TextField, Slider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiGooglecloud } from 'react-icons/si';
import { ShieldCheck, TrendingUp, DollarSign, Users, ArrowRight, Calendar, Clock, MessageCircle } from 'lucide-react';
import { CalendlyBooking } from '../CalendlyBooking';
import Image from 'next/image';

// User personas and their focused benefits
const USER_PERSONAS = {
  developer: {
    headline: "Enterprise Solutions Delivered 10× Faster",
    subheadline: "Accelerate your development with enterprise-grade solutions built by senior engineers",
    benefits: ['CI/CD Pipeline Integration', 'Microservices Architecture', 'Containerization', 'Infrastructure as Code']
  },
  executive: {
    headline: "Enterprise Solutions with 47% Cost Reduction",
    subheadline: "Optimize your technology investment with enterprise solutions that reduce operational costs",
    benefits: ['TCO Optimization', 'Automated Workflows', 'Resource Optimization', 'Reduced Maintenance']
  },
  security: {
    headline: "Enterprise Solutions with Enterprise-Grade Security",
    subheadline: "Deploy secure enterprise solutions with compliance and security built from the ground up",
    benefits: ['SOC 2 Type II Compliance', 'Data Encryption', 'Security Scanning', 'Role-Based Access']
  }
};

// Tech stack data
const TECH_STACK = [
  { icon: SiAmazonaws, name: 'AWS', color: '#FF9900' },
  { icon: SiMicrosoftazure, name: 'Azure', color: '#0078D4' },
  { icon: SiGooglecloud, name: 'GCP', color: '#4285F4' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiKubernetes, name: 'K8s', color: '#326CE5' },
  { icon: SiTerraform, name: 'Terraform', color: '#7B42BC' },
];

// Benefits data
const BENEFITS = [
  { icon: <TrendingUp strokeWidth={1.5} size={20} />, text: '73% Faster Deployment', subtext: 'From concept to production in weeks', gradient: 'linear-gradient(135deg, #00C6FB, #005BEA)' },
  { icon: <ShieldCheck strokeWidth={1.5} size={20} />, text: 'Enterprise Security', subtext: 'SOC 2, GDPR & ISO 27001 compliant', gradient: 'linear-gradient(135deg, #FF9966, #FF5E62)' },
  { icon: <DollarSign strokeWidth={1.5} size={20} />, text: '47% Cost Reduction', subtext: 'Optimized infrastructure & reduced overhead', gradient: 'linear-gradient(135deg, #38ef7d, #11998e)' },
  { icon: <Users strokeWidth={1.5} size={20} />, text: '99.99% Uptime SLA', subtext: 'Built for enterprise-grade reliability', gradient: 'linear-gradient(135deg, #6a11cb, #2575fc)' },
];

const SUCCESS_INDICATORS = ['Production-ready in 14 days', 'Dedicated support team', '30-day money-back guarantee'];

const HeroSection = () => {
  const theme = useTheme();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('developer');
  const [roi, setRoi] = useState(30);
  const [teamSize, setTeamSize] = useState(5);
  
  // Function to detect user persona based on URL or previous interactions
  useEffect(() => {
    // Simulating persona detection from URL parameters or localStorage
    const params = new URLSearchParams(window.location.search);
    const personaParam = params.get('persona');
    if (personaParam && USER_PERSONAS[personaParam]) {
      setSelectedPersona(personaParam);
    } else if (localStorage.getItem('userPersona')) {
      setSelectedPersona(localStorage.getItem('userPersona'));
    }
  }, []);

  // Calculate estimated ROI based on team size and selected persona
  const calculateROI = (size, savings) => {
    // Simple ROI calculation based on team size and average savings
    const monthlyCost = size * 10000; // Assuming $10k per engineer monthly cost
    const annualCost = monthlyCost * 12;
    return Math.round((annualCost * (savings / 100)));
  };

  // Animation variants
  const animations = {
    fadeIn: (delay = 0) => ({
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: delay + 0.05, ease: [0.2, 0, 0.2, 1] } }
    }),
    stagger: {
      container: { initial: {}, animate: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } },
      item: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0.2, 1] } } }
    },
    slideIn: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.2, 0, 0.2, 1] } },
      exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
    }
  };

  // Styles object
  const sx = {
    // Layout and background
    heroContainer: { position: 'relative', minHeight: { xs: '680px', md: '94vh' }, display: 'flex', alignItems: 'center', pt: { xs: 8, md: 10 }, pb: { xs: 8, md: 10 }, overflow: 'hidden' },
    overlay: { position: 'absolute', inset: 0, zIndex: 1, background: `radial-gradient(ellipse at center, ${alpha('#0a2d87', 0.95)} 0%, ${alpha('#0a2d87', 0.75)} 70%, ${alpha('#0a2d87', 0.95)} 100%)` },
    content: { position: 'relative', zIndex: 3, my: 4 },
    
    // Typography
    headline: {
      fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em',
      position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)', width: { xs: '60px', md: '80px' }, height: '4px', background: `linear-gradient(90deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.main, 0.1)})`, borderRadius: '2px' }
    },
    accentText: { background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' },
    subheadline: { fontSize: { xs: '1.2rem', sm: '1.25rem', md: '1.35rem' }, fontWeight: 400, lineHeight: 1.55, letterSpacing: '0.01em', '& strong': { fontWeight: 600, color: alpha(theme.palette.secondary.light, 0.95) } },
    
    // Buttons
    primaryButton: {
      px: 5, py: 2, height: 48, fontSize: '1rem', fontWeight: 600, borderRadius: 12, textTransform: 'none',
      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.dark, 0.9)})`,
      boxShadow: `0 8px 16px ${alpha(theme.palette.secondary.main, 0.35)}`, transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)',
      '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 12px 24px ${alpha(theme.palette.secondary.main, 0.45)}` },
      '&:active': { transform: 'translateY(-1px)', boxShadow: `0 8px 12px ${alpha(theme.palette.secondary.main, 0.4)}` }
    },
    secondaryButton: {
      px: 4, py: 1.75, height: 48, fontSize: '1rem', fontWeight: 600, borderRadius: 12, textTransform: 'none', 
      borderWidth: 1.5, borderColor: alpha('#fff', 0.8), color: '#fff', backgroundColor: alpha('#000', 0.12), backdropFilter: 'blur(8px)',
      transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)', '&:hover': { borderColor: '#fff', backgroundColor: alpha('#fff', 0.08), transform: 'translateY(-3px)' },
      '&:active': { transform: 'translateY(-1px)', backgroundColor: alpha('#fff', 0.05) }
    },
    
    // UI Elements
    offerChip: { px: 1.5, py: 2.5, height: 36, backgroundColor: alpha(theme.palette.error.main, 0.15), color: '#fff', fontWeight: 'bold', border: `1px solid ${alpha(theme.palette.error.light, 0.4)}`, boxShadow: `0 4px 10px ${alpha(theme.palette.error.main, 0.2)}`, '& .MuiChip-icon': { color: alpha('#fff', 0.95) } },
    benefitCard: { p: 3, height: '100%', display: 'flex', flexDirection: 'column', background: alpha('#1a56db', 0.15), border: `1px solid ${alpha('#4285f4', 0.3)}`, borderRadius: 16, backdropFilter: 'blur(12px)', transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)', boxShadow: `0 8px 16px ${alpha('#000', 0.15)}`, '&:hover': { transform: 'translateY(-4px)', background: alpha('#1a56db', 0.2), boxShadow: `0 20px 40px ${alpha('#000', 0.2)}`, border: `1px solid ${alpha('#4285f4', 0.4)}` } },
    iconBox: { borderRadius: '50%', p: 1.5, color: '#fff', width: 'fit-content', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 6px 12px ${alpha('#000', 0.2)}` },
    trustIndicator: { py: 2, px: 3.5, background: alpha('#1a56db', 0.15), border: `1px solid ${alpha('#4285f4', 0.3)}`, borderRadius: 16, backdropFilter: 'blur(12px)' },
    techItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)', '&:hover': { transform: 'translateY(-3px)', '& svg': { filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))' } } },
    blueCheckmarkStyle: { display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 },
    blueCheckBox: { width: 20, height: 20, borderRadius: '50%', backgroundColor: '#4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' },
    
    // New bleeding-edge components
    roiCalculator: { p: 3, borderRadius: 16, background: alpha(theme.palette.secondary.main, 0.12), border: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`, backdropFilter: 'blur(12px)', mb: 4 },
    chatButton: { position: 'fixed', bottom: 24, right: 24, width: 56, height: 56, borderRadius: '50%', zIndex: 1000, background: theme.palette.secondary.main, color: '#fff', boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.4)}`, '&:hover': { background: theme.palette.secondary.dark } },
    personaSwitcher: { display: 'flex', gap: 1, mb: 3, justifyContent: 'center' },
    personaButton: (isActive) => ({ 
      py: 1, px: 2, borderRadius: 8, fontSize: '0.85rem', fontWeight: 500, 
      background: isActive ? alpha(theme.palette.secondary.main, 0.15) : 'transparent',
      border: `1px solid ${isActive ? theme.palette.secondary.main : alpha('#fff', 0.2)}`,
      color: isActive ? theme.palette.secondary.main : alpha('#fff', 0.8),
      '&:hover': { background: isActive ? alpha(theme.palette.secondary.main, 0.2) : alpha('#fff', 0.05) }
    }),
    chatbot: {
      position: 'fixed',
      bottom: 90,
      right: 24,
      width: 350,
      maxHeight: 500,
      borderRadius: 16,
      p: 2,
      background: alpha(theme.palette.background.paper, 0.9),
      backdropFilter: 'blur(12px)',
      border: `1px solid ${alpha('#fff', 0.2)}`,
      zIndex: 1000,
      boxShadow: `0 10px 40px ${alpha('#000', 0.2)}`,
      overflow: 'hidden'
    }
  };
  
  // Reusable CheckItem component
  const CheckItem = ({ text }) => (
    <Box sx={sx.blueCheckmarkStyle}>
      <Box sx={sx.blueCheckBox}>✓</Box>
      <Typography color={alpha('#fff', 0.9)} fontSize="0.9rem" fontWeight={500}>{text}</Typography>
    </Box>
  );
  
  // Current persona data
  const currentPersona = USER_PERSONAS[selectedPersona];
  const estimatedSavings = selectedPersona === 'executive' ? 47 : 30;
  const annualSavings = calculateROI(teamSize, estimatedSavings);

  return (
    <Box component="section" sx={sx.heroContainer}>
      {/* Background */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Image src="/images/istockphoto-realhero.jpg" alt="Enterprise Solutions" layout="fill" objectFit="cover" priority style={{ filter: 'saturate(1.05) brightness(0.97)' }} />
      </Box>
      <Box sx={sx.overlay} />

      <Container maxWidth="lg" sx={sx.content}>
        {/* Persona Switcher */}
        <motion.div {...animations.fadeIn(0)}>
          <Box sx={sx.personaSwitcher}>
            <Button 
              size="small" 
              onClick={() => setSelectedPersona('developer')}
              sx={sx.personaButton(selectedPersona === 'developer')}
            >
              For Developers
            </Button>
            <Button 
              size="small" 
              onClick={() => setSelectedPersona('executive')}
              sx={sx.personaButton(selectedPersona === 'executive')}
            >
              For Executives
            </Button>
            <Button 
              size="small" 
              onClick={() => setSelectedPersona('security')}
              sx={sx.personaButton(selectedPersona === 'security')}
            >
              For Security Teams
            </Button>
          </Box>
        </motion.div>

        {/* Headline - Personalized based on user persona */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedPersona + "headline"}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animations.slideIn}
          >
            <Typography
              variant="h1"
              color="white"
              align="center"
              sx={{ ...sx.headline, mx: 'auto', maxWidth: '900px', mb: 4, mt: { xs: 4, md: 2 } }}
            >
              {currentPersona.headline.split(' ').slice(0, -1).join(' ')}{' '}
              <Box component="span" sx={sx.accentText}>
                {currentPersona.headline.split(' ').slice(-1)}
              </Box>
            </Typography>
          </motion.div>
        </AnimatePresence>

        {/* Subheadline - Personalized */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedPersona + "subheadline"}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animations.slideIn}
          >
            <Typography
              variant="h2"
              color="#f8f8f8"
              align="center"
              sx={{ ...sx.subheadline, mx: 'auto', maxWidth: '760px', mb: 4 }}
            >
              {currentPersona.subheadline.split(' ').map((word, i, arr) => 
                i === arr.length - 2 ? <strong key={i}>{word} </strong> : 
                i === arr.length - 1 ? <strong key={i}>{word}</strong> : 
                word + ' '
              )}
            </Typography>
          </motion.div>
        </AnimatePresence>

        {/* Interactive ROI Calculator */}
        <motion.div {...animations.fadeIn(0.15)}>
          <Paper elevation={0} sx={sx.roiCalculator}>
            <Typography 
              align="center" 
              color={theme.palette.secondary.main} 
              sx={{ fontWeight: 700, mb: 2, fontSize: '1.2rem' }}
            >
              Calculate Your Potential Savings
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography color="white" fontSize="0.9rem" mb={1}>Team Size</Typography>
                <Slider
                  value={teamSize}
                  onChange={(e, newValue) => setTeamSize(newValue)}
                  min={1}
                  max={50}
                  step={1}
                  valueLabelDisplay="auto"
                  aria-labelledby="team-size-slider"
                  sx={{
                    color: theme.palette.secondary.main,
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: theme.palette.secondary.dark
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="white" fontSize="0.9rem" mb={1}>Estimated Savings</Typography>
                <Slider
                  value={roi}
                  onChange={(e, newValue) => setRoi(newValue)}
                  min={10}
                  max={60}
                  step={1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={value => `${value}%`}
                  aria-labelledby="roi-slider"
                  sx={{
                    color: theme.palette.secondary.main,
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: theme.palette.secondary.dark
                    }
                  }}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color={theme.palette.secondary.main} fontWeight={700}>
                ${annualSavings.toLocaleString()} / year
              </Typography>
              <Typography color={alpha('#fff', 0.7)} fontSize="0.85rem">
                Potential annual savings based on your inputs
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Offer chip */}
        <motion.div {...animations.fadeIn(0.2)}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Chip icon={<Clock size={14} strokeWidth={2} />} label="Limited Time: 2 Free Strategy Sessions" sx={sx.offerChip} />
          </Box>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div {...animations.fadeIn(0.25)}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} justifyContent="center" sx={{ mb: 6 }}>
            <Button variant="contained" color="secondary" size="large" onClick={() => setIsCalendlyOpen(true)} endIcon={<Calendar size={16} strokeWidth={2} />} sx={sx.primaryButton}>
              Book Your Free Strategy Session
            </Button>
            <Button variant="outlined" size="large" href="/solutions" component="a" sx={sx.secondaryButton} endIcon={<ArrowRight size={16} strokeWidth={2} />}>
              View Case Studies
            </Button>
          </Stack>
        </motion.div>

        {/* Benefits cards - Personalized based on user persona */}
        <motion.div variants={animations.stagger.container} initial="initial" animate="animate">
          <Box sx={{ mb: 7 }}>
            <Grid container spacing={2.5}>
              {BENEFITS.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={animations.stagger.item}>
                    <Paper elevation={0} sx={sx.benefitCard}>
                      <Box sx={{ ...sx.iconBox, background: item.gradient }}>{item.icon}</Box>
                      <Typography variant="h6" fontWeight={700} color="white" sx={{ mb: 1, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{item.text}</Typography>
                      <Typography variant="body2" color={alpha('#fff', 0.9)} sx={{ fontSize: '0.9rem', lineHeight: 1.5, letterSpacing: '0.01em' }}>{item.subtext}</Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Trust indicators */}
        <motion.div {...animations.fadeIn(0.3)}>
          <Box sx={{ mb: 7, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={0} sx={sx.trustIndicator}>
              <Typography align="center" color="white" sx={{ fontWeight: 600, mb: 2, fontSize: '1rem', letterSpacing: '0.01em' }}>Trusted across industries</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2.5, sm: 4 }} justifyContent="center" sx={{ mb: 1.5, px: 2 }}>
                {SUCCESS_INDICATORS.map((item, index) => <CheckItem key={index} text={item} />)}
              </Stack>
            </Paper>
          </Box>
        </motion.div>

        {/* Personalized Feature Highlights */}
        <Paper elevation={0} sx={{ ...sx.benefitCard, maxWidth: '720px', mx: 'auto', mb: 7, p: 3.5 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPersona + "features"}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animations.slideIn}
            >
              <Typography variant="h5" color="#4285f4" fontWeight={700} textAlign="center" mb={3}>
                {selectedPersona === 'developer' ? 'Developer-Focused Features' :
                 selectedPersona === 'executive' ? 'Business Value Accelerators' :
                 'Security & Compliance Features'}
              </Typography>
              <Grid container spacing={2}>
                {currentPersona.benefits.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <CheckItem text={feature} />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Paper>

        {/* Tech stack */}
        <motion.div {...animations.fadeIn(0.35)}>
          <Typography variant="h6" color="#fff" textAlign="center" mb={3.5} sx={{ fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.01em' }}>
            Pre-built architectures for leading enterprise technologies
          </Typography>

          <Grid container spacing={3} justifyContent="center" sx={{ mb: 7 }}>
            {TECH_STACK.map((tech, index) => (
              <Grid item key={index} xs={4} sm={2}>
                <Box sx={sx.techItem}>
                  <tech.icon color={tech.color} size={36} style={{ transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)' }} />
                  <Typography color="#fff" fontWeight={600} sx={{ fontSize: '0.85rem', letterSpacing: '0.01em' }}>{tech.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Final CTA */}
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="secondary" size="large" onClick={() => setIsCalendlyOpen(true)} 
              endIcon={<Calendar size={16} strokeWidth={2} />} sx={sx.primaryButton}>
              Schedule Your Strategy Session
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* AI Chatbot Button */}
      <Button
        variant="contained"
        sx={sx.chatButton}
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
      >
        <MessageCircle size={24} />
      </Button>

      {/* AI Chatbot Dialog */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Box sx={sx.chatbot}>
              <Typography color={theme.palette.primary.main} fontWeight={700} mb={2}>
                Enterprise AI Assistant
              </Typography>
              <Typography color="text.primary" fontSize="0.9rem" mb={2}>
                How can I help with your enterprise solution needs today?
              </Typography>
              <TextField
                fullWidth
                placeholder="Ask me anything..."
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button 
                fullWidth 
                variant="contained" 
                color="primary"
                size="small"
              >
                Send
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <CalendlyBooking 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
        eventTypeUrl="https://calendly.com/glustack/strategy-session" 
        prefill={{ name: "", email: "" }} 
      />
    </Box>
  );
};

export default React.memo(HeroSection);