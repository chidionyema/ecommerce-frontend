import React, { useState, useEffect } from 'react';
import { Shield, Mail, ChevronUp } from 'lucide-react';
import { Container, Box, Typography, Button, Grid, Link, useTheme } from '@mui/material';

const PrivacyPolicy = () => {
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Meta tags management
    document.title = "Privacy Policy - Gluestack";
    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Read our comprehensive Privacy Policy to understand how Gluestack collects, uses, and protects your information.";
    document.head.appendChild(metaDescription);

    // Scroll handler
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.head.removeChild(metaDescription);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
      pt: 4
    }}>
      {/* Privacy Header Banner */}
      <Box sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        py: 2,
        boxShadow: theme.shadows[4],
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={24} sx={{ mr: 1.5 }} />
            <Typography variant="body1">
              Your privacy matters. Review our updated policy.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content Container */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" sx={{
            fontWeight: 700,
            color: 'primary.main',
            fontSize: { xs: '2rem', md: '2.75rem' },
            mb: 2
          }}>
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Effective Date: {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        {/* Quick Navigation */}
        <Box sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
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
            Quick Links
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
              borderRadius: 2,
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
        ))}

        {/* Contact Section */}
        <Box sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
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
            Contact Our Privacy Team
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
            <Mail size={24} sx={{ color: 'primary.main' }} />
            <Link
              href="mailto:privacy@gluestack.com"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  color: 'secondary.main',
                  textDecoration: 'underline'
                }
              }}
            >
              privacy@gluestack.com
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

export default PrivacyPolicy;