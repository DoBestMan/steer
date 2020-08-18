import { useEffect, useRef } from 'react';

const useClickOutside = (callback: (event: Event) => void) => {
  const node = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function onClick(event: Event) {
      if (
        node &&
        node.current &&
        !node.current.contains(event.target as Node)
      ) {
        callback(event);
      }
    }

    document.addEventListener('keydown', onClick);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onClick);
    };
  });

  return node;
};

export default useClickOutside;
