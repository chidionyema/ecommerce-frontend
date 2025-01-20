import React from 'react';
import { Card, CardContent, Typography, CardActionArea, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { VpnKey, Cloud, Code } from '@mui/icons-material'; // Importing the icons

interface BlogCardProps {
  title: string;
  summary: string;
  path: string;
  icon: React.ReactNode; // Using ReactNode for the icon
}

const BlogCard: React.FC<BlogCardProps> = ({ title, summary, path, icon }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      elevation={8}
      sx={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)', // Enhanced shadow on hover
        },
        maxWidth: isMobile ? '100%' : '345px', // Responsive max width
        width: '100%', // Ensure it takes full width on mobile
        border: '1px solid rgba(0, 0, 0, 0.1)', // Subtle border for depth
      }}
    >
      <Link href={path} passHref>
        <CardActionArea
          sx={{
            textDecoration: 'none', // Remove underline
            height: '100%', // Ensure the entire card is clickable
          }}
        >
          <CardContent
            sx={{
              padding: isMobile ? '20px' : '32px', // Increased padding for better spacing
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%', // Ensure the content takes full height
            }}
          >
            <div
              style={{
                fontSize: isMobile ? '48px' : '56px', // Larger icon size
                marginBottom: isMobile ? '20px' : '24px', // Increased margin
                color: '#4A47A3', // Icon color (updated to match theme)
                transition: 'color 0.3s ease', // Smooth color transition
              }}
            >
              {icon}
            </div>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 700, // Bold font for the title
                color: '#2c3e50',
                marginBottom: isMobile ? '16px' : '20px', // Increased margin
                fontSize: isMobile ? '1.25rem' : '1.5rem', // Larger font size
                textDecoration: 'none', // Ensure no underline
                transition: 'color 0.3s ease', // Smooth color transition
                '&:hover': {
                  color: '#4A47A3', // Change title color on hover
                },
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontWeight: 400,
                color: '#555',
                fontSize: isMobile ? '0.9rem' : '1rem', // Slightly larger font size
                textDecoration: 'none', // Ensure no underline
                lineHeight: 1.6, // Improved line height for readability
              }}
            >
              {summary}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default BlogCard;