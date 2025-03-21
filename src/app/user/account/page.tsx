"use client";
import React, { useState } from "react";
import {
  Box, Typography, Container, Grid, Button, Card, CardContent, 
  Tabs, Tab, Divider, Avatar, IconButton, TextField, Chip, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, Tooltip,
  alpha, useMediaQuery, useTheme, Paper, Link
} from "@mui/material";
import {
  Download, Person, Notifications, Settings, CheckCircle, Code, 
  Storage, DeviceHub, Launch, ArrowForward, LockOutlined, CreditCard, 
  Edit, DeleteOutline, InfoOutlined, Security, CloudDownload, 
  FileDownload, ReceiptLong, AccessTime, Add
} from "@mui/icons-material";
import NextLink from "next/link";
import ConsistentPageLayout from "../../../components/Shared/ConsistentPageLayout";

// Color system
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", primaryDark: "#003388", 
  white: "#FFFFFF", black: "#111111", premium: "#2C58FF", premiumLight: "#4F73FF", 
  success: "#22AA55", warning: "#FF9800", error: "#F44336",
  gray: {
    50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#DDDDDD", 
    400: "#BBBBBB", 500: "#999999", 600: "#777777", 700: "#444444", 900: "#111111"
  }
};

// Style shortcuts with proper TypeScript typing
const sx = {
  btn: (color: string) => ({ 
    bgcolor: color, color: colors.white, textTransform: "none", fontWeight: 700, borderRadius: 1.5,
    boxShadow: `0 4px 8px ${alpha(color, 0.3)}`, 
    "&:hover": { bgcolor: color === colors.premium ? colors.premiumLight : colors.primaryLight, 
    boxShadow: `0 6px 12px ${alpha(color, 0.4)}` } 
  }),
  card: { 
    border: `1px solid ${colors.gray[300]}`, 
    borderRadius: 2, 
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)", 
    bgcolor: colors.white, 
    height: "100%" 
  },
  tableHeader: { fontWeight: 700, color: colors.gray[700], p: 2 }
};

// Type definitions for better type safety
interface Purchase {
  id: string;
  date: string;
  gluStackId: string;
  title: string;
  type: string;
  price: number;
  downloadCount: number;
  lastDownloaded: string;
  purchaseStatus: string;
}

interface OrderItem {
  title: string;
  price: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expMonth: number;
  expYear: number;
  default: boolean;
}

interface UserData {
  name: string;
  email: string;
  joined: string;
  avatar: string;
  totalSpent: number;
  totalPurchases: number;
  paymentMethods: PaymentMethod[];
}

// Mock data
const userPurchases: Purchase[] = [
  { id: "order-001", date: "2025-03-15", gluStackId: "gs-001", 
    title: "React Authentication System", type: "Frontend", price: 59, 
    downloadCount: 3, lastDownloaded: "2025-03-18", purchaseStatus: "completed" },
  { id: "order-002", date: "2025-03-10", gluStackId: "gs-002", 
    title: "Express API Boilerplate", type: "Backend", price: 39, 
    downloadCount: 2, lastDownloaded: "2025-03-12", purchaseStatus: "completed" },
  { id: "order-003", date: "2025-02-28", gluStackId: "gs-005", 
    title: "Database Migration Tool", type: "Database", price: 29, 
    downloadCount: 1, lastDownloaded: "2025-02-28", purchaseStatus: "completed" }
];

const orderHistory: Order[] = [
  { id: "order-001", date: "2025-03-15", items: [
      { title: "React Authentication System", price: 59 }
    ], total: 59, status: "completed" },
  { id: "order-002", date: "2025-03-10", items: [
      { title: "Express API Boilerplate", price: 39 }
    ], total: 39, status: "completed" },
  { id: "order-003", date: "2025-02-28", items: [
      { title: "Database Migration Tool", price: 29 }
    ], total: 29, status: "completed" },
  { id: "order-004", date: "2025-01-15", items: [
      { title: "GraphQL Schema Generator", price: 49 },
      { title: "React Form Builder", price: 29 }
    ], total: 78, status: "completed" }
];

const userData: UserData = {
  name: "David Johnson",
  email: "david.johnson@example.com",
  joined: "2025-01-10",
  avatar: "/api/placeholder/100/100",
  totalSpent: 205,
  totalPurchases: 5,
  paymentMethods: [
    { id: "pm-1", type: "visa", last4: "4242", expMonth: 12, expYear: 25, default: true }
  ]
};

// Type icon component
const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "Frontend": return <Code />;
    case "Backend": return <Storage />;
    case "Fullstack": return <DeviceHub />;
    default: return <Code />;
  }
};

// Tab panel component
const TabPanel = ({ children, value, index }: { children: React.ReactNode, value: number, index: number }) => (
  <Box sx={{ display: value === index ? 'block' : 'none', pt: 3 }}>{children}</Box>
);

const UserAccountPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [downloadDialog, setDownloadDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  // Open download dialog
  const handleOpenDownload = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setDownloadDialog(true);
  };

  return (
    <ConsistentPageLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header with user info */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          alignItems: { xs: "flex-start", md: "center" }, 
          justifyContent: "space-between", 
          mb: 4 
        }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, md: 0 } }}>
            <Avatar
              src={userData.avatar}
              alt={userData.name}
              sx={{ width: 64, height: 64, mr: 2, bgcolor: colors.primary }}
            />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                My Account
              </Typography>
              <Typography variant="body1" sx={{ color: colors.gray[700] }}>
                Welcome back, {userData.name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button 
              component={NextLink} 
              href="/marketplace"
              variant="outlined" 
              sx={{ borderColor: colors.primary, color: colors.primary, textTransform: "none", fontWeight: 600 }}
            >
              Browse GluStacks
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Settings />} 
              sx={sx.btn(colors.gray[700])}
            >
              Account Settings
            </Button>
          </Box>
        </Box>

        {/* Content Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: colors.gray[200] }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)} 
            sx={{ 
              '.MuiTab-root': { 
                textTransform: 'none', 
                fontWeight: 600, 
                fontSize: "0.95rem", 
                minWidth: 0, 
                px: { xs: 2, sm: 3 }, 
                py: 1.5 
              }
            }}
          >
            <Tab label="My Purchases" />
            <Tab label="Order History" />
            <Tab label="Payment Methods" />
            <Tab label="Profile Settings" />
          </Tabs>
        </Box>

        {/* My Purchases Tab */}
        <TabPanel value={activeTab} index={0}>
          {userPurchases.length > 0 ? (
            <Grid container spacing={3}>
              {userPurchases.map((purchase) => (
                <Grid item xs={12} md={6} lg={4} key={purchase.id}>
                  <Card sx={sx.card}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: 1,
                          bgcolor: alpha(colors.primary, 0.1),
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          color: colors.primary, 
                          mr: 2 
                        }}>
                          <TypeIcon type={purchase.type} />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: "1.1rem" }}>
                            {purchase.title}
                          </Typography>
                          <Chip 
                            label={purchase.type} 
                            size="small" 
                            sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary }} 
                          />
                        </Box>
                      </Box>
                      
                      <Divider sx={{ mb: 2 }} />
                      
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" sx={{ color: colors.gray[600], mb: 0.5 }}>
                            Purchase Date
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {new Date(purchase.date).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" sx={{ color: colors.gray[600], mb: 0.5 }}>
                            Price
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ${purchase.price}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" sx={{ color: colors.gray[600], mb: 0.5 }}>
                            Downloads
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {purchase.downloadCount} times
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" sx={{ color: colors.gray[600], mb: 0.5 }}>
                            Last Downloaded
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {new Date(purchase.lastDownloaded).toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      <Button 
                        fullWidth 
                        variant="contained" 
                        startIcon={<CloudDownload />}
                        onClick={() => handleOpenDownload(purchase)}
                        sx={sx.btn(colors.primary)}
                      >
                        Download GluStack
                      </Button>
                      
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        startIcon={<Launch />}
                        component={NextLink} 
                        href={`/glustack/${purchase.gluStackId}`}
                        sx={{ 
                          mt: 1, 
                          borderColor: colors.gray[300], 
                          color: colors.gray[700],
                          textTransform: "none", 
                          fontWeight: 600 
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{...sx.card, height: "auto", p: 4, textAlign: "center"}}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  No Purchases Yet
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray[600], mb: 3 }}>
                  You haven't purchased any GluStacks yet. Browse our marketplace to find 
                  reusable code components to speed up your development!
                </Typography>
                <Button 
                  component={NextLink} 
                  href="/marketplace"
                  variant="contained" 
                  endIcon={<ArrowForward />}
                  sx={sx.btn(colors.primary)}
                >
                  Browse GluStacks
                </Button>
              </CardContent>
            </Card>
          )}
        </TabPanel>

        {/* Order History Tab */}
        <TabPanel value={activeTab} index={1}>
          <Card sx={{...sx.card, height: "auto"}}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: colors.gray[50] }}>
                  <TableRow>
                    <TableCell sx={sx.tableHeader}>Order ID</TableCell>
                    <TableCell sx={sx.tableHeader}>Date</TableCell>
                    <TableCell sx={sx.tableHeader}>Items</TableCell>
                    <TableCell sx={sx.tableHeader} align="right">Total</TableCell>
                    <TableCell sx={sx.tableHeader} align="right">Status</TableCell>
                    <TableCell sx={sx.tableHeader} align="right">Receipt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderHistory.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Box>
                          {order.items.map((item, index) => (
                            <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                              {item.title}
                              <Typography component="span" variant="body2" sx={{ color: colors.gray[600] }}>
                                {" - $"}{item.price}
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          ${order.total}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={order.status === "completed" ? "Completed" : order.status}
                          size="small"
                          sx={{ 
                            bgcolor: order.status === "completed" ? alpha(colors.success, 0.1) : alpha(colors.warning, 0.1),
                            color: order.status === "completed" ? colors.success : colors.warning,
                            fontWeight: 600
                          }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Download Receipt">
                          <IconButton size="small" sx={{ color: colors.primary }}>
                            <ReceiptLong fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </TabPanel>

        {/* Payment Methods Tab */}
        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{...sx.card, height: "auto"}}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Payment Methods
                    </Typography>
                    <Button variant="contained" startIcon={<Add />} sx={sx.btn(colors.primary)}>
                      Add Method
                    </Button>
                  </Box>
                  
                  {userData.paymentMethods.map((method) => (
                    <Box key={method.id} sx={{ 
                      border: `1px solid ${colors.gray[300]}`,
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CreditCard sx={{ mr: 2, color: method.type === "visa" ? "#1A1F71" : colors.primary }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {method.type === "visa" ? "Visa" : "Card"} ending in {method.last4}
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.gray[600] }}>
                            Expires {method.expMonth}/{method.expYear}
                            {method.default && (
                              <Chip 
                                label="Default" 
                                size="small" 
                                sx={{ 
                                  ml: 1,
                                  bgcolor: alpha(colors.success, 0.1),
                                  color: colors.success,
                                  height: 20,
                                  fontSize: "0.7rem"
                                }} 
                              />
                            )}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <IconButton size="small" sx={{ color: colors.gray[700] }}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: colors.error }}>
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={sx.card}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center" }}>
                    <Security sx={{ mr: 1, color: colors.primary }} />
                    Payment Security
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    All payment information is securely stored and processed using
                    bank-level encryption standards.
                  </Typography>
                  
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    bgcolor: alpha(colors.success, 0.1), 
                    p: 1.5, 
                    borderRadius: 2 
                  }}>
                    <LockOutlined sx={{ mr: 1, color: colors.success }} />
                    <Typography variant="body2" sx={{ color: colors.success, fontWeight: 600 }}>
                      Your payment details are secure
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Profile Settings Tab */}
        <TabPanel value={activeTab} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{...sx.card, height: "auto"}}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Profile Information
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        defaultValue={userData.name}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        defaultValue={userData.email}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Company/Organization (Optional)"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 3 }}>
                    <Button variant="contained" sx={sx.btn(colors.primary)}>
                      Save Changes
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              
              <Card sx={{...sx.card, height: "auto", mt: 3}}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    mb: 3, 
                    color: colors.error, 
                    display: "flex", 
                    alignItems: "center" 
                  }}>
                    <InfoOutlined sx={{ mr: 1 }} />
                    Danger Zone
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Please be careful with these actions. They cannot be undone.
                  </Typography>
                  
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderColor: colors.error, 
                      color: colors.error,
                      textTransform: "none", 
                      fontWeight: 600 
                    }}
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={sx.card}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Account Summary
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: colors.gray[600], mb: 0.5 }}>
                      Member Since
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {new Date(userData.joined).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: colors.gray[600], mb: 0.5 }}>
                      Total Purchases
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {userData.totalPurchases} GluStacks
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: colors.gray[600], mb: 0.5 }}>
                      Total Spent
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ${userData.totalSpent}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Account Status
                  </Typography>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    bgcolor: alpha(colors.success, 0.1), 
                    p: 1, 
                    borderRadius: 1 
                  }}>
                    <CheckCircle sx={{ mr: 1, color: colors.success, fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: colors.success }}>
                      Active in good standing
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Download Dialog */}
        <Dialog 
          open={downloadDialog} 
          onClose={() => setDownloadDialog(false)} 
          maxWidth="xs" 
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 700 }}>
            Download GluStack
          </DialogTitle>
          <DialogContent dividers>
            {selectedPurchase && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  You're downloading:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 1,
                    bgcolor: alpha(colors.primary, 0.1),
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: colors.primary, 
                    mr: 2 
                  }}>
                    <TypeIcon type={selectedPurchase.type} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedPurchase.title}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Available Files:
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FileDownload sx={{ mr: 1, color: colors.primary, fontSize: 18 }} />
                        <Typography variant="body2">Source Code (.zip)</Typography>
                      </Box>
                      <Button variant="text" size="small" sx={{ color: colors.primary, fontWeight: 600 }}>
                        Download
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FileDownload sx={{ mr: 1, color: colors.primary, fontSize: 18 }} />
                        <Typography variant="body2">Documentation (.pdf)</Typography>
                      </Box>
                      <Button variant="text" size="small" sx={{ color: colors.primary, fontWeight: 600 }}>
                        Download
                      </Button>
                    </Box>
                  </Paper>
                </Box>
                
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  bgcolor: alpha(colors.primary, 0.05), 
                  p: 2, 
                  borderRadius: 2 
                }}>
                  <AccessTime sx={{ mr: 1.5, color: colors.primary }} />
                  <Typography variant="body2">
                    Your download history is logged for license verification.
                    You've downloaded this GluStack {selectedPurchase.downloadCount} times.
                  </Typography>
                </Box> 
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setDownloadDialog(false)}
              sx={{ color: colors.gray[700], textTransform: "none", fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              startIcon={<CloudDownload />}
              onClick={() => setDownloadDialog(false)}
              sx={sx.btn(colors.primary)}
            >
              Download All Files
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ConsistentPageLayout>
  );
};

export default UserAccountPage;