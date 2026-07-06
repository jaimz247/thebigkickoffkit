import { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
}

export function AnimatedNumber({ value, prefix = '$' }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValueRef = useRef(value);

  useEffect(() => {
    const start = previousValueRef.current;
    const end = value;
    if (start === end) return;

    const duration = 800; // milliseconds
    const startTime = performance.now();

    let animationFrameId: number;

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out: 1 - (1 - x)^3
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = start + (end - start) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(end);
        previousValueRef.current = end;
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  // Handle case where start and end values are equal initially
  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return (
    <span className="font-mono">
      {prefix}
      {displayValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}
