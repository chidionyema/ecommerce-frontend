// resourcesPageData.ts
import {
  Article,
  Book,
  Code, // Ensure Code is imported if you plan to use it as a type icon elsewhere
  VideoLibrary,
  PictureAsPdf,
  DataObject,
  School,
  Dashboard,
  // Add any other icons you might use for resource types
} from '@mui/icons-material';
import React from 'react'; // Import React for JSX in getTypeIcon

// Type definitions
export interface ResourceData {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'guide' | 'tutorial' | 'video' | 'ebook' | 'template' | 'course' | 'tool';
  tags: string[];

  // --- New Fields ---
  demoUrl: string; // URL for public demo/preview
  githubUrl?: string; // URL for the GitHub repository (conditionally accessible)
  // --- End New Fields ---

  downloadable?: boolean;
  featured?: boolean;
  premium?: boolean; // Indicates if the resource (especially its code) is premium
  readTime?: string;
  date?: string;
  authorName?: string;
  authorAvatar?: string;
  imageUrl?: string;
  link?: string; // Could be a fallback or used if demoUrl/githubUrl are not applicable
}

interface ResourcesPageSections {
  // ... (rest of the interface remains the same)
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

// Get icon based on resource type (no changes needed here for the core request)
export const getTypeIcon = (type: string, iconProps?: any) => { // Changed iconProps type for flexibility
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


// Page section texts (no changes needed here for the core request)
export const resourcesPageSections: ResourcesPageSections = {
  // ... (remains the same)
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

// Sample resources data - UPDATED with demoUrl and githubUrl
export const resourcesData: ResourceData[] = [
  {
    id: '1',
    title: 'Getting Started with GLUStack',
    description: 'Learn the basics of GLUStack and how to set up your first project with our comprehensive guide.',
    type: 'guide',
    tags: ['beginners', 'setup', 'basics'],
    readTime: '10 min read',
    featured: true,
    demoUrl: 'https://example.com/demo/glustack-guide', // Placeholder
    githubUrl: 'https://github.com/your-org/glustack-guide-code' // Placeholder
  },
  {
    id: '2',
    title: 'Advanced Performance Optimization',
    description: 'Take your GLUStack applications to the next level with these advanced performance optimization techniques.',
    type: 'article',
    tags: ['performance', 'optimization', 'advanced'],
    readTime: '15 min read',
    demoUrl: 'https://example.com/blog/advanced-performance', // For articles, demoUrl might be the article link
    // githubUrl might be omitted if no specific code repository is tied to the article
  },
  {
    id: '3',
    title: 'Building Scalable APIs with GLUStack',
    description: 'Learn how to design and implement scalable API architectures using GLUStack components.',
    type: 'tutorial',
    tags: ['api', 'backend', 'architecture'],
    readTime: '20 min read',
    demoUrl: 'https://example.com/demo/scalable-apis-tutorial', // Placeholder
    githubUrl: 'https://github.com/your-org/scalable-apis-tutorial-code' // Placeholder
  },
  {
    id: '4',
    title: 'GLUStack Deployment Strategies',
    description: 'Explore different deployment strategies for your GLUStack applications in various environments.',
    type: 'video', // Videos might have a demo (trailer/preview) and perhaps supplementary code
    tags: ['deployment', 'devops', 'cloud'],
    readTime: '25 min watch',
    featured: true,
    demoUrl: 'https://youtube.com/watch?v=example-deploy-preview', // Placeholder
    githubUrl: 'https://github.com/your-org/deployment-examples' // Placeholder for example code
  },
  {
    id: '5',
    title: 'State Management Deep Dive',
    description: 'A comprehensive look at state management patterns and best practices in GLUStack applications.',
    type: 'ebook', // Ebooks might have a sample/preview as demoUrl
    tags: ['state', 'patterns', 'architecture'],
    readTime: '45 min read',
    premium: true,
    downloadable: true,
    demoUrl: 'https://example.com/ebooks/state-management/sample', // Placeholder
    // githubUrl could conceptually link to where the full ebook is accessed if it's part of the subscription benefit.
    // Or, if it's purely textual, it might not have a githubUrl. Adapt as needed.
    // For this example, let's assume premium ebooks might have code examples.
    githubUrl: 'https://github.com/your-org/state-management-ebook-examples' // Placeholder
  },
  {
    id: '6',
    title: 'GLUStack Component Library',
    description: 'Explore our extensive library of pre-built components to accelerate your GLUStack development.',
    type: 'template',
    tags: ['components', 'ui', 'library'],
    premium: true,
    demoUrl: 'https://example.com/demo/component-library', // Placeholder
    githubUrl: 'https://github.com/your-org/glustack-component-library' // Placeholder
  },
  {
    id: '7',
    title: 'Mastering GLUStack: Complete Course',
    description: 'A comprehensive course covering all aspects of GLUStack development from basics to advanced techniques.',
    type: 'course',
    tags: ['comprehensive', 'basics', 'advanced'],
    readTime: '10 hour course',
    premium: true,
    demoUrl: 'https://example.com/courses/mastering-glustack/intro', // Placeholder for course intro/overview
    githubUrl: 'https://github.com/your-org/mastering-glustack-course-materials' // Placeholder for course code/exercises
  },
  {
    id: '8',
    title: 'GLUStack CLI Tool Guide',
    description: 'Learn how to use the GLUStack CLI tool to streamline your development workflow.',
    type: 'tool',
    tags: ['cli', 'workflow', 'productivity'],
    readTime: '12 min read',
    demoUrl: 'https://example.com/docs/cli-tool', // Placeholder for documentation or a simple demo page
    githubUrl: 'https://github.com/your-org/glustack-cli' // Placeholder for the CLI tool's repository
  },
  // Add demoUrl and githubUrl for the remaining items...
  {
    id: '9',
    title: 'Authentication & Authorization in GLUStack',
    description: 'Implement secure authentication and authorization in your GLUStack applications.',
    type: 'tutorial',
    tags: ['security', 'auth', 'implementation'],
    readTime: '18 min read',
    authorName: 'Jane Developer',
    date: '2025-01-15',
    demoUrl: 'https://example.com/demo/auth-tutorial',
    githubUrl: 'https://github.com/your-org/auth-tutorial-code'
  },
  {
    id: '10',
    title: 'Real-time Data with GLUStack',
    description: 'Build real-time applications using GLUStack\'s powerful data synchronization features.',
    type: 'article',
    tags: ['real-time', 'data', 'sync'],
    readTime: '14 min read',
    featured: true,
    demoUrl: 'https://example.com/blog/real-time-data',
    githubUrl: 'https://github.com/your-org/real-time-data-examples'
  }
];