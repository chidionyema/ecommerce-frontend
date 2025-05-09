"use client";
import React, { useState } from "react";
import { Box, Typography, Container, Grid, Button, Card, CardContent, List, ListItem, 
  ListItemIcon, ListItemText, Paper } from "@mui/material";
import { VerifiedUser, AttachMoney, Stars, CheckCircle, Web, Storage, DeviceHub, ShoppingCart, 
  HealthAndSafety, AccountBalance, School } from "@mui/icons-material";
import NextLink from "next/link";
import ConsistentPageLayout from "../../components/Shared/ConsistentPageLayout";

// Optimized high-contrast color palette
const cp = {
  primary: { main: "#1a56db", light: "#3b82f6", dark: "#1e40af" },
  secondary: { main: "#0369a1", light: "#0ea5e9", dark: "#075985" },
  premium: { main: "#2C58FF", light: "#4F73FF", dark: "#1E3ECC" },
  neutral: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 
    500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827" },
  success: { main: "#059669", light: "#10b981", dark: "#047857" },
  text: "#111827", 
  lightText: "#ffffff",
  background: "#ffffff",
  cardDark: "#0c2461",        // Darker blue for card backgrounds
  cardText: "#ffffff",        // White text for dark cards
  cardLightBg: "#1e3799",     // Slightly lighter blue for better contrast
  cardListItem: "rgba(255, 255, 255, 0.9)" // Off-white for list items
};

// Optimized standards data
const standardsData = [
  { id: "frontend", category: "Technology", title: "Frontend", icon: <Web fontSize="large" sx={{ color: cp.primary.main }} />,
    standards: ["Mobile-First Responsive Design", "Accessible UI Components (WCAG AA)", 
      "Modern CSS Architecture", "Progressive Web App Support", "Cross-Browser Compatibility"] },
  { id: "backend", category: "Technology", title: "Backend", icon: <Storage fontSize="large" sx={{ color: cp.primary.main }} />,
    standards: ["API Security & Authentication", "Database Optimization", "Scalable Architecture", 
      "Comprehensive Documentation", "Error Handling & Logging"] },
  { id: "fullstack", category: "Technology", title: "Full Stack", icon: <DeviceHub fontSize="large" sx={{ color: cp.primary.main }} />,
    standards: ["End-to-End Testing", "Infrastructure as Code", "Continuous Integration/Deployment", 
      "Microservices Architecture", "Event-Driven Development"] },
  { id: "ecommerce", category: "Industry", title: "E-commerce", icon: <ShoppingCart fontSize="large" sx={{ color: cp.secondary.main }} />,
    standards: ["Secure Payment Processing", "Inventory Management", "User Account Security", 
      "Order Processing Workflow", "Product Catalog Optimization"] },
  { id: "healthcare", category: "Industry", title: "Healthcare", icon: <HealthAndSafety fontSize="large" sx={{ color: cp.secondary.main }} />,
    standards: ["HIPAA Compliance", "Patient Data Security", "Medical Records Integration", 
      "Appointment Scheduling", "Telehealth Capabilities"] },
  { id: "finance", category: "Industry", title: "Finance", icon: <AccountBalance fontSize="large" sx={{ color: cp.secondary.main }} />,
    standards: ["Financial Data Security", "Transaction Processing", "Regulatory Compliance", 
      "Real-Time Analytics", "Risk Assessment Tools"] },
  { id: "education", category: "Industry", title: "Education", icon: <School fontSize="large" sx={{ color: cp.secondary.main }} />,
    standards: ["Learning Management Systems", "Student Progress Tracking", "Interactive Learning Tools", 
      "Classroom Management", "Assignment Submission"] }
];

const BecomeACreatorPage = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const activeStandard = standardsData.find(item => item.id === activeTab);

  return (
    <ConsistentPageLayout>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Paper elevation={0} sx={{ 
          bgcolor: cp.primary.main, 
          color: "white", 
          p: 6, 
          borderRadius: 2, 
          mb: 6,
          backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.9) 100%)" 
        }}>
          <Box sx={{ textAlign: "center", maxWidth: "800px", mx: "auto" }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 700, 
              fontSize: { xs: "2.25rem", md: "3rem" }, 
              mb: 3,
              textShadow: "0 1px 2px rgba(0,0,0,0.1)" 
            }}>
              Share Your Expertise. Empower the Community. Earn.
            </Typography>
            <Typography variant="h6" sx={{ 
              fontSize: "1.25rem", 
              lineHeight: 1.6, 
              mb: 4, 
              fontWeight: 400 
            }}>
              Become a GluStack Creator and help developers build amazing things, faster. 
              Earn a share of every sale while establishing yourself in the community.
            </Typography>
            <NextLink href="/creator/apply" passHref>
              <Button variant="contained" size="large" sx={{ 
                px: 5, 
                py: 1.5, 
                borderRadius: "8px", 
                fontWeight: 600,
                textTransform: "none", 
                backgroundColor: "white", 
                color: cp.primary.dark,
                "&:hover": { backgroundColor: cp.neutral[100] }, 
                fontSize: "1.125rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
              }}>
                Apply Now
              </Button>
            </NextLink>
          </Box>
        </Paper>

        {/* Benefits Section — UPDATED ONLY HERE */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" sx={{ 
            fontWeight: 700, 
            mb: 5, 
            color: cp.text,
            fontSize: { xs: "1.875rem", md: "2.25rem" } 
          }}>
            Why Become a GluStack Creator?
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: <VerifiedUser sx={{ fontSize: 60, color: "#ffffff", mb: 2 }} />, 
                title: "Reach a Wide Audience", 
                desc: "Your components will reach thousands of developers globally. Build a following and establish yourself as an industry expert." },
              { icon: <AttachMoney sx={{ fontSize: 60, color: "#50fa7b", mb: 2 }} />, 
                title: "Earn Passive Income", 
                desc: "Get paid every time someone purchases your GluStack. Create once, earn repeatedly as more developers discover your work." },
              { icon: <Stars sx={{ fontSize: 60, color: "#ffdd59", mb: 2 }} />, 
                title: "Build Your Reputation", 
                desc: "Join our featured creators program, receive recognition, and open doors to consulting and career advancement." }
            ].map((benefit, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card elevation={2} sx={{ 
                  height: "100%", 
                  borderRadius: 2,
                  backgroundColor: cp.cardDark,
                  color: cp.cardText,
                  "&:hover": { transform: "translateY(-4px)", transition: "transform 0.2s" }
                }}>
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    {benefit.icon}
                    <Typography variant="h5" sx={{ 
                      mb: 2, 
                      fontWeight: 600, 
                      color: cp.lightText 
                    }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: "rgba(255, 255, 255, 0.85)", 
                      fontSize: "1rem" 
                    }}>
                      {benefit.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Merged Standards Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" sx={{ 
            fontWeight: 700, 
            mb: 4, 
            color: cp.text,
            fontSize: { xs: "1.875rem", md: "2.25rem" } 
          }}>
            Our Standards
          </Typography>
          <Paper elevation={2} sx={{ 
            mb: 5, 
            py: 2.5, 
            px: 3,
            backgroundColor: cp.primary.main,
            maxWidth: "800px",
            mx: "auto",
            borderRadius: 2
          }}>
            <Typography variant="body1" align="center" sx={{ 
              color: "#ffffff", 
              fontSize: "1.125rem",
              fontWeight: 500
            }}>
              Each GluStack must meet rigorous standards to ensure quality, security, and usability for our customers.
            </Typography>
          </Paper>
          
          {/* Interactive Standards Explorer */}
          <Grid container spacing={3}>
            {/* Navigation Cards */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: cp.text, px: 1 }}>
                Choose Your Focus
              </Typography>
              <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 2, 
                height: { md: "400px" }, 
                overflowY: { md: "auto" } 
              }}>
                {standardsData.map(item => (
                  <Card key={item.id} elevation={activeTab === item.id ? 3 : 1} 
                    sx={{ 
                      cursor: "pointer", 
                      borderLeft: `4px solid ${activeTab === item.id ? 
                        (item.category === "Technology" ? cp.primary.light : cp.secondary.light) : "transparent"}`,
                      backgroundColor: activeTab === item.id ? cp.cardDark : cp.cardLightBg,
                      color: cp.cardText,
                      "&:hover": { 
                        boxShadow: theme => theme.shadows[3], 
                        transform: "translateY(-2px)", 
                        transition: "all 0.2s",
                        backgroundColor: activeTab === item.id ? cp.cardDark : cp.cardLightBg,
                      }
                    }}
                    onClick={() => setActiveTab(item.id)}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 2 }}>{item.icon}</Box>
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: cp.lightText }}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.85)" }}>
                            {item.category}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
            
            {/* Standards Details */}
            <Grid item xs={12} md={8}>
              <Card elevation={2} sx={{ 
                p: 3, 
                borderRadius: 2, 
                height: "100%",
                backgroundColor: cp.cardDark,
                color: cp.cardText
              }}>
                {activeStandard && (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: "rgba(255, 255, 255, 0.15)", 
                        mr: 2 
                      }}>
                        {activeStandard.icon}
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: cp.lightText }}>
                          {activeStandard.title}
                        </Typography>
                        <Typography sx={{ color: "rgba(255, 255, 255, 0.85)", fontWeight: 500 }}>
                          {activeStandard.category} Standards
                        </Typography>
                      </Box>
                    </Box>
                    
                    <List>
                      {activeStandard.standards.map((standard, index) => (
                        <ListItem key={index} sx={{ py: 1, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <CheckCircle sx={{ color: "#50fa7b" }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={standard} 
                            primaryTypographyProps={{ 
                              sx: { 
                                fontWeight: 500, 
                                fontSize: "1.05rem", 
                                color: cp.cardListItem 
                              } 
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Typography sx={{ mt: 2, fontStyle: "italic", color: "rgba(255, 255, 255, 0.7)" }}>
                      All {activeStandard.title} GluStacks must meet these standards to ensure quality and consistency.
                    </Typography>
                  </>
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Process Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" sx={{ 
            fontWeight: 700, 
            mb: 5, 
            color: cp.text,
            fontSize: { xs: "1.875rem", md: "2.25rem" } 
          }}>
            The GluStack Creator Process
          </Typography>
          <Grid container spacing={3}>
            {[
              { step: "Apply", desc: "Submit your application with details about your expertise and experience." },
              { step: "Review", desc: "Our team evaluates your application and sample work for quality and fit." },
              { step: "Onboard", desc: "Get access to creator tools, documentation, and community resources." },
              { step: "Build", desc: "Create your GluStack following our standards and best practices." },
              { step: "Submit", desc: "Submit your work for review by our quality assurance team." },
              { step: "Publish", desc: "Once approved, your GluStack will be published on our marketplace." },
              { step: "Earn", desc: "Start earning revenue every time someone purchases your GluStack." }
            ].map((step, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card elevation={2} sx={{ 
                  height: "100%", 
                  borderRadius: 2, 
                  position: "relative", 
                  overflow: "visible",
                  backgroundColor: cp.cardDark,
                  color: cp.cardText
                }}>
                  <Box sx={{ 
                    position: "absolute", 
                    top: -20, 
                    left: "50%", 
                    transform: "translateX(-50%)", 
                    width: 40,
                    height: 40, 
                    borderRadius: "50%", 
                    bgcolor: cp.primary.light, 
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "center", 
                    color: "white", 
                    fontWeight: 700, 
                    fontSize: "1.25rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                  }}>
                    {i + 1}
                  </Box>
                  <CardContent sx={{ pt: 4, pb: 3, px: 3, textAlign: "center" }}>
                    <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 600, color: cp.lightText }}>
                      {step.step}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.95rem" }}>
                      {step.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ 
          textAlign: "center", 
          py: 6, 
          px: 4, 
          background: `linear-gradient(135deg, ${cp.premium.main}, ${cp.premium.dark})`, 
          color: "white", 
          borderRadius: 2, 
          mb: 4, 
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)", 
          position: "relative", 
          overflow: "hidden" 
        }}>
          <Box sx={{ 
            position: "absolute", 
            inset: 0, 
            backgroundImage: "radial-gradient(circle at 20% 150%, rgba(255,255,255,0.18) 0%, transparent 45%)" 
          }} />
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Stars sx={{ fontSize: 48, color: "white", mb: 2, opacity: 0.9 }} />
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              mb: 3, 
              fontSize: { xs: "1.5rem", md: "2rem" },
              textShadow: "0 2px 4px rgba(0,0,0,0.2)" 
            }}>
              Ready to Join Our Creator Community?
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: "1.125rem", 
              maxWidth: "600px", 
              mx: "auto", 
              mb: 4, 
              color: "rgba(255,255,255,0.9)" 
            }}>
              Apply today and start sharing your expertise with developers worldwide 
              while earning passive income from your creations.
            </Typography>
            <NextLink href="/creator/apply" passHref>
              <Button variant="contained" size="large" sx={{ 
                px: 6, 
                py: 1.75, 
                borderRadius: "8px", 
                fontWeight: 600,
                textTransform: "none", 
                backgroundColor: "white", 
                color: cp.premium.dark,
                "&:hover": { 
                  backgroundColor: "rgba(255,255,255,0.9)", 
                  transform: "translateY(-3px) scale(1.05)" 
                }, 
                fontSize: "1.125rem", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)" 
              }}>
                Apply Now
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Container>
    </ConsistentPageLayout>
  );
};

export default BecomeACreatorPage;
