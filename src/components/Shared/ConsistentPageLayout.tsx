'use client';
import React from 'react';
import { Container, styled, alpha, Button } from '@mui/material';
import PageHeader from './PageHeader';
import SEO from '../SEO';
import NextLink from 'next/link';

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
  background: theme.palette.primary.light, // Premium light background
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4], // Strong shadow for depth
  padding: theme.spacing(3),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.04)',
  },
}));

// Ultra-magnetic CTA button styling
const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  fontWeight: 700,
  fontSize: '1.25rem',
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)}, ${alpha(
      theme.palette.secondary.main,
      0.85
    )})`,
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.5)}`,
  },
}));

export interface ConsistentPageLayoutProps {
  title?: string;
  subtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  children: React.ReactNode;
}

const ConsistentPageLayout: React.FC<ConsistentPageLayoutProps> = ({
  title = 'Unlock Your Business Potential',
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
        <Container maxWidth="lg">
          <PanelWrapper>
            <PageHeader title={title} subtitle={subtitle} />
            {/* Wrap CTA button in NextLink for proper routing */}
            <NextLink href="/contact" passHref legacyBehavior>
              <CTAButton>
                Get Started Now
              </CTAButton>
            </NextLink>
          </PanelWrapper>
          {children}
        </Container>
      </GradientBackground>
    </>
  );
};

export default ConsistentPageLayout;
