import { useEffect } from 'react';

interface Options {
  axis?: 'horizontal' | 'vertical' | 'both';
  mode?: 'proportional' | 'absolute';
}

export const useScrollSync = (
  elements: HTMLElement[],
  { mode = 'proportional', axis = 'both' }: Options,
): void => {
  useEffect(() => {
    if (elements.length === 0) {
      return;
    }
    elements.forEach((leader) => {
      const followers = elements.filter((el) => el !== leader);
      leader.onscroll = () => handleScroll(leader, followers, { mode, axis });
    });
    return () => {
      elements.forEach((el) => {
        el.onscroll = null;
      });
    };
  }, [elements, mode, axis]);
};

const handleScroll = (
  leader: HTMLElement,
  followers: HTMLElement[],
  options: Options,
) => {
  window.requestAnimationFrame(() => {
    syncFollowers(leader, followers, options);
  });
};

const syncFollowers = (
  leader: HTMLElement,
  followers: HTMLElement[],
  options: Options,
) => {
  followers.forEach((follower) => {
    const { onscroll } = follower;
    follower.onscroll = null;
    syncFollower(leader, follower, options);
    window.requestAnimationFrame(() => {
      follower.onscroll = onscroll;
    });
  });
};

const syncFollower = (
  leader: HTMLElement,
  follower: HTMLElement,
  options: Options,
) => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    scrollLeft,
    scrollWidth,
    clientWidth,
  } = leader;

  const scrollTopOffset = scrollHeight - clientHeight;
  const scrollLeftOffset = scrollWidth - clientWidth;

  const { mode, axis } = options;

  /* Calculate the actual pane height */
  const paneHeight = follower.scrollHeight - clientHeight;
  const paneWidth = follower.scrollWidth - clientWidth;
  /* Adjust the scrollTop position of it accordingly */
  if ((axis === 'both' || axis === 'vertical') && scrollTopOffset > 0) {
    follower.scrollTop =
      mode === 'proportional'
        ? (paneHeight * scrollTop) / scrollTopOffset
        : scrollTop;
  }
  if ((axis === 'both' || axis === 'horizontal') && scrollLeftOffset > 0) {
    follower.scrollLeft =
      mode === 'proportional'
        ? (paneWidth * scrollLeft) / scrollLeftOffset
        : scrollLeft;
  }
};
