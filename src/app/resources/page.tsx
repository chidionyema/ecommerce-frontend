"use client";
import React, { useState, useMemo } from "react";
import {
  Box, Typography, Container, Grid, TextField, InputAdornment,
  Button, Chip, Card, alpha, useTheme, Skeleton
} from "@mui/material";
import { Search, ArrowForward, Stars, CheckCircle, InfoOutlined } from "@mui/icons-material"; // Added InfoOutlined for empty state
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout";
import { resourcesData, getTypeIcon } from "../../data/resourcesPageData"; // Assume getTypeIcon returns accessible SVGs or has aria attributes
import NextLink from "next/link";

// Helper for accessibility attributes on filter chips
const getChipAriaAttributes = (isActive: boolean) => ({
  role: "button", // Makes it clear it's interactive
  "aria-pressed": isActive,
  tabIndex: 0, // Make it focusable
});

const ResourceCard = ({ resource }: { resource: any }) => {
  const theme = useTheme();
  const isPremium = resource.premium;
  // Use a more specific primary color from the theme, or ensure `main` and `dark` are well-contrasted
  const cardAccentColor = isPremium ? theme.palette.secondary.main : theme.palette.primary.main; // Example: using secondary for premium distinction

  return (
    <Card sx={{
      height: '100%', // Ensure cards in a row are same height
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '16px', // Slightly larger, more modern radius
      transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: theme.shadows[6] // More pronounced shadow on hover
      }
    }}>
      {isPremium && (
        <Chip
          icon={<Stars sx={{ fontSize: '1.1rem', color: 'inherit' }} />} // Ensure icon scales with chip and inherits color
          label="Premium"
          size="small" // Keep it unobtrusive
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            // Using a vibrant, distinct color for premium indication
            bgcolor: theme.palette.secondary.main, // Or a specific gold/premium color
            color: theme.palette.secondary.contrastText,
            backdropFilter: 'blur(3px)',
            borderRadius: '8px', // Softer radius for the chip
            zIndex: 1, // Ensure it's above other elements if overlap occurs
            '.MuiChip-icon': { color: 'inherit' }
          }}
        />
      )}

      <Box sx={{ p: { xs: 2, sm: 2.5 }, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          {/* Assuming getTypeIcon returns an accessible SVG icon with appropriate aria-label if needed */}
          {getTypeIcon(resource.type, { sx: { color: 'text.secondary', fontSize: '1.25rem' } })}
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.5px' }}>
            {resource.type}
          </Typography>
        </Box>

        {/* Using component="h2" for semantic heading structure within the card context */}
        <Typography
          variant="h6"
          component="h2" // Important for accessibility and SEO
          sx={{
            fontWeight: 600,
            mb: 1,
            minHeight: { xs: 'auto', sm: '3.6em' }, // Approx 2 lines for h6, adjust based on font
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // Keep to 2 lines to avoid excessive truncation
            textOverflow: 'ellipsis',
            color: 'text.primary'
          }}>
          {resource.title}
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 2.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" color="text.secondary" sx={{
          mb: 2.5,
          minHeight: { xs: 'auto', sm: '4.5em' }, // Approx 3 lines for body2, adjust based on font
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3, // Keep to 3 lines
          textOverflow: 'ellipsis',
          flexGrow: 1 // Allows description to take up available space before feature list
        }}>
          {resource.description}
        </Typography>

        <Box sx={{ mb: 3 }}>
          {/* Ensure these points are truly unique selling points per card, or part of a generic list */}
          {["Performance optimized", "Production ready", "Long-term support"].map((point, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <CheckCircle fontSize="small" sx={{ color: cardAccentColor, opacity: 0.85 }} />
              <Typography variant="caption" component="span" color="text.secondary"> {/* Using caption for finer text */}
                {point}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForward />}
          aria-label={isPremium ? `Access premium resource: ${resource.title}` : `View details for ${resource.title}`}
          sx={{
            mt: 'auto', // Push button to the bottom
            bgcolor: cardAccentColor,
            color: theme.palette.getContrastText(cardAccentColor),
            fontWeight: 600,
            py: 1.25,
            borderRadius: '8px',
            textTransform: 'none', // More modern feel
            '&:hover': {
              bgcolor: alpha(cardAccentColor, 0.85),
              transform: 'scale(1.02)', // Subtle hover effect
            },
            transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out'
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
  const [isPremiumFilterActive, setIsPremiumFilterActive] = useState(false); // Renamed for clarity

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
      <Box sx={{ overflowX: 'hidden' }}> {/* Prevent horizontal scroll on overall page */}
        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
          {/* Hero Section */}
          <Box sx={{
            bgcolor: 'primary.main', // Or a gradient, or image background for more flair
            color: 'primary.contrastText',
            py: { xs: 5, sm: 6, md: 8 },
            mb: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: '12px', sm: '16px', md: '20px' }, // Responsive border radius
            textAlign: 'center',
            px: { xs: 2, sm: 3 }
          }}>
            <Typography
              variant="h2" // Upgraded for impact, will scale down
              component="h1" // Main heading of the page
              sx={{
                fontWeight: 700, // Bolder for hero
                mb: { xs: 1.5, sm: 2 },
                fontSize: { // Responsive font size
                  xs: '2.2rem',
                  sm: '2.8rem',
                  md: '3.5rem'
                },
                letterSpacing: '-0.5px' // Subtle refinement
              }}>
              Build with Precision
            </Typography>
            <Typography
              variant="h6" // Adjusted for better hierarchy
              component="p"
              sx={{
                mb: { xs: 3, sm: 4 },
                opacity: 0.85,
                maxWidth: '720px', // Constrain line length for readability
                mx: 'auto',
                fontSize: { // Responsive font size
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem'
                }
              }}>
              Discover meticulously crafted components, designed to elevate your digital experiences to the highest standard.
            </Typography>

            <TextField
              fullWidth
              variant="outlined" // Standard variant is usually better for accessibility unless heavily customized
              placeholder="Discover components, patterns, or guides..."
              aria-label="Search for resources" // Crucial for accessibility
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: alpha(theme.palette.background.paper, 0.95), // Slightly transparent for depth
                  borderRadius: '12px', // Softer radius
                  maxWidth: { xs: '100%', sm: '600px', md: '680px' }, // Responsive max width
                  mx: 'auto',
                  '&.Mui-focused': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.light, 0.5)}`, // Custom focus ring
                  },
                  '& input::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  }
                }
              }}
              sx={{ mb: { xs: 2, sm: 3 } }} // Responsive margin bottom
            />
          </Box>

          {/* Filters */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, row on larger
            gap: { xs: 1.5, sm: 2 },
            mb: { xs: 3, sm: 4, md: 5 },
            alignItems: { xs: 'stretch', sm: 'center' }, // Stretch chips full width on mobile if desired, or 'flex-start'
            p: { xs: 1, sm: 0 } // Padding for mobile filter container
          }}>
            <Chip
              label="Premium Resources"
              variant={isPremiumFilterActive ? "filled" : "outlined"}
              onClick={togglePremiumFilter}
              icon={<Stars fontSize="small" />}
              clickable // Makes it behave more like a button
              sx={{
                borderColor: isPremiumFilterActive ? theme.palette.secondary.main : theme.palette.divider,
                bgcolor: isPremiumFilterActive ? theme.palette.secondary.main : 'transparent',
                color: isPremiumFilterActive ? theme.palette.secondary.contrastText : theme.palette.text.primary,
                '&:hover': {
                  bgcolor: isPremiumFilterActive ? alpha(theme.palette.secondary.main, 0.85) : alpha(theme.palette.text.primary, 0.05)
                },
                height: { xs: 40, sm: 'auto' } // Consistent height for mobile
              }}
              {...getChipAriaAttributes(isPremiumFilterActive)} // Accessibility
            />

            <Box
              role="group" // Group related filter buttons
              aria-label="Filter by category"
              sx={{
                display: 'flex',
                gap: { xs: 1, sm: 1.5 },
                flexWrap: 'wrap', // Allow tags to wrap
                justifyContent: { xs: 'flex-start' } // Align tags on mobile
              }}>
              {allCategories.map(tag => (
                <Chip
                  key={tag}
                  label={tag.charAt(0).toUpperCase() + tag.slice(1)} // Capitalize
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
                    height: { xs: 40, sm: 'auto' } // Consistent height for mobile
                  }}
                  {...getChipAriaAttributes(activeCategory === tag)} // Accessibility
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
            bgcolor: alpha(theme.palette.primary.light, 0.05), // Subtle background tint
            borderRadius: { xs: '12px', sm: '16px' }, // Consistent rounding
            mx: { xs: -2, sm: 0 }, // Extend to edges on mobile if container has padding
            px: { xs: 2, sm: 3 }
          }}>
            <Stars sx={{ fontSize: '2.5rem', color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h2" sx={{ // Adjusted heading level
              fontWeight: 600, // Semi-bold
              mb: 1.5,
              fontSize: { xs: '1.8rem', sm: '2.2rem' } // Responsive font size
            }}>
              Share Your Expertise
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{
              mb: 3,
              maxWidth: '600px', // Readability
              mx: 'auto',
              fontSize: { xs: '0.95rem', sm: '1rem' } // Responsive font size
            }}>
              Become a valued contributor to our growing ecosystem. Showcase your components and reach thousands of developers.
            </Typography>
            <NextLink href="/creator" passHref legacyBehavior>
              <Button
                variant="contained" // More prominent CTA
                color="primary"
                size="large"
                // startIcon={<Stars />} // Icon can be redundant if there's one above
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 600,
                  textTransform: 'none', // Modern feel
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

