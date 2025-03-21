// src/app/creator/[creatorId]/client.tsx
"use client";

import React, { useState } from "react";
import { 
  Box, Typography, Grid, Button, Card, CardContent, Divider, 
  Chip, Avatar, Rating, Tabs, Tab, alpha, useTheme, useMediaQuery,
  Paper, List, ListItem, TextField, InputAdornment
} from "@mui/material";
import { 
  Verified, GitHub, LinkedIn, Language, Twitter, FilterList, 
  Search, Star, LocationOn, CalendarToday
} from "@mui/icons-material";
import Link from "next/link";
import ConsistentPageLayout from "../../../components/Shared/ConsistentPageLayout";

// Design system colors
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", primaryDark: "#003388", white: "#FFFFFF",
  premium: "#2C58FF", success: "#22AA55", warning: "#FF9800",
  gray: { 50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#DDDDDD", 500: "#999999", 700: "#444444" }
};

// This is the Client Component that receives the creatorId from the Server Component
export default function CreatorProfileClient({ creatorId }: { creatorId: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for tabs and filtering
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock creator data
  const creator = {
    id: "creator-123",
    name: "Alex Johnson",
    avatar: "/images/avatar.jpg",
    bio: "Full stack developer with 10+ years experience specializing in React, Node.js, and cloud architecture.",
    profession: "Senior Software Engineer",
    location: "San Francisco, CA",
    memberSince: "2023-01-15",
    isVerified: true,
    skills: ["React", "Node.js", "TypeScript", "GraphQL", "AWS", "MongoDB"],
    stats: {
      totalSales: 854,
      totalGluStacks: 12,
      totalReviews: 176,
      averageRating: 4.7
    },
    socialLinks: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      website: "https://alexjohnson.dev"
    }
  };
  
  // Mock GluStacks data
  const gluStacks = [
    {
      id: "gs-001",
      title: "React Authentication System",
      description: "Complete authentication system with JWT, Google OAuth, and role-based access control",
      category: "frontend",
      price: 49.99,
      rating: 4.8,
      reviewCount: 56,
      tags: ["React", "Authentication", "JWT", "OAuth"],
      isPremium: true
    },
    {
      id: "gs-002",
      title: "Next.js E-commerce Dashboard",
      description: "Fully responsive admin dashboard for e-commerce applications",
      category: "frontend",
      price: 69.99,
      rating: 4.7,
      reviewCount: 42,
      tags: ["Next.js", "Dashboard", "E-commerce"],
      isPremium: true
    },
    {
      id: "gs-003",
      title: "Node.js REST API Boilerplate",
      description: "Production-ready Node.js REST API with Express and MongoDB",
      category: "backend",
      price: 39.99,
      rating: 4.6,
      reviewCount: 31,
      tags: ["Node.js", "Express", "MongoDB", "REST API"],
      isPremium: false
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  return (
    <ConsistentPageLayout title={`${creator.name} - GluStack Creator`}>
      {/* Creator Profile Header */}
      <Card sx={{ 
        border: `1px solid ${colors.gray[300]}`, 
        borderRadius: 2, 
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        mb: 4,
        overflow: 'hidden'
      }}>
        {/* Banner Background */}
        <Box sx={{ 
          height: 200, 
          bgcolor: alpha(colors.primary, 0.1),
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <Box sx={{ 
            position: 'absolute',
            left: { xs: '50%', md: 40 },
            transform: { xs: 'translateX(-50%)', md: 'none' },
            bottom: -64
          }}>
            <Avatar
              src={creator.avatar}
              alt={creator.name}
              sx={{ 
                width: 128, 
                height: 128, 
                border: `4px solid ${colors.white}`
              }}
            />
            {creator.isVerified && (
              <Verified 
                sx={{ 
                  position: 'absolute', 
                  bottom: 5, 
                  right: 5, 
                  color: colors.primary,
                  bgcolor: colors.white,
                  borderRadius: '50%'
                }} 
              />
            )}
          </Box>
        </Box>
        
        <CardContent sx={{ pt: 8, pb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {creator.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  {creator.profession}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  mb: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn fontSize="small" sx={{ color: colors.gray[500], mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {creator.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday fontSize="small" sx={{ color: colors.gray[500], mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      Member since 2023
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {creator.bio}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1, 
                  mb: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  {creator.skills.map((skill, index) => (
                    <Chip 
                      key={index} 
                      label={skill} 
                      size="small" 
                      sx={{ 
                        bgcolor: alpha(colors.primary, 0.1), 
                        color: colors.primary 
                      }} 
                    />
                  ))}
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1.5,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  {creator.socialLinks.github && (
                    <Button
                      href={creator.socialLinks.github}
                      target="_blank"
                      startIcon={<GitHub />}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        borderColor: colors.gray[300], 
                        color: colors.gray[700],
                        textTransform: 'none'
                      }}
                    >
                      GitHub
                    </Button>
                  )}
                  {creator.socialLinks.linkedin && (
                    <Button
                      href={creator.socialLinks.linkedin}
                      target="_blank"
                      startIcon={<LinkedIn />}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        borderColor: colors.gray[300], 
                        color: colors.gray[700],
                        textTransform: 'none'
                      }}
                    >
                      LinkedIn
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Paper elevation={0} sx={{ 
                bgcolor: alpha(colors.gray[100], 0.6),
                borderRadius: 2,
                p: 3
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Creator Stats
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary }}>
                        {creator.stats.totalGluStacks}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        GluStacks
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary }}>
                        {creator.stats.totalSales.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Sales
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary }}>
                        {creator.stats.averageRating.toFixed(1)}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Rating 
                          value={creator.stats.averageRating} 
                          precision={0.5} 
                          readOnly 
                          size="small"
                          sx={{ mr: 0.5 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({creator.stats.totalReviews})
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary }}>
                        2023
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Member Since
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: colors.primary,
                      color: colors.white,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1,
                      '&:hover': { bgcolor: colors.primaryLight }
                    }}
                  >
                    Contact Creator
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* GluStacks Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          GluStacks by {creator.name}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{
              '& .MuiTab-root': { 
                textTransform: 'none', 
                fontWeight: 600,
                fontSize: '1rem'
              }
            }}
          >
            <Tab label="All" />
            <Tab label="Frontend" />
            <Tab label="Backend" />
            <Tab label="Full Stack" />
          </Tabs>
        </Box>
        
        <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <TextField
            placeholder="Search GluStacks..."
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              )
            }}
            sx={{ flex: 1 }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ 
              borderColor: colors.gray[300], 
              color: colors.gray[700],
              textTransform: 'none',
              minWidth: 120
            }}
          >
            Filter
          </Button>
        </Box>
        
        {/* GluStacks Grid */}
        <Grid container spacing={3}>
          {gluStacks.map((stack) => (
            <Grid item xs={12} sm={6} md={4} key={stack.id}>
              <Card sx={{ 
                border: `1px solid ${colors.gray[300]}`,
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }
              }}>
                {stack.isPremium && (
                  <Box sx={{
                    position: 'absolute',
                    top: 16,
                    right: -36,
                    transform: 'rotate(45deg)',
                    width: 140,
                    textAlign: 'center',
                    bgcolor: colors.premium,
                    color: colors.white,
                    py: 0.5,
                    zIndex: 1,
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }}>
                    PREMIUM
                  </Box>
                )}
                
                <Box sx={{ 
                  height: 160, 
                  bgcolor: alpha(colors.primary, 0.05),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="body2" sx={{ color: colors.gray[500] }}>
                    [GluStack Preview]
                  </Typography>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 1 }}>
                    <Chip 
                      label={stack.category === 'frontend' ? 'Frontend' : 
                             stack.category === 'backend' ? 'Backend' : 'Full Stack'}
                      size="small"
                      sx={{ 
                        bgcolor: alpha(colors.primary, 0.1), 
                        color: colors.primary 
                      }}
                    />
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      color: 'inherit'
                    }}
                  >
                    <Link 
                      href={`/marketplace/glustack/${stack.id}`}
                      style={{ 
                        textDecoration: 'none', 
                        color: 'inherit'
                      }}
                    >
                      {stack.title}
                    </Link>
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2 }}
                  >
                    {stack.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {stack.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ 
                          bgcolor: colors.gray[100],
                          color: colors.gray[700],
                          fontSize: '0.7rem'
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ 
                    mt: 'auto', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary }}>
                      ${stack.price}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ color: colors.warning, fontSize: 18, mr: 0.5 }} />
                      <Typography variant="body2">
                        {stack.rating} ({stack.reviewCount})
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ConsistentPageLayout>
  );
}