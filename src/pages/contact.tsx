import { useState, ChangeEvent, FormEvent } from "react";
import {
  useTheme,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  alpha,
  CircularProgress,
  Alert,
  InputAdornment,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  Code,
  Send,
  AccountCircle,
  Email,
  Phone,
  Description,
  FlashOn,
  WorkspacePremium,
  CorporateFare,
} from "@mui/icons-material";
import { colors, typography } from "../theme/branding";

type PlanType = "hourly" | "project" | "retainer" | "consultation";

const PLAN_DETAILS: Record<PlanType, { title: string; icon: JSX.Element }> = {
  hourly: {
    title: "Accelerate Success – On Demand Expertise",
    icon: <FlashOn fontSize="large" />,
  },
  project: {
    title: "Bespoke Digital Mastery – Crafted for Impact",
    icon: <WorkspacePremium fontSize="large" />,
  },
  retainer: {
    title: "Your Strategic Advantage – Elite Retainer Program",
    icon: <CorporateFare fontSize="large" />,
  },
  consultation: {
    title: "Visionary Strategy – Unleash Your Potential",
    icon: <Code fontSize="large" />,
  },
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const FormInput = ({
  label,
  name,
  value,
  onChange,
  disabled,
  icon,
  multiline = false,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled: boolean;
  icon: JSX.Element;
  multiline?: boolean;
}) => (
  <Grid item xs={12}>
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      multiline={multiline}
      rows={multiline ? 4 : 1}
      InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
    />
  </Grid>
);

const FormAlert = ({ message, severity }: { message: string; severity: "error" | "success" }) => (
  <Grid item xs={12}>
    <Alert severity={severity}>{message}</Alert>
  </Grid>
);

const Contact = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const selectedPlan = router.query.plan as PlanType | undefined;
  const planTitle = selectedPlan ? PLAN_DETAILS[selectedPlan].title : "Your Inquiry";
  const planIcon = selectedPlan ? PLAN_DETAILS[selectedPlan].icon : <Code fontSize="large" sx={{ color: colors.PRIMARY_DARK }} />;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData(INITIAL_FORM_DATA);
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, background: colors.PAGE_BG, position: "relative" }}>
      <Grid container spacing={{ xs: 6, md: 16 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                mb: { xs: 6, md: 8 },
                padding: { xs: 3, md: 4 },
                background: alpha(colors.PRIMARY_DARK, 0.05),
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${alpha(colors.PRIMARY_DARK, 0.1)}`,
                boxShadow: `0 4px 12px ${alpha(colors.SECONDARY_DARK, 0.1)}`,
              }}
            >
              {planIcon}
              <Typography variant="h2" sx={{ fontWeight: 700, color: colors.PRIMARY_DARK, fontSize: { xs: "2rem", md: "3rem" }, fontFamily: typography.fontFamily }}>
                {planTitle}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ color: colors.PRIMARY_DARK, mb: 6, lineHeight: 1.8, fontFamily: typography.fontFamily }}>
              {selectedPlan
                ? "Every breakthrough starts with a conversation. Let's strategize, refine, and execute a bold vision that propels your business forward."
                : "Your future success is waiting. Let's craft a digital experience that transforms your business and captivates your audience."}
            </Typography>
          </motion.div>
        </Grid>

        {/* Right Section - Form */}
        <Grid item xs={12} md={6}>
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Box sx={{ background: alpha(colors.PRIMARY_DARK, 0.05), p: 4, borderRadius: theme.shape.borderRadius, boxShadow: `0 16px 32px ${alpha(colors.SECONDARY_DARK, 0.2)}` }}>
              <Grid container spacing={4}>
                
                {error && <FormAlert message={error} severity="error" />}
                {success && <FormAlert message="Your request has been received. Expect an insightful response soon!" severity="success" />}

                <FormInput label="Your Full Name" name="name" value={formData.name} onChange={handleChange} disabled={loading} icon={<AccountCircle sx={{ color: colors.PRIMARY_DARK }} />} />
                <FormInput label="you@yourcompany.com" name="email" value={formData.email} onChange={handleChange} disabled={loading} icon={<Email sx={{ color: colors.PRIMARY_DARK }} />} />
                <FormInput label="Your Phone Number (Optional)" name="phone" value={formData.phone} onChange={handleChange} disabled={loading} icon={<Phone sx={{ color: colors.PRIMARY_DARK }} />} />
                <FormInput label="Your Message" name="message" value={formData.message} onChange={handleChange} disabled={loading} icon={<Description sx={{ color: colors.PRIMARY_DARK }} />} multiline />

                <Grid item xs={12}>
                  <Button fullWidth type="submit" variant="contained" sx={{ background: colors.PRIMARY_DARK, color: "#FFF", fontSize: "1.1rem", fontWeight: 700, padding: "12px 20px", "&:hover": { background: alpha(colors.PRIMARY_DARK, 0.8) } }} disabled={loading}>
                    {loading ? <CircularProgress size={24} sx={{ color: "#FFF" }} /> : <><Send sx={{ mr: 1 }} /> Send Message</>}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </motion.form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
