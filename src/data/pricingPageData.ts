// src/data/pricingPageData.ts
import {
    AccessTime,
    EmojiEvents as EmojiEventsIcon,
    CalendarToday as CalendarTodayIcon,
    Work as WorkIcon,
    Group as GroupIcon,
    Info as InfoIcon,
    CheckCircle as CheckCircleIcon,
    Support as SupportIcon,
    Analytics as AnalyticsIcon,
    Speed as SpeedIcon,
  } from '@mui/icons-material';
  import { OverridableComponent } from '@mui/material/OverridableComponent';
  import { SvgIconTypeMap } from '@mui/material';
  
  export type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  
  export interface PricingPageContent {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    pricingSection: {
      heading: string;
      description: string;
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
  }
  
  export interface Plan {
    type: string;
    title: string;
    tagline: string;
    features: { icon: MuiIcon; text: string }[];
    extraFeatures?: string[];
    price: string;
    annualPrice?: string;
    cardStyle: { backgroundColor: string };
    recommended?: boolean;
    ctaText?: string;
  }
  
  export const pricingPageContent: PricingPageContent = {
    hero: {
      title: 'Flexible Pricing for Your Growing Startup',
      subtitle:
        'Choose the plan that best fits your needs and budget, and get access to expert technology solutions that drive measurable results.',
      cta: 'Explore Our Plans',
    },
    pricingSection: {
      heading: 'Our Flexible Pricing Plans',
      description:
        'Choose the plan that best fits your needs and unlock expert technology solutions designed to propel your business forward.',
    },
    guideSection: {
      heading: 'Which Plan Is Right for You?',
      description:
        'Whether you need on‑demand advice, complete project delivery, or a long‑term strategic partner, we have a plan tailored for your business.',
      items: [
        {
          title: 'Rapid Consultation (Hourly)',
          description:
            'Ideal for immediate expert guidance without long‑term commitments.',
          icon: SpeedIcon,
        },
        {
          title: 'Project Execution (Project‑Based)',
          description:
            'Best for organizations requiring comprehensive project delivery and dedicated support.',
          icon: WorkIcon,
        },
        {
          title: 'Strategic Partnership (Retainer)',
          description:
            'Perfect for businesses seeking continuous support and proactive strategy.',
          icon: SupportIcon,
        },
      ],
    },
    faqSection: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept major credit cards, bank transfers, and PayPal. Our transparent pricing means no hidden fees.',
        },
        {
          question: 'Are there any long‑term contracts?',
          answer:
            'Our Hourly and Project‑Based plans are flexible with no long‑term commitments, while our Strategic Partnership plans involve tailored, longer‑term engagements.',
        },
        {
          question: 'What does a custom quote include?',
          answer:
            'For our Project Execution plans, custom quotes are based on project scope, resource requirements, and timelines—ensuring a solution built just for you.',
        },
        {
          question: 'How quickly can you start on my project?',
          answer:
            'For Rapid Consultation, we can typically schedule within 24-48 hours. For Project Execution, we\'ll provide a detailed timeline during our initial consultation based on your specific needs and our current capacity.',
        },
        {
          question: 'Do you offer any refunds or guarantees?',
          answer:
            'We stand behind our work with a satisfaction guarantee. If you\'re not completely satisfied with our services, we\'ll work with you to make it right or provide a refund according to our terms of service.',
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
        quote:
          "The Strategic Partnership plan revolutionized our approach to technology. We've seen a 43% increase in development efficiency since working with this team.",
        author: 'Sarah Johnson',
        position: 'CTO, GrowthTech Solutions',
        planType: 'retainer',
      },
      {
        quote:
          'Their Project Execution plan delivered our e-commerce platform on time and under budget. The dedicated team approach made all the difference.',
        author: 'Michael Chen',
        position: 'Founder, Urban Retail',
        planType: 'project',
      },
      {
        quote:
          'The Rapid Consultation option was exactly what we needed to solve our immediate challenges without a long-term commitment.',
        author: 'Jessica Rivera',
        position: 'Product Manager, LaunchPad Startups',
        planType: 'consultation',
      }
    ],
    finalCta: {
      heading: 'Ready to Accelerate Your Growth?',
      description:
        'Have questions or ready to get started? Contact us today to discover how our expert solutions can drive your business forward.',
      cta: 'Get Your Free Consultation',
    },
  };
  
  export const plans: Plan[] = [
    {
      type: 'consultation',
      title: 'Rapid Consultation',
      tagline: 'Get immediate expert advice when you need it most.',
      features: [
        { icon: AccessTime, text: 'On-Demand Expertise' },
        { icon: EmojiEventsIcon, text: 'Real-Time Problem Solving' },
        { icon: CalendarTodayIcon, text: 'Instant Scheduling' },
      ],
      extraFeatures: [
        'No minimum commitment',
        'Access to knowledge base',
        'Email support',
      ],
      price: '$295/hr',
      cardStyle: { backgroundColor: 'rgba(25, 118, 210, 0.05)' },
      ctaText: 'Book Consultation',
    },
    {
      type: 'project',
      title: 'Project Execution',
      tagline: 'End-to-end solutions for your complex initiatives.',
      features: [
        { icon: WorkIcon, text: 'Complete Project Delivery' },
        { icon: GroupIcon, text: 'Dedicated Team Support' },
        { icon: EmojiEventsIcon, text: 'Quality Assurance' },
      ],
      extraFeatures: [
        'Dedicated project manager',
        'Bi-weekly progress reports',
        'Post-launch support (30 days)',
      ],
      price: 'Custom Quote',
      cardStyle: { backgroundColor: 'rgba(0, 121, 107, 0.05)' },
      ctaText: 'Request Quote',
    },
    {
      type: 'retainer',
      title: 'Strategic Partnership',
      tagline: 'A long-term ally for continuous growth and innovation.',
      features: [
        { icon: GroupIcon, text: '24/7 Ongoing Support' },
        { icon: InfoIcon, text: 'Tailored Technology Roadmap' },
        { icon: EmojiEventsIcon, text: 'Monthly Performance Reviews' },
      ],
      extraFeatures: [
        'Priority response times',
        'Quarterly strategy sessions',
        'Dedicated account executive',
        'Technology trend briefings',
      ],
      price: 'Starting at $15k/mo',
      annualPrice: 'Starting at $162k/yr',
      cardStyle: { backgroundColor: 'rgba(63, 81, 181, 0.05)' },
      recommended: true,
      ctaText: 'Schedule Strategy Call',
    },
  ];
  