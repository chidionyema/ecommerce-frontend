"use client";
import React, { useState } from "react";
import { 
  Box, Typography, Container, Grid, Button, Card, CardContent, TextField, 
  Stepper, Step, StepLabel, FormControlLabel, Checkbox, Divider, List, 
  ListItem, ListItemIcon, ListItemText, Paper, Chip, alpha 
} from "@mui/material";
import { 
  CheckCircle, Close, Code, Stars, ArrowForward, ArrowBack,
  GitHub, LinkedIn, Language, AttachMoney, HelpOutline 
} from "@mui/icons-material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import ConsistentPageLayout from "../../../components/Shared/ConsistentPageLayout";

// Type definitions
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  skills: string[];
  experience: string;
  primaryExpertise: string;
  portfolioLinks: {
    github: string;
    website: string;
    linkedin: string;
    other: string;
  };
  sampleComponents: string[];
  termsAgreed: boolean;
  guidelinesRead: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  bio?: string;
  skills?: string;
  experience?: string;
  primaryExpertise?: string;
  portfolioLinks?: string;
  termsAgreed?: string;
  guidelinesRead?: string;
}

// Refined colors and styles
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", white: "#FFFFFF",
  premium: "#2C58FF", success: "#22AA55", error: "#F44336",
  gray: {100: "#F5F5F5", 300: "#DDDDDD", 500: "#999999", 700: "#444444"}
};

const sx = {
  btn: (color = colors.primary) => ({ 
    bgcolor: color, color: colors.white, fontWeight: 700, borderRadius: 1.5,
    boxShadow: `0 4px 8px ${alpha(color, 0.3)}`, 
    "&:hover": { bgcolor: color === colors.premium ? "#4F73FF" : colors.primaryLight } 
  }),
  card: { border: `1px solid ${colors.gray[300]}`, borderRadius: 2 }
};

const steps = ['Basic Info', 'Skills & Experience', 'Portfolio', 'Submit'];

// Initial form state
const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
  skills: [],
  experience: "",
  primaryExpertise: "",
  portfolioLinks: { github: "", website: "", linkedin: "", other: "" },
  sampleComponents: [],
  termsAgreed: false,
  guidelinesRead: false
};

const CreatorApplicationPage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Form handling with proper event types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNestedChange = (
    field: keyof FormState['portfolioLinks'],
    value: string
  ) => {
    setFormState(prev => ({
      ...prev,
      portfolioLinks: { ...prev.portfolioLinks, [field]: value }
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: checked }));
  };

  // Validation
  const validateStep = (step: number) => {
    const newErrors: FormErrors = {};
    
    if (step === 0) {
      if (!formState.firstName.trim()) newErrors.firstName = "Required";
      if (!formState.lastName.trim()) newErrors.lastName = "Required";
      if (!formState.email.trim()) newErrors.email = "Required";
      if (formState.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formState.email)) {
        newErrors.email = "Invalid email";
      }
      if (!formState.bio.trim()) newErrors.bio = "Required";
    } else if (step === 1) {
      if (!formState.primaryExpertise) newErrors.primaryExpertise = "Required";
      if (!formState.experience) newErrors.experience = "Required";
      if (formState.skills.length === 0) newErrors.skills = "Add at least one skill";
    } else if (step === 2) {
      const hasOneLink = Object.values(formState.portfolioLinks).some(link => link.trim() !== "");
      if (!hasOneLink) newErrors.portfolioLinks = "Add at least one link";
    } else if (step === 3) {
      if (!formState.termsAgreed) newErrors.termsAgreed = "Required";
      if (!formState.guidelinesRead) newErrors.guidelinesRead = "Required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      router.push("/creator/pending-approval");
    }
  };
  
  // Content for each step
  const StepContent = () => {
    switch (activeStep) {
      case 0: return (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Basic Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" name="firstName" value={formState.firstName} 
                onChange={handleChange} fullWidth required error={!!errors.firstName} 
                helperText={errors.firstName} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" name="lastName" value={formState.lastName} 
                onChange={handleChange} fullWidth required error={!!errors.lastName} 
                helperText={errors.lastName} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email Address" name="email" type="email" value={formState.email} 
                onChange={handleChange} fullWidth required error={!!errors.email} 
                helperText={errors.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Professional Bio" name="bio" value={formState.bio} 
                onChange={handleChange} fullWidth multiline rows={4} required error={!!errors.bio} 
                helperText={errors.bio || "Tell us about yourself (max 300 characters)"} 
                inputProps={{ maxLength: 300 }} />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: colors.gray[500] }}>
                {formState.bio.length}/300
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, p: 3, bgcolor: alpha(colors.premium, 0.05), borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: colors.premium, fontWeight: 700, mb: 2 }}>
              Why Become a GluStack Creator?
            </Typography>
            <Grid container spacing={2}>
              {[
                { icon: <AttachMoney />, title: "Monetize Your Code", desc: "Earn revenue from your components" },
                { icon: <Stars />, title: "Build Your Reputation", desc: "Gain recognition in the developer community" },
                { icon: <Code />, title: "Share Your Expertise", desc: "Help others with your knowledge" }
              ].map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box sx={{ color: colors.premium, mr: 1.5, mt: 0.5 }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
                      <Typography variant="body2">{item.desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      );
      
      case 1: return (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Skills & Experience</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField select label="Primary Expertise" name="primaryExpertise" 
                value={formState.primaryExpertise} onChange={handleChange} fullWidth required 
                error={!!errors.primaryExpertise} helperText={errors.primaryExpertise}>
                {["Frontend Development", "Backend Development", "Full Stack Development", 
                  "UI/UX Design", "DevOps", "Mobile Development", "Database", "Other"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Years of Experience" name="experience" 
                value={formState.experience} onChange={handleChange} fullWidth required 
                error={!!errors.experience} helperText={errors.experience}>
                {["1-2 years", "3-5 years", "6-10 years", "10+ years"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Skills & Technologies" name="skills" 
                placeholder="React, Node.js, TypeScript, etc. (comma separated)"
                value={formState.skills.join(', ')} 
                onChange={(e) => {
                  const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
                  setFormState(prev => ({ ...prev, skills: skillsArray }));
                }} 
                fullWidth required error={!!errors.skills}
                helperText={errors.skills || "List technologies you're proficient with"} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {formState.skills.map((skill, index) => (
                  <Chip key={index} label={skill} sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary }} />
                ))}
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>What Makes a Great GluStack?</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ ...sx.card, height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: colors.success }}>Do's</Typography>
                    <List dense disablePadding>
                      {["Complete, standalone solutions", "Well-documented code", "Optimized for performance",
                        "Follows best practices", "Has proper error handling"].map((item, i) => (
                        <ListItem key={i} sx={{ mb: 1 }} disablePadding>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle sx={{ fontSize: 20, color: colors.success }} />
                          </ListItemIcon>
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
                      {["Include code you don't own", "Submit trivial components", "Use deprecated dependencies",
                        "Skip proper documentation", "Hard-code sensitive information"].map((item, i) => (
                        <ListItem key={i} sx={{ mb: 1 }} disablePadding>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <Close sx={{ fontSize: 20, color: colors.error }} />
                          </ListItemIcon>
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
                Please provide links to your portfolio or GitHub. At least one link is required.
              </Typography>
              {!!errors.portfolioLinks && (
                <Typography variant="body2" sx={{ color: colors.error, mb: 2 }}>{errors.portfolioLinks}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="GitHub Profile" value={formState.portfolioLinks.github}
                onChange={(e) => handleNestedChange('github', e.target.value)} fullWidth
                placeholder="https://github.com/yourusername" 
                InputProps={{ startAdornment: (<GitHub sx={{ color: colors.gray[500], mr: 1 }} />) }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="LinkedIn Profile" value={formState.portfolioLinks.linkedin}
                onChange={(e) => handleNestedChange('linkedin', e.target.value)} fullWidth
                placeholder="https://linkedin.com/in/yourusername" 
                InputProps={{ startAdornment: (<LinkedIn sx={{ color: colors.gray[500], mr: 1 }} />) }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Personal Website" value={formState.portfolioLinks.website}
                onChange={(e) => handleNestedChange('website', e.target.value)} fullWidth
                placeholder="https://yourwebsite.com" 
                InputProps={{ startAdornment: (<Language sx={{ color: colors.gray[500], mr: 1 }} />) }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Other Portfolio Link" value={formState.portfolioLinks.other}
                onChange={(e) => handleNestedChange('other', e.target.value)} fullWidth
                placeholder="https://codepen.io/yourusername" />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Component Ideas (Optional)</Typography>
              <Typography variant="body2" sx={{ mb: 2, color: colors.gray[700] }}>
                Describe some GluStack components you might create.
              </Typography>
              <TextField label="GluStack Ideas" value={formState.sampleComponents.join('\n')}
                onChange={(e) => {
                  const ideas = e.target.value.split('\n').filter(Boolean);
                  setFormState(prev => ({ ...prev, sampleComponents: ideas }));
                }} fullWidth multiline rows={3} 
                placeholder="Enter each idea on a new line" />
            </Grid>
          </Grid>
          
          <Paper sx={{ mt: 4, p: 3, bgcolor: alpha(colors.primary, 0.05) }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
              <HelpOutline sx={{ color: colors.primary, mr: 1 }} />
              Why Do We Ask For Portfolio Examples?
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Our curation process ensures high quality standards. By reviewing your work, we can:
            </Typography>
            <List dense disablePadding>
              {["Verify your technical capabilities", "Ensure experience with relevant technologies",
                "Match you with the right categories", "Maintain quality standards"].map((item, i) => (
                <ListItem key={i} sx={{ mb: 1 }} disablePadding>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircle sx={{ fontSize: 18, color: colors.primary }} />
                  </ListItemIcon>
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
                <Typography variant="body2" paragraph><strong>GluStack Creator Terms</strong></Typography>
                <Typography variant="body2" paragraph>
                  1. <strong>Ownership:</strong> You confirm that you have full rights to all content you submit.
                </Typography>
                <Typography variant="body2" paragraph>
                  2. <strong>Quality:</strong> You agree to maintain high quality standards for all submissions.
                </Typography>
                <Typography variant="body2" paragraph>
                  3. <strong>Revenue:</strong> You receive 70% of each sale. Payments processed monthly (minimum $50).
                </Typography>
                <Typography variant="body2" paragraph>
                  4. <strong>Support:</strong> You agree to provide reasonable support for 60 days after purchase.
                </Typography>
                <Typography variant="body2" paragraph>
                  5. <strong>Approval:</strong> All submissions must pass our quality review process.
                </Typography>
              </Paper>
              <FormControlLabel control={
                <Checkbox checked={formState.termsAgreed} name="termsAgreed" 
                  onChange={handleCheckboxChange} color="primary" />
              } label="I agree to the Creator Terms & Conditions" />
              {errors.termsAgreed && (
                <Typography variant="body2" sx={{ color: colors.error, ml: 4 }}>{errors.termsAgreed}</Typography>
              )}
            </CardContent>
          </Card>
          
          <Card sx={{ ...sx.card, mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Creator Guidelines</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Please confirm that you've read our guidelines:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <NextLink href="/creator/guidelines" target="_blank" passHref>
                  <Button variant="outlined" sx={{ borderColor: colors.primary, color: colors.primary, fontWeight: 600 }}>
                    Read Guidelines
                  </Button>
                </NextLink>
                <NextLink href="/creator/faq" target="_blank" passHref>
                  <Button variant="outlined" sx={{ borderColor: colors.gray[300], color: colors.gray[700], fontWeight: 600 }}>
                    Creator FAQ
                  </Button>
                </NextLink>
              </Box>
              <FormControlLabel control={
                <Checkbox checked={formState.guidelinesRead} name="guidelinesRead" 
                  onChange={handleCheckboxChange} color="primary" />
              } label="I have read and understood the Creator Guidelines" />
              {errors.guidelinesRead && (
                <Typography variant="body2" sx={{ color: colors.error, ml: 4 }}>{errors.guidelinesRead}</Typography>
              )}
            </CardContent>
          </Card>
          
          <Box sx={{ bgcolor: alpha(colors.success, 0.1), p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: colors.success, fontWeight: 700, mb: 2 }}>What Happens Next?</Typography>
            <List dense disablePadding>
              {["Our team will review your application within 2-3 business days", 
                "You'll receive an email notification about your status",
                "If approved, you'll gain access to the Creator Dashboard", 
                "You can then start submitting your first GluStack!"].map((item, i) => (
                <ListItem key={i} sx={{ mb: 1 }} disablePadding>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircle sx={{ fontSize: 18, color: colors.success }} />
                  </ListItemIcon>
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
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Become a GluStack Creator</Typography>
          <Typography variant="h6" sx={{ color: colors.gray[700], fontWeight: 500, maxWidth: 800, mx: "auto" }}>
            Share your expertise and earn revenue from your code components
          </Typography>
        </Box>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
        </Stepper>
        
        <Card sx={{ ...sx.card, mb: 3 }}>
          <CardContent sx={{ p: 4 }}><StepContent /></CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={handleBack} disabled={activeStep === 0} startIcon={<ArrowBack />}
            sx={{ borderColor: colors.primary, color: colors.primary, fontWeight: 600 }} variant="outlined">
            Back
          </Button>
          
          {activeStep !== steps.length - 1 ? (
            <Button variant="contained" endIcon={<ArrowForward />} onClick={handleNext} sx={sx.btn()}>
              Continue
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSubmit} startIcon={<Stars />} sx={sx.btn(colors.premium)}>
              Submit Application
            </Button>
          )}
        </Box>
      </Container>
    </ConsistentPageLayout>
  );
};

export default CreatorApplicationPage;