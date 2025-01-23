// Resources.tsx
import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Box, 
  Button 
} from '@mui/material';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Cloud, VpnKey, Code } from '@mui/icons-material';
import BlogCard from '../components/BlogCard';
import NextLink from 'next/link';

const Resources: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Use the gradient from the theme
  const primaryGradient = theme.palette.gradients.corporate;

  const resources = [
    {
      id: 1,
      title: 'Mastering Cloud Computing',
      summary: 'Comprehensive guide to cloud infrastructure and deployment strategies',
      path: '/resources/cloud-computing',
      icon: <Cloud />,
    },
    {
      id: 2,
      title: 'Secrets Management with Vault',
      summary: 'Enterprise-grade secrets management in .NET using HashiCorp Vault',
      path: '/resources/integrating-vault-dotnet',
      icon: <VpnKey />,
    },
    {
      id: 3,
      title: 'Serverless Architecture Guide',
      summary: 'Optimize cloud costs with serverless implementation best practices',
      path: '/resources/serverless',
      icon: <Code />,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url(/grid-pattern.svg) repeat',
          opacity: 0.1,
        },
      }}
    >
      <SEO
        title="Technical Resources - Expert Insights"
        description="Cutting-edge technical resources on cloud architecture, DevOps, and modern software development"
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: isMobile ? '2rem' : '3rem',
              textAlign: 'center',
              mb: 6,
              background: primaryGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: theme.palette.primary.main, // Fallback color
              lineHeight: 1.2,
              '&:after': {
                content: '"📚"',
                display: 'inline-block',
                ml: 2,
              }
            }}
          >
            Expert Technical Resources
          </Typography>
        </motion.div>

        <Grid container spacing={isMobile ? 2 : 4}>
          {resources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <BlogCard {...resource} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" sx={{ 
            mb: 4, 
            fontWeight: 600, 
            color: 'text.primary'
          }}>
            Need Custom Technical Guidance?
          </Typography>
          <NextLink href="/contact" passHref>
            <Button
              variant="contained"
              sx={{
                background: primaryGradient,
                borderRadius: '50px',
                px: 6,
                py: 2,
                fontWeight: 700,
                color: 'common.white',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[6],
                }
              }}
            >
              Schedule Consultation
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Resources;