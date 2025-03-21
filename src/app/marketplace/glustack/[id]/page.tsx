"use client";
import React, { useState } from "react";
import { Box, Typography, Container, Grid, Button, Card, CardContent, Chip, Tabs, Tab, Rating, Divider, Avatar, TextField, IconButton, Paper, List, ListItem, ListItemIcon, ListItemText, alpha, useMediaQuery, useTheme } from "@mui/material";
import { Stars, CheckCircle, Code, Storage, Description, PermIdentity, Share, ShoppingCart, Favorite, FavoriteBorder, ArrowBack, VerifiedUser, Update, Comment, Star } from "@mui/icons-material";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import ConsistentPageLayout from "../../../../components/Shared/ConsistentPageLayout";

// Consistent color system with your other pages
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", primaryDark: "#003388", white: "#FFFFFF", black: "#111111",
  premium: "#2C58FF", premiumLight: "#4F73FF", success: "#22AA55",
  gray: { 50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#DDDDDD", 400: "#BBBBBB", 500: "#999999", 600: "#777777", 700: "#444444", 900: "#111111" 
  }
};

// Style shortcuts
const sx = {
    btn: (color: string) => ({
        bgcolor: color,
        color: colors.white,
        textTransform: "none",
        fontWeight: 700,
        borderRadius: 1.5,
        boxShadow: `0 4px 8px ${alpha(color, 0.3)}`,
        "&:hover": {
          bgcolor: color === colors.premium ? colors.premiumLight : colors.primaryLight,
          boxShadow: `0 6px 12px ${alpha(color, 0.4)}`
        }
      }),
      
  card: { border: `1px solid ${colors.gray[300]}`, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", bgcolor: colors.white }
};

// In a real application, you would fetch this data based on the ID
const getGluStackData = (id: string) => ({

  id: id,
  title: "React Authentication System Pro",
  creator: "Sarah Johnson",
  creatorAvatar: "/api/placeholder/60/60",
  creatorVerified: true,
  type: "Frontend",
  description: "A complete, production-ready authentication system for React applications. Includes JWT-based authentication, social login integration, role-based access control, password reset flows, and protected routes.",
  longDescription: "This GluStack provides everything you need to implement secure, scalable authentication in your React applications. Built with industry best practices and regularly updated to address emerging security concerns.",
  features: [
    "JWT-based authentication with refresh tokens", "Social login (Google, GitHub, Facebook)", "Role-based access control system",
    "Complete password reset flow", "Account recovery options", "Protected route components", "User management dashboard",
    "Session management and tracking", "Comprehensive security measures"
  ],
  tags: ["React", "Authentication", "JWT", "Security"],
  premium: true,
  rating: 4.9,
  price: 59,
  dateCreated: "2024-03-15",
  lastUpdated: "2025-02-28",
  totalSales: 428,
  reviews: [
    { id: 1, user: "Alex Chen", avatar: "/api/placeholder/40/40", rating: 5, date: "March 10, 2025", content: "Incredible quality and documentation. Integrated with our project in less than a day." },
    { id: 2, user: "Maya Patel", avatar: "/api/placeholder/40/40", rating: 5, date: "March 5, 2025", content: "The best authentication system I've used. Clean code and excellent security practices." },
    { id: 3, user: "Jordan Lee", avatar: "/api/placeholder/40/40", rating: 4, date: "February 25, 2025", content: "Very solid overall. Would be perfect with better TypeScript support." }
  ],
  relatedGluStacks: [
    { id: "gs-002", title: "React Form Validation Bundle", premium: false, type: "Frontend", rating: 4.7, price: 39 },
    { id: "gs-003", title: "Backend API Security Kit", premium: true, type: "Backend", rating: 4.8, price: 49 },
    { id: "gs-004", title: "User Management Dashboard", premium: true, type: "Full Stack", rating: 4.6, price: 69 }
  ]
});

const GluStackDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  
  // Normalize id to a string and handle missing IDs
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!idParam) {
    // Redirect back if no ID was provided
    router.replace("/marketplace");
    return null;
  }
  
  const glustack = getGluStackData(idParam);
  
  const [activeTab, setActiveTab] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const isPremium = glustack.premium;
  const typeColor = isPremium ? colors.premium : colors.primary;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ConsistentPageLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumb & Back Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Button startIcon={<ArrowBack />} onClick={() => router.back()}
            sx={{ color: colors.gray[700], fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: colors.gray[100] } }}>
            Back to Marketplace
          </Button>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Left Column: GluStack Info */}
          <Grid item xs={12} md={8}>
            <Card sx={sx.card}>
              {/* Premium Badge */}
              {isPremium && (
                <Box sx={{ position: "absolute", top: 16, right: 16, bgcolor: colors.premium, color: colors.white, py: 0.5, px: 1.5,
                  borderRadius: 1, fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", zIndex: 2 }}>
                  <Stars sx={{ fontSize: 16, mr: 0.5 }} />PREMIUM
                </Box>
              )}

              {/* Header */}
              <Box sx={{ p: 3, pb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box sx={{ color: typeColor, bgcolor: alpha(typeColor, 0.1), p: 0.5, borderRadius: 1, mr: 1.5 }}><Code /></Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: colors.black, lineHeight: 1.2,
                    fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
                    {glustack.title}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating value={glustack.rating} precision={0.1} readOnly size="small" />
                    <Typography sx={{ ml: 1, fontWeight: 600, fontSize: "0.9rem" }}>
                      {glustack.rating} ({glustack.reviews.length} reviews)
                    </Typography>
                  </Box>
                  <Chip label={glustack.type} size="small" sx={{ bgcolor: alpha(typeColor, 0.1), color: typeColor, fontWeight: 600 }} />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Update sx={{ color: colors.gray[500], fontSize: 18, mr: 0.5 }} />
                    <Typography sx={{ fontSize: "0.85rem", color: colors.gray[500] }}>Updated {glustack.lastUpdated}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Creator Info */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Avatar src={glustack.creatorAvatar} alt={glustack.creator} sx={{ width: 48, height: 48, mr: 2 }} />
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ fontWeight: 600 }}>{glustack.creator}</Typography>
                      {glustack.creatorVerified && (<VerifiedUser sx={{ ml: 0.5, color: colors.primary, fontSize: 16 }} />)}
                    </Box>
                    <Typography sx={{ fontSize: "0.85rem", color: colors.gray[600] }}>Verified Creator</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Tabs Navigation */}
              <Box sx={{ px: 3 }}>
                <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} textColor="primary" indicatorColor="primary"
                  sx={{ borderBottom: `1px solid ${colors.gray[200]}`, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600,
                    fontSize: "0.95rem", minWidth: 0, px: { xs: 2, md: 3 }, py: 1.5 } }}>
                  <Tab label="Overview" />
                  <Tab label="Features" />
                  <Tab label="Reviews" />
                  <Tab label="Support" />
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Description</Typography>
                    <Typography sx={{ mb: 3, fontSize: "1rem", lineHeight: 1.6 }}>{glustack.description}</Typography>
                    <Typography sx={{ mb: 3, fontSize: "1rem", lineHeight: 1.6 }}>{glustack.longDescription}</Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Key Features</Typography>
                    <Grid container spacing={2}>
                      {glustack.features.slice(0, 4).map((feature, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                            <CheckCircle sx={{ color: colors.success, mr: 1.5, mt: 0.25, fontSize: 20 }} />
                            <Typography sx={{ fontSize: "0.95rem" }}>{feature}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    <Box component="img" src="/api/placeholder/800/400" alt="GluStack Preview"
                      sx={{ width: "100%", borderRadius: 2, mt: 4, border: `1px solid ${colors.gray[200]}` }} />
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Full Feature List</Typography>
                    <Grid container spacing={2}>
                      {glustack.features.map((feature, index) => (
                        <Grid item xs={12} key={index}>
                          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                            <CheckCircle sx={{ color: colors.success, mr: 1.5, mt: 0.25, fontSize: 20 }} />
                            <Box>
                              <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>{feature.split(":")[0] || feature}</Typography>
                              {feature.includes(":") && (
                                <Typography sx={{ fontSize: "0.9rem", color: colors.gray[700] }}>{feature.split(":")[1].trim()}</Typography>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Technical Specifications</Typography>
                    <Grid container spacing={3}>
                      {[
                        { label: "Framework", value: "React 18+" }, { label: "Dependencies", value: "Minimal external libraries" },
                        { label: "Browser Support", value: "All modern browsers" }, { label: "Bundle Size", value: "~45KB minified" },
                        { label: "TypeScript", value: "Full type definitions included" }, { label: "Documentation", value: "Comprehensive" }
                      ].map((spec, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>{spec.label}</Typography>
                            <Typography sx={{ fontSize: "0.9rem" }}>{spec.value}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {activeTab === 2 && (
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Customer Reviews</Typography>
                      <Button variant="outlined" size="small" sx={{ borderColor: colors.primary, color: colors.primary,
                        textTransform: "none", fontWeight: 600 }}>Write a Review</Button>
                    </Box>
                    <Box sx={{ mb: 4, p: 2, bgcolor: colors.gray[50], borderRadius: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mr: 2 }}>{glustack.rating}</Typography>
                        <Rating value={glustack.rating} precision={0.1} readOnly />
                      </Box>
                      <Typography sx={{ fontSize: "0.9rem", color: colors.gray[600] }}>Based on {glustack.reviews.length} reviews</Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    {glustack.reviews.map((review, index) => (
                      <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: index < glustack.reviews.length - 1 ? `1px solid ${colors.gray[200]}` : 'none' }}>
                        <Box sx={{ display: "flex", mb: 2 }}>
                          <Avatar src={review.avatar} alt={review.user} sx={{ width: 40, height: 40, mr: 2 }} />
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>{review.user}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Rating value={review.rating} size="small" readOnly />
                              <Typography sx={{ ml: 1, fontSize: "0.8rem", color: colors.gray[500] }}>{review.date}</Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Typography sx={{ fontSize: "0.95rem" }}>{review.content}</Typography>
                      </Box>
                    ))}
                    <Button variant="outlined" fullWidth sx={{ mt: 2, borderColor: colors.gray[300], color: colors.gray[700],
                      textTransform: "none", fontWeight: 600 }}>Load More Reviews</Button>
                  </Box>
                )}

                {activeTab === 3 && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Support & Documentation</Typography>
                    <Typography sx={{ mb: 3, fontSize: "1rem", lineHeight: 1.6 }}>
                      Every GluStack purchase includes comprehensive documentation and support from the creator. Here's what you can expect:
                    </Typography>
                    <List>
                      {[
                        "Detailed implementation guide", "Full API documentation", "Code examples and best practices",
                        "60-day creator support", "Community forum access", "Regular updates and improvements"
                      ].map((item, index) => (
                        <ListItem key={index} sx={{ py: 1, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle sx={{ color: colors.success }} /></ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Frequently Asked Questions</Typography>
                    {[
                      { q: "Do I get access to future updates?", a: "Yes, all purchases include lifetime access to updates for this GluStack." },
                      { q: "Can I use this in commercial projects?", a: "Yes, your purchase includes a commercial license for unlimited projects." },
                      { q: "What if I need custom modifications?", a: "Contact the creator directly through the platform for custom work inquiries." }
                    ].map((faq, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{faq.q}</Typography>
                        <Typography sx={{ fontSize: "0.95rem", color: colors.gray[700] }}>{faq.a}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>

          {/* Right Column: Purchase Info */}
          <Grid item xs={12} md={4}>
            <Card sx={{ ...sx.card, position: "sticky", top: 24, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>${glustack.price}</Typography>
                  <IconButton onClick={() => setFavorited(!favorited)} sx={{ color: favorited ? "#f44336" : colors.gray[400],
                    "&:hover": { color: favorited ? "#e57373" : colors.gray[600] } }}>
                    {favorited ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Box>
                <Button variant="contained" fullWidth startIcon={<ShoppingCart />}
                  sx={{ ...sx.btn(isPremium ? colors.premium : colors.primary), py: 1.5, mb: 2 }}>Add to Cart</Button>
                <NextLink href={`/checkout?id=${glustack.id}`} passHref>
                  <Button variant="contained" fullWidth sx={{ bgcolor: colors.black, color: colors.white, py: 1.5, mb: 3,
                    fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: alpha(colors.black, 0.8) } }}>Buy Now</Button>
                </NextLink>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontWeight: 700, mb: 1.5 }}>This purchase includes:</Typography>
                  <List dense disablePadding>
                    {["Full source code access", "Lifetime updates", "60-day creator support", 
                      "Comprehensive documentation", "Commercial license"].map((item, index) => (
                      <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle sx={{ fontSize: 18, color: colors.success }} /></ListItemIcon>
                        <ListItemText primary={item} primaryTypographyProps={{ sx: { fontSize: "0.9rem" } }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ShoppingCart sx={{ fontSize: 18, color: colors.gray[500], mr: 1 }} />
                    <Typography sx={{ fontSize: "0.85rem", color: colors.gray[700] }}>{glustack.totalSales}+ sales</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Update sx={{ fontSize: 18, color: colors.gray[500], mr: 1 }} />
                    <Typography sx={{ fontSize: "0.85rem", color: colors.gray[700] }}>Last updated {glustack.lastUpdated}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 3, mt: 2 }} />
                <Button variant="text" startIcon={<Share />} sx={{ color: colors.gray[700], textTransform: "none", fontWeight: 600,
                  p: 0, "&:hover": { bgcolor: "transparent", color: colors.primary } }}>Share this GluStack</Button>
              </CardContent>
            </Card>
            
            {/* Related GluStacks */}
            <Card sx={sx.card}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Related GluStacks</Typography>
                {glustack.relatedGluStacks.map((related, index) => (
                  <Box key={index} sx={{ mb: index < glustack.relatedGluStacks.length - 1 ? 2 : 0,
                    pb: index < glustack.relatedGluStacks.length - 1 ? 2 : 0,
                    borderBottom: index < glustack.relatedGluStacks.length - 1 ? `1px solid ${colors.gray[200]}` : 'none' }}>
                    <NextLink href={`/glustack/${related.id}`} passHref>
                      <Box sx={{ display: "flex", cursor: "pointer", "&:hover": { "& .glustack-title": { color: colors.primary } } }}>
                        <Box sx={{ minWidth: 50, mr: 1.5 }}>
                          <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: alpha(related.premium ? colors.premium : colors.primary, 0.1),
                            display: "flex", alignItems: "center", justifyContent: "center", 
                            color: related.premium ? colors.premium : colors.primary }}>
                            <Code fontSize="small" />
                          </Box>
                        </Box>
                        <Box>
                          <Typography className="glustack-title" sx={{ fontWeight: 600, fontSize: "0.95rem",
                            transition: "color 0.2s", mb: 0.5 }}>{related.title}</Typography>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            <Rating value={related.rating} size="small" readOnly />
                            <Typography sx={{ ml: 1, fontSize: "0.8rem", color: colors.gray[600] }}>{related.rating}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Chip label={related.type} size="small" sx={{ height: 20, fontSize: "0.7rem",
                              bgcolor: alpha(related.premium ? colors.premium : colors.primary, 0.1),
                              color: related.premium ? colors.premium : colors.primary }} />
                            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>${related.price}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </NextLink>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ConsistentPageLayout>
  );
};

export default GluStackDetailPage;