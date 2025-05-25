/* src/app/page.tsx */
import { Container } from '@mui/material';
import type { Metadata } from 'next';
import LandingSections from '@/components/Home/LandingSections.client';
import Script from 'next/script';

export const metadata: Metadata = {
  /* ─────────────────────────────────────────────────────────────
     Primary tags
  ───────────────────────────────────────────────────────────── */
  title:
    'DevOps, Cloud & Full-Stack Engineering | AWS · Azure · .NET · Python · Kubernetes',
  description:
    'Enterprise-grade DevOps automation, cloud-native engineering and full-stack development across AWS, Azure & GCP. Experts in C#, .NET, Python, Node.js, Next.js, React, Docker & Kubernetes.',
  keywords: [
    'DevOps automation',
    'Cloud engineering',
    'AWS consulting',
    'Azure migration',
    'GCP solutions',
    'Docker',
    'Kubernetes',
    'C#',
    '.NET',
    'Python development',
    'Node.js',
    'Next.js',
    'React',
    'Microservices',
    'CI/CD',
    'Infrastructure as Code',
    'Terraform',
    'Serverless',
    'Frontend development',
    'Backend development',
  ],

  /* ─────────────────────────────────────────────────────────────
     Open Graph
  ───────────────────────────────────────────────────────────── */
  openGraph: {
    title:
      'DevOps, Cloud & Full-Stack Engineering | AWS · Azure · .NET · Python · Kubernetes',
    description:
      'From Kubernetes clusters to Next.js front-ends, we design, build and operate resilient systems on AWS, Azure and GCP.',
    url: 'https://glustack.com',
    type: 'website',
    images: [
      {
        url: 'https://glustack.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Enterprise DevOps & Cloud Engineering',
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     Twitter Card
  ───────────────────────────────────────────────────────────── */
  twitter: {
    card: 'summary_large_image',
    title:
      'DevOps, Cloud & Full-Stack Engineering | AWS · Azure · .NET · Python · Kubernetes',
    description:
      'Cloud-native, security-first solutions with C#, Python, Node.js & more.',
    site: '@yourhandle',
    creator: '@yourhandle',
    images: ['https://glustack.com/images/og-default.jpg'],
  },

  alternates: {
    canonical: 'https://glustack.com/',
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD ⇒ helps Google understand brand & tech stack */}
      <Script
        id="org-ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Example Enterprise Tech Solutions',
            url: 'https://glustack.com',
            logo: 'https://glustack.com/images/logo.svg',
            sameAs: [
              'https://www.linkedin.com/company/example',
              'https://twitter.com/yourhandle',
            ],
          }),
        }}
      />
      <Script
        id="website-ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://glustack.com',
            name: 'Example Enterprise Tech Solutions',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://glustack.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 4 },
          py: 0,
          mt: 4,
          pt: 4,
        }}
      >
        <LandingSections />
      </Container>
    </>
  );
}
