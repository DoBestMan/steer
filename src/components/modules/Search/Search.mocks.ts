import { ui } from '~/lib/utils/ui-dictionary';

import { Results } from './Search';

export const noSearchResults: Results = {
  siteSearchGroupList: [],
};

export const simpleSearchResults: Results = {
  siteSearchGroupList: [
    {
      siteSearchResultList: [
        {
          displayValue: 'Honda',
          type: 'term',
          value: 'Honda',
        },
        {
          displayValue: 'Honda Accord',
          type: 'term',
          value: 'Honda Accord',
        },
        {
          displayValue: 'Honda Civic',
          type: 'term',
          value: 'Honda Civic',
        },
        {
          displayValue: 'Honda CRV',
          type: 'term',
          value: 'Honda CRV',
        },
        {
          displayValue: 'Honda Super Crazy Long Name Awesome Car 3000',
          type: 'term',
          value: 'Honda Super Long Name Awesome Car 3000',
        },
        {
          displayValue: 'Hyundai',
          type: 'term',
          value: 'Hyundai',
        },
        {
          displayValue: 'Hyundai Elantra',
          type: 'term',
          value: 'Hyundai Elantra',
        },
        {
          displayValue: 'Hyundai Tucson',
          type: 'term',
          value: 'Hyundai Tucson',
        },
      ],
      type: 'SiteSearchResultsList',
    },
  ],
};

export const partNumberResults: Results = {
  siteSearchGroupList: [
    {
      siteSearchResultList: [
        {
          additionalDisplayValue: 'Goodyear Eagle GT II・Size 275/45R20',
          displayValue: '106137625',
          type: 'term',
          value: '106137625',
        },
        {
          additionalDisplayValue: 'Goodyear Eagle GT II・Size 305/50R20',
          displayValue: '106134277',
          type: 'term',
          value: '106134277',
        },
        {
          additionalDisplayValue:
            'Bridgestone Turanza Serenity Plus・Size 275/40R19',
          displayValue: '106134223',
          type: 'term',
          value: '106134223',
        },
        {
          additionalDisplayValue:
            'Bridgestone Turanza Serenity Plus・Size 235/40R18',
          displayValue: '106134224',
          type: 'term',
          value: '106134224',
        },
        {
          additionalDisplayValue:
            'Bridgestone Turanza Serenity Plus・Size 245/40R18',
          displayValue: '106134294',
          type: 'term',
          value: '106134294',
        },
      ],
      type: 'SiteSearchResultsList',
    },
  ],
};

export const pastSearchResults = [
  {
    displayValue: 'Mini Cooper 2018 Hardtop',
    type: 'term',
    value: 'Mini Cooper 2018 Hardtop',
  },
  {
    displayValue: 'Honda Civic 2016 EX-L',
    type: 'term',
    value: 'Honda Civic 2016 EX-L',
  },
  {
    displayValue: '215/50R16',
    type: 'term',
    value: '215/50R16',
  },
  {
    displayValue: 'Toyota Sienna 2018 LE',
    type: 'term',
    value: 'Toyota Sienna 2018 LE',
  },
  {
    displayValue: 'Hankook Kinergy PT',
    type: 'term',
    value: 'Hankook Kinergy PT',
  },
];

export const initialSearchCategories = [
  {
    displayValue: ui('search.searchCategories.vehicle'),
    type: 'term',
    value: ui('search.searchCategories.vehicle'),
  },
  {
    displayValue: ui('search.searchCategories.tireSize'),
    type: 'term',
    value: ui('search.searchCategories.tireSize'),
  },
  {
    displayValue: ui('search.searchCategories.brand'),
    type: 'term',
    value: ui('search.searchCategories.brand'),
  },
  {
    displayValue: ui('search.searchCategories.popularTires'),
    type: 'term',
    value: ui('search.searchCategories.popularTires'),
  },
];
