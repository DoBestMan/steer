import { VIEWPORTS } from '~/lib/constants/viewport';

import { Loading } from './image.types';

export const LOADING_OPTIONS: Record<string, Loading> = {
  EAGER: 'eager',
  LAZY: 'lazy',
};

export const SHADOW_SRC =
  'https://images.simpletire.com/image/upload/v1594332428/steer/common/Shadow.png';

export const DEFAULT_PRODUCT_IMAGE_SIZE: Record<string, number> = {
  [VIEWPORTS.DESKTOP]: 460,
  [VIEWPORTS.MOBILE]: 200,
  [VIEWPORTS.TABLET]: 350,
};
