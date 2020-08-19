import { renderHook } from '@testing-library/react-hooks';

import { usePreferedReduceMotion } from './usePreferedReduceMotion';

describe('usePreferedReduceMotion', () => {
  it('returns true if reduced motion is not set', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
      })),
    });
    const { result } = renderHook(() => usePreferedReduceMotion());

    expect(result.current).toBe(true);
  });

  it('returns false if reduced motion is set', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
      })),
    });
    const { result } = renderHook(() => usePreferedReduceMotion());

    expect(result.current).toBe(true);
  });
});
