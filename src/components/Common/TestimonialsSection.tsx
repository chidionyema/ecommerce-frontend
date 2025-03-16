import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Avatar, useTheme, Button, alpha, Rating, Chip } from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { getSharedStyles, ANIMATIONS } from '../../utils/designSystem';
import { Star, FileText, Download, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import TechCard from '../Common/TechCard';

// Testimonials data remains unchanged
const testimonials = [
  { 
    id: 1, 
    name: 'John Doe', 
    role: 'CTO, TechCorp', 
    content: "GLUStack's strategic approach transformed our entire development pipeline. Their enterprise expertise helped us resolve complex scaling issues that had plagued us for months.", 
    avatar: '/avatar1.jpg', 
    rating: 5, 
    projectType: 'Cloud Migration' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    role: 'VP Engineering, InnovateX', 
    content: "The precision and expertise they brought to our Azure migration delivered exceptional ROI. We've seen a 40% decrease in infrastructure costs and significantly improved reliability.", 
    avatar: '/avatar2.jpg', 
    rating: 5, 
    projectType: 'DevOps' 
  },
  { 
    id: 3, 
    name: 'Michael Johnson', 
    role: 'Founder, StartupHub', 
    content: "As a startup, we needed enterprise-level architecture but with a sustainable approach. GLUStack delivered exactly that, setting us up for sustainable growth without technical debt.", 
    avatar: '/avatar3.jpg', 
    rating: 5, 
    projectType: 'Architecture' 
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    role: 'Product Director, GlobalReach', 
    content: "Their team's ability to seamlessly integrate microservices into our legacy system exceeded our expectations. The migration was smooth and the performance gains were immediate.", 
    avatar: '/avatar4.jpg', 
    rating: 5, 
    projectType: 'Microservices' 
  },
  { 
    id: 5, 
    name: 'David Lee', 
    role: 'Product Manager, AgileSolutions', 
    content: "GLUStack's security implementation was remarkable. They identified vulnerabilities we weren't even aware of and implemented OAuth 2.0 with zero disruption to our customers.", 
    avatar: '/avatar5.jpg', 
    rating: 5, 
    projectType: 'Security' 
  },
  { 
    id: 6, 
    name: 'Sarah Chen', 
    role: 'Lead Developer, CodeCrafters', 
    content: "The knowledge transfer and documentation during our Kubernetes migration was exemplary. Our team is now fully self-sufficient thanks to their systematic approach to training.", 
    avatar: '/avatar6.jpg', 
    rating: 4, 
    projectType: 'Infrastructure' 
  },
];

// Case study items for CTA section
const caseStudies = [
  'ASOS E-commerce Migration Study', 
  'Tesco DevOps Transformation Guide', 
  'Microservices Implementation Patterns', 
  'Enterprise Security Playbook'
];

const TestimonialsSection = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Display limited testimonials by default
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  // Testimonial card using TechCard component
  const TestimonialCard = ({ testimonial }) => {
    // Create a custom icon for TechCard (the avatar)
    const avatarIcon = (
      <Avatar 
        src={testimonial.avatar} 
        sx={{
          width: 80, 
          height: 80,
          border: `3px solid ${theme.palette.primary.main}`,
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
        }} 
      />
    );

    return (
      <TechCard
        icon={avatarIcon}
        title=""
        accentColor={theme.palette.secondary.main}
        importance="primary"
        sx={{
          pt: 5,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Project type chip */}
        <Chip 
          label={testimonial.projectType} 
          size="small" 
          sx={{
            position: 'absolute', 
            top: 8, 
            right: 8,
            backgroundColor: alpha(theme.palette.secondary.main, 0.15),
            borderColor: alpha(theme.palette.secondary.main, 0.2),
            color: theme.palette.secondary.main, 
            fontWeight: 600, 
            fontSize: '0.7rem',
          }} 
          variant="outlined" 
        />
        
        {/* Rating */}
        <Rating 
          value={testimonial.rating} 
          readOnly 
          icon={<Star style={{ color: theme.palette.secondary.main, fill: theme.palette.secondary.main }} size={18} />}
          emptyIcon={<Star style={{ color: alpha(theme.palette.secondary.main, 0.3) }} size={18} />}
          sx={{ mb: 2, mt: 0.5, display: 'flex', justifyContent: 'center' }}
        />
        
        {/* Content */}
        <Typography 
          variant="body1" 
          sx={{
            fontWeight: 500, 
            color: 'white', 
            mb: 3, 
            fontStyle: 'italic',
            lineHeight: 1.6, 
            fontSize: '0.95rem', 
            height: '7rem', 
            overflow: 'hidden',
            textOverflow: 'ellipsis', 
            display: '-webkit-box', 
            WebkitLineClamp: 5, 
            WebkitBoxOrient: 'vertical',
            textAlign: 'center'
          }}
        >
          "{testimonial.content}"
        </Typography>
        
        {/* Name and role */}
        <Box sx={{ textAlign: 'center', mt: 'auto' }}>
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 700, 
              color: theme.palette.secondary.main, 
              fontSize: '1.1rem',
            }}
          >
            {testimonial.name}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{
              color: alpha('#fff', 0.9), 
              display: 'block', 
              fontWeight: 500,
            }}
          >
            {testimonial.role}
          </Typography>
        </Box>
      </TechCard>
    );
  };

  // Blue checkmark component matching hero section styling
  const BlueCheckmarkItem = ({ text, icon: Icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ 
        width: 20, height: 20, borderRadius: '50%', backgroundColor: theme.palette.primary.main,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' 
      }}>
        {Icon ? <Icon size={12} /> : '✓'}
      </Box>
      <Typography color={theme.palette.text.primary}>{text}</Typography>
    </Box>
  );

  return (
    <Box 
      component="section" 
      ref={ref} 
      sx={{
        position: 'relative',
        py: 10,
        background: 'linear-gradient(180deg, #18407F 0%, #1A438A 100%)',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg" sx={styles.contentContainer}>
        <motion.div 
          variants={ANIMATIONS.container} 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="h2" sx={styles.sectionTitle}>
              Client <Box component="span" sx={styles.accentText}>Success Stories</Box>
            </Typography>
          </motion.div>

          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="subtitle1" sx={styles.sectionSubtitle}>
              See how our <strong>enterprise expertise</strong> has transformed businesses across industries
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {displayedTestimonials.map((testimonial) => (
              <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
                <motion.div variants={ANIMATIONS.item} style={{ width: '100%', height: '100%' }}>
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Combined CTA section with testimonial toggle and case studies */}
          <motion.div variants={ANIMATIONS.item}>
            <TechCard
              title="Enterprise Proof Points"
              sx={{
                ...styles.ctaCard,
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                mt: 6
              }}
            >
              {/* Case studies section */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: theme.palette.primary.main, 
                      mb: 2, 
                      fontWeight: 600 
                    }}
                  >
                    Download Success Evidence:
                  </Typography>
                </Grid>
                {caseStudies.map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <BlueCheckmarkItem text={item} icon={FileText} />
                  </Grid>
                ))}
              </Grid>
              
              {/* Combined CTA buttons */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2
              }}>
                {/* Primary CTA - Download Case Studies */}
                <Button 
                  variant="contained" 
                  color="primary" 
                  href="/case-studies" 
                  startIcon={<Download size={16} />}
                  sx={{
                    px: 3, 
                    py: 1, 
                    textTransform: 'none', 
                    fontWeight: 600, 
                    fontSize: '0.95rem', 
                    borderRadius: 2,
                    flexGrow: { xs: 1, sm: 0 },
                    width: { xs: '100%', sm: 'auto' }
                  }}
                >
                  Download Case Studies
                </Button>
                
                {/* Secondary CTA - View More/Less Testimonials */}
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => setShowAll(!showAll)} 
                  endIcon={showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  sx={{
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    borderRadius: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2
                    },
                    flexGrow: { xs: 1, sm: 0 },
                    width: { xs: '100%', sm: 'auto' }
                  }}
                >
                  {showAll ? 'Show Fewer Stories' : 'View All Testimonials'}
                </Button>
              </Box>
            </TechCard>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;