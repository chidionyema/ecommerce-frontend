'use client';  // Add this at the top

import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="custom-cursor" style={{
      position: 'fixed',
      left: `${position.x}px`,
      top: `${position.y}px`,
      pointerEvents: 'none',
      zIndex: 9999,
      transition: 'transform 0.2s ease-out',
      mixBlendMode: 'difference'
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="none" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default CustomCursor;