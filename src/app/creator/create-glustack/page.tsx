"use client";
import React, { useState } from "react";
import { Box, Typography, Grid, Button, TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText, Card, CardContent, Stepper, Step, StepLabel, Divider, Chip, IconButton, Switch, FormControlLabel, InputAdornment, Autocomplete, alpha, useMediaQuery, useTheme, SelectChangeEvent } from "@mui/material";
import { Code, Add, Close, CloudUpload, AttachMoney, Preview, CheckCircle, Info, ArrowBack, ArrowForward, Save } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ConsistentPageLayout from "../../../components/Shared/ConsistentPageLayout";
import dynamic from "next/dynamic";

// Dynamic import of React-Quill
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false, loading: () => <Box sx={{ height: 300, border: '1px solid #ccc', borderRadius: 1, p: 2 }}>Loading editor...</Box>
});

// Types and config
interface FormState {
  title: string; category: string; description: string; tags: string[]; features: string[]; technologies: string[];
  pricing: { tier: string; price: number; customLicense: boolean; };
  documentation: string; files: { source: File | null; demo: File | null; additional: File[]; };
  version: string; isPremium: boolean; isDraft: boolean;
}
type FormErrors = { [key: string]: string | undefined };

// Design system
const colors = {
  primary: "#0055BB", premium: "#2C58FF", success: "#22AA55", warning: "#FF9800", error: "#F44336",
  white: "#FFFFFF", black: "#111111",
  gray: { 50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#DDDDDD", 500: "#999999", 700: "#444444" }
};

// Data
const categories = [
  { value: "frontend", label: "Frontend" }, { value: "backend", label: "Backend" }, 
  { value: "fullstack", label: "Full Stack" }, { value: "design", label: "Design" },
  { value: "devops", label: "DevOps" }, { value: "mobile", label: "Mobile" }, { value: "database", label: "Database" }
];
const technologies = ["React", "Angular", "Vue", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", 
  "Firebase", "AWS", "TypeScript", "JavaScript", "Python", "Java", "Material UI", "Bootstrap"];
const pricingTiers = [
  { value: "free", label: "Free" }, { value: "basic", label: "Basic ($19-$39)" },
  { value: "standard", label: "Standard ($49-$79)" }, { value: "premium", label: "Premium ($89+)" },
  { value: "custom", label: "Custom Pricing" }
];
const steps = ['Basic Information', 'Upload & Documentation', 'Pricing & Availability', 'Review & Submit'];
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['link', 'image'], ['clean']
  ],
};

// Reusable styles
const cardStyle = { border: `1px solid ${colors.gray[300]}`, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" };
const subtitleStyle = { fontWeight: 600, mb: 1 };
const chipStyle = (color: string) => ({ bgcolor: alpha(color, 0.1), color });

const CreateGluStackPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>({
    title: "", category: "", description: "", tags: [], features: ["", "", ""], technologies: [],
    pricing: { tier: "standard", price: 49, customLicense: false },
    documentation: "", files: { source: null, demo: null, additional: [] },
    version: "1.0.0", isPremium: false, isDraft: true
  });

  // Handlers
  const handleChange = (e: any) => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSelectChange = (e: SelectChangeEvent) => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleNestedChange = (parent: string, field: string, value: any) => 
    setFormState(prev => ({ ...prev, [parent]: { ...prev[parent as keyof FormState] as object, [field]: value } }));

  // Features
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formState.features];
    newFeatures[index] = value;
    setFormState(prev => ({ ...prev, features: newFeatures }));
  };
  const handleAddFeature = () => formState.features.length < 10 && 
    setFormState(prev => ({ ...prev, features: [...prev.features, ""] }));
  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...formState.features];
    newFeatures.splice(index, 1);
    setFormState(prev => ({ ...prev, features: newFeatures }));
  };

  // Tags
  const handleAddTag = () => {
    if (tagInput && !formState.tags.includes(tagInput) && formState.tags.length < 8) {
      setFormState(prev => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput("");
    }
  };
  const handleRemoveTag = (tag: string) => 
    setFormState(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));

  // Files
  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files) return;
    if (field === 'additional') {
      setFormState(prev => ({ ...prev, files: { 
        ...prev.files, additional: [...prev.files.additional, ...Array.from(files)] 
      }}));
    } else {
      setFormState(prev => ({ ...prev, files: { ...prev.files, [field]: files[0] } }));
    }
  };
  const handleRemoveFile = (field: string, fileIndex?: number) => {
    if (field === 'additional' && typeof fileIndex === 'number') {
      const newAdditional = [...formState.files.additional];
      newAdditional.splice(fileIndex, 1);
      setFormState(prev => ({ ...prev, files: { ...prev.files, additional: newAdditional } }));
    } else {
      setFormState(prev => ({ ...prev, files: { ...prev.files, [field]: null } }));
    }
  };

  // Navigation
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 0) {
      if (!formState.title.trim()) newErrors.title = "Title is required";
      if (!formState.category) newErrors.category = "Category is required";
      if (!formState.description.trim()) newErrors.description = "Description is required";
      if (formState.tags.length === 0) newErrors.tags = "At least one tag is required";
      if (formState.features.filter(f => f.trim()).length < 3) newErrors.features = "At least three features are required";
    } else if (step === 1) {
      if (!formState.files.source) newErrors.source = "Source code file is required";
      if (!formState.documentation.trim()) newErrors.documentation = "Documentation is required";
    } else if (step === 2 && formState.pricing.tier === "custom" && !formState.pricing.price) {
      newErrors.price = "Price is required for custom pricing";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => validateStep(activeStep) && (setActiveStep(prev => prev + 1), window.scrollTo(0, 0));
  const handleBack = () => (setActiveStep(prev => prev - 1), window.scrollTo(0, 0));
  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      alert(formState.isDraft ? "GluStack saved as draft" : "GluStack submitted for review");
      router.push("/creator/dashboard");
    }
  };

  // Reusable components
  const SectionTitle = ({ title }: { title: string }) => (
    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>{title}</Typography>
  );
  
  const FileUploadBox = ({ id, title, icon, field, error }: { id: string; title: string; icon: React.ReactNode; field: string; error?: string; }) => (
    !formState.files[field as keyof typeof formState.files] ? (
      <Box sx={{
        border: `2px dashed ${error ? colors.error : colors.gray[300]}`,
        borderRadius: 2, p: 3, textAlign: 'center', cursor: 'pointer',
        '&:hover': { bgcolor: colors.gray[50] }
      }} onClick={() => document.getElementById(id)?.click()}>
        <input id={id} type="file" style={{ display: 'none' }}
          onChange={e => handleFileUpload(field, e.target.files)} />
        {icon}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>{title}</Typography>
        <Typography variant="body2" sx={{ color: colors.gray[500] }}>
          Drag and drop or click to select (.zip, .rar, max 50MB)
        </Typography>
        {error && <Typography variant="body2" sx={{ color: colors.error, mt: 1 }}>{error}</Typography>}
      </Box>
    ) : (
      <Box sx={{
        border: `1px solid ${colors.gray[300]}`, borderRadius: 2, p: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <Typography>{(formState.files[field as keyof typeof formState.files] as File).name}</Typography>
        </Box>
        <IconButton onClick={() => handleRemoveFile(field)} sx={{ color: colors.error }}>
          <Close />
        </IconButton>
      </Box>
    )
  );

  // Form steps content
  const renderBasicInfo = () => (
    <Box>
      <SectionTitle title="Basic Information" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField label="GluStack Title" name="title" value={formState.title} onChange={handleChange}
            fullWidth variant="outlined" required error={!!errors.title} helperText={errors.title}
            placeholder="E.g., React Authentication System" />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select name="category" value={formState.category} onChange={handleSelectChange} label="Category">
              {categories.map(category => (
                <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
              ))}
            </Select>
            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControlLabel control={
            <Switch checked={formState.isPremium} 
              onChange={e => setFormState(prev => ({ ...prev, isPremium: e.target.checked }))} color="primary" />
          } label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1 }}>Premium GluStack</Typography>
              <Chip label="Higher Earnings" size="small" 
                sx={{ ...chipStyle(colors.premium), fontSize: '0.7rem', height: 20 }} />
            </Box>
          } />
        </Grid>
        
        <Grid item xs={12}>
          <TextField label="Short Description" name="description" value={formState.description} onChange={handleChange}
            fullWidth multiline rows={3} variant="outlined" required error={!!errors.description}
            helperText={errors.description || "Briefly describe what your GluStack does (150 chars max)"}
            inputProps={{ maxLength: 150 }} />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={subtitleStyle}>Tags</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TextField value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add a tag"
              size="small" sx={{ mr: 1 }} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} />
            <Button variant="contained" onClick={handleAddTag} disabled={formState.tags.length >= 8}
              sx={{ bgcolor: colors.primary, color: colors.white, textTransform: 'none' }}>Add</Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {formState.tags.map((tag, index) => (
              <Chip key={index} label={tag} onDelete={() => handleRemoveTag(tag)}
                sx={chipStyle(colors.primary)} />
            ))}
          </Box>
          {errors.tags && <FormHelperText error>{errors.tags}</FormHelperText>}
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={subtitleStyle}>Key Features</Typography>
          {formState.features.map((feature, index) => (
            <Box key={index} sx={{ display: 'flex', mb: 2 }}>
              <TextField value={feature} onChange={e => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`} fullWidth sx={{ mr: 1 }} />
              <IconButton onClick={() => handleRemoveFeature(index)} disabled={formState.features.length <= 3}
                sx={{ color: colors.error }}><Close /></IconButton>
            </Box>
          ))}
          
          <Button variant="outlined" startIcon={<Add />} onClick={handleAddFeature} disabled={formState.features.length >= 10}
            sx={{ borderColor: colors.primary, color: colors.primary, textTransform: 'none' }}>Add Feature</Button>
          {errors.features && <FormHelperText error sx={{ mt: 1 }}>{errors.features}</FormHelperText>}
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={subtitleStyle}>Technologies & Frameworks</Typography>
          <Autocomplete multiple options={technologies} value={formState.technologies}
            onChange={(_, newValue) => setFormState(prev => ({ ...prev, technologies: newValue }))}
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} sx={chipStyle(colors.primary)} />
            ))}
            renderInput={params => <TextField {...params} variant="outlined" placeholder="Select technologies" />} />
        </Grid>
      </Grid>
    </Box>
  );

  const renderUploadAndDocs = () => (
    <Box>
      <SectionTitle title="Upload & Documentation" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="subtitle1" sx={subtitleStyle}>Source Code (Required)</Typography>
              <FileUploadBox 
                id="source-upload" 
                title="Upload Source Code" 
                icon={<CloudUpload sx={{ fontSize: 48, color: colors.primary, mb: 2 }} />}
                field="source"
                error={errors.source}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="subtitle1" sx={subtitleStyle}>Demo Files (Optional)</Typography>
              <FileUploadBox 
                id="demo-upload" 
                title="Upload Demo/Preview" 
                icon={<Preview sx={{ fontSize: 48, color: colors.primary, mb: 2 }} />}
                field="demo"
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ ...subtitleStyle, mb: 3 }}>Documentation (Required)</Typography>
              <Box sx={{ mb: 3 }}>
                <ReactQuill value={formState.documentation} 
                  onChange={(content) => setFormState(prev => ({ ...prev, documentation: content }))}
                  modules={quillModules} 
                  placeholder="Write comprehensive documentation for your GluStack..."
                  style={{ height: 400, marginBottom: 50 }} />
                {errors.documentation && <FormHelperText error sx={{ mt: 1 }}>{errors.documentation}</FormHelperText>}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <TextField label="Version" name="version" value={formState.version} onChange={handleChange}
            placeholder="E.g., 1.0.0" sx={{ width: 200 }} 
            helperText="Semantic versioning (e.g., 1.0.0)" />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPricing = () => (
    <Box>
      <SectionTitle title="Pricing & Availability" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ ...subtitleStyle, mb: 3 }}>Pricing Tier</Typography>
              <Grid container spacing={2}>
                {pricingTiers.map(tier => (
                  <Grid item xs={12} sm={6} md={2.4} key={tier.value}>
                    <Card sx={{ 
                      border: `2px solid ${formState.pricing.tier === tier.value ? 
                        (tier.value === 'premium' ? colors.premium : colors.primary) : colors.gray[200]}`,
                      borderRadius: 2, cursor: 'pointer',
                      '&:hover': {
                        borderColor: tier.value === 'premium' ? colors.premium : colors.primary,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }
                    }} onClick={() => handleNestedChange('pricing', 'tier', tier.value)}>
                      <CardContent sx={{ textAlign: 'center', p: 2 }}>
                        <AttachMoney sx={{ fontSize: 40, color: tier.value === 'premium' ? colors.premium : colors.primary, mb: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{tier.label}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              {formState.pricing.tier === 'custom' && (
                <Box sx={{ mt: 3 }}>
                  <TextField label="Custom Price ($)" type="number" value={formState.pricing.price}
                    onChange={e => handleNestedChange('pricing', 'price', parseFloat(e.target.value) || 0)}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    error={!!errors.price} helperText={errors.price} sx={{ width: 200 }} />
                </Box>
              )}
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="subtitle1" sx={{ ...subtitleStyle, mb: 2 }}>License Options</Typography>
              <FormControlLabel control={
                <Switch checked={formState.pricing.customLicense}
                  onChange={e => handleNestedChange('pricing', 'customLicense', e.target.checked)} color="primary" />
              } label="I want to offer a custom license" />
              
              {!formState.pricing.customLicense ? (
                <Box sx={{ mt: 2, bgcolor: alpha(colors.primary, 0.05), p: 2, borderRadius: 2 }}>
                  <Typography variant="body2">
                    Your GluStack will use our standard license that allows buyers to use it in both personal and commercial projects.
                  </Typography>
                </Box>
              ) : (
                <TextField label="Custom License Terms" multiline rows={4} fullWidth
                  placeholder="Describe your custom license terms..." sx={{ mt: 2 }} />
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ ...subtitleStyle, mb: 2 }}>Visibility & Publishing</Typography>
              <FormControlLabel control={
                <Switch checked={!formState.isDraft}
                  onChange={e => setFormState(prev => ({ ...prev, isDraft: !e.target.checked }))} color="primary" />
              } label={formState.isDraft ? "Save as Draft" : "Submit for Review"} />
              
              <Box sx={{ 
                mt: 2, p: 2, borderRadius: 2,
                bgcolor: formState.isDraft ? alpha(colors.warning, 0.1) : alpha(colors.success, 0.1),
                border: `1px solid ${formState.isDraft ? alpha(colors.warning, 0.3) : alpha(colors.success, 0.3)}`
              }}>
                <Typography variant="body2">
                  {formState.isDraft 
                    ? "Your GluStack will be saved as a draft and won't be visible to others." 
                    : "Your GluStack will be submitted for review. Once approved, it will be published."}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderReview = () => (
    <Box>
      <SectionTitle title="Review & Submit" />
      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{formState.title || "Untitled GluStack"}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                {formState.category && (
                  <Chip label={categories.find(c => c.value === formState.category)?.label || formState.category} 
                    size="small" sx={chipStyle(colors.primary)} />
                )}
                {formState.isPremium && (
                  <Chip icon={<AttachMoney sx={{ fontSize: 16 }} />} label="Premium" size="small" 
                    sx={chipStyle(colors.premium)} />
                )}
                <Typography variant="body2" sx={{ color: colors.gray[500] }}>Version {formState.version}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary }}>${formState.pricing.price}</Typography>
              <Typography variant="body2" sx={{ color: colors.gray[500] }}>
                {pricingTiers.find(t => t.value === formState.pricing.tier)?.label || "Standard Pricing"}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={subtitleStyle}>Description</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>{formState.description || "No description provided"}</Typography>
              
              <Typography variant="subtitle1" sx={subtitleStyle}>Features</Typography>
              <Box>
                {formState.features.filter(f => f.trim()).map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <CheckCircle sx={{ color: colors.success, mr: 1, fontSize: 18, mt: 0.3 }} />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={subtitleStyle}>Tags</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {formState.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" sx={chipStyle(colors.primary)} />
                ))}
              </Box>
              
              <Typography variant="subtitle1" sx={subtitleStyle}>Technologies</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formState.technologies.map((tech, index) => (
                  <Chip key={index} label={tech} size="small" sx={chipStyle(colors.gray[700])} />
                ))}
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <Button startIcon={<Info />} variant="outlined" fullWidth={isMobile}
              sx={{ borderColor: colors.gray[300], color: colors.gray[700], textTransform: 'none' }}>
              Preview GluStack
            </Button>
            
            <Button startIcon={formState.isDraft ? <Save /> : <CheckCircle />} variant="contained" 
              fullWidth={isMobile} onClick={handleSubmit}
              sx={{ 
                bgcolor: formState.isDraft ? colors.warning : colors.success, 
                color: colors.white, textTransform: "none", fontWeight: 700,
                "&:hover": { bgcolor: formState.isDraft ? "#E68A00" : "#1D9348" }
              }}>
              {formState.isDraft ? "Save as Draft" : "Submit for Review"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  // Render the step content
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: return renderBasicInfo();
      case 1: return renderUploadAndDocs();
      case 2: return renderPricing();
      case 3: return renderReview();
      default: return null;
    }
  };

  // Navigation buttons
  const renderNavigationButtons = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button onClick={handleBack} disabled={activeStep === 0} startIcon={<ArrowBack />}
        sx={{ borderColor: colors.primary, color: colors.primary, textTransform: 'none' }} variant="outlined">
        Back
      </Button>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        {activeStep !== steps.length - 1 ? (
          <Button variant="contained" endIcon={<ArrowForward />} onClick={handleNext} 
            sx={{ bgcolor: colors.primary, color: colors.white, textTransform: 'none' }}>
            Continue
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={() => setFormState(prev => ({ ...prev, isDraft: true }))}
              sx={{ borderColor: colors.gray[300], color: colors.gray[700], textTransform: 'none' }}>
              Save as Draft
            </Button>
            <Button variant="contained" onClick={handleSubmit} 
              sx={{ bgcolor: colors.primary, color: colors.white, textTransform: 'none' }}>
              Submit GluStack
            </Button>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <ConsistentPageLayout title="Create GluStack">
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
        </Stepper>
      </Box>
      
      <Card sx={{ ...cardStyle, mb: 3 }}>
        <CardContent>{renderStepContent(activeStep)}</CardContent>
      </Card>
      
      {renderNavigationButtons()}
    </ConsistentPageLayout>
  );
};

export default CreateGluStackPage;