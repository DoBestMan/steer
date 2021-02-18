import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { ui } from '~/lib/utils/ui-dictionary';

import { Results } from './Search.types';

export const emptyResultData: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [],
};

export const emptySiteSearchResultGroupData: SiteSearchResultGroup = {
  label: '',
  siteSearchResultList: [],
};

export const initialSearchVehicleData = {
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

export const initialSearchTireSizeData = {
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

export const initialSearchBrandData = {
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

export const initialSearchCategoriesData = [
  initialSearchVehicleData,
  initialSearchTireSizeData,
  initialSearchBrandData,
];
