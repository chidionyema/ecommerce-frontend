// src/data/contactPageData.ts

// Import icons individually for better tree-shaking
import Person from '@mui/icons-material/Person';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import Headset from '@mui/icons-material/Headset';
import LocationOn from '@mui/icons-material/LocationOn';
import AccessTime from '@mui/icons-material/AccessTime';
import Star from '@mui/icons-material/Star';

// Import types
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
  interface FaqItem {
    question: string;
    answer: string;
  }
  
  interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
    rating: number;
  }
  
  type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
  
  interface ContactInfoItem {
    icon: MuiIcon;
    primaryText: string;
    secondaryText: string;
  }
  
  export const faqItems: FaqItem[] = [
    {
      question: "What services do you offer?",
      answer: "We provide comprehensive technology consulting services including digital transformation strategy, cloud solutions, software development, and IT infrastructure optimization.",
    },
    {
      question: "How quickly can I get a tech roadmap?",
      answer: "We typically deliver initial roadmaps within 24-48 hours of receiving your project details.  Complex projects may require additional time for thorough analysis.",
    },
    {
      question: "What industries do you specialize in?",
      answer: "We have expertise across multiple sectors including healthcare, finance, e-commerce, and manufacturing.  Our solutions are tailored to meet industry-specific challenges.",
    },
    {
      question: "What are your security standards?",
      answer: "We adhere to ISO 27001 standards and implement end-to-end encryption for all client communications.  Regular security audits ensure continuous protection of your data.",
    },
  ];
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO, TechCorp',
      content: 'Their strategic approach completely transformed our digital infrastructure, resulting in a 40% increase in operational efficiency within just three months.',
      avatar: '/avatar1.jpg',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'CTO, InnovateX',
      content: 'The precision execution and attention to detail elevated our tech stack far beyond our expectations. Worth every penny of the investment.',
      avatar: '/avatar2.jpg',
      rating: 5,
    },
    {
      id: 3,
      name: 'Michael Johnson',
      role: 'VP of Technology, FutureTech',
      content: 'From initial consultation to implementation, their team delivered exactly what we needed with remarkable professionalism and technical expertise.',
      avatar: '/avatar3.jpg',
      rating: 4,
    },
  ];
  
  export const contactInfoItems: ContactInfoItem[] = [
    {
      icon: Phone,
      primaryText: "Call Us",
      secondaryText: "+1 (555) 123-4567",
    },
    {
      icon: Email,
      primaryText: "Email Us",
      secondaryText: "contact@techsolutions.com",
    },
    {
      icon: LocationOn,
      primaryText: "Our Location",
      secondaryText: "1234 Tech Plaza, Suite 500, San Francisco, CA 94107",
    },
    {
      icon: AccessTime,
      primaryText: "Business Hours",
      secondaryText: "Monday - Friday: 9AM - 6PM EST",
    },
  ];
  
  export const heroSection = {
    title: "Let's Build Something Amazing Together",
    subtitle: "Our expert team is ready to transform your ideas into reality with cutting-edge technology solutions",
    formTitle: "Get a Custom Tech Roadmap",
    formSubtitle: "Fill out the form below and receive your personalized technology roadmap within 24 hours",
    formIcon: ChatBubbleOutline,
    contactInfoTitle: "Get in Touch",
    contactInfoSubtitle: "We respond within 24 hours",
    contactInfoIcon: Headset,
  };
  
  export const testimonialSection = {
    title: "What Our Clients Say",
    subtitle: "Don't just take our word for it—hear from the businesses we've helped transform",
  };
  
  export const successPageData = {
    seoTitle: "Thank You",
    seoDescription: "Thank you for contacting us!",
    title: "Message Sent!",
    subtitle: "We'll be in touch shortly.",
    message: "Your message has been successfully sent. We've received your inquiry and a member of our team will contact you within the next 24 hours.",
    buttonText: "Back to Home",
  };