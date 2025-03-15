"use client";
import React, { useState, useRef, useMemo } from "react";
import { Box, Typography, Container, Grid, TextField, InputAdornment, Button, Chip, Tab, Tabs, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Card, Divider, useMediaQuery, useTheme, alpha } from "@mui/material";
import { Search, FilterList, Download, ArrowForward, Bookmark, BookmarkBorder, AddCircleOutline, Lock, Stars, AccessTime, Person } from "@mui/icons-material";
import { motion } from "framer-motion";
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout";
import { resourcesData, resourcesPageSections, getTypeIcon } from "../../data/resourcesPageData";

// Color palette
const cp = {
  primary: { main: "#2563eb", light: "#60a5fa", dark: "#1d4ed8" },
  secondary: { main: "#0ea5e9", light: "#38bdf8", dark: "#0369a1" },
  premium: { main: "#f59e0b", light: "#fbbf24", dark: "#b45309" },
  neutral: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155" },
  success: { main: "#16a34a", light: "#4ade80", dark: "#15803d" },
  error: { main: "#e11d48", light: "#fb7185", dark: "#be123c" }
};

// Type color mapping
const getTypeColor = (type, isPremium) => {
  if (isPremium) return { bg: cp.premium.main, light: alpha(cp.premium.light, 0.15), hover: cp.premium.dark, border: alpha(cp.premium.main, 0.2), text: cp.premium.dark };
  
  const typeMap = {
    tutorial: { bg: cp.primary.main, light: alpha(cp.primary.light, 0.15), hover: cp.primary.dark, border: alpha(cp.primary.main, 0.2), text: cp.primary.dark },
    ebook: { bg: "#7c3aed", light: alpha("#c4b5fd", 0.3), hover: "#6d28d9", border: alpha("#7c3aed", 0.2), text: "#5b21b6" },
    template: { bg: cp.secondary.main, light: alpha(cp.secondary.light, 0.15), hover: cp.secondary.dark, border: alpha(cp.secondary.main, 0.2), text: cp.secondary.dark },
    video: { bg: "#ec4899", light: alpha("#fbcfe8", 0.3), hover: "#db2777", border: alpha("#ec4899", 0.2), text: "#be185d" },
    course: { bg: cp.success.main, light: alpha(cp.success.light, 0.15), hover: cp.success.dark, border: alpha(cp.success.main, 0.2), text: cp.success.dark }
  };
  
  return typeMap[type] || typeMap.tutorial;
};

const ResourceCard = ({ resource }) => {
  const theme = useTheme();
  const [saved, setSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const color = getTypeColor(resource.type, resource.premium);
  
  // Enhanced resource information (would normally come from props)
  const enhancedResource = {
    ...resource,
    rating: resource.rating || (Math.floor(Math.random() * 10) + 40) / 10, // Random rating between 4.0-5.0 if not provided
    reviewCount: resource.reviewCount || Math.floor(Math.random() * 500) + 50, // Random review count if not provided
    lastUpdated: resource.lastUpdated || "Updated " + ["1 week", "2 weeks", "1 month", "3 months"][Math.floor(Math.random() * 4)] + " ago",
    downloadCount: resource.downloadCount || Math.floor(Math.random() * 10000) + 500,
    authorAvatar: resource.authorAvatar || null,
    authorTitle: resource.authorTitle || (resource.authorName ? "Content Creator" : "")
  };

  return (
    <Card component={motion.div} 
      whileHover={{ y: -8, boxShadow: `0 16px 32px ${alpha(color.bg, 0.15)}, 0 4px 8px ${alpha(color.bg, 0.1)}` }} 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} 
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        borderRadius: 2, 
        boxShadow: `0 4px 16px ${alpha(color.bg, 0.08)}, 0 1px 4px ${alpha(color.bg, 0.05)}`,
        height: 420, // Increased height to accommodate more content
        position: "relative", 
        overflow: "hidden", 
        border: `1px solid ${alpha(color.border, 0.7)}`, 
        transition: "all 0.3s ease",
        "&:hover": { borderColor: color.border },
        "&:before": { 
          content: '""', 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 4, 
          background: `linear-gradient(90deg, ${color.bg}, ${color.hover})` 
        } 
      }}>
      
      {/* Premium badge */}
      {enhancedResource.premium && (
        <Box component={motion.div} initial={{ opacity: 0.9 }} animate={{ opacity: 1 }}
          sx={{ 
            position: "absolute", 
            top: 14, 
            right: 14, 
            zIndex: 2, 
            display: "flex", 
            alignItems: "center", 
            bgcolor: alpha(color.bg, 0.15),
            color: color.hover, 
            borderRadius: 10, 
            py: 0.5, 
            px: 1.25, 
            gap: 0.5, 
            backdropFilter: "blur(4px)", 
            boxShadow: `0 2px 8px ${alpha(color.bg, 0.2)}`, 
            border: `1px solid ${alpha(color.bg, 0.3)}` 
          }}>
          <Stars sx={{ fontSize: "0.85rem" }} />
          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.02em" }}>
            Premium
          </Typography>
        </Box>
      )}
      
      {/* Improved Header Layout */}
      <Box sx={{ display: "flex", p: 2.5, pb: 1.75, gap: 1.5 }}>
        {/* Type icon with better sizing */}
        <Box component={motion.div} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            width: 46, 
            height: 46, 
            borderRadius: 1.5, 
            flexShrink: 0,
            background: `linear-gradient(135deg, ${color.bg}, ${color.hover})`, 
            color: "#fff", 
            boxShadow: `0 4px 10px ${alpha(color.bg, 0.3)}`
          }}>
          {getTypeIcon(enhancedResource.type, { fontSize: 22 })}
        </Box>
        
        {/* Title and bookmark section */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", mr: enhancedResource.premium ? 6 : 0 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
            <Typography variant="subtitle1" 
              sx={{ 
                fontSize: "1.05rem", 
                fontWeight: 700, 
                lineHeight: 1.35,
                height: 44, 
                overflow: "hidden",
                display: "-webkit-box", 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: "vertical", 
                color: theme.palette.text.primary,
                transition: "color 0.2s ease", 
                "&:hover": { color: color.bg }, 
                letterSpacing: "-0.01em", 
                flex: 1,
                mt: 0.2
              }}>
              {enhancedResource.title}
            </Typography>
            
            <IconButton component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} 
              size="small" onClick={() => setSaved(!saved)}
              sx={{ 
                color: saved ? color.bg : cp.neutral[400], 
                p: 0.75,
                ml: 1,
                mt: -0.25,
                "&:hover": { background: saved ? alpha(color.bg, 0.1) : alpha(cp.neutral[400], 0.1) } 
              }}>
              {saved ? 
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                  <Bookmark fontSize="small" />
                </motion.div> : 
                <BookmarkBorder fontSize="small" />
              }
            </IconButton>
          </Box>
          
          {/* Metadata with improved layout */}
          <Box sx={{ display: "flex", gap: 1.5, height: 24, mt: 0.25 }}>
            {enhancedResource.readTime && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: theme.palette.text.secondary }}>
                <AccessTime sx={{ fontSize: "0.85rem" }} />
                <Typography variant="caption" sx={{ fontWeight: 500, fontSize: "0.75rem" }}>
                  {enhancedResource.readTime}
                </Typography>
              </Box>
            )}
            {enhancedResource.rating && (
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 0.5, 
                color: cp.premium.main,
                bgcolor: alpha(cp.premium.light, 0.1),
                px: 1,
                py: 0.25,
                borderRadius: 1
              }}>
                <Stars sx={{ fontSize: "0.85rem", color: cp.premium.main }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.75rem", color: cp.premium.dark }}>
                  {enhancedResource.rating.toFixed(1)} ({enhancedResource.reviewCount})
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      
      {/* Author information with expanded details */}
      {enhancedResource.authorName && (
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          px: 2.5, 
          pb: 1.5,
          gap: 1 
        }}>
          <Box sx={{ 
            width: 32, 
            height: 32, 
            borderRadius: "50%", 
            bgcolor: alpha(color.bg, 0.1), 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: color.bg,
            border: `1px solid ${alpha(color.border, 0.3)}`
          }}>
            {enhancedResource.authorAvatar || <Person sx={{ fontSize: "1rem" }} />}
          </Box>
          <Box>
            <Typography variant="caption" sx={{ 
              fontWeight: 600, 
              fontSize: "0.75rem", 
              display: "block", 
              color: theme.palette.text.primary 
            }}>
              {enhancedResource.authorName}
            </Typography>
            {enhancedResource.authorTitle && (
              <Typography variant="caption" sx={{ 
                fontSize: "0.7rem", 
                color: theme.palette.text.secondary 
              }}>
                {enhancedResource.authorTitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="caption" sx={{ 
            fontSize: "0.7rem", 
            color: theme.palette.text.secondary 
          }}>
            {enhancedResource.lastUpdated}
          </Typography>
        </Box>
      )}
      
      <Divider sx={{ mx: 2.5, opacity: 0.8, background: alpha(color.border, 0.4) }} />
      
      {/* Enhanced content section with better spacing */}
      <Box sx={{ p: 2.5, pt: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Description text */}
        <Typography variant="body2" sx={{
          color: alpha(theme.palette.text.primary, 0.9),
          lineHeight: 1.65,
          mb: 2,
          minHeight: 74,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          fontSize: "0.875rem",
          letterSpacing: "0.01em",
        }}>
          {enhancedResource.description}
        </Typography>
        
        {/* Tags with counter badge */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1.5, minHeight: 30, overflow: "hidden" }}>
          {enhancedResource.tags.slice(0, 3).map((tag, i) => (
            <Chip key={i} component={motion.div} whileHover={{ y: -2 }} label={tag} size="small"
              sx={{ 
                height: 24, 
                fontSize: "0.72rem", 
                fontWeight: 600, 
                bgcolor: color.light, 
                color: color.text, 
                border: `1px solid ${alpha(color.border, 0.5)}`,
                borderRadius: "6px",
                "&:hover": { 
                  bgcolor: alpha(color.bg, 0.12), 
                  borderColor: alpha(color.bg, 0.3) 
                } 
              }} 
            />
          ))}
          {enhancedResource.tags.length > 3 && (
            <Chip label={`+${enhancedResource.tags.length - 3} more`} size="small"
              sx={{ 
                height: 24, 
                fontSize: "0.72rem", 
                fontWeight: 600, 
                bgcolor: alpha(theme.palette.background.paper, 0.7),
                color: theme.palette.text.secondary,
                border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                borderRadius: "6px"
              }} 
            />
          )}
          
          {/* File/download info block */}
          <Box sx={{ flexGrow: 1 }} />
          {enhancedResource.downloadable && (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              ml: 'auto',
              gap: 0.5, 
              bgcolor: alpha(cp.neutral[200], 0.5),
              px: 1,
              py: 0.25,
              borderRadius: 1,
              height: 24
            }}>
              <Download sx={{ fontSize: "0.75rem", color: cp.neutral[600] }} />
              <Typography variant="caption" sx={{ 
                fontWeight: 600, 
                fontSize: "0.7rem", 
                color: cp.neutral[700] 
              }}>
                {enhancedResource.downloadCount.toLocaleString()}
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* Additional resource indicators */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {enhancedResource.type === 'course' && (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 0.5,
              color: cp.neutral[600],
              fontSize: "0.75rem"
            }}>
              <Box component="span" sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: "50%", 
                bgcolor: cp.success.main 
              }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                8 modules
              </Typography>
            </Box>
          )}
          {enhancedResource.type === 'video' && (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 0.5,
              color: cp.neutral[600],
              fontSize: "0.75rem"
            }}>
              <Box component="span" sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: "50%", 
                bgcolor: "#ec4899" 
              }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                HD quality
              </Typography>
            </Box>
          )}
          {enhancedResource.premium && (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 0.5,
              color: cp.neutral[600],
              fontSize: "0.75rem"
            }}>
              <Box component="span" sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: "50%", 
                bgcolor: cp.premium.main 
              }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Premium content
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* Enhanced button */}
        <Button component={motion.div} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} variant="contained" 
          fullWidth
          endIcon={
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              transition: "transform 0.2s ease",
              transform: isHovered ? "translateX(2px)" : "translateX(0)"
            }}>
              {enhancedResource.premium ? <Lock /> : <ArrowForward />}
            </Box>
          }
          sx={{
            mt: "auto",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "10px",
            height: 42,
            background: `linear-gradient(135deg, ${color.bg}, ${color.hover})`,
            "&:hover": { 
              background: `linear-gradient(135deg, ${color.hover}, ${color.bg})`,
              boxShadow: `0 4px 12px ${alpha(color.bg, 0.4)}`
            },
            color: "#fff",
            fontSize: "0.875rem",
            letterSpacing: "0.02em",
            boxShadow: `0 4px 10px ${alpha(color.bg, 0.25)}`,
          }}>
          {enhancedResource.premium ? "Unlock Premium" : enhancedResource.downloadable ? "Download" : "Read Now"}
        </Button>
      </Box>
    </Card>
  );
};
// Create Resource Form Modal
const CreateResourceModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({ title: '', description: '', type: 'tutorial', tags: '', price: '', readTime: '' });
  
  const handleSubmit = e => { e.preventDefault(); console.log('Form submitted:', formData); onClose(); };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 2, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}>
      <DialogTitle sx={{ pb: 1, pt: 3, px: 3, fontWeight: 700, fontSize: '1.5rem', color: theme.palette.text.primary, borderBottom: `1px solid ${cp.neutral[200]}` }}>
        Create New Resource
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 3 }}>
        <Typography variant="body2" sx={{ mb: 3, color: cp.neutral[500] }}>
          Share your knowledge with the community. Complete the form below to create a new resource.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              { xs: 12, label: "Resource Title", name: "title", placeholder: "Enter a concise, descriptive title", required: true },
              { xs: 12, label: "Description", name: "description", placeholder: "Describe your resource clearly", multiline: true, rows: 4, required: true },
              { xs: 12, md: 6, label: "Type", name: "type", select: true, 
                options: ['tutorial', 'ebook', 'template', 'video', 'course'].map(o => ({ value: o, label: o.charAt(0).toUpperCase() + o.slice(1) })) },
              { xs: 12, md: 6, label: "Tags", name: "tags", placeholder: "performance, optimization" },
              { xs: 12, md: 6, label: "Price", name: "price", type: "number", startAdornment: "$" },
              { xs: 12, md: 6, label: "Estimated Read Time", name: "readTime", placeholder: "15 min read" }
            ].map((field, i) => (
              <Grid item xs={field.xs} md={field.md} key={i}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>{field.label}</Typography>
                <TextField
                  fullWidth select={field.select} multiline={field.multiline} rows={field.rows}
                  name={field.name} type={field.type || "text"} required={field.required}
                  value={formData[field.name]} placeholder={field.placeholder}
                  onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                  SelectProps={field.select ? { native: true } : undefined}
                  InputProps={field.startAdornment ? { startAdornment: <InputAdornment position="start">{field.startAdornment}</InputAdornment> } : undefined}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.25 } }}
                >
                  {field.select && field.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </TextField>
              </Grid>
            ))}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={onClose} variant="outlined"
          sx={{ textTransform: 'none', borderRadius: 1, fontWeight: 600, px: 3, py: 1, borderColor: cp.neutral[300], color: cp.neutral[700],
            '&:hover': { borderColor: cp.neutral[400], bgcolor: cp.neutral[50] } }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained"
          sx={{ textTransform: 'none', borderRadius: 1, fontWeight: 600, px: 3, py: 1, bgcolor: cp.primary.main,
            '&:hover': { bgcolor: cp.primary.dark } }}>Create Resource</Button>
      </DialogActions>
    </Dialog>
  );
};

const ResourcesPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const searchRef = useRef(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  // Prepare data
  const resources = useMemo(() => resourcesData.map((r, i) => ({
    ...r, premium: r.premium || false, authorName: r.authorName || (i % 4 === 0 ? "Community User" : undefined)
  })), []);
  
  const filtered = resources.filter(r => 
    (!searchQuery || [r.title, r.description, ...r.tags].some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (activeCategory === "all" || r.tags.includes(activeCategory)) && 
    (activeTab === 0 || (activeTab === 1 && r.premium))
  );
  
  const tags = useMemo(() => ["all", ...Array.from(new Set(resources.flatMap(r => r.tags))).slice(0, 5)], [resources]);
  
  const animations = {
    container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.3 } } },
    item: { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.3 } } },
  };

  // Helper components
  const HeroSearch = () => (
    <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} 
      sx={{ mb: 4, borderRadius: 2, overflow: "hidden", background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        boxShadow: "0 10px 30px rgba(37, 99, 235, 0.2)", py: { xs: 4, md: 5 }, px: { xs: 2.5, md: 4 } }}>
      <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.75rem", md: "2.25rem" }, mb: 1.5, color: "#fff", letterSpacing: "-0.02em" }}>
          {resourcesPageSections.hero.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400, mb: 4, fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
          {resourcesPageSections.hero.subtitle}
        </Typography>
        <Box component="form" onSubmit={e => { e.preventDefault(); setSearchQuery(searchRef.current?.value || ""); }} 
          sx={{ maxWidth: 600, mx: "auto", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 0 } }}>
          <TextField fullWidth inputRef={searchRef} placeholder="Search resources, topics, or tags..." 
            InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
              sx: { bgcolor: alpha("#fff", 0.95), borderRadius: { xs: 1.5, sm: "12px 0 0 12px" }, "& fieldset": { border: "none" }, 
                "& input": { py: 1.75, px: 1 }, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" } }} />
          <Button type="submit" variant="contained" 
            sx={{ px: 3, borderRadius: { xs: 1.5, sm: "0 12px 12px 0" }, height: { sm: 56 }, fontWeight: 600, textTransform: "none", 
              bgcolor: cp.premium.main, "&:hover": { bgcolor: cp.premium.dark, boxShadow: "0 6px 16px rgba(245, 158, 11, 0.3)" },
              fontSize: "0.95rem", boxShadow: "0 4px 12px rgba(245, 158, 11, 0.2)" }}>Search</Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <ConsistentPageLayout title="Knowledge Hub" subtitle="Explore our curated resources to master GLUStack">
      <Container maxWidth="xl" sx={{ pt: 3, pb: 8 }}>
        <HeroSearch />

        {/* Filters section */}
        <Box component={motion.div} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, 
            mb: 3, p: { xs: 2, md: 2.5 }, gap: 2, borderRadius: 2, bgcolor: cp.neutral[50], border: `1px solid ${cp.neutral[200]}`, 
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
            <FilterList sx={{ color: cp.neutral[500], mr: 0.5 }} />
            {tags.map((tag, i) => (
              <Chip key={i} label={tag === "all" ? "All" : tag} onClick={() => setActiveCategory(tag)} component={motion.div}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                sx={{ fontWeight: activeCategory === tag ? 600 : 400, fontSize: "0.8rem", height: 32, borderRadius: 10, 
                  bgcolor: activeCategory === tag ? cp.primary.main : cp.neutral[100], color: activeCategory === tag ? "#fff" : cp.neutral[700], 
                  border: activeCategory === tag ? "none" : `1px solid ${cp.neutral[200]}`, px: 1.2,
                  boxShadow: activeCategory === tag ? `0 4px 10px ${alpha(cp.primary.main, 0.25)}` : "none" }} />
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: { xs: "100%", md: "auto" } }}>
            <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} 
              sx={{ minHeight: 42, "& .MuiTabs-indicator": { height: 3, borderRadius: "1.5px", 
                backgroundColor: activeTab === 0 ? cp.primary.main : cp.premium.main },
                "& .Mui-selected": { color: activeTab === 0 ? cp.primary.main : cp.premium.main, fontWeight: 600 } }}>
              <Tab label="All" sx={{ minHeight: 42, px: 2, textTransform: "none", fontSize: "0.85rem", fontWeight: activeTab === 0 ? 600 : 500, 
                color: activeTab === 0 ? cp.primary.main : cp.neutral[500] }} />
              <Tab label="Premium" icon={<Stars sx={{ fontSize: 16 }} />} iconPosition="start" 
                sx={{ minHeight: 42, px: 2, textTransform: "none", fontSize: "0.85rem", fontWeight: activeTab === 1 ? 600 : 500, 
                  color: activeTab === 1 ? cp.premium.main : cp.neutral[500] }} />
            </Tabs>
            <Button component={motion.div} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} variant="contained" 
              onClick={() => setOpenModal(true)} startIcon={<AddCircleOutline />} 
              sx={{ display: { xs: "none", sm: "flex" }, ml: "auto", py: 1.2, px: 2.5, fontWeight: 600, textTransform: "none", borderRadius: 1.25, 
                bgcolor: cp.primary.main, "&:hover": { bgcolor: cp.primary.dark, boxShadow: `0 6px 16px ${alpha(cp.primary.main, 0.3)}` },
                boxShadow: `0 4px 12px ${alpha(cp.primary.main, 0.2)}` }}>Create Resource</Button>
          </Box>
        </Box>

        {/* Mobile create button */}
        {isSmallScreen && (
          <Button component={motion.div} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} variant="contained" fullWidth 
            startIcon={<AddCircleOutline />} onClick={() => setOpenModal(true)} 
            sx={{ display: "flex", mb: 3, py: 1.5, fontWeight: 600, textTransform: "none", borderRadius: 1.5, bgcolor: cp.primary.main, 
              "&:hover": { bgcolor: cp.primary.dark, boxShadow: `0 6px 16px ${alpha(cp.primary.main, 0.3)}` },
              boxShadow: `0 4px 12px ${alpha(cp.primary.main, 0.2)}`, fontSize: "0.95rem" }}>Create Resource</Button>
        )}

        {/* Status indicator */}
        <Typography component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.3 }} variant="body2" 
          sx={{ mb: 2.5, ml: 0.5, color: cp.neutral[500], display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.85rem", fontWeight: 500 }}>
          <FilterList fontSize="small" sx={{ fontSize: "1rem", opacity: 0.7 }} /> 
          Showing {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
          {activeTab === 1 ? " (Premium only)" : ""}{activeCategory !== "all" ? ` with tag "${activeCategory}"` : ""}
          {searchQuery ? ` matching "${searchQuery}"` : ""}
        </Typography>

        {/* Resource cards grid */}
        <Box component={motion.div} variants={animations.container} initial="hidden" animate="visible" sx={{ mb: 6 }}>
          {filtered.length ? (
            <Grid container spacing={3}>
              {filtered.map((resource, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={resource.id} component={motion.div} variants={animations.item} 
                  transition={{ delay: index * 0.05 }}>
                  <ResourceCard resource={resource} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              sx={{ textAlign: "center", py: 8, border: `1px solid ${cp.neutral[200]}`, borderRadius: 2, bgcolor: cp.neutral[50], 
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
              <Search sx={{ fontSize: 48, color: cp.neutral[300], mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, fontSize: "1.35rem", color: cp.neutral[700] }}>
                {resourcesPageSections.noResults.title}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: cp.neutral[500], mb: 4, maxWidth: 500, mx: "auto", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {resourcesPageSections.noResults.subtitle}
              </Typography>
              <Button component={motion.div} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} variant="outlined" 
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); if (searchRef.current) searchRef.current.value = ""; }} 
                sx={{ px: 3, py: 1.25, fontWeight: 600, textTransform: "none", borderRadius: 1.5, borderColor: cp.primary.main, color: cp.primary.main,
                  "&:hover": { borderColor: cp.primary.dark, bgcolor: alpha(cp.primary.light, 0.05) } }}>
                {resourcesPageSections.noResults.buttonText}
              </Button>
            </Box>
          )}
        </Box>

        {/* CTA Section */}
        <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          sx={{ py: 5, px: { xs: 2.5, md: 4 }, borderRadius: 2.5, position: "relative", overflow: "hidden",
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            boxShadow: `0 16px 40px ${alpha(theme.palette.primary.dark, 0.25)}` }}>
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, py: { xs: 2, md: 4 }, 
            display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 5, alignItems: "center", justifyContent: "space-between" }}>
            <Box maxWidth={460}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.85rem", md: "2.5rem" }, fontWeight: 800, color: "#fff", mb: 2, 
                letterSpacing: "-0.02em", lineHeight: 1.2 }}>Ready to transform your business?</Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mb: 3.5, fontSize: "1.125rem", lineHeight: 1.6 }}>
                Join thousands of growing businesses that trust our solutions to scale and succeed.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Button component={motion.div} whileHover={{ scale: 1.04, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }} whileTap={{ scale: 0.97 }}
                  href="/contact" size="large" variant="contained" 
                  sx={{ bgcolor: "#fff", color: theme.palette.primary.main, textTransform: "none", fontWeight: 700, py: 1.75, px: 4, 
                    borderRadius: 1.5, boxShadow: "0 8px 16px rgba(0,0,0,0.2)", fontSize: "1rem" }}>Get started</Button>
                <Button component={motion.div} whileHover={{ scale: 1.04, borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.97 }} variant="outlined" href="/contact?demo=true" size="large" 
                  sx={{ borderColor: "rgba(255,255,255,0.6)", borderWidth: 2, color: "#fff", textTransform: "none", fontWeight: 700, py: 1.65, 
                    px: 4, borderRadius: 1.5, fontSize: "1rem" }}>Request demo</Button>
              </Box>
            </Box>
            <Box component={motion.div} whileHover={{ boxShadow: "0 16px 48px rgba(0,0,0,0.2)", y: -4 }}
              sx={{ backdropFilter: "blur(12px)", bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2, border: "1px solid rgba(255,255,255,0.2)", 
                p: 3.5, maxWidth: 320, width: "100%", boxShadow: "0 12px 36px rgba(0,0,0,0.15)" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#fff" }}>Trusted by industry leaders</Typography>
              <Grid container spacing={2.5}>
                {[
                  { value: "97%", label: "Customer satisfaction" },
                  { value: "5K+", label: "Active customers" },
                  { value: "4.9", label: "TrustPilot rating" },
                  { value: "24/7", label: "Customer support" },
                ].map((stat, i) => (
                  <Grid item xs={6} key={i}>
                    <Box component={motion.div} whileHover={{ y: -3 }}
                      sx={{ p: 2, textAlign: "center", bgcolor: alpha("#fff", 0.08), borderRadius: 1.5,
                        border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 0.5, textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                        fontSize: { xs: "1.6rem", md: "1.8rem" } }}>{stat.value}</Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
        
        {/* Create Resource Modal */}
        <CreateResourceModal open={openModal} onClose={() => setOpenModal(false)} />
      </Container>
    </ConsistentPageLayout>
  );
};

export default () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <ResourcesPage />
  </motion.div>
);