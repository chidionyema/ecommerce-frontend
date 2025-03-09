// data/resourcesPageData.ts
import React from 'react';

// Optimized imports from Material UI icons
import CloudIcon from '@mui/icons-material/Cloud';
import VpnKey from '@mui/icons-material/VpnKey';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExtensionIcon from '@mui/icons-material/Extension';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import DataObjectIcon from '@mui/icons-material/DataObject';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CheckmarkIcon from '@mui/icons-material/CheckCircle';
// Hero Section Data
export const heroSection = {
  title: "Production-Grade Resources",
  subtitle: "Access battle-tested code, comprehensive documentation, and industry-standard templates to accelerate your development.",
  searchPlaceholder: "Search resources...",
  getPremiumButtonText: "Get Premium Access"
};

// Benefits Section Data
export const benefitsSection = {
  overline: "WHY CHOOSE OUR RESOURCES",
  title: "Built for Professional Developers",
  subtitle: "Our resources are crafted by senior developers with years of industry experience across various tech stacks."
};

// Premium Resources Section Data
export const premiumSection = {
  overline: "PREMIUM RESOURCES",
  title: "Advanced Developer Resources",
  subtitle: "Gain access to our premium collection of production-ready code, comprehensive documentation, and professional templates.",
  upgradeButtonText: "Upgrade to Premium"
};

// Testimonial Section Data
export const testimonialSection = {
  overline: "SUCCESS STORIES",
  title: "What Our Users Say"
};

// Free Resources Section Data
export const freeResourcesSection = {
  overline: "FREE RESOURCES",
  title: "Start with Free Resources",
  subtitle: "Explore our free resources to boost your development skills and get a taste of what our premium resources offer.",
  noResultsMessage: "No resources match your current filters.",
  resetFiltersText: "Reset Filters"
};

// CTA Section Data
export const ctaSection = {
  title: "Ready to Accelerate Your Development?",
  subtitle: "Join thousands of developers who are building better applications faster with our resources.",
  premiumButtonText: "Get Premium Access",
  freeButtonText: "Explore Free Resources"
};

// Filter Options
export const filterOptions = [
  { label: "All Resources", value: "all" },
  { label: "Trending", value: "trending" },
  { label: "Beginner Friendly", value: "beginner" },
  { label: "Advanced", value: "advanced" }
];

// Stats
export const stats = [
  { label: "Resources", value: "250+" },
  { label: "Downloads", value: "45K+" },
  { label: "Active Users", value: "15K+" },
  { label: "Avg Rating", value: "4.8/5" }
];

// Benefits
export const benefits = [
  {
    title: "Production Quality",
    description: "All code follows industry best practices and passes strict quality standards with comprehensive test coverage.",
    icon: CheckmarkIcon
  },
  {
    title: "Well Documented",
    description: "Detailed documentation with clear explanations, usage examples, and implementation guidelines.",
    icon: MenuBookIcon
  },
  {
    title: "Regularly Updated",
    description: "Resources are continuously updated to ensure compatibility with the latest frameworks and libraries.",
    icon: BuildIcon
  },
  {
    title: "Expert Support",
    description: "Get help directly from the developers who created the resources with personalized support.",
    icon: SchoolIcon
  }
];

// Define a type for resource objects
export interface Resource {
  id: string;
  title: string;
  summary: string;
  icon: React.ElementType;
  path: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  trending: boolean;
  rating: number;
  reviewCount: number;
  downloads: string;
  time: string;
  tags: string[];
}

// Define a type for testimonials
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  resource: string;
}

// Premium Resources
export const premiumResources: Resource[] = [
  {
    id: "prem-1",
    title: "Enterprise Authentication System",
    summary: "Complete authentication system with OAuth, JWT, role-based access control, and multi-factor authentication.",
    icon: SecurityIcon,
    path: "/premium-resources/auth-system",
    level: "Advanced",
    trending: true,
    rating: 4.9,
    reviewCount: 348,
    downloads: "2.4k+",
    time: "4-6 hrs",
    tags: ["Authentication", "Security", "JWT", "OAuth"]
  },
  {
    id: "prem-2",
    title: "Microservices Architecture Boilerplate",
    summary: "Production-ready microservices setup with API gateway, service discovery, and load balancing.",
    icon: ArchitectureIcon,
    path: "/premium-resources/microservices",
    level: "Expert",
    trending: true,
    rating: 4.8,
    reviewCount: 257,
    downloads: "1.8k+",
    time: "8-10 hrs",
    tags: ["Microservices", "Docker", "Kubernetes", "API Gateway"]
  },
  {
    id: "prem-3",
    title: "Scalable Database Schema Templates",
    summary: "Optimized database schema designs for high-traffic applications with indexing strategies.",
    icon: StorageIcon,
    path: "/premium-resources/database-schema",
    level: "Intermediate",
    trending: false,
    rating: 4.7,
    reviewCount: 193,
    downloads: "3.1k+",
    time: "2-3 hrs",
    tags: ["Database", "SQL", "NoSQL", "Performance"]
  },
  {
    id: "prem-4",
    title: "CI/CD Pipeline Configuration",
    summary: "Enterprise-grade continuous integration and deployment configurations for major platforms.",
    icon: AccountTreeIcon,
    path: "/premium-resources/cicd-pipeline",
    level: "Advanced",
    trending: false,
    rating: 4.8,
    reviewCount: 211,
    downloads: "1.5k+",
    time: "3-4 hrs",
    tags: ["CI/CD", "DevOps", "Jenkins", "GitHub Actions"]
  },
  {
    id: "prem-5",
    title: "Performance Optimization Toolkit",
    summary: "Comprehensive suite of tools and techniques to analyze and improve application performance.",
    icon: SpeedIcon,
    path: "/premium-resources/performance-toolkit",
    level: "Advanced",
    trending: true,
    rating: 4.9,
    reviewCount: 184,
    downloads: "2.7k+",
    time: "5-7 hrs",
    tags: ["Performance", "Optimization", "Profiling", "Monitoring"]
  },
  {
    id: "prem-6",
    title: "Enterprise API Design Patterns",
    summary: "Best practices for designing scalable, secure and maintainable RESTful and GraphQL APIs.",
    icon: IntegrationInstructionsIcon,
    path: "/premium-resources/api-design",
    level: "Intermediate",
    trending: false,
    rating: 4.8,
    reviewCount: 229,
    downloads: "3.3k+",
    time: "4-5 hrs",
    tags: ["API", "REST", "GraphQL", "Documentation"]
  }
];

// Free Resources
export const freeResources: Resource[] = [
  {
    id: "free-1",
    title: "Basic Authentication Starter",
    summary: "Simple authentication system with JWT tokens and basic user management functionality.",
    icon: VpnKey,
    path: "/free-resources/basic-auth",
    level: "Beginner",
    trending: true,
    rating: 4.6,
    reviewCount: 456,
    downloads: "8.7k+",
    time: "1-2 hrs",
    tags: ["Authentication", "JWT", "Beginner Friendly"]
  },
  {
    id: "free-2",
    title: "React Component Library Starter",
    summary: "Foundational setup for creating your own reusable React component library with Storybook.",
    icon: ViewQuiltIcon,
    path: "/free-resources/react-components",
    level: "Intermediate",
    trending: true,
    rating: 4.7,
    reviewCount: 328,
    downloads: "6.2k+",
    time: "2-3 hrs",
    tags: ["React", "Components", "Storybook"]
  },
  {
    id: "free-3",
    title: "API Testing Framework",
    summary: "Comprehensive testing framework for RESTful APIs using Jest and Supertest.",
    icon: CodeIcon,
    path: "/free-resources/api-testing",
    level: "Beginner",
    trending: false,
    rating: 4.5,
    reviewCount: 287,
    downloads: "5.4k+",
    time: "1-2 hrs",
    tags: ["Testing", "API", "Jest"]
  },
  {
    id: "free-4",
    title: "Responsive Design Templates",
    summary: "Mobile-first responsive design templates with CSS Grid and Flexbox layouts.",
    icon: ExtensionIcon,
    path: "/free-resources/responsive-templates",
    level: "Beginner",
    trending: false,
    rating: 4.8,
    reviewCount: 375,
    downloads: "9.1k+",
    time: "1-2 hrs",
    tags: ["CSS", "Responsive", "Design", "Templates"]
  },
  {
    id: "free-5",
    title: "Database Migration Scripts",
    summary: "Collection of SQL and NoSQL database migration scripts with rollback functionality.",
    icon: DataObjectIcon,
    path: "/free-resources/db-migrations",
    level: "Intermediate",
    trending: false,
    rating: 4.4,
    reviewCount: 198,
    downloads: "4.3k+",
    time: "1-2 hrs",
    tags: ["Database", "Migrations", "SQL", "NoSQL"]
  },
  {
    id: "free-6",
    title: "Web Performance Checklist",
    summary: "Comprehensive checklist to optimize web application performance with practical examples.",
    icon: AssessmentIcon,
    path: "/free-resources/performance-checklist",
    level: "Beginner",
    trending: true,
    rating: 4.9,
    reviewCount: 412,
    downloads: "7.8k+",
    time: "1-2 hrs",
    tags: ["Performance", "Web", "Optimization"]
  }
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    avatar: "/images/avatars/sarah.jpg",
    comment: "The Enterprise Authentication System saved us months of development time. The code quality is exceptional and the documentation made implementation a breeze.",
    rating: 5,
    resource: "Authentication System"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "DevOps Engineer",
    avatar: "/images/avatars/michael.jpg",
    comment: "The CI/CD Pipeline Configuration templates were exactly what our team needed. They worked right out of the box with minimal customization required.",
    rating: 5,
    resource: "CI/CD Pipeline"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Fullstack Developer",
    avatar: "/images/avatars/emily.jpg",
    comment: "I started with the free API Testing Framework and was so impressed that I upgraded to premium. The resources have significantly improved our code quality.",
    rating: 4.5,
    resource: "API Testing Framework"
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO at TechStart",
    avatar: "/images/avatars/david.jpg",
    comment: "The Microservices Architecture Boilerplate is the best resource I've found for quickly setting up a production-ready microservices environment.",
    rating: 5,
    resource: "Microservices Boilerplate"
  }
];