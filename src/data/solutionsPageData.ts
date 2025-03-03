// ./src/data/solutionsPageData.ts

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import StoreIcon from '@mui/icons-material/Store';
import PermMediaIcon from '@mui/icons-material/PermMedia';


export const solutionsPageData = {
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
            icon: "/images/finance-icon.svg", // Replace with your actual paths
            description: "Secure and scalable solutions for the financial sector.",
        },
        {
            title: "Healthcare",
            icon: "/images/healthcare-icon.svg",
            description: "HIPAA-compliant solutions for healthcare providers.",
        },
        {
            title: "Retail",
            icon: "/images/retail-icon.svg",
            description: "E-commerce and point-of-sale solutions for retail businesses.",
        },
        {
            title: "Cloud Services",
            icon: "/images/cloud-icon.svg",
            description: "Robust cloud infrastructure and management solutions."
        },
        {
          title: "DevOps",
          icon: "/images/devops-icon.svg",
          description: "Streamlined development and operations for faster deployment."
        },
        {
            title: "FinTech",
            icon: "/images/fintech-icon.svg",
            description: "Innovative financial technology solutions."
        },
         {
            title: "E-commerce",
            icon: "/images/ecommerce-icon.svg",
            description: "Comprehensive online retail platforms."
        },
         {
            title: "Media",
            icon: "/images/media-icon.svg",
            description: "Dynamic content delivery and management systems."
        },

        // Add more industries as needed
    ],
    benefits: [
        {
          icon: TrendingUpIcon, // Use the component directly
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
          image: "/images/jane-doe.jpg", // Replace with your actual paths
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