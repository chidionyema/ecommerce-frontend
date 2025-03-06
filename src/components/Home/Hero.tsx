'use client';

import React, { useState, useEffect } from 'react';
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
  Theme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform } from 'react-icons/si';
import { BracketsIcon, ShieldCheck, Bolt, Cog } from 'lucide-react';
import { SPACING } from '../../utils/sharedStyles';

// Define interfaces for data structures
interface TechStackItem {
  icon: React.ComponentType<{ color: string; size: number; style?: React.CSSProperties }>;
  name: string;
  color: string;
}

interface BenefitItem {
  icon: React.ReactNode;
  text: string;
}

// Constants moved to their own dedicated file (import in real implementation)
// This improves maintainability and separation of concerns
const TECH_STACK: TechStackItem[] = [
  { icon: SiAmazonaws, name: 'AWS', color: '#FF9900' },
  { icon: SiMicrosoftazure, name: 'Azure', color: '#0078D4' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5' },
  { icon: SiTerraform, name: 'Terraform', color: '#7B42BC' },
];

const BENEFITS: BenefitItem[] = [
  { icon: <BracketsIcon size={22} />, text: 'Production-Grade Code & Documentation' },
  { icon: <ShieldCheck size={22} />, text: 'Security Best Practices & Compliance' },
  { icon: <Bolt size={22} />, text: 'Optimized Performance' },
  { icon: <Cog size={22} />, text: 'CI/CD & DevOps Integration' },
];

// Animation variants extracted for better organization
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }
};

// Define interfaces for component props
interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
}

// Separate component for better organization
const BenefitItem = ({ icon, text }: BenefitItemProps) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.6), // Increased opacity for better visibility
        p: 2,
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
        height: '100%',
        backdropFilter: 'blur(8px)', // Increased blur for better text contrast
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Added shadow for depth and visibility
      }}
    >
      <Box
        sx={{
          backgroundColor: alpha(theme.palette.secondary.main, 0.4), // Increased opacity
          borderRadius: '50%',
          p: 1,
          display: 'flex',
          color: theme.palette.secondary.light, // Lighter color for better visibility
        }}
      >
        {icon}
      </Box>
      <Typography 
        variant="body1" 
        fontWeight={700} // Increased from 600 to 700 for better visibility
        color="white"
        sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }} // Enhanced text shadow
      >
        {text}
      </Typography>
    </Box>
  );
};

interface TechLogoProps {
  Icon: React.ComponentType<{ color: string; size: number; style?: React.CSSProperties }>;
  name: string;
  color: string;
}

// Separate component for better organization
const TechLogo = ({ Icon, name, color }: TechLogoProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
    }}
  >
    <Icon
      color={color}
      size={30}
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.7))' }} // Enhanced shadow
    />
    <Typography 
      variant="caption" 
      color="white" 
      fontWeight={700} // Increased from 600 to 700
      sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }} // Enhanced text shadow
    >
      {name}
    </Typography>
  </Box>
);

// Styles extracted to their own objects for better organization and reuse
const getStyles = (theme: Theme) => ({
  heroContainer: {
    position: 'relative',
    minHeight: { xs: '600px', md: '700px' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingBottom: SPACING.large * 2,
  },
  backgroundImage: (imageLoaded: boolean, imageUrl: string) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: imageLoaded ? `url(${imageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
    opacity: imageLoaded ? 1 : 0, // Full visibility
    transition: 'opacity 0.5s ease',
    willChange: 'opacity',
    filter: 'blur(1px)', // Kept the subtle blur
  }),
  gradientOverlay: (imageLoaded: boolean, theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: imageLoaded
      ? `linear-gradient(
          to bottom,
          ${alpha(theme.palette.primary.dark, 0.4)} 0%, 
          ${alpha(theme.palette.primary.dark, 0.3)} 50%,
          ${alpha(theme.palette.primary.dark, 0.5)} 100%
        )` // Adjusted opacity values for better readability
      : 'transparent',
    zIndex: 1,
    transition: 'opacity 0.3s ease',
  }),
  contentContainer: {
    position: 'relative',
    zIndex: 2,
    py: { xs: 6, md: 8 },
    px: { xs: 2, sm: 4 },
    textAlign: 'center',
  },
  eyebrowChip: {
    backgroundColor: alpha(theme.palette.secondary.main, 0.5), // Increased opacity
    color: 'white',
    fontWeight: 'bold',
    mb: 3,
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.8)}`, // Increased border opacity
    px: 2,
    py: 1,
    '& .MuiChip-label': {
      px: 1,
      fontSize: '0.9rem',
    },
    textShadow: '0 2px 3px rgba(0,0,0,0.7)', // Enhanced text shadow
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', // Added shadow for visibility
  },
  headline: {
    fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4rem' },
    lineHeight: 1.2,
    fontWeight: 800,
    mb: 3,
    textShadow: '0 3px 15px rgba(0, 0, 0, 0.9), 0 5px 12px rgba(0, 0, 0, 0.5)', // Enhanced text shadow
    maxWidth: '900px',
    mx: 'auto',
    letterSpacing: '-0.01em',
  },
  subheadline: {
    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
    fontWeight: 600, // Increased from 500 to 600
    lineHeight: 1.5,
    mb: 5,
    opacity: 1,
    maxWidth: '800px',
    mx: 'auto',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)', // Enhanced text shadow
  },
  primaryButton: {
    px: 4,
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 700, // Increased from 600 to 700
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.8)}, 0 2px 6px rgba(0, 0, 0, 0.3)`, // Enhanced shadow
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.9)}, 0 3px 8px rgba(0, 0, 0, 0.4)`,
    },
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    px: 4,
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 700, // Increased from 600 to 700
    borderRadius: 2,
    textTransform: 'none',
    borderWidth: 2,
    borderColor: alpha(theme.palette.common.white, 0.7), // Increased from 0.5 to 0.7
    color: theme.palette.common.white,
    backgroundColor: alpha(theme.palette.common.black, 0.2), // Added slight background tint
    '&:hover': {
      borderColor: theme.palette.common.white,
      backgroundColor: alpha(theme.palette.common.white, 0.3), // Increased from 0.2 to 0.3
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)', // Enhanced shadow
  },
  techSection: {
    p: { xs: 2, sm: 3 },
    borderRadius: 2,
    backgroundColor: alpha(theme.palette.background.paper, 0.5), // Increased from 0.25 to 0.5
    border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`, // Increased from 0.2 to 0.3
    backdropFilter: 'blur(8px)', // Increased blur
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Added shadow for visibility
  }
});

export const HeroSection = () => {
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-realhero.jpg';
  const styles = getStyles(theme);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);

  return (
    <Box component="section" sx={styles.heroContainer}>
      {/* Background image with loading transition */}
      <Box sx={styles.backgroundImage(imageLoaded, imageUrl)} />

      {/* Gradient overlay */}
      <Box sx={styles.gradientOverlay(imageLoaded, theme)} />

      <Container maxWidth="lg" sx={styles.contentContainer}>
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow text */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Chip label="For Startups & Tech Teams" sx={styles.eyebrowChip} />
          </motion.div>

          {/* Main headline */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography variant="h1" component="h1" color="white" sx={styles.headline}>
              Skip Trial &amp; Error with{' '}
              <Box component="span" sx={{ 
                color: theme.palette.secondary.light,
                textShadow: '0 3px 10px rgba(0, 0, 0, 0.8)', // Enhanced shadow for highlight text
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  width: '100%',
                  height: '4px',
                  backgroundColor: alpha(theme.palette.secondary.main, 0.7), // Added underline highlight
                  borderRadius: '2px',
                }
              }}>
                Production-Ready
              </Box>{' '}
              Technology
            </Typography>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography variant="h2" component="h2" color="white" sx={styles.subheadline}>
              Access expert-built technology solutions and consultancy from engineers
              with proven enterprise experience at ASOS, Tesco, and Philip Morris.
            </Typography>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Grid container spacing={2} sx={{ mb: 5 }}>
              {BENEFITS.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <BenefitItem icon={item.icon} text={item.text} />
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={styles.primaryButton}
              >
                Start Free Consultation
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={styles.secondaryButton}
              >
                Explore Solutions
              </Button>
            </Stack>
          </motion.div>

          {/* Tech Logos */}
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box sx={styles.techSection}>
              <Typography
                variant="subtitle2"
                color="white"
                textAlign="center"
                mb={2}
                sx={{ 
                  opacity: 1, // Increased from 0.9 to 1
                  fontWeight: 600, // Increased from 500 to 600
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)' // Enhanced text shadow
                }}
              >
                Expertise with leading technologies:
              </Typography>
              <Grid container spacing={3} justifyContent="center" alignItems="center">
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