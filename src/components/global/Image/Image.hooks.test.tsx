import { renderHook } from '@testing-library/react-hooks';
import { RefObject } from 'react';
import { act } from 'react-test-renderer';

import { LOADING_OPTIONS } from '~/lib/constants';
import * as BrowserUtils from '~/lib/utils/browser';

import { useLazyImage } from './Image.hooks';

describe('useLazyImage', () => {
  test('eager loading', () => {
    const imgRef = {} as RefObject<HTMLDivElement>;
    const { result } = renderHook(() =>
      useLazyImage({
        imgRef,
        loading: LOADING_OPTIONS.EAGER,
        srcSet: 'testSrcSet',
      }),
    );

    expect(result.current).toEqual({
      finalSrcSet: 'testSrcSet',
      isLazy: false,
    });
  });

  test('lazy loading - native browser support', () => {
    jest.spyOn(BrowserUtils, 'hasNativeLoadingSupport').mockReturnValue(true);

    const imgRef = {} as RefObject<HTMLDivElement>;
    const { result } = renderHook(() =>
      useLazyImage({
        imgRef,
        loading: LOADING_OPTIONS.LAZY,
        srcSet: 'testSrcSet',
      }),
    );

    expect(result.current).toEqual({
      finalSrcSet: 'testSrcSet',
      isLazy: true,
    });
  });

  test('lazy loading - intersection observer', () => {
    const imgRef = {} as RefObject<HTMLDivElement>;
    const { result } = renderHook(() =>
      useLazyImage({
        imgRef,
        loading: LOADING_OPTIONS.LAZY,
        srcSet: 'testSrcSet',
      }),
    );

    // it returns an empty srcSet at first
    expect(result.current).toEqual({
      finalSrcSet: '',
      isLazy: true,
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

    // it returns a populated srcSet
    expect(result.current).toEqual({
      finalSrcSet: 'testSrcSet',
      isLazy: true,
    });
  });
});
