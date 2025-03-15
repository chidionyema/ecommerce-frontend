import { memo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';

type NavItemProps = {
  path: string;
  label: string;
};

const NavItem = memo(({ path, label }: NavItemProps) => {
  const router = useRouter();
  const navigationLock = useRef(false);

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (navigationLock.current) return;
    navigationLock.current = true;

    try {
      router.push(path);
    } catch (err) {
      // This block won't actually catch anything since router.push is void
      // but kept for type safety
      console.error('Navigation error:', err);
    } finally {
      // Add a slight delay to allow navigation to start
      setTimeout(() => {
        navigationLock.current = false;
      }, 100);
    }
    
    // Safety timeout to ensure the lock is eventually reset
    setTimeout(() => {
      navigationLock.current = false;
    }, 2000);
  };

  return (
    <Box
      component="a"
      href={path}
      onClick={handleNavigation}
      sx={{
        display: 'block',
        px: 2,
        py: 1,
        cursor: 'pointer',
        color: 'text.primary',
        '&:hover': {
          color: 'primary.main',
          bgcolor: 'action.hover'
        },
        textDecoration: 'none',
        position: 'relative'
      }}
    >
      {label}
    </Box>
  );
});

NavItem.displayName = 'NavItem';

export default NavItem;