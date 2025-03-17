import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Avatar, useTheme, Button, alpha, Rating, Chip } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { getSharedStyles, ANIMATIONS } from '../../utils/designSystem';
import { Star, FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';
import TechCard from '../Common/TechCard';

// Data consolidated into a single object
const DATA = {
  testimonials: [
    { id: 1, name: 'John Doe', role: 'CTO, TechCorp', content: "GLUStack's strategic approach transformed our entire development pipeline. Their enterprise expertise helped us resolve complex scaling issues that had plagued us for months.", avatar: '/avatar1.jpg', rating: 5, projectType: 'Cloud Migration' },
    { id: 2, name: 'Jane Smith', role: 'VP Engineering, InnovateX', content: "The precision and expertise they brought to our Azure migration delivered exceptional ROI. We've seen a 40% decrease in infrastructure costs and significantly improved reliability.", avatar: '/avatar2.jpg', rating: 5, projectType: 'DevOps' },
    { id: 3, name: 'Michael Johnson', role: 'Founder, StartupHub', content: "As a startup, we needed enterprise-level architecture but with a sustainable approach. GLUStack delivered exactly that, setting us up for sustainable growth without technical debt.", avatar: '/avatar3.jpg', rating: 5, projectType: 'Architecture' },
    { id: 4, name: 'Emily Davis', role: 'Product Director, GlobalReach', content: "Their team's ability to seamlessly integrate microservices into our legacy system exceeded our expectations. The migration was smooth and the performance gains were immediate.", avatar: '/avatar4.jpg', rating: 5, projectType: 'Microservices' },
    { id: 5, name: 'David Lee', role: 'Product Manager, AgileSolutions', content: "GLUStack's security implementation was remarkable. They identified vulnerabilities we weren't even aware of and implemented OAuth 2.0 with zero disruption to our customers.", avatar: '/avatar5.jpg', rating: 5, projectType: 'Security' },
    { id: 6, name: 'Sarah Chen', role: 'Lead Developer, CodeCrafters', content: "The knowledge transfer and documentation during our Kubernetes migration was exemplary. Our team is now fully self-sufficient thanks to their systematic approach to training.", avatar: '/avatar6.jpg', rating: 4, projectType: 'Infrastructure' }
  ],
  caseStudies: ['ASOS E-commerce Migration Study', 'Tesco DevOps Transformation Guide', 'Microservices Implementation Patterns', 'Enterprise Security Playbook']
};

const TestimonialsSection = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Display only first 3 testimonials unless showAll is true
  const displayedTestimonials = showAll ? DATA.testimonials : DATA.testimonials.slice(0, 3);

  // Improved styling objects for better readability
  const sx = {
    section: { 
      position: 'relative', 
      py: 10, 
      background: 'linear-gradient(180deg, #18407F 0%, #1A438A 100%)', 
      overflow: 'hidden' 
    },
    header: { 
      mb: { xs: 5, md: 6 } 
    },
    title: {
      ...styles.sectionTitle, 
      letterSpacing: '-0.02em', 
      fontWeight: 600, 
      mb: 2
    },
    subtitle: {
      ...styles.sectionSubtitle, 
      letterSpacing: '0.01em', 
      fontWeight: 400, 
      maxWidth: '85%', 
      mx: { xs: 'auto', md: 0 }
    },
    ctaCard: {
      mt: { xs: 6, md: 8 },
      borderRadius: '16px',
      background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.85)})`,
      backdropFilter: 'blur(8px)',
      boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`
    },
    ctaTitle: { 
      letterSpacing: '-0.01em', 
      fontSize: '1.3rem', 
      fontWeight: 600, 
      mb: 1, 
      align: 'center', 
      color: theme.palette.primary.main 
    },
    ctaSubtitle: { 
      letterSpacing: '0.01em', 
      maxWidth: '85%', 
      mx: 'auto', 
      fontSize: '0.95rem', 
      mb: 4, 
      align: 'center', 
      color: theme.palette.text.secondary 
    },
    studiesHeading: { 
      color: theme.palette.primary.main, 
      mb: 2, 
      fontWeight: 600, 
      fontSize: '1rem', 
      letterSpacing: '0.01em' 
    },
    buttonContainer: { 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      pt: 1
    },
    primaryBtn: {
      px: 2.5, 
      py: 0.8, 
      textTransform: 'none', 
      fontWeight: 500, 
      fontSize: '0.85rem', 
      borderRadius: 6,
      letterSpacing: '0.01em', 
      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
      transition: 'all 0.2s ease', 
      flexGrow: { xs: 1, sm: 0 }, 
      width: { xs: '100%', sm: 'auto' },
      '&:hover': { 
        transform: 'translateY(-1px)', 
        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}` 
      },
    },
    secondaryBtn: {
      px: 2.5, 
      py: 0.8, 
      textTransform: 'none', 
      fontWeight: 500, 
      fontSize: '0.85rem', 
      borderRadius: 6,
      borderWidth: 1, 
      letterSpacing: '0.01em', 
      transition: 'all 0.2s ease',
      flexGrow: { xs: 1, sm: 0 }, 
      width: { xs: '100%', sm: 'auto' },
      '&:hover': { 
        borderWidth: 1, 
        transform: 'translateY(-1px)', 
        backgroundColor: alpha(theme.palette.primary.main, 0.05) 
      },
    },
    // Improved card styles for better readability
    testimonialCard: {
      pt: 4.5, 
      position: 'relative', 
      overflow: 'visible',
      background: `linear-gradient(145deg, ${alpha('#1a56db', 0.12)}, ${alpha('#1a56db', 0.05)})`,
      border: `1px solid ${alpha('#4285f4', 0.12)}`, 
      boxShadow: `0 4px 20px ${alpha('#000', 0.05)}`
    },
    testimonialChip: {
      position: 'absolute', 
      top: 8, 
      right: 8, 
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      borderColor: alpha(theme.palette.primary.main, 0.15), 
      color: theme.palette.primary.main, 
      fontWeight: 500, 
      fontSize: '0.65rem', 
      height: '20px', 
      '& .MuiChip-label': { px: 1 }
    },
    testimonialRating: {
      mb: 2, 
      mt: 0.5, 
      display: 'flex', 
      justifyContent: 'center'
    },
    testimonialContent: {
      fontWeight: 400, 
      color: alpha('#fff', 0.95), 
      mb: 2.5, 
      fontStyle: 'italic',
      lineHeight: 1.7,  // Increased for better readability
      fontSize: '0.9rem',  // Slightly larger for better readability
      minHeight: '7rem',
      overflow: 'auto',  // Changed from hidden to auto to allow scrolling if needed
      textAlign: 'left',  // Changed from center to left for better readability
      padding: '0 0.5rem',  // Added padding for better text spacing
      letterSpacing: '0.01em'
    },
    testimonialAuthor: {
      textAlign: 'center', 
      mt: 'auto',
      pt: 1,  // Added padding top for better spacing
      borderTop: `1px solid ${alpha('#fff', 0.1)}`  // Added divider for visual separation
    },
    testimonialName: {
      fontWeight: 600, 
      color: theme.palette.primary.main, 
      fontSize: '0.95rem', 
      letterSpacing: '0.01em'
    },
    testimonialRole: {
      color: alpha('#fff', 0.85), 
      display: 'block', 
      fontWeight: 400, 
      fontSize: '0.75rem', 
      letterSpacing: '0.01em'
    },
    avatar: {
      width: 70, 
      height: 70, 
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`
    }
  };

  // Improved TestimonialCard component for better readability
  const TestimonialCard = ({ testimonial }) => (
    <TechCard
      icon={
        <Avatar 
          src={testimonial.avatar} 
          sx={sx.avatar} 
        />
      }
      title=""
      accentColor={theme.palette.primary.main}
      importance="primary"
      sx={sx.testimonialCard}
    >
      <Chip 
        label={testimonial.projectType} 
        size="small" 
        variant="outlined"
        sx={sx.testimonialChip} 
      />
      <Rating 
        value={testimonial.rating} 
        readOnly 
        icon={<Star style={{ color: theme.palette.primary.main, fill: theme.palette.primary.main }} size={16} />}
        emptyIcon={<Star style={{ color: alpha(theme.palette.primary.main, 0.2) }} size={16} />}
        sx={sx.testimonialRating}
      />
      <Typography 
        variant="body1" 
        sx={sx.testimonialContent}
      >"{testimonial.content}"</Typography>
      <Box sx={sx.testimonialAuthor}>
        <Typography 
          variant="h6" 
          sx={sx.testimonialName}
        >
          {testimonial.name}
        </Typography>
        <Typography 
          variant="caption" 
          sx={sx.testimonialRole}
        >
          {testimonial.role}
        </Typography>
      </Box>
    </TechCard>
  );

  const ElegantCheckmarkItem = ({ text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
      <Box sx={{ 
        width: 16, 
        height: 16, 
        borderRadius: '50%', 
        backgroundColor: theme.palette.primary.main,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white', 
        fontSize: '0.7rem' 
      }}>
        <FileText size={8} />
      </Box>
      <Typography 
        color={theme.palette.text.primary} 
        sx={{ fontSize: '0.9rem', letterSpacing: '0.015em' }}
      >
        {text}
      </Typography>
    </Box>
  );

  return (
    <Box component="section" ref={ref} sx={sx.section}>
      <Container maxWidth="lg" sx={styles.contentContainer}>
        <motion.div variants={ANIMATIONS.container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Header */}
          <Box sx={sx.header}>
            <motion.div variants={ANIMATIONS.item}>
              <Typography variant="h2" sx={sx.title}>
                Client <Box component="span" sx={styles.accentText}>Success Stories</Box>
              </Typography>
              <Typography variant="subtitle1" sx={sx.subtitle}>
                See how our <strong>enterprise expertise</strong> has transformed businesses across industries
              </Typography>
            </motion.div>
          </Box>

          {/* Testimonial Grid */}
          <Grid container spacing={3} justifyContent="center" sx={{ mb: { xs: 2, md: 3 } }}>
            {displayedTestimonials.map((testimonial) => (
              <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
                <motion.div variants={ANIMATIONS.item} style={{ width: '100%', height: '100%' }}>
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* CTA Section */}
          <motion.div variants={ANIMATIONS.item}>
            <TechCard title="Enterprise Proof Points" sx={sx.ctaCard}>
              <Typography variant="h5" component="h3" sx={sx.ctaTitle}>Enterprise Proof Points</Typography>
              <Typography variant="body1" sx={sx.ctaSubtitle}>
                Explore our case studies and discover how we've helped businesses achieve success
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={sx.studiesHeading}>Success Evidence:</Typography>
                </Grid>
                {DATA.caseStudies.map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <ElegantCheckmarkItem text={item} />
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={sx.buttonContainer}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  href="/case-studies" 
                  startIcon={<Download size={14} />} 
                  sx={sx.primaryBtn}
                >
                  Download Case Studies
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => setShowAll(!showAll)} 
                  endIcon={showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />} 
                  sx={sx.secondaryBtn}
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