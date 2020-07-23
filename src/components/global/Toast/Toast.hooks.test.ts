import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useToastManager } from './Toast.hooks';

describe('useToastManager', () => {
  test('opens toast if a message is available', () => {
    const { result } = renderHook(() => useToastManager());

    expect(result.current.isOpen).toEqual(false);

    act(() => result.current.setToastMessage('Toasty toast'));

    expect(result.current.isOpen).toEqual(true);
  });
});
