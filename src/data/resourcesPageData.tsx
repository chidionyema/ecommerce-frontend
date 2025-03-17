// resourcesPageData.ts
import {
  Article,
  Book,
  Code,
  VideoLibrary,
  PictureAsPdf,
  DataObject,
  School,
  Dashboard,
  
} from '@mui/icons-material';

// Type definitions
export interface ResourceData {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'guide' | 'tutorial' | 'video' | 'ebook' | 'template' | 'course' | 'tool';
  tags: string[];
  downloadable?: boolean;
  featured?: boolean;
  premium?: boolean;
  readTime?: string;
  date?: string;
  authorName?: string;
  authorAvatar?: string;
  imageUrl?: string;
  link?: string;
}

interface ResourcesPageSections {
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
  };
  filter: {
    label: string;
  };
  tabs: {
    label: string;
    value: number;
  }[];
  noResults: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  cta: {
    overline: string;
    title: string;
    description: string;
    buttonText: string;
  };
}

// Get icon based on resource type
export const getTypeIcon = (type: string, iconProps?: React.ComponentProps<typeof Article>) => {
  switch (type) {
    case 'article':
      return <Article {...iconProps} />;
    case 'guide':
      return <Book {...iconProps} />;
    case 'tutorial':
      return <Code {...iconProps} />;
    case 'video':
      return <VideoLibrary {...iconProps} />;
    case 'ebook':
      return <PictureAsPdf {...iconProps} />;
    case 'template':
      return <DataObject {...iconProps} />;
    case 'course':
      return <School {...iconProps} />;
    case 'tool':
      return <Dashboard {...iconProps} />;
    default:
      return <Article {...iconProps} />;
  }
};


// Page section texts
export const resourcesPageSections: ResourcesPageSections = {
  hero: {
    title: 'GLUStack Knowledge Resources',
    subtitle: 'Discover guides, tutorials, and tools to supercharge your development workflow',
    searchPlaceholder: 'Search for resources by title, description, or tag...'
  },
  filter: {
    label: 'Filter by:'
  },
  tabs: [
    { label: 'All Resources', value: 0 },
    { label: 'Premium Content', value: 1 }
  ],
  noResults: {
    title: 'No resources found',
    subtitle: 'Try adjusting your search or filter criteria',
    buttonText: 'Clear all filters'
  },
  cta: {
    overline: 'PREMIUM CONTENT CREATORS',
    title: 'Share Your Expertise & Earn',
    description: 'Create high-quality premium resources to help others master GLUStack while generating income. Our community values expert knowledge and practical solutions.',
    buttonText: 'Become a Premium Creator'
  }
};

// Sample resources data
export const resourcesData: ResourceData[] = [
  {
    id: '1',
    title: 'Getting Started with GLUStack',
    description: 'Learn the basics of GLUStack and how to set up your first project with our comprehensive guide.',
    type: 'guide',
    tags: ['beginners', 'setup', 'basics'],
    readTime: '10 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Advanced Performance Optimization',
    description: 'Take your GLUStack applications to the next level with these advanced performance optimization techniques.',
    type: 'article',
    tags: ['performance', 'optimization', 'advanced'],
    readTime: '15 min read'
  },
  {
    id: '3',
    title: 'Building Scalable APIs with GLUStack',
    description: 'Learn how to design and implement scalable API architectures using GLUStack components.',
    type: 'tutorial',
    tags: ['api', 'backend', 'architecture'],
    readTime: '20 min read'
  },
  {
    id: '4',
    title: 'GLUStack Deployment Strategies',
    description: 'Explore different deployment strategies for your GLUStack applications in various environments.',
    type: 'video',
    tags: ['deployment', 'devops', 'cloud'],
    readTime: '25 min watch',
    featured: true
  },
  {
    id: '5',
    title: 'State Management Deep Dive',
    description: 'A comprehensive look at state management patterns and best practices in GLUStack applications.',
    type: 'ebook',
    tags: ['state', 'patterns', 'architecture'],
    readTime: '45 min read',
    premium: true,
    downloadable: true
  },
  {
    id: '6',
    title: 'GLUStack Component Library',
    description: 'Explore our extensive library of pre-built components to accelerate your GLUStack development.',
    type: 'template',
    tags: ['components', 'ui', 'library'],
    premium: true
  },
  {
    id: '7',
    title: 'Mastering GLUStack: Complete Course',
    description: 'A comprehensive course covering all aspects of GLUStack development from basics to advanced techniques.',
    type: 'course',
    tags: ['comprehensive', 'basics', 'advanced'],
    readTime: '10 hour course',
    premium: true
  },
  {
    id: '8',
    title: 'GLUStack CLI Tool Guide',
    description: 'Learn how to use the GLUStack CLI tool to streamline your development workflow.',
    type: 'tool',
    tags: ['cli', 'workflow', 'productivity'],
    readTime: '12 min read'
  },
  {
    id: '9',
    title: 'Authentication & Authorization in GLUStack',
    description: 'Implement secure authentication and authorization in your GLUStack applications.',
    type: 'tutorial',
    tags: ['security', 'auth', 'implementation'],
    readTime: '18 min read',
    authorName: 'Jane Developer',
    date: '2025-01-15'
  },
  {
    id: '10',
    title: 'Real-time Data with GLUStack',
    description: 'Build real-time applications using GLUStack\'s powerful data synchronization features.',
    type: 'article',
    tags: ['real-time', 'data', 'sync'],
    readTime: '14 min read',
    featured: true
  }
];