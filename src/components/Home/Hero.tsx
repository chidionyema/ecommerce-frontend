"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, Container, useTheme, alpha, Grid, Chip, Stack, Paper, TextField, Slider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiGooglecloud } from 'react-icons/si';
import { ShieldCheck, TrendingUp, DollarSign, Users, ArrowRight, Calendar, Clock, MessageCircle } from 'lucide-react';
import { CalendlyBooking } from '../CalendlyBooking';
import Image from 'next/image';

// Consolidated data objects with refined language for more precise, Ive-like communication
const DATA = {
  personas: {
    developer: { headline: "Enterprise Solutions Delivered 10× Faster", subheadline: "Accelerate development with meticulously crafted enterprise-grade architectures", benefits: ['CI/CD Pipeline Integration', 'Microservices Architecture', 'Containerization', 'Infrastructure as Code'] },
    executive: { headline: "Enterprise Solutions with 47% Cost Reduction", subheadline: "Optimize technology investments with precision-engineered enterprise solutions", benefits: ['TCO Optimization', 'Automated Workflows', 'Resource Optimization', 'Reduced Maintenance'] },
    security: { headline: "Enterprise Solutions with Enterprise-Grade Security", subheadline: "Deploy secure enterprise solutions with comprehensive protection built from first principles", benefits: ['SOC 2 Type II Compliance', 'Data Encryption', 'Security Scanning', 'Role-Based Access'] }
  },
  benefits: [
    { icon: <TrendingUp size={20} strokeWidth={1.5} />, text: '73% Faster Deployment', subtext: 'From concept to production in weeks', gradient: 'linear-gradient(135deg, #00C6FB, #005BEA)' },
    { icon: <ShieldCheck size={20} strokeWidth={1.5} />, text: 'Enterprise Security', subtext: 'SOC 2, GDPR & ISO 27001 compliant', gradient: 'linear-gradient(135deg, #FF9966, #FF5E62)' },
    { icon: <DollarSign size={20} strokeWidth={1.5} />, text: '47% Cost Reduction', subtext: 'Optimized infrastructure & reduced overhead', gradient: 'linear-gradient(135deg, #38ef7d, #11998e)' },
    { icon: <Users size={20} strokeWidth={1.5} />, text: '99.99% Uptime SLA', subtext: 'Built for enterprise-grade reliability', gradient: 'linear-gradient(135deg, #6a11cb, #2575fc)' },
  ],
  techStack: [
    { icon: SiAmazonaws, name: 'AWS', color: '#FF9900' }, { icon: SiMicrosoftazure, name: 'Azure', color: '#0078D4' },
    { icon: SiGooglecloud, name: 'GCP', color: '#4285F4' }, { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiKubernetes, name: 'K8s', color: '#326CE5' }, { icon: SiTerraform, name: 'Terraform', color: '#7B42BC' }
  ],
  successIndicators: ['Used by leading FinTech companies', 'Trusted by global Healthcare providers', 'Chosen by innovative E-commerce platforms'] // Refined trust indicators
};

// Refined animations with precise timing and easing for a more elegant feel
const ANIM = {
  fadeIn: (delay = 0) => ({
    initial: { opacity: 0, y: 5 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay + 0.05,
        ease: "easeOut"
      }
    }
  }),
  stagger: {
    container: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.055,
          delayChildren: 0.25
        }
      }
    },
    item: {
      initial: { opacity: 0, y: 7 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    }
  },
  slideIn: {
    initial: { opacity: 0, x: 12 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.42,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -12,
      transition: {
        duration: 0.3
      }
    }
  }
};

const HeroSection = () => {
  const theme = useTheme();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('developer');
  const [roi, setRoi] = useState(30);
  const [teamSize, setTeamSize] = useState(5);

  // Detect user persona from URL or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const personaParam = params.get('persona');
    if (personaParam && DATA.personas[personaParam]) setSelectedPersona(personaParam);
    else if (localStorage.getItem('userPersona')) setSelectedPersona(localStorage.getItem('userPersona'));
  }, []);

  // Memoized calculations with more precise formula
  const annualSavings = useMemo(() => {
    const monthlyCost = teamSize * 10000;
    const savingsRate = selectedPersona === 'executive' ? 47 : roi;
    return Math.round((monthlyCost * 12 * (savingsRate / 100)));
  }, [teamSize, selectedPersona, roi]);

  // Current persona data
  const currentPersona = DATA.personas[selectedPersona];

  // Refined styling system with precise values and subtle improvements
  const sx = {
    // Layout
    heroContainer: { position: 'relative', minHeight: { xs: '680px', md: '95vh' }, display: 'flex', alignItems: 'center', pt: { xs: 8, md: 10 }, pb: { xs: 8, md: 10 }, overflow: 'hidden' },
    overlay: { position: 'absolute', inset: 0, zIndex: 1, background: `radial-gradient(ellipse at center, ${alpha('#0a2d87', 0.96)} 0%, ${alpha('#0a2d87', 0.75)} 70%, ${alpha('#0a2d87', 0.96)} 100%)` },
    content: { position: 'relative', zIndex: 3, my: 4 },

    // Typography
    headline: { fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.025em', position: 'relative',
      '&::after': { content: '""', position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)', width: { xs: '60px', md: '80px' }, height: '2.5px',
      background: `linear-gradient(90deg, ${alpha(theme.palette.secondary.main, 0.05)}, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.main, 0.05)})`, borderRadius: '1.25px' }},
    accentText: { background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' },
    subheadline: { fontSize: { xs: '1.175rem', sm: '1.225rem', md: '1.325rem' }, fontWeight: 400, lineHeight: 1.52, letterSpacing: '0.008em',
      '& strong': { fontWeight: 600, color: alpha(theme.palette.secondary.light, 0.98) }},

    // Buttons
    primaryButton: { px: 4.75, py: 1.85, height: 48, fontSize: '0.95rem', fontWeight: 600, borderRadius: 9, textTransform: 'none',
      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.dark, 0.9)})`,
      boxShadow: `0 8px 16px ${alpha(theme.palette.secondary.main, 0.3)}`, transition: 'all 0.32s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 24px ${alpha(theme.palette.secondary.main, 0.4)}` },
      '&:active': { transform: 'translateY(-1px)', boxShadow: `0 8px 12px ${alpha(theme.palette.secondary.main, 0.36)}` }}, // Primary CTA style
    secondaryButton: { px: 3.75, py: 1.75, height: 48, fontSize: '0.95rem', fontWeight: 600, borderRadius: 9, textTransform: 'none',
      borderWidth: 1.5, borderColor: alpha('#fff', 0.85), color: '#fff', backgroundColor: alpha('#000', 0.1), backdropFilter: 'blur(7px)',
      transition: 'all 0.32s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
      '&:hover': { borderColor: '#fff', backgroundColor: alpha('#fff', 0.07), transform: 'translateY(-2px)' },
      '&:active': { transform: 'translateY(-1px)', backgroundColor: alpha('#fff', 0.04) }},

    // UI Elements
    offerChip: { px: 1.5, py: 2.5, height: 36, backgroundColor: alpha(theme.palette.error.main, 0.13), color: '#fff', fontWeight: 600,
      border: `1px solid ${alpha(theme.palette.error.light, 0.36)}`, boxShadow: `0 4px 10px ${alpha(theme.palette.error.main, 0.16)}`,
      '& .MuiChip-icon': { color: alpha('#fff', 0.97) }},
    benefitCard: { p: 3, height: '100%', display: 'flex', flexDirection: 'column', background: alpha('#1a56db', 0.13),
      border: `1px solid ${alpha('#4285f4', 0.25)}`, borderRadius: 12, backdropFilter: 'blur(10px)',
      transition: 'all 0.38s cubic-bezier(0.165, 0.015, 0.12, 0.995)', boxShadow: `0 8px 16px ${alpha('#000', 0.13)}`,
      '&:hover': { transform: 'translateY(-3px)', background: alpha('#1a56db', 0.17), boxShadow: `0 18px 36px ${alpha('#000', 0.17)}`,
      border: `1px solid ${alpha('#4285f4', 0.36)}` }},
    iconBox: { borderRadius: '50%', p: 1.5, color: '#fff', width: 'fit-content', mb: 2, display: 'flex', justifyContent: 'center',
      alignItems: 'center', boxShadow: `0 5px 10px ${alpha('#000', 0.17)}` },
    trustIndicator: { py: 2, px: 3.5, background: alpha('#1a56db', 0.13), border: `1px solid ${alpha('#4285f4', 0.25)}`,
      borderRadius: 12, backdropFilter: 'blur(10px)' },
    techItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.4,
      transition: 'all 0.28s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
      '&:hover': { transform: 'translateY(-2px)', '& svg': { filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))' }}},
    checkStyle: { display: 'flex', alignItems: 'center', gap: 1.4, mb: 1.5 },
    checkBox: { width: 17, height: 17, borderRadius: '50%', backgroundColor: '#4285f4', display: 'flex',
      alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 600 },

    // Components
    roiCalc: { p: 3, borderRadius: 12, background: alpha(theme.palette.secondary.main, 0.1),
      border: `1px solid ${alpha(theme.palette.secondary.light, 0.25)}`, backdropFilter: 'blur(10px)', mb: 4 },
    chatBtn: { position: 'fixed', bottom: 24, right: 24, width: 52, height: 52, borderRadius: '50%', zIndex: 1000,
      background: theme.palette.secondary.main, color: '#fff', boxShadow: `0 4px 18px ${alpha(theme.palette.secondary.main, 0.36)}`,
      '&:hover': { background: theme.palette.secondary.dark, transform: 'scale(1.04)' }},
    personaSwitcher: { display: 'flex', gap: 1, mb: 3, justifyContent: 'center' },
    personaBtn: (isActive) => ({ py: 0.85, px: 1.85, borderRadius: 6, fontSize: '0.82rem', fontWeight: 500,
      background: isActive ? alpha(theme.palette.secondary.main, 0.13) : 'transparent',
      border: `1px solid ${isActive ? theme.palette.secondary.main : alpha('#fff', 0.17)}`,
      color: isActive ? theme.palette.secondary.main : alpha('#fff', 0.85),
      transition: 'all 0.28s cubic-bezier(0.165, 0.015, 0.12, 0.995)',
      '&:hover': { background: isActive ? alpha(theme.palette.secondary.main, 0.17) : alpha('#fff', 0.04),
        transform: isActive ? 'translateY(-1px)' : 'none' }}),
    chatbot: { position: 'fixed', bottom: 90, right: 24, width: 340, maxHeight: 480, borderRadius: 12, p: 2,
      background: alpha(theme.palette.background.paper, 0.94), backdropFilter: 'blur(10px)',
      border: `1px solid ${alpha('#fff', 0.17)}`, zIndex: 1000, boxShadow: `0 10px 36px ${alpha('#000', 0.17)}`, overflow: 'hidden' }
  };

  // Refined CheckItem component for enhanced visual consistency
  const CheckItem = ({ text }) => (
    <Box sx={sx.checkStyle}>
      <Box sx={sx.checkBox}>✓</Box>
      <Typography color={alpha('#fff', 0.94)} fontSize="0.85rem" fontWeight={500} letterSpacing="0.01em">{text}</Typography>
    </Box>
  );

  return (
    <Box component="section" sx={sx.heroContainer}>
      {/* Background with refined filter values */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Image src="/images/istockphoto-realhero.jpg" alt="Enterprise Solutions" layout="fill" objectFit="cover" priority style={{ filter: 'saturate(1.01) brightness(0.98) contrast(1.01)' }} />
      </Box>
      <Box sx={sx.overlay} />

      <Container maxWidth="lg" sx={sx.content}>
        {/* Persona Switcher */}
        <motion.div {...ANIM.fadeIn(0)}>
          <Box sx={sx.personaSwitcher}>
            {Object.keys(DATA.personas).map(persona => (
              <Button key={persona} size="small" onClick={() => setSelectedPersona(persona)} sx={sx.personaBtn(selectedPersona === persona)}>
                For {persona.charAt(0).toUpperCase() + persona.slice(1)}s
              </Button>
            ))}
          </Box>
        </motion.div>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedPersona + "headline"} initial="initial" animate="animate" exit="exit" variants={ANIM.slideIn}>
            <Typography variant="h1" color="white" align="center" sx={{ ...sx.headline, mx: 'auto', maxWidth: '900px', mb: 4, mt: { xs: 4, md: 1.5 } }}>
              {currentPersona.headline.split(' ').slice(0, -1).join(' ')}{' '}
              <Box component="span" sx={sx.accentText}>{currentPersona.headline.split(' ').slice(-1)}</Box>
            </Typography>
          </motion.div>
        </AnimatePresence>

        {/* Subheadline */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedPersona + "subheadline"} initial="initial" animate="animate" exit="exit" variants={ANIM.slideIn}>
            <Typography variant="h2" color="#f8f8f8" align="center" sx={{ ...sx.subheadline, mx: 'auto', maxWidth: '760px', mb: 4 }}>
              {currentPersona.subheadline.split(' ').map((word, i, arr) =>
                i === arr.length - 2 ? <strong key={i}>{word} </strong> :
                i === arr.length - 1 ? <strong key={i}>{word}</strong> : word + ' '
              )}
            </Typography>
          </motion.div>
        </AnimatePresence>

        {/* Offer chip */}
        <motion.div {...ANIM.fadeIn(0.18)}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Chip icon={<Clock size={14} strokeWidth={2} />} label="Limited Time: 2 Free Strategy Sessions" sx={sx.offerChip} />
          </Box>
        </motion.div>

        {/* CTA Buttons - Primary CTA is visually emphasized by its styling */}
        <motion.div {...ANIM.fadeIn(0.22)}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} justifyContent="center" sx={{ mb: 4 }}>
            <Button variant="contained" color="secondary" size="large" onClick={() => setIsCalendlyOpen(true)}
              endIcon={<Calendar size={16} strokeWidth={2} />} sx={sx.primaryButton}>Book Your Free Strategy Session</Button>
            <Button variant="outlined" size="large" href="/solutions" component="a" sx={sx.secondaryButton}
              endIcon={<ArrowRight size={16} strokeWidth={2} />}>View Case Studies</Button>
          </Stack>
        </motion.div>

        {/* Benefits cards */}
        <motion.div variants={ANIM.stagger.container} initial="initial" animate="animate">
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2.5}>
              {DATA.benefits.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={ANIM.stagger.item}>
                    <Paper elevation={0} sx={sx.benefitCard}>
                      <Box sx={{ ...sx.iconBox, background: item.gradient }}>{item.icon}</Box>
                      <Typography variant="h6" fontWeight={600} color="white" sx={{ mb: 1, fontSize: '1.05rem', letterSpacing: '-0.005em' }}>{item.text}</Typography>
                      <Typography variant="body2" color={alpha('#fff', 0.94)} sx={{ fontSize: '0.85rem', lineHeight: 1.5, letterSpacing: '0.005em' }}>{item.subtext}</Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div {...ANIM.fadeIn(0.15)}>
          <Paper elevation={0} sx={{...sx.benefitCard, maxWidth: '900px', mx: 'auto', mb: 4}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DollarSign size={18} color="#4285f4" strokeWidth={2} />
              <Typography color="#4285f4" fontWeight={600} sx={{ ml: 1.5, fontSize: '1.05rem', letterSpacing: '0.005em' }}>
                Enterprise Cost Savings Calculator
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography color="white" fontSize="0.825rem" mb={0.5}>Team Size: {teamSize} (${(teamSize * 10000).toLocaleString()}/mo)</Typography>
                <Slider value={teamSize} onChange={(e, v) => setTeamSize(v)} min={1} max={50} step={1} valueLabelDisplay="auto" size="small" sx={{ color: "#4285f4" }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="white" fontSize="0.825rem" mb={0.5}>Efficiency Gain: {roi}%</Typography>
                <Slider value={roi} onChange={(e, v) => setRoi(v)} min={10} max={60} step={1} valueLabelDisplay="auto" size="small" sx={{ color: "#4285f4" }} />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography color={alpha('#fff', 0.88)} fontSize="0.875rem" letterSpacing="0.005em">Annual savings with our solutions:</Typography>
              <Typography variant="h6" color="#4285f4" fontWeight={600} letterSpacing="0.01em">${annualSavings.toLocaleString()}</Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Trust indicators - More specific social proof */}
        <motion.div {...ANIM.fadeIn(0.28)}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={0} sx={sx.trustIndicator}>
              <Typography align="center" color="white" sx={{ fontWeight: 600, mb: 2, fontSize: '0.95rem', letterSpacing: '0.005em' }}>Trusted by industry leaders</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2.5, sm: 4 }} justifyContent="center" sx={{ mb: 1.5, px: 2 }}>
                {DATA.successIndicators.map((item, index) => <CheckItem key={index} text={item} />)}
              </Stack>
            </Paper>
          </Box>
        </motion.div>

        {/* Personalized Feature Highlights */}
        <Paper elevation={0} sx={{ ...sx.benefitCard, maxWidth: '720px', mx: 'auto', mb: 4, p: 3.5 }}>
          <AnimatePresence mode="wait">
            <motion.div key={selectedPersona + "features"} initial="initial" animate="animate" exit="exit" variants={ANIM.slideIn}>
              <Typography variant="h5" color="#4285f4" fontWeight={600} textAlign="center" mb={3} letterSpacing="0.005em" fontSize="1.15rem">
                {selectedPersona === 'developer' ? 'Developer-Focused Features' :
                 selectedPersona === 'executive' ? 'Business Value Accelerators' : 'Security & Compliance Features'}
              </Typography>
              <Grid container spacing={2}>
                {currentPersona.benefits.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}><CheckItem text={feature} /></Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Paper>

        {/* Tech stack */}
        <motion.div {...ANIM.fadeIn(0.32)}>
          <Typography variant="h6" color="#fff" textAlign="center" mb={3.5} sx={{ fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.01em' }}>
            Pre-built architectures for leading enterprise technologies
          </Typography>

          <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
            {DATA.techStack.map((tech, index) => (
              <Grid item key={index} xs={4} sm={2}>
                <Box sx={sx.techItem}>
                  <tech.icon color={tech.color} size={36} style={{ transition: 'all 0.35s cubic-bezier(0.165, 0.015, 0.12, 0.995)' }} />
                  <Typography color="#fff" fontWeight={600} sx={{ fontSize: '0.85rem', letterSpacing: '0.01em' }}>{tech.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Final CTA */}
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="secondary" size="large" onClick={() => setIsCalendlyOpen(true)}
              endIcon={<Calendar size={16} strokeWidth={2} />} sx={sx.primaryButton}>Schedule Your Strategy Session</Button>
          </Box>
        </motion.div>
      </Container>

      {/* AI Chatbot Button */}
      <Button variant="contained" sx={sx.chatBtn} onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
        <MessageCircle size={24} />
      </Button>

      {/* AI Chatbot Dialog */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.24, ease: "easeOut" }}>
            <Box sx={sx.chatbot}>
              <Typography color={theme.palette.primary.main} fontWeight={700} mb={2}>Enterprise AI Assistant</Typography>
              <Typography color="text.primary" fontSize="0.9rem" mb={2}>How can I help with your enterprise solution needs today?</Typography>
              <TextField fullWidth placeholder="Ask me anything..." variant="outlined" size="small" sx={{ mb: 2 }} />
              <Button fullWidth variant="contained" color="primary" size="small">Send</Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <CalendlyBooking isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)}
        eventTypeUrl="https://calendly.com/glustack/strategy-session" prefill={{ name: "", email: "" }} />
    </Box>
  );
};

export default React.memo(HeroSection);