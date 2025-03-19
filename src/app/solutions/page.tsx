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

// Import data and styles
import { cvProjects } from '../../data/cvProjects';
import { solutionsPageData, caseStudiesFaqItems, industryIconMap } from '../../data/solutionsPageData';
import styles from '../../styles/solutions.module.css';

// Create a wrapper component for SearchFilter to handle additional required props
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import { SearchFilterProps } from '../../components/SearchFilter/types';

// Define types that match the actual structure of your data
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

interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'radio';
  options: Array<{ id: string; label: string; count?: number; }>;
}

interface SortOption {
  id: string;
  label: string;
  description?: string;
  defaultDirection?: 'asc' | 'desc';
}

// Define SearchFilterWrapper component
const SearchFilterWrapper: React.FC<SearchFilterProps> = (props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [pendingFilters, setPendingFilters] = useState<Record<string, any>>(props.initialValues?.filters || {});
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // Refactored handler functions
  const handlers = {
    filterChange: (category: string, value: any) => 
      setPendingFilters(prev => ({ ...prev, [category]: value })),
    
    applyFilters: () => {
      if (props.onFilter) props.onFilter(pendingFilters);
      handleClose();
    },
    
    cancelFilters: () => {
      setPendingFilters(props.initialValues?.filters || {});
      handleClose();
    },
    
    resetFilters: () => {
      setPendingFilters({});
      if (props.onFilter) props.onFilter({});
    }
  };

  // Helper functions
  const isOptionSelected = (groupId: string, optionId: string): boolean => {
    const groupValue = pendingFilters[groupId];
    return Array.isArray(groupValue) ? groupValue.includes(optionId) : groupValue === optionId;
  };

  const hasPendingChanges = (): boolean => {
    const initialFilters = props.initialValues?.filters || {};
    const pendingKeys = Object.keys(pendingFilters);
    const initialKeys = Object.keys(initialFilters);

    if (pendingKeys.length !== initialKeys.length) return true;

    return pendingKeys.some(key => {
      const pendingValue = pendingFilters[key];
      const initialValue = initialFilters[key];

      if (Array.isArray(pendingValue) && Array.isArray(initialValue)) {
        if (pendingValue.length !== initialValue.length) return true;
        return pendingValue.some(v => !initialValue.includes(v));
      }
      return pendingValue !== initialValue;
    });
  };

  // Compile all props
  const filterPanelProps = {
    ...props,
    anchorEl,
    pendingFilters,
    handleFilterChange: handlers.filterChange,
    handleApplyFilters: handlers.applyFilters,
    handleCancelFilters: handlers.cancelFilters,
    handleResetFilters: handlers.resetFilters,
    handleClose,
    open,
    isOptionSelected,
    hasPendingChanges,
    closePanel: handleClose,
    colors: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      text: theme.palette.text.primary,
      background: theme.palette.background.paper,
      border: theme.palette.divider,
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick} disabled={props.loading}>
        Filter & Sort
      </Button>
      <SearchFilter {...filterPanelProps} />
    </div>
  );
};

const Solutions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management - grouped related state variables
  const [searchState, setSearchState] = useState({
    search: '',
    filters: {} as Record<string, any>,
    sortBy: '',
    sortDirection: 'asc' as 'asc' | 'desc'
  });
  const [projects, setProjects] = useState<Project[]>(cvProjects as unknown as Project[]);
  const [loading, setLoading] = useState(false);
  const [heroView, setHeroView] = useState(true);
  
  // Destructure for convenience
  const { search, filters, sortBy, sortDirection } = searchState;
  
  // Helper functions
  const helpers = {
    parseDate: (timeline?: string): number => {
      if (!timeline) return 0;
      const match = timeline.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/g);
      if (match?.length) {
        const [month, year] = match[match.length - 1].split(' ');
        const months: Record<string, number> = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
          'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        return new Date(parseInt(year), months[month as keyof typeof months] || 0).getTime();
      }
      const year = timeline?.match(/\d{4}/)?.[0];
      return year ? new Date(parseInt(year), 0).getTime() : 0;
    },
    
    getImpact: (project: Project): number => {
      const percentages = project.metrics
        ?.filter(m => m.value.includes('%') && !m.value.includes('-'))
        .map(m => parseInt(m.value.match(/(\d+)%/)?.[1] || '0') || 0) || [];
      
      if (percentages.length) return Math.max(...percentages);
      return project.metrics?.some(m => m.value.includes('£') || m.value.includes('$')) 
        ? 50 : project.tags?.includes('featured') ? 40 : 0;
    },
    
    generateFilterGroups: (): FilterGroup[] => {
      // Extract unique values with a helper function
      const extractUniqueOptions = (
        getter: (p: Project) => string | string[] | undefined, 
        formatter: (val: string) => string = (val) => val.charAt(0).toUpperCase() + val.slice(1)
      ) => {
        const allValues = cvProjects.flatMap(p => {
          const value = getter(p as unknown as Project);
          return Array.isArray(value) ? value.map(v => v.toLowerCase()) : (value ? [value.toLowerCase()] : []);
        });
        
        const uniqueValues = [...new Set(allValues)];
        
        return uniqueValues.map(val => ({
          id: val,
          label: formatter(val),
          count: cvProjects.filter(p => {
            const projectVal = getter(p as unknown as Project);
            if (Array.isArray(projectVal)) {
              return projectVal.some(v => v.toLowerCase() === val);
            }
            return projectVal?.toLowerCase() === val;
          }).length
        }));
      };

      return [
        {
          id: 'industry',
          label: 'Industry',
          type: 'checkbox',
          options: extractUniqueOptions(p => p.industry)
        },
        {
          id: 'challenge',
          label: 'Challenge Type',
          type: 'checkbox',
          options: extractUniqueOptions(
            p => p.tags, 
            val => val.charAt(0).toUpperCase() + val.slice(1).replace(/-/g, ' ')
          )
        },
        {
          id: 'technology',
          label: 'Technology',
          type: 'checkbox',
          options: extractUniqueOptions(p => p.technologies)
        },
        {
          id: 'featured',
          label: 'Featured',
          type: 'radio',
          options: [{
            id: 'featured',
            label: 'Featured Projects Only',
            count: cvProjects.filter(p => (p as unknown as Project).tags?.includes('featured')).length
          }]
        }
      ];
    }
  };
  
  // Sort options
  const formattedSortOptions: SortOption[] = [
    { id: 'name', label: 'Project Name', defaultDirection: 'asc' },
    { id: 'recent', label: 'Most Recent', description: 'Sort by project completion date' },
    { id: 'impact', label: 'Highest Impact', description: 'Sort by impact metrics' },
    { id: 'featured', label: 'Featured First', description: 'Show featured projects first' }
  ];

  // Apply filters and sorting
  useEffect(() => {
    setLoading(true);
    let isActive = true;
    
    const applyFilters = () => {
      try {
        let filtered = [...(cvProjects as unknown as Project[])];
        
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
          if (!values || (Array.isArray(values) && values.length === 0)) return;
          
          if (category === 'featured' && values === 'featured') {
            filtered = filtered.filter(p => p.tags?.includes('featured'));
          } else if (category === 'challenge' && Array.isArray(values)) {
            filtered = filtered.filter(p => p.tags?.some(t => values.includes(t.toLowerCase())));
          } else if (category === 'industry' && Array.isArray(values)) {
            filtered = filtered.filter(p => values.includes(p.industry.toLowerCase()));
          } else if (category === 'technology' && Array.isArray(values)) {
            filtered = filtered.filter(p => p.technologies?.some(t => values.includes(t.toLowerCase())));
          }
        });
        
        // Apply sorting with direction handling
        if (sortBy) {
          const sortFunctions = {
            name: (a: Project, b: Project) => 
              sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
            recent: (a: Project, b: Project) => 
              helpers.parseDate(b.timeline) - helpers.parseDate(a.timeline),
            impact: (a: Project, b: Project) => 
              helpers.getImpact(b) - helpers.getImpact(a),
            featured: (a: Project, b: Project) => {
              const aFeat = a.tags?.includes('featured') ? 1 : 0;
              const bFeat = b.tags?.includes('featured') ? 1 : 0;
              return bFeat - aFeat;
            }
          };
          
          if (sortFunctions[sortBy as keyof typeof sortFunctions]) {
            filtered.sort(sortFunctions[sortBy as keyof typeof sortFunctions]);
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
  
  // Event handlers
  const handlers = {
    search: (query: string) => setSearchState(prev => ({ ...prev, search: query })),
    filter: (newFilters: Record<string, any>) => setSearchState(prev => ({ ...prev, filters: newFilters })),
    sort: (sortId: string) => setSearchState(prev => ({ ...prev, sortBy: sortId })),
    sortDirection: (direction: 'asc' | 'desc') => setSearchState(prev => ({ ...prev, sortDirection: direction })),
    resetFilters: () => setSearchState({ search: '', filters: {}, sortBy: '', sortDirection: 'asc' }),
    toggleView: () => setHeroView(!heroView)
  };
  
  // Calculate stats
  const stats = {
    totalCount: cvProjects.length,
    featuredCount: cvProjects.filter(p => (p as unknown as Project).tags?.includes('featured')).length,
    techCount: new Set(cvProjects.flatMap(p => (p as unknown as Project).technologies || []).map(tech => tech.toLowerCase())).size,
    gluStakCount: 0 // Placeholder value
  };

  // Create filter groups
  const dynamicFilterGroups = helpers.generateFilterGroups();

  // Prepare search filter props
  const searchFilterProps: SearchFilterProps = {
    onSearch: handlers.search,
    onFilter: handlers.filter,
    onSort: handlers.sort,
    onSortDirectionChange: handlers.sortDirection,
    filterGroups: dynamicFilterGroups,
    sortOptions: formattedSortOptions,
    initialValues: { search, filters, sort: sortBy, sortDirection },
    loading,
    results: { count: projects.length, total: cvProjects.length },
    placeholder: "Search by project name, technology, or description...",
    title: "Advanced Search & Filters",
    primaryColor: theme.palette.primary.main,
    showSearchHistory: true,
    maxVisibleFilters: 3,
    compact: isMobile,
    debounceDelay: 300,
    enableSortDirection: true,
    enableFilterSearch: true
  };

  // Render helper for filter chips to reduce nested code
  const renderFilterChips = () => (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
      <Typography variant="caption" color="white">Active filters:</Typography>
      {Object.entries(filters).flatMap(([groupId, value]) => {
        const group = dynamicFilterGroups.find(g => g.id === groupId);
        if (!group) return [];
        
        if (Array.isArray(value)) {
          return value.map(optionId => {
            const option = group.options.find(o => o.id === optionId);
            if (!option) return null;
            return (
              <Chip
                key={`${groupId}-${optionId}`}
                size="small"
                label={`${group.label}: ${option.label}`}
                onDelete={() => {
                  setSearchState(prev => {
                    const updated = { ...prev.filters };
                    if (Array.isArray(updated[groupId])) {
                      updated[groupId] = updated[groupId].filter((v: string) => v !== optionId);
                      if (updated[groupId].length === 0) delete updated[groupId];
                    }
                    return { ...prev, filters: updated };
                  });
                }}
                color="primary"
                variant="outlined"
                sx={{ 
                  borderColor: 'white',
                  color: 'white',
                  '& .MuiChip-deleteIcon': { color: 'white' }
                }}
                disabled={loading}
              />
            );
          });
        } else {
          const option = group.options.find(o => o.id === value);
          if (!option) return [];
          return [(
            <Chip
              key={`${groupId}-${value}`}
              size="small"
              label={`${group.label}: ${option.label}`}
              onDelete={() => {
                setSearchState(prev => {
                  const updated = { ...prev.filters };
                  delete updated[groupId];
                  return { ...prev, filters: updated };
                });
              }}
              color="primary"
              variant="outlined"
              sx={{ 
                borderColor: 'white',
                color: 'white',
                '& .MuiChip-deleteIcon': { color: 'white' }
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
        onClick={handlers.resetFilters}
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
  );

  // Render industry card helper
  const renderIndustryCard = (industry: any, i: number) => {
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
          <Typography variant="body2">{industry.description}</Typography>
        </Box>
      </Grid>
    );
  };

  return (
    <ConsistentPageLayout
      seoTitle="GluStak-Powered Solutions & Client Success Stories"
      seoDescription="Discover how our GluStak technology drives successful client solutions across industries."
      seoKeywords="GluStak, solutions, case studies, success stories"
    >
      {/* Search UI */}
      {heroView ? (
        <UXOptimizedHero 
          search={search}
          setSearch={handlers.search}
          sortBy={sortBy}
          setSortBy={handlers.sort}
          sortOptions={formattedSortOptions}
          stats={stats}
          loading={loading}
          resultCount={projects.length}
          totalCount={cvProjects.length}
        />
      ) : (
        <Container maxWidth="xl" sx={{ my: 3 }}>
          <SearchFilterWrapper {...searchFilterProps} />
        </Container>
      )}

      {/* Toggle Button */}
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
          <Button 
            variant="outlined" 
            size="small"
            color="primary"
            onClick={handlers.toggleView}
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

      {/* Status Bar with Filter Chips */}
      <Box
        sx={{
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
                  ? "Filtering solutions..."
                  : projects.length === 0
                    ? "No matching solutions"
                    : `Showing ${projects.length} of ${cvProjects.length} solutions powered by GluStak`}
              </Typography>
              {loading && <CircularProgress size={16} />}
            </Box>
            
            {/* Filter chips */}
            {heroView && Object.keys(filters).length > 0 && renderFilterChips()}
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
                  No matching solutions found
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Try adjusting your filters or search terms
                </Typography>
                <Button variant="outlined" onClick={handlers.resetFilters}>Reset All Filters</Button>
              </Box>
            </Fade>
          )}
        </Box>

        {/* CTA Button */}
        <Box sx={{ textAlign: 'center', mt: 6, mb: 6 }}>
          <Button variant="contained" size="large" color="primary" 
            sx={{ py: 1.5, px: 4, fontWeight: 600 }}>
            Contact Us About GluStak for Your Business
          </Button>
        </Box>
      </Container>

      {/* Industries Section */}
      <Box sx={{ py: 6, backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)` }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 600 }}>
            Industries Transformed by GluStak
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {solutionsPageData.industries.map(renderIndustryCard)}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <PageSection>
        <FAQ 
          items={caseStudiesFaqItems} 
          title="GluStak Solutions FAQ"
          subtitle="Common questions about our GluStak technology"
          containerProps={{ maxWidth: "lg" }}
        />
      </PageSection>
    </ConsistentPageLayout>
  );
};

export default Solutions;