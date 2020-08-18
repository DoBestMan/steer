import { Cars } from '~/components/global/Car/Car.enums';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import CircularIllustrationCarousel from './CircularIllustrationCarousel';
import { customStyles } from './CircularIllustrationCarousel.styles';

const brandsMockData: SiteGraphicTile[] = [
  {
    byline: '1,234 tires',
    image: {
      altText: 'Achilles',
      height: 20,
      src:
        'https://images.simpletire.com/image/upload/v1593195324/manf-logos/1b.svg',
      type: 'SiteImage',
      width: 100,
    } as SiteImage,
    link: {
      href: '/brands/achilles-tires',
      isExternal: false,
    },
    title: 'Achilles',
  },
  {
    byline: '1,234 tires',
    image: {
      altText: 'Aeolus',
      height: 20,
      src:
        'https://images.simpletire.com/image/upload/v1593195323/manf-logos/3b.svg',
      type: 'SiteImage',
      width: 100,
    } as SiteImage,
    link: {
      href: '/brands/aeolus-tires',
      isExternal: false,
    },
    title: 'Aeolus',
  },
  {
    byline: '1,234 tires',
    highlight: '20% Off',
    image: {
      altText: 'Akuret',
      height: 50,
      src:
        'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
      type: 'SiteImage',
      width: 100,
    } as SiteImage,
    link: {
      href: '/brands/akuret-tires',
      isExternal: false,
    },
    title: 'Akuret',
  },
  {
    byline: '1,234 tires',
    highlight: '20% Off',
    image: {
      altText: 'Armour',
      height: 50,
      src:
        'https://images.simpletire.com/image/upload/v1593195322/manf-logos/7b.svg',
      type: 'SiteImage',
      width: 100,
    } as SiteImage,
    link: {
      href: '/brands/armour-tires',
      isExternal: false,
    },
    title: 'Armour',
  },
  {
    byline: '1,123 tires',
    image: {
      altText: 'Atlas',
      height: 50,
      src:
        'https://images.simpletire.com/image/upload/v1593195322/manf-logos/8b.svg',
      type: 'SiteImage',
      width: 100,
    } as SiteImage,
    link: {
      href: '/brands/atlas-tires',
      isExternal: false,
    },
    title: 'Atlas',
  },
  {
    byline: '1,234 tires',
    highlight: 'Top rated',
    image: {
      altText: 'BFGoodrich',
      height: 20,
      src:
        'https://images.simpletire.com/image/upload/v1593195321/manf-logos/9b.svg',
      type: 'SiteImage',
      width: 100,
    } as SiteImage,
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
    title: 'BFGoodrich',
  },
];
const carsMockData: Array<SiteGraphicTile> = [
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[10] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[11] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[12] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[13] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[14] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[15] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[16] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[17] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[18] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[19] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
  {
    image: {
      type: ICON_IMAGE_TYPE.CAR,
      vehicleType: Cars[Object.keys(Cars)[20] as Cars],
    },
    byline: 'Best Tires for',
    title: 'Category',
    link: {
      href: '/brands/bfgoodrich-tires',
      isExternal: false,
    },
  },
];

export default {
  component: CircularIllustrationCarousel,
  title: 'Global/CircularIllustration/CircularIllustrationCarousel',
};

export function CircularIllustrationCarouselForCars() {
  return <CircularIllustrationCarousel dataItems={carsMockData} />;
}
export function CircularIllustrationCarouselForBrands() {
  return (
    <CircularIllustrationCarousel
      dataItems={brandsMockData}
      itemCustomStyle={customStyles.carouselItem}
    />
  );
}
