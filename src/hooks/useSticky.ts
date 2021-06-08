import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * introduce sticky for custom element but has flip and flop effect
 * need to implement this way later https://codepen.io/yowainwright/pen/Njwpep
 */

interface params {
  scrollContainerId?: string;
  topOffset: number;
}

interface Coordination {
  start: number;
  stop: number;
}

const getStickyCoords = (
  parent: HTMLDivElement,
  child: HTMLDivElement,
  topOffset: number,
) => {
  const coords: Coordination = { start: 0, stop: 0 };
  coords.start = parent.offsetTop - topOffset;

  const distance = parent.offsetHeight - child.offsetHeight;
  coords.stop = coords.start + distance;
  return coords;
};

const useSticky = ({ topOffset = 0, scrollContainerId }: params) => {
  const [stickyCoords, setStickyCoords] = useState<Coordination | null>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [isStuck, setIsStuck] = useState<boolean>(false);
  const childRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<
    Window | HTMLElement | null
  >(null);

  useEffect(() => {
    if (!childRef.current || !parentRef.current) {
      return;
    }
    setStickyCoords(
      getStickyCoords(parentRef.current, childRef.current, topOffset),
    );
  }, [topOffset]);

  useEffect(() => {
    if (!scrollContainerId) {
      return setScrollContainer(window);
    }

    return setScrollContainer(document.getElementById(`${scrollContainerId}`));
  }, [scrollContainerId]);

  const toggleSticky = useCallback(
    (scroll) => {
      if (!parentRef.current || !childRef.current) {
        return;
      }

      if (!stickyCoords) {
        return;
      }

      if (scroll < stickyCoords.start) {
        setIsFixed(false);
        setIsStuck(false);
        return;
      } else if (scroll > stickyCoords.start && scroll < stickyCoords.stop) {
        setIsFixed(true);
        setIsStuck(false);
        return;
      } else {
        setIsStuck(true);
        setIsFixed(false);
        return;
      }
    },
    [stickyCoords],
  );

  useEffect(() => {
    if (!childRef || !childRef.current || !scrollContainer) {
      return;
    }

    const handleScroll = () => {
      if (childRef && childRef.current) {
        const scroll =
          scrollContainer instanceof HTMLDivElement
            ? scrollContainer.scrollTop
            : scrollContainer instanceof Window
            ? scrollContainer.scrollY
            : 0;
        toggleSticky(scroll);
      }
    };
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [toggleSticky, scrollContainer]);

  return { parentRef, childRef, isFixed, isStuck };
};

export default useSticky;
