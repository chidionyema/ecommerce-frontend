interface CVProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role: string;
  bannerText: string;
  imageUrl: string;
  rating: number;
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
    name: 'Intelligent Security Systems',
    description:
      'Designed and implemented intelligent security systems for critical infrastructures like airports and sports events.',
    technologies: ['.NET Core', 'Java', 'RabbitMQ', 'Docker', 'Kubernetes'],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Enhanced Security at Airports',
    imageUrl: '/security.jpg',
    rating: 4.5,
    challenges:
      'The project required real-time processing of large volumes of data from multiple sources, which posed significant performance challenges. Additionally, integrating with legacy systems was complex.',
    impact:
      'Improved security response times by 40% and reduced false positives by 25%, leading to enhanced safety at critical infrastructures.',
    teamSize: 8,
    stakeholders: ['Airport Authority', 'Sports Event Organizers'],
    lessonsLearned:
      'Learned the importance of modular architecture for scalability and the value of thorough testing in high-stakes environments.',
    timeline: 'June 2024 – Present',
    achievements: [
      'Successfully deployed the system across 5 major airports.',
      'Reduced incident response time by 40%.',
    ],
  },
  {
    id: '2',
    name: 'Online Plea Service',
    description:
      'Developed and maintained user-centric digital services for the UK government, adhering to Government Digital Service (GDS) standards.',
    technologies: ['Terraform', 'Kubernetes', 'AWS', 'Azure'],
    role: 'Technical Lead',
    bannerText: 'Government Digital Service',
    imageUrl: '/government.jpg',
    rating: 4.7,
    challenges:
      'Ensuring compliance with strict GDS standards while delivering a seamless user experience was a major challenge. The project also required integration with multiple government systems.',
    impact:
      'Increased user satisfaction by 30% and reduced processing times for online pleas by 50%.',
    teamSize: 12,
    stakeholders: ['HM Courts & Tribunals Service'],
    lessonsLearned:
      'Gained expertise in GDS standards and the importance of user-centric design in government services.',
    timeline: 'March 2023 – February 2024',
    achievements: [
      'Delivered the online plea service on time and within budget.',
      'Achieved a 95% user satisfaction rate.',
    ],
  },
  {
    id: '3',
    name: 'Cash Deposit Platform',
    description:
      'Built a cutting-edge cash deposit platform focused on optimizing interest rates for users.',
    technologies: ['.NET Core', 'EF Core', 'C#', 'Azure', 'SQL'],
    role: 'Senior .NET Developer',
    bannerText: 'Optimized Interest Rates',
    imageUrl: '/finance.jpg',
    rating: 4.6,
    challenges:
      'The platform needed to handle high transaction volumes while ensuring data accuracy and security. Integrating with third-party financial APIs was also challenging.',
    impact:
      'Increased user deposits by 20% and improved interest rate optimization by 15%.',
    teamSize: 6,
    stakeholders: ['Flagstone'],
    lessonsLearned:
      'Learned the importance of robust error handling and the value of continuous integration and deployment (CI/CD) pipelines.',
    timeline: 'October 2022 – March 2023',
    achievements: [
      'Successfully launched the platform with zero critical bugs.',
      'Achieved a 20% increase in user deposits within the first 3 months.',
    ],
  },
  {
    id: '4',
    name: 'Banking-as-a-Service Platform',
    description:
      'Contributed to the development of a cloud-based Banking-as-a-Service (BaaS) platform.',
    technologies: ['Vue.js', '.NET Core', 'Azure'],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Cloud Banking Solutions',
    imageUrl: '/banking.jpg',
    rating: 4.8,
    challenges:
      'Ensuring compliance with financial regulations while delivering a scalable and secure platform was a major challenge. The project also required seamless integration with multiple third-party APIs.',
    impact:
      'Enabled clients to onboard 50% faster and reduced operational costs by 30%.',
    teamSize: 10,
    stakeholders: ['Omnio', 'Financial Institutions'],
    lessonsLearned:
      'Gained deep insights into financial regulations and the importance of secure API integrations.',
    timeline: 'February 2022 – May 2022',
    achievements: [
      'Delivered core banking functionalities on time and within budget.',
      'Achieved a 99.9% platform uptime.',
    ],
  },
  {
    id: '5',
    name: 'Cloud Platform Transformation',
    description:
      'Led a cloud platform transformation project using AWS services and Docker.',
    technologies: ['AWS', 'Terraform', 'Kubernetes', 'Docker'],
    role: 'Full Stack/Platform Engineer',
    bannerText: 'Cloud Transformation',
    imageUrl: '/cloud.jpg',
    rating: 4.4,
    challenges:
      'Migrating legacy systems to the cloud while ensuring minimal downtime and data integrity was a significant challenge. The project also required training the team on new cloud technologies.',
    impact:
      'Reduced infrastructure costs by 25% and improved system scalability by 40%.',
    teamSize: 15,
    stakeholders: ['StepStone UK'],
    lessonsLearned:
      'Learned the importance of thorough planning and team training during cloud migrations.',
    timeline: 'July 2020 – March 2021',
    achievements: [
      'Successfully migrated 90% of legacy systems to the cloud.',
      'Achieved a 25% reduction in infrastructure costs.',
    ],
  },
  {
    id: '6',
    name: 'Microservices Cloud Platform',
    description:
      'Developed a robust, scalable, and highly available microservices cloud platform for commercial REST APIs using .NET Core and Azure Kubernetes Service (AKS).',
    technologies: ['.NET Core', 'Azure', 'Terraform', 'Helm', 'Docker'],
    role: 'Lead .NET Software Engineer',
    bannerText: 'Scalable Microservices Architecture',
    imageUrl: '/microservices.jpg',
    rating: 4.6,
    challenges:
      'Designing a highly available and scalable microservices architecture while ensuring seamless integration with existing systems was a major challenge. The project also required optimizing resource utilization.',
    impact:
      'Improved system performance by 30% and reduced deployment times by 50%.',
    teamSize: 8,
    stakeholders: ['Philip Morris International'],
    lessonsLearned:
      'Learned the importance of container orchestration and the value of zero-downtime deployment strategies.',
    timeline: 'April 2019 – September 2020',
    achievements: [
      'Successfully deployed the platform with zero downtime.',
      'Achieved a 30% improvement in system performance.',
    ],
  },
  {
    id: '7',
    name: 'Digital Asset Management Platform',
    description:
      'Modernised Asos’s Digital Asset Management platform by transitioning to a microservices architecture with .NET Core, Azure, and Docker.',
    technologies: ['.NET Core', 'Azure', 'Docker'],
    role: 'Software Engineer',
    bannerText: 'Modernised Asset Management',
    imageUrl: '/digital-asset.jpg',
    rating: 4.3,
    challenges:
      'Transitioning from a monolithic architecture to microservices while ensuring minimal disruption to ongoing operations was a significant challenge. The project also required extensive testing to ensure data integrity.',
    impact:
      'Improved platform scalability by 50% and reduced deployment times by 40%.',
    teamSize: 6,
    stakeholders: ['ASOS'],
    lessonsLearned:
      'Learned the importance of thorough testing and the value of containerized deployments.',
    timeline: 'September 2018 – January 2019',
    achievements: [
      'Successfully modernized the platform with zero data loss.',
      'Achieved a 50% improvement in platform scalability.',
    ],
  },
  {
    id: '8',
    name: 'IaaS/Private Cloud Platform',
    description:
      'Contributed to the development of an IaaS/private cloud platform, significantly reducing infrastructure provisioning times.',
    technologies: ['.NET', 'Angular', 'Citrix Xen', 'VMware vSphere'],
    role: 'Senior Developer',
    bannerText: 'Private Cloud Solutions',
    imageUrl: '/private-cloud.jpg',
    rating: 4.2,
    challenges:
      'Ensuring high availability and scalability while reducing infrastructure provisioning times was a major challenge. The project also required integration with multiple virtualization technologies.',
    impact:
      'Reduced infrastructure provisioning times by 60% and improved resource utilization by 30%.',
    teamSize: 10,
    stakeholders: ['Tesco PLC'],
    lessonsLearned:
      'Learned the importance of automation in infrastructure management and the value of virtualization technologies.',
    timeline: 'April 2015 – April 2016',
    achievements: [
      'Successfully reduced infrastructure provisioning times by 60%.',
      'Achieved a 30% improvement in resource utilization.',
    ],
  },
  {
    id: '9',
    name: 'Media Processing Automation System',
    description:
      'Designed and implemented an advanced automation system for media processing workflows using .NET Framework and C#.',
    technologies: ['.NET Framework', 'C#', 'OOP'],
    role: 'Contract Software Engineer',
    bannerText: 'Automated Media Workflows',
    imageUrl: '/media-automation.jpg',
    rating: 4.1,
    challenges:
      'Automating complex media processing workflows while ensuring data accuracy and system reliability was a significant challenge. The project also required integration with multiple third-party tools.',
    impact:
      'Reduced manual intervention by 70% and improved content delivery times by 50%.',
    teamSize: 5,
    stakeholders: ['BBC'],
    lessonsLearned:
      'Learned the importance of modular design and the value of thorough testing in automation systems.',
    timeline: 'March 2013 – June 2014',
    achievements: [
      'Successfully automated 90% of media processing workflows.',
      'Achieved a 50% improvement in content delivery times.',
    ],
  },
  {
    id: '10',
    name: 'SaaS Platform Integration',
    description:
      'Led the integration of a SaaS platform with internal systems using C# and API integrations, enabling seamless client email marketing campaigns.',
    technologies: ['C#', 'Salesforce', 'API Integrations'],
    role: 'Lead Consultant',
    bannerText: 'Seamless SaaS Integration',
    imageUrl: '/saas-integration.jpg',
    rating: 4.0,
    challenges:
      'Ensuring seamless integration between the SaaS platform and internal systems while maintaining data integrity and security was a major challenge. The project also required optimizing Salesforce workflows.',
    impact:
      'Increased client engagement rates by 25% and reduced campaign setup times by 40%.',
    teamSize: 7,
    stakeholders: ['Total Jobs Group'],
    lessonsLearned:
      'Learned the importance of robust API integrations and the value of optimizing workflows for efficiency.',
    timeline: 'July 2014 – March 2015',
    achievements: [
      'Successfully integrated the SaaS platform with internal systems.',
      'Achieved a 25% increase in client engagement rates.',
    ],
  },
  {
    id: '11',
    name: 'Cloud Banking Solutions',
    description:
      'Contributed to the development of a cloud-based Banking-as-a-Service (BaaS) platform, building key features using Vue.js for the frontend and .NET Core for the backend.',
    technologies: ['Vue.js', '.NET Core', 'Azure'],
    role: 'Senior Full Stack Engineer',
    bannerText: 'Cloud Banking Solutions',
    imageUrl: '/banking.jpg',
    rating: 4.8,
    challenges:
      'Ensuring compliance with financial regulations while delivering a scalable and secure platform was a major challenge. The project also required seamless integration with multiple third-party APIs.',
    impact:
      'Enabled clients to onboard 50% faster and reduced operational costs by 30%.',
    teamSize: 10,
    stakeholders: ['Omnio', 'Financial Institutions'],
    lessonsLearned:
      'Gained deep insights into financial regulations and the importance of secure API integrations.',
    timeline: 'February 2022 – May 2022',
    achievements: [
      'Delivered core banking functionalities on time and within budget.',
      'Achieved a 99.9% platform uptime.',
    ],
  },
  {
    id: '12',
    name: 'Secrets Management Solution',
    description:
      'Developed and implemented an enterprise-wide secrets management solution using AWS Key Management Service (KMS).',
    technologies: ['AWS', 'KMS', 'Terraform'],
    role: 'Full Stack/Platform Engineer',
    bannerText: 'Secure Secrets Management',
    imageUrl: '/secrets-management.jpg',
    rating: 4.5,
    challenges:
      'Ensuring secure storage and access control for sensitive credentials across multiple environments was a significant challenge. The project also required integration with existing CI/CD pipelines.',
    impact:
      'Improved security posture by 40% and reduced credential leakage incidents by 90%.',
    teamSize: 6,
    stakeholders: ['StepStone UK'],
    lessonsLearned:
      'Learned the importance of secure credential management and the value of integrating security into CI/CD pipelines.',
    timeline: 'July 2020 – March 2021',
    achievements: [
      'Successfully implemented the secrets management solution across all environments.',
      'Achieved a 90% reduction in credential leakage incidents.',
    ],
  },
  {
    id: '13',
    name: 'Self-Service Provisioning Portal',
    description:
      'Designed and built a self-service provisioning portal for cloud infrastructure, enabling developers to rapidly deploy and manage resources.',
    technologies: ['AWS', 'Terraform', 'React', 'Node.js'],
    role: 'Full Stack/Platform Engineer',
    bannerText: 'Self-Service Cloud Portal',
    imageUrl: '/self-service.jpg',
    rating: 4.4,
    challenges:
      'Creating a user-friendly interface for developers while ensuring secure and compliant resource provisioning was a major challenge. The project also required integration with multiple cloud services.',
    impact:
      'Reduced resource provisioning times by 70% and improved developer productivity by 30%.',
    teamSize: 8,
    stakeholders: ['StepStone UK'],
    lessonsLearned:
      'Learned the importance of user-centric design and the value of automation in resource provisioning.',
    timeline: 'July 2020 – March 2021',
    achievements: [
      'Successfully launched the self-service portal with zero security incidents.',
      'Achieved a 70% reduction in resource provisioning times.',
    ],
  },
  {
    id: '14',
    name: 'Automated Media Workflows',
    description:
      'Designed and implemented an advanced automation system for media processing workflows using .NET Framework and C#.',
    technologies: ['.NET Framework', 'C#', 'OOP'],
    role: 'Contract Software Engineer',
    bannerText: 'Automated Media Workflows',
    imageUrl: '/media-automation.jpg',
    rating: 4.1,
    challenges:
      'Automating complex media processing workflows while ensuring data accuracy and system reliability was a significant challenge. The project also required integration with multiple third-party tools.',
    impact:
      'Reduced manual intervention by 70% and improved content delivery times by 50%.',
    teamSize: 5,
    stakeholders: ['BBC'],
    lessonsLearned:
      'Learned the importance of modular design and the value of thorough testing in automation systems.',
    timeline: 'March 2013 – June 2014',
    achievements: [
      'Successfully automated 90% of media processing workflows.',
      'Achieved a 50% improvement in content delivery times.',
    ],
  },
  {
    id: '15',
    name: 'Email Marketing Campaigns',
    description:
      'Developed and automated email marketing campaigns, leveraging Salesforce Marketing Cloud.',
    technologies: ['C#', 'Salesforce', 'API Integrations'],
    role: 'Lead Consultant',
    bannerText: 'Automated Email Campaigns',
    imageUrl: '/email-campaigns.jpg',
    rating: 4.0,
    challenges:
      'Ensuring seamless integration between Salesforce Marketing Cloud and internal systems while maintaining data integrity and security was a major challenge. The project also required optimizing email campaign workflows.',
    impact:
      'Increased email open rates by 20% and reduced campaign setup times by 30%.',
    teamSize: 7,
    stakeholders: ['Total Jobs Group'],
    lessonsLearned:
      'Learned the importance of robust API integrations and the value of optimizing workflows for efficiency.',
    timeline: 'July 2014 – March 2015',
    achievements: [
      'Successfully automated 90% of email marketing campaigns.',
      'Achieved a 20% increase in email open rates.',
    ],
  },
];