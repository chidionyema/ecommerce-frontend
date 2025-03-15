// src/data/contactData.ts

// Import icons individually for better tree-shaking
import { 
  Person, 
  Email, 
  Phone, 
  ChatBubbleOutline, 
  Headset, 
  LocationOn, 
  AccessTime, 
  Star,
  KeyboardArrowUp
} from '@mui/icons-material';
import { CheckCircle } from 'lucide-react';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// Type definitions
export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
}

export interface ContactInfoItem {
  icon: MuiIcon;
  primaryText: string;
  secondaryText: string;
}

export interface FormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

// Form validation schema config
export const validationConfig = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    requiredMessage: 'Name is required',
    minLengthMessage: 'Name must be at least 2 characters',
    maxLengthMessage: 'Name cannot exceed 100 characters'
  },
  email: {
    required: true,
    requiredMessage: 'Email is required',
    invalidMessage: 'Invalid email format'
  },
  phone: {
    optional: true,
    pattern: /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,
    maxLength: 20,
    patternMessage: 'Invalid phone number format (e.g. +1 555-123-4567)',
    maxLengthMessage: 'Phone number cannot exceed 20 characters'
  },
  message: {
    optional: true,
    maxLength: 500,
    maxLengthMessage: 'Message cannot exceed 500 characters'
  }
};

// FAQ items
export const faqItems: FaqItem[] = [
  {
    question: "What services do you offer?",
    answer: "We provide comprehensive technology consulting services including digital transformation strategy, cloud solutions, software development, and IT infrastructure optimization.",
  },
  {
    question: "How quickly can I get a tech roadmap?",
    answer: "We typically deliver initial roadmaps within 24-48 hours of receiving your project details. Complex projects may require additional time for thorough analysis.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We have expertise across multiple sectors including healthcare, finance, e-commerce, and manufacturing. Our solutions are tailored to meet industry-specific challenges.",
  },
  {
    question: "What are your security standards?",
    answer: "We adhere to ISO 27001 standards and implement end-to-end encryption for all client communications. Regular security audits ensure continuous protection of your data.",
  },
];

// Testimonials
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

// Contact information items
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

// Hero section data
export const heroSection = {
  title: "Let's Build Something Amazing Together",
  subtitle: "Our expert team is ready to transform your ideas into reality with cutting-edge technology solutions",
  formTitle: "Get a Custom Tech Roadmap",
  formSubtitle: "Fill out the form below and receive your personalized technology roadmap within 24 hours",
  formIcon: ChatBubbleOutline,
  contactInfoTitle: "Get in Touch",
  contactInfoSubtitle: "We respond within 24 hours",
  contactInfoIcon: Headset,
  contactInfoDescription: "Ready to accelerate your digital transformation? Our team of experts is here to help you navigate the complexities of modern technology and create solutions tailored to your specific business needs."
};

// Testimonial section data
export const testimonialSection = {
  title: "What Our Clients Say",
  subtitle: "Don't just take our word for it—hear from the businesses we've helped transform",
};

// Success page data
export const successPageData = {
  seoTitle: "Thank You",
  seoDescription: "Thank you for contacting us!",
  title: "Message Sent!",
  subtitle: "We'll be in touch shortly.",
  message: "Your message has been successfully sent. We've received your inquiry and a member of our team will contact you within the next 24 hours.",
  buttonText: "Back to Home",
};

// Icons
export const icons = {
  backToTop: KeyboardArrowUp,
  checkCircle: CheckCircle,
  person: Person,
  email: Email,
  phone: Phone,
  starIcon: Star
};

// Form CTA text
export const formCTA = "Request Your Tech Roadmap";

// Form additional text
export const formAdditionalText = {
  nameLabel: "Full Name",
  emailLabel: "Email Address",
  phoneLabel: "Phone Number",
  messageLabel: "Tell us about your project",
};

// SEO data
export const seoData = {
  title: "Contact Us - Expert Tech Solutions",
  description: "Reach out for tailored technology consulting and solutions. Let our experts guide your digital transformation.",
  keywords: "contact, support, inquiry, partnership, technology consulting"
};