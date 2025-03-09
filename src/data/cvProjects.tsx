// src/data/cvProjects.tsx

import {
  Shield, Building2, DollarSign, Landmark, Cloud, CircuitBoard, Cpu, Server, Key, Settings, Mail,
  Terminal, Database, Code2, GitBranch, Box as BoxIcon, Layers, Code, BarChart3, Network
} from 'lucide-react';
import { Metric } from '../types/project';

export interface CVProject {
  id: string;
  name: string;
  description: string;
  metrics: Metric[];
  technologies: string[];
  technologyIcons: any[];
  role: string;
  bannerText: string;
  icon: any;
  tags?: string[];
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
  background?: string; // Gradient background for project cards
}

// Project backgrounds using gradients instead of images
export const projectBackgrounds = {
  '1': 'linear-gradient(135deg, #1a237e, #283593)', // Security (dark blue)
  '2': 'linear-gradient(135deg, #4a148c, #6a1b9a)', // Government (purple)
  '3': 'linear-gradient(135deg, #004d40, #00695c)', // Finance (green)
  '4': 'linear-gradient(135deg, #0d47a1, #1565c0)', // Banking (blue)
  '5': 'linear-gradient(135deg, #006064, #00838f)', // Cloud (teal)
  '6': 'linear-gradient(135deg, #b71c1c, #c62828)', // Enterprise (red)
  '7': 'linear-gradient(135deg, #e65100, #ef6c00)', // E-commerce (orange)
  '8': 'linear-gradient(135deg, #1b5e20, #2e7d32)', // SEO/Web (green)
  '9': 'linear-gradient(135deg, #01579b, #0277bd)', // IaaS/Private Cloud (blue)
  '10': 'linear-gradient(135deg, #880e4f, #ad1457)', // Marketing (pink)
  '11': 'linear-gradient(135deg, #ff6f00, #ff8f00)', // Media (amber)
};

// ✅ Map Technologies to Icons
export const technologyIconMap = {
  ".NET Core": { 
    icon: Code,  
    color: '#512bd4'  // .NET purple
  },
  "Java": {
    icon: Terminal,
    color: '#007396'  // Java blue
  },
  "AWS": {
    icon: Cloud,
    color: '#FF9900'  // AWS orange
  },
  "Docker": {
    icon: Server,
    color: '#2496ED'  // Docker blue
  },
  "Kubernetes": {
    icon: Cloud,
    color: '#326CE5'  // Kubernetes blue
  },
  "React": {
    icon: CircuitBoard,
    color: '#61DAFB'  // React cyan
  },
  "TypeScript": {
    icon: Code2,
    color: '#3178C6'  // TypeScript blue
  },
  "CQRS": {
    icon: Database,
    color: '#7B68EE'  // Medium slate blue
  },
  "Azure": {
    icon: Cloud,
    color: '#0078D4'  // Azure blue
  },
  "Terraform": {
    icon: Settings,
    color: '#7B42BC'  // Terraform purple
  },
  "RabbitMQ": {
    icon: Network,
    color: '#FF6600'  // RabbitMQ orange
  },
  "Microservices": {
    icon: BoxIcon,
    color: '#43A047'  // Green
  },
  "CI/CD": {
    icon: GitBranch,
    color: '#F05033'  // Git red
  },
  "Analytics": {
    icon: BarChart3,
    color: '#1976D2'  // Blue
  }
};

export const cvProjects: CVProject[] = [
  {
    id: '1',
    name: 'Airspace Security & Drone Defense',
    description: 'Built a mission-critical platform integrating radar, RF sensors, and cameras to detect, classify, and respond to unauthorized drones near airports and critical infrastructure.',
    technologies: ['.NET Core', 'Java', 'WebSockets', 'RabbitMQ', 'MQTT', 'Docker', 'Kubernetes', 'gRPC', 'Machine Learning'],
    technologyIcons: [Code2, Database, GitBranch, Terminal],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Counter-Drone & Security Intelligence',
    icon: Shield,
    iconColor: 'text-blue-600',
    clientName: 'OSL Technologies',
    challenges: 'Designed a high-throughput event processing system capable of fusing multiple sensor feeds with sub-second latency while filtering out false positives in noise-heavy environments.',
    impact: 'System deployed at major international airports, reducing false alarms by 80% and accelerating threat response by 40%, directly enhancing public safety at high-value infrastructure.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Created a comprehensive threat model for identifying and classifying drone intrusions in sensitive airspace.' },
      { step: 2, title: 'Architect the solution', description: 'Designed a distributed, fault-tolerant architecture using RabbitMQ for real-time event streaming across detection systems.' },
      { step: 3, title: 'Implement core features', description: 'Developed high-performance services using gRPC and WebSockets to process 500+ events/second with consistent sub-200ms latency.' },
      { step: 4, title: 'Test & optimize', description: 'Created simulation tools for load testing and trained ML models to achieve 95% threat classification accuracy in noisy environments.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented K8s-based deployment with automated failover and comprehensive observability via ELK stack and Prometheus.' }
    ],
    teamSize: 8,
    stakeholders: ['Airport Security Directors', 'Major Sporting Event Organizers', 'Military Command'],
    lessonsLearned: 'Real-time event streaming requires thoughtful backpressure handling and redundancy mechanisms at every system layer to maintain reliability.',
    timeline: 'June 2024 – Present',
    achievements: [
      'Architected real-time event processing pipeline handling 10,000+ sensor readings per minute',
      'Implemented ML-based threat classification reducing false positives by 80%',
      'Designed system meeting stringent security standards for deployment at critical national infrastructure'
    ],
    measurableOutcomes: {
      before: { percentage: '60%', description: 'Manual threat identification with high false positive rate' },
      after: { percentage: '40%', description: 'Reduction in response times through automated threat classification' }
    },
    metrics: [
      { label: 'Latency', value: '<500ms', description: 'End-to-end detection-to-response time' },
      { label: 'Threat Detection', value: '40% faster', description: 'Reduced time to identify genuine threats' },
      { label: 'False Alarms', value: '-80%', description: 'Reduction through advanced ML filtering' }
    ],
    background: projectBackgrounds['1']
  },
  {
    id: '2',
    name: 'Digital Justice Platform',
    description: 'Led the development of a secure, accessible digital platform modernizing the UK courts system, allowing citizens to submit legal applications, track cases, and attend virtual hearings.',
    technologies: ['Terraform', 'Helm', 'Kubernetes', 'AWS', 'Azure', 'Node.js', 'Java', '.NET', 'Python', 'React'],
    technologyIcons: [BoxIcon, Server, GitBranch, Cloud, Key],
    role: 'Technical Lead',
    bannerText: 'Government Digital Services (GDS)',
    icon: Building2,
    iconColor: 'text-purple-600',
    clientName: 'HM Courts & Tribunals Service',
    challenges: 'Developed a highly secure, WCAG 2.1 AA accessible platform integrating with legacy court systems while meeting stringent government security standards and handling sensitive personal data.',
    impact: 'Reduced form completion time by 50% and achieved 95% user satisfaction, substantially increasing access to justice for citizens including those with disabilities.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Conducted workshops with judges, court staff, and citizens to identify pain points in the existing paper-based system.' },
      { step: 2, title: 'Architect the solution', description: 'Created a secure, cloud-native infrastructure using Terraform for IaC and JWT/OAuth2 for authentication with multi-factor security.' },
      { step: 3, title: 'Implement core features', description: 'Built progressive web applications with screen reader compatibility and automated form validation to streamline application processes.' },
      { step: 4, title: 'Test & optimize', description: 'Performed comprehensive accessibility testing with disabled users and conducted penetration testing to ensure data security.' },
      { step: 5, title: 'Deploy & maintain', description: 'Established CI/CD pipelines with blue-green deployments for zero-downtime updates and automated compliance checking.' }
    ],
    teamSize: 9,
    stakeholders: ['Ministry of Justice', 'GDS Compliance Teams', 'Court Staff', 'Legal Aid Representatives', 'Disability Advocacy Groups'],
    lessonsLearned: 'Building truly accessible, secure government systems requires involving diverse users from the earliest design stages through to final acceptance testing.',
    timeline: 'March 2023 – February 2024',
    achievements: [
      'Delivered a WCAG 2.1 AA compliant platform used by over 50,000 citizens per month',
      'Implemented secure integration with legacy court management systems',
      'Set up automated CI/CD pipelines reducing deployment times from days to minutes',
      'Established comprehensive security protocols meeting National Cyber Security Centre standards'
    ],
    measurableOutcomes: {
      before: { percentage: '40%', description: 'User satisfaction with legacy paper-based system' },
      after: { percentage: '95%', description: 'User satisfaction with new digital platform' }
    },
    metrics: [
      { label: 'Form Completion Time', value: '-50%', description: 'Reduction vs. paper processes' },
      { label: 'Accessibility Score', value: 'WCAG 2.1 AA', description: 'Compliant with disability standards' },
      { label: 'Deployment Frequency', value: 'Daily', description: 'Automated security-validated deployments' }
    ],
    background: projectBackgrounds['2']
  },
  {
    id: '3',
    name: 'High-Performance Cash Optimization',
    description: 'Engineered a financial platform handling £1B+ daily transactions that automatically optimizes interest rates across multiple banks, ensuring FCA compliance while delivering microsecond-level performance.',
    technologies: ['.NET Core', 'C#', 'EF Core', 'Azure', 'SQL', 'Brighter CQRS', 'Domain-Driven Design', 'Azure Kubernetes Service'],
    technologyIcons: [Database, Code2, Terminal, Layers],
    role: 'Senior .NET Developer',
    bannerText: 'FinTech Yield Maximization',
    icon: DollarSign,
    iconColor: 'text-green-600',
    clientName: 'Flagstone',
    challenges: 'Developed a system capable of processing thousands of financial transactions per second with 5ms latency, while maintaining ACID compliance and meeting rigorous FCA regulatory requirements.',
    impact: 'Platform now manages billions in assets, maximizing customer returns through automated interest rate optimization while ensuring complete regulatory compliance and audit trails.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed performance bottlenecks in existing financial transaction processing and regulatory compliance gaps.' },
      { step: 2, title: 'Architect the solution', description: 'Designed a CQRS architecture with event sourcing to handle high-throughput financial transactions while maintaining full audit trails.' },
      { step: 3, title: 'Implement core features', description: 'Built optimized SQL queries and implemented strategic caching to achieve sub-5ms response times for critical financial operations.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted extensive load testing simulating peak transaction volumes and implemented comprehensive error handling with automatic retries.' },
      { step: 5, title: 'Deploy & maintain', description: 'Created a blue-green deployment strategy using Azure DevOps for zero-downtime upgrades of the financial platform.' }
    ],
    teamSize: 5,
    stakeholders: ['Financial Controllers', 'Compliance Officers', 'Product Owners', 'Bank Partners', 'High-Net-Worth Clients'],
    lessonsLearned: 'Event-sourced CQRS architectures provide both the performance and audit capabilities essential for financial systems when implemented with careful attention to consistency boundaries.',
    timeline: 'October 2022 – March 2023',
    achievements: [
      'Architected high-throughput transaction system handling £1B+ daily with sub-5ms latency',
      'Implemented comprehensive compliance monitoring meeting FCA requirements',
      'Reduced deployment pipeline time by 50% while enhancing reliability',
      'Designed real-time interest rate optimization engine increasing client returns'
    ],
    measurableOutcomes: {
      before: { percentage: '10ms', description: 'Previous transaction processing latency' },
      after: { percentage: '5ms', description: 'Optimized transaction processing time' }
    },
    metrics: [
      { label: 'Daily Transaction Volume', value: '£1B+', description: 'Processed with complete reliability' },
      { label: 'Build Times', value: '-50%', description: 'Deployment pipeline optimization' },
      { label: 'Latency', value: '5ms', description: '99th percentile response time' }
    ],
    background: projectBackgrounds['3']
  },
  {
    id: '4',
    name: 'Cloud-Native Banking-as-a-Service',
    description: 'Developed core components of a multi-tenant banking platform enabling fintech startups to offer banking services through a secure API ecosystem, complete with KYC, fraud detection, and real-time transaction processing.',
    technologies: ['.NET Core', 'Vue.js', 'Azure', 'Azure API Management', 'Azure Service Bus', 'Redis', 'SQL Server', 'MongoDB'],
    technologyIcons: [Cloud, Server, GitBranch, Code2],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Banking-as-a-Service',
    icon: Landmark,
    iconColor: 'text-indigo-600',
    clientName: 'Omnio',
    challenges: 'Built a multi-tenant banking architecture that maintained strict data isolation while meeting PSD2, GDPR, and open banking security standards, with guaranteed high availability for financial transactions.',
    impact: 'Platform enabled fintech startups to launch banking products in weeks instead of months, with 30% faster onboarding and 99.99% availability for critical financial operations.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed regulatory requirements and identified key banking services needed by fintech startups.' },
      { step: 2, title: 'Architect the solution', description: 'Designed multi-tenant architecture with strong isolation using JWT-based authentication and tenant-specific encryption.' },
      { step: 3, title: 'Implement core features', description: 'Built secure API gateway with rate limiting, automated KYC flows, and real-time transaction monitoring.' },
      { step: 4, title: 'Test & optimize', description: 'Performed penetration testing, data isolation testing, and transaction performance optimization.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented comprehensive monitoring with Prometheus, Grafana, and ELK stack for regulatory compliance reporting.' }
    ],
    teamSize: 7,
    stakeholders: ['Partner Banks', 'Compliance Teams', 'Product Managers', 'Fintech Clients', 'Financial Regulators'],
    lessonsLearned: 'Secure multi-tenant architectures require carefully designed database schemas, tenant context propagation, and comprehensive encryption strategies throughout the technology stack.',
    timeline: 'February 2022 – May 2022',
    achievements: [
      'Designed secure multi-tenant architecture processing millions in daily transactions',
      'Built automated KYC and AML systems with 99.7% verification accuracy',
      'Implemented comprehensive security controls passing stringent PSD2 requirements',
      'Created developer portal and API documentation accelerating client integration'
    ],
    measurableOutcomes: {
      before: { percentage: '70%', description: 'Manual effort required for fintech onboarding' },
      after: { percentage: '99.99%', description: 'Platform uptime for critical financial services' }
    },
    metrics: [
      { label: 'Onboarding Time', value: '30% reduction', description: 'For new fintech partners' },
      { label: 'Availability', value: '99.99%', description: 'For core banking operations' },
      { label: 'PSD2 Compliance', value: '100%', description: 'All regulatory controls implemented' }
    ],
    background: projectBackgrounds['4']
  },
  {
    id: '5',
    name: 'Enterprise Self-Service Cloud Platform',
    description: 'Created a comprehensive developer platform enabling secure, compliant self-service provisioning of AWS infrastructure with built-in security controls, cost management, and automated CI/CD integration.',
    technologies: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'Helm', 'Octopus Deploy', 'GitLab CI', 'Python', 'Node.js', 'React'],
    technologyIcons: [Cloud, GitBranch, Code2, Layers],
    role: 'Full Stack / Platform Engineer',
    bannerText: 'Cloud Transformation',
    icon: Cloud,
    iconColor: 'text-sky-500',
    clientName: 'StepStone UK',
    challenges: 'Transformed a legacy infrastructure with 3+ day provisioning times into a self-service platform creating production-ready, security-compliant environments in minutes while enforcing governance.',
    impact: 'Reduced infrastructure provisioning from days to minutes, slashed developer onboarding time by 50%, and decreased security incidents by 75% through standardized templates and automated compliance checks.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Mapped existing manual provisioning workflows and identified key security and compliance requirements.' },
      { step: 2, title: 'Architect the solution', description: 'Designed a multi-account AWS architecture with service catalog, IAM roles, and security guardrails.' },
      { step: 3, title: 'Implement core features', description: 'Built self-service portal with Terraform modules for standardized infrastructure creation and integrated CI/CD pipelines.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted infrastructure security reviews and performance testing to validate resilience.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented comprehensive monitoring, cost optimization, and automated security patching.' }
    ],
    teamSize: 6,
    stakeholders: ['CTO Office', 'Security Team', 'Dev Leads', 'Financial Controllers', 'Development Teams'],
    lessonsLearned: 'Developer productivity skyrockets when infrastructure is provided as code with built-in security, but requires comprehensive guardrails and automated policy enforcement.',
    timeline: 'July 2020 – March 2021',
    achievements: [
      'Designed multi-account AWS architecture with complete security controls',
      'Created Terraform module library for standardized, compliant infrastructure',
      'Implemented secrets management solution securing thousands of credentials',
      'Built cost management dashboards providing team-level visibility'
    ],
    measurableOutcomes: {
      before: { percentage: '3 days', description: 'Average time to provision infrastructure' },
      after: { percentage: '30 min', description: 'Time to create compliant environments' }
    },
    metrics: [
      { label: 'Developer Onboarding', value: '50% faster', description: 'Reduction in time to productivity' },
      { label: 'Provisioning Time', value: '98% reduction', description: 'Days to minutes' },
      { label: 'Security Incidents', value: '-75%', description: 'Through standardized templates' }
    ],
    background: projectBackgrounds['5']
  },
  {
    id: '6',
    name: 'Global-Scale Microservices Platform',
    description: 'Architected a high-throughput, globally distributed API platform serving millions of transactions daily across 60+ countries with zero-downtime deployments and comprehensive observability.',
    technologies: ['.NET Core', 'Azure Kubernetes Service (AKS)', 'Terraform', 'Helm', 'Azure DevOps', 'Redis', 'Cosmos DB', 'Application Insights', 'Elastic Stack'],
    technologyIcons: [Server, GitBranch, Code2, Terminal],
    role: 'Lead .NET Software Engineer',
    bannerText: 'Enterprise-Scale Microservices',
    icon: Server,
    iconColor: 'text-red-600',
    clientName: 'Philip Morris International',
    challenges: 'Designed a cloud-native platform handling millions of transactions daily across 60+ countries with stringent requirements for high availability, data sovereignty, and zero-downtime deployments.',
    impact: 'Increased system reliability to 99.95% while reducing deployment times by 80% and cutting cloud infrastructure costs by 30% through automated scaling and optimization.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed global availability requirements, data residency needs, and performance bottlenecks.' },
      { step: 2, title: 'Architect the solution', description: 'Designed geo-distributed microservices architecture with regional data residency and global service mesh.' },
      { step: 3, title: 'Implement core features', description: 'Built auto-scaling API services, implemented circuit breakers, and created comprehensive authorization system.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted global load testing, chaos engineering, and performance optimization.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented blue-green deployments, canary releases, and comprehensive observability with distributed tracing.' }
    ],
    teamSize: 8,
    stakeholders: ['Global Commercial Teams', 'Security Engineers', 'Ops Personnel', 'Regional IT Managers', 'Global Infrastructure Team'],
    lessonsLearned: 'Global-scale systems require comprehensive observability, clear service boundaries, and regional data strategies to maintain performance while addressing data sovereignty requirements.',
    timeline: 'April 2019 – September 2020',
    achievements: [
      'Architected scalable platform handling 50+ million API calls daily',
      'Implemented zero-downtime deployment system across global infrastructure',
      'Designed data residency solution complying with regulations in 60+ countries',
      'Reduced cloud costs by 30% through resource optimization and auto-scaling'
    ],
    measurableOutcomes: {
      before: { percentage: '40%', description: 'Deployment downtime impacting global operations' },
      after: { percentage: '99.95%', description: 'Platform availability post-implementation' }
    },
    metrics: [
      { label: 'Operational Costs', value: '30% reduction', description: 'Through cloud optimization' },
      { label: 'Release Frequency', value: 'Daily', description: 'From weekly deployments' },
      { label: 'Deployment Time', value: '8min', description: 'Average for global updates' }
    ],
    background: projectBackgrounds['6']
  },
 {
    id: '7',
    name: 'E-Commerce DAM Modernization',
    description: 'Transformed ASOS\'s monolithic digital asset management system into a scalable, cloud-native platform serving millions of product images and videos to 24+ million customers with sub-500ms delivery time.',
    technologies: ['.NET Core', 'Azure Blob Storage', 'Docker', 'Kubernetes', 'Redis', 'Azure CDN', 'Message Queue', 'ElasticSearch', 'Event-Driven Architecture'],
    technologyIcons: [CircuitBoard, Server, Code2, Terminal],
    role: 'Software Engineer',
    bannerText: 'Fashion E-Commerce Evolution',
    icon: CircuitBoard,
    iconColor: 'text-orange-600',
    clientName: 'ASOS',
    challenges: 'Migrated a legacy monolithic asset system to microservices without disrupting the 24/7 e-commerce platform serving millions of customers and processing thousands of new fashion assets daily.',
    impact: 'Improved image delivery speed to under 500ms (95th percentile), increased website conversion rates by 15%, and enabled seamless handling of seasonal traffic spikes with auto-scaling.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed performance bottlenecks, identified scaling limitations, and mapped asset workflows.' },
      { step: 2, title: 'Architect the solution', description: 'Designed microservices-based DAM with CDN integration, caching strategy, and event-driven asset processing.' },
      { step: 3, title: 'Implement core features', description: 'Built asset ingestion pipeline, metadata indexing service, and image transformation microservices.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted high-volume load testing and optimized caching strategies for popular assets.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented blue-green deployments, auto-scaling, and comprehensive monitoring.' }
    ],
    teamSize: 5,
    stakeholders: ['E-commerce Team', 'Content Management', 'Ops', 'Marketing Teams', 'Studio Photographers'],
    lessonsLearned: 'Strategic caching and CDN integration are crucial for e-commerce asset delivery, while incremental migration using the strangler pattern minimizes business disruption.',
    timeline: 'September 2018 – January 2019',
    achievements: [
      'Designed auto-scaling architecture handling 2000+ image requests per second',
      'Implemented content delivery network reducing global latency by 62%',
      'Created event-driven pipeline processing 10,000+ new product images daily',
      'Built metadata search system with sub-100ms query response time'
    ],
    measurableOutcomes: {
      before: { percentage: '2.5s', description: 'Average image delivery time globally' },
      after: { percentage: '<500ms', description: '95th percentile image delivery time' }
    },
    metrics: [
      { label: 'Conversion Rate', value: '15%', description: 'Increase from faster page loads' },
      { label: 'Asset Delivery', value: '<500ms', description: 'Global delivery performance' },
      { label: 'Peak Capacity', value: '400%', description: 'Increased handling of traffic spikes' }
    ],
    background: projectBackgrounds['7']
  },
  {
    id: '8',
    name: 'SEO-Optimized Microservices Platform',
    description: 'Architected a high-performance web platform for StepStone job boards, using containerized microservices to deliver lightning-fast page loads while maximizing SEO performance and organic traffic.',
    technologies: ['.NET Core', 'Docker', 'Amazon ECS', 'Terraform', 'Nginx', 'Redis', 'SQL Server', 'DynamoDB', 'Elasticsearch'],
    technologyIcons: [Settings, Cloud, Terminal, GitBranch],
    role: 'Lead Developer',
    bannerText: 'Scalable Web Infrastructure',
    icon: Settings,
    iconColor: 'text-emerald-600',
    clientName: 'StepStone UK',
    challenges: 'Replatformed legacy job board to containerized microservices while improving SEO performance, page load speeds, and system scalability to handle millions of daily job searches.',
    impact: 'Achieved sub-1 second page loads, improved SEO rankings driving 300% increase in organic traffic, and implemented auto-scaling handling 5x traffic spikes during peak periods.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Conducted SEO audit, analyzed user engagement metrics, and identified performance bottlenecks.' },
      { step: 2, title: 'Architect the solution', description: 'Designed containerized microservices with API gateway, advanced caching strategy, and CDN integration.' },
      { step: 3, title: 'Implement core features', description: 'Built optimized Nginx configuration, implemented server-side rendering, and created static content generation.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted comprehensive SEO testing, load testing, and web vitals optimization.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented blue-green deployments, A/B testing capability, and real-time monitoring.' }
    ],
    teamSize: 6,
    stakeholders: ['SEO Team', 'Marketing Dept.', 'Infrastructure Leads', 'Product Managers', 'Content Teams'],
    lessonsLearned: 'Technical SEO success requires deep integration between infrastructure, content delivery, and performance optimization strategies alongside microservices architecture.',
    timeline: 'April 2016 – August 2018',
    achievements: [
      'Designed architecture delivering sub-1 second page loads globally',
      'Implemented advanced Nginx caching strategy with 95% hit rate',
      'Created containerized deployment process with consistent 3-minute build times',
      'Built real-time analytics dashboard for SEO performance monitoring'
    ],
    measurableOutcomes: {
      before: { percentage: '40%', description: 'Organic traffic from search engines' },
      after: { percentage: '300%', description: 'Increase in organic search traffic' }
    },
    metrics: [
      { label: 'Page Load', value: '<1s', description: '90th percentile performance' },
      { label: 'Cache Hit Rate', value: '95%', description: 'Optimized content delivery' },
      { label: 'Peak Traffic', value: '5x', description: 'Capacity for handling spikes' }
    ],
    background: projectBackgrounds['8']
  },
  {
    id: '9',
  name: 'Enterprise Private Cloud Platform',
  description: `Built Tesco's internal cloud platform, allowing teams to self-provision infrastructure in hours instead of weeks, accelerating development while standardizing security across the organization.`,
    technologies: ['.NET', 'Angular', 'Citrix Xen', 'VMware vSphere', 'PowerShell', 'SQL Server', 'RabbitMQ', 'Redis', 'Windows Server'],
    technologyIcons: [Cpu, Server, Terminal, Database],
    role: 'Senior Developer',
    bannerText: 'Enterprise Private Cloud',
    icon: Cpu,
    iconColor: 'text-teal-500',
    clientName: 'Tesco PLC',
    challenges: 'Transformed manual VM provisioning processes taking 5+ days into an automated self-service platform with proper governance, security controls, and integration with existing enterprise systems.',
    impact: 'Delivered £1.2M annual operational cost savings, reduced infrastructure provisioning from 5 days to 2 hours, and improved resource utilization by 40% across the enterprise.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Analyzed existing manual provisioning processes and identified automation opportunities across the infrastructure stack.' },
      { step: 2, title: 'Architect the solution', description: 'Designed an API-driven platform integrating with Citrix Xen and VMware vSphere with multi-level approval workflows.' },
      { step: 3, title: 'Implement core features', description: 'Built PowerShell-based automation framework, self-service portal, and resource governance system.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted extensive performance testing and implemented resource optimization algorithms.' },
      { step: 5, title: 'Deploy & maintain', description: 'Created comprehensive monitoring dashboard and implemented automated infrastructure maintenance.' }
    ],
    teamSize: 5,
    stakeholders: ['Data Center Ops', 'App Development Teams', 'IT Leadership', 'Finance Department', 'Security Team'],
    lessonsLearned: 'Even in traditional enterprise environments, infrastructure automation delivers transformative efficiency gains, but requires careful integration with existing operational processes.',
    timeline: 'April 2015 – April 2016',
    achievements: [
      'Reduced VM provisioning time by 97% (from 5 days to 2 hours)',
      'Designed governance system enforcing security and cost policies',
      'Implemented automated resource reclamation saving over £300,000 annually',
      'Created comprehensive documentation and training, achieving 90% adoption'
    ],
    measurableOutcomes: {
      before: { percentage: '5 days', description: 'Average infrastructure provisioning time' },
      after: { percentage: '2hr', description: 'Automated provisioning with governance' }
    },
    metrics: [
      { label: 'OpEx Savings', value: '£1.2M', description: 'Annual reduction in operating costs' },
      { label: 'Provisioning Time', value: '97% reduction', description: 'Days to hours transformation' },
      { label: 'Resource Utilization', value: '40% improvement', description: 'Through optimization algorithms' }
    ],
    background: projectBackgrounds['9']
  },
  {
    id: '10',
    name: 'Salesforce Marketing Automation',
    description: 'Integrated Salesforce Marketing Cloud with internal CRM systems to orchestrate personalized email campaigns for millions of users, increasing engagement and conversion rates for job seekers and recruiters.',
    technologies: ['C#', 'Salesforce Marketing Cloud', 'API Integrations', 'SQL Server', 'ETL', 'Azure Functions', 'Power BI', 'REST APIs'],
    technologyIcons: [Mail, Database, Code2, Terminal],
    role: 'Lead Consultant',
    bannerText: 'Omni-Channel Marketing Engagement',
    icon: Mail,
    iconColor: 'text-rose-600',
    clientName: 'Totaljobs Group',
    challenges: 'Built a real-time data synchronization system between multiple platforms handling over one million customer profiles while maintaining data integrity and implementing personalized segmentation.',
    impact: 'Increased email campaign engagement by 25%, improved marketing ROI by 35%, and reduced campaign setup time by 70% through automated workflows and personalization.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Assessed existing manual email workflow bottlenecks and identified personalization opportunities through data integration.' },
      { step: 2, title: 'Architect the solution', description: 'Designed bi-directional synchronization between Salesforce and internal systems with conflict resolution.' },
      { step: 3, title: 'Implement core features', description: 'Developed API-driven integration with transactional guarantees and automated segmentation engine.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted A/B testing framework for email templates and optimized sending patterns for maximum engagement.' },
      { step: 5, title: 'Deploy & maintain', description: 'Implemented real-time monitoring dashboard and automated alerting for synchronization failures.' }
    ],
    teamSize: 4,
    stakeholders: ['CMO Office', 'Marketing Operations', 'IT Integration Team', 'Data Science Team', 'Content Writers'],
    lessonsLearned: 'Data-driven personalization drives significant engagement improvements, but requires maintaining strict data quality standards and near-real-time synchronization between systems.',
    timeline: 'July 2014 – March 2015',
    achievements: [
      'Built scalable integration synchronizing 1M+ user profiles in near real-time',
      'Implemented automated segmentation engine based on user behavior patterns',
      'Created A/B testing framework increasing email open rates by 32%',
      'Designed comprehensive analytics dashboard measuring campaign performance'
    ],
    measurableOutcomes: {
      before: { percentage: '60%', description: 'Manual campaign setup and targeting' },
      after: { percentage: '25%', description: 'Increase in campaign engagement' }
    },
    metrics: [
      { label: 'Marketing ROI', value: '35% higher', description: 'Through targeted campaigns' },
      { label: 'Campaign Setup', value: '70% faster', description: 'Through automation' },
      { label: 'Customer Profiles', value: '1M+', description: 'Synchronized in real-time' }
    ],
    background: projectBackgrounds['10']
  },
  {
    id: '11',
    name: 'Media Workflow Automation',
    description: 'Developed a high-throughput content automation system for the BBC, streamlining media processing workflows from ingest to broadcast while ensuring broadcast-quality reliability and traceability.',
    technologies: ['.NET Framework', 'C#', 'SQL Server', 'WCF', 'MSMQ', 'PowerShell', 'Windows Server', 'Active Directory'],
    technologyIcons: [Key, Database, Code2, Terminal],
    role: 'Contract Software Engineer',
    bannerText: 'Broadcast Efficiency & Innovation',
    icon: Key,
    iconColor: 'text-amber-600',
    clientName: 'BBC',
    challenges: 'Automated complex media workflows with stringent quality control requirements while integrating with specialized broadcast equipment and maintaining 99.99% reliability for live broadcasts.',
    impact: 'Doubled content throughput capabilities, reduced media processing time by 70%, and decreased manual QC time by 50% while maintaining broadcast-quality standards.',
    approach: [
      { step: 1, title: 'Define the problem & goals', description: 'Mapped existing manual media workflows and identified bottlenecks in content delivery pipeline.' },
      { step: 2, title: 'Architect the solution', description: 'Designed modular workflow automation system with comprehensive audit trails and error recovery.' },
      { step: 3, title: 'Implement core features', description: 'Built media transcoding services, metadata extraction, and workflow orchestration engine.' },
      { step: 4, title: 'Test & optimize', description: 'Conducted extensive reliability testing and implemented fault-tolerance mechanisms for 24/7 operation.' },
      { step: 5, title: 'Deploy & maintain', description: 'Created monitoring dashboard with proactive alerts and implemented rolling update strategy.' }
    ],
    teamSize: 5,
    stakeholders: ['Broadcast Engineers', 'Editorial Team', 'Media Managers', 'Operations Directors', 'Content Producers'],
    lessonsLearned: 'In mission-critical media environments, robust error handling and comprehensive telemetry are as important as the core automation functionality.',
    timeline: 'March 2013 – June 2014',
    achievements: [
      'Built automated media pipeline processing 10,000+ assets daily',
      'Implemented fault-tolerant workflow engine with automatic recovery',
      'Created comprehensive audit system meeting broadcast compliance requirements',
      'Designed modular architecture allowing rapid workflow customization'
    ],
    measurableOutcomes: {
      before: { percentage: '60%', description: 'Manual steps in media workflows' },
      after: { percentage: '99.99%', description: 'System reliability with automated processing' }
    },
    metrics: [
      { label: 'Content Throughput', value: '2x increase', description: 'Doubling daily capacity' },
      { label: 'Processing Time', value: '70% reduction', description: 'For standard media assets' },
      { label: 'Error Rate', value: '<0.01%', description: 'With automated recovery' }
    ],
    background: projectBackgrounds['11']
  }
]; 