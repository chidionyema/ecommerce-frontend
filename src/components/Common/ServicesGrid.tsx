import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha, Divider, Button } from '@mui/material';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';
import { motion, useInView } from 'framer-motion';
import {
  Lightbulb, 
  Wrench,
  Code,
  ShieldCheck,
  TrendingUp,
  Users,
  Layers,
  Database,
  LineChart,
  BookOpen,
  Cpu,
  Cloud,
} from 'lucide-react';

// Enhanced services with more specific descriptions that highlight enterprise experience
const services = [
  {
    title: 'Enterprise Architecture',
    content: 'Strategic design of scalable, maintainable systems based on experience at ASOS and Tesco.',
    icon: Layers,
    color: '#FF5722',
    ctaLink: '/services/enterprise-architecture'
  },
  {
    title: 'Cloud Migration',
    content: 'Seamless transitions to AWS, Azure, and GCP with proven methodologies from StepStone and PMI.',
    icon: Cloud,
    color: '#2196F3',
    ctaLink: '/services/cloud-migration'
  },
  {
    title: 'DevOps & Infrastructure',
    content: 'Automate deployment pipelines with Docker, Kubernetes, and Terraform for maximum efficiency.',
    icon: Wrench,
    color: '#4CAF50',
    ctaLink: '/services/devops'
  },
  {
    title: 'Custom Software Development',
    content: 'Full-stack solutions in .NET, React, Next.js, and more with enterprise-grade quality.',
    icon: Code,
    color: '#673AB7',
    ctaLink: '/services/development'
  },
  {
    title: 'Machine Learning Integration',
    content: 'Practical AI implementation leveraging expertise from Imperial College certification.',
    icon: Cpu,
    color: '#E91E63',
    ctaLink: '/services/machine-learning'
  },
  {
    title: 'Security & Authentication',
    content: 'Implement OAuth 2.0, OpenID Connect, and secure architecture patterns from day one.',
    icon: ShieldCheck,
    color: '#FFC107',
    ctaLink: '/services/security'
  },
  {
    title: 'Microservices Architecture',
    content: 'Design and implement scalable microservices with messaging systems like RabbitMQ and SQS.',
    icon: Database,
    color: '#00BCD4',
    ctaLink: '/services/microservices'
  },
  {
    title: 'Technical Documentation',
    content: 'Comprehensive, accessible documentation that empowers your team for long-term success.',
    icon: BookOpen,
    color: '#9E9E9E',
    ctaLink: '/services/documentation'
  },
];

const ServicesGrid = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        width: '100%',
        py: SPACING.large * 1.5,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{
                ...styles.pageTitle,
                color: 'white',
                mb: 2,
                fontWeight: 700,
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '2rem', // Smaller font size on mobile
                },
              }}
            >
              Enterprise Solutions for Growing Businesses
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography 
              variant="subtitle1"
              align="center"
              sx={{
                color: alpha(theme.palette.common.white, 0.9),
                mb: 5,
                maxWidth: '800px',
                mx: 'auto',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                [theme.breakpoints.down('sm')]: {
                  fontSize: '0.95rem', // Slightly smaller on mobile
                  px: 2, // Add some padding on smaller screens
                },
              }}
            >
              Leverage our experience from ASOS, Tesco, and Philip Morris to build 
              scalable, secure, and efficient technology for your growing company.
            </Typography>
          </motion.div>

          <Grid 
            container 
            spacing={3} 
            justifyContent="center"
            sx={{
              [theme.breakpoints.down('sm')]: {
                spacing: 2, // Reduce spacing on very small screens
              }
            }}
          >
            {services.map((service, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  [theme.breakpoints.down('sm')]: {
                    maxWidth: '100%', // Full width on very small screens
                    flexBasis: '100%',
                  }
                }}
              >
                <motion.div 
                  variants={itemVariants}
                  style={{ width: '100%', maxWidth: '320px' }} // Consistent max-width
                >
                  <TechCard
                    icon={<service.icon color={service.color} size={32} />}
                    title={service.title}
                    index={index}
                    sx={{
                      height: '100%', // Full height
                      display: 'flex',
                      flexDirection: 'column',
                      [theme.breakpoints.down('sm')]: {
                        maxWidth: '100%', // Full width on mobile
                      }
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ 
                        textAlign: 'center', 
                        mt: 1,
                        fontWeight: 500,
                        color: alpha(theme.palette.text.primary, 0.9),
                        flexGrow: 1, // Allow content to expand
                        [theme.breakpoints.down('sm')]: {
                          fontSize: '0.875rem', // Slightly smaller text on mobile
                        }
                      }}
                    >
                      {service.content}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.divider, 0.5) }} />
                    
                    <Button
                      variant="text"
                      color="primary"
                      href={service.ctaLink}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        mt: 0.5,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1)
                        },
                        [theme.breakpoints.down('sm')]: {
                          fontSize: '0.8rem', // Smaller button text on mobile
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          <motion.div variants={itemVariants}>
            <Box sx={{ 
              textAlign: 'center', 
              mt: 6,
              [theme.breakpoints.down('sm')]: {
                mt: 4, // Reduced margin on mobile
              }
            }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/services"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.5)}`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}`,
                  },
                  transition: 'all 0.3s ease',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '1rem', // Smaller font on mobile
                    px: 3,
                    py: 1.25,
                  }
                }}
              >
                View All Services
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesGrid;