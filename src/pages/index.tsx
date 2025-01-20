import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Paper, useTheme, useMediaQuery, Link, IconButton, Modal, styled } from '@mui/material';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion, useAnimation } from 'framer-motion';
import NextLink from 'next/link';
import { FaPython, FaReact, FaNodeJs, FaAws, FaDocker, FaJava, FaMicrosoft, FaBrain, FaLinux } from 'react-icons/fa';
import { SiRust, SiGoland } from 'react-icons/si';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Head from 'next/head';

// Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1.1rem',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  background: '#4A47A3',
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  fontWeight: 700,
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    backgroundColor: '#393685',
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
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minHeight: '50vh',
  padding: theme.spacing(6, 2),
  background: `linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)`,
  color: theme.palette.common.white,
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    minHeight: '40vh',
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fc',
  padding: theme.spacing(10, 2),
  borderRadius: '15px',
  marginBottom: theme.spacing(6),
  background: `linear-gradient(to bottom, #f8f9fc, #f0f2f5)`,
}));

const techIcons = [
  {
    title: 'Python',
    description:
      'Build scalable and efficient applications with Python, leveraging its versatility for web development, data analysis, and automation.',
    icon: <FaPython size={60} />,
  },
  {
    title: 'React Native',
    description:
      'Develop cross-platform mobile applications with React Native, ensuring a seamless user experience on both iOS and Android.',
    icon: <FaReact size={60} />,
  },
  {
    title: 'Node.js',
    description:
      'Build fast and scalable server-side applications with Node.js, leveraging its event-driven architecture for high performance.',
    icon: <FaNodeJs size={60} />,
  },
  {
    title: 'DevOps',
    description:
      'Streamline your development lifecycle with automated CI/CD pipelines, reducing time to market and improving software quality.',
    icon: <FaDocker size={60} />,
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'Scale your applications seamlessly with robust and reliable cloud solutions, ensuring high availability and performance.',
    icon: <FaAws size={60} />,
  },
  {
    title: 'Java',
    description:
      'Develop robust and scalable backend solutions with our deep Java expertise, creating high-performance and maintainable applications.',
    icon: <FaJava size={60} />,
  },
  {
    title: '.NET',
    description:
      'Build enterprise-grade .NET applications tailored to your specific business needs, leveraging the power of the Microsoft ecosystem.',
    icon: <FaMicrosoft size={60} />,
  },
  {
    title: 'AI & ML',
    description:
      'Harness the power of AI and ML to drive innovation and gain a competitive edge with intelligent solutions.',
    icon: <FaBrain size={60} />,
  },
  {
    title: 'Linux',
    description:
      'Leverage efficient and scalable Linux server management for optimal performance, security, and cost-effectiveness.',
    icon: <FaLinux size={60} />,
  },
  {
    title: 'Rust',
    description:
      'Build high-performance, memory-safe, and concurrent applications with Rust, a modern systems programming language.',
    icon: <SiRust size={60} />,
  },
  {
    title: 'Go (Golang)',
    description:
      'Develop fast, efficient, and scalable backend services with Go, leveraging its simplicity and concurrency model.',
    icon: <SiGoland size={60} />,
  },
  {
    title: 'React',
    description:
      'Create dynamic and responsive user interfaces with React, a powerful JavaScript library for building modern web applications.',
    icon: <FaReact size={60} />,
  },
];

// Function for smooth scrolling
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Booking Modal Component
interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
  general: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    message: '',
    general: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: FormErrors = {
      name: '',
      email: '',
      phone: '',
      message: '',
      general: '',
    };

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
    } else if (!/^\d{8}$/.test(formData.phone)) {
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
        console.log('Form submitted:', formData);
        onClose();
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Submission failed. Please try again.',
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="booking-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '800px',
          backgroundColor: 'background.paper',
          boxShadow: 24,
          borderRadius: '12px',
          p: 6,
          outline: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            id="booking-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 4, fontWeight: 700, color: '#4A47A3', textAlign: 'center' }}
          >
            Book a Consultation
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="Your Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                aria-required="true"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="Your Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                aria-required="true"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="Your Phone Number"
                variant="outlined"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                aria-required="true"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label="Your Message"
                variant="outlined"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                error={!!errors.message}
                helperText={errors.message}
                multiline
                rows={6}
                aria-required="true"
                fullWidth
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
                  backgroundColor: '#4A47A3',
                  color: 'white',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  '&:hover': {
                    backgroundColor: '#393685',
                  },
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Box>
          </form>
        </motion.div>
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

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        if (isElementInViewport(card)) {
          controls.start('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return (
    <Box component="main">
      <Head>
        <title>Tech Mastery - Expert-Led Solutions</title>
        <meta name="description" content="Empowering tech professionals with expert-led solutions for seamless integrations, streamlined configurations, and efficient setups." />
        <meta name="keywords" content="tech, programming, consultation, development, AI, cloud, DevOps" />
        <meta name="author" content="Your Company" />
      </Head>

      {/* Hero Section */}
      <HeroSection component="section">
        <Container maxWidth="md">
          <Box sx={{ py: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                  mb: 4,
                  textShadow: '0 6px 15px rgba(0, 0, 0, 0.5)',
                  lineHeight: 1.2,
                }}
              >
                Speed Up Your Journey to Tech Mastery
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
            >
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' },
                  color: '#eee',
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 6,
                  lineHeight: 1.6,
                }}
              >
                Empowering tech professionals with expert-led solutions for seamless integrations, streamlined configurations, and efficient setups.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, type: 'spring', stiffness: 100 }}
            >
              <StyledButton endIcon={<ArrowRightAlt />} onClick={handleOpenBookingModal} aria-label="Book a Consultation">
                Book a Consultation
              </StyledButton>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <NextLink href="/consultation" passHref legacyBehavior>
                  <Link sx={{ color: '#fff', textDecoration: 'underline' }} aria-label="Learn more about our consultation process">
                    Learn more about our consultation process
                  </Link>
                </NextLink>
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </HeroSection>

      {/* Booking Modal */}
      <BookingModal open={isBookingModalOpen} onClose={handleCloseBookingModal} />

      {/* Technologies Section */}
      <SectionContainer component="section">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            component="h2"
            sx={{
              mb: 8,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#333',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Technologies We Support
          </Typography>
          <Grid container spacing={isMobile ? 4 : 6} justifyContent="center">
            {techIcons.map((tech, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div
                  className="feature-card"
                  initial="hidden"
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.2 } },
                  }}
                  whileHover={{ scale: 1.08, y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 10 }}
                >
                  <FeatureCard component="article">
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {tech.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 2, color: '#212121' }}>
                      {tech.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#555', fontSize: '1rem' }}>
                      {tech.description}
                    </Typography>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#4A47A3',
            color: '#fff',
            borderRadius: '50%',
            padding: '12px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#393685',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            },
          }}
          aria-label="Scroll to top"
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default HomePage;