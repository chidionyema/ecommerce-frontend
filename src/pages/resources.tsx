import React from 'react';
import BlogCard from '../components/BlogCard';
import { Container, Grid, Typography, useTheme, useMediaQuery, Box } from '@mui/material';
import SEO from '../components/SEO';
import { Cloud, VpnKey, Code } from '@mui/icons-material';

const Resources: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const resources = [
    {
      id: 1,
      title: 'Understanding the Basics of Cloud Computing',
      summary: 'A beginner-friendly guide to understanding cloud computing and its various models.',
      path: '/resources/cloud-computing',
      icon: <Cloud fontSize="large" />,
    },
    {
      id: 2,
      title: 'Integrating Vault with .NET',
      summary: 'Learn how to securely integrate HashiCorp Vault with your .NET application for secrets management.',
      path: '/resources/integrating-vault-dotnet',
      icon: <VpnKey fontSize="large" />,
    },
    {
      id: 3,
      title: 'Exploring Serverless Architectures',
      summary: 'An overview of serverless computing and how it can simplify the deployment of applications.',
      path: '/resources/serverless',
      icon: <Code fontSize="large" />,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#f4f6f8',
        padding: isMobile ? '32px 0' : '64px 0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <SEO
        title="Resources - Technology Insights"
        description="Explore expert insights on cloud computing, CI/CD, serverless architectures, and other tech trends."
      />
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: isMobile ? '0 16px' : '0 24px',
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? '28px' : '42px', // Increased font size
            color: '#2c3e50',
            marginBottom: isMobile ? '24px' : '48px', // Increased margin
            lineHeight: 1.2,
            textDecoration: 'none',
          }}
        >
          Explore Our Tech Resources
        </Typography>
        <Grid
          container
          spacing={isMobile ? 2 : 4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {resources.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={post.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <BlogCard {...post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Resources;