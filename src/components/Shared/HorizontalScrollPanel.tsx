import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import throttle from 'lodash/throttle';

interface HorizontalScrollPanelProps {
  children: React.ReactNode;
  scrollSpeed?: number;
}

const HorizontalScrollPanel: React.FC<HorizontalScrollPanelProps> = ({
  children,
  scrollSpeed = 200,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const updateScrollButtons = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth);
    }
  }, []);

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

    return () => {
      el.removeEventListener('scroll', throttledUpdate, opts);
      window.removeEventListener('resize', throttledUpdate, opts);
      throttledUpdate.cancel();
    };
  }, [throttledUpdate]);

  const handleScroll = (direction: 'left' | 'right') => () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const amount = direction === 'left' ? -scrollSpeed : scrollSpeed;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {canScrollLeft && (
        <IconButton
          aria-label="Scroll left"
          onClick={handleScroll('left')}
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            ...(isMobile && { display: 'none' }),
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          overflowX: isMobile ? 'visible' : 'auto',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            height: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
          },
        }}
      >
        {children}
      </Box>

      {canScrollRight && (
        <IconButton
          aria-label="Scroll right"
          onClick={handleScroll('right')}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            ...(isMobile && { display: 'none' }),
          }}
        >
          <ChevronRight />
        </IconButton>
      )}
    </Box>
  );
};

export default HorizontalScrollPanel;
