'use client';

import React from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Container,
  styled,
  alpha,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Send } from 'react-feather';

import PageHeader from './PageHeader';
import UltimateScrollNavigation from './UltimateScrollNavigation';
import SEO from '../SEO'; // ↔ still works for per-page extras

/* ─────────────────────────────────────────
   1.  Styled UI primitives  (unchanged)
────────────────────────────────────────── */
const GradientBackground = styled('div')(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(
    theme.palette.primary.dark,
    0.95,
  )} 0%, ${alpha(theme.palette.secondary.dark, 0.85)} 100%)`,
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
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0.85,
    )}, ${alpha(theme.palette.secondary.main, 0.85)})`,
    transform: 'translateY(-1px)',
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.8)}`,
  },
  height: 32,
  minHeight: 'unset',
}));
const MotionCTAButton = motion(CTAButton);

/* ─────────────────────────────────────────
   2.  SEO helpers
────────────────────────────────────────── */
const DEFAULT_KEYWORDS =
  'DevOps, Cloud Engineering, AWS, Azure, Google Cloud, Docker, Kubernetes, Terraform, C#, .NET, Python, Node.js, Next.js, React, Front-end Development, Back-end Development, Microservices, CI/CD, Infrastructure as Code';

interface ConsistentPageLayoutProps {
  title?: string;
  subtitle?: string;
  /** <title> */
  seoTitle?: string;
  /** meta description */
  seoDescription?: string;
  /** comma-separated keywords */
  seoKeywords?: string;
  children: React.ReactNode;
  scrollOptions?: React.ComponentProps<typeof UltimateScrollNavigation>;
}

const ConsistentPageLayout: React.FC<ConsistentPageLayoutProps> = ({
  title = 'Accelerate Your Path to Market',
  subtitle = '',
  seoTitle,
  seoDescription = 'Enterprise-grade DevOps, cloud and full-stack engineering across AWS, Azure, GCP, .NET, Python, Node.js, Docker & Kubernetes.',
  seoKeywords = DEFAULT_KEYWORDS,
  children,
  scrollOptions,
}) => {
  /* canonical URL helper */
  const canonical =
    typeof window === 'undefined'
      ? 'https://example.com'
      : `https://example.com${window.location.pathname}`;

  const fullTitle =
    seoTitle ||
    'DevOps, Cloud & Full-Stack Experts – AWS · Azure · .NET · Python · Kubernetes';

  const ogImage = 'https://example.com/images/og-default.jpg';

  /* breadcrumb JSON-LD */
  const breadcrumbJSON = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com' },
      { '@type': 'ListItem', position: 2, name: title, item: canonical },
    ],
  });

  return (
    <>
      {/* base SEO tags */}
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />

        {/* canonical */}
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured data – WebPage + Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: fullTitle,
            description: seoDescription,
            url: canonical,
          })}
        </script>
        <script type="application/ld+json">{breadcrumbJSON}</script>
      </Head>

      {/* keep your existing SEO override component if supplied */}
      {seoTitle && (
        <SEO
          title={seoTitle}
          description={seoDescription}
          keywords={seoKeywords}
        />
      )}

      {/* -------------- UI layout -------------- */}
      <GradientBackground>
        <Container maxWidth="xl">
          <PanelWrapper>
            <PageHeader
              title={title}
              subtitle={subtitle}
              sx={{
                '&.MuiTypography-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  marginBottom: 0,
                  marginTop: 2,
                  lineHeight: 1.2,
                },
                p: 1,
              }}
            />

            <NextLink href="/contact" passHref legacyBehavior>
              <MotionCTAButton
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                aria-label="Launch your startup with us"
              >
                <Send size={14} style={{ marginRight: 4 }} />
                Launch Your Startup with Us
              </MotionCTAButton>
            </NextLink>
          </PanelWrapper>

          {children}
        </Container>
      </GradientBackground>

      <UltimateScrollNavigation
        showProgressIndicator
        showSectionMenu
        showLabels
        enableSmartPositioning
        hideDelay={2500}
        {...scrollOptions}
      />
    </>
  );
};

export default ConsistentPageLayout;
