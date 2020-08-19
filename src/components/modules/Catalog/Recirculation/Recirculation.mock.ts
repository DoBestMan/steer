import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteCatalogSummaryRecirculation } from '~/data/models/SiteCatalogSummaryRecirculation';
import { SiteIcon } from '~/data/models/SiteIcon';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const recirculationMock: SiteCatalogSummaryRecirculation = {
  title: 'You may also be interested in:',
  items: [
    {
      label: 'Winter tires',
      description: 'For snow, ice and freezing temperatures.',
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.TIRETYPE_WINTER,
      } as SiteIcon,
      siteQueryParams: {
        type: 'winter',
      },
    },
    {
      label: 'Tires with long warranty',
      description: 'Very common ask for drivers.',
      icon: { type: ICON_IMAGE_TYPE.ICON, svgId: ICONS.WARRANTY } as SiteIcon,
      siteQueryParams: {
        type: 'winter',
      },
    },
    {
      label: 'Best rated tires',
      description: 'Based on 20,438 ratings',
      icon: { type: ICON_IMAGE_TYPE.ICON, svgId: ICONS.STAR } as SiteIcon,
      siteQueryParams: {
        type: 'winter',
      },
    },
    {
      label: 'Tires with Run-Flat',
      description: 'Common feature in Brooklyn.',
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.FUEL_ECONOMY,
      } as SiteIcon,
      siteQueryParams: {
        type: 'winter',
      },
    },
  ],
  more: {
    label: 'See all 253 tires',
    description: 'All of our catalog',
    siteQueryParams: {
      skipGroups: 'true',
    },
  },
};
