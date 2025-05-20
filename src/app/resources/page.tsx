"use client";
import React, { useState, useMemo } from "react";
import {
  Box, Typography, Container, Grid, TextField, InputAdornment,
  Button, Chip, Card, alpha, useTheme, Paper
} from "@mui/material";
import {
  Search, ArrowForward, Stars, CheckCircle, InfoOutlined,
  Code as CodeIcon,
  LockOutlined as LockIcon,
  VisibilityOutlined as VisibilityIcon
} from "@mui/icons-material";
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout"; // Assuming this is correctly providing AuthProvider
import { resourcesData, getTypeIcon, ResourceData } from "../../data/resourcesPageData";
import NextLink from "next/link";
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

// Helper for accessibility attributes on filter chips
const getChipAriaAttributes = (isActive: boolean) => ({
  role: "button",
  "aria-pressed": isActive,
  tabIndex: 0,
});

const ResourceCard = ({ resource }: { resource: ResourceData }) => {
  const theme = useTheme();
  const router = useRouter();
  const { isAuthenticated, isSubscribed } = useAuth();

  const isPremiumResource = resource.premium;
  const cardAccentColor = isPremiumResource ? theme.palette.secondary.main : theme.palette.primary.main;
  const premiumChipBgColor = isPremiumResource ? (theme.palette.secondary.dark || theme.palette.secondary.main) : theme.palette.secondary.main;

  const handleAccessCodeClick = () => {
    if (!resource.githubUrl) return;
    if (isSubscribed) {
      window.open(resource.githubUrl, '_blank', 'noopener,noreferrer');
    } else if (isAuthenticated) {
      router.push(`/pricing?resource=${resource.id}&action=access_code`);
    } else {
      const callbackUrl = `/pricing?resource=${resource.id}&action=access_code`;
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  };

  let codeButtonText = "Login for Code";
  let codeButtonIcon = <LockIcon sx={{ fontSize: '1.125rem' }} />;
  let codeButtonAriaLabel = `Login to access source code for ${resource.title}.`;

  if (isAuthenticated) {
    if (isSubscribed) {
      codeButtonText = "View Source Code";
      codeButtonIcon = <CodeIcon sx={{ fontSize: '1.125rem' }} />;
      codeButtonAriaLabel = `Access source code for ${resource.title}.`;
      if (isPremiumResource) {
        codeButtonAriaLabel = `Access premium source code for ${resource.title}.`;
      }
    } else {
      if (isPremiumResource) {
        codeButtonText = "Unlock Premium Code";
        codeButtonIcon = <Stars sx={{ fontSize: '1.125rem' }} />;
        codeButtonAriaLabel = `Upgrade to unlock premium source code for ${resource.title}.`;
      } else {
        codeButtonText = "Get Code Access";
        codeButtonIcon = <LockIcon sx={{ fontSize: '1.125rem' }} />;
        codeButtonAriaLabel = `Subscribe to get access to the source code for ${resource.title}.`;
      }
    }
  }

  const modernButtonRadius = '10px';
  const cardBorderRadius = '20px';
  const refinedTransition = `transform 0.3s ${theme.transitions.easing.easeInOut}, box-shadow 0.3s ${theme.transitions.easing.easeInOut}, border-color 0.3s ${theme.transitions.easing.easeInOut}, border-width 0.3s ${theme.transitions.easing.easeInOut}`;

  // Base styles for all cards
  const baseCardSx = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: cardBorderRadius,
    transition: refinedTransition,
    borderStyle: 'solid', // Important for border transitions
    boxShadow: theme.palette.mode === 'dark'
      ? `0px 3px 7px ${alpha(theme.palette.common.black, 0.25)}, 0px 6px 18px ${alpha(theme.palette.common.black, 0.18)}`
      : `0px 3px 7px ${alpha(theme.palette.grey[400], 0.25)}, 0px 6px 18px ${alpha(theme.palette.grey[300], 0.18)}`,
  };

  // Common hover effect for transform and base shadow enhancement
  const commonHoverSx = {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'dark'
      ? `0px 6px 12px ${alpha(theme.palette.common.black, 0.3)}, 0px 10px 28px ${alpha(theme.palette.common.black, 0.22)}`
      : `0px 6px 12px ${alpha(theme.palette.grey[500], 0.3)}, 0px 10px 28px ${alpha(theme.palette.grey[400], 0.22)}`,
  };

  // Conditional styling for the card
  const cardConditionalSx = isPremiumResource
    ? { // Premium card styles
        borderColor: theme.palette.secondary.main,
        borderWidth: '2px',
        '&:hover': {
          ...commonHoverSx,
          borderColor: alpha(theme.palette.secondary.dark || theme.palette.secondary.main, 0.9), // Intensify premium border on hover
          // Optional: More distinct shadow for premium hover
          boxShadow: theme.palette.mode === 'dark'
            ? `0px 7px 14px ${alpha(theme.palette.secondary.main, 0.4)}, 0px 12px 32px ${alpha(theme.palette.secondary.main, 0.3)}`
            : `0px 7px 14px ${alpha(theme.palette.secondary.main, 0.3)}, 0px 12px 32px ${alpha(theme.palette.secondary.main, 0.25)}`,
        },
      }
    : { // Non-premium card styles
        borderColor: theme.palette.divider,
        borderWidth: '1px',
        '&:hover': commonHoverSx,
      };

  return (
    <Card sx={{ ...baseCardSx, ...cardConditionalSx }}>
      {isPremiumResource && (
        <Chip
          icon={<Stars sx={{ fontSize: '1rem', color: 'inherit' }} />}
          label="Premium"
          size="small"
          sx={{
            position: 'absolute',
            top: 18, // Adjusted slightly due to thicker border potential
            right: 18,
            bgcolor: premiumChipBgColor,
            color: theme.palette.getContrastText(premiumChipBgColor),
            backdropFilter: 'blur(4px)',
            borderRadius: '7px',
            zIndex: 1,
            fontSize: '0.7rem',
            height: 'auto',
            py: 0.35,
            px: 1,
            letterSpacing: '0.3px',
            '.MuiChip-icon': { ml: '4px', mr: '-2px' }
          }}
        />
      )}

      <Box sx={{ p: { xs: 2.5, sm: 3 }, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          {getTypeIcon(resource.type, { sx: { color: 'text.secondary', fontSize: '1.35rem' } })}
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: '0.5px', fontSize: '0.7rem' }}>
            {resource.type.toUpperCase()}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            minHeight: { xs: 'auto', sm: '3.3em' },
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
            color: 'text.primary',
            lineHeight: 1.35,
          }}>
          {resource.title}
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2.5, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" sx={{
          mb: 3,
          minHeight: { xs: 'auto', sm: '4.8em' },
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          textOverflow: 'ellipsis',
          flexGrow: 1,
          lineHeight: 1.65,
          fontSize: '0.9rem',
          color: 'text.secondary',
        }}>
          {resource.description}
        </Typography>
        <Box sx={{ mb: 3.5 }}>
          {["Performance optimized", "Production ready", "Long-term support"].map((point, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1.25 }}>
              <CheckCircle fontSize="small" sx={{ color: alpha(cardAccentColor, 0.9), opacity: 1 }} />
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                {point}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 'auto', pt: 1.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<VisibilityIcon sx={{ fontSize: '1.25rem' }} />}
            href={resource.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View demo for ${resource.title}`}
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              py: 1.375,
              borderRadius: modernButtonRadius,
              textTransform: 'none',
              borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.25) : alpha(theme.palette.common.black, 0.23),
              color: theme.palette.text.primary,
              transition: `all 0.3s ${theme.transitions.easing.easeInOut}`,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: 'scale(1.015)',
                boxShadow: `0 1px 6px ${alpha(theme.palette.primary.main, 0.1)}`,
              },
            }}
          >
            View Demo
          </Button>
          {resource.githubUrl && (
            <Button
              fullWidth
              variant="contained"
              startIcon={codeButtonIcon}
              onClick={handleAccessCodeClick}
              aria-label={codeButtonAriaLabel}
              sx={{
                bgcolor: cardAccentColor,
                color: theme.palette.getContrastText(cardAccentColor),
                fontWeight: 600,
                fontSize: '0.9rem',
                py: 1.375,
                borderRadius: modernButtonRadius,
                textTransform: 'none',
                boxShadow: `0 3px 9px ${alpha(cardAccentColor, 0.25)}`,
                transition: `all 0.3s ${theme.transitions.easing.easeInOut}`,
                '&:hover': {
                  bgcolor: alpha(cardAccentColor, 0.88),
                  transform: 'scale(1.015) translateY(-1px)',
                  boxShadow: `0 5px 14px ${alpha(cardAccentColor, 0.35)}`,
                },
              }}
            >
              {codeButtonText}
            </Button>
          )}
        </Box>
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
        <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 5, md: 6 } }}>
          {/* Hero Section */}
          <Box sx={{
            background: `linear-gradient(140deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.primary.dark, 0.85)} 100%)`,
            color: theme.palette.primary.contrastText,
            py: { xs: 6, sm: 8, md: 10 },
            mb: { xs: 4, sm: 5, md: 6 },
            borderRadius: { xs: '16px', sm: '20px', md: '24px' },
            textAlign: 'center',
            px: { xs: 2, sm: 4 },
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: { xs: 2, sm: 2.5 },
                fontSize: { xs: '2.3rem', sm: '3rem', md: '3.8rem' },
                letterSpacing: '-0.5px',
                textShadow: `1px 1px 2px ${alpha(theme.palette.common.black, 0.1)}`
              }}>
              Build with Precision
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: { xs: 3.5, sm: 4.5 },
                opacity: 0.9,
                maxWidth: '760px',
                mx: 'auto',
                fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.3rem' },
                lineHeight: 1.6
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
                    <Search sx={{ color: theme.palette.primary.contrastText, opacity: 0.7 }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: alpha(theme.palette.common.white, 0.15),
                  borderRadius: '12px',
                  maxWidth: { xs: '100%', sm: '640px', md: '720px' },
                  mx: 'auto',
                  color: theme.palette.primary.contrastText,
                  '& fieldset': {
                    borderColor: alpha(theme.palette.primary.contrastText, 0.3),
                  },
                  '&:hover fieldset': {
                    borderColor: alpha(theme.palette.primary.contrastText, 0.6),
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.contrastText,
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.contrastText, 0.2)}`,
                  },
                  '& input::placeholder': {
                    color: alpha(theme.palette.primary.contrastText, 0.7),
                    opacity: 1,
                  }
                }
              }}
              sx={{ mb: { xs: 2, sm: 3 } }}
            />
          </Box>

          <Paper elevation={0} sx={{
            p: { xs: 1.5, sm: 2.5 },
            mb: { xs: 4, sm: 5, md: 6 },
            borderRadius: '16px',
            border: `1px solid ${theme.palette.divider}`
           }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                Filter Resources
              </Typography>
               <Chip
                label="Premium Resources"
                variant={isPremiumFilterActive ? "filled" : "outlined"}
                onClick={togglePremiumFilter}
                icon={<Stars fontSize="small" />}
                clickable
                size="medium"
                sx={{
                  borderColor: isPremiumFilterActive ? theme.palette.secondary.main : theme.palette.divider,
                  bgcolor: isPremiumFilterActive ? theme.palette.secondary.main : 'transparent',
                  color: isPremiumFilterActive ? theme.palette.secondary.contrastText : theme.palette.text.primary,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: isPremiumFilterActive ? alpha(theme.palette.secondary.main, 0.85) : alpha(theme.palette.text.primary, 0.05)
                  },
                  borderRadius: '8px',
                }}
                {...getChipAriaAttributes(isPremiumFilterActive)}
              />
            </Box>
            <Box
              role="group"
              aria-label="Filter by category"
              sx={{
                display: 'flex',
                gap: { xs: 1, sm: 1.5 },
                flexWrap: 'wrap',
              }}>
              {allCategories.map(tag => (
                <Chip
                  key={tag}
                  label={tag.charAt(0).toUpperCase() + tag.slice(1)}
                  variant={activeCategory === tag ? "filled" : "outlined"}
                  onClick={() => handleCategoryChange(tag)}
                  clickable
                  size="medium"
                  sx={{
                    borderColor: activeCategory === tag ? theme.palette.primary.main : theme.palette.divider,
                    bgcolor: activeCategory === tag ? theme.palette.primary.main : 'transparent',
                    color: activeCategory === tag ? theme.palette.primary.contrastText : theme.palette.text.primary,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                       bgcolor: activeCategory === tag ? alpha(theme.palette.primary.main, 0.85) : alpha(theme.palette.text.primary, 0.05)
                    },
                    borderRadius: '8px',
                    fontWeight: 500,
                  }}
                  {...getChipAriaAttributes(activeCategory === tag)}
                />
              ))}
            </Box>
          </Paper>

          {filteredResources.length > 0 ? (
            <Grid container spacing={{ xs: 2.5, sm: 3, md: 3.5 }}>
              {filteredResources.map(resource => (
                <Grid item xs={12} sm={6} md={4} key={resource.id}>
                  <ResourceCard resource={resource as ResourceData} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: { xs: 6, sm: 10 }, color: 'text.secondary' }}>
              <InfoOutlined sx={{ fontSize: '3.5rem', mb: 2.5, color: 'text.disabled' }} />
              <Typography variant="h5" component="p" sx={{ mb: 1.5, fontWeight: 600 }}>
                No Resources Found
              </Typography>
              <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.7 }}>
                Looks like we couldn't find anything matching your criteria. <br />
                Try adjusting your search or exploring all categories.
              </Typography>
              {searchQuery && (
                <Button
                  variant="outlined"
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); setIsPremiumFilterActive(false); }}
                  sx={{ mt: 2, textTransform: 'none', fontWeight: 600, borderRadius: '8px', py:1, px:2 }}
                >
                  Clear Search & Filters
                </Button>
              )}
            </Box>
          )}

          <Box sx={{
            mt: { xs: 8, sm: 10, md: 12 },
            py: { xs: 6, sm: 8, md: 10 },
            textAlign: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            borderRadius: { xs: '16px', sm: '20px' },
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 4 },
            boxShadow: `0 -4px 20px ${alpha(theme.palette.divider, 0.1)}`
          }}>
            <Stars sx={{ fontSize: '3rem', color: 'primary.main', mb: 2.5 }} />
            <Typography variant="h3" component="h2" sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem' }
            }}>
              Share Your Expertise
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{
              mb: 4,
              maxWidth: '640px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.7
            }}>
              Become a valued contributor to our growing ecosystem. Showcase your components and reach thousands of developers.
            </Typography>
            <NextLink href="/creator" passHref legacyBehavior>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 1.75,
                  px: 5,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '12px',
                  boxShadow: theme.shadows[3],
                  transition: 'all 0.25s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03) translateY(-2px)',
                    boxShadow: theme.shadows[6]
                  },
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