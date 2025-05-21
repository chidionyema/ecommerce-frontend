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
  price?: string;
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
    case 'tool': // Represents guides for tools or actual tool links
      return <Dashboard {...iconProps} />;
    default:
      return <Article {...iconProps} />;
  }
};

// Page section texts
export const resourcesPageSections: ResourcesPageSections = {
  hero: {
    title: 'Explore .NET, Next.js & AI/ML Resources',
    subtitle: 'Dive into .NET security, AI innovations, Next.js development, and cloud vault solutions.',
    searchPlaceholder: 'Search resources by title, topic, or tag (e.g., .NET, Next.js, AI)...',
  },
  filter: {
    label: 'Filter by:',
  },
  tabs: [
    { label: 'All Resources', value: 0 },
    { label: 'Premium Content', value: 1 },
  ],
  noResults: {
    title: 'No resources found',
    subtitle: 'Try adjusting your search or filter criteria',
    buttonText: 'Clear all filters',
  },
  cta: {
    overline: 'CONTRIBUTE YOUR KNOWLEDGE',
    title: 'Become a Tech Resource Creator',
    description: 'Share your expertise in .NET, AI/ML, Next.js, or cloud security. Help our community grow with your valuable insights and practical solutions.',
    buttonText: 'Start Creating',
  },
};

// Sample resources data
export const resourcesData: ResourceData[] = [
  {
    id: '1',
    title: 'Securing .NET APIs with JWT Authentication',
    description: 'A comprehensive guide to implementing JWT for robust API security in .NET Core applications.',
    type: 'guide',
    tags: ['.net', 'security', 'jwt', 'api', 'authentication'],
    readTime: '18 min read',
    featured: true,
    authorName: 'Alex Secure',
    date: '2025-05-10',
  },
  {
    id: '2',
    title: 'Integrating Azure Key Vault with .NET Applications',
    description: 'Learn how to securely manage secrets, keys, and certificates for your .NET apps using Azure Key Vault.',
    type: 'tutorial',
    tags: ['.net', 'azure', 'key vault', 'security', 'cloud', 'secrets management'],
    readTime: '22 min read',
    imageUrl: '/images/resources/azure-key-vault-dotnet.png', // Placeholder image path
  },
  {
    id: '3',
    title: 'Building Full-Stack Apps with Next.js and .NET Web API',
    description: 'Explore how to create a powerful full-stack application combining Next.js for the frontend and .NET Web API for the backend.',
    type: 'article',
    tags: ['next.js', '.net', 'full-stack', 'web api', 'react'],
    readTime: '15 min read',
  },
  {
    id: '4',
    title: 'Introduction to Machine Learning with ML.NET',
    description: 'Get started with machine learning in the .NET ecosystem using ML.NET. Build your first predictive model.',
    type: 'video',
    tags: ['machine learning', 'ml.net', '.net', 'ai', 'beginners'],
    readTime: '30 min watch',
    featured: true,
    link: 'https://www.youtube.com/watch?v=exampleMLNET', // Placeholder link
  },
  {
    id: '5',
    title: '.NET Security Best Practices Handbook',
    description: 'An in-depth eBook covering essential security best practices for developing resilient .NET applications, including secure coding and threat modeling.',
    type: 'ebook',
    tags: ['.net', 'security', 'best practices', 'devsecops', 'ebook'],
    readTime: '120 min read',
    premium: true,
    price: '$29.99',
    downloadable: true,
    authorName: 'Dr. Secure Coder',
    date: '2025-04-20',
  },
  {
    id: '6',
    title: 'Next.js Authentication (NextAuth.js) Starter Template',
    description: 'A ready-to-use Next.js template with built-in authentication flows using NextAuth.js to kickstart your secure project.',
    type: 'template',
    tags: ['next.js', 'auth', 'template', 'starter kit', 'nextauth'],
    premium: true,
    price: '$19.99',
    imageUrl: '/images/resources/nextjs-auth-template.png', // Placeholder image path
  },
  {
    id: '7',
    title: 'Advanced .NET Security & Cryptography Masterclass',
    description: 'A complete course on advanced .NET security topics including threat modeling, modern cryptography, and secure development lifecycle.',
    type: 'course',
    tags: ['.net', 'security', 'advanced', 'cryptography', 'course'],
    readTime: '12 hour course',
    premium: true,
    price: '$149.99',
  },
  {
    id: '8',
    title: 'Using HashiCorp Vault for .NET Secrets Management',
    description: 'A practical guide on leveraging HashiCorp Vault to manage secrets effectively in .NET Core and microservices architectures.',
    type: 'tool', // Guide for a tool
    tags: ['hashicorp vault', '.net', 'microservices', 'secrets management', 'devops'],
    readTime: '25 min read',
    authorName: 'DevOps Dani',
    date: '2025-03-01',
  },
  {
    id: '9',
    title: 'Next.js Performance: SSR, SSG, and ISR Explained',
    description: 'Understand Server-Side Rendering, Static Site Generation, and Incremental Static Regeneration in Next.js for optimal web performance.',
    type: 'article',
    tags: ['next.js', 'ssr', 'ssg', 'isr', 'performance', 'webdev'],
    readTime: '16 min read',
    featured: true,
  },
  {
    id: '10',
    title: 'Practical AI: Anomaly Detection in Financial .NET Systems',
    description: 'Implement an anomaly detection system using machine learning techniques (e.g., ML.NET or Python interop) within a .NET financial application.',
    type: 'tutorial',
    tags: ['ai', 'machine learning', '.net', 'anomaly detection', 'finance', 'tutorial'],
    readTime: '28 min read',
    imageUrl: '/images/resources/ai-anomaly-dotnet.png', // Placeholder image path
  },
];