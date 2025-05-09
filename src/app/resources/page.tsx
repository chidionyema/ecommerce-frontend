"use client";
import React, { useState, useMemo } from "react";
import { 
  Box, Typography, Container, Grid, TextField, InputAdornment, 
  Button, Chip, Card, alpha, useTheme 
} from "@mui/material";
import { Search, ArrowForward, Stars, CheckCircle } from "@mui/icons-material";
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout";
import { resourcesData, getTypeIcon } from "../../data/resourcesPageData";
import NextLink from "next/link";

const ResourceCard = ({ resource }: { resource: any }) => {
  const theme = useTheme();
  const isPremium = resource.premium;
  const primaryColor = isPremium ? theme.palette.primary.dark : theme.palette.primary.main;

  return (
    <Card sx={{
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '12px',
      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': { transform: 'translateY(-4px)' }
    }}>
      {isPremium && (
        <Chip
          icon={<Stars />}
          label="Premium"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: alpha(theme.palette.primary.dark, 0.9),
            color: 'white',
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      <Box sx={{ p: 2.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          {getTypeIcon(resource.type)}
          <Typography variant="overline" color="text.secondary">
            {resource.type}
          </Typography>
        </Box>
        
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          mb: 1.5,
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitLineClamp: 2
        }}>
          {resource.title}
        </Typography>
      </Box>

      <Box sx={{ p: 2.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 2.5,
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitLineClamp: 3
        }}>
          {resource.description}
        </Typography>

        <Box sx={{ mb: 3 }}>
          {["Performance optimized", "Production ready", "Long-term support"].map((point, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <CheckCircle fontSize="small" sx={{ color: primaryColor, mr: 1.5 }} />
              <Typography variant="body2">{point}</Typography>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForward />}
          sx={{ 
            bgcolor: primaryColor,
            '&:hover': { bgcolor: alpha(primaryColor, 0.9) }
          }}
        >
          {isPremium ? "Premium Access" : "View Details"}
        </Button>
      </Box>
    </Card>
  );
};

const ResourcesPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isPremium, setIsPremium] = useState(false);

  const filteredResources = useMemo(() => resourcesData.filter(r => 
    (!searchQuery || [r.title, r.description, ...r.tags].some(t => 
      t.toLowerCase().includes(searchQuery.toLowerCase())
    )) &&
    (activeCategory === "all" || r.tags.includes(activeCategory)) && 
    (!isPremium || r.premium)
  ), [searchQuery, activeCategory, isPremium]);

  return (
    <ConsistentPageLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 4,
          borderRadius: 3,
          textAlign: 'center'
        }}>
          <Typography variant="h3" sx={{ fontWeight: 500, mb: 2 }}>
            Build with Precision
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Curated components for exceptional digital experiences
          </Typography>

          <TextField
            fullWidth
            placeholder="Discover components..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              sx: { 
                bgcolor: 'background.paper',
                borderRadius: '8px',
                maxWidth: '680px',
                mx: 'auto'
              }
            }}
            sx={{ mb: 3 }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/* Filters */}
        <Box sx={{ 
          display: 'flex',
          gap: 2,
          mb: 4,
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <Chip
            label="Premium"
            variant={isPremium ? "filled" : "outlined"}
            onClick={() => setIsPremium(!isPremium)}
            icon={<Stars fontSize="small" />}
          />
          
          {["all", ...new Set(resourcesData.flatMap(r => r.tags))].map(tag => (
            <Chip
              key={tag}
              label={tag}
              variant={activeCategory === tag ? "filled" : "outlined"}
              onClick={() => setActiveCategory(tag)}
            />
          ))}
        </Box>

        {/* Resources Grid */}
        <Grid container spacing={3}>
          {filteredResources.map(resource => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <ResourceCard resource={resource} />
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ 
          mt: 8,
          py: 8,
          textAlign: 'center',
          borderTop: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
            Share Your Expertise
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Contribute to our ecosystem and reach thousands of developers
          </Typography>
          <NextLink href="/creator" passHref>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Stars />}
            >
              Become a Creator
            </Button>
          </NextLink>
        </Box>
      </Container>
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;