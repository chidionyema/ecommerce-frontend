"use client";
import React, { useState, SyntheticEvent } from "react";

import {
  Box, Typography, Grid, Button, Card, CardContent,
  List, ListItem, ListItemIcon, ListItemText,
  Accordion, AccordionSummary, AccordionDetails, Paper,
  Tabs, Tab, Breadcrumbs, Link, useTheme, useMediaQuery
} from "@mui/material";
import {
  ExpandMore, CheckCircle, Code, BugReport, Security,
  DocumentScanner, Download, AttachMoney, QuestionAnswer, VerifiedUser
} from "@mui/icons-material";
import NextLink from "next/link";
import ConsistentPageLayout from "../../../components/Shared/ConsistentPageLayout";

// Design system colors
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", white: "#FFFFFF",
  success: "#22AA55", warning: "#FF9800", error: "#F44336",
  gray: { 50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#DDDDDD", 500: "#999999", 700: "#444444" }
};

const CreatorGuidelinesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (
    event: React.SyntheticEvent, 
    newValue: number
  ): void => {
    setActiveTab(newValue);
  };
  
  
  // Content sections data
  const tableOfContents = [
    { id: 0, label: "Overview" },
    { id: 1, label: "Technical Requirements" },
    { id: 2, label: "Quality Standards" },
    { id: 3, label: "Submission Process" },
    { id: 4, label: "Pricing & Revenue" },
    { id: 5, label: "FAQ" }
  ];
  
  const resources = [
    { href: "/templates", icon: <DocumentScanner fontSize="small" sx={{ color: colors.primary }} />, label: "Templates" },
    { href: "/creator/examples", icon: <Code fontSize="small" sx={{ color: colors.primary }} />, label: "Example GluStacks" },
    { href: "/creator/support", icon: <QuestionAnswer fontSize="small" sx={{ color: colors.primary }} />, label: "Creator Support" }
  ];
  
  // Content sections for Technical Requirements
  const technicalSections = [
    { title: "Code Quality & Structure", defaultExpanded: true, items: [
      { primary: "Clean, well-organized code following industry best practices", secondary: "Code should be modular, maintainable, and follow design patterns appropriate for the language/framework" },
      { primary: "Consistent coding style", secondary: "Use consistent naming conventions, indentation, and formatting" },
      { primary: "Proper error handling", secondary: "Include robust error handling to prevent crashes and provide meaningful error messages" },
      { primary: "Comments and documentation", secondary: "Include appropriate comments for complex logic and document public APIs" }
    ]},
    { title: "Compatibility & Dependencies", items: [
      { primary: "Clearly specified minimum version requirements", secondary: "Specify minimum versions for all languages, frameworks, and libraries used" },
      { primary: "Minimal external dependencies", secondary: "Keep external dependencies to a minimum; use widely-adopted libraries when necessary" },
      { primary: "Browser/device compatibility", secondary: "For frontend components, ensure compatibility with major browsers and responsive design for various devices" }
    ]},
    { title: "Security", items: [
      { primary: "Follow security best practices", secondary: "Protect against common vulnerabilities (XSS, CSRF, injection attacks, etc.)" },
      { primary: "Secure data handling", secondary: "Implement proper data validation, sanitization, and protection of sensitive information" },
      { primary: "No hardcoded credentials", secondary: "Never include API keys, passwords, or other sensitive credentials in your code" }
    ]},
    { title: "Performance", items: [
      { primary: "Optimized performance", secondary: "Write efficient code that avoids unnecessary operations and optimizes resource usage" },
      { primary: "Appropriate loading states", secondary: "Include loading indicators for asynchronous operations" },
      { primary: "Reasonable bundle size", secondary: "Keep file sizes reasonable; implement code splitting when appropriate" }
    ]},
    { title: "Testing", items: [
      { primary: "Unit tests", secondary: "Include unit tests for key functionality" },
      { primary: "Test instructions", secondary: "Provide clear instructions for running tests" },
      { primary: "Tested environments", secondary: "List environments and configurations where the GluStack has been tested" }
    ]}
  ];

  // Render sidebar for navigation
  const renderSidebar = () => (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Table of Contents</Typography>
        <List sx={{ 
          border: `1px solid ${colors.gray[200]}`, 
          borderRadius: 1, 
          '& .MuiListItem-root': { pl: 2 }
        }}>
          {tableOfContents.map(item => (
            <ListItem button key={item.id} onClick={() => setActiveTab(item.id)}
              sx={{ bgcolor: activeTab === item.id ? colors.primary + '10' : 'transparent' }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ 
                fontWeight: activeTab === item.id ? 600 : 400,
                color: activeTab === item.id ? colors.primary : 'inherit'
              }} />
            </ListItem>
          ))}
        </List>
        
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>Resources</Typography>
        <List sx={{ 
          border: `1px solid ${colors.gray[200]}`, 
          borderRadius: 1, 
          '& .MuiListItem-root': { pl: 2 }
        }}>
          {resources.map((resource, index) => (
            <ListItem button component={NextLink} href={resource.href} key={index}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                {resource.icon}
              </ListItemIcon>
              <ListItemText primary={resource.label} />
            </ListItem>
          ))}
        </List>
      </Box>
      
      {/* Mobile tabs */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: `1px solid ${colors.gray[200]}` }}
        >
          {tableOfContents.map(item => (
            <Tab label={item.id > 2 ? item.label.split(' ')[0] : item.label} key={item.id} />
          ))}
        </Tabs>
      </Box>
    </>
  );

  // Overview section content
  const renderOverview = () => (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Welcome to the GluStack Creator Program
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        GluStack is a marketplace for high-quality, ready-to-use code components and solutions that help developers build better applications faster. As a GluStack creator, you'll be able to share your expertise, build your reputation, and generate revenue from your code.
      </Typography>
      
      <Card sx={{ mb: 4, border: `1px solid ${colors.gray[200]}` }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            What is a GluStack?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            A GluStack is a self-contained, well-documented code solution that solves a specific problem or provides a reusable component for web and application development. GluStacks can include:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <List disablePadding>
                {["UI Components and Systems", "Authentication Systems", "API Integrations"].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: colors.success }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List disablePadding>
                {["Data Visualization Tools", "Backend Utilities", "Full-Stack Solutions"].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: colors.success }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Benefits of Being a GluStack Creator
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { icon: <AttachMoney sx={{ color: colors.primary, fontSize: 40, mb: 1 }} />, title: "Generate Revenue", 
            desc: "Earn up to 80% revenue share on all your GluStack sales, with premium creators earning even more." },
          { icon: <VerifiedUser sx={{ color: colors.primary, fontSize: 40, mb: 1 }} />, title: "Build Your Reputation", 
            desc: "Showcase your expertise and build a following within the developer community." },
          { icon: <Code sx={{ color: colors.primary, fontSize: 40, mb: 1 }} />, title: "Share Your Expertise", 
            desc: "Help other developers by sharing solutions to common challenges." }
        ].map((benefit, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', border: `1px solid ${colors.gray[200]}` }}>
              <CardContent>
                {benefit.icon}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{benefit.title}</Typography>
                <Typography variant="body2">{benefit.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ borderLeft: `4px solid ${colors.primary}`, pl: 2, py: 1, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Ready to get started?</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Review our technical requirements and quality standards, then apply to become a creator.
        </Typography>
        <Button component={NextLink} href="/creator/apply" variant="contained"
          sx={{ bgcolor: colors.primary, '&:hover': { bgcolor: colors.primaryLight }, textTransform: 'none' }}>
          Apply as Creator
        </Button>
      </Box>
    </Box>
  );

  // Technical Requirements section
  const renderTechnicalRequirements = () => (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Technical Requirements</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        All GluStacks must meet these technical requirements to ensure compatibility, security, and usability for our customers.
      </Typography>
      
      {technicalSections.map((section, index) => (
        <Accordion 
          key={index} 
          defaultExpanded={section.defaultExpanded} 
          sx={{ mb: 2, border: `1px solid ${colors.gray[200]}`, '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {section.items.map((item, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: colors.success }} />
                  </ListItemIcon>
                  <ListItemText primary={item.primary} secondary={item.secondary} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
      
      <Box sx={{ bgcolor: colors.gray[50], p: 3, borderRadius: 2, border: `1px solid ${colors.gray[200]}` }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', mb: 2 }}>
          <BugReport sx={{ mr: 1, color: colors.primary }} />
          Technical Review Process
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          All GluStacks undergo a thorough technical review before being approved for the marketplace. Our reviewers check for:
        </Typography>
        <List disablePadding dense>
          {[
            "Adherence to all technical requirements", 
            "Security vulnerabilities and code quality issues", 
            "Accuracy of documentation and ease of implementation", 
            "Compliance with our acceptable use policies"
          ].map((item, i) => (
            <ListItem key={i}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <CheckCircle fontSize="small" sx={{ color: colors.success }} />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <ConsistentPageLayout title="Creator Guidelines">
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={NextLink} href="/" underline="hover" color="inherit">Home</Link>
          <Link component={NextLink} href="/creator/dashboard" underline="hover" color="inherit">Creator Dashboard</Link>
          <Typography color="text.primary">Guidelines</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Creator Guidelines</Typography>
        <Typography variant="body1" sx={{ color: colors.gray[700], mb: 2 }}>
          Comprehensive documentation for creating high-quality GluStacks that meet our standards
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button variant="outlined" startIcon={<Download />}
            sx={{ borderColor: colors.primary, color: colors.primary, textTransform: 'none' }}>
            Download PDF
          </Button>
          <Button component={NextLink} href="/creator/apply" variant="contained"
            sx={{ bgcolor: colors.primary, '&:hover': { bgcolor: colors.primaryLight }, textTransform: 'none' }}>
            Apply as Creator
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          {renderSidebar()}
        </Grid>
        
        <Grid item xs={12} md={9}>
          {activeTab === 0 && renderOverview()}
          {activeTab === 1 && renderTechnicalRequirements()}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Quality Standards</Typography>
              {/* Quality standards content would go here */}
            </Box>
          )}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Submission Process</Typography>
              {/* Submission process content would go here */}
            </Box>
          )}
          {activeTab === 4 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Pricing & Revenue</Typography>
              {/* Pricing & revenue content would go here */}
            </Box>
          )}
          {activeTab === 5 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Frequently Asked Questions</Typography>
              {/* FAQ content would go here */}
            </Box>
          )}
        </Grid>
      </Grid>
    </ConsistentPageLayout>
  );
};

export default CreatorGuidelinesPage;