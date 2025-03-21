"use client";
import React, { useState, useRef, useMemo } from "react";
import { Box, Typography, Container, Grid, TextField, InputAdornment, Button, Chip, Card, alpha } from "@mui/material";
import { Search, ArrowForward, Stars, CheckCircle } from "@mui/icons-material";
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout";
import { resourcesData, getTypeIcon } from "../../data/resourcesPageData";
import NextLink from "next/link";

// Simplified color system with reusable styles
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", primaryDark: "#003388", white: "#FFFFFF", black: "#111111",
  premium: "#2C58FF", premiumLight: "#4F73FF", success: "#22AA55",
  gray: { 50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#DDDDDD", 500: "#999999", 700: "#444444", 900: "#111111" }
};

// Fixed the type error by explicitly typing the color parameter
const sx = {
  card: { border: `1px solid ${colors.gray[300]}`, borderRadius: 2, height: "100%", display: "flex", flexDirection: "column", 
    overflow: "hidden", transition: "all 0.2s ease", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", bgcolor: colors.white },
  btn: (color: string) => ({ bgcolor: color, color: colors.white, textTransform: "none", fontWeight: 700, borderRadius: 1.5,
    boxShadow: `0 4px 8px ${alpha(color, 0.3)}`, "&:hover": { bgcolor: color === colors.premium ? colors.premiumLight : 
    colors.primaryLight, boxShadow: `0 6px 12px ${alpha(color, 0.4)}` } }),
  creatorBtn: { position: "absolute", top: 16, right: 16, bgcolor: colors.premium, color: colors.white, fontWeight: 700,
    textTransform: "none", py: 1, px: 2, borderRadius: 4, boxShadow: `0 4px 12px ${alpha(colors.premium, 0.4)}`,
    "&:hover": { bgcolor: colors.premiumLight, transform: "translateY(-2px)", boxShadow: `0 6px 16px ${alpha(colors.premium, 0.5)}` },
    zIndex: 5 }
};

// Adding type interface for the resource
interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  premium: boolean;
}

// Card Component with proper typing and fixed heights
const ResourceCard = ({ resource }: { resource: Resource }) => {
  const isPremium = resource.premium;
  const typeColor = isPremium ? colors.premium : colors.primary;
  
  return (
    <Card sx={{ 
      ...sx.card, 
      "&:hover": { 
        transform: "translateY(-4px)", 
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        borderColor: isPremium ? colors.premium : colors.primary 
      },
      height: 420 // Fixed height for all cards
    }}>
      {isPremium && (
        <Box sx={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          bgcolor: colors.premium, 
          color: colors.white, 
          py: 0.5, 
          px: 1.5,
          fontWeight: 700, 
          fontSize: "0.75rem", 
          borderBottomLeftRadius: 8, 
          display: "flex", 
          alignItems: "center", 
          zIndex: 2 
        }}>
          <Stars sx={{ fontSize: 16, mr: 0.5 }} />PREMIUM
        </Box>
      )}
      
      <Box sx={{ 
        p: 2.5, 
        pb: 1.5, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        borderBottom: `1px solid ${colors.gray[200]}`, 
        bgcolor: colors.gray[50] 
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ color: typeColor }}>{getTypeIcon(resource.type)}</Box>
          <Typography sx={{ 
            color: colors.gray[700], 
            fontWeight: 600, 
            fontSize: "0.75rem", 
            textTransform: "uppercase", 
            letterSpacing: "0.03em" 
          }}>{resource.type}</Typography>
        </Box>
        
        {isPremium && (
          <Chip 
            icon={<Stars sx={{ fontSize: 16, color: colors.premium }} />} 
            label="Premium" 
            size="small"
            sx={{ 
              bgcolor: alpha(colors.premium, 0.1), 
              color: colors.premium, 
              fontWeight: 600, 
              fontSize: "0.75rem", 
              height: 24 
            }} 
          />
        )}
      </Box>
      
      <Box sx={{ 
        p: 2.5, 
        display: "flex", 
        flexDirection: "column",
        height: "calc(100% - 56px)" // Subtracting the header height
      }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <Box sx={{ color: typeColor, mr: 1.5, mt: 0.5 }}>{getTypeIcon(resource.type)}</Box>
          <Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 800, 
              fontSize: "1.2rem", 
              color: colors.black, 
              lineHeight: 1.2, 
              mb: 0.5,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              height: '2.4rem' // Fixed height for title (2 lines max)
            }}>{resource.title}</Typography>
            <Typography sx={{ 
              fontSize: "0.8rem", 
              fontWeight: 600, 
              color: typeColor, 
              textTransform: "uppercase" 
            }}>{resource.type}</Typography>
          </Box>
        </Box>
        
        <Typography sx={{ 
          fontSize: "0.95rem", 
          color: colors.black, 
          mb: 2, 
          fontWeight: 500, 
          lineHeight: 1.5,
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          height: '4.275rem' // Fixed height for description (3 lines max)
        }}>{resource.description}</Typography>
        
        <Box sx={{ height: '96px' }}> {/* Fixed height for the feature points */}
          {["Speeds up development by 50%", "Production-ready code", "Regularly maintained"].map((point, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <CheckCircle sx={{ fontSize: 16, mr: 1, color: isPremium ? colors.premium : colors.success }} />
              <Typography sx={{ fontSize: "0.85rem", color: colors.gray[700], fontWeight: 500 }}>{point}</Typography>
            </Box>
          ))}
        </Box>
        
        <Box sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 1, 
          mt: 2, 
          mb: 2,
          height: '24px', // Fixed height for tags
          overflow: 'hidden'
        }}>
          {resource.tags.slice(0, 3).map(tag => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              sx={{ 
                bgcolor: colors.gray[100], 
                color: colors.gray[700],
                fontWeight: 600, 
                fontSize: "0.7rem", 
                height: 24, 
                border: `1px solid ${colors.gray[300]}` 
              }} 
            />
          ))}
        </Box>
        
        <Box sx={{ mt: 'auto' }}> {/* Push button to bottom */}
          <Button 
            variant="contained" 
            fullWidth 
            endIcon={<ArrowForward />}
            sx={{ ...sx.btn(typeColor), py: 1.2 }}
          >
            {isPremium ? "Get Premium Access" : "View Details"}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

// Main Component
const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Data handling
  const resources = useMemo(() => resourcesData.map(r => ({...r, premium: r.premium || false})), []);
  const filtered = resources.filter(r => 
    (!searchQuery || [r.title, r.description, ...r.tags].some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (activeCategory === "all" || r.tags.includes(activeCategory)) && (!isPremium || r.premium));
  const tags = useMemo(() => ["all", ...Array.from(new Set(resources.flatMap(r => r.tags))).slice(0, 5)], [resources]);

  return (
    <ConsistentPageLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search Hero */}
        <Box sx={{ background: `linear-gradient(135deg, ${colors.primary}, #003388)`, color: colors.white, py: 6, px: 3, 
          mb: 4, borderRadius: 3, textAlign: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", position: "relative", 
          overflow: "hidden" }}>
          <NextLink href="/creator" passHref>
            <Button variant="contained" startIcon={<Stars />} sx={sx.creatorBtn}>Become a Creator</Button>
          </NextLink>

          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 800, mb: 2 }}>
            Build Faster With GluStacks
          </Typography>
          <Typography sx={{ fontSize: "1.2rem", mb: 4, maxWidth: "700px", mx: "auto", fontWeight: 500 }}>
            Pre-built, battle-tested components that save you weeks of development time.
          </Typography>
          
          <Box component="form" onSubmit={(e) => { e.preventDefault(); if (searchRef.current) setSearchQuery(searchRef.current.value); }} 
            sx={{ maxWidth: "600px", mx: "auto" }}>
            <TextField inputRef={searchRef} placeholder="What are you looking to build?" fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start">
                <Search sx={{ color: colors.gray[500] }} /></InputAdornment> }}
              sx={{ bgcolor: colors.white, borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" }, borderRadius: 2,
                "& input": { padding: "16px 14px 16px 0", fontSize: "1rem" }} }} />
            
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
              <Button variant="contained" size="large" sx={{ ...sx.btn(colors.primary), borderRadius: 2, 
                py: 1.5, px: 4, flex: { xs: 1, sm: "0 1 auto" } }}>Browse Components</Button>
              <NextLink href="/creator" passHref>
                <Button variant="contained" size="large" startIcon={<Stars />} sx={{ ...sx.btn(colors.premium), 
                  borderRadius: 2, py: 1.5, px: 4, flex: { xs: 1, sm: "0 1 auto" } }}>Share Your Work</Button>
              </NextLink>
            </Box>
          </Box>
        </Box>
        
        {/* Filter Bar */}
        <Box sx={{ mb: 4, bgcolor: colors.gray[50], borderRadius: 2, p: 2, display: "flex", flexWrap: "wrap", 
          gap: 2, alignItems: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.05)", 
          border: `1px solid ${colors.gray[200]}` }}>
          <Button variant={isPremium ? "contained" : "outlined"} onClick={() => setIsPremium(!isPremium)}
            startIcon={<Stars sx={{ color: isPremium ? colors.white : colors.premium }} />}
            sx={{ borderColor: colors.premium, borderWidth: 2, bgcolor: isPremium ? colors.premium : "transparent",
              color: isPremium ? colors.white : colors.premium, fontWeight: 700, textTransform: "none", py: 1, px: 2 }}>
            Premium Only
          </Button>

          <Box sx={{ height: "24px", width: "1px", bgcolor: colors.gray[300], display: { xs: "none", sm: "block" } }} />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map(tag => (
              <Button key={tag} variant={activeCategory === tag ? "contained" : "outlined"}
                onClick={() => setActiveCategory(tag)}
                sx={{ borderColor: colors.gray[300], borderWidth: 2, bgcolor: activeCategory === tag ? colors.primary : colors.white,
                  color: activeCategory === tag ? colors.white : colors.gray[700], fontWeight: 600, textTransform: "none", 
                  py: 0.75, px: 1.5, minWidth: 'auto' }}>
                {tag === "all" ? "All" : tag}
              </Button>
            ))}
          </Box>
        </Box>
        
        {/* Resources Grid or Empty State */}
        {filtered.length > 0 ? (
          <Grid container spacing={3}>
            {filtered.map(resource => (
              <Grid item xs={12} sm={6} md={4} key={resource.id}>
                <ResourceCard resource={resource} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", bgcolor: colors.gray[50], p: 4, borderRadius: 2, 
            border: `1px solid ${colors.gray[200]}` }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: colors.black, mb: 1 }}>
              No matching components found
            </Typography>
            <Typography sx={{ color: colors.gray[700], mb: 3 }}>
              Try adjusting your search criteria or browse all components.
            </Typography>
            <Button variant="contained" sx={{ bgcolor: colors.primary, color: colors.white,
              textTransform: "none", fontWeight: 600, py: 1, px: 3 }}>View All Components</Button>
          </Box>
        )}
        
        {/* High-Visibility CTA Section */}
        <Box sx={{ mt: 8, background: `linear-gradient(135deg, ${colors.premium}, ${colors.primaryDark})`,
          p: { xs: 4, md: 6 }, borderRadius: 3, textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          position: "relative", overflow: "hidden" }}>
          <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", 
            background: `linear-gradient(90deg, ${colors.primaryLight}, ${colors.premium})` }} />
          <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 150%, rgba(255,255,255,0.18) 0%, transparent 45%)" }} />
          
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Stars sx={{ fontSize: 48, color: colors.white, mb: 2, opacity: 0.9 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: colors.white,
              fontSize: { xs: "2rem", md: "2.5rem" }, textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
              Have Components to Share?
            </Typography>
            <Typography sx={{ maxWidth: "750px", mx: "auto", mb: 4, color: colors.white,
              fontSize: { xs: "1.1rem", md: "1.25rem" }, lineHeight: 1.6, fontWeight: 500 }}>
              Join our creator program and earn revenue every time someone uses your components.
              <Box component="span" sx={{ fontWeight: 700, display: "block", mt: 1, fontSize: { xs: "1.2rem", md: "1.4rem" } }}>
                Build once, earn forever.
              </Box>
            </Typography>
            <NextLink href="/creator" passHref>
              <Button variant="contained" size="large" startIcon={<Stars />}
                sx={{ bgcolor: colors.white, color: colors.premium, py: 1.8, px: { xs: 5, md: 8 }, 
                  fontSize: "1.2rem", borderRadius: 2, fontWeight: 800, boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  border: `2px solid ${alpha(colors.white, 0.9)}`, "&:hover": { bgcolor: alpha(colors.white, 0.9), 
                  transform: "translateY(-3px) scale(1.05)", boxShadow: "0 12px 24px rgba(0,0,0,0.2)" } }}>
                  Become a Creator
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Container>
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;