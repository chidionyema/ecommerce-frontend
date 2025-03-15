// ./src/data/solutionsData.ts

import { ReactElement } from 'react';

// Import icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
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

// Define data types
export interface Industry {
  title: string;
  description: string;
  icon?: string;
}

export interface Benefit {
  icon: typeof TrendingUpIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

export interface WhyChooseUsReason {
  title: string;
  description: string;
  icon: typeof CodeIcon;
}

export interface SolutionsPageData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  whatSetsApart: {
    heading: string;
    description: string;
  };
  showcaseSolutions: {
    heading: string;
    description: string;
    cta: string;
  };
  industries: Industry[];
  benefits: Benefit[];
  testimonials: Testimonial[];
  whyChooseUs: {
    heading: string;
    reasons: WhyChooseUsReason[];
  };
}

// Define industry icon mapping
export const industryIconMap: Record<string, React.ElementType> = {
  "Finance": AccountBalanceIcon,
  "Healthcare": HealthAndSafetyIcon,
  "Retail": ShoppingCartIcon,
  "Cloud Services": CloudIcon,
  "DevOps": CodeIcon,
  "FinTech": AttachMoneyIcon,
  "E-commerce": StoreIcon,
  "Media": PermMediaIcon,
  "Education": SchoolIcon,
  "Manufacturing": BuildIcon,
  "Professional Services": WorkIcon
};

// Export the solutions page data
export const solutionsPageData: SolutionsPageData = {
  hero: {
    title: "Transform Your Business with GLUStack Solutions",
    subtitle: "Custom-engineered technology solutions for your enterprise.",
    cta: "Explore Our Solutions",
  },
  whatSetsApart: {
    heading: "What are GLUStack's Solutions?",
    description: "GLUStack offers a comprehensive suite of enterprise-grade solutions, meticulously crafted to address the complex challenges of modern businesses. We specialize in cloud architecture, DevOps, and creating bespoke technical solutions that are not just robust and secure but also perfectly aligned with your strategic objectives. Our expert team leverages cutting-edge technologies to deliver resources and full-stack solutions that empower your enterprise, ensuring operational excellence, scalability, and a significant competitive advantage in your industry.",
  },
  showcaseSolutions: {
    heading: "Our Featured Solutions",
    description: "Explore our successful implementations and see the GLUStack difference.",
    cta: "View All Projects"
  },
  industries: [
    {
      title: "Finance",
      description: "Secure and scalable solutions for the financial sector.",
    },
    {
      title: "Healthcare",
      description: "HIPAA-compliant solutions for healthcare providers.",
    },
    {
      title: "Retail",
      description: "E-commerce and point-of-sale solutions for retail businesses.",
    },
    {
      title: "Cloud Services",
      description: "Robust cloud infrastructure and management solutions."
    },
    {
      title: "DevOps",
      description: "Streamlined development and operations for faster deployment."
    },
    {
      title: "FinTech",
      description: "Innovative financial technology solutions."
    },
    {
      title: "E-commerce",
      description: "Comprehensive online retail platforms."
    },
    {
      title: "Media",
      description: "Dynamic content delivery and management systems."
    },
  ],
  benefits: [
    {
      icon: TrendingUpIcon,
      title: "Enhanced Scalability",
      description: "Grow your business without technology constraints",
    },
    {
      icon: SecurityIcon,
      title: "Robust Security",
      description: "Protect your assets with enterprise-grade security",
    },
    {
      icon: BuildIcon,
      title: "Custom Solutions",
      description: "Tailored solutions to fit your specific needs",
    },
    {
      icon: SupportAgentIcon,
      title: "Expert Support",
      description: "Dedicated support from experienced professionals",
    },
  ],
  testimonials: [
    {
      quote: "GLUStack transformed our operations. Their expertise in cloud solutions is unmatched.",
      author: "Jane Doe, CEO, TechCorp",
      image: "/images/jane-doe.jpg",
    },
    {
      quote: "The scalability and security of GLUStack's solutions have been critical to our growth.",
      author: "John Smith, CTO, Innovate Inc.",
      image: "/images/john-smith.jpg",
    },
    {
      quote: "Exceptional service and deep technical knowledge. GLUStack is a true partner.",
      author: "Alice Johnson, CIO, Global Enterprises",
      image: "/images/alice-johnson.jpg"
    }
  ],
  whyChooseUs: {
    heading: "Why Choose GLUStack?",
    reasons: [
      {
        title: "Expert Team",
        description: "Our team comprises industry-leading experts in cloud architecture, DevOps, and software engineering.",
        icon: CodeIcon,
      },
      {
        title: "Customized Solutions",
        description: "We tailor our solutions to your specific business needs, ensuring optimal performance and efficiency.",
        icon: BuildIcon,
      },
      {
        title: "Proven Track Record",
        description: "With numerous successful implementations, we have a proven track record of delivering results.",
        icon: TrendingUpIcon,
      },
      {
        title: "Comprehensive Support",
        description: "We provide ongoing support and maintenance, ensuring your systems are always up-to-date and secure.",
        icon: SupportAgentIcon,
      },
    ],
  },
};

// FAQ data
export const caseStudiesFaqItems = [
  {
    question: "What types of projects do you showcase in case studies?",
    answer: "Our case studies cover a diverse range of projects across different industries including cloud migrations, system integrations, performance optimizations, DevOps implementations, and security enhancements. Each study highlights the challenges, approach, and measurable outcomes delivered."
  },
  {
    question: "How do you measure the success of a project?",
    answer: "We measure success through quantifiable metrics tailored to each project's objectives. These typically include performance improvements, cost savings, increased revenue, reduced downtime, faster deployment cycles, or enhanced security posture. We always establish clear KPIs at the beginning of each engagement."
  },
  {
    question: "Can you work with my specific industry requirements?",
    answer: "Yes, we have experience working across multiple industries including finance, healthcare, retail, manufacturing, and technology. Each industry has unique requirements and compliance considerations which we incorporate into our solutions and approach."
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Absolutely. We offer various support models including managed services, retainer arrangements, and dedicated support packages. Many of our case studies highlight long-term partnerships where we've continued to optimize and enhance solutions after the initial implementation."
  },
  {
    question: "How do you handle sensitive information in case studies?",
    answer: "Client confidentiality is paramount. We always obtain explicit permission before publishing any case study. In cases with sensitive information, we may anonymize certain details or present the case study at a higher level while still conveying the value delivered."
  }
];

// Filter and sort options
export const filterCategories = [
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

export const sortOptions = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'impact', label: 'Highest Impact' },
  { value: 'featured', label: 'Featured First' }
];