import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Container,
  Chip,
  IconButton,
  alpha,
  styled,
  useMediaQuery,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { cvProjects, type CVProject } from '../data/cvProjects';
import SEO from '../components/SEO';
import NextLink from 'next/link';

// Import branding & tokens:
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  PAGE_BG,
  BACKDROP_BLUR,
  noiseSVG,
  TITLE_GRADIENT,
} from '../theme/branding';

const Tilt = dynamic(
  () => import('react-parallax-tilt').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div style={{ height: '100%', borderRadius: 24, background: '#f5f5f5' }} />,
  }
);

const PAGE_SIZE = 9;
const primaryGradient = TITLE_GRADIENT;

const PremiumCardContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  overflow: 'hidden',
  cursor: 'pointer',
  background: `
    linear-gradient(145deg, 
      ${alpha(theme.palette.background.paper, 0.8)}, 
      ${alpha(theme.palette.background.default, 0.9)}),
    ${alpha(SECONDARY_DARK, 0.05)}
  `,
  boxShadow: `0 32px 64px -12px ${alpha(PRIMARY_DARK, 0.2)}`,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  height: '100%',
  backdropFilter: BACKDROP_BLUR,

  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 40px 80px -24px ${alpha(SECONDARY_DARK, 0.2)}`,
    borderColor: TITLE_GRADIENT, // Apply TITLE_GRADIENT to border on hover
  },
  '.content-overlay': {
    position: 'absolute',
    inset: 0,
    borderRadius: 24,
    backgroundColor: alpha('#fff', 0.8),
    zIndex: 1,
    backdropFilter: 'blur(10px)',
  },
}));

const Solutions = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);

  // Example of how you might filter or load projects:
  const filteredProjects = useMemo(() => {
    // For brevity, just return all from cvProjects
    return cvProjects;
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const newProjects = filteredProjects.slice(0, page * PAGE_SIZE);
      setDisplayedProjects(newProjects);
      setHasMore(newProjects.length < filteredProjects.length);
      setIsLoading(false);
    }
  }, [page, filteredProjects, isLoading]);

  const handleViewDetails = useCallback(
    (projectId: string) => {
      router.push(`/projects/${projectId}`).catch((err) => {
        console.error('Navigation failed:', err);
      });
    },
    [router]
  );

  return (
    <Box
      sx={{
        backgroundColor: PAGE_BG,
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
            ${alpha(SECONDARY_DARK, 0.1)} 100%)
          `,
          opacity: 0.15,
        },
      }}
    >
      <SEO
        title="Client Solutions - Enterprise Solutions"
        description="Explore our portfolio of enterprise-grade technical solutions and client success stories."
      />

<Container maxWidth="lg" sx={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: 8,
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
       

            {/* H2 for SEO / structure */}
            <Typography variant="h2" sx={{
              fontWeight: 700,
              mt: 1,
              mb: 3,
              fontSize: isMobile ? '1.7rem' : '2rem',
              color: PRIMARY_DARK,
            }}>
           Driving Innovation Through Every Project
            </Typography>

            <Typography variant="subtitle1" sx={{
              color: 'text.secondary',
              maxWidth: 800,
              mx: 'auto',
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              lineHeight: 1.6,
              fontWeight: 500
            }}>
      Harnessing years of expertise to deliver impactful, enterprise-grade solutions tailored to your unique needs.
            </Typography>
          </Box>
        </motion.div>      

        <Grid container spacing={isMobile ? 4 : 6}>
          {displayedProjects.map((project, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={project.id}
              sx={{ 
                height: { xs: 'auto', sm: '500px' },
                display: 'flex',
              }}
            >
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
                style={{ height: '100%', width: '100%' }}
              >
                <Tilt
                  tiltReverse 
                  scale={1.02} 
                  glareEnable 
                  glareBorderRadius="24px"
                  style={{ height: '100%', width: '100%' }}
                >
                  <PremiumCardContainer
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewDetails(project.id)}
                  >
                    <Box className="content-overlay" />
                    <Box sx={{ 
                      p: 3, 
                      position: 'relative', 
                      zIndex: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}>
                      <Box sx={{ 
                        flexShrink: 0, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        mb: 2 
                      }}>
                        {/* If your project data has an icon prop: */}
                        <project.icon style={{ fontSize: '2rem', color: PRIMARY_DARK }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: PRIMARY_DARK }}>
                          {project.clientName}
                        </Typography>
                      </Box>

                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 1, 
                          fontWeight: 700,
                          WebkitLineClamp: 1,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          background: TITLE_GRADIENT,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {project.name}
                      </Typography>

                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 2, 
                          color: 'text.secondary',
                          flex: 1,
                          WebkitLineClamp: 3,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {project.description}
                      </Typography>

                      <Box 
                        sx={{ 
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          mb: 2,
                          maxHeight: '120px',
                          overflowY: 'auto',
                          '&::-webkit-scrollbar': {
                            width: '6px',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: alpha(PRIMARY_DARK, 0.3),
                            borderRadius: '4px',
                          }
                        }}
                      >
                        {project.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            sx={{
                              background: `
                                linear-gradient(145deg, 
                                  ${alpha(theme.palette.background.paper, 0.9)}, 
                                  ${alpha(theme.palette.background.default, 0.95)}),
                                url("data:image/svg+xml;utf8,${noiseSVG}")
                              `,
                              border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                              cursor: 'pointer',
                              '&:hover': {
                                boxShadow: `0 8px 24px ${alpha(SECONDARY_DARK, 0.2)}`,
                              },
                            }}
                          />
                        ))}
                      </Box>

                      <Box sx={{ 
                          flexShrink: 0, 
                          display: 'flex', 
                          justifyContent: 'flex-end', 
                          position: 'relative' // Add relative positioning to the Box
                        }}>
                      <IconButton sx={{ 
                        position: 'relative', 
                        '&::before': {  
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: TITLE_GRADIENT,
                          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                          WebkitMaskComposite: 'source-over', // Change to source-over
                          maskComposite: 'source-over', // Change to source-over
                        }
                      }}> 
                        <ArrowForwardIcon />
                      </IconButton>
                      </Box>
                    </Box>
                  </PremiumCardContainer>
                </Tilt>
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
              Custom Enterprise Solutions
            </Typography>
            <NextLink href="/contact" passHref>
              <Button
                variant="contained"
                sx={{
                  background: TITLE_GRADIENT,
                  borderRadius: '16px',
                  px: 8,
                  py: 2.5,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'common.white',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    boxShadow: `0 8px 24px ${alpha(PRIMARY_DARK, 0.3)}`
                  }
                }}
              >
                Request Solution Demo
              </Button>
            </NextLink>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Solutions;
