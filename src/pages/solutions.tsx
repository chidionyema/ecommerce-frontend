import React, { useState, useEffect } from 'react';
import { useTheme, Typography, Box, Container, useMediaQuery, Button, Fade, Grid, alpha } from '@mui/material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard, { ProjectGrid } from '../components/Solutions/ProjectCard';
import { cvProjects } from '../data/cvProjects';
import PageSection from '../components/PageSection';
import { SPACING, getSharedStyles } from '../utils/sharedStyles';
// Import the additional components
import ServicesGrid from '../components/Common/ServicesGrid';
import TestimonialsSection from '../components/Common/TestimonialsSection';
import WhyChooseUs from '../components/Common/WhyChooseUs';
// Additional imports for enhanced features
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';

const Solutions = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // Animation states
  const [activeFilter, setActiveFilter] = useState('all');
  const [animate, setAnimate] = useState(false);
  
  // Category filters for projects
  const categories = ['all', 'cloud', 'devops', 'fintech', 'ecommerce', 'media'];
  
  // Filtered projects
  const filteredProjects = activeFilter === 'all' 
    ? cvProjects.filter(project => project && typeof project.id === 'string' && project.id.trim() !== '')
    : cvProjects.filter(project => 
        project && 
        typeof project.id === 'string' && 
        project.id.trim() !== '' && 
        project.tags && 
        project.tags.includes(activeFilter)
      );
      
  // Animate content on mount
  useEffect(() => {
    setAnimate(true);
  }, []);
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setAnimate(false);
    setTimeout(() => {
      setActiveFilter(filter);
      setAnimate(true);
    }, 300);
  };
  
  // Benefits data
  const benefits = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      title: "Enhanced Scalability",
      description: "Grow your business without technology constraints"
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48 }} />,
      title: "Improved Security",
      description: "Enterprise-grade protection for your critical assets"
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48 }} />,
      title: "Accelerated Innovation",
      description: "Bring new features to market faster than competitors"
    },
    {
      icon: <BusinessCenterIcon sx={{ fontSize: 48 }} />,
      title: "Increased Efficiency",
      description: "Streamline workflows and automate repetitive tasks"
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 48 }} />,
      title: "Cost Optimization",
      description: "Maximize ROI on your technology investments"
    }
  ];
  
  return (
    <ConsistentPageLayout
      seoTitle="Premium Enterprise Solutions | GLUStack"
      seoDescription="Transform your business with our custom-engineered technology solutions designed for enterprise-level challenges and growth."
      seoKeywords="enterprise solutions, cloud architecture, DevOps, technical resources, custom technology"
      title="Transformative Solutions"
      subtitle="Engineered excellence that powers business growth"
    >
      {/* Hero Banner Enhancement */}
      <Box
        sx={{
          position: 'relative',
          height: isMobile ? '50vh' : '70vh',
          width: '100%',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: SPACING.xlarge,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(/images/solutions-hero-bg.jpg) center center no-repeat',
            backgroundSize: 'cover',
            opacity: 0.2,
            zIndex: 1,
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in={animate} timeout={1000}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 700,
                  color: 'white',
                  mb: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                Enterprise-Grade Solutions
              </Typography>
              
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 300,
                  color: 'white',
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  opacity: 0.9,
                }}
              >
                Custom-engineered technology that solves your unique business challenges
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '30px',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 600,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Explore Our Capabilities
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* What are GLUStack's Solutions Section */}
      <PageSection>
        <Container maxWidth="md">
          <Fade in={animate} timeout={1500}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                align="center"
                sx={{
                  ...styles.pageTitle,
                  color: theme.palette.text.primary,
                  mb: SPACING.medium,
                  fontWeight: 700,
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '60px',
                    height: '4px',
                    bottom: '-15px',
                    left: 'calc(50% - 30px)',
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '2px',
                  }
                }}
              >
                What Sets Our Solutions Apart
              </Typography>
              
              <Box
                sx={{
                  mt: 5,
                  mb: SPACING.large,
                  p: { xs: 3, md: 4 },
                  borderRadius: '16px',
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(145deg, #1a237e11, #3949ab22)'
                    : 'linear-gradient(145deg, #e3f2fd, #bbdefb)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 8px 32px rgba(33, 150, 243, 0.1)',
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.05)'
                    : '1px solid rgba(25, 118, 210, 0.05)',
                }}
              >
                <Typography
                  variant="body1"
                  align="center"
                  sx={{
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    color: theme.palette.text.primary,
                  }}
                >
                  At GLUStack, our 'Solutions' transcend traditional off-the-shelf products. We meticulously craft bespoke technology ecosystems perfectly aligned with your unique business challenges and opportunities. Through our consultative approach, we gain a profound understanding of your needs to engineer solutions that deliver measurable impact and drive sustainable growth across your entire organization.
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Container>
      </PageSection>

      {/* Our Featured Solutions Section - Enhanced */}
      <PageSection
        sx={{
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(to bottom, #121212, #1a1a1a)' 
            : 'linear-gradient(to bottom, #f5f7fa, #f8f9fa)',
          py: 8,
          borderRadius: { md: '20px' },
          mx: { md: 4 },
          boxShadow: theme.palette.mode === 'dark'
            ? 'none'
            : '0 10px 40px rgba(0, 0, 0, 0.04)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              mb: 1,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '4px',
                bottom: '-15px',
                left: 'calc(50% - 30px)',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '2px',
              }
            }}
          >
            Showcase Solutions
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            align="center" 
            color="text.secondary"
            sx={{ 
              mt: 3, 
              mb: 5,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Explore our portfolio of success stories and see how we've helped organizations like yours achieve their goals
          </Typography>
          
          {/* Project Filters */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1.5,
              mb: 5,
            }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleFilterChange(category)}
                variant={activeFilter === category ? "contained" : "outlined"}
                size="medium"
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: '30px',
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  backgroundColor: activeFilter === category 
                    ? theme.palette.primary.main 
                    : 'transparent',
                  color: activeFilter === category 
                    ? theme.palette.primary.contrastText 
                    : theme.palette.text.primary,
                  borderColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: activeFilter === category 
                      ? theme.palette.primary.dark 
                      : alpha(theme.palette.primary.main, 0.1),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {category === 'all' ? 'All Solutions' : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </Box>
          
          {/* Project Cards with Animation */}
          <Fade in={animate} timeout={500}>
            <Box>
              <ProjectGrid 
                projects={filteredProjects}
                spacing={3}
                // Additional props for enhanced styling could be passed here
              />
            </Box>
          </Fade>
          
          {/* Call to Action */}
          <Box
            sx={{
              textAlign: 'center',
              mt: 6,
            }}
          >
            <Button
              variant="outlined"
              size="large"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '30px',
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              View All Case Studies
            </Button>
          </Box>
        </Container>
      </PageSection>

      {/* Industries We Serve Section - Enhanced */}
      <PageSection>
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              textAlign: 'center',
              mb: 6,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              align="center"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                mb: 1,
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '60px',
                  height: '4px',
                  bottom: '-15px',
                  left: 'calc(50% - 30px)',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '2px',
                }
              }}
            >
              Industries We Empower
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              align="center" 
              color="text.secondary"
              sx={{ 
                mt: 3, 
                mb: 2,
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              Our tailored solutions address unique challenges across various sectors
            </Typography>
          </Box>
          
          <Grid container spacing={3} justifyContent="center">
            {[
              {
                title: "Technology",
                icon: "/images/icons/tech-icon.svg",
                description: "Building and scaling cloud platforms, microservices, and DevOps"
              },
              {
                title: "Financial Services",
                icon: "/images/icons/finance-icon.svg",
                description: "Secure banking platforms and fintech solutions"
              },
              {
                title: "E-commerce",
                icon: "/images/icons/ecommerce-icon.svg",
                description: "Optimizing digital platforms and user experiences"
              },
              {
                title: "Media",
                icon: "/images/icons/media-icon.svg",
                description: "Streamlining workflows and automating content delivery"
              },
              {
                title: "Public Sector",
                icon: "/images/icons/government-icon.svg",
                description: "Digital transformation and cloud migration"
              }
            ].map((industry, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in={animate} timeout={700 + (index * 300)}>
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: '16px',
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? alpha(theme.palette.primary.main, 0.05)
                        : alpha(theme.palette.primary.main, 0.03),
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 10px 30px rgba(0, 0, 0, 0.2)'
                          : '0 10px 30px rgba(33, 150, 243, 0.1)',
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? alpha(theme.palette.primary.main, 0.1)
                          : alpha(theme.palette.primary.main, 0.05),
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        mb: 3,
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? alpha(theme.palette.primary.main, 0.1)
                          : alpha(theme.palette.primary.main, 0.08),
                      }}
                    >
                      <img 
                        src={industry.icon} 
                        alt={industry.title} 
                        style={{ width: 40, height: 40 }}
                      />
                    </Box>
                    
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {industry.title}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      color="text.secondary"
                    >
                      {industry.description}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* Benefits Section - Enhanced */}
      <PageSection
        sx={{
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)' 
            : 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)',
          py: 8,
          borderRadius: { md: '20px' },
          mx: { md: 4 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.primary,
              fontWeight: 700,
              mb: 1,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '4px',
                bottom: '-15px',
                left: 'calc(50% - 30px)',
                backgroundColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
                borderRadius: '2px',
              }
            }}
          >
            Benefits of GLUStack Solutions
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            align="center"
            sx={{ 
              mt: 3, 
              mb: 8,
              maxWidth: '700px',
              mx: 'auto',
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : theme.palette.text.secondary
            }}
          >
            Partnering with us delivers tangible advantages that drive your business forward
          </Typography>
          
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Fade in={animate} timeout={800 + (index * 200)}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      height: '100%',
                      borderRadius: '16px',
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    >
                      {benefit.icon}
                    </Box>
                    
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.primary,
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : theme.palette.text.secondary,
                      }}
                    >
                      {benefit.description}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
          
          {/* CTA Button */}
          <Box
            sx={{
              textAlign: 'center',
              mt: 6,
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '30px',
                backgroundColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
                color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'white',
                fontWeight: 600,
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : theme.palette.primary.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Book a Consultation
            </Button>
          </Box>
        </Container>
      </PageSection>
      
      {/* Testimonials Section */}
      <TestimonialsSection 
        title="What Our Clients Say"
        subtitle="Success stories from businesses transformed by our solutions"
      />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
    </ConsistentPageLayout>
  );
};

export default Solutions;