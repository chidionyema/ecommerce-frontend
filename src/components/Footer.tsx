import React from 'react';
import { Box, Typography, Link, Stack, IconButton } from '@mui/material';
import { LinkedIn, Twitter, GitHub } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ 
      borderTop: '1px solid',
      borderColor: 'divider',
      background: 'linear-gradient(195deg, rgba(18, 18, 18, 0.98) 0%, rgba(28, 28, 28, 0.98) 100%)',
      backdropFilter: 'blur(12px)',
      pt: 8,
      pb: 6,
      px: 2,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
      }
    }}>
      <Box sx={{ 
        maxWidth: 1200,
        mx: 'auto',
        textAlign: { xs: 'center', md: 'left' }
      }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-between" alignItems="center">
          {/* Branding Section */}
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" component="div" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FFF 30%, #AAA 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              GluStack
            </Typography>
            <Typography variant="body2" sx={{ 
              mt: 1,
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.875rem',
              maxWidth: 300
            }}>
              Innovating the future of web experiences
            </Typography>
          </Box>

          {/* Legal Links */}
          <Stack direction="row" spacing={4} sx={{ mb: { xs: 4, md: 0 } }}>
            <Stack spacing={1}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px' }}>
                LEGAL
              </Typography>
              <Link href="/privacy-policy" color="inherit" sx={{ 
                transition: 'color 0.2s',
                '&:hover': { color: 'primary.main' },
                color: 'rgba(255,255,255,0.8)'
              }}>
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" color="inherit" sx={{ 
                transition: 'color 0.2s',
                '&:hover': { color: 'primary.main' },
                color: 'rgba(255,255,255,0.8)'
              }}>
                Terms of Service
              </Link>
            </Stack>
          </Stack>

          {/* Social Links */}
          <Stack direction="row" spacing={2}>
            <IconButton href="https://linkedin.com" target="_blank" rel="noopener" sx={{
              color: 'rgba(255,255,255,0.8)',
              transition: 'all 0.3s',
              '&:hover': { 
                color: 'primary.main',
                transform: 'translateY(-2px)'
              }
            }}>
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" rel="noopener" sx={{
              color: 'rgba(255,255,255,0.8)',
              transition: 'all 0.3s',
              '&:hover': { 
                color: 'primary.main',
                transform: 'translateY(-2px)'
              }
            }}>
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton href="https://github.com" target="_blank" rel="noopener" sx={{
              color: 'rgba(255,255,255,0.8)',
              transition: 'all 0.3s',
              '&:hover': { 
                color: 'primary.main',
                transform: 'translateY(-2px)'
              }
            }}>
              <GitHub fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* Copyright */}
        <Typography variant="body2" sx={{ 
          mt: 6,
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          fontSize: '0.75rem'
        }}>
          &copy; {new Date().getFullYear()} GluStack. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;