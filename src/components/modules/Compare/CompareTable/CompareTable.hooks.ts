import { useEffect, useMemo, useRef, useState } from 'react';

import { TIME } from '~/lib/constants';
import debounce from '~/lib/utils/debounce';

export enum SCROLLBAR_DIRRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

const checkScrollBar = (element: HTMLElement, dir: SCROLLBAR_DIRRECTION) => {
  if (!element) {
    return false;
  }

  const direction =
    dir === SCROLLBAR_DIRRECTION.VERTICAL ? 'scrollTop' : 'scrollLeft';

  let res = !!element[direction];

  if (!res) {
    element[direction] = 1;
    res = !!element[direction];
    element[direction] = 0;
  }
  return res;
};

export const useHasScrollBar = ({
  direction,
}: {
  direction: SCROLLBAR_DIRRECTION;
}) => {
  const node = useRef<HTMLElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

  const onResize = debounce(
    () => {
      setHasScrollbar(checkScrollBar(node.current as HTMLElement, direction));
    },
    TIME.MS200,
    { isImmediate: true },
  );

  useEffect(() => {
    if (!node || !node.current) {
      return;
    }

    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return useMemo(() => ({ ref: node, hasScrollbar }), [node, hasScrollbar]);
};
