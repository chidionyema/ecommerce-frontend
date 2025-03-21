"use client";
import React, { useState } from "react";
import {
  Box, Typography, Container, Grid, Button, Card, CardContent, Tabs, Tab, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Divider, FormControl, InputLabel, Select, MenuItem, Avatar,
  TextField, InputAdornment, alpha, useMediaQuery, useTheme, Paper
} from "@mui/material";
import {
  Add, Edit, Visibility, CheckCircle, HourglassEmpty, ErrorOutline,
  AttachMoney, TrendingUp, Star, Code, Storage, DeviceHub, Stars,
  ArrowUpward, Search, MoreVert
} from "@mui/icons-material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import ConsistentPageLayout from "../../../components/Shared/ConsistentPageLayout";

interface GluStack {
  id: string;
  title: string;
  type: "Frontend" | "Backend" | "Fullstack" | "Design" | "Database";
  price: number;
  status: "published" | "review" | "draft" | "rejected";
  sales: number;
  revenue: number;
  rating: number;
  reviewCount: number;
  lastUpdated: string;
  isPremium: boolean;
}

// Consistent color system with other pages
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", primaryDark: "#003388", 
  white: "#FFFFFF", black: "#111111", premium: "#2C58FF", premiumLight: "#4F73FF", 
  success: "#22AA55", warning: "#FF9800", error: "#F44336",
  gray: {50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#DDDDDD", 
    500: "#999999", 600: "#757575",700: "#444444", 900: "#111111"}
};

// Style shortcuts
const sx = {
  btn: (color: string) => ({ 
    bgcolor: color, color: colors.white, textTransform: "none", fontWeight: 700, borderRadius: 1.5,
    boxShadow: `0 4px 8px ${alpha(color, 0.3)}`, 
    "&:hover": { bgcolor: color === colors.premium ? colors.premiumLight : colors.primaryLight, 
    boxShadow: `0 6px 12px ${alpha(color, 0.4)}` } 
  }),
  card: { border: `1px solid ${colors.gray[300]}`, borderRadius: 2, 
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)", bgcolor: colors.white, height: "100%" },
  tableHeader: { fontWeight: 700, color: colors.gray[700], p: 2 }
};

// Mock data for demonstration
const mockGluStacks: GluStack[] = [ 
  { id: "gs-001", title: "React Authentication System", type: "Frontend", price: 59, 
    status: "published", sales: 148, revenue: 8732, rating: 4.8, reviewCount: 32,
    lastUpdated: "2025-02-15", isPremium: true },
  { id: "gs-002", title: "Express API Boilerplate", type: "Backend", price: 39, 
    status: "published", sales: 94, revenue: 3666, rating: 4.6, reviewCount: 17,
    lastUpdated: "2025-01-20", isPremium: false },
  { id: "gs-003", title: "Next.js E-commerce Starter", type: "Fullstack", price: 79, 
    status: "review", sales: 0, revenue: 0, rating: 0, reviewCount: 0,
    lastUpdated: "2025-03-10", isPremium: true },
  { id: "gs-004", title: "Dashboard UI Component Library", type: "Design", price: 49, 
    status: "draft", sales: 0, revenue: 0, rating: 0, reviewCount: 0,
    lastUpdated: "2025-03-18", isPremium: false },
  { id: "gs-005", title: "Database Migration Tool", type: "Database", price: 29, 
    status: "published", sales: 58, revenue: 1682, rating: 4.3, reviewCount: 8,
    lastUpdated: "2025-02-28", isPremium: false }
];

const recentSales = [
  { id: 1, date: "2025-03-19", gluStackId: "gs-001", amount: 59, buyer: "John D." },
  { id: 2, date: "2025-03-19", gluStackId: "gs-002", amount: 39, buyer: "Emma S." },
  { id: 3, date: "2025-03-18", gluStackId: "gs-001", amount: 59, buyer: "Michael T." },
  { id: 4, date: "2025-03-17", gluStackId: "gs-005", amount: 29, buyer: "Sarah J." },
  { id: 5, date: "2025-03-17", gluStackId: "gs-001", amount: 59, buyer: "David M." }
];

const monthlyEarnings = [
  { month: "Jan", amount: 2120 },
  { month: "Feb", amount: 3450 },
  { month: "Mar", amount: 4780 }
];


interface StatusBadgeProps {
  status: "published" | "review" | "draft" | "rejected";
}
// Status badge component
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let color = colors.gray[500];
  let bg = colors.gray[100];
  let icon = <HourglassEmpty fontSize="small" />;
  let label = "Unknown";

  switch (status) {
    case "published":
      color = colors.success;
      bg = alpha(colors.success, 0.1);
      icon = <CheckCircle fontSize="small" />;
      label = "Published";
      break;
    case "review":
      color = colors.warning;
      bg = alpha(colors.warning, 0.1);
      icon = <HourglassEmpty fontSize="small" />;
      label = "In Review";
      break;
    case "draft":
      color = colors.gray[700];
      bg = colors.gray[100];
      icon = <Edit fontSize="small" />;
      label = "Draft";
      break;
    case "rejected":
      color = colors.error;
      bg = alpha(colors.error, 0.1);
      icon = <ErrorOutline fontSize="small" />;
      label = "Rejected";
      break;
  }

  return (
    <Chip
      icon={icon}
      label={label}
      size="small"
      sx={{
        bgcolor: bg,
        color,
        fontWeight: 600,
        "& .MuiChip-icon": { color },
      }}
    />
  );
};
// Type icon component
const TypeIcon: React.FC<{ type: GluStack["type"] }> = ({ type }) => {
  switch (type) {
    case "Frontend": return <Code />;
    case "Backend": return <Storage />;
    case "Fullstack": return <DeviceHub />;
    default: return <Code />;
  }
};

// Creator Dashboard Page
const CreatorDashboardPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("sales");
  
  // Calculate dashboard stats
  const totalSales = mockGluStacks.reduce((sum, g) => sum + g.sales, 0);
  const totalRevenue = mockGluStacks.reduce((sum, g) => sum + g.revenue, 0);
  const totalGluStacks = mockGluStacks.length;
  const publishedGluStacks = mockGluStacks.filter(g => g.status === "published").length;
  
  // Filter and sort GluStacks
  const filteredGluStacks = mockGluStacks.filter(g => {
    if (filter === "all") return true;
    if (filter === "premium" && g.isPremium) return true;
    if (filter === "published" && g.status === "published") return true;
    if (filter === "drafts" && g.status === "draft") return true;
    if (filter === "review" && g.status === "review") return true;
    return false;
  });
  
  const sortedGluStacks = [...filteredGluStacks].sort((a, b) => {
    if (sortOrder === "sales") return b.sales - a.sales;
    if (sortOrder === "revenue") return b.revenue - a.revenue;
    if (sortOrder === "rating") return b.rating - a.rating;
    if (sortOrder === "newest") return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    return 0;
  });
  
  
  interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
  }
  
  const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
    <Box sx={{ display: value === index ? 'block' : 'none', pt: 3 }}>
      {children}
    </Box>
  );
  

  return (
    <ConsistentPageLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Creator Dashboard</Typography>
            <Typography variant="body1" sx={{ color: colors.gray[700] }}>
              Manage your GluStacks, track sales and monitor performance
            </Typography>
          </Box>
          <NextLink href="/create-glustack" passHref>
            <Button variant="contained" startIcon={<Add />} sx={sx.btn(colors.primary)}>
              Create GluStack
            </Button>
          </NextLink>
        </Box>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={sx.card}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: colors.gray[600], fontWeight: 700, mb: 1 }}>
                      Total Revenue
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                      ${totalRevenue.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.success, display: "flex", alignItems: "center" }}>
                      <ArrowUpward sx={{ fontSize: 16, mr: 0.5 }} /> 12% vs last month
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary, p: 1 }}>
                    <AttachMoney />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={sx.card}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: colors.gray[600], fontWeight: 700, mb: 1 }}>
                      Total Sales
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>{totalSales}</Typography>
                    <Typography variant="body2" sx={{ color: colors.success, display: "flex", alignItems: "center" }}>
                      <ArrowUpward sx={{ fontSize: 16, mr: 0.5 }} /> 8% vs last month
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary, p: 1 }}>
                    <TrendingUp />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={sx.card}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: colors.gray[600], fontWeight: 700, mb: 1 }}>
                      Active GluStacks
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                      {publishedGluStacks} / {totalGluStacks}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.gray[600] }}>
                      {publishedGluStacks > 0 ? "Live on marketplace" : "No published GluStacks"}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary, p: 1 }}>
                    <Code />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={sx.card}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: colors.gray[600], fontWeight: 700, mb: 1 }}>
                      Average Rating
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>4.7</Typography>
                    <Typography variant="body2" sx={{ color: colors.gray[600] }}>
                      From 57 reviews
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary, p: 1 }}>
                    <Star />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Content Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: colors.gray[200] }}>
          <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} sx={{ 
            '.MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: "0.95rem", 
            minWidth: 0, px: { xs: 2, sm: 3 }, py: 1.5 }}}>
            <Tab label="My GluStacks" />
            <Tab label="Sales & Revenue" />
            <Tab label="Analytics" />
            <Tab label="Settings" />
          </Tabs>
        </Box>
        
        {/* My GluStacks Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControl size="small" sx={{ minWidth: 150, mr: 2 }}>
                <InputLabel>Filter</InputLabel>
                <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <MenuItem value="all">All GluStacks</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="drafts">Drafts</MenuItem>
                  <MenuItem value="review">In Review</MenuItem>
                  <MenuItem value="premium">Premium Only</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label="Sort By">
                  <MenuItem value="sales">Best Selling</MenuItem>
                  <MenuItem value="revenue">Highest Revenue</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <TextField size="small" placeholder="Search GluStacks..." 
              InputProps={{ startAdornment: (<InputAdornment position="start">
                <Search sx={{ color: colors.gray[500] }} /></InputAdornment>)}}
              sx={{ ml: 2, display: { xs: 'none', md: 'block' } }} />
          </Box>
          
          <TableContainer component={Paper} sx={{ ...sx.card, height: "auto" }}>
            <Table>
              <TableHead sx={{ bgcolor: colors.gray[50] }}>
                <TableRow>
                  <TableCell sx={sx.tableHeader}>GluStack</TableCell>
                  <TableCell sx={sx.tableHeader}>Status</TableCell>
                  <TableCell sx={{ ...sx.tableHeader, display: { xs: 'none', sm: 'table-cell' } }}>Type</TableCell>
                  <TableCell sx={{ ...sx.tableHeader, display: { xs: 'none', md: 'table-cell' } }}>Price</TableCell>
                  <TableCell sx={{ ...sx.tableHeader, display: { xs: 'none', md: 'table-cell' } }}>Sales</TableCell>
                  <TableCell sx={{ ...sx.tableHeader, display: { xs: 'none', lg: 'table-cell' } }}>Revenue</TableCell>
                  <TableCell sx={{ ...sx.tableHeader, display: { xs: 'none', lg: 'table-cell' } }}>Rating</TableCell>
                  <TableCell sx={sx.tableHeader} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedGluStacks.map((glustack) => (
                  <TableRow key={glustack.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: 1,
                          bgcolor: alpha(glustack.isPremium ? colors.premium : colors.primary, 0.1),
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: glustack.isPremium ? colors.premium : colors.primary, mr: 2 }}>
                          <TypeIcon type={glustack.type} />
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{glustack.title}</Typography>
                          <Typography variant="caption" sx={{ color: colors.gray[600] }}>
                            Updated {glustack.lastUpdated}
                          </Typography>
                        </Box>
                        {glustack.isPremium && (
                          <Chip icon={<Stars sx={{ fontSize: 16 }} />} label="Premium" size="small"
                            sx={{ ml: 1, bgcolor: alpha(colors.premium, 0.1), color: colors.premium, 
                              height: 24, '& .MuiChip-icon': { color: colors.premium } }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell><StatusBadge status={glustack.status} /></TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Chip label={glustack.type} size="small" 
                        sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary }} />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>${glustack.price}</Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2">{glustack.sales}</Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>${glustack.revenue}</Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ mr: 0.5 }}>
                          {glustack.rating > 0 ? glustack.rating.toFixed(1) : "-"}
                        </Typography>
                        {glustack.rating > 0 && (<Star sx={{ color: "#FFB400", fontSize: 16 }} />)}
                        {glustack.reviewCount > 0 && (
                          <Typography variant="caption" sx={{ ml: 0.5, color: colors.gray[600] }}>
                            ({glustack.reviewCount})
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton size="small" onClick={() => router.push(`/glustack/${glustack.id}`)}
                          sx={{ color: colors.primary }}>
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => router.push(`/edit-glustack/${glustack.id}`)}
                          sx={{ color: colors.gray[700] }}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: colors.gray[700] }}>
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredGluStacks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                        No GluStacks found
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.gray[600], mb: 2 }}>
                        {filter === "all" ? "You haven't created any GluStacks yet." : 
                          "No GluStacks match your current filter."}
                      </Typography>
                      {filter === "all" ? (
                        <NextLink href="/create-glustack" passHref>
                          <Button variant="contained" startIcon={<Add />} sx={sx.btn(colors.primary)}>
                            Create Your First GluStack
                          </Button>
                        </NextLink>
                      ) : (
                        <Button variant="outlined" onClick={() => setFilter("all")}
                          sx={{ borderColor: colors.primary, color: colors.primary,
                            textTransform: "none", fontWeight: 600 }}>
                          Clear Filters
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Sales & Revenue Tab */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={sx.card}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Monthly Revenue</Typography>
                  <Box sx={{ height: 300, bgcolor: colors.gray[50], borderRadius: 2, 
                    border: `1px dashed ${colors.gray[300]}`, display: "flex",
                    alignItems: "center", justifyContent: "center", my: 2 }}>
                    <Typography sx={{ color: colors.gray[600] }}>Revenue Chart Here</Typography>
                  </Box>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {monthlyEarnings.map((month, index) => (
                      <Grid item xs={4} key={index}>
                        <Box sx={{ textAlign: "center", p: 1 }}>
                          <Typography variant="body2" sx={{ color: colors.gray[600], fontWeight: 600 }}>
                            {month.month} 2025
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>${month.amount}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={sx.card}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Recent Sales</Typography>
                  <Box>
                    {recentSales.map((sale, index) => (
                      <Box key={index} sx={{ py: 1.5, borderBottom: index < recentSales.length - 1 ? 
                        `1px solid ${colors.gray[200]}` : 'none' }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {mockGluStacks.find(g => g.id === sale.gluStackId)?.title}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>${sale.amount}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="caption" sx={{ color: colors.gray[600] }}>{sale.buyer}</Typography>
                          <Typography variant="caption" sx={{ color: colors.gray[600] }}>
                            {new Date(sale.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Button fullWidth variant="outlined" sx={{ mt: 2, borderColor: colors.gray[300],
                    color: colors.gray[700], textTransform: "none", fontWeight: 600 }}>
                    View All Sales
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card sx={sx.card}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Sales by GluStack</Typography>
                  <TableContainer>
                    <Table size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={sx.tableHeader}>GluStack</TableCell>
                          <TableCell sx={sx.tableHeader}>Price</TableCell>
                          <TableCell sx={sx.tableHeader} align="right">Total Sales</TableCell>
                          <TableCell sx={sx.tableHeader} align="right">Total Revenue</TableCell>
                          <TableCell sx={sx.tableHeader}>Trend</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockGluStacks.filter(g => g.status === "published")
                          .sort((a, b) => b.revenue - a.revenue)
                          .map(glustack => (
                          <TableRow key={glustack.id} hover>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ mr: 2, width: 32, height: 32, borderRadius: 1,
                                  bgcolor: alpha(glustack.isPremium ? colors.premium : colors.primary, 0.1),
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  color: glustack.isPremium ? colors.premium : colors.primary }}>
                                  <TypeIcon type={glustack.type} />
                                </Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{glustack.title}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>${glustack.price}</TableCell>
                            <TableCell align="right">{glustack.sales}</TableCell>
                            <TableCell align="right">${glustack.revenue}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ArrowUpward sx={{ color: colors.success, fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2" sx={{ color: colors.success }}>18%</Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Analytics Tab (placeholder) */}
        <TabPanel value={activeTab} index={2}>
          <Card sx={sx.card}>
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Analytics Dashboard</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Comprehensive analytics and insights for your GluStacks are coming soon!
              </Typography>
              <Box sx={{ height: 300, bgcolor: colors.gray[50], borderRadius: 2, 
                border: `1px dashed ${colors.gray[300]}`, display: "flex",
                alignItems: "center", justifyContent: "center", my: 2 }}>
                <Typography sx={{ color: colors.gray[600] }}>Analytics Charts Coming Soon</Typography>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
        
        {/* Settings Tab (placeholder) */}
        <TabPanel value={activeTab} index={3}>
          <Card sx={sx.card}>
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Account Settings</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Manage your creator profile, payment settings, and notification preferences.
              </Typography>
              <Button variant="contained" sx={sx.btn(colors.primary)}>
                Update Settings
              </Button>
            </CardContent>
          </Card>
        </TabPanel>
      </Container>
    </ConsistentPageLayout>
  );
};

export default CreatorDashboardPage;