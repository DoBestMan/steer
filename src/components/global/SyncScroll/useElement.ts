import { RefCallback, useCallback, useState } from 'react';

export const useElement = <T extends HTMLElement>(): [
  HTMLElement | undefined,
  RefCallback<T>,
] => {
  // Adapted from [official hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)
  const [element, setElement] = useState<T>();
  const ref = useCallback<RefCallback<T>>((el) => {
    if (el === null) {
      return;
    }
    setElement(el);
  }, []);

  return [element, ref];
};
