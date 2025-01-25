import { useState } from 'react';
import { useTheme, Container, Grid, TextField, Button, Typography, useMediaQuery, alpha } from '@mui/material';
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

  // Enhanced scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Premium plan titles
  const { plan } = router.query;
  const planTitles: { [key: string]: string } = {
    hourly: 'Elite Hourly Consultation',
    project: 'Tailored Project Engagement',
    retainer: 'Executive Retainer Partnership',
    consultation: 'Strategic Innovation Session'
  };

  // Form handling with premium UX
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      selectedPlan: planTitles[plan as string] || 'Enterprise Consultation'
    };
    console.log('Form Data Submitted:', submissionData);
    router.push('/thank-you');
  };

  // Premium gradient generator
  const getGradient = (angle: number = 45) => 
    `linear-gradient(${angle}deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;

  return (
    <Container maxWidth="lg" sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      py: 10,
      background: `radial-gradient(circle at center, 
        ${alpha(theme.palette.background.paper, 0.1)} 0%, 
        ${alpha(theme.palette.background.default, 0.8)} 100%)`
    }}>
      {/* Luxury background elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: getGradient(25),
          y,
          opacity: 0.08,
          zIndex: -2,
          rotate: 15,
          scale: 1.2
        }}
        animate={{ rotate: [15, 25, 15] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Diamond-pattern overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg,
            ${alpha(theme.palette.common.white, 0.03)} 0px,
            ${alpha(theme.palette.common.white, 0.03)} 1px,
            transparent 1px,
            transparent 10px)`,
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
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
              fontWeight: 900,
              mb: 3,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
              background: getGradient(-45),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              textShadow: '0 4px 20px rgba(0,0,0,0.15)',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: getGradient(),
                borderRadius: '2px',
                transformOrigin: 'left center',
                animation: 'scaleInOut 2s infinite'
              }
            }}>
              {planTitles[plan as string] || "Executive Consultation"}
            </Typography>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="body1" sx={{ 
                mb: 4, 
                fontSize: '1.1rem',
                color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                fontStyle: 'italic'
              }}>
                {plan ? `Complete your bespoke consultation request for ${planTitles[plan as string]}` : "Begin your transformation journey with a confidential discussion"}
              </Typography>
            </motion.div>
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
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.005 }}
              style={{ background: alpha(theme.palette.background.paper, 0.8), borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(20px)' }}
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
                            background: alpha(theme.palette.background.paper, 0.1),
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover, &:focus-within': {
                              background: alpha(theme.palette.primary.main, 0.08),
                              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                            },
                            '& input': {
                              py: 2,
                              fontSize: '1.1rem',
                              fontWeight: 500
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
                      label="Strategic Vision"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      sx={{
                        '& .MuiFilledInput-root': {
                          borderRadius: '12px',
                          background: alpha(theme.palette.background.paper, 0.1),
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover, &:focus-within': {
                            background: alpha(theme.palette.primary.main, 0.08),
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
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
                        background: getGradient(),
                        color: theme.palette.common.white,
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
                        },
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          border: '2px solid transparent',
                          borderRadius: '12px',
                          animation: 'borderPulse 2s infinite'
                        }
                      }}
                    >
                      Initiate Partnership
                    </Button>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </motion.form>
        </Grid>
      </Grid>

      {/* Luxury particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            background: `radial-gradient(circle, 
              ${i % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main} 0%, 
              transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(2px)',
            width: Math.random() * 15 + 5,
            height: Math.random() * 15 + 5
          }}
          initial={{
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0.2,
            x: `${Math.random() * 100 - 50}%`,
            y: `${Math.random() * 100 - 50}%`
          }}
          animate={{
            x: ['0%', `${Math.random() * 100 - 50}%`],
            y: ['0%', `${Math.random() * 100 - 50}%`],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
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