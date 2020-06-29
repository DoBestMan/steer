import { useEffect, useRef } from 'react';

function usePrevious(value: boolean | string | number) {
  const ref = useRef<boolean | string | number | undefined>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
