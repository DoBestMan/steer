import Icon from '../Icon/Icon';
import { Icon as IconType } from '../Icon/Icon.types';
import Image from '../Image/Image';

import { Image as ImageType } from '~/lib/constants';

interface IconProps {
  svgId: IconType;
  type: ImageType.SVG;
}

interface ImageProps {
  altText: string;
  srcSet: string;
  type: ImageType.BITMAP;
}

export type IconOrImageProps = IconProps | ImageProps;

function IconOrImage(props: IconOrImageProps) {
  if (props.type === ImageType.SVG) {
    const { svgId, type: _type, ...rest } = props;
    return <Icon name={svgId} {...rest} />;
  }

  const { srcSet, altText, type: _type, ...rest } = props;
  return <Image srcSet={srcSet} altText={altText} {...rest} />;
}

export default IconOrImage;
