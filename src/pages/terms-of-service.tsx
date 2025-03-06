import React, { useState, useEffect } from 'react';
import { AlertTriangle, Mail, ChevronUp } from 'lucide-react';
import { Container, Box, Typography, Button, Grid, Link, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const TermsOfService = () => {
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Safe scrollToElement function with client-side check
  const scrollToElement = (elementId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof document !== 'undefined' && elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // Only execute browser-specific code on the client side
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.title = "Terms of Service - Gluestack";
      const metaTags = [
        { name: "description", content: "Our comprehensive Terms of Service outline the rules and guidelines for using our professional technical services." },
        { property: "og:title", content: "Terms of Service - Gluestack" },
        { property: "og:description", content: "Review our terms of service for using Gluestack's technical solutions." }
      ];

      const createdMetaTags: HTMLMetaElement[] = [];
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
        // Safe cleanup - check if elements exist before removing
        createdMetaTags.forEach(meta => {
          if (document.head.contains(meta)) {
            document.head.removeChild(meta);
          }
        });
        
        if (document.head.contains(canonical)) {
          document.head.removeChild(canonical);
        }
        
        window.removeEventListener('scroll', handleScroll);
      };
    }
    
    // Default return for server-side
    return () => {};
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
      pt: 4,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `linear-gradient(45deg, 
            ${theme.palette.primary.main} 0%, 
            ${theme.palette.secondary.main} 30%,
            ${theme.palette.primary.main} 70%)`,
          y,
          opacity: 0.05,
          zIndex: 0,
          rotate: 15
        }}
      />

      {/* Header Banner */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring' }}
      >
        <Box sx={{ 
          background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'primary.contrastText',
          py: 2,
          boxShadow: theme.shadows[6],
          position: 'relative',
          zIndex: 1
        }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 2
            }}>
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle size={28} />
              </motion.div>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Please review our updated Terms of Service carefully
              </Typography>
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h1" sx={{
              fontWeight: 800,
              background: `-webkit-linear-gradient(-45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2
            }}>
              Terms of Service
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Effective Date: {typeof Date !== 'undefined' ? new Date().toLocaleDateString() : ''}
            </Typography>
          </Box>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Box sx={{
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
            borderRadius: 4,
            boxShadow: theme.shadows[4],
            p: 4,
            mb: 6,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}`
          }}>
            <Typography variant="h2" sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 3,
              fontSize: '1.75rem'
            }}>
              Quick Navigation
            </Typography>
            <Grid container spacing={2}>
              {sections.map((section) => (
                <Grid item xs={12} sm={6} key={section.id}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      href={section.id ? `#${section.id}` : '#'}
                      onClick={scrollToElement(section.id)}
                      sx={{
                        display: 'block',
                        p: 2,
                        borderRadius: 2,
                        background: theme.palette.action.selected,
                        color: 'text.primary',
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                        '&:hover': {
                          background: theme.palette.action.hover,
                          boxShadow: theme.shadows[2]
                        }
                      }}
                    >
                      {section.title}
                    </Link>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Policy Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Box
              id={section.id}
              sx={{
                background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
                borderRadius: 4,
                boxShadow: theme.shadows[2],
                p: 4,
                mb: 4,
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  boxShadow: theme.shadows[6],
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Typography variant="h3" sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 3,
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <Box sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: theme.palette.primary.main
                }} />
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
                    lineHeight: 1.6,
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      left: -8,
                      top: '0.75em',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: theme.palette.primary.main
                    }
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
          </motion.div>
        ))}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Box sx={{
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
            borderRadius: 4,
            boxShadow: theme.shadows[4],
            p: 4,
            mt: 4,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.divider}`
          }}>
            <Typography variant="h3" sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 3,
              fontSize: '1.5rem'
            }}>
              Contact Our Legal Team
            </Typography>
            <motion.div whileHover={{ x: 5 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                background: theme.palette.action.selected,
                width: 'fit-content',
                transition: 'all 0.3s',
                '&:hover': {
                  background: theme.palette.action.hover
                }
              }}>
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Mail size={24} />
                </motion.div>
                <Link
                  href="mailto:legal@gluestack.com"
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  legal@gluestack.com
                </Link>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <Button
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: theme.spacing(3),
              right: theme.spacing(3),
              minWidth: 56,
              minHeight: 56,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'primary.contrastText',
              boxShadow: theme.shadows[6],
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: theme.shadows[8]
              }
            }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={28} />
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

export default TermsOfService;