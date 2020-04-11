import { useState, useEffect } from 'react';

export function useHash(): string {
  const [hash, setHash] = useState<string>('');

  useEffect(() => {
    setHash(window.location.hash.replace('#', ''));
  }, []);

  return hash;
}
