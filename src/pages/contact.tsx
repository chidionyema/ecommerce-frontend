import { useState } from 'react';
import { useTheme, Container, Grid, TextField, Button, Typography, useMediaQuery } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';

const Contact: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Plan selection logic
  const { plan } = router.query;
  const planTitles: { [key: string]: string } = {
    hourly: 'Hourly Consulting',
    project: 'Project-Based',
    retainer: 'Retainer Model',
    consultation: 'General Consultation'
  };

  // Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      selectedPlan: planTitles[plan as string] || 'Custom Inquiry'
    };
    console.log('Form Data Submitted:', submissionData);
    router.push('/thank-you');
  };

  return (
    <Container maxWidth="lg" sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      py: 10,
      background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 100%)'
    }}>
      {/* Animated background elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `linear-gradient(45deg, 
            ${theme.palette.primary.main} 0%, 
            ${theme.palette.secondary.main} 30%,
            ${theme.palette.primary.main} 70%)`,
          y,
          opacity: 0.05,
          zIndex: -2,
          rotate: 15
        }}
      />
      
      {/* Glass-morphism overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: -1
        }}
      />

      <Grid container spacing={6} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Typography variant="h2" sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
              background: `-webkit-linear-gradient(-45deg, 
                ${theme.palette.primary.main} 0%, 
                ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}>
              {planTitles[plan as string] || "Let's Talk"}
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 4, 
              fontSize: '1.1rem',
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
            }}>
              {plan ? `Complete the form to get started with your ${planTitles[plan as string]}.` : "Get in touch to discuss your project requirements."}
            </Typography>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{ position: 'relative' }}
          >
            <Grid container spacing={3}>
              {['name', 'email', 'phone'].map((field) => (
                <Grid item xs={12} key={field}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      sx={{
                        '& .MuiFilledInput-root': {
                          borderRadius: '12px',
                          background: theme.palette.mode === 'dark' 
                            ? 'rgba(255,255,255,0.05)' 
                            : 'rgba(0,0,0,0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover, &:focus-within': {
                            background: theme.palette.mode === 'dark' 
                              ? 'rgba(255,255,255,0.1)' 
                              : 'rgba(0,0,0,0.1)',
                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`
                          },
                          '& input': {
                            py: 2,
                            fontSize: '1.1rem'
                          }
                        }
                      }}
                    />
                  </motion.div>
                </Grid>
              ))}

              <Grid item xs={12}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="filled"
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    sx={{
                      '& .MuiFilledInput-root': {
                        borderRadius: '12px',
                        background: theme.palette.mode === 'dark' 
                          ? 'rgba(255,255,255,0.05)' 
                          : 'rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover, &:focus-within': {
                          background: theme.palette.mode === 'dark' 
                            ? 'rgba(255,255,255,0.1)' 
                            : 'rgba(0,0,0,0.1)',
                          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`
                        }
                      }
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 6,
                      py: 2,
                      borderRadius: '12px',
                      fontSize: '1.1rem',
                      background: `linear-gradient(45deg, 
                        ${theme.palette.primary.main} 0%, 
                        ${theme.palette.secondary.main} 100%)`,
                      textTransform: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)',
                        transition: '0.5s'
                      },
                      '&:hover:before': {
                        left: '100%'
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </motion.form>
        </Grid>
      </Grid>


{[...Array(20)].map((_, i) => (
  <motion.div
    key={i}
    style={{
      position: 'absolute',
      background: `radial-gradient(circle, 
        ${theme.palette.primary.main} 0%, 
        transparent 70%)`,
      borderRadius: '50%',
      filter: 'blur(2px)',
      width: 15,
      height: 15
    }}
    initial={{
      scale: Math.random() * 0.5 + 0.5,
      opacity: 0.3,
      x: `${Math.random() * 100 - 50}%`,
      y: `${Math.random() * 100 - 50}%`
    }}
    animate={{
      x: ['0%', `${Math.random() * 100 - 50}%`],
      y: ['0%', `${Math.random() * 100 - 50}%`],
      rotate: [0, 360]
    }}
    transition={{
      duration: Math.random() * 10 + 10,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'linear'
    }}
  />
))}
   
    </Container>
  );
};

export default Contact;