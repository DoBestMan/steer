import { RefObject, useEffect, useState } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';
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
  width?: string;
}

function useLazyImage({ loading, srcSet, imgRef }: Props) {
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

  let lazySrcSet = srcSet;

  if (isLazyIO) {
    lazySrcSet = loadedSrc;
  } else if (isChecking) {
    // Do not pass an srcSet value if we are still checking
    // browser support to avoid kicking off an eager load
    lazySrcSet = '';
  }

  return {
    isLazy: isLazyNative || isLazyIO,
    lazySrcSet,
  };
}

function checkSrcSet(srcSet: string) {
  return /,/.test(srcSet);
}

function useFallbackSrc(srcSet: string) {
  const hasMultipleImages = checkSrcSet(srcSet);

  let fallbackSrc;

  if (hasMultipleImages) {
    const images = srcSet.match(/(?<=, )\S*/g);
    fallbackSrc = images?.pop();
  } else {
    fallbackSrc = srcSet;
  }

  return { fallbackSrc, hasMultipleImages };
}

function useResponsiveImage(srcSet: string, imgRef?: RefObject<HTMLElement>) {
  const { width } = useWindowSize();
  const [sizes, setSizes] = useState('');
  const hasMultipleImages = checkSrcSet(srcSet);
  const hasRef = imgRef && imgRef.current;
  const measuredWidth = hasRef ? `${hasRef.clientWidth}px` : '';
  const shouldUpdateSizes = hasMultipleImages && measuredWidth !== sizes;

  useEffect(() => {
    if (shouldUpdateSizes) {
      setSizes(measuredWidth);
    }
  }, [measuredWidth, shouldUpdateSizes, width]);

  return { sizes };
}

export function useImageProps({ imgRef, loading, srcSet, width }: Props) {
  const { lazySrcSet, isLazy } = useLazyImage({
    imgRef,
    loading,
    srcSet,
  });

  const { sizes } = useResponsiveImage(srcSet, imgRef);
  const { fallbackSrc, hasMultipleImages } = useFallbackSrc(srcSet);
  const isResponsive = !width && hasMultipleImages;

  const finalSrcSet = isResponsive && !sizes ? '' : lazySrcSet;
  const src = finalSrcSet ? fallbackSrc : '';

  return {
    finalSrcSet,
    isLazy,
    sizes,
    src,
  };
}
