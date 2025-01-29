import React, { memo } from "react";
import { Box, Typography, Grid, Button, Container, useTheme, styled, useMediaQuery, alpha } from "@mui/material";
import { Info, Award, Clock, Users, Calendar, Briefcase } from "lucide-react";
import { useRouter } from "next/router";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import BaseCard from "../components/BaseCard";
import { PRIMARY_DARK, SECONDARY_DARK, COLORS } from "../theme/branding";

interface Feature {
  icon: React.ElementType;
  text: string;
}

interface Plan {
  type: string;
  title: string;
  gradient: string;
  features: Feature[];
  price: string;
}

const plans: Plan[] = [
  {
    type: "hourly",
    title: "Expert Consultation",
    gradient: `linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.08)}, ${alpha(SECONDARY_DARK, 0.05)})`,
    features: [
      { icon: Clock, text: "Flexible hourly consulting" },
      { icon: Award, text: "Expert technical guidance" },
      { icon: Calendar, text: "Priority scheduling" },
    ],
    price: "$295/hr",
  },
  {
    type: "project",
    title: "Managed Solutions",
    gradient: `linear-gradient(135deg, ${alpha(SECONDARY_DARK, 0.08)}, ${alpha(PRIMARY_DARK, 0.05)})`,
    features: [
      { icon: Briefcase, text: "End-to-end project management" },
      { icon: Users, text: "Dedicated engineering team" },
      { icon: Award, text: "Quality assurance guarantee" },
    ],
    price: "Custom Quote",
  },
  {
    type: "retainer",
    title: "Strategic Partnership",
    gradient: `linear-gradient(135deg, ${alpha(PRIMARY_DARK, 0.1)}, ${alpha(SECONDARY_DARK, 0.08)})`,
    features: [
      { icon: Users, text: "24/7 technical support" },
      { icon: Award, text: "Strategic technology roadmap" },
      { icon: Info, text: "Monthly performance reviews" },
    ],
    price: "Starting at $15k/mo",
  },
];

const LazyCard = styled(BaseCard)(({ theme }) => ({
  borderRadius: "24px",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  minHeight: 500,
  background: `
    linear-gradient(
      145deg, 
      ${alpha(COLORS.NEUTRAL_LIGHT, 0.8)}, 
      ${alpha(COLORS.NEUTRAL_LIGHT, 1)}
    )`,
  border: `1px solid ${alpha(COLORS.LIGHT_ACCENT, 0.2)}`,
  boxShadow: `0 8px 24px ${alpha(COLORS.PRIMARY_DARK, 0.1)}`,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `
      0 16px 32px ${alpha(COLORS.LIGHT_ACCENT, 0.2)},
      inset 0 0 24px ${alpha(COLORS.LIGHT_ACCENT, 0.05)}
    `,
  },
}));


const PricingGrid = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <LazyMotion features={domAnimation}>
      <Box sx={{ backgroundColor: COLORS.PAGE_BG, py: 12, px: isMdDown ? 2 : 0 }}>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 3, color: PRIMARY_DARK, fontFamily: theme.typography.fontFamily }}>
                Choose Your Path to Innovation
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "text.secondary", fontFamily: theme.typography.fontFamily, maxWidth: 700, mx: 'auto' }}>
                Elevate your business with tailored solutions, expert support, and strategic partnerships.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {plans.map(({ type, title, gradient, features, price }) => (
              <Grid item xs={12} sm={6} md={4} key={type}>
                <LazyCard sx={{ padding: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: PRIMARY_DARK, fontFamily: theme.typography.fontFamily }}>
                    {title}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}>
                    {features.map(({ icon: Icon, text }, i) => (
                      <FeatureItem key={i} icon={Icon} text={text} />
                    ))}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, color: PRIMARY_DARK, fontFamily: theme.typography.fontFamily }}>
                    {price}
                  </Typography>
                  <Button 
                      sx={{ 
                        background: COLORS.GRADIENT_ACCENT,
                        color: COLORS.NEUTRAL_LIGHT,
                        fontWeight: 600,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${alpha(COLORS.LIGHT_ACCENT, 0.8)}, ${alpha(COLORS.BRIGHT_ACCENT, 0.7)})`,
                          boxShadow: `0 4px 12px ${alpha(COLORS.LIGHT_ACCENT, 0.3)}`,
                        },
                      }}
                    onClick={() => router.push(`/contact?plan=${type}`)}
                  >
                    Get Started
                  </Button>
                </LazyCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </LazyMotion>
  );
};

const FeatureItem = memo(({ icon: Icon, text }: Feature) => (
  <Box sx={{ 
    display: "flex", 
    alignItems: "center", 
    py: 1,
    backgroundColor: alpha(COLORS.LIGHT_ACCENT, 0.1),
    borderRadius: '8px',
    padding: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: alpha(COLORS.LIGHT_ACCENT, 0.2),
    }
  }}>
    <Icon style={{ 
      color: COLORS.PRIMARY_DARK, 
      fontSize: '1.5rem',
      filter: 'drop-shadow(0 2px 4px rgba(10,36,99,0.2))' 
    }} />
    <Typography variant="body2" sx={{ 
      ml: 2, 
      fontWeight: 500, 
      color: COLORS.DARK_TEXT,
      background: `linear-gradient(45deg, ${COLORS.PRIMARY_DARK}, ${COLORS.SECONDARY_DARK})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
      {text}
    </Typography>
  </Box>
));


export default PricingGrid;