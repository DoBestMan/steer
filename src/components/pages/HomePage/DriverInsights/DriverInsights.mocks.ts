import { text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { INSIGHT_TYPE } from '~/lib/backend/insights.types';

export const mockInsights = [
  {
    body: text(
      'Card 1 Description',
      'They keep the same tires all year round – no winter tires.',
    ),
    eyebrow: null,
    eyebrowIcon: null,
    figures: [{ type: 'string', value: text('Card 1 Decorator', '95%') }],
    id: '1',
    link: { href: '/', isExternal: false },
    linkLabel: text('Card 1 CTA Text', 'Find All-Season tires'),
    title: text('Card 1 Title', 'Of drivers use only All-Season tires.'),
    type: INSIGHT_TYPE.DEFAULT,
  },
  {
    body: text(
      'Card 2 Description',
      'The ones that came with the vehicle from the factory.',
    ),
    eyebrow: 'Trending',
    eyebrowIcon: { svgId: ICONS.ARROW_UP, type: ICON_IMAGE_TYPE.ICON },
    figures: [
      {
        svgId: text('Card 2 Decorator', 'icon-wheel'),

        type: ICON_IMAGE_TYPE.ICON,
      },
    ],
    id: '2',
    link: { href: '/', isExternal: false },
    linkLabel: text('Card 1 CTA Text', 'Find your original tires'),
    title: text('Card 2 Title', 'Most drivers keep original tires.'),
    type: INSIGHT_TYPE.DEFAULT,
  },
  {
    body: text(
      'Card 3 Description',
      'Find your shop, ship your tires for them and schedule the installation.',
    ),
    eyebrow: null,
    eyebrowIcon: null,
    figures: [{ type: 'string', value: text('Card 3 Decorator', '32') }],
    id: '3',
    link: { href: '/', isExternal: false },
    linkLabel: text('Card 3 CTA Text', 'Find All-Season tires'),
    title: text('Card 3 Title', 'Shops install tires near you.'),
    type: INSIGHT_TYPE.DEFAULT,
  },
  {
    body: text(
      'Card 4 Description',
      'Most drivers select tires that last between more than 50,000 miles.',
    ),
    eyebrow: null,
    eyebrowIcon: null,
    figures: [
      {
        altText: 'Continental logo',
        srcSet:
          'https://steer-api-definition.now.sh/mock-data/images/home-insights-continental.png 117w, https://steer-api-definition.now.sh/mock-data/images/home-insights-continental@2x.png 234w',
        type: ICON_IMAGE_TYPE.IMAGE,
      },
      {
        altText: 'Continental logo',
        srcSet:
          'https://steer-api-definition.now.sh/mock-data/images/home-insights-continental.png 117w, https://steer-api-definition.now.sh/mock-data/images/home-insights-continental@2x.png 234w',
        type: ICON_IMAGE_TYPE.IMAGE,
      },
      {
        altText: 'Firestone logo',
        srcSet:
          'https://steer-api-definition.now.sh/mock-data/images/home-insights-firestone.png 117w, https://steer-api-definition.now.sh/mock-data/images/home-insights-firestone@2x.png 234w',
        type: ICON_IMAGE_TYPE.IMAGE,
      },
    ],
    id: '4',
    link: { href: '/', isExternal: false },
    linkLabel: text('Card 4 CTA Text', 'Find tires with long durability'),
    title: text(
      'Card 4 Title',
      'Drivers prioritize tires with long durability.',
    ),
    type: INSIGHT_TYPE.DEFAULT,
  },
];
