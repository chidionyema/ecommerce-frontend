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

// Unified purple color scheme
const PRIMARY_DARK = '#0A1A2F';
const SECONDARY_DARK = '#532F73';
const LIGHT_ACCENT = '#F2E7FE';
const BACKDROP_BLUR = 'blur(28px)';

const Resources: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const primaryGradient = `linear-gradient(135deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`;

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
        backgroundColor: '#F9FAFD',
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
            linear-gradient(45deg, ${alpha(PRIMARY_DARK, 0.1)} 0%, 
            ${alpha(SECONDARY_DARK, 0.1)} 100%),
            url(/noise-texture.png)
          `,
          opacity: 0.15,
        },
      }}
    >
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
                bottom: -32,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${PRIMARY_DARK}, transparent)`,
                opacity: 0.8
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
                lineHeight: 1.1
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
                lineHeight: 1.6
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
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
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
                    backdropFilter: BACKDROP_BLUR,
                    background: `
                      linear-gradient(145deg, 
                        ${alpha(theme.palette.background.paper, 0.8)}, 
                        ${alpha(theme.palette.background.default, 0.9)}),
                      ${alpha(SECONDARY_DARK, 0.05)}
                    `,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: `0 32px 64px -12px ${alpha(PRIMARY_DARK, 0.2)}`,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: alpha(SECONDARY_DARK, 0.3),
                      boxShadow: `0 40px 80px -24px ${alpha(SECONDARY_DARK, 0.2)}`,
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
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${alpha(PRIMARY_DARK, 0.3)}`
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