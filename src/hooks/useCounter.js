import { useState, useEffect, useCallback } from 'react';

const useCounter = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);

  const animateCount = useCallback(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  useEffect(() => {
    // A simple trigger for the animation on component mount.
    // For more advanced use cases, you might use Intersection Observer
    // to start the animation only when the component enters the viewport.
    animateCount();
  }, [animateCount]);

  return count;
};

export default useCounter;