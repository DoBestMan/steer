import { ui } from '~/lib/utils/ui-dictionary';

import { Results } from './Search';
import { SearchStateEnum } from './Search.constants';

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

export const tireSizeResults: Results = {
  siteSearchGroupList: [
    {
      labelFragments: [
        { highlighted: false, value: 'Front width' },
        { highlighted: false, value: 'Ratio' },
        { highlighted: true, value: 'Rim' },
      ],
      siteSearchResultList: [
        {
          displayValue: '215/50R12',
          type: 'term',
          value: '215/50R12',
        },
        {
          displayValue: '215/50R16',
          type: 'term',
          value: '215/50R16',
        },
        {
          displayValue: '215/50R17',
          type: 'term',
          value: '215/50R17',
        },
        {
          displayValue: '215/50R18',
          type: 'term',
          value: '215/50R18',
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
    value: SearchStateEnum.VEHICLE,
  },
  {
    displayValue: ui('search.searchCategories.tireSize'),
    type: 'term',
    value: SearchStateEnum.TIRE_SIZE,
  },
  {
    displayValue: ui('search.searchCategories.brand'),
    type: 'term',
    value: SearchStateEnum.BRAND,
  },
  {
    displayValue: ui('search.searchCategories.popularTires'),
    type: 'term',
    value: SearchStateEnum.POPULAR,
  },
];

export const searchByVehicle: Results = {
  siteSearchGroupList: [
    {
      label: 'Most Popular',
      siteSearchResultList: [
        {
          displayValue: 'Honda',
          type: 'term',
          value: 'Honda',
        },
        {
          displayValue: 'Toyota',
          type: 'term',
          value: 'Toyota',
        },
        {
          displayValue: 'Ford',
          type: 'term',
          value: 'Ford',
        },
        {
          displayValue: 'Subaru',
          type: 'term',
          value: 'Subaru',
        },
        {
          displayValue: 'Chevrolet',
          type: 'term',
          value: 'Chevrolet',
        },
      ],
      type: 'SiteSearchResultsList',
    },
    {
      label: 'All',
      siteSearchResultList: [
        {
          displayValue: 'Alfa Romeo',
          type: 'term',
          value: 'Alfa Romeo',
        },
        {
          displayValue: 'Aston Martin',
          type: 'term',
          value: 'Aston Martin',
        },
        {
          displayValue: 'Audi',
          type: 'term',
          value: 'Audi',
        },
        {
          displayValue: 'Bentley',
          type: 'term',
          value: 'Bentley',
        },
        {
          displayValue: 'BMW',
          type: 'term',
          value: 'BMW',
        },
        {
          displayValue: 'Bugatti',
          type: 'term',
          value: 'Bugatti',
        },
        {
          displayValue: 'Cadillac',
          type: 'term',
          value: 'Cadillac',
        },
        {
          displayValue: 'Chevrolet',
          type: 'term',
          value: 'Chevrolet',
        },
        {
          displayValue: 'Chrysler',
          type: 'term',
          value: 'Chrysler',
        },
        {
          displayValue: 'Citroën',
          type: 'term',
          value: 'Citroën',
        },
        {
          displayValue: 'Dacia',
          type: 'term',
          value: 'Dacia',
        },
        {
          displayValue: 'Daewoo',
          type: 'term',
          value: 'Daewoo',
        },
        {
          displayValue: 'Dodge',
          type: 'term',
          value: 'Dodge',
        },
        {
          displayValue: 'Ferrari',
          type: 'term',
          value: 'Ferrari',
        },
        {
          displayValue: 'Fiat',
          type: 'term',
          value: 'Fiat',
        },
        {
          displayValue: 'Ford',
          type: 'term',
          value: 'Ford',
        },
        {
          displayValue: 'Honda',
          type: 'term',
          value: 'Honda',
        },
        {
          displayValue: 'Hummer',
          type: 'term',
          value: 'Hummer',
        },
        {
          displayValue: 'Hyundai',
          type: 'term',
          value: 'Hyundai',
        },
        {
          displayValue: 'Infiniti',
          type: 'term',
          value: 'Infiniti',
        },
        {
          displayValue: 'Jaguar',
          type: 'term',
          value: 'Jaguar',
        },
        {
          displayValue: 'Jeep',
          type: 'term',
          value: 'Jeep',
        },
        {
          displayValue: 'Kia',
          type: 'term',
          value: 'Kia',
        },
        {
          displayValue: 'Lamborghini',
          type: 'term',
          value: 'Lamborghini',
        },
        {
          displayValue: 'Land Rover',
          type: 'term',
          value: 'Land Rover',
        },
        {
          displayValue: 'Lexus',
          type: 'term',
          value: 'Lexus',
        },
        {
          displayValue: 'Lotus',
          type: 'term',
          value: 'Lotus',
        },
        {
          displayValue: 'Maserati',
          type: 'term',
          value: 'Maserati',
        },
        {
          displayValue: 'Mazda',
          type: 'term',
          value: 'Mazda',
        },
        {
          displayValue: 'Mercedes-Benz',
          type: 'term',
          value: 'Mercedes-Benz',
        },
        {
          displayValue: 'Mini',
          type: 'term',
          value: 'Mini',
        },
        {
          displayValue: 'Mitsubishi',
          type: 'term',
          value: 'Mitsubishi',
        },
        {
          displayValue: 'Nissan',
          type: 'term',
          value: 'Nissan',
        },
        {
          displayValue: 'Opel',
          type: 'term',
          value: 'Opel',
        },
        {
          displayValue: 'Peugeot',
          type: 'term',
          value: 'Peugeot',
        },
        {
          displayValue: 'Porsche',
          type: 'term',
          value: 'Porsche',
        },
        {
          displayValue: 'Renault',
          type: 'term',
          value: 'Renault',
        },
        {
          displayValue: 'Rover',
          type: 'term',
          value: 'Rover',
        },
        {
          displayValue: 'Saab',
          type: 'term',
          value: 'Saab',
        },
        {
          displayValue: 'Smart',
          type: 'term',
          value: 'Smart',
        },
        {
          displayValue: 'Subaru',
          type: 'term',
          value: 'Subaru',
        },
        {
          displayValue: 'Suzuki',
          type: 'term',
          value: 'Suzuki',
        },
        {
          displayValue: 'Tesla',
          type: 'term',
          value: 'Tesla',
        },
        {
          displayValue: 'Toyota',
          type: 'term',
          value: 'Toyota',
        },
        {
          displayValue: 'Volkswagen',
          type: 'term',
          value: 'Volkswagen',
        },
        {
          displayValue: 'Volvo',
          type: 'term',
          value: 'Volvo',
        },
      ],
      type: 'SiteSearchResultsList',
    },
  ],
};

export const searchByTireSize: Results = {
  siteSearchGroupList: [
    {
      label: 'Popular Widths',
      siteSearchResultList: [
        {
          displayValue: '205',
          type: 'term',
          value: '205',
        },
        {
          displayValue: '215',
          type: 'term',
          value: '215',
        },
        {
          displayValue: '245',
          type: 'term',
          value: '245',
        },
        {
          displayValue: '225',
          type: 'term',
          value: '225',
        },
        {
          displayValue: '235',
          type: 'term',
          value: '235',
        },
      ],
      type: 'SiteSearchResultsList',
    },
    {
      label: 'All Widths',
      siteSearchResultList: [
        {
          displayValue: '2.5',
          type: 'term',
          value: '2.5',
        },
        {
          displayValue: '2.75',
          type: 'term',
          value: '2.75',
        },
        {
          displayValue: '2.8',
          type: 'term',
          value: '2.8',
        },
        {
          displayValue: '3',
          type: 'term',
          value: '3',
        },
        {
          displayValue: '3.5',
          type: 'term',
          value: '3.5',
        },
        {
          displayValue: '4',
          type: 'term',
          value: '4',
        },
        {
          displayValue: '4.1',
          type: 'term',
          value: '4.1',
        },
        {
          displayValue: '4.5',
          type: 'term',
          value: '4.5',
        },
        {
          displayValue: '4.8',
          type: 'term',
          value: '4.8',
        },
        {
          displayValue: '5',
          type: 'term',
          value: '5',
        },
        {
          displayValue: '5.3',
          type: 'term',
          value: '5.3',
        },
        {
          displayValue: '5.5',
          type: 'term',
          value: '5.5',
        },
        {
          displayValue: '5.7',
          type: 'term',
          value: '5.7',
        },
        {
          displayValue: '5.9',
          type: 'term',
          value: '5.9',
        },
        {
          displayValue: '6',
          type: 'term',
          value: '6',
        },
        {
          displayValue: '6.4',
          type: 'term',
          value: '6.4',
        },
        {
          displayValue: '6.5',
          type: 'term',
          value: '6.5',
        },
        {
          displayValue: '6.7',
          type: 'term',
          value: '6.7',
        },
        {
          displayValue: '6.9',
          type: 'term',
          value: '6.9',
        },
        {
          displayValue: '7',
          type: 'term',
          value: '7',
        },
        {
          displayValue: '7.2',
          type: 'term',
          value: '7.2',
        },
        {
          displayValue: '7.5',
          type: 'term',
          value: '7.5',
        },
        {
          displayValue: '7.6',
          type: 'term',
          value: '7.6',
        },
        {
          displayValue: '8',
          type: 'term',
          value: '8',
        },
        {
          displayValue: '8.15',
          type: 'term',
          value: '8.15',
        },
        {
          displayValue: '8.25',
          type: 'term',
          value: '8.25',
        },
        {
          displayValue: '8.3',
          type: 'term',
          value: '8.3',
        },
        {
          displayValue: '8.5',
          type: 'term',
          value: '8.5',
        },
        {
          displayValue: '8.75',
          type: 'term',
          value: '8.75',
        },
        {
          displayValue: '9',
          type: 'term',
          value: '9',
        },
        {
          displayValue: '9.5',
          type: 'term',
          value: '9.5',
        },
        {
          displayValue: '10',
          type: 'term',
          value: '10',
        },
        {
          displayValue: '10.5',
          type: 'term',
          value: '10.5',
        },
        {
          displayValue: '11',
          type: 'term',
          value: '11',
        },
        {
          displayValue: '11.2',
          type: 'term',
          value: '11.2',
        },
        {
          displayValue: '11.25',
          type: 'term',
          value: '11.25',
        },
        {
          displayValue: '11.5',
          type: 'term',
          value: '11.5',
        },
        {
          displayValue: '12',
          type: 'term',
          value: '12',
        },
        {
          displayValue: '12.4',
          type: 'term',
          value: '12.4',
        },
        {
          displayValue: '12.5',
          type: 'term',
          value: '12.5',
        },
        {
          displayValue: '12.75',
          type: 'term',
          value: '12.75',
        },
      ],
      type: 'SiteSearchResultsList',
    },
  ],
};

export const searchByBrand: Results = {
  siteSearchGroupList: [
    {
      label: 'Featured',
      siteSearchResultList: [
        {
          displayValue: 'This will be a carousel',
          type: 'term',
          value: 'This will be a carousel',
        },
      ],
      type: 'SiteSearchResultsList',
    },
    {
      label: 'All',
      siteSearchResultList: [
        {
          displayValue: 'Anatares',
          type: 'term',
          value: 'Anatares',
        },
        {
          displayValue: 'BFGoodrich',
          type: 'term',
          value: 'BFGoodrich',
        },
        {
          displayValue: 'Bridgestone',
          type: 'term',
          value: 'Bridgestone',
        },
        {
          displayValue: 'Continental',
          type: 'term',
          value: 'Continental',
        },
        {
          displayValue: 'Cooper',
          type: 'term',
          value: 'Cooper',
        },
        {
          displayValue: 'Dextero',
          type: 'term',
          value: 'Dextero',
        },
        {
          displayValue: 'Douglas',
          type: 'term',
          value: 'Douglas',
        },
        {
          displayValue: 'Dunlop',
          type: 'term',
          value: 'Dunlop',
        },
        {
          displayValue: 'Falken',
          type: 'term',
          value: 'Falken',
        },
        {
          displayValue: 'Goodyear',
          type: 'term',
          value: 'Goodyear',
        },
        {
          displayValue: 'Hankook',
          type: 'term',
          value: 'Hankook',
        },
        {
          displayValue: 'Kelly',
          type: 'term',
          value: 'Kelly',
        },
        {
          displayValue: 'Kumho',
          type: 'term',
          value: 'Kumho',
        },
        {
          displayValue: 'Mastercraft',
          type: 'term',
          value: 'Mastercraft',
        },
        {
          displayValue: 'Michelin',
          type: 'term',
          value: 'Michelin',
        },
        {
          displayValue: 'Nexen',
          type: 'term',
          value: 'Nexen',
        },
        {
          displayValue: 'Nitto',
          type: 'term',
          value: 'Nitto',
        },
        {
          displayValue: 'Nokian',
          type: 'term',
          value: 'Nokian',
        },
        {
          displayValue: 'Pirelli',
          type: 'term',
          value: 'Pirelli',
        },
        {
          displayValue: 'Rydanz',
          type: 'term',
          value: 'Rydanz',
        },
        {
          displayValue: 'Solar',
          type: 'term',
          value: 'Solar',
        },
        {
          displayValue: 'Uniroyal',
          type: 'term',
          value: 'Uniroyal',
        },
        {
          displayValue: 'Yokoham',
          type: 'term',
          value: 'Yokoham',
        },
      ],
      type: 'SiteSearchResultsList',
    },
  ],
};

export const searchByMostPopular: Results = {
  siteSearchGroupList: [
    {
      label: 'Most Popular',
      siteSearchResultList: [
        {
          displayValue: 'Michelin Pilot Sports A/S',
          type: 'term',
          value: 'Michelin Pilot Sports A/S',
        },
        {
          displayValue: 'Michelin Defender',
          type: 'term',
          value: 'Michelin Defender',
        },
        {
          displayValue: 'Hankook Ventus ST',
          type: 'term',
          value: 'Hankook Ventus ST',
        },
        {
          displayValue: 'Pirelli P Zero Nero',
          type: 'term',
          value: 'Pirelli P Zero Nero',
        },
        {
          displayValue: 'Yokohama AVID Ascend',
          type: 'term',
          value: 'Yokohama AVID Ascend',
        },
        {
          displayValue: 'Michelin Primacy',
          type: 'term',
          value: 'Michelin Primacy',
        },
        {
          displayValue: 'Bridgestone Dueler H/P Sport AS',
          type: 'term',
          value: 'Bridgestone Dueler H/P Sport AS',
        },
        {
          displayValue: 'Hankook Ventus ST RH06',
          type: 'term',
          value: 'Hankook Ventus ST RH06',
        },
      ],
      type: 'SiteSearchResultsList',
    },
  ],
};
