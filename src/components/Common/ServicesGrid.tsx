import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha, Divider, Button } from '@mui/material';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard';
import { motion, useInView } from 'framer-motion';
import {
  Layers, 
  Cloud,
  Code,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Database,
  BookOpen,
  Wrench,
} from 'lucide-react';

// Enhanced services with more specific descriptions highlighting enterprise experience
const services = [
  {
    title: 'Enterprise Architecture',
    content: 'Strategic design of scalable, maintainable systems based on our experience at ASOS and Tesco.',
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

// Animation variants for consistent brand motion
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
};

const ServicesGrid = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        width: '100%',
        py: SPACING.large * 1.5,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
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
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{
                ...styles.pageTitle,
                color: 'white',
                mb: 2,
                fontWeight: 800,
                fontSize: { xs: '2.2rem', sm: '2.7rem', md: '3.2rem' },
                letterSpacing: '-0.01em',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              }}
            >
              Enterprise Solutions for Growing Businesses
            </Typography>
          </motion.div>

          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography 
              variant="subtitle1"
              align="center"
              sx={{
                color: alpha(theme.palette.common.white, 0.9),
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                fontSize: '1.2rem',
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              Leverage our experience from ASOS, Tesco, and Philip Morris to build 
              scalable, secure, and efficient technology for your growing company.
            </Typography>
          </motion.div>

          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
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
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <motion.div 
                  variants={ANIMATION_VARIANTS.item}
                  style={{ width: '100%', height: '100%' }}
                >
                  <TechCard
                    icon={<service.icon color={service.color} strokeWidth={hoveredIndex === index ? 2.5 : 2} />}
                    title={service.title}
                    accentColor={service.color}
                    importance={index < 4 ? 'primary' : 'secondary'}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ 
                        textAlign: 'center', 
                        mt: 1,
                        mb: 2,
                        fontWeight: 500,
                        color: alpha(theme.palette.text.primary, 0.95),
                        flexGrow: 1,
                        lineHeight: 1.6,
                      }}
                    >
                      {service.content}
                    </Typography>
                    
                    <Divider sx={{ 
                      my: 1.5, 
                      borderColor: alpha(theme.palette.divider, 0.6),
                      width: '80%',
                      mx: 'auto',
                    }} />
                    
                    <Button
                      variant="text"
                      color="primary"
                      href={service.ctaLink}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        mt: 0.5,
                        '&:hover': {
                          backgroundColor: alpha(service.color || theme.palette.primary.main, 0.1),
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Learn More
                    </Button>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box sx={{ 
              textAlign: 'center', 
              mt: 8,
            }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/services"
                sx={{
                  px: 5,
                  py: 1.6,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}, 0 2px 6px rgba(0, 0, 0, 0.3)`,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.7)}, 0 4px 10px rgba(0, 0, 0, 0.4)`,
                  },
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                View All Enterprise Services
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesGrid;