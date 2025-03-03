// src/data/resourcesPageData.ts
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
    PersonOutline as PersonOutlineIcon,
  } from '@mui/icons-material';
  import { SvgIconTypeMap } from '@mui/material';
  import { OverridableComponent } from '@mui/material/OverridableComponent';
  
  type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
  }
  
  interface Resource {
    id: number;
    title: string;
    summary: string;
    icon: MuiIcon;
    path: string;
    downloads: string;
    trending: boolean;
    time: string;
    rating: number;
    reviewCount: number;
    lastUpdated: string;
    level: string;
    tags: string[];
  }
  
  interface Benefit {
    title: string;
    description: string;
    icon: MuiIcon;
  }
  
  interface Testimonial {
      id: number;
      name: string;
      role: string;
      avatar: string;
      comment: string;
      resource: string;
      rating: number;
  }
  
  interface Stat {
      label: string;
      value: string;
  }
  
  // Free Resources
  export const freeResources: Resource[] = [
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
      tags: ['Cloud', 'Infrastructure', 'Basics'],
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
      tags: ['Security', 'Vaults', 'Protection'],
    },
    {
      id: 3,
      title: 'Introduction to API Security',
      summary:
        'Learn how to secure APIs with best practices and minimal overhead.',
      icon: SecurityIcon,
      path: '/free-resources/api-security',
      downloads: '1.1K+',
      trending: false,
      time: '15 min read',
      rating: 4.6,
      reviewCount: 159,
      lastUpdated: '3 weeks ago',
      level: 'Intermediate',
      tags: ['API', 'Security', 'Best Practices'],
    },
  ];
  
  // Premium Resources
  export const premiumResources: Resource[] = [
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
      tags: ['Cloud', 'Infrastructure', 'Complete'],
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
      tags: ['Security', 'Vaults', 'Premium'],
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
      tags: ['Architecture', 'Patterns', 'Production'],
    },
  ];
  
  // Testimonials
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Developer at TechCorp',
      avatar: 'https://i.pravatar.cc/150?img=1',
      comment:
        'The premium resources saved our team weeks of development time. The code is clean, well-documented, and production-ready.',
      resource: 'Cloud Mastery',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO at StartupX',
      avatar: 'https://i.pravatar.cc/150?img=2',
      comment:
        "I've tried many resources, but these are exceptionally well-crafted. The Security Vaults package helped us pass our security audit with flying colors.",
      resource: 'Security Vaults',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Lead Architect at EnterpriseY',
      avatar: 'https://i.pravatar.cc/150?img=3',
      comment:
        'The Code Architect resource transformed how we approach our system design. Highly recommended for any serious development team.',
      resource: 'Code Architect',
      rating: 5,
    },
  ];
  
  // Benefits
  export const benefits: Benefit[] = [
    {
      title: 'Time-Saving Solutions',
      description:
        'Our production-ready resources cut development time by up to 70%',
      icon: AccessTimeIcon,
    },
    {
      title: 'Expert-Reviewed Code',
      description:
        'All resources are vetted by industry experts and follow best practices',
      icon: CheckCircleIcon,
    },
    {
      title: 'Continuous Updates',
      description:
        'Resources are regularly updated to match evolving industry standards',
      icon: CloudIcon,
    },
    {
      title: 'Comprehensive Support',
      description:
        'Premium subscribers get dedicated email support from our experts',
      icon: PersonOutlineIcon,
    },
  ];
  
  // Stats
  export const stats: Stat[] = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Total Downloads', value: '50K+' },
    { label: 'Success Rate', value: '98%' },
    { label: 'Time Saved', value: '100K+ hrs' },
  ];
  
  export const filterOptions = [
      { label: 'All', value: 'all' },
      { label: 'Trending', value: 'trending' },
      { label: 'Beginner', value: 'beginner' },
      { label: 'Advanced', value: 'advanced' }
  ];
  
  export const heroSection = {
      title: "Production Grade Resources for Modern Developers",
      subtitle: "Accelerate your development with production-ready code, comprehensive documentation, and expert-crafted resources.",
      searchPlaceholder: "Search resources...",
      getPremiumButtonText: "Get Premium",
  }
  
  export const benefitsSection = {
      overline: "WHY CHOOSE OUR RESOURCES",
      title: "Accelerate Your Development",
      subtitle: "Our resources are designed by industry experts to help you ship faster, reduce costs, and implement best practices from day one."
  }
  
  export const premiumSection = {
      overline: "PREMIUM COLLECTION",
      title: "Production-Ready Resources",
      subtitle: "Access our comprehensive premium collection designed to save you weeks of development time with tested, documented, and optimized solutions.",
      upgradeButtonText: "Upgrade to Premium",
  
  }
  
  export const testimonialSection = {
      overline: "SUCCESS STORIES",
      title: "What Developers Are Saying",
  }
  
  export const freeResourcesSection = {
      overline: "FREE RESOURCES",
      title: "Get Started with Free Resources",
      subtitle: "Explore our collection of free resources to learn essential concepts and fundamental techniques.",
      noResultsMessage: "No free resources match your search criteria",
      resetFiltersText: "Reset Filters",
  }
  
  export const ctaSection = {
      title: "Ready to Accelerate Your Development?",
      subtitle: "Get unlimited access to all premium resources and future updates with our subscription plans.",
      premiumButtonText: "Get Premium Access",
      freeButtonText: "Explore Free Resources",
  }