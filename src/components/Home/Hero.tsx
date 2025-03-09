'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  alpha,
  Grid,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  SiAmazonaws,
  SiMicrosoftazure,
  SiDocker,
  SiKubernetes,
  SiTerraform,
} from 'react-icons/si';
import { BracketsIcon, ShieldCheck, Bolt, Cog, Clock, TrendingUp, DollarSign, Users, ArrowRight } from 'lucide-react';
// Import ArrowForwardIos from MUI icons
import { ArrowForwardIos } from '@mui/icons-material';

// Define interfaces
interface TechStackItem {
  icon: React.ComponentType<{ color: string; size: number; style?: React.CSSProperties }>;
  name: string;
  color: string;
}

interface BenefitItem {
  icon: React.ReactNode;
  text: string;
  subtext: string;
}

interface ClientLogoItem {
  name: string;
  logoUrl: string;
}

// Tech stack
const TECH_STACK: TechStackItem[] = [
  { icon: SiAmazonaws, name: 'AWS', color: '#FF9900' },
  { icon: SiMicrosoftazure, name: 'Azure', color: '#0078D4' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5' },
  { icon: SiTerraform, name: 'Terraform', color: '#7B42BC' },
];

// Benefits with expanded details
const BENEFITS: BenefitItem[] = [
  { 
    icon: <TrendingUp size={22} />, 
    text: '70% Faster Deployment', 
    subtext: 'Go to market in weeks, not months'
  },
  { 
    icon: <ShieldCheck size={22} />, 
    text: 'Enterprise-Grade Security', 
    subtext: 'GDPR & ISO 27001 compliant'
  },
  { 
    icon: <DollarSign size={22} />, 
    text: '40% Cost Reduction', 
    subtext: 'Optimized cloud infrastructure'
  },
  { 
    icon: <Users size={22} />, 
    text: '99.99% Reliability', 
    subtext: 'Built for scale & resilience'
  },
];

// Client logos
const CLIENT_LOGOS: ClientLogoItem[] = [
  { name: 'ASOS', logoUrl: '/images/asos-logo.svg' },
  { name: 'Tesco', logoUrl: '/images/tesco-logo.svg' },
  { name: 'Philip Morris', logoUrl: '/images/philip-morris-logo.svg' },
];

// Framer-motion variants
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
};

// Single Benefit item with improved design
const BenefitItem = ({ icon, text, subtext }: BenefitItem) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.03, y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
        borderRadius: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        border: `1px solid ${alpha('#fff', 0.25)}`,
        backdropFilter: 'blur(10px)',
        boxShadow: hovered
          ? `0 6px 18px rgba(0,0,0,0.4), 0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`
          : `0 3px 12px rgba(0,0,0,0.25)`,
        transition: 'all 0.4s ease',
        cursor: 'default',
        height: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, hovered ? 0.7 : 0.5),
          borderRadius: '50%',
          p: 1.2,
          color: theme.palette.common.white,
          boxShadow: hovered ? `0 0 16px ${alpha(theme.palette.primary.main, 0.5)}` : 'none',
          transition: 'all 0.3s ease',
          width: 'fit-content',
          mb: 1.5,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h6"
        fontWeight={700}
        color="white"
        sx={{
          textShadow: '0 2px 4px rgba(0,0,0,0.7)',
          mb: 0.5,
        }}
      >
        {text}
      </Typography>
      <Typography
        variant="body2"
        color={alpha('#fff', 0.85)}
        sx={{
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        }}
      >
        {subtext}
      </Typography>
    </Box>
  );
};

// Tech logo (AWS, Azure, etc.)
const TechLogo = ({
  Icon,
  name,
  color,
}: {
  Icon: React.ComponentType<{ color: string; size: number; style?: React.CSSProperties }>;
  name: string;
  color: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      component={motion.div}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        transition: 'all 0.3s ease',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <Icon
        color={color}
        size={34}
        style={{
          filter: hovered
            ? `drop-shadow(0 0 14px ${color}80) drop-shadow(0 4px 8px rgba(0,0,0,0.6))`
            : 'drop-shadow(0 4px 6px rgba(0,0,0,0.7))',
          transition: 'filter 0.3s ease',
        }}
      />
      <Typography
        variant="caption"
        color="#fff"
        fontWeight={700}
        sx={{
          textShadow: '0 2px 3px rgba(0,0,0,0.6)',
          fontSize: '0.85rem',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

// Client Logo Component
const ClientLogo = ({ name, logoUrl }: ClientLogoItem) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Avatar
        src={logoUrl}
        alt={`${name} logo`}
        variant="square"
        sx={{
          width: 'auto',
          height: 24,
          filter: 'brightness(0) invert(1)',
          opacity: 0.9,
        }}
      />
    </Box>
  );
};

export const HeroSection = () => {
  const theme = useTheme();
  const [learnMoreHovered, setLearnMoreHovered] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '650px', md: '92vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pt: { xs: 12, md: 14 },
        pb: { xs: 8, md: 10 },
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/istockphoto-realhero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to bottom,
            ${alpha(theme.palette.primary.dark, 0.9)} 0%,
            ${alpha(theme.palette.primary.dark, 0.7)} 50%,
            ${alpha(theme.palette.primary.dark, 0.9)} 100%
          )`,
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow/Chip with countdown */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
              <Chip
                icon={<Clock size={16} />}
                label="Limited Time: 2 Free Strategy Sessions"
                sx={{
                  backgroundColor: alpha(theme.palette.error.main, 0.3),
                  color: '#fff',
                  fontWeight: 'bold',
                  border: `1px solid ${alpha(theme.palette.error.main, 0.6)}`,
                  px: 1.5,
                  py: 2.5,
                  textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                  '& .MuiChip-icon': {
                    color: theme.palette.error.light
                  }
                }}
              />
            </Stack>
          </motion.div>

          {/* Client logos */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box sx={{ mb: 4, opacity: 0.9 }}>
              <Typography
                variant="subtitle2"
                color={alpha('#fff', 0.8)}
                textTransform="uppercase"
                letterSpacing={1}
                fontSize="0.75rem"
                mb={1.5}
              >
                Trusted by industry leaders
              </Typography>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="center"
                alignItems="center"
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  backgroundColor: alpha('#000', 0.2),
                  backdropFilter: 'blur(5px)',
                  display: 'inline-flex',
                }}
              >
                {CLIENT_LOGOS.map((client, index) => (
                  <ClientLogo key={index} name={client.name} logoUrl={client.logoUrl} />
                ))}
              </Stack>
            </Box>
          </motion.div>

          {/* Main headline */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography
              variant="h1"
              component="h1"
              color="white"
              sx={{
                fontSize: { xs: '2.6rem', sm: '3.5rem', md: '4.5rem' },
                lineHeight: 1.15,
                fontWeight: 800,
                mb: 3,
                maxWidth: '950px',
                mx: 'auto',
                textShadow: '0 4px 15px rgba(0, 0, 0, 0.85), 0 8px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              Launch Your Enterprise Solution{' '}
              <Box
                component="span"
                sx={{
                  color: theme.palette.secondary.light,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: '100%',
                    height: '6px',
                    backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                    borderRadius: '3px',
                  },
                }}
              >
                10x Faster
              </Box>{' '}
              With Zero Risk
            </Typography>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography
              variant="h2"
              component="h2"
              color="#f0f0f0"
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.6rem' },
                fontWeight: 500,
                lineHeight: 1.5,
                mb: 5,
                maxWidth: '780px',
                mx: 'auto',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              Skip the painful learning curve with production-ready architectures built by
              the same senior engineers who've delivered mission-critical systems for ASOS,
              Tesco, and Philip Morris.
            </Typography>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Grid container spacing={3} sx={{ mb: 5 }}>
              {BENEFITS.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <BenefitItem icon={item.icon} text={item.text} subtext={item.subtext} />
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3 }}
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.6,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: `0 6px 20px ${alpha(
                    theme.palette.secondary.main,
                    0.8
                  )}, 0 2px 8px rgba(0, 0, 0, 0.4)`,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 25px ${alpha(
                      theme.palette.secondary.main,
                      0.9
                    )}, 0 4px 10px rgba(0, 0, 0, 0.5)`,
                  },
                  transition:
                    'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                Book Your Free Strategy Session
              </Button>
              <Button
                variant="outlined"
                size="large"
                onMouseEnter={() => setLearnMoreHovered(true)}
                onMouseLeave={() => setLearnMoreHovered(false)}
                sx={{
                  px: 4,
                  py: 1.6,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: 'none',
                  borderWidth: 2,
                  borderColor: alpha(theme.palette.common.white, 0.8),
                  color: theme.palette.common.white,
                  backgroundColor: alpha(theme.palette.common.black, 0.2),
                  '&:hover': {
                    borderColor: theme.palette.common.white,
                    backgroundColor: alpha(theme.palette.common.white, 0.1),
                    transform: 'translateY(-3px)',
                  },
                  transition:
                    'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
              >
                View Case Studies
                <Box
                  component={motion.div}
                  animate={{ x: learnMoreHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                  sx={{ 
                    display: 'inline-flex',
                    ml: 1 
                  }}
                >
                  {/* Use ArrowRight from Lucide instead of ArrowForwardIos */}
                  <ArrowRight size={16} />
                </Box>
              </Button>
            </Stack>
          </motion.div>

          {/* Tech Stack logos */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                border: `1px solid ${alpha('#fff', 0.25)}`,
                backdropFilter: 'blur(12px)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Typography
                variant="subtitle1"
                color="#fff"
                textAlign="center"
                mb={2.5}
                sx={{
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  letterSpacing: '0.5px',
                }}
              >
                Pre-built architectures for leading enterprise technologies:
              </Typography>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                {TECH_STACK.map((tech, index) => (
                  <Grid item key={index} xs={4} sm={2.4}>
                    <TechLogo Icon={tech.icon} name={tech.name} color={tech.color} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;