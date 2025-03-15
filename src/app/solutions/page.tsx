'use client';

import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Container, Chip, useMediaQuery, Button, Grid,
  alpha, useTheme, CircularProgress, Fade
} from '@mui/material';

// Import components
import ConsistentPageLayout from '../../components/Shared/ConsistentPageLayout';
import ProjectGrid from '../../components/Solutions/Projects/ProjectGrid';
import PageSection from '../../components/PageSection';
import FAQ from '../../components/Common/FAQ';
import UXOptimizedHero from '../../components/Solutions/UXOptimizedHero';
// Import the SearchFilter component
import SearchFilter from '../../components/SearchFilter/SearchFilter';

// Import data
import { cvProjects } from '../../data/cvProjects';
import { solutionsPageData, caseStudiesFaqItems, industryIconMap } from '../../data/solutionsPageData';

// Import styles
import styles from '../../styles/solutions.module.css';

// Define type for projects
interface Project {
  id: string;
  name: string;
  clientName?: string;
  description: string;
  industry: string;
  technologies?: string[];
  tags?: string[];
  timeline?: string;
  metrics?: Array<{ label: string; value: string; description?: string }>;
}

// Define the types for the SearchFilter component
interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'radio';
  options: Array<{
    id: string;
    label: string;
    count?: number;
  }>;
}

interface SortOption {
  id: string;
  label: string;
  description?: string;
  defaultDirection?: 'asc' | 'desc';
}

const Solutions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';
  
  // State management
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [projects, setProjects] = useState<Project[]>(cvProjects as Project[]);
  const [loading, setLoading] = useState(false);
  const [heroView, setHeroView] = useState(true);
  
  // Helper functions
  const parseDate = (timeline?: string): number => {
    if (!timeline) return 0;
    const match = timeline.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/g);
    if (match?.length) {
      const [month, year] = match[match.length - 1].split(' ');
      const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      return new Date(parseInt(year), months[month as keyof typeof months] || 0).getTime();
    }
    const year = timeline?.match(/\d{4}/)?.[0];
    return year ? new Date(parseInt(year), 0).getTime() : 0;
  };
  
  const getImpact = (project: Project): number => {
    const percentages = project.metrics
      ?.filter(m => m.value.includes('%') && !m.value.includes('-'))
      .map(m => parseInt(m.value.match(/(\d+)%/)?.[1] || '0') || 0) || [];
    if (percentages.length) return Math.max(...percentages);
    return project.metrics?.some(m => m.value.includes('£') || m.value.includes('$')) 
      ? 50 
      : project.tags?.includes('featured') ? 40 : 0;
  };
  
  /**
   * Generate dynamic filter groups from actual project data
   * This ensures filter options always reflect the current data set
   */
  const generateFilterGroups = (): FilterGroup[] => {
    // Extract unique industries and convert to proper format
    const uniqueIndustries = [...new Set(cvProjects.map(p => p.industry.toLowerCase()))];
    const industryOptions = uniqueIndustries.map(industry => ({
      id: industry,
      label: industry.charAt(0).toUpperCase() + industry.slice(1),
      count: cvProjects.filter(p => p.industry.toLowerCase() === industry).length
    }));

    // Extract unique tags that can be used for challenge types
    const allTags = cvProjects.flatMap(p => p.tags || []).map(tag => tag.toLowerCase());
    const uniqueTags = [...new Set(allTags)];
    const challengeOptions = uniqueTags.map(tag => ({
      id: tag,
      label: tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' '),
      count: cvProjects.filter(p => p.tags?.some(t => t.toLowerCase() === tag)).length
    }));

    // Extract unique technologies - FIX for duplicate keys issue
    const allTech = cvProjects.flatMap(p => p.technologies || []).map(tech => tech.toLowerCase());
    const uniqueTech = [...new Set(allTech)];
    const techOptions = uniqueTech.map(tech => ({
      id: tech,
      label: tech.charAt(0).toUpperCase() + tech.slice(1), // Capitalize for display
      count: cvProjects.filter(p => p.technologies?.some(t => t.toLowerCase() === tech)).length
    }));

    // Return the full filter group structure
    return [
      {
        id: 'industry',
        label: 'Industry',
        type: 'checkbox',
        options: industryOptions
      },
      {
        id: 'challenge',
        label: 'Challenge Type',
        type: 'checkbox',
        options: challengeOptions
      },
      {
        id: 'technology',
        label: 'Technology',
        type: 'checkbox',
        options: techOptions
      },
      {
        id: 'featured',
        label: 'Featured',
        type: 'radio',
        options: [
          {
            id: 'featured',
            label: 'Featured Projects Only',
            count: cvProjects.filter(p => p.tags?.includes('featured')).length
          }
        ]
      }
    ];
  };
  
  // Sort options
  const formattedSortOptions: SortOption[] = [
    {
      id: 'name',
      label: 'Project Name',
      defaultDirection: 'asc'
    },
    {
      id: 'recent',
      label: 'Most Recent',
      description: 'Sort by project completion date'
    },
    {
      id: 'impact',
      label: 'Highest Impact',
      description: 'Sort by impact metrics'
    },
    {
      id: 'featured',
      label: 'Featured First',
      description: 'Show featured projects first'
    }
  ];

  // Apply filters and sorting
  useEffect(() => {
    setLoading(true);
    let isActive = true;
    
    const applyFilters = () => {
      try {
        let filtered = [...(cvProjects as Project[])];
        
        // Apply search filter
        if (search) {
          const term = search.toLowerCase();
          filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(term) ||
            (p.clientName?.toLowerCase() || '').includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.technologies?.some(t => t.toLowerCase().includes(term)) || false
          );
        }
        
        // Apply each filter category
        Object.entries(filters).forEach(([category, values]) => {
          if (!values) return;
          
          if (Array.isArray(values) && values.length === 0) return;
          
          if (category === 'featured') {
            // A radio filter for "featured"
            if (values === 'featured') {
              filtered = filtered.filter(p => p.tags?.includes('featured'));
            }
          } else if (category === 'challenge' && Array.isArray(values)) {
            // Filter by tags (challenge)
            filtered = filtered.filter(p => 
              p.tags?.some(t => values.includes(t.toLowerCase()))
            );
          } else if (category === 'industry' && Array.isArray(values)) {
            // Filter by industry
            filtered = filtered.filter(p => 
              values.includes(p.industry.toLowerCase())
            );
          } else if (category === 'technology' && Array.isArray(values)) {
            // Filter by technologies
            filtered = filtered.filter(p => 
              p.technologies?.some(t => values.includes(t.toLowerCase()))
            );
          }
        });
        
        // Apply sorting with direction handling
        if (sortBy) {
          if (sortBy === 'name') {
            if (sortDirection === 'asc') {
              filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else {
              filtered.sort((a, b) => b.name.localeCompare(a.name));
            }
          } else if (sortBy === 'recent') {
            filtered.sort((a, b) => parseDate(b.timeline) - parseDate(a.timeline));
          } else if (sortBy === 'impact') {
            filtered.sort((a, b) => getImpact(b) - getImpact(a));
          } else if (sortBy === 'featured') {
            filtered.sort((a, b) => {
              const aFeat = a.tags?.includes('featured') ? 1 : 0;
              const bFeat = b.tags?.includes('featured') ? 1 : 0;
              return bFeat - aFeat;
            });
          }
        }
        
        if (isActive) {
          setProjects(filtered);
          setLoading(false);
        }
      } catch (error) {
        console.error('Filtering error:', error);
        if (isActive) setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(applyFilters, 300);
    
    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [search, filters, sortBy, sortDirection]);
  
  // Event handlers for search, filter, and sort actions
  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleFilter = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };

  const handleSort = (sortId: string) => {
    setSortBy(sortId);
  };
  
  const handleSortDirectionChange = (direction: 'asc' | 'desc') => {
    setSortDirection(direction);
  };

  const resetFilters = () => {
    setSearch('');
    setFilters({});
    setSortBy('');
    setSortDirection('asc');
  };
  
  const toggleSearchView = () => setHeroView(!heroView);
  
  // Calculate some quick stats
  const stats = {
    totalCount: cvProjects.length,
    featuredCount: cvProjects.filter(p => p.tags?.includes('featured')).length,
    techCount: new Set(cvProjects.flatMap(p => p.technologies || []).map(tech => tech.toLowerCase())).size
  };

  // Create the dynamic filter groups from actual project data
  const dynamicFilterGroups = generateFilterGroups();

  return (
    <ConsistentPageLayout
      seoTitle="Client Success Stories & Case Studies"
      seoDescription="Discover our successful client projects across industries."
      seoKeywords="case studies, success stories"
    >
      {/* Search UI */}
      {heroView ? (
        <UXOptimizedHero 
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={formattedSortOptions}
          stats={stats}
          loading={loading}
          resultCount={projects.length}
          totalCount={cvProjects.length}
        />
      ) : (
        <Container maxWidth="xl" sx={{ my: 3 }}>
          {/* SearchFilter with dynamic filter groups from actual project data */}
          <SearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            onSort={handleSort}
            onSortDirectionChange={handleSortDirectionChange}
            filterGroups={dynamicFilterGroups}
            sortOptions={formattedSortOptions}
            initialValues={{
              search: search,
              filters: filters,
              sort: sortBy,
              sortDirection: sortDirection
            }}
            loading={loading}
            results={{
              count: projects.length,
              total: cvProjects.length
            }}
            placeholder="Search case studies by name, technology, or description..."
            title="Advanced Search & Filters"
            primaryColor={theme.palette.primary.main}
            showSearchHistory={true}
            maxVisibleFilters={3}
            compact={isMobile}
            debounceDelay={300}
            enableSortDirection={true}
            enableFilterSearch={true}
          />
        </Container>
      )}

      {/* Toggle Button - FIXED: correct text and improved contrast */}
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
          <Button 
            variant="outlined" 
            size="small"
            color="primary"
            onClick={toggleSearchView}
            disabled={loading}
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Switch to {heroView ? 'Advanced Search' : 'Simple Search'}
          </Button>
        </Box>
      </Container>

      {/* Status Bar with Filter Chips - FIXED: improved text contrast */}
      <Box
        sx={{
          position: 'sticky',
          top: { xs: 56, md: 64 },
          zIndex: 8,
          background: theme.palette.background.default,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          py: 1
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography 
                variant="body2" 
                color="white" 
                sx={{ fontWeight: 'medium' }}
              >
                {loading
                  ? "Filtering results..."
                  : projects.length === 0
                    ? "No matching results"
                    : `Showing ${projects.length} of ${cvProjects.length} case studies`}
              </Typography>
              {loading && <CircularProgress size={16} />}
            </Box>
            
            {/* Filter chips (only in hero view) */}
            {heroView && Object.keys(filters).length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="caption" color="white">Active filters:</Typography>
                {Object.entries(filters).flatMap(([groupId, value]) => {
                  // "featured" is a single radio value, "challenge"/"industry" might be arrays
                  const group = dynamicFilterGroups.find(g => g.id === groupId);
                  if (!group) return [];
                  
                  if (Array.isArray(value)) {
                    // e.g. challenge or industry
                    return value.map(optionId => {
                      const option = group.options.find(o => o.id === optionId);
                      if (!option) return null;
                      return (
                        <Chip
                          key={`${groupId}-${optionId}`}
                          size="small"
                          label={`${group.label}: ${option.label}`}
                          onDelete={() => {
                            setFilters(prev => {
                              const updated = { ...prev };
                              if (Array.isArray(updated[groupId])) {
                                updated[groupId] = updated[groupId].filter((v: string) => v !== optionId);
                                if (updated[groupId].length === 0) delete updated[groupId];
                              }
                              return updated;
                            });
                          }}
                          color="primary"
                          variant="outlined"
                          sx={{ 
                            borderColor: 'white',
                            color: 'white',
                            '& .MuiChip-deleteIcon': {
                              color: 'white'
                            }
                          }}
                          disabled={loading}
                        />
                      );
                    });
                  } else {
                    // e.g. featured
                    const option = group.options.find(o => o.id === value);
                    if (!option) return [];
                    return [(
                      <Chip
                        key={`${groupId}-${value}`}
                        size="small"
                        label={`${group.label}: ${option.label}`}
                        onDelete={() => {
                          setFilters(prev => {
                            const updated = { ...prev };
                            delete updated[groupId];
                            return updated;
                          });
                        }}
                        color="primary"
                        variant="outlined"
                        sx={{ 
                          borderColor: 'white',
                          color: 'white',
                          '& .MuiChip-deleteIcon': {
                            color: 'white'
                          }
                        }}
                        disabled={loading}
                      />
                    )];
                  }
                })}
                
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="error" 
                  onClick={resetFilters}
                  disabled={loading}
                  sx={{
                    borderColor: '#ff5252',
                    color: '#ff5252',
                    '&:hover': {
                      borderColor: '#ff5252',
                      backgroundColor: 'rgba(255, 82, 82, 0.1)'
                    }
                  }}
                >
                  Clear All
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Projects Display */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ position: 'relative', minHeight: 400 }}>
          {loading ? (
            <Box sx={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center', 
              bgcolor: alpha(theme.palette.background.default, 0.7), 
              backdropFilter: 'blur(4px)',
              zIndex: 5 
            }}>
              <CircularProgress />
            </Box>
          ) : projects.length > 0 ? (
            <Fade in={!loading}>
              <div>
                <ProjectGrid projects={projects} spacing={isTablet ? 2 : 3} />
              </div>
            </Fade>
          ) : (
            <Fade in={!loading}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No matching case studies found
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Try adjusting your filters or search terms
                </Typography>
                <Button variant="outlined" onClick={resetFilters}>Reset All Filters</Button>
              </Box>
            </Fade>
          )}
        </Box>

        {/* CTA Button */}
        <Box sx={{ textAlign: 'center', mt: 6, mb: 6 }}>
          <Button variant="contained" size="large" color="primary" 
            sx={{ py: 1.5, px: 4, fontWeight: 600 }}>
            Contact Us For Your Success Story
          </Button>
        </Box>
      </Container>

      {/* Industries Section */}
      <Box sx={{ py: 6,   backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)` }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 600 }}>
            Industries We've Transformed
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {solutionsPageData.industries.map((industry, i) => {
              const Icon = industryIconMap[industry.title] || industryIconMap["Cloud Services"];
              return (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Box className={styles.industryCard}>
                    <Box className={styles.industryIconContainer}>
                      <Icon sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h6" className={styles.industryTitle}>
                      {industry.title}
                    </Typography>
                    <Typography variant="body2">
                      {industry.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <PageSection>
        <FAQ 
          items={caseStudiesFaqItems} 
          title="Case Studies FAQ"
          subtitle="Common questions"
          containerProps={{ maxWidth: "lg" }}
        />
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default Solutions;