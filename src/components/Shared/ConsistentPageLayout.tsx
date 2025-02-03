'use client';

import React from 'react';
import { Container, styled, alpha, Button } from '@mui/material';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';
import SEO from '../SEO';
import NextLink from 'next/link';
import { Send } from 'react-feather';

const GradientBackground = styled('div')(({ theme }) => ({
  background: `
    linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(
      theme.palette.secondary.dark,
      0.85
    )} 100%)
  `,
  minHeight: '100vh',
  padding: theme.spacing(8, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const PanelWrapper = styled('div')(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontWeight: 700,
  fontSize: '1.5rem',
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.6)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)}, ${alpha(
      theme.palette.secondary.main,
      0.85
    )})`,
    transform: 'translateY(-3px)',
    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.8)}`,
  },
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
            <PageHeader title={title} subtitle={subtitle} />
            <NextLink href="/contact" passHref legacyBehavior>
              <MotionCTAButton
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Send style={{ marginRight: '0.5rem' }} />
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