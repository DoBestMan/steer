import { Props as VideoProps } from '~/components/global/Video/Video';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import TireImage from './TireImage';

export default {
  component: TireImage,
  title: 'PDP/Tire Image',
};

const imageList: Array<{
  image?: SiteImage;
  productImageType?: PRODUCT_IMAGE_TYPES;
  video?: VideoProps;
}> = [
  {
    video: {
      posterFrame: 'https://picsum.photos/1920/1080',
      sizes: [920],
      youtubeId: 'iQdV2fDR9RY',
    },
  },
  {
    productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
    image: {
      altText: 'Tire image alt text',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 800,
    },
  },
  {
    productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
    image: {
      altText: 'Tire image alt text',
      height: 200,
      src: 'https://via.placeholder.com/130x200',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 130,
    },
  },
  {
    productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
    image: {
      altText: 'Tire image alt text',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 800,
    },
  },
  {
    productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
    image: {
      altText: 'Tire image alt text',
      height: 600,
      src: 'https://via.placeholder.com/600',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 600,
    },
  },
  {
    video: {
      posterFrame: 'https://picsum.photos/1920/1080',
      sizes: [920],
      youtubeId: 'iQdV2fDR9RY',
    },
  },
  {
    productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
    image: {
      altText: 'Tire image alt text',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 800,
    },
  },
];

export function TireImageWithKnobs() {
  return <TireImage imageList={imageList} />;
}
