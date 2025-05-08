import React from 'react';
import { Container, styled, alpha, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';
import SEO from '../SEO';
import NextLink from 'next/link';
import { Send } from 'react-feather';
import UltimateScrollNavigation from './UltimateScrollNavigation';

const GradientBackground = styled('div')(({ theme }) => ({
  background: `
    linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(
    theme.palette.secondary.dark,
    0.85
  )} 100%)
  `,
  minHeight: '3vh',
  padding: theme.spacing(1, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PanelWrapper = styled('div')(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  padding: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  textAlign: 'center',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(0.5, 2),
  fontWeight: 700,
  fontSize: '1rem',
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.6)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)}, ${alpha(
      theme.palette.secondary.main,
      0.85
    )})`,
    transform: 'translateY(-1px)',
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.8)}`,
  },
  height: '32px',
  minHeight: 'unset',
}));

const MotionCTAButton = motion(CTAButton);

export interface ConsistentPageLayoutProps {
  title?: string;
  subtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  children: React.ReactNode;
  scrollOptions?: {
    headings?: string[];
    showSectionMenu?: boolean;
    showProgressIndicator?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
    hideDelay?: number;
    showLabels?: boolean;
    enableSmartPositioning?: boolean;
  };
}

const ConsistentPageLayout: React.FC<ConsistentPageLayoutProps> = ({
  title = 'Accelerate Your Path to Market',
  subtitle = '',
  seoTitle = '',
  seoDescription = '',
  seoKeywords = '',
  children,
  scrollOptions = {},
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
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  marginBottom: '0',
                  lineHeight: 1.2,
                },
                padding: '2px',
              }}
            />
            <NextLink href="/contact" passHref>
              <MotionCTAButton
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-label="Launch Your Startup with Us" // Accessibility improvement
              >
                <Send style={{ marginRight: '0.25rem', width: 14, height: 14 }} />
                Launch Your Startup with Us
              </MotionCTAButton>
            </NextLink>
          </PanelWrapper>
          {children}
        </Container>
      </GradientBackground>
      
      {/* Integrated Scroll Panel */}
      <UltimateScrollNavigation 
        showProgressIndicator={true}
        showSectionMenu={true}
        showLabels={true}
        enableSmartPositioning={true}
        hideDelay={2500}
        {...scrollOptions} // Allow page-specific overrides
      />
    </>
  );
};

export default ConsistentPageLayout;
