'use client';
import React from 'react';
import { Container, styled, alpha, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';
import SEO from '../SEO';
import NextLink from 'next/link';
import { Send } from 'react-feather';

const GradientBackground = styled('div')(({ theme }) => ({
  background: `
    linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(
    theme.palette.secondary.dark, 0.85
  )} 100%)
  `,
  minHeight: '3vh', // Further reduced
  padding: theme.spacing(1, 0), // Minimal padding
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PanelWrapper = styled('div')(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows,
  padding: theme.spacing(0.5), // Minimal padding
  marginBottom: theme.spacing(1), // Reduced margin
  textAlign: 'center',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(0.5), // Minimal margin
  padding: theme.spacing(0.5, 2), // Minimal padding
  fontWeight: 700,
  fontSize: '1rem', // Further reduced font size
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.6)}`, // Reduced shadow
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)}, ${alpha(
      theme.palette.secondary.main,
      0.85
    )})`,
    transform: 'translateY(-1px)', // Minimal transform
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.8)}`, // Reduced shadow
  },
  height: '32px', // Set explicit height
  minHeight: 'unset', // Override Material-UI default
}));

const MotionCTAButton = motion(CTAButton);

export interface ConsistentPageLayoutProps {
  title?: string;
  subtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  children: React.ReactNode;
}

const ConsistentPageLayout: React.FC<ConsistentPageLayoutProps> = ({
  title = 'Accelerate Your Path to Market',
  subtitle = '',
  seoTitle = '',
  seoDescription = '',
  seoKeywords = '',
  children,
}) => {
  return (
    <>
      {seoTitle && (
        <SEO title={seoTitle} description={seoDescription} keywords={seoKeywords} />
      )}
      <GradientBackground>
        <Container maxWidth="xl">
          <PanelWrapper>
            <PageHeader
              title={title}
              subtitle={subtitle}
              sx={{
                '&.MuiTypography-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' }, // Further reduced font sizes
                  marginBottom: '0', // Removed margin
                  lineHeight: 1.2, // Reduced line height
                },
                padding: '2px', // Minimal padding
              }}
            />
            <NextLink href="/contact" passHref legacyBehavior>
              <MotionCTAButton
                animate={{ scale: [1, 1.02, 1] }} // Minimal scale animation
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Send style={{ marginRight: '0.25rem', width: 14, height: 14 }} /> {/* Smaller icon */}
                Launch Your Startup with Us
              </MotionCTAButton>
            </NextLink>
          </PanelWrapper>
          {children}
        </Container>
      </GradientBackground>
    </>
  );
};

export default ConsistentPageLayout;