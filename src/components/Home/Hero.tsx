'use client';

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import {
  Box, Typography, Button, Container, useTheme, alpha, Grid, Chip, Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiGooglecloud
} from 'react-icons/si';
import { 
  ShieldCheck, Clock, TrendingUp, DollarSign, Users, ArrowRight, 
  CheckCircle, Calendar, Building, BuildingIcon, Award, Server
} from 'lucide-react';

// Simplified interfaces
interface TechStackItem {
  icon: React.ComponentType<any>;
  name: string;
  color: string;
}

// Define interfaces for component props
interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
  subtext: string;
}

interface IndustryIconProps {
  icon: React.ReactNode;
  industry: string;
}

interface TechLogoProps {
  Icon: React.ComponentType<any>;
  name: string;
  color: string;
}

// Constants - Streamlined
const TECH_STACK: TechStackItem[] = [
  { icon: SiAmazonaws, name: 'AWS', color: '#FF9900' },
  { icon: SiMicrosoftazure, name: 'Azure', color: '#0078D4' },
  { icon: SiGooglecloud, name: 'GCP', color: '#4285F4' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiKubernetes, name: 'K8s', color: '#326CE5' },
  { icon: SiTerraform, name: 'Terraform', color: '#7B42BC' },
];

const BENEFITS = [
  { icon: <TrendingUp size={22} />, text: '73% Faster Deployment', subtext: 'From concept to production in weeks' },
  { icon: <ShieldCheck size={22} />, text: 'Enterprise Security', subtext: 'SOC 2, GDPR & ISO 27001 compliant' },
  { icon: <DollarSign size={22} />, text: '47% Cost Reduction', subtext: 'Optimized infrastructure & reduced overhead' },
  { icon: <Users size={22} />, text: '99.99% Uptime SLA', subtext: 'Built for enterprise-grade reliability' },
];

// Client industry icons instead of logos
const INDUSTRY_ICONS = [
  { icon: <Building size={24} />, industry: 'Retail' },
  { icon: <Server size={24} />, industry: 'Technology' },
  { icon: <BuildingIcon size={24} />, industry: 'Finance' },
  { icon: <Award size={24} />, industry: 'Manufacturing' },
];

// Animation variants - Consolidated and simplified
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
};

// Simplified and memoized countdown component
const CountdownTimer = memo(() => {
  const [time, setTime] = useState({ d: 2, h: 14, m: 35, s: 42 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { d, h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; d -= 1; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Typography variant="caption" fontWeight="bold" color="#fff" sx={{ ml: 1 }}>
      {time.d}d:{time.h}h:{time.m}m:{time.s}s
    </Typography>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

// Memoized BenefitItem component
const BenefitItem = memo(({ icon, text, subtext }: BenefitItemProps) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  
  const cardStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    p: 3,
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
    border: `1px solid ${alpha('#fff', hovered ? 0.4 : 0.25)}`,
    boxShadow: hovered
      ? `0 8px 24px rgba(0,0,0,0.4), 0 2px 8px ${alpha(theme.palette.primary.main, 0.5)}`
      : `0 4px 14px rgba(0,0,0,0.3)`,
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 2,
    backdropFilter: 'blur(12px)',
    transition: 'all 0.3s ease',
  }), [theme, hovered]);

  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.03, y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      sx={cardStyle}
    >
      <Box
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            opacity: hovered ? 1 : 0.7,
          },
        }}
      />
      <Box
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, hovered ? 0.8 : 0.6),
          borderRadius: '50%',
          p: 1.4,
          color: '#fff',
          boxShadow: hovered ? `0 0 20px ${alpha(theme.palette.primary.main, 0.6)}` : `0 0 12px ${alpha(theme.palette.primary.main, 0.4)}`,
          width: 'fit-content',
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={700} color="white" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)', mb: 0.75, fontSize: '1.2rem' }}>
        {text}
      </Typography>
      <Typography variant="body2" color={alpha('#fff', 0.9)} sx={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)', fontSize: '0.95rem' }}>
        {subtext}
      </Typography>
      <Box 
        sx={{ 
          mt: 'auto', pt: 1.5, display: 'flex', alignItems: 'center',
          color: theme.palette.secondary.light, fontWeight: 600, fontSize: '0.85rem',
          opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(5px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <Typography variant="caption" sx={{ mr: 0.5, fontWeight: 'bold' }}>Learn More</Typography>
        <ArrowRight size={14} />
      </Box>
    </Box>
  );
});

BenefitItem.displayName = 'BenefitItem';

// Memoized IndustryIcon component
const IndustryIcon = memo(({ icon, industry }: IndustryIconProps) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
        color: hovered ? '#fff' : alpha('#fff', 0.85),
        filter: hovered ? 'drop-shadow(0 0 5px rgba(255,255,255,0.7))' : 'none',
        cursor: 'pointer',
        transition: 'color 0.3s ease, filter 0.3s ease',
      }}
    >
      <Box sx={{ 
        p: 1.5, borderRadius: '50%', 
        backgroundColor: alpha('#fff', 0.15),
        border: `1px solid ${alpha('#fff', 0.25)}`,
      }}>
        {icon}
      </Box>
      <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>{industry}</Typography>
    </Box>
  );
});

IndustryIcon.displayName = 'IndustryIcon';

// Memoized TechLogo component
const TechLogo = memo(({ Icon, name, color }: TechLogoProps) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Box
      component={motion.div}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, cursor: 'pointer' }}
    >
      <Box sx={{ 
        position: 'relative',
        '&::after': {
          content: '""', position: 'absolute', width: '100%', height: '100%',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          borderRadius: '50%', background: color, opacity: 0.15,
          filter: 'blur(15px)', zIndex: -1, scale: hovered ? 1.4 : 0.7,
          transition: 'scale 0.3s ease',
        }
      }}>
        <Icon
          color={color} size={38}
          style={{ 
            filter: hovered ? `drop-shadow(0 0 14px ${color}95)` : 'drop-shadow(0 4px 6px rgba(0,0,0,0.7))',
            transition: 'filter 0.3s ease',
          }}
        />
      </Box>
      <Typography variant="caption" color="#fff" fontWeight={700} sx={{ textShadow: '0 2px 3px rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>
        {name}
      </Typography>
    </Box>
  );
});

TechLogo.displayName = 'TechLogo';

// Main HeroSection component with optimizations
export const HeroSection = () => {
  const theme = useTheme();
  const [learnMoreHovered, setLearnMoreHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  // Event handlers with useCallback
  const handleCtaMouseEnter = useCallback(() => setCtaHovered(true), []);
  const handleCtaMouseLeave = useCallback(() => setCtaHovered(false), []);
  const handleLearnMoreMouseEnter = useCallback(() => setLearnMoreHovered(true), []);
  const handleLearnMoreMouseLeave = useCallback(() => setLearnMoreHovered(false), []);

  // Memoized styles
  const hoverEffect = useMemo(() => ({
    transform: 'translateY(-4px)',
    boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.7)}, 0 4px 10px rgba(0, 0, 0, 0.4)`,
  }), [theme]);
  
  // Memoized benefits grid
  const benefitsGrid = useMemo(() => (
    <Grid container spacing={3.5} sx={{ mb: 5.5 }}>
      {BENEFITS.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <BenefitItem icon={item.icon} text={item.text} subtext={item.subtext} />
        </Grid>
      ))}
    </Grid>
  ), []);
  
  // Memoized tech stack grid
  const techStackGrid = useMemo(() => (
    <Grid container spacing={3.5} justifyContent="center" alignItems="center">
      {TECH_STACK.map((tech, index) => (
        <Grid item key={index} xs={4} sm={2}>
          <TechLogo Icon={tech.icon} name={tech.name} color={tech.color} />
        </Grid>
      ))}
    </Grid>
  ), []);

  // Memoized industry icons
  const industryIcons = useMemo(() => (
    <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
      {INDUSTRY_ICONS.map((item, index) => (
        <IndustryIcon key={index} icon={item.icon} industry={item.industry} />
      ))}
    </Stack>
  ), []);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '650px', md: '94vh' },
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 12, md: 14 },
        pb: { xs: 8, md: 10 },
        overflow: 'hidden',
      }}
    >
      {/* Background - simplified animation */}
      <Box
        component={motion.div}
        animate={{ 
          scale: [1, 1.03, 1],
          filter: ['brightness(0.9)', 'brightness(1)', 'brightness(0.9)']
        }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/istockphoto-realhero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          willChange: 'transform', // Optimize for GPU acceleration
        }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.dark, 0.92)} 0%,
            ${alpha(theme.palette.primary.dark, 0.75)} 50%,
            ${alpha(theme.palette.primary.dark, 0.92)} 100%)`
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div variants={ANIMATIONS.container} initial="hidden" animate="visible">
          {/* Countdown chip */}
          <motion.div variants={ANIMATIONS.item}>
            <Chip
              icon={<Clock size={16} />}
              label={
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="body2" fontWeight="bold">Limited Time: 2 Free Strategy Sessions</Typography>
                  <CountdownTimer />
                </Stack>
              }
              sx={{
                mb: 3, px: 1.5, py: 3,
                backgroundColor: alpha(theme.palette.error.main, 0.3),
                color: '#fff', fontWeight: 'bold',
                border: `1px solid ${alpha(theme.palette.error.main, 0.6)}`,
                textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.35)',
                '& .MuiChip-icon': { color: theme.palette.error.light }
              }}
            />
          </motion.div>

          {/* Industry icons instead of client logos */}
          <motion.div variants={ANIMATIONS.item}>
            <Box sx={{ mb: 4.5 }}>
              <Typography variant="subtitle2" sx={{
                color: alpha('#fff', 0.85), textTransform: 'uppercase',
                letterSpacing: 1.2, fontSize: '0.75rem', fontWeight: 600, mb: 1.5
              }}>
                Trusted across industries
              </Typography>
              <Box sx={{
                py: 2, px: 3, borderRadius: 2, display: 'inline-block',
                backgroundColor: alpha('#000', 0.25), backdropFilter: 'blur(8px)',
                border: `1px solid ${alpha('#fff', 0.15)}`,
              }}>
                {industryIcons}
              </Box>
            </Box>
          </motion.div>

          {/* Main headline - more professional and slightly reduced */}
          <motion.div custom={1} variants={ANIMATIONS.item}>
            <Typography variant="h1" component="h1" color="white" sx={{
              fontSize: { xs: '2.5rem', sm: '3.3rem', md: '4.2rem' },
              lineHeight: 1.2, fontWeight: 800, mb: 3, mx: 'auto', maxWidth: '900px',
              textShadow: '0 3px 12px rgba(0, 0, 0, 0.7), 0 6px 20px rgba(0, 0, 0, 0.4)',
            }}>
              Enterprise Solutions{' '}
              <Box component="span" sx={{
                background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text', WebkitBackgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent',
                position: 'relative', display: 'inline-block', textShadow: 'none',
                filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.6))',
                '&::after': {
                  content: '""', position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '5px',
                  background: `linear-gradient(to right, ${alpha(theme.palette.secondary.main, 0.3)}, ${alpha(theme.palette.secondary.main, 0.8)}, ${alpha(theme.palette.secondary.main, 0.3)})`,
                  borderRadius: '3px',
                },
              }}>
                Delivered 10x Faster
              </Box>
            </Typography>
          </motion.div>

          {/* Improved subheadline - more concise and professional */}
          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="h2" component="h2" color="#f8f8f8" sx={{
              fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.5rem' },
              fontWeight: 500, lineHeight: 1.5, mb: 5, mx: 'auto', maxWidth: '780px',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
              '& strong': { fontWeight: 700, color: alpha(theme.palette.secondary.light, 0.9) }
            }}>
              Accelerate your time-to-market with <strong>enterprise-grade solutions</strong> architected by 
              the same senior engineers behind mission-critical systems for <strong>industry leaders</strong>.
            </Typography>
          </motion.div>

          {/* Benefits grid */}
          <motion.div variants={ANIMATIONS.scale} custom={2}>
            {benefitsGrid}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={ANIMATIONS.item}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2.5, sm: 3 }}
              justifyContent="center"
              sx={{ mb: 6.5 }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onMouseEnter={handleCtaMouseEnter}
                onMouseLeave={handleCtaMouseLeave}
                endIcon={
                  <Box sx={{ 
                    backgroundColor: alpha('#fff', 0.2), borderRadius: '50%',
                    width: 24, height: 24, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', ml: 0.5
                  }}>
                    <Calendar size={14} />
                  </Box>
                }
                sx={{
                  px: 4, py: 1.8, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, textTransform: 'none',
                  boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.8)}, 0 2px 8px rgba(0, 0, 0, 0.4)`,
                  '&:hover': hoverEffect,
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative', overflow: 'hidden',
                  '&::after': {
                    content: '""', position: 'absolute', inset: 0,
                    background: 'linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0))',
                    transform: ctaHovered ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.6s ease',
                  }
                }}
              >
                Book Your Free Strategy Session
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                onMouseEnter={handleLearnMoreMouseEnter}
                onMouseLeave={handleLearnMoreMouseLeave}
                sx={{
                  px: 4, py: 1.8, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, textTransform: 'none',
                  borderWidth: 2, borderColor: alpha(theme.palette.common.white, 0.85),
                  color: theme.palette.common.white, backgroundColor: alpha(theme.palette.common.black, 0.2),
                  '&:hover': { borderColor: '#fff', backgroundColor: alpha('#fff', 0.12), transform: 'translateY(-4px)' },
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
              >
                View Case Studies
                <Box
                  component={motion.div}
                  animate={{ x: learnMoreHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                  sx={{ display: 'inline-flex', ml: 1 }}
                >
                  <ArrowRight size={16} />
                </Box>
              </Button>
            </Stack>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={ANIMATIONS.item} custom={3}>
            <Box sx={{
              p: { xs: 3, sm: 3.5 }, borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha('#fff', 0.3)}`, backdropFilter: 'blur(15px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
            }}>
              <Typography variant="subtitle1" color="#fff" textAlign="center" mb={3} sx={{
                fontWeight: 600, fontSize: '1.15rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)', letterSpacing: '0.5px',
              }}>
                Pre-built architectures for leading enterprise technologies:
              </Typography>
              
              {techStackGrid}
              
              {/* Success indicators */}
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha('#fff', 0.15)}` }}>
                <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                  {['Production-ready in 14 days', 'Dedicated support team', '30-day money-back guarantee'].map((item, index) => (
                    <Chip
                      key={index}
                      icon={<CheckCircle size={14} />}
                      label={item}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.success.main, 0.2),
                        color: theme.palette.common.white,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                        m: 0.5,
                        '& .MuiChip-icon': { color: theme.palette.success.light }
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

// Use React.memo for the entire component
export default memo(HeroSection);