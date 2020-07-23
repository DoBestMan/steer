import { cleanup, renderHook } from '@testing-library/react-hooks';

import { Cars } from '~/components/global/Car/Car.enums';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import { useContextSetup } from './CatalogSummary.context';

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
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    totalResults: 232,
    vehicleType: Cars['car--sedan'],
  },
  siteCatalogSummaryPrompt: {
    body: 'Most Civic drivers keep original tires',
    ctaList: [{ label: 'Ok, continue', siteQueryParams: null }],
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
        siteQueryParams: { tireSize: 'p185-60r15' },
      },
      {
        label: '235/40R18 95Y XL',
        siteQueryParams: { tireSize: 'p185-60r18' },
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
  test.each([
    ['initial state - from search', true],
    ['initial state - deep linked', false],
  ])('%s', (_, comesFromSearch) => {
    const { result } = renderHook(() =>
      useContextSetup({
        comesFromSearch,
        hasLocalData: false,
        siteCatalogSummary: resultsSummary,
      }),
    );

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

  test.each([
    [
      'results with Top Picks, from search',
      {
        props: {
          siteCatalogSummary: resultsSummary,
          comesFromSearch: true,
        },
        expected: {
          stage: STAGES.BUILD_IN,
          showSummary: true,
        },
      },
    ],
    [
      'results with Top Picks, not from search',
      {
        props: {
          siteCatalogSummary: resultsSummary,
          comesFromSearch: false,
        },
        expected: {
          stage: STAGES.TOP_PICKS,
          showSummary: true,
        },
      },
    ],
    [
      'results without Top Picks, from search',
      {
        props: {
          siteCatalogSummary: resultsWithoutTopPicksSummary,
          comesFromSearch: true,
        },
        expected: {
          stage: STAGES.TOP_PICKS,
          showSummary: false,
        },
      },
    ],
    [
      'results without Top Picks, not from search',
      {
        props: {
          siteCatalogSummary: resultsWithoutTopPicksSummary,
          comesFromSearch: false,
        },
        expected: {
          stage: STAGES.TOP_PICKS,
          showSummary: false,
        },
      },
    ],
    [
      'disambiguation, from search',
      {
        props: {
          siteCatalogSummary: disambiguationSummary,
          comesFromSearch: true,
        },
        expected: {
          stage: STAGES.BUILD_IN,
          showSummary: true,
        },
      },
    ],
    [
      'disambiguation, not from search',
      {
        props: {
          siteCatalogSummary: disambiguationSummary,
          comesFromSearch: false,
        },
        expected: {
          stage: STAGES.DATA_MOMENT,
          showSummary: true,
        },
      },
    ],
    [
      'no results, from search',
      {
        props: {
          siteCatalogSummary: noResultsSummary,
          comesFromSearch: true,
        },
        expected: {
          stage: STAGES.NO_RESULTS,
          showSummary: true,
        },
      },
    ],
    [
      'no results, not from search',
      {
        props: {
          siteCatalogSummary: noResultsSummary,
          comesFromSearch: false,
        },
        expected: {
          stage: STAGES.NO_RESULTS,
          showSummary: true,
        },
      },
    ],
  ])(
    '%s',
    async (_, { props: { comesFromSearch, siteCatalogSummary }, expected }) => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useContextSetup({
          comesFromSearch,
          // Set hasLocalData by default
          hasLocalData: true,
          siteCatalogSummary,
        }),
      );

      // Initial state
      expect(result.current).toEqual(
        expect.objectContaining({
          contentStage: STAGES.LOADING,
          showLoadingInterstitial: comesFromSearch,
          showSummary: true,
          stage: STAGES.LOADING,
        }),
      );

      // Wait for the loading timeout to update `dataLoadingStatus`
      await waitForNextUpdate();

      // Have props been set correctly (based on data received)
      expect(result.current.stage).toBe(expected.stage);
      expect(result.current.showSummary).toBe(expected.showSummary);

      cleanup();
    },
  );
});
