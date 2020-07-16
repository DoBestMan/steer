import {
  SiteCatalogProductImage,
  SiteCatalogProductImageTypeEnum,
} from '~/data/models/SiteCatalogProductImage';
import { SiteImage } from '~/data/models/SiteImage';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import {
  SiteYouTubeVideo,
  SiteYouTubeVideoTypeEnum,
} from '~/data/models/SiteYouTubeVideo';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import TireImage from './TireImage';

export default {
  component: TireImage,
  title: 'PDP/Tire Image',
};

const assetList: SiteProductLine['assetList'] = [
  {
    image: {
      altText: 'Tire sidewall',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
      type: 'SiteImage',
      width: 800,
    },
    productImageType: 'sidewall',
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  } as SiteCatalogProductImage,
  {
    image: {
      altText: 'Tire sidetread',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
      type: 'SiteImage',
      width: 543,
    },
    productImageType: 'sidetread',
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  } as SiteCatalogProductImage,
  {
    image: {
      altText: 'Tire treadfull',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-treadfull_xpitvf.png',
      type: 'SiteImage',
      width: 272,
    },
    productImageType: 'treadfull',
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  } as SiteCatalogProductImage,
  {
    image: {
      altText: 'Tire treadonly',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705546/line-images/1349/1349-treadonly_pa1oew.png',
      type: 'SiteImage',
      width: 800,
    },
    productImageType: 'treadonly',
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  } as SiteCatalogProductImage,
  {
    poster: {
      altText: 'Video poster',
      height: 1080,
      src: 'https://picsum.photos/1920/1080',
      type: 'SiteImage',
      width: 1920,
    },
    type: SiteYouTubeVideoTypeEnum.SiteYouTubeVideo,
    video: {
      youtubeId: 'iQdV2fDR9RY',
    },
  } as SiteYouTubeVideo,
];

const brand = {
  image: {
    altText: 'AG-Dura',
    height: 20,
    src:
      'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg',
    type: ICON_IMAGE_TYPE.IMAGE,
    width: 120,
  } as SiteImage,
  label: 'AG-Dura',
};

export function TireImageWithKnobs() {
  return <TireImage assetList={assetList} brand={brand} />;
}
