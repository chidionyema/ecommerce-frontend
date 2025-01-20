import React, { useState, useEffect } from 'react';
import { AlertTriangle, Mail, ChevronUp, Shield } from 'lucide-react';
import { Container, Box, Typography, Button, Grid, Link } from '@mui/material';

const PrivacyPolicy = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Update document title
    document.title = "Privacy Policy - Your Company Name";

    // Update meta tags
    const metaTags = [
      { name: "description", content: "Read our Privacy Policy to understand how we collect, use, and protect your personal information. Effective as of 2025-01-19." },
      { name: "keywords", content: "privacy policy, data protection, cookies, personal information" },
      { name: "author", content: "Your Company Name" },
      { property: "og:title", content: "Privacy Policy - Your Company Name" },
      { property: "og:description", content: "Read our Privacy Policy to understand how we collect, use, and protect your personal information." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yourwebsite.com/privacy-policy" }
    ];

    metaTags.forEach(tag => {
      let meta = document.createElement('meta');
      Object.keys(tag).forEach(key => {
        meta.setAttribute(key, tag[key]);
      });
      document.head.appendChild(meta);
    });

    // Add canonical link
    let canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://yourwebsite.com/privacy-policy';
    document.head.appendChild(canonical);

    // Scroll handler
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const lastUpdated = "2025-01-19";

  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      content: "We collect the following types of information to provide and improve our services:",
      list: [
        {
          title: "Personal Information",
          content: "Names, email addresses, phone numbers, billing information, and other contact details provided by you"
        },
        {
          title: "Technical Data",
          content: "IP addresses, browser types, device information, and operating system details"
        },
        {
          title: "Usage Information",
          content: "Pages visited, features used, interaction patterns, and other analytics data"
        },
        {
          title: "Communication Data",
          content: "Your preferences, feedback, survey responses, and correspondence with us"
        }
      ]
    },
    {
      id: "information-use",
      title: "2. How We Use Your Information",
      content: "We use your information for the following purposes:",
      list: [
        "To provide and maintain our services effectively",
        "To communicate important updates and service-related notices",
        "To respond to your inquiries and support requests",
        "To detect and prevent fraudulent or unauthorized system access",
        "To analyze usage patterns and improve our service quality",
        "To comply with legal obligations and enforce our terms"
      ]
    },
    {
      id: "data-protection",
      title: "3. Data Storage & Protection",
      content: `We implement robust security measures to protect your personal information. This includes:
      encryption of data in transit and at rest, regular security assessments, access controls, and 
      secure data centers. We maintain strict internal protocols and train our staff in data protection 
      practices. Your data is stored in secure facilities with redundant backup systems.`
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing",
      content: `We maintain strict controls over your personal information and share it only under specific 
      circumstances: with your explicit consent, with service providers bound by confidentiality agreements, 
      or when required by law. We regularly review our data sharing practices and require our partners to 
      maintain appropriate security standards.`
    },
    {
      id: "cookies",
      title: "5. Cookie Policy",
      content: `We use cookies and similar tracking technologies to enhance your browsing experience and 
      analyze website usage. These include: essential cookies for basic functionality, analytical cookies 
      to understand usage patterns, and preference cookies to remember your settings. You can manage cookie 
      preferences through your browser settings.`
    },
    {
      id: "your-rights",
      title: "6. Your Rights",
      content: `You have significant rights regarding your personal information:`,
      list: [
        "Right to access your personal data",
        "Right to correct inaccurate information",
        "Right to request deletion of your data",
        "Right to restrict or object to processing",
        "Right to data portability",
        "Right to withdraw consent at any time"
      ]
    },
    {
      id: "policy-changes",
      title: "7. Changes to This Policy",
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal 
      requirements. We will notify you of any material changes through our website or email. Continued use 
      of our services after such modifications constitutes acceptance of the updated policy.`
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Header Banner */}
      <Box sx={{ backgroundColor: 'grey.900', color: 'white', py: 2, textAlign: 'center' }}>
        <Shield sx={{ verticalAlign: 'middle', mr: 1 }} />
        <Typography variant="body2" component="span">
          Your privacy is our priority. Please review our updated Privacy Policy
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last Updated: {lastUpdated}
          </Typography>
        </Box>

        {/* Quick Navigation */}
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 1, p: 4, mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
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
                  sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { color: 'primary.dark' } }}
                >
                  {section.title}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sections */}
        {sections.map((section) => (
          <Box
            key={section.id}
            id={section.id}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 1,
              p: 4,
              mb: 4,
              transition: 'box-shadow 0.3s',
              '&:hover': { boxShadow: 3 },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
              {section.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {section.content}
            </Typography>
            {section.list && (
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                {section.list.map((item, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    {typeof item === 'string' ? (
                      <Typography variant="body1" color="text.secondary">
                        {item}
                      </Typography>
                    ) : (
                      <>
                        <Typography variant="body1" component="strong" sx={{ fontWeight: 'bold' }}>
                          {item.title}:
                        </Typography>{' '}
                        <Typography variant="body1" color="text.secondary" component="span">
                          {item.content}
                        </Typography>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        ))}

        {/* Contact Section */}
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 1, p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Contact Us
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Mail sx={{ color: 'primary.main' }} />
            <Link
              href="mailto:privacy@yourcompany.com"
              sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { color: 'primary.dark' } }}
            >
              privacy@yourcompany.com
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
            bottom: 16,
            right: 16,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '50%',
            minWidth: '48px',
            minHeight: '48px',
            boxShadow: 3,
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp />
        </Button>
      )}
    </Box>
  );
};

export default PrivacyPolicy;