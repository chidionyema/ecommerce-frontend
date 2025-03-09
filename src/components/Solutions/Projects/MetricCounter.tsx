import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme, SxProps, Theme } from '@mui/material/styles';

// Define the prop types
interface MetricCounterProps {
  value: string;
  color: string;
  isVisible?: boolean;
  delay?: number;
  sx?: SxProps<Theme>;
  duration?: number;
  easingFunction?:
    | 'linear'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic'
    | 'easeOutExpo'
    | 'easeInOutExpo';
}

// EasingFunction type
type EasingFunction = (t: number) => number;

/**
 * MetricCounter - A component that animates counting up to a numeric value
 */
const MetricCounter: React.FC<MetricCounterProps> = ({
  value,
  color,
  isVisible = true,
  delay = 0,
  sx = {},
  duration = 1500,
  easingFunction = 'easeOutExpo',
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const theme = useTheme();

  // Extract numeric part, prefix, and suffix from the value
  const numericMatch = value.match(/[-+]?[0-9]*\.?[0-9]+/);
  const numericValue: number = numericMatch ? parseFloat(numericMatch[0]) : 0;

  const hasDecimals: boolean = value.includes('.') || numericValue % 1 !== 0;
  const precision: number = hasDecimals ? 1 : 0;

  // Extract prefix and suffix
  const matches = value.match(/^([^0-9.]*)[-+]?[0-9]*\.?[0-9]+(.*)$/);
  const prefix: string = matches?.[1] || '';
  const suffix: string = matches?.[2] || '';

  // Easing functions
  const easingFunctions: Record<string, EasingFunction> = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => --t * t * t + 1,
    easeInOutCubic: (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInOutExpo: (t) =>
      t === 0
        ? 0
        : t === 1
        ? 1
        : t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2,
  };

  // Selected easing function (fallback to 'linear' if not found)
  const easing: EasingFunction =
    easingFunctions[easingFunction] || easingFunctions.linear;

  useEffect(() => {
    if (!isVisible) return;

    let delayTimeout: ReturnType<typeof setTimeout>;

    // Animation function
    const animateCount = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsedTime = timestamp - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easing(progress);

      // Current value
      const currentValue = Math.min(numericValue * easedProgress, numericValue);

      // Format the display value
      const formattedValue = hasDecimals
        ? currentValue.toFixed(precision)
        : Math.floor(currentValue).toString();

      setDisplayValue(`${prefix}${formattedValue}${suffix}`);

      // Continue if not done
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateCount);
      }
    };

    // Start after delay
    delayTimeout = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animateCount);
    }, delay * 1000);

    // Cleanup on unmount
    return () => {
      clearTimeout(delayTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isVisible,
    numericValue,
    delay,
    duration,
    hasDecimals,
    precision,
    prefix,
    suffix,
    easing,
  ]);

  // Fallback if something fails
  const displayedValue = displayValue || value;

  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        position: 'relative',
        display: 'inline-block',
        // Apply a default color unless user overrides in sx
        color: color || theme.palette.primary.main,
        ...sx,
      }}
    >
      {displayedValue}
    </Typography>
  );
};

export default MetricCounter;
