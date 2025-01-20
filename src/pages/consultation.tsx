import React, { useState, useEffect, ReactNode } from 'react';
import { Calendar, Clock, MessageCircle, ChevronRight, ChevronUp, Star } from 'lucide-react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

// Define types for the Card component
interface CardProps {
  children: ReactNode;
  className?: string;
}

// Simple Card Component
const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

// Define types for the Button component
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'cta';
}

// Reusable Button Component
const Button = ({ children, onClick = () => {}, className = '', variant = 'primary' }: ButtonProps) => {
  const baseStyles = 'px-6 py-3 rounded-md transition-all duration-200 font-semibold';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
    secondary: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    cta: 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Define types for the TimelineStep component
interface Step {
  id: string;
  title: string;
  content: string;
  details: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface TimelineStepProps {
  step: Step;
  index: number;
  isLast: boolean;
}

// Enhanced Timeline Step Card
const TimelineStep = ({ step, index, isLast }: TimelineStepProps) => {
  const Icon = step.icon;
  return (
    <div className="flex items-start gap-6 relative group">
      {/* Animated Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-gray-200" />
      )}
      {/* Icon Container with Hover Effect */}
      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
        <Icon className="w-6 h-6 text-white" />
      </div>
      {/* Content Card with Hover Effect */}
      <Card className="flex-1 hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-blue-600">Step {index + 1}</span>
          {step.title}
        </h3>
        <p className="text-gray-600 mt-2 text-lg">{step.content}</p>
        <ul className="mt-4 space-y-2">
          {step.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <span className="text-gray-600">{detail}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

// Define types for the Testimonial component
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

// Testimonial Component
const Testimonial = ({ quote, author, role, rating }: TestimonialProps) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-600 italic mb-4">{quote}</p>
    <div>
      <p className="font-semibold text-gray-800">{author}</p>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  </Card>
);

const ConsultationPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  // Scroll handler setup
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calendly setup
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const consultationSteps: Step[] = [
    {
      id: 'discovery',
      title: 'Strategic Discovery Session',
      content: 'Begin your journey with a data-driven analysis of your current marketing performance.',
      details: [
        'Comprehensive audit of your existing marketing channels',
        'Identification of key growth opportunities and bottlenecks',
        'Development of custom KPIs aligned with your business goals',
      ],
      icon: MessageCircle,
    },
    {
      id: 'strategy',
      title: 'Custom Strategy Blueprint',
      content: 'Receive a tailored marketing strategy designed for your specific market.',
      details: [
        'Competitive analysis and market positioning',
        'Channel-specific tactics and budget allocation',
        'ROI projections and success metrics',
      ],
      icon: Calendar,
    },
    {
      id: 'execution',
      title: 'Implementation Roadmap',
      content: 'Get a detailed 90-day action plan with clear milestones.',
      details: [
        'Week-by-week execution timeline',
        'Resource allocation and team responsibilities',
        'Performance tracking and reporting framework',
      ],
      icon: Clock,
    },
    {
      id: 'optimization',
      title: 'Continuous Optimization',
      content: 'Benefit from ongoing optimization and expert support.',
      details: [
        'Monthly performance reviews and strategy adjustments',
        'A/B testing and conversion rate optimization',
        'Regular stakeholder updates and success reporting',
      ],
      icon: ChevronRight,
    },
  ];

  const testimonials: TestimonialProps[] = [
    {
      quote: "We saw a 43% increase in qualified leads within the first 3 months of implementing the strategy.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      rating: 5,
    },
    {
      quote: "The structured approach and clear metrics helped us achieve our annual growth targets in just 6 months.",
      author: "Michael Chen",
      role: "CEO, GrowthScale",
      rating: 5,
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center', backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            Transform Your <span style={{ color: '#3b82f6' }}>Marketing Vision</span>
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
            Join industry leaders who have achieved an average of{' '}
            <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>35% growth in leads</span> through our data-driven consultation approach.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="primary"
              onClick={() => setShowCalendly(true)}
            >
              Book Your Free Strategy Session
            </Button>
            <Button
              variant="secondary"
              onClick={() => console.log('View case studies clicked')}
            >
              View Success Stories
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Process Timeline */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 6 }}>
            Your Path to Marketing Excellence
          </Typography>
          <Grid container spacing={4}>
            {consultationSteps.map((step, index) => (
              <Grid item xs={12} md={6} key={step.id}>
                <TimelineStep step={step} index={index} isLast={index === consultationSteps.length - 1} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 6 }}>
            What Our Clients Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Testimonial {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, backgroundColor: '#3b82f6', color: 'white' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
            Ready to Transform Your Marketing Results?
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Join successful businesses that have achieved predictable growth through our proven consultation process.
          </Typography>
          <Button
            variant="cta"
            onClick={() => setShowCalendly(true)}
            className="text-lg"
          >
            Schedule Your Free Strategy Session
          </Button>
        </Container>
      </Box>

      {/* Calendly Modal */}
      {showCalendly && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Box sx={{ backgroundColor: 'white', borderRadius: 2, p: 4, width: '90%', maxWidth: '800px' }}>
            <Button onClick={() => setShowCalendly(false)} sx={{ position: 'absolute', top: 16, right: 16 }}>
              &times;
            </Button>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/your-username/strategy-session"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </Box>
        </Box>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: 'white',
            color: '#3b82f6',
            borderRadius: '50%',
            width: 48,
            height: 48,
            boxShadow: 3,
          }}
        >
          <ChevronUp />
        </Button>
      )}
    </Box>
  );
};

export default ConsultationPage;