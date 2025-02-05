// components/Common/WhyChooseUs.js
'use client';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  useTheme,
  alpha,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle } from 'react-feather';
import NextLink from 'next/link';
import {
  SECTION_HEIGHT,
  COLORS,
  FONT_SIZES,
  SPACING,
  BUTTON_SIZES,
} from '../../utils/sharedStyles';

export const WhyChooseUs = () => {
  const theme = useTheme();

  const reasons = [
    'Expert Consultation',
    'Innovative Solutions',
    'Reliable Execution',
    'Scalable Growth',
  ];

  return (
    <Box
      sx={{
        minHeight: SECTION_HEIGHT,
        background: `linear-gradient(45deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        py: SPACING.medium, // Consistent vertical padding
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: 'white',
            fontWeight: 700,
            mb: SPACING.medium, // Consistent margin-bottom
            fontSize: FONT_SIZES.h3, // Use FONT_SIZES.h3
          }}
        >
          Why Choose Us?
        </Typography>

        <List sx={{ mx: 'auto', width: '100%', maxWidth: '80%' }}>
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.3,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <ListItem>
                <ListItemIcon>
                  <CheckCircle
                    size={24}
                    color={COLORS.primary}
                    strokeWidth={2}
                  />
                </ListItemIcon>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, fontSize: FONT_SIZES.h5 }} // Use FONT_SIZES.h5
                >
                  {reason}
                </Typography>
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Box sx={{ textAlign: 'center', mt: SPACING.medium }}> {/* Consistent margin-top */}
          <NextLink href="/contact" passHref legacyBehavior>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              size="large"
              sx={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                color: theme.palette.common.white,
                px: BUTTON_SIZES.medium.padding, // Use BUTTON_SIZES.medium.padding
                py: 1.5,
                fontSize: FONT_SIZES.body1, // Use FONT_SIZES.body1
                fontWeight: 700,
                borderRadius: '16px',
                boxShadow: `0 12px 32px ${alpha(
                  theme.palette.primary.main,
                  0.3,
                )}`,
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.08),
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              Contact Us
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;