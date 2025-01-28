import React, { memo, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Container, 
  useTheme, 
  useMediaQuery,
  alpha,
} from '@mui/material';
import { motion, LazyMotion, domAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Cloud, VpnKey, Code } from '@mui/icons-material';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles'; 
import SEO from '../components/SEO';

// NEW (aligned with NavBar)
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  BACKDROP_BLUR,
  gradientShift,
  noiseSVG,
} from '../theme/branding';


// You can keep a “title gradient” but use the same brand colors:
const TITLE_GRADIENT  = 'linear-gradient(45deg, #4361EE 0%, #3A0CA3 100%)';


const LazyResourceCard = styled(motion(Box))(({ theme }) => ({
  position: 'relative',
  background: `
    ${alpha(theme.palette.background.paper, 0.85)},
    url("data:image/svg+xml;utf8,${noiseSVG}")
  `,
  backgroundBlendMode: 'overlay',
  borderRadius: '32px',
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: `${BACKDROP_BLUR} brightness(120%)`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  minHeight: 480,
  overflow: 'hidden',
  perspective: 1000,
  boxShadow: `0 24px 48px -12px ${alpha(PRIMARY_DARK, 0.15)}`,
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: `0 40px 80px -16px ${alpha(SECONDARY_DARK, 0.25)}`,
    '&::before': { opacity: 0.4 },
    '&::after': { opacity: 1 }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(
        400px circle at var(--mouse-x) var(--mouse-y),
        ${alpha(SECONDARY_DARK, 0.15)} 0%,
        transparent 60%
      )`,
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '32px',
    padding: '2px',
    background: `
      linear-gradient(
        145deg, 
        ${alpha(PRIMARY_DARK, 0.3)} 0%, 
        ${alpha(SECONDARY_DARK, 0.3)} 50%,
        ${alpha(PRIMARY_DARK, 0.3)} 100%
      )`,
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    animation: `${gradientShift} 8s linear infinite`,
    backgroundSize: '200% 200%',
    opacity: 0.8,
    transition: 'opacity 0.4s ease'
  }
}));

const Resources: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <Box sx={{
      backgroundColor: '#F9FAFD',
      minHeight: '100vh',
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
    }}>
      <SEO
        title="Technical Resources - Expert Insights"
        description="Cutting-edge technical resources on cloud architecture, DevOps, and modern software development."
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -32,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${PRIMARY_DARK}, transparent)`,
              opacity: 0.8
            }
          }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.03em',
                mb: 2,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                background: TITLE_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1
              }}
            >
              Premium Resources
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                maxWidth: 800,
                mx: 'auto',
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.5
              }}
            >
              Cutting-edge insights distilled from years of enterprise-grade implementations.
            </Typography>
          </Box>
        </motion.div>

        <LazyMotion features={domAnimation}>
          <Grid container spacing={4}>
            {resources.map((resource, index) => {
              const rotateX = useMotionValue(0);
              const rotateY = useMotionValue(0);
              const zIndex = useMotionValue(1);
              
              const handleCardMouseMove = (e: React.MouseEvent) => {
                handleMouseMove(e);
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                rotateX.set((y - centerY) / 24);
                rotateY.set(-(x - centerX) / 24);
                zIndex.set(2);
              };

              return (
                <Grid item xs={12} md={4} key={resource.id}>
                  <LazyResourceCard
                    initial={{ opacity: 0, y: 60, scale: 0.97, rotateX: 15 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={() => {
                      rotateX.set(0);
                      rotateY.set(0);
                      zIndex.set(1);
                    }}
                    style={{ rotateX, rotateY, zIndex }}
                  >
                    <Box sx={{ 
                      mb: 4, 
                      textAlign: 'center',
                      position: 'relative'
                    }}>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {React.cloneElement(resource.icon, {
                          sx: {
                            fontSize: 56,
                            color: PRIMARY_DARK,
                            margin: '0 auto',
                          }
                        })}
                      </motion.div>
                      <Typography variant="h3" sx={{
                        fontWeight: 900,
                        mt: 3,
                        background: TITLE_GRADIENT,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: isMobile ? '1.75rem' : '2rem',
                        letterSpacing: '-0.02em',
                        pb: 1,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '60%',
                          height: '2px',
                          background: `linear-gradient(90deg, transparent, ${alpha(SECONDARY_DARK, 0.4)}, transparent)`
                        }
                      }}>
                        {resource.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" sx={{
                      color: 'text.secondary',
                      mb: 4,
                      flexGrow: 1,
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}>
                      {resource.summary}
                    </Typography>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <NextLink href={resource.path} passHref>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            height: 56,
                            background: TITLE_GRADIENT,
                            borderRadius: '14px',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            color: 'common.white',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: `0 12px 24px ${alpha(SECONDARY_DARK, 0.3)}`
                            }
                          }}
                        >
                          Access Resource
                        </Button>
                      </NextLink>
                    </motion.div>
                  </LazyResourceCard>
                </Grid>
              )}
            )}
          </Grid>
        </LazyMotion>
      </Container>
    </Box>
  );
};

export default Resources;