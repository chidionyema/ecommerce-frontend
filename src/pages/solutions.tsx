import React, { useState, useEffect, useCallback } from 'react';
import { useTheme, Typography, Box, Container, useMediaQuery, Button, Fade, Grid, alpha } from '@mui/material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';
import ProjectCard, { ProjectGrid } from '../components/Solutions/Projects/ProjectCard';
import { cvProjects } from '../data/cvProjects';
import PageSection from '../components/PageSection';
import { SPACING, getSharedStyles } from '../utils/sharedStyles';

// Import FAQ component
import FAQ from '../components/Common/FAQ';
// Additional imports for enhanced features
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

    // Animation states
    const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
    const [animate, setAnimate] = useState(false);

    // Explicitly type the categories array
    const categories: CategoryFilter[] = ['all', 'cloud', 'devops', 'fintech', 'ecommerce', 'media'];

    // Filter projects based on the active filter
    const filteredProjects = activeFilter === 'all'
        ? cvProjects.filter((project) =>
            project && typeof project.id === 'string' && project.id.trim() !== ''
        )
        : cvProjects.filter((project) =>
            project &&
            typeof project.id === 'string' &&
            project.id.trim() !== '' &&
            project.tags?.some(tag => tag.toLowerCase() === activeFilter)
        );

    // Animate content on mount
    useEffect(() => {
        setAnimate(true);
    }, []);

    // Handle filter change
    const handleFilterChange = (filter: CategoryFilter) => {
        setAnimate(false);
        setTimeout(() => {
            setActiveFilter(filter);
            setAnimate(true);
        }, 300);
    };

    return (
        <ConsistentPageLayout
            seoTitle="Premium Enterprise Solutions | GLUStack"
            seoDescription="Transform your business with our custom-engineered technology solutions designed for enterprise-level challenges and growth."
            seoKeywords="enterprise solutions, cloud architecture, DevOps, technical resources, custom technology"
            title="Transformative Solutions"
            subtitle="Engineered excellence that powers business growth"
        >
            {/* Hero Banner Enhancement */}
            <Box
                sx={{
                    position: 'relative',
                    height: isMobile ? '50vh' : '50vh',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundImage: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: SPACING.small,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'url(/images/solutions-hero-bg.jpg) center center no-repeat',
                        backgroundSize: 'cover',
                        opacity: 0.2,
                        zIndex: 1,
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <Fade in={animate} timeout={1000}>
                        <Box>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '4rem' },
                                    fontWeight: 700,
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
                                    color: 'white',
                                    mb: 4,
                                    maxWidth: '800px',
                                    mx: 'auto',
                                    opacity: 0.9,
                                }}
                            >
                                {solutionsPageData.hero.subtitle}
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '30px',
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    fontWeight: 600,
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {solutionsPageData.hero.cta}
                            </Button>
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

            {/* Our Featured Solutions Section */}
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

                    {/* Project Filters */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 1.5,
                            mb: 5,
                        }}
                    >
                        {categories.map((category) => (
                            <Button
                                key={category}
                                onClick={() => handleFilterChange(category)}
                                variant={activeFilter === category ? "contained" : "outlined"}
                                size="medium"
                                sx={{
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '30px',
                                    textTransform: 'capitalize',
                                    fontWeight: 500,
                                    transition: 'all 0.2s ease',
                                    backgroundColor: activeFilter === category
                                        ? theme.palette.primary.main
                                        : 'transparent',
                                    color: activeFilter === category
                                        ? theme.palette.primary.contrastText
                                        : theme.palette.text.primary,
                                    borderColor: theme.palette.primary.main,
                                    '&:hover': {
                                        backgroundColor: activeFilter === category
                                            ? theme.palette.primary.dark
                                            : alpha(theme.palette.primary.main, 0.1),
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                {category === 'all' ? 'All Solutions' : category.charAt(0).toUpperCase() + category.slice(1)}
                            </Button>
                        ))}
                    </Box>

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
                                        onClick={() => handleFilterChange('all')}
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