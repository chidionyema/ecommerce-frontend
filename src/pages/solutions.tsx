import React, { useState, useEffect, useCallback } from 'react';
import { useTheme, Typography, Box, Container, Chip, useMediaQuery, Button, Grid, alpha, TextField, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard, { ProjectGrid } from '../components/Solutions/Projects/ProjectCard';
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

// Map industry titles to icons
const getIndustryIcon = (title: string): JSX.Element => {
    const iconMap = {
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

    // State for search and filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [sortValue, setSortValue] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(cvProjects);

    // Define filter categories
    const filterCategories = [
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

    // Handle filter toggle
    const handleFilterToggle = useCallback((categoryId, filterId) => {
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
            seoTitle="Enterprise Solutions | GLUStack"
            seoDescription="Transform your business with custom-engineered technology solutions designed for enterprise-level challenges and growth."
            seoKeywords="enterprise solutions, cloud architecture, DevOps, technical resources, custom technology"
            title="Solutions"
            subtitle="Engineered excellence for business growth"
        >
            {/* More Concise Hero Banner */}
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
                            {solutionsPageData.hero.title}
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
                            {solutionsPageData.hero.subtitle}
                        </Typography>

                        {/* Simplified Search */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                placeholder="Search solutions, technologies, industries..."
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
                                    onChange={(e) => setSortValue(e.target.value)}
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

            {/* Filter Categories and Featured Solutions */}
            <PageSection>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h2" align="center" sx={{ mb: 3 }}>
                            Explore Our Solutions
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

                    {/* Statistics Counter Section - Simplified */}
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
                                    Total Solutions
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
                            {solutionsPageData.showcaseSolutions.cta}
                        </Button>
                    </Box>
                </Container>
            </PageSection>

            {/* Industries Section - Simplified */}
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
                        Industries We Empower
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
                    items={solutionsFaqItems} 
                    title="Solutions FAQ"
                    subtitle="Answers to common questions"
                    fullWidth={false}
                    containerProps={{ maxWidth: "lg" }}
                />
            </PageSection>
        </ConsistentPageLayout>
    );
};

export default Solutions;