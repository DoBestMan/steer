jest.mock('swr');

import { renderHook } from '@testing-library/react-hooks';
import useSWR from 'swr';
import { mocked } from 'ts-jest/utils';

import * as Bootstrap from '~/lib/api/bootstrap';
import * as Fetch from '~/lib/fetch';

import { useApiData } from './useApiData';

describe('useApiData', () => {
  test('uses useSWR, calls apiBootstrap and fetch and returns correct data', async () => {
    jest.spyOn(Bootstrap, 'apiBootstrap').mockImplementation();
    jest.spyOn(Fetch, 'fetch').mockImplementation();

    const swrMockReturn = {
      data: { testData: true },
      error: undefined,
      isValidating: true,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    };

    mocked(useSWR).mockReturnValue(swrMockReturn);

    const { result } = renderHook(() =>
      useApiData({
        endpoint: '/test-endpoint',
        includeAuthorization: false,
        includeUserRegion: true,
        includeUserZip: false,
        params: { sortBy: 'price' },
      }),
    );

    // it calls useSWR
    expect(mocked(useSWR)).toHaveBeenCalledWith(
      ['/test-endpoint', '{"sortBy":"price"}'],
      expect.any(Function),
      {},
    );

    const mockSWRCallback = mocked(useSWR).mock.calls[0][1];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mockSWRCallback!();

    // it calls apiBootstrap
    expect(mocked(Bootstrap.apiBootstrap)).toHaveBeenCalled();

    // it calls fetch
    expect(mocked(Fetch.fetch)).toHaveBeenCalledWith({
      endpoint: '/test-endpoint',
      includeAuthorization: false,
      includeUserRegion: true,
      includeUserZip: false,
      method: 'get',
      params: {
        sortBy: 'price',
      },
    });

    // it returns expected result
    expect(result.current).toEqual(swrMockReturn);
  });
});
