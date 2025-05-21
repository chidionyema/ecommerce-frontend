"use client";
import React, { useState, useMemo } from "react";
import {
  Box, Typography, Container, Grid, TextField, InputAdornment,
  Button, Chip, Card, alpha, useTheme, Skeleton // Skeleton is imported but not used in the provided code, can be removed if not needed
} from "@mui/material";
import { Search, ArrowForward, Stars, CheckCircle, InfoOutlined } from "@mui/icons-material";
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout"; // Adjust path if needed
// Assuming ResourceData is exported from this file
import { resourcesData, getTypeIcon, ResourceData } from "../../data/resourcesPageData"; // Added ResourceData import
import NextLink from "next/link";

// Helper for accessibility attributes on filter chips
const getChipAriaAttributes = (isActive: boolean) => ({
  role: "button",
  "aria-pressed": isActive,
  tabIndex: 0,
});

const ResourceCard = ({ resource }: { resource: ResourceData }) => { // Typed resource prop
  const theme = useTheme();
  const isPremium = resource.premium;
  const cardAccentColor = isPremium ? theme.palette.secondary.main : theme.palette.primary.main;

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '16px',
      transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: theme.shadows[6]
      }
    }}>
      {isPremium && (
        <Chip
          icon={<Stars sx={{ fontSize: '1.1rem', color: 'inherit' }} />}
          label="Premium"
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            backdropFilter: 'blur(3px)',
            borderRadius: '8px',
            zIndex: 1,
            '.MuiChip-icon': { color: 'inherit' }
          }}
        />
      )}

      <Box sx={{ p: { xs: 2, sm: 2.5 }, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          {getTypeIcon(resource.type, { sx: { color: 'text.secondary', fontSize: '1.25rem' } })}
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.5px' }}>
            {resource.type}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 1,
            minHeight: { xs: 'auto', sm: '3.6em' },
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
            color: 'text.primary'
          }}>
          {resource.title}
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 2.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" color="text.secondary" sx={{
          mb: 2.5,
          minHeight: { xs: 'auto', sm: '4.5em' },
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          textOverflow: 'ellipsis',
          flexGrow: 1
        }}>
          {resource.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          {["Performance optimized", "Production ready", "Long-term support"].map((point, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <CheckCircle fontSize="small" sx={{ color: cardAccentColor, opacity: 0.85 }} />
              <Typography variant="caption" component="span" color="text.secondary">
                {point}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* START: Added Price Display for Premium Resources */}
        {isPremium && resource.price && (
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              textAlign: 'center',
              my: 1.5,
            }}
          >
            {resource.price}
          </Typography>
        )}
        {/* END: Added Price Display */}

        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForward />}
          aria-label={
            isPremium
              ? resource.price
                ? `Get premium resource ${resource.title} for ${resource.price}`
                : `Access premium resource: ${resource.title}`
              : `View details for ${resource.title}`
          }
          sx={{
            mt: 'auto',
            bgcolor: cardAccentColor,
            color: theme.palette.getContrastText(cardAccentColor),
            fontWeight: 600,
            py: 1.25,
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: alpha(cardAccentColor, 0.85),
              transform: 'scale(1.02)',
            },
            transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out'
          }}
          // Example of how you might link it:
          // component={NextLink}
          // href={
          //   isPremium
          //     ? resource.price
          //       ? `/checkout/${resource.id}` // Or your purchase/unlock path
          //       : resource.link || `/resources/${resource.id}` // Fallback link for premium without price
          //     : resource.link || `/resources/${resource.id}` // Link for free resources
          // }
        >
          {isPremium
            ? resource.price
              ? `Unlock for ${resource.price}`
              : "Premium Access"
            : "View Details"}
        </Button>
      </Box>
    </Card>
  );
};


const ResourcesPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isPremiumFilterActive, setIsPremiumFilterActive] = useState(false);

  const allCategories = useMemo(() => ["all", ...new Set(resourcesData.flatMap(r => r.tags))], []);

  const filteredResources = useMemo(() => resourcesData.filter(r =>
    (!searchQuery || [r.title, r.description, ...r.tags].some(t =>
      t.toLowerCase().includes(searchQuery.toLowerCase())
    )) &&
    (activeCategory === "all" || r.tags.includes(activeCategory)) &&
    (!isPremiumFilterActive || r.premium)
  ), [searchQuery, activeCategory, isPremiumFilterActive]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const togglePremiumFilter = () => {
    setIsPremiumFilterActive(!isPremiumFilterActive);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };


  return (
    <ConsistentPageLayout>
      <Box sx={{ overflowX: 'hidden' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
          {/* Hero Section */}
          <Box sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            py: { xs: 5, sm: 6, md: 8 },
            mb: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: '12px', sm: '16px', md: '20px' },
            textAlign: 'center',
            px: { xs: 2, sm: 3 }
          }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: { xs: 1.5, sm: 2 },
                fontSize: {
                  xs: '2.2rem',
                  sm: '2.8rem',
                  md: '3.5rem'
                },
                letterSpacing: '-0.5px'
              }}>
              Build with Precision
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: { xs: 3, sm: 4 },
                opacity: 0.85,
                maxWidth: '720px',
                mx: 'auto',
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem'
                }
              }}>
              Discover meticulously crafted components, designed to elevate your digital experiences to the highest standard.
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Discover components, patterns, or guides..."
              aria-label="Search for resources"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: alpha(theme.palette.background.paper, 0.95),
                  borderRadius: '12px',
                  maxWidth: { xs: '100%', sm: '600px', md: '680px' },
                  mx: 'auto',
                  '&.Mui-focused': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.light, 0.5)}`,
                  },
                  '& input::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  }
                }
              }}
              sx={{ mb: { xs: 2, sm: 3 } }}
            />
          </Box>

          {/* Filters */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1.5, sm: 2 },
            mb: { xs: 3, sm: 4, md: 5 },
            alignItems: { xs: 'stretch', sm: 'center' },
            p: { xs: 1, sm: 0 }
          }}>
            <Chip
              label="Premium Resources"
              variant={isPremiumFilterActive ? "filled" : "outlined"}
              onClick={togglePremiumFilter}
              icon={<Stars fontSize="small" />}
              clickable
              sx={{
                borderColor: isPremiumFilterActive ? theme.palette.secondary.main : theme.palette.divider,
                bgcolor: isPremiumFilterActive ? theme.palette.secondary.main : 'transparent',
                color: isPremiumFilterActive ? theme.palette.secondary.contrastText : theme.palette.text.primary,
                '&:hover': {
                  bgcolor: isPremiumFilterActive ? alpha(theme.palette.secondary.main, 0.85) : alpha(theme.palette.text.primary, 0.05)
                },
                height: { xs: 40, sm: 'auto' }
              }}
              {...getChipAriaAttributes(isPremiumFilterActive)}
            />

            <Box
              role="group"
              aria-label="Filter by category"
              sx={{
                display: 'flex',
                gap: { xs: 1, sm: 1.5 },
                flexWrap: 'wrap',
                justifyContent: { xs: 'flex-start' }
              }}>
              {allCategories.map(tag => (
                <Chip
                  key={tag}
                  label={tag.charAt(0).toUpperCase() + tag.slice(1)}
                  variant={activeCategory === tag ? "filled" : "outlined"}
                  onClick={() => handleCategoryChange(tag)}
                  clickable
                  sx={{
                    borderColor: activeCategory === tag ? theme.palette.primary.main : theme.palette.divider,
                    bgcolor: activeCategory === tag ? theme.palette.primary.main : 'transparent',
                    color: activeCategory === tag ? theme.palette.primary.contrastText : theme.palette.text.primary,
                    '&:hover': {
                       bgcolor: activeCategory === tag ? alpha(theme.palette.primary.main, 0.85) : alpha(theme.palette.text.primary, 0.05)
                    },
                    height: { xs: 40, sm: 'auto' }
                  }}
                  {...getChipAriaAttributes(activeCategory === tag)}
                />
              ))}
            </Box>
          </Box>

          {/* Resources Grid / Empty State */}
          {filteredResources.length > 0 ? (
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {filteredResources.map(resource => (
                <Grid item xs={12} sm={6} md={4} key={resource.id}>
                  <ResourceCard resource={resource} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: { xs: 5, sm: 8 }, color: 'text.secondary' }}>
              <InfoOutlined sx={{ fontSize: '3rem', mb: 2, color: 'text.disabled' }} />
              <Typography variant="h6" component="p" sx={{ mb: 1, fontWeight: 500 }}>
                No Resources Found
              </Typography>
              <Typography variant="body1">
                Try adjusting your search query or filters.
              </Typography>
              {searchQuery && (
                <Button
                  variant="text"
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); setIsPremiumFilterActive(false); }}
                  sx={{ mt: 2, textTransform: 'none' }}
                >
                  Clear all filters and search
                </Button>
              )}
            </Box>
          )}

          {/* CTA - "Share Your Expertise" */}
          <Box sx={{
            mt: { xs: 6, sm: 8, md: 10 },
            py: { xs: 5, sm: 6, md: 8 },
            textAlign: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: alpha(theme.palette.primary.light, 0.05),
            borderRadius: { xs: '12px', sm: '16px' },
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 3 }
          }}>
            <Stars sx={{ fontSize: '2.5rem', color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h2" sx={{
              fontWeight: 600,
              mb: 1.5,
              fontSize: { xs: '1.8rem', sm: '2.2rem' }
            }}>
              Share Your Expertise
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{
              mb: 3,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}>
              Become a valued contributor to our growing ecosystem. Showcase your components and reach thousands of developers.
            </Typography>
            <NextLink href="/creator" passHref>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '10px',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: theme.shadows[4]
                  },
                  transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out'
                }}
                aria-label="Become a creator and share your expertise"
              >
                Become a Creator
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </ConsistentPageLayout>
  );
};

export default ResourcesPage;