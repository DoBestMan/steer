import Icon from '../Icon/Icon';
import Image from '../Image/Image';

import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export type IconOrImageProps = SiteIcon | SiteImage;

function IconOrImage(props: IconOrImageProps) {
  if (props.type === ICON_IMAGE_TYPE.ICON) {
    const { svgId, type: _type, ...rest } = props;
    return <Icon name={svgId} {...rest} />;
  }

  const { srcSet, altText, type: _type, ...rest } = props;
  return <Image srcSet={srcSet} altText={altText} {...rest} />;
}

export default IconOrImage;
