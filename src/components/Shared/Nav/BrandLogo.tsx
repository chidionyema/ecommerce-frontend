import { memo, useState } from 'react';
import Link from 'next/link';
import { Box, Paper, Stack, Typography, useTheme, alpha } from '@mui/material';
import { Cpu } from 'lucide-react';

const BrandLogo = memo(() => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [textHovered, setTextHovered] = useState(false);

  return (
    <Link href="/" passHref legacyBehavior>
      <Box
        component="a"
        sx={{
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
        onMouseEnter={() => { setIsHovered(true); setTextHovered(true); }}
        onMouseLeave={() => { setIsHovered(false); setTextHovered(false); }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Paper
            elevation={isHovered ? 12 : 4}
            sx={{
              position: 'relative',
              width: 42,
              height: 42,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              background: isHovered
                ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`
                : theme.palette.primary.main,
              boxShadow: isHovered
                ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`
                : `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <Cpu
              size={24}
              color="white"
              style={{
                filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
                transform: isHovered ? 'rotate(15deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                transition: 'all 0.4s ease',
              }}
            />
          </Paper>
          <Box>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                letterSpacing: '0.5px',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                lineHeight: 1,
                '& > span': {
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: textHovered ? 'translateY(-2px)' : 'none',
                },
              }}
            >
              <Box component="span" sx={{ display: 'inline-block', color: theme.palette.text.primary, fontWeight: 900 }}>
                GLU
              </Box>
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  background: `linear-gradient(90deg, ${theme.palette.primary.dark} 20%, ${theme.palette.primary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 900,
                  ml: 0.5,
                }}
              >
                Stack
              </Box>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Link>
  );
});

BrandLogo.displayName = 'BrandLogo';

export default BrandLogo;