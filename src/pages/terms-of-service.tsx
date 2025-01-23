import React, { useState, useEffect } from 'react';
import { AlertTriangle, Mail, ChevronUp } from 'lucide-react';
import { Container, Box, Typography, Button, Grid, Link, useTheme } from '@mui/material';

const TermsOfService = () => {
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    document.title = "Terms of Service - Gluestack";
    const metaTags = [
      { name: "description", content: "Our comprehensive Terms of Service outline the rules and guidelines for using our professional technical services." },
      { property: "og:title", content: "Terms of Service - Gluestack" },
      { property: "og:description", content: "Review our terms of service for using Gluestack's technical solutions." }
    ];

    const createdMetaTags: HTMLElement[] = [];
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => meta.setAttribute(key, value));
      document.head.appendChild(meta);
      createdMetaTags.push(meta);
    });

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.href;
    document.head.appendChild(canonical);

    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    return () => {
      createdMetaTags.forEach(meta => document.head.removeChild(meta));
      document.head.removeChild(canonical);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: "Welcome to Gluestack Technical Consultancy Limited ('Company', 'we', 'our'). These Terms of Service govern your access to and use of our professional services, including technical consulting, system integration, and cloud solutions.",
      list: [
        "By engaging our services, you agree to be bound by these Terms",
        "These Terms comply with UK Consumer Rights Act 2015",
        "We reserve the right to modify these Terms with 30 days' notice"
      ]
    },
    {
      id: "services",
      title: "2. Professional Services",
      content: "Our consultancy services include but are not limited to:",
      list: [
        "Technical architecture design and implementation",
        "Cloud infrastructure optimization (AWS/Azure/GCP)",
        "Legacy system modernization",
        "DevOps pipeline configuration",
        "Compliance auditing (GDPR, ISO 27001)"
      ]
    },
    {
      id: "obligations",
      title: "3. Client Obligations",
      content: "As our client, you agree to:",
      list: [
        "Provide accurate technical specifications and requirements",
        "Grant necessary system access with appropriate privileges",
        "Maintain adequate cyber insurance coverage",
        "Notify us of any compliance requirements (e.g., UK DPA 2018)",
        "Appoint a technical liaison for project coordination"
      ]
    },
    {
      id: "ip",
      title: "4. Intellectual Property",
      content: "Ownership of developed assets:",
      list: [
        "Pre-existing IP remains property of original owner",
        "Custom-developed solutions are licensed (not sold)",
        "Documentation and reports remain our property",
        "Open-source components under respective licenses"
      ]
    },
    {
      id: "liability",
      title: "5. Liability & Warranty",
      content: "Our professional services include:",
      list: [
        "Services provided with reasonable skill and care (UK Supply of Goods and Services Act 1982)",
        "Maximum liability limited to 125% of fees paid",
        "Exclusion of indirect/consequential damages",
        "30-day defect rectification period"
      ]
    },
    {
      id: "confidentiality",
      title: "6. Confidentiality",
      content: "Both parties agree to:",
      list: [
        "Maintain confidentiality of sensitive information",
        "NDA terms survive termination for 5 years",
        "Exclusions for publicly available information",
        "Comply with UK Official Secrets Act 1989 where applicable"
      ]
    },
    {
      id: "termination",
      title: "7. Termination",
      content: "Either party may terminate engagements:",
      list: [
        "30 days written notice for convenience",
        "Immediate termination for material breach",
        "Post-termination transition assistance",
        "Survival of key clauses (confidentiality, liability)"
      ]
    },
    {
      id: "disputes",
      title: "8. Dispute Resolution",
      content: "In case of disagreements:",
      list: [
        "Mediation through CEDR (Centre for Effective Dispute Resolution)",
        "Litigation in English courts (England & Wales jurisdiction)",
        "Time bar of 12 months from cause of action",
        "Costs follow event principle applies"
      ]
    }
  ];

  return (
    <Box sx={{ 
      backgroundColor: 'background.default', 
      minHeight: '100vh',
      pt: 4
    }}>
      {/* Header Banner */}
      <Box sx={{ 
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        py: 2,
        boxShadow: theme.shadows[4],
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ mr: 1.5 }}>
              <AlertTriangle size={24} />
            </Box>
            <Typography variant="body1">
              Please review our updated Terms of Service carefully
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" sx={{
            fontWeight: 700,
            color: 'primary.main',
            fontSize: { xs: '2rem', md: '2.75rem' },
            mb: 2
          }}>
            Terms of Service
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Effective Date: {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        {/* Quick Navigation */}
        <Box sx={{
          backgroundColor: 'background.paper',
          borderRadius: 4,
          boxShadow: theme.shadows[2],
          p: 4,
          mb: 6
        }}>
          <Typography variant="h2" sx={{
            fontWeight: 600,
            color: 'primary.main',
            mb: 3,
            fontSize: '1.5rem'
          }}>
            Quick Navigation
          </Typography>
          <Grid container spacing={2}>
            {sections.map((section) => (
              <Grid item xs={12} sm={6} key={section.id}>
                <Link
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: 'secondary.main',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {section.title}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Policy Sections */}
        {sections.map((section) => (
          <Box
            key={section.id}
            id={section.id}
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 4,
              boxShadow: theme.shadows[1],
              p: 4,
              mb: 4,
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: theme.shadows[4],
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Typography variant="h3" sx={{
              fontWeight: 600,
              color: 'primary.main',
              mb: 3,
              fontSize: '1.5rem'
            }}>
              {section.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {section.content}
            </Typography>
            {section.list && (
              <Box component="ul" sx={{
                pl: 3,
                mb: 2,
                '& li': {
                  mb: 2,
                  pl: 1,
                  lineHeight: 1.6
                }
              }}>
                {section.list.map((item, index) => (
                  <Box component="li" key={index}>
                    <Typography variant="body1" color="text.secondary">
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}

        {/* Contact Section */}
        <Box sx={{
          backgroundColor: 'background.paper',
          borderRadius: 4,
          boxShadow: theme.shadows[2],
          p: 4,
          mt: 4
        }}>
          <Typography variant="h3" sx={{
            fontWeight: 600,
            color: 'primary.main',
            mb: 3,
            fontSize: '1.5rem'
          }}>
            Contact Our Legal Team
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            '&:hover': {
              transform: 'translateX(5px)',
              transition: 'transform 0.3s'
            }
          }}>
            <Box sx={{ color: 'primary.main' }}>
              <Mail size={24} />
            </Box>
            <Link
              href="mailto:legal@gluestack.com"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  color: 'secondary.main',
                  textDecoration: 'underline'
                }
              }}
            >
              legal@gluestack.com
            </Link>
          </Box>
        </Box>
      </Container>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
            minWidth: 48,
            minHeight: 48,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            boxShadow: theme.shadows[6],
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: 'secondary.main',
              transform: 'scale(1.1)'
            }
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </Button>
      )}
    </Box>
  );
};

export default TermsOfService;