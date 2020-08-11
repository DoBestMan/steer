import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { ui } from '~/lib/utils/ui-dictionary';

import { Results } from './Search.types';

export const emptyResult: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [],
};

export const emptySiteSearchResultGroup: SiteSearchResultGroup = {
  label: '',
  siteSearchResultList: [],
};

export const initialSearchVehicle = {
  action: {
    queryText: '',
    queryType: 'vehicle',
    type: 'SiteSearchResultActionQuery',
  } as SiteSearchResultActionQuery,
  detailLabel: null,
  label: ui('search.searchCategories.vehicle'),
  labelSegments: [
    {
      label: ui('search.searchCategories.vehicle'),
      matches: false,
    },
  ],
  type: 'SiteSearchResultTextItem',
} as SiteSearchResultTextItem;

export const initialSearchTireSize = {
  action: {
    queryText: '',
    queryType: 'tireSize',
    type: 'SiteSearchResultActionQuery',
  } as SiteSearchResultActionQuery,
  detailLabel: null,
  label: ui('search.searchCategories.tireSize'),
  labelSegments: [
    {
      label: ui('search.searchCategories.tireSize'),
      matches: false,
    },
  ],
  type: 'SiteSearchResultTextItem',
} as SiteSearchResultTextItem;

export const initialSearchBrand = {
  action: {
    queryText: '',
    queryType: 'brand',
    type: 'SiteSearchResultActionQuery',
  } as SiteSearchResultActionQuery,
  detailLabel: null,
  label: ui('search.searchCategories.brand'),
  labelSegments: [
    {
      label: ui('search.searchCategories.brand'),
      matches: false,
    },
  ],
  type: 'SiteSearchResultTextItem',
} as SiteSearchResultTextItem;

export const initialSearchPopular = {
  action: {
    queryText: '',
    queryType: 'mostPopularProductLine',
    type: 'SiteSearchResultActionQuery',
  } as SiteSearchResultActionQuery,
  detailLabel: null,
  label: ui('search.searchCategories.popular'),
  labelSegments: [
    {
      label: ui('search.searchCategories.popular'),
      matches: false,
    },
  ],
  type: 'SiteSearchResultTextItem',
} as SiteSearchResultTextItem;

export const initialSearchCategories = [
  initialSearchVehicle,
  initialSearchTireSize,
  initialSearchBrand,
  initialSearchPopular,
];

export const noSearchResults: Results = {
  resultMetadata: {
    noExactMatch: true,
  },
  siteSearchResultGroupList: [],
};
