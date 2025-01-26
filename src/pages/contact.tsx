import { useState } from 'react';
import { 
  useTheme, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Typography, 
  useMediaQuery, 
  alpha, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const planTitles: Record<string, string> = {
  hourly: '🌟 Priority Hourly Consult',
  project: '🚀 Tailored Project Partnership',
  retainer: '💎 Executive Retainer Program',
  consultation: '🔮 Strategic Vision Session'
};

const Contact: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Enhanced scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('message', formData.message);
      form.append('plan', planTitles[router.query.plan as string] || 'General Inquiry');

      const response = await fetch('https://your-worker.your-domain.com', {
        method: 'POST',
        body: form
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.errors?.join(', ') || 'Submission failed');
      }

      setSuccess(true);
      setTimeout(() => router.push('/thank-you'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
      {/* Animated gradient background */}
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
      
      {/* Frosted glass overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg,
            ${alpha(theme.palette.common.white, 0.03)} 0px,
            ${alpha(theme.palette.common.white, 0.03)} 1px,
            transparent 1px,
            transparent 10px)`,
          backdropFilter: 'blur(40px)',
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
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: getGradient(),
                borderRadius: '2px',
                animation: 'scaleInOut 2s infinite'
              }
            }}>
              {planTitles[router.query.plan as string] || "Let's Create Something Amazing"}
            </Typography>
            
            <motion.div transition={{ delay: 0.4 }}>
              <Typography variant="body1" sx={{ 
                mb: 4, 
                fontSize: '1.1rem',
                color: 'text.secondary',
                lineHeight: 1.7
              }}>
                {router.query.plan ? 
                  `Ready to elevate your project? Share a few details and we'll craft a solution that's uniquely yours.` : 
                  "Whether you're exploring possibilities or ready to launch, let's start a conversation that matters."}
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
          >
            <motion.div
              whileHover={{ scale: 1.005 }}
              style={{ 
                background: alpha(theme.palette.background.paper, 0.8), 
                borderRadius: '24px', 
                padding: '2rem', 
                backdropFilter: 'blur(20px)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.1)'
              }}
            >
              <Grid container spacing={3}>
                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  </Grid>
                )}

                {success && (
                  <Grid item xs={12}>
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Message sent successfully!
                    </Alert>
                  </Grid>
                )}

                {[
                  { field: 'name', label: 'Your Name' },
                  { field: 'email', label: 'Best Email' },
                  { field: 'phone', label: 'Direct Line' }
                ].map(({ field, label }) => (
                  <Grid item xs={12} key={field}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        label={label}
                        name={field}
                        placeholder={`Enter your ${field}`}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        disabled={loading}
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
                      label="Share Your Vision"
                      name="message"
                      placeholder="Tell us about your goals, challenges, and dreams..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
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
                      disabled={loading}
                      sx={{
                        px: 6,
                        py: 2,
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        background: getGradient(),
                        color: 'common.white',
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
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                      ) : (
                        'Start Our Journey →'
                      )}
                    </Button>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </motion.form>
        </Grid>
      </Grid>

      {/* Subtle animated particles */}
      {[...Array(20)].map((_, i) => (
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
            height: Math.random() * 15 + 5,
            opacity: 0.15
          }}
          initial={{
            x: `${Math.random() * 100 - 50}%`,
            y: `${Math.random() * 100 - 50}%`
          }}
          animate={{
            x: ['0%', `${Math.random() * 20 - 10}%`],
            y: ['0%', `${Math.random() * 20 - 10}%`]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
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