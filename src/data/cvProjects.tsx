// src/data/cvProjects.tsx

import {
  Shield, Building2, DollarSign, Landmark, Cloud, CircuitBoard, Cpu, Server, Key, Settings, Mail,
  Terminal, Database, Code2, GitBranch, Box as BoxIcon, Layers
} from 'lucide-react';

export interface CVProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  technologyIcons: any[];
  role: string;
  bannerText: string;
  icon: any;
  iconColor: string;
  clientName: string;
  challenges: string;
  impact: string;
  approach: {
    step: number;
    title: string;
    description: string;
  }[];
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

// ✅ Map Technologies to Icons
const technologyIconMap = {
  ".NET Core": Code2,        // Good match - general code icon
  "Java": Terminal,          // Could be more specific (e.g., a coffee cup icon)
  "WebSockets": GitBranch,    // Not a strong connection - maybe a network icon?
  "RabbitMQ": Database,      // RabbitMQ is a message queue, not a database
  "MQTT": Layers,            // Okay, but could be more specific (e.g., a message icon)
  "Docker": Server,          // Good match - containerization
  "Kubernetes": Cloud,       // Good match - orchestration
  "Terraform": BoxIcon,      // Okay, but could be more infrastructure-focused
  "AWS": Cloud,              // Good match
  "Azure": Landmark,         // Not a strong connection - maybe a cloud with an 'A'?
  "C#": Cpu,                // Good match
  "EF Core": Database,      // EF Core is an ORM, not a database
  "SQL": Database,          // Good match
  "Brighter CQRS": Key,     // Okay, but could be more specific to CQRS
};

export const cvProjects: CVProject[] = [
  {
    id: '1',
    name: 'Airspace Security & Drone Defense',
    description: 'Real-time threat detection and situational intelligence platform for critical infrastructures.',
    technologies: ['.NET Core', 'Java', 'WebSockets', 'RabbitMQ', 'MQTT', 'Docker', 'Kubernetes'],
    technologyIcons: [Code2, Database, GitBranch, Terminal],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Counter-Drone & Security Intelligence',
    icon: Shield,
    iconColor: 'text-blue-600',
    clientName: 'OSL Technologies',
    challenges: 'Bringing multiple sensor and radar feeds under one unified system with sub-second latency.',
    impact: 'Enabled proactive identification of security risks; reduced threat response times by 40%.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed security challenges in drone threat detection.' },
      { step: 2, title: 'Architect the solution', description: 'Designed an event-driven architecture with real-time messaging.' },
      { step: 3, title: 'Implement core features', description: 'Developed RabbitMQ-based event processing for radar feeds.' },
      { step: 4, title: 'Test & optimize', description: 'Fine-tuned detection models to minimize false positives.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented CI/CD for rapid security patches & enhancements.' }
    ],
    teamSize: 8,
    stakeholders: ['Airport Security Directors', 'Major Sporting Event Organizers'],
    lessonsLearned: 'Edge computing and real-time analytics are key in security systems.',
    timeline: 'June 2024 – Present',
    achievements: ['Developed microservices for data streaming', 'Prototyped ML models for predictive threat detection'],
    measurableOutcomes: {
      before: { percentage: '60%', description: 'Reliance on manual threat identification' },
      after: { percentage: '40%', description: 'Reduction in response times through automation' }
    },
    metrics: [
      { label: 'Latency', value: '<500ms', description: 'Real-time data feed from radars' },
      { label: 'Threat Detection', value: '40% faster', description: 'Faster response vs. legacy systems' },
      { label: 'False Alarms', value: '-80%', description: 'Automated classification & filtering' }
    ]
  },
  {
    id: '2',
    name: 'Digital Justice Platform',
    description: 'GDS-compliant digital services modernizing legal proceedings, including online pleas and certification applications.',
    technologies: ['Terraform', 'Helm', 'Kubernetes', 'AWS', 'Azure', 'Node.js', 'Java', '.NET'],
    technologyIcons: [BoxIcon, Server, GitBranch, Cloud, Key],
    role: 'Technical Lead',
    bannerText: 'Government Digital Services (GDS)',
    icon: Building2,
    iconColor: 'text-purple-600',
    clientName: 'HM Courts & Tribunals Service',
    challenges: 'Ensuring accessibility, integrating with legacy systems, and securing cloud-based infrastructure.',
    impact: 'Achieved 95% user satisfaction; cut form completion times by 50%.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Identified inefficiencies in digital justice processes.' },
      { step: 2, title: 'Architect the solution', description: 'Designed a cloud-native infrastructure using Terraform & Helm.' },
      { step: 3, title: 'Implement core features', description: 'Developed fully accessible web forms following GDS guidelines.' },
      { step: 4, title: 'Test & optimize', description: 'Ran user tests for accessibility compliance and scalability.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented automated deployments with monitoring & logging.' }
    ],
    teamSize: 9,
    stakeholders: ['Ministry of Justice', 'GDS Compliance Teams', 'Disability Advocacy Groups'],
    lessonsLearned: 'Accessibility audits and DevOps best practices ensure long-term stability.',
    timeline: 'March 2023 – February 2024',
    achievements: ['Launched fully accessible legal forms', 'Optimized CI/CD pipelines for faster deployments'],
    measurableOutcomes: {
      before: { percentage: '40%', description: 'User satisfaction with legacy system' },
      after: { percentage: '95%', description: 'User satisfaction post-migration' }
    },
    metrics: [
      { label: 'Form Completion Time', value: '-50%', description: 'Faster digital process vs. paper forms' },
      { label: 'Accessibility Score', value: 'WCAG 2.1 AA', description: 'Compliance rating achieved' },
      { label: 'Deployment Frequency', value: 'Weekly', description: 'Automated CI/CD pipeline' }
    ]
  },
  {

      id: '3',
    name: 'High-Performance Cash Optimization',
    description: 'A cutting-edge cash deposit platform enabling real-time rate adjustments and compliance tracking.',
    technologies: ['.NET Core', 'C#', 'EF Core', 'Azure', 'SQL', 'Brighter CQRS'],
    technologyIcons: [Database, Code2, Terminal, Layers],
    role: 'Senior .NET Developer',
    bannerText: 'FinTech Yield Maximization',
    icon: DollarSign,
    iconColor: 'text-green-600',
    clientName: 'Flagstone',
    challenges: 'Handling £1B+ daily transactions while maintaining sub-5ms latency.',
    impact: 'Boosted customer returns with real-time interest optimization.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Identify inefficiencies in cash deposit management.' },
      { step: 2, title: 'Architect the solution', description: 'Designed an event-driven, highly scalable architecture.' },
      { step: 3, title: 'Implement core features', description: 'Built a CQRS-based transaction processing system.' },
      { step: 4, title: 'Test & optimize', description: 'Performed load testing to ensure sub-5ms response time.' },
      { step: 5, title: 'Deploy & maintain', description: 'Automated deployments with Azure DevOps CI/CD.' }
    ],
    teamSize: 5,
    stakeholders: ['Financial Controllers', 'Compliance Officers', 'Product Owners'],
    lessonsLearned: 'CQRS improves scalability in financial transaction systems.',
    timeline: 'October 2022 – March 2023',
    achievements: ['FCA-compliant transaction pipeline', 'Optimized CI/CD pipelines reducing deployment time by 50%'],
    measurableOutcomes: {
      before: { percentage: '10ms', description: 'Previous transaction latency' },
      after: { percentage: '5ms', description: 'Optimized real-time calculations' }
    },
    metrics: [
      { label: 'Daily Transaction Volume', value: '£1B+', description: 'Real-time interest adjustments' },
      { label: 'Build Times', value: '-50%', description: 'Streamlined CI/CD pipeline' },
      { label: 'Latency', value: '5ms', description: 'Real-time transaction handling' }
    ]
  },
  {
    id: '4',
    name: 'Cloud-Native BaaS Platform',
    description: 'Building core banking features (KYC, onboarding, account management) in a secure, multi-tenant environment.',
    technologies: ['.NET Core', 'Vue.js', 'Azure', 'Azure API Management'],
    technologyIcons: [Cloud, Server, GitBranch, Code2],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Banking-as-a-Service',
    icon: Landmark,
    iconColor: 'text-indigo-600',
    clientName: 'Omnio',
    challenges: 'Enabling multi-tenant architecture under strict regulations (PSD2).',
    impact: 'Reduced client onboarding time by 30%.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyze banking compliance requirements and scalability needs.' },
      { step: 2, title: 'Architect the solution', description: 'Designed a multi-tenant BaaS architecture using JWT authentication.' },
      { step: 3, title: 'Implement core features', description: 'Developed secure onboarding flows (KYC, AML checks).' },
      { step: 4, title: 'Test & optimize', description: 'Conducted security audits and penetration testing.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented monitoring with Prometheus and Grafana.' }
    ],
    teamSize: 7,
    stakeholders: ['Partner Banks', 'Compliance Teams', 'Product Managers'],
    lessonsLearned: 'Multi-tenant security is crucial for BaaS platforms.',
    timeline: 'February 2022 – May 2022',
    achievements: ['Implemented secure onboarding flows (KYC, AML checks)', 'Successfully passed regulatory sandbox testing'],
    measurableOutcomes: {
      before: { percentage: '70%', description: 'Manual onboarding overhead' },
      after: { percentage: '99.99%', description: 'Platform availability achieved' }
    },
    metrics: [
      { label: 'Onboarding Time', value: '30% reduction', description: 'Time to integrate new partners' },
      { label: 'Availability', value: '99.99%', description: 'SLA for critical BaaS operations' },
      { label: 'PSD2 Compliance', value: '100%', description: 'Regulatory readiness' }
    ]
  },

  {
    id: '5',
    name: 'Multi-Cloud Self-Service Portal',
    description: 'Enabling developers to rapidly provision secure AWS resources, streamlining infrastructure management.',
    technologies: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'Helm', 'Octopus Deploy'],
    technologyIcons: [Cloud, GitBranch, Code2, Layers],
    role: 'Full Stack / Platform Engineer',
    bannerText: 'Cloud Transformation',
    icon: Cloud,
    iconColor: 'text-sky-500',
    clientName: 'StepStone UK',
    challenges: 'Migrating legacy apps onto AWS while maintaining reliability.',
    impact: 'Reduced provisioning times from days to minutes, strengthened security.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Identified inefficiencies in infrastructure provisioning.' },
      { step: 2, title: 'Architect the solution', description: 'Designed a multi-cloud self-service portal using Terraform and Helm.' },
      { step: 3, title: 'Implement core features', description: 'Developed automated workflows for rapid deployment.' },
      { step: 4, title: 'Test & optimize', description: 'Ensured security compliance and efficiency through rigorous testing.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented monitoring with Prometheus and centralized logging.' }
    ],
    teamSize: 6,
    stakeholders: ['CTO Office', 'Security Team', 'Dev Leads'],
    lessonsLearned: 'Automated secrets management drastically improves security.',
    timeline: 'July 2020 – March 2021',
    achievements: ['Developed enterprise secrets management solution', 'Standardized IaC templates'],
    measurableOutcomes: {
      before: { percentage: '3 days', description: 'Legacy provisioning for new microservices' },
      after: { percentage: '30 min', description: 'Automated self-service provisioning' }
    },
    metrics: [
      { label: 'Developer Onboarding', value: '50% faster', description: 'Time to first commit' },
      { label: 'Provisioning Time', value: 'Minutes vs days', description: 'Self-service advantage' },
      { label: 'Security Incidents', value: '-75%', description: 'Centralized IaC best practices' }
    ]
  },
  {
    id: '6',
    name: 'Commercial REST APIs & DevOps',
    description: 'Designing a scalable microservices platform for global REST APIs, focusing on zero-downtime deployments.',
    technologies: ['.NET Core', 'Azure Kubernetes Service (AKS)', 'Terraform', 'Helm', 'Azure DevOps'],
    technologyIcons: [Server, GitBranch, Code2, Terminal],
    role: 'Lead .NET Software Engineer',
    bannerText: 'Enterprise-Scale Microservices',
    icon: Server,
    iconColor: 'text-red-600',
    clientName: 'Philip Morris International',
    challenges: 'Optimizing container orchestration for high availability.',
    impact: 'Reduced deployment time by 80%, improved reliability.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed bottlenecks in microservices deployment.' },
      { step: 2, title: 'Architect the solution', description: 'Designed scalable REST APIs using Azure Kubernetes Service.' },
      { step: 3, title: 'Implement core features', description: 'Developed API gateway for global commercial teams.' },
      { step: 4, title: 'Test & optimize', description: 'Implemented load balancing and automated scaling.' },
      { step: 5, title: 'Deploy & maintain', description: 'Automated CI/CD pipelines for zero-downtime deployment.' }
    ],
    teamSize: 8,
    stakeholders: ['Global Commercial Teams', 'Security Engineers', 'Ops Personnel'],
    lessonsLearned: 'Zero-downtime deployment is essential for enterprise-scale systems.',
    timeline: 'April 2019 – September 2020',
    achievements: ['Implemented advanced CI/CD across environments', 'Improved platform performance via auto-scaling'],
    measurableOutcomes: {
      before: { percentage: '40%', description: 'Legacy deployment downtime' },
      after: { percentage: '99.95%', description: 'API availability post-implementation' }
    },
    metrics: [
      { label: 'Operational Costs', value: '30% reduction', description: 'Reduction in cloud spend' },
      { label: 'Release Frequency', value: 'Daily', description: 'Deployment frequency vs weekly' },
      { label: 'Deployment Time', value: '8min', description: 'Average production deployment' }
    ]
  },

  {
    id: '7',
    name: 'Digital Asset Management Modernization',
    description: 'Revamped a monolithic DAM platform to microservices, improving scalability, performance, and maintainability.',
    technologies: ['.NET Core', 'Azure', 'Docker', 'Microservices Architecture'],
    technologyIcons: [CircuitBoard, Server, Code2, Terminal],
    role: 'Software Engineer',
    bannerText: 'Fashion E-Commerce Evolution',
    icon: CircuitBoard,
    iconColor: 'text-orange-600',
    clientName: 'ASOS',
    challenges: 'Ensuring zero disruption to high-traffic e-commerce while migrating assets.',
    impact: 'Improved system reliability and scalability.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Identified monolithic bottlenecks affecting performance.' },
      { step: 2, title: 'Architect the solution', description: 'Designed microservices-based DAM with Azure integration.' },
      { step: 3, title: 'Implement core features', description: 'Built asset indexing and storage APIs.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted high-traffic load tests to validate scalability.' },
      { step: 5, title: 'Deploy & maintain', description: 'Monitored with Prometheus and implemented continuous updates.' }
    ],
    teamSize: 5,
    stakeholders: ['E-commerce Team', 'Content Management', 'Ops'],
    lessonsLearned: 'Incremental microservices migration prevents system downtime.',
    timeline: 'September 2018 – January 2019',
    achievements: ['Reduced downtime during peak seasons', 'Optimized system for high-volume asset processing'],
    measurableOutcomes: {
      before: { percentage: '70%', description: 'Previous asset delivery latency' },
      after: { percentage: '<500ms', description: 'Optimized asset delivery speed' }
    },
    metrics: [
      { label: 'Conversion Rate', value: '15%', description: 'Increase in sales performance' },
      { label: 'Asset Delivery', value: '<500ms', description: '95th percentile performance' },
      { label: 'Deployment Speed', value: '5min', description: 'Container rollouts' }
    ]
  },
  {
    id: '8',
    name: 'Containerized Microservices & SEO',
    description: 'Architected and deployed containerized .NET Core services on Amazon ECS to enhance SEO-driven traffic.',
    technologies: ['.NET Core', 'Docker', 'Amazon ECS', 'Terraform', 'Nginx', 'SQL Server', 'DynamoDB'],
    technologyIcons: [Settings, Cloud, Terminal, GitBranch],
    role: 'Lead Developer',
    bannerText: 'Scalable Web Infrastructure',
    icon: Settings,
    iconColor: 'text-emerald-600',
    clientName: 'StepStone UK',
    challenges: 'Ensuring robust SEO performance while transitioning to container-based deployments.',
    impact: 'Boosted organic traffic and improved SEO rankings.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed website performance bottlenecks affecting SEO.' },
      { step: 2, title: 'Architect the solution', description: 'Designed containerized microservices infrastructure.' },
      { step: 3, title: 'Implement core features', description: 'Optimized Nginx caching and dynamic content delivery.' },
      { step: 4, title: 'Test & optimize', description: 'Ran performance benchmarks and SEO audits.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented CI/CD pipelines for rapid iteration.' }
    ],
    teamSize: 6,
    stakeholders: ['SEO Team', 'Marketing Dept.', 'Infrastructure Leads'],
    lessonsLearned: 'Caching optimization drastically improves page load times.',
    timeline: 'April 2016 – August 2018',
    achievements: ['Integrated S3-based workflows for media handling', 'Automated container rollouts'],
    measurableOutcomes: {
      before: { percentage: '40%', description: 'Original SEO ranking' },
      after: { percentage: '300%', description: 'Organic traffic increase YOY' }
    },
    metrics: [
      { label: 'Page Load', value: '<1s', description: 'Average load time' },
      { label: 'Cache Hit Rate', value: '95%', description: 'Nginx cache efficiency' },
      { label: 'Build Times', value: '3min', description: 'Average container builds' }
    ]
  },
  {
    id: '9',
    name: 'Private Cloud IaaS Platform',
    description: 'Built an internal infrastructure-as-a-service to provision VMs via Citrix Xen and VMware vSphere pools.',
    technologies: ['.NET', 'Angular', 'Citrix Xen', 'VMware', 'PowerShell'],
    technologyIcons: [Cpu, Server, Terminal, Database],
    role: 'Senior Developer',
    bannerText: 'Enterprise Private Cloud',
    icon: Cpu,
    iconColor: 'text-teal-500',
    clientName: 'Tesco PLC',
    challenges: 'Reducing VM provisioning times from multiple days down to hours.',
    impact: 'Significantly improved operational efficiency and automation.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Identified inefficiencies in VM provisioning workflows.' },
      { step: 2, title: 'Architect the solution', description: 'Designed an API-driven provisioning platform.' },
      { step: 3, title: 'Implement core features', description: 'Automated VM lifecycle management with PowerShell and .NET APIs.' },
      { step: 4, title: 'Test & optimize', description: 'Ran infrastructure stress tests to validate reliability.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented logging, monitoring, and alerting for proactive management.' }
    ],
    teamSize: 5,
    stakeholders: ['Data Center Ops', 'App Development Teams', 'IT Leadership'],
    lessonsLearned: 'Automation is key to reducing operational overhead.',
    timeline: 'April 2015 – April 2016',
    achievements: ['Cut provisioning times from 5 days to 2 hours', 'Adopted best practices for cloud-based development'],
    measurableOutcomes: {
      before: { percentage: '5 days', description: 'Original provisioning time' },
      after: { percentage: '2hr', description: 'Average provisioning time' }
    },
    metrics: [
      { label: 'OpEx Savings', value: '£1.2M', description: 'Annual savings' },
      { label: 'Provisioning Time', value: '2hr', description: 'Average from 5 days' },
      { label: 'API Reliability', value: '99.9%', description: 'Success rate' }
    ]
  },
  {
    id: '10',
    name: 'Salesforce Marketing Automation',
    description: 'Integrated SaaS marketing platform with internal CRMs to drive seamless email campaigns and outreach.',
    technologies: ['C#', 'Salesforce', 'API Integrations', 'Marketing Cloud', 'SQL'],
    technologyIcons: [Mail, Database, Code2, Terminal],
    role: 'Lead Consultant',
    bannerText: 'Omni-Channel Marketing Engagement',
    icon: Mail,
    iconColor: 'text-rose-600',
    clientName: 'Totaljobs Group',
    challenges: 'Synchronizing over one million user profiles across multiple systems.',
    impact: '25% higher campaign engagement and improved marketing ROI.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Addressed inefficiencies in marketing automation workflows.' },
      { step: 2, title: 'Architect the solution', description: 'Designed a scalable integration between Salesforce and internal CRMs.' },
      { step: 3, title: 'Implement core features', description: 'Built automated email triggers and real-time customer segmentation.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted A/B testing to improve email engagement rates.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented monitoring for email deliverability and CRM sync performance.' }
    ],
    teamSize: 4,
    stakeholders: ['CMO Office', 'Marketing Ops', 'IT Integrations'],
    lessonsLearned: 'Personalization and automation drive higher marketing ROI.',
    timeline: 'July 2014 – March 2015',
    achievements: ['Integrated SaaS platform for robust email marketing', 'Optimized Salesforce environment'],
    measurableOutcomes: {
      before: { percentage: '60%', description: 'Manual campaign setup' },
      after: { percentage: '25%', description: 'Increase in campaign CTR' }
    },
    metrics: [
      { label: 'ROI Improvement', value: '35%', description: 'Higher marketing ROI' },
      { label: 'API Latency', value: '<200ms', description: 'Sync operations' },
      { label: 'Workflow Automation', value: '70%', description: 'Manual steps reduced' }
    ]
  },
  {
    id: '11',
    name: 'Media Workflow Automation',
    description: 'Built an advanced automation system to streamline media processing for BBC broadcasting channels.',
    technologies: ['.NET Framework', 'C#', 'OOP', 'API Integrations', 'SQL'],
    technologyIcons: [Key, Database, Code2, Terminal],
    role: 'Contract Software Engineer',
    bannerText: 'Broadcast Efficiency & Innovation',
    icon: Key,
    iconColor: 'text-amber-600',
    clientName: 'BBC',
    challenges: 'Automating repetitive media workflows while maintaining broadcast reliability.',
    impact: 'Increased content delivery speed and reduced operational costs.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed inefficiencies in media workflow automation.' },
      { step: 2, title: 'Architect the solution', description: 'Designed an automated workflow for content ingestion and processing.' },
      { step: 3, title: 'Implement core features', description: 'Developed API-driven automation for media delivery.' },
      { step: 4, title: 'Test & optimize', description: 'Ran stress tests to ensure system stability under heavy workloads.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented logging and monitoring for continuous improvements.' }
    ],
    teamSize: 5,
    stakeholders: ['Editors', 'Broadcast Technical Staff', 'Operational Leads'],
    lessonsLearned: 'Strategic API integrations enable robust automation in media workflows.',
    timeline: 'March 2013 – June 2014',
    achievements: ['Reduced manual interventions, accelerating content deployment', 'Improved reliability and delivered cost savings'],
    measurableOutcomes: {
      before: { percentage: '60%', description: 'Manual processing time' },
      after: { percentage: '99.99%', description: 'Broadcast reliability achieved' }
    },
    metrics: [
      { label: 'Content Throughput', value: '2x', description: 'Increased daily broadcast volume' },
      { label: 'Processing Time', value: '<5min', description: 'For HD assets' },
      { label: 'QC Time', value: '50%', description: 'Faster quality checks' }
    ]
  }
];





