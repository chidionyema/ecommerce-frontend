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
  Alert,
  InputAdornment,
  Box,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';
import { Code, Send, AccountCircle, Email, Phone, Description, FlashOn, WorkspacePremium, CorporateFare } from '@mui/icons-material';

const planTitles: Record<string, string> = {
  hourly: 'Priority Hourly Consult',
  project: 'Tailored Project Partnership',
  retainer: 'Executive Retainer Program',
  consultation: 'Strategic Vision Session',
};

const planIcons: Record<string, JSX.Element> = {
  hourly: <FlashOn fontSize="large" />,
  project: <WorkspacePremium fontSize="large" />,
  retainer: <CorporateFare fontSize="large" />,
  consultation: <Code fontSize="large" />,
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

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

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Submission logic remains same
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg" // Changed from md to lg for wider container
      sx={{
        py: { xs: 8, md: 12 }, // Increased padding
        position: 'relative',
        overflow: 'hidden',
        background: '#f8fafc',
      }}
    >
      <Grid 
        container 
        spacing={{ xs: 4, md: 8 }} // Increased spacing
        component={motion.div} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4, // Increased gap
              mb: { xs: 6, md: 8 }, // Increased margin
              padding: { xs: 3, md: 4 }, // Increased padding
              background: 'white',
              borderRadius: theme.shape.borderRadius,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              {planIcons[router.query.plan as string] || <Code sx={{ fontSize: 48, color: theme.palette.primary.dark }} />} {/* Larger icon */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '3rem' }, // Larger font size
                  lineHeight: 1.1,
                  color: '#1e293b',
                  fontFamily: "'Barlow', sans-serif",
                  letterSpacing: '-1px', // Increased letter spacing
                }}
              >
                {planTitles[router.query.plan as string] || "Architecting Digital Excellence"}
              </Typography>
            </Box>
            
            <Typography
              variant="body1"
              sx={{
                mb: 6, // Increased margin
                fontSize: { xs: '1.1rem', md: '1.25rem' }, // Larger font size
                color: '#475569',
                lineHeight: 1.8,
                padding: { xs: 3, md: 4 }, // Increased padding
                background: 'white',
                borderRadius: theme.shape.borderRadius,
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              {router.query.plan
                ? `Let's co-create your vision with surgical precision. Share your objectives and we'll orchestrate transformative results.`
                : "Partner with our expert engineering team to bring your unique digital vision to life. Let’s create tailored solutions that empower your success."}
            </Typography>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <motion.div
              style={{
                background: 'white',
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(4), // Increased padding
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
              }}
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Grid container spacing={3}> {/* Increased spacing */}
                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error" sx={{ mb: 3, fontSize: '1rem' }}> {/* Larger alert */}
                      {error}
                    </Alert>
                  </Grid>
                )}

                {success && (
                  <Grid item xs={12}>
                    <Alert severity="success" sx={{ mb: 3, fontSize: '1rem' }}> {/* Larger alert */}
                      Message sent successfully!
                    </Alert>
                  </Grid>
                )}

                {[
                  { field: 'name', icon: <AccountCircle fontSize="medium" /> }, // Larger icon
                  { field: 'email', icon: <Email fontSize="medium" /> },
                  { field: 'phone', icon: <Phone fontSize="medium" /> },
                ].map(({ field, icon }) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ color: theme.palette.primary.dark }}>
                            {icon}
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: theme.shape.borderRadius,
                          color: '#1e293b',
                          '& .MuiOutlinedInput-input': {
                            fontSize: '1.1rem', // Larger input text
                            padding: '16px 20px' // Increased padding
                          },
                          '& .MuiInputLabel-root': {
                            fontSize: '1.1rem', // Larger label
                            transform: 'translate(14px, 18px) scale(1)', // Adjusted label position
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#cbd5e1',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.dark,
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        },
                      }}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={isMobile ? 4 : 6} // More rows
                    variant="outlined"
                    label="Strategic Vision"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment 
                          position="start" 
                          sx={{ 
                            color: theme.palette.primary.dark,
                            alignItems: 'flex-start',
                            mt: isMobile ? 1 : 2
                          }}
                        >
                          <Description fontSize="medium" /> {/* Larger icon */}
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: theme.shape.borderRadius,
                        color: '#1e293b',
                        '& .MuiOutlinedInput-input': {
                          fontSize: '1.1rem', // Larger text
                          padding: '16px 20px' // Increased padding
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '1.1rem', // Larger label
                          transform: 'translate(14px, 18px) scale(1)',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#cbd5e1',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.dark,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    endIcon={!loading && <Send fontSize="medium" />} // Larger icon
                    sx={{
                      py: { xs: 2, md: 2.5 }, // Taller button
                      borderRadius: theme.shape.borderRadius,
                      background: theme.palette.primary.main,
                      fontWeight: 700,
                      letterSpacing: '1px',
                      fontSize: { xs: '1.1rem', md: '1.2rem' }, // Larger text
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.dark, 0.3)}`,
                        background: theme.palette.primary.dark,
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {loading ? <CircularProgress size={28} sx={{ color: 'white' }} /> : 'Initiate Collaboration'}
                  </Button>
                </Grid>
              </Grid>
            </motion.div>
          </motion.form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;