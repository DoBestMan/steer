jest.mock('./useApiData');

import { renderHook } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';

import * as Bootstrap from '~/lib/api/bootstrap';
import * as Fetch from '~/lib/fetch';

import { useApiData } from './useApiData';
import { useApiDataWithDefault } from './useApiDataWithDefault';

describe('useApiData', () => {
  test('uses useSWR, calls apiBootstrap and fetch and returns correct data', () => {
    jest.spyOn(Bootstrap, 'apiBootstrap').mockImplementation();
    jest.spyOn(Fetch, 'fetch').mockImplementation();

    const defaultData = {
      additionalProperty: 'a',
      testData: false,
    };

    const useApiDataReturn = {
      data: { testData: true },
      error: undefined,
      isValidating: true,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    };

    const useApiDataWithDefaultReturn = {
      ...useApiDataReturn,
      data: {
        ...defaultData,
        ...useApiDataReturn.data,
      },
    };

    mocked(useApiData).mockReturnValue(useApiDataReturn);

    const { result } = renderHook(() =>
      useApiDataWithDefault({
        defaultData,
        endpoint: '/test-endpoint',
      }),
    );

    // it calls useApiData
    expect(mocked(useApiData)).toHaveBeenCalledWith({
      endpoint: '/test-endpoint',
      includeAuthorization: false,
      includeUserRegion: false,
      includeUserZip: false,
      options: {},
      params: {},
      query: {},
    });

    // it returns expected result
    expect(result.current).toEqual(useApiDataWithDefaultReturn);
  });
});
