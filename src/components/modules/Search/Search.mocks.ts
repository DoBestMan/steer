import { SiteSearchResultActionQuery } from '~/data/models/SiteSearchResultActionQuery';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ui } from '~/lib/utils/ui-dictionary';

import { Results } from './Search.types';

export const emptySiteSearchResultGroup: SiteSearchResultGroup = {
  label: '',
  siteSearchResultList: [],
};

export const supportResultMock = {
  action: {
    queryText: '',
    queryType: '',
    type: 'SiteSearchResultActionQuery',
  } as SiteSearchResultActionQuery,
  detailLabel: null,
  label: ui('search.callUs'),
  labelSegments: [{ label: ui('search.callUs'), matches: false }],
  type: 'SiteSearchResultTextItem',
} as SiteSearchResultTextItem;

export const pastSearchResults: SiteSearchResultGroup = {
  label: '',
  siteSearchResultList: [
    {
      action: {
        queryText: 'Mini Cooper 2018 Hardtop',
        queryType: 'makeModel',
        type: 'SiteSearchResultActionQuery',
      } as SiteSearchResultActionQuery,
      detailLabel: null,
      label: 'Mini Cooper 2018 Hardtop',
      labelSegments: [
        {
          label: 'Mini Cooper 2018 Hardtop',
          matches: false,
        },
      ],
      type: 'SiteSearchResultTextItem',
    } as SiteSearchResultTextItem,
    {
      action: {
        queryText: 'Honda Civic 2016 EX-L',
        queryType: 'makeModel',
        type: 'SiteSearchResultActionQuery',
      } as SiteSearchResultActionQuery,
      detailLabel: null,
      label: 'Honda Civic 2016 EX-L',
      labelSegments: [
        {
          label: 'Honda Civic 2016 EX-L',
          matches: false,
        },
      ],
      type: 'SiteSearchResultTextItem',
    } as SiteSearchResultTextItem,
    {
      action: {
        queryText: '215/50R16',
        queryType: 'makeModel',
        type: 'SiteSearchResultActionQuery',
      } as SiteSearchResultActionQuery,
      detailLabel: null,
      label: '215/50R16',
      labelSegments: [
        {
          label: '215/50R16',
          matches: false,
        },
      ],
      type: 'SiteSearchResultTextItem',
    } as SiteSearchResultTextItem,
    {
      action: {
        queryText: 'Toyota Sienna 2018 LE',
        queryType: 'makeModel',
        type: 'SiteSearchResultActionQuery',
      } as SiteSearchResultActionQuery,
      detailLabel: null,
      label: 'Toyota Sienna 2018 LE',
      labelSegments: [
        {
          label: 'Toyota Sienna 2018 LE',
          matches: false,
        },
      ],
      type: 'SiteSearchResultTextItem',
    } as SiteSearchResultTextItem,
    {
      action: {
        queryText: 'Hankook Kinergy PT',
        queryType: 'makeModel',
        type: 'SiteSearchResultActionQuery',
      } as SiteSearchResultActionQuery,
      detailLabel: null,
      label: 'Hankook Kinergy PT',
      labelSegments: [
        {
          label: 'Hankook Kinergy PT',
          matches: false,
        },
      ],
      type: 'SiteSearchResultTextItem',
    } as SiteSearchResultTextItem,
  ],
};

export const initialSearchCategories = [
  {
    action: {
      queryText: '',
      queryType: 'makeModel',
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
  } as SiteSearchResultTextItem,
  {
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
  } as SiteSearchResultTextItem,
  {
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
  } as SiteSearchResultTextItem,
  {
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
  } as SiteSearchResultTextItem,
];

export const noSearchResults: Results = {
  resultMetadata: {
    noExactMatch: true,
  },
  siteSearchResultGroupList: [],
};

export const noResultsWithSuggestions: Results = {
  resultMetadata: {
    noExactMatch: true,
  },
  siteSearchResultGroupList: [
    {
      label: 'Did you mean',
      siteSearchResultList: [
        {
          action: {
            queryText: '205',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '205',
          labelSegments: [
            {
              label: '205',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '215',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '215',
          labelSegments: [
            {
              label: '215',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '245',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '245',
          labelSegments: [
            {
              label: '245',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '225',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '225',
          labelSegments: [
            {
              label: '225',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '235',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '235',
          labelSegments: [
            {
              label: '235',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
  ],
};

export const simpleSearchResults: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [
    {
      label: '',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Honda',
            queryType: 'vehicleMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Honda',
          labelSegments: [
            {
              label: 'H',
              matches: true,
            },
            {
              label: 'onda',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Honda Accord',
            queryType: 'vehicleMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Honda Accord',
          labelSegments: [
            {
              label: 'H',
              matches: true,
            },
            {
              label: 'onda Accord',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Honda Civic',
            queryType: 'vehicleMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Honda Civic',
          labelSegments: [
            {
              label: 'H',
              matches: true,
            },
            {
              label: 'onda Civic',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Honda CRV',
            queryType: 'vehicleMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Honda CRV',
          labelSegments: [
            {
              label: 'H',
              matches: true,
            },
            {
              label: 'onda CRV',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Honda Super Crazy Long Name Awesome Car 3000',
            queryType: 'vehicleMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Honda Super Crazy Long Name Awesome Car 3000',
          labelSegments: [
            {
              label: 'H',
              matches: true,
            },
            {
              label: 'onda Super Long Name Awesome Car 3000',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Hyundai',
            queryType: 'vehicleMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Hyundai',
          labelSegments: [
            {
              label: 'H',
              matches: true,
            },
            {
              label: 'yundai',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Hyundai Elantra',
            queryType: 'vehicleMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Hyundai Elantra',
          labelSegments: [
            {
              label: 'H',
              matches: true,
            },
            {
              label: 'yundai Elantra',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Hyundai Tucson',
            queryType: 'vehicleMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Hyundai Tucson',
          labelSegments: [
            {
              label: 'H',
              matches: true,
            },
            {
              label: 'yundai Tucson',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
  ],
};

export const partNumberResults: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [
    {
      label: '',
      siteSearchResultList: [
        {
          action: {
            queryText: '106137625',
            queryType: 'partNumber',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: 'Goodyear Eagle GT II・Size 275/45R20',
          label: '106137625',
          labelSegments: [
            {
              label: '106137625',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '106134277',
            queryType: 'partNumber',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: 'Goodyear Eagle GT II・Size 305/50R20',
          label: '106134277',
          labelSegments: [
            {
              label: '106134277',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '106134223',
            queryType: 'partNumber',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: 'Bridgestone Turanza Serenity Plus・Size 275/40R19',
          label: '106134223',
          labelSegments: [
            {
              label: '106134223',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '106134224',
            queryType: 'partNumber',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: 'Bridgestone Turanza Serenity Plus・Size 235/40R18',
          label: '106134224',
          labelSegments: [
            {
              label: '106134224',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '106134294',
            queryType: 'partNumber',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: 'Bridgestone Turanza Serenity Plus・Size 245/40R18',
          label: '106134294',
          labelSegments: [
            {
              label: '106134294',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
  ],
};

export const tireSizeResults: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [
    {
      label: 'Width > Ratio > Rim',
      siteSearchResultList: [
        {
          action: {
            queryText: '215/50R12',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '215/50R12',
          labelSegments: [
            {
              label: '215/50R12',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '215/50R16',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '215/50R16',
          labelSegments: [
            {
              label: '215/50R16',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '215/50R17',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '215/50R17',
          labelSegments: [
            {
              label: '215/50R17',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '215/50R18',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '215/50R18',
          labelSegments: [
            {
              label: '215/50R18',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
  ],
};

export const searchByVehicle: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [
    {
      label: 'Most Popular',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Honda',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Honda',
          labelSegments: [
            {
              label: 'Honda',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Toyota',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Toyota',
          labelSegments: [
            {
              label: 'Toyota',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Ford',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Ford',
          labelSegments: [
            {
              label: 'Ford',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Subaru',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Subaru',
          labelSegments: [
            {
              label: 'Subaru',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Chevrolet',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Chevrolet',
          labelSegments: [
            {
              label: 'Chevrolet',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
    {
      label: 'All',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Alfa Romeo',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Alfa Romeo',
          labelSegments: [
            {
              label: 'Alfa Romeo',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Aston Martin',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Aston Martin',
          labelSegments: [
            {
              label: 'Aston Martin',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Audi',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Audi',
          labelSegments: [
            {
              label: 'Audi',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Bentley',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Bentley',
          labelSegments: [
            {
              label: 'Bentley',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'BMW',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'BMW',
          labelSegments: [
            {
              label: 'BMW',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Bugatti',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Bugatti',
          labelSegments: [
            {
              label: 'Bugatti',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Cadillac',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Cadillac',
          labelSegments: [
            {
              label: 'Cadillac',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Chevrolet',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Chevrolet',
          labelSegments: [
            {
              label: 'Chevrolet',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Chrysler',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Chrysler',
          labelSegments: [
            {
              label: 'Chrysler',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Citroën',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Citroën',
          labelSegments: [
            {
              label: 'Citroën',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Dacia',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Dacia',
          labelSegments: [
            {
              label: 'Dacia',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Daewoo',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Daewoo',
          labelSegments: [
            {
              label: 'Daewoo',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Dodge',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Dodge',
          labelSegments: [
            {
              label: 'Dodge',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Ferrari',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Ferrari',
          labelSegments: [
            {
              label: 'Ferrari',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Fiat',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Fiat',
          labelSegments: [
            {
              label: 'Fiat',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Ford',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Ford',
          labelSegments: [
            {
              label: 'Ford',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Honda',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Honda',
          labelSegments: [
            {
              label: 'Honda',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Hummer',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Hummer',
          labelSegments: [
            {
              label: 'Hummer',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Hyundai',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Hyundai',
          labelSegments: [
            {
              label: 'Hyundai',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Infiniti',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Infiniti',
          labelSegments: [
            {
              label: 'Infiniti',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Jaguar',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Jaguar',
          labelSegments: [
            {
              label: 'Jaguar',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Jeep',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Jeep',
          labelSegments: [
            {
              label: 'Jeep',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Kia',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Kia',
          labelSegments: [
            {
              label: 'Kia',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Lamborghini',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Lamborghini',
          labelSegments: [
            {
              label: 'Lamborghini',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Land Rover',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Land Rover',
          labelSegments: [
            {
              label: 'Land Rover',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Lexus',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Lexus',
          labelSegments: [
            {
              label: 'Lexus',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Lotus',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Lotus',
          labelSegments: [
            {
              label: 'Lotus',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Maserati',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Maserati',
          labelSegments: [
            {
              label: 'Maserati',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Mazda',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Mazda',
          labelSegments: [
            {
              label: 'Mazda',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Mercedes-Benz',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Mercedes-Benz',
          labelSegments: [
            {
              label: 'Mercedes-Benz',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Mini',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Mini',
          labelSegments: [
            {
              label: 'Mini',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Mitsubishi',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Mitsubishi',
          labelSegments: [
            {
              label: 'Mitsubishi',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Nissan',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Nissan',
          labelSegments: [
            {
              label: 'Nissan',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Opel',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Opel',
          labelSegments: [
            {
              label: 'Opel',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Peugeot',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Peugeot',
          labelSegments: [
            {
              label: 'Peugeot',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Porsche',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Porsche',
          labelSegments: [
            {
              label: 'Porsche',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Renault',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Renault',
          labelSegments: [
            {
              label: 'Renault',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Rover',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Rover',
          labelSegments: [
            {
              label: 'Rover',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Saab',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Saab',
          labelSegments: [
            {
              label: 'Saab',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Smart',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Smart',
          labelSegments: [
            {
              label: 'Smart',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Subaru',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Subaru',
          labelSegments: [
            {
              label: 'Subaru',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Suzuki',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Suzuki',
          labelSegments: [
            {
              label: 'Suzuki',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Tesla',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Tesla',
          labelSegments: [
            {
              label: 'Tesla',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Toyota',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Toyota',
          labelSegments: [
            {
              label: 'Toyota',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Volkswagen',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Volkswagen',
          labelSegments: [
            {
              label: 'Volkswagen',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Volvo',
            queryType: 'carMake',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Volvo',
          labelSegments: [
            {
              label: 'Volvo',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
  ],
};

export const searchByTireSize: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [
    {
      label: 'Popular Widths',
      siteSearchResultList: [
        {
          action: {
            queryText: '205',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '205',
          labelSegments: [
            {
              label: '205',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '215',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '215',
          labelSegments: [
            {
              label: '215',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '245',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '245',
          labelSegments: [
            {
              label: '245',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '225',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '225',
          labelSegments: [
            {
              label: '225',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '235',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '235',
          labelSegments: [
            {
              label: '235',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
    {
      label: 'All Widths',
      siteSearchResultList: [
        {
          action: {
            queryText: '2.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '2.5',
          labelSegments: [
            {
              label: '2.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '2.75',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '2.75',
          labelSegments: [
            {
              label: '2.75',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '2.8',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '2.8',
          labelSegments: [
            {
              label: '2.8',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '3',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '3',
          labelSegments: [
            {
              label: '3',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '3.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '3.5',
          labelSegments: [
            {
              label: '3.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '4',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '4',
          labelSegments: [
            {
              label: '4',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '4.1',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '4.1',
          labelSegments: [
            {
              label: '4.1',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '4.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '4.5',
          labelSegments: [
            {
              label: '4.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '4.8',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '4.8',
          labelSegments: [
            {
              label: '4.8',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '5',
          labelSegments: [
            {
              label: '5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '5.3',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '5.3',
          labelSegments: [
            {
              label: '5.3',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '5.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '5.5',
          labelSegments: [
            {
              label: '5.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '5.7',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '5.7',
          labelSegments: [
            {
              label: '5.7',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '5.9',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '5.9',
          labelSegments: [
            {
              label: '5.9',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '6',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '6',
          labelSegments: [
            {
              label: '6',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '6.4',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '6.4',
          labelSegments: [
            {
              label: '6.4',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '6.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '6.5',
          labelSegments: [
            {
              label: '6.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '6.7',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '6.7',
          labelSegments: [
            {
              label: '6.7',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '6.9',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '6.9',
          labelSegments: [
            {
              label: '6.9',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '7',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '7',
          labelSegments: [
            {
              label: '7',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '7.2',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '7.2',
          labelSegments: [
            {
              label: '7.2',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '7.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '7.5',
          labelSegments: [
            {
              label: '7.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '7.6',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '7.6',
          labelSegments: [
            {
              label: '7.6',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '8',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '8',
          labelSegments: [
            {
              label: '8',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '8.15',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '8.15',
          labelSegments: [
            {
              label: '8.15',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '8.25',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '8.25',
          labelSegments: [
            {
              label: '8.25',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '8.3',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '8.3',
          labelSegments: [
            {
              label: '8.3',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '8.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '8.5',
          labelSegments: [
            {
              label: '8.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '8.75',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '8.75',
          labelSegments: [
            {
              label: '8.75',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '9',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '9',
          labelSegments: [
            {
              label: '9',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '9.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '9.5',
          labelSegments: [
            {
              label: '9.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '10',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '10',
          labelSegments: [
            {
              label: '10',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '10.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '10.5',
          labelSegments: [
            {
              label: '10.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '11',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '11',
          labelSegments: [
            {
              label: '11',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '11.2',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '11.2',
          labelSegments: [
            {
              label: '11.2',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '11.25',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '11.25',
          labelSegments: [
            {
              label: '11.25',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '11.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '11.5',
          labelSegments: [
            {
              label: '11.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '12',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '12',
          labelSegments: [
            {
              label: '12',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '12.4',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '12.4',
          labelSegments: [
            {
              label: '12.4',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '12.5',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '12.5',
          labelSegments: [
            {
              label: '12.5',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: '12.75',
            queryType: 'tireSize',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: '12.75',
          labelSegments: [
            {
              label: '12.75',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
  ],
};

export const searchByBrand: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [
    {
      label: 'Featured',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Pirelli',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Pirelli',
            src: '/images/brands/pirelli_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Michelin',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Michelin',
            src: '/images/brands/michelin_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Continental',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Continental',
            src: '/images/brands/continental_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Bridgestone',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Bridgestone',
            src: '/images/brands/bridgestone_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Pirelli-2',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Pirelli',
            src: '/images/brands/pirelli_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Michelin-2',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Michelin',
            src: '/images/brands/michelin_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Continental-2',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Continental',
            src: '/images/brands/continental_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Bridgestone-2',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Bridgestone',
            src: '/images/brands/bridgestone_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Pirelli-3',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Pirelli',
            src: '/images/brands/pirelli_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
        {
          action: {
            queryText: 'Michelin-3',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          image: {
            altText: 'Michelin',
            src: '/images/brands/michelin_logo.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          type: 'SiteSearchResultImageItem',
        } as SiteSearchResultImageItem,
      ],
    },
    {
      label: 'All',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Anatares',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Anatares',
          labelSegments: [
            {
              label: 'Anatares',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'BFGoodrich',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'BFGoodrich',
          labelSegments: [
            {
              label: 'BFGoodrich',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Bridgestone',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Bridgestone',
          labelSegments: [
            {
              label: 'Bridgestone',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Continental',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Continental',
          labelSegments: [
            {
              label: 'Continental',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Cooper',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Cooper',
          labelSegments: [
            {
              label: 'Cooper',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Dextero',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Dextero',
          labelSegments: [
            {
              label: 'Dextero',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Douglas',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Douglas',
          labelSegments: [
            {
              label: 'Douglas',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Dunlop',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Dunlop',
          labelSegments: [
            {
              label: 'Dunlop',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Falken',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Falken',
          labelSegments: [
            {
              label: 'Falken',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Goodyear',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Goodyear',
          labelSegments: [
            {
              label: 'Goodyear',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Hankook',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Hankook',
          labelSegments: [
            {
              label: 'Hankook',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Kelly',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Kelly',
          labelSegments: [
            {
              label: 'Kelly',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Kumho',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Kumho',
          labelSegments: [
            {
              label: 'Kumho',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Mastercraft',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Mastercraft',
          labelSegments: [
            {
              label: 'Mastercraft',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Michelin',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Michelin',
          labelSegments: [
            {
              label: 'Michelin',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Nexen',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Nexen',
          labelSegments: [
            {
              label: 'Nexen',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Nitto',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Nitto',
          labelSegments: [
            {
              label: 'Nitto',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Nokian',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Nokian',
          labelSegments: [
            {
              label: 'Nokian',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Pirelli',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Pirelli',
          labelSegments: [
            {
              label: 'Pirelli',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Rydanz',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Rydanz',
          labelSegments: [
            {
              label: 'Rydanz',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Solar',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Solar',
          labelSegments: [
            {
              label: 'Solar',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Uniroyal',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Uniroyal',
          labelSegments: [
            {
              label: 'Uniroyal',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Yokoham',
            queryType: 'brand',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Yokoham',
          labelSegments: [
            {
              label: 'Yokoham',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
  ],
};

export const searchByMostPopular: Results = {
  resultMetadata: {},
  siteSearchResultGroupList: [
    {
      label: 'Most Popular',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Michelin Pilot Sports A/S',
            queryType: 'popular',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Michelin Pilot Sports A/S',
          labelSegments: [
            {
              label: 'Michelin Pilot Sports A/S',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Michelin Defender',
            queryType: 'popular',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Michelin Defender',
          labelSegments: [
            {
              label: 'Michelin Defender',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Hankook Ventus ST',
            queryType: 'popular',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Hankook Ventus ST',
          labelSegments: [
            {
              label: 'Hankook Ventus ST',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Pirelli P Zero Nero',
            queryType: 'popular',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Pirelli P Zero Nero',
          labelSegments: [
            {
              label: 'Pirelli P Zero Nero',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Yokohama AVID Ascend',
            queryType: 'popular',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Yokohama AVID Ascend',
          labelSegments: [
            {
              label: 'Yokohama AVID Ascend',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Michelin Primacy',
            queryType: 'popular',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Michelin Primacy',
          labelSegments: [
            {
              label: 'Michelin Primacy',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Bridgestone Dueler H/P Sport AS',
            queryType: 'popular',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Bridgestone Dueler H/P Sport AS',
          labelSegments: [
            {
              label: 'Bridgestone Dueler H/P Sport AS',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
        {
          action: {
            queryText: 'Hankook Ventus ST RH06',
            queryType: 'popular',
            type: 'SiteSearchResultActionQuery',
          },
          detailLabel: null,
          label: 'Hankook Ventus ST RH06',
          labelSegments: [
            {
              label: 'Hankook Ventus ST RH06',
              matches: false,
            },
          ],
          type: 'SiteSearchResultTextItem',
        } as SiteSearchResultTextItem,
      ],
    },
  ],
};
