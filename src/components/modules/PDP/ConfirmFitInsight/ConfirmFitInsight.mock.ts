import { Cars } from '~/components/global/Car/Car.enums';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ConfirmFitInsightData } from '~/data/models/ConfirmFitInsightData';
import { IconOrImage } from '~/data/models/IconOrImage';
import { SiteLink } from '~/data/models/SiteLink';

import { ConfirmFitType } from './ConfirmFitInsight.utils';

export const defaultCarType = Cars['car--sedan'];
export const defaultTireSize = '215/50R17';

export const mockDefaultParams = [
  {
    decisionModal: null,
    icon: { type: 'SiteIcon', svgId: ICONS.UNKNOWN } as IconOrImage,
    label: 'Confirm fits the vehicle',
    type: ConfirmFitType.DEFAULT,
    vehicleSelectionModalLabel: null,
    vehicleType: defaultCarType,
  },
];

export const mockFitParams = [
  {
    decisionModal: null,
    icon: { type: 'SiteIcon', svgId: ICONS.THUMBS_UP } as IconOrImage,
    label: 'Fits the Honda 2018 Civic Basic',
    type: ConfirmFitType.FIT,
    vehicleSelectionModalLabel: 'Honda 2018 Civic Basic',
    vehicleType: defaultCarType,
  },
];

export const mockDoesntFitParams = [
  {
    decisionModal: {
      header: 'Pro Tip',
      icon: ICONS.TIP_MECHANIC,
      labelLink: {
        label: 'View tires that fit',
        link: {
          href: '/catalogURl',
          isExternal: false,
        } as SiteLink,
      },
      subTitle:
        'Most drivers keep the same size. If you want to change it, make sure you make the proper safety checks.',
      title:
        "This isn't the tire size that came with your Civic from the factory.",
    },
    icon: { type: 'SiteIcon', svgId: ICONS.FORBIDDEN } as IconOrImage,
    label: "It doesn't fit Honda Civic 2018 EX - L(not the factory size)",
    type: ConfirmFitType.DOESNTFIT,
    vehicleSelectionModalLabel: null,
    vehicleType: defaultCarType,
  },
];

export const mockStaggeredParams = [
  {
    decisionModal: null,
    icon: { type: 'SiteIcon', svgId: ICONS.THUMBS_UP } as IconOrImage,
    label: 'Fits the front wheels on your Chevrolet Tahoe',
    type: ConfirmFitType.FIT,
    vehicleSelectionModalLabel: 'Chevrolet Tahoe',
    vehicleType: defaultCarType,
  },
  {
    decisionModal: {
      header: 'Pro Tip',
      icon: ICONS.TIP_MECHANIC,
      labelLink: {
        label: 'View tires that fit both front and rear tire sizes',
        link: {
          href: '/PDPURL/CatalogURl',
          isExternal: false,
        } as SiteLink,
      },
      subTitle:
        'This tire only has the front size and the rear is not available. We recommend finding a different tire that has both available.',
      title: 'Your Chevrolet Tahoe has different front and rear sizes.',
    },
    icon: { type: 'SiteIcon', svgId: ICONS.FORBIDDEN } as IconOrImage,
    label: "It doesn't fit the back wheels on your Chevrolet Tahoe",
    type: ConfirmFitType.DOESNTFIT,
    vehicleSelectionModalLabel: null,
    vehicleType: defaultCarType,
  },
];

export const radioOptionsForStorybook = [
  {
    data: mockDefaultParams as Array<ConfirmFitInsightData>,
    title: 'Default',
  },
  {
    data: mockFitParams as Array<ConfirmFitInsightData>,
    title: 'Tire Fits',
  },
  {
    data: mockDoesntFitParams as Array<ConfirmFitInsightData>,
    title: "Doesn't Fit",
  },
  {
    data: mockStaggeredParams as Array<ConfirmFitInsightData>,
    title: 'Staggered Fit',
  },
];
