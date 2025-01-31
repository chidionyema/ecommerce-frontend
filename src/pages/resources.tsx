'use client';

import { useState } from 'react';
import { 
  Box, Typography, Grid, Button, Container, useTheme, 
  useMediaQuery, alpha, Chip, ToggleButton, ToggleButtonGroup,
  Badge, Skeleton
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import SEO from "../components/SEO";
import BaseCard from "../components/BaseCard";
import { Cloud, VpnKey, Code, Download, TrendingUp } from "@mui/icons-material";
import { useHotjar } from 'react-use-hotjar';
import { useEffect } from 'react';

const resources = [
  {
    id: 1,
    title: "Mastering Cloud Computing",
    summary: "Comprehensive guide to cloud infrastructure and deployment strategies.",
    path: "/resources/cloud-computing",
    icon: Cloud,
    downloads: "1.2K+",
    trending: true,
    tags: ['devops', 'cloud', 'guide'],
    time: '15 min read'
  },
  {
    id: 2,
    title: "Secrets Management with Vault",
    summary: "Enterprise-grade secrets management in .NET using HashiCorp Vault.",
    path: "/resources/integrating-vault-dotnet",
    icon: VpnKey,
    downloads: "850+",
    trending: false,
    tags: ['security', '.NET', 'devops'],
    time: '20 min read'
  },
  {
    id: 3,
    title: "Serverless Architecture Guide",
    summary: "Optimize cloud costs with serverless implementation best practices.",
    path: "/resources/serverless",
    icon: Code,
    downloads: "2K+",
    trending: true,
    tags: ['serverless', 'cloud', 'cost-optimization'],
    time: '25 min read'
  },
];

const Resources = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [filter, setFilter] = useState('all');
  const { heatmap } = useHotjar();

  useEffect(() => {
    // Initialize heatmap tracking
    heatmap('v1', '/resources', 'Resources Page View');
  }, []);

  const handleFilter = (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(145deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        minHeight: "100vh",
        py: 12,
        px: isMdDown ? 2 : 0,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `
            repeating-linear-gradient(
              45deg,
              ${alpha(theme.palette.secondary.main, 0.02)} 0px,
              ${alpha(theme.palette.secondary.main, 0.02)} 2px,
              transparent 2px,
              transparent 8px
            )`,
        },
      }}
    >
      <SEO 
        title="Technical Resources - Expert Insights"
        description="Cutting-edge technical resources on cloud architecture, DevOps, and modern software development."
        keywords="cloud computing, devops, technical resources"
        ogImage="/og-resources.jpg"
      />

      <Container maxWidth="xl">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              component={motion.h1}
              variant="h1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{
                fontWeight: 900,
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 70%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.5rem", md: "4rem" },
                lineHeight: 1.2
              }}
            >
              Accelerate Your Tech Mastery
            </Typography>
            
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilter}
                sx={{
                  '& .MuiToggleButton-root': {
                    color: theme.palette.text.secondary,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    '&.Mui-selected': {
                      background: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }
                  }
                }}
              >
                <ToggleButton value="all" aria-label="All resources">
                  All
                </ToggleButton>
                <ToggleButton value="trending" aria-label="Trending resources">
                  Trending
                </ToggleButton>
                <ToggleButton value="devops" aria-label="DevOps resources">
                  DevOps
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Typography
              variant="subtitle1"
              component={motion.div}
              sx={{
                color: 'text.secondary',
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Join 15,000+ engineers who boost their skills monthly with our expert-curated resources
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {resources
              .filter(res => 
                filter === 'all' ? true :
                filter === 'trending' ? res.trending :
                res.tags.includes(filter)
              )
              .map((resource) => (
                <Grid item xs={12} md={4} key={resource.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <BaseCard
                      sx={{
                        height: '100%',
                        p: 4,
                        background: `linear-gradient(145deg, ${alpha(
                          theme.palette.primary.dark,
                          0.96
                        )}, ${alpha(theme.palette.secondary.dark, 0.96)})`,
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover:after': {
                          opacity: 1
                        }
                      }}
                    >
                      {/* Trending Badge */}
                      {resource.trending && (
                        <Chip
                          icon={<TrendingUp fontSize="small" />}
                          label="Trending"
                          color="secondary"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            fontWeight: 700,
                            backdropFilter: 'blur(4px)'
                          }}
                        />
                      )}

                      <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <resource.icon sx={{ 
                          fontSize: 64, 
                          color: theme.palette.secondary.main,
                          filter: 'drop-shadow(0 4px 12px rgba(98, 0, 238, 0.2))'
                        }} />
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 70%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textAlign: 'center'
                        }}
                      >
                        {resource.title}
                      </Typography>

                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                        mb: 2,
                        flexWrap: 'wrap'
                      }}>
                        {resource.tags.map(tag => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main
                            }}
                          />
                        ))}
                        <Chip
                          icon={<Download fontSize="small" />}
                          label={resource.downloads}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          mb: 4,
                          textAlign: 'center'
                        }}
                      >
                        {resource.summary}
                      </Typography>

                      <Box sx={{ textAlign: 'center' }}>
                        <NextLink href={resource.path} passHref legacyBehavior>
                          <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<Download />}
                            sx={{
                              fontWeight: 700,
                              px: 6,
                              py: 1.5,
                              borderRadius: 50,
                              boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.3)}`,
                              '&:hover': {
                                transform: 'translateY(-2px)'
                              }
                            }}
                          >
                            Download Guide
                          </Button>
                        </NextLink>
                        
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mt: 2,
                            color: 'text.disabled'
                          }}
                        >
                          {resource.time}
                        </Typography>
                      </Box>
                    </BaseCard>
                  </motion.div>
                </Grid>
              ))}
          </AnimatePresence>
        </Grid>

        {/* Social Proof Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          sx={{
            mt: 12,
            p: 4,
            background: alpha(theme.palette.background.paper, 0.1),
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Trusted by engineers at
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
            {['Google', 'Microsoft', 'AWS', 'Netflix'].map((company) => (
              <Typography 
                key={company}
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 70%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.8
                }}
              >
                {company}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Resources;