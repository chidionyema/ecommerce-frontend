import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import ChevronUp from '@mui/icons-material/ChevronUp';
import ChevronDown from '@mui/icons-material/ChevronDown';

import throttle from 'lodash/throttle';

interface VerticalScrollPanelProps {
  children: React.ReactNode;
  scrollSpeed?: number;
  containerHeight?: string | number; // Allow setting a specific height
}

const VerticalScrollPanel: React.FC<VerticalScrollPanelProps> = ({
  children,
  scrollSpeed = 200,
  containerHeight = '100%', // Default to 100% of parent
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const updateScrollButtons = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollUp(el.scrollTop > 0);
      setCanScrollDown(el.scrollTop < el.scrollHeight - el.clientHeight);
      // console.log('scrollTop:', el.scrollTop);
      // console.log('scrollHeight:', el.scrollHeight);
      // console.log('clientHeight:', el.clientHeight);
      // console.log('canScrollDown:', el.scrollTop < el.scrollHeight - el.clientHeight);
    }
  },);

  const throttledUpdate = useMemo(
    () => throttle(updateScrollButtons, 100),
    [updateScrollButtons]
  );

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const opts: AddEventListenerOptions = { passive: true };

    el.addEventListener('scroll', throttledUpdate, opts);
    window.addEventListener('resize', throttledUpdate, opts);
    // Call update on initial load to set initial button states
    throttledUpdate();

    return () => {
      el.removeEventListener('scroll', throttledUpdate, opts);
      window.removeEventListener('resize', throttledUpdate, opts);
      throttledUpdate.cancel();
    };
  }, [throttledUpdate]);

  const handleScroll = (direction: 'up' | 'down') => () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const amount = direction === 'up' ? -scrollSpeed : scrollSpeed;
    el.scrollBy({ top: amount, behavior: 'smooth' });
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: containerHeight }}> {/* Use containerHeight prop */}
      {canScrollUp && (
        <IconButton
          aria-label="Scroll up"
          onClick={handleScroll('up')}
          sx={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            ...(isMobile && { display: 'none' }),
          }}
        >
          <ChevronUp />
        </IconButton>
      )}

      <Box
        ref={scrollContainerRef}
        sx={{
          overflowY: isMobile ? 'visible' : 'auto',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          height: '100%', // Ensure inner box takes full height
          '&::-webkit-scrollbar': {
            width: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
          },
        }}
      >
        {children}
      </Box>

      {canScrollDown && (
        <IconButton
          aria-label="Scroll down"
          onClick={handleScroll('down')}
          sx={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            ...(isMobile && { display: 'none' }),
          }}
        >
          <ChevronDown />
        </IconButton>
      )}
    </Box>
  );
};

export default VerticalScrollPanel;