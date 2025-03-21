"use client";
import React, { useState } from "react";
import {
  Box, Typography, Grid, Button, Card, CardContent, Divider,
  TextField, Select, MenuItem, FormControl, InputLabel,
  FormControlLabel, Switch, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Tabs, Tab,
  Alert, CircularProgress, IconButton, InputAdornment, Chip
} from "@mui/material";
import {
  CreditCard, AccountBalance, Edit, Delete, Add,
  Download, CheckCircle
} from "@mui/icons-material";
import ConsistentPageLayout from "../../../components/Shared/ConsistentPageLayout";
import { SyntheticEvent, ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

// Design system colors
const colors = {
  primary: "#0055BB", primaryLight: "#2277CC", success: "#22AA55", 
  error: "#F44336", warning: "#FF9800", white: "#FFFFFF",
  gray: { 50: "#FAFAFA", 200: "#EEEEEE", 300: "#DDDDDD", 500: "#999999", 700: "#444444" }
};

// Mock data
type PaymentMethodType = 'bank' | 'card';

// 2️⃣ Update your existing paymentMethods array to use a full interface
interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  details: string;
  isDefault: boolean;
}
const paymentMethods: PaymentMethod[] = [
  { id: "pm-1", type: "bank", name: "Chase Banking", details: "Account ending in 4567", isDefault: true },
  { id: "pm-2", type: "card", name: "Visa Credit Card", details: "Card ending in 8901", isDefault: false },
];

const paymentHistory = [
  { id: "pay-1", date: "2024-03-15", amount: 1245.67, status: "completed", method: "Bank Transfer" },
  { id: "pay-2", date: "2024-02-15", amount: 987.45, status: "completed", method: "Bank Transfer" },
  { id: "pay-3", date: "2024-01-15", amount: 543.21, status: "completed", method: "Bank Transfer" }
];

const earnings = {
  available: 875.50, pending: 325.75, lifetime: 5876.34,
  nextPayoutDate: "2024-04-15", payoutThreshold: 100.00
};

const CreatorPaymentSettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [paymentType, setPaymentType] = useState("bank");
  const [loading, setLoading] = useState(false);
  const [bankForm, setBankForm] = useState({ accountName: "", accountNumber: "", routingNumber: "", bankName: "" });
  const [cardForm, setCardForm] = useState({ cardholderName: "", cardNumber: "", expiryDate: "", cvv: "" });
  const [payoutSettings, setPayoutSettings] = useState({ 
    automaticPayouts: true, 
    payoutThreshold: earnings.payoutThreshold, 
    payoutDay: 15 
  });

  // Helper functions
// Helper functions
const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  
  
  // Event handlers
  const handleTabChange = (event: SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue);
  };
  
  const handleBankFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setBankForm({ ...bankForm, [e.target.name]: e.target.value });
  };
  
  const handleCardFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCardForm({ ...cardForm, [e.target.name]: e.target.value });
  };
  
  const handlePayoutSettingsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ): void => {
    const { name, value, checked } = e.target as HTMLInputElement;
    setPayoutSettings(prev => ({
      ...prev,
      [name]: name === "automaticPayouts" ? checked : value
    }));
  };
  
  const simulateApiCall = (callback?: () => void): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback) callback();
    }, 1500);
  };
  
  
  const handleAddPaymentMethod = () => simulateApiCall(() => {
    setShowAddPaymentMethod(false);
    setBankForm({ accountName: "", accountNumber: "", routingNumber: "", bankName: "" });
    setCardForm({ cardholderName: "", cardNumber: "", expiryDate: "", cvv: "" });
  });
  
  const handleSavePayoutSettings = () => simulateApiCall();
  const handleRequestPayout = () => simulateApiCall();

  // Component renderers
  const renderMethodIcon = (type: PaymentMethodType): JSX.Element =>
    type === 'bank'
      ? <AccountBalance sx={{ color: colors.primary, mr: 2 }} />
      : <CreditCard sx={{ color: colors.primary, mr: 2 }} />;
  

      const renderPaymentMethod = (method: PaymentMethod): JSX.Element => (

    <Box key={method.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {renderMethodIcon(method.type)}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{method.name}</Typography>
        <Typography variant="body2" color="text.secondary">{method.details}</Typography>
      </Box>
      {method.isDefault && <Chip label="Default" size="small" sx={{ bgcolor: colors.gray[200] }} />}
    </Box>
  );

  const renderEarningsDashboard = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Available Balance Card */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%', border: `1px solid ${colors.gray[200]}` }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Available Balance</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: colors.primary, mb: 2 }}>
                    {formatCurrency(earnings.available)}
                  </Typography>
                  <Button variant="contained" onClick={handleRequestPayout}
                    disabled={earnings.available < earnings.payoutThreshold || loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                    sx={{ bgcolor: colors.primary, '&:hover': { bgcolor: colors.primaryLight } }}>
                    Request Payout
                  </Button>
                  <Typography variant="body2" sx={{ mt: 1, color: colors.gray[500] }}>
                    {earnings.available < earnings.payoutThreshold 
                      ? `Minimum payout threshold: ${formatCurrency(earnings.payoutThreshold)}` 
                      : `Next automatic payout: ${formatDate(earnings.nextPayoutDate)}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Pending Earnings Card */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%', border: `1px solid ${colors.gray[200]}` }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Pending Earnings</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: colors.gray[700], mb: 2 }}>
                    {formatCurrency(earnings.pending)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.gray[500] }}>
                    Earnings still in the clearance period (typically 14 days)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Payment History Card */}
            <Grid item xs={12}>
              <Card sx={{ border: `1px solid ${colors.gray[200]}` }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Lifetime Earnings: {formatCurrency(earnings.lifetime)}
                  </Typography>
                  
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Recent Payments</Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ mb: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: colors.gray[50] }}>
                          <TableCell>Date</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Method</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paymentHistory.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>
                              <Chip label="Completed" size="small" 
                                sx={{ bgcolor: colors.success + '20', color: colors.success }} />
                            </TableCell>
                            <TableCell align="right">
                              <Button startIcon={<Download />} size="small"
                                sx={{ color: colors.primary, textTransform: 'none' }}>
                                Receipt
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Button variant="outlined" 
                    sx={{ borderColor: colors.gray[300], color: colors.gray[700], textTransform: 'none' }}>
                    View All Payment History
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Right Column Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ border: `1px solid ${colors.gray[200]}`, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Payment Method</Typography>
              {paymentMethods.map(method => method.isDefault && renderPaymentMethod(method))}
              <Button variant="outlined" 
                sx={{ borderColor: colors.gray[300], color: colors.gray[700], textTransform: 'none' }}
                onClick={() => setActiveTab(1)}>
                Manage Payment Methods
              </Button>
            </CardContent>
          </Card>
          
          <Card sx={{ border: `1px solid ${colors.gray[200]}` }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Payout Settings</Typography>
              {['Payout Method', 'Payout Schedule', 'Minimum Payout'].map((label, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>{label}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {i === 0 ? 'Direct Deposit (Chase Banking)' : 
                     i === 1 ? 'Monthly (15th)' : 
                     formatCurrency(earnings.payoutThreshold)}
                  </Typography>
                </Box>
              ))}
              <Button variant="outlined" 
                sx={{ borderColor: colors.gray[300], color: colors.gray[700], textTransform: 'none' }}
                onClick={() => setActiveTab(2)}>
                Manage Payout Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <ConsistentPageLayout title="Payment Settings">
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Payment Settings</Typography>
      <Typography variant="body1" sx={{ color: colors.gray[700], mb: 4 }}>
        Manage your payment methods, earnings, and payout preferences
      </Typography>
      
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3, borderBottom: `1px solid ${colors.gray[200]}` }}>
        <Tab label="Earnings Dashboard" />
        <Tab label="Payment Methods" />
        <Tab label="Payout Settings" />
        <Tab label="Tax Information" />
      </Tabs>
      
      {activeTab === 0 && renderEarningsDashboard()}
      
      {/* Other tabs would be implemented similarly */}
    </ConsistentPageLayout>
  );
};

export default CreatorPaymentSettingsPage;