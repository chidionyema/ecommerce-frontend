import { useRouter } from 'next/navigation';
import { Drawer, Box, IconButton, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import BrandLogo from './BrandLogo';
import { NAV_ITEMS } from './navItems';
import { useCallback, useRef } from 'react';

export const MobileNav = ({ isOpen, onClose }: { 
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const navigationLock = useRef(false);

  const handleNavigation = useCallback((path: string) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    
    try {
      router.push(path);
    } finally {
      // Add slight delay before closing to ensure navigation starts
      setTimeout(() => {
        navigationLock.current = false;
        onClose();
      }, 100);
    }
    
    // Force reset lock after 2s as safety
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
                color: 'inherit',
                '&:hover': { bgcolor: 'action.hover' }
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