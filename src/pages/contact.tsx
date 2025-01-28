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

import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  TECH_GRADIENT,
  BACKDROP_BLUR,
  BORDER_RADIUS,
} from '../theme/branding';


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
      maxWidth="lg"
      sx={{
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${SECONDARY_DARK} 100%)`,
        backdropFilter: BACKDROP_BLUR,
      }}
    >
      <Grid container spacing={6} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              mb: 6,
              padding: 3,
              background: alpha(LIGHT_ACCENT, 0.05),
              borderRadius: BORDER_RADIUS,
              border: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
            }}>
              {planIcons[router.query.plan as string] || <Code sx={{ fontSize: 40 }} />}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: isMobile ? '2rem' : '3rem',
                  lineHeight: 1.1,
                  color: LIGHT_ACCENT,
                  fontFamily: "'Barlow', sans-serif",
                  letterSpacing: '-0.5px',
                }}
              >
                {planTitles[router.query.plan as string] || "Architecting Digital Excellence"}
              </Typography>
            </Box>
            
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                color: alpha(LIGHT_ACCENT, 0.8),
                lineHeight: 1.8,
                padding: 3,
                backdropFilter: 'blur(8px)',
                background: alpha(LIGHT_ACCENT, 0.03),
                borderRadius: BORDER_RADIUS,
                border: `1px solid ${alpha(LIGHT_ACCENT, 0.1)}`,
              }}
            >
              {router.query.plan
                ? `Let's co-create your vision with surgical precision. Share your objectives and we'll orchestrate transformative results.`
                : "Initiate your bespoke digital evolution. Our elite engineering team awaits your directive."}
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
                background: alpha(PRIMARY_DARK, 0.7),
                borderRadius: BORDER_RADIUS,
                padding: '2.5rem',
                backdropFilter: BACKDROP_BLUR,
                border: `1px solid ${alpha(LIGHT_ACCENT, 0.15)}`,
                boxShadow: '0 32px 64px rgba(0,0,0,0.35)',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Grid container spacing={3}>
                {error && (
                  <Grid item xs={12}>
                    <Alert
                      severity="error"
                      sx={{
                        background: alpha(theme.palette.error.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                        backdropFilter: 'blur(4px)',
                        color: LIGHT_ACCENT,
                      }}
                    >
                      {error}
                    </Alert>
                  </Grid>
                )}
                {success && (
                  <Grid item xs={12}>
                    <Alert
                      severity="success"
                      sx={{
                        background: alpha(theme.palette.success.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                        backdropFilter: 'blur(4px)',
                        color: LIGHT_ACCENT,
                      }}
                    >
                      Message sent successfully!
                    </Alert>
                  </Grid>
                )}

                {[
                  { field: 'name', icon: <AccountCircle /> },
                  { field: 'email', icon: <Email /> },
                  { field: 'phone', icon: <Phone /> },
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
                          <InputAdornment position="start" sx={{ color: LIGHT_ACCENT }}>
                            {icon}
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: BORDER_RADIUS,
                          color: LIGHT_ACCENT,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha(LIGHT_ACCENT, 0.2),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: LIGHT_ACCENT,
                          },
                          '& .MuiInputLabel-root': {
                            color: alpha(LIGHT_ACCENT, 0.6),
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
                    rows={5}
                    variant="outlined"
                    label="Strategic Vision"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: LIGHT_ACCENT, mt: 1.5 }}>
                          <Description />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: BORDER_RADIUS,
                        color: LIGHT_ACCENT,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(LIGHT_ACCENT, 0.2),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: LIGHT_ACCENT,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    endIcon={!loading && <Send />}
                    sx={{
                      py: 2,
                      borderRadius: BORDER_RADIUS,
                      background: TECH_GRADIENT,
                      fontWeight: 700,
                      letterSpacing: '1px',
                      color: LIGHT_ACCENT,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 32px ${alpha('#4361EE', 0.4)}`,
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Initiate Collaboration'}
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