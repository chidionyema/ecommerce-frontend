'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme, Typography, Box, Container, Chip, useMediaQuery, Button, Grid, alpha, TextField, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard from '../components/Solutions/Projects/ProjectCard';
import ProjectGrid from '../components/Solutions/Projects/ProjectGrid';
import { cvProjects } from '../data/cvProjects';
import PageSection from '../components/PageSection';
import { SPACING, getSharedStyles } from '../utils/sharedStyles';
import FAQ from '../components/Common/FAQ';

// Import icons
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import StoreIcon from '@mui/icons-material/Store';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';

// Import the data
import { solutionsPageData } from '../data/solutionsPageData';

// Define FilterOption type
export interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactElement;
  color?: string;
}

// Define FilterCategory type
export interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

// Define CategoryFilter type
export type CategoryFilter = 'all' | 'cloud' | 'devops' | 'fintech' | 'ecommerce' | 'media';

// Define SelectedFiltersType
interface SelectedFiltersType {
  [key: string]: string[];
}

// Map industry titles to icons
const getIndustryIcon = (title: string): JSX.Element => {
    const iconMap: Record<string, JSX.Element> = {
        "Finance": <AccountBalanceIcon sx={{ fontSize: 40 }} />,
        "Healthcare": <HealthAndSafetyIcon sx={{ fontSize: 40 }} />,
        "Retail": <ShoppingCartIcon sx={{ fontSize: 40 }} />,
        "Cloud Services": <CloudIcon sx={{ fontSize: 40 }} />,
        "DevOps": <CodeIcon sx={{ fontSize: 40 }} />,
        "FinTech": <AttachMoneyIcon sx={{ fontSize: 40 }} />,
        "E-commerce": <StoreIcon sx={{ fontSize: 40 }} />,
        "Media": <PermMediaIcon sx={{ fontSize: 40 }} />,
        "Education": <SchoolIcon sx={{ fontSize: 40 }} />,
        "Manufacturing": <BuildIcon sx={{ fontSize: 40 }} />,
        "Professional Services": <WorkIcon sx={{ fontSize: 40 }} />
    };
    
    return iconMap[title] || <CloudIcon sx={{ fontSize: 40 }} />;
};

// Sample FAQ items for the Case Studies page
const caseStudiesFaqItems = [
  {
    question: "How do you measure the success of your client projects?",
    answer: "We measure success through several key metrics, including ROI, performance improvements, user adoption rates, and client satisfaction. Each case study documents concrete results such as cost reduction percentages, efficiency gains, revenue increases, or other measurable improvements that demonstrate the tangible value delivered to our clients."
  },
  {
    question: "Do your case studies represent your typical client engagements?",
    answer: "Our case studies showcase a diverse range of projects across different industries and technical challenges. While each client engagement is unique, these examples represent our typical approach to problem-solving, technical implementation, and client collaboration. They're selected to demonstrate both our technical capabilities and our ability to deliver measurable business results."
  },
  {
    question: "Can I speak with the clients featured in your case studies?",
    answer: "In many cases, yes. Subject to our clients' availability and with their prior permission, we can arrange reference calls with selected clients featured in our case studies. This allows you to hear firsthand about their experience working with us and the results achieved. Please contact us to discuss which reference clients would be most relevant to your needs."
  },
  {
    question: "What information is typically included in your case studies?",
    answer: "Our case studies typically include the client's industry and background, the business challenges they faced, our approach to solving those challenges, the specific technologies and methodologies we used, the implementation process, and most importantly, the quantifiable results and benefits achieved. We focus on providing concrete metrics and outcomes whenever possible."
  },
  {
    question: "How long do typical projects take from start to finish?",
    answer: "Project timelines vary significantly based on scope, complexity, and client requirements. Our case studies represent projects ranging from quick 2-3 month implementations to multi-year enterprise transformations. Each case study includes information about the project timeline, allowing you to understand our delivery capabilities for different types of engagements."
  }
];

const Solutions = () => {
    const theme = useTheme();
    const styles = getSharedStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // State for search and filtering
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({});
    const [sortValue, setSortValue] = useState<string>('');
    const [filteredProjects, setFilteredProjects] = useState(cvProjects);

    // Define filter categories
    const filterCategories: FilterCategory[] = [
        {
            id: 'challenge',
            label: 'Challenge Type',
            options: [
                { id: 'migration', label: 'Migration & Modernization' },
                { id: 'scalability', label: 'Scalability & Performance' },
                { id: 'integration', label: 'Integration & APIs' },
                { id: 'automation', label: 'Automation & DevOps' },
                { id: 'security', label: 'Security & Compliance' }
            ],
            multiSelect: true
        },
        {
            id: 'industry',
            label: 'Industry',
            options: solutionsPageData.industries.map(industry => ({
                id: industry.title.toLowerCase().replace(/\s+/g, '-'),
                label: industry.title
            })),
            multiSelect: true
        },
        {
            id: 'featured',
            label: 'Featured',
            options: [
                { id: 'featured', label: 'Featured Case Studies' }
            ],
            multiSelect: false
        }
    ];

    // Sort options
    const sortOptions = [
        { value: 'name_asc', label: 'Name (A-Z)' },
        { value: 'name_desc', label: 'Name (Z-A)' },
        { value: 'recent', label: 'Most Recent' },
        { value: 'impact', label: 'Highest Impact' },
        { value: 'featured', label: 'Featured First' }
    ];

    // Handle filter toggle
    const handleFilterToggle = useCallback((categoryId: string, filterId: string) => {
        setSelectedFilters((prev) => {
            const category = filterCategories.find((cat) => cat.id === categoryId);
            const isMultiSelect = category?.multiSelect !== false;
            
            if (isMultiSelect) {
                const currentFilters = prev[categoryId] || [];
                const isSelected = currentFilters.includes(filterId);
                
                return {
                    ...prev,
                    [categoryId]: isSelected
                        ? currentFilters.filter((id) => id !== filterId)
                        : [...currentFilters, filterId],
                };
            } else {
                const currentFilters = prev[categoryId] || [];
                const isSelected = currentFilters.includes(filterId);
                
                return {
                    ...prev,
                    [categoryId]: isSelected ? [] : [filterId],
                };
            }
        });
    }, [filterCategories]);

    // Handle sort change with proper type
    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortValue(event.target.value);
    };

    // Extract timeline information to use for sorting by most recent
    const getTimelineDate = (timeline: string): number => {
        try {
            // Try to extract the most recent date from timelines like "March 2023 – February 2024"
            const dateMatch = timeline.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/g);
            if (dateMatch && dateMatch.length > 0) {
                // Take the last match which is likely the end date
                const lastDate = dateMatch[dateMatch.length - 1];
                const [month, year] = lastDate.split(' ');
                
                const monthMap: Record<string, number> = {
                    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
                    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
                };
                
                return new Date(parseInt(year), monthMap[month], 1).getTime();
            }
            
            // If no match, try to find any year
            const yearMatch = timeline.match(/\d{4}/);
            if (yearMatch) {
                return new Date(parseInt(yearMatch[0]), 0, 1).getTime();
            }
        } catch (error) {
            console.error("Error parsing timeline date:", error);
        }
        
        // Default to oldest date if parsing fails
        return 0;
    };

    // Extract impact value for sorting by impact
    const getImpactValue = (project: typeof cvProjects[0]): number => {
        try {
            // Look for percentage improvements in the metrics
            const percentageMetrics = project.metrics?.filter(m => 
                m.value.includes('%') && !m.value.includes('-')
            );
            
            if (percentageMetrics && percentageMetrics.length > 0) {
                // Use the highest percentage as the impact score
                const highestPercentage = Math.max(...percentageMetrics.map(m => {
                    const match = m.value.match(/(\d+)%/);
                    return match ? parseInt(match[1], 10) : 0;
                }));
                
                return highestPercentage;
            }
            
            // Alternative: check for cost savings or revenue increases
            const costSavings = project.metrics?.find(m => 
                m.value.includes('£') || m.value.includes('$') || m.description.toLowerCase().includes('cost')
            );
            
            if (costSavings) {
                return 50; // Assign a medium-high score for projects with cost savings
            }
            
            // Check if "featured" is in tags
            if (project.tags?.includes('featured')) {
                return 40; // Assign a medium score for featured projects
            }
        } catch (error) {
            console.error("Error calculating impact value:", error);
        }
        
        // Default impact score
        return 0;
    };

    // Update filtered projects based on search, filters, and sort
    useEffect(() => {
        let result = [...cvProjects];

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                project => 
                    project.name.toLowerCase().includes(term) ||
                    project.clientName.toLowerCase().includes(term) ||
                    project.description.toLowerCase().includes(term) ||
                    (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(term)))
            );
        }

        // Filter by category/challenge
        if (selectedFilters.challenge && selectedFilters.challenge.length > 0) {
            result = result.filter(project => 
                project.tags?.some(tag => 
                    selectedFilters.challenge.includes(tag.toLowerCase())
                )
            );
        }

        // Filter by industry
        if (selectedFilters.industry && selectedFilters.industry.length > 0) {
            result = result.filter(project => {
                const projectIndustry = project.clientName?.toLowerCase().replace(/\s+/g, '-');
                return selectedFilters.industry.some(ind => projectIndustry?.includes(ind));
            });
        }

        // Filter featured projects
        if (selectedFilters.featured && selectedFilters.featured.includes('featured')) {
            result = result.filter(project => 
                project.tags?.includes('featured') ?? false
            );
        }

        // Apply sorting
        if (sortValue) {
            switch (sortValue) {
                case 'name_asc':
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name_desc':
                    result.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'recent':
                    // Sort by timeline information
                    result.sort((a, b) => {
                        const dateA = getTimelineDate(a.timeline);
                        const dateB = getTimelineDate(b.timeline);
                        return dateB - dateA; // Most recent first
                    });
                    break;
                case 'impact':
                    // Sort by our calculated impact value
                    result.sort((a, b) => {
                        const impactA = getImpactValue(a);
                        const impactB = getImpactValue(b);
                        return impactB - impactA; // Highest impact first
                    });
                    break;
                case 'featured':
                    result.sort((a, b) => {
                        const aFeatured = a.tags?.includes('featured') ?? false;
                        const bFeatured = b.tags?.includes('featured') ?? false;
                        if (aFeatured && !bFeatured) return -1;
                        if (!aFeatured && bFeatured) return 1;
                        return 0;
                    });
                    break;
                default:
                    break;
            }
        }

        setFilteredProjects(result);
    }, [searchTerm, selectedFilters, sortValue]);

    return (
        <ConsistentPageLayout
            seoTitle="Client Success Stories & Case Studies | GLUStack"
            seoDescription="Explore our portfolio of successful client projects and learn how we've helped businesses across industries solve complex technical challenges."
            seoKeywords="case studies, client success, project portfolio, technical solutions, business results"
            title="Case Studies"
            subtitle="Real results, real businesses"
        >
            {/* Hero Banner */}
            <Box
                sx={{
                    position: 'relative',
                    height: isMobile ? '50vh' : '40vh',
                    width: '100%',
                    backgroundColor: theme.palette.primary.main,
                    backgroundImage: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: SPACING.small,
                    borderRadius: { md: '0 0 40px 40px' },
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 700,
                                color: 'white',
                                mb: 2,
                            }}
                        >
                            Our Client Success Stories
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                                fontWeight: 300,
                                color: 'rgba(255,255,255,0.9)',
                                mb: 4,
                            }}
                        >
                            Discover how we've helped organizations overcome challenges and achieve measurable results
                        </Typography>

                        {/* Search and Sort */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                placeholder="Search case studies, industries, technologies..."
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
                                    endAdornment: searchTerm && (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                onClick={() => setSearchTerm('')}
                                                edge="end"
                                                sx={{ color: 'rgba(255,255,255,0.7)' }}
                                            >
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        borderRadius: 2,
                                        color: '#fff',
                                        height: 56,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255,255,255,0.3)',
                                        },
                                    },
                                }}
                            />
                            
                            <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                                <InputLabel id="sort-select-label" sx={{ color: 'rgba(255,255,255,0.7)' }}>Sort By</InputLabel>
                                <Select
                                    labelId="sort-select-label"
                                    value={sortValue}
                                    onChange={handleSortChange}
                                    label="Sort By"
                                    sx={{
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        color: '#fff',
                                        height: 56,
                                        borderRadius: 2,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255,255,255,0.3)',
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'rgba(255,255,255,0.7)',
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Default</em>
                                    </MenuItem>
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Filter Categories and Case Studies */}
            <PageSection>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h2" align="center" sx={{ mb: 3 }}>
                            Explore Our Case Studies
                        </Typography>
                        
                        {/* Filter Chips */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4, justifyContent: 'center' }}>
                            {filterCategories.map((category) => (
                                <React.Fragment key={category.id}>
                                    {category.options.map((option) => {
                                        const isSelected = (selectedFilters[category.id] || []).includes(option.id);
                                        
                                        return (
                                            <Chip
                                                key={`${category.id}-${option.id}`}
                                                label={option.label}
                                                clickable
                                                onClick={() => handleFilterToggle(category.id, option.id)}
                                                color={isSelected ? 'primary' : 'default'}
                                                variant={isSelected ? 'filled' : 'outlined'}
                                                sx={{ m: 0.5 }}
                                            />
                                        );
                                    })}
                                </React.Fragment>
                            ))}

                            {/* Clear filters chip */}
                            {Object.values(selectedFilters).some(values => values.length > 0) && (
                                <Chip
                                    label="Clear All"
                                    icon={<ClearIcon fontSize="small" />}
                                    onClick={() => {
                                        setSelectedFilters({});
                                        setSearchTerm('');
                                        setSortValue('');
                                    }}
                                    color="error"
                                    variant="outlined"
                                    sx={{ m: 0.5 }}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* Project Cards */}
                    <Box sx={{ mb: 6 }}>
                        {filteredProjects.length > 0 ? (
                            <ProjectGrid projects={filteredProjects} spacing={4} />
                        ) : (
                            <Box 
                                sx={{ 
                                    textAlign: 'center', 
                                    py: 8,
                                    px: 3, 
                                    borderRadius: '16px',
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                    border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                                }}
                            >
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No case studies match your criteria
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Try adjusting your search terms or filters to find what you're looking for.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedFilters({});
                                        setSortValue('');
                                    }}
                                    sx={{ mt: 2 }}
                                >
                                    Reset filters
                                </Button>
                            </Box>
                        )}
                    </Box>

                    {/* Statistics Counter Section */}
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center', 
                                p: 3, 
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                            }}>
                                <Typography variant="h3" color="primary.main" fontWeight="700">
                                    {filteredProjects.length}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Success Stories
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center', 
                                p: 3, 
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                            }}>
                                <Typography variant="h3" color="primary.main" fontWeight="700">
                                    {filteredProjects.filter(p => p.tags?.includes('featured') ?? false).length}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Featured Projects
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center', 
                                p: 3, 
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                            }}>
                                <Typography variant="h3" color="primary.main" fontWeight="700">
                                    {new Set(filteredProjects.flatMap(p => p.technologies || [])).size}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Technologies Used
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Call to Action */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: '30px',
                                fontWeight: 600,
                            }}
                        >
                            Contact Us For Your Success Story
                        </Button>
                    </Box>
                </Container>
            </PageSection>

            {/* Industries Section */}
            <PageSection
                sx={{
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(to bottom, #1a1a1a, #121212)'
                        : 'linear-gradient(to bottom, #f8f9fa, #f5f7fa)',
                    py: 6,
                    borderRadius: { md: '20px' },
                    mx: { md: 4 },
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" align="center" sx={{ mb: 4 }}>
                        Industries We've Transformed
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {solutionsPageData.industries.map((industry, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box
                                    sx={{
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        borderRadius: '10px',
                                        backgroundColor: theme.palette.background.paper,
                                        height: '100%',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2,
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {getIndustryIcon(industry.title)}
                                    </Box>

                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {industry.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {industry.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </PageSection>

            {/* FAQ Section */}
            <PageSection>
                <FAQ 
                    items={caseStudiesFaqItems} 
                    title="Case Studies FAQ"
                    subtitle="Common questions about our client success stories"
                    fullWidth={false}
                    containerProps={{ maxWidth: "lg" }}
                />
            </PageSection>
        </ConsistentPageLayout>
    );
};

export default Solutions;