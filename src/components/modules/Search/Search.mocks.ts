import {
  Results,
  SearchResultActionType,
  SearchResultListEnum,
  SearchResultType,
  SearchStateCopy,
  SearchStateEnum,
} from './Search.types';

export const pastSearchResults = [
  {
    label: 'Mini Cooper 2018 Hardtop',
    labelSegments: [
      {
        label: 'Mini Cooper 2018 Hardtop',
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
  {
    label: 'Honda Civic 2016 EX-L',
    labelSegments: [
      {
        label: 'Honda Civic 2016 EX-L',
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
  {
    label: '215/50R16',
    labelSegments: [
      {
        label: '215/50R16',
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
  {
    label: 'Toyota Sienna 2018 LE',
    labelSegments: [
      {
        label: 'Toyota Sienna 2018 LE',
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
  {
    label: 'Hankook Kinergy PT',
    labelSegments: [
      {
        label: 'Hankook Kinergy PT',
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
];

export const initialSearchCategories = [
  {
    label: SearchStateCopy[SearchStateEnum.VEHICLE],
    labelSegments: [
      {
        label: SearchStateCopy[SearchStateEnum.VEHICLE],
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
  {
    label: SearchStateCopy[SearchStateEnum.TIRE_SIZE],
    labelSegments: [
      {
        label: SearchStateCopy[SearchStateEnum.TIRE_SIZE],
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
  {
    label: SearchStateCopy[SearchStateEnum.BRAND],
    labelSegments: [
      {
        label: SearchStateCopy[SearchStateEnum.BRAND],
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
  {
    label: SearchStateCopy[SearchStateEnum.POPULAR],
    labelSegments: [
      {
        label: SearchStateCopy[SearchStateEnum.POPULAR],
        matches: false,
      },
    ],
    type: SearchResultType.SiteSearchResultTextItem,
  },
];

export const noSearchResults: Results = {
  resultMetadata: {
    noExactMatches: true,
  },
  siteSearchGroupList: [],
};

export const noResultsWithSuggestions: Results = {
  resultMetadata: {
    noExactMatches: true,
  },
  siteSearchGroupList: [
    {
      label: 'Did you mean',
      type: SearchResultListEnum.LIST,
      siteSearchResultList: [
        {
          label: '205',
          labelSegments: [
            {
              label: '205',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          label: '215',
          labelSegments: [
            {
              label: '215',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          label: '245',
          labelSegments: [
            {
              label: '245',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          label: '225',
          labelSegments: [
            {
              label: '225',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          label: '235',
          labelSegments: [
            {
              label: '235',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
    },
  ],
};

export const simpleSearchResults: Results = {
  resultMetadata: {},
  siteSearchGroupList: [
    {
      siteSearchResultList: [
        {
          action: {
            queryText: 'Honda',
            queryType: 'vehicleMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
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
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Honda Accord',
            queryType: 'vehicleMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
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
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Honda Civic',
            queryType: 'vehicleMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
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
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Honda CRV',
            queryType: 'vehicleMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
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
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Honda Super Crazy Long Name Awesome Car 3000',
            queryType: 'vehicleMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
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
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Hyundai',
            queryType: 'vehicleMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
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
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Hyundai Elantra',
            queryType: 'vehicleMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
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
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Hyundai Tucson',
            queryType: 'vehicleMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
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
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
  ],
};

export const partNumberResults: Results = {
  resultMetadata: {},
  siteSearchGroupList: [
    {
      siteSearchResultList: [
        {
          action: {
            queryText: '106137625',
            queryType: 'partNumber',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          additionalDisplayValue: 'Goodyear Eagle GT II・Size 275/45R20',
          label: '106137625',
          labelSegments: [
            {
              label: '106137625',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '106134277',
            queryType: 'partNumber',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          additionalDisplayValue: 'Goodyear Eagle GT II・Size 305/50R20',
          label: '106134277',
          labelSegments: [
            {
              label: '106134277',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '106134223',
            queryType: 'partNumber',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          additionalDisplayValue:
            'Bridgestone Turanza Serenity Plus・Size 275/40R19',
          label: '106134223',
          labelSegments: [
            {
              label: '106134223',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '106134224',
            queryType: 'partNumber',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          additionalDisplayValue:
            'Bridgestone Turanza Serenity Plus・Size 235/40R18',
          label: '106134224',
          labelSegments: [
            {
              label: '106134224',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '106134294',
            queryType: 'partNumber',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          additionalDisplayValue:
            'Bridgestone Turanza Serenity Plus・Size 245/40R18',
          label: '106134294',
          labelSegments: [
            {
              label: '106134294',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
  ],
};

export const tireSizeResults: Results = {
  resultMetadata: {},
  siteSearchGroupList: [
    {
      label: 'Width > Ratio > Rim',
      siteSearchResultList: [
        {
          action: {
            queryText: '215/50R12',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '215/50R12',
          labelSegments: [
            {
              label: '215/50R12',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '215/50R16',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '215/50R16',
          labelSegments: [
            {
              label: '215/50R16',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '215/50R17',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '215/50R17',
          labelSegments: [
            {
              label: '215/50R17',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '215/50R18',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '215/50R18',
          labelSegments: [
            {
              label: '215/50R18',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
  ],
};

export const searchByVehicle: Results = {
  resultMetadata: {},
  siteSearchGroupList: [
    {
      label: 'Most Popular',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Honda',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Honda',
          labelSegments: [
            {
              label: 'Honda',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Toyota',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Toyota',
          labelSegments: [
            {
              label: 'Toyota',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Ford',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Ford',
          labelSegments: [
            {
              label: 'Ford',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Subaru',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Subaru',
          labelSegments: [
            {
              label: 'Subaru',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Chevrolet',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Chevrolet',
          labelSegments: [
            {
              label: 'Chevrolet',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
    {
      label: 'All',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Alfa Romeo',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Alfa Romeo',
          labelSegments: [
            {
              label: 'Alfa Romeo',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Aston Martin',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Aston Martin',
          labelSegments: [
            {
              label: 'Aston Martin',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Audi',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Audi',
          labelSegments: [
            {
              label: 'Audi',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Bentley',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Bentley',
          labelSegments: [
            {
              label: 'Bentley',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'BMW',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'BMW',
          labelSegments: [
            {
              label: 'BMW',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Bugatti',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Bugatti',
          labelSegments: [
            {
              label: 'Bugatti',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Cadillac',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Cadillac',
          labelSegments: [
            {
              label: 'Cadillac',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Chevrolet',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Chevrolet',
          labelSegments: [
            {
              label: 'Chevrolet',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Chrysler',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Chrysler',
          labelSegments: [
            {
              label: 'Chrysler',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Citroën',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Citroën',
          labelSegments: [
            {
              label: 'Citroën',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Dacia',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Dacia',
          labelSegments: [
            {
              label: 'Dacia',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Daewoo',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Daewoo',
          labelSegments: [
            {
              label: 'Daewoo',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Dodge',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Dodge',
          labelSegments: [
            {
              label: 'Dodge',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Ferrari',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Ferrari',
          labelSegments: [
            {
              label: 'Ferrari',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Fiat',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Fiat',
          labelSegments: [
            {
              label: 'Fiat',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Ford',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Ford',
          labelSegments: [
            {
              label: 'Ford',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Honda',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Honda',
          labelSegments: [
            {
              label: 'Honda',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Hummer',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Hummer',
          labelSegments: [
            {
              label: 'Hummer',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Hyundai',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Hyundai',
          labelSegments: [
            {
              label: 'Hyundai',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Infiniti',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Infiniti',
          labelSegments: [
            {
              label: 'Infiniti',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Jaguar',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Jaguar',
          labelSegments: [
            {
              label: 'Jaguar',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Jeep',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Jeep',
          labelSegments: [
            {
              label: 'Jeep',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Kia',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Kia',
          labelSegments: [
            {
              label: 'Kia',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Lamborghini',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Lamborghini',
          labelSegments: [
            {
              label: 'Lamborghini',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Land Rover',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Land Rover',
          labelSegments: [
            {
              label: 'Land Rover',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Lexus',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Lexus',
          labelSegments: [
            {
              label: 'Lexus',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Lotus',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Lotus',
          labelSegments: [
            {
              label: 'Lotus',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Maserati',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Maserati',
          labelSegments: [
            {
              label: 'Maserati',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Mazda',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Mazda',
          labelSegments: [
            {
              label: 'Mazda',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Mercedes-Benz',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Mercedes-Benz',
          labelSegments: [
            {
              label: 'Mercedes-Benz',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Mini',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Mini',
          labelSegments: [
            {
              label: 'Mini',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Mitsubishi',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Mitsubishi',
          labelSegments: [
            {
              label: 'Mitsubishi',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Nissan',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Nissan',
          labelSegments: [
            {
              label: 'Nissan',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Opel',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Opel',
          labelSegments: [
            {
              label: 'Opel',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Peugeot',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Peugeot',
          labelSegments: [
            {
              label: 'Peugeot',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Porsche',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Porsche',
          labelSegments: [
            {
              label: 'Porsche',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Renault',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Renault',
          labelSegments: [
            {
              label: 'Renault',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Rover',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Rover',
          labelSegments: [
            {
              label: 'Rover',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Saab',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Saab',
          labelSegments: [
            {
              label: 'Saab',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Smart',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Smart',
          labelSegments: [
            {
              label: 'Smart',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Subaru',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Subaru',
          labelSegments: [
            {
              label: 'Subaru',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Suzuki',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Suzuki',
          labelSegments: [
            {
              label: 'Suzuki',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Tesla',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Tesla',
          labelSegments: [
            {
              label: 'Tesla',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Toyota',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Toyota',
          labelSegments: [
            {
              label: 'Toyota',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Volkswagen',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Volkswagen',
          labelSegments: [
            {
              label: 'Volkswagen',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Volvo',
            queryType: 'carMake',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Volvo',
          labelSegments: [
            {
              label: 'Volvo',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
  ],
};

export const searchByTireSize: Results = {
  resultMetadata: {},
  siteSearchGroupList: [
    {
      label: 'Popular Widths',
      siteSearchResultList: [
        {
          action: {
            queryText: '205',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '205',
          labelSegments: [
            {
              label: '205',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '215',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '215',
          labelSegments: [
            {
              label: '215',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '245',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '245',
          labelSegments: [
            {
              label: '245',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '225',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '225',
          labelSegments: [
            {
              label: '225',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '235',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '235',
          labelSegments: [
            {
              label: '235',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
    {
      label: 'All Widths',
      siteSearchResultList: [
        {
          action: {
            queryText: '2.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '2.5',
          labelSegments: [
            {
              label: '2.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '2.75',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '2.75',
          labelSegments: [
            {
              label: '2.75',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '2.8',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '2.8',
          labelSegments: [
            {
              label: '2.8',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '3',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '3',
          labelSegments: [
            {
              label: '3',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '3.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '3.5',
          labelSegments: [
            {
              label: '3.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '4',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '4',
          labelSegments: [
            {
              label: '4',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '4.1',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '4.1',
          labelSegments: [
            {
              label: '4.1',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '4.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '4.5',
          labelSegments: [
            {
              label: '4.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '4.8',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '4.8',
          labelSegments: [
            {
              label: '4.8',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '5',
          labelSegments: [
            {
              label: '5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '5.3',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '5.3',
          labelSegments: [
            {
              label: '5.3',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '5.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '5.5',
          labelSegments: [
            {
              label: '5.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '5.7',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '5.7',
          labelSegments: [
            {
              label: '5.7',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '5.9',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '5.9',
          labelSegments: [
            {
              label: '5.9',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '6',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '6',
          labelSegments: [
            {
              label: '6',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '6.4',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '6.4',
          labelSegments: [
            {
              label: '6.4',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '6.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '6.5',
          labelSegments: [
            {
              label: '6.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '6.7',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '6.7',
          labelSegments: [
            {
              label: '6.7',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '6.9',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '6.9',
          labelSegments: [
            {
              label: '6.9',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '7',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '7',
          labelSegments: [
            {
              label: '7',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '7.2',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '7.2',
          labelSegments: [
            {
              label: '7.2',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '7.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '7.5',
          labelSegments: [
            {
              label: '7.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '7.6',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '7.6',
          labelSegments: [
            {
              label: '7.6',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '8',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '8',
          labelSegments: [
            {
              label: '8',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '8.15',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '8.15',
          labelSegments: [
            {
              label: '8.15',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '8.25',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '8.25',
          labelSegments: [
            {
              label: '8.25',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '8.3',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '8.3',
          labelSegments: [
            {
              label: '8.3',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '8.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '8.5',
          labelSegments: [
            {
              label: '8.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '8.75',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '8.75',
          labelSegments: [
            {
              label: '8.75',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '9',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '9',
          labelSegments: [
            {
              label: '9',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '9.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '9.5',
          labelSegments: [
            {
              label: '9.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '10',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '10',
          labelSegments: [
            {
              label: '10',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '10.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '10.5',
          labelSegments: [
            {
              label: '10.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '11',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '11',
          labelSegments: [
            {
              label: '11',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '11.2',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '11.2',
          labelSegments: [
            {
              label: '11.2',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '11.25',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '11.25',
          labelSegments: [
            {
              label: '11.25',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '11.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '11.5',
          labelSegments: [
            {
              label: '11.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '12',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '12',
          labelSegments: [
            {
              label: '12',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '12.4',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '12.4',
          labelSegments: [
            {
              label: '12.4',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '12.5',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '12.5',
          labelSegments: [
            {
              label: '12.5',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: '12.75',
            queryType: 'tireSize',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: '12.75',
          labelSegments: [
            {
              label: '12.75',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
  ],
};

export const searchByBrand: Results = {
  resultMetadata: {},
  siteSearchGroupList: [
    {
      label: 'Featured',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Pirelli',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/pirelli_logo.svg',
          label: 'Pirelli',
          labelSegments: [
            {
              label: 'Pirelli',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Michelin',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/michelin_logo.svg',
          label: 'Michelin',
          labelSegments: [
            {
              label: 'Michelin',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Continental',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/continental_logo.svg',
          label: 'Continental',
          labelSegments: [
            {
              label: 'Continental',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Bridgestone',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/bridgestone_logo.svg',
          label: 'Bridgestone',
          labelSegments: [
            {
              label: 'Bridgestone',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Pirelli-2',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/pirelli_logo.svg',
          label: 'Pirelli-2',
          labelSegments: [
            {
              label: 'Pirelli-2',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Michelin-2',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/michelin_logo.svg',
          label: 'Michelin-2',
          labelSegments: [
            {
              label: 'Michelin-2',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Continental-2',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/continental_logo.svg',
          label: 'Continental-2',
          labelSegments: [
            {
              label: 'Continental-2',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Bridgestone-2',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/bridgestone_logo.svg',
          label: 'Bridgestone-2',
          labelSegments: [
            {
              label: 'Bridgestone-2',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Pirelli-3',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/pirelli_logo.svg',
          label: 'Pirelli-3',
          labelSegments: [
            {
              label: 'Pirelli-3',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Michelin-3',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/michelin_logo.svg',
          label: 'Michelin-3',
          labelSegments: [
            {
              label: 'Michelin-3',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Continental-3',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/continental_logo.svg',
          label: 'Continental-3',
          labelSegments: [
            {
              label: 'Continental-3',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
        {
          action: {
            queryText: 'Bridgestone-3',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          displayImage: '/images/brands/bridgestone_logo.svg',
          label: 'Bridgestone-3',
          labelSegments: [
            {
              label: 'Bridgestone-3',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultImageItem,
        },
      ],
      type: SearchResultListEnum.CAROUSEL,
    },
    {
      label: 'All',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Anatares',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Anatares',
          labelSegments: [
            {
              label: 'Anatares',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'BFGoodrich',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'BFGoodrich',
          labelSegments: [
            {
              label: 'BFGoodrich',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Bridgestone',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Bridgestone',
          labelSegments: [
            {
              label: 'Bridgestone',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Continental',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Continental',
          labelSegments: [
            {
              label: 'Continental',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Cooper',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Cooper',
          labelSegments: [
            {
              label: 'Cooper',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Dextero',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Dextero',
          labelSegments: [
            {
              label: 'Dextero',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Douglas',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Douglas',
          labelSegments: [
            {
              label: 'Douglas',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Dunlop',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Dunlop',
          labelSegments: [
            {
              label: 'Dunlop',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Falken',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Falken',
          labelSegments: [
            {
              label: 'Falken',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Goodyear',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Goodyear',
          labelSegments: [
            {
              label: 'Goodyear',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Hankook',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Hankook',
          labelSegments: [
            {
              label: 'Hankook',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Kelly',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Kelly',
          labelSegments: [
            {
              label: 'Kelly',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Kumho',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Kumho',
          labelSegments: [
            {
              label: 'Kumho',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Mastercraft',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Mastercraft',
          labelSegments: [
            {
              label: 'Mastercraft',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Michelin',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Michelin',
          labelSegments: [
            {
              label: 'Michelin',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Nexen',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Nexen',
          labelSegments: [
            {
              label: 'Nexen',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Nitto',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Nitto',
          labelSegments: [
            {
              label: 'Nitto',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Nokian',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Nokian',
          labelSegments: [
            {
              label: 'Nokian',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Pirelli',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Pirelli',
          labelSegments: [
            {
              label: 'Pirelli',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Rydanz',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Rydanz',
          labelSegments: [
            {
              label: 'Rydanz',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Solar',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Solar',
          labelSegments: [
            {
              label: 'Solar',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Uniroyal',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Uniroyal',
          labelSegments: [
            {
              label: 'Uniroyal',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Yokoham',
            queryType: 'brand',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Yokoham',
          labelSegments: [
            {
              label: 'Yokoham',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
  ],
};

export const searchByMostPopular: Results = {
  resultMetadata: {},
  siteSearchGroupList: [
    {
      label: 'Most Popular',
      siteSearchResultList: [
        {
          action: {
            queryText: 'Michelin Pilot Sports A/S',
            queryType: 'popular',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Michelin Pilot Sports A/S',
          labelSegments: [
            {
              label: 'Michelin Pilot Sports A/S',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Michelin Defender',
            queryType: 'popular',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Michelin Defender',
          labelSegments: [
            {
              label: 'Michelin Defender',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Hankook Ventus ST',
            queryType: 'popular',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Hankook Ventus ST',
          labelSegments: [
            {
              label: 'Hankook Ventus ST',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Pirelli P Zero Nero',
            queryType: 'popular',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Pirelli P Zero Nero',
          labelSegments: [
            {
              label: 'Pirelli P Zero Nero',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Yokohama AVID Ascend',
            queryType: 'popular',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Yokohama AVID Ascend',
          labelSegments: [
            {
              label: 'Yokohama AVID Ascend',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Michelin Primacy',
            queryType: 'popular',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Michelin Primacy',
          labelSegments: [
            {
              label: 'Michelin Primacy',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Bridgestone Dueler H/P Sport AS',
            queryType: 'popular',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Bridgestone Dueler H/P Sport AS',
          labelSegments: [
            {
              label: 'Bridgestone Dueler H/P Sport AS',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
        {
          action: {
            queryText: 'Hankook Ventus ST RH06',
            queryType: 'popular',
            type: SearchResultActionType.SiteSearchResultActionQuery,
          },
          label: 'Hankook Ventus ST RH06',
          labelSegments: [
            {
              label: 'Hankook Ventus ST RH06',
              matches: false,
            },
          ],
          type: SearchResultType.SiteSearchResultTextItem,
        },
      ],
      type: SearchResultListEnum.LIST,
    },
  ],
};
