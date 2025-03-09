// utils/animations.ts
export const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  export const staggerProps = {
    initial: "hidden",
    animate: "visible",
    transition: { staggerChildren: 0.1 }
  };

  // keyframes/my-keyframes.ts (example file)
import { keyframes } from '@mui/system';

/** Slowly scrolls background from 0% to 200%. Commonly used for a “flowing” background. */
export const hyperFlow = keyframes`
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

/**
 * Moves a small particle from (x, y) to (x*2, y-150) while scaling up and fading out.
 * Typically used in “burst” or “particle” animations.
 */
export const particleFloat = (x: number, y: number) => keyframes`
  0%   { transform: translate(${x}px, ${y}px) scale(0); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translate(${x * 2}px, ${y - 150}px) scale(1); opacity: 0; }
`;
