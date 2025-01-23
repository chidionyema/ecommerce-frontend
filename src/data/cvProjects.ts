// src/data/cvProjects.ts
import {
  Shield,
  Building2,
  DollarSign,
  Landmark,  // Changed from Bank
  Cloud,
  Cpu,
  Server,
  CircuitBoard,
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
}

export const cvProjects: CVProject[] = [
  {
    id: '1',
    name: 'Counter-Drone Security Platform',
    description: 'Real-time threat detection system for critical infrastructure protection',
    technologies: ['.NET Core', 'TensorFlow', 'gRPC', 'RabbitMQ', 'Kubernetes'],
    role: 'Security Systems Architect',
    bannerText: 'AI-Powered Airspace Security',
    icon: Shield,
    iconColor: 'text-blue-600',
    clientName: 'OSL Technologies',
    challenges: 'Integrating 12+ legacy sensor systems while maintaining 500ms response SLA',
    impact: '40% faster threat response with 98% detection accuracy',
    teamSize: 8,
    stakeholders: ['Airport Security Directors', 'FIFA Event Coordinators'],
    lessonsLearned: 'Edge computing architecture crucial for latency-sensitive ML models',
    timeline: 'Jun 2024 – Present',
    achievements: [
      'Patent-pending radar/CV fusion algorithm',
      'Zero false positives during Champions League final'
    ]
  },
  {
    id: '2',
    name: 'Digital Justice Services Platform',
    description: 'GDS-compliant web services for legal proceedings',
    technologies: ['Terraform', 'Kubernetes', 'AWS Fargate', 'Node.js'],
    role: 'Technical Lead',
    bannerText: 'Citizen-Focused Justice',
    icon: Building2,
    iconColor: 'text-purple-600',
    clientName: 'HM Courts & Tribunals Service',
    challenges: 'Achieving AA accessibility compliance for vulnerable users',
    impact: '95% user satisfaction with 50% reduced form completion time',
    teamSize: 9,
    stakeholders: ['Ministry of Justice', 'Disability Rights UK'],
    lessonsLearned: 'User testing with assistive technologies is non-negotiable',
    timeline: 'Mar 2023 – Feb 2024',
    achievements: [
      'First fully accessible gender recognition service',
      'Zero critical vulnerabilities at launch'
    ]
  },
  {
    id: "3",
    name: "Dynamic Rate Engine",
    description: "High-performance cash deposit optimization platform",
    technologies: [".NET Core", "Azure", "EF Core", "Redis"],
    role: "Financial Systems Engineer",
    bannerText: "Smart Treasury Solutions",
    icon: DollarSign,
    iconColor: "text-green-600",
    clientName: "Flagstone",
    challenges: "Processing £1B+ daily transactions with 5ms latency",
    impact: "Increased deposit yields through real-time rate adjustments",
    teamSize: 5,
    stakeholders: ["Financial Controllers", "Compliance Officers"],
    lessonsLearned: "CQRS pattern essential for financial audit trails",
    timeline: "Oct 2022 – Mar 2023",
    achievements: [
      "FCA-compliant transaction processing",
      "50% reduction in CI/CD pipeline times"
    ]
  },
  {
    id: '4',
    name: 'Banking Core API Suite',
    description: 'Cloud-native BaaS platform for financial institutions',
    technologies: ['Vue.js', '.NET Core', 'Azure API Management'],
    role: 'Fintech Solutions Lead',
    bannerText: 'Banking-as-a-Service',
    icon: Landmark,
    iconColor: 'text-indigo-600',
    clientName: 'Omnio',
    challenges: 'PSD2 compliance in multi-tenant architecture',
    impact: '30% faster client onboarding with Open Banking integration',
    teamSize: 7,
    stakeholders: ['Regulatory Teams', 'Partner Banks'],
    lessonsLearned: 'JWT token chaining critical for third-party access',
    timeline: 'Feb 2022 – May 2022',
    achievements: [
      '99.99% API uptime in first year',
      'Successful FCA sandbox testing'
    ]
  },
  {
    id: '5',
    name: 'Multi-Cloud Migration Framework',
    description: 'AWS/Azure migration automation platform',
    technologies: ['Terraform', 'Ansible', 'AWS CDK', 'Azure ARM'],
    role: 'Cloud Architect',
    bannerText: 'Cloud Transformation',
    icon: Cloud,
    iconColor: 'text-sky-500',
    clientName: 'StepStone UK',
    challenges: 'Migrating 200+ legacy services with 30s RPO',
    impact: '40% TCO reduction through resource optimization',
    teamSize: 12,
    stakeholders: ['CTO Office', 'Finance Team'],
    lessonsLearned: 'Parallel run essential for stateful service migration',
    timeline: 'Jul 2020 – Mar 2021',
    achievements: [
      'Zero data loss migration',
      '£1.2M annual cloud savings'
    ]
  },
  {
    id: '6',
    name: 'Pharmaceutical API Platform',
    description: 'GxP-compliant clinical trial system',
    technologies: ['.NET Core', 'AKS', 'Istio', 'GraalVM'],
    role: 'Cloud Platform Lead',
    bannerText: 'Life Sciences Cloud',
    icon: Cpu,
    iconColor: 'text-red-600',
    clientName: 'Philip Morris International',
    challenges: 'Meeting FDA 21 CFR Part 11 in cloud-native architecture',
    impact: '30% faster trial deployments',
    teamSize: 10,
    stakeholders: ['Regulatory Affairs', 'Clinical Researchers'],
    lessonsLearned: 'Immutable audit trails require event sourcing',
    timeline: 'Apr 2019 – Sep 2020',
    achievements: [
      'First FDA-approved cloud deployment',
      'Zero audit findings'
    ]
  },
  {
    id: '7',
    name: 'Asset Management Modernization',
    description: 'Microservices-based digital asset platform',
    technologies: ['.NET Core', 'Azure Service Fabric', 'Redis'],
    role: 'Cloud Migration Specialist',
    bannerText: 'Digital Commerce Platform',
    icon: CircuitBoard,
    iconColor: 'text-orange-600',
    clientName: 'ASOS',
    challenges: 'Zero-downtime migration of 10M+ assets',
    impact: '50% faster image processing',
    teamSize: 5,
    stakeholders: ['E-commerce Team', 'Content Creators'],
    lessonsLearned: 'Blue/green deployment essential for catalog systems',
    timeline: 'Sep 2018 – Jan 2019',
    achievements: [
      'Zero SEO impact during migration',
      '40% storage cost reduction'
    ]
  },
  {
    id: '8',
    name: 'Private Cloud Orchestrator',
    description: 'VM lifecycle management system',
    technologies: ['Citrix Xen', 'VMware vSphere', 'PowerShell'],
    role: 'Infrastructure Architect',
    bannerText: 'Enterprise Cloud',
    icon: Server,
    iconColor: 'text-cyan-600',
    clientName: 'Tesco PLC',
    challenges: 'Reducing VM provisioning from 5 days to 2 hours',
    impact: '60% faster resource allocation',
    teamSize: 8,
    stakeholders: ['Data Center Team', 'Application Owners'],
    lessonsLearned: 'API-first design enables automation',
    timeline: 'Apr 2015 – Apr 2016',
    achievements: [
      '100% SLA compliance achieved',
      '30% energy savings through consolidation'
    ]
  },
  {
    id: '12',
    name: 'Secrets Orchestration System',
    description: 'HSM-backed credential management solution',
    technologies: ['AWS KMS', 'Vault', 'PKI', 'OAuth2'],
    role: 'Security Architect',
    bannerText: 'Zero-Trust Security',
    icon: Key,
    iconColor: 'text-amber-600',
    clientName: 'StepStone UK',
    challenges: 'Rotating 50K+ credentials across 300 microservices',
    impact: '90% reduction in secret exposure incidents',
    teamSize: 4,
    stakeholders: ['CISO Team', 'DevOps'],
    lessonsLearned: 'Ephemeral credentials > long-lived tokens',
    timeline: 'Jul 2020 – Mar 2021',
    achievements: [
      'SOC2 Type II compliance achieved',
      'Automated CA/Browser Forum compliance'
    ]
  },
  {
    id: '13',
    name: 'Developer Cloud Portal',
    description: 'Self-service infrastructure provisioning',
    technologies: ['React', 'Backstage.io', 'Crossplane', 'OPA'],
    role: 'Platform Engineer',
    bannerText: 'DevEx Optimization',
    icon: Settings,
    iconColor: 'text-emerald-600',
    clientName: 'StepStone UK',
    challenges: 'Reducing provisioning time from 2 weeks to 2 hours',
    impact: '70% faster environment creation',
    teamSize: 6,
    stakeholders: ['Engineering Managers', 'SRE Team'],
    lessonsLearned: 'Policy-as-code prevents configuration drift',
    timeline: 'Jul 2020 – Mar 2021',
    achievements: [
      '500+ weekly provisioning requests',
      'Zero security misconfigurations'
    ]
  },
  {
    id: '15',
    name: 'Marketing Automation Hub',
    description: 'CRM integration for email campaigns',
    technologies: ['Salesforce', 'MQTT', 'C#', 'RabbitMQ'],
    role: 'Integration Architect',
    bannerText: 'Omnichannel Marketing',
    icon: Mail,
    iconColor: 'text-rose-600',
    clientName: 'Total Jobs Group',
    challenges: 'Synchronizing 1M+ user profiles across 3 systems',
    impact: '25% higher campaign engagement',
    teamSize: 6,
    stakeholders: ['CMO Office', 'Data Privacy Team'],
    lessonsLearned: 'Change data capture beats batch processing',
    timeline: 'Jul 2014 – Mar 2015',
    achievements: [
      'GDPR-compliant data pipeline',
      '90% campaign automation rate'
    ]
  },
  {
    id: '16',
    name: 'Omnichannel Checkout System',
    description: 'Unified online/in-store purchase processing with real-time inventory integration',
    technologies: ['.NET Core', 'Azure Event Grid', 'Redis', 'React', 'Kafka', 'EF Core'],
    role: 'E-commerce Architect',
    bannerText: 'Seamless Retail Experience',
    icon: CircuitBoard,
    iconColor: 'text-teal-600',
    clientName: "ASOS",
    challenges: "Synchronizing 15M+ SKUs across 200+ physical stores and digital channels",
    impact: "30% faster checkout flow with 18% reduced cart abandonment",
    teamSize: 6,
    stakeholders: ['E-commerce Team', 'Store Operations'],
    lessonsLearned: "Event-driven architecture essential for inventory consistency",
    timeline: "Mar 2021 - Jun 2022",
    achievements: [
      "50ms API response time at peak (Black Friday)",
      "Unified loyalty points system across channels"
    ]
  }
];