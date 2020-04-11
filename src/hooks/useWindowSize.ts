import { useState, useEffect } from 'react';

interface Size {
  height: number;
  width: number;
}

export function useWindowSize() {
  const isClient = typeof window !== 'undefined';
  const [elementSize, setElementSize] = useState<Size>({ height: 0, width: 0 });

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
    handleResize(); // trigers a re-render, potentially rendering a new value for element
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]); // if element changes, reset it.

  return elementSize;
}
