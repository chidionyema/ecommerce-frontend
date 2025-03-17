'use client';

import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Container, Chip, TextField, InputAdornment, 
  IconButton, FormControl, Select, MenuItem, Paper, Grid,
  useTheme, alpha, Fade, CircularProgress, SelectChangeEvent
} from '@mui/material';
import { Search, Clear, TrendingUp, FilterList, SortOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Motion components for animations
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);

// Define types for sort options
interface SortOption {
  id: string;
  label: string;
  value?: string; // Add this property to match UXOptimizedHero's expected type
  description?: string;
  defaultDirection?: 'asc' | 'desc';
}

// Define types for statistics
interface Stats {
  totalCount: number;
  featuredCount: number;
  techCount: number;
  [key: string]: number; // Allow for any additional stats
}

// Define props interface
interface UXOptimizedHeroProps {
  search: string;
  setSearch: (search: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOptions: SortOption[];
  stats: Stats;
  loading: boolean;
  resultCount: number;
  totalCount: number;
}

const UXOptimizedHero: React.FC<UXOptimizedHeroProps> = ({ 
  search, 
  setSearch, 
  sortBy, 
  setSortBy, 
  sortOptions, 
  stats, 
  loading,
  resultCount,
  totalCount
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [expanded, setExpanded] = useState(false);
  
  // Auto-collapse search panel when results are found
  useEffect(() => {
    if (search && !loading && resultCount > 0) {
      setExpanded(false);
    }
  }, [resultCount, loading, search]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };
  
  // Background gradient
  const bgGradient = isDark 
    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.85)} 0%, ${alpha(theme.palette.secondary.dark, 0.9)} 100%)`;
  
  // Results summary text
  const getResultSummary = () => {
    if (!search) return null;
    if (loading) return "Searching...";
    return `Found ${resultCount} result${resultCount !== 1 ? 's' : ''} of ${totalCount} case studies`;
  };
  
  // Handles toggling the expanded state of the search panel
  const toggleExpanded = () => setExpanded(!expanded);

  // Popular search terms
  const popularTerms = ['AI', 'Cloud Migration', 'E-commerce', 'Performance', 'Mobile App'];
  
  // Background Elements
  const BackgroundElements = () => (
    <>
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '5%', 
          right: '10%', 
          width: '300px', 
          height: '300px', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
          filter: 'blur(40px)',
          zIndex: 0
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: '5%', 
          left: '5%', 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0)} 70%)`,
          filter: 'blur(40px)',
          zIndex: 0
        }} 
      />
    </>
  );

  // Handle select change with proper type
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };
  
  return (
    <Box 
      sx={{
        position: 'relative',
        overflow: 'visible',
        background: bgGradient,
        pt: 4,
        pb: 3,
        mb: 1,
        borderRadius: { xs: '0 0 16px 16px', md: '0 0 24px 24px' },
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <BackgroundElements />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Compact header with search */}
          <Grid container spacing={2} alignItems="center">
            {/* Title section */}
            <Grid item xs={12} md={expanded ? 12 : 6}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: { xs: 'center', md: expanded ? 'center' : 'flex-start' },
                textAlign: { xs: 'center', md: expanded ? 'center' : 'left' },
                mb: { xs: 2, md: expanded ? 2 : 0 }
              }}>
                <motion.div variants={itemVariants}>
                  <Box 
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      mb: 1,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '20px',
                      background: isDark 
                        ? alpha(theme.palette.primary.main, 0.1) 
                        : alpha('#fff', 0.15),
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <TrendingUp 
                      sx={{ 
                        mr: 0.5, 
                        fontSize: '0.75rem',
                        color: isDark ? theme.palette.primary.main : '#fff'
                      }} 
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 600, 
                        color: isDark ? theme.palette.primary.main : '#fff'
                      }}
                    >
                      SUCCESS STORIES
                    </Typography>
                  </Box>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h3" 
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                      color: isDark ? 'text.primary' : '#fff',
                      textShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.2)',
                      mb: expanded ? 1 : 0
                    }}
                  >
                    Client Success Stories
                  </Typography>
                </motion.div>
                
                {expanded && (
                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        maxWidth: '700px',
                        color: isDark ? 'text.secondary' : alpha('#fff', 0.9),
                        mb: 2
                      }}
                    >
                      Discover how we've helped organizations overcome challenges and achieve remarkable results
                    </Typography>
                  </motion.div>
                )}
              </Box>
            </Grid>
            
            {/* Search section */}
            <Grid item xs={12} md={expanded ? 12 : 6}>
              <MotionPaper
                variants={itemVariants}
                elevation={3}
                sx={{
                  p: expanded ? 3 : 1.5,
                  width: '100%',
                  borderRadius: '12px',
                  background: isDark 
                    ? alpha(theme.palette.background.paper, 0.8) 
                    : alpha('#fff', 0.13),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${isDark ? alpha(theme.palette.divider, 0.05) : alpha('#fff', 0.15)}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    placeholder={expanded ? "Search case studies by name, technology, or description..." : "Search case studies..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="outlined"
                    fullWidth
                    size={expanded ? "medium" : "small"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {loading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <Search sx={{ color: isDark ? 'text.secondary' : alpha('#fff', 0.7) }} />
                          )}
                        </InputAdornment>
                      ),
                      endAdornment: search ? (
                        <InputAdornment position="end">
                          <IconButton 
                            size="small" 
                            onClick={() => setSearch('')} 
                            sx={{ color: isDark ? 'text.secondary' : alpha('#fff', 0.7) }}
                          >
                            <Clear fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : undefined,
                      sx: {
                        borderRadius: '10px',
                        backgroundColor: isDark 
                          ? alpha(theme.palette.background.default, 0.5) 
                          : alpha('#fff', 0.1),
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: isDark 
                            ? alpha(theme.palette.divider, 0.1) 
                            : alpha('#fff', 0.2)
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main
                        }
                      }
                    }}
                    sx={{
                      flex: 1,
                      '& .MuiInputBase-input': {
                        color: isDark ? 'text.primary' : '#fff'
                      }
                    }}
                  />
                  
                  {!expanded && (
                    <IconButton 
                      size="small" 
                      onClick={toggleExpanded}
                      sx={{ 
                        ml: 1, 
                        color: isDark ? theme.palette.primary.main : '#fff',
                        backgroundColor: isDark 
                          ? alpha(theme.palette.primary.main, 0.1) 
                          : alpha('#fff', 0.15),
                        '&:hover': {
                          backgroundColor: isDark 
                            ? alpha(theme.palette.primary.main, 0.2) 
                            : alpha('#fff', 0.2),
                        }
                      }}
                    >
                      <FilterList fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                
                {/* Search result summary */}
                {search && !expanded && (
                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: isDark ? 'text.secondary' : alpha('#fff', 0.7) }}>
                      {getResultSummary()}
                    </Typography>
                    
                    {sortBy && (
                      <Chip 
                        size="small"
                        label={`Sorted by: ${sortOptions.find(o => o.value === sortBy)?.label || 'Custom'}`}
                        onDelete={() => setSortBy('')}
                        sx={{
                          height: 24,
                          fontSize: '0.7rem',
                          backgroundColor: isDark 
                            ? alpha(theme.palette.background.paper, 0.3) 
                            : alpha('#fff', 0.15),
                          color: isDark ? 'text.primary' : '#fff',
                          '& .MuiChip-deleteIcon': {
                            color: isDark ? 'text.secondary' : alpha('#fff', 0.7),
                            fontSize: '0.7rem'
                          }
                        }}
                      />
                    )}
                  </Box>
                )}
                
                {/* Expanded search options */}
                {expanded && (
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 500, color: isDark ? 'text.secondary' : alpha('#fff', 0.8) }}>
                            Sort by
                          </Typography>
                          <Select
                            value={sortBy}
                            onChange={handleSortChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Sort By' }}
                            sx={{
                              borderRadius: '8px',
                              backgroundColor: isDark 
                                ? alpha(theme.palette.background.default, 0.5) 
                                : alpha('#fff', 0.1),
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: isDark 
                                  ? alpha(theme.palette.divider, 0.1) 
                                  : alpha('#fff', 0.2)
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main
                              },
                              color: isDark ? 'text.primary' : '#fff',
                              '& .MuiSelect-icon': {
                                color: isDark ? 'text.secondary' : alpha('#fff', 0.7)
                              }
                            }}
                            startAdornment={
                              <InputAdornment position="start">
                                <SortOutlined sx={{ fontSize: '1rem', color: isDark ? 'text.secondary' : alpha('#fff', 0.7) }} />
                              </InputAdornment>
                            }
                          >
                            <MenuItem value=""><em>Default Sort</em></MenuItem>
                            {sortOptions.map(o => (
                              <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} md={8}>
                        <Typography variant="caption" sx={{ mb: 0.5, display: 'block', fontWeight: 500, color: isDark ? 'text.secondary' : alpha('#fff', 0.8) }}>
                          Popular searches
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {popularTerms.map((term, i) => (
                            <Chip 
                              key={i}
                              label={term}
                              size="small"
                              onClick={() => setSearch(term)}
                              sx={{
                                backgroundColor: search === term
                                  ? theme.palette.primary.main
                                  : isDark 
                                    ? alpha(theme.palette.background.paper, 0.3) 
                                    : alpha('#fff', 0.15),
                                color: search === term
                                  ? '#fff'
                                  : isDark ? 'text.primary' : '#fff',
                                '&:hover': {
                                  backgroundColor: search === term
                                    ? theme.palette.primary.dark
                                    : isDark 
                                      ? alpha(theme.palette.background.paper, 0.4) 
                                      : alpha('#fff', 0.25),
                                },
                                fontWeight: search === term ? 500 : 400
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Chip
                        label={expanded ? "Collapse Search" : "Expand Search"}
                        size="small"
                        onClick={toggleExpanded}
                        color="primary"
                        variant="outlined"
                        sx={{ 
                          borderColor: isDark ? theme.palette.primary.main : alpha('#fff', 0.3),
                          color: isDark ? theme.palette.primary.main : '#fff',
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </MotionPaper>
            </Grid>
          </Grid>
          
          {/* Stats row (visible in compact mode) */}
          {!expanded && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {Object.entries(stats).map(([key, value], i) => (
                <Grid item xs={4} key={key}>
                  <MotionBox
                    variants={itemVariants}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700, 
                        color: isDark ? theme.palette.primary.main : '#fff',
                        lineHeight: 1
                      }}
                    >
                      {value}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: isDark ? 'text.secondary' : alpha('#fff', 0.7),
                        textTransform: 'uppercase',
                        fontWeight: 500
                      }}
                    >
                      {key === 'totalCount' ? 'Total Stories' : 
                       key === 'featuredCount' ? 'Featured' : 'Technologies'}
                    </Typography>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          )}
        </MotionBox>
      </Container>
    </Box>
  );
};

export default UXOptimizedHero;