// src/data/pricingPageData.ts

// Import icons directly
import AccessTime from '@mui/icons-material/AccessTime';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Work from '@mui/icons-material/Work';
import Group from '@mui/icons-material/Group';
import Info from '@mui/icons-material/Info';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Support from '@mui/icons-material/Support';
import Analytics from '@mui/icons-material/Analytics';
import Speed from '@mui/icons-material/Speed';

// Import types for type safety
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

export interface Feature {
  icon: MuiIcon;
  text: string;
}

export interface Plan {
  type: string;
  title: string;
  tagline: string;
  price: string;
  annualPrice?: string;
  features: Feature[];
  extraFeatures?: string[];
  ctaText: string;
  ctaLink: string;
  recommended: boolean;
}

export interface PricingPageContent {
  hero: {
    title: string;
    subtitle: string;
    titleHighlight: string;
    cta: string;
  };
  pricingSection: {
    heading: string;
    description: string;
    customSolutionTitle: string;
    customSolutionDesc: string;
    customSolutionCta: string;
  };
  guideSection: {
    heading: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon: MuiIcon;
    }[];
  };
  faqSection: {
    heading: string;
    description: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  comparisonSection: {
    heading: string;
    description: string;
    features: {
      name: string;
      consultation: string;
      project: string;
      retainer: string;
    }[];
  };
  testimonials: {
    quote: string;
    author: string;
    position: string;
    planType: string;
  }[];
  finalCta: {
    heading: string;
    description: string;
    cta: string;
  };
  ui: {
    pricingLabel: string;
    mostPopularLabel: string;
    includesLabel: string;
  };
}

// Using the plans structure with pricing information
export const plans: Plan[] = [
  {
    type: 'consultation',
    title: 'Basic',
    tagline: 'For smaller projects',
    price: 'Starting at $2,999',
    annualPrice: 'Starting at $2,699',
    features: [
      { icon: Speed, text: 'Standard deployment architecture' },
      { icon: Support, text: 'Email-based technical support' },
      { icon: Analytics, text: 'Basic monitoring setup' }
    ],
    extraFeatures: [
      'CI/CD pipeline templates',
      'Documentation access',
      'Implementation within 3 weeks'
    ],
    ctaText: 'Request Basic Info',
    ctaLink: '/contact?plan=basic',
    recommended: false
  },
  {
    type: 'project',
    title: 'Professional',
    tagline: 'For growing enterprises',
    price: 'Starting at $7,999',
    annualPrice: 'Starting at $7,199',
    features: [
      { icon: Speed, text: 'High-performance architecture' },
      { icon: Support, text: 'Priority support with dedicated engineer' },
      { icon: Analytics, text: 'Advanced monitoring and alerting' }
    ],
    extraFeatures: [
      'Advanced deployment strategies',
      'Infrastructure as code templates',
      'Implementation within 2 weeks',
      'Dedicated technical account manager'
    ],
    ctaText: 'Schedule Consultation',
    ctaLink: '/contact?plan=pro',
    recommended: true
  },
  {
    type: 'enterprise',
    title: 'Enterprise',
    tagline: 'For mission-critical systems',
    price: 'Custom pricing',
    features: [
      { icon: Speed, text: 'Fully custom high-availability architecture' },
      { icon: Support, text: '24/7 premium support with SLA guarantee' },
      { icon: Analytics, text: 'Comprehensive monitoring suite' }
    ],
    extraFeatures: [
      'Fully managed infrastructure',
      'Custom integration development',
      'Implementation within 10 days',
      'Dedicated architect and support team'
    ],
    ctaText: 'Contact Enterprise Team',
    ctaLink: '/contact?plan=enterprise',
    recommended: false
  }
];

// Content for the pricing page
export const pricingPageContent: PricingPageContent = {
  hero: {
    title: 'Solutions Tailored To',
    titleHighlight: 'Your Business',
    subtitle: 'Select the solution that fits your specific requirements. Our pricing is customized based on your project scope and business needs.',
    cta: 'Explore Solutions',
  },
  pricingSection: {
    heading: 'Choose Your Implementation Approach',
    description: 'Each solution is customized to your specific requirements with transparent value-based pricing.',
    customSolutionTitle: 'Need a custom solution?',
    customSolutionDesc: 'Contact our team for a personalized consultation to discuss your specific requirements.',
    customSolutionCta: 'Request Custom Consultation',
  },
  guideSection: {
    heading: 'Which Plan Is Right for You?',
    description: 'Whether you need on‑demand advice, complete project delivery, or a long‑term strategic partner, we have a plan tailored for your business.',
    items: [
      {
        title: 'Rapid Consultation (Hourly)',
        description: 'Ideal for immediate expert guidance without long‑term commitments. Our consultations provide targeted solutions for specific technical challenges.',
        icon: Speed,
      },
      {
        title: 'Project Execution (Project‑Based)',
        description: 'Best for organizations requiring comprehensive project delivery and dedicated support. Our project teams ensure on-time, on-budget delivery with clear milestones.',
        icon: Work,
      },
      {
        title: 'Strategic Partnership (Retainer)',
        description: 'Perfect for businesses seeking continuous support and proactive strategy. Our ongoing partnerships provide consistent guidance and technological advancement.',
        icon: Support,
      },
    ],
  },
  faqSection: {
    heading: 'Frequently Asked Questions',
    description: 'Have questions? We\'ve got answers to help you choose the right plan.',
    items: [
      {
        question: 'How is pricing determined for each solution?',
        answer: 'We develop custom pricing based on your specific requirements, implementation complexity, team size, and ongoing support needs. This value-based approach ensures you only pay for what delivers results for your business.',
      },
      {
        question: 'Can I upgrade my solution as my needs change?',
        answer: 'Absolutely. Our solutions are designed to scale with your business. We make the transition smooth with flexible upgrade paths tailored to your evolving requirements.',
      },
      {
        question: 'What\'s included in the implementation process?',
        answer: 'All solutions include architecture design, deployment planning, infrastructure setup, knowledge transfer, and documentation. Higher tiers include additional services like custom integrations and dedicated implementation teams.',
      },
      {
        question: 'How does your support system work?',
        answer: 'Support varies by solution tier. Basic offers standard email support, Professional includes priority support with faster response times, and Enterprise provides 24/7 premium support with guaranteed SLAs.',
      },
      {
        question: 'Do you offer refunds if I\'m not satisfied?',
        answer: 'We stand behind our solutions with a satisfaction guarantee. If our implementation doesn\'t meet the agreed specifications, we\'ll work with you to resolve any issues at no additional cost.',
      },
    ],
  },
  comparisonSection: {
    heading: 'Plan Comparison',
    description: 'See how our plans stack up to find your perfect fit.',
    features: [
      { name: 'Response Time', consultation: '24-48 hours', project: 'As per schedule', retainer: 'Priority (same day)' },
      { name: 'Team Size', consultation: '1 expert', project: 'Dedicated team', retainer: 'Full agency access' },
      { name: 'Tech Stack Support', consultation: 'Specific focus', project: 'Project scope', retainer: 'Comprehensive' },
      { name: 'Strategy Sessions', consultation: 'Optional', project: 'Included', retainer: 'Weekly' },
      { name: 'Performance Reports', consultation: 'Not included', project: 'Project-based', retainer: 'Monthly' },
    ]
  },
  testimonials: [
    {
      quote: "The Strategic Partnership plan revolutionized our approach to technology. We've seen a 43% increase in development efficiency since working with this team.",
      author: 'Sarah Johnson',
      position: 'CTO, GrowthTech Solutions',
      planType: 'retainer',
    },
    {
      quote: 'Their Project Execution plan delivered our e-commerce platform on time and under budget. The dedicated team approach made all the difference.',
      author: 'Michael Chen',
      position: 'Founder, Urban Retail',
      planType: 'project',
    },
    {
      quote: 'The Rapid Consultation option was exactly what we needed to solve our immediate challenges without a long-term commitment.',
      author: 'Jessica Rivera',
      position: 'Product Manager, LaunchPad Startups',
      planType: 'consultation',
    }
  ],
  finalCta: {
    heading: 'Ready to Accelerate Your Growth?',
    description: 'Have questions or ready to get started? Contact us today to discover how our expert solutions can drive your business forward.',
    cta: 'Get Your Free Consultation',
  },
  ui: {
    pricingLabel: 'Custom pricing based on your needs',
    mostPopularLabel: 'Most Popular',
    includesLabel: 'Also includes:',
  }
};

export default {
  pricingPageContent,
  plans
};