import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Container,
  Chip,
  Grid,
  Divider,
  Paper,
  Badge,
  Avatar,
  Tooltip,
  Rating,
  TextField,
  InputAdornment,
  useMediaQuery,
  alpha
} from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud as CloudIcon,
  VpnKey,
  Code as CodeIcon,
  Security as SecurityIcon,
  Search as SearchIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  Download as DownloadIcon,
  AccessTime as AccessTimeIcon,
  FilterList as FilterListIcon,
  LocalOffer as LocalOfferIcon,
  Bookmark as BookmarkIcon,
  FormatQuote as FormatQuoteIcon,
  CheckCircle as CheckCircleIcon,
  PersonOutline as PersonOutlineIcon
} from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import PageSection from '../components/PageSection';
import CardGrid from '../components/CardGrid';
import { CARD_STYLES, getSharedStyles, SPACING } from '../utils/sharedStyles';
import { useAuth } from '../contexts/AuthContext';
import Confetti from 'react-confetti';

// ---------------------------
// Resource data arrays
// ---------------------------

// Free Resources
const freeResources = [
  {
    id: 1,
    title: 'Basic Cloud Concepts',
    summary: 'Introduction to cloud infrastructure and basic concepts.',
    icon: CloudIcon,
    path: '/free-resources/cloud',
    downloads: '1.5K+',
    trending: true,
    time: '10 min read',
    rating: 4.7,
    reviewCount: 238,
    lastUpdated: '2 weeks ago',
    level: 'Beginner',
    tags: ['Cloud', 'Infrastructure', 'Basics']
  },
  {
    id: 2,
    title: 'Basic Security Vaults',
    summary: 'Learn the basics of securing your infrastructure with vaults.',
    icon: VpnKey,
    path: '/free-resources/security',
    downloads: '1.2K+',
    trending: true,
    time: '12 min read',
    rating: 4.5,
    reviewCount: 186,
    lastUpdated: '1 month ago',
    level: 'Beginner',
    tags: ['Security', 'Vaults', 'Protection']
  },
  {
    id: 3,
    title: 'Introduction to API Security',
    summary: 'Learn how to secure APIs with best practices and minimal overhead.',
    icon: SecurityIcon,
    path: '/free-resources/api-security',
    downloads: '1.1K+',
    trending: false,
    time: '15 min read',
    rating: 4.6,
    reviewCount: 159,
    lastUpdated: '3 weeks ago',
    level: 'Intermediate',
    tags: ['API', 'Security', 'Best Practices']
  },
];

// Premium Resources
const premiumResources = [
  {
    id: 1,
    title: 'Cloud Mastery',
    summary:
      'Complete guide with scripts, code, and docs to master cloud infrastructure.',
    icon: CloudIcon,
    path: '/premium-resources/cloud',
    downloads: '2.4K+',
    trending: true,
    time: '18 min read',
    rating: 4.9,
    reviewCount: 342,
    lastUpdated: '1 week ago',
    level: 'Advanced',
    tags: ['Cloud', 'Infrastructure', 'Complete']
  },
  {
    id: 2,
    title: 'Security Vaults',
    summary:
      'Full premium package with security vault setup scripts and complete documentation.',
    icon: VpnKey,
    path: '/premium-resources/security',
    downloads: '1.8K+',
    trending: true,
    time: '25 min read',
    rating: 4.8,
    reviewCount: 275,
    lastUpdated: '2 weeks ago',
    level: 'Advanced',
    tags: ['Security', 'Vaults', 'Premium']
  },
  {
    id: 3,
    title: 'Code Architect',
    summary:
      'Detailed code architecture patterns with production-ready examples.',
    icon: CodeIcon,
    path: '/premium-resources/architecture',
    downloads: '3.1K+',
    trending: false,
    time: '30 min read',
    rating: 4.9,
    reviewCount: 425,
    lastUpdated: '5 days ago',
    level: 'Expert',
    tags: ['Architecture', 'Patterns', 'Production']
  },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer at TechCorp",
    avatar: "https://i.pravatar.cc/150?img=1",
    comment: "The premium resources saved our team weeks of development time. The code is clean, well-documented, and production-ready.",
    resource: "Cloud Mastery",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO at StartupX",
    avatar: "https://i.pravatar.cc/150?img=2",
    comment: "I've tried many resources, but these are exceptionally well-crafted. The Security Vaults package helped us pass our security audit with flying colors.",
    resource: "Security Vaults",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Lead Architect at EnterpriseY",
    avatar: "https://i.pravatar.cc/150?img=3",
    comment: "The Code Architect resource transformed how we approach our system design. Highly recommended for any serious development team.",
    resource: "Code Architect",
    rating: 5
  }
];

// Benefits
const benefits = [
  {
    title: "Time-Saving Solutions",
    description: "Our production-ready resources cut development time by up to 70%",
    icon: AccessTimeIcon
  },
  {
    title: "Expert-Reviewed Code",
    description: "All resources are vetted by industry experts and follow best practices",
    icon: CheckCircleIcon
  },
  {
    title: "Continuous Updates",
    description: "Resources are regularly updated to match evolving industry standards",
    icon: CloudIcon
  },
  {
    title: "Comprehensive Support",
    description: "Premium subscribers get dedicated email support from our experts",
    icon: PersonOutlineIcon
  }
];

// Stats
const stats = [
  { label: "Active Users", value: "10K+" },
  { label: "Total Downloads", value: "50K+" },
  { label: "Success Rate", value: "98%" },
  { label: "Time Saved", value: "100K+ hrs" }
];

// ---------------------------
// Main Component
// ---------------------------
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

  // Filter options
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Trending', value: 'trending' },
    { label: 'Beginner', value: 'beginner' },
    { label: 'Advanced', value: 'advanced' }
  ];

  // Function to filter resources based on search and filters
  const getFilteredResources = (resources) => {
    return resources.filter(resource => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.tags && resource.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      // Category filter
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
      setTestimonialIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % testimonials.length;
        setVisibleTestimonials([testimonials[newIndex]]);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Function to handle resource click
  const handleResourceClick = (resource: any) => {
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
      // Show confetti for premium content access
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      router.push(resource.path);
    }
  };

  // Render a single resource card
  const renderResourceCard = (
    resource: typeof freeResources[0] | typeof premiumResources[0]
  ) => {
    const IconComponent = resource.icon;
    const isPremium = resource.path.startsWith('/premium-resources');
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: Math.random() * 0.3 } }}
        viewport={{ once: true }}
        whileHover={{ 
          scale: 1.03,
          transition: { duration: 0.2 } 
        }}
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
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.light, 0.2)} 100%)`
              : theme.palette.background.paper,
            border: isPremium 
              ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
              : `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            '&:hover': {
              boxShadow: isPremium 
                ? `0 10px 30px ${alpha(theme.palette.primary.main, 0.15)}`
                : theme.shadows[10],
              borderColor: isPremium 
                ? theme.palette.primary.main
                : theme.palette.divider,
            },
          }}
        >
          {/* Top ribbon for premium resources */}
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
                border: `2px solid ${isPremium
                  ? alpha(theme.palette.primary.main, 0.3)
                  : alpha(theme.palette.grey[500], 0.3)
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
                  color: isPremium
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                }}
              />
            </Box>
            
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Chip 
                label={resource.level} 
                size="small" 
                color={
                  resource.level === 'Beginner' ? 'success' : 
                  resource.level === 'Intermediate' ? 'info' : 
                  'warning'
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
              <Rating 
                value={resource.rating} 
                precision={0.1} 
                readOnly 
                size="small" 
                sx={{ mr: 1 }}
              />
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
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: 1, 
              mb: 2.5
            }}>
              {resource.tags.map(tag => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  size="small" 
                  variant="outlined" 
                  sx={{ 
                    fontSize: '0.7rem',
                    borderRadius: '4px',
                  }} 
                />
              ))}
            </Box>
            
            <Divider sx={{ mb: 2.5 }} />
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 3,
              px: 1,
              fontSize: '0.85rem',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DownloadIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">{resource.downloads}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">{resource.time}</Typography>
              </Box>
            </Box>
            
            <Button
              variant={isPremium ? "contained" : "outlined"}
              color={isPremium ? "primary" : "primary"}
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

  return (
    <ConsistentPageLayout
      seoTitle="Technical Resources - Elite Code & Documentation"
      seoDescription="Access premium production-ready code, test scripts, and comprehensive documentation to accelerate your development."
      title="Elite Developer Resources"
      subtitle="Production-ready code, scripts, and documentation to supercharge your projects"
    >
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Hero Banner Section with Search */}
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
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
                  Elite Resources for Modern Developers
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
                  Accelerate your development with production-ready code, comprehensive documentation, and expert-crafted resources.
                </Typography>
                
                {/* Search and filter */}
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
                    placeholder="Search resources..."
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
                    Get Premium
                  </Button>
                </Box>
                
                {/* Filter chips */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                  {filterOptions.map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      clickable
                      onClick={() => setActiveFilter(option.value)}
                      color={activeFilter === option.value ? "secondary" : "default"}
                      variant={activeFilter === option.value ? "filled" : "outlined"}
                      sx={{ 
                        bgcolor: activeFilter === option.value ? 'secondary.main' : 'rgba(255,255,255,0.15)',
                        color: '#fff',
                        borderColor: 'rgba(255,255,255,0.3)',
                        '&:hover': {
                          bgcolor: activeFilter === option.value ? 'secondary.dark' : 'rgba(255,255,255,0.25)',
                        }
                      }}
                    />
                  ))}
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 350,
                  }}
                >
                  {/* Floating stats */}
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                    >
                      <Paper
                        elevation={6}
                        sx={{
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
                          '&:hover': {
                            transform: 'translateY(-5px)',
                          },
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
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        
        {/* Background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            zIndex: 0,
          }}
        />
      </Box>

      {/* Stats for mobile */}
      <Container maxWidth="sm" sx={{ display: { md: 'none' }, mb: 6 }}>
        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid item xs={6} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    textAlign: 'center',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
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
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <PageSection bgcolor="background.default">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="overline"
                component="p"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: 1.2,
                  mb: 1,
                }}
              >
                WHY CHOOSE OUR RESOURCES
              </Typography>
              
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                Accelerate Your Development
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: 700,
                  mx: 'auto',
                  mb: 5,
                  fontSize: '1.1rem',
                }}
              >
                Our resources are designed by industry experts to help you ship faster, reduce costs, and implement best practices from day one.
              </Typography>
            </motion.div>
          </Box>
          
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
          background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.dark, 0.05)}, ${alpha(theme.palette.background.default, 0.5)})`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="overline"
                component="p"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: 1.2,
                  mb: 1,
                }}
              >
                PREMIUM COLLECTION
              </Typography>
              
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                Production-Ready Resources
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: 700,
                  mx: 'auto',
                  mb: 3,
                  fontSize: '1.1rem',
                }}
              >
                Access our comprehensive premium collection designed to save you weeks of development time with tested, documented, and optimized solutions.
              </Typography>
              
              {!isSubscribed && (
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
                  Upgrade to Premium
                </Button>
              )}
            </motion.div>
          </Box>
          
          <CardGrid
            data={getFilteredResources(premiumResources)}
            renderItem={renderResourceCard}
            sx={{ 
              mx: 'auto', 
              gap: { xs: 4, md: 6 } 
            }}
            emptyMessage={
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
                  No premium resources match your search criteria
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                >
                  Reset Filters
                </Button>
              </Paper>
            }
          />
        </Container>
      </PageSection>
      
      {/* Testimonial Section */}
      <PageSection bgcolor="background.default">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="overline"
                component="p"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: 1.2,
                  mb: 1,
                }}
              >
                SUCCESS STORIES
              </Typography>
              
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                What Developers Are Saying
              </Typography>
            </motion.div>
          </Box>
          
          <Box
            sx={{
              position: 'relative',
              maxWidth: 900,
              mx: 'auto',
              mb: 8,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                fontSize: '120px',
                top: -40,
                left: { xs: 0, md: -60 },
                color: alpha(theme.palette.primary.main, 0.1),
                zIndex: 0,
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
                        color: theme.palette.text.primary,
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                    
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                      }}
                    >
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ 
                          width: 60, 
                          height: 60,
                          border: `2px solid ${theme.palette.primary.main}`,
                        }}
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
                        sx={{ 
                          ml: { xs: 0, sm: 'auto' },
                          mt: { xs: 1, sm: 0 },
                        }}
                      />
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 3,
                gap: 1,
              }}
            >
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
                    backgroundColor: testimonialIndex === index
                      ? theme.palette.primary.main
                      : alpha(theme.palette.primary.main, 0.3),
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
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="overline"
                component="p"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: 1.2,
                  mb: 1,
                }}
              >
                FREE RESOURCES
              </Typography>
              
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                Get Started with Free Resources
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: 700,
                  mx: 'auto',
                  mb: 5,
                  fontSize: '1.1rem',
                }}
              >
                Explore our collection of free resources to learn essential concepts and fundamental techniques.
              </Typography>
            </motion.div>
          </Box>
          
          <CardGrid
            data={getFilteredResources(freeResources)}
            renderItem={renderResourceCard}
            sx={{ 
              mx: 'auto', 
              gap: { xs: 4, md: 6 } 
            }}
            emptyMessage={
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
                  No free resources match your search criteria
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                >
                  Reset Filters
                </Button>
              </Paper>
            }
          />
        </Container>
      </PageSection>
      
      {/* CTA Section */}
      <PageSection
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          py: { xs: 8, md: 12 },
          mt: 8,
          borderRadius: { xs: '24px 24px 0 0', md: '48px 48px 0 0' },
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
                Ready to Accelerate Your Development?
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
                Get unlimited access to all premium resources and future updates with our subscription plans.
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
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                    },
                  }}
                >
                  Get Premium Access
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
                  Explore Free Resources
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Container>
        
        {/* Background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.03)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            zIndex: 0,
          }}
        />
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;