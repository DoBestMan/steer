import { RefObject, useEffect, useState } from 'react';

import { Loading, LOADING_OPTIONS } from '~/lib/constants';
import { hasNativeLoadingSupport } from '~/lib/utils/browser';

enum LAZY_LOADING_METHOD {
  CHECKING = 'CHECKING',
  IO = 'IO',
  NATIVE = 'NATIVE',
  NONE = 'NONE',
}

function useIOImage(
  shouldLazyLoad = false,
  srcSet: string,
  imgRef?: RefObject<HTMLElement>,
  intersectionObserverOptions?: {},
) {
  const [loadedSrc, setLoadedSrc] = useState('');

  useEffect(() => {
    if (shouldLazyLoad && imgRef) {
      if (srcSet !== loadedSrc) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setLoadedSrc(srcSet);
              lazyImageObserver.unobserve(entry.target);
            }
          });
        }, intersectionObserverOptions);

        if (imgRef?.current) {
          lazyImageObserver.observe(imgRef.current);
        }
      }
    }
  }, [srcSet, shouldLazyLoad, imgRef, intersectionObserverOptions, loadedSrc]);

  return { loadedSrc };
}

interface Props {
  imgRef?: RefObject<HTMLDivElement>;
  loading?: Loading;
  srcSet: string;
}

export function useLazyImage({ loading, srcSet, imgRef }: Props) {
  const isLazy = loading === LOADING_OPTIONS.LAZY;
  const [lazyLoadingState, setLazyLoadingState] = useState(
    isLazy ? LAZY_LOADING_METHOD.CHECKING : LAZY_LOADING_METHOD.NONE,
  );

  useEffect(() => {
    if (lazyLoadingState === LAZY_LOADING_METHOD.CHECKING) {
      if (hasNativeLoadingSupport()) {
        // First choice - native image loading
        setLazyLoadingState(LAZY_LOADING_METHOD.NATIVE);
      } else {
        // Second choice - loading via Intersection Observer
        setLazyLoadingState(LAZY_LOADING_METHOD.IO);
      }
    }
  }, [lazyLoadingState]);

  const isChecking = lazyLoadingState === LAZY_LOADING_METHOD.CHECKING;
  const isLazyNative = lazyLoadingState === LAZY_LOADING_METHOD.NATIVE;
  const isLazyIO = lazyLoadingState === LAZY_LOADING_METHOD.IO;

  const { loadedSrc } = useIOImage(isLazyIO, srcSet, imgRef);

  let finalSrcSet = srcSet;

  if (isLazyIO) {
    finalSrcSet = loadedSrc;
  } else if (isChecking) {
    // Do not pass an srcSet value if we are still checking
    // browser support to avoid kicking off an eager load
    finalSrcSet = '';
  }

  return {
    finalSrcSet,
    isLazy: isLazyNative || isLazyIO,
  };
}
