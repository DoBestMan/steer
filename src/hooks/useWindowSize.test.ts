import { renderHook } from '@testing-library/react-hooks';

import { useWindowSize } from './useWindowSize';

describe('useWindowSize', () => {
  it('returns correct window dimensions 400x600', () => {
    Object.defineProperty(window, 'innerWidth', { value: 400 });
    Object.defineProperty(window, 'innerHeight', { value: 600 });
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toStrictEqual({ height: 600, width: 400 });
  });

  it('returns correct window dimensions 1440x1260', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1440 });
    Object.defineProperty(window, 'innerHeight', { value: 1260 });
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toStrictEqual({ height: 1260, width: 1440 });
  });
});
