"use client";
import React, { useState, ChangeEvent } from "react";
import { Box, Typography, Container, Grid, Button, Card, CardContent, TextField, Stepper, Step, StepLabel, FormControlLabel, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Chip, alpha, useMediaQuery, useTheme } from "@mui/material";
import { CheckCircle, Close, Code, Stars, ArrowForward, ArrowBack, GitHub, LinkedIn, Language, AttachMoney, HelpOutline } from "@mui/icons-material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import ConsistentPageLayout from "../../../components/Shared/ConsistentPageLayout";

// Consistent color system
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", primaryDark: "#003388", white: "#FFFFFF", black: "#111111",
  premium: "#2C58FF", premiumLight: "#4F73FF", success: "#22AA55", warning: "#FF9800", error: "#F44336",
  gray: {50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#DDDDDD", 500: "#999999", 700: "#444444", 900: "#111111"}
};

// Style shortcuts
const sx = {
  btn: (color = colors.primary) => ({ bgcolor: color, color: colors.white, textTransform: "none", fontWeight: 700, borderRadius: 1.5,
    boxShadow: `0 4px 8px ${alpha(color, 0.3)}`, "&:hover": { bgcolor: color === colors.premium ? colors.premiumLight : colors.primaryLight, 
    boxShadow: `0 6px 12px ${alpha(color, 0.4)}` } }),
  card: { border: `1px solid ${colors.gray[300]}`, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", bgcolor: colors.white }
};

// Application steps
const steps = ['Basic Info', 'Skills & Experience', 'Examples & Portfolio', 'Terms & Submit'];

// Define types for form state
interface PortfolioLinks {
  github: string;
  website: string;
  linkedin: string;
  other: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  skills: string[];
  experience: string;
  primaryExpertise: string;
  portfolioLinks: PortfolioLinks;
  sampleComponents: string[];
  skillLevel: string;
  termsAgreed: boolean;
  guidelinesRead: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const CreatorApplicationPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  
  // Form state
  const [formState, setFormState] = useState<FormState>({
    firstName: "", lastName: "", email: "", bio: "", skills: [], experience: "", primaryExpertise: "",
    portfolioLinks: { github: "", website: "", linkedin: "", other: "" }, sampleComponents: [],
    skillLevel: "", termsAgreed: false, guidelinesRead: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Form handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNestedChange = (parent: keyof FormState, field: keyof PortfolioLinks, value: string) => {
    if (parent === 'portfolioLinks') {
      setFormState((prev) => ({ 
        ...prev, 
        portfolioLinks: { 
          ...prev.portfolioLinks, 
          [field]: value 
        } 
      }));
    }
  };
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: checked }));
  };
  
  // Form validation
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 0) {
      if (!formState.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formState.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formState.email.trim()) newErrors.email = "Email is required";
      if (formState.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formState.email)) {
        newErrors.email = "Invalid email address";
      }
      if (!formState.bio.trim()) newErrors.bio = "Bio is required";
    } else if (step === 1) {
      if (!formState.primaryExpertise) newErrors.primaryExpertise = "Primary expertise is required";
      if (!formState.experience) newErrors.experience = "Experience level is required";
      if (formState.skills.length === 0) newErrors.skills = "At least one skill is required";
    } else if (step === 2) {
      const hasOneLink = Object.values(formState.portfolioLinks).some(link => link.trim() !== "");
      if (!hasOneLink) newErrors.portfolioLinks = "At least one portfolio link is required";
    } else if (step === 3) {
      if (!formState.termsAgreed) newErrors.termsAgreed = "You must agree to the terms";
      if (!formState.guidelinesRead) newErrors.guidelinesRead = "You must confirm you've read the guidelines";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      alert("Application submitted successfully!");
      router.push("/creator/pending-approval");
    }
  };
  
  // Form step content
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: return (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Basic Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" name="firstName" value={formState.firstName} onChange={handleChange}
                fullWidth variant="outlined" required error={!!errors.firstName} helperText={errors.firstName} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" name="lastName" value={formState.lastName} onChange={handleChange}
                fullWidth variant="outlined" required error={!!errors.lastName} helperText={errors.lastName} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email Address" name="email" type="email" value={formState.email} onChange={handleChange}
                fullWidth variant="outlined" required error={!!errors.email} helperText={errors.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Professional Bio" name="bio" value={formState.bio} onChange={handleChange} fullWidth multiline
                rows={4} variant="outlined" required error={!!errors.bio} helperText={errors.bio || "Tell us about yourself (150-300 characters)"}
                inputProps={{ maxLength: 300 }} />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: colors.gray[500] }}>
                {formState.bio.length}/300 characters
              </Typography>
            </Grid>
          </Grid>
          
          {/* Why Become a Creator Section */}
          <Box sx={{ mt: 4, p: 3, bgcolor: alpha(colors.premium, 0.05), borderRadius: 2, border: `1px solid ${alpha(colors.premium, 0.2)}` }}>
            <Typography variant="h6" sx={{ color: colors.premium, fontWeight: 700, mb: 2 }}>
              Why Become a GluStack Creator?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <AttachMoney sx={{ color: colors.premium, mr: 1.5, fontSize: 24, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>Monetize Your Code</Typography>
                    <Typography variant="body2">Earn revenue every time someone purchases your GluStacks</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Stars sx={{ color: colors.premium, mr: 1.5, fontSize: 24, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>Build Your Reputation</Typography>
                    <Typography variant="body2">Gain recognition in the developer community</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Code sx={{ color: colors.premium, mr: 1.5, fontSize: 24, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>Share Your Expertise</Typography>
                    <Typography variant="body2">Help others by sharing your knowledge and code</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
      
      case 1: return (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Skills & Experience</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField select label="Primary Expertise" name="primaryExpertise" value={formState.primaryExpertise}
                onChange={handleChange} fullWidth variant="outlined" required error={!!errors.primaryExpertise}
                helperText={errors.primaryExpertise}>
                {["Frontend Development", "Backend Development", "Full Stack Development", 
                  "UI/UX Design", "DevOps", "Mobile Development", "Database", "Other"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Years of Experience" name="experience" value={formState.experience}
                onChange={handleChange} fullWidth variant="outlined" required error={!!errors.experience}
                helperText={errors.experience}>
                {["1-2 years", "3-5 years", "6-10 years", "10+ years"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Skills & Technologies" name="skills" placeholder="React, Node.js, TypeScript, etc. (comma separated)"
                value={formState.skills.join(', ')} onChange={(e) => {
                  const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
                  setFormState(prev => ({ ...prev, skills: skillsArray }));
                }} fullWidth variant="outlined" required error={!!errors.skills}
                helperText={errors.skills || "List technologies, frameworks, and languages you're proficient with"} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {formState.skills.map((skill, index) => (
                  <Chip key={index} label={skill} sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary }} />
                ))}
              </Box>
            </Grid>
          </Grid>
          
          {/* Expected Components Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>What Makes a Great GluStack?</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ ...sx.card, height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: colors.success }}>Do's</Typography>
                    <List dense disablePadding>
                      {["Complete, standalone solutions to common problems", "Well-documented code with clear usage instructions",
                        "Optimized for performance and compatibility", "Follows best practices and coding standards",
                        "Has appropriate error handling and edge cases"].map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle sx={{ fontSize: 20, color: colors.success }} /></ListItemIcon>
                          <ListItemText primary={item} primaryTypographyProps={{ variant: "body2" }} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ ...sx.card, height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: colors.error }}>Don'ts</Typography>
                    <List dense disablePadding>
                      {["Include code that you don't have rights to distribute", "Submit trivial components with minimal functionality",
                        "Use deprecated or insecure dependencies", "Skip proper commenting and documentation",
                        "Hard-code sensitive information in your code"].map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}><Close sx={{ fontSize: 20, color: colors.error }} /></ListItemIcon>
                          <ListItemText primary={item} primaryTypographyProps={{ variant: "body2" }} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
      
      case 2: return (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Portfolio & Examples</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Share Your Work</Typography>
              <Typography variant="body2" sx={{ mb: 3, color: colors.gray[700] }}>
                Please provide links to your portfolio, GitHub, or other places where we can see examples of your work.
                At least one link is required.
              </Typography>
              {!!errors.portfolioLinks && (
                <Typography variant="body2" sx={{ color: colors.error, mb: 2 }}>{errors.portfolioLinks}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="GitHub Profile" name="githubUrl" value={formState.portfolioLinks.github}
                onChange={(e) => handleNestedChange('portfolioLinks', 'github', e.target.value)} fullWidth variant="outlined"
                placeholder="https://github.com/yourusername" InputProps={{ startAdornment: (<GitHub sx={{ color: colors.gray[500], mr: 1 }} />) }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="LinkedIn Profile" name="linkedinUrl" value={formState.portfolioLinks.linkedin}
                onChange={(e) => handleNestedChange('portfolioLinks', 'linkedin', e.target.value)} fullWidth variant="outlined"
                placeholder="https://linkedin.com/in/yourusername" InputProps={{ startAdornment: (<LinkedIn sx={{ color: colors.gray[500], mr: 1 }} />) }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Personal Website" name="websiteUrl" value={formState.portfolioLinks.website}
                onChange={(e) => handleNestedChange('portfolioLinks', 'website', e.target.value)} fullWidth variant="outlined"
                placeholder="https://yourwebsite.com" InputProps={{ startAdornment: (<Language sx={{ color: colors.gray[500], mr: 1 }} />) }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Other Portfolio Link" name="otherUrl" value={formState.portfolioLinks.other}
                onChange={(e) => handleNestedChange('portfolioLinks', 'other', e.target.value)} fullWidth variant="outlined"
                placeholder="https://codepen.io/yourusername" />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Sample Component Ideas (Optional)</Typography>
              <Typography variant="body2" sx={{ mb: 3, color: colors.gray[700] }}>
                Briefly describe some GluStack components you might create. This helps us understand your interests.
              </Typography>
              <TextField label="GluStack Ideas" name="sampleComponents" value={formState.sampleComponents.join('\n')}
                onChange={(e) => {
                  const ideas = e.target.value.split('\n').filter(Boolean);
                  setFormState(prev => ({ ...prev, sampleComponents: ideas }));
                }} fullWidth multiline rows={4} variant="outlined" placeholder="Enter each idea on a new line, e.g.:
1. React Authentication System with Social Login
2. Node.js API Boilerplate with TypeScript
3. Dashboard Component Library with Charts" />
            </Grid>
          </Grid>
          
          {/* Why Quality Matters Section */}
          <Paper sx={{ mt: 4, p: 3, bgcolor: alpha(colors.primary, 0.05), border: `1px solid ${colors.gray[300]}` }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
              <HelpOutline sx={{ color: colors.primary, mr: 1 }} />Why Do We Ask For Portfolio Examples?
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Our curation process ensures that GluStacks maintains high quality standards. By reviewing your previous work, we can:
            </Typography>
            <List dense disablePadding>
              {["Verify your technical capabilities and coding style", "Ensure you have experience with the technologies you'll be working with",
                "Match you with the right categories and opportunities", "Maintain the quality standards our users expect"].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle sx={{ fontSize: 18, color: colors.primary }} /></ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: "body2" }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      );
      
      case 3: return (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Terms & Submission</Typography>
          <Card sx={{ ...sx.card, mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Creator Agreement</Typography>
              <Paper variant="outlined" sx={{ p: 3, maxHeight: 300, overflowY: 'auto', mb: 3 }}>
                <Typography variant="body2" paragraph><strong>GluStack Creator Terms & Conditions</strong></Typography>
                <Typography variant="body2" paragraph>By checking the box below, you agree to the following terms as a GluStack Creator:</Typography>
                <Typography variant="body2" paragraph>
                  1. <strong>Ownership & Rights:</strong> You confirm that you have full rights and ownership of all content you submit to GluStack, 
                  or have the appropriate licenses to distribute it.
                </Typography>
                <Typography variant="body2" paragraph>
                  2. <strong>Quality Standards:</strong> You agree to maintain high quality standards for all GluStacks you submit, 
                  including documentation, code quality, and maintainability.
                </Typography>
                <Typography variant="body2" paragraph>
                  3. <strong>Revenue Sharing:</strong> For each sale of your GluStack, you will receive 70% of the sale price. 
                  Payments will be processed monthly for amounts over $50, otherwise they roll over to the next month.
                </Typography>
                <Typography variant="body2" paragraph>
                  4. <strong>Support & Maintenance:</strong> You agree to provide reasonable support to customers who purchase your GluStacks 
                  for a period of at least 60 days after purchase, and to keep your GluStacks updated with security patches.
                </Typography>
                <Typography variant="body2" paragraph>
                  5. <strong>Approval Process:</strong> All submitted GluStacks must go through an approval process 
                  to ensure they meet our quality standards before being listed on the marketplace.
                </Typography>
                <Typography variant="body2" paragraph>
                  6. <strong>Term & Termination:</strong> Either party may terminate this agreement with 30 days notice. 
                  Any existing sales and support obligations will continue for their specified duration.
                </Typography>
              </Paper>
              <FormControlLabel control={
                <Checkbox checked={formState.termsAgreed}
                  name="termsAgreed"
                  onChange={handleCheckboxChange} color="primary" />
              } label="I have read and agree to the Creator Terms & Conditions" />
              {errors.termsAgreed && (
                <Typography variant="body2" sx={{ color: colors.error, ml: 4 }}>{errors.termsAgreed}</Typography>
              )}
            </CardContent>
          </Card>
          
          <Card sx={{ ...sx.card, mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Creator Guidelines</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                We've prepared comprehensive guidelines to help you create successful GluStacks.
                Please confirm that you've read and understood our:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <NextLink href="/creator/guidelines" target="_blank" passHref>
                  <Button variant="outlined" sx={{ borderColor: colors.primary, color: colors.primary, fontWeight: 600, textTransform: 'none' }}>
                    Read Guidelines
                  </Button>
                </NextLink>
                <NextLink href="/creator/faq" target="_blank" passHref>
                  <Button variant="outlined" sx={{ borderColor: colors.gray[300], color: colors.gray[700], fontWeight: 600, textTransform: 'none' }}>
                    Creator FAQ
                  </Button>
                </NextLink>
              </Box>
              <FormControlLabel control={
                <Checkbox checked={formState.guidelinesRead}
                  name="guidelinesRead"
                  onChange={handleCheckboxChange} color="primary" />
              } label="I have read and understood the Creator Guidelines" />
              {errors.guidelinesRead && (
                <Typography variant="body2" sx={{ color: colors.error, ml: 4 }}>{errors.guidelinesRead}</Typography>
              )}
            </CardContent>
          </Card>
          
          <Box sx={{ bgcolor: alpha(colors.success, 0.1), p: 3, borderRadius: 2, border: `1px solid ${alpha(colors.success, 0.3)}` }}>
            <Typography variant="h6" sx={{ color: colors.success, fontWeight: 700, mb: 2 }}>What Happens Next?</Typography>
            <Typography variant="body2" paragraph>After submitting your application:</Typography>
            <List dense disablePadding>
              {["Our team will review your application within 2-3 business days", "You'll receive an email notification about your application status",
                "If approved, you'll gain access to the Creator Dashboard", "You can then start creating and submitting your first GluStack!"].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle sx={{ fontSize: 18, color: colors.success }} /></ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: "body2" }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      );
      
      default: return null;
    }
  };
  
  return (
    <ConsistentPageLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Become a GluStack Creator</Typography>
          <Typography variant="h6" sx={{ color: colors.gray[700], fontWeight: 500, maxWidth: 800, mx: "auto" }}>
            Share your expertise, help others build faster, and earn revenue from your code components
          </Typography>
        </Box>
        
        {/* Stepper */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
          </Stepper>
        </Box>
        
        {/* Main Content */}
        <Card sx={{ ...sx.card, mb: 3 }}><CardContent sx={{ p: 4 }}>{renderStepContent(activeStep)}</CardContent></Card>
        
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={handleBack} disabled={activeStep === 0} startIcon={<ArrowBack />}
            sx={{ borderColor: colors.primary, color: colors.primary, textTransform: 'none', fontWeight: 600 }} variant="outlined">
            Back
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {activeStep !== steps.length - 1 ? (
              <Button variant="contained" endIcon={<ArrowForward />} onClick={handleNext} sx={sx.btn()}>Continue</Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit} startIcon={<Stars />} sx={sx.btn(colors.premium)}>
                Submit Application
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ConsistentPageLayout>
  );
};

export default CreatorApplicationPage;