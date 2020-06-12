import { Item } from '~/components/global/Accordion/Accordion';

import { Size, SizeOption } from './TechnicalSpecs';

export const specList: Item[] = [
  {
    label: 'Type',
    value: 'Passenger',
    content:
      'This product is covered by a 55,000 mile manufacturer’s treadlife warranty.\n\nMerchandise covered by a manufacturer’s warranty is sold with the warranty by the manufacturer extended to the purchaser. We will be happy to assist in obtaining fulfillment of a manufacturer’s warranty. Other than applicable manufacturers’ warranties, there are no warranties, express or implied, including any warranty of merchantability or fitness for a particular purpose.\n\nThe only tires SimpleTire can warranty are brand new defects (meaning that they have not been mounted or driven on). Any bead damaged will be void of any warranty claim. Any other adjustments should be taken to the nearest authorized dealer for that manufacturer.\n\nSometimes the manufacturer also provides a treadlife warranty and mileage rating. Please be aware that not all tires hold a mileage warranty from the manufacturer. Different tire models, even from the same manufacturer, may or may not come with a treadlife warranty.',
  },
  {
    label: 'Warranty',
    value: '60000 miles',
    content:
      'This product is covered by a 55,000 mile manufacturer’s treadlife warranty.\n\nMerchandise covered by a manufacturer’s warranty is sold with the warranty by the manufacturer extended to the purchaser. We will be happy to assist in obtaining fulfillment of a manufacturer’s warranty. Other than applicable manufacturers’ warranties, there are no warranties, express or implied, including any warranty of merchantability or fitness for a particular purpose.\n\nThe only tires SimpleTire can warranty are brand new defects (meaning that they have not been mounted or driven on). Any bead damaged will be void of any warranty claim. Any other adjustments should be taken to the nearest authorized dealer for that manufacturer.\n\nSometimes the manufacturer also provides a treadlife warranty and mileage rating. Please be aware that not all tires hold a mileage warranty from the manufacturer. Different tire models, even from the same manufacturer, may or may not come with a treadlife warranty.',
  },
  {
    label: 'Speed',
    value: '168 mph',
    content:
      'This product is covered by a 55,000 mile manufacturer’s treadlife warranty.\n\nMerchandise covered by a manufacturer’s warranty is sold with the warranty by the manufacturer extended to the purchaser. We will be happy to assist in obtaining fulfillment of a manufacturer’s warranty. Other than applicable manufacturers’ warranties, there are no warranties, express or implied, including any warranty of merchantability or fitness for a particular purpose.\n\nThe only tires SimpleTire can warranty are brand new defects (meaning that they have not been mounted or driven on). Any bead damaged will be void of any warranty claim. Any other adjustments should be taken to the nearest authorized dealer for that manufacturer.\n\nSometimes the manufacturer also provides a treadlife warranty and mileage rating. Please be aware that not all tires hold a mileage warranty from the manufacturer. Different tire models, even from the same manufacturer, may or may not come with a treadlife warranty.',
  },
  {
    label: 'Load',
    value: '1389 lbs',
    content:
      'This product is covered by a 55,000 mile manufacturer’s treadlife warranty.\n\nMerchandise covered by a manufacturer’s warranty is sold with the warranty by the manufacturer extended to the purchaser. We will be happy to assist in obtaining fulfillment of a manufacturer’s warranty. Other than applicable manufacturers’ warranties, there are no warranties, express or implied, including any warranty of merchantability or fitness for a particular purpose.\n\nThe only tires SimpleTire can warranty are brand new defects (meaning that they have not been mounted or driven on). Any bead damaged will be void of any warranty claim. Any other adjustments should be taken to the nearest authorized dealer for that manufacturer.\n\nSometimes the manufacturer also provides a treadlife warranty and mileage rating. Please be aware that not all tires hold a mileage warranty from the manufacturer. Different tire models, even from the same manufacturer, may or may not come with a treadlife warranty.',
  },
  {
    label: 'UTQG',
    value: '500AA',
    content:
      'This product is covered by a 55,000 mile manufacturer’s treadlife warranty.\n\nMerchandise covered by a manufacturer’s warranty is sold with the warranty by the manufacturer extended to the purchaser. We will be happy to assist in obtaining fulfillment of a manufacturer’s warranty. Other than applicable manufacturers’ warranties, there are no warranties, express or implied, including any warranty of merchantability or fitness for a particular purpose.\n\nThe only tires SimpleTire can warranty are brand new defects (meaning that they have not been mounted or driven on). Any bead damaged will be void of any warranty claim. Any other adjustments should be taken to the nearest authorized dealer for that manufacturer.\n\nSometimes the manufacturer also provides a treadlife warranty and mileage rating. Please be aware that not all tires hold a mileage warranty from the manufacturer. Different tire models, even from the same manufacturer, may or may not come with a treadlife warranty.',
  },
  {
    label: 'Sidewall',
    value: 'Blackwall',
    content:
      'This product is covered by a 55,000 mile manufacturer’s treadlife warranty.\n\nMerchandise covered by a manufacturer’s warranty is sold with the warranty by the manufacturer extended to the purchaser. We will be happy to assist in obtaining fulfillment of a manufacturer’s warranty. Other than applicable manufacturers’ warranties, there are no warranties, express or implied, including any warranty of merchantability or fitness for a particular purpose.\n\nThe only tires SimpleTire can warranty are brand new defects (meaning that they have not been mounted or driven on). Any bead damaged will be void of any warranty claim. Any other adjustments should be taken to the nearest authorized dealer for that manufacturer.\n\nSometimes the manufacturer also provides a treadlife warranty and mileage rating. Please be aware that not all tires hold a mileage warranty from the manufacturer. Different tire models, even from the same manufacturer, may or may not come with a treadlife warranty.',
  },
];

const sizeOptions: SizeOption[] = [
  {
    label: '215/45R17 91H',
    link: '#',
    specs: [
      {
        label: 'UTQG',
        value: '500AA',
      },
      {
        label: 'Sidewall',
        value: 'BW',
      },
      {
        label: 'Part Nr.',
        value: '15498150000',
      },
    ],
    price: '$59.99',
  },
  {
    label: '215/50R17 89H',
    link: '#',
    specs: [
      {
        label: 'UTQG',
        value: '500AA',
      },
      {
        label: 'Sidewall',
        value: 'BW',
      },
      {
        label: 'Part Nr.',
        value: '15498150000',
      },
    ],
    price: '$69.99',
  },
  {
    label: '215/50R17 91H',
    link: '#',
    specs: [
      {
        label: 'UTQG',
        value: '500AA',
      },
      {
        label: 'Sidewall',
        value: 'BW',
      },
      {
        label: 'Part Nr.',
        value: '15498150000',
      },
    ],
    price: '$79.99',
  },
  {
    label: '225/60R17 89H  ∙  Toyota',
    link: '#',
    specs: [
      {
        label: 'UTQG',
        value: '500AA',
      },
      {
        label: 'Sidewall',
        value: 'BW',
      },
      {
        label: 'Part Nr.',
        value: '15498150000',
      },
    ],
    price: '$92.99',
  },
];
export const sizesList: Size[] = [
  {
    label: '15"',
    options: sizeOptions,
  },
  {
    label: '16"',
    options: sizeOptions,
  },
  {
    label: '17"',
    options: sizeOptions,
  },
  {
    label: '18"',
    options: sizeOptions,
  },
];
