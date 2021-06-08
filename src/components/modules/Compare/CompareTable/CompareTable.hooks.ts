import { useEffect, useRef, useState } from 'react';

interface params {
  offset?: number;
  scrollContainerId?: string;
}
// maybe need to optimize this for the performance
const useXSticky = ({ scrollContainerId, offset = 0 }: params) => {
  const node = useRef<HTMLDivElement>(null);
  const width = useRef<number>(0);
  const [scrollContainer, setScrollContainer] = useState<
    Window | HTMLElement | null
  >(null);

  useEffect(() => {
    if (!scrollContainerId) {
      setScrollContainer(window);
      width.current = window.innerWidth;
    } else {
      const container = document.getElementById(`${scrollContainerId}`);
      setScrollContainer(container);
      width.current = container?.scrollWidth as number;
    }
  }, [scrollContainerId]);

  useEffect(() => {
    if (!scrollContainer || !width.current) {
      return;
    }
    const copyRef = scrollContainer;

    const scroll = () => {
      if (scrollContainer instanceof HTMLElement) {
        node &&
          node.current &&
          (node.current.style.left =
            scrollContainer.scrollLeft + offset + 'px');
      }
      if (scrollContainer instanceof Window) {
        node &&
          node.current &&
          (node.current.style.left = scrollContainer.scrollY + offset + 'px');
      }
      return;
    };

    scrollContainer.addEventListener('scroll', scroll);
    return () => {
      copyRef.removeEventListener('scroll', scroll);
    };
  }, [scrollContainer, node, offset]);

  return { node };
};

export enum SCROLLBAR_DIRRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

const useHasScrollBar = ({
  direction,
}: {
  direction: SCROLLBAR_DIRRECTION;
}) => {
  const node = useRef<HTMLElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

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

  useEffect(() => {
    if (!node || !node.current) {
      return;
    }

    const onResize = () => {
      setHasScrollbar(checkScrollBar(node.current as HTMLElement, direction));
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return { ref: node, hasScrollbar };
};
export { useXSticky, useHasScrollBar };
