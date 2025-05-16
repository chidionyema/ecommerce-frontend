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
    name: 'Darren Hall',
    role: 'ASOS, Korokoro Research',
    content: "Working with Chidi has been an absolute pleasure. Their intelligence and remarkable resourcefulness are consistently on display, enabling them to not only complete all assigned tasks with diligence and precision but also to proactively seek out and master new skills. Chidi's ability to adapt and learn quickly makes them an invaluable asset to any project or team. They don't just meet expectations; they thoughtfully exceed them.",
    avatar: '/avatar1.jpg', // Replace with actual path if available
    rating: 5,
  },
  {
    id: 2,
    name: 'Adebola Oke',
    role: 'BBC, Tesco',
    content: "Chidi possesses a rare blend of keen intelligence and practical skill that is truly impressive. In our project, their insightful contributions were pivotal in helping to steer the overall direction, ensuring we stayed on track and focused on the most impactful outcomes. Adebola is a strategic thinker and a proactive problem-solver, consistently demonstrating a deep understanding of complex challenges and the ability to drive towards effective solutions.",
    avatar: '/avatar2.jpg', // Replace with actual path if available
    rating: 5,
  },
  {
    id: 3,
    name: 'Sandeep Dagar',
    role: 'easyJet, ASOS',
    content: "I've had the opportunity to collaborate with Chidi on various initiatives, and their sharp intellect and dedication are consistently evident. Chidi has a knack for understanding intricate systems and contributing meaningfully to project goals. Their commitment to quality and ability to grasp new concepts make them a highly reliable and effective team member.",
    avatar: '/avatar3.jpg', // Replace with actual path if available
    rating: 5,
  },
  {
    id: 4,
    name: 'Jayakumar',
    role: 'StepStone',
    content: "Chidi is a standout professional whose contributions have been significant. They approach tasks with a clear understanding and execute with precision. Their ability to quickly learn and apply new information, coupled with a strong work ethic, makes them a valuable and dependable colleague. I've been consistently impressed by their dedication and the quality of their work.",
    avatar: '/avatar4.jpg', // Replace with actual path if available
    rating: 5,
  },
  {
    id: 5,
    name: 'Rudolphe Cabral',
    role: 'Manager, Phillip Morris',
    content: "Chidi's capability to conceptualise and execute is exceptional. I had the privilege of seeing them build an entire platform from the ground up, demonstrating not only profound technical expertise but also a clear vision and an unwavering commitment to seeing a complex project through to successful completion. Their drive and ability to turn an idea into a functional reality are truly commendable.",
    avatar: '/avatar5.jpg', // Replace with actual path if available
    rating: 5,
  },
];

// Contact information items
export const contactInfoItems: ContactInfoItem[] = [
  {
    icon: Phone,
    primaryText: "Call Us",
    secondaryText: "+44 7904026978",
  },
  {
    icon: Email,
    primaryText: "Email Us",
    secondaryText: "contact@glustack.com",
  },
  {
    icon: LocationOn,
    primaryText: "Our Location",
    secondaryText: "1234 Tech Plaza, Suite 500, San Francisco, CA 94107",
  },
  {
    icon: AccessTime,
    primaryText: "Business Hours",
    secondaryText: "Monday - Saturday: 9AM - 6PM EST",
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