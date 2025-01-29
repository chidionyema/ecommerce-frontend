import React, { useState } from 'react';
import {
  Calendar, Clock, MessageCircle, ChevronRight, ChevronUp, Star,
  User, Rocket, BarChart, ShieldCheck, CloudLightning, Code, Server
} from 'lucide-react';
import { Container, Box, Typography, Grid, alpha } from '@mui/material';
import { colors } from '../theme/branding';

interface TimelineStepProps {
  title: string;
  content: string;
  details: string; // details is an array of strings
  icon: any;
}

const TimelineStep = ({ title, content, details, icon: Icon }: TimelineStepProps) => (
  <div className="flex items-start gap-6 group">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{content}</p>
      <ul className="space-y-2">
        {details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-600">
            <ChevronRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const TestimonialCard = ({ author, role, quote }: { author: string; role: string; quote: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <User className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-800">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 italic">"{quote}"</p>
  </div>
);

const ConsultationPage = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  const steps = [
    {
      title: 'Strategic Discovery',
      content: 'Comprehensive audit of your current marketing performance',
      details: ['Channel analysis', 'Opportunity identification', 'KPI development'],
      icon: Rocket,
    },
    {
      title: 'Strategy Development',
      content: 'Create tailored marketing strategy for your market',
      details: ['Competitive analysis', 'Budget allocation', 'ROI projections'],
      icon: BarChart,
    },
    {
      title: 'Implementation Plan',
      content: '90-day action plan with clear milestones',
      details: ['Execution timeline', 'Resource allocation', 'Reporting framework'],
      icon: Code,
    },
    {
      title: 'Optimization Cycle',
      content: 'Continuous improvement and support',
      details: ['Monthly reviews', 'A/B testing', 'Performance reporting'],
      icon: CloudLightning,
    },
  ];

  const testimonials = [
    {
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      quote: "43% increase in qualified leads within first 3 months"
    },
    {
      author: "Michael Chen",
      role: "CEO, GrowthScale",
      quote: "Achieved annual growth targets in 6 months"
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}> {/* Added minHeight */}
      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center', bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <div className="mb-6 flex justify-center">
            <ShieldCheck className="w-16 h-16 text-blue-600" />
          </div>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Transform Your Digital Strategy
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
            Leverage our expertise to accelerate your digital transformation
          </Typography>
        </Container>
      </Box>

      {/* Process Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 6 }}>
            Our Proven Process
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TimelineStep {...step} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 8, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 6 }}>
            Client Success Stories
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, bgcolor: '#1e40af', color: 'white' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <div className="mb-6 flex justify-center">
            <Server className="w-16 h-16 text-white" />
          </div>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            Ready for Digital Transformation?
          </Typography>
          <button
            onClick={() => setShowCalendly(true)}
            className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Schedule Free Consultation
          </button>
        </Container>
      </Box>
    </Box>
  );
};

export default ConsultationPage;