import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import throttle from 'lodash/throttle'; // Import throttle from lodash

interface HorizontalScrollPanelProps {
  children: React.ReactNode;
  scrollSpeed?: number; // Customize scroll speed
  scrollbarWidth?: number; // Customize scrollbar width
  scrollbarColor?: string; // Customize scrollbar color
  gradientColor?: string; // Customize gradient color
}

const HorizontalScrollPanel: React.FC<HorizontalScrollPanelProps> = ({
  children,
  scrollSpeed = 200,
  scrollbarWidth = 4,
  scrollbarColor = 'rgba(0, 0, 0, 0.1)',
  gradientColor = 'rgba(255, 255, 255, 0.05)',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true); 

  const updateScrollButtons = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth); 
    }
  }, []);

  // Use throttled updateScrollButtons for better performance
  const throttledUpdateScrollButtons = throttle(updateScrollButtons, 100);

  useEffect(() => {
    throttledUpdateScrollButtons();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', throttledUpdateScrollButtons);
    window.addEventListener('resize', throttledUpdateScrollButtons);
    return () => {
      el.removeEventListener('scroll', throttledUpdateScrollButtons);
      window.removeEventListener('resize', throttledUpdateScrollButtons);
    };
  }, [throttledUpdateScrollButtons]);

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollToLeftEnd = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  const scrollToRightEnd = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth; 
    }
  };

  // Implement click-and-drag / swipe scrolling:
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = event.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollStart.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    event.preventDefault();
    const x = event.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1; // Adjust scroll speed multiplier if needed
    scrollContainerRef.current.scrollLeft = scrollStart.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  // Similar support for touch events
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollStart.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    scrollContainerRef.current.scrollLeft = scrollStart.current - walk;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <IconButton 
        aria-label="Scroll Right" 
        onClick={scrollToRightEnd} 
        sx={{
          position: 'absolute',
          left: 8, 
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ChevronRight />
      </IconButton>

      <Box
        ref={scrollContainerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        sx={{ 
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          // Customize scrollbar appearance
          scrollbarWidth: scrollbarWidth,
          scrollbarColor: `${scrollbarColor} transparent`, 
          touchAction: 'pan-x',
          userSelect: isDragging.current ? 'none' : 'auto',
          width: '100%',
          // Add subtle gradient for visual cue
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '10px',
            height: '100%',
            background: `linear-gradient(to right, ${gradientColor}, transparent)`, 
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '10px',
            height: '100%',
            background: `linear-gradient(to left, ${gradientColor}, transparent)`, 
          },
        }}
      >
        {children}
      </Box>

      <IconButton 
        aria-label="Scroll Left" 
        onClick={scrollToLeftEnd} 
        sx={{
          position: 'absolute',
          right: 8, 
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ChevronLeft />
      </IconButton>
    </Box>
  );
};

export default HorizontalScrollPanel;