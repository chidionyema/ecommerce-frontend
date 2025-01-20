import React, { useState, useEffect } from 'react';
import { AlertTriangle, Mail, ChevronUp } from 'lucide-react';
import { Container, Box, Typography, Button, Grid, Link } from '@mui/material';

const TermsOfService = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Update document title
    document.title = "Terms of Service - Your Company Name";

    // Update meta tags
    const metaTags = [
      { name: "description", content: "Our comprehensive Terms of Service outline the rules and guidelines for using our professional technical services. Last updated 2025-01-19." },
      { name: "keywords", content: "terms of service, legal agreement, service terms, business terms, technical services" },
      { name: "author", content: "Your Company Name" },
      { property: "og:title", content: "Terms of Service - Your Company Name" },
      { property: "og:description", content: "Our comprehensive Terms of Service outline the rules and guidelines for using our professional technical services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yourwebsite.com/terms-of-service" }
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
    canonical.href = 'https://yourwebsite.com/terms-of-service';
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
      id: "services",
      title: "1. Description of Services",
      content: `We provide comprehensive technical solutions including web development, IT consulting, and software 
      development services. Our offerings are carefully designed and continuously refined to meet the evolving needs 
      of businesses and individuals seeking professional technical expertise. All services are delivered according 
      to industry best practices and standards.`
    },
    {
      id: "responsibilities",
      title: "2. Client Responsibilities",
      content: `As a valued client, you acknowledge and agree to:`,
      list: [
        "Provide accurate, complete, and timely information necessary for project requirements and specifications",
        "Maintain strict confidentiality of your account credentials and access information",
        "Use our services exclusively for lawful purposes in compliance with all applicable local and international laws",
        "Regularly review and respond to project communications and updates",
        "Protect and maintain the security of any systems or data under your control"
      ]
    },
    {
      id: "payment",
      title: "3. Payment Terms",
      content: `Payment for services is due within 30 days of invoice issuance. A late payment fee of 5% per month 
      will be applied to overdue balances. We reserve the right to suspend service delivery for accounts with 
      outstanding payments. All fees are exclusive of applicable taxes and duties, which will be charged separately 
      where appropriate.`
    },
    {
      id: "ip",
      title: "4. Intellectual Property",
      content: `All intellectual property rights, including but not limited to copyrights, patents, trademarks, and 
      trade secrets in the services, designs, and deliverables provided by us remain the exclusive property of Your 
      Company Name unless explicitly transferred through written agreement. Clients retain full ownership of their 
      proprietary data, materials, and intellectual property provided to us during the course of service delivery.`
    },
    {
      id: "liability",
      title: "5. Disclaimers & Limitations of Liability",
      content: `Our services are provided on an "as-is" and "as-available" basis without warranties of any kind, 
      whether express or implied. We expressly disclaim all warranties of merchantability, fitness for a particular 
      purpose, and non-infringement. Under no circumstances shall we be liable for any indirect, incidental, special, 
      consequential, or punitive damages arising from the use of our services.`
    },
    {
      id: "disputes",
      title: "6. Dispute Resolution",
      content: `Any disputes arising from or relating to these terms or our services shall be resolved through 
      binding arbitration in accordance with the rules of the American Arbitration Association. Both parties 
      explicitly waive their right to a trial by jury and agree to participate in the arbitration process in good 
      faith. The arbitration shall be conducted in English and the decision shall be final and binding.`
    },
    {
      id: "changes",
      title: "7. Changes to Terms",
      content: `We maintain the right to modify these Terms of Service at our discretion. Any changes will be 
      posted on this page with an updated effective date. Your continued use of our services following such 
      modifications constitutes acceptance of the updated terms. We encourage you to review these terms periodically 
      to stay informed of any changes.`
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Header Banner */}
      <Box sx={{ backgroundColor: 'grey.900', color: 'white', py: 2, textAlign: 'center' }}>
        <AlertTriangle sx={{ verticalAlign: 'middle', mr: 1 }} />
        <Typography variant="body2" component="span">
          Please review our updated Terms of Service carefully
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Terms of Service
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
                    <Typography variant="body1" color="text.secondary">
                      {item}
                    </Typography>
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
              href="mailto:legal@yourcompany.com"
              sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { color: 'primary.dark' } }}
            >
              legal@yourcompany.com
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

export default TermsOfService;