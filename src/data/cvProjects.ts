// src/data/cvProjects.ts

import {
  Shield,
  Building2,
  DollarSign,
  Landmark,
  Cloud,
  CircuitBoard,
  Cpu,
  Server,
  Key,
  Settings,
  Mail
} from 'lucide-react';

export interface CVProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role: string;
  bannerText: string;
  icon: any;
  iconColor: string;
  clientName: string;
  challenges: string;
  impact: string;
  teamSize: number;
  stakeholders: string[];
  lessonsLearned: string;
  timeline: string;
  achievements: string[];
  measurableOutcomes?: {
    before: {
      percentage: string;
      description: string;
    };
    after: {
      percentage: string;
      description: string;
    };
  };
  metrics: Array<{
    label: string;
    value: string;
    description: string;
  }>;
}

export const cvProjects: CVProject[] = [
  {
    id: '6',
    name: 'Commercial REST APIs & DevOps',
    description: 'Designing a scalable microservices platform for global REST APIs, focusing on zero-downtime deployments.',
    technologies: ['.NET Core', 'Azure Kubernetes Service (AKS)', 'Terraform', 'Helm', 'Azure DevOps'],
    role: 'Lead .NET Software Engineer',
    bannerText: 'Enterprise-Scale Microservices',
    icon: Server,
    iconColor: 'text-red-600',
    clientName: 'Philip Morris International',
    challenges: 'Optimizing container orchestration for high availability and performance in Azure. Minimizing deployment time and errors in a multi-env setup.',
    impact: 'Reduced production deployment time by 80%, improved reliability via automated scaling and comprehensive monitoring.',
    teamSize: 8,
    stakeholders: ['Global Commercial Teams', 'Security Engineers', 'Ops Personnel'],
    lessonsLearned: 'Zero-downtime deployment strategies (blue/green, canary releases) are crucial to ensuring consistent user experience at scale.',
    timeline: 'April 2019 – September 2020',
    achievements: [
      'Implemented advanced CI/CD across dev, testing, staging, production',
      'Improved platform performance via auto-scaling & load balancing'
    ],
    measurableOutcomes: {
      before: {
        percentage: '40%',
        description: 'Legacy deployment downtime'
      },
      after: {
        percentage: '99.95%',
        description: 'API availability post-implementation'
      }
    },
    metrics: [
      {
        label: 'Operational Costs',
        value: '30% reduction',
        description: 'Reduction in cloud spend'
      },
      {
        label: 'Release Frequency',
        value: 'Daily',
        description: 'Deployment frequency vs weekly'
      },
      {
        label: 'Deployment Time',
        value: '8min',
        description: 'Average production deployment'
      }
    ]
  },
  {
    id: '7',
    name: 'Digital Asset Management Modernization',
    description: 'Revamped a monolithic DAM platform to microservices, improving scalability, performance, and maintainability.',
    technologies: ['.NET Core', 'Azure', 'Docker', 'Microservices Architecture'],
    role: 'Software Engineer',
    bannerText: 'Fashion E-Commerce Evolution',
    icon: CircuitBoard,
    iconColor: 'text-orange-600',
    clientName: 'ASOS',
    challenges: 'Ensuring zero disruption to high-traffic e-commerce while migrating millions of assets to a new microservices-based DAM.',
    impact: 'Enhanced system reliability; drastically lowered operational overhead with containerized deployments.',
    teamSize: 5,
    stakeholders: ['E-commerce Team', 'Content Management', 'Ops'],
    lessonsLearned: 'Incremental migration to microservices and rigorous containerization best practices are essential for large-scale asset handling.',
    timeline: 'September 2018 – January 2019',
    achievements: [
      'Improved system throughput & reduced downtime during peak seasons',
      'Established coding standards and design patterns for DAM services'
    ],
    measurableOutcomes: {
      before: {
        percentage: '70%',
        description: 'Previous asset delivery latency'
      },
      after: {
        percentage: '<500ms',
        description: 'Post-optimization delivery time'
      }
    },
    metrics: [
      {
        label: 'Conversion Rate',
        value: '15%',
        description: 'Improvement during sales'
      },
      {
        label: 'Asset Delivery',
        value: '<500ms',
        description: '95th percentile performance'
      },
      {
        label: 'Deployment Speed',
        value: '5min',
        description: 'Container rollouts'
      }
    ]
  },
  {
    id: '8',
    name: 'Containerized Microservices & SEO',
    description: 'Architected and deployed containerized .NET Core services on Amazon ECS to enhance SEO-driven traffic.',
    technologies: ['.NET Core', 'Docker', 'Amazon ECS', 'Terraform', 'Nginx', 'SQL Server', 'DynamoDB'],
    role: 'Lead Developer',
    bannerText: 'Scalable Web Infrastructure',
    icon: Settings,
    iconColor: 'text-emerald-600',
    clientName: 'StepStone UK',
    challenges: 'Ensuring robust SEO performance while transitioning to container-based deployments and Amazon S3 for scalable storage.',
    impact: 'Improved search engine rankings; introduced repeatable infrastructure-as-code with Terraform across multiple environments.',
    teamSize: 6,
    stakeholders: ['SEO Team', 'Marketing Dept.', 'Infrastructure Leads'],
    lessonsLearned: 'Automating pipelines, optimizing Nginx for caching, and implementing consistent IaC transforms development velocity and SEO agility.',
    timeline: 'April 2016 – August 2018',
    achievements: [
      'Reduced deployment times with containerized microservices',
      'Integrated S3-based workflows for large-scale media handling'
    ],
    measurableOutcomes: {
      before: {
        percentage: '40%',
        description: 'Original SEO ranking'
      },
      after: {
        percentage: '300%',
        description: 'Organic traffic increase YOY'
      }
    },
    metrics: [
      {
        label: 'Page Load',
        value: '<1s',
        description: 'Average load time'
      },
      {
        label: 'Cache Hit Rate',
        value: '95%',
        description: 'Nginx cache efficiency'
      },
      {
        label: 'Build Times',
        value: '3min',
        description: 'Average container builds'
      }
    ]
  },
  {
    id: '9',
    name: 'Private Cloud IaaS Platform',
    description: 'Built an internal infrastructure-as-a-service to provision VMs via Citrix Xen and VMware vSphere pools.',
    technologies: ['.NET', 'Angular', 'Citrix Xen', 'VMware', 'PowerShell'],
    role: 'Senior Developer',
    bannerText: 'Enterprise Private Cloud',
    icon: Cpu,
    iconColor: 'text-teal-500',
    clientName: 'Tesco PLC',
    challenges: 'Reducing VM provisioning times from multiple days down to hours, streamlining resource allocation and automation.',
    impact: 'Significantly improved operational efficiency; cut manual overhead in VM lifecycle management.',
    teamSize: 5,
    stakeholders: ['Data Center Ops', 'App Development Teams', 'IT Leadership'],
    lessonsLearned: 'Automating virtual machine lifecycles via scripting and adopting best practices for code cleanliness ensures maintainable, scalable IaaS solutions.',
    timeline: 'April 2015 – April 2016',
    achievements: [
      'Cut provisioning times from 5 days to 2 hours',
      'Adopted best practices for cloud-based development & deployment'
    ],
    measurableOutcomes: {
      before: {
        percentage: '5 days',
        description: 'Original provisioning time'
      },
      after: {
        percentage: '2hr',
        description: 'Average provisioning time'
      }
    },
    metrics: [
      {
        label: 'OpEx Savings',
        value: '£1.2M',
        description: 'Annual savings'
      },
      {
        label: 'Provisioning Time',
        value: '2hr',
        description: 'Average from 5 days'
      },
      {
        label: 'API Reliability',
        value: '99.9%',
        description: 'Success rate'
      }
    ]
  },
  {
    id: '10',
    name: 'Salesforce Marketing Automation',
    description: 'Integrated SaaS marketing platform with internal CRMs to drive seamless email campaigns and outreach.',
    technologies: ['C#', 'Salesforce', 'API Integrations', 'Marketing Cloud', 'SQL'],
    role: 'Lead Consultant',
    bannerText: 'Omni-Channel Marketing Engagement',
    icon: Mail,
    iconColor: 'text-rose-600',
    clientName: 'Totaljobs Group',
    challenges: 'Synchronizing over one million user profiles across multiple systems, improving campaign relevancy, and ensuring data integrity.',
    impact: '25% higher campaign engagement; streamlined workflows on Salesforce, boosting marketing ROI.',
    teamSize: 4,
    stakeholders: ['CMO Office', 'Marketing Ops', 'IT Integrations'],
    lessonsLearned: 'Automated data syncing and custom Salesforce workflows significantly reduce human error and improve campaign personalization.',
    timeline: 'July 2014 – March 2015',
    achievements: [
      'Integrated SaaS platform for robust email marketing at scale',
      'Optimized Salesforce environment for improved outreach and engagement'
    ],
    measurableOutcomes: {
      before: {
        percentage: '60%',
        description: 'Manual campaign setup'
      },
      after: {
        percentage: '25%',
        description: 'Increase in campaign CTR'
      }
    },
    metrics: [
      {
        label: 'ROI Improvement',
        value: '35%',
        description: 'Higher marketing ROI'
      },
      {
        label: 'API Latency',
        value: '<200ms',
        description: 'Sync operations'
      },
      {
        label: 'Workflow Automation',
        value: '70%',
        description: 'Manual steps reduced'
      }
    ]
  },
  {
    id: '11',
    name: 'Media Workflow Automation',
    description: 'Built an advanced automation system to streamline media processing for BBC broadcasting channels.',
    technologies: ['.NET Framework', 'C#', 'OOP', 'API Integrations', 'SQL'],
    role: 'Contract Software Engineer',
    bannerText: 'Broadcast Efficiency & Innovation',
    icon: Key,
    iconColor: 'text-amber-600',
    clientName: 'BBC',
    challenges: 'Automating repetitive media workflows while maintaining broadcast reliability and reducing overall operational costs.',
    impact: 'Increased content delivery speed; saved significant manual effort in day-to-day media processing for key broadcasting channels.',
    teamSize: 5,
    stakeholders: ['Editors', 'Broadcast Technical Staff', 'Operational Leads'],
    lessonsLearned: 'Object-Oriented best practices and strategic API integrations enable robust, maintainable solutions in fast-paced media environments.',
    timeline: 'March 2013 – June 2014',
    achievements: [
      'Reduced manual interventions, accelerating content deployment',
      'Improved reliability and delivered cost savings in daily broadcast ops'
    ],
    measurableOutcomes: {
      before: {
        percentage: '60%',
        description: 'Manual processing time'
      },
      after: {
        percentage: '99.99%',
        description: 'Broadcast reliability achieved'
      }
    },
    metrics: [
      {
        label: 'Content Throughput',
        value: '2x',
        description: 'More daily shows'
      },
      {
        label: 'Processing Time',
        value: '<5min',
        description: 'For HD assets'
      },
      {
        label: 'QC Time',
        value: '50%',
        description: 'Faster quality checks'
      }
    ]
  }
];