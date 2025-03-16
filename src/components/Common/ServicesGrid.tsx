import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, useTheme, alpha, Button, Divider, Stack } from '@mui/material';
import { getSharedStyles, ANIMATIONS } from '../../utils/designSystem';
import TechCard from '../Common/TechCard';
import { motion, useInView } from 'framer-motion';
import { Layers, Cloud, Code, ShieldCheck, TrendingUp, Cpu, Database, BookOpen, Wrench, ArrowRight, Download, FileText, ChevronRight } from 'lucide-react';

// Services data with icons formatted for TechCard
const services = [
  { 
    title: 'Enterprise Architecture', 
    content: 'Strategic design of scalable, maintainable systems based on our experience at ASOS and Tesco.', 
    icon: <Layers strokeWidth={1.5} size={20} color="#FF5722" />, 
    color: '#FF5722',
    gradient: 'linear-gradient(135deg, #FF9966, #FF5E62)',  
    ctaLink: '/services/enterprise-architecture' 
  },
  { 
    title: 'Cloud Migration', 
    content: 'Seamless transitions to AWS, Azure, and GCP with proven methodologies from StepStone and PMI.', 
    icon: <Cloud strokeWidth={1.5} size={20} color="#2196F3" />, 
    color: '#2196F3',
    gradient: 'linear-gradient(135deg, #00C6FB, #005BEA)', 
    ctaLink: '/services/cloud-migration' 
  },
  { 
    title: 'DevOps & Infrastructure', 
    content: 'Automate deployment pipelines with Docker, Kubernetes, and Terraform for maximum efficiency.', 
    icon: <Wrench strokeWidth={1.5} size={20} color="#4CAF50" />, 
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #38ef7d, #11998e)', 
    ctaLink: '/services/devops' 
  },
  { 
    title: 'Custom Software Development', 
    content: 'Full-stack solutions in .NET, React, Next.js, and more with enterprise-grade quality.', 
    icon: <Code strokeWidth={1.5} size={20} color="#673AB7" />, 
    color: '#673AB7',
    gradient: 'linear-gradient(135deg, #6a11cb, #2575fc)', 
    ctaLink: '/services/development' 
  },
  { 
    title: 'Machine Learning Integration', 
    content: 'Practical AI implementation leveraging expertise from Imperial College certification.', 
    icon: <Cpu strokeWidth={1.5} size={20} color="#E91E63" />, 
    color: '#E91E63',
    gradient: 'linear-gradient(135deg, #F857A6, #FF5858)', 
    ctaLink: '/services/machine-learning' 
  },
  { 
    title: 'Security & Authentication', 
    content: 'Implement OAuth 2.0, OpenID Connect, and secure architecture patterns from day one.', 
    icon: <ShieldCheck strokeWidth={1.5} size={20} color="#FFC107" />, 
    color: '#FFC107',
    gradient: 'linear-gradient(135deg, #FFD32D, #FF7A00)', 
    ctaLink: '/services/security' 
  },
  { 
    title: 'Microservices Architecture', 
    content: 'Design and implement scalable microservices with messaging systems like RabbitMQ and SQS.', 
    icon: <Database strokeWidth={1.5} size={20} color="#00BCD4" />, 
    color: '#00BCD4',
    gradient: 'linear-gradient(135deg, #21D4FD, #2152FF)', 
    ctaLink: '/services/microservices' 
  },
  { 
    title: 'Technical Documentation', 
    content: 'Comprehensive, accessible documentation that empowers your team for long-term success.', 
    icon: <BookOpen strokeWidth={1.5} size={20} color="#9E9E9E" />, 
    color: '#9E9E9E',
    gradient: 'linear-gradient(135deg, #A8B4CC, #7F8DAA)', 
    ctaLink: '/services/documentation' 
  },
];

// Resources list for blue CTA - matching hero section pattern
const resources = [
  'Weekly technical tutorials', 
  'Code snippets & templates', 
  'Architecture best practices', 
  'Security & performance tips'
];

const ServicesGrid = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Blue checkmark component matching hero section styling 
  const BlueCheckmarkItem = ({ text, icon: Icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ 
        width: 20, 
        height: 20, 
        borderRadius: '50%', 
        backgroundColor: theme.palette.primary.main,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white', 
        fontSize: '0.8rem' 
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
              Enterprise Solutions for <Box component="span" sx={styles.accentText}>Growing Businesses</Box>
            </Typography>
          </motion.div>

          <motion.div variants={ANIMATIONS.item}>
            <Typography variant="subtitle1" sx={styles.sectionSubtitle}>
              Leverage our experience from <strong>ASOS, Tesco, and Philip Morris</strong> to build 
              scalable, secure, and efficient technology for your growing company
            </Typography>
          </motion.div>

          {/* Service cards using TechCard */}
          <Grid container spacing={4} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}
                onMouseEnter={() => setHoveredIndex(index)} 
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <motion.div variants={ANIMATIONS.item} style={{ width: '100%', height: '100%' }}>
                  <TechCard
                    icon={hoveredIndex === index ? 
                      React.cloneElement(service.icon, { strokeWidth: 2 }) : 
                      service.icon
                    }
                    title={service.title}
                    accentColor={service.color}
                    importance="primary"
                    sx={{
                      background: `linear-gradient(145deg, ${alpha('#1a56db', 0.15)}, ${alpha('#1a56db', 0.07)})`,
                      border: `1px solid ${alpha('#4285f4', 0.15)}`,
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      color={alpha('#fff', 0.9)} 
                      sx={{ 
                        fontSize: '0.9rem', 
                        lineHeight: 1.5, 
                        letterSpacing: '0.01em',
                        flexGrow: 1,
                        textAlign: 'center',
                        mb: 2
                      }}
                    >
                      {service.content}
                    </Typography>
                    
                    <Divider sx={{ 
                      mb: 1.5, 
                      borderColor: alpha('#fff', 0.2), 
                      width: '80%', 
                      mx: 'auto' 
                    }} />
                    
                    <Button 
                      variant="text" 
                      color="inherit"
                      endIcon={<ArrowRight size={16} />} 
                      href={service.ctaLink} 
                      sx={{
                        textTransform: 'none', 
                        fontWeight: 600, 
                        fontSize: '0.9rem', 
                        color: '#fff',
                        '&:hover': { 
                          backgroundColor: alpha('#fff', 0.1)
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Learn More
                    </Button>
                  </TechCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          {/* Combined CTA section - Resources and All Services */}
          <motion.div variants={ANIMATIONS.item}>
            <TechCard
              title="Enterprise Resources & Services"
              importance="primary"
              sx={{
                ...styles.ctaCard,
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                mt: 6
              }}
            >
              <Grid container spacing={3}>
                {/* Left side: Resources list */}
                <Grid item xs={12} md={6} sx={{ 
                  borderRight: { xs: 'none', md: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
                  pb: { xs: 3, md: 0 }
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: theme.palette.primary.main, 
                      mb: 2, 
                      fontWeight: 600 
                    }}
                  >
                    Free Enterprise Resources
                  </Typography>
                  
                  <Grid container spacing={1}>
                    {resources.map((item, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <BlueCheckmarkItem text={item} icon={FileText} />
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Download size={16} />}
                    href="/resources" 
                    sx={{
                      mt: 2,
                      px: 3, 
                      py: 1, 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      fontSize: '0.95rem', 
                      borderRadius: 2,
                    }}
                  >
                    Access Free Resources
                  </Button>
                </Grid>
                
                {/* Right side: Services CTA */}
                <Grid item xs={12} md={6} sx={{ 
                  borderTop: { xs: `1px solid ${alpha(theme.palette.divider, 0.1)}`, md: 'none' },
                  pt: { xs: 3, md: 0 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: theme.palette.secondary.main, 
                      mb: 2, 
                      fontWeight: 600 
                    }}
                  >
                    Explore Our Enterprise Solutions
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      color: theme.palette.text.primary 
                    }}
                  >
                    Discover our full range of enterprise-grade services designed to help your business scale efficiently and securely.
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    endIcon={<ChevronRight size={16} strokeWidth={2} />}
                    href="/solutions" 
                    sx={{
                      px: 3, 
                      py: 1, 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      fontSize: '0.95rem', 
                      borderRadius: 2,
                      alignSelf: { xs: 'center', md: 'flex-start' }
                    }}
                  >
                    View All Enterprise Services
                  </Button>
                </Grid>
              </Grid>
            </TechCard>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesGrid;