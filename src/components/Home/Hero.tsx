'use client';
import { useRef, useState, useEffect } from 'react';
import { Box, Container, Typography, useTheme, alpha, Button, Stack, IconButton } from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import NextLink from 'next/link';
import { ArrowRight, Sparkles, Rocket, Stars, Gem, Crown, Zap, ShieldCheck } from 'lucide-react';

const floatingVariants = {
  float: {
    y: [-10, 10],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export const HeroSection = () => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const cyberGradient = `linear-gradient(
    135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.secondary.main} 50%,
    ${theme.palette.success.main} 100%
  )`;

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 25 },
        background: `
          radial-gradient(ellipse at 20% 20%, ${alpha(theme.palette.primary.main, 0.1)}, transparent),
          radial-gradient(ellipse at 80% 80%, ${alpha(theme.palette.secondary.main, 0.1)}, transparent),
          ${alpha(theme.palette.background.default, 0.97)}
        `,
        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Container maxWidth="lg" ref={ref}>
        <Stack alignItems="center" spacing={6} sx={{ position: 'relative', zIndex: 1 }}>
          {/* Animated Icon Grid */}
          <motion.div
            style={{ position: "relative", width: "100%", height: 120 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              hidden: { opacity: 0 },
            }}
          >
            {[Sparkles, Rocket, Stars, Gem, Crown].map((Icon, index) => (
              <motion.div
                key={index}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    rotate: 0
                  },
                  hidden: {
                    opacity: 0,
                    scale: 0.5,
                    x: index % 2 === 0? -50: 50,
                    rotate: 45
                  },
                }}
                style={{
                  position: "absolute",
                  left: `${20 + index * 15}%`,
                  top: "50%",
                }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon
                  size={48}
                  style={{
                    color: cyberGradient,
                    filter: `drop-shadow(0 0 12px ${alpha(theme.palette.primary.main, 0.3)})`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Dynamic Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView? { opacity: 1, y: 0 }: {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{ position: "relative", textAlign: 'center' }}
          >
            <Typography
              variant="h1"
              component={motion.h1}
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                lineHeight: 1.1,
                letterSpacing: "-0.05em",
                background: cyberGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: `drop-shadow(0 4px 20px ${alpha(theme.palette.primary.main, 0.2)})`,
                cursor: 'default',
              }}
              animate={isHovered? {
                scale: 1.02,
                textShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.4)}`
              }: {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Next-Level Digital
              <Box component="span" sx={{
                display: { xs: "block", md: "inline" },
                ml: 2,
                backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.success.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Transformation
              </Box>
            </Typography>

            {/* Interactive Underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered? 1: 0.8 }}
              style={{
                height: 4,
                background: cyberGradient,
                borderRadius: 2,
                marginTop: theme.spacing(2),
                transformOrigin: 'center'
              }}
            />
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: inView? 1: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <ShieldCheck size={24} color={theme.palette.success.main} />
              <Typography variant="body1" sx={{
                fontWeight: 500,
                color: alpha(theme.palette.text.primary, 0.9)
              }}>
                Enterprise-grade Security
              </Typography>
            </Stack>

            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 400,
                textAlign: "center",
                maxWidth: 800,
                color: alpha(theme.palette.text.primary, 0.9),
                textShadow: `0 2px 10px ${alpha(theme.palette.background.default, 0.5)}`,
              }}
            >
              Accelerate your digital evolution with AI-driven solutions that
              <Box component="span" sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                ml: 1
              }}>
                exceed expectations
              </Box>
            </Typography>
          </motion.div>

          {/* Enhanced CTAs */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mt: 4 }}>
            <Button
              component={motion.a}
              href="/free-trial"
              variant="contained"
              size="large"
              endIcon={<Zap size={24} />}
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 700,
                borderRadius: "15px",
                background: cyberGradient,
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.5)}`,
                },
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </Button>

            <Button
              component={motion.a}
              href="/solutions"
              variant="outlined"
              size="large"
              startIcon={<Sparkles size={24} />}
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 700,
                borderRadius: "15px",
                border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                color: theme.palette.text.primary,
                backdropFilter: "blur(8px)",
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.08),
                  borderColor: theme.palette.primary.main,
                },
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Features
            </Button>
          </Stack>
        </Stack>

        {/* Floating Decorations */}
        <motion.div
          variants={floatingVariants}
          animate="float"
          style={{
            position: "absolute",
            left: "5%",
            top: "20%",
            opacity: 0.7,
            zIndex: 0
          }}
        >
          <Sparkles size={48} color={alpha(theme.palette.secondary.main, 0.6)} />
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 0.5 }}
          style={{
            position: "absolute",
            right: "10%",
            top: "70%",
            opacity: 0.7,
            zIndex: 0
          }}
        >
          <Stars size={48} color={alpha(theme.palette.success.main, 0.6)} />
        </motion.div>
      </Container>
    </Box>
  );
};