// components/navigation/NavItem.tsx
import { memo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface NavItemProps {
  path: string;
  label: string;
  isActive?: boolean;
}

const NavItem = memo(({ path, label, isActive }: NavItemProps) => {
  const router = useRouter();
  const navigationLock = useRef(false);
  const theme = useTheme();

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();

    if (navigationLock.current) return;
    navigationLock.current = true;

    try {
      router.push(path);
    } catch (err) {
      console.error('Navigation error:', err);
    } finally {
      setTimeout(() => {
        navigationLock.current = false;
      }, 100);
    }

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
        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
        fontWeight: isActive ? 600 : 400,
        textDecoration: 'none',
        position: 'relative',
        transition: 'color 0.2s ease-in-out, font-weight 0.2s ease-in-out',
        '&::before': { // Animated underline on hover and active
          content: '""',
          position: 'absolute',
          bottom: -6,
          left: '50%',
          transform: 'translateX(-50%) scaleX(0)',
          width: '70%',
          height: '2px',
          backgroundColor: theme.palette.primary.main,
          borderRadius: '1px',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '&:hover::before': {
          transform: 'translateX(-50%) scaleX(1)',
        },
        ...(isActive && {
          '&::before': {
            transform: 'translateX(-50%) scaleX(1)', // Underline always visible when active
          },
        }),
        '&:focus': {
          outline: `2px solid ${theme.palette.primary.light}`,
          outlineOffset: '2px',
        },
      }}
    >
      {label}
    </Box>
  );
});

NavItem.displayName = 'NavItem';

export default NavItem;