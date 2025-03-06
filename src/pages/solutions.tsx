import React, { useState, useEffect, useCallback } from 'react';
import { useTheme, Typography, Box, Container, Chip, useMediaQuery, Button, Fade, Grid, alpha, Collapse, TextField, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard, { ProjectGrid } from '../components/Solutions/Projects/ProjectCard';
import { cvProjects } from '../data/cvProjects';
import PageSection from '../components/PageSection';
import { SPACING, getSharedStyles } from '../utils/sharedStyles';
import SearchFilterComponent, { FilterCategory as ImportedFilterCategory } from '../components/Common/SearchFilterComponent';
import { motion } from 'framer-motion';

// Import FAQ component
import FAQ from '../components/Common/FAQ';
// Additional imports for enhanced features
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Import the data
import { solutionsPageData } from '../data/solutionsPageData';

// Import Material-UI icons for industry section
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import StoreIcon from '@mui/icons-material/Store';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


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

// Define the industry icon mapping type
interface IconMapping {
  [key: string]: JSX.Element;
}

// Map industry titles to icons
const getIndustryIcon = (title: string): JSX.Element => {
    const iconMap: IconMapping = {
        "Finance": <AccountBalanceIcon sx={{ fontSize: 40 }} />,
        "Healthcare": <HealthAndSafetyIcon sx={{ fontSize: 40 }} />,
        "Retail": <ShoppingCartIcon sx={{ fontSize: 40 }} />,
        "Cloud Services": <CloudIcon sx={{ fontSize: 40 }} />,
        "DevOps": <CodeIcon sx={{ fontSize: 40 }} />,
        "FinTech": <AttachMoneyIcon sx={{ fontSize: 40 }} />,
        "E-commerce": <StoreIcon sx={{ fontSize: 40 }} />,
        "Media": <PermMediaIcon sx={{ fontSize: 40 }} />
    };
    
    return iconMap[title] || <CloudIcon sx={{ fontSize: 40 }} />;
};

// Sample FAQ items for the Solutions page
const solutionsFaqItems = [
  {
    question: "How do you approach new solution development?",
    answer: "We follow a comprehensive process that begins with understanding your business needs and challenges. Our team conducts thorough research, creates a strategic roadmap, develops prototypes, and iteratively refines the solution based on feedback. Throughout development, we maintain open communication and ensure that the final product aligns perfectly with your business objectives."
  },
  {
    question: "Can you customize solutions for specific industry requirements?",
    answer: "Absolutely. We specialize in developing tailored solutions that address the unique challenges of different industries. Our team has extensive experience across various sectors including finance, healthcare, retail, and more. We incorporate industry-specific compliance requirements, workflows, and best practices to ensure our solutions are perfectly aligned with your specific needs."
  },
  {
    question: "What technologies do you typically use for solution development?",
    answer: "We utilize a wide range of cutting-edge technologies based on the specific requirements of each project. Our technology stack includes cloud platforms (AWS, Azure, GCP), modern frontend frameworks (React, Angular, Vue), robust backend solutions (Node.js, .NET, Python), and database technologies (SQL, NoSQL). We select the most appropriate technologies to ensure optimal performance, scalability, and maintainability."
  },
  {
    question: "How do you ensure security in your solutions?",
    answer: "Security is paramount in all our solutions. We implement industry-standard security practices including encryption, secure authentication methods, regular vulnerability assessments, and adherence to compliance standards such as GDPR, HIPAA, and PCI DSS where applicable. Our development process incorporates security at every stage, not just as an afterthought."
  },
  {
    question: "Do you provide support after the solution is deployed?",
    answer: "Yes, we offer comprehensive post-deployment support and maintenance services. This includes monitoring system performance, addressing any issues that arise, implementing updates, and making enhancements as your business evolves. We offer various support packages tailored to different needs, from basic technical support to full managed services."
  }
];

const Solutions = () => {
    const theme = useTheme();
    const styles = getSharedStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Animation and UI states
    const [animate, setAnimate] = useState(false);
    
    // State for search and filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [sortValue, setSortValue] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(cvProjects);

    // Define filter categories for the search component
    const filterCategories: FilterCategory[] = [
        {
            id: 'category',
            label: 'Solution Category',
            options: [
                { id: 'cloud', label: 'Cloud' },
                { id: 'devops', label: 'DevOps' },
                { id: 'fintech', label: 'FinTech' },
                { id: 'ecommerce', label: 'E-commerce' },
                { id: 'media', label: 'Media' }
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
                { id: 'featured', label: 'Featured Solutions' }
            ],
            multiSelect: false
        }
    ];

    // Sort options
    const sortOptions = [
        { value: 'name_asc', label: 'Name (A-Z)' },
        { value: 'name_desc', label: 'Name (Z-A)' },
        { value: 'featured', label: 'Featured First' }
    ];

    // Handle search
    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    // Handle filter toggle
    const handleFilterToggle = useCallback((categoryId: string, filterId: string) => {
        setSelectedFilters((prev) => {
            const category = filterCategories.find((cat) => cat.id === categoryId);
            const isMultiSelect = category?.multiSelect !== false;
            
            // For multi-select, toggle the filter in the array
            if (isMultiSelect) {
                const currentFilters = prev[categoryId] || [];
                const isSelected = currentFilters.includes(filterId);
                
                return {
                    ...prev,
                    [categoryId]: isSelected
                        ? currentFilters.filter((id) => id !== filterId)
                        : [...currentFilters, filterId],
                };
            } 
            // For single-select, replace the entire array
            else {
                const currentFilters = prev[categoryId] || [];
                const isSelected = currentFilters.includes(filterId);
                
                return {
                    ...prev,
                    [categoryId]: isSelected ? [] : [filterId],
                };
            }
        });
    }, [filterCategories]);

    // Handle sort
    const handleSort = useCallback((value: string) => {
        setSortValue(value);
    }, []);

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
                    project.technologies.some(tech => tech.toLowerCase().includes(term))
            );
        }

        // Filter by category
        if (selectedFilters.category && selectedFilters.category.length > 0) {
            result = result.filter(project => 
                project.tags?.some(tag => 
                    selectedFilters.category.includes(tag.toLowerCase())
                )
            );
        }

        // Filter by industry (assuming projects have an industry property)
        if (selectedFilters.industry && selectedFilters.industry.length > 0) {
            result = result.filter(project => {
                // This is an assumption - modify according to your actual data structure
                const projectIndustry = project.clientName?.toLowerCase().replace(/\s+/g, '-');
                return selectedFilters.industry.some(ind => projectIndustry?.includes(ind));
            });
        }

        // Filter featured projects using tags instead of a featured property
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

    // Animate content on mount
    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <ConsistentPageLayout
            seoTitle="Premium Enterprise Solutions | GLUStack"
            seoDescription="Transform your business with our custom-engineered technology solutions designed for enterprise-level challenges and growth."
            seoKeywords="enterprise solutions, cloud architecture, DevOps, technical resources, custom technology"
            title="Transformative Solutions"
            subtitle="Engineered excellence that powers business growth"
        >
            {/* Hero Banner Enhancement with Modern Search */}
            <Box
                sx={{
                    position: 'relative',
                    height: isMobile ? '70vh' : '65vh',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundImage: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: SPACING.small,
                    borderRadius: { md: '0 0 40px 40px' },
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
            >
                {/* Background elements for modern look */}
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

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'url(/images/solutions-hero-bg.jpg) center center no-repeat',
                        backgroundSize: 'cover',
                        opacity: 0, // Setting to 0 initially
                        zIndex: 0,
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <Fade in={animate} timeout={1000}>
                        <Box>
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0, y: 30 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ duration: 0.6 }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '2.5rem', md: '4rem' },
                                        fontWeight: 800,
                                        color: 'white',
                                        mb: 2,
                                        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    {solutionsPageData.hero.title}
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        fontWeight: 300,
                                        color: 'rgba(255,255,255,0.9)',
                                        mb: 4,
                                        maxWidth: '800px',
                                        mx: 'auto',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {solutionsPageData.hero.subtitle}
                                </Typography>

                                {/* Modern Search & Filter Box */}
                                <Box sx={{ maxWidth: '850px', mx: 'auto', mb: 4 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', sm: 'row' },
                                            alignItems: { xs: 'stretch', sm: 'center' },
                                            gap: 2,
                                            mb: { xs: 2, md: 0 },
                                            width: '100%',
                                        }}
                                    >
                                        <TextField
                                            placeholder="Search for solutions, technologies, or industries..."
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
                                                    '& input::placeholder': {
                                                        color: 'rgba(255,255,255,0.7)',
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                            sx={{ flex: 3 }}
                                        />
                                        
                                        {sortOptions && (
                                            <FormControl
                                                variant="outlined"
                                                sx={{
                                                    minWidth: 150,
                                                    '& .MuiOutlinedInput-root': {
                                                        color: '#fff',
                                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                                        height: 56,
                                                        borderRadius: 2,
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
                                                    '& .MuiInputLabel-root': {
                                                        color: 'rgba(255,255,255,0.7)',
                                                    },
                                                    '& .MuiSelect-icon': {
                                                        color: 'rgba(255,255,255,0.7)',
                                                    },
                                                }}
                                            >
                                                <InputLabel id="sort-select-label" sx={{ color: 'rgba(255,255,255,0.7)' }}>Sort By</InputLabel>
                                                <Select
                                                    labelId="sort-select-label"
                                                    value={sortValue}
                                                    onChange={(e) => handleSort(e.target.value)}
                                                    label="Sort By"
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
                                        )}
                                    </Box>
                                </Box>

                                {/* Filter Chips */}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3, justifyContent: 'center' }}>
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
                                                        color={isSelected ? 'secondary' : 'default'}
                                                        variant={isSelected ? 'filled' : 'outlined'}
                                                        sx={{
                                                            bgcolor: isSelected ? 'secondary.main' : 'rgba(255,255,255,0.15)',
                                                            color: '#fff',
                                                            borderColor: 'rgba(255,255,255,0.3)',
                                                            fontWeight: 500,
                                                            '&:hover': {
                                                                bgcolor: isSelected ? 'secondary.dark' : 'rgba(255,255,255,0.25)',
                                                            },
                                                            '& .MuiChip-deleteIcon': {
                                                                color: 'rgba(255,255,255,0.7)',
                                                                '&:hover': {
                                                                    color: '#fff',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}

                                    {/* Clear filters chip if any filters are active */}
                                    {Object.values(selectedFilters).some(values => values.length > 0) && (
                                        <Chip
                                            label="Clear All Filters"
                                            icon={<ClearIcon fontSize="small" />}
                                            onClick={() => {
                                                setSelectedFilters({});
                                                setSearchTerm('');
                                                setSortValue('');
                                            }}
                                            sx={{
                                                bgcolor: 'error.main',
                                                color: '#fff',
                                                fontWeight: 500,
                                                '&:hover': {
                                                    bgcolor: 'error.dark',
                                                },
                                            }}
                                        />
                                    )}
                                </Box>

                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        mt: 5,
                                        borderRadius: '30px',
                                        fontWeight: 600,
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {solutionsPageData.hero.cta}
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Container>
            </Box>

            {/* What are GLUStack's Solutions Section */}
            <PageSection>
                <Container maxWidth="md">
                    <Fade in={animate} timeout={1500}>
                        <Box>
                            <Typography
                                variant="h3"
                                component="h2"
                                align="center"
                                sx={{
                                    ...styles.pageTitle,
                                    color: theme.palette.text.primary,
                                    mb: SPACING.medium,
                                    fontWeight: 700,
                                    position: 'relative',
                                    display: 'inline-block',
                                    '&:after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '60px',
                                        height: '4px',
                                        bottom: '-15px',
                                        left: 'calc(50% - 30px)',
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: '2px',
                                    }
                                }}
                            >
                                {solutionsPageData.whatSetsApart.heading}
                            </Typography>

                            <Box
                                sx={{
                                    mt: 5,
                                    mb: SPACING.large,
                                    p: { xs: 3, md: 4 },
                                    borderRadius: '16px',
                                    background: theme.palette.mode === 'dark'
                                        ? 'linear-gradient(145deg, #1a237e11, #3949ab22)'
                                        : 'linear-gradient(145deg, #e3f2fd, #bbdefb)',
                                    boxShadow: theme.palette.mode === 'dark'
                                        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                                        : '0 8px 32px rgba(33, 150, 243, 0.1)',
                                    border: theme.palette.mode === 'dark'
                                        ? '1px solid rgba(255, 255, 255, 0.05)'
                                        : '1px solid rgba(25, 118, 210, 0.05)',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    align="center"
                                    sx={{
                                        lineHeight: 1.8,
                                        fontSize: '1.1rem',
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {solutionsPageData.whatSetsApart.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Fade>
                </Container>
            </PageSection>

            {/* Our Featured Solutions Section with Search Filter */}
            <PageSection
                sx={{
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(to bottom, #121212, #1a1a1a)'
                        : 'linear-gradient(to bottom, #f5f7fa, #f8f9fa)',
                    py: 8,
                    borderRadius: { md: '20px' },
                    mx: { md: 4 },
                    boxShadow: theme.palette.mode === 'dark'
                        ? 'none'
                        : '0 10px 40px rgba(0, 0, 0, 0.04)',
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        align="center"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            mb: 1,
                            position: 'relative',
                            display: 'inline-block',
                            '&:after': {
                                content: '""',
                                position: 'absolute',
                                width: '60px',
                                height: '4px',
                                bottom: '-15px',
                                left: 'calc(50% - 30px)',
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: '2px',
                            }
                        }}
                    >
                        {solutionsPageData.showcaseSolutions.heading}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        sx={{
                            mt: 3,
                            mb: 5,
                            maxWidth: '700px',
                            mx: 'auto',
                        }}
                    >
                        {solutionsPageData.showcaseSolutions.description}
                    </Typography>

                    {/* Modern stats display for solutions */}
                    <Grid container spacing={4} sx={{ 
                        pt: 5, 
                        pb: { xs: 3, md: 5 },
                        opacity: filteredProjects.length === 0 ? 0.5 : 1, 
                        transition: 'opacity 0.3s ease',
                    }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center', 
                                p: 2, 
                                height: '100%',
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                                    borderColor: theme.palette.primary.main,
                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                },
                            }}>
                                <Typography variant="h3" color="primary.main" fontWeight="800" sx={{ mb: 1 }}>
                                    {filteredProjects.length}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Total Solutions
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center', 
                                p: 2, 
                                height: '100%',
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-5px)',
                                    boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                                    borderColor: theme.palette.primary.main,
                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                },
                            }}>
                                <Typography variant="h3" color="primary.main" fontWeight="800" sx={{ mb: 1 }}>
                                    {filteredProjects.filter(p => p.tags?.includes('featured') ?? false).length}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Featured Projects
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center', 
                                p: 2, 
                                height: '100%',
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                                    borderColor: theme.palette.primary.main,
                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                },
                            }}>
                                <Typography variant="h3" color="primary.main" fontWeight="800" sx={{ mb: 1 }}>
                                    {/* Calculate unique technologies */}
                                    {new Set(
                                        filteredProjects.flatMap(p => p.technologies || [])
                                    ).size}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Technologies Used
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Project Cards with Animation */}
                    <Fade in={animate} timeout={500}>
                        <Box>
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
                                        No solutions match your criteria
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
                    </Fade>

                    {/* Call to Action */}
                    <Box
                        sx={{
                            textAlign: 'center',
                            mt: 6,
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: '30px',
                                fontWeight: 600,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                },
                            }}
                        >
                            {solutionsPageData.showcaseSolutions.cta}
                        </Button>
                    </Box>
                </Container>
            </PageSection>

            {/* Industries We Serve Section */}
            <PageSection>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            position: 'relative',
                            textAlign: 'center',
                            mb: 6,
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h2"
                            align="center"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: 700,
                                mb: 1,
                                position: 'relative',
                                display: 'inline-block',
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '60px',
                                    height: '4px',
                                    bottom: '-15px',
                                    left: 'calc(50% - 30px)',
                                    backgroundColor: theme.palette.primary.main,
                                    borderRadius: '2px',
                                }
                            }}
                        >
                            Industries We Empower
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            align="center"
                            color="text.secondary"
                            sx={{
                                mt: 3,
                                mb: 2,
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            Our tailored solutions address unique challenges across various sectors
                        </Typography>
                    </Box>

                    <Grid container spacing={3} justifyContent="center">
                        {solutionsPageData.industries.map((industry, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Fade in={animate} timeout={700 + (index * 300)}>
                                    <Box
                                        sx={{
                                            p: 4,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            borderRadius: '16px',
                                            backgroundColor: theme.palette.mode === 'dark'
                                                ? alpha(theme.palette.primary.main, 0.05)
                                                : alpha(theme.palette.primary.main, 0.03),
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: theme.palette.mode === 'dark'
                                                    ? '0 10px 30px rgba(0, 0, 0, 0.2)'
                                                    : '0 10px 30px rgba(33, 150, 243, 0.1)',
                                                backgroundColor: theme.palette.mode === 'dark'
                                                    ? alpha(theme.palette.primary.main, 0.1)
                                                    : alpha(theme.palette.primary.main, 0.05),
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '50%',
                                                mb: 3,
                                                backgroundColor: theme.palette.mode === 'dark'
                                                    ? alpha(theme.palette.primary.main, 0.1)
                                                    : alpha(theme.palette.primary.main, 0.08),
                                                color: theme.palette.primary.main,
                                            }}
                                        >
                                            {getIndustryIcon(industry.title)}
                                        </Box>

                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 2,
                                            }}
                                        >
                                            {industry.title}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            {industry.description}
                                        </Typography>
                                    </Box>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </PageSection>

            {/* FAQ Section - Added to the Solutions page */}
            <PageSection
                sx={{
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(to bottom, #1a1a1a, #121212)'
                        : 'linear-gradient(to bottom, #f8f9fa, #f5f7fa)',
                    py: 8,
                    borderRadius: { md: '20px' },
                    mx: { md: 4 },
                    mb: { xs: 8, md: 12 },
                    boxShadow: theme.palette.mode === 'dark'
                        ? 'none'
                        : '0 10px 40px rgba(0, 0, 0, 0.04)',
                }}
            >
                <FAQ 
                    items={solutionsFaqItems} 
                    title="Solutions FAQ"
                    subtitle="Answers to common questions about our enterprise solutions"
                    fullWidth={false}
                    containerProps={{ maxWidth: "lg" }}
                />
            </PageSection>
        </ConsistentPageLayout>
    );
};

export default Solutions;