import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Button,
  alpha 
} from '@mui/material';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';
import { Cloud, VpnKey, Code } from '@mui/icons-material';
import NextLink from 'next/link';

const Resources: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const primaryGradient = theme.palette.gradients.primary;

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
        minHeight: '150vh',
        pt: 8,
        pb: 12,
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, 
            ${alpha(theme.palette.secondary.light, 0.1)} 100%),
            url(/noise-texture.png)
          `,
          opacity: 0.15,
        },
      }}
    >
      {/* SEO */}
      <SEO
        title="Technical Resources - Expert Insights"
        description="Cutting-edge technical resources on cloud architecture, DevOps, and modern software development."
      />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Box
            sx={{
              textAlign: 'center',
              mb: 8,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -20, // Spacing below the underline
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px', // Length of the underline
                height: '3px', // Thickness of the underline
                background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
                borderRadius: '2px',
                opacity: 0.8,
              },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.03em',
                mb: 2,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                background: primaryGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              Resources
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                maxWidth: 680,
                mx: 'auto',
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Cutting-edge insights distilled from years of enterprise-grade implementations.
            </Typography>
          </Box>
        </motion.div>

        {/* Blog Cards */}
        <Grid container spacing={isMobile ? 4 : 6}>
          {resources.map((resource, index) => (
            <Grid item xs={12} md={4} key={resource.id}>
              <motion.div
                initial={{ opacity: 0, y: 60, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
              >
                <BlogCard
                  {...resource}
                  sx={{
                    backdropFilter: 'blur(12px)',
                    background: `
                      linear-gradient(145deg, 
                        ${alpha(theme.palette.background.paper, 0.8)}, 
                        ${alpha(theme.palette.background.default, 0.9)}),
                      ${alpha(theme.palette.primary.light, 0.05)}
                    `,
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    boxShadow: `
                      0 32px 64px -16px ${alpha(theme.palette.primary.dark, 0.1)},
                      0 16px 32px -16px ${alpha(theme.palette.secondary.dark, 0.1)}
                    `,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                      boxShadow: `
                        0 40px 80px -24px ${alpha(theme.palette.primary.dark, 0.2)},
                        0 24px 48px -24px ${alpha(theme.palette.secondary.dark, 0.2)}
                      `,
                    },
                  }}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 5,
                fontWeight: 700,
                color: 'text.primary',
                letterSpacing: '-0.01em',
              }}
            >
              Tailored Technology Solutions
            </Typography>
            <NextLink href="/contact" passHref>
              <Button
                variant="contained"
                sx={{
                  background: primaryGradient,
                  borderRadius: '16px',
                  px: 8,
                  py: 2.5,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'common.white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                Schedule Architecture Review
              </Button>
            </NextLink>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Resources;
