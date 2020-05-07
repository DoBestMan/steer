import { useEffect, useState } from 'react';

interface Size {
  height: number;
  width: number;
}

export function useWindowSize() {
  const isClient = typeof window !== 'undefined';
  const initialSize = {
    height: isClient ? window.innerHeight : 0,
    width: isClient ? window.innerWidth : 0,
  };
  const [elementSize, setElementSize] = useState<Size>(initialSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setElementSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // triggers a re-render, potentially rendering a new value for element
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]); // if element changes, reset it.

  return elementSize;
}
