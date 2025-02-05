// components/Common/TestimonialsSection.js
'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  alpha,
  Button,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { SECTION_HEIGHT, COLORS, FONT_SIZES, SPACING, CARD_SIZES, BUTTON_SIZES } from '../../utils/sharedStyles';
import TechCard from './TechCard';


const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO, TechCorp',
    content: 'Their strategy transformed our entire approach.',
    avatar: '/avatar1.jpg',
    icon: (
      <motion.svg width="40" height="40" fill={COLORS.primary}>
        <path d="M10 20 L20 10 L30 20" />
      </motion.svg>
    ),
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO, InnovateX',
    content: 'Precision execution that elevated our tech stack.',
    avatar: '/avatar2.jpg',
    icon: (
      <motion.svg width="40" height="40" fill={COLORS.primary}>
        <path d="M10 20 L20 10 L30 20" />
      </motion.svg>
    ),
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Founder, StartupHub',
    content: 'Top-tier consultancy with next-level expertise.',
    avatar: '/avatar3.jpg',
    icon: (
      <motion.svg width="40" height="40" fill={COLORS.primary}>
        <path d="M10 20 L20 10 L30 20" />
      </motion.svg>
    ),
  },
  {
    id: 4,
    name: 'Sarah Lee',
    role: 'Manager, TechSolutions',
    content: 'Best team we ever worked with.',
    avatar: '/avatar4.jpg',
    icon: (
      <motion.svg width="40" height="40" fill={COLORS.primary}>
        <path d="M10 20 L20 10 L30 20" />
      </motion.svg>
    ),
  },
  {
    id: 5,
    name: 'David Brown',
    role: 'Director, InnovateNow',
    content: 'Great support and expertise.',
    avatar: '/avatar5.jpg',
    icon: (
      <motion.svg width="40" height="40" fill={COLORS.primary}>
        <path d="M10 20 L20 10 L30 20" />
      </motion.svg>
    ),
  },
  {
    id: 6,
    name: 'Emily Davis',
    role: 'CEO, FutureTech',
    content: 'Absolutely game-changing.',
    avatar: '/avatar6.jpg',
    icon: (
      <motion.svg width="40" height="40" fill={COLORS.primary}>
        <path d="M10 20 L20 10 L30 20" />
      </motion.svg>
    ),
  },
];
const ViewMoreButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  borderRadius: 25,
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0px 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
  color: theme.palette.common.white,
  '&:hover': {
    background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    boxShadow: `0px 6px 20px ${alpha(theme.palette.secondary.main, 0.5)}`,
  },
  padding: theme.spacing(1.5, 4),
  fontSize: FONT_SIZES.body1,
}));

export const TestimonialsSection = () => {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        background: `linear-gradient(45deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        width: '100vw',
        minHeight: SECTION_HEIGHT,
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        py: SPACING.medium,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight={900}
          sx={{
            color: 'common.white',
            fontSize: FONT_SIZES.h2,
            lineHeight: 1.2,
            mb: SPACING.medium,
          }}
        >
          Client Success Stories
        </Typography>
        <Grid container spacing={SPACING.medium} justifyContent="center">
          {(showAll? testimonials: testimonials.slice(0, 3)).map((t, index) => (
            <Grid item key={t.id} xs={12} sm={6} md={4}>
              <TechCard
                icon={t.icon}
                title={t.name}
                color={theme.palette.primary.main}
                index={index}
                whileHover={{ scale: 1.05 }}
                floatingVariants={{
                  initial: { y: 0 },
                  animate: { y: -10 },
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: SPACING.small,
                  }}
                >
                  <Avatar
                    src={t.avatar}
                    sx={{
                      width: 50,
                      height: 50,
                      mb: SPACING.small,
                      mx: 'auto',
                      border: `2px solid ${COLORS.primary}`,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      mb: SPACING.small,
                      fontSize: FONT_SIZES.body1,
                    }}
                  >
                    "{t.content}"
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'common.white', fontSize: FONT_SIZES.body2 }}
                  >
                    {t.role}
                  </Typography>
                </Box>
              </TechCard>
            </Grid>
          ))}
        </Grid>

        {!showAll && (
          <Box sx={{ textAlign: 'center', mt: SPACING.medium }}>
            <ViewMoreButton
              variant="contained"
              size="large"
              onClick={() => setShowAll(true)}
              sx={{
                padding: BUTTON_SIZES.medium.padding, // Use BUTTON_SIZES.medium.padding
              }}
            >
              View More
            </ViewMoreButton>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;