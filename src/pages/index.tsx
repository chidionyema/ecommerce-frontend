import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Grid, Paper, useTheme, useMediaQuery, Link, 
  IconButton, Modal, styled 
} from '@mui/material';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { motion, useAnimation } from 'framer-motion';
import NextLink from 'next/link';
import { 
  FaPython, FaReact, FaNodeJs, FaAws, FaDocker, FaJava, FaMicrosoft, FaBrain, FaLinux 
} from 'react-icons/fa';
import { SiRust, SiGoland } from 'react-icons/si';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Head from 'next/head';

// Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1.1rem',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  background: 'linear-gradient(45deg, #1a237e 0%, #0d47a1 100%)',
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  fontWeight: 700,
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    background: 'linear-gradient(45deg, #0d47a1 0%, #1a237e 100%)',
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
  },
  '&:focus': {
    outline: '2px solid #fff',
    outlineOffset: '2px',
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '15px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.15)',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #1a237e 0%, #0d47a1 100%)',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  '&:hover:after': {
    opacity: 0.1,
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minHeight: '50vh',
  padding: theme.spacing(6, 2),
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  color: theme.palette.common.white,
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url(/grid-pattern.svg) repeat',
    opacity: 0.1,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '60vh',
    padding: theme.spacing(4, 2),
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fc',
  padding: theme.spacing(10, 2),
  borderRadius: '15px',
  marginBottom: theme.spacing(6),
  background: 'linear-gradient(to bottom, #f8f9fc, #f0f2f5)',
  color: '#333',
}));

const techIcons = [
  { title: 'Python', icon: <FaPython size={60} />, color: '#3776AB' },
  { title: 'React Native', icon: <FaReact size={60} />, color: '#61DAFB' },
  { title: 'Node.js', icon: <FaNodeJs size={60} />, color: '#68A063' },
  { title: 'DevOps', icon: <FaDocker size={60} />, color: '#2496ED' },
  { title: 'Cloud Infrastructure', icon: <FaAws size={60} />, color: '#FF9900' },
  { title: 'Java', icon: <FaJava size={60} />, color: '#007396' },
  { title: '.NET', icon: <FaMicrosoft size={60} />, color: '#512BD4' },
  { title: 'AI & ML', icon: <FaBrain size={60} />, color: '#FF6F00' },
  { title: 'Linux', icon: <FaLinux size={60} />, color: '#FCC624' },
  { title: 'Rust', icon: <SiRust size={60} />, color: '#000000' },
  { title: 'Go (Golang)', icon: <SiGoland size={60} />, color: '#00ADD8' },
  { title: 'React', icon: <FaReact size={60} />, color: '#61DAFB' },
].map((tech, index) => ({
  ...tech,
  description: [
    'Build scalable and efficient applications with Python',
    'Develop cross-platform mobile applications with React Native',
    'Build fast and scalable server-side applications with Node.js',
    'Streamline your development lifecycle with automated CI/CD',
    'Scale applications with robust cloud solutions',
    'Develop robust backend solutions with Java',
    'Build enterprise-grade .NET applications',
    'Harness the power of AI and ML for innovation',
    'Leverage efficient Linux server management',
    'Build high-performance applications with Rust',
    'Develop fast backend services with Go',
    'Create dynamic UIs with React',
  ][index],
}));

const BookingModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', message: '', general: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', phone: '', message: '', general: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Submission failed');
        setIsSuccess(true);
        setTimeout(() => onClose(), 2000);
      } catch (error) {
        setErrors(prev => ({ ...prev, general: 'Submission failed. Please try again.' }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '800px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '12px',
        p: 6,
      }}>
        {isSuccess ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <CheckCircleOutline sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2 }}>
              Consultation Booked!
            </Typography>
            <Typography>
              Our expert will contact you within 2 business hours
            </Typography>
          </Box>
        ) : (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}>
              Book a Consultation
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  label="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  label="Your Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  multiline
                  rows={6}
                />
              </FormControl>
              {errors.general && (
                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                  {errors.general}
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    width: '50%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'linear-gradient(45deg, #1a237e 0%, #0d47a1 100%)',
                    '&:hover': { background: 'linear-gradient(45deg, #0d47a1 0%, #1a237e 100%)' },
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Expert Help Now →'}
                </Button>
              </Box>
            </form>
          </motion.div>
        )}
      </Box>
    </Modal>
  );
};

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
      document.querySelectorAll('.feature-card').forEach(card => {
        if (card.getBoundingClientRect().top <= window.innerHeight * 0.75) {
          controls.start('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <Box component="main">
      <Head>
        <title>TechMastery - Expert Technology Solutions</title>
        <meta name="description" content="Professional tech consultancy with proven results" />
      </Head>

      <HeroSection component="section">
        <Container maxWidth="md">
          <Box sx={{ py: 6 }}>
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  mb: 4,
                  textAlign: 'center',
                  lineHeight: 1.2,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  '&:after': { content: '"🚀"', ml: 2 }
                }}
              >
                Accelerate Your Tech Success
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  textAlign: 'center',
                  mb: 6,
                  px: 2,
                }}
              >
                Enterprise-grade solutions with startup agility
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <StyledButton
                  endIcon={<ArrowRightAlt />}
                  onClick={() => setIsBookingModalOpen(true)}
                  aria-label="Book Consultation"
                >
                  Start Your Project
                </StyledButton>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </HeroSection>

      <SectionContainer component="section">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 8,
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: theme.palette.text.primary
            }}
          >
            Core Technologies
          </Typography>
          <Grid container spacing={isMobile ? 3 : 6} justifyContent="center">
            {techIcons.map((tech, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{ visible: { opacity: 1, y: 0 } }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <FeatureCard>
                    <Box sx={{ 
                      mb: 2,
                      color: tech.color,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'rotate(15deg) scale(1.2)' }
                    }}>
                      {tech.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                      {tech.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#555' }}>
                      {tech.description}
                    </Typography>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      <SectionContainer component="section" sx={{ backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 6, textAlign: 'center', fontWeight: 700 }}>
            Trusted by Innovators
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { quote: "Cut deployment time by 40% with their cloud expertise", author: "CTO, FinTech Startup" },
              { quote: "Revolutionized our mobile app performance in 2 weeks", author: "Lead Engineer, HealthTech" },
              { quote: "Essential partner in our AI migration journey", author: "Director, Enterprise SaaS" }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Paper sx={{ p: 4, borderRadius: 4, height: '100%' }}>
                    <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a237e' }}>
                      {testimonial.author}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      <SectionContainer component="section">
        <Container maxWidth="md">
          <Grid container spacing={6} justifyContent="center">
            {[
              { number: '300+', label: 'Projects Delivered' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Expert Support' }
            ].map((metric, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ 
                      fontWeight: 800,
                      background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}>
                      {metric.number}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {metric.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      <BookingModal open={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

      {showScrollToTop && (
        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            bgcolor: '#1a237e',
            color: 'white',
            '&:hover': { bgcolor: '#0d47a1' }
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default HomePage;