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

/**
 * Interface for each curated project/case study.
 */
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
    id: '1',
    name: 'Airspace Security & Drone Defense',
    description: 'Real-time threat detection and situational intelligence platform for critical infrastructures.',
    technologies: ['.NET Core', 'Java', 'WebSockets', 'RabbitMQ', 'MQTT', 'Docker', 'Kubernetes'],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Counter-Drone & Security Intelligence',
    icon: Shield,
    iconColor: 'text-blue-600',
    clientName: 'OSL Technologies',
    challenges:
      'Bringing multiple sensor and radar feeds under one unified system with sub-second latency, while ensuring zero false alarms at large-scale events.',
    impact:
      'Enabled proactive identification of security risks; reduced threat response times by 40%.',
    teamSize: 8,
    stakeholders: ['Airport Security Directors', 'Major Sporting Event Organizers'],
    lessonsLearned:
      'Edge computing, robust code reviews, and thorough security testing are key to avoiding false positives and performance bottlenecks in real-time systems.',
    timeline: 'June 2024 – Present',
    achievements: [
      'Developed & containerized microservices for real-time data streaming',
      'Prototyped ML models for predictive threat detection'
    ],
    measurableOutcomes: {
      before: {
        percentage: '60%',
        description: 'Reliance on manual threat identification'
      },
      after: {
        percentage: '40%',
        description: 'Reduction in response times through automation'
      }
    },
    metrics: [
      {
        label: 'Latency',
        value: '<500ms',
        description: 'Real-time data feed from radars'
      },
      {
        label: 'Threat Detection',
        value: '40% faster',
        description: 'Faster response vs. legacy systems'
      },
      {
        label: 'False Alarms',
        value: '-80%',
        description: 'Automated classification & filtering'
      }
    ]
  },
  {
    id: '2',
    name: 'Digital Justice Platform',
    description: 'GDS-compliant digital services modernizing legal proceedings, including online pleas and certification applications.',
    technologies: ['Terraform', 'Helm', 'Kubernetes', 'AWS', 'Azure', 'Node.js', 'Java', '.NET'],
    role: 'Technical Lead',
    bannerText: 'Government Digital Services (GDS)',
    icon: Building2,
    iconColor: 'text-purple-600',
    clientName: 'HM Courts & Tribunals Service',
    challenges:
      'Ensuring accessibility for vulnerable users, migrating microservices to cloud, and integrating robust security in a complex multi-language environment.',
    impact:
      'Achieved 95% user satisfaction; cut form completion times by 50%. Infrastructure modernisation improved reliability and security posture.',
    teamSize: 9,
    stakeholders: ['Ministry of Justice', 'GDS Compliance Teams', 'Disability Advocacy Groups'],
    lessonsLearned:
      'Accessibility audits and user testing are non-negotiable. Effective DevOps practices drastically reduce production incidents.',
    timeline: 'March 2023 – February 2024',
    achievements: [
      'Launched fully accessible gender recognition certificate service',
      'Implemented CI/CD with Terraform & Helm, speeding up deployments'
    ],
    measurableOutcomes: {
      before: {
        percentage: '40%',
        description: 'User satisfaction with legacy system'
      },
      after: {
        percentage: '95%',
        description: 'User satisfaction post-migration'
      }
    },
    metrics: [
      {
        label: 'Form Completion Time',
        value: '-50%',
        description: 'Faster digital process vs. paper forms'
      },
      {
        label: 'Accessibility Score',
        value: 'WCAG 2.1 AA',
        description: 'Compliance rating achieved'
      },
      {
        label: 'Deployment Frequency',
        value: 'Weekly',
        description: 'Automated CI/CD pipeline'
      }
    ]
  },
  {
    id: '3',
    name: 'High-Performance Cash Optimization',
    description: 'A cutting-edge cash deposit platform enabling real-time rate adjustments and compliance tracking.',
    technologies: ['.NET Core', 'C#', 'EF Core', 'Azure', 'SQL', 'Brighter CQRS'],
    role: 'Senior .NET Developer',
    bannerText: 'FinTech Yield Maximization',
    icon: DollarSign,
    iconColor: 'text-green-600',
    clientName: 'Flagstone',
    challenges:
      'Handling £1B+ daily transactions while maintaining sub-5ms latency. Ensuring FCA compliance and robust auditing through DDD patterns.',
    impact:
      'Boosted customer returns with real-time interest optimization; streamlined CI/CD reduced build times by 50%.',
    teamSize: 5,
    stakeholders: ['Financial Controllers', 'Compliance Officers', 'Product Owners'],
    lessonsLearned:
      'Domain-driven design and CQRS patterns are pivotal for large-scale financial systems to maintain clarity and auditability.',
    timeline: 'October 2022 – March 2023',
    achievements: [
      'FCA-compliant transaction pipeline with minimal downtime',
      'Improved team velocity via automated testing & optimized CI/CD'
    ],
    measurableOutcomes: {
      before: {
        percentage: '10ms',
        description: 'Previous transaction latency'
      },
      after: {
        percentage: '5ms',
        description: 'Optimized real-time calculations'
      }
    },
    metrics: [
      {
        label: 'Daily Transaction Volume',
        value: '£1B+',
        description: 'Real-time interest adjustments'
      },
      {
        label: 'Build Times',
        value: '-50%',
        description: 'Streamlined CI/CD pipeline'
      },
      {
        label: 'Latency',
        value: '5ms',
        description: 'Real-time transaction handling'
      }
    ]
  },
  {
    id: '4',
    name: 'Cloud-Native BaaS Platform',
    description: 'Building core banking features (KYC, onboarding, account management) in a secure, multi-tenant environment.',
    technologies: ['.NET Core', 'Vue.js', 'Azure', 'Azure API Management'],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Banking-as-a-Service',
    icon: Landmark,
    iconColor: 'text-indigo-600',
    clientName: 'Omnio',
    challenges:
      'Enabling multi-tenant architecture under strict regulations (PSD2), integrating seamlessly with third-party providers.',
    impact:
      'Reduced client onboarding time by 30%; maintained 99.99% availability for critical financial operations.',
    teamSize: 7,
    stakeholders: ['Partner Banks', 'Compliance Teams', 'Product Managers'],
    lessonsLearned:
      'Multi-tenant best practices with JWT token chaining and robust Azure security are key for BaaS success.',
    timeline: 'February 2022 – May 2022',
    achievements: [
      'Implemented secure onboarding flows (KYC, AML checks)',
      'Successfully passed regulatory sandbox testing without major findings'
    ],
    measurableOutcomes: {
      before: {
        percentage: '70%',
        description: 'Manual onboarding overhead'
      },
      after: {
        percentage: '99.99%',
        description: 'Platform availability achieved'
      }
    },
    metrics: [
      {
        label: 'Onboarding Time',
        value: '30% reduction',
        description: 'Time to integrate new partners'
      },
      {
        label: 'Availability',
        value: '99.99%',
        description: 'SLA for critical BaaS ops'
      },
      {
        label: 'PSD2 Compliance',
        value: '100%',
        description: 'Regulatory readiness'
      }
    ]
  },
  {
    id: '5',
    name: 'Multi-Cloud Self-Service Portal',
    description: 'Enabling developers to rapidly provision secure AWS resources, streamlining infrastructure management.',
    technologies: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'Helm', 'Octopus Deploy'],
    role: 'Full Stack / Platform Engineer',
    bannerText: 'Cloud Transformation',
    icon: Cloud,
    iconColor: 'text-sky-500',
    clientName: 'StepStone UK',
    challenges:
      'Migrating legacy apps onto AWS while maintaining reliability, and creating standardized project templates for new microservices.',
    impact:
      'Accelerated developer onboarding, reduced provisioning times from days to minutes, strengthened system-wide security.',
    teamSize: 6,
    stakeholders: ['CTO Office', 'Security Team', 'Dev Leads'],
    lessonsLearned:
      'Enterprise-wide secrets management (AWS KMS) and self-service portals drastically improve productivity and reduce misconfigurations.',
    timeline: 'July 2020 – March 2021',
    achievements: [
      'Developed enterprise secrets management solution',
      'Standardized IaC templates, cutting onboarding time by 50%'
    ],
    measurableOutcomes: {
      before: {
        percentage: '3 days',
        description: 'Legacy provisioning for new microservices'
      },
      after: {
        percentage: '30 min',
        description: 'Automated self-service provisioning'
      }
    },
    metrics: [
      {
        label: 'Developer Onboarding',
        value: '50% faster',
        description: 'Time to first commit'
      },
      {
        label: 'Provisioning Time',
        value: 'Minutes vs days',
        description: 'Self-service advantage'
      },
      {
        label: 'Security Incidents',
        value: '-75%',
        description: 'Centralized IaC best practices'
      }
    ]
  },
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
    challenges:
      'Optimizing container orchestration for high availability and performance in Azure. Minimizing deployment time and errors in a multi-env setup.',
    impact:
      'Reduced production deployment time by 80%, improved reliability via automated scaling and comprehensive monitoring.',
    teamSize: 8,
    stakeholders: ['Global Commercial Teams', 'Security Engineers', 'Ops Personnel'],
    lessonsLearned:
      'Zero-downtime deployment strategies (blue/green, canary releases) are crucial to ensuring consistent user experience at scale.',
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
    challenges:
      'Ensuring zero disruption to high-traffic e-commerce while migrating millions of assets to a new microservices-based DAM.',
    impact:
      'Enhanced system reliability; drastically lowered operational overhead with containerized deployments.',
    teamSize: 5,
    stakeholders: ['E-commerce Team', 'Content Management', 'Ops'],
    lessonsLearned:
      'Incremental migration to microservices and rigorous containerization best practices are essential for large-scale asset handling.',
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
    challenges:
      'Ensuring robust SEO performance while transitioning to container-based deployments and Amazon S3 for scalable storage.',
    impact:
      'Improved search engine rankings; introduced repeatable infrastructure-as-code with Terraform across multiple environments.',
    teamSize: 6,
    stakeholders: ['SEO Team', 'Marketing Dept.', 'Infrastructure Leads'],
    lessonsLearned:
      'Automating pipelines, optimizing Nginx for caching, and implementing consistent IaC transforms development velocity and SEO agility.',
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
    challenges:
      'Reducing VM provisioning times from multiple days down to hours, streamlining resource allocation and automation.',
    impact:
      'Significantly improved operational efficiency; cut manual overhead in VM lifecycle management.',
    teamSize: 5,
    stakeholders: ['Data Center Ops', 'App Development Teams', 'IT Leadership'],
    lessonsLearned:
      'Automating virtual machine lifecycles via scripting and adopting best practices for code cleanliness ensures maintainable, scalable IaaS solutions.',
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
    challenges:
      'Synchronizing over one million user profiles across multiple systems, improving campaign relevancy, and ensuring data integrity.',
    impact:
      '25% higher campaign engagement; streamlined workflows on Salesforce, boosting marketing ROI.',
    teamSize: 4,
    stakeholders: ['CMO Office', 'Marketing Ops', 'IT Integrations'],
    lessonsLearned:
      'Automated data syncing and custom Salesforce workflows significantly reduce human error and improve campaign personalization.',
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
    challenges:
      'Automating repetitive media workflows while maintaining broadcast reliability and reducing overall operational costs.',
    impact:
      'Increased content delivery speed; saved significant manual effort in day-to-day media processing for key broadcasting channels.',
    teamSize: 5,
    stakeholders: ['Editors', 'Broadcast Technical Staff', 'Operational Leads'],
    lessonsLearned:
      'Object-Oriented best practices and strategic API integrations enable robust, maintainable solutions in fast-paced media environments.',
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
        description: 'Increased daily broadcast volume'
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
