import { useEffect, useState } from 'react';

export function usePreferedReduceMotion() {
  const [hasMotion, setMasMotion] = useState(true);

  useEffect(() => {
    if (typeof window.matchMedia === 'function') {
      setMasMotion(!window.matchMedia('(prefers-reduced-motion)').matches);
    }
  }, []);

  return hasMotion;
}
