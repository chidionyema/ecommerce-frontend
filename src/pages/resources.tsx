import React, { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Box, Typography, Container, Grid, Card, CardContent, 
  TextField, InputAdornment, Button, Chip, Avatar, 
  useTheme, alpha, Tab, Tabs, IconButton, Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  BookOutlined,
  VideoLibrary,
  Article,
  Code,
  Download,
  Share,
  ArrowForward,
  Bookmark,
  BookmarkBorder
} from '@mui/icons-material';
import ConsistentPageLayout from '../components/Shared/ConsistentPageLayout';

// Define our resource data structure
interface ResourceData {
  id: string;
  title: string;
  type: string;
  image?: string;
  description: string;
  tags: string[];
  url: string;
  date: string;
  author?: string;
  authorImage?: string;
  featured?: boolean;
  downloadable?: boolean;
  readTime?: string;
}

// Sample resources data
const resourcesData: ResourceData[] = [
  {
    id: "1",
    title: "Getting Started with GLUStack",
    type: "Article",
    description: "Learn the basics of using GLUStack in your projects.",
    tags: ["Beginner", "Tutorial", "Setup"],
    url: "/resources/getting-started",
    date: "Jan 15, 2023",
    featured: true,
    readTime: "10 min read"
  },
  {
    id: "2",
    title: "Advanced Authentication Patterns",
    type: "Article",
    description: "Implement secure authentication in your applications.",
    tags: ["Authentication", "Security", "Advanced"],
    url: "/resources/authentication",
    date: "Feb 10, 2023",
    featured: true,
    readTime: "15 min read"
  },
  {
    id: "3",
    title: "Building Scalable APIs",
    type: "Video",
    description: "Design and implement scalable API architectures.",
    tags: ["API", "Backend", "Architecture"],
    url: "/resources/scalable-apis",
    date: "Mar 5, 2023",
    featured: false,
    readTime: "25 min watch"
  },
  {
    id: "4",
    title: "Performance Optimization Guide",
    type: "eBook",
    description: "Learn techniques to optimize your application's performance.",
    tags: ["Performance", "Optimization", "Advanced"],
    url: "/resources/performance",
    date: "Apr 20, 2023",
    downloadable: true,
    readTime: "1 hour read"
  },
  {
    id: "5",
    title: "Responsive UI Components",
    type: "Code",
    description: "Ready-to-use responsive UI components for your projects.",
    tags: ["UI", "Components", "Frontend"],
    url: "/resources/ui-components",
    date: "May 15, 2023",
    downloadable: true,
    readTime: "30 min"
  },
  {
    id: "6",
    title: "Database Migration Strategies",
    type: "Article",
    description: "Best practices for managing database migrations.",
    tags: ["Database", "Migration", "DevOps"],
    url: "/resources/database-migrations",
    date: "Jun 8, 2023",
    featured: false,
    readTime: "12 min read"
  }
];

// Define interface for SectionHeader props
interface SectionHeaderProps {
  overline: string;
  title: string;
  subtitle: string;
  button?: ReactNode;
}

// Define interface for ResourceCard props
interface ResourceCardProps {
  resource: ResourceData;
}

// Define interface for FilterChip props
interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

// Reusable components - simplified
const SectionHeader: React.FC<SectionHeaderProps> = ({ overline, title, subtitle, button = null }) => {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      {overline && (
        <Typography
          variant="overline"
          component="div"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            letterSpacing: 1.2,
            mb: 1,
            textTransform: 'uppercase',
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
          fontSize: { xs: '2rem', md: '2.5rem' },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          mb: 3,
          maxWidth: '800px',
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </Typography>
      {button}
    </Box>
  );
};

// Component for resource cards
const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const theme = useTheme();
  const [saved, setSaved] = useState(false);
  
  // Get icon based on resource type
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'ebook': return <BookOutlined />;
      case 'video': return <VideoLibrary />;
      case 'article': return <Article />;
      case 'code': return <Code />;
      default: return <Article />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card 
        elevation={2}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme.shadows[8],
          },
        }}
      >
        {/* Resource image */}
        <Box
          sx={{
            position: 'relative',
            height: 200,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Type indicator chip */}
          <Chip
            icon={getTypeIcon(resource.type)}
            label={resource.type}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(4px)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          />
          
          {/* Save/bookmark button */}
          <IconButton
            size="small"
            onClick={() => setSaved(!saved)}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 1),
              },
            }}
          >
            {saved ? <Bookmark color="primary" /> : <BookmarkBorder />}
          </IconButton>
          
          {/* Download indicator */}
          {resource.downloadable && (
            <Tooltip title="Downloadable resource">
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(4px)',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 1),
                  },
                }}
              >
                <Download fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          {/* Title */}
          <Typography 
            variant="h6" 
            component="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 600, 
              lineHeight: 1.3, 
              mb: 1 
            }}
          >
            {resource.title}
          </Typography>
          
          {/* Description */}
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 2, flexGrow: 1 }}
          >
            {resource.description}
          </Typography>
          
          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {resource.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: '0.7rem',
                }}
              />
            ))}
          </Box>
          
          {/* Author and date or read time */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
            {resource.author ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={resource.authorImage}
                  alt={resource.author}
                  sx={{ width: 28, height: 28, mr: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {resource.author}
                </Typography>
              </Box>
            ) : (
              <Box />
            )}
            
            <Typography variant="caption" color="text.secondary">
              {resource.readTime || resource.date}
            </Typography>
          </Box>
          
          {/* CTA button */}
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForward />}
            sx={{
              mt: 2,
              textTransform: 'none',
              borderRadius: 6,
              py: 1,
            }}
            fullWidth
          >
            {resource.downloadable ? 'Download' : 'Read Now'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Filter chip component
const FilterChip: React.FC<FilterChipProps> = ({ label, active, onClick }) => {
  const theme = useTheme();
  
  return (
    <Chip
      label={label}
      onClick={onClick}
      sx={{
        borderRadius: '16px',
        fontWeight: 500,
        backgroundColor: active ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.1),
        color: active ? theme.palette.primary.contrastText : theme.palette.primary.main,
        '&:hover': {
          backgroundColor: active ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.2),
        },
      }}
    />
  );
};

const ResourcesPage: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  
  // Filter resources by search query, category, and tab
  const filteredResources = resourcesData.filter(resource => {
    // Filter by search query
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by category
    const matchesCategory = activeCategory === 'all' || 
      resource.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase());
    
    // Filter by tab (0 = all, 1 = featured)
    const matchesTab = activeTab === 0 || (activeTab === 1 && resource.featured);
    
    return matchesSearch && matchesCategory && matchesTab;
  });
  
  // Get unique tags for filter
  const allTags = Array.from(new Set(resourcesData.flatMap(resource => resource.tags)));
  
  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <ConsistentPageLayout
      title="Knowledge Resources"
      subtitle="Explore our library of resources to help you master GLUStack and accelerate your projects"
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero section */}
        <Box 
          sx={{ 
            position: 'relative',
            width: '100%',
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            mb: 8,
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background decoration */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '50%',
              background: `radial-gradient(circle at 70% 50%, ${alpha(theme.palette.primary.main, 0.15)}, transparent 70%)`,
              zIndex: 0,
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '800px', mx: 'auto' }}>
            <Typography 
              variant="h2" 
              component="h1"
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
              }}
            >
              Expand Your Knowledge
            </Typography>
            
            <Typography 
              variant="h6"
              component="p"
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 4,
                fontWeight: 'normal',
                lineHeight: 1.6,
              }}
            >
              Discover guides, tutorials, case studies, and code samples to help you build better applications with our framework.
            </Typography>
            
            {/* Search bar */}
            <Box 
              component="form" 
              sx={{ 
                display: 'flex',
                maxWidth: '600px',
                mx: 'auto',
              }}
              onSubmit={(e) => {
                e.preventDefault();
                setSearchQuery(searchRef.current?.value || '');
              }}
            >
              <TextField
                fullWidth
                inputRef={searchRef}
                placeholder="Search for resources..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    borderRadius: '28px',
                    '& fieldset': {
                      borderColor: alpha(theme.palette.divider, 0.2),
                    },
                  },
                }}
                sx={{ 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  ml: 1,
                  borderRadius: '28px',
                  px: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>
        
        {/* Filter section */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
                <FilterIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                <Typography variant="subtitle2" sx={{ mr: 2 }}>
                  Filter by:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <FilterChip 
                    label="All" 
                    active={activeCategory === 'all'} 
                    onClick={() => setActiveCategory('all')} 
                  />
                  {allTags.slice(0, 5).map((tag, index) => (
                    <FilterChip
                      key={index}
                      label={tag}
                      active={activeCategory === tag}
                      onClick={() => setActiveCategory(tag)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    minWidth: 'unset',
                    px: 2,
                  },
                }}
              >
                <Tab label="All Resources" />
                <Tab label="Featured" />
              </Tabs>
            </Grid>
          </Grid>
        </Box>
        
        {/* Resources grid */}
        {filteredResources.length > 0 ? (
          <Grid container spacing={3}>
            {filteredResources.map((resource) => (
              <Grid item xs={12} sm={6} md={4} key={resource.id}>
                <ResourceCard resource={resource} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" component="p" gutterBottom>
              No resources found
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Try adjusting your search or filter criteria
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                if (searchRef.current) searchRef.current.value = '';
              }}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
        
        {/* CTA section */}
        <Box
          sx={{
            mt: 10,
            p: 4,
            textAlign: 'center',
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 4,
          }}
        >
          <SectionHeader
            overline="Contribute"
            title="Share Your Knowledge"
            subtitle="Have insights or experiences with GLUStack that could help others? Submit your own content to our resource library."
            button={
              <Button
                variant="contained"
                size="large"
                endIcon={<Share />}
                sx={{
                  mt: 2,
                  borderRadius: 28,
                  px: 4,
                  py: 1,
                }}
              >
                Submit a Resource
              </Button>
            }
          />
        </Box>
      </Container>
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;