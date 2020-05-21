import { renderHook } from '@testing-library/react-hooks';
import { RefObject } from 'react';
import { act } from 'react-test-renderer';

import { LOADING_OPTIONS } from '~/lib/constants';
import * as BrowserUtils from '~/lib/utils/browser';

import { useImageProps } from './Image.hooks';

const imgRef = { current: null } as RefObject<HTMLDivElement>;
const measuredRef = 300;
const measuredImgRef = { current: { clientWidth: measuredRef } } as RefObject<
  HTMLDivElement
>;
const measuredSizes = `${measuredRef}px`;
const emptyValues = {
  finalSrcSet: '',
  sizes: '',
  src: '',
};
const multipleSrcSet = 'small.jpg 50w, large.jpg 100w';
const fallbackSrc = 'large.jpg';

describe('useImageProps', () => {
  beforeEach(() => {
    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    global.IntersectionObserver = jest.fn(function () {
      // @ts-ignore
      this.observe = jest.fn();
      // @ts-ignore
      this.unobserve = jest.fn();
      // @ts-ignore
      this.disconnect = jest.fn();
    });
    /* eslint-enable @typescript-eslint/ban-ts-ignore */
  });

  test('is responsive, lazy loading - native browser support', () => {
    jest.spyOn(BrowserUtils, 'hasNativeLoadingSupport').mockReturnValue(true);

    const initialProps = {
      imgRef,
      loading: LOADING_OPTIONS.LAZY,
      srcSet: multipleSrcSet,
    };

    const { result, rerender } = renderHook((props) => useImageProps(props), {
      initialProps,
    });

    // it does not set values right away
    expect(result.current).toEqual({ isLazy: true, ...emptyValues });

    rerender({
      ...initialProps,
      imgRef: measuredImgRef,
    });

    expect(result.current).toEqual({
      finalSrcSet: multipleSrcSet,
      isLazy: true,
      sizes: measuredSizes,
      src: fallbackSrc,
    });
  });

  test('is responsive, lazy loading - intersection observer measurement finishes first', async () => {
    const initialProps = {
      imgRef,
      loading: LOADING_OPTIONS.LAZY,
      srcSet: multipleSrcSet,
    };

    const { result, rerender } = renderHook((props) => useImageProps(props), {
      initialProps,
    });

    // it does not set values right away
    expect(result.current).toEqual({ isLazy: true, ...emptyValues });

    // when the ref has been measured
    rerender({
      ...initialProps,
      imgRef: measuredImgRef,
    });

    // it updates sizes
    expect(result.current).toEqual({
      finalSrcSet: '',
      isLazy: true,
      sizes: measuredSizes,
      src: '',
    });

    // when intersection occurs
    act(() => {
      // Hack to mock IntersectionObserver inspired by
      // https://gist.github.com/ianmcnally/4b68c56900a20840b6ca840e2403771c#file-lazy-image-spec-js-L70
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const observerCallback = global.IntersectionObserver.mock.calls[0][0];
      observerCallback([{ isIntersecting: true }]);
    });

    // it returns srcSet, sizes, and src
    expect(result.current).toEqual({
      finalSrcSet: multipleSrcSet,
      isLazy: true,
      sizes: measuredSizes,
      src: fallbackSrc,
    });
  });

  test('responsive image, lazy loading - intersection observer - IO finishes first', async () => {
    const initialProps = {
      imgRef,
      loading: LOADING_OPTIONS.LAZY,
      srcSet: multipleSrcSet,
    };

    const { result, rerender } = renderHook((props) => useImageProps(props), {
      initialProps,
    });

    // it does not set values right away
    expect(result.current).toEqual({ isLazy: true, ...emptyValues });

    // when intersection occurs
    act(() => {
      // Hack to mock IntersectionObserver inspired by
      // https://gist.github.com/ianmcnally/4b68c56900a20840b6ca840e2403771c#file-lazy-image-spec-js-L70
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const observerCallback = global.IntersectionObserver.mock.calls[0][0];
      observerCallback([{ isIntersecting: true }]);
    });

    // it still doens't return data until we have measured
    expect(result.current).toEqual({ isLazy: true, ...emptyValues });

    // when the ref has been measured
    rerender({
      ...initialProps,
      imgRef: measuredImgRef,
    });

    // it returns srcSet, sizes, and src
    expect(result.current).toEqual({
      finalSrcSet: multipleSrcSet,
      isLazy: true,
      sizes: measuredSizes,
      src: fallbackSrc,
    });
  });

  test('is responsive and eager loading', () => {
    const initialProps = {
      imgRef,
      loading: LOADING_OPTIONS.EAGER,
      srcSet: multipleSrcSet,
    };

    const { result, rerender } = renderHook((props) => useImageProps(props), {
      initialProps,
    });

    expect(result.current).toEqual({ isLazy: false, ...emptyValues });

    rerender({
      ...initialProps,
      imgRef: measuredImgRef,
    });

    expect(result.current).toEqual({
      finalSrcSet: multipleSrcSet,
      isLazy: false,
      sizes: measuredSizes,
      src: fallbackSrc,
    });
  });

  test('is not responsive, lazy loading - native browser support', () => {
    jest.spyOn(BrowserUtils, 'hasNativeLoadingSupport').mockReturnValue(true);

    const initialProps = {
      imgRef,
      loading: LOADING_OPTIONS.LAZY,
      srcSet: 'testSrcSet',
    };

    const { result } = renderHook((props) => useImageProps(props), {
      initialProps,
    });

    // it does not set values right away
    expect(result.current).toEqual({
      finalSrcSet: 'testSrcSet',
      isLazy: true,
      sizes: '',
      src: 'testSrcSet',
    });
  });

  test('is not responsive, lazy loading - intersection observer', () => {
    const initialProps = {
      imgRef,
      loading: LOADING_OPTIONS.LAZY,
      srcSet: 'testSrcSet',
    };

    const { result } = renderHook((props) => useImageProps(props), {
      initialProps,
    });

    // it does not set values right away
    expect(result.current).toEqual({ isLazy: true, ...emptyValues });

    // when intersection occurs
    act(() => {
      // Hack to mock IntersectionObserver inspired by
      // https://gist.github.com/ianmcnally/4b68c56900a20840b6ca840e2403771c#file-lazy-image-spec-js-L70
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const observerCallback = global.IntersectionObserver.mock.calls[0][0];
      observerCallback([{ isIntersecting: true }]);
    });

    expect(result.current).toEqual({
      finalSrcSet: 'testSrcSet',
      isLazy: true,
      sizes: '',
      src: 'testSrcSet',
    });
  });

  test('is not responsive, eager loading', () => {
    const { result } = renderHook(() =>
      useImageProps({
        imgRef,
        loading: LOADING_OPTIONS.EAGER,
        srcSet: multipleSrcSet,
        width: '150px',
      }),
    );

    expect(result.current).toEqual({
      finalSrcSet: multipleSrcSet,
      isLazy: false,
      sizes: '',
      src: fallbackSrc,
    });
  });
});
