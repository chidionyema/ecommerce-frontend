import React, { useState, useEffect } from 'react';
import { Shield, Mail, ChevronUp } from 'lucide-react';
import { Container, Box, Typography, Button, Grid, Link, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const PrivacyPolicy = () => {
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    // Only run browser-specific code on the client side
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Document manipulations
      document.title = "Privacy Policy - Gluestack";
      const metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      metaDescription.content = "Read our comprehensive Privacy Policy to understand how Gluestack collects, uses, and protects your information.";
      document.head.appendChild(metaDescription);

      // Event listeners
      const handleScroll = () => setShowScrollTop(window.scrollY > 400);
      window.addEventListener('scroll', handleScroll);
      
      // Cleanup function
      return () => {
        if (document.head.contains(metaDescription)) {
          document.head.removeChild(metaDescription);
        }
        window.removeEventListener('scroll', handleScroll);
      };
    }
    
    // Default return for server-side
    return () => {};
  }, []);

  // Safe scrollToTop function with client-side check
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Safe scrollToElement function with client-side check
   // Safe scrollToElement function with client-side check
   const scrollToElement = (elementId: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (typeof document !== 'undefined' && elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      content: "We collect various types of information to provide and improve our services:",
      list: [
        {
          title: "Personal Information",
          content: "Name, email address, contact details, and payment information"
        },
        {
          title: "Usage Data",
          content: "IP address, browser type, pages visited, and service usage patterns"
        }
      ]
    },
    {
      id: "data-usage",
      title: "2. Use of Your Information",
      content: "Your information helps us to:",
      list: [
        "Provide and maintain our services",
        "Improve user experience",
        "Develop new features",
        "Ensure service security"
      ]
    },
    {
      id: "data-protection",
      title: "3. Data Protection",
      content: "We implement industry-standard security measures including encryption and regular security audits."
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

      {/* Privacy Header Banner */}
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
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield size={28} />
              </motion.div>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Your privacy matters. Review our updated policy.
              </Typography>
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Main Content Container */}
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
              Privacy Policy
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
              Quick Links
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
                      {typeof item === 'string' ? (
                        <Typography variant="body1" color="text.secondary">
                          {item}
                        </Typography>
                      ) : (
                        <>
                          <Typography component="strong" sx={{ fontWeight: 600 }}>
                            {item.title}:
                          </Typography>{' '}
                          <Typography variant="body1" color="text.secondary" component="span">
                            {item.content}
                          </Typography>
                        </>
                      )}
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
              Contact Our Privacy Team
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
                  href="mailto:privacy@gluestack.com"
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  privacy@gluestack.com
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

export default PrivacyPolicy;