import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  useTheme,
  Button,
  alpha,
  Rating,
  Chip,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { SPACING, getSharedStyles } from '../../utils/sharedStyles';
import TechCard from '../Common/TechCard'; 
import { Star } from 'lucide-react';

// Enhanced testimonials with more specific, detailed content
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CTO, TechCorp',
    content: "GLUStack's strategic approach transformed our entire development pipeline. Their enterprise expertise helped us resolve complex scaling issues that had plagued us for months.",
    avatar: '/avatar1.jpg',
    rating: 5,
    projectType: 'Cloud Migration',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'VP Engineering, InnovateX',
    content: "The precision and expertise they brought to our Azure migration delivered exceptional ROI. We've seen a 40% decrease in infrastructure costs and significantly improved reliability.",
    avatar: '/avatar2.jpg',
    rating: 5,
    projectType: 'DevOps',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Founder, StartupHub',
    content: "As a startup, we needed enterprise-level architecture but with a sustainable approach. GLUStack delivered exactly that, setting us up for sustainable growth without technical debt.",
    avatar: '/avatar3.jpg',
    rating: 5, 
    projectType: 'Architecture',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Product Director, GlobalReach',
    content: "Their team's ability to seamlessly integrate microservices into our legacy system exceeded our expectations. The migration was smooth and the performance gains were immediate.",
    avatar: '/avatar4.jpg',
    rating: 5,
    projectType: 'Microservices',
  },
  {
    id: 5,
    name: 'David Lee',
    role: 'Product Manager, AgileSolutions',
    content: "GLUStack's security implementation was remarkable. They identified vulnerabilities we weren't even aware of and implemented OAuth 2.0 with zero disruption to our customers.",
    avatar: '/avatar5.jpg',
    rating: 5,
    projectType: 'Security',
  },
  {
    id: 6,
    name: 'Sarah Chen',
    role: 'Lead Developer, CodeCrafters',
    content: "The knowledge transfer and documentation during our Kubernetes migration was exemplary. Our team is now fully self-sufficient thanks to their systematic approach to training.",
    avatar: '/avatar6.jpg',
    rating: 4,
    projectType: 'Infrastructure',
  },
];

// Animation variants for consistent brand motion
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
};

const TestimonialsSection = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        width: '100%',
        py: SPACING.large * 1.5,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.85)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{
                ...styles.pageTitle,
                color: 'white',
                mb: 2,
                fontWeight: 800,
                fontSize: { xs: '2.2rem', sm: '2.7rem', md: '3.2rem' },
                letterSpacing: '-0.01em',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              }}
            >
              Client Success Stories
            </Typography>
          </motion.div>

          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Typography 
              variant="subtitle1"
              align="center"
              sx={{
                color: alpha(theme.palette.common.white, 0.9),
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                fontSize: '1.2rem',
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              See how our enterprise expertise has transformed businesses across industries
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {displayedTestimonials.map((t, index) => (
              <Grid item key={t.id} xs={12} sm={6} md={4}>
                <motion.div
                  variants={ANIMATION_VARIANTS.item}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <TechCard
                    icon={null}
                    title=""
                  >
                    <Box sx={{ position: 'relative', pt: 4, pb: 2 }}>
                      <Avatar
                        src={t.avatar}
                        sx={{
                          width: 80,
                          height: 80,
                          position: 'absolute',
                          top: -40,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          border: `3px solid ${theme.palette.primary.main}`,
                          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }}
                      />
                      
                      <Chip 
                        label={t.projectType}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: alpha(theme.palette.primary.main, 0.15),
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                        variant="outlined"
                      />
                      
                      <Rating 
                        value={t.rating} 
                        readOnly 
                        icon={<Star style={{ color: theme.palette.secondary.main, fill: theme.palette.secondary.main }} size={18} />}
                        emptyIcon={<Star style={{ color: alpha(theme.palette.secondary.main, 0.3) }} size={18} />}
                        sx={{ mb: 2, mt: 0.5 }}
                      />
                      
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                          mb: 3,
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          fontSize: '0.95rem',
                          height: '7rem', // Fixed height for consistent card sizing
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        "{t.content}"
                      </Typography>
                      
                      <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            fontSize: '1.1rem',
                          }}
                        >
                          {t.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: alpha(theme.palette.text.secondary, 0.9),
                            display: 'block',
                            fontWeight: 500,
                          }}
                        >
                          {t.role}
                        </Typography>
                      </Box>
                    </Box>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div variants={ANIMATION_VARIANTS.item}>
            <Box sx={{ 
              textAlign: 'center', 
              mt: 8,
            }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => setShowAll(!showAll)}
                sx={{
                  px: 5,
                  py: 1.6,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}, 0 2px 6px rgba(0, 0, 0, 0.3)`,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.7)}, 0 4px 10px rgba(0, 0, 0, 0.4)`,
                  },
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                {showAll ? 'Show Less' : 'View More Success Stories'}
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;