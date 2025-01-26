import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { keyframes } from '@mui/system';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Container,
  Chip,
  CircularProgress,
  useTheme,
  Avatar,
  Badge,
  IconButton,
  useMediaQuery,
  alpha,
  styled,
  GlobalStyles
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PaletteIcon from '@mui/icons-material/Palette';
import { cvProjects, type CVProject } from '../data/cvProjects';

const Tilt = dynamic(
  () => import('react-parallax-tilt').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div style={{ height: '100%', borderRadius: 24, background: '#f5f5f5' }} />
  }
);

const LIGHT_SKY = '#F8FAFF';
const PLATINUM = '#FFFFFF';
const GOLD_ACCENT = '#B08F68';
const SECONDARY_GOLD = '#C5A46D';
const GLASS_FILL = 'rgba(255, 255, 255, 0.95)';
const BACKDROP_BLUR = 'blur(28px)';
const PAGE_SIZE = 9;

const logoShine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const usePremiumCursor = () => {
  const [cursor, setCursor] = useState({ x: -100, y: -100, variant: 'default' });
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY, variant: cursor.variant });
    const handleHover = () => setCursor(c => ({ ...c, variant: 'hover' }));
    const handleLeave = () => setCursor(c => ({ ...c, variant: 'default' }));
    
    const hoverables = document.querySelectorAll('button, a, [data-hover]');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);
  return cursor;
};

const Solutions: React.FC = () => {
  const theme = useTheme();
  const primaryGradient = theme.palette.gradients.primary;
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const cursor = usePremiumCursor();

  const [displayedProjects, setDisplayedProjects] = useState<CVProject[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const debouncedQuery = useDebounce(searchQuery, 300);
  const filteredProjects = useMemo(() => 
    cvProjects.filter(p =>
      p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(debouncedQuery.toLowerCase()))
    ), [debouncedQuery]);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const newProjects = filteredProjects.slice(0, page * PAGE_SIZE);
      setDisplayedProjects(newProjects);
      setHasMore(newProjects.length < filteredProjects.length);
      setIsLoading(false);
    }
  }, [page, filteredProjects, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && hasMore && !isLoading && setPage(p => p + 1),
      { threshold: 0.1, rootMargin: '200px' }
    );
    const sentinel = document.querySelector('#sentinel');
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const handleViewDetails = useCallback(async (projectId: string) => {
    setNavigatingId(projectId);
    try {
      await router.push(`/projects/${projectId}`);
    } catch (error) {
      console.error('Navigation failed:', error);
      setNavigatingId(null);
    }
  }, [router]);

  const PremiumCardContainer = styled(motion.div)({
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    background: `linear-gradient(152deg, ${alpha(PLATINUM, 0.92)} 0%, ${alpha(PLATINUM, 0.97)} 100%)`,
    boxShadow: `0 32px 64px ${alpha(GOLD_ACCENT, 0.1)}`,
    border: `1px solid ${alpha(GOLD_ACCENT, 0.1)}`,
    cursor: 'pointer',
  });

  const SearchField = styled(TextField)({
    '& .MuiFilledInput-root': {
      backgroundColor: alpha(PLATINUM, 0.9),
      borderRadius: '20px',
      padding: '8px 24px',
      '&:hover': { backgroundColor: alpha(PLATINUM, 0.95) },
      '&.Mui-focused': { backgroundColor: PLATINUM, boxShadow: `0 0 0 2px ${alpha(GOLD_ACCENT, 0.2)}` }
    },
    '& .MuiInputAdornment-root': {
      color: alpha(GOLD_ACCENT, 0.7),
      marginRight: '12px'
    }
  });

  return (
    <Box ref={containerRef} sx={{
      backgroundColor: LIGHT_SKY,
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      touchAction: 'manipulation'
    }}>
      <GlobalStyles styles={{
        '@keyframes ripple': {
          '0%': { opacity: 1, transform: 'scale(0.8)' },
          '100%': { opacity: 0, transform: 'scale(2.4)' }
        },
        '@font-face': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          src: `url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap')`
        }
      }} />

      <motion.div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        y
      }}>
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: `linear-gradient(45deg, ${alpha(SECONDARY_GOLD, 0.1)} 0%, ${alpha(PLATINUM, 0.2)} 100%)`,
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.1,
              width: 300 + i * 150,
              height: 300 + i * 150,
              top: `${i * 15}%`,
              left: `${i * 10}%`,
            }}
            animate={{ x: [0, 100, 0], y: [0, 50, 0], rotate: [0, 360] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </motion.div>

      <Box sx={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: '50%',
        background: `radial-gradient(circle at center, ${alpha(GOLD_ACCENT, 0.15)} 0%, transparent 70%)`,
        width: cursor.variant === 'hover' ? 120 : 60,
        height: cursor.variant === 'hover' ? 120 : 60,
        left: cursor.x,
        top: cursor.y,
        transform: 'translate(-50%, -50%)',
        opacity: cursor.variant === 'hover' ? 0.3 : 0.15,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }} />

      <AppBar position="sticky" sx={{
        backgroundColor: alpha(PLATINUM, 0.97),
        backdropFilter: BACKDROP_BLUR,
        borderBottom: `1px solid ${alpha(GOLD_ACCENT, 0.1)}`,
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.05)',
        fontFamily: "'Inter', sans-serif"
      }}>
        <Toolbar sx={{ py: 4 }}>
          <Box sx={{
            width: '100%',
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center'
          }}>
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
                textShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`
              }}
            >
              Our Solutions
            </Typography>
            <SearchField
              variant="filled"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                  </InputAdornment>
                ),
                sx: {
                  py: 2,
                  fontSize: '1.1rem',
                  color: theme.palette.text.primary,
                  fontFamily: "'Inter', sans-serif"
                }
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {displayedProjects.map(project => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              {!isMobile ? (
                <Tilt
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareBorderRadius="24px"
                  transitionSpeed={1500}
                  scale={1.02}
                  tiltEnable={!navigatingId}
                  glarePosition="all"
                  gyroscope={true}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform'
                  }}
                >
                  <PremiumCardContainer
                    onClick={() => handleViewDetails(project.id)}
                    style={{ opacity: navigatingId === project.id ? 0.7 : 1 }}
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      transition: { 
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                        mass: 0.5
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 20
                    }}
                    onMouseEnter={() => router.prefetch(`/projects/${project.id}`)}
                    sx={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', p: 3 }}>
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        backdropFilter: BACKDROP_BLUR,
                        zIndex: 1
                      }} />
                      <Box sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                          <Avatar sx={{
                            width: 64,
                            height: 64,
                            background: `linear-gradient(135deg, ${alpha(PLATINUM, 0.95)} 0%, ${alpha(PLATINUM, 0.85)} 100%)`,
                            border: `2px solid ${alpha(GOLD_ACCENT, 0.2)}`,
                            backdropFilter: BACKDROP_BLUR,
                            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                            '& svg': { width: '2.2rem', height: '2.2rem', color: `${GOLD_ACCENT} !important` }
                          }}>
                            {project.icon ? 
                              <project.icon sx={{ fontSize: '2.2rem', color: GOLD_ACCENT }} /> : 
                              <PaletteIcon sx={{ fontSize: '2.2rem', color: GOLD_ACCENT }} />}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 700,
                              letterSpacing: '0.3px',
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '1.1rem'
                            }}>
                              {project.clientName}
                            </Typography>
                            <Typography variant="caption" sx={{
                              color: theme.palette.text.secondary,
                              fontSize: '0.75rem',
                              letterSpacing: '0.8px'
                            }}>
                              {project.timeline}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="h5" sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 800,
                          lineHeight: 1.4,
                          fontSize: '1.5rem',
                          letterSpacing: '0.1px',
                          textShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                          fontFamily: "'Inter', sans-serif"
                        }}>
                          {project.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ p: 3, background: GLASS_FILL, borderTop: `1px solid ${alpha(GOLD_ACCENT, 0.1)}`, backdropFilter: BACKDROP_BLUR }}>
                      <Typography variant="body1" sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                        lineHeight: 1.6,
                        fontSize: '0.95rem',
                        minHeight: 100,
                        fontWeight: 400
                      }}>
                        {project.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            size="small"
                            sx={{
                              background: `linear-gradient(135deg, ${alpha(GOLD_ACCENT, 0.1)} 0%, ${alpha(SECONDARY_GOLD, 0.05)} 100%)`,
                              color: theme.palette.text.primary,
                              fontWeight: 700,
                              borderRadius: '12px',
                              border: `1px solid ${alpha(GOLD_ACCENT, 0.2)}`,
                            }}
                          />
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2 }}>
                        <Badge badgeContent={project.teamSize} sx={{
                          '& .MuiBadge-badge': {
                            right: -8,
                            top: 16,
                            background: alpha(GOLD_ACCENT, 0.9),
                            color: PLATINUM,
                            fontWeight: 700,
                            fontFamily: "'Inter', sans-serif"
                          }
                        }}>
                          <Typography variant="caption" sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.75rem',
                            letterSpacing: '0.8px',
                            fontFamily: "'Inter', sans-serif"
                          }}>
                            Team Members
                          </Typography>
                        </Badge>
                        
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            handleViewDetails(project.id);
                          }}
                          disabled={navigatingId === project.id}
                          sx={{
                            background: `linear-gradient(45deg, ${alpha(GOLD_ACCENT, 0.9)} 0%, ${alpha(SECONDARY_GOLD, 0.9)} 100%)`,
                            color: PLATINUM,
                            borderRadius: '12px',
                            padding: '12px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            zIndex: 2,
                          }}
                        >
                          {navigatingId === project.id ? (
                            <CircularProgress size={24} sx={{ 
                              color: PLATINUM,
                              animation: `${float} 2s ease-in-out infinite`
                            }} />
                          ) : (
                            <ArrowForwardIcon sx={{ fontSize: '1.4rem' }} />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </PremiumCardContainer>
                </Tilt>
              ) : (
                <PremiumCardContainer
                  onClick={() => handleViewDetails(project.id)}
                  style={{ opacity: navigatingId === project.id ? 0.7 : 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'pan-y'
                  }}
                >
                  <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', p: 3 }}>
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      backdropFilter: BACKDROP_BLUR,
                      zIndex: 1
                    }} />
                    <Box sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Avatar sx={{
                          width: 64,
                          height: 64,
                          background: `linear-gradient(135deg, ${alpha(PLATINUM, 0.95)} 0%, ${alpha(PLATINUM, 0.85)} 100%)`,
                          border: `2px solid ${alpha(GOLD_ACCENT, 0.2)}`,
                          backdropFilter: BACKDROP_BLUR,
                          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                          '& svg': { width: '2.2rem', height: '2.2rem', color: `${GOLD_ACCENT} !important` }
                        }}>
                          {project.icon ? 
                            <project.icon sx={{ fontSize: '2.2rem', color: GOLD_ACCENT }} /> : 
                            <PaletteIcon sx={{ fontSize: '2.2rem', color: GOLD_ACCENT }} />}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            letterSpacing: '0.3px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '1.1rem'
                          }}>
                            {project.clientName}
                          </Typography>
                          <Typography variant="caption" sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.75rem',
                            letterSpacing: '0.8px'
                          }}>
                            {project.timeline}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h5" sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 800,
                        lineHeight: 1.4,
                        fontSize: '1.5rem',
                        letterSpacing: '0.1px',
                        textShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {project.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 3, background: GLASS_FILL, borderTop: `1px solid ${alpha(GOLD_ACCENT, 0.1)}`, backdropFilter: BACKDROP_BLUR }}>
                    <Typography variant="body1" sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      minHeight: 100,
                      fontWeight: 400
                    }}>
                      {project.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{
                            background: `linear-gradient(135deg, ${alpha(GOLD_ACCENT, 0.1)} 0%, ${alpha(SECONDARY_GOLD, 0.05)} 100%)`,
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            borderRadius: '12px',
                            border: `1px solid ${alpha(GOLD_ACCENT, 0.2)}`,
                          }}
                        />
                      ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2 }}>
                      <Badge badgeContent={project.teamSize} sx={{
                        '& .MuiBadge-badge': {
                          right: -8,
                          top: 16,
                          background: alpha(GOLD_ACCENT, 0.9),
                          color: PLATINUM,
                          fontWeight: 700,
                          fontFamily: "'Inter', sans-serif"
                        }
                      }}>
                        <Typography variant="caption" sx={{
                          color: theme.palette.text.secondary,
                          fontSize: '0.75rem',
                          letterSpacing: '0.8px',
                          fontFamily: "'Inter', sans-serif"
                        }}>
                          Team Members
                        </Typography>
                      </Badge>
                      
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          handleViewDetails(project.id);
                        }}
                        disabled={navigatingId === project.id}
                        sx={{
                          background: `linear-gradient(45deg, ${alpha(GOLD_ACCENT, 0.9)} 0%, ${alpha(SECONDARY_GOLD, 0.9)} 100%)`,
                          color: PLATINUM,
                          borderRadius: '12px',
                          padding: '12px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          zIndex: 2,
                        }}
                      >
                        {navigatingId === project.id ? (
                          <CircularProgress size={24} sx={{ 
                            color: PLATINUM,
                            animation: `${float} 2s ease-in-out infinite`
                          }} />
                        ) : (
                          <ArrowForwardIcon sx={{ fontSize: '1.4rem' }} />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </PremiumCardContainer>
              )}
            </Grid>
          ))}
        </Grid>

        <Box id="sentinel" sx={{ py: 6, textAlign: 'center' }}>
          {isLoading ? (
            <CircularProgress size={40} thickness={4} sx={{
              color: GOLD_ACCENT,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                top: -8,
                left: -8,
                right: -8,
                bottom: -8,
                border: `3px solid ${GOLD_ACCENT}`,
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite',
                filter: 'drop-shadow(0 2px 8px rgba(176, 143, 104, 0.2))'
              }
            }} />
          ) : hasMore ? (
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: "'Inter', sans-serif" }}>
              Scroll to load more
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: theme.palette.text.secondary, fontFamily: "'Inter', sans-serif" }}>
              <CheckCircleOutlineIcon color="success" />
              <Typography variant="body2">All projects loaded</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Solutions;