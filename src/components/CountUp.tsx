import React, { useState, useEffect, useRef } from 'react';

export const CountUp = ({ end, duration = 1000 }) => {
  const [count, setCount] = useState(0);
  const startRef = useRef(0);

  useEffect(() => {
    let startTime;
    let animationFrame;
    const startVal = startRef.current;
    const change = end - startVal;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const newValue = Math.floor(startVal + change * ease);
      setCount(newValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        startRef.current = end; // Store final value for next animation
      }
    };

    if (startVal !== end) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
};