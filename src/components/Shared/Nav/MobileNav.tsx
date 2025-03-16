// components/navigation/MobileNav.tsx
import { useRouter } from 'next/navigation';
import { Drawer, Box, IconButton, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import BrandLogo from './BrandLogo';
import { NAV_ITEMS } from './navItems';
import { useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';

export const MobileNav = ({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const navigationLock = useRef(false);
  const theme = useTheme();

  const handleNavigation = useCallback((path: string) => {
    if (navigationLock.current) return;
    navigationLock.current = true;

    try {
      router.push(path);
    } finally {
      setTimeout(() => {
        navigationLock.current = false;
        onClose();
      }, 100);
    }

    setTimeout(() => {
      navigationLock.current = false;
    }, 2000);
  }, [router, onClose]);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      SlideProps={{
        unmountOnExit: false,
        onExited: () => navigationLock.current = false
      }}
    >
      <Box sx={{ p: 2 }}>
        <IconButton onClick={onClose} sx={{ float: 'right', mb: 2 }}>
          <Close />
        </IconButton>
        <BrandLogo />
        <Stack spacing={0.75} mt={4}>
          {NAV_ITEMS.map((item) => (
            <Box
              key={item.path}
              component="a"
              role="link"
              tabIndex={0}
              sx={{
                cursor: 'pointer',
                p: 2,
                textDecoration: 'none',
                color: pathname === item.path ? theme.palette.primary.main : theme.palette.text.primary,
                fontWeight: pathname === item.path ? 600 : 400,
                '&:hover': { bgcolor: theme.palette.action.hover, color: theme.palette.primary.main },
                transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, font-weight 0.2s ease-in-out',
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.light}`,
                  outlineOffset: '2px',
                },
              }}
              onClick={() => handleNavigation(item.path)}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigation(item.path)}
            >
              {item.label}
            </Box>
          ))}
        </Stack>
      </Box>
    </Drawer>
  );
};