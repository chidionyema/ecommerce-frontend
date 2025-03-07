'use client';

import { Box, Container, Typography, Grid, useTheme, Button } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SPACING } from '../../utils/sharedStyles';
import { alpha } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { SiAmazonaws, SiMicrosoftazure, SiDocker, SiKubernetes, SiTerraform, SiReact, SiNextdotjs, SiDotnet } from 'react-icons/si';

// Dynamic import of TechCard to avoid SSR issues
const TechCard = dynamic(() => import('../Common/TechCard'), { ssr: false });

// Enhanced tech icons with enterprise-focused descriptions
const enhancedTechIcons = [
  {
    icon: <SiAmazonaws size={40} />,
    title: 'AWS Cloud',
    description: 'Scalable infrastructure with EC2, Lambda, S3, and more',
    color: '#FF9900'
  },
  {
    icon: <SiMicrosoftazure size={40} />,
    title: 'Azure Services',
    description: 'Enterprise solutions with Azure DevOps, Functions, and AKS',
    color: '#0078D4'
  },
  {
    icon: <SiDocker size={40} />,
    title: 'Containerization',
    description: 'Isolated, portable environments with Docker and Docker Compose',
    color: '#2496ED'
  },
  {
    icon: <SiKubernetes size={40} />,
    title: 'Kubernetes',
    description: 'Industry-standard container orchestration for scaling',
    color: '#326CE5'
  },
  {
    icon: <SiTerraform size={40} />,
    title: 'Infrastructure as Code',
    description: 'Terraform and CloudFormation for automated provisioning',
    color: '#7B42BC'
  },
  {
    icon: <SiReact size={40} />,
    title: 'React & Modern JS',
    description: 'Responsive frontends with React, Vue, and Angular',
    color: '#61DAFB'
  },
  {
    icon: <SiNextdotjs size={40} />,
    title: 'Next.js',
    description: 'Production-grade React apps with SSR and static optimization',
    color: '#000000'
  },
  {
    icon: <SiDotnet size={40} />,
    title: '.NET Core',
    description: 'Enterprise-ready backend systems with C# and ASP.NET',
    color: '#512BD4'
  },
];

const TechnologyShowcase = () => {
  const theme = useTheme();
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
      
      <Container ref={ref} sx={{ position: 'relative', zIndex: 2 }}>
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
                color: 'white',
                mb: 2,
                fontWeight: 700,
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '2rem', // Smaller font size on mobile
                },
              }}
            >
              Production-Ready Technology Solutions
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
              Skip the trial and error. Access battle-tested code, infrastructure templates, 
              and expert guidance from senior engineers with enterprise experience.
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
            {enhancedTechIcons.map((tech, index) => (
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
                    icon={tech.icon}
                    title={tech.title}
                    accentColor={tech.color}
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
                      {tech.description}
                    </Typography>
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
                href="/solutions"
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
                Explore Our Technology Stack
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TechnologyShowcase;