import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ui } from '~/lib/utils/ui-dictionary';

export const headerData = {
  body: ui('tireInstallerRegistration.copy.header.body'),
  image: {
    altText: ui('tireInstallerRegistration.copy.header.imageAltText'),
    src:
      'https://images.simpletire.com/image/upload/w_1600,f_auto,q_100/v1593622050/steer/seo/brand_page_header_image.svg',
    type: ICON_IMAGE_TYPE.IMAGE as ICON_IMAGE_TYPE.IMAGE,
  },
  title: ui('tireInstallerRegistration.copy.header.title'),
  subTitle: ui('tireInstallerRegistration.copy.header.subTitle'),
};
