// pages/resources.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// MUI Core Components - imported directly for better tree-shaking
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// MUI Utilities
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha } from '@mui/material/styles';

// MUI Icons - imported individually for better tree-shaking
import Cloud from '@mui/icons-material/Cloud';
import VpnKey from '@mui/icons-material/VpnKey';
import Code from '@mui/icons-material/Code';
import Security from '@mui/icons-material/Security';
import Search from '@mui/icons-material/Search';
import Star from '@mui/icons-material/Star';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Download from '@mui/icons-material/Download';
import AccessTime from '@mui/icons-material/AccessTime';
import FilterList from '@mui/icons-material/FilterList';
import LocalOffer from '@mui/icons-material/LocalOffer';
import Bookmark from '@mui/icons-material/Bookmark';
import FormatQuote from '@mui/icons-material/FormatQuote';
import CheckCircle from '@mui/icons-material/CheckCircle';
import PersonOutline from '@mui/icons-material/PersonOutline';

// Animation library - consider dynamic import for this
import { motion, AnimatePresence } from 'framer-motion';

// Custom components
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import CardGrid from '../components/CardGrid';

// Utilities and context
import { CARD_STYLES, getSharedStyles, SPACING } from '../utils/sharedStyles';
import { useAuth } from '../contexts/AuthContext';

// Data imports
import {
  freeResources,
  premiumResources,
  testimonials,
  benefits,
  stats,
  filterOptions,
  heroSection,
  benefitsSection,
  premiumSection,
  testimonialSection,
  freeResourcesSection,
  ctaSection
} from '../data/resourcesPageData';

// Rename icons for component usage
const CloudIcon = Cloud;
const CodeIcon = Code;
const SecurityIcon = Security;
const SearchIcon = Search;
const StarIcon = Star;
const ArrowForwardIcon = ArrowForward;
const DownloadIcon = Download;
const AccessTimeIcon = AccessTime;
const FilterListIcon = FilterList;
const LocalOfferIcon = LocalOffer;
const BookmarkIcon = Bookmark;
const FormatQuoteIcon = FormatQuote;
const CheckCircleIcon = CheckCircle;
const PersonOutlineIcon = PersonOutline;
interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  button?: React.ReactNode | null;
}

const Confetti = dynamic(
  () => import('react-confetti'),
  { 
    ssr: false,
    loading: () => null 
  }
);


  const SectionHeader = ({ overline, title, subtitle, button = null }: SectionHeaderProps) => {
    const theme = useTheme();
  
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }}
      >
        {overline && (
          <Typography 
            variant="overline" 
            component="p" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontWeight: 600, 
              letterSpacing: 1.2, 
              mb: 1 
            }}
          >
            {overline}
          </Typography>
        )}
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            fontWeight: 700, 
            mb: 2, 
            fontSize: { xs: '1.75rem', md: '2.5rem' } 
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              mb: button ? 3 : 5, 
              fontSize: '1.1rem' 
            }}
          >
            {subtitle}
          </Typography>
        )}
        {button}
      </motion.div>
    </Box>
  );
};

interface EmptyResultsProps {
  message: string;
  resetAction: () => void;
  resetText: string;
}
const EmptyResults = ({ message, resetAction, resetText }: EmptyResultsProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        borderRadius: 4,
        textAlign: 'center',
        border: `1px dashed ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
      }}
    >
      <Typography variant="h6" color="text.secondary" mb={2}>
        {message}
      </Typography>
      <Button variant="outlined" color="primary" onClick={resetAction}>
        {resetText}
      </Button>
    </Paper>
  );
};


interface BackgroundCircleProps {
  size: number;
  position: React.CSSProperties;
  opacity: number;
}

interface StatItemProps {
  stat: {
    value: string;
    label: string;
  };
  index: number;
  mobile?: boolean;
}


const BackgroundCircle = ({ size, position, opacity }: BackgroundCircleProps) => (
  <Box
    sx={{
      position: 'absolute',
      ...position,
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: `rgba(255,255,255,${opacity})`,
      zIndex: 0,
    }}
  />
);

// Main component
const ResourcesPage: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, isSubscribed } = useAuth();
  const styles = getSharedStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleTestimonials, setVisibleTestimonials] = useState(testimonials.slice(0, 1));
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
  };

  // Filter resources based on search term and active filter
  const getFilteredResources = (resources: Resource[]) => {
    return resources.filter(resource => {
      const matchesSearch =
        searchTerm === '' ||
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.tags &&
          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      
      let matchesFilter = true;
      if (activeFilter === 'trending') {
        matchesFilter = resource.trending;
      } else if (activeFilter === 'beginner') {
        matchesFilter = resource.level === 'Beginner';
      } else if (activeFilter === 'advanced') {
        matchesFilter = resource.level === 'Advanced' || resource.level === 'Expert';
      }
      
      return matchesSearch && matchesFilter;
    });
  };

  // Rotate testimonials every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTestimonialIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % testimonials.length;
        setVisibleTestimonials([testimonials[newIndex]]);
        return newIndex;
      });
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);


  interface Resource {
    id: string;
    path: string;
    title: string;
    summary: string;
    tags: string[];
    icon: React.ElementType;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    trending: boolean;
    rating: number;
    reviewCount: number;
    downloads: string;
    time: string;
    // Add any other properties your resources might have
  }
  // Handle clicking on a resource
  const handleResourceClick = (resource: Resource) => {
    const isPremium = resource.path.startsWith('/premium-resources');
    
    if (!isPremium) {
      router.push(resource.path);
      return;
    }
    
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(resource.path)}`);
    } else if (!isSubscribed) {
      router.push(`/subscribe?redirect=${encodeURIComponent(resource.path)}`);
    } else {
      // Show confetti when accessing premium content
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      router.push(resource.path);
    }
  };

  // Render a single resource card
  const renderResourceCard = (resource: Resource) => {
    const IconComponent = resource.icon;
    const isPremium = resource.path.startsWith('/premium-resources');
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: Math.random() * 0.3 } }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      >
        <Paper
          elevation={6}
          onClick={() => handleResourceClick(resource)}
          sx={{
            height: '100%',
            minHeight: 480,
            maxWidth: 350,
            width: '100%',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.3s ease',
            background: isPremium
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
                  theme.palette.primary.light,
                  0.2
                )} 100%)`
              : theme.palette.background.paper,
            border: isPremium
              ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
              : `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            '&:hover': {
              boxShadow: isPremium ? `0 10px 30px ${alpha(theme.palette.primary.main, 0.15)}` : theme.shadows[10],
              borderColor: isPremium ? theme.palette.primary.main : theme.palette.divider,
            },
          }}
        >
          {isPremium && (
            <Box
              sx={{
                position: 'absolute',
                top: 15,
                right: -30,
                transform: 'rotate(45deg)',
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
                px: 4,
                py: 0.5,
                fontWeight: 'bold',
                fontSize: '0.75rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 1,
              }}
            >
              PREMIUM
            </Box>
          )}
          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isPremium
                  ? alpha(theme.palette.primary.main, 0.1)
                  : alpha(theme.palette.grey[500], 0.1),
                borderRadius: '50%',
                width: 90,
                height: 90,
                mb: 3,
                mx: 'auto',
                border: `2px solid ${
                  isPremium ? alpha(theme.palette.primary.main, 0.3) : alpha(theme.palette.grey[500], 0.3)
                }`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(5deg)',
                  backgroundColor: isPremium
                    ? alpha(theme.palette.primary.main, 0.15)
                    : alpha(theme.palette.grey[500], 0.15),
                },
              }}
            >
              <IconComponent
                sx={{
                  fontSize: 45,
                  color: isPremium ? theme.palette.primary.main : theme.palette.text.secondary,
                }}
              />
            </Box>
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Chip
                label={resource.level}
                size="small"
                color={
                  resource.level === 'Beginner'
                    ? 'success'
                    : resource.level === 'Intermediate'
                    ? 'info'
                    : 'warning'
                }
                sx={{ mr: 1 }}
              />
              {resource.trending && (
                <Chip
                  icon={<LocalOfferIcon fontSize="small" />}
                  label="Trending"
                  color="error"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              )}
            </Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                textAlign: 'center',
                color: isPremium ? theme.palette.primary.main : theme.palette.text.primary,
                fontSize: '1.25rem',
              }}
            >
              {resource.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Rating value={resource.rating} precision={0.1} readOnly size="small" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                ({resource.reviewCount})
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                textAlign: 'center',
                color: theme.palette.text.secondary,
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              {resource.summary}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2.5 }}>
              {resource.tags.map(tag => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  size="small" 
                  variant="outlined" 
                  sx={{ fontSize: '0.7rem', borderRadius: '4px' }} 
                />
              ))}
            </Box>
            <Divider sx={{ mb: 2.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, px: 1, fontSize: '0.85rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DownloadIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {resource.downloads}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {resource.time}
                </Typography>
              </Box>
            </Box>
            <Button
              variant={isPremium ? 'contained' : 'outlined'}
              color="primary"
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                handleResourceClick(resource);
              }}
              endIcon={<ArrowForwardIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                mt: 'auto',
                py: 1.5,
                fontSize: '0.95rem',
                boxShadow: isPremium ? 4 : 0,
                '&:hover': {
                  boxShadow: isPremium ? 6 : 1,
                  backgroundColor: isPremium ? theme.palette.primary.dark : undefined,
                },
              }}
            >
              {isPremium
                ? isSubscribed
                  ? 'Access Premium Resource'
                  : 'Get Premium Access'
                : 'Access Free Resource'}
            </Button>
          </Box>
        </Paper>
      </motion.div>
    );
  };

  // Stat item component
  const StatItem = ({ stat, index, mobile = false }: StatItemProps) => {
    const motionProps = mobile 
      ? {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 }
        }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.5 + index * 0.2 }
        };

    return (
      <motion.div {...motionProps}>
        <Paper
          elevation={mobile ? 2 : 6}
          sx={mobile ? {
            p: 2,
            borderRadius: 2,
            textAlign: 'center',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          } : {
            position: 'absolute',
            p: 2,
            borderRadius: 2,
            width: 120,
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            top: index * 80 + 20,
            left: index % 2 === 0 ? 40 : 200,
            zIndex: 2,
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-5px)' }
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 0.5 }}>
            {stat.value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stat.label}
          </Typography>
        </Paper>
      </motion.div>
    );
  };

  return (
    <ConsistentPageLayout
      seoTitle="Technical Resources - Production Grade Code & Documentation"
      seoDescription="Access premium production-ready code, test scripts, and comprehensive documentation to accelerate your development."
      title={heroSection.title}
      subtitle={heroSection.subtitle}
    >
{showConfetti && (
  <Confetti
    recycle={false}
    numberOfPieces={200}
    width={typeof window !== 'undefined' ? window.innerWidth : 0}
    height={typeof window !== 'undefined' ? window.innerHeight : 0}
  />
)}

      {/* Hero Banner Section with Search & Filter */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          py: { xs: 6, md: 10 },
          mb: 6,
          borderRadius: { xs: '0 0 24px 24px', md: '0 0 48px 48px' },
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    mb: 2,
                    lineHeight: 1.2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  {heroSection.title}
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 4,
                    lineHeight: 1.6,
                    maxWidth: '90%',
                    fontWeight: 400,
                  }}
                >
                  {heroSection.subtitle}
                </Typography>
                {/* Search & Filter */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    gap: 2,
                    mb: { xs: 2, md: 0 },
                    width: '100%',
                    maxWidth: 600,
                  }}
                >
                  <TextField
                    placeholder={heroSection.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        borderRadius: 2,
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255,255,255,0.7)',
                        },
                      },
                    }}
                    sx={{ flex: 3 }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      height: 56,
                      borderRadius: 2,
                      fontWeight: 600,
                      flex: isTablet ? undefined : 1,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    onClick={() => router.push('/subscribe')}
                  >
                    {heroSection.getPremiumButtonText}
                  </Button>
                </Box>
                {/* Filter Chips */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                  {filterOptions.map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      clickable
                      onClick={() => setActiveFilter(option.value)}
                      color={activeFilter === option.value ? 'secondary' : 'default'}
                      variant={activeFilter === option.value ? 'filled' : 'outlined'}
                      sx={{
                        bgcolor: activeFilter === option.value ? 'secondary.main' : 'rgba(255,255,255,0.15)',
                        color: '#fff',
                        borderColor: 'rgba(255,255,255,0.3)',
                        '&:hover': {
                          bgcolor: activeFilter === option.value ? 'secondary.dark' : 'rgba(255,255,255,0.25)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <Box sx={{ position: 'relative', height: 350 }}>
                  {/* Floating Stats */}
                  {stats.map((stat, index) => (
                    <StatItem key={stat.label} stat={stat} index={index} />
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        {/* Background Elements */}
        <BackgroundCircle size={200} position={{ top: '10%', right: '5%' }} opacity={0.1} />
        <BackgroundCircle size={150} position={{ bottom: '15%', left: '10%' }} opacity={0.05} />
      </Box>

      {/* Mobile Stats */}
      <Container maxWidth="sm" sx={{ display: { md: 'none' }, mb: 6 }}>
        <Grid container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item xs={6} key={stat.label}>
              <StatItem stat={stat} index={index} mobile={true} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <PageSection bgcolor="background.default">
        <Container maxWidth="lg">
          <SectionHeader 
            overline={benefitsSection.overline}
            title={benefitsSection.title}
            subtitle={benefitsSection.subtitle}
          />
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={benefit.title}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 4,
                      textAlign: 'center',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: '50%',
                        width: 70,
                        height: 70,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        mx: 'auto',
                      }}
                    >
                      <benefit.icon sx={{ fontSize: 35, color: theme.palette.primary.main }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* Premium Resources Section */}
      <PageSection
        sx={{
          background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.dark, 0.05)}, ${alpha(
            theme.palette.background.default,
            0.5
          )})`,
        }}
      >
        <Container maxWidth="lg">
          <SectionHeader 
            overline={premiumSection.overline}
            title={premiumSection.title}
            subtitle={premiumSection.subtitle}
            button={!isSubscribed && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => router.push('/subscribe')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  mb: 5,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                }}
              >
                {premiumSection.upgradeButtonText}
              </Button>
            )}
          />
          <CardGrid
            data={getFilteredResources(premiumResources)}
            renderItem={renderResourceCard}
            sx={{ mx: 'auto', gap: { xs: 4, md: 6 } }}
            emptyMessage={
              <EmptyResults 
                message={freeResourcesSection.noResultsMessage}
                resetAction={resetFilters}
                resetText={freeResourcesSection.resetFiltersText}
              />
            }
          />
        </Container>
      </PageSection>

      {/* Testimonial Section */}
      <PageSection bgcolor="background.default">
        <Container maxWidth="lg">
          <SectionHeader 
            overline={testimonialSection.overline}
            title={testimonialSection.title}
          />
          <Box sx={{ position: 'relative', maxWidth: 900, mx: 'auto', mb: 8 }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                fontSize: '120px', 
                top: -40, 
                left: { xs: 0, md: -60 }, 
                color: alpha(theme.palette.primary.main, 0.1), 
                zIndex: 0 
              }}
            >
              <FormatQuoteIcon fontSize="inherit" />
            </Box>
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 6 },
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.primary.main, 0.03),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: { xs: '1.1rem', md: '1.25rem' }, 
                        fontStyle: 'italic', 
                        lineHeight: 1.7, 
                        mb: 4, 
                        color: theme.palette.text.primary 
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        flexDirection: { xs: 'column', sm: 'row' }, 
                        gap: 2 
                      }}
                    >
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        sx={{ width: 60, height: 60, border: `2px solid ${theme.palette.primary.main}` }} 
                      />
                      <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {testimonial.role}
                        </Typography>
                        <Rating value={testimonial.rating} readOnly size="small" />
                      </Box>
                      <Chip
                        label={`Used: ${testimonial.resource}`}
                        size="small"
                        color="primary"
                        sx={{ ml: { xs: 0, sm: 'auto' }, mt: { xs: 1, sm: 0 } }}
                      />
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    setTestimonialIndex(index);
                    setVisibleTestimonials([testimonials[index]]);
                  }}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: testimonialIndex === index ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </PageSection>

      {/* Free Resources Section */}
      <PageSection
        sx={{
          background: `linear-gradient(to bottom, ${alpha(theme.palette.background.default, 0.5)}, ${alpha(theme.palette.primary.dark, 0.05)})`,
        }}
      >
        <Container maxWidth="lg">
          <SectionHeader 
            overline={freeResourcesSection.overline}
            title={freeResourcesSection.title}
            subtitle={freeResourcesSection.subtitle}
          />
          <CardGrid
            data={getFilteredResources(freeResources)}
            renderItem={renderResourceCard}
            sx={{ mx: 'auto', gap: { xs: 4, md: 6 } }}
            emptyMessage={
              <EmptyResults 
                message={freeResourcesSection.noResultsMessage}
                resetAction={resetFilters}
                resetText={freeResourcesSection.resetFiltersText}
              />
            }
          />
        </Container>
      </PageSection>
      <Box sx={{ 
  height: { xs: 80, md: 120 }, 
  background: 'transparent',
  pointerEvents: 'none' 
}} />


      {/* CTA Section */}
      <PageSection
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          py: { xs: 8, md: 12 },
          mt: { xs: 12, md: 16 }, // Increased margin top for better spacing
          borderRadius: { xs: '24px 24px 0 0', md: '48px 48px 0 0' },
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Typography
                variant="h2"
                component="h2"
                align="center"
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '3rem' },
                  mb: 3,
                  lineHeight: 1.2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                {ctaSection.title}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                align="center"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 6,
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                {ctaSection.subtitle}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => router.push('/subscribe')}
                  sx={{
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.4)' },
                  }}
                >
                  {ctaSection.premiumButtonText}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => router.push('/free-resources')}
                  sx={{
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: '#fff',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  {ctaSection.freeButtonText}
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Container>
        <BackgroundCircle size={300} position={{ top: '20%', right: '10%' }} opacity={0.03} />
        <BackgroundCircle size={250} position={{ bottom: '10%', left: '5%' }} opacity={0.05} />
        <Box sx={{ 
  height: { xs: 80, md: 120 }, 
  background: 'transparent',
  pointerEvents: 'none' 
}} />
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;