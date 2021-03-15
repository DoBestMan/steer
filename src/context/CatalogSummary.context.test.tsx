import { cleanup, renderHook } from '@testing-library/react-hooks';

import { Cars } from '~/components/global/Car/Car.enums';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { SiteImage } from '~/data/models/SiteImage';
import * as UseApiDataWithDefault from '~/hooks/useApiDataWithDefault';
import { Emitter } from '~/lib/utils/Emitter';

import { onDataReady, useContextSetup } from './CatalogSummary.context';

const resultsSummary = {
  siteCatalogSummaryBuildIn: {
    title: '232 tires fit your Civic',
    brandList: [{ label: 'Continental' }],
  },
  siteCatalogSummaryMeta: {
    sceneryType: Sceneries['scenery--rural'],
    sizeList: ['Size 255/30 R20', 'Rear 205/30 R20'],
    tireImage: {
      altText: 'Tire',
      src: 'http://te.st',
      type: 'SiteImage',
    } as SiteImage,
    totalResults: 232,
    vehicleType: Cars['car--sedan'],
  },
  siteCatalogSummaryPrompt: {
    body: 'Most Civic drivers keep original tires',
    ctaList: [
      { label: 'Ok, continue', siteQueryParams: null, vehicleMetadata: null },
    ],
    infoLink: null,
    mustShow: false,
    title: 'From the factory, your Civic came with a Continental or Firestone',
  },
  siteCatalogSummaryRecirculation: null,
  siteCatalogSummaryTopPicksList: [
    {
      ctaLabel: null,
      fallbackImage: null,
      header: {
        titleLine1: 'Top Pick 1',
      },
      product: null,
      siteCatalogSummaryTopPickItemAdditionalInfo: null,
    },
  ],
  siteCatalogSummaryTopPicksMore: null,
};

const resultsWithoutTopPicksSummary = {
  ...resultsSummary,
  siteCatalogSummaryBuildIn: null,
  siteCatalogSummaryPrompt: null,
  siteCatalogSummaryTopPicksList: [],
};

const disambiguationSummary = {
  ...resultsSummary,
  siteCatalogSummaryMeta: {
    ...resultsSummary.siteCatalogSummaryMeta,
    sizeList: [],
    totalResults: 0,
  },
  siteCatalogSummaryPrompt: {
    ...resultsSummary.siteCatalogSummaryPrompt,
    mustShow: true,
    ctaList: [
      {
        label: '235/40R18 91W',
        siteQueryParams: { tireSize: 'p185-60r15', oem: '123' },
        vehicleMetadata: {
          vehicleMake: 'Civic',
          vehicleModel: 'Honda',
          vehicleOem: '123',
          vehicleTrim: 'LX',
          vehicleYear: '2019',
        },
      },
      {
        label: '235/40R18 95Y XL',
        siteQueryParams: { tireSize: 'p185-60r18', oem: '456' },
        vehicleMetadata: {
          vehicleMake: 'Civic',
          vehicleModel: 'Honda',
          vehicleOem: '456',
          vehicleTrim: 'LX',
          vehicleYear: '2019',
        },
      },
    ],
  },
  siteCatalogSummaryTopPicksList: [],
};

const noResultsSummary = {
  ...resultsSummary,
  siteCatalogSummaryBuildIn: null,
  siteCatalogSummaryMeta: {
    ...resultsSummary.siteCatalogSummaryMeta,
    sizeList: [],
    totalResults: 0,
  },
  siteCatalogSummaryPrompt: {
    body: null,
    ctaList: null,
    infoLink: null,
    mustShow: true,
    title: 'Sorry, no tires found for your Honda Civic 1982 Type-R',
  },
  siteCatalogSummaryTopPicksList: [],
};

describe('useCatalogSummaryContextSetup', () => {
  beforeEach(() => {
    jest
      .spyOn(UseApiDataWithDefault, 'useApiDataWithDefault')
      .mockResolvedValue(null as never);
  });

  test.each([
    ['initial state - from search', true],
    ['initial state - deep linked', false],
  ])('%s', (_, comesFromSearch) => {
    const { result } = renderHook(() =>
      useContextSetup({
        apiArgs: {
          defaultData: {
            siteCatalogProducts: {} as SiteCatalogProducts,
            siteCatalogSummary: resultsSummary as SiteCatalogSummary,
          },
          includeUserRegion: false,
          includeUserZip: false,
          query: {},
          revalidateEmitter: new Emitter<null>(),
        },
        comesFromSearch,
        endpoint: '',
      }),
    );

    // TODO: `contentStage` should be `STAGES.RESULTS` in the
    // initial state, but the equality check is not done until
    // the `contentStage` has been reset by a `setState` call in the
    // context hook.
    expect(result.current).toEqual(
      expect.objectContaining({
        contentStage: STAGES.LOADING,
        showLoadingInterstitial: comesFromSearch,
        showSummary: true,
        stage: STAGES.LOADING,
      }),
    );

    cleanup();
  });
});

describe('onDataReady', () => {
  test.each([
    [
      'sets correct state for data with Top Picks, from search',
      {
        params: {
          siteCatalogSummary: resultsSummary,
          showLoadingInterstitial: true,
        },
        expected: {
          contentStage: STAGES.RESULTS,
          showSummary: true,
          stage: STAGES.RESULTS,
        },
      },
    ],
    [
      'sets correct state for data with Top Picks, not from search',
      {
        params: {
          siteCatalogSummary: resultsSummary,
          showLoadingInterstitial: false,
        },
        expected: {
          contentStage: STAGES.RESULTS,
          stage: STAGES.RESULTS,
          showSummary: true,
        },
      },
    ],
    [
      'sets correct state for data without Top Picks, from search',
      {
        params: {
          siteCatalogSummary: resultsWithoutTopPicksSummary,
          showLoadingInterstitial: true,
        },
        expected: {
          contentStage: STAGES.RESULTS,
          stage: STAGES.RESULTS,
          showSummary: false,
        },
      },
    ],
    [
      'sets correct state for data without Top Picks, not from search',
      {
        params: {
          siteCatalogSummary: resultsWithoutTopPicksSummary,
          showLoadingInterstitial: false,
        },
        expected: {
          contentStage: STAGES.RESULTS,
          stage: STAGES.RESULTS,
          showSummary: false,
        },
      },
    ],
    [
      'sets correct state for disambiguation, from search',
      {
        params: {
          siteCatalogSummary: disambiguationSummary,
          showLoadingInterstitial: true,
        },
        expected: {
          contentStage: STAGES.DATA_MOMENT,
          stage: STAGES.DATA_MOMENT,
        },
      },
    ],
    [
      'sets correct state for disambiguation, not from search',
      {
        params: {
          siteCatalogSummary: disambiguationSummary,
          showLoadingInterstitial: false,
        },
        expected: {
          contentStage: STAGES.DATA_MOMENT,
          stage: STAGES.DATA_MOMENT,
        },
      },
    ],
    [
      'sets correct state for no results, from search',
      {
        params: {
          siteCatalogSummary: noResultsSummary,
          showLoadingInterstitial: true,
        },
        expected: {
          contentStage: STAGES.NO_RESULTS,
          stage: STAGES.NO_RESULTS,
        },
      },
    ],
    [
      'sets correct state for no results, not from search',
      {
        params: {
          siteCatalogSummary: noResultsSummary,
          showLoadingInterstitial: false,
        },
        expected: {
          contentStage: STAGES.NO_RESULTS,
          stage: STAGES.NO_RESULTS,
        },
      },
    ],
  ])('%s', async (_, { params: { siteCatalogSummary }, expected }) => {
    // Have props been set correctly (based on data received)
    expect(onDataReady(siteCatalogSummary)).toEqual(expected);

    cleanup();
  });
});
