"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  Box, Typography, Container, Grid, Tabs, Tab, Chip, useMediaQuery, useTheme, alpha, 
  Stack, Paper, Button, IconButton, Tooltip
} from '@mui/material';
import {
  ArrowForwardRounded, CheckCircleRounded, InfoOutlined, KeyboardArrowRightRounded
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ConsistentPageLayout from '../../components/Shared/ConsistentPageLayout';
import { pricingPageContent, plans } from '../../data/pricingPageData';
import { theme as brandKit } from '../../theme/brandKit';

// Feature check component
const FeatureCheck = ({ color = 'primary' }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      width: 22, height: 22, borderRadius: '50%', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      bgcolor: alpha(color === 'primary' ? theme.palette.primary.main : theme.palette.success.main, 0.1)
    }}>
      <CheckCircleRounded sx={{
        fontSize: 16,
        color: color === 'primary' ? theme.palette.primary.main : theme.palette.success.main
      }} />
    </Box>
  );
};

// Pricing card component
const PlanCard = ({ plan, isRecommended, billingCycle, onClick, onViewFeatures, isHovered, onHover }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ height: '100%' }}
      onMouseEnter={() => onHover(plan.type)}
      onMouseLeave={() => onHover(null)}
    >
      {isRecommended && (
        <Box sx={{
          position: 'absolute', top: 12, right: -30, transform: 'rotate(45deg)',
          bgcolor: theme.palette.primary.main, color: '#fff', px: 4, py: 0.5,
          fontSize: '0.75rem', fontWeight: 600, zIndex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          letterSpacing: '0.5px'
        }}>RECOMMENDED</Box>
      )}

      <Paper elevation={0} sx={{
        bgcolor: 'background.paper',
        border: `1px solid ${isRecommended ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3, p: 3, height: '100%', display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative',
        boxShadow: isRecommended ? '0 8px 24px rgba(51, 102, 255, 0.12)' : '0 2px 12px rgba(0, 0, 0, 0.06)',
        ...(isHovered && {
          transform: 'translateY(-8px)',
          boxShadow: isRecommended ? '0 16px 40px rgba(51, 102, 255, 0.18)' : '0 12px 28px rgba(0, 0, 0, 0.1)'
        }),
        minHeight: 430 // Added fixed min-height to ensure all cards are the same size
      }}>
        <Typography variant="h5" sx={{
          fontWeight: 700, mb: 1,
          color: isRecommended ? theme.palette.primary.main : theme.palette.text.primary
        }}>{plan.title}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 48, opacity: 0.8 }}>
          {plan.tagline}
        </Typography>

        <Stack spacing={2} sx={{ mb: 3 }}>
          {['Ideal for small teams', 'Quick setup', 'Basic support']
            .map((val, i) => plan.values?.[i] || val)
            .map((feature, i) => (
              <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                <FeatureCheck color={isRecommended ? 'primary' : 'success'} />
                <Typography variant="body2" sx={{
                  color: isRecommended ? theme.palette.text.primary : theme.palette.text.secondary,
                  fontWeight: 500
                }}>{feature}</Typography>
              </Stack>
            ))}
        </Stack>

        <Box sx={{ borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{
            fontWeight: 800,
            color: isRecommended ? theme.palette.primary.main : theme.palette.text.primary,
            display: 'inline-flex', alignItems: 'baseline', gap: 0.5
          }}>
            {billingCycle === 'annual' && plan.annualPrice ? plan.annualPrice : plan.price}
            {billingCycle === 'annual' && plan.annualPrice && (
              <Typography component="span" variant="caption" sx={{
                fontWeight: 600, fontSize: '0.75rem', verticalAlign: 'super',
                bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main,
                px: 0.75, py: 0.25, borderRadius: 1
              }}>SAVE 10%</Typography>
            )}
          </Typography>
        </Box>

        <Button
          variant={isRecommended ? 'contained' : 'outlined'}
          fullWidth
          onClick={() => onClick(plan.type)}
          sx={{
            textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.5, mt: 'auto',
            ...(isRecommended && {
              background: brandKit.gradient.primary(theme),
              boxShadow: '0 4px 14px rgba(51, 102, 255, 0.4)',
              '&:hover': { boxShadow: '0 6px 20px rgba(51, 102, 255, 0.6)' }
            }),
            ...(!isRecommended && {
              borderColor: alpha(theme.palette.primary.main, 0.5),
              '&:hover': { borderColor: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.04) }
            })
          }}
          endIcon={<ArrowForwardRounded />}
        >{isRecommended ? 'Get started' : 'Choose plan'}</Button>

        <Button
          variant="text" size="small" color="inherit" onClick={onViewFeatures}
          sx={{
            fontSize: '0.75rem', fontWeight: 500, textTransform: 'none', mt: 2,
            color: theme.palette.text.secondary, justifyContent: 'center',
            '&:hover': { bgcolor: 'transparent', color: theme.palette.primary.main }
          }}
          endIcon={<KeyboardArrowRightRounded fontSize="small" />}
        >View all features</Button>
      </Paper>
    </motion.div>
  );
};

// Feature comparison row cell
const FeatureCell = ({ value, plan, theme }) => {
  if (value === true) {
    return (
      <Box sx={{
        width: 24, height: 24, borderRadius: '50%', bgcolor: alpha(theme.palette.success.main, 0.1),
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <CheckCircleRounded sx={{ fontSize: 16, color: theme.palette.success.main }} />
      </Box>
    );
  }
  if (value === false) {
    return <Box component="span" sx={{ width: 16, height: 2, bgcolor: alpha(theme.palette.text.disabled, 0.3), display: 'inline-block' }} />;
  }
  return (
    <Typography variant="body2" sx={{
      fontWeight: 500,
      color: plan.recommended ? theme.palette.primary.main : theme.palette.text.primary
    }}>{value}</Typography>
  );
};

// Main component
export default function PricingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState('annual');
  const [activeTab, setActiveTab] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [hoverCard, setHoverCard] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => { setAnimateIn(true); }, []);

  const handlePlanClick = (planType) => router.push(`/contact?plan=${planType}`);

  const categories = [
    { name: 'Core Features', id: 'core' },
    { name: 'Support', id: 'support' },
    { name: 'Security', id: 'security' },
    { name: 'Advanced', id: 'advanced' }
  ];

  const allFeatures = {
    core: [
      { name: 'Number of users', values: { consultation: '1 user', project: 'Up to 10 users', enterprise: 'Unlimited' } },
      { name: 'Storage space', values: { consultation: '10 GB', project: '100 GB', enterprise: '1 TB' } },
      { name: 'Projects', values: { consultation: '3', project: 'Unlimited', enterprise: 'Unlimited' } },
      { name: 'API access', values: { consultation: false, project: true, enterprise: true } }
    ],
    support: [
      { name: 'Email support', values: { consultation: true, project: true, enterprise: true } },
      { name: 'Phone support', values: { consultation: false, project: true, enterprise: true } },
      { name: 'Dedicated account manager', values: { consultation: false, project: false, enterprise: true } },
      { name: 'Response time', values: { consultation: '24 hours', project: '12 hours', enterprise: '4 hours' } }
    ],
    security: [
      { name: 'Two-factor authentication', values: { consultation: true, project: true, enterprise: true } },
      { name: 'Advanced SSO', values: { consultation: false, project: true, enterprise: true } },
      { name: 'Audit logs', values: { consultation: false, project: true, enterprise: true } },
      { name: 'Custom security controls', values: { consultation: false, project: false, enterprise: true } }
    ],
    advanced: [
      { name: 'Custom integrations', values: { consultation: false, project: false, enterprise: true } },
      { name: 'Workflow automation', values: { consultation: false, project: true, enterprise: true } },
      { name: 'Analytics dashboard', values: { consultation: 'Basic', project: 'Advanced', enterprise: 'Enterprise' } },
      { name: 'White labeling', values: { consultation: false, project: false, enterprise: true } }
    ]
  };

  return (
    <div>
      <ConsistentPageLayout scrollOptions={{ showSectionMenu: false, showProgressIndicator: false }}>
        {/* Hero Section */}
        <Container maxWidth="md" sx={{ mt: 6, mb: { xs: 6, md: 8 } }}>
          <Box textAlign="center">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: animateIn ? 1 : 0, y: animateIn ? 0 : 15 }} transition={{ duration: 0.4 }}>
              <Typography variant="h1" sx={{
                fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 800, mb: 2,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.01em'
              }}>Simple, transparent pricing for every business</Typography>

              <Typography variant="body1" sx={{
                color: theme.palette.text.secondary, mb: 5, maxWidth: 540, mx: 'auto',
                fontSize: '1.125rem', lineHeight: 1.6
              }}>Choose the perfect plan that works for you with no hidden fees or complicated tiers.</Typography>
            </motion.div>

            {/* Billing toggle and comparison mode */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 1 }} justifyContent="center" alignItems="center" sx={{ mb: 6 }}>
              <Box sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderRadius: 6, p: 0.5, display: 'inline-flex'
              }}>
                <Button
                  onClick={() => setBillingCycle('monthly')}
                  variant={billingCycle === 'monthly' ? 'contained' : 'text'}
                  disableElevation
                  sx={{
                    minWidth: 100, borderRadius: 4, textTransform: 'none', fontWeight: 600,
                    fontSize: '0.875rem', py: 1, color: billingCycle === 'monthly' ? '#fff' : theme.palette.text.primary
                  }}
                >Monthly</Button>
                <Button
                  onClick={() => setBillingCycle('annual')}
                  variant={billingCycle === 'annual' ? 'contained' : 'text'}
                  disableElevation
                  endIcon={billingCycle === 'annual' && (
                    <Chip label="Save 10%" size="small" sx={{
                      height: 20, fontSize: '0.625rem', fontWeight: 600,
                      bgcolor: '#fff', color: theme.palette.primary.main
                    }} />
                  )}
                  sx={{
                    minWidth: 100, borderRadius: 4, textTransform: 'none', fontWeight: 600,
                    fontSize: '0.875rem', py: 1, color: billingCycle === 'annual' ? '#fff' : theme.palette.text.primary
                  }}
                >Annual</Button>
              </Box>

              <Button
                variant="text" color="inherit" size="small" onClick={() => setCompareMode(!compareMode)}
                sx={{
                  textTransform: 'none', fontWeight: 500, fontSize: '0.875rem',
                  color: theme.palette.text.secondary,
                  '&:hover': { bgcolor: 'transparent', color: theme.palette.primary.main }
                }}
                startIcon={
                  <Box component="span" sx={{
                    width: 16, height: 16, borderRadius: '50%', border: '1px solid',
                    borderColor: compareMode ? theme.palette.primary.main : theme.palette.text.disabled,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                    '&::after': compareMode ? {
                      content: '""', position: 'absolute', width: 10, height: 10,
                      borderRadius: '50%', bgcolor: theme.palette.primary.main
                    } : {}
                  }} />
                }
              >{compareMode ? 'Hide comparison' : 'Compare all features'}</Button>
            </Stack>
          </Box>
        </Container>

        {/* Pricing Cards */}
        {!compareMode && (
          <Container maxWidth="lg" sx={{ mb: 8 }}>
            {/* Tab interface */}
            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={{ '.MuiTabs-indicator': { height: 3, borderRadius: 1.5, bgcolor: theme.palette.primary.main } }}
              >
                {['For Startups', 'For Teams', 'For Enterprise'].map((label, index) => (
                  <Tab key={index} label={label} sx={{ textTransform: 'none', fontWeight: 600, minWidth: 120, fontSize: '0.95rem' }} />
                ))}
              </Tabs>
            </Box>

            {/* Plan cards */}
            <Grid container spacing={4} justifyContent="center" sx={{ transition: 'all 0.3s ease' }}>
              {plans.map((plan) => {
                const isRecommended =
                  (activeTab === 0 && plan.type === 'consultation') ||
                  (activeTab === 1 && plan.type === 'project') ||
                  (activeTab === 2 && plan.type === 'enterprise') ||
                  plan.recommended;

                return (
                  <Grid item xs={12} sm={6} md={4} key={plan.type} sx={{
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    // Removed scale transform to keep all cards the same size
                    zIndex: isRecommended ? 2 : 1
                  }}>
                    <PlanCard
                      plan={plan}
                      isRecommended={isRecommended}
                      billingCycle={billingCycle}
                      onClick={handlePlanClick}
                      onViewFeatures={() => setCompareMode(true)}
                      isHovered={hoverCard === plan.type}
                      onHover={setHoverCard}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        )}

        {/* Feature comparison table */}
        <AnimatePresence>
          {compareMode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Container maxWidth="lg">
                <Paper elevation={0} sx={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 3, overflow: 'hidden', mb: 8
                }}>
                  <Box sx={{ overflowX: 'auto' }}>
                    <Box sx={{ minWidth: 900, p: 2 }}>
                      <Grid container>
                        {/* Plan headers */}
                        <Grid item xs={4}><Box sx={{ height: 80 }} /></Grid>
                        {plans.map((plan) => (
                          <Grid item xs={plans.length > 3 ? 2 : 8 / Number(plans.length)} key={`header-${plan.type}`}>
                            <Box sx={{
                              height: 80, display: 'flex', flexDirection: 'column',
                              justifyContent: 'center', alignItems: 'center', px: 2,
                              bgcolor: plan.recommended ? alpha(theme.palette.primary.main, 0.05) : 'transparent'
                            }}>
                              <Typography variant="h6" sx={{
                                fontWeight: 700,
                                color: plan.recommended ? theme.palette.primary.main : theme.palette.text.primary
                              }}>{plan.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {billingCycle === 'annual' && plan.annualPrice ? plan.annualPrice : plan.price}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}

                        {/* Features by category */}
                        {categories.map((category) => (
                          <React.Fragment key={category.id}>
                            {/* Category header */}
                            <Grid item xs={4}>
                              <Box sx={{ px: 3, pt: category.id === 'core' ? 0 : 4 }}>
                                <Typography variant="subtitle1" sx={{
                                  fontWeight: 700, fontSize: '0.875rem', color: alpha(theme.palette.text.primary, 0.7),
                                  mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em'
                                }}>{category.name}</Typography>

                                {/* Feature names */}
                                {allFeatures[category.id].map((feature, i) => (
                                  <Box key={i} sx={{ py: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, pr: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                                      {feature.name}
                                      <Tooltip title="More information about this feature">
                                        <IconButton size="small" sx={{ ml: 0.5, opacity: 0.6 }}>
                                          <InfoOutlined fontSize="inherit" />
                                        </IconButton>
                                      </Tooltip>
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            </Grid>

                            {/* Feature values by plan */}
                            {plans.map((plan) => (
                              <Grid item xs={plans.length > 3 ? 2 : 8 / Number(plans.length)} key={`${category.id}-${plan.type}`}>
                                <Box sx={{ bgcolor: plan.recommended ? alpha(theme.palette.primary.main, 0.02) : 'transparent', pt: category.id === 'core' ? 0 : 4 }}>
                                  <Box sx={{ py: 1.5, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, opacity: 0 }} />
                                  {/* Feature values */}
                                  {allFeatures[category.id].map((feature, i) => (
                                    <Box key={i} sx={{ py: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, textAlign: 'center' }}>
                                      <FeatureCell value={feature.values[plan.type]} plan={plan} theme={theme} />
                                    </Box>
                                  ))}
                                </Box>
                              </Grid>
                            ))}
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </Paper>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ section */}
        <Container maxWidth="md" sx={{ mb: 12 }}>
          <Typography variant="h2" align="center" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 700, mb: 2 }}>
            Frequently asked questions
          </Typography>

          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 500, mx: 'auto', fontSize: '1.125rem' }}>
            Everything you need to know about our pricing and plans
          </Typography>

          <Grid container spacing={3}>
            {pricingPageContent.faqSection.items.slice(0, 6).map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={0} sx={{
                  borderRadius: 3, p: 3, height: '100%', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 28px rgba(0, 0, 0, 0.05)'
                  }
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>{faq.question}</Typography>
                  <Typography variant="body2" color="text.secondary">{faq.answer}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA section */}
        <Box sx={{
          position: 'relative', py: { xs: 6, md: 10 }, overflow: 'hidden', mb: 6,
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          borderRadius: { xs: 0, md: 3 }, mx: { xs: 0, md: 6 },
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
        }}>
          <Container maxWidth="md" sx={{
            position: 'relative', zIndex: 1, py: { xs: 2, md: 4 },
            display: 'flex', flexDirection: { xs: 'column', md: 'row' },
            gap: 5, alignItems: 'center', justifyContent: 'space-between'
          }}>
            <Box maxWidth={460}>
              <Typography variant="h2" sx={{
                fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 700,
                color: '#fff', mb: 2, letterSpacing: '-0.01em'
              }}>Ready to transform your business?</Typography>

              <Typography variant="body1" sx={{
                color: 'rgba(255, 255, 255, 0.9)', mb: 3,
                fontSize: '1.125rem', lineHeight: 1.6
              }}>Join thousands of growing businesses that trust our solutions to scale and succeed.</Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={NextLink} href="/contact" size="large" variant="contained" sx={{
                  bgcolor: '#fff', color: theme.palette.primary.main, textTransform: 'none',
                  fontWeight: 600, py: 1.5, px: 4, borderRadius: 2, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: '#fff', transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                  }
                }}>Get started</Button>

                <Button variant="outlined" component={NextLink} href="/contact?demo=true" size="large" sx={{
                  borderColor: 'rgba(255, 255, 255, 0.6)', color: '#fff', textTransform: 'none',
                  fontWeight: 600, py: 1.5, px: 4, borderRadius: 2,
                  '&:hover': {
                    borderColor: '#fff', bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}>Request demo</Button>
              </Stack>
            </Box>

            {/* Stats card */}
            <Box sx={{
              backdropFilter: 'blur(10px)', bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.2)',
              p: 3, maxWidth: 320, width: '100%', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#fff', letterSpacing: '0.01em' }}>
                Trusted by industry leaders
              </Typography>

              <Grid container spacing={2}>
                {[
                  { value: '97%', label: 'Customer satisfaction' },
                  { value: '5K+', label: 'Active customers' },
                  { value: '4.9', label: 'TrustPilot rating' },
                  { value: '24/7', label: 'Customer support' }
                ].map((stat, i) => (
                  <Grid item xs={6} key={i}>
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{
                        fontWeight: 800, color: '#fff', mb: 0.5,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}>{stat.value}</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </ConsistentPageLayout>
    </div>
  );
}